export function getIosAlertDialogHubPath() {
	return "/components/ios-alert-dialog";
}

export const IOS_ALERT_DIALOG_URLS = {
	direct: "https://sabraman.ru/r/ios-alert-dialog.json",
	registry: "https://sabraman.ru/r/registry.json",
	docs: "https://sabraman.ru/components/ios-alert-dialog",
} as const;

export const IOS_ALERT_DIALOG_INSTALL_COMMANDS = {
	bun: `bunx --bun shadcn@latest add ${IOS_ALERT_DIALOG_URLS.direct}`,
	npm: `npx shadcn@latest add ${IOS_ALERT_DIALOG_URLS.direct}`,
	pnpm: `pnpm dlx shadcn@latest add ${IOS_ALERT_DIALOG_URLS.direct}`,
	yarn: `yarn dlx shadcn@latest add ${IOS_ALERT_DIALOG_URLS.direct}`,
} as const;

export const IOS_ALERT_DIALOG_ALIAS_COMMANDS = {
	bun: "bunx --bun shadcn@latest add @sabraman/ios-alert-dialog",
	npm: "npx shadcn@latest add @sabraman/ios-alert-dialog",
	pnpm: "pnpm dlx shadcn@latest add @sabraman/ios-alert-dialog",
	yarn: "yarn dlx shadcn@latest add @sabraman/ios-alert-dialog",
} as const;

export const IOS_ALERT_DIALOG_USAGE_SNIPPET = `"use client";

import { useState } from "react";

import {
  IosAlertDialog,
  IosAlertDialogButton,
  IosAlertDialogClose,
  IosAlertDialogContent,
  IosAlertDialogDescription,
  IosAlertDialogFooter,
  IosAlertDialogHeader,
  IosAlertDialogTitle,
} from "@/components/ios-alert-dialog";

export function DeleteDraftAlert() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} type="button">
        Show alert
      </button>

      <IosAlertDialog open={open} onOpenChange={setOpen}>
        <IosAlertDialogContent>
          <IosAlertDialogHeader>
            <IosAlertDialogTitle>Delete Draft</IosAlertDialogTitle>
            <IosAlertDialogDescription>
              This removes the local note from the current device.
            </IosAlertDialogDescription>
          </IosAlertDialogHeader>

          <IosAlertDialogFooter>
            <IosAlertDialogClose asChild>
              <IosAlertDialogButton className="flex-1 min-w-0">
                Cancel
              </IosAlertDialogButton>
            </IosAlertDialogClose>
            <IosAlertDialogClose asChild>
              <IosAlertDialogButton className="flex-1 min-w-0" variant="primary">
                Delete
              </IosAlertDialogButton>
            </IosAlertDialogClose>
          </IosAlertDialogFooter>
        </IosAlertDialogContent>
      </IosAlertDialog>
    </>
  );
}`;

export const IOS_ALERT_DIALOG_DOCS_COPY = {
	title: "iOS 6 Alert Dialog",
	summary:
		"A registry-ready iOS 6 alert dialog with a muted navy body, silver gloss cap, white keyline, and classic confirmation buttons.",
	kicker: "Registry component",
	installDescription:
		"Install the direct item URL for the quickest path, or use the Sabraman alias once your shadcn components config points at the registry.",
	usageDescription:
		"Compose confirmations from the exported dialog shell pieces, or pair the root and content components for a controlled alert flow with authentic iOS 6 chrome.",
} as const;
