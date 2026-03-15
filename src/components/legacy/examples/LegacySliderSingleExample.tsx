"use client";

import { useState } from "react";

import { LegacySlider } from "~/components/legacy-slider";

export function LegacySliderSingleExample() {
	const [volume, setVolume] = useState(58);

	return (
		<div className="flex w-full max-w-[320px] flex-col gap-3">
			<div className="flex items-center justify-between font-medium text-[#98a6bf] text-sm">
				<span>Media Volume</span>
				<span>{Math.round(volume)}%</span>
			</div>
			<LegacySlider
				aria-label="Media volume"
				onValueChange={setVolume}
				value={volume}
			/>
		</div>
	);
}
