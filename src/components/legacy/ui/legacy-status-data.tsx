"use client";

import { useEffect, useId, useState } from "react";
import { cn } from "~/lib/utils";

type BatteryManagerLike = EventTarget & {
	level: number;
};

type NavigatorWithBattery = Navigator & {
	getBattery?: () => Promise<BatteryManagerLike>;
};

export const LEGACY_IOS_FONT_FAMILY =
	'"Helvetica Neue", "HelveticaNeue-Light", Helvetica, Arial, sans-serif';

function clampBatteryLevel(level: number) {
	return Math.max(0, Math.min(100, level));
}

function resolveLocale(locale: string) {
	return locale === "ru" ? "ru-RU" : "en-US";
}

function formatLegacyTime(time: Date | null, locale: string) {
	if (!time) {
		return "--:--";
	}

	const resolvedLocale = resolveLocale(locale);
	const hourFormatter = new Intl.NumberFormat(resolvedLocale, {
		useGrouping: false,
	});
	const minuteFormatter = new Intl.NumberFormat(resolvedLocale, {
		minimumIntegerDigits: 2,
		useGrouping: false,
	});

	return `${hourFormatter.format(time.getHours())}:${minuteFormatter.format(
		time.getMinutes(),
	)}`;
}

function formatLegacyDate(time: Date | null, locale: string) {
	if (!time) {
		return "";
	}

	return new Intl.DateTimeFormat(resolveLocale(locale), {
		weekday: "long",
		month: "long",
		day: "numeric",
	}).format(time);
}

function useBatteryLevel() {
	const [batteryLevel, setBatteryLevel] = useState(100);

	useEffect(() => {
		const batteryNavigator = navigator as NavigatorWithBattery;
		if (typeof batteryNavigator.getBattery !== "function") {
			return;
		}

		let batteryManager: BatteryManagerLike | null = null;
		let isCancelled = false;

		const syncBatteryLevel = () => {
			if (!batteryManager || isCancelled) {
				return;
			}

			setBatteryLevel(
				clampBatteryLevel(Math.round(batteryManager.level * 100)),
			);
		};

		void batteryNavigator
			.getBattery()
			.then((manager) => {
				if (isCancelled) {
					return;
				}

				batteryManager = manager;
				syncBatteryLevel();
				batteryManager.addEventListener("levelchange", syncBatteryLevel);
			})
			.catch(() => {
				// Ignore unsupported or blocked battery reads and keep the static fallback.
			});

		return () => {
			isCancelled = true;
			batteryManager?.removeEventListener("levelchange", syncBatteryLevel);
		};
	}, []);

	return batteryLevel;
}

export function useLegacyStatusBarData({
	time,
	locale,
}: {
	time: Date | null;
	locale: string;
}) {
	const batteryLevel = useBatteryLevel();

	return {
		batteryLevel,
		formattedDate: formatLegacyDate(time, locale),
		formattedTime: formatLegacyTime(time, locale),
	};
}

export function LegacySignalBars({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				"relative h-[20px] w-[19px] opacity-75",
				"[filter:drop-shadow(0_-0.5px_0.5px_rgba(0,0,0,0.4))]",
				className,
			)}
			aria-hidden
		>
			<div className="absolute top-[10.5px] left-0 h-[4px] w-[3px] bg-white" />
			<div className="absolute top-[9.5px] left-[4px] h-[5px] w-[3px] bg-white" />
			<div className="absolute top-[8px] left-[8px] h-[6px] w-[3px] bg-white" />
			<div className="absolute top-[6.5px] left-[12px] h-[8px] w-[3px] bg-white" />
			<div className="absolute top-[4.5px] left-[16px] h-[10px] w-[3px] bg-white" />
		</div>
	);
}

export function LegacyWifiBars({ className }: { className?: string }) {
	return (
		<div
			className={cn("relative h-[20px] w-[20px] opacity-75", className)}
			aria-hidden
		>
			<img
				alt=""
				src="/figma/ios-lock-screen/wifi-bar-3.svg"
				className="absolute top-[4px] left-[2.08px] h-[5.5px] w-[15.84px] max-w-none"
			/>
			<img
				alt=""
				src="/figma/ios-lock-screen/wifi-bar-2.svg"
				className="absolute top-[8px] left-[4.97px] h-[4.73px] w-[10.06px] max-w-none"
			/>
			<img
				alt=""
				src="/figma/ios-lock-screen/wifi-bar-1.svg"
				className="absolute top-[12px] left-[7.63px] h-[3.59px] w-[4.73px] max-w-none"
			/>
		</div>
	);
}

export function LegacyBatteryIcon({
	level,
	className,
}: {
	level: number;
	className?: string;
}) {
	const clipId = useId().replace(/:/g, "");
	const fillWidth = (clampBatteryLevel(level) / 100) * 15;

	return (
		<svg
			viewBox="0 0 22 20"
			xmlns="http://www.w3.org/2000/svg"
			className={cn(
				"h-[20px] w-[21px] shrink-0 [filter:drop-shadow(0_-0.5px_0.5px_rgba(0,0,0,0.4))]",
				className,
			)}
			aria-hidden
		>
			<title>Battery level</title>
			<defs>
				<clipPath id={clipId}>
					<rect x="2.5" y="6.5" width={fillWidth} height="6" />
				</clipPath>
			</defs>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M1.51001 4.5H18.49C19.0478 4.5 19.5 4.95219 19.5 5.51V7.50005L19.51 7.5H20.49C21.0478 7.5 21.5 7.95219 21.5 8.51V10.49C21.5 11.0478 21.0478 11.5 20.49 11.5H19.51L19.5 11.5V13.49C19.5 14.0478 19.0479 14.5 18.49 14.5H1.51001C0.952209 14.5 0.5 14.0478 0.5 13.49V5.51C0.5 4.95222 0.952148 4.5 1.51001 4.5ZM19.5 10.49V8.51C19.5 8.50448 19.5045 8.5 19.51 8.5H20.49C20.4955 8.5 20.5 8.50448 20.5 8.51V10.49C20.5 10.4955 20.4955 10.5 20.49 10.5H19.51L19.5046 10.4984L19.5011 10.4945L19.5002 10.492L19.5 10.49ZM18.5 5.51V13.49C18.5 13.4955 18.4955 13.5 18.49 13.5H1.51001C1.50449 13.5 1.5 13.4955 1.5 13.49V5.51C1.5 5.50448 1.50449 5.5 1.51001 5.5H18.49C18.4955 5.5 18.5 5.50448 18.5 5.51Z"
				fill="white"
			/>
			<path
				d="M17.5 6.5H2.5V12.5H17.5V6.5Z"
				fill="white"
				clipPath={`url(#${clipId})`}
			/>
		</svg>
	);
}
