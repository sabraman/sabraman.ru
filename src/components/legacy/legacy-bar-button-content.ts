export function getLegacyBarButtonHubPath() {
	return "/components/legacy-bar-button";
}

export const LEGACY_BAR_BUTTON_URLS = {
	direct: "https://sabraman.ru/r/legacy-bar-button.json",
	registry: "https://sabraman.ru/r/registry.json",
	docs: "https://sabraman.ru/components/legacy-bar-button",
} as const;

export const LEGACY_BAR_BUTTON_INSTALL_COMMANDS = {
	bun: `bunx --bun shadcn@latest add ${LEGACY_BAR_BUTTON_URLS.direct}`,
	npm: `npx shadcn@latest add ${LEGACY_BAR_BUTTON_URLS.direct}`,
	pnpm: `pnpm dlx shadcn@latest add ${LEGACY_BAR_BUTTON_URLS.direct}`,
	yarn: `yarn dlx shadcn@latest add ${LEGACY_BAR_BUTTON_URLS.direct}`,
} as const;

export const LEGACY_BAR_BUTTON_ALIAS_COMMANDS = {
	bun: "bunx --bun shadcn@latest add @sabraman/legacy-bar-button",
	npm: "npx shadcn@latest add @sabraman/legacy-bar-button",
	pnpm: "pnpm dlx shadcn@latest add @sabraman/legacy-bar-button",
	yarn: "yarn dlx shadcn@latest add @sabraman/legacy-bar-button",
} as const;

export const LEGACY_BAR_BUTTON_DOCS_COPY = {
	title: "Legacy Bar Button",
	summary:
		"Toolbar actions, back navigation, and compact calls to action with classic legacy chrome.",
	kicker: "Registry component",
	installDescription:
		"Install the standalone button if you want the navigation chrome without pulling in larger composed controls.",
	usageDescription:
		"Use the shared component for toolbar actions, modal controls, and install surfaces so every clickable control keeps the same legacy gradients and keylines.",
} as const;
