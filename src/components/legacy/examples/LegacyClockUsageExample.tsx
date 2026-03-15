"use client";

import { LegacyClock } from "~/components/legacy-clock";

export function LegacyClockUsageExample() {
	return (
		<div className="flex flex-wrap items-center gap-4">
			<LegacyClock aria-label="Live day clock" variant="day" />
			<LegacyClock aria-label="Live night clock" variant="night" />
		</div>
	);
}
