#!/usr/bin/env bun

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { validateProse } from "./validators";

const TOOL_ROOT = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(join(TOOL_ROOT, "..", ".."));
const OUT_ROOT = join(REPO_ROOT, "content", "prompt-runs");
const ANSI = /\p{Cc}\[[0-9;]*m/gu;

const OPENCODE_MODELS = [
	{ key: "haiku", id: "opencode-go/claude-haiku-5-5" },
	{ key: "glm", id: "opencode-go/glm-5.3-flash" },
	{ key: "muse", id: "opencode-go/muse-spark-1.3-contributor" },
	{ key: "deepseek", id: "opencode-go/deepseek-v4.1-flash" },
];

const PROMPT = `Ты пишешь от первого лица для Threads.

Автор: разработчик, который работал в рознице и делал для розницы внутренние инструменты.

Тема: сейчас можно собрать инструмент под свою задачу самому, и для этого не нужен никто другой.

Аудитория: люди, похожие на автора. Работают руками, видят, что что-то делается неудобно, но не считают себя разработчиками.

Требования:
- 600–900 знаков.
- Одна мысль и одна конкретная деталь. Не три.
- Без перечислений из трёх пунктов.
- Без конструкций «не X. не Y.» и «это не X, это Y».
- Без афоризмов вида «X — это Y».
- Без вопроса в конце и без призыва.
- Без хештегов.
- Тон человека, который это пережил, а не автора курса.

Верни только текст поста, без заголовка и пояснений.`;

function arg(name: string): string | undefined {
	const index = process.argv.indexOf(name);
	return index >= 0 ? process.argv[index + 1] : undefined;
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

function runAgy(
	prompt: string,
	timeoutMs: number,
	agyModel = "Gemini 3.8 Flash (High)",
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

function clean(raw: string): string {
	return raw
		.split("\n")
		.filter((line) => !line.startsWith("> build") && !line.startsWith("> "))
		.join("\n")
		.trim();
}

async function main(): Promise<void> {
	const runner = arg("--runner") ?? "opencode";
	const promptFile = arg("--prompt");
	const prompt = promptFile ? readFileSync(promptFile, "utf8") : PROMPT;
	const only = arg("--model");

	const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
	const dir = join(OUT_ROOT, stamp);
	mkdirSync(dir, { recursive: true });

	const models =
		runner === "agy"
			? [{ key: "agy", id: "agy" }]
			: only
				? OPENCODE_MODELS.filter((model) => model.key === only)
				: OPENCODE_MODELS;

	const results = await Promise.all(
		models.map(async (model) => {
			try {
				const raw =
					runner === "agy"
						? await runAgy(prompt, 180_000, arg("--agy-model"))
						: await runOpenCode(model.id, prompt, 180_000);
				const text = clean(raw);
				const issues = validateProse(text);
				writeFileSync(join(dir, `${model.key}.txt`), `${text}\n`);
				writeFileSync(
					join(dir, `${model.key}.issues.json`),
					`${JSON.stringify(issues, null, 2)}\n`,
				);
				return { model: model.key, text, issues };
			} catch (error) {
				return {
					model: model.key,
					text: "",
					issues: [{ code: "run_failed", message: String(error) }],
				};
			}
		}),
	);

	for (const result of results) {
		console.log(`\n===== ${result.model} =====`);
		if (result.issues.length > 0) {
			for (const issue of result.issues) {
				console.log(`! ${issue.code}: ${issue.message}`);
			}
		} else {
			console.log("чисто");
		}
		console.log(result.text);
	}

	console.log(`\n${dir}`);
}

await main();
