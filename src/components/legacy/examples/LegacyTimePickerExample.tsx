"use client";

import { useState } from "react";

import {
	LegacyPickerColumn,
	LegacyPickerContainer,
} from "~/components/legacy-wheel-picker";

const hours = Array.from({ length: 12 }, (_, index) => ({
	label: String(index + 1),
	value: index + 1,
}));

const minutes = Array.from({ length: 60 }, (_, index) => ({
	label: String(index).padStart(2, "0"),
	value: index,
}));

const meridiem = [
	{ label: "AM", value: "AM" },
	{ label: "PM", value: "PM" },
];

export function LegacyTimePickerExample() {
	const [hour, setHour] = useState(10);
	const [minute, setMinute] = useState(41);
	const [ampm, setAmpm] = useState("AM");

	return (
		<LegacyPickerContainer
			className="relative w-full shrink-0 overflow-hidden"
			frameWidth="100%"
			width="100%"
		>
			<div className="relative z-[3] flex flex-[1.2] shrink-0 border-[#000]/20 border-r shadow-[1px_0_0_0_rgba(255,255,255,0.3)]">
				<LegacyPickerColumn
					align="center"
					fontSize={25}
					onValueChange={setHour}
					options={hours}
					padX={15}
					value={hour}
				/>
			</div>
			<div className="relative z-[2] flex flex-[1] shrink-0 border-[#000]/20 border-r shadow-[1px_0_0_0_rgba(255,255,255,0.3)]">
				<LegacyPickerColumn
					align="center"
					fontSize={25}
					onValueChange={setMinute}
					options={minutes}
					padX={10}
					value={minute}
				/>
			</div>
			<div className="relative z-[1] flex flex-[1.2] shrink-0">
				<LegacyPickerColumn
					align="center"
					fontSize={20}
					infinite={false}
					onValueChange={setAmpm}
					options={meridiem}
					padX={15}
					value={ampm}
				/>
			</div>
		</LegacyPickerContainer>
	);
}
