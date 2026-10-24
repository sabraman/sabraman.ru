#!/usr/bin/env bun

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
	ARTIFACT_JSON_SCHEMA,
	buildPrompt,
	loadEvidence,
	loadProfile,
} from "./prompts";
import { routePlan, type RoutePlan } from "./router";
import {
	PRESETS,
	ProductLineSchema,
	RecipientSchema,
	ObjectiveSchema,
	SurfaceSchema,
	type Artifact,
	type EvidenceRegistry,
} from "./schemas";
import { parseArtifact, validateArtifact } from "./validators";
import type { ValidationIssue } from "./schemas";

const TOOL_ROOT = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(join(TOOL_ROOT, "..", ".."));
const RUNS_ROOT = join(REPO_ROOT, "content", "runs");
const DEFAULT_MODEL = "Gemini 3.1 Pro (High)";
const DEFAULT_TIMEOUT = "12m";

type Command = "healthcheck" | "post";

function arg(name: string): string | undefined {
	const index = process.argv.indexOf(name);
	return index >= 0 ? process.argv[index + 1] : undefined;
}

function hasFlag(name: string): boolean {
	return process.argv.includes(name);
}

function fail(message: string, code = 1): never {
	console.error(`✗ ${message}`);
	process.exit(code);
}

function timestamp(): string {
	return new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
}

function resolvePlan(): { plan: RoutePlan; topic: string } {
	const presetKey = arg("--preset");
	const preset = presetKey ? PRESETS[presetKey] : undefined;
	if (presetKey && !preset) {
		fail(
			`Неизвестный пресет: ${presetKey}. Доступны: ${Object.keys(PRESETS).join(", ")}`,
		);
	}

	const surface = SurfaceSchema.parse(
		arg("--surface") ?? preset?.surface ?? "threads_post",
	);
	const productLine = ProductLineSchema.parse(
		arg("--line") ?? preset?.route.productLine ?? "retail",
	);
	const recipient = RecipientSchema.parse(
		arg("--recipient") ?? preset?.route.recipient ?? "owner",
	);
	const objective = ObjectiveSchema.parse(
		arg("--objective") ?? preset?.route.objective ?? "authority",
	);

	const topic = arg("--topic") ?? preset?.topicHint ?? "";
	if (!topic) {
		fail('Нужна тема: --topic "..." или --preset');
	}

	return {
		plan: routePlan(surface, { productLine, recipient, objective }),
		topic,
	};
}

function runAgy(prompt: string, model: string, timeout: string): string {
	const result = spawnSync(
		"agy",
		[
			"-p",
			prompt,
			"--model",
			model,
			"--print-timeout",
			timeout,
			"--json-schema",
			JSON.stringify(ARTIFACT_JSON_SCHEMA),
		],
		{ encoding: "utf8", maxBuffer: 32 * 1024 * 1024, timeout: 15 * 60 * 1000 },
	);

	if (result.error) {
		fail(`agy не запустился: ${result.error.message}`, 3);
	}
	const stdout = result.stdout ?? "";
	const stderr = result.stderr ?? "";
	if (result.status !== 0) {
		fail(`agy вернул код ${result.status}\n${stderr.slice(-800)}`, 3);
	}
	if (!stdout.trim()) {
		fail(`agy вернул пустой ответ\n${stderr.slice(-800)}`, 3);
	}
	return stdout;
}

function renderMarkdown(
	artifact: Artifact,
	evidence: EvidenceRegistry,
	plan: RoutePlan,
): string {
	const claims = evidence.claims.filter((claim) =>
		artifact.evidenceIds.includes(claim.id),
	);
	const slides =
		artifact.slides.length > 0
			? `\n## Слайды\n\n${artifact.slides.map((slide, index) => `${index + 1}. ${slide}`).join("\n")}\n`
			: "";

	return [
		`# ${artifact.surface} · ${plan.route.productLine} / ${plan.route.recipient} / ${plan.route.objective}`,
		"",
		`**Хук:** ${artifact.hook}`,
		"",
		"## Текст",
		"",
		artifact.body,
		"",
		...(artifact.cta ? ["## CTA", "", artifact.cta, ""] : []),
		slides,
		"---",
		"",
		"**Опора:**",
		...claims.map(
			(claim) => `- \`${claim.id}\` — ${claim.claim} (${claim.source})`,
		),
		"",
		artifact.notes ? `**Заметки:** ${artifact.notes}` : "",
		"",
	].join("\n");
}

function writeRun(
	artifact: Artifact,
	validation: ReturnType<typeof validateArtifact>,
	evidence: EvidenceRegistry,
	plan: RoutePlan,
	attempts: string[],
	prompt: string,
): string {
	const dir = join(RUNS_ROOT, `${timestamp()}-${artifact.surface}`);
	mkdirSync(dir, { recursive: true });
	writeFileSync(join(dir, "prompt.md"), prompt);
	writeFileSync(join(dir, "post.md"), renderMarkdown(artifact, evidence, plan));
	writeFileSync(
		join(dir, "artifact.json"),
		`${JSON.stringify(artifact, null, 2)}\n`,
	);
	writeFileSync(
		join(dir, "validation.json"),
		`${JSON.stringify(validation, null, 2)}\n`,
	);
	attempts.forEach((attempt, index) => {
		writeFileSync(join(dir, `attempt-${index + 1}.txt`), attempt);
	});
	return dir;
}

function formatIssues(issues: ValidationIssue[]): string[] {
	return issues.map((entry) => `${entry.code}: ${entry.message}`);
}

function healthcheck(): void {
	const checks: Array<{ name: string; ok: boolean; detail: string }> = [];

	const agy = spawnSync("agy", ["--version"], { encoding: "utf8" });
	checks.push({
		name: "agy",
		ok: agy.status === 0,
		detail: (agy.stdout ?? "").trim() || "not found",
	});

	const profilePath = join(REPO_ROOT, "tools", "brand", "profile.md");
	checks.push({
		name: "profile",
		ok: existsSync(profilePath),
		detail: profilePath,
	});

	let evidence: EvidenceRegistry | null = null;
	try {
		evidence = loadEvidence(REPO_ROOT);
	} catch (error) {
		checks.push({ name: "evidence", ok: false, detail: String(error) });
	}
	if (evidence) {
		const publicCount = evidence.claims.filter(
			(claim) => claim.visibility === "public",
		).length;
		checks.push({
			name: "evidence",
			ok: publicCount > 0,
			detail: `${evidence.claims.length} фактов, ${publicCount} публичных`,
		});
	}

	for (const check of checks) {
		console.log(`${check.ok ? "✓" : "✗"} ${check.name}: ${check.detail}`);
	}

	console.log("");
	console.log("Пресеты:");
	for (const [key, preset] of Object.entries(PRESETS)) {
		console.log(
			`  ${key.padEnd(16)} ${preset.surface.padEnd(14)} ${preset.route.productLine}/${preset.route.recipient}/${preset.route.objective}`,
		);
	}

	if (checks.some((check) => !check.ok)) {
		process.exit(1);
	}
}

function post(): void {
	const { plan, topic } = resolvePlan();
	const profile = loadProfile(REPO_ROOT);
	const evidence = loadEvidence(REPO_ROOT);

	const model = arg("--model") ?? DEFAULT_MODEL;
	const timeout = arg("--timeout") ?? DEFAULT_TIMEOUT;
	const extra = arg("--extra");
	const maxRevisions = Number(arg("--max-revisions") ?? "1");

	let prompt = buildPrompt({ plan, topic, profile, evidence, extra });

	if (hasFlag("--dry-run")) {
		const dir = join(RUNS_ROOT, `${timestamp()}-${plan.surface}-dry`);
		mkdirSync(dir, { recursive: true });
		writeFileSync(join(dir, "prompt.md"), prompt);
		console.log(`dry-run: промпт собран → ${join(dir, "prompt.md")}`);
		console.log(
			`маршрут: ${plan.surface} · ${plan.route.productLine}/${plan.route.recipient}/${plan.route.objective}`,
		);
		console.log(
			`правил маршрута: ${plan.rules.length}, фактов: ${evidence.claims.length}`,
		);
		return;
	}

	const attempts: string[] = [];
	let artifact: Artifact | null = null;
	let validation: ReturnType<typeof validateArtifact> | null = null;
	let errors: string[] = [];

	for (let attempt = 0; attempt <= maxRevisions; attempt += 1) {
		const raw = runAgy(prompt, model, timeout);
		attempts.push(raw);

		try {
			const parsed = parseArtifact(raw);
			const result = validateArtifact(parsed, evidence, plan);
			artifact = parsed;
			validation = result;
			if (result.ok) break;
			errors = [
				...formatIssues(result.errors),
				...formatIssues(result.warnings),
			];
		} catch (error) {
			artifact = null;
			validation = null;
			errors = [
				`invalid_json: ${error instanceof Error ? error.message : String(error)}`,
			];
		}

		if (attempt < maxRevisions) {
			console.log(
				`↻ попытка ${attempt + 1} отклонена: ${errors[0] ?? "неизвестно"}`,
			);
			prompt = buildPrompt({
				plan,
				topic,
				profile,
				evidence,
				extra,
				previousErrors: errors,
			});
		}
	}

	if (!artifact || !validation) {
		const dir = join(RUNS_ROOT, `${timestamp()}-${plan.surface}-failed`);
		mkdirSync(dir, { recursive: true });
		writeFileSync(join(dir, "prompt.md"), prompt);
		attempts.forEach((attempt, index) => {
			writeFileSync(join(dir, `attempt-${index + 1}.txt`), attempt);
		});
		writeFileSync(
			join(dir, "errors.json"),
			`${JSON.stringify(errors, null, 2)}\n`,
		);
		fail(`Не удалось получить валидный артефакт. Смотри ${dir}`, 3);
	}

	const dir = writeRun(artifact, validation, evidence, plan, attempts, prompt);

	console.log("");
	console.log(
		validation.ok ? "✓ валидация пройдена" : "✗ валидация не пройдена",
	);
	console.log(
		`  ${validation.stats.chars} символов, ${validation.stats.words} слов, ${validation.stats.emDashes} тире`,
	);
	for (const warning of validation.warnings) {
		console.log(`  ! ${warning.code}: ${warning.message}`);
	}
	for (const error of validation.errors) {
		console.log(`  ✗ ${error.code}: ${error.message}`);
	}
	console.log("");
	console.log(renderMarkdown(artifact, evidence, plan));
	console.log(`\n${dir}`);

	if (!validation.ok) {
		process.exit(2);
	}
}

const command = (process.argv[2] ?? "healthcheck") as Command;
if (command === "healthcheck") {
	healthcheck();
} else if (command === "post") {
	post();
} else {
	fail(`Неизвестная команда: ${command}. Доступны: healthcheck, post`);
}
