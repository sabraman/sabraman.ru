"use client";

import { convertNpmCommand } from "~/components/legacy-code-block-command";

import { LegacyInstallCommand } from "./LegacyInstallCommand";

interface LegacyCodeBlockCommandDemoProps {
	className?: string;
}

export function LegacyCodeBlockCommandDemo({
	className,
}: LegacyCodeBlockCommandDemoProps) {
	return (
		<LegacyInstallCommand
			{...convertNpmCommand(
				"npx shadcn@latest add https://sabraman.ru/r/legacy-code-block-command.json",
			)}
			className={className}
		/>
	);
}
