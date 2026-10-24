import { createHash } from "node:crypto";
import { createReadStream, existsSync } from "node:fs";
import {
	copyFile,
	mkdir,
	readFile,
	readdir,
	writeFile,
} from "node:fs/promises";
import path from "node:path";

const SOURCE =
	process.env.OLDOS_SOURCE ??
	"/var/folders/4f/xf504j5d6j5b_4_q2v217n2h0000gn/T/opencode/oldos/OldOS/OldOS/Assets.xcassets";
const TARGET = path.resolve("public/oldos");
const DRY_RUN = process.argv.includes("--dry-run");

const slug = (name) =>
	name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

const scaleRank = { "1x": 1, "2x": 2, "3x": 3 };

async function* walk(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(full);
		else yield full;
	}
}

async function fileHash(file) {
	return new Promise((resolve, reject) => {
		const hash = createHash("sha256");
		createReadStream(file)
			.on("data", (chunk) => hash.update(chunk))
			.on("end", () => resolve(hash.digest("hex")))
			.on("error", reject);
	});
}

let copied = 0;
let skipped = 0;
const errors = [];

for await (const contentsPath of walk(SOURCE)) {
	if (
		path.basename(contentsPath) !== "Contents.json" ||
		!contentsPath.includes(".imageset")
	)
		continue;

	const imagesetDir = path.dirname(contentsPath);
	const setName = path.basename(imagesetDir, ".imageset");
	const groupDir = path.basename(path.dirname(imagesetDir));
	const group = slug(groupDir);

	let manifest;
	try {
		manifest = JSON.parse(await readFile(contentsPath, "utf8"));
	} catch {
		errors.push(`bad json: ${contentsPath}`);
		continue;
	}

	const candidates = manifest.images
		.filter(
			(img) => img.filename && existsSync(path.join(imagesetDir, img.filename)),
		)
		.sort((a, b) => (scaleRank[b.scale] ?? 1) - (scaleRank[a.scale] ?? 1));

	if (candidates.length === 0) {
		skipped++;
		continue;
	}

	const best = candidates[0];
	const sourceFile = path.join(imagesetDir, best.filename);
	const ext = path.extname(best.filename).toLowerCase() || ".png";
	const outDir = path.join(TARGET, group);
	const outFile = path.join(outDir, `${slug(setName)}${ext}`);

	if (DRY_RUN) {
		copied++;
		continue;
	}

	await mkdir(outDir, { recursive: true });
	if (existsSync(outFile)) {
		const [existing, incoming] = await Promise.all([
			fileHash(outFile),
			fileHash(sourceFile),
		]);
		if (existing === incoming) {
			skipped++;
			continue;
		}
	}
	await copyFile(sourceFile, outFile);
	copied++;
}

if (!DRY_RUN) {
	await writeFileIndex();
}

async function writeFileIndex() {
	const groups = {};
	for (const group of await readdir(TARGET, { withFileTypes: true })) {
		if (!group.isDirectory()) continue;
		groups[group.name] = (await readdir(path.join(TARGET, group.name))).sort();
	}
	await writeFile(
		path.join(process.cwd(), "src/components/oldos/assets.generated.json"),
		`${JSON.stringify(groups, null, "\t")}\n`,
	);
}

console.log(
	`copied: ${copied}, skipped (missing/duplicate): ${skipped}, errors: ${errors.length}`,
);
if (errors.length > 0) console.log(errors.slice(0, 10).join("\n"));
