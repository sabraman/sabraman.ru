"use client";

import { IosClock } from "~/components/ios-clock";

export function IosClockUsageExample() {
	return (
		<div className="flex flex-wrap items-center gap-4">
			<IosClock aria-label="Live day clock" variant="day" />
			<IosClock aria-label="Live night clock" variant="night" />
		</div>
	);
}
