import { cache } from "react";

import { readRepoFile } from "~/components/legacy/docs/component-doc-source";

export interface ComponentTypeTableRow {
	name: string;
	required: boolean;
	type: string;
}

export interface ComponentTypeTableData {
	extendsTypes: string[];
	rows: ComponentTypeTableRow[];
}

export const getComponentTypeTable = cache(
	(relativePath: string, exportName: string): ComponentTypeTableData => {
		const source = readRepoFile(relativePath);

		const interfaceMatch = source.match(
			new RegExp(
				`export\\s+interface\\s+${escapeRegExp(exportName)}(?:<[^>{}]+>)?(?:\\s+extends\\s+([^{]+))?\\s*\\{`,
				"m",
			),
		);

		if (interfaceMatch) {
			const bodyStart = getMatchStartIndex(interfaceMatch);
			const body = extractBlock(source, bodyStart);

			return {
				extendsTypes: interfaceMatch[1]
					? interfaceMatch[1]
							.split(",")
							.map((value) => value.trim())
							.filter(Boolean)
					: [],
				rows: parsePropertyRows(body),
			};
		}

		const typeAliasMatch = source.match(
			new RegExp(
				`export\\s+type\\s+${escapeRegExp(exportName)}(?:<[^>{}]+>)?\\s*=\\s*\\{`,
				"m",
			),
		);

		if (typeAliasMatch) {
			const bodyStart = getMatchStartIndex(typeAliasMatch);
			const body = extractBlock(source, bodyStart);

			return {
				extendsTypes: [],
				rows: parsePropertyRows(body),
			};
		}

		throw new Error(
			`Could not find exported interface or type alias "${exportName}" in ${relativePath}`,
		);
	},
);

function escapeRegExp(value: string) {
	return value.replaceAll(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getMatchStartIndex(match: RegExpMatchArray) {
	const matchIndex = match.index;

	if (typeof matchIndex !== "number") {
		throw new Error(
			"Could not determine the match position in the source file",
		);
	}

	return matchIndex + match[0].length - 1;
}

function extractBlock(source: string, openingBraceIndex: number) {
	let depth = 0;

	for (let index = openingBraceIndex; index < source.length; index += 1) {
		const character = source[index];

		if (character === "{") {
			depth += 1;
			continue;
		}

		if (character === "}") {
			depth -= 1;

			if (depth === 0) {
				return source.slice(openingBraceIndex + 1, index);
			}
		}
	}

	throw new Error("Failed to locate the closing brace for the type block");
}

function parsePropertyRows(blockBody: string): ComponentTypeTableRow[] {
	return splitTopLevelMembers(stripComments(blockBody))
		.map((member) => member.trim())
		.filter(Boolean)
		.map(parsePropertyRow)
		.filter((row): row is ComponentTypeTableRow => row !== null);
}

function splitTopLevelMembers(blockBody: string) {
	const members: string[] = [];
	let currentMember = "";
	let parenDepth = 0;
	let braceDepth = 0;
	let bracketDepth = 0;
	let angleDepth = 0;

	for (const character of blockBody) {
		if (character === "(") {
			parenDepth += 1;
		} else if (character === ")") {
			parenDepth = Math.max(parenDepth - 1, 0);
		} else if (character === "{") {
			braceDepth += 1;
		} else if (character === "}") {
			braceDepth = Math.max(braceDepth - 1, 0);
		} else if (character === "[") {
			bracketDepth += 1;
		} else if (character === "]") {
			bracketDepth = Math.max(bracketDepth - 1, 0);
		} else if (character === "<") {
			angleDepth += 1;
		} else if (character === ">") {
			angleDepth = Math.max(angleDepth - 1, 0);
		}

		if (
			character === ";" &&
			parenDepth === 0 &&
			braceDepth === 0 &&
			bracketDepth === 0 &&
			angleDepth === 0
		) {
			members.push(currentMember);
			currentMember = "";
			continue;
		}

		currentMember += character;
	}

	if (currentMember.trim()) {
		members.push(currentMember);
	}

	return members;
}

function stripComments(source: string) {
	return source.replaceAll(/\/\/.*$/gm, "").trim();
}

function parsePropertyRow(member: string): ComponentTypeTableRow | null {
	const normalizedMember = member.trim();

	if (
		!normalizedMember ||
		normalizedMember.startsWith("[") ||
		normalizedMember.startsWith("...")
	) {
		return null;
	}

	const separatorIndex = findTopLevelColonIndex(normalizedMember);

	if (separatorIndex === -1) {
		return null;
	}

	const rawName = normalizedMember.slice(0, separatorIndex).trim();
	const type = normalizedMember.slice(separatorIndex + 1).trim();

	if (!rawName || !type) {
		return null;
	}

	const required = !rawName.endsWith("?");
	const name = rawName.replace(/\?$/, "").replace(/^["']|["']$/g, "");

	return {
		name,
		required,
		type: type.replaceAll(/\s+/g, " ").trim(),
	};
}

function findTopLevelColonIndex(value: string) {
	let parenDepth = 0;
	let braceDepth = 0;
	let bracketDepth = 0;
	let angleDepth = 0;

	for (let index = 0; index < value.length; index += 1) {
		const character = value[index];

		if (character === "(") {
			parenDepth += 1;
		} else if (character === ")") {
			parenDepth = Math.max(parenDepth - 1, 0);
		} else if (character === "{") {
			braceDepth += 1;
		} else if (character === "}") {
			braceDepth = Math.max(braceDepth - 1, 0);
		} else if (character === "[") {
			bracketDepth += 1;
		} else if (character === "]") {
			bracketDepth = Math.max(bracketDepth - 1, 0);
		} else if (character === "<") {
			angleDepth += 1;
		} else if (character === ">") {
			angleDepth = Math.max(angleDepth - 1, 0);
		} else if (
			character === ":" &&
			parenDepth === 0 &&
			braceDepth === 0 &&
			bracketDepth === 0 &&
			angleDepth === 0
		) {
			return index;
		}
	}

	return -1;
}
