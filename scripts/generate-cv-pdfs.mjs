import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const publicDir = resolve(projectRoot, "public");

const typstExecutable = existsSync(
	resolve(projectRoot, "node_modules/.bin/typst"),
)
	? resolve(projectRoot, "node_modules/.bin/typst")
	: "typst";

const jobs = [
	{
		source: resolve(publicDir, "DANYA_YUDIN_CV.typ"),
		output: resolve(publicDir, "DANYA_YUDIN_CV.pdf"),
		name: "English CV",
	},
	{
		source: resolve(publicDir, "DANYA_YUDIN_CV_RU.typ"),
		output: resolve(publicDir, "DANYA_YUDIN_CV_RU.pdf"),
		name: "Russian CV",
	},
];

console.log(`Using Typst binary: ${typstExecutable}`);

for (const job of jobs) {
	if (!existsSync(job.source)) {
		throw new Error(`Source Typst file not found: ${job.source}`);
	}

	console.log(
		`Compiling ${job.name} (${basename(job.source)} -> ${basename(job.output)})...`,
	);

	try {
		await execFileAsync(typstExecutable, ["compile", job.source, job.output], {
			cwd: projectRoot,
			maxBuffer: 10 * 1024 * 1024,
		});

		const stats = await stat(job.output);
		console.log(
			`✓ Successfully generated ${basename(job.output)} (${(stats.size / 1024).toFixed(1)} KB)`,
		);
	} catch (error) {
		console.error(`Failed to compile ${job.name}:`, error.message);
		throw error;
	}
}

console.log("All CV PDFs compiled cleanly.");
