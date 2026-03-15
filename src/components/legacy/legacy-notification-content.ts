export function getLegacyNotificationHubPath() {
	return "/components/legacy-notification";
}

export const LEGACY_NOTIFICATION_URLS = {
	direct: "https://sabraman.ru/r/legacy-notification.json",
	registry: "https://sabraman.ru/r/registry.json",
	docs: "https://sabraman.ru/components/legacy-notification",
} as const;

export const LEGACY_NOTIFICATION_INSTALL_COMMANDS = {
	bun: `bunx --bun shadcn@latest add ${LEGACY_NOTIFICATION_URLS.direct}`,
	npm: `npx shadcn@latest add ${LEGACY_NOTIFICATION_URLS.direct}`,
	pnpm: `pnpm dlx shadcn@latest add ${LEGACY_NOTIFICATION_URLS.direct}`,
	yarn: `yarn dlx shadcn@latest add ${LEGACY_NOTIFICATION_URLS.direct}`,
} as const;

export const LEGACY_NOTIFICATION_ALIAS_COMMANDS = {
	bun: "bunx --bun shadcn@latest add @sabraman/legacy-notification",
	npm: "npx shadcn@latest add @sabraman/legacy-notification",
	pnpm: "pnpm dlx shadcn@latest add @sabraman/legacy-notification",
	yarn: "yarn dlx shadcn@latest add @sabraman/legacy-notification",
} as const;

export const LEGACY_NOTIFICATION_USAGE_SNIPPET = `"use client";

import { LegacyBarButton } from "@/components/legacy-bar-button";
import { showLegacyNotification } from "@/components/legacy-notification";

export function InboxNotificationButton() {
  return (
    <LegacyBarButton
      label="Show notification"
      onClick={() => {
        showLegacyNotification({
          title: "Messages",
          subtitle: "Ava",
          body: "Can you review the latest build?",
          time: "now",
        });
      }}
      variant="accent"
    />
  );
}`;

export const LEGACY_NOTIFICATION_DOCS_COPY = {
	title: "Legacy Notification",
	summary:
		"Sonner-powered lock-screen toast with the original glossy iOS chrome.",
	kicker: "Registry component",
	installDescription:
		"Install the component, keep your shadcn Sonner toaster mounted, and trigger the lock-screen style toast with the exported helper.",
	usageDescription:
		"Use the presentational component when you need a static lock-screen card, or call the helper to push the same design through Sonner with toast.custom.",
} as const;
