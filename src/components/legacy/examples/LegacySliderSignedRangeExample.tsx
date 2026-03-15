"use client";

import { useState } from "react";

import { LegacySlider } from "~/components/legacy-slider";

function formatBalance(value: number) {
	if (value === 0) {
		return "Center";
	}

	if (value < 0) {
		return `Left ${Math.abs(value)}`;
	}

	return `Right ${value}`;
}

export function LegacySliderSignedRangeExample() {
	const [balance, setBalance] = useState(12);

	return (
		<div className="flex w-full max-w-[320px] flex-col gap-3">
			<div className="flex items-center justify-between font-medium text-[#98a6bf] text-sm">
				<span>Stereo Balance</span>
				<span>{formatBalance(balance)}</span>
			</div>
			<LegacySlider
				aria-label="Stereo balance"
				max={50}
				min={-50}
				onValueChange={setBalance}
				value={balance}
			/>
		</div>
	);
}
