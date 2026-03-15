"use client";

import { LegacySwitch } from "~/components/legacy-switch";
import { cn } from "~/lib/utils";

interface LegacySwitchDemoProps {
	className?: string;
	compact?: boolean;
}

export function LegacySwitchDemo({ className }: LegacySwitchDemoProps) {
	return (
		<div className={cn("flex w-full justify-center", className)}>
			<LegacySwitch
				aria-label="Interactive legacy switch"
				defaultChecked={true}
			/>
		</div>
	);
}
