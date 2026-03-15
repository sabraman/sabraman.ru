"use client";

import { animate, motion, useMotionValue } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

type CameraAppProps = {
	mode: "app" | "lockscreen";
	onClose?: () => void;
};

const CLOSE_DRAG_THRESHOLD = 132;
const CAMERA_CONTROLS_HEIGHT = 74;

function FlashIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			className={cn("h-[16px] w-[16px]", className)}
			aria-hidden
		>
			<title>Flash</title>
			<path
				d="M13.8 1.7 5.4 12.2h5.1l-1 10.1 9.2-11.3H13.5l.3-9.3Z"
				fill="currentColor"
			/>
		</svg>
	);
}

function CameraSwapIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 28 24"
			className={cn("h-[18px] w-[18px]", className)}
			aria-hidden
		>
			<title>Swap camera</title>
			<path
				d="M9.7 8.6h8.5a2 2 0 0 1 2 2v4.2a2 2 0 0 1-2 2H9.7a2 2 0 0 1-2-2v-4.2a2 2 0 0 1 2-2Z"
				fill="currentColor"
			/>
			<path
				d="M11 8.7 12.2 6.7h3.6L17 8.7"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
			<path
				d="M5 8.4a8.7 8.7 0 0 1 6.4-3.1h1.8"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
			<path d="M11.4 3.3 14.6 5l-2.1 2.7" fill="currentColor" />
			<path
				d="M23 15.6a8.7 8.7 0 0 1-6.4 3.1h-1.8"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
			<path d="M16.6 20.7 13.4 19l2.1-2.7" fill="currentColor" />
		</svg>
	);
}

function CameraGlyph({
	video,
	className,
}: {
	video?: boolean;
	className?: string;
}) {
	if (video) {
		return (
			<svg
				viewBox="0 0 24 24"
				className={cn("h-[18px] w-[18px]", className)}
				aria-hidden
			>
				<title>Video mode</title>
				<path
					d="M4.5 7.5A2.5 2.5 0 0 1 7 5h7a2.5 2.5 0 0 1 2.5 2.5v1.1l3-2c.7-.4 1.5.1 1.5.9v9c0 .8-.8 1.3-1.5.9l-3-2V16.5A2.5 2.5 0 0 1 14 19H7a2.5 2.5 0 0 1-2.5-2.5Z"
					fill="currentColor"
				/>
			</svg>
		);
	}

	return (
		<svg
			viewBox="0 0 24 24"
			className={cn("h-[18px] w-[18px]", className)}
			aria-hidden
		>
			<title>Photo mode</title>
			<path
				d="M6.3 6.4h2.2L9.8 4h4.4l1.3 2.4h2.2A2.3 2.3 0 0 1 20 8.7v8A2.3 2.3 0 0 1 17.7 19H6.3A2.3 2.3 0 0 1 4 16.7v-8a2.3 2.3 0 0 1 2.3-2.3Zm5.7 2.2a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2Zm0 1.8a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6Z"
				fill="currentColor"
			/>
		</svg>
	);
}

function CameraControlPill({
	children,
	className,
	onClick,
}: {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"flex items-center justify-center rounded-full border-[#22242a] border-[1.5px] bg-[linear-gradient(180deg,#9fa1a7_0%,#82848b_54%,#676971_100%)] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.24),0_2px_0_rgba(0,0,0,0.28)]",
				className,
			)}
		>
			{children}
		</button>
	);
}

export default function CameraApp({ mode, onClose }: CameraAppProps) {
	const isLockscreenMode = mode === "lockscreen";
	const screenY = useMotionValue(0);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const streamRef = useRef<MediaStream | null>(null);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const recordedChunksRef = useRef<Blob[]>([]);
	const [flashMode, setFlashMode] = useState<"auto" | "on" | "off">("on");
	const [isHdrOn, setIsHdrOn] = useState(false);
	const [isFrontCamera, setIsFrontCamera] = useState(false);
	const [captureMode, setCaptureMode] = useState<"photo" | "video">("photo");
	const [isRecording, setIsRecording] = useState(false);
	const [cameraError, setCameraError] = useState<string | null>(null);
	const [lastPhotoDataUrl, setLastPhotoDataUrl] = useState<string | null>(null);
	const [showFlashFrame, setShowFlashFrame] = useState(false);

	useEffect(() => {
		if (!showFlashFrame) {
			return;
		}

		const timer = setTimeout(() => setShowFlashFrame(false), 140);
		return () => clearTimeout(timer);
	}, [showFlashFrame]);

	useEffect(() => {
		const stopRecorder = () => {
			if (mediaRecorderRef.current?.state !== "inactive") {
				mediaRecorderRef.current?.stop();
			}
			mediaRecorderRef.current = null;
			recordedChunksRef.current = [];
			setIsRecording(false);
		};

		const stopCurrentStream = () => {
			stopRecorder();
			streamRef.current?.getTracks().forEach((track) => {
				track.stop();
			});
			streamRef.current = null;
		};

		if (!navigator.mediaDevices?.getUserMedia) {
			setCameraError("Camera unavailable");
			return stopCurrentStream;
		}

		let isCancelled = false;

		const startCamera = async () => {
			stopCurrentStream();

			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					audio: false,
					video: {
						width: { ideal: 1280 },
						height: { ideal: 720 },
						facingMode: isFrontCamera ? "user" : { ideal: "environment" },
					},
				});

				if (isCancelled) {
					stream.getTracks().forEach((track) => {
						track.stop();
					});
					return;
				}

				streamRef.current = stream;
				setCameraError(null);

				if (videoRef.current) {
					videoRef.current.srcObject = stream;
					await videoRef.current.play().catch(() => {});
				}
			} catch {
				setCameraError("Enable camera access");
			}
		};

		void startCamera();

		return () => {
			isCancelled = true;
			stopCurrentStream();
		};
	}, [isFrontCamera]);

	const captureCurrentFrame = () => {
		if (!videoRef.current) {
			return null;
		}

		const canvas = document.createElement("canvas");
		canvas.width = videoRef.current.videoWidth || 640;
		canvas.height = videoRef.current.videoHeight || 480;
		const context = canvas.getContext("2d");

		if (!context) {
			return null;
		}

		if (isFrontCamera) {
			context.translate(canvas.width, 0);
			context.scale(-1, 1);
		}

		context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
		return canvas.toDataURL("image/jpeg", 0.92);
	};

	const takeCapture = () => {
		if (captureMode === "video") {
			if (!streamRef.current) {
				return;
			}

			if (isRecording) {
				mediaRecorderRef.current?.stop();
				mediaRecorderRef.current = null;
				setIsRecording(false);
				const previewFrame = captureCurrentFrame();
				if (previewFrame) {
					setLastPhotoDataUrl(previewFrame);
				}
				return;
			}

			if (typeof MediaRecorder === "undefined") {
				setCameraError("Video recording unavailable");
				return;
			}

			try {
				recordedChunksRef.current = [];

				const supportedMimeType = MediaRecorder.isTypeSupported(
					"video/webm;codecs=vp9",
				)
					? "video/webm;codecs=vp9"
					: MediaRecorder.isTypeSupported("video/webm;codecs=vp8")
						? "video/webm;codecs=vp8"
						: MediaRecorder.isTypeSupported("video/webm")
							? "video/webm"
							: "";

				const recorder = supportedMimeType
					? new MediaRecorder(streamRef.current, {
							mimeType: supportedMimeType,
						})
					: new MediaRecorder(streamRef.current);

				recorder.ondataavailable = (event) => {
					if (event.data.size > 0) {
						recordedChunksRef.current.push(event.data);
					}
				};

				recorder.onstop = () => {
					mediaRecorderRef.current = null;
					recordedChunksRef.current = [];
				};

				recorder.start();
				mediaRecorderRef.current = recorder;
				setCameraError(null);
				setIsRecording(true);
			} catch {
				setCameraError("Video recording unavailable");
			}
			return;
		}

		const previewFrame = captureCurrentFrame();
		if (!previewFrame) {
			return;
		}

		setLastPhotoDataUrl(previewFrame);
		setShowFlashFrame(true);
	};

	const flashLabel =
		flashMode === "auto" ? "Auto" : flashMode === "on" ? "On" : "Off";

	const handleDragEnd = () => {
		if (!isLockscreenMode) {
			return;
		}

		if (screenY.get() > CLOSE_DRAG_THRESHOLD) {
			onClose?.();
			return;
		}

		animate(screenY, 0, {
			type: "spring",
			bounce: 0,
			duration: 0.28,
		});
	};

	return (
		<motion.div
			initial={
				isLockscreenMode
					? { y: LOCKSCREEN_CAMERA_INITIAL_Y, opacity: 1 }
					: { scale: 0.94, opacity: 0 }
			}
			animate={{ y: 0, scale: 1, opacity: 1 }}
			exit={
				isLockscreenMode
					? { y: LOCKSCREEN_CAMERA_INITIAL_Y, opacity: 1 }
					: { scale: 0.94, opacity: 0 }
			}
			transition={{ type: "spring", bounce: 0, duration: 0.32 }}
			style={isLockscreenMode ? { y: screenY } : undefined}
			drag={isLockscreenMode ? "y" : false}
			dragConstraints={{ top: 0, bottom: 220 }}
			dragElastic={0.08}
			dragMomentum={false}
			onDragEnd={isLockscreenMode ? handleDragEnd : undefined}
			className="absolute inset-0 z-40 overflow-hidden bg-black"
		>
			<div className="absolute inset-0 bg-black" />

			<div
				className="absolute inset-x-0 top-0 overflow-hidden"
				style={{ bottom: CAMERA_CONTROLS_HEIGHT }}
			>
				<div className="absolute inset-0 bg-[#030303]" />
				<video
					ref={videoRef}
					autoPlay
					playsInline
					muted
					className={cn(
						"absolute inset-0 h-full w-full object-cover transition-transform duration-300",
						isFrontCamera ? "-scale-x-100" : "scale-x-100",
					)}
					style={{
						filter: "brightness(1.03) contrast(1.02) saturate(0.97)",
					}}
				/>
				<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,transparent_18%,transparent_84%,rgba(0,0,0,0.12)_100%)]" />
				{cameraError ? (
					<div className="absolute inset-0 flex items-center justify-center px-8 text-center font-medium text-[13px] text-white/48 tracking-[0.02em]">
						{cameraError}
					</div>
				) : null}

				<div className="absolute inset-x-[14px] top-[18px] z-20 flex items-center justify-between">
					<CameraControlPill
						className="h-[40px] w-[86px] gap-[7px] px-3 font-semibold text-[#111113] text-[14px] tracking-[-0.03em]"
						onClick={() =>
							setFlashMode((currentMode) =>
								currentMode === "on"
									? "off"
									: currentMode === "off"
										? "auto"
										: "on",
							)
						}
					>
						<FlashIcon className="h-[18px] w-[18px]" />
						<span>{flashLabel}</span>
					</CameraControlPill>

					<CameraControlPill
						className="h-[40px] w-[124px] px-4 font-semibold text-[#111113] text-[14px] tracking-[-0.03em]"
						onClick={() => setIsHdrOn((currentState) => !currentState)}
					>
						HDR {isHdrOn ? "On" : "Off"}
					</CameraControlPill>

					<CameraControlPill
						className="h-[40px] w-[70px] px-0 text-[#111113]"
						onClick={() => setIsFrontCamera((currentState) => !currentState)}
					>
						<CameraSwapIcon className="h-[22px] w-[22px]" />
					</CameraControlPill>
				</div>

				{captureMode === "video" && isRecording ? (
					<div className="absolute top-[58px] left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/55 px-3 py-1 text-[11px] text-white shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
						<div className="h-2 w-2 rounded-full bg-[#ff2a2a]" />
						REC
					</div>
				) : null}
			</div>

			<div
				className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,#e9eaed_0%,#d3d4d8_42%,#babcc1_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_-2px_0_rgba(0,0,0,0.68)]"
				style={{ height: CAMERA_CONTROLS_HEIGHT }}
			>
				<div className="absolute inset-x-0 top-0 h-px bg-white/95" />
				<div className="absolute inset-x-0 top-[1px] h-px bg-black/12" />
				<div className="absolute inset-x-0 bottom-0 h-[18px] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.12))]" />

				<div className="relative h-full w-full">
					<button
						type="button"
						className="absolute top-[17px] left-[12px] h-[39px] w-[39px] overflow-hidden rounded-[4px] border border-[#4a4b4f] bg-[linear-gradient(180deg,#0a0a0a_0%,#050505_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_2px_rgba(0,0,0,0.45)]"
						aria-label="Last photo"
					>
						<div
							className="absolute inset-[1px] rounded-[2px] bg-center bg-cover"
							style={{
								backgroundColor: "#030303",
								backgroundImage: lastPhotoDataUrl
									? `url(${lastPhotoDataUrl})`
									: "none",
							}}
						/>
					</button>

					<button
						type="button"
						onClick={takeCapture}
						className="absolute top-[11px] left-1/2 flex h-[50px] w-[148px] -translate-x-1/2 items-center justify-center rounded-full border border-[#9b9ca1] bg-[linear-gradient(180deg,#dfe0e3_0%,#cdced2_56%,#afb1b7_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.96),inset_0_-1px_0_rgba(0,0,0,0.08),0_2px_5px_rgba(0,0,0,0.16)]"
						aria-label={
							captureMode === "video"
								? isRecording
									? "Stop recording"
									: "Start recording"
								: "Take photo"
						}
					>
						<div className="absolute inset-[3px] rounded-full border border-white/42" />
						<div
							className={cn(
								"flex h-[40px] w-[58px] items-center justify-center rounded-[16px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]",
								captureMode === "video"
									? cn(
											"border-[#743737]",
											isRecording
												? "bg-[linear-gradient(180deg,#ff5959_0%,#cf1717_100%)]"
												: "bg-[linear-gradient(180deg,#f07d7d_0%,#ca3030_100%)]",
										)
									: "border-[#5a5d63] bg-[linear-gradient(180deg,#5f6269_0%,#32353b_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_0_rgba(255,255,255,0.06)]",
							)}
						>
							{captureMode === "video" ? (
								<div
									className={cn(
										"h-[16px] w-[16px]",
										isRecording
											? "rounded-[5px] bg-white"
											: "rounded-full bg-white",
									)}
								/>
							) : (
								<CameraGlyph className="h-[20px] w-[20px]" />
							)}
						</div>
					</button>

					<div className="absolute top-[10px] right-[11px] flex w-[84px] flex-col items-center gap-[5px]">
						<div className="flex w-[56px] items-center justify-between text-[#33353a]">
							<CameraGlyph className="h-[19px] w-[19px]" />
							<CameraGlyph video className="h-[19px] w-[19px]" />
						</div>
						<button
							type="button"
							onClick={() => {
								if (isRecording) {
									mediaRecorderRef.current?.stop();
									mediaRecorderRef.current = null;
								}
								setCaptureMode((currentMode) =>
									currentMode === "photo" ? "video" : "photo",
								);
								setIsRecording(false);
							}}
							className="relative h-[23px] w-[82px] rounded-full border border-[#8f9094] bg-[linear-gradient(180deg,#c7c8cc_0%,#acafb4_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.12)]"
							aria-label={`Switch to ${
								captureMode === "photo" ? "video" : "photo"
							} mode`}
						>
							<motion.div
								animate={{ x: captureMode === "photo" ? 1 : 39 }}
								transition={{ type: "spring", bounce: 0, duration: 0.2 }}
								className="absolute top-[1px] h-[19px] w-[40px] rounded-full bg-[linear-gradient(180deg,#efeff2_0%,#d7d8dc_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.94),0_1px_1px_rgba(0,0,0,0.16)]"
							/>
						</button>
					</div>
				</div>
			</div>

			{showFlashFrame ? (
				<div className="pointer-events-none absolute inset-0 bg-white/90" />
			) : null}
		</motion.div>
	);
}

const LOCKSCREEN_CAMERA_INITIAL_Y = 568;
