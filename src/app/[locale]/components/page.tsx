"use client";

import { useState } from "react";
import {
	IosPickerColumn,
	IosPickerContainer,
} from "../../../../registry/default/ios-wheel-picker/ios-wheel-picker";

const hours = Array.from({ length: 12 }, (_, i) => {
	const value = i + 1;
	return { label: value.toString(), value };
});

const minutes = Array.from({ length: 60 }, (_, i) => {
	return { label: i.toString().padStart(2, "0"), value: i };
});

const meridiem = [
	{ label: "AM", value: "AM" },
	{ label: "PM", value: "PM" },
];

export default function ComponentsShowcasePage() {
	const [hour, setHour] = useState(10);
	const [minute, setMinute] = useState(41);
	const [ampm, setAmpm] = useState("AM");

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(180deg,#8a8c98_0%,#373b55_32%,#171b30_100%)] p-8 font-sans">
			<div className="flex w-full max-w-4xl flex-col items-center gap-12">
				<div className="space-y-4 text-center">
					<h1 className="font-bold text-4xl text-white tracking-tight">
						Custom Registry Components
					</h1>
					<p className="text-lg text-white/70">
						Showcase of the custom shadcn components built for this project.
					</p>
				</div>

				<div className="flex w-full max-w-xl flex-col items-center gap-6 rounded-[32px] border border-white/10 bg-black/20 p-12 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
					<div className="mb-4 space-y-2 text-center">
						<h2 className="font-semibold text-2xl text-white">
							Legacy iOS 6 Wheel Picker
						</h2>
						<p className="text-white/65">
							A recreation of the classic iOS 6 time picker built on top of
							`@ncdai/react-wheel-picker`.
						</p>
					</div>

					<IosPickerContainer
						width={176}
						className="rounded-[8px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.5)] ring-1 ring-[#111]"
					>
						<IosPickerColumn
							align="right"
							onValueChange={setHour}
							fontSize={25}
							options={hours}
							padX={15}
							value={hour}
							width={60}
							zIndex={3}
						/>
						<IosPickerColumn
							align="left"
							onValueChange={setMinute}
							fontSize={25}
							options={minutes}
							padX={10}
							value={minute}
							width={50}
							zIndex={2}
						/>
						<IosPickerColumn
							align="center"
							fontSize={20}
							infinite={false}
							onValueChange={setAmpm}
							options={meridiem}
							padX={15}
							value={ampm}
							width={66}
							zIndex={1}
						/>
					</IosPickerContainer>

					<div className="mt-8 rounded-xl bg-black/35 px-6 py-3 font-mono text-white ring-1 ring-white/10">
						{hour}:{minute.toString().padStart(2, "0")} {ampm}
					</div>
				</div>
			</div>
		</div>
	);
}
