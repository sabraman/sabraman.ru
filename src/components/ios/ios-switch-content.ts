export function getIosSwitchHubPath() {
	return "/components/ios-switch";
}

export const IOS_SWITCH_URLS = {
	direct: "https://sabraman.ru/r/ios-switch.json",
	registry: "https://sabraman.ru/r/registry.json",
	docs: "https://sabraman.ru/components/ios-switch",
} as const;

export const IOS_SWITCH_INSTALL_COMMANDS = {
	bun: `bunx --bun shadcn@latest add ${IOS_SWITCH_URLS.direct}`,
	npm: `npx shadcn@latest add ${IOS_SWITCH_URLS.direct}`,
	pnpm: `pnpm dlx shadcn@latest add ${IOS_SWITCH_URLS.direct}`,
	yarn: `yarn dlx shadcn@latest add ${IOS_SWITCH_URLS.direct}`,
} as const;

export const IOS_SWITCH_ALIAS_COMMANDS = {
	bun: "bunx --bun shadcn@latest add @sabraman/ios-switch",
	npm: "npx shadcn@latest add @sabraman/ios-switch",
	pnpm: "pnpm dlx shadcn@latest add @sabraman/ios-switch",
	yarn: "yarn dlx shadcn@latest add @sabraman/ios-switch",
} as const;

export const IOS_SWITCH_USAGE_SNIPPET = `"use client";

import { useState } from "react";

import { IosSwitch } from "@/components/ios-switch";

export function NotificationsToggle() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex items-center gap-4">
      <IosSwitch
        aria-label="Notifications"
        checked={enabled}
        onCheckedChange={setEnabled}
      />
      <span className="font-medium text-sm">
        {enabled ? "Notifications enabled" : "Notifications disabled"}
      </span>
    </div>
  );
}`;

export const IOS_SWITCH_DOCS_COPY = {
	title: "Legacy iOS Switch",
	summary:
		"A registry-ready recreation of the glossy iOS toggle from the classic UI kit, built on Radix Switch and tuned to the original 77 by 27 pixel proportions.",
	kicker: "Registry component",
	installDescription:
		"Install the direct item URL for the shortest path, or use the Sabraman registry alias once your components config knows about the registry.",
	usageDescription:
		"The component wraps Radix Switch behavior in the old iPhone skin, so you keep accessible state management while matching the original skeuomorphic styling.",
} as const;
