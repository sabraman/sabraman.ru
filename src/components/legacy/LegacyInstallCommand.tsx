"use client";

import {
	LegacyCodeBlockCommand,
	type PackageManager,
} from "~/components/legacy-code-block-command";
import { cn } from "~/lib/utils";

type LegacyInstallCommandSet = Partial<Record<PackageManager, string>>;

interface LegacyInstallCommandProps extends LegacyInstallCommandSet {
	className?: string;
	initialPackageManager?: PackageManager;
}

export function LegacyInstallCommand({
	bun,
	className,
	initialPackageManager = "bun",
	npm,
	pnpm,
	yarn,
}: LegacyInstallCommandProps) {
	return (
		<div className={cn("w-full max-w-[560px]", className)}>
			<LegacyCodeBlockCommand
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
