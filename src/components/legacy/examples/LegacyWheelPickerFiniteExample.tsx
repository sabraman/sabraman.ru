"use client";

import { useState } from "react";

import {
	LegacyPickerColumn,
	LegacyPickerContainer,
} from "~/components/legacy-wheel-picker";

const paceOptions = [
	{ label: "Slow", value: "slow" },
	{ label: "Normal", value: "normal" },
	{ label: "Fast", value: "fast" },
	{ label: "Ludicrous", value: "ludicrous", disabled: true },
];

export function LegacyWheelPickerFiniteExample() {
	const [pace, setPace] =
		useState<(typeof paceOptions)[number]["value"]>("normal");

	return (
		<div className="flex w-full max-w-[320px] flex-col items-center gap-4">
			<LegacyPickerContainer className="w-full">
				<LegacyPickerColumn
					align="center"
					fontSize={22}
					infinite={false}
					onValueChange={setPace}
					options={paceOptions}
					value={pace}
				/>
			</LegacyPickerContainer>
			<p className="font-medium text-[#8b9bb4] text-sm">
				Selected pace: <span className="text-white capitalize">{pace}</span>
			</p>
		</div>
	);
}
