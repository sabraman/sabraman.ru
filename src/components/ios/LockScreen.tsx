"use client";

import { animate, motion, useMotionValue } from "motion/react";
import { ShimmeringText } from "~/components/shimmering-text/shimmering-text";
import {
	SlideToUnlock,
	SlideToUnlockHandle,
	SlideToUnlockText,
	SlideToUnlockTrack,
} from "~/components/slide-to-unlock/slide-to-unlock";
import {
	LEGACY_IOS_FONT_FAMILY,
	LegacyBatteryIcon,
	LegacySignalBars,
	LegacyWifiBars,
	useLegacyStatusBarData,
} from "./ui/legacy-status-data";

const CAMERA_LIFT_OPEN_THRESHOLD = -18;

function LockScreenStatusBar({ batteryLevel }: { batteryLevel: number }) {
	return (
		<div
			className="absolute inset-0 overflow-hidden bg-black/60"
			style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
		>
			<div className="absolute top-1/2 left-[4px] flex -translate-y-1/2 items-center gap-[5px] opacity-75">
				<LegacySignalBars />
				<span className="font-bold text-[13px] leading-[17px] [text-shadow:0_-0.5px_0.5px_rgba(0,0,0,0.4)]">
					AT&amp;T
				</span>
				<LegacyWifiBars />
			</div>

			<div className="absolute top-1/2 right-[3px] flex -translate-y-1/2 items-center gap-[5px] opacity-75">
				<span className="font-bold text-[13px] leading-[17px] tracking-[-0.04em] [text-shadow:0_-0.5px_0.5px_rgba(0,0,0,0.4)]">
					{batteryLevel}%
				</span>
				<LegacyBatteryIcon level={batteryLevel} />
			</div>
		</div>
	);
}

export default function LockScreen({
	locale,
	time,
	onUnlock,
	onOpenCamera,
}: {
	locale: string;
	time: Date | null;
	onUnlock: () => void;
	onOpenCamera: () => void;
}) {
	const cameraLiftY = useMotionValue(0);
	const { batteryLevel, formattedDate, formattedTime } = useLegacyStatusBarData(
		{
			time,
			locale,
		},
	);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, scale: 1.03 }}
			transition={{ duration: 0.3 }}
			className="absolute inset-0 z-10 overflow-hidden bg-black"
		>
			<img
				alt=""
				src="/figma/ios-lock-screen/wallpaper.png"
				className="pointer-events-none absolute inset-0 size-full object-cover"
			/>
			<div className="absolute right-0 bottom-0 left-0 h-[220px] bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.8))]" />

			<div className="absolute top-0 right-0 left-0 h-[20px]">
				<LockScreenStatusBar batteryLevel={batteryLevel} />
			</div>

			<div className="absolute top-[20px] right-0 left-0 h-[96px] overflow-hidden bg-black/60 shadow-[0_2px_2px_rgba(0,0,0,0.2)]">
				<div className="absolute top-0 right-0 left-0 h-[48px] bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.1))]" />
				<p
					className="absolute top-[66px] right-[20px] left-[20px] overflow-hidden text-ellipsis whitespace-nowrap text-center text-[17px] text-white leading-normal [text-shadow:0_-1px_0_rgba(0,0,0,0.8)]"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 400 }}
				>
					{formattedDate || "\u00A0"}
				</p>
				<p
					className="absolute top-[4px] right-[20px] left-[20px] overflow-hidden text-ellipsis whitespace-nowrap text-center text-[65px] text-white leading-[63px] [text-shadow:0_-1px_0_rgba(0,0,0,0.8)]"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 300 }}
				>
					{formattedTime}
				</p>
				<div className="pointer-events-none absolute inset-0 shadow-[inset_0_-0.5px_0_rgba(0,0,0,0.2),inset_0_-1px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_rgba(255,255,255,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]" />
			</div>

			<div className="absolute right-0 bottom-0 left-0 h-[96px] overflow-hidden bg-black/60 shadow-[0_-2px_2px_rgba(0,0,0,0.2)]">
				<div className="absolute top-0 right-0 left-0 h-[48px] bg-[linear-gradient(180deg,rgba(255,255,255,0.25),rgba(255,255,255,0.1))]" />

				<div className="absolute top-[22px] right-[68px] left-[20px] h-[52px] rounded-[13px] border border-[#333435] bg-[linear-gradient(180deg,#070808,#292929)]">
						<SlideToUnlock
							onUnlock={onUnlock}
							handleWidth={58}
							className="h-full w-full overflow-hidden rounded-[13px] border-0 bg-transparent p-[3px] shadow-none ring-0"
						>
							<SlideToUnlockTrack className="relative h-full w-full overflow-hidden rounded-[10px]">
								<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#070808,#292929)]" />
								<SlideToUnlockText
									className="pointer-events-none absolute inset-y-0 right-0 left-[58px] z-0 flex items-center justify-center pb-[2px] pl-0 text-center"
									style={{ marginLeft: 0 }}
								>
									{({ isDragging }) => (
										<ShimmeringText
											text="slide to unlock"
											isStopped={isDragging}
											duration={2.4}
											className="font-normal text-[26px] tracking-[-0.045em] [--color:#606060] [--shimmering-color:#f4f4f4] [text-shadow:0_2px_0_rgba(0,0,0,0.55),0_-1px_0_rgba(255,255,255,0.08)]"
											style={{
												fontFamily: LEGACY_IOS_FONT_FAMILY,
											}}
										/>
									)}
							</SlideToUnlockText>
								<SlideToUnlockHandle
									className="top-0 left-0 h-[44px] w-[58px] overflow-hidden rounded-[11px] border-0 bg-transparent p-0 text-transparent shadow-none hover:bg-transparent active:scale-100 active:bg-transparent"
									style={{ zIndex: 20 }}
								>
									<img
										alt=""
										src="/figma/ios-lock-screen/slider-handle.svg"
										className="-translate-x-[2px] -translate-y-[2px] max-w-none"
										style={{ width: 62, height: 48 }}
										draggable="false"
									/>
								</SlideToUnlockHandle>
						</SlideToUnlockTrack>
					</SlideToUnlock>
				</div>

				<img
					alt=""
					src="/figma/ios-lock-screen/camera-line.svg"
					className="absolute top-[23px] right-[20px] h-[6px] w-[28px] max-w-none"
				/>
				<img
					alt=""
					src="/figma/ios-lock-screen/camera-line.svg"
					className="absolute top-[67px] right-[20px] h-[6px] w-[28px] max-w-none"
				/>
				<motion.button
					type="button"
					onClick={onOpenCamera}
					style={{ y: cameraLiftY }}
					drag="y"
					dragConstraints={{ top: -26, bottom: 0 }}
					dragElastic={0.08}
					dragMomentum={false}
					onDragEnd={() => {
						const currentY = cameraLiftY.get();
						animate(cameraLiftY, 0, {
							type: "spring",
							bounce: 0,
							duration: 0.22,
						});
						if (currentY <= CAMERA_LIFT_OPEN_THRESHOLD) {
							onOpenCamera();
						}
					}}
					className="absolute top-[23px] right-[20px] z-20 flex h-[50px] w-[28px] touch-none items-center justify-center active:scale-[0.98]"
					aria-label="Open camera"
				>
					<img
						alt=""
						src="/figma/ios-lock-screen/camera-icon.svg"
						className="h-[28px] w-[28px] max-w-none"
						draggable="false"
					/>
				</motion.button>
				<div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(0,0,0,0.9),inset_0_1.5px_0_rgba(255,255,255,0.1),inset_0_2px_0_rgba(255,255,255,0.1)]" />
			</div>
		</motion.div>
	);
}
