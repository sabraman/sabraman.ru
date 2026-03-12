"use client";

import { useState } from "react";

import {
	IosPickerColumn,
	IosPickerContainer,
} from "~/components/ios-wheel-picker";

const frameworkOptions = [
	{ label: "React", value: "react" },
	{ label: "Vue", value: "vue" },
	{ label: "Angular", value: "angular", disabled: true },
	{ label: "Svelte", value: "svelte" },
];

export function IosWheelPickerUsageExample() {
	const [value, setValue] = useState("react");

	return (
		<div className="flex w-full max-w-[320px] flex-col items-center gap-6">
			<IosPickerContainer className="w-full">
				<IosPickerColumn
					align="center"
					fontSize={22}
					onValueChange={setValue}
					options={frameworkOptions}
					value={value}
				/>
			</IosPickerContainer>
		</div>
	);
}
