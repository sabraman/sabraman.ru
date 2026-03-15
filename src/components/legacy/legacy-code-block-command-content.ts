export function getLegacyCodeBlockCommandHubPath() {
	return "/components/legacy-code-block-command";
}

export const LEGACY_CODE_BLOCK_COMMAND_URLS = {
	direct: "https://sabraman.ru/r/legacy-code-block-command.json",
	registry: "https://sabraman.ru/r/registry.json",
	docs: "https://sabraman.ru/components/legacy-code-block-command",
} as const;

export const LEGACY_CODE_BLOCK_COMMAND_INSTALL_COMMANDS = {
	bun: `bunx --bun shadcn@latest add ${LEGACY_CODE_BLOCK_COMMAND_URLS.direct}`,
	npm: `npx shadcn@latest add ${LEGACY_CODE_BLOCK_COMMAND_URLS.direct}`,
	pnpm: `pnpm dlx shadcn@latest add ${LEGACY_CODE_BLOCK_COMMAND_URLS.direct}`,
	yarn: `yarn dlx shadcn@latest add ${LEGACY_CODE_BLOCK_COMMAND_URLS.direct}`,
} as const;

export const LEGACY_CODE_BLOCK_COMMAND_ALIAS_COMMANDS = {
	bun: "bunx --bun shadcn@latest add @sabraman/legacy-code-block-command",
	npm: "npx shadcn@latest add @sabraman/legacy-code-block-command",
	pnpm: "pnpm dlx shadcn@latest add @sabraman/legacy-code-block-command",
	yarn: "yarn dlx shadcn@latest add @sabraman/legacy-code-block-command",
} as const;

export const LEGACY_CODE_BLOCK_COMMAND_USAGE_SNIPPET = `"use client";

import {
  convertNpmCommand,
  LegacyCodeBlockCommand,
} from "@/components/legacy-code-block-command";

export function InstallCommandCard() {
  return (
    <LegacyCodeBlockCommand
      initialPackageManager="bun"
      {...convertNpmCommand("npx shadcn@latest add https://sabraman.ru/r/legacy-switch.json")}
    />
  );
}`;

export const LEGACY_CODE_BLOCK_COMMAND_DOCS_COPY = {
	title: "Legacy Code Block Command",
	summary:
		"Install snippets and command surfaces with built-in package-manager switching.",
	kicker: "Registry component",
	installDescription:
		"Install the direct item URL or use the Sabraman alias. The component is self-contained, so consumers do not need extra helper hooks or tab primitives.",
	usageDescription:
		"Pass one or more package-manager commands directly, or use convertNpmCommand to generate the full bun, npm, pnpm, and yarn set from a single npm-style command.",
} as const;
