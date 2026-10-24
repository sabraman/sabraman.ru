#!/usr/bin/env bun

import { mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const TOOL_ROOT = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(join(TOOL_ROOT, "..", ".."));

const LIMIT = 500;

const CUT_POSTAMBLES = [
	"Хочешь, переформулирую это в более жёстком тоне — прямо под Твиттер? Но сначала продолжение.",
	"Проверяю длину: не влезло. Продолжаю.",
	"Могу собрать короче: 300 знаков без потерь. Но сначала вторая часть.",
	"Как тебе расклад? Что усилить — разберём в следующей части.",
];

const END_POSTAMBLES = [
	"Как тебе расклад? Что усилить?",
	"Хочешь, выкину ещё один пункт для солидности?",
	"Скажи, если нужен вариант под твиттер — сделаю прямо сейчас.",
];

const META_PATTERN =
	/^[([{]|^(пишу|подберу|черновик|всё ещё|считаю|готовлю|добавлю|проверяю|расширяю|продумываю|коротковато|дотянул|допишу|дорабатываю|продолжаю|пилю|замешиваю|навожу)\b|^\d+\s*знаков|^\d{3,4}\s*[—-]/i;

interface Block {
	text: string;
	meta: boolean;
}

function blocksOf(text: string): Block[] {
	return text
		.split(/\n\s*\n/)
		.map((chunk) => chunk.trim())
		.filter(Boolean)
		.map((text) => ({
			text,
			meta: META_PATTERN.test(text.replace(/\n/g, " ")),
		}));
}

function chars(text: string): number {
	return [...text].length;
}

function split(text: string): string[][] {
	const source = blocksOf(text);
	const parts: string[][] = [];
	let current: string[] = [];
	let currentLen = 0;
	let metaBuffer: string[] = [];

	const flush = () => {
		if (current.length > 0) parts.push(current);
		current = [];
		currentLen = 0;
	};

	for (const block of source) {
		if (block.meta) {
			metaBuffer.push(block.text);
			continue;
		}
		const blockLen = chars(block.text);
		if (currentLen > 0 && currentLen + blockLen + 20 > LIMIT) {
			flush();
		}
		if (current.length === 0) {
			current.push(...metaBuffer);
			metaBuffer = [];
		}
		current.push(block.text);
		currentLen += blockLen;
	}
	if (metaBuffer.length > 0 && parts.length > 0) {
		// остаточные мета-ремарки присоединяем к последней части
		current.push(...metaBuffer);
		metaBuffer = [];
	}
	flush();

	// мелкие части доклеиваем к соседним, чтобы не плодить обрывки
	const merged: string[][] = [];
	for (const part of parts.map((entry) =>
		entry.filter((item) => item.trim().length > 0),
	)) {
		const size = chars(part.join(" "));
		const last = merged[merged.length - 1];
		if (size < 120 && last) {
			last.push(...part);
		} else {
			merged.push(part);
		}
	}
	return merged;
}

function render(text: string): string {
	const parts = split(text).filter((part) => part.length > 0);
	const total = parts.length;
	let cutIndex = 0;
	const rendered = parts.map((part, index) => {
		let body = part.join("\n\n");
		const firstLine = `${index + 1}/${total} · ${body.split("\n")[0]}`;
		body = [firstLine, ...body.split("\n").slice(1)].join("\n");
		if (index < total - 1) {
			const postamble = CUT_POSTAMBLES[cutIndex % CUT_POSTAMBLES.length];
			cutIndex += 1;
			body = `${body}\n\n${postamble}`;
		} else if (!/\?\s*$/m.test(body) && !/делите[сья]*|коммент/i.test(body)) {
			body = `${body}\n\n${END_POSTAMBLES[0]}`;
		}
		return body;
	});
	return rendered.join("\n\n---\n\n");
}

function main(): void {
	const inputs = process.argv.slice(2);
	const files: string[] = [];
	for (const entry of inputs) {
		try {
			for (const name of readdirSync(entry)) {
				if (name.endsWith(".txt")) files.push(join(entry, name));
			}
		} catch {
			files.push(entry);
		}
	}
	if (files.length === 0) {
		console.error("usage: bun tools/brand/split.ts <file|dir> ...");
		process.exit(1);
	}

	const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
	const outDir = join(REPO_ROOT, "content", "slop", `split-${stamp}`);
	mkdirSync(outDir, { recursive: true });

	for (const file of files) {
		const text = readFileSync(file, "utf8");
		const rendered = render(text);
		const name = `${basename(file, ".txt")}.split.md`;
		writeFileSync(join(outDir, name), `${rendered}\n`);
		const partCount = rendered.split(/\n\n---\n\n/).length;
		console.log(`${name}: ${partCount} ч.`);
	}
	console.log(`\n${outDir}`);
}

main();
