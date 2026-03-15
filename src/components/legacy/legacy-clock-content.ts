export function getLegacyClockHubPath() {
	return "/components/legacy-clock";
}

export const LEGACY_CLOCK_URLS = {
	direct: "https://sabraman.ru/r/legacy-clock.json",
	registry: "https://sabraman.ru/r/registry.json",
	docs: "https://sabraman.ru/components/legacy-clock",
} as const;

export const LEGACY_CLOCK_INSTALL_COMMANDS = {
	bun: `bunx --bun shadcn@latest add ${LEGACY_CLOCK_URLS.direct}`,
	npm: `npx shadcn@latest add ${LEGACY_CLOCK_URLS.direct}`,
	pnpm: `pnpm dlx shadcn@latest add ${LEGACY_CLOCK_URLS.direct}`,
	yarn: `yarn dlx shadcn@latest add ${LEGACY_CLOCK_URLS.direct}`,
} as const;

export const LEGACY_CLOCK_ALIAS_COMMANDS = {
	bun: "bunx --bun shadcn@latest add @sabraman/legacy-clock",
	npm: "npx shadcn@latest add @sabraman/legacy-clock",
	pnpm: "pnpm dlx shadcn@latest add @sabraman/legacy-clock",
	yarn: "yarn dlx shadcn@latest add @sabraman/legacy-clock",
} as const;

export const LEGACY_CLOCK_DOCS_COPY = {
	title: "Legacy Clock",
	summary:
		"Live analog time displays, launcher icons, and decorative status surfaces.",
	kicker: "Registry component",
	installDescription:
		"Install the direct item URL for the shortest path, or use the Sabraman registry alias once your components config points at the registry.",
	usageDescription:
		"The component renders a real analog clock instead of a static icon, so the same source can power docs demos, app icons, and standalone time displays.",
} as const;
