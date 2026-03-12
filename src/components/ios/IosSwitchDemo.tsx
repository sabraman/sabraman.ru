"use client";

import { useState } from "react";

import { IosSwitch } from "~/components/ios-switch";
import { cn } from "~/lib/utils";

interface IosSwitchDemoProps {
	className?: string;
}

export function IosSwitchDemo({ className }: IosSwitchDemoProps) {
	const [checked, setChecked] = useState(true);

	return (
		<div className={cn("flex flex-col items-center gap-8", className)}>
			<div className="flex flex-col items-center gap-5 rounded-[26px] border-[rgba(0,0,0,0.75)] border-[rgba(255,255,255,0.2)] border-t border-b bg-[linear-gradient(180deg,#354158_0%,#161f34_100%)] px-10 py-8 shadow-[0_24px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)]">
				<IosSwitch
					aria-label="Legacy iOS switch off reference"
					className="pointer-events-none"
				/>
				<IosSwitch
					aria-label="Legacy iOS switch on reference"
					checked={true}
					className="pointer-events-none"
				/>
			</div>

			<div className="flex flex-col items-center gap-4 text-center">
				<IosSwitch
					aria-label="Interactive legacy iOS switch"
					checked={checked}
					onCheckedChange={setChecked}
				/>
				<p className="font-medium text-[#8b9bb4] text-sm uppercase tracking-[0.08em]">
					{checked ? "Interactive state: on" : "Interactive state: off"}
				</p>
			</div>
		</div>
	);
}
