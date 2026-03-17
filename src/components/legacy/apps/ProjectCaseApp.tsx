"use client";

import { type ReactNode, useDeferredValue, useMemo, useState } from "react";
import { PROJECT_CASE_STUDIES } from "~/data/project-case-studies";
import {
	getCaseStudyPath,
	getProjectExternalLinks,
	PROJECT_BY_SLUG,
	PROJECT_CATEGORY_LABELS,
	type ProjectLink,
	type ProjectSlug,
} from "~/data/projects";
import { cn } from "~/lib/utils";
import { useLegacyUiLocale } from "../legacy-locale-context";
import { PROJECT_APP_REGISTRY } from "../project-app-registry";
import { LEGACY_IOS_FONT_FAMILY } from "../ui/legacy-status-data";

type Locale = "en" | "ru";
type DefaultTabId = "overview" | "case-study" | "links";
type VaparshopTabId = "system" | "flows" | "impact";
type HornyPlaceTabId = "identity" | "applications" | "digital";
type CaseStudySegmentId = "sections" | "faq";
type AlertButton = {
	label: string;
	onClick: () => void;
	variant?: "default" | "primary";
};
type LinkRow = {
	id: string;
	title: string;
	subtitle: string;
	url: string;
};

const TOOLBAR_BACKGROUND =
	"linear-gradient(180deg, #b5c4d7 0%, #98abc3 33%, #7189a8 67%, #577296 100%)";
const SEARCH_BAR_BACKGROUND =
	"linear-gradient(180deg, #c6d1de 0%, #aebccf 45%, #8ea0b9 100%)";
const TAB_BAR_BACKGROUND = "linear-gradient(180deg, #171717 0%, #0b0b0b 100%)";

const COPY = {
	en: {
		applications: "Applications",
		cancel: "Cancel",
		caseStudy: "Case Study",
		category: "Category",
		digital: "Digital",
		faq: "FAQ",
		flows: "Flows",
		identity: "Identity",
		impact: "Impact",
		links: "Links",
		noFaq: "No matching answers.",
		noLinks: "No public links for this project yet.",
		noSections: "No matching sections.",
		openLinkMessage: "Open this page in a real browser tab?",
		openLinkTitle: "Open Link",
		openNow: "Open",
		overview: "Overview",
		portfolioPage: "Portfolio Page",
		privateVisibility: "Private",
		publicVisibility: "Public",
		searchPlaceholder: "Search notes, sections, links",
		sections: "Sections",
		status: "Status",
		system: "System",
		tags: "Tags",
		visibility: "Visibility",
		workingLabel: "Working mode",
		inDevelopment: "In development",
		live: "Live",
	},
	ru: {
		applications: "Применение",
		cancel: "Отмена",
		caseStudy: "Кейс",
		category: "Категория",
		digital: "Digital",
		faq: "FAQ",
		flows: "Потоки",
		identity: "Айдентика",
		impact: "Эффект",
		links: "Ссылки",
		noFaq: "Подходящих ответов нет.",
		noLinks: "Публичных ссылок для этого проекта пока нет.",
		noSections: "Подходящих разделов нет.",
		openLinkMessage: "Открыть эту страницу в настоящей вкладке браузера?",
		openLinkTitle: "Открыть ссылку",
		openNow: "Открыть",
		overview: "Обзор",
		portfolioPage: "Страница кейса",
		privateVisibility: "Приватный",
		publicVisibility: "Публичный",
		searchPlaceholder: "Поиск по заметкам, разделам и ссылкам",
		sections: "Разделы",
		status: "Статус",
		system: "Система",
		tags: "Теги",
		visibility: "Доступ",
		workingLabel: "Рабочий режим",
		inDevelopment: "В разработке",
		live: "В продакшне",
	},
} as const;

function resolveLocale(locale: string): Locale {
	return locale === "ru" ? "ru" : "en";
}

function stripProtocol(url: string) {
	return url.replace(/^https?:\/\//, "");
}

function localeIncludes(value: string, query: string) {
	return value.toLowerCase().includes(query);
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

function OverviewGlyph() {
	return (
		<svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden>
			<title>Overview</title>
			<rect x="3" y="4" width="7" height="7" rx="1.6" fill="currentColor" />
			<rect x="14" y="4" width="7" height="7" rx="1.6" fill="currentColor" />
			<rect x="3" y="13" width="7" height="7" rx="1.6" fill="currentColor" />
			<rect x="14" y="13" width="7" height="7" rx="1.6" fill="currentColor" />
		</svg>
	);
}

function NotesGlyph() {
	return (
		<svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden>
			<title>Notes</title>
			<rect
				x="5"
				y="4"
				width="14"
				height="16"
				rx="2"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
			/>
			<path
				d="M8 9h8M8 13h8M8 17h5"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeWidth="2"
			/>
		</svg>
	);
}

function LinkGlyph() {
	return (
		<svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden>
			<title>Links</title>
			<path
				d="M9 8.5 7 10.5a4 4 0 1 0 5.7 5.6l2-2M15 15.5l2-2a4 4 0 1 0-5.7-5.6l-2 2M9.5 14.5l5-5"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
		</svg>
	);
}

function SystemGlyph() {
	return (
		<svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden>
			<title>System</title>
			<rect x="3" y="6" width="18" height="4" rx="1.5" fill="currentColor" />
			<rect x="3" y="14" width="12" height="4" rx="1.5" fill="currentColor" />
			<circle
				cx="18"
				cy="16"
				r="3"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
			/>
		</svg>
	);
}

function ImpactGlyph() {
	return (
		<svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden>
			<title>Impact</title>
			<path
				d="M5 17 10 12l3 3 6-7"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2.2"
			/>
			<path
				d="M17 8h2v2"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2.2"
			/>
		</svg>
	);
}

function IdentityGlyph() {
	return (
		<svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden>
			<title>Identity</title>
			<circle cx="8" cy="8" r="4" fill="currentColor" />
			<circle cx="16" cy="8" r="4" fill="currentColor" opacity="0.7" />
			<rect
				x="5"
				y="14"
				width="14"
				height="5"
				rx="2.5"
				fill="currentColor"
				opacity="0.9"
			/>
		</svg>
	);
}

function WindowGlyph() {
	return (
		<svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden>
			<title>Window</title>
			<rect
				x="4"
				y="5"
				width="16"
				height="14"
				rx="2"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
			/>
			<path d="M4 9h16" fill="none" stroke="currentColor" strokeWidth="2" />
			<circle cx="7" cy="7" r="0.9" fill="currentColor" />
			<circle cx="10" cy="7" r="0.9" fill="currentColor" />
		</svg>
	);
}

function ChevronGlyph() {
	return (
		<svg viewBox="0 0 12 20" className="h-[14px] w-[9px]" aria-hidden>
			<title>Chevron</title>
			<path
				d="M2 2l6 8-6 8"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2.2"
			/>
		</svg>
	);
}

export function IOS6Toolbar({ children }: { children: ReactNode }) {
	return (
		<div
			className="relative flex h-11 items-center gap-[6px] overflow-hidden px-[8px]"
			style={{
				backgroundImage: TOOLBAR_BACKGROUND,
				boxShadow:
					"0 1px 2px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.1)",
			}}
		>
			<div className="pointer-events-none absolute inset-x-0 top-0 h-[15px] bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0))]" />
			<div className="relative z-10 flex w-full items-center gap-[6px]">
				{children}
			</div>
		</div>
	);
}

function IOS6ToolbarChip({ label, value }: { label: string; value: string }) {
	return (
		<div className="min-w-0 flex-1 rounded-[6px] border border-[#42556f] bg-[rgba(255,255,255,0.14)] px-[8px] py-[6px] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
			<p
				className="truncate text-[10px] text-white/80 uppercase tracking-[0.08em]"
				style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
			>
				{label}
			</p>
			<p
				className="truncate text-[12px] text-white"
				style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
			>
				{value}
			</p>
		</div>
	);
}

export function IOS6SearchBar({
	value,
	onChange,
	placeholder,
	onClear,
	cancelLabel,
}: {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	onClear: () => void;
	cancelLabel: string;
}) {
	return (
		<div
			className="flex items-center gap-[8px] px-[7px] py-[6px]"
			style={{
				backgroundImage: SEARCH_BAR_BACKGROUND,
				boxShadow:
					"inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.14)",
			}}
		>
			<div
				className="relative flex h-[31px] flex-1 items-center overflow-hidden rounded-[16px] border border-[#7c8fa4] bg-white pr-[10px] pl-[10px]"
				style={{ boxShadow: "inset 0 2px 3px rgba(0,0,0,0.28)" }}
			>
				<div className="mr-[6px] text-[#92a1b0]">
					<SearchGlyph />
				</div>
				<input
					value={value}
					onChange={(event) => onChange(event.target.value)}
					placeholder={placeholder}
					className="min-w-0 flex-1 bg-transparent text-[#5d6876] text-[14px] outline-none placeholder:text-[#b5bac2]"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
				/>
			</div>
			{value ? (
				<button
					type="button"
					onClick={onClear}
					className="rounded-[6px] border border-[#2f4158] bg-gradient-to-b from-[#7e90aa] to-[#5d7290] px-[10px] py-[5px] text-[12px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.24)]"
					style={{
						fontFamily: LEGACY_IOS_FONT_FAMILY,
						fontWeight: 700,
						textShadow: "0 -1px 0 rgba(0,0,0,0.35)",
					}}
				>
					{cancelLabel}
				</button>
			) : null}
		</div>
	);
}

export function IOS6SegmentedControl<T extends string>({
	items,
	value,
	onChange,
}: {
	items: Array<{ id: T; label: string }>;
	value: T;
	onChange: (value: T) => void;
}) {
	return (
		<div className="rounded-[6px] border border-[#4e6077] bg-[linear-gradient(180deg,#a4b4c8_0%,#6e829f_100%)] p-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
			<div className="flex h-[29px] overflow-hidden rounded-[4px]">
				{items.map((item, index) => {
					const active = item.id === value;

					return (
						<button
							type="button"
							key={item.id}
							onClick={() => onChange(item.id)}
							className={cn(
								"relative flex-1 text-[13px]",
								index > 0 ? "border-white/12 border-l" : "",
							)}
							style={{
								fontFamily: LEGACY_IOS_FONT_FAMILY,
								fontWeight: 700,
								color: "#fff",
								textShadow: "0 -1px 0 rgba(0,0,0,0.35)",
								backgroundImage: active
									? "linear-gradient(180deg,#95b6f5 0%,#5f89df 48%,#3f72d6 52%,#255fd4 100%)"
									: "linear-gradient(180deg,#b9c6d7 0%,#8ea1ba 50%,#6c82a1 100%)",
								boxShadow: active
									? "inset 0 1px 0 rgba(255,255,255,0.26)"
									: "inset 0 1px 0 rgba(255,255,255,0.18)",
							}}
						>
							{item.label}
						</button>
					);
				})}
			</div>
		</div>
	);
}

export function IOS6Slider({ label, value }: { label: string; value: number }) {
	const clamped = Math.min(1, Math.max(0, value));

	return (
		<div className="space-y-[4px]">
			<p
				className="text-[#273246] text-[12px]"
				style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
			>
				{label}
			</p>
			<div className="relative h-[22px]">
				<div className="absolute top-1/2 right-[6px] left-[6px] h-[9px] -translate-y-1/2 rounded-[5px] border border-[#828282] bg-gradient-to-b from-[#b8b8b8] to-white shadow-[inset_0_1px_1px_rgba(0,0,0,0.2),inset_0_-3px_2px_rgba(255,255,255,0.1)]" />
				<div
					className="absolute top-1/2 left-[6px] h-[9px] -translate-y-1/2 rounded-[5px] border border-[#1e386b] bg-gradient-to-b from-[#2e59a8] to-[#6d9fe8] shadow-[inset_0_1px_1px_rgba(0,0,0,0.2),inset_0_-3px_2px_rgba(255,255,255,0.1)]"
					style={{ width: `calc((100% - 12px) * ${clamped})` }}
				/>
				<div
					className="absolute top-1/2 h-[21px] w-[21px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8b8b8b] bg-gradient-to-b from-white via-[#ededed] to-[#bcbcbc] shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
					style={{ left: `calc(6px + (100% - 12px) * ${clamped})` }}
				/>
			</div>
		</div>
	);
}

function IOS6SectionTitle({ title }: { title: string }) {
	return (
		<p
			className="px-[12px] pb-[5px] text-[#6b7280] text-[11px] uppercase tracking-[0.08em]"
			style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
		>
			{title}
		</p>
	);
}

export function IOS6ListRow({
	title,
	subtitle,
	onClick,
	active = false,
	showChevron = true,
}: {
	title: string;
	subtitle?: string;
	onClick?: () => void;
	active?: boolean;
	showChevron?: boolean;
}) {
	const sharedClassName =
		"relative flex w-full items-center gap-[10px] px-[12px] py-[10px] text-left";

	return onClick ? (
		<button
			type="button"
			onClick={onClick}
			className={cn(sharedClassName, active ? "bg-[#e9f2ff]" : "bg-white")}
		>
			<div className="min-w-0 flex-1">
				<p
					className="truncate text-[16px] text-black"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
				>
					{title}
				</p>
				{subtitle ? (
					<p
						className="mt-[2px] line-clamp-2 text-[#64748b] text-[12px]"
						style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
					>
						{subtitle}
					</p>
				) : null}
			</div>
			{showChevron ? (
				<div className="text-[#9ba3af]">
					<ChevronGlyph />
				</div>
			) : null}
		</button>
	) : (
		<div className={cn(sharedClassName, active ? "bg-[#e9f2ff]" : "bg-white")}>
			<div className="min-w-0 flex-1">
				<p
					className="truncate text-[16px] text-black"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
				>
					{title}
				</p>
				{subtitle ? (
					<p
						className="mt-[2px] line-clamp-2 text-[#64748b] text-[12px]"
						style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
					>
						{subtitle}
					</p>
				) : null}
			</div>
		</div>
	);
}

export function IOS6ListGroup({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	return (
		<div>
			<IOS6SectionTitle title={title} />
			<div className="overflow-hidden rounded-[10px] border border-[#b2bccb] bg-white shadow-[0_1px_0_rgba(255,255,255,0.85)]">
				{children}
			</div>
		</div>
	);
}

export function IOS6Alert({
	title,
	message,
	buttons,
}: {
	title: string;
	message: string;
	buttons: AlertButton[];
}) {
	return (
		<div className="absolute inset-0 z-40 bg-black/50">
			<div className="absolute top-1/2 left-1/2 w-[276px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[10px] border-2 border-white/70 bg-[rgba(8,26,80,0.82)] px-[8px] pt-[14px] pb-[9px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.4),0_4px_5px_rgba(0,0,0,0.5)]">
				<div className="pointer-events-none absolute inset-x-[-2px] top-[-2px] h-[29px] bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_100%)]" />
				<div className="relative">
					<p
						className="text-center text-[18px] text-white"
						style={{
							fontFamily: LEGACY_IOS_FONT_FAMILY,
							fontWeight: 700,
							textShadow: "0 -1px 0 rgba(0,0,0,0.8)",
						}}
					>
						{title}
					</p>
					<p
						className="mt-[8px] text-center text-[16px] text-white leading-[20px]"
						style={{
							fontFamily: LEGACY_IOS_FONT_FAMILY,
							textShadow: "0 -1px 0 rgba(0,0,0,0.8)",
						}}
					>
						{message}
					</p>
				</div>
				<div className="relative mt-[18px] flex gap-[10px]">
					{buttons.map((button) => (
						<button
							type="button"
							key={button.label}
							onClick={button.onClick}
							className="flex-1 rounded-[5px] border border-black/40 px-[8px] pt-[8px] pb-[10px] text-[18px] text-white shadow-[0_0.5px_0.5px_rgba(255,255,255,0.2)]"
							style={{
								fontFamily: LEGACY_IOS_FONT_FAMILY,
								fontWeight: 700,
								textShadow: "0 -1px 0 rgba(0,0,0,0.8)",
								backgroundImage:
									button.variant === "primary"
										? "linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.36)_50%,rgba(255,255,255,0.24)_50.01%,rgba(255,255,255,0.36)_100%)"
										: "linear-gradient(180deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.16)_50%,rgba(255,255,255,0.04)_50.01%,rgba(255,255,255,0.08)_100%)",
							}}
						>
							{button.label}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

function IOS6TabBarItem({
	label,
	icon,
	active,
	onClick,
}: {
	label: string;
	icon: ReactNode;
	active: boolean;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="relative flex h-[49px] flex-1 flex-col items-center justify-start pt-[4px]"
		>
			{active ? (
				<div className="relative h-[30px] w-[40px] overflow-hidden rounded-[4px] bg-gradient-to-b from-[#3ec9fb] to-[#278af2] text-white shadow-[0_2px_2px_rgba(0,0,0,0.4)]">
					<div className="pointer-events-none absolute inset-x-0 top-0 h-[17px] bg-[linear-gradient(180deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0)_100%)]" />
					<div className="relative flex h-full items-center justify-center">
						{icon}
					</div>
				</div>
			) : (
				<div className="flex h-[30px] w-[40px] items-center justify-center text-white/60">
					{icon}
				</div>
			)}
			<span
				className={cn(
					"absolute right-0 bottom-[3px] left-0 text-center text-[10px]",
					active ? "text-white" : "text-white/60",
				)}
				style={{
					fontFamily: LEGACY_IOS_FONT_FAMILY,
					fontWeight: 700,
					textShadow: "0 -1px 0 rgba(0,0,0,0.6)",
				}}
			>
				{label}
			</span>
		</button>
	);
}

export function IOS6TabBar<T extends string>({
	items,
	value,
	onChange,
}: {
	items: Array<{ id: T; label: string; icon: ReactNode }>;
	value: T;
	onChange: (value: T) => void;
}) {
	return (
		<div
			className="relative flex h-[49px] overflow-hidden"
			style={{
				backgroundImage: TAB_BAR_BACKGROUND,
				boxShadow:
					"inset 0 1px 0 rgba(255,255,255,0.08), inset 0 2px 0 rgba(255,255,255,0.04)",
			}}
		>
			<div className="pointer-events-none absolute inset-x-0 top-0 h-[12px] bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0)_100%)]" />
			{items.map((item) => (
				<IOS6TabBarItem
					key={item.id}
					label={item.label}
					icon={item.icon}
					active={item.id === value}
					onClick={() => onChange(item.id)}
				/>
			))}
		</div>
	);
}

function DetailCard({
	title,
	body,
	bullets,
	accent,
}: {
	title: string;
	body: string[];
	bullets?: string[];
	accent: string;
}) {
	return (
		<div className="overflow-hidden rounded-[12px] border border-[#bcc6d4] bg-white shadow-[0_1px_0_rgba(255,255,255,0.85)]">
			<div
				className="px-[12px] py-[10px] text-white"
				style={{
					backgroundImage: `linear-gradient(180deg, ${accent} 0%, #355074 100%)`,
				}}
			>
				<p
					className="text-[16px]"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
				>
					{title}
				</p>
			</div>
			<div className="space-y-[10px] px-[12px] py-[12px]">
				{body.map((paragraph) => (
					<p
						key={paragraph}
						className="text-[#334155] text-[13px] leading-[18px]"
						style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
					>
						{paragraph}
					</p>
				))}
				{bullets?.length ? (
					<div className="space-y-[5px]">
						{bullets.map((bullet) => (
							<div key={bullet} className="flex items-start gap-[8px]">
								<div className="mt-[6px] h-[4px] w-[4px] rounded-full bg-[#3f72d6]" />
								<p
									className="text-[#475569] text-[12px] leading-[17px]"
									style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
								>
									{bullet}
								</p>
							</div>
						))}
					</div>
				) : null}
			</div>
		</div>
	);
}

function EmptyPanel({ label }: { label: string }) {
	return (
		<div className="rounded-[12px] border border-[#a8b5c6] border-dashed bg-white/70 px-4 py-6 text-center">
			<p
				className="text-[#64748b] text-[13px]"
				style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
			>
				{label}
			</p>
		</div>
	);
}

function FeaturedHero({
	title,
	badge,
	summary,
	details,
	accentFrom,
	accentTo,
	style,
}: {
	title: string;
	badge: string;
	summary: string;
	details: string;
	accentFrom: string;
	accentTo: string;
	style: "system" | "editorial";
}) {
	return (
		<div
			className={cn(
				"relative overflow-hidden rounded-[16px] border border-black/15 px-[14px] py-[14px] shadow-[0_10px_22px_rgba(25,35,55,0.16)]",
				style === "editorial" ? "bg-[#f9f3e9]" : "bg-[#f2f6fb]",
			)}
		>
			<div
				className={cn(
					"pointer-events-none absolute inset-0",
					style === "editorial"
						? "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),transparent_52%),linear-gradient(135deg,rgba(255,255,255,0.55),transparent_60%)]"
						: "bg-[linear-gradient(135deg,rgba(255,255,255,0.45),transparent_48%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.45),transparent_44%)]",
				)}
			/>
			<div
				className={cn(
					"pointer-events-none absolute -right-7 -bottom-7 h-[108px] w-[108px] rounded-full opacity-80 blur-[1px]",
					style === "editorial" ? "rotate-[10deg]" : "",
				)}
				style={{
					backgroundImage: `linear-gradient(180deg, ${accentFrom} 0%, ${accentTo} 100%)`,
				}}
			/>
			<div
				className={cn(
					"pointer-events-none absolute top-0 right-0 left-0 h-[1px]",
					style === "editorial" ? "bg-black/8" : "bg-white/75",
				)}
			/>
			<div className="relative z-10">
				<div
					className="inline-flex rounded-full px-[9px] py-[4px] text-[10px] text-white uppercase tracking-[0.12em]"
					style={{
						fontFamily: LEGACY_IOS_FONT_FAMILY,
						fontWeight: 700,
						backgroundImage: `linear-gradient(180deg, ${accentFrom} 0%, ${accentTo} 100%)`,
						textShadow: "0 -1px 0 rgba(0,0,0,0.35)",
					}}
				>
					{badge}
				</div>
				<p
					className="mt-[10px] max-w-[220px] text-[#162235] text-[26px] leading-[26px]"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
				>
					{title}
				</p>
				<p
					className="mt-[10px] max-w-[228px] text-[#334155] text-[13px] leading-[18px]"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
				>
					{summary}
				</p>
				<p
					className="mt-[10px] max-w-[228px] text-[#64748b] text-[12px] leading-[17px]"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
				>
					{details}
				</p>
			</div>
		</div>
	);
}

function SectionInspector({
	title,
	rows,
	selectedId,
	onSelect,
	detail,
	accent,
	emptyLabel,
}: {
	title: string;
	rows: Array<{ id: string; title: string; subtitle: string }>;
	selectedId: string | null;
	onSelect: (id: string) => void;
	detail: {
		title: string;
		body: string[];
		bullets?: string[];
	} | null;
	accent: string;
	emptyLabel: string;
}) {
	return (
		<div className="space-y-[10px]">
			<IOS6ListGroup title={title}>
				{rows.length ? (
					rows.map((row, index) => (
						<div
							key={row.id}
							className={index > 0 ? "border-[#e2e8f0] border-t" : ""}
						>
							<IOS6ListRow
								title={row.title}
								subtitle={row.subtitle}
								active={selectedId === row.id}
								onClick={() => onSelect(row.id)}
							/>
						</div>
					))
				) : (
					<div className="px-[12px] py-[16px]">
						<EmptyPanel label={emptyLabel} />
					</div>
				)}
			</IOS6ListGroup>
			{detail ? (
				<DetailCard
					title={detail.title}
					body={detail.body}
					bullets={detail.bullets}
					accent={accent}
				/>
			) : null}
		</div>
	);
}

function buildPortfolioLinkRows(
	locale: Locale,
	projectSlug: ProjectSlug,
	projectTitle: string,
	projectLinks: ProjectLink[],
	copy: (typeof COPY)[Locale],
): LinkRow[] {
	const caseStudyPath = getCaseStudyPath(locale, projectSlug);
	const caseStudySubtitle =
		typeof window === "undefined"
			? caseStudyPath
			: `${window.location.host}${caseStudyPath}`;

	return [
		{
			id: "portfolio-page",
			title: copy.portfolioPage,
			subtitle: caseStudySubtitle,
			url: caseStudyPath,
		},
		...projectLinks.map((link, index) => ({
			id: `${link.kind}-${index + 1}`,
			title:
				link.kind === "github"
					? `${projectTitle} GitHub`
					: `${projectTitle} ${link.label[locale]}`,
			subtitle: stripProtocol(link.url),
			url: link.url,
		})),
	];
}

export default function ProjectCaseApp({ slug }: { slug: ProjectSlug }) {
	const locale = resolveLocale(useLegacyUiLocale());
	const copy = COPY[locale];
	const project = PROJECT_BY_SLUG[slug];
	const caseStudy = PROJECT_CASE_STUDIES[slug];
	const registryEntry = PROJECT_APP_REGISTRY[slug];
	const iconMeta = registryEntry.icon;
	const externalLinks = getProjectExternalLinks(project);
	const [query, setQuery] = useState("");
	const deferredQuery = useDeferredValue(query.trim().toLowerCase());
	const [caseStudySegment, setCaseStudySegment] =
		useState<CaseStudySegmentId>("sections");
	const [selectedSectionId, setSelectedSectionId] = useState(
		caseStudy.sections[0]?.id ?? null,
	);
	const [selectedFaqIndex, setSelectedFaqIndex] = useState<number>(0);
	const [pendingLink, setPendingLink] = useState<LinkRow | null>(null);

	const [activeDefaultTab, setActiveDefaultTab] =
		useState<DefaultTabId>("overview");
	const [activeVaparshopTab, setActiveVaparshopTab] =
		useState<VaparshopTabId>("system");
	const [activeHornyPlaceTab, setActiveHornyPlaceTab] =
		useState<HornyPlaceTabId>("identity");

	const filteredSections = useMemo(() => {
		if (!deferredQuery) {
			return caseStudy.sections;
		}

		return caseStudy.sections.filter((section) => {
			if (localeIncludes(section.title[locale], deferredQuery)) {
				return true;
			}

			if (
				section.paragraphs.some((paragraph) =>
					localeIncludes(paragraph[locale], deferredQuery),
				)
			) {
				return true;
			}

			return (
				section.bullets?.some((bullet) =>
					localeIncludes(bullet[locale], deferredQuery),
				) ?? false
			);
		});
	}, [caseStudy.sections, deferredQuery, locale]);

	const filteredFaq = useMemo(() => {
		if (!deferredQuery) {
			return caseStudy.faq;
		}

		return caseStudy.faq.filter(
			(item) =>
				localeIncludes(item.question[locale], deferredQuery) ||
				localeIncludes(item.answer[locale], deferredQuery),
		);
	}, [caseStudy.faq, deferredQuery, locale]);

	const selectedSection =
		filteredSections.find((section) => section.id === selectedSectionId) ??
		filteredSections[0] ??
		null;
	const selectedFaq = filteredFaq[selectedFaqIndex] ?? filteredFaq[0] ?? null;

	const linkRows = useMemo(
		() =>
			buildPortfolioLinkRows(locale, slug, project.title, externalLinks, copy),
		[copy, externalLinks, locale, project.title, slug],
	);

	const statusLabel =
		project.status === "live" ? copy.live : copy.inDevelopment;
	const visibilityLabel =
		project.visibility === "public"
			? copy.publicVisibility
			: copy.privateVisibility;
	const categoryLabel = PROJECT_CATEGORY_LABELS[project.category][locale];

	const defaultTabs: Array<{
		id: DefaultTabId;
		label: string;
		icon: ReactNode;
	}> = [
		{ id: "overview", label: copy.overview, icon: <OverviewGlyph /> },
		{ id: "case-study", label: copy.caseStudy, icon: <NotesGlyph /> },
		{ id: "links", label: copy.links, icon: <LinkGlyph /> },
	];
	const vaparshopTabs: Array<{
		id: VaparshopTabId;
		label: string;
		icon: ReactNode;
	}> = [
		{ id: "system", label: copy.system, icon: <SystemGlyph /> },
		{ id: "flows", label: copy.flows, icon: <NotesGlyph /> },
		{ id: "impact", label: copy.impact, icon: <ImpactGlyph /> },
	];
	const hornyPlaceTabs: Array<{
		id: HornyPlaceTabId;
		label: string;
		icon: ReactNode;
	}> = [
		{ id: "identity", label: copy.identity, icon: <IdentityGlyph /> },
		{ id: "applications", label: copy.applications, icon: <WindowGlyph /> },
		{ id: "digital", label: copy.digital, icon: <LinkGlyph /> },
	];

	function openLink(row: LinkRow) {
		setPendingLink(row);
	}

	function confirmOpenLink() {
		if (!pendingLink) {
			return;
		}

		const href = pendingLink.url.startsWith("/")
			? `${window.location.origin}${pendingLink.url}`
			: pendingLink.url;
		window.open(href, "_blank", "noopener,noreferrer");
		setPendingLink(null);
	}

	function renderStandardOverview() {
		return (
			<div className="space-y-[10px]">
				<FeaturedHero
					title={project.title}
					badge={caseStudy.hero.badge[locale]}
					summary={project.short[locale]}
					details={project.details[locale]}
					accentFrom={iconMeta.accentFrom}
					accentTo={iconMeta.accentTo}
					style="system"
				/>
				<IOS6Toolbar>
					<IOS6ToolbarChip label={copy.status} value={statusLabel} />
					<IOS6ToolbarChip label={copy.visibility} value={visibilityLabel} />
					<IOS6ToolbarChip label={copy.category} value={categoryLabel} />
				</IOS6Toolbar>
				<DetailCard
					title={caseStudy.hero.badge[locale]}
					body={[caseStudy.hero.summary[locale], project.details[locale]]}
					accent={iconMeta.accentFrom}
				/>
				<IOS6ListGroup title={copy.tags}>
					<div className="flex flex-wrap gap-[8px] px-[12px] py-[12px]">
						{project.tags.map((tag) => (
							<div
								key={tag}
								className="rounded-full border border-[#b8c3d4] bg-[linear-gradient(180deg,#ffffff_0%,#e8eef6_100%)] px-[10px] py-[5px] text-[#334155] text-[11px]"
								style={{
									fontFamily: LEGACY_IOS_FONT_FAMILY,
									fontWeight: 700,
								}}
							>
								{tag}
							</div>
						))}
					</div>
				</IOS6ListGroup>
			</div>
		);
	}

	function renderCaseStudyInspector() {
		const sectionRows = filteredSections.map((section) => ({
			id: section.id,
			title: section.title[locale],
			subtitle: section.paragraphs[0]?.[locale] ?? "",
		}));
		const faqRows = filteredFaq.map((item, index) => ({
			id: `faq-${index + 1}`,
			title: item.question[locale],
			subtitle: item.answer[locale],
		}));

		return (
			<div className="space-y-[10px]">
				<IOS6SegmentedControl
					items={[
						{ id: "sections", label: copy.sections },
						{ id: "faq", label: copy.faq },
					]}
					value={caseStudySegment}
					onChange={setCaseStudySegment}
				/>
				{caseStudySegment === "sections" ? (
					<SectionInspector
						title={copy.sections}
						rows={sectionRows}
						selectedId={selectedSection?.id ?? null}
						onSelect={setSelectedSectionId}
						detail={
							selectedSection
								? {
										title: selectedSection.title[locale],
										body: selectedSection.paragraphs.map(
											(paragraph) => paragraph[locale],
										),
										bullets: selectedSection.bullets?.map(
											(bullet) => bullet[locale],
										),
									}
								: null
						}
						accent={iconMeta.accentFrom}
						emptyLabel={copy.noSections}
					/>
				) : (
					<SectionInspector
						title={copy.faq}
						rows={faqRows}
						selectedId={
							selectedFaq ? `faq-${filteredFaq.indexOf(selectedFaq) + 1}` : null
						}
						onSelect={(id) =>
							setSelectedFaqIndex(
								Math.max(
									0,
									filteredFaq.findIndex(
										(_item, index) => `faq-${index + 1}` === id,
									),
								),
							)
						}
						detail={
							selectedFaq
								? {
										title: selectedFaq.question[locale],
										body: [selectedFaq.answer[locale]],
									}
								: null
						}
						accent={iconMeta.accentFrom}
						emptyLabel={copy.noFaq}
					/>
				)}
			</div>
		);
	}

	function renderLinksPane() {
		return (
			<div className="space-y-[10px]">
				<IOS6ListGroup title={copy.links}>
					{linkRows.map((row, index) => (
						<div
							key={row.id}
							className={index > 0 ? "border-[#e2e8f0] border-t" : ""}
						>
							<IOS6ListRow
								title={row.title}
								subtitle={row.subtitle}
								onClick={() => openLink(row)}
							/>
						</div>
					))}
				</IOS6ListGroup>
				{externalLinks.length === 0 ? (
					<EmptyPanel label={copy.noLinks} />
				) : null}
			</div>
		);
	}

	function renderVaparshopSystem() {
		return (
			<div className="space-y-[10px]">
				<FeaturedHero
					title={project.title}
					badge={copy.workingLabel}
					summary={caseStudy.hero.summary[locale]}
					details={project.details[locale]}
					accentFrom={iconMeta.accentFrom}
					accentTo={iconMeta.accentTo}
					style="system"
				/>
				<IOS6Toolbar>
					<IOS6ToolbarChip label={copy.status} value={statusLabel} />
					<IOS6ToolbarChip label="Bots" value="Telegram" />
					<IOS6ToolbarChip label="Stack" value="Next.js" />
				</IOS6Toolbar>
				<div className="rounded-[12px] border border-[#b9c4d3] bg-white px-[12px] py-[12px] shadow-[0_1px_0_rgba(255,255,255,0.85)]">
					<div className="space-y-[10px]">
						<IOS6Slider label="Ops coverage" value={0.88} />
						<IOS6Slider label="Bot density" value={0.71} />
						<IOS6Slider label="Release rhythm" value={0.93} />
					</div>
				</div>
				{renderStandardOverview()}
			</div>
		);
	}

	function renderHornyPlaceIdentity() {
		return (
			<div className="space-y-[10px]">
				<FeaturedHero
					title={project.title}
					badge={caseStudy.hero.badge[locale]}
					summary={caseStudy.hero.summary[locale]}
					details={project.details[locale]}
					accentFrom={iconMeta.accentFrom}
					accentTo={iconMeta.accentTo}
					style="editorial"
				/>
				<IOS6Toolbar>
					<IOS6ToolbarChip label={copy.category} value={categoryLabel} />
					<IOS6ToolbarChip label={copy.visibility} value={visibilityLabel} />
					<IOS6ToolbarChip label="Tone" value="Retail" />
				</IOS6Toolbar>
				<DetailCard
					title={copy.identity}
					body={[project.short[locale], caseStudy.hero.summary[locale]]}
					accent={iconMeta.accentFrom}
				/>
				<IOS6ListGroup title={copy.tags}>
					<div className="grid grid-cols-2 gap-[8px] px-[12px] py-[12px]">
						{project.tags.map((tag) => (
							<div
								key={tag}
								className="rounded-[10px] border border-[#e5d5c6] bg-[linear-gradient(180deg,#fff8f0_0%,#f3e4d6_100%)] px-[10px] py-[8px] text-[#6a3d36] text-[11px]"
								style={{
									fontFamily: LEGACY_IOS_FONT_FAMILY,
									fontWeight: 700,
								}}
							>
								{tag}
							</div>
						))}
					</div>
				</IOS6ListGroup>
			</div>
		);
	}

	function renderContent() {
		if (slug === "vaparshop") {
			switch (activeVaparshopTab) {
				case "system":
					return renderVaparshopSystem();
				case "flows":
					return renderCaseStudyInspector();
				case "impact":
					return renderLinksPane();
			}
		}

		if (slug === "horny-place") {
			switch (activeHornyPlaceTab) {
				case "identity":
					return renderHornyPlaceIdentity();
				case "applications":
					return renderCaseStudyInspector();
				case "digital":
					return renderLinksPane();
			}
		}

		switch (activeDefaultTab) {
			case "overview":
				return renderStandardOverview();
			case "case-study":
				return renderCaseStudyInspector();
			case "links":
				return renderLinksPane();
		}
	}

	return (
		<div className="relative flex h-full flex-col bg-[#dfe5ef]">
			<IOS6SearchBar
				value={query}
				onChange={setQuery}
				placeholder={copy.searchPlaceholder}
				onClear={() => setQuery("")}
				cancelLabel={copy.cancel}
			/>
			<div className="flex-1 overflow-y-auto bg-[linear-gradient(180deg,#e9eef4_0%,#d7dee9_100%)] px-[10px] py-[10px]">
				{renderContent()}
			</div>
			{slug === "vaparshop" ? (
				<IOS6TabBar
					items={vaparshopTabs}
					value={activeVaparshopTab}
					onChange={setActiveVaparshopTab}
				/>
			) : slug === "horny-place" ? (
				<IOS6TabBar
					items={hornyPlaceTabs}
					value={activeHornyPlaceTab}
					onChange={setActiveHornyPlaceTab}
				/>
			) : (
				<IOS6TabBar
					items={defaultTabs}
					value={activeDefaultTab}
					onChange={setActiveDefaultTab}
				/>
			)}
			{pendingLink ? (
				<IOS6Alert
					title={copy.openLinkTitle}
					message={copy.openLinkMessage}
					buttons={[
						{
							label: copy.cancel,
							onClick: () => setPendingLink(null),
						},
						{
							label: copy.openNow,
							onClick: confirmOpenLink,
							variant: "primary",
						},
					]}
				/>
			) : null}
		</div>
	);
}
