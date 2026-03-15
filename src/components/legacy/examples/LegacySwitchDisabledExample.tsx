"use client";

import { LegacySwitch } from "~/components/legacy-switch";

export function LegacySwitchDisabledExample() {
	return (
		<div className="flex flex-wrap items-center gap-6">
			<div className="flex items-center gap-3">
				<LegacySwitch aria-label="Airplane mode off" disabled={true} />
				<span className="font-medium text-sm text-white/80">Off</span>
			</div>
			<div className="flex items-center gap-3">
				<LegacySwitch
					aria-label="Airplane mode on"
					checked={true}
					disabled={true}
				/>
				<span className="font-medium text-sm text-white/80">On</span>
			</div>
		</div>
	);
}
