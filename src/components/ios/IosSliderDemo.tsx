"use client";

import { useState } from "react";

import { IosSlider } from "~/components/ios-slider";
import { cn } from "~/lib/utils";

interface IosSliderDemoProps {
	className?: string;
}

interface IosSliderRowProps {
	ariaLabel: string;
	className?: string;
	onValueChange?: (value: number) => void;
	value: number;
	withDivider?: boolean;
}

const PRESET_VALUES = [14, 42] as const;

export function IosSliderRow({
	ariaLabel,
	className,
	onValueChange,
	value,
	withDivider = true,
}: IosSliderRowProps) {
	return (
		<div
			className={cn(
				"flex h-[44px] w-full items-center gap-[5px] bg-[linear-gradient(180deg,#fcfcfc_0%,#f1f1f1_100%)] px-[10px] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]",
				withDivider && "border-black/12 border-b",
				className,
			)}
			style={{
				fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
			}}
		>
			<div className="flex size-[30px] shrink-0 items-center justify-center text-[#8b8b8b] drop-shadow-[0_1px_0_rgba(255,255,255,0.55)]">
				<SpeakerIcon variant="low" />
			</div>
			<IosSlider
				aria-label={ariaLabel}
				className="min-w-0 flex-1"
				onValueChange={onValueChange}
				value={value}
			/>
			<div className="flex size-[30px] shrink-0 items-center justify-center text-[#8b8b8b] drop-shadow-[0_1px_0_rgba(255,255,255,0.55)]">
				<SpeakerIcon variant="high" />
			</div>
		</div>
	);
}

export function IosSliderDemo({ className }: IosSliderDemoProps) {
	const [value, setValue] = useState(68);

	return (
		<div className={cn("flex w-full max-w-[476px] flex-col gap-5", className)}>
			<div className="relative overflow-hidden rounded-[28px] border-[rgba(0,0,0,0.78)] border-[rgba(255,255,255,0.18)] border-t border-b bg-[linear-gradient(180deg,#3b465d_0%,#182034_100%)] p-5 shadow-[0_24px_40px_rgba(0,0,0,0.35),inset_0_2px_4px_rgba(0,0,0,0.5)]">
				<div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[28px] bg-gradient-to-b from-white/10 to-transparent" />
				<div className="relative rounded-[18px] border border-[#7a8392] bg-[linear-gradient(180deg,#d6dbe3_0%,#c6ccd7_100%)] p-[6px] shadow-[0_10px_22px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.55)]">
					<div className="overflow-hidden rounded-[12px] border border-[#aeb4c0] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
						{PRESET_VALUES.map((presetValue) => (
							<IosSliderRow
								ariaLabel={`Legacy iOS slider preview at ${presetValue} percent`}
								key={presetValue}
								value={presetValue}
							/>
						))}
						<IosSliderRow
							ariaLabel="Interactive legacy iOS slider"
							onValueChange={setValue}
							value={value}
							withDivider={false}
						/>
					</div>
				</div>
			</div>

			<p className="text-center font-medium text-[#8b9bb4] text-sm uppercase tracking-[0.08em]">
				Interactive value: {Math.round(value)}%
			</p>
		</div>
	);
}

function SpeakerIcon({ variant }: { variant: "high" | "low" }) {
	return (
		<svg
			aria-hidden="true"
			className="h-[18px] w-[18px]"
			fill="none"
			viewBox="0 0 18 18"
		>
			<path
				d="M2.75 7.1H5.35L9.15 4V14L5.35 10.9H2.75V7.1Z"
				fill="currentColor"
			/>
			{variant === "high" ? (
				<>
					<path
						d="M11.2 6.4C12.35 7.45 12.35 10.55 11.2 11.6"
						stroke="currentColor"
						strokeLinecap="round"
						strokeWidth="1.25"
					/>
					<path
						d="M13.6 4.95C15.7 6.85 15.7 11.15 13.6 13.05"
						stroke="currentColor"
						strokeLinecap="round"
						strokeWidth="1.25"
					/>
				</>
			) : null}
		</svg>
	);
}
