"use client";

import Image from "next/image";
import {
	type FormEvent,
	type ReactNode,
	useEffect,
	useEffectEvent,
	useRef,
	useState,
} from "react";
import { getCaseStudyPath } from "~/data/projects";
import {
	getLocalizedHashPathname,
	getLocalizedPathname,
} from "~/i18n/locale-paths";
import { useLegacyUiLocale } from "../legacy-locale-context";
import { LEGACY_IOS_FONT_FAMILY } from "../ui/legacy-status-data";

type Locale = "en" | "ru";
type SafariView =
	| "page"
	| "tabs"
	| "bookmarks"
	| "reading-list"
	| "history"
	| "icloud";
type IconKind = "book" | "reading" | "history" | "icloud";
type SafariInternalUrl = "about:favorites";

type BrowserPageEntry = {
	id: string;
	title: string;
	url: string;
	description?: string;
};

type SafariInternalEntry = {
	id: string;
	title: string;
	url: SafariInternalUrl;
	description?: string;
	internalUrl: SafariInternalUrl;
};

type BrowserEntry = BrowserPageEntry | SafariInternalEntry;

type BrowserTab = {
	id: string;
	history: BrowserEntry[];
	historyIndex: number;
	reloadNonce: number;
};

type Destination = {
	key: string;
	title: string;
	url: string;
	description: string;
	keywords: string[];
};

type HistorySection = {
	id: string;
	title: string;
	items: BrowserEntry[];
};

type ICloudSection = {
	id: string;
	title: string;
	items: BrowserEntry[];
};

type FavoriteSite = {
	id: string;
	title: string;
	url: string;
	description: string;
	accentFrom: string;
	accentTo: string;
	monogram: string;
};

type LegacyButtonProps = {
	label: string;
	onClick: () => void;
	variant?: "blue" | "gray";
	disabled?: boolean;
	icon?: ReactNode;
};

type ToolbarButtonProps = {
	label: string;
	onClick: () => void;
	disabled?: boolean;
	children: ReactNode;
};

type ListRowProps = {
	title: string;
	subtitle?: string;
	icon: ReactNode;
	iconKind?: IconKind;
	onClick: () => void;
	showChevron?: boolean;
	editing?: boolean;
	deleteLabel?: string;
	onDelete?: () => void;
};

const NAVIGATION_BAR_BACKGROUND =
	"linear-gradient(180deg, #c1d1e4 0%, #a1b2c9 33%, #758cab 67%, #557094 100%)";
const TOOLBAR_BACKGROUND =
	"linear-gradient(180deg, #b5c4d7 0%, #98abc3 33%, #7189a8 67%, #577296 100%)";
const BLUE_BUTTON_BACKGROUND =
	"linear-gradient(180deg, #93b5f6 0%, #6790e1 33%, #3c71da 67%, #2562d9 100%)";
const GREY_BUTTON_BACKGROUND =
	"linear-gradient(180deg, #a2b2c9 0%, #798eac 33%, #506d94 67%, #405f8a 100%)";
const TABS_BACKGROUND =
	"linear-gradient(180deg, #92a1ad 0%, #647b8d 28%, #4a6276 100%)";
const SAFARI_ASSETS = {
	bookmarksBook: "/figma/legacy-safari/bookmarks-book.svg",
	bookmarksDrill: "/figma/legacy-safari/bookmarks-drill.svg",
	bookmarksHistory: "/figma/legacy-safari/bookmarks-history.png",
	bookmarksIcloud: "/figma/legacy-safari/bookmarks-icloud.png",
	bookmarksReading: "/figma/legacy-safari/bookmarks-reading.svg",
	icloudDirection: "/figma/legacy-safari/icloud-direction.svg",
	pageBack: "/figma/legacy-safari/page-back.svg",
	pageBook: "/figma/legacy-safari/page-book.svg",
	pageForward: "/figma/legacy-safari/page-forward.svg",
	pageLock: "/figma/legacy-safari/page-lock.svg",
	pageRefresh: "/figma/legacy-safari/page-refresh.svg",
	pageShare: "/figma/legacy-safari/page-share.svg",
	pageTabs: "/figma/legacy-safari/page-tabs.svg",
	tabsClose: "/figma/legacy-safari/tabs-close.svg",
	tabsCloseGloss: "/figma/legacy-safari/tabs-close-gloss.svg",
	tabsDot: "/figma/legacy-safari/tabs-dot.svg",
	tabsDotActive: "/figma/legacy-safari/tabs-dot-active.svg",
} as const;
const PROXY_IFRAME_REVISION = 2;
const SCRIPT_ONLY_HOSTS = new Set([
	"mobile.twitter.com",
	"twitter.com",
	"www.twitter.com",
	"www.x.com",
	"x.com",
]);

const COPY = {
	en: {
		searchPlaceholder: "Search",
		done: "Done",
		favorites: "Favorites",
		bookmarks: "Bookmarks",
		readingList: "Reading List",
		history: "History",
		icloudTabs: "iCloud Tabs",
		edit: "Edit",
		delete: "Delete",
		newPage: "New Page",
		openExternally: "Open Externally",
		addBookmark: "Add Bookmark",
		addToReadingList: "Add to Reading List",
		copyLink: "Copy Link",
		cancel: "Cancel",
		searchFallbackTitle: "Web Search",
		searchFallbackDescription:
			"Pages that fail inside the legacy browser shell can still be opened in a real tab.",
		embeddedDescription:
			"This is a live page from the site, not a screenshot. Use the address bar, toolbar, or the page itself to navigate.",
		unsupportedTitle: "This page won't embed here.",
		unsupportedDescription:
			"This address depends on modern browser features that the legacy Safari shell blocks. Open it in a real tab instead.",
		bookmarkSaved: "Bookmark saved.",
		readingListSaved: "Added to Reading List.",
		alreadySaved: "Already saved.",
		linkCopied: "Link copied.",
		today: "Today",
		earlier: "Earlier",
		recentlyVisited: "Recently Visited",
		noItems: "Nothing here yet.",
		noRecentSites: "Start browsing and your recent pages will show up here.",
		clearEdit: "Done",
		openOnTablet: "Open on Denys's iPad 2",
		openOnLaptop: "Open on MacBook Pro",
		work: "Work",
		contact: "Contact",
		components: "Components",
		springboard: "SpringBoard",
		vaparshop: "VAPARSHOP",
		hornyPlace: "HORNY PLACE",
		priceTagPrinter: "Price Tag Printer",
		archTaplink: "ARCH Taplink",
		floristQuiz: "Florist Quiz",
	},
	ru: {
		searchPlaceholder: "Поиск",
		done: "Готово",
		favorites: "Избранное",
		bookmarks: "Закладки",
		readingList: "Список чтения",
		history: "История",
		icloudTabs: "Вкладки iCloud",
		edit: "Править",
		delete: "Удалить",
		newPage: "Новая страница",
		openExternally: "Открыть снаружи",
		addBookmark: "В закладки",
		addToReadingList: "В список чтения",
		copyLink: "Скопировать ссылку",
		cancel: "Отмена",
		searchFallbackTitle: "Поиск в интернете",
		searchFallbackDescription:
			"Если страница не открывается в этой оболочке Safari, её можно вынести в отдельную вкладку.",
		embeddedDescription:
			"Это живая страница сайта, а не картинка. Навигация работает через адресную строку, тулбар и сами ссылки внутри страницы.",
		unsupportedTitle: "Эта страница не встраивается.",
		unsupportedDescription:
			"Этот адрес зависит от современных возможностей браузера, которые старая оболочка Safari блокирует. Его можно открыть во внешней вкладке.",
		bookmarkSaved: "Закладка сохранена.",
		readingListSaved: "Добавлено в список чтения.",
		alreadySaved: "Уже сохранено.",
		linkCopied: "Ссылка скопирована.",
		today: "Сегодня",
		earlier: "Ранее",
		recentlyVisited: "Недавние страницы",
		noItems: "Пока пусто.",
		noRecentSites:
			"Начни открывать страницы, и здесь появится недавняя история.",
		clearEdit: "Готово",
		openOnTablet: "Открыто на iPad Denys",
		openOnLaptop: "Открыто на MacBook Pro",
		work: "Кейсы",
		contact: "Контакты",
		components: "Компоненты",
		springboard: "SpringBoard",
		vaparshop: "VAPARSHOP",
		hornyPlace: "HORNY PLACE",
		priceTagPrinter: "Price Tag Printer",
		archTaplink: "ARCH Taplink",
		floristQuiz: "Florist Quiz",
	},
} as const;

const FAVORITE_SITES: FavoriteSite[] = [
	{
		id: "favorite-shadcn",
		title: "shadcn/ui",
		url: "https://ui.shadcn.com",
		description: "Patterns, docs, and components.",
		accentFrom: "#d6d9df",
		accentTo: "#717b89",
		monogram: "UI",
	},
	{
		id: "favorite-codrops",
		title: "Codrops",
		url: "https://tympanus.net/codrops/",
		description: "Frontend experiments and references.",
		accentFrom: "#f0b572",
		accentTo: "#ab5b1a",
		monogram: "C",
	},
	{
		id: "favorite-chanhdai",
		title: "chanhdai.com",
		url: "https://chanhdai.com/",
		description: "Editorial web inspiration.",
		accentFrom: "#ed9ea0",
		accentTo: "#9d334a",
		monogram: "CD",
	},
];

function resolveLocale(locale: string): Locale {
	return locale === "ru" ? "ru" : "en";
}

function localePath(locale: Locale, path: string) {
	return getLocalizedPathname(locale, path);
}

function isSafariInternalUrl(url: string): url is SafariInternalUrl {
	return url === "about:favorites";
}

function makeEntry(
	id: string,
	title: string,
	url: string,
	description?: string,
): BrowserPageEntry {
	return {
		id,
		title,
		url,
		description,
	};
}

function makeInternalEntry(
	id: string,
	title: string,
	url: SafariInternalUrl,
	description?: string,
): SafariInternalEntry {
	return {
		id,
		title,
		url,
		description,
		internalUrl: url,
	};
}

function cloneEntry(entry: BrowserEntry, id: string): BrowserEntry {
	return {
		...entry,
		id,
	};
}

function stripProtocol(url: string) {
	return url.replace(/^https?:\/\//, "");
}

function ensureProtocol(url: string) {
	if (isSafariInternalUrl(url)) {
		return url;
	}

	if (/^[a-z][a-z0-9+.-]*:/i.test(url)) {
		return url;
	}

	const hostname = url.split("/")[0]?.toLowerCase() ?? "";
	const shouldUseCurrentProtocol =
		hostname.startsWith("localhost") ||
		hostname.startsWith("127.") ||
		hostname.startsWith("[::1]") ||
		hostname.startsWith("0.0.0.0");

	if (shouldUseCurrentProtocol && typeof window !== "undefined") {
		return `${window.location.protocol}//${url}`;
	}

	return `https://${url}`;
}

function isBrowserFrameUrl(url: string) {
	if (isSafariInternalUrl(url)) {
		return false;
	}

	if (url.startsWith("/")) {
		return true;
	}

	try {
		const parsed =
			typeof window === "undefined"
				? new URL(url)
				: new URL(url, window.location.origin);
		return parsed.protocol === "http:" || parsed.protocol === "https:";
	} catch {
		return false;
	}
}

function isSameOriginUrl(url: string) {
	if (isSafariInternalUrl(url)) {
		return false;
	}

	if (url.startsWith("/")) {
		return true;
	}

	if (typeof window === "undefined") {
		return false;
	}

	try {
		const parsed = new URL(url, window.location.origin);
		return parsed.origin === window.location.origin;
	} catch {
		return false;
	}
}

function toAbsoluteUrl(url: string) {
	if (isSafariInternalUrl(url)) {
		return url;
	}

	if (typeof window === "undefined") {
		return url;
	}

	try {
		return new URL(url, window.location.origin).toString();
	} catch {
		return url;
	}
}

function requiresExternalBrowser(url: string) {
	if (isSafariInternalUrl(url) || url.startsWith("/")) {
		return false;
	}

	try {
		const parsed =
			typeof window === "undefined"
				? new URL(url)
				: new URL(url, window.location.origin);
		return SCRIPT_ONLY_HOSTS.has(parsed.hostname.toLowerCase());
	} catch {
		return false;
	}
}

function toBrowserFrameUrl(url: string) {
	if (isSafariInternalUrl(url)) {
		return null;
	}

	if (!isBrowserFrameUrl(url)) {
		return null;
	}

	if (requiresExternalBrowser(url)) {
		return null;
	}

	if (isSameOriginUrl(url)) {
		return toAbsoluteUrl(url);
	}

	return `/api/safari-proxy?url=${encodeURIComponent(toAbsoluteUrl(url))}`;
}

function toStoredUrl(url: string) {
	if (isSafariInternalUrl(url)) {
		return url;
	}

	if (typeof window === "undefined") {
		return url;
	}

	try {
		const parsed = new URL(url, window.location.origin);
		if (parsed.origin === window.location.origin) {
			return `${parsed.pathname}${parsed.search}${parsed.hash}` || "/";
		}

		return parsed.toString();
	} catch {
		return url;
	}
}

function normalizeComparableUrl(url: string) {
	if (isSafariInternalUrl(url)) {
		return url;
	}

	try {
		if (typeof window === "undefined") {
			return url;
		}

		const parsed = new URL(url, window.location.origin);
		if (parsed.origin === window.location.origin) {
			return `${parsed.pathname}${parsed.search}${parsed.hash}` || "/";
		}

		return parsed.toString();
	} catch {
		return url;
	}
}

function formatAddressValue(url: string) {
	if (isSafariInternalUrl(url)) {
		return url;
	}

	if (typeof window === "undefined") {
		return stripProtocol(url);
	}

	try {
		const parsed = new URL(url, window.location.origin);
		if (parsed.origin === window.location.origin) {
			return `${window.location.host}${parsed.pathname}${parsed.search}${parsed.hash}`;
		}

		return stripProtocol(parsed.toString());
	} catch {
		return stripProtocol(url);
	}
}

function upsertSavedEntry(entries: BrowserEntry[], entry: BrowserEntry) {
	const comparableUrl = normalizeComparableUrl(entry.url);
	const filtered = entries.filter(
		(item) => normalizeComparableUrl(item.url) !== comparableUrl,
	);

	return [...filtered, entry];
}

function upsertRecentEntry(entries: BrowserEntry[], entry: BrowserEntry) {
	const comparableUrl = normalizeComparableUrl(entry.url);
	const filtered = entries.filter(
		(item) => normalizeComparableUrl(item.url) !== comparableUrl,
	);

	return [entry, ...filtered].slice(0, 12);
}

function buildHistorySections(
	entries: BrowserEntry[],
	copy: (typeof COPY)[Locale],
): HistorySection[] {
	if (entries.length === 0) {
		return [];
	}

	if (entries.length <= 4) {
		return [
			{
				id: "today",
				title: copy.today,
				items: entries,
			},
		];
	}

	return [
		{
			id: "today",
			title: copy.today,
			items: entries.slice(0, 4),
		},
		{
			id: "earlier",
			title: copy.earlier,
			items: entries.slice(4),
		},
	];
}

function buildDestinations(locale: Locale, copy: (typeof COPY)[Locale]) {
	return {
		work: {
			key: "work",
			title: copy.work,
			url: localePath(locale, "/work"),
			description:
				locale === "ru"
					? "Список кейсов и реальных запусков."
					: "The shipped work index and case-study hub.",
			keywords: ["work", "projects", "cases", "portfolio", "кейсы"],
		},
		contact: {
			key: "contact",
			title: copy.contact,
			url: getLocalizedHashPathname(locale, "/", "contact-section"),
			description:
				locale === "ru"
					? "Контакты, каналы связи и быстрые действия."
					: "Direct contact details and fast actions.",
			keywords: ["contact", "email", "telegram", "контакты"],
		},
		components: {
			key: "components",
			title: copy.components,
			url: localePath(locale, "/components"),
			description:
				locale === "ru"
					? "Каталог UI-экспериментов и компонентов."
					: "Component experiments and UI surfaces.",
			keywords: ["components", "ui", "ios", "компоненты"],
		},
		vaparshop: {
			key: "vaparshop",
			title: copy.vaparshop,
			url: getCaseStudyPath(locale, "vaparshop"),
			description:
				locale === "ru"
					? "Кейс по ботам, автоматизации и Telegram-коммерции."
					: "Telegram commerce, bots, and internal tooling case study.",
			keywords: ["vaparshop", "telegram", "retail", "case study"],
		},
		hornyPlace: {
			key: "horny-place",
			title: copy.hornyPlace,
			url: getCaseStudyPath(locale, "horny-place"),
			description:
				locale === "ru"
					? "Брендовая платформа с выразительной подачей."
					: "Brand platform with a stronger visual direction.",
			keywords: ["horny place", "brand", "retail", "website"],
		},
		priceTagPrinter: {
			key: "price-tag-printer",
			title: copy.priceTagPrinter,
			url: getCaseStudyPath(locale, "price-tag-printer"),
			description:
				locale === "ru"
					? "Инструмент печати ценников с табличным импортом."
					: "Spreadsheet-driven price tag generator.",
			keywords: ["price tag", "printer", "tool", "retail"],
		},
		archTaplink: {
			key: "arch-taplink",
			title: copy.archTaplink,
			url: getCaseStudyPath(locale, "arch-taplink"),
			description:
				locale === "ru"
					? "Лендинг и link-hub для ARCH."
					: "Store landing and link hub for ARCH.",
			keywords: ["arch", "taplink", "landing", "link hub"],
		},
		floristQuiz: {
			key: "florist-quiz",
			title: copy.floristQuiz,
			url: getCaseStudyPath(locale, "florist-quiz"),
			description:
				locale === "ru"
					? "Мобильный учебный квиз и PWA."
					: "Mobile-first learning quiz and PWA.",
			keywords: ["florist", "quiz", "pwa", "game"],
		},
	} satisfies Record<string, Destination>;
}

function SafariAssetIcon({
	src,
	className,
	width,
	height,
}: {
	src: string;
	className: string;
	width: number;
	height: number;
}) {
	return (
		// biome-ignore lint/performance/noImgElement: tiny Safari chrome glyphs need exact intrinsic sizing without Next image resizing warnings.
		<img
			alt=""
			aria-hidden
			src={src}
			width={width}
			height={height}
			className={className}
			loading="eager"
			decoding="async"
		/>
	);
}

function LockGlyph() {
	return (
		<span className="relative block h-[11px] w-[9px] overflow-visible">
			<SafariAssetIcon
				src={SAFARI_ASSETS.pageLock}
				className="absolute top-0 left-0 h-3 w-[9px] max-w-none"
				width={9}
				height={12}
			/>
		</span>
	);
}

function ChevronLeftGlyph() {
	return (
		<SafariAssetIcon
			src={SAFARI_ASSETS.icloudDirection}
			className="h-[14px] w-[7px] max-w-none"
			width={7}
			height={14}
		/>
	);
}

function ChevronRightGlyph() {
	return (
		<SafariAssetIcon
			src={SAFARI_ASSETS.bookmarksDrill}
			className="h-[14px] w-[9px] max-w-none"
			width={9}
			height={14}
		/>
	);
}

function SearchGlyph() {
	return (
		<svg viewBox="0 0 16 16" className="h-[14px] w-[14px]" aria-hidden>
			<title>Search</title>
			<circle
				cx="6.5"
				cy="6.5"
				r="4.5"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
			/>
			<path
				d="M10.2 10.2 14 14"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeWidth="1.8"
			/>
		</svg>
	);
}

function BackGlyph() {
	return (
		<span className="relative block h-[30px] w-[30px]">
			<SafariAssetIcon
				src={SAFARI_ASSETS.pageBack}
				className="absolute top-[6px] left-[7px] h-[18px] w-[15px] max-w-none"
				width={15}
				height={18}
			/>
		</span>
	);
}

function ForwardGlyph() {
	return (
		<span className="relative block h-[30px] w-[30px]">
			<SafariAssetIcon
				src={SAFARI_ASSETS.pageForward}
				className="absolute top-[6px] left-[8px] h-[18px] w-[15px] max-w-none"
				width={15}
				height={18}
			/>
		</span>
	);
}

function ShareGlyph() {
	return (
		<span className="relative block h-[30px] w-[30px]">
			<SafariAssetIcon
				src={SAFARI_ASSETS.pageShare}
				className="absolute top-[5px] left-[6px] h-[18px] w-[23px] max-w-none"
				width={23}
				height={18}
			/>
		</span>
	);
}

function BookGlyph() {
	return (
		<span className="relative block h-[30px] w-[30px]">
			<SafariAssetIcon
				src={SAFARI_ASSETS.pageBook}
				className="absolute top-[7.5px] left-[3px] h-[16.1px] w-6 max-w-none"
				width={24}
				height={16.1008}
			/>
		</span>
	);
}

function BookmarkBookGlyph() {
	return (
		<span className="relative block h-[30px] w-[30px]">
			<SafariAssetIcon
				src={SAFARI_ASSETS.bookmarksBook}
				className="absolute top-[7.5px] left-[3px] h-[16.1px] w-6 max-w-none"
				width={24}
				height={16.1008}
			/>
		</span>
	);
}

function TabsGlyph() {
	return (
		<span className="relative block h-[30px] w-[30px]">
			<SafariAssetIcon
				src={SAFARI_ASSETS.pageTabs}
				className="absolute top-[6px] left-[5px] h-[18px] w-5 max-w-none"
				width={20}
				height={18}
			/>
		</span>
	);
}

function RefreshGlyph({ spinning = false }: { spinning?: boolean }) {
	return (
		<span className="relative block h-5 w-5">
			<SafariAssetIcon
				src={SAFARI_ASSETS.pageRefresh}
				className={`absolute top-[1.5px] left-[3px] h-[16.5px] w-[14px] max-w-none ${spinning ? "animate-spin" : ""}`}
				width={14}
				height={16.5}
			/>
		</span>
	);
}

function ReadingListGlyph() {
	return (
		<span className="relative block h-[30px] w-[30px]">
			<SafariAssetIcon
				src={SAFARI_ASSETS.bookmarksReading}
				className="absolute top-[8.5px] left-[0.5px] h-[12.5px] w-[29px] max-w-none"
				width={29}
				height={12.5}
			/>
		</span>
	);
}

function HistoryGlyph() {
	return (
		<SafariAssetIcon
			src={SAFARI_ASSETS.bookmarksHistory}
			className="h-[30px] w-[30px] max-w-none"
			width={30}
			height={30}
		/>
	);
}

function ICloudGlyph() {
	return (
		<SafariAssetIcon
			src={SAFARI_ASSETS.bookmarksIcloud}
			className="h-[30px] w-[30px] max-w-none"
			width={30}
			height={30}
		/>
	);
}

function CloseGlyph() {
	return (
		<SafariAssetIcon
			src={SAFARI_ASSETS.tabsClose}
			className="h-5 w-5 max-w-none"
			width={20}
			height={20}
		/>
	);
}

function MinusGlyph() {
	return (
		<svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
			<title>Delete</title>
			<path
				d="M3.5 8h9"
				fill="none"
				stroke="currentColor"
				strokeWidth="2.2"
				strokeLinecap="round"
			/>
		</svg>
	);
}

function LegacyBarButton({
	label,
	onClick,
	variant = "gray",
	disabled = false,
	icon,
}: LegacyButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={`relative inline-flex h-[29px] items-center justify-center gap-[5px] overflow-hidden rounded-[5px] px-[10px] text-[12px] text-white shadow-[0_0.5px_0.5px_rgba(255,255,255,0.4)] ${
				disabled ? "opacity-45" : ""
			}`}
			style={{
				fontFamily: LEGACY_IOS_FONT_FAMILY,
				fontWeight: 700,
				textShadow: "0 -1px 0 rgba(0,0,0,0.4)",
				backgroundImage:
					variant === "blue" ? BLUE_BUTTON_BACKGROUND : GREY_BUTTON_BACKGROUND,
				boxShadow:
					"0 0.5px 0.5px rgba(255,255,255,0.4), inset 0 0 1px rgba(0,0,0,1), inset 0 1px 0.5px rgba(0,0,0,0.4)",
			}}
		>
			{icon}
			<span className="relative z-10 whitespace-nowrap">{label}</span>
		</button>
	);
}

function ToolbarButton({
	label,
	onClick,
	disabled = false,
	children,
}: ToolbarButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			aria-label={label}
			className={`relative h-[30px] w-[30px] text-white [text-shadow:0_-1px_0_rgba(0,0,0,0.4)] ${
				disabled ? "opacity-25" : "opacity-100"
			}`}
		>
			{children}
		</button>
	);
}

function SectionTitle({ title }: { title: string }) {
	return (
		<div
			className="sticky top-0 z-10 flex h-6 items-center px-3 text-white"
			style={{
				backgroundImage:
					"linear-gradient(180deg, rgba(135,153,164,0.9) 0%, rgba(185,195,204,0.9) 100%)",
				boxShadow:
					"inset 0 0.5px 0 rgba(0,0,0,0.1), inset 0 1px 0 rgba(0,0,0,0.15), inset 0 1.5px 0 rgba(255,255,255,0.1), inset 0 2px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.1)",
			}}
		>
			<span
				className="text-[18px]"
				style={{
					fontFamily: LEGACY_IOS_FONT_FAMILY,
					fontWeight: 700,
					textShadow: "0 1px 0 rgba(0,0,0,0.4)",
				}}
			>
				{title}
			</span>
		</div>
	);
}

function RowIcon({
	icon,
	iconKind = "book",
}: {
	icon: ReactNode;
	iconKind?: IconKind;
}) {
	const iconClassName =
		iconKind === "history"
			? "text-[#8f98a2]"
			: iconKind === "icloud"
				? "text-[#8793a5]"
				: "text-[#5a79ad]";

	return (
		<div
			className={`flex h-[30px] w-[30px] items-center justify-center ${iconClassName}`}
		>
			{icon}
		</div>
	);
}

function ListRow({
	title,
	subtitle,
	icon,
	iconKind = "book",
	onClick,
	showChevron = false,
	editing = false,
	deleteLabel,
	onDelete,
}: ListRowProps) {
	return (
		<div
			className={`flex items-center border-[#0000001f] border-b bg-white ${
				subtitle ? "min-h-[50px]" : "h-[44px]"
			}`}
		>
			{editing && onDelete ? (
				<button
					type="button"
					onClick={onDelete}
					aria-label={deleteLabel}
					className="ml-[6px] flex h-6 w-6 items-center justify-center rounded-full bg-[#cf2a23] text-white shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
				>
					<MinusGlyph />
				</button>
			) : null}
			<button
				type="button"
				onClick={onClick}
				className="flex min-h-inherit flex-1 items-center gap-[10px] px-[10px] text-left"
			>
				<RowIcon icon={icon} iconKind={iconKind} />
				<div className="min-w-0 flex-1">
					<p
						className={`truncate text-black ${subtitle ? "text-[17px]" : "text-[20px]"}`}
						style={{
							fontFamily: LEGACY_IOS_FONT_FAMILY,
							fontWeight: 700,
						}}
					>
						{title}
					</p>
					{subtitle ? (
						<p
							className="truncate text-[#808080] text-[14px]"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
						>
							{subtitle}
						</p>
					) : null}
				</div>
			</button>
			{editing && onDelete ? (
				<button
					type="button"
					onClick={onDelete}
					className="mr-2 rounded-[5px] bg-[#cf2a23] px-3 py-1 text-white"
					style={{
						fontFamily: LEGACY_IOS_FONT_FAMILY,
						fontWeight: 700,
						fontSize: 12,
					}}
				>
					{deleteLabel}
				</button>
			) : showChevron ? (
				<div className="mr-[10px] text-[#8d8d8d]">
					<ChevronRightGlyph />
				</div>
			) : null}
		</div>
	);
}

function LegacyActionSheetButton({
	label,
	onClick,
	variant = "other",
}: {
	label: string;
	onClick: () => void;
	variant?: "other" | "destructive" | "cancel";
}) {
	const isOther = variant === "other";
	const isDestructive = variant === "destructive";

	return (
		<button
			type="button"
			onClick={onClick}
			className="relative block w-full overflow-hidden rounded-[12px] bg-[rgba(0,0,0,0.3)] p-[3px] text-left shadow-[0_1px_0_rgba(255,255,255,0.2),inset_0_1px_2px_rgba(0,0,0,0.8)] active:translate-y-px"
		>
			<span
				className={`relative flex h-[39px] items-center justify-center overflow-hidden rounded-[9px] px-2 pb-[2px] ${
					isOther
						? "bg-[#c2c3c5]"
						: isDestructive
							? "bg-[#d40c0d]"
							: "bg-[#2b3038]"
				}`}
				style={{ boxShadow: "0 2px 2px rgba(0,0,0,0.5)" }}
			>
				<span
					className={`relative z-[2] block flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-center text-[20px] ${
						isOther ? "text-black" : "text-white"
					}`}
					style={{
						fontFamily: LEGACY_IOS_FONT_FAMILY,
						fontWeight: 700,
						textShadow: isOther
							? "0 1px 0 rgba(255,255,255,0.4)"
							: variant === "cancel"
								? "0 -1px 0 rgba(0,0,0,0.4)"
								: "0 -1px 0 rgba(0,0,0,0.2)",
					}}
				>
					{label}
				</span>
				<span
					aria-hidden
					className={`absolute inset-0 ${
						isOther
							? "bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.6)_100%)]"
							: isDestructive
								? "bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.3)_100%)]"
								: "bg-[linear-gradient(180deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.05)_100%)]"
					}`}
				/>
				<span
					aria-hidden
					className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.1)]"
				/>
			</span>
		</button>
	);
}

function UnsupportedPage({
	title,
	url,
	copy,
	onOpenExternally,
}: {
	title: string;
	url: string;
	copy: (typeof COPY)[Locale];
	onOpenExternally: () => void;
}) {
	return (
		<div className="flex h-full flex-col items-center justify-center bg-[linear-gradient(180deg,#f5f5f5_0%,#e7e7e7_100%)] px-6 text-center text-black">
			<div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,#77c7ff_0%,#2b75e0_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_12px_20px_rgba(61,105,180,0.2)]">
				<TabsGlyph />
			</div>
			<p
				className="mt-5 text-[24px] leading-[1.05]"
				style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
			>
				{copy.unsupportedTitle}
			</p>
			<p
				className="mt-3 max-w-[240px] text-[#636363] text-[14px] leading-[19px]"
				style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
			>
				{copy.unsupportedDescription}
			</p>
			<div className="mt-4 max-w-[240px] rounded-[14px] border border-[#d6d6d6] bg-white px-4 py-3 shadow-[0_1px_0_rgba(255,255,255,0.8)]">
				<p
					className="truncate text-[15px] text-black"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
				>
					{title}
				</p>
				<p
					className="mt-1 break-all text-[#7c7c7c] text-[12px] leading-[16px]"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
				>
					{stripProtocol(url)}
				</p>
			</div>
			<div className="mt-5">
				<LegacyBarButton
					label={copy.openExternally}
					onClick={onOpenExternally}
					variant="blue"
				/>
			</div>
		</div>
	);
}

function FavoritesPreview() {
	return (
		<div className="flex h-full w-full flex-col bg-[linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] p-[10px]">
			<div className="grid grid-cols-2 gap-[8px]">
				{FAVORITE_SITES.map((site) => (
					<div
						key={site.id}
						className="relative h-[76px] overflow-hidden rounded-[14px] border border-white/70 shadow-[0_6px_10px_rgba(51,65,85,0.12)]"
						style={{
							backgroundImage: `linear-gradient(180deg, ${site.accentFrom} 0%, ${site.accentTo} 100%)`,
						}}
					>
						<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.38)_0%,rgba(255,255,255,0)_52%,rgba(0,0,0,0.12)_100%)]" />
						<div
							className="absolute top-[12px] left-[12px] text-[24px] text-white"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
						>
							{site.monogram}
						</div>
						<div
							className="absolute right-[10px] bottom-[10px] left-[10px] truncate text-[11px] text-white"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
						>
							{site.title}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function FavoritesStartPage({
	copy,
	historyEntries,
	onOpenEntry,
}: {
	copy: (typeof COPY)[Locale];
	historyEntries: BrowserEntry[];
	onOpenEntry: (entry: BrowserEntry) => void;
}) {
	return (
		<div className="h-full overflow-y-auto bg-[linear-gradient(180deg,#f7fafc_0%,#dbe4ef_100%)] px-[12px] pt-[14px] pb-[16px]">
			<div className="grid grid-cols-2 gap-[10px]">
				{FAVORITE_SITES.map((site) => (
					<button
						type="button"
						key={site.id}
						onClick={() =>
							onOpenEntry(
								makeEntry(site.id, site.title, site.url, site.description),
							)
						}
						className="relative h-[108px] overflow-hidden rounded-[17px] border border-white/75 text-left shadow-[0_10px_16px_rgba(51,65,85,0.16)]"
						style={{
							backgroundImage: `linear-gradient(180deg, ${site.accentFrom} 0%, ${site.accentTo} 100%)`,
						}}
					>
						<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0)_50%,rgba(0,0,0,0.18)_100%)]" />
						<div
							className="absolute top-[12px] left-[12px] text-[30px] text-white"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
						>
							{site.monogram}
						</div>
						<div className="absolute right-[12px] bottom-[11px] left-[12px]">
							<p
								className="truncate text-[14px] text-white"
								style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
							>
								{site.title}
							</p>
							<p
								className="mt-[2px] line-clamp-2 text-[11px] text-white/82 leading-[13px]"
								style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
							>
								{site.description}
							</p>
						</div>
					</button>
				))}
			</div>

			<div className="mt-[16px]">
				<p
					className="px-[2px] pb-[6px] text-[#6b7280] text-[11px] uppercase tracking-[0.08em]"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
				>
					{copy.recentlyVisited}
				</p>
				<div className="overflow-hidden rounded-[12px] border border-[#b8c3d2] bg-white shadow-[0_1px_0_rgba(255,255,255,0.85)]">
					{historyEntries.length ? (
						historyEntries.map((entry, index) => (
							<div
								key={entry.id}
								className={index > 0 ? "border-[#e2e8f0] border-t" : ""}
							>
								<button
									type="button"
									onClick={() =>
										onOpenEntry(cloneEntry(entry, `${entry.id}-recent`))
									}
									className="flex w-full items-center gap-[10px] px-[12px] py-[11px] text-left"
								>
									<div className="flex h-[28px] w-[28px] items-center justify-center rounded-[8px] bg-[linear-gradient(180deg,#ffffff_0%,#e6edf7_100%)] text-[#5d7290] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
										<SearchGlyph />
									</div>
									<div className="min-w-0 flex-1">
										<p
											className="truncate text-[15px] text-black"
											style={{
												fontFamily: LEGACY_IOS_FONT_FAMILY,
												fontWeight: 700,
											}}
										>
											{entry.title}
										</p>
										<p
											className="truncate text-[#64748b] text-[11px]"
											style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
										>
											{stripProtocol(entry.url)}
										</p>
									</div>
									<div className="text-[#9ba3af]">
										<ChevronRightGlyph />
									</div>
								</button>
							</div>
						))
					) : (
						<div className="px-[14px] py-[18px]">
							<p
								className="text-[#64748b] text-[12px] leading-[17px]"
								style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
							>
								{copy.noRecentSites}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function PreviewThumbnail({
	entry,
	placeholder,
}: {
	entry: BrowserEntry;
	placeholder: string;
}) {
	if (isSafariInternalUrl(entry.url)) {
		return <FavoritesPreview />;
	}

	const frameUrl = toBrowserFrameUrl(entry.url);

	if (!frameUrl) {
		return (
			<div className="flex h-full w-full flex-col items-center justify-center bg-[linear-gradient(180deg,#f2f2f2_0%,#e1e1e1_100%)] px-4 text-center text-black">
				<p
					className="line-clamp-3 text-[18px] leading-[1.1]"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
				>
					{entry.title}
				</p>
				<p
					className="mt-2 line-clamp-3 text-[#6b7280] text-[12px] leading-[16px]"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
				>
					{placeholder}
				</p>
			</div>
		);
	}

	return (
		<iframe
			title={entry.title}
			src={frameUrl}
			className="pointer-events-none absolute top-0 left-0 h-[504px] w-[320px] origin-top-left scale-[0.6] border-0 bg-white"
			sandbox={
				isSameOriginUrl(entry.url)
					? undefined
					: "allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts"
			}
		/>
	);
}

function getActiveHistoryEntry(tab: BrowserTab | null) {
	if (!tab) {
		return null;
	}

	return tab.history[tab.historyIndex] ?? tab.history[0] ?? null;
}

export default function SafariApp() {
	const locale = resolveLocale(useLegacyUiLocale());
	const copy = COPY[locale];
	const destinationsRef = useRef<ReturnType<typeof buildDestinations> | null>(
		null,
	);
	const nextIdRef = useRef(1);
	const iframeRef = useRef<HTMLIFrameElement | null>(null);
	const tabCardRefs = useRef<Record<string, HTMLButtonElement | null>>({});

	if (!destinationsRef.current) {
		destinationsRef.current = buildDestinations(locale, copy);
	}

	const destinations = destinationsRef.current;

	const initialTabsRef = useRef<BrowserTab[] | null>(null);
	if (!initialTabsRef.current) {
		initialTabsRef.current = [
			{
				id: "tab-favorites",
				history: [
					makeInternalEntry(
						"entry-favorites",
						copy.favorites,
						"about:favorites",
						copy.recentlyVisited,
					),
				],
				historyIndex: 0,
				reloadNonce: 0,
			},
		];
	}

	const [view, setView] = useState<SafariView>("page");
	const [tabs, setTabs] = useState(initialTabsRef.current);
	const [activeTabId, setActiveTabId] = useState(initialTabsRef.current[0]?.id);
	const [addressDraft, setAddressDraft] = useState("");
	const [searchDraft, setSearchDraft] = useState("");
	const [bookmarkEntries, setBookmarkEntries] = useState<BrowserEntry[]>(
		FAVORITE_SITES.map((site) =>
			makeEntry(site.id, site.title, site.url, site.description),
		),
	);
	const [readingListEntries, setReadingListEntries] = useState<BrowserEntry[]>([
		makeEntry(
			"reading-arch-taplink",
			destinations.archTaplink.title,
			destinations.archTaplink.url,
			destinations.archTaplink.description,
		),
		makeEntry(
			"reading-price-tag-printer",
			destinations.priceTagPrinter.title,
			destinations.priceTagPrinter.url,
			destinations.priceTagPrinter.description,
		),
		makeEntry(
			"reading-florist-quiz",
			destinations.floristQuiz.title,
			destinations.floristQuiz.url,
			destinations.floristQuiz.description,
		),
	]);
	const [historyEntries, setHistoryEntries] = useState<BrowserEntry[]>([
		makeEntry(
			"history-github",
			"GitHub / sabraman",
			"https://github.com/sabraman",
			"Repositories, code, and recent pushes.",
		),
		makeEntry(
			"history-smbro",
			"smbro.ru",
			"https://smbro.ru",
			"Store platform and operational surface.",
		),
		makeEntry(
			"history-arch",
			"archsmoke.ru",
			"https://www.archsmoke.ru",
			"Store landing and link hub.",
		),
		makeEntry(
			"history-florist",
			"Florist Quiz",
			"https://florist-quiz.vercel.app",
			"Mobile-first learning quiz and PWA.",
		),
	]);
	const [shareSheetOpen, setShareSheetOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [toast, setToast] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const activeTab =
		tabs.find((tab) => tab.id === activeTabId) ?? tabs[0] ?? null;
	const currentEntry = getActiveHistoryEntry(activeTab);
	const currentCanGoBack =
		activeTab !== null ? activeTab.historyIndex > 0 : false;
	const currentCanGoForward =
		activeTab !== null
			? activeTab.historyIndex < activeTab.history.length - 1
			: false;
	const currentIsInternal =
		currentEntry !== null && isSafariInternalUrl(currentEntry.url);
	const currentFrameUrl =
		currentEntry !== null ? toBrowserFrameUrl(currentEntry.url) : null;
	const currentUsesProxy =
		currentEntry !== null &&
		!currentIsInternal &&
		!isSameOriginUrl(currentEntry.url);
	const recentPageEntries = historyEntries.filter(
		(entry) => !isSafariInternalUrl(entry.url),
	);

	const icloudSections: ICloudSection[] = [
		{
			id: "icloud-tablet",
			title: copy.openOnTablet,
			items: [
				makeEntry(
					"icloud-tablet-vaparshop",
					destinations.vaparshop.title,
					destinations.vaparshop.url,
					destinations.vaparshop.description,
				),
				makeEntry(
					"icloud-tablet-components",
					destinations.components.title,
					destinations.components.url,
					destinations.components.description,
				),
			],
		},
		{
			id: "icloud-laptop",
			title: copy.openOnLaptop,
			items: [
				makeEntry(
					"icloud-laptop-work",
					destinations.work.title,
					destinations.work.url,
					destinations.work.description,
				),
				makeEntry(
					"icloud-laptop-contact",
					destinations.contact.title,
					destinations.contact.url,
					destinations.contact.description,
				),
				makeEntry(
					"icloud-laptop-price-tag-printer",
					destinations.priceTagPrinter.title,
					destinations.priceTagPrinter.url,
					destinations.priceTagPrinter.description,
				),
			],
		},
	];

	const historySections = buildHistorySections(historyEntries, copy);

	function nextRuntimeId() {
		const nextId = nextIdRef.current;
		nextIdRef.current += 1;
		return `safari-runtime-${nextId}`;
	}

	function createRuntimeEntry(
		title: string,
		url: string,
		description?: string,
	): BrowserEntry {
		return makeEntry(nextRuntimeId(), title, url, description);
	}

	function createFavoritesEntry(id = nextRuntimeId()): SafariInternalEntry {
		return makeInternalEntry(
			id,
			copy.favorites,
			"about:favorites",
			copy.recentlyVisited,
		);
	}

	function showToast(message: string) {
		setToast(message);
	}

	function inferEntryTitle(url: string) {
		const normalized = normalizeComparableUrl(url);
		const matchingDestination = Object.values(destinations).find(
			(destination) => normalizeComparableUrl(destination.url) === normalized,
		);

		if (matchingDestination) {
			return matchingDestination.title;
		}

		try {
			const parsed = new URL(
				url,
				typeof window === "undefined"
					? "https://example.com"
					: window.location.origin,
			);
			if (
				typeof window !== "undefined" &&
				parsed.origin === window.location.origin
			) {
				const segments = parsed.pathname.split("/").filter(Boolean);
				const rawSegment = segments.at(-1) ?? parsed.pathname;
				return rawSegment
					.split("-")
					.map((segment) =>
						segment.length > 0
							? `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`
							: segment,
					)
					.join(" ");
			}

			return parsed.hostname;
		} catch {
			return stripProtocol(url);
		}
	}

	function findMatchingDestination(query: string) {
		const normalizedQuery = query.toLowerCase().trim();
		if (!normalizedQuery) {
			return null;
		}

		return Object.values(destinations).find((destination) => {
			if (destination.title.toLowerCase().includes(normalizedQuery)) {
				return true;
			}

			return destination.keywords.some((keyword) =>
				keyword.toLowerCase().includes(normalizedQuery),
			);
		});
	}

	function resolveInputToEntry(input: string, mode: "address" | "search") {
		const trimmed = input.trim();
		if (!trimmed) {
			return createFavoritesEntry();
		}

		if (isSafariInternalUrl(trimmed)) {
			return createFavoritesEntry();
		}

		if (trimmed.startsWith("/")) {
			const title = inferEntryTitle(trimmed);
			return createRuntimeEntry(
				title,
				trimmed,
				destinations.components.description,
			);
		}

		const matchedDestination = findMatchingDestination(trimmed);
		if (matchedDestination && mode === "search") {
			return createRuntimeEntry(
				matchedDestination.title,
				matchedDestination.url,
				matchedDestination.description,
			);
		}

		const looksLikeUrl =
			/^https?:\/\//i.test(trimmed) ||
			/^www\./i.test(trimmed) ||
			trimmed.includes(".");

		if (looksLikeUrl) {
			const absoluteUrl = ensureProtocol(trimmed);
			return createRuntimeEntry(stripProtocol(absoluteUrl), absoluteUrl);
		}

		const fallbackDestination = findMatchingDestination(trimmed);
		if (fallbackDestination) {
			return createRuntimeEntry(
				fallbackDestination.title,
				fallbackDestination.url,
				fallbackDestination.description,
			);
		}

		return createRuntimeEntry(
			`${copy.searchFallbackTitle}: ${trimmed}`,
			`https://duckduckgo.com/?q=${encodeURIComponent(trimmed)}`,
			copy.searchFallbackDescription,
		);
	}

	function replaceCurrentEntry(entry: BrowserEntry) {
		if (!activeTab) {
			return;
		}

		setTabs((currentTabs) =>
			currentTabs.map((tab) => {
				if (tab.id !== activeTab.id) {
					return tab;
				}

				const nextHistory = [...tab.history];
				nextHistory[tab.historyIndex] = entry;
				return {
					...tab,
					history: nextHistory,
				};
			}),
		);
	}

	function pushEntryToActiveTab(
		entry: BrowserEntry,
		options?: { showLoading?: boolean },
	) {
		if (!activeTab) {
			return;
		}

		const showLoading = options?.showLoading ?? true;

		setTabs((currentTabs) =>
			currentTabs.map((tab) => {
				if (tab.id !== activeTab.id) {
					return tab;
				}

				const nextHistory = [
					...tab.history.slice(0, tab.historyIndex + 1),
					entry,
				];
				return {
					...tab,
					history: nextHistory,
					historyIndex: nextHistory.length - 1,
				};
			}),
		);
		setView("page");
		setShareSheetOpen(false);
		setIsLoading(showLoading && isBrowserFrameUrl(entry.url));
	}

	function selectTab(tabId: string) {
		const nextTab = tabs.find((tab) => tab.id === tabId);
		setActiveTabId(tabId);
		setView("page");
		setShareSheetOpen(false);
		setIsLoading(
			nextTab !== undefined
				? isBrowserFrameUrl(nextTab.history[nextTab.historyIndex]?.url ?? "")
				: false,
		);
	}

	function openEntryInActiveTab(entry: BrowserEntry) {
		pushEntryToActiveTab(entry);
	}

	function openEntryFromList(entry: BrowserEntry) {
		openEntryInActiveTab(cloneEntry(entry, nextRuntimeId()));
	}

	function handleAddressSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		openEntryInActiveTab(resolveInputToEntry(addressDraft, "address"));
	}

	function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		openEntryInActiveTab(resolveInputToEntry(searchDraft, "search"));
	}

	function handleBack() {
		if (!activeTab || activeTab.historyIndex === 0) {
			return;
		}

		const previousEntry = activeTab.history[activeTab.historyIndex - 1];

		setTabs((currentTabs) =>
			currentTabs.map((tab) =>
				tab.id === activeTab.id
					? { ...tab, historyIndex: tab.historyIndex - 1 }
					: tab,
			),
		);
		setIsLoading(isBrowserFrameUrl(previousEntry?.url ?? ""));
	}

	function handleForward() {
		if (!activeTab || activeTab.historyIndex >= activeTab.history.length - 1) {
			return;
		}

		const nextEntry = activeTab.history[activeTab.historyIndex + 1];

		setTabs((currentTabs) =>
			currentTabs.map((tab) =>
				tab.id === activeTab.id
					? { ...tab, historyIndex: tab.historyIndex + 1 }
					: tab,
			),
		);
		setIsLoading(isBrowserFrameUrl(nextEntry?.url ?? ""));
	}

	function handleRefresh() {
		if (!activeTab || !currentEntry || isSafariInternalUrl(currentEntry.url)) {
			return;
		}

		setTabs((currentTabs) =>
			currentTabs.map((tab) =>
				tab.id === activeTab.id
					? { ...tab, reloadNonce: tab.reloadNonce + 1 }
					: tab,
			),
		);
		setIsLoading(isBrowserFrameUrl(currentEntry?.url ?? ""));
	}

	function handleAddBookmark() {
		if (!currentEntry) {
			return;
		}

		const comparableUrl = normalizeComparableUrl(currentEntry.url);
		const exists = bookmarkEntries.some(
			(entry) => normalizeComparableUrl(entry.url) === comparableUrl,
		);

		if (exists) {
			showToast(copy.alreadySaved);
			setShareSheetOpen(false);
			return;
		}

		setBookmarkEntries((current) =>
			upsertSavedEntry(
				current,
				cloneEntry(currentEntry, `bookmark-${nextRuntimeId()}`),
			),
		);
		showToast(copy.bookmarkSaved);
		setShareSheetOpen(false);
	}

	function handleAddToReadingList() {
		if (!currentEntry) {
			return;
		}

		const comparableUrl = normalizeComparableUrl(currentEntry.url);
		const exists = readingListEntries.some(
			(entry) => normalizeComparableUrl(entry.url) === comparableUrl,
		);

		if (exists) {
			showToast(copy.alreadySaved);
			setShareSheetOpen(false);
			return;
		}

		setReadingListEntries((current) =>
			upsertSavedEntry(
				current,
				cloneEntry(currentEntry, `reading-${nextRuntimeId()}`),
			),
		);
		showToast(copy.readingListSaved);
		setShareSheetOpen(false);
	}

	async function handleCopyLink() {
		if (!currentEntry) {
			return;
		}

		try {
			await navigator.clipboard.writeText(toAbsoluteUrl(currentEntry.url));
			showToast(copy.linkCopied);
		} catch {
			showToast(copy.linkCopied);
		}

		setShareSheetOpen(false);
	}

	function handleOpenExternally(url?: string) {
		const targetUrl = url ?? currentEntry?.url;
		if (!targetUrl) {
			return;
		}

		window.open(toAbsoluteUrl(targetUrl), "_blank", "noopener,noreferrer");
	}

	function handleNewPage() {
		const newTabId = `tab-${nextRuntimeId()}`;
		const newEntry = createFavoritesEntry(`entry-${nextRuntimeId()}`);

		setTabs((currentTabs) => [
			...currentTabs,
			{
				id: newTabId,
				history: [newEntry],
				historyIndex: 0,
				reloadNonce: 0,
			},
		]);
		setActiveTabId(newTabId);
		setView("page");
		setIsLoading(isBrowserFrameUrl(newEntry.url));
	}

	function handleCloseTab(tabId: string) {
		if (tabs.length === 1) {
			handleNewPage();
			setTabs((currentTabs) => currentTabs.filter((tab) => tab.id !== tabId));
			return;
		}

		const closingTabIndex = tabs.findIndex((tab) => tab.id === tabId);
		const remainingTabs = tabs.filter((tab) => tab.id !== tabId);
		setTabs(remainingTabs);

		if (tabId === activeTabId) {
			const nextTab =
				remainingTabs[Math.max(0, closingTabIndex - 1)] ?? remainingTabs[0];
			if (nextTab) {
				setActiveTabId(nextTab.id);
				setIsLoading(
					isBrowserFrameUrl(nextTab.history[nextTab.historyIndex]?.url ?? ""),
				);
			}
		}
	}

	function handleIframeLoad() {
		setIsLoading(false);

		if (!iframeRef.current || !activeTab || currentUsesProxy) {
			return;
		}

		try {
			const iframeWindow = iframeRef.current.contentWindow;
			if (!iframeWindow) {
				return;
			}

			const nextUrl = toStoredUrl(iframeWindow.location.href);
			const nextTitle =
				iframeWindow.document.title.trim() || inferEntryTitle(nextUrl);
			const activeHistoryEntry = getActiveHistoryEntry(activeTab);
			if (!activeHistoryEntry) {
				return;
			}
			const currentComparableUrl = normalizeComparableUrl(
				activeHistoryEntry.url,
			);
			const nextComparableUrl = normalizeComparableUrl(nextUrl);

			if (currentComparableUrl === nextComparableUrl) {
				if (
					activeHistoryEntry.title !== nextTitle ||
					activeHistoryEntry.url !== nextUrl
				) {
					replaceCurrentEntry({
						...activeHistoryEntry,
						title: nextTitle,
						url: nextUrl,
					});
				}
				return;
			}

			pushEntryToActiveTab(createRuntimeEntry(nextTitle, nextUrl), {
				showLoading: false,
			});
		} catch {
			// Proxy-backed pages report navigation through postMessage.
		}
	}

	function renderPageView() {
		const pageTitle = currentEntry?.title ?? "Safari";
		const iframeKey = [
			activeTab?.id ?? "tab",
			currentFrameUrl ?? "unsupported",
			currentUsesProxy ? `proxy-${PROXY_IFRAME_REVISION}` : "direct",
			String(activeTab?.reloadNonce ?? 0),
		].join(":");

		return (
			<>
				<div
					className="relative h-[60px] overflow-hidden"
					style={{
						backgroundImage: NAVIGATION_BAR_BACKGROUND,
						boxShadow:
							"0 1px 2px rgba(0,0,0,0.3), inset 0 0.5px 0 rgba(255,255,255,0.6), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)",
					}}
				>
					<div className="absolute top-[2px] right-[6px] left-[6px] flex items-center justify-center gap-[5px]">
						{currentIsInternal ? null : (
							<div className="text-[#0a6c18]">
								<LockGlyph />
							</div>
						)}
						<p
							className="truncate text-[#005110] text-[13px]"
							style={{
								fontFamily: LEGACY_IOS_FONT_FAMILY,
								fontWeight: 700,
								textShadow: "0 1px 0 rgba(255,255,255,0.5)",
							}}
						>
							{pageTitle}
						</p>
					</div>

					<form
						onSubmit={handleAddressSubmit}
						className="absolute right-[115px] bottom-2 left-[6px] flex h-[31px] items-center overflow-hidden rounded-[6px] border border-[#5d7796] bg-white pr-1 pl-[10px]"
						style={{ boxShadow: "inset 0 2px 3px rgba(0,0,0,0.5)" }}
					>
						<input
							value={addressDraft}
							onChange={(event) => setAddressDraft(event.target.value)}
							className="min-w-0 flex-1 bg-transparent text-[#666] text-[14px] outline-none"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
							spellCheck={false}
							autoCapitalize="off"
							aria-label="Address"
						/>
						<button
							type="button"
							onClick={handleRefresh}
							aria-label="Refresh"
							disabled={currentIsInternal || currentEntry === null}
							className={`flex h-5 w-5 items-center justify-center text-[#5a6574] ${
								currentIsInternal || currentEntry === null ? "opacity-35" : ""
							}`}
						>
							<RefreshGlyph spinning={isLoading} />
						</button>
					</form>

					<form
						onSubmit={handleSearchSubmit}
						className="absolute right-[6px] bottom-2 flex h-[31px] w-[103px] items-center overflow-hidden rounded-[16px] border border-[#5d7796] bg-white px-[10px]"
						style={{ boxShadow: "inset 0 2px 3px rgba(0,0,0,0.5)" }}
					>
						<input
							value={searchDraft}
							onChange={(event) => setSearchDraft(event.target.value)}
							placeholder={copy.searchPlaceholder}
							className="min-w-0 flex-1 bg-transparent text-[#666] text-[14px] outline-none placeholder:text-[#b2b2b2]"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
							spellCheck={false}
							autoCapitalize="off"
							aria-label="Search"
						/>
					</form>
				</div>

				<div className="relative h-[444px] overflow-hidden bg-white">
					{currentIsInternal ? (
						<FavoritesStartPage
							copy={copy}
							historyEntries={recentPageEntries}
							onOpenEntry={openEntryInActiveTab}
						/>
					) : currentFrameUrl && currentEntry ? (
						<iframe
							key={iframeKey}
							ref={iframeRef}
							title={pageTitle}
							src={currentFrameUrl}
							onLoad={handleIframeLoad}
							onError={() => setIsLoading(false)}
							className="h-full w-full border-0 bg-white"
							referrerPolicy={currentUsesProxy ? "no-referrer" : undefined}
							sandbox={
								currentUsesProxy
									? "allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts"
									: undefined
							}
						/>
					) : currentEntry ? (
						<UnsupportedPage
							title={pageTitle}
							url={currentEntry.url}
							copy={copy}
							onOpenExternally={() => handleOpenExternally(currentEntry.url)}
						/>
					) : null}
				</div>

				<div
					className="relative flex h-11 items-start justify-between px-[15px] pt-2 pb-[6px]"
					style={{
						backgroundImage: TOOLBAR_BACKGROUND,
						boxShadow:
							"0 -1px 2px rgba(0,0,0,0.2), inset 0 1px 0 #5f748c, inset 0 1.5px 0 rgba(255,255,255,0.4), inset 0 2px 0 rgba(255,255,255,0.2)",
					}}
				>
					<ToolbarButton
						label="Back"
						onClick={handleBack}
						disabled={!currentCanGoBack}
					>
						<BackGlyph />
					</ToolbarButton>
					<ToolbarButton
						label="Forward"
						onClick={handleForward}
						disabled={!currentCanGoForward}
					>
						<ForwardGlyph />
					</ToolbarButton>
					<ToolbarButton
						label="Share"
						onClick={() => setShareSheetOpen(true)}
						disabled={currentEntry === null || currentIsInternal}
					>
						<ShareGlyph />
					</ToolbarButton>
					<ToolbarButton
						label={copy.bookmarks}
						onClick={() => setView("bookmarks")}
					>
						<BookGlyph />
					</ToolbarButton>
					<ToolbarButton label="Tabs" onClick={() => setView("tabs")}>
						<TabsGlyph />
					</ToolbarButton>
				</div>
			</>
		);
	}

	function renderTabsView() {
		const placeholder = copy.searchFallbackDescription;

		return (
			<>
				<div
					className="relative h-[504px] overflow-hidden"
					style={{ backgroundImage: TABS_BACKGROUND }}
				>
					<div className="absolute inset-x-0 top-[30px] px-[10px]">
						<p
							className="truncate text-center text-[20px] text-white"
							style={{
								fontFamily: LEGACY_IOS_FONT_FAMILY,
								fontWeight: 700,
								textShadow: "0 -1px 0 rgba(0,0,0,0.2)",
							}}
						>
							{currentEntry?.title ?? "Safari"}
						</p>
						<p
							className="mt-2 truncate text-center text-[#b6bcc1] text-[15px]"
							style={{
								fontFamily: LEGACY_IOS_FONT_FAMILY,
								textShadow: "0 -1px 0 rgba(0,0,0,0.2)",
							}}
						>
							{currentEntry ? toAbsoluteUrl(currentEntry.url) : ""}
						</p>
					</div>

					<div className="absolute inset-x-0 top-[116px] bottom-[86px] overflow-x-auto px-[64px]">
						<div className="flex h-full items-start gap-10">
							{tabs.map((tab) => {
								const previewEntry =
									tab.history[tab.historyIndex] ?? tab.history[0] ?? null;
								if (!previewEntry) {
									return null;
								}
								const isActive = tab.id === activeTabId;

								return (
									<button
										key={tab.id}
										type="button"
										ref={(node) => {
											tabCardRefs.current[tab.id] = node;
										}}
										onClick={() => selectTab(tab.id)}
										className={`relative shrink-0 rounded-[2px] text-left ${
											isActive ? "opacity-100" : "opacity-40"
										}`}
									>
										<div className="relative h-[302px] w-[192px] overflow-hidden bg-white shadow-[0_5px_10px_rgba(0,0,0,0.4)]">
											<PreviewThumbnail
												entry={previewEntry}
												placeholder={placeholder}
											/>
										</div>
										{isActive ? (
											<button
												type="button"
												onClick={(event) => {
													event.stopPropagation();
													handleCloseTab(tab.id);
												}}
												className="absolute -top-[11px] -left-[11px] flex h-[23px] w-[23px] items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#bd1421] text-white shadow-[0_0_2px_rgba(0,0,0,0.4),0_2px_3px_rgba(0,0,0,0.4)]"
												aria-label={`Close ${previewEntry.title}`}
											>
												<CloseGlyph />
												<Image
													alt=""
													aria-hidden
													src={SAFARI_ASSETS.tabsCloseGloss}
													width={23}
													height={15}
													className="pointer-events-none absolute -top-[2px] -left-[2px] h-[14.668px] w-[23px] max-w-none"
													unoptimized
												/>
											</button>
										) : null}
									</button>
								);
							})}
						</div>
					</div>

					<div className="absolute inset-x-0 bottom-[65px] flex justify-center gap-[10px]">
						{tabs.map((tab) => {
							const previewEntry =
								tab.history[tab.historyIndex] ?? tab.history[0] ?? null;
							if (!previewEntry) {
								return null;
							}

							return (
								<button
									key={`${tab.id}-dot`}
									type="button"
									onClick={() => setActiveTabId(tab.id)}
									className="flex h-[6px] w-[6px] items-center justify-center"
									aria-label={`Show ${previewEntry.title}`}
								>
									<Image
										alt=""
										aria-hidden
										src={
											tab.id === activeTabId
												? SAFARI_ASSETS.tabsDotActive
												: SAFARI_ASSETS.tabsDot
										}
										width={6}
										height={6}
										className="h-[6px] w-[6px] max-w-none"
										unoptimized
									/>
								</button>
							);
						})}
					</div>
				</div>

				<div
					className="relative flex h-11 items-start justify-between px-[6px] pt-2 pb-[7px]"
					style={{
						backgroundImage: TOOLBAR_BACKGROUND,
						boxShadow:
							"0 -1px 2px rgba(0,0,0,0.2), inset 0 1px 0 #5f748c, inset 0 1.5px 0 rgba(255,255,255,0.4), inset 0 2px 0 rgba(255,255,255,0.2)",
					}}
				>
					<LegacyBarButton label={copy.newPage} onClick={handleNewPage} />
					<LegacyBarButton
						label={copy.done}
						onClick={() => setView("page")}
						variant="blue"
					/>
				</div>
			</>
		);
	}

	function renderBookmarksView() {
		return (
			<>
				<div
					className="relative h-11 overflow-hidden"
					style={{
						backgroundImage: NAVIGATION_BAR_BACKGROUND,
						boxShadow:
							"0 1px 2px rgba(0,0,0,0.3), inset 0 0.5px 0 rgba(255,255,255,0.6), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)",
					}}
				>
					<div className="absolute top-[7px] right-[5px]">
						<LegacyBarButton
							label={copy.done}
							onClick={() => setView("page")}
							variant="blue"
						/>
					</div>
					<p
						className="absolute top-[9px] left-1/2 -translate-x-1/2 text-[20px] text-white"
						style={{
							fontFamily: LEGACY_IOS_FONT_FAMILY,
							fontWeight: 700,
							textShadow: "0 -1px 0 rgba(0,0,0,0.4)",
						}}
					>
						{copy.bookmarks}
					</p>
				</div>

				<div className="h-[460px] overflow-y-auto bg-white">
					<ListRow
						title={copy.readingList}
						icon={<ReadingListGlyph />}
						iconKind="reading"
						onClick={() => {
							setEditMode(false);
							setView("reading-list");
						}}
						showChevron
					/>
					<ListRow
						title={copy.history}
						icon={<HistoryGlyph />}
						iconKind="history"
						onClick={() => {
							setEditMode(false);
							setView("history");
						}}
						showChevron
					/>
					<ListRow
						title={copy.icloudTabs}
						icon={<ICloudGlyph />}
						iconKind="icloud"
						onClick={() => {
							setEditMode(false);
							setView("icloud");
						}}
						showChevron
					/>
					{bookmarkEntries.map((entry) => (
						<ListRow
							key={entry.id}
							title={entry.title}
							icon={<BookmarkBookGlyph />}
							onClick={() => openEntryFromList(entry)}
							editing={editMode}
							deleteLabel={copy.delete}
							onDelete={
								editMode
									? () =>
											setBookmarkEntries((current) =>
												current.filter((item) => item.id !== entry.id),
											)
									: undefined
							}
						/>
					))}
					{bookmarkEntries.length === 0 ? (
						<div className="px-4 py-6">
							<p
								className="text-[#808080] text-[14px]"
								style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
							>
								{copy.noItems}
							</p>
						</div>
					) : null}
				</div>

				<div
					className="relative flex h-11 items-start px-[6px] pt-2 pb-[7px]"
					style={{
						backgroundImage: TOOLBAR_BACKGROUND,
						boxShadow:
							"0 -1px 2px rgba(0,0,0,0.2), inset 0 1px 0 #5f748c, inset 0 1.5px 0 rgba(255,255,255,0.4), inset 0 2px 0 rgba(255,255,255,0.2)",
					}}
				>
					<LegacyBarButton
						label={editMode ? copy.clearEdit : copy.edit}
						onClick={() => setEditMode((current) => !current)}
					/>
				</div>
			</>
		);
	}

	function renderReadingListView() {
		return (
			<>
				<div
					className="relative h-11 overflow-hidden"
					style={{
						backgroundImage: NAVIGATION_BAR_BACKGROUND,
						boxShadow:
							"0 1px 2px rgba(0,0,0,0.3), inset 0 0.5px 0 rgba(255,255,255,0.6), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)",
					}}
				>
					<div className="absolute top-[7px] left-[5px]">
						<LegacyBarButton
							label={copy.bookmarks}
							onClick={() => setView("bookmarks")}
							icon={<ChevronLeftGlyph />}
						/>
					</div>
					<div className="absolute top-[7px] right-[5px]">
						<LegacyBarButton
							label={copy.done}
							onClick={() => setView("page")}
							variant="blue"
						/>
					</div>
					<p
						className="absolute top-[9px] left-1/2 -translate-x-1/2 text-[20px] text-white"
						style={{
							fontFamily: LEGACY_IOS_FONT_FAMILY,
							fontWeight: 700,
							textShadow: "0 -1px 0 rgba(0,0,0,0.4)",
						}}
					>
						{copy.readingList}
					</p>
				</div>

				<div className="h-[460px] overflow-y-auto bg-white">
					{readingListEntries.map((entry) => (
						<ListRow
							key={entry.id}
							title={entry.title}
							subtitle={stripProtocol(toAbsoluteUrl(entry.url))}
							icon={<ReadingListGlyph />}
							iconKind="reading"
							onClick={() => openEntryFromList(entry)}
							editing={editMode}
							deleteLabel={copy.delete}
							onDelete={
								editMode
									? () =>
											setReadingListEntries((current) =>
												current.filter((item) => item.id !== entry.id),
											)
									: undefined
							}
						/>
					))}
					{readingListEntries.length === 0 ? (
						<div className="px-4 py-6">
							<p
								className="text-[#808080] text-[14px]"
								style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
							>
								{copy.noItems}
							</p>
						</div>
					) : null}
				</div>

				<div
					className="relative flex h-11 items-start px-[6px] pt-2 pb-[7px]"
					style={{
						backgroundImage: TOOLBAR_BACKGROUND,
						boxShadow:
							"0 -1px 2px rgba(0,0,0,0.2), inset 0 1px 0 #5f748c, inset 0 1.5px 0 rgba(255,255,255,0.4), inset 0 2px 0 rgba(255,255,255,0.2)",
					}}
				>
					<LegacyBarButton
						label={editMode ? copy.clearEdit : copy.edit}
						onClick={() => setEditMode((current) => !current)}
					/>
				</div>
			</>
		);
	}

	function renderHistoryView() {
		return (
			<>
				<div
					className="relative h-11 overflow-hidden"
					style={{
						backgroundImage: NAVIGATION_BAR_BACKGROUND,
						boxShadow:
							"0 1px 2px rgba(0,0,0,0.3), inset 0 0.5px 0 rgba(255,255,255,0.6), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)",
					}}
				>
					<div className="absolute top-[7px] left-[5px]">
						<LegacyBarButton
							label={copy.bookmarks}
							onClick={() => setView("bookmarks")}
							icon={<ChevronLeftGlyph />}
						/>
					</div>
					<div className="absolute top-[7px] right-[5px]">
						<LegacyBarButton
							label={copy.done}
							onClick={() => setView("page")}
							variant="blue"
						/>
					</div>
					<p
						className="absolute top-[9px] left-1/2 -translate-x-1/2 text-[20px] text-white"
						style={{
							fontFamily: LEGACY_IOS_FONT_FAMILY,
							fontWeight: 700,
							textShadow: "0 -1px 0 rgba(0,0,0,0.4)",
						}}
					>
						{copy.history}
					</p>
				</div>

				<div className="h-[460px] overflow-y-auto bg-[#dcdcdc]">
					{historySections.map((section) => (
						<div key={section.id}>
							<SectionTitle title={section.title} />
							<div className="bg-white">
								{section.items.map((entry) => (
									<ListRow
										key={entry.id}
										title={entry.title}
										subtitle={stripProtocol(toAbsoluteUrl(entry.url))}
										icon={<HistoryGlyph />}
										iconKind="history"
										onClick={() => openEntryFromList(entry)}
										editing={editMode}
										deleteLabel={copy.delete}
										onDelete={
											editMode
												? () =>
														setHistoryEntries((current) =>
															current.filter((item) => item.id !== entry.id),
														)
												: undefined
										}
									/>
								))}
							</div>
						</div>
					))}
					{historySections.length === 0 ? (
						<div className="px-4 py-6">
							<p
								className="text-[#808080] text-[14px]"
								style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
							>
								{copy.noItems}
							</p>
						</div>
					) : null}
				</div>

				<div
					className="relative flex h-11 items-start px-[6px] pt-2 pb-[7px]"
					style={{
						backgroundImage: TOOLBAR_BACKGROUND,
						boxShadow:
							"0 -1px 2px rgba(0,0,0,0.2), inset 0 1px 0 #5f748c, inset 0 1.5px 0 rgba(255,255,255,0.4), inset 0 2px 0 rgba(255,255,255,0.2)",
					}}
				>
					<LegacyBarButton
						label={editMode ? copy.clearEdit : copy.edit}
						onClick={() => setEditMode((current) => !current)}
					/>
				</div>
			</>
		);
	}

	function renderICloudView() {
		return (
			<>
				<div
					className="relative h-11 overflow-hidden"
					style={{
						backgroundImage: NAVIGATION_BAR_BACKGROUND,
						boxShadow:
							"0 1px 2px rgba(0,0,0,0.3), inset 0 0.5px 0 rgba(255,255,255,0.6), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)",
					}}
				>
					<div className="absolute top-[7px] left-[5px]">
						<LegacyBarButton
							label={copy.bookmarks}
							onClick={() => setView("bookmarks")}
							icon={<ChevronLeftGlyph />}
						/>
					</div>
					<div className="absolute top-[7px] right-[5px]">
						<LegacyBarButton
							label={copy.done}
							onClick={() => setView("page")}
							variant="blue"
						/>
					</div>
					<p
						className="absolute top-[9px] left-1/2 -translate-x-1/2 text-[20px] text-white"
						style={{
							fontFamily: LEGACY_IOS_FONT_FAMILY,
							fontWeight: 700,
							textShadow: "0 -1px 0 rgba(0,0,0,0.4)",
						}}
					>
						{copy.icloudTabs}
					</p>
				</div>

				<div className="h-[460px] overflow-y-auto bg-[#dcdcdc]">
					{icloudSections.map((section) => (
						<div key={section.id}>
							<SectionTitle title={section.title} />
							<div className="bg-white">
								{section.items.map((entry) => (
									<ListRow
										key={entry.id}
										title={entry.title}
										subtitle={stripProtocol(toAbsoluteUrl(entry.url))}
										icon={<ICloudGlyph />}
										iconKind="icloud"
										onClick={() => openEntryFromList(entry)}
									/>
								))}
							</div>
						</div>
					))}
				</div>

				<div
					className="relative h-11"
					style={{
						backgroundImage: TOOLBAR_BACKGROUND,
						boxShadow:
							"0 -1px 2px rgba(0,0,0,0.2), inset 0 1px 0 #5f748c, inset 0 1.5px 0 rgba(255,255,255,0.4), inset 0 2px 0 rgba(255,255,255,0.2)",
					}}
				/>
			</>
		);
	}

	const handleProxyMessage = useEffectEvent((event: MessageEvent) => {
		if (event.source !== iframeRef.current?.contentWindow) {
			return;
		}

		const payload = event.data;
		if (
			typeof payload !== "object" ||
			payload === null ||
			payload.type !== "legacy-safari-proxy" ||
			typeof payload.url !== "string" ||
			!activeTab
		) {
			return;
		}

		const nextUrl = toStoredUrl(payload.url);
		const nextTitle =
			typeof payload.title === "string" && payload.title.trim().length > 0
				? payload.title.trim()
				: inferEntryTitle(nextUrl);
		const activeHistoryEntry = getActiveHistoryEntry(activeTab);
		if (!activeHistoryEntry) {
			return;
		}
		const currentComparableUrl = normalizeComparableUrl(activeHistoryEntry.url);
		const nextComparableUrl = normalizeComparableUrl(nextUrl);

		setIsLoading(false);

		if (currentComparableUrl === nextComparableUrl) {
			if (
				activeHistoryEntry.title !== nextTitle ||
				activeHistoryEntry.url !== nextUrl
			) {
				replaceCurrentEntry({
					...activeHistoryEntry,
					title: nextTitle,
					url: nextUrl,
				});
			}
			return;
		}

		pushEntryToActiveTab(createRuntimeEntry(nextTitle, nextUrl), {
			showLoading: false,
		});
	});

	useEffect(() => {
		window.addEventListener("message", handleProxyMessage);
		return () => window.removeEventListener("message", handleProxyMessage);
	}, []);

	useEffect(() => {
		if (currentEntry) {
			setAddressDraft(formatAddressValue(currentEntry.url));
			setSearchDraft("");
		}
	}, [currentEntry]);

	useEffect(() => {
		if (!currentEntry || isSafariInternalUrl(currentEntry.url)) {
			return;
		}

		setHistoryEntries((current) =>
			upsertRecentEntry(
				current,
				cloneEntry(currentEntry, `history-${currentEntry.id}`),
			),
		);
	}, [currentEntry]);

	useEffect(() => {
		if (!toast) {
			return;
		}

		const timeoutId = window.setTimeout(() => setToast(null), 1600);
		return () => window.clearTimeout(timeoutId);
	}, [toast]);

	useEffect(() => {
		if (view !== "bookmarks" && view !== "reading-list" && view !== "history") {
			setEditMode(false);
		}

		if (view !== "page") {
			setShareSheetOpen(false);
		}
	}, [view]);

	useEffect(() => {
		if (view !== "tabs" || !activeTabId) {
			return;
		}

		tabCardRefs.current[activeTabId]?.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center",
		});
	}, [view, activeTabId]);

	return (
		<div className="relative flex h-full flex-col overflow-hidden bg-black text-black">
			{view === "page" ? renderPageView() : null}
			{view === "tabs" ? renderTabsView() : null}
			{view === "bookmarks" ? renderBookmarksView() : null}
			{view === "reading-list" ? renderReadingListView() : null}
			{view === "history" ? renderHistoryView() : null}
			{view === "icloud" ? renderICloudView() : null}

			{toast ? (
				<div className="pointer-events-none absolute inset-x-0 top-3 z-40 flex justify-center px-3">
					<div className="rounded-[14px] bg-black/75 px-4 py-2 text-white shadow-[0_10px_24px_rgba(0,0,0,0.35)] backdrop-blur-md">
						<p
							className="text-[12px]"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
						>
							{toast}
						</p>
					</div>
				</div>
			) : null}

			{shareSheetOpen && currentEntry ? (
				<div className="absolute inset-0 z-50 bg-[rgba(0,0,0,0.5)]">
					<button
						type="button"
						aria-label={copy.cancel}
						className="absolute inset-0"
						onClick={() => setShareSheetOpen(false)}
					/>
					<div
						className="absolute right-0 bottom-0 left-0 overflow-hidden px-[10px] pt-[10px] pb-[10px]"
						style={{
							backgroundColor: "rgba(0,0,0,0.6)",
							boxShadow: "0 -1px 0 rgba(0,0,0,0.8), 0 -2px 2px rgba(0,0,0,0.2)",
						}}
					>
						<div className="pointer-events-none absolute inset-x-0 top-0 h-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0)_100%)]" />
						<div className="relative z-[2] px-[10px] pt-[10px]">
							<div className="space-y-2">
								<LegacyActionSheetButton
									label={copy.addBookmark}
									onClick={handleAddBookmark}
								/>
								<LegacyActionSheetButton
									label={copy.addToReadingList}
									onClick={handleAddToReadingList}
								/>
								<LegacyActionSheetButton
									label={copy.copyLink}
									onClick={handleCopyLink}
								/>
								<LegacyActionSheetButton
									label={copy.openExternally}
									onClick={() => handleOpenExternally(currentEntry.url)}
								/>
							</div>
							<div className="mt-[22px]">
								<LegacyActionSheetButton
									label={copy.cancel}
									onClick={() => setShareSheetOpen(false)}
									variant="cancel"
								/>
							</div>
						</div>
						<div className="pointer-events-none absolute inset-0 shadow-[inset_0_0.5px_0_rgba(255,255,255,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]" />
					</div>
				</div>
			) : null}
		</div>
	);
}
