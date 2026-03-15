"use client";

import { useState } from "react";

import { LegacySwitch } from "~/components/legacy-switch";

export function LegacySwitchUsageExample() {
	const [enabled, setEnabled] = useState(true);

	return (
		<div className="flex items-center gap-4">
			<LegacySwitch
				aria-label="Notifications"
				checked={enabled}
				onCheckedChange={setEnabled}
			/>
			<span className="font-medium text-sm">
				{enabled ? "Notifications enabled" : "Notifications disabled"}
			</span>
		</div>
	);
}
