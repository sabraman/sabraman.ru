"use client";

import { LegacyClock } from "~/components/legacy-clock";

const SIZE_EXAMPLES = [48, 76, 104] as const;

export function LegacyClockSizeExample() {
	return (
		<div className="flex flex-wrap items-end gap-6">
			{SIZE_EXAMPLES.map((size) => (
				<div className="flex flex-col items-center gap-3" key={size}>
					<LegacyClock aria-label={`Legacy clock ${size}px`} size={size} />
					<span className="font-medium text-[#8b9bb4] text-xs uppercase tracking-[0.18em]">
						{size}px
					</span>
				</div>
			))}
		</div>
	);
}
