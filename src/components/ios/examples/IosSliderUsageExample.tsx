"use client";

import { useState } from "react";

import { IosSlider } from "~/components/ios-slider";

function formatBalance(value: number) {
	const roundedValue = Math.round(value);

	if (roundedValue === 0) {
		return "Center";
	}

	if (roundedValue < 0) {
		return `L ${Math.abs(roundedValue)}`;
	}

	return `R ${roundedValue}`;
}

export function IosSliderUsageExample() {
	const [ringer, setRinger] = useState(68);
	const [brightness, setBrightness] = useState(44);
	const [balance, setBalance] = useState(12);

	return (
		<div className="flex w-full max-w-[340px] flex-col gap-4">
			<div className="space-y-2">
				<div className="flex items-center justify-between font-medium text-slate-500 text-sm">
					<span>Ringer</span>
					<span>{Math.round(ringer)}%</span>
				</div>
				<IosSlider
					aria-label="Ringer"
					onValueChange={setRinger}
					value={ringer}
				/>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between font-medium text-slate-500 text-sm">
					<span>Brightness</span>
					<span>{Math.round(brightness)}%</span>
				</div>
				<IosSlider
					aria-label="Brightness"
					onValueChange={setBrightness}
					value={brightness}
				/>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between font-medium text-slate-500 text-sm">
					<span>Balance</span>
					<span>{formatBalance(balance)}</span>
				</div>
				<IosSlider
					aria-label="Stereo balance"
					max={50}
					min={-50}
					onValueChange={setBalance}
					value={balance}
				/>
			</div>
		</div>
	);
}
