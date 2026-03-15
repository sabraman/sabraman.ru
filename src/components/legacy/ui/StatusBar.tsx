"use client";

import { cn } from "~/lib/utils";
import {
	LEGACY_IOS_FONT_FAMILY,
	LegacyBatteryIcon,
	LegacySignalBars,
	LegacyWifiBars,
	useLegacyStatusBarData,
} from "./legacy-status-data";

type StatusBarProps = {
	locale: string;
	time: Date | null;
	variant?: "translucent" | "opaque";
};

export default function StatusBar({
	locale,
	time,
	variant = "translucent",
}: StatusBarProps) {
	const { batteryLevel, formattedTime } = useLegacyStatusBarData({
		time,
		locale,
	});

	return (
		<div
			className={cn(
				"absolute top-0 right-0 left-0 z-50 flex h-[20px] items-center justify-between px-[7px] font-semibold text-[11px] text-white",
				variant === "opaque"
					? "bg-black [text-shadow:0_-0.5px_0.5px_rgba(0,0,0,0.4)]"
					: "bg-black/35 backdrop-blur-[2px] [text-shadow:0_1px_1px_rgba(0,0,0,0.65)]",
			)}
			style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
		>
			<div className="flex items-center gap-[5px] opacity-75">
				<LegacySignalBars />
				<span className="font-bold text-[10px] tracking-[-0.03em]">
					KRTN
				</span>
				<LegacyWifiBars />
			</div>

			<div className="absolute left-1/2 -translate-x-1/2 font-bold text-[11px] tracking-[-0.02em]">
				{time ? formattedTime : ""}
			</div>

			<div className="flex items-center gap-[5px] opacity-75">
				<span className="font-bold text-[10px] tracking-[-0.04em]">
					{batteryLevel}%
				</span>
				<LegacyBatteryIcon level={batteryLevel} />
			</div>
		</div>
	);
}
