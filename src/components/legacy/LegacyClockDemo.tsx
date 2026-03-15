"use client";

import { LegacyClock } from "~/components/legacy-clock";
import { cn } from "~/lib/utils";

interface LegacyClockDemoProps {
	className?: string;
}

export function LegacyClockDemo({ className }: LegacyClockDemoProps) {
	return (
		<div className={cn("flex flex-col items-center gap-8", className)}>
			<div className="flex flex-wrap items-center justify-center gap-6">
				<div className="flex flex-col items-center gap-3">
					<LegacyClock aria-label="Legacy day clock" size={76} variant="day" />
					<p className="font-medium text-[#8b9bb4] text-xs uppercase tracking-[0.18em]">
						Day
					</p>
				</div>
				<div className="flex flex-col items-center gap-3">
					<LegacyClock
						aria-label="Legacy night clock"
						size={76}
						variant="night"
					/>
					<p className="font-medium text-[#8b9bb4] text-xs uppercase tracking-[0.18em]">
						Night
					</p>
				</div>
			</div>

			<p className="text-center font-medium text-[#8b9bb4] text-sm uppercase tracking-[0.08em]">
				Live analog time with the original red seconds hand
			</p>
		</div>
	);
}
