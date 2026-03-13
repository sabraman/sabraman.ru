import { execFile } from "node:child_process";
import {
	mkdir,
	mkdtemp,
	readdir,
	readFile,
	rm,
	writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { markdownToTypstCode } from "@mdpdf/mdpdf";

const execFileAsync = promisify(execFile);
const PAGE_BREAK_MARKER = "<!-- PAGEBREAK -->";
const MDPDF_PREAMBLE_PATTERN =
	/^(?<preamble>[\s\S]*?#show ref:[^\n]*\n)(?:\n*)(?<body>[\s\S]*)$/;
const RESUME_PAGE_SETUP =
	'#set page("a4", margin: (top: 0.52in, right: 0.62in, bottom: 0.58in, left: 0.62in))';
const RESUME_FONT_SETUP =
	'#set text(font: ("Helvetica Neue", "Arial", "PT Sans"))';
const RESUME_TEXT_SETUP =
	"#set text(size: 11pt)\n#set par(justify: false, leading: 0.62em)";
const RESUME_HEADING_SETUP =
	"#show heading.where(level: 1): set block(above: 0.2em, below: 0.4em)\n#show heading.where(level: 2): set block(above: 0.5em, below: 0.32em)\n#show heading.where(level: 3): set block(above: 0.7em, below: 0.3em)";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");

const publicDir = resolve(projectRoot, "public");
const entries = await readdir(publicDir);
const jobs = entries
	.filter(
		(entry) =>
			entry.startsWith("DANYA_YUDIN_CV") &&
			extname(entry).toLowerCase() === ".md",
	)
	.map((entry) => ({
		source: `public/${entry}`,
		output: `public/${basename(entry, ".md")}.pdf`,
	}));

function splitTypstDocument(typstCode) {
	const match = typstCode.match(MDPDF_PREAMBLE_PATTERN);

	if (!match?.groups?.preamble || !match?.groups?.body) {
		throw new Error(
			"Unable to split mdpdf Typst output into preamble and body.",
		);
	}

	return {
		preamble: match.groups.preamble.trimEnd(),
		body: match.groups.body.trim(),
	};
}

function applyResumeTheme(preamble) {
	return preamble
		.replace(
			'#set page("us-letter", margin: (top: 1in, right: 1in, bottom: 1in, left: 1in))',
			RESUME_PAGE_SETUP,
		)
		.replace('#set text(font: "Libertinus Serif")', RESUME_FONT_SETUP)
		.replace("#set text(size: 13pt)", RESUME_TEXT_SETUP)
		.replace(
			"#show heading.where(level: 1): set block(below: 0.8em)\n#show heading.where(level: 2): set block(below: 0.7em)",
			RESUME_HEADING_SETUP,
		);
}

async function renderResumePdf(markdown, outputPath) {
	const sections = markdown
		.split(PAGE_BREAK_MARKER)
		.map((section) => section.trim())
		.filter(Boolean);
	const typstSections = [];
	let themedPreamble = "";

	for (const [index, section] of sections.entries()) {
		const typstCode = await markdownToTypstCode(section);
		const { preamble, body } = splitTypstDocument(typstCode);

		if (index === 0) {
			themedPreamble = applyResumeTheme(preamble);
		}

		typstSections.push(body);
	}

	const document = `${themedPreamble}\n\n${typstSections
		.map((body, index) =>
			index === 0 ? body : `#pagebreak(weak: true)\n\n${body}`,
		)
		.join("\n\n")}\n`;
	const tempDir = await mkdtemp(join(tmpdir(), "cv-typst-"));
	const tempTypstPath = resolve(tempDir, `${basename(outputPath, ".pdf")}.typ`);

	try {
		await writeFile(tempTypstPath, document);
		await execFileAsync(
			"bun",
			["x", "typst", "compile", tempTypstPath, outputPath],
			{
				cwd: projectRoot,
				maxBuffer: 10 * 1024 * 1024,
			},
		);
	} finally {
		await rm(tempDir, { recursive: true, force: true });
	}
}

for (const job of jobs) {
	const sourcePath = resolve(projectRoot, job.source);
	const outputPath = resolve(projectRoot, job.output);
	const markdown = await readFile(sourcePath, "utf8");

	await mkdir(dirname(outputPath), { recursive: true });
	await renderResumePdf(markdown, outputPath);

	console.log(`Generated ${job.output}`);
}
