"use client";

import {
	convertNpmCommand,
	IosCodeBlockCommand,
} from "~/components/ios-code-block-command";

export function IosCodeBlockCommandUsageExample() {
	return (
		<IosCodeBlockCommand
			initialPackageManager="bun"
			{...convertNpmCommand(
				"npx shadcn@latest add https://sabraman.ru/r/ios-switch.json",
			)}
		/>
	);
}
