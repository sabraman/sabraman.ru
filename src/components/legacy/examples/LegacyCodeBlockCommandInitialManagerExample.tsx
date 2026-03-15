"use client";

import {
	convertNpmCommand,
	LegacyCodeBlockCommand,
} from "~/components/legacy-code-block-command";

export function LegacyCodeBlockCommandInitialManagerExample() {
	return (
		<LegacyCodeBlockCommand
			initialPackageManager="pnpm"
			{...convertNpmCommand(
				"npx shadcn@latest add @sabraman/legacy-alert-dialog",
			)}
		/>
	);
}
