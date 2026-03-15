"use client";

import { LegacyClock } from "~/components/legacy-clock";

const FIXED_TIME = new Date("2026-03-15T09:41:00");

export function LegacyClockFixedSnapshotExample() {
	return (
		<div className="flex flex-wrap items-center gap-5">
			<div className="flex flex-col items-center gap-3">
				<LegacyClock
					aria-label="Fixed day clock snapshot"
					date={FIXED_TIME}
					live={false}
					showSeconds={false}
					variant="day"
				/>
				<span className="font-medium text-[#8b9bb4] text-xs uppercase tracking-[0.18em]">
					Day snapshot
				</span>
			</div>
			<div className="flex flex-col items-center gap-3">
				<LegacyClock
					aria-label="Fixed night clock snapshot"
					date={FIXED_TIME}
					live={false}
					showSeconds={false}
					variant="night"
				/>
				<span className="font-medium text-[#8b9bb4] text-xs uppercase tracking-[0.18em]">
					Night snapshot
				</span>
			</div>
		</div>
	);
}
