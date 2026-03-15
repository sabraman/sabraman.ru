import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = process.cwd();

const SOURCE_REPLACEMENTS = [
	['from "~/', 'from "@/'],
	["from '~/", "from '@/"],
	[
		'from "../legacy-bar-button/legacy-bar-button"',
		'from "@/components/legacy-bar-button"',
	],
	[
		'from "../legacy-segmented-control/legacy-segmented-control"',
		'from "@/components/legacy-segmented-control"',
	],
] as const;

export function resolveRepoFile(relativePath: string) {
	const absolutePath = path.resolve(REPO_ROOT, relativePath);

	if (
		absolutePath !== REPO_ROOT &&
		!absolutePath.startsWith(`${REPO_ROOT}${path.sep}`)
	) {
		throw new Error(`Refusing to read file outside the repo: ${relativePath}`);
	}

	return absolutePath;
}

export function readRepoFile(relativePath: string) {
	return fs.readFileSync(resolveRepoFile(relativePath), "utf8");
}

export function readRepoFileForDocs(relativePath: string) {
	return normalizeSourceForDocs(readRepoFile(relativePath));
}

export function getCodeLanguage(relativePath: string) {
	const extension = path.extname(relativePath).slice(1);

	return extension || "text";
}

export function getCodeTitle(relativePath: string, title?: string) {
	return title ?? relativePath;
}

function normalizeSourceForDocs(source: string) {
	return SOURCE_REPLACEMENTS.reduce(
		(currentSource, [from, to]) => currentSource.replaceAll(from, to),
		source,
	);
}
