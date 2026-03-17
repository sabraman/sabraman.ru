"use client";

import {
	ArrowUpRight,
	ChevronRight,
	FileText,
	Github,
	Instagram,
	type LucideIcon,
	Mail,
	MapPin,
	Phone,
	Send,
	Sparkles,
} from "lucide-react";
import { getResumeAsset } from "~/lib/resume";
import { useLegacyUiLocale } from "../legacy-locale-context";
import { LEGACY_IOS_FONT_FAMILY } from "../ui/legacy-status-data";

type Locale = "en" | "ru";
type QuickAction = {
	label: string;
	description: string;
	href: string;
	icon: LucideIcon;
	download?: string;
};
type ContactLine = {
	label: string;
	value: string;
	href: string;
	icon: LucideIcon;
	download?: string;
};

const COPY = {
	en: {
		headline: "Direct line",
		subline: "Best for new work, product ideas, and fast questions.",
		location: "Saint Petersburg, Russia",
		quickTitle: "Quick actions",
		linesTitle: "Contact details",
		resumeLabel: "Resume",
		resumeDescription: "PDF download",
		availabilityTitle: "Best use cases",
		availability: [
			"Telegram bots and mini app product flows",
			"Portfolio-grade websites with strong art direction",
			"Internal tools that remove daily operational friction",
		],
	},
	ru: {
		headline: "Прямая линия",
		subline:
			"Лучший канал для новых задач, продуктовых идей и быстрых вопросов.",
		location: "Санкт-Петербург, Россия",
		quickTitle: "Быстрые действия",
		linesTitle: "Контакты",
		resumeLabel: "Резюме",
		resumeDescription: "Скачать PDF",
		availabilityTitle: "Когда писать",
		availability: [
			"Telegram-боты и продуктовые сценарии mini app",
			"Портфельные сайты с сильной арт-дирекцией",
			"Внутренние инструменты, которые снимают ежедневную рутину",
		],
	},
} as const;

const QUICK_ACTIONS: Record<Locale, QuickAction[]> = {
	en: [
		{
			label: "Email",
			description: "sabraman@ya.ru",
			href: "mailto:sabraman@ya.ru",
			icon: Mail,
		},
		{
			label: "Telegram",
			description: "@sabraman",
			href: "https://t.me/sabraman",
			icon: Send,
		},
		{
			label: "GitHub",
			description: "sabraman",
			href: "https://github.com/sabraman",
			icon: Github,
		},
	],
	ru: [
		{
			label: "Почта",
			description: "sabraman@ya.ru",
			href: "mailto:sabraman@ya.ru",
			icon: Mail,
		},
		{
			label: "Telegram",
			description: "@sabraman",
			href: "https://t.me/sabraman",
			icon: Send,
		},
		{
			label: "GitHub",
			description: "sabraman",
			href: "https://github.com/sabraman",
			icon: Github,
		},
	],
};

const CONTACT_LINES: Record<Locale, ContactLine[]> = {
	en: [
		{
			label: "Email",
			value: "sabraman@ya.ru",
			href: "mailto:sabraman@ya.ru",
			icon: Mail,
		},
		{
			label: "Telegram",
			value: "@sabraman",
			href: "https://t.me/sabraman",
			icon: Send,
		},
		{
			label: "GitHub",
			value: "github.com/sabraman",
			href: "https://github.com/sabraman",
			icon: Github,
		},
		{
			label: "Instagram",
			value: "instagram.com/sabraman",
			href: "https://instagram.com/sabraman",
			icon: Instagram,
		},
	],
	ru: [
		{
			label: "Почта",
			value: "sabraman@ya.ru",
			href: "mailto:sabraman@ya.ru",
			icon: Mail,
		},
		{
			label: "Telegram",
			value: "@sabraman",
			href: "https://t.me/sabraman",
			icon: Send,
		},
		{
			label: "GitHub",
			value: "github.com/sabraman",
			href: "https://github.com/sabraman",
			icon: Github,
		},
		{
			label: "Instagram",
			value: "instagram.com/sabraman",
			href: "https://instagram.com/sabraman",
			icon: Instagram,
		},
	],
};

function GroupTitle({ children }: { children: string }) {
	return (
		<p
			className="mb-2 px-2 text-[#7d8796] text-[12px] uppercase tracking-[0.22em]"
			style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
		>
			{children}
		</p>
	);
}

export default function PhoneApp() {
	const locale: Locale = useLegacyUiLocale();
	const copy = COPY[locale];
	const resume = getResumeAsset(locale);
	const quickActions: QuickAction[] = [
		...QUICK_ACTIONS[locale],
		{
			label: copy.resumeLabel,
			description: copy.resumeDescription,
			href: resume.href,
			icon: FileText,
			download: resume.downloadName,
		},
	];
	const contactLines: ContactLine[] = [
		...CONTACT_LINES[locale],
		{
			label: copy.resumeLabel,
			value: resume.downloadName,
			href: resume.href,
			icon: FileText,
			download: resume.downloadName,
		},
	];

	return (
		<div className="h-full overflow-y-auto bg-[#edf2f7] px-4 pt-5 pb-10 text-black">
			<section className="overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,#56e26f_0%,#21b53d_100%)] text-white shadow-[0_18px_36px_rgba(31,151,52,0.24)]">
				<div className="relative overflow-hidden px-5 pt-4 pb-5">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.36),transparent_48%)]" />
					<div className="relative z-10 flex items-start gap-4">
						<div className="flex h-[62px] w-[62px] items-center justify-center rounded-[18px] bg-[rgba(255,255,255,0.22)] shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]">
							<Phone className="h-7 w-7 text-white" />
						</div>
						<div className="min-w-0 flex-1">
							<p
								className="text-[24px] leading-[1.05]"
								style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
							>
								Danya Yudin
							</p>
							<p
								className="mt-1 text-[14px] text-white/92"
								style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
							>
								{copy.headline}
							</p>
							<div className="mt-3 flex items-start gap-2 text-white/92">
								<MapPin className="mt-[2px] h-4 w-4 shrink-0" />
								<p
									className="text-[13px] leading-[17px]"
									style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
								>
									{copy.location}
								</p>
							</div>
						</div>
					</div>
					<p
						className="relative z-10 mt-4 text-[14px] text-white/92 leading-[19px]"
						style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
					>
						{copy.subline}
					</p>
				</div>
			</section>

			<section className="mt-5">
				<GroupTitle>{copy.quickTitle}</GroupTitle>
				<div className="grid grid-cols-2 gap-3">
					{quickActions.map((action) => {
						const Icon = action.icon;
						return (
							<a
								key={action.label}
								href={action.href}
								download={action.download}
								rel={action.download ? undefined : "noreferrer"}
								target={action.download ? undefined : "_blank"}
								className="rounded-[18px] bg-white px-3 py-4 text-center shadow-[0_8px_18px_rgba(90,108,138,0.12)]"
							>
								<div className="mx-auto flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#f1f5fb]">
									<Icon className="h-5 w-5 text-[#2d3f5b]" />
								</div>
								<p
									className="mt-3 text-[#101828] text-[13px]"
									style={{
										fontFamily: LEGACY_IOS_FONT_FAMILY,
										fontWeight: 700,
									}}
								>
									{action.label}
								</p>
								<p
									className="mt-1 text-[#708198] text-[11px] leading-[14px]"
									style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
								>
									{action.description}
								</p>
							</a>
						);
					})}
				</div>
			</section>

			<section className="mt-5">
				<GroupTitle>{copy.linesTitle}</GroupTitle>
				<div className="overflow-hidden rounded-[18px] border border-[#d8dee7] bg-white shadow-[0_1px_0_rgba(255,255,255,0.75)]">
					{contactLines.map((line, index) => {
						const Icon = line.icon;
						const rowClassName =
							index === contactLines.length - 1
								? "flex items-center justify-between gap-3 px-4 py-3"
								: "flex items-center justify-between gap-3 border-b border-[#eef1f5] px-4 py-3";

						return (
							<a
								key={line.label}
								href={line.href}
								download={line.download}
								rel={line.download ? undefined : "noreferrer"}
								target={line.download ? undefined : "_blank"}
								className={rowClassName}
							>
								<div className="flex min-w-0 items-center gap-3">
									<div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2f5fa]">
										<Icon className="h-4 w-4 text-[#2f3e54]" />
									</div>
									<div className="min-w-0">
										<p
											className="text-[#101828] text-[14px]"
											style={{
												fontFamily: LEGACY_IOS_FONT_FAMILY,
												fontWeight: 700,
											}}
										>
											{line.label}
										</p>
										<p
											className="truncate text-[#6b7280] text-[13px]"
											style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
										>
											{line.value}
										</p>
									</div>
								</div>
								<ChevronRight className="h-4 w-4 shrink-0 text-[#b3bac5]" />
							</a>
						);
					})}
				</div>
			</section>

			<section className="mt-5 overflow-hidden rounded-[20px] bg-white px-4 py-4 shadow-[0_8px_18px_rgba(90,108,138,0.12)]">
				<div className="mb-3 flex items-center gap-2">
					<Sparkles className="h-4 w-4 text-[#2f3e54]" />
					<GroupTitle>{copy.availabilityTitle}</GroupTitle>
				</div>
				<div className="space-y-3">
					{copy.availability.map((item) => (
						<div
							className="flex items-start justify-between gap-3 rounded-[16px] bg-[#f2f5fa] px-4 py-3"
							key={item}
						>
							<p
								className="text-[#1f2937] text-[14px] leading-[19px]"
								style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
							>
								{item}
							</p>
							<ArrowUpRight className="mt-[2px] h-4 w-4 shrink-0 text-[#90a0b6]" />
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
