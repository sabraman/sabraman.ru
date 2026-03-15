"use client";

import { LegacyClock } from "~/components/legacy-clock";

export function LegacyClockStatusRowExample() {
	return (
		<div className="w-full max-w-[340px] rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,#f7f8fa_0%,#e3e8ef_100%)] p-4 shadow-[0_10px_24px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]">
			<div className="flex items-center gap-4 rounded-[14px] border border-[#ccd3df] bg-white/80 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]">
				<LegacyClock aria-label="Status clock" size={52} />
				<div className="min-w-0">
					<p className="font-bold text-[#56637a] text-[13px] uppercase tracking-[0.18em]">
						Clock
					</p>
					<p className="mt-1 text-[#6e7a92] text-sm leading-relaxed">
						Works as a live icon inside app lists, status cards, or launcher
						rows.
					</p>
				</div>
			</div>
		</div>
	);
}
