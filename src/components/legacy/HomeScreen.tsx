"use client";

import { animate, motion, type PanInfo, useMotionValue } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LegacyClock } from "~/components/legacy-clock";
import { PROJECT_BY_SLUG } from "~/data/projects";
import { cn } from "~/lib/utils";
import { useLegacyUiLocale } from "./legacy-locale-context";
import {
	ORDERED_PROJECT_APP_ENTRIES,
	type ProjectAppIconMeta,
} from "./project-app-registry";
import LegacyDock from "./ui/LegacyDock";
import { LEGACY_IOS_FONT_FAMILY } from "./ui/legacy-status-data";

type FolderId = "utilities";

type IconSpec = {
	id?: string;
	folderId?: FolderId;
	label: {
		en: string;
		ru: string;
	};
	clockVariant?: "day" | "night";
	iconPath?: string;
	generatedIcon?: ProjectAppIconMeta;
	calendar?: boolean;
	folderIcons?: string[];
	isInstalling?: boolean;
	isNew?: boolean;
};

const ICON_BASE_ASSET_PATH = "/figma/legacy-dock/icon-base.png";
const WALLPAPER_ASSET_PATH = "/figma/legacy-home/wallpaper.png";
const PAGE_SEARCH_ASSET_PATH = "/figma/legacy-home/page-search.svg";
const PAGE_ACTIVE_ASSET_PATH = "/figma/legacy-home/page-active.svg";
const PAGE_INACTIVE_ASSET_PATH = "/figma/legacy-home/page-inactive.svg";
const FOLDER_POINTER_ASSET_PATH = "/figma/legacy-home/folder-pointer.png";
const FOLDER_FABRIC_ASSET_PATH = "/figma/legacy-home/folder-fabric.png";
const HOME_SCREEN_PAGE_WIDTH = 320;
const HOME_SCREEN_SWIPE_OFFSET_THRESHOLD = 56;
const HOME_SCREEN_SWIPE_VELOCITY_THRESHOLD = 320;
const HOME_SCREEN_TAP_SUPPRESSION_MS = 180;
const PROJECT_ICONS_PER_ROW = 4;
const PROJECT_ROWS_PER_PAGE = 4;

const HOME_SCREEN_PAGES: Array<Array<Array<IconSpec | null>>> = [
	[
		[
			{
				label: { en: "Messages", ru: "Сообщения" },
				iconPath: "/figma/legacy-home/messages.png",
			},
			{
				label: { en: "Calendar", ru: "Календарь" },
				iconPath: "/figma/legacy-home/calendar.png",
				calendar: true,
			},
			{
				id: "projects",
				label: { en: "Photos", ru: "Фото" },
				iconPath: "/figma/legacy-home/photos.png",
			},
			{
				id: "camera",
				label: { en: "Camera", ru: "Камера" },
				iconPath: "/figma/legacy-home/camera.png",
			},
		],
		[
			{
				label: { en: "Videos", ru: "Видео" },
				iconPath: "/figma/legacy-home/videos.png",
			},
			{
				label: { en: "Maps", ru: "Карты" },
				iconPath: "/figma/legacy-home/maps.png",
			},
			{
				label: { en: "Weather", ru: "Погода" },
				iconPath: "/figma/legacy-home/weather.png",
			},
			{
				label: { en: "Passbook", ru: "Кошелек" },
				iconPath: "/figma/legacy-home/passbook.png",
			},
		],
		[
			{
				id: "about",
				label: { en: "Notes", ru: "Заметки" },
				iconPath: "/figma/legacy-home/notes.png",
			},
			{
				label: { en: "Reminders", ru: "Напомин." },
				iconPath: "/figma/legacy-home/reminders.png",
			},
			{
				label: { en: "Clock", ru: "Часы" },
				clockVariant: "day",
			},
			{
				label: { en: "Stocks", ru: "Акции" },
				iconPath: "/figma/legacy-home/stocks.png",
			},
		],
		[
			{
				label: { en: "Newsstand", ru: "Пресса" },
				iconPath: "/figma/legacy-home/newsstand.png",
			},
			{
				id: "music",
				label: { en: "iTunes", ru: "iTunes" },
				iconPath: "/figma/legacy-home/itunes.png",
			},
			{
				label: { en: "App Store", ru: "App Store" },
				iconPath: "/figma/legacy-home/app-store.png",
			},
			{
				label: { en: "Game Center", ru: "Игры" },
				iconPath: "/figma/legacy-home/game-center.png",
			},
		],
		[
			{
				id: "experience",
				label: { en: "Settings", ru: "Настройки" },
				iconPath: "/figma/legacy-home/settings.png",
			},
			null,
			null,
			null,
		],
	],
	[
		[
			{
				folderId: "utilities",
				label: { en: "Utilities", ru: "Утилиты" },
				iconPath: "/figma/legacy-home/utilities.png",
				folderIcons: [
					"/figma/legacy-home/utilities-1.png",
					"/figma/legacy-home/utilities-2.png",
					"/figma/legacy-home/utilities-3.png",
					"/figma/legacy-home/utilities-4.png",
				],
			},
			{
				id: "projects",
				label: { en: "iPhoto", ru: "iPhoto" },
				iconPath: "/figma/legacy-home/iphoto.png",
			},
			{
				label: { en: "iMovie", ru: "iMovie" },
				iconPath: "/figma/legacy-home/imovie.png",
			},
			{
				label: { en: "GarageBand", ru: "GarageBand" },
				iconPath: "/figma/legacy-home/garageband.png",
				isNew: true,
			},
		],
		[
			{
				label: { en: "Pages", ru: "Pages" },
				iconPath: "/figma/legacy-home/pages.png",
				isNew: true,
			},
			{
				label: { en: "Numbers", ru: "Numbers" },
				iconPath: "/figma/legacy-home/numbers.png",
				isNew: true,
			},
			{
				label: { en: "Loading...", ru: "Загрузка..." },
				iconPath: "/figma/legacy-home/loading.png",
				isInstalling: true,
			},
			null,
		],
	],
];

const FOLDERS: Record<
	FolderId,
	{
		title: { en: string; ru: string };
		rows: Array<Array<IconSpec | null>>;
	}
> = {
	utilities: {
		title: { en: "Utilities", ru: "Утилиты" },
		rows: [
			[
				{
					id: "contact",
					label: { en: "Contacts", ru: "Контакты" },
					iconPath: "/figma/legacy-home/utilities-1.png",
				},
				{
					label: { en: "Calculator", ru: "Калькулятор" },
					iconPath: "/figma/legacy-home/utilities-2.png",
				},
				{
					label: { en: "Compass", ru: "Компас" },
					iconPath: "/figma/legacy-home/utilities-3.png",
				},
				{
					label: { en: "Voice Memos", ru: "Диктофон" },
					iconPath: "/figma/legacy-home/utilities-4.png",
				},
			],
		],
	},
};

function padIconRow(row: IconSpec[]): Array<IconSpec | null> {
	return [
		...row,
		...Array.from(
			{ length: Math.max(0, PROJECT_ICONS_PER_ROW - row.length) },
			() => null,
		),
	];
}

function buildProjectHomeScreenPages() {
	const projectIcons: IconSpec[] = ORDERED_PROJECT_APP_ENTRIES.map((entry) => {
		const project = PROJECT_BY_SLUG[entry.slug];

		return {
			id: entry.appId,
			label: {
				en: project.title,
				ru: project.title,
			},
			generatedIcon: entry.icon,
		};
	});

	const pageSize = PROJECT_ICONS_PER_ROW * PROJECT_ROWS_PER_PAGE;
	const pages: Array<Array<Array<IconSpec | null>>> = [];

	for (
		let pageStart = 0;
		pageStart < projectIcons.length;
		pageStart += pageSize
	) {
		const pageIcons = projectIcons.slice(pageStart, pageStart + pageSize);
		const rows: Array<Array<IconSpec | null>> = [];

		for (
			let rowStart = 0;
			rowStart < pageIcons.length;
			rowStart += PROJECT_ICONS_PER_ROW
		) {
			rows.push(
				padIconRow(pageIcons.slice(rowStart, rowStart + PROJECT_ICONS_PER_ROW)),
			);
		}

		pages.push(rows);
	}

	return pages;
}

const ALL_HOME_SCREEN_PAGES = [
	...HOME_SCREEN_PAGES,
	...buildProjectHomeScreenPages(),
];

function PageController({
	activePage,
	pageCount,
	onSelectPage,
}: {
	activePage: number;
	pageCount: number;
	onSelectPage: (pageIndex: number) => void;
}) {
	return (
		<div className="absolute inset-x-0 bottom-[82px] z-10 flex items-center justify-center gap-[8px]">
			<div className="relative h-[8px] w-[8px]">
				<Image
					alt=""
					src={PAGE_SEARCH_ASSET_PATH}
					fill
					sizes="8px"
					unoptimized
					className="pointer-events-none object-contain"
				/>
			</div>
			{Array.from({ length: pageCount }, (_, index) => (
				<button
					type="button"
					key={`page-dot-${index + 1}`}
					onClick={() => onSelectPage(index)}
					className="relative flex h-[22px] w-[22px] touch-manipulation items-center justify-center transition-transform active:scale-[0.9]"
					aria-label={`Home page ${index + 1}`}
				>
					<div className="relative h-[6px] w-[6px]">
						<Image
							alt=""
							src={
								activePage === index
									? PAGE_ACTIVE_ASSET_PATH
									: PAGE_INACTIVE_ASSET_PATH
							}
							fill
							sizes="6px"
							unoptimized
							className="pointer-events-none object-contain"
						/>
					</div>
				</button>
			))}
		</div>
	);
}

function CalendarOverlay({ locale }: { locale: "en" | "ru" }) {
	return (
		<>
			<div
				className="absolute inset-x-0 top-[3px] overflow-hidden text-center text-[8px] text-white uppercase"
				style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
			>
				{locale === "ru" ? "СРЕДА" : "Wednesday"}
			</div>
			<div
				className="absolute inset-x-0 top-[14px] overflow-hidden text-center text-[#333] text-[39px]"
				style={{
					fontFamily: LEGACY_IOS_FONT_FAMILY,
					fontWeight: 700,
					lineHeight: "44px",
				}}
			>
				12
			</div>
		</>
	);
}

function IconArtwork({
	clockVariant,
	iconPath,
	generatedIcon,
	calendar,
	folderIcons,
	isInstalling,
	isNew,
	locale,
}: {
	clockVariant?: "day" | "night";
	iconPath?: string;
	generatedIcon?: ProjectAppIconMeta;
	calendar?: boolean;
	folderIcons?: string[];
	isInstalling?: boolean;
	isNew?: boolean;
	locale: "en" | "ru";
}) {
	if (clockVariant) {
		return (
			<div className="relative h-[57px] w-[57px] shrink-0">
				<LegacyClock
					aria-hidden="true"
					size={57}
					variant={clockVariant}
					withShadow={false}
				/>
			</div>
		);
	}

	return (
		<div className="relative h-[57px] w-[57px] shrink-0 overflow-hidden rounded-[10px] shadow-[0_1px_1px_rgba(0,0,0,0.3),0_2px_2px_rgba(0,0,0,0.3),0_10px_10px_rgba(0,0,0,0.3)]">
			<div aria-hidden="true" className="pointer-events-none absolute inset-0">
				<Image
					alt=""
					src={ICON_BASE_ASSET_PATH}
					fill
					sizes="57px"
					className="object-cover"
				/>
				{iconPath ? (
					<Image
						alt=""
						src={iconPath}
						fill
						sizes="57px"
						className="object-cover"
					/>
				) : null}
			</div>
			{generatedIcon ? (
				<div
					className="absolute inset-[4px] overflow-hidden rounded-[8px]"
					style={{
						backgroundImage: `linear-gradient(180deg, ${generatedIcon.accentFrom} 0%, ${generatedIcon.accentTo} 100%)`,
					}}
				>
					<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_48%,rgba(0,0,0,0.12)_100%)]" />
					<div
						className="absolute top-[5px] left-[5px] rounded-full px-[5px] py-[1px] text-[#13233e] text-[7px]"
						style={{
							fontFamily: LEGACY_IOS_FONT_FAMILY,
							fontWeight: 700,
							backgroundColor: generatedIcon.glow,
						}}
					>
						{generatedIcon.badge}
					</div>
					{generatedIcon.motif === "bars" ? (
						<div className="absolute right-[7px] bottom-[9px] left-[7px] flex items-end justify-center gap-[3px] opacity-80">
							<div className="h-[12px] w-[6px] rounded-t-[2px] bg-white/55" />
							<div className="h-[18px] w-[6px] rounded-t-[2px] bg-white/75" />
							<div className="h-[24px] w-[6px] rounded-t-[2px] bg-white/95" />
						</div>
					) : null}
					{generatedIcon.motif === "orbit" ? (
						<div className="absolute inset-0">
							<div className="absolute top-[13px] left-[12px] h-[20px] w-[20px] rounded-full border border-white/60" />
							<div className="absolute top-[10px] right-[10px] h-[9px] w-[9px] rounded-full bg-white/85" />
						</div>
					) : null}
					{generatedIcon.motif === "cards" ? (
						<div className="absolute inset-0">
							<div className="absolute top-[15px] left-[11px] h-[18px] w-[23px] rounded-[5px] border border-white/35 bg-white/20" />
							<div className="absolute top-[11px] left-[18px] h-[18px] w-[23px] rounded-[5px] border border-white/45 bg-white/35" />
						</div>
					) : null}
					{generatedIcon.motif === "grid" ? (
						<div className="absolute top-[13px] left-[12px] grid grid-cols-2 gap-[4px]">
							{Array.from({ length: 4 }, (_, index) => (
								<div
									key={`${generatedIcon.symbol}-${index + 1}`}
									className="h-[9px] w-[9px] rounded-[2px] bg-white/75"
								/>
							))}
						</div>
					) : null}
					{generatedIcon.motif === "book" ? (
						<div className="absolute top-[12px] left-[13px] h-[20px] w-[28px] rounded-[3px] border border-white/45 bg-white/30 shadow-[inset_1px_0_0_rgba(255,255,255,0.2)]">
							<div className="absolute inset-y-0 left-1/2 w-[1px] -translate-x-1/2 bg-white/45" />
						</div>
					) : null}
					{generatedIcon.motif === "spark" ? (
						<div className="absolute top-[12px] left-[14px]">
							<div className="h-[18px] w-[18px] rotate-45 rounded-[4px] bg-white/78" />
							<div className="absolute top-[5px] left-[5px] h-[8px] w-[8px] rotate-45 rounded-[2px] bg-white" />
						</div>
					) : null}
					{generatedIcon.motif === "wave" ? (
						<div className="absolute top-[17px] right-[9px] left-[9px]">
							<div className="h-[4px] rounded-full bg-white/85" />
							<div className="mt-[4px] ml-[4px] h-[4px] rounded-full bg-white/65" />
							<div className="mt-[4px] ml-[9px] h-[4px] rounded-full bg-white/45" />
						</div>
					) : null}
					<div
						className="absolute inset-x-[4px] bottom-[5px] truncate text-center text-[14px] text-white"
						style={{
							fontFamily: LEGACY_IOS_FONT_FAMILY,
							fontWeight: 700,
							textShadow: "0 1px 1px rgba(0,0,0,0.45)",
						}}
					>
						{generatedIcon.symbol}
					</div>
				</div>
			) : null}
			{folderIcons ? (
				<div className="pointer-events-none absolute top-[6px] left-1/2 grid h-[28px] w-[28px] -translate-x-1/2 grid-cols-2 gap-[4px]">
					{folderIcons.map((folderIconPath, index) => (
						<div
							key={`${folderIconPath}-${index + 1}`}
							className="relative h-[12px] w-[12px] overflow-hidden rounded-[2px]"
						>
							<Image
								alt=""
								src={ICON_BASE_ASSET_PATH}
								fill
								sizes="12px"
								className="object-cover"
							/>
							<Image
								alt=""
								src={folderIconPath}
								fill
								sizes="12px"
								className="object-cover"
							/>
						</div>
					))}
				</div>
			) : null}
			{calendar ? <CalendarOverlay locale={locale} /> : null}
			{isInstalling ? (
				<div className="pointer-events-none absolute inset-0 rounded-[10px] bg-black/50">
					<div className="absolute right-[6px] bottom-[6px] left-[6px] h-[9px] rounded-[5px] bg-gradient-to-b from-[#030303] to-[#2b2b2b] shadow-[0_0.5px_0_rgba(255,255,255,0.1),0_1px_0_rgba(255,255,255,0.1)]">
						<div className="absolute inset-y-[1px] left-[1px] w-[26px] rounded-[5px] bg-[linear-gradient(180deg,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0.2)_50%,rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_100%),linear-gradient(90deg,#236ed8_0%,#236ed8_100%)]" />
					</div>
				</div>
			) : null}
			{isNew ? (
				<div className="pointer-events-none absolute top-[-1.5px] left-[calc(50%+7.5px)] h-[45px] w-[45px]">
					<div className="absolute top-[-18px] left-[-4px] flex h-[67px] w-[67px] items-center justify-center">
						<div className="relative h-[16px] w-[45px] rotate-45 overflow-hidden rounded-[1px] shadow-[0.5px_0.5px_1px_rgba(0,0,0,0.8)]">
							<div className="absolute inset-0 bg-[#236ed8]" />
							<div className="absolute inset-0 bg-gradient-to-r from-[20%] from-white to-[80%] to-black mix-blend-soft-light" />
							<div
								className="absolute inset-0 flex items-center justify-center text-[10px] text-white"
								style={{
									fontFamily: LEGACY_IOS_FONT_FAMILY,
									fontWeight: 700,
									textShadow: "0 -0.5px 0 rgba(0,0,0,0.6)",
								}}
							>
								New
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}

function HomeIcon({
	app,
	locale,
	onActivate,
	dimmed = false,
	hideLabel = false,
}: {
	app: IconSpec | null;
	locale: "en" | "ru";
	onActivate: (app: IconSpec) => void;
	dimmed?: boolean;
	hideLabel?: boolean;
}) {
	if (!app) {
		return <div className="w-[68px] shrink-0" aria-hidden="true" />;
	}

	const label = app.label[locale];
	const appId = app.id;
	const folderId = app.folderId;
	const interactive = Boolean(appId || folderId);
	const content = (
		<>
			<IconArtwork
				calendar={app.calendar}
				clockVariant={app.clockVariant}
				folderIcons={app.folderIcons}
				generatedIcon={app.generatedIcon}
				iconPath={app.iconPath}
				isInstalling={app.isInstalling}
				isNew={app.isNew}
				locale={locale}
			/>
			<span
				className={cn(
					"w-full text-center font-bold text-[11px] text-white leading-[12px] [text-shadow:0_2px_2px_rgba(0,0,0,0.8)]",
					hideLabel ? "opacity-0" : "",
				)}
				style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
			>
				{label}
			</span>
		</>
	);

	if (!interactive) {
		return (
			<div
				className={cn(
					"flex w-[68px] flex-col items-center gap-[4px]",
					dimmed ? "opacity-20 mix-blend-luminosity" : "",
				)}
			>
				{content}
			</div>
		);
	}

	return (
		<button
			type="button"
			onClick={() => onActivate(app)}
			className={cn(
				"flex w-[68px] flex-col items-center gap-[4px] transition-transform duration-100 hover:brightness-[1.03] active:scale-[0.94]",
				dimmed ? "opacity-20 mix-blend-luminosity" : "",
			)}
			aria-label={label}
		>
			{content}
		</button>
	);
}

function AppRow({
	apps,
	locale,
	onActivate,
	getIconState,
}: {
	apps: Array<IconSpec | null>;
	locale: "en" | "ru";
	onActivate: (app: IconSpec) => void;
	getIconState?: (
		app: IconSpec | null,
		iconIndex: number,
	) => {
		dimmed?: boolean;
		hideLabel?: boolean;
	};
}) {
	return (
		<div className="flex items-start justify-between px-[6px] pt-[13px] pb-[2px]">
			{apps.map((app, index) => {
				const iconState = getIconState?.(app, index);

				return (
					<HomeIcon
						app={app}
						dimmed={iconState?.dimmed}
						hideLabel={iconState?.hideLabel}
						key={`${index}-${app?.label.en ?? "empty"}`}
						locale={locale}
						onActivate={onActivate}
					/>
				);
			})}
		</div>
	);
}

function FolderOverlay({
	folderId,
	locale,
	onActivate,
	onClose,
}: {
	folderId: FolderId;
	locale: "en" | "ru";
	onActivate: (app: IconSpec) => void;
	onClose: () => void;
}) {
	const folder = FOLDERS[folderId];

	return (
		<>
			<button
				type="button"
				onClick={onClose}
				className="absolute inset-0 z-20 cursor-default"
				aria-label={`Close ${folder.title[locale]} folder`}
			/>
			<motion.div
				initial={{ opacity: 0, y: 10, scale: 0.98 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.18, ease: "easeOut" }}
				className="absolute inset-x-0 top-[84px] z-30 flex flex-col pt-[10px] pb-[5px] shadow-[0_-1px_0_rgba(255,255,255,0.2),0_1px_0_rgba(255,255,255,0.2)]"
				style={{
					backgroundImage: `url(${FOLDER_FABRIC_ASSET_PATH})`,
					backgroundPosition: "top left",
					backgroundSize: "128px 128px",
				}}
				onClick={(event) => event.stopPropagation()}
			>
				<div className="absolute top-[-13px] left-[32px] h-[13px] w-[25px]">
					<Image
						alt=""
						src={FOLDER_POINTER_ASSET_PATH}
						fill
						sizes="25px"
						className="pointer-events-none object-contain"
					/>
				</div>

				<div className="relative z-10 px-[16px]">
					<h2
						className="overflow-hidden text-ellipsis text-[21px] text-white [text-shadow:0_2px_2px_rgba(0,0,0,0.8)]"
						style={{
							fontFamily: LEGACY_IOS_FONT_FAMILY,
							fontWeight: 700,
							lineHeight: "20px",
						}}
					>
						{folder.title[locale]}
					</h2>
				</div>

				<div className="relative z-10">
					{folder.rows.map((row, index) => (
						<AppRow
							apps={row}
							key={`folder-${folderId}-row-${index + 1}`}
							locale={locale}
							onActivate={onActivate}
						/>
					))}
				</div>

				<div className="pointer-events-none absolute inset-0 shadow-[inset_0_-5px_10px_rgba(0,0,0,0.3),inset_0_5px_10px_rgba(0,0,0,0.3)]" />
			</motion.div>
		</>
	);
}

export default function HomeScreen({
	onAppOpen,
}: {
	onAppOpen: (id: string) => void;
}) {
	const locale = useLegacyUiLocale();
	const [activePage, setActivePage] = useState(0);
	const [openFolderId, setOpenFolderId] = useState<FolderId | null>(null);
	const pageCount = ALL_HOME_SCREEN_PAGES.length;
	const pageTrackX = useMotionValue(0);
	const suppressTapUntilRef = useRef(0);

	useEffect(() => {
		const controls = animate(pageTrackX, activePage * -HOME_SCREEN_PAGE_WIDTH, {
			type: "spring",
			stiffness: 320,
			damping: 32,
			bounce: 0,
		});

		return () => controls.stop();
	}, [activePage, pageTrackX]);

	const handleActivate = (app: IconSpec) => {
		if (Date.now() < suppressTapUntilRef.current) {
			return;
		}

		if (app.folderId) {
			const folderId = app.folderId;

			setOpenFolderId((currentFolderId) =>
				currentFolderId === folderId ? null : folderId,
			);
			return;
		}

		if (app.id) {
			setOpenFolderId(null);
			onAppOpen(app.id);
		}
	};

	const handleSelectPage = (pageIndex: number) => {
		setOpenFolderId(null);
		setActivePage(pageIndex);
	};

	const handlePagerDragEnd = (
		_event: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo,
	) => {
		const horizontalSwipe =
			Math.abs(info.offset.x) >= HOME_SCREEN_SWIPE_OFFSET_THRESHOLD ||
			Math.abs(info.velocity.x) >= HOME_SCREEN_SWIPE_VELOCITY_THRESHOLD;

		if (!horizontalSwipe) {
			handleSelectPage(activePage);
			return;
		}

		const direction = info.offset.x < 0 || info.velocity.x < 0 ? 1 : -1;
		const nextPage = Math.max(
			0,
			Math.min(pageCount - 1, activePage + direction),
		);

		if (nextPage !== activePage) {
			suppressTapUntilRef.current = Date.now() + HOME_SCREEN_TAP_SUPPRESSION_MS;
		}

		handleSelectPage(nextPage);
	};

	return (
		<motion.div
			initial={{ scale: 1.04, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ duration: 0.35, ease: "easeOut" }}
			className="absolute inset-x-0 top-[20px] bottom-0 overflow-hidden bg-black"
		>
			<Image
				alt=""
				src={WALLPAPER_ASSET_PATH}
				fill
				sizes="320px"
				className="pointer-events-none object-cover"
			/>

			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-[220px] bg-gradient-to-b from-black/0 to-black/80" />

			<div className="absolute inset-x-0 top-0 bottom-[108px] touch-pan-y overflow-hidden">
				<motion.div
					style={{
						x: pageTrackX,
						width: `${pageCount * HOME_SCREEN_PAGE_WIDTH}px`,
					}}
					drag={openFolderId ? false : "x"}
					dragConstraints={{
						left: -((pageCount - 1) * HOME_SCREEN_PAGE_WIDTH),
						right: 0,
					}}
					dragElastic={0.08}
					dragMomentum={false}
					onDragEnd={handlePagerDragEnd}
					className="flex h-full"
				>
					{ALL_HOME_SCREEN_PAGES.map((pageRows, pageIndex) => (
						<div
							key={`home-page-${pageIndex + 1}`}
							className="h-full w-[320px] shrink-0"
						>
							{pageRows.map((row, rowIndex) => (
								<AppRow
									apps={row}
									getIconState={
										openFolderId && pageIndex === activePage
											? (_, iconIndex) => {
													if (
														openFolderId === "utilities" &&
														pageIndex === 1 &&
														rowIndex === 0 &&
														iconIndex === 0
													) {
														return { hideLabel: true };
													}

													return { dimmed: true };
												}
											: undefined
									}
									key={`home-page-${pageIndex + 1}-row-${rowIndex + 1}`}
									locale={locale}
									onActivate={handleActivate}
								/>
							))}
						</div>
					))}
				</motion.div>
			</div>

			{openFolderId ? (
				<FolderOverlay
					folderId={openFolderId}
					locale={locale}
					onActivate={handleActivate}
					onClose={() => setOpenFolderId(null)}
				/>
			) : (
				<PageController
					activePage={activePage}
					pageCount={pageCount}
					onSelectPage={handleSelectPage}
				/>
			)}
			<LegacyDock onAppOpen={onAppOpen} />
		</motion.div>
	);
}
