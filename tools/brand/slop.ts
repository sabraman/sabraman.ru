#!/usr/bin/env bun

import { mkdirSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { validateProse } from "./validators";
import { TOPICS, type Topic } from "./topics";

const TOOL_ROOT = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(join(TOOL_ROOT, "..", ".."));
const OUT_ROOT = join(REPO_ROOT, "content", "slop");
const ANSI = /\p{Cc}\[[0-9;]*m/gu;

const MODELS = [
	{ key: "glm", id: "opencode-go/glm-5.3-flash" },
	{ key: "muse", id: "opencode-go/muse-spark-1.3-contributor" },
];

const MODE_PROMPT: Record<string, string> = {
	chatgpt:
		"Режим ChatGPT: тёплый и профессиональный тон, списки и жирные ключевые точки, обязательный постамбул в конце — предложение изменить тон, длину или формат («Хочешь, переформулирую в более жёстком тоне — прямо под Твиттер?»).",
	grok: "Режим Grok: дерзкий, с сильными мнениями и самоиронией, не стесняется острых тейков, «критически смотрит на общепринятое».",
	claude:
		"Режим Claude: мягкие оговорки («стоит отметить», «возможно»), сопереживание процессу, осторожные выводы без гарантий.",
	mix: "Смешай режимы: Claude-оговорки в первом абзаце, Grok-дерзость в середине, ChatGPT-постамбул с предложением в конце.",
};

const DEVICE_PROMPT: Record<string, string> = {
	none: "",
	confession:
		"Дисклеймер — первой строкой, плоско и жёстко, примерно так: «честно говоря, выводы ниже — полная хуйня, и вообще весь текст — ии-слоп». Дальше пиши слоп в том же духе, без оправданий. Формулы запрещены: без «но вы же чувствуете, что они верные», без «кейс ненастоящий, боль настоящая», без «все годы придуманы, раздражение — реальное». В середине допускается один разговорный заход «и да, всё ещё слоп» — не больше.",
};

function slopPrompt(topic: Topic, mode: string, device: string): string {
	const modeBlock = MODE_PROMPT[mode] ?? MODE_PROMPT["mix"];
	const deviceBlock = DEVICE_PROMPT[device] ?? DEVICE_PROMPT["none"];
	return `Ты пишешь пост для Threads. Задача: сделать МАКСИМАЛЬНО ИИ-слоповый пост. Это намеренный эксперимент: слоп как эстетика. Выдави все штампы сразу:

- начинай с «Сейчас как никогда» или «В мире, где...»
- конструкция «это не просто X, это Y» минимум один раз
- тройные перечисления почти в каждом абзаце
- афоризм-финал вида «X — это Y»
- тире через каждое второе предложение
- пустые метафоры: бесшовный, инновационный, экосистема, путь, ландшафт
- пафосный вывод про важность и движение вперёд
- мета-комментарии о процессе письма: «добавлю третий пункт для солидности», «проверяю длину», «расширяю, чтобы попасть в объём»
- постамбул в конце: предложение изменить тон, длину или формат, плюс вопрос и призыв
- вопрос в конце или призыв
- детали можешь выдумывать смело: цифры, годы, роли — это слоп

Персона: ${modeBlock}

${deviceBlock ? `Приём: ${deviceBlock}\n\n` : ""}Тема: ${topic.title}. Позиция автора: ${topic.thesis}

Объём: 700–1200 знаков. Верни только текст поста, без заголовка и пояснений.`;
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

function clean(raw: string): string {
	return raw
		.split("\n")
		.filter((line) => !line.startsWith("> build") && !line.startsWith("> "))
		.join("\n")
		.trim();
}

async function main(): Promise<void> {
	const argMode = (name: string): string | undefined => {
		const index = process.argv.indexOf(name);
		return index >= 0 ? process.argv[index + 1] : undefined;
	};
	const mode = argMode("--mode") ?? "mix";
	const device = argMode("--device") ?? "none";
	const topicFilter = argMode("--topic");
	const modelFilter = argMode("--model");
	const models = modelFilter
		? MODELS.filter((model) => model.key === modelFilter)
		: MODELS;
	const topics = topicFilter
		? TOPICS.filter((topic) => topic.id === topicFilter)
		: TOPICS;
	const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
	const dir = join(OUT_ROOT, stamp);
	mkdirSync(dir, { recursive: true });

	const jobs = topics.flatMap((topic) =>
		models.map((model) => ({ topic, model })),
	);
	const results = new Map<string, { text: string; issues: number }>();
	let cursor = 0;

	async function worker(): Promise<void> {
		while (cursor < jobs.length) {
			const index = cursor;
			cursor += 1;
			const job = jobs[index];
			if (!job) return;
			try {
				const raw = await runOpenCode(
					job.model.id,
					slopPrompt(job.topic, mode, device),
					240_000,
				);
				const text = clean(raw);
				const issues = validateProse(text).length;
				writeFileSync(
					join(dir, `${job.topic.id}.${job.model.key}.txt`),
					`${text}\n`,
				);
				results.set(`${job.topic.id}.${job.model.key}`, { text, issues });
				console.log(`✓ ${job.topic.id}/${job.model.key} нарушений: ${issues}`);
			} catch (error) {
				console.log(
					`✗ ${job.topic.id}/${job.model.key} ${String(error).slice(0, 80)}`,
				);
			}
		}
	}

	await Promise.all(Array.from({ length: 6 }, () => worker()));
	console.log(`\n${dir}`);
}

await main();
