#!/usr/bin/env bun

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const TOOL_ROOT = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(join(TOOL_ROOT, "..", ".."));
const OUT_ROOT = join(REPO_ROOT, "content", "judge-runs");
const ANSI = /\p{Cc}\[[0-9;]*m/gu;

const JUDGES = [
	{ key: "haiku", id: "opencode-go/claude-haiku-5-5", runner: "opencode" },
	{ key: "glm", id: "opencode-go/glm-5.3-flash", runner: "opencode" },
	{
		key: "muse",
		id: "opencode-go/muse-spark-1.3-contributor",
		runner: "opencode",
	},
	{
		key: "deepseek",
		id: "opencode-go/deepseek-v4.1-flash",
		runner: "opencode",
	},
	{ key: "agy", id: "Gemini 3.8 Flash (High)", runner: "agy" },
];

const RUBRIC = `Ты редактор Threads. Оцениваешь пост: живой человек пишет или сгенерированный текст без души.

Признаки пластика, каждое вхождение выноси отдельным issue:
- triplet, long_list — перечисление из трёх и больше однородных элементов или серия однотипных коротких предложений подряд
- negative_parallelism — «не X. не Y.» или «это не X, это Y»
- aphorism — «X — это Y», законченная мораль в конце
- filler — «сейчас как никогда», «на самом деле», «в конце концов» без функции
- jargon — слова, которые в живом разговоре так не говорят
- no_context — читателю впервые об этом проекте, но не сказано, что это и для кого
- no_cause_effect — сжатая казуальность: стал делать и получил, без механизма
- meta_service — служебная ремарка вместо текста
- question_cta — вопрос в конце или призыв

Важно: посты Threads короткие, минимальный ритм здесь норма и не признак пластика. «Не хватает контекста» (о проекте) — плохо. «Я не знаю про автора вообще ничего» — нормально.

Верни только JSON без markdown и пояснений:
{
  "verdict": "human" | "plastic",
  "slop": 0,
  "issues": [{"type": "...", "sentence": "...", "why": "..."}],
  "voice": "два-три слова о голосе"
}
'slop' 0-100 — сколько процентов текста требует переделки, а не похоже ли на ии.`;

function judgePrompt(text: string): string {
	return `${RUBRIC}\n\nПост:\n\n"""\n${text.trim()}\n"""`;
}

function runAgy(
	prompt: string,
	timeoutMs: number,
	agyModel: string,
): Promise<string> {
	return new Promise((resolvePromise, rejectPromise) => {
		const child = spawn(
			"agy",
			["-p", prompt, "--model", agyModel, "--print-timeout", "12m"],
			{ stdio: ["ignore", "pipe", "pipe"] },
		);
		let stdout = "";
		let stderr = "";
		const timer = setTimeout(() => {
			child.kill("SIGKILL");
			rejectPromise(new Error("timeout"));
		}, timeoutMs);
		child.stdout.on("data", (chunk: Buffer) => {
			stdout += chunk.toString();
		});
		child.stderr.on("data", (chunk: Buffer) => {
			stderr += chunk.toString();
		});
		child.on("error", (error) => {
			clearTimeout(timer);
			rejectPromise(error);
		});
		child.on("close", (code) => {
			clearTimeout(timer);
			if (code !== 0) {
				rejectPromise(new Error(stderr.replace(ANSI, "").slice(-200)));
				return;
			}
			resolvePromise(stdout.replace(ANSI, ""));
		});
	});
}

async function judgeRun(
	judge: (typeof JUDGES)[number],
	prompt: string,
): Promise<string> {
	if (judge.runner === "agy") {
		try {
			return cleanAgy(await runAgy(prompt, 240_000, judge.id));
		} catch (error) {
			if (String(error).includes("location")) {
				return cleanAgy(
					await runAgy(prompt, 240_000, "Claude Sonnet 4.6 (Thinking)"),
				);
			}
			throw error;
		}
	}
	return clean(await runOpenCode(judge.id, prompt, 240_000));
}

function cleanAgy(raw: string): string {
	const lines = raw.split("\n");
	const start = lines.findIndex((line) => line.trim().startsWith("{"));
	return start >= 0 ? lines.slice(start).join("\n").trim() : raw.trim();
}

function clean(raw: string): string {
	return raw
		.split("\n")
		.filter((line) => !line.startsWith("> build") && !line.startsWith("> "))
		.join("\n")
		.trim();
}

function runOpenCode(
	model: string,
	prompt: string,
	timeoutMs: number,
): Promise<string> {
	return new Promise((resolvePromise, rejectPromise) => {
		const child = spawn("opencode", ["run", "-m", model, prompt], {
			stdio: ["ignore", "pipe", "pipe"],
		});
		let stdout = "";
		let stderr = "";
		const timer = setTimeout(() => {
			child.kill("SIGKILL");
			rejectPromise(new Error("timeout"));
		}, timeoutMs);
		child.stdout.on("data", (chunk: Buffer) => {
			stdout += chunk.toString();
		});
		child.stderr.on("data", (chunk: Buffer) => {
			stderr += chunk.toString();
		});
		child.on("error", (error) => {
			clearTimeout(timer);
			rejectPromise(error);
		});
		child.on("close", (code) => {
			clearTimeout(timer);
			if (code !== 0) {
				rejectPromise(new Error(stderr.replace(ANSI, "").slice(-200)));
				return;
			}
			resolvePromise(stdout.replace(ANSI, ""));
		});
	});
}

function extractJson(raw: string): unknown {
	const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
	const candidate =
		fenced ?? raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
	if (!candidate.trim()) throw new Error("json_missing");
	return JSON.parse(candidate.trim()) as unknown;
}

interface JudgeResult {
	verdict?: string;
	slop?: number;
	issues?: Array<{ type?: string; sentence?: string; why?: string }>;
	voice?: string;
}

async function main(): Promise<void> {
	const files = process.argv
		.slice(2)
		.filter((entry) => !entry.startsWith("--"));
	if (files.length === 0) {
		console.error("usage: bun tools/brand/judge.ts <file1> [file2] ...");
		process.exit(1);
	}

	const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
	const dir = join(OUT_ROOT, stamp);
	mkdirSync(dir, { recursive: true });

	const report: Array<Record<string, unknown>> = [];

	for (const file of files) {
		const text = readFileSync(file, "utf8");
		const label = basename(file);
		const results = await Promise.all(
			JUDGES.map(async (judge) => {
				try {
					const raw = await judgeRun(judge, judgePrompt(text));
					const parsed = extractJson(raw) as JudgeResult;
					writeFileSync(
						join(dir, `${label}.${judge.key}.json`),
						`${JSON.stringify(parsed, null, 2)}\n`,
					);
					return { judge: judge.key, parsed };
				} catch (error) {
					return {
						judge: judge.key,
						parsed: {
							verdict: "error",
							slop: -1,
							voice: String(error),
						} as JudgeResult,
					};
				}
			}),
		);

		const human = results.filter(
			(entry) => entry.parsed.verdict === "human",
		).length;
		const scores = results
			.map((entry) => entry.parsed.slop ?? -1)
			.filter((score) => score >= 0);
		const avg =
			scores.length > 0
				? Math.round(
						scores.reduce((sum, score) => sum + score, 0) / scores.length,
					)
				: -1;
		const issueTypes = results
			.flatMap((entry) =>
				(entry.parsed.issues ?? []).map((issue) => issue.type),
			)
			.filter((type): type is string => typeof type === "string");

		report.push({
			file: label,
			humanVotes: `${human}/${results.length}`,
			avgSlop: avg,
			issueTypes: issueTypes.join(", "),
			judges: results.map((entry) => ({
				judge: entry.judge,
				verdict: entry.parsed.verdict,
				slop: entry.parsed.slop,
				issues: entry.parsed.issues?.length ?? 0,
				voice: entry.parsed.voice,
			})),
		});

		console.log(`\n=== ${label} ===`);
		console.log(`human: ${human}/${results.length}, avgSlop: ${avg}`);
		console.log(`заявленные проблемы: ${issueTypes.join(", ") || "нет"}`);
	}
	writeFileSync(
		join(dir, "index.json"),
		`${JSON.stringify(report, null, 2)}\n`,
	);
	console.log(`\n${dir}`);
}

await main();
