"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLocale } from "next-intl";
import { type ReactNode, useEffect, useState } from "react";
import { PROJECT_BY_SLUG } from "~/data/projects";
import AboutApp from "./apps/AboutApp";
import CameraApp from "./apps/CameraApp";
import ExperienceApp from "./apps/ExperienceApp";
import MailApp from "./apps/MailApp";
import MusicApp from "./apps/MusicApp";
import PhoneApp from "./apps/PhoneApp";
import ProjectCaseApp from "./apps/ProjectCaseApp";
import ProjectsApp from "./apps/ProjectsApp";
import SafariApp from "./apps/SafariApp";
import HomeScreen from "./HomeScreen";
import LockScreen from "./LockScreen";
import {
	getProjectSlugFromAppId,
	isProjectAppId,
} from "./project-app-registry";
import { LEGACY_IOS_FONT_FAMILY } from "./ui/legacy-status-data";
import StatusBar from "./ui/StatusBar";

const DEVICE_FRAME_WIDTH = 340;
const DEVICE_FRAME_HEIGHT = 730;
const DEVICE_SCREEN_WIDTH = 320;
const DEVICE_SCREEN_HEIGHT = 568;
const DEVICE_SCREEN_TOP = 81;
const MOBILE_SCALE_WIDTH = DEVICE_FRAME_WIDTH + 20;
const MOBILE_SCALE_HEIGHT = DEVICE_FRAME_HEIGHT + 34;
const POWER_BUTTON_TOP = -7;
const POWER_BUTTON_RIGHT = 54;
const SIDE_CONTROL_LEFT = -5;
const RINGER_SWITCH_TOP = 108;
const VOLUME_UP_TOP = 160;
const VOLUME_DOWN_TOP = 220;
const FRONT_CAMERA_TOP = 40;
const FRONT_CAMERA_OFFSET_X = -48;
const FRONT_SPEAKER_TOP = 42;
const FRONT_SPEAKER_WIDTH = 46;
const FRONT_SPEAKER_HEIGHT = 6;
const VOLUME_BAR_IDS = Array.from(
	{ length: 16 },
	(_, index) => `volume-bar-${index}`,
);

const HOME_COPY = {
	en: {
		title: "Hey, I'm Danya Yudin.",
		description:
			"Creative Designer & Developer based in Saint Petersburg. I build interfaces that feel alive, blending modern engineering with classic design sensibilities.",
		cta: "Slide to unlock the experience on the right.",
		homeButton: "Home",
		placeholderApp: "App",
	},
	ru: {
		title: "Привет, я Даня Юдин.",
		description:
			"Креативный дизайнер и разработчик из Санкт-Петербурга. Я собираю интерфейсы, в которых современная инженерия соединяется с уважением к классическому цифровому ремеслу.",
		cta: "Разблокируй экран справа, чтобы открыть интерфейс.",
		homeButton: "Домой",
		placeholderApp: "Приложение",
	},
} as const;

const APP_DEFINITIONS = {
	about: {
		title: { en: "Notes", ru: "Заметки" },
		render: () => <AboutApp />,
		statusBarVariant: "opaque",
		useSystemChrome: false,
	},
	contact: {
		title: { en: "Phone", ru: "Телефон" },
		render: () => <PhoneApp />,
		statusBarVariant: "translucent",
		useSystemChrome: true,
	},
	experience: {
		title: { en: "Settings", ru: "Настройки" },
		render: () => <ExperienceApp />,
		statusBarVariant: "translucent",
		useSystemChrome: true,
	},
	mail: {
		title: { en: "Mail", ru: "Почта" },
		render: () => <MailApp />,
		statusBarVariant: "translucent",
		useSystemChrome: true,
	},
	music: {
		title: { en: "Music", ru: "Музыка" },
		render: () => <MusicApp />,
		statusBarVariant: "translucent",
		useSystemChrome: true,
	},
	projects: {
		title: { en: "Photos", ru: "Фото" },
		render: () => <ProjectsApp />,
		statusBarVariant: "translucent",
		useSystemChrome: true,
	},
	safari: {
		title: { en: "Safari", ru: "Safari" },
		render: () => <SafariApp />,
		statusBarVariant: "opaque",
		useSystemChrome: false,
	},
} as const;

type AppDefinitionId = keyof typeof APP_DEFINITIONS;
type AppChromeDefinition = {
	title: Record<"en" | "ru", string>;
	render: () => ReactNode;
	statusBarVariant: "opaque" | "translucent";
	useSystemChrome: boolean;
};

function isRegisteredApp(appId: string): appId is AppDefinitionId {
	return Object.hasOwn(APP_DEFINITIONS, appId);
}

function resolveAppDefinition(appId: string): AppChromeDefinition | null {
	if (isRegisteredApp(appId)) {
		return APP_DEFINITIONS[appId];
	}

	if (isProjectAppId(appId)) {
		const projectSlug = getProjectSlugFromAppId(appId);
		const project = PROJECT_BY_SLUG[projectSlug];

		return {
			title: {
				en: project.title,
				ru: project.title,
			},
			render: () => <ProjectCaseApp slug={projectSlug} />,
			statusBarVariant: "translucent",
			useSystemChrome: true,
		};
	}

	return null;
}

export default function IOSContainer() {
	const locale = useLocale();
	const resolvedLocale = locale === "ru" ? "ru" : "en";
	const copy = HOME_COPY[resolvedLocale];
	const [isLocked, setIsLocked] = useState(true);
	const [activeApp, setActiveApp] = useState<string | null>(null);
	const [isLockScreenCameraOpen, setIsLockScreenCameraOpen] = useState(false);
	const [lockScreenSession, setLockScreenSession] = useState(0);
	const [currentTime, setCurrentTime] = useState<Date | null>(null);
	const [isScreenOff, setIsScreenOff] = useState(false);
	const [volumeSettings, setVolumeSettings] = useState({
		show: false,
		level: 7,
		silent: false,
	});

	useEffect(() => {
		setCurrentTime(new Date());
		const timer = setInterval(() => setCurrentTime(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		if (volumeSettings.show) {
			const timer = setTimeout(() => {
				setVolumeSettings((prev) => ({ ...prev, show: false }));
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [volumeSettings.show]);

	const handleUnlock = () => {
		setIsLockScreenCameraOpen(false);
		setIsLocked(false);
	};

	const handleAppOpen = (appId: string) => setActiveApp(appId);

	const resetLockScreen = () => {
		setIsLockScreenCameraOpen(false);
		setLockScreenSession((currentSession) => currentSession + 1);
	};

	const handleHomeButton = () => {
		if (isScreenOff) {
			setIsScreenOff(false);
			resetLockScreen();
			return;
		}

		if (activeApp) {
			setActiveApp(null);
			return;
		}

		setIsLocked(true);
		resetLockScreen();
	};

	const shouldHideShellStatusBar =
		isLockScreenCameraOpen || activeApp === "camera";
	const shouldShowShellWallpaper = !isLocked;
	const activeChromeApp = activeApp ? resolveAppDefinition(activeApp) : null;
	const activeStatusBarVariant = activeChromeApp?.statusBarVariant;
	const activeAppUsesSystemChrome = activeChromeApp?.useSystemChrome ?? true;

	return (
		<div className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-8 overflow-hidden bg-neutral-950 p-4 font-sans md:flex-row md:gap-20 md:p-12">
			<div className="hidden max-w-lg flex-col text-white md:flex">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<h1 className="mb-6 font-bold text-5xl tracking-tight">
						{copy.title}
					</h1>
					<p className="mb-8 text-neutral-400 text-xl leading-relaxed">
						{copy.description}
					</p>
					<p className="text-neutral-500">{copy.cta}</p>
				</motion.div>
			</div>

			<div className="group relative mx-auto flex shrink-0 origin-center flex-col items-center justify-center sm:mx-0">
				<div
					className="relative overflow-visible rounded-[48px] border-[#5f5f5f] border-[3px] bg-black"
					style={{
						width: DEVICE_FRAME_WIDTH,
						height: DEVICE_FRAME_HEIGHT,
						zoom: "min(var(--scale-factor, 1), 1)",
					}}
				>
					<style>{`
						@media (max-width: 640px) {
							.group > div {
								transform: scale(min(min(100vw / ${MOBILE_SCALE_WIDTH}, 100dvh / ${MOBILE_SCALE_HEIGHT}), 1));
								transform-origin: top center;
							}
						}
					`}</style>

					<div className="relative z-10">
						<button
							type="button"
							onClick={() => {
								setIsScreenOff(!isScreenOff);
								if (!isScreenOff) {
									setIsLocked(true);
									setActiveApp(null);
									resetLockScreen();
								}
							}}
							className="absolute z-10 h-[5px] w-[50px] cursor-pointer rounded-t-[4px] bg-[#5f5f5f] transition-all active:translate-y-px"
							style={{
								top: POWER_BUTTON_TOP,
								right: POWER_BUTTON_RIGHT,
							}}
							aria-label="Sleep/Wake"
						/>

						<button
							type="button"
							onClick={() => {
								setVolumeSettings((prev) => ({
									...prev,
									show: true,
									silent: !prev.silent,
								}));
							}}
							className="absolute z-10 h-[22px] w-[4px] cursor-pointer rounded-l-[3px] bg-[#5f5f5f] transition-all active:translate-x-px"
							style={{
								top: RINGER_SWITCH_TOP,
								left: SIDE_CONTROL_LEFT,
							}}
							aria-label="Ring/Silent Switch"
						/>

						<button
							type="button"
							onClick={() => {
								setVolumeSettings((prev) => ({
									...prev,
									show: true,
									level: Math.min(16, prev.level + 1),
								}));
							}}
							className="absolute z-10 h-[36px] w-[4px] cursor-pointer rounded-l-[4px] bg-[#5f5f5f] transition-all active:translate-x-px"
							style={{
								top: VOLUME_UP_TOP,
								left: SIDE_CONTROL_LEFT,
							}}
							aria-label="Volume Up"
						/>

						<button
							type="button"
							onClick={() => {
								setVolumeSettings((prev) => ({
									...prev,
									show: true,
									level: Math.max(0, prev.level - 1),
								}));
							}}
							className="absolute z-10 h-[36px] w-[4px] cursor-pointer rounded-l-[4px] bg-[#5f5f5f] transition-all active:translate-x-px"
							style={{
								top: VOLUME_DOWN_TOP,
								left: SIDE_CONTROL_LEFT,
							}}
							aria-label="Volume Down"
						/>
					</div>

					<div
						className="absolute left-1/2 z-50 h-[10px] w-[10px] rounded-full bg-[#111]"
						style={{
							top: FRONT_CAMERA_TOP,
							transform: `translateX(${FRONT_CAMERA_OFFSET_X}px)`,
						}}
					/>

					<div
						className="absolute left-1/2 z-50 -translate-x-[50%] rounded-full bg-[#2a2a2a]"
						style={{
							top: FRONT_SPEAKER_TOP,
							width: FRONT_SPEAKER_WIDTH,
							height: FRONT_SPEAKER_HEIGHT,
						}}
					/>

					<div
						className="absolute left-1/2 overflow-hidden bg-black"
						style={{
							width: DEVICE_SCREEN_WIDTH + 4,
							height: DEVICE_SCREEN_HEIGHT + 4,
							top: DEVICE_SCREEN_TOP - 2,
							transform: "translateX(-50%)",
						}}
					>
						<div className="relative m-[2px] h-[568px] w-[320px] overflow-hidden bg-black text-white">
							<AnimatePresence>
								{!isScreenOff ? (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3, ease: "easeInOut" }}
										className="relative h-full w-full"
									>
										{shouldShowShellWallpaper ? (
											<div
												className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-1000"
												style={{ backgroundImage: "url('/ios5-water.jpg')" }}
											/>
										) : null}

										{!shouldHideShellStatusBar && !isLocked ? (
											<StatusBar
												locale={locale}
												time={currentTime}
												variant={activeStatusBarVariant}
											/>
										) : null}

										<AnimatePresence mode="wait">
											{isLocked && isLockScreenCameraOpen ? (
												<CameraApp
													key={`lockscreen-camera-${lockScreenSession}`}
													mode="lockscreen"
													onClose={() => setIsLockScreenCameraOpen(false)}
												/>
											) : isLocked ? (
												<LockScreen
													key={`lockscreen-${lockScreenSession}`}
													locale={locale}
													time={currentTime}
													onUnlock={handleUnlock}
													onOpenCamera={() => setIsLockScreenCameraOpen(true)}
												/>
											) : activeApp === "camera" ? (
												<CameraApp key="camera-app" mode="app" />
											) : activeApp ? (
												<motion.div
													key={`app-${activeApp}`}
													initial={{ scale: 0.8, opacity: 0 }}
													animate={{ scale: 1, opacity: 1 }}
													exit={{
														scale: 0.8,
														opacity: 0,
														transition: { duration: 0.2 },
													}}
													transition={{
														type: "spring",
														damping: 20,
														stiffness: 300,
													}}
													className="absolute inset-x-0 top-[20px] bottom-0 z-40 overflow-hidden bg-[#dfe5ef] text-black"
												>
													{activeAppUsesSystemChrome ? (
														<div className="relative flex h-full flex-col bg-[#dfe5ef]">
															<div className="relative z-20 flex h-[44px] items-center justify-center border-[#2D3642] border-b bg-gradient-to-b from-[#c4d0df] via-[#8fa2bd] to-[#7289a7] px-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.46)]">
																<div className="pointer-events-none absolute inset-x-0 top-0 h-[15px] bg-[linear-gradient(180deg,rgba(255,255,255,0.48),rgba(255,255,255,0))]" />
																<button
																	type="button"
																	onClick={handleHomeButton}
																	className="absolute left-2 flex h-[30px] items-center rounded-[7px] border border-[#2f4158] bg-gradient-to-b from-[#6a7f99] to-[#4b5e76] px-3 font-bold text-[12px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_1px_0_rgba(255,255,255,0.16)] active:brightness-75"
																>
																	<span
																		style={{
																			fontFamily: LEGACY_IOS_FONT_FAMILY,
																			textShadow: "0 -1px 0 rgba(0,0,0,0.5)",
																		}}
																	>
																		{copy.homeButton}
																	</span>
																</button>
																<span
																	className="max-w-[170px] truncate text-[20px] text-white tracking-tight shadow-black/50 drop-shadow-[0_-1px_0_rgba(0,0,0,0.5)]"
																	style={{
																		fontFamily: LEGACY_IOS_FONT_FAMILY,
																		fontWeight: 700,
																	}}
																>
																	{activeChromeApp
																		? activeChromeApp.title[resolvedLocale]
																		: copy.placeholderApp}
																</span>
															</div>
															<div className="relative flex-1 overflow-hidden bg-white">
																{activeChromeApp ? (
																	activeChromeApp.render()
																) : (
																	<div className="flex h-full items-center justify-center bg-white p-4">
																		<p
																			className="text-gray-500 text-xl drop-shadow-sm"
																			style={{
																				fontFamily: LEGACY_IOS_FONT_FAMILY,
																				fontWeight: 700,
																			}}
																		>
																			Coming in iOS 5
																		</p>
																	</div>
																)}
															</div>
														</div>
													) : (
														<div className="relative h-full overflow-hidden bg-white">
															{activeChromeApp
																? activeChromeApp.render()
																: null}
														</div>
													)}
												</motion.div>
											) : (
												<HomeScreen
													key="homescreen"
													onAppOpen={handleAppOpen}
												/>
											)}
										</AnimatePresence>
									</motion.div>
								) : null}
							</AnimatePresence>

							<AnimatePresence>
								{volumeSettings.show && !isScreenOff ? (
									<motion.div
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.8 }}
										className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center"
									>
										<div className="flex h-[140px] w-[140px] flex-col items-center justify-center gap-4 rounded-[20px] bg-black/60 shadow-lg backdrop-blur-md">
											{volumeSettings.silent ? (
												<div className="flex flex-col items-center gap-2">
													<div className="relative flex h-10 w-10 items-center justify-center">
														<div className="relative h-6 w-6 rounded-t-full bg-white">
															<div className="absolute -bottom-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white" />
														</div>
														<div className="absolute top-1/2 left-[-4px] h-[3px] w-12 -translate-y-1/2 -rotate-45 rounded-full bg-white shadow-[0_0_0_2px_rgba(0,0,0,0.4)]" />
													</div>
													<span className="font-bold text-white tracking-wide">
														Silent
													</span>
												</div>
											) : (
												<div className="flex w-full flex-col items-center gap-4 px-4">
													<div className="flex h-10 w-10 items-center justify-center">
														<div className="relative h-6 w-6 rounded-t-full bg-white">
															<div className="absolute -bottom-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white" />
														</div>
													</div>
													<span className="font-bold text-white tracking-wide">
														Ringer
													</span>
													<div className="flex h-3 w-full items-end justify-between gap-1">
														{VOLUME_BAR_IDS.map((barId, index) => (
															<div
																key={barId}
																className={`h-[90%] w-full rounded-[1px] ${
																	index < volumeSettings.level
																		? "bg-white"
																		: "bg-white/30"
																}`}
															/>
														))}
													</div>
												</div>
											)}
										</div>
									</motion.div>
								) : null}
							</AnimatePresence>
						</div>
					</div>

					<button
						type="button"
						onClick={handleHomeButton}
						className="absolute bottom-[11px] left-1/2 z-40 flex h-[55px] w-[55px] -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border-[#5f5f5f] border-[2px] bg-black transition-all duration-75 active:scale-[0.98]"
						aria-label="Home"
					>
						<div className="pointer-events-none absolute h-[18px] w-[18px] rounded-[4px] border-[#5f5f5f] border-[2px]" />
					</button>
				</div>
			</div>
		</div>
	);
}
