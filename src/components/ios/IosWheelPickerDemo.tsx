"use client";

import { useState } from "react";

import {
	IosPickerColumn,
	IosPickerContainer,
} from "~/components/ios-wheel-picker";
import { cn } from "~/lib/utils";

const hours = Array.from({ length: 12 }, (_, index) => {
	const value = index + 1;
	return { label: value.toString(), value };
});

const minutes = Array.from({ length: 60 }, (_, index) => ({
	label: index.toString().padStart(2, "0"),
	value: index,
}));

const meridiem = [
	{ label: "AM", value: "AM" },
	{ label: "PM", value: "PM" },
] as const;

interface IosWheelPickerDemoProps {
	className?: string;
	frameWidth?: number | string;
	showReadout?: boolean;
	width?: number | string;
}

export function IosWheelPickerDemo({
	className,
	frameWidth = 320,
	showReadout = true,
	width = 176,
}: IosWheelPickerDemoProps) {
	const [hour, setHour] = useState(10);
	const [minute, setMinute] = useState(41);
	const [ampm, setAmpm] = useState<(typeof meridiem)[number]["value"]>("AM");

	return (
		<div className={cn("flex flex-col items-center gap-6", className)}>
			<IosPickerContainer
				className="shadow-[0px_16px_34px_0px_rgba(0,0,0,0.35)] relative overflow-hidden shrink-0 mx-auto"
				frameWidth={frameWidth}
				width={width}
			>
				{/* Column 1: Hours */}
				<div className="relative z-[3] flex flex-[1.2] shrink-0 border-r border-[#000]/20 shadow-[1px_0_0_0_rgba(255,255,255,0.3)]">
					<IosPickerColumn
						align="center"
						fontSize={25}
						onValueChange={setHour}
						options={hours}
						padX={15}
						value={hour}
					/>
				</div>
				{/* Column 2: Minutes */}
				<div className="relative z-[2] flex flex-[1] shrink-0 border-r border-[#000]/20 shadow-[1px_0_0_0_rgba(255,255,255,0.3)]">
					<IosPickerColumn
						align="center"
						fontSize={25}
						onValueChange={setMinute}
						options={minutes}
						padX={10}
						value={minute}
					/>
				</div>
				{/* Column 3: AM/PM */}
				<div className="relative z-[1] flex flex-[1.2] shrink-0">
					<IosPickerColumn
						align="center"
						fontSize={20}
						infinite={false}
						onValueChange={setAmpm}
						options={[...meridiem]}
						padX={15}
						value={ampm}
					/>
				</div>
			</IosPickerContainer>

			{showReadout ? (
				<div className="rounded-[20px] border border-white/10 bg-[#0b1024]/80 px-6 py-4 text-center font-['Helvetica_Neue:Bold',sans-serif] text-[22px] text-white tracking-[0.18em] shadow-[0px_10px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm">
					{hour}:{minute.toString().padStart(2, "0")} {ampm}
				</div>
			) : null}
		</div>
	);
}
