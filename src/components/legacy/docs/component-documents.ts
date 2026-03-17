import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { z } from "zod";

import {
	type ComponentDocSlug,
	isComponentDocSlug,
} from "~/components/legacy/docs/component-doc-paths";

const DOCS_DIRECTORY = path.join(process.cwd(), "src/content/components");

const componentDocFrontmatterSchema = z.object({
	description: z.string().min(1),
	kicker: z.string().min(1),
	keywords: z.array(z.string().min(1)).min(1),
	order: z.number().int().nonnegative(),
	title: z.string().min(1),
	updatedAt: z
		.string()
		.min(1)
		.refine((value) => !Number.isNaN(Date.parse(value)), {
			message: "updatedAt must be a valid date string",
		}),
});

export type ComponentDocFrontmatter = z.infer<
	typeof componentDocFrontmatterSchema
>;

export interface ComponentDoc {
	content: string;
	filePath: string;
	frontmatter: ComponentDocFrontmatter;
	slug: ComponentDocSlug;
}

export const getAllComponentDocs = cache(() => {
	return fs
		.readdirSync(DOCS_DIRECTORY)
		.filter((fileName) => path.extname(fileName) === ".mdx")
		.map((fileName) => readComponentDoc(fileName))
		.sort((firstDoc, secondDoc) => {
			return firstDoc.frontmatter.order - secondDoc.frontmatter.order;
		});
});

export function getComponentDocBySlug(slug: string) {
	return getAllComponentDocs().find((doc) => doc.slug === slug);
}

export function getComponentDocNeighbours(slug: ComponentDocSlug) {
	const docs = getAllComponentDocs();
	const index = docs.findIndex((doc) => doc.slug === slug);

	if (index === -1) {
		return {
			next: null,
			previous: null,
		};
	}

	return {
		next: docs[index + 1] ?? null,
		previous: docs[index - 1] ?? null,
	};
}

function readComponentDoc(fileName: string): ComponentDoc {
	const filePath = path.join(DOCS_DIRECTORY, fileName);
	const slug = path.basename(fileName, path.extname(fileName));

	if (!isComponentDocSlug(slug)) {
		throw new Error(`Unsupported component doc slug: ${slug}`);
	}

	const rawFile = fs.readFileSync(filePath, "utf8");
	const parsedFile = matter(rawFile);
	const frontmatter = componentDocFrontmatterSchema.parse(parsedFile.data);

	return {
		content: parsedFile.content.trim(),
		filePath,
		frontmatter,
		slug,
	};
}
