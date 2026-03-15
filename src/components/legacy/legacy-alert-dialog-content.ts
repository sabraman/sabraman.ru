export function getLegacyAlertDialogHubPath() {
	return "/components/legacy-alert-dialog";
}

export const LEGACY_ALERT_DIALOG_URLS = {
	direct: "https://sabraman.ru/r/legacy-alert-dialog.json",
	registry: "https://sabraman.ru/r/registry.json",
	docs: "https://sabraman.ru/components/legacy-alert-dialog",
} as const;

export const LEGACY_ALERT_DIALOG_INSTALL_COMMANDS = {
	bun: `bunx --bun shadcn@latest add ${LEGACY_ALERT_DIALOG_URLS.direct}`,
	npm: `npx shadcn@latest add ${LEGACY_ALERT_DIALOG_URLS.direct}`,
	pnpm: `pnpm dlx shadcn@latest add ${LEGACY_ALERT_DIALOG_URLS.direct}`,
	yarn: `yarn dlx shadcn@latest add ${LEGACY_ALERT_DIALOG_URLS.direct}`,
} as const;

export const LEGACY_ALERT_DIALOG_ALIAS_COMMANDS = {
	bun: "bunx --bun shadcn@latest add @sabraman/legacy-alert-dialog",
	npm: "npx shadcn@latest add @sabraman/legacy-alert-dialog",
	pnpm: "pnpm dlx shadcn@latest add @sabraman/legacy-alert-dialog",
	yarn: "yarn dlx shadcn@latest add @sabraman/legacy-alert-dialog",
} as const;

export const LEGACY_ALERT_DIALOG_USAGE_SNIPPET = `"use client";

import { useState } from "react";

import {
  LegacyAlertDialog,
  LegacyAlertDialogButton,
  LegacyAlertDialogClose,
  LegacyAlertDialogContent,
  LegacyAlertDialogDescription,
  LegacyAlertDialogFooter,
  LegacyAlertDialogHeader,
  LegacyAlertDialogTitle,
} from "@/components/legacy-alert-dialog";

export function DeleteDraftAlert() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} type="button">
        Show alert
      </button>

      <LegacyAlertDialog open={open} onOpenChange={setOpen}>
        <LegacyAlertDialogContent>
          <LegacyAlertDialogHeader>
            <LegacyAlertDialogTitle>Delete Draft</LegacyAlertDialogTitle>
            <LegacyAlertDialogDescription>
              This removes the local note from the current device.
            </LegacyAlertDialogDescription>
          </LegacyAlertDialogHeader>

          <LegacyAlertDialogFooter>
            <LegacyAlertDialogClose asChild>
              <LegacyAlertDialogButton className="flex-1 min-w-0">
                Cancel
              </LegacyAlertDialogButton>
            </LegacyAlertDialogClose>
            <LegacyAlertDialogClose asChild>
              <LegacyAlertDialogButton className="flex-1 min-w-0" variant="primary">
                Delete
              </LegacyAlertDialogButton>
            </LegacyAlertDialogClose>
          </LegacyAlertDialogFooter>
        </LegacyAlertDialogContent>
      </LegacyAlertDialog>
    </>
  );
}`;

export const LEGACY_ALERT_DIALOG_DOCS_COPY = {
	title: "Legacy Alert Dialog",
	summary:
		"Confirmations, warnings, and blocking decisions with classic legacy chrome.",
	kicker: "Registry component",
	installDescription:
		"Install the direct item URL for the quickest path, or use the Sabraman alias once your shadcn components config points at the registry.",
	usageDescription:
		"Compose confirmations from the exported dialog shell pieces, or pair the root and content components for a controlled alert flow with authentic glossy chrome.",
} as const;
