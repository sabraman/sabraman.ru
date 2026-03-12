"use client";

import { convertNpmCommand } from "~/components/ios-code-block-command";

import { IosInstallCommand } from "./IosInstallCommand";

interface IosCodeBlockCommandDemoProps {
	className?: string;
}

export function IosCodeBlockCommandDemo({
	className,
}: IosCodeBlockCommandDemoProps) {
	return (
		<IosInstallCommand
			{...convertNpmCommand(
				"npx shadcn@latest add https://sabraman.ru/r/ios-code-block-command.json",
			)}
			className={className}
		/>
	);
}
