#!/usr/bin/env bun

import { mkdirSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

import { buildPrompt, loadEvidence, loadProfile } from "./prompts";
import { routePlan } from "./router";
import {
	VARIANTS,
	VARIANT_LABEL,
	variantBlock,
	type Variant,
} from "./variants";
import { parseArtifact, validateArtifact } from "./validators";
import type { Artifact, Surface } from "./schemas";

const TOOL_ROOT = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(join(TOOL_ROOT, "..", ".."));
const EVAL_ROOT = join(REPO_ROOT, "content", "eval");

const MODELS = [
	{ key: "haiku", id: "opencode-go/claude-haiku-5-5" },
	{ key: "glm", id: "opencode-go/glm-5.3-flash" },
	{ key: "muse", id: "opencode-go/muse-spark-1.3-contributor" },
	{ key: "deepseek", id: "opencode-go/deepseek-v4.1-flash" },
] as const;

const BRIEFS = [
	{
		key: "shifts",
		topic:
			"Менеджер собирает отчёт по сменам руками из трёх таблиц. Владелец не видит, где именно теряется время.",
		surface: "threads_post" as Surface,
		route: {
			productLine: "retail",
			recipient: "owner",
			objective: "authority",
		},
	},
] as const;

const ANSI = /\p{Cc}\[[0-9;]*m/gu;

function stripAnsi(text: string): string {
	return text.replace(ANSI, "");
}

function arg(name: string): string | undefined {
	const index = process.argv.indexOf(name);
	return index >= 0 ? process.argv[index + 1] : undefined;
}

function codeFor(...parts: string[]): string {
	const digest = createHash("sha256")
		.update(parts.join("|"))
		.digest("hex")
		.slice(0, 6);
	return digest.toUpperCase();
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
					new Error(`opencode exit ${code}: ${stripAnsi(stderr).slice(-300)}`),
				);
				return;
			}
			resolvePromise(stripAnsi(stdout));
		});
	});
}

interface RunResult {
	code: string;
	variant: Variant;
	model: string;
	brief: string;
	ok: boolean;
	modelOk: boolean;
	errors: string[];
	warnings: string[];
	stats: { chars: number; words: number } | null;
	durationMs: number;
	artifact: Artifact | null;
	raw: string;
}

async function runOne(input: {
	variant: Variant;
	modelKey: string;
	modelId: string;
	brief: (typeof BRIEFS)[number];
	concurrencyIndex: number;
}): Promise<RunResult> {
	const { variant, modelKey, modelId, brief } = input;
	const started = Date.now();
	const plan = routePlan(brief.surface, brief.route);
	const prompt = buildPrompt({
		plan,
		topic: brief.topic,
		profile: loadProfile(REPO_ROOT),
		evidence: loadEvidence(REPO_ROOT),
		variantBlock: variantBlock(variant),
	});

	let raw = "";
	try {
		raw = await runOpenCode(modelId, prompt, 180_000);
	} catch (error) {
		return {
			code: codeFor(brief.key, variant, modelKey),
			variant,
			model: modelKey,
			brief: brief.key,
			ok: false,
			modelOk: false,
			errors: [
				`run_failed: ${error instanceof Error ? error.message : String(error)}`,
			],
			warnings: [],
			stats: null,
			durationMs: Date.now() - started,
			artifact: null,
			raw: "",
		};
	}

	try {
		const artifact = parseArtifact(raw);
		const validation = validateArtifact(
			artifact,
			loadEvidence(REPO_ROOT),
			plan,
		);
		return {
			code: codeFor(brief.key, variant, modelKey),
			variant,
			model: modelKey,
			brief: brief.key,
			ok: validation.ok,
			modelOk: true,
			errors: validation.errors.map(
				(entry) => `${entry.code}: ${entry.message}`,
			),
			warnings: validation.warnings.map(
				(entry) => `${entry.code}: ${entry.message}`,
			),
			stats: { chars: validation.stats.chars, words: validation.stats.words },
			durationMs: Date.now() - started,
			artifact,
			raw,
		};
	} catch (error) {
		return {
			code: codeFor(brief.key, variant, modelKey),
			variant,
			model: modelKey,
			brief: brief.key,
			ok: false,
			modelOk: true,
			errors: [
				`invalid_json: ${error instanceof Error ? error.message : String(error)}`,
			],
			warnings: [],
			stats: null,
			durationMs: Date.now() - started,
			artifact: null,
			raw: raw.slice(0, 6000),
		};
	}
}

async function main(): Promise<void> {
	const only = arg("--variant");
	const variants = only
		? VARIANTS.filter((variant) => variant === only)
		: VARIANTS;
	const concurrency = Number(arg("--concurrency") ?? "4");
	const timeoutLabel = `${variants.length} вариантов × ${MODELS.length} моделей × ${BRIEFS.length} брифов`;

	const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
	const dir = join(EVAL_ROOT, stamp);
	mkdirSync(join(dir, "runs"), { recursive: true });

	console.log(`Запуск: ${timeoutLabel}, параллельно ${concurrency}`);

	const jobs = variants.flatMap((variant) =>
		MODELS.flatMap((model) =>
			BRIEFS.map((brief) => ({ variant, model, brief })),
		),
	);

	const results: RunResult[] = [];
	let cursor = 0;
	let done = 0;

	async function worker(): Promise<void> {
		while (cursor < jobs.length) {
			const index = cursor;
			cursor += 1;
			const job = jobs[index];
			if (!job) return;
			const result = await runOne({
				variant: job.variant,
				modelKey: job.model.key,
				modelId: job.model.id,
				brief: job.brief,
				concurrencyIndex: index,
			});
			results.push(result);
			done += 1;
			const state = result.artifact ? (result.ok ? "✓" : "~") : "✗";
			console.log(
				`${state} ${String(done).padStart(2)}/${jobs.length} ${result.code} ${job.variant}/${job.model.key} ${result.stats ? `${result.stats.chars} симв` : "нет JSON"} ${Math.round(result.durationMs / 1000)}с`,
			);
			writeFileSync(
				join(dir, "runs", `${result.code}.json`),
				`${JSON.stringify(result, null, 2)}\n`,
			);
		}
	}

	await Promise.all(
		Array.from({ length: Math.min(concurrency, jobs.length) }, () => worker()),
	);

	results.sort((a, b) => a.code.localeCompare(b.code));

	const summary = MODELS.map((model) => ({
		model: model.key,
		runs: variants.map((variant) => {
			const result = results.find(
				(entry) => entry.model === model.key && entry.variant === variant,
			);
			return {
				variant,
				label: VARIANT_LABEL[variant],
				ok: result?.ok ?? false,
				chars: result?.stats?.chars ?? 0,
				errors: result?.errors.length ?? 0,
			};
		}),
	}));

	writeFileSync(
		join(dir, "index.json"),
		`${JSON.stringify({ createdAt: stamp, results, summary }, null, 2)}\n`,
	);

	console.log("");
	for (const row of summary) {
		const cells = row.runs
			.map(
				(run) =>
					`${run.variant}${run.ok ? "✓" : "·"}${String(run.chars).padStart(3)}`,
			)
			.join("  ");
		console.log(`${row.model.padEnd(9)} ${cells}`);
	}
	console.log("");
	console.log(
		`${results.filter((result) => result.ok).length}/${results.length} прошли валидатор`,
	);
	console.log(dir);
}

await main();
