"use client";

import { useState } from "react";

import { IosSwitch } from "~/components/ios-switch";

export function IosSwitchUsageExample() {
	const [enabled, setEnabled] = useState(true);

	return (
		<div className="flex items-center gap-4">
			<IosSwitch
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
