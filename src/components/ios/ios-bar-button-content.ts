export function getIosBarButtonHubPath() {
	return "/components/ios-bar-button";
}

export const IOS_BAR_BUTTON_URLS = {
	direct: "https://sabraman.ru/r/ios-bar-button.json",
	registry: "https://sabraman.ru/r/registry.json",
	docs: "https://sabraman.ru/components/ios-bar-button",
} as const;

export const IOS_BAR_BUTTON_INSTALL_COMMANDS = {
	bun: `bunx --bun shadcn@latest add ${IOS_BAR_BUTTON_URLS.direct}`,
	npm: `npx shadcn@latest add ${IOS_BAR_BUTTON_URLS.direct}`,
	pnpm: `pnpm dlx shadcn@latest add ${IOS_BAR_BUTTON_URLS.direct}`,
	yarn: `yarn dlx shadcn@latest add ${IOS_BAR_BUTTON_URLS.direct}`,
} as const;

export const IOS_BAR_BUTTON_ALIAS_COMMANDS = {
	bun: "bunx --bun shadcn@latest add @sabraman/ios-bar-button",
	npm: "npx shadcn@latest add @sabraman/ios-bar-button",
	pnpm: "pnpm dlx shadcn@latest add @sabraman/ios-bar-button",
	yarn: "yarn dlx shadcn@latest add @sabraman/ios-bar-button",
} as const;

export const IOS_BAR_BUTTON_DOCS_COPY = {
	title: "iOS 6 Bar Button",
	summary:
		"Classic iOS 6 navigation bar button with default, accent, destructive, icon, text-icon, and backward layouts.",
	kicker: "Registry component",
	installDescription:
		"Install the standalone button if you want the navigation chrome without pulling in larger composed controls.",
	usageDescription:
		"Use the shared component for toolbar actions, modal controls, and install surfaces so every clickable control keeps the same iOS 6 gradients and keylines.",
} as const;
