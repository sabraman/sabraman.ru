export function getIosClockHubPath() {
	return "/components/ios-clock";
}

export const IOS_CLOCK_URLS = {
	direct: "https://sabraman.ru/r/ios-clock.json",
	registry: "https://sabraman.ru/r/registry.json",
	docs: "https://sabraman.ru/components/ios-clock",
} as const;

export const IOS_CLOCK_INSTALL_COMMANDS = {
	bun: `bunx --bun shadcn@latest add ${IOS_CLOCK_URLS.direct}`,
	npm: `npx shadcn@latest add ${IOS_CLOCK_URLS.direct}`,
	pnpm: `pnpm dlx shadcn@latest add ${IOS_CLOCK_URLS.direct}`,
	yarn: `yarn dlx shadcn@latest add ${IOS_CLOCK_URLS.direct}`,
} as const;

export const IOS_CLOCK_ALIAS_COMMANDS = {
	bun: "bunx --bun shadcn@latest add @sabraman/ios-clock",
	npm: "npx shadcn@latest add @sabraman/ios-clock",
	pnpm: "pnpm dlx shadcn@latest add @sabraman/ios-clock",
	yarn: "yarn dlx shadcn@latest add @sabraman/ios-clock",
} as const;

export const IOS_CLOCK_DOCS_COPY = {
	title: "Legacy iOS Clock",
	summary:
		"A working iOS 6 clock icon component with live hour, minute, and red seconds hands, plus both day and night variants from the legacy UI kit.",
	kicker: "Registry component",
	installDescription:
		"Install the direct item URL for the shortest path, or use the Sabraman registry alias once your components config points at the registry.",
	usageDescription:
		"The component renders a real analog clock instead of a static icon, so the same source can power docs demos, app icons, and standalone time displays.",
} as const;
