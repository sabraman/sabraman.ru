"use client";

import {
	convertNpmCommand,
	LegacyCodeBlockCommand,
} from "~/components/legacy-code-block-command";

export function LegacyCodeBlockCommandUsageExample() {
	return (
		<LegacyCodeBlockCommand
			initialPackageManager="bun"
			{...convertNpmCommand(
				"npx shadcn@latest add https://sabraman.ru/r/legacy-switch.json",
			)}
		/>
	);
}
