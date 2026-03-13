"use client";

import {
	IosCodeBlockCommand,
	type PackageManager,
} from "~/components/ios-code-block-command";
import { cn } from "~/lib/utils";

type IosInstallCommandSet = Partial<Record<PackageManager, string>>;

interface IosInstallCommandProps extends IosInstallCommandSet {
	className?: string;
	initialPackageManager?: PackageManager;
}

export function IosInstallCommand({
	bun,
	className,
	initialPackageManager = "bun",
	npm,
	pnpm,
	yarn,
}: IosInstallCommandProps) {
	return (
		<div className={cn("w-full max-w-[560px]", className)}>
			<IosCodeBlockCommand
				bun={bun}
				className="w-full"
				initialPackageManager={initialPackageManager}
				npm={npm}
				pnpm={pnpm}
				yarn={yarn}
			/>
		</div>
	);
}
