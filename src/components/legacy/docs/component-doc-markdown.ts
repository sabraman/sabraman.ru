import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";

import {
	getComponentDocConfig,
	getComponentDocPreview,
	isComponentDocPreviewName,
} from "~/components/legacy/docs/component-doc-config";
import {
	type ComponentDocSlug,
	resolveComponentDocSlug,
} from "~/components/legacy/docs/component-doc-paths";
import {
	getCodeLanguage,
	getCodeTitle,
	readRepoFileForDocs,
} from "~/components/legacy/docs/component-doc-source";
import { getComponentTypeTable } from "~/components/legacy/docs/component-doc-type-table";
import type { ComponentDoc } from "~/components/legacy/docs/component-documents";

const PACKAGE_MANAGER_LABELS = {
	bun: "Bun",
	npm: "npm",
	pnpm: "pnpm",
	yarn: "Yarn",
} as const;

interface MarkdownNode {
	type: string;
	children?: MarkdownNode[];
	[key: string]: unknown;
}

interface MarkdownParentNode extends MarkdownNode {
	children: MarkdownNode[];
}

interface MarkdownCodeNode extends MarkdownNode {
	type: "code";
	lang?: string;
	meta?: string;
	value: string;
}

interface MarkdownHeadingNode extends MarkdownNode {
	type: "heading";
	children: MarkdownNode[];
	depth: number;
}

interface MarkdownParagraphNode extends MarkdownNode {
	type: "paragraph";
	children: MarkdownNode[];
}

interface MarkdownTableCellNode extends MarkdownNode {
	type: "tableCell";
	children: MarkdownNode[];
}

interface MarkdownTableRowNode extends MarkdownNode {
	type: "tableRow";
	children: MarkdownTableCellNode[];
}

interface MarkdownTableNode extends MarkdownNode {
	type: "table";
	align: Array<"left" | "center" | "right">;
	children: MarkdownTableRowNode[];
}

interface MarkdownMdxAttribute {
	name?: string;
	value?: unknown;
}

interface MarkdownMdxNode extends MarkdownNode {
	type: "mdxJsxFlowElement" | "mdxJsxTextElement";
	attributes?: MarkdownMdxAttribute[];
	children?: MarkdownNode[];
	name?: string;
}

export async function renderComponentDocMarkdown(doc: ComponentDoc) {
	const processor = remark()
		.use(remarkGfm)
		.use(remarkMdx)
		.use(remarkComponentDocExport, {
			slug: doc.slug,
		});

	const processedDocument = await processor.process(doc.content);

	return [
		`# ${doc.frontmatter.title}`,
		doc.frontmatter.description,
		String(processedDocument).trim(),
		`Last updated on ${formatDocDate(doc.frontmatter.updatedAt)}`,
	]
		.filter(Boolean)
		.join("\n\n")
		.trim();
}

function remarkComponentDocExport({ slug }: { slug: ComponentDocSlug }) {
	return (tree: MarkdownNode) => {
		visit(tree, (node: unknown, index: number | undefined, parent: unknown) => {
			if (!isMarkdownParentNode(parent) || typeof index !== "number") {
				return;
			}

			if (!isMarkdownMdxNode(node)) {
				return;
			}

			if (node.name === "ComponentSource") {
				const src = getAttributeValue(node, "src");
				const title = getAttributeValue(node, "title");

				if (!src) {
					return;
				}

				replaceNode(parent, index, [createCodeNode(src, title)]);
				return index;
			}

			if (node.name === "ComponentPreview") {
				const name = getAttributeValue(node, "name");

				if (!name || !isComponentDocPreviewName(name)) {
					return;
				}

				const preview = getComponentDocPreview(name);
				replaceNode(parent, index, [
					createCodeNode(preview.sourcePath, preview.codeTitle),
				]);
				return index;
			}

			if (node.name === "InstallCommand") {
				const component = resolveComponentDocSlug(
					getAttributeValue(node, "component"),
					slug,
				);
				const config = getComponentDocConfig(component);
				const installNodes = Object.entries(config.installCommands).flatMap(
					([packageManager, command]) => {
						if (!command) {
							return [];
						}

						return [
							createHeadingNode(
								3,
								PACKAGE_MANAGER_LABELS[
									packageManager as keyof typeof PACKAGE_MANAGER_LABELS
								],
							),
							createLiteralCodeNode("bash", command),
						];
					},
				);

				replaceNode(parent, index, installNodes);
				return index;
			}

			if (node.name === "AutoTypeTable") {
				const exportName = getAttributeValue(node, "name");
				const sourcePath = getAttributeValue(node, "path");

				if (!exportName || !sourcePath) {
					return;
				}

				const typeTable = getComponentTypeTable(sourcePath, exportName);
				const replacementNodes: MarkdownNode[] = [];

				if (typeTable.extendsTypes.length) {
					replacementNodes.push(
						createParagraphNode(
							`Also inherits: ${typeTable.extendsTypes.join(", ")}`,
						),
					);
				}

				replacementNodes.push(createTableNode(typeTable.rows));
				replaceNode(parent, index, replacementNodes);
				return index;
			}

			if (node.name === "Steps") {
				replaceNode(parent, index, node.children ?? []);
				return index;
			}

			if (node.name === "Step") {
				replaceNode(parent, index, [
					{
						children: node.children ?? [],
						depth: 3,
						type: "heading",
					},
				]);
				return index;
			}
		});
	};
}

function isMarkdownParentNode(node: unknown): node is MarkdownParentNode {
	return (
		typeof node === "object" &&
		node !== null &&
		Array.isArray((node as MarkdownParentNode).children)
	);
}

function isMarkdownMdxNode(node: unknown): node is MarkdownMdxNode {
	if (typeof node !== "object" || node === null) {
		return false;
	}

	return (
		(node as MarkdownNode).type === "mdxJsxFlowElement" ||
		(node as MarkdownNode).type === "mdxJsxTextElement"
	);
}

function getAttributeValue(node: MarkdownMdxNode, name: string) {
	const attribute = node.attributes?.find((item) => item.name === name);

	if (!attribute) {
		return undefined;
	}

	return typeof attribute.value === "string" ? attribute.value : undefined;
}

function replaceNode(
	parent: MarkdownParentNode,
	index: number,
	nextNodes: MarkdownNode[],
) {
	parent.children.splice(index, 1, ...nextNodes);
}

function createCodeNode(
	relativePath: string,
	title?: string,
): MarkdownCodeNode {
	return {
		lang: getCodeLanguage(relativePath),
		meta: title ? `title="${getCodeTitle(relativePath, title)}"` : undefined,
		type: "code",
		value: readRepoFileForDocs(relativePath).trimEnd(),
	};
}

function createLiteralCodeNode(
	language: string,
	value: string,
): MarkdownCodeNode {
	return {
		lang: language,
		type: "code",
		value,
	};
}

function createHeadingNode(depth: number, value: string): MarkdownHeadingNode {
	return {
		children: [{ type: "text", value }],
		depth,
		type: "heading",
	};
}

function createParagraphNode(value: string): MarkdownParagraphNode {
	return {
		children: [{ type: "text", value }],
		type: "paragraph",
	};
}

function createTableNode(
	rows: Array<{
		name: string;
		required: boolean;
		type: string;
	}>,
): MarkdownTableNode {
	return {
		align: ["left", "left", "left"],
		children: [
			createTableRow(["Prop", "Type", "Required"]),
			...rows.map((row) =>
				createTableRow([row.name, row.type, row.required ? "Yes" : "No"]),
			),
		],
		type: "table",
	};
}

function createTableRow(values: string[]): MarkdownTableRowNode {
	return {
		children: values.map((value) => ({
			children: [{ type: "text", value }],
			type: "tableCell",
		})),
		type: "tableRow",
	};
}

function formatDocDate(value: string) {
	return new Intl.DateTimeFormat("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(value));
}
