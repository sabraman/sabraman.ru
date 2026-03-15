export function getLegacySwitchHubPath() {
	return "/components/legacy-switch";
}

export const LEGACY_SWITCH_URLS = {
	direct: "https://sabraman.ru/r/legacy-switch.json",
	registry: "https://sabraman.ru/r/registry.json",
	docs: "https://sabraman.ru/components/legacy-switch",
} as const;

export const LEGACY_SWITCH_INSTALL_COMMANDS = {
	bun: `bunx --bun shadcn@latest add ${LEGACY_SWITCH_URLS.direct}`,
	npm: `npx shadcn@latest add ${LEGACY_SWITCH_URLS.direct}`,
	pnpm: `pnpm dlx shadcn@latest add ${LEGACY_SWITCH_URLS.direct}`,
	yarn: `yarn dlx shadcn@latest add ${LEGACY_SWITCH_URLS.direct}`,
} as const;

export const LEGACY_SWITCH_ALIAS_COMMANDS = {
	bun: "bunx --bun shadcn@latest add @sabraman/legacy-switch",
	npm: "npx shadcn@latest add @sabraman/legacy-switch",
	pnpm: "pnpm dlx shadcn@latest add @sabraman/legacy-switch",
	yarn: "yarn dlx shadcn@latest add @sabraman/legacy-switch",
} as const;

export const LEGACY_SWITCH_USAGE_SNIPPET = `"use client";

import { useState } from "react";

import { LegacySwitch } from "@/components/legacy-switch";

export function NotificationsToggle() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex items-center gap-4">
      <LegacySwitch
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

export const LEGACY_SWITCH_DOCS_COPY = {
	title: "Legacy Switch",
	summary:
		"Settings toggles and labeled preference rows with classic legacy chrome.",
	kicker: "Registry component",
	installDescription:
		"Install the direct item URL for the shortest path, or use the Sabraman registry alias once your components config knows about the registry.",
	usageDescription:
		"The component wraps Radix Switch behavior in the original glossy skin, so you keep accessible state management while matching the skeuomorphic styling.",
} as const;
