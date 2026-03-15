"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { LegacySlider } from "~/components/legacy-slider";
import { cn } from "~/lib/utils";

interface LegacySliderDemoProps {
	className?: string;
	compact?: boolean;
}

interface LegacySliderRowProps {
	ariaLabel: string;
	className?: string;
	leftAccessory: ReactNode;
	max?: number;
	min?: number;
	onValueChange?: (value: number) => void;
	rightAccessory: ReactNode;
	title: string;
	value: number;
	valueLabel: string;
	withDivider?: boolean;
}

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

export function LegacySliderRow({
	ariaLabel,
	className,
	leftAccessory,
	max = 100,
	min = 0,
	onValueChange,
	rightAccessory,
	title,
	value,
	valueLabel,
	withDivider = true,
}: LegacySliderRowProps) {
	return (
		<div
			className={cn(
				"flex w-full flex-col gap-3 bg-[linear-gradient(180deg,#fcfcfc_0%,#f1f1f1_100%)] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]",
				withDivider && "border-black/12 border-b",
				className,
			)}
			style={{
				fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
			}}
		>
			<div className="flex items-center justify-between gap-3">
				<span className="font-bold text-[#5a6781] text-[11px] uppercase tracking-[0.28em]">
					{title}
				</span>
				<span className="font-mono text-[#7e8ba3] text-[12px]">
					{valueLabel}
				</span>
			</div>

			<div className="flex items-center gap-[7px]">
				<div className="flex size-[30px] shrink-0 items-center justify-center text-[#8b8b8b] drop-shadow-[0_1px_0_rgba(255,255,255,0.55)]">
					{leftAccessory}
				</div>
				<LegacySlider
					aria-label={ariaLabel}
					className="min-w-0 flex-1"
					max={max}
					min={min}
					onValueChange={onValueChange}
					value={value}
				/>
				<div className="flex size-[30px] shrink-0 items-center justify-center text-[#8b8b8b] drop-shadow-[0_1px_0_rgba(255,255,255,0.55)]">
					{rightAccessory}
				</div>
			</div>
		</div>
	);
}

export function LegacySliderDemo({
	className,
	compact = false,
}: LegacySliderDemoProps) {
	const [ringer, setRinger] = useState(68);
	const [brightness, setBrightness] = useState(44);
	const [balance, setBalance] = useState(12);

	return (
		<div className={cn("flex w-full justify-center", className)}>
			<div
				className={cn(
					"relative w-full rounded-[18px] border border-[#7a8392] bg-[linear-gradient(180deg,#d6dbe3_0%,#c6ccd7_100%)] p-[6px] shadow-[0_10px_22px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.55)]",
					compact ? "max-w-[430px]" : "max-w-[476px]",
				)}
			>
				<div className="overflow-hidden rounded-[12px] border border-[#aeb4c0] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
					<LegacySliderRow
						ariaLabel="Interactive legacy ringer slider"
						className={compact ? "gap-2.5 px-2.5 py-2.5" : undefined}
						leftAccessory={<SpeakerIcon variant="low" />}
						onValueChange={setRinger}
						rightAccessory={<SpeakerIcon variant="high" />}
						title="Ringer"
						value={ringer}
						valueLabel={`${Math.round(ringer)}%`}
					/>
					<LegacySliderRow
						ariaLabel="Interactive legacy brightness slider"
						className={compact ? "gap-2.5 px-2.5 py-2.5" : undefined}
						leftAccessory={<SunIcon variant="low" />}
						onValueChange={setBrightness}
						rightAccessory={<SunIcon variant="high" />}
						title="Brightness"
						value={brightness}
						valueLabel={`${Math.round(brightness)}%`}
					/>
					<LegacySliderRow
						ariaLabel="Interactive legacy balance slider"
						className={compact ? "gap-2.5 px-2.5 py-2.5" : undefined}
						leftAccessory={<DirectionBadge>L</DirectionBadge>}
						max={50}
						min={-50}
						onValueChange={setBalance}
						rightAccessory={<DirectionBadge>R</DirectionBadge>}
						title="Balance"
						value={balance}
						valueLabel={formatBalance(balance)}
						withDivider={false}
					/>
				</div>
			</div>
		</div>
	);
}

function DirectionBadge({ children }: { children: ReactNode }) {
	return (
		<span className="inline-flex size-[24px] items-center justify-center rounded-full border border-[#8b8b8b] bg-[linear-gradient(180deg,#fbfbfb_0%,#dddddd_100%)] font-bold text-[#7d8495] text-[11px] shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_1px_1px_rgba(0,0,0,0.08)]">
			{children}
		</span>
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

function SunIcon({ variant }: { variant: "high" | "low" }) {
	return (
		<svg
			aria-hidden="true"
			className="h-[19px] w-[19px]"
			fill="none"
			viewBox="0 0 20 20"
		>
			<circle
				cx="10"
				cy="10"
				fill="currentColor"
				fillOpacity={variant === "high" ? 0.32 : 0.18}
				r={variant === "high" ? 4.1 : 3.2}
				stroke="currentColor"
				strokeWidth="1.1"
			/>
			<g stroke="currentColor" strokeLinecap="round" strokeWidth="1.2">
				<path d="M10 1.8V4.1" />
				<path d="M10 15.9V18.2" />
				<path d="M1.8 10H4.1" />
				<path d="M15.9 10H18.2" />
				<path d="M4 4L5.65 5.65" />
				<path d="M14.35 14.35L16 16" />
				{variant === "high" ? (
					<>
						<path d="M14.35 5.65L16 4" />
						<path d="M4 16L5.65 14.35" />
					</>
				) : null}
			</g>
		</svg>
	);
}
