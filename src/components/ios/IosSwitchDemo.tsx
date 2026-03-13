"use client";

import { IosSwitch } from "~/components/ios-switch";
import { cn } from "~/lib/utils";

interface IosSwitchDemoProps {
	className?: string;
	compact?: boolean;
}

export function IosSwitchDemo({ className }: IosSwitchDemoProps) {
	return (
		<div className={cn("flex w-full justify-center", className)}>
			<IosSwitch
				aria-label="Interactive legacy iOS switch"
				defaultChecked={true}
			/>
		</div>
	);
}
