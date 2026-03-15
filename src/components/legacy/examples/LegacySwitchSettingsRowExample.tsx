"use client";

import { useState } from "react";

import { LegacySwitch } from "~/components/legacy-switch";

export function LegacySwitchSettingsRowExample() {
	const [wifiAssist, setWifiAssist] = useState(true);

	return (
		<div className="w-full max-w-[340px] rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,#f7f8fa_0%,#e3e8ef_100%)] p-4 shadow-[0_10px_24px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.92)]">
			<div className="flex items-center justify-between gap-4 rounded-[14px] border border-[#ccd3df] bg-white/80 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]">
				<div className="min-w-0">
					<p className="font-semibold text-[#556178] text-sm">Wi-Fi Assist</p>
					<p className="mt-1 text-[#72809a] text-sm leading-relaxed">
						Use mobile data when the current network stops responding.
					</p>
				</div>
				<LegacySwitch
					aria-label="Wi-Fi Assist"
					checked={wifiAssist}
					onCheckedChange={setWifiAssist}
				/>
			</div>
		</div>
	);
}
