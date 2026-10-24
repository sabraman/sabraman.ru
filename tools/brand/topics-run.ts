#!/usr/bin/env bun

import { mkdirSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { buildPrompt, loadEvidence, loadProfile } from "./prompts";
import { routePlan } from "./router";
import { TOPICS, type Topic } from "./topics";
import { VARIANTS, variantBlock, type Variant } from "./variants";
import { parseArtifact, validateArtifact } from "./validators";

const TOOL_ROOT = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(join(TOOL_ROOT, "..", ".."));
const OUT_ROOT = join(REPO_ROOT, "content", "topics");
const ANSI = /\p{Cc}\[[0-9;]*m/gu;

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
			rejectPromise(new Error(`timeout ${timeoutMs}ms`));
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
				rejectPromise(
					new Error(`exit ${code}: ${stderr.replace(ANSI, "").slice(-200)}`),
				);
				return;
			}
			resolvePromise(stdout.replace(ANSI, ""));
		});
	});
}

function topicText(topic: Topic): string {
	return [
		`Тема: ${topic.title}.`,
		`Позиция автора: ${topic.thesis}`,
		`Сцена: ${topic.scene}`,
		`Что уносит читатель: ${topic.takeaway}`,
	].join("\n");
}

async function main(): Promise<void> {
	const model = arg("--model") ?? "opencode-go/glm-5.3-flash";
	const requested = (arg("--variant") ?? "critique") as Variant;
	const variant = VARIANTS.includes(requested) ? requested : "critique";
	const only = arg("--topic");
	const topics = only ? TOPICS.filter((topic) => topic.id === only) : TOPICS;

	const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
	const dir = join(OUT_ROOT, stamp);
	mkdirSync(dir, { recursive: true });

	const profile = loadProfile(REPO_ROOT);
	const evidence = loadEvidence(REPO_ROOT);
	let cursor = 0;

	async function worker(): Promise<void> {
		while (cursor < topics.length) {
			const index = cursor;
			cursor += 1;
			const topic = topics[index];
			if (!topic) return;
			const plan = routePlan(topic.surface, topic.route);
			const prompt = buildPrompt({
				plan,
				topic: topicText(topic),
				profile,
				evidence,
				variantBlock: variantBlock(variant),
				research: topic.research,
			});

			try {
				const raw = await runOpenCode(model, prompt, 180_000);
				const artifact = parseArtifact(raw);
				const validation = validateArtifact(artifact, evidence, plan);
				writeFileSync(
					join(dir, `${topic.id}.json`),
					`${JSON.stringify({ topic: topic.id, title: topic.title, model, variant, validation, artifact }, null, 2)}\n`,
				);
				console.log(
					`${validation.ok ? "✓" : "~"} ${topic.id} ${validation.stats.chars} симв ${validation.errors.length} ош.`,
				);
			} catch (error) {
				writeFileSync(
					join(dir, `${topic.id}.error.txt`),
					`${error instanceof Error ? error.message : String(error)}\n`,
				);
				console.log(
					`✗ ${topic.id} ${error instanceof Error ? error.message.slice(0, 80) : ""}`,
				);
			}
		}
	}

	await Promise.all(
		Array.from({ length: Math.min(3, topics.length) }, () => worker()),
	);
	console.log(dir);
}

await main();
