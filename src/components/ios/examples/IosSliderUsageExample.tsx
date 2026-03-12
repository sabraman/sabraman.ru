"use client";

import { useState } from "react";

import { IosSlider } from "~/components/ios-slider";

export function IosSliderUsageExample() {
	const [volume, setVolume] = useState(36);

	return (
		<div className="flex w-full max-w-[320px] flex-col gap-4">
			<IosSlider aria-label="Volume" onValueChange={setVolume} value={volume} />
			<p className="font-medium text-slate-500 text-sm">
				Volume: {Math.round(volume)}%
			</p>
		</div>
	);
}
