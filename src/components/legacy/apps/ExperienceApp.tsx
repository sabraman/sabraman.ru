"use client";

import {
	BriefcaseBusiness,
	ChevronRight,
	Layers3,
	MapPin,
	Sparkles,
} from "lucide-react";
import { useLegacyUiLocale } from "../legacy-locale-context";
import { LEGACY_IOS_FONT_FAMILY } from "../ui/legacy-status-data";

const COPY = {
	en: {
		headline: "Creative Designer & Frontend Developer",
		subline: "Design systems, Telegram products, and design-led frontend work.",
		years: "6+ years",
		location: "Saint Petersburg, Russia",
		summaryTitle: "Highlights",
		summary: [
			"Brand systems and retail storytelling",
			"Telegram bots and mini app workflows",
			"Next.js product surfaces with production delivery",
		],
		capabilitiesTitle: "Core areas",
		capabilities: ["Visual identity", "Frontend systems", "Product operations"],
		experienceTitle: "Experience",
	},
	ru: {
		headline: "Креативный дизайнер и разработчик",
		subline: "Дизайн-системы, Telegram-продукты и операционные инструменты.",
		years: "6+ лет",
		location: "Санкт-Петербург, Россия",
		summaryTitle: "Фокус",
		summary: [
			"Бренд-системы и ритейл-сторителлинг",
			"Telegram-боты и сценарии mini app",
			"Продуктовые поверхности на Next.js с продакшн-доставкой",
		],
		capabilitiesTitle: "Основные зоны",
		capabilities: [
			"Визуальная айдентика",
			"Frontend-системы",
			"Продуктовые операции",
		],
		experienceTitle: "Опыт",
	},
} as const;

const EXPERIENCES = {
	en: [
		{
			company: "VAPARSHOP",
			role: "Designer & Developer",
			period: "Jun 2024 - Mar 2025",
			location: "Saint Petersburg",
			details:
				"Telegram bots, mini app flows, price-tag tooling, brand assets, and internal automation for retail operations.",
		},
		{
			company: "HORNY PLACE",
			role: "Visual Designer & Developer",
			period: "Oct 2022 - May 2024",
			location: "Saint Petersburg",
			details:
				"Storefront visuals, promo systems, event assets, Taplink-style web pages, and long-term brand control.",
		},
		{
			company: "ELYSIUM",
			role: "Visual Merchandising & Sales Specialist",
			period: "Sep 2020 - Sep 2022",
			location: "Retail floor",
			details:
				"In-store composition, staff onboarding materials, and customer-facing merchandising logic.",
		},
		{
			company: "VAPE CLUB",
			role: "Visual Merchandiser & Sales Manager",
			period: "Feb 2019 - Aug 2020",
			location: "Retail floor",
			details:
				"Layout experiments, product placement, and practical sales-facing visual optimization.",
		},
	],
	ru: [
		{
			company: "VAPARSHOP",
			role: "Дизайнер и разработчик",
			period: "июнь 2024 - март 2025",
			location: "Санкт-Петербург",
			details:
				"Telegram-боты, mini app, генератор ценников, бренд-материалы и внутренняя автоматизация для ритейла.",
		},
		{
			company: "HORNY PLACE",
			role: "Visual Designer & Developer",
			period: "окт 2022 - май 2024",
			location: "Санкт-Петербург",
			details:
				"Вывески, промо-системы, event-материалы, Taplink-поверхности и долгий визуальный контроль бренда.",
		},
		{
			company: "ELYSIUM",
			role: "Visual Merchandising & Sales Specialist",
			period: "сен 2020 - сен 2022",
			location: "Ритейл",
			details:
				"Композиция магазинов, onboarding-материалы и работа с визуальной подачей на точке.",
		},
		{
			company: "VAPE CLUB",
			role: "Visual Merchandiser & Sales Manager",
			period: "фев 2019 - авг 2020",
			location: "Ритейл",
			details:
				"Планировки, раскладка товаров и практичная визуальная оптимизация продажи.",
		},
	],
} as const;

export default function ExperienceApp() {
	const locale = useLegacyUiLocale();
	const copy = COPY[locale];
	const experiences = EXPERIENCES[locale];

	return (
		<div className="h-full overflow-y-auto bg-[#ececf3] px-4 pt-5 pb-10 text-black">
			<div className="rounded-[18px] bg-white p-4 shadow-[0_1px_0_rgba(255,255,255,0.8),0_10px_24px_rgba(120,126,149,0.12)]">
				<div className="flex items-start gap-4">
					<div className="flex h-[56px] w-[56px] items-center justify-center rounded-[16px] bg-[linear-gradient(180deg,#cfd6e3_0%,#8e9db3_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
						<BriefcaseBusiness className="h-7 w-7 text-[#314155]" />
					</div>
					<div className="min-w-0 flex-1">
						<p
							className="text-[#111827] text-[20px]"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
						>
							{copy.headline}
						</p>
						<p
							className="mt-1 text-[#6b7280] text-[14px] leading-[19px]"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
						>
							{copy.subline}
						</p>
					</div>
				</div>

				<div className="mt-4 grid grid-cols-2 gap-3">
					<div className="rounded-[14px] bg-[#f2f5fa] px-3 py-3">
						<p
							className="text-[#718096] text-[10px] uppercase tracking-[0.22em]"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
						>
							Timeline
						</p>
						<p
							className="mt-2 text-[#111827] text-[19px]"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
						>
							{copy.years}
						</p>
					</div>
					<div className="rounded-[14px] bg-[#f2f5fa] px-3 py-3">
						<p
							className="text-[#718096] text-[10px] uppercase tracking-[0.22em]"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
						>
							Base
						</p>
						<div className="mt-2 flex items-start gap-2">
							<MapPin className="mt-[2px] h-4 w-4 shrink-0 text-[#4b5563]" />
							<p
								className="text-[#111827] text-[14px] leading-[18px]"
								style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
							>
								{copy.location}
							</p>
						</div>
					</div>
				</div>
			</div>

			<section className="mt-5">
				<p
					className="mb-2 px-2 text-[#6b7280] text-[12px] uppercase tracking-[0.22em]"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
				>
					{copy.summaryTitle}
				</p>
				<div className="overflow-hidden rounded-[16px] border border-[#d6dae3] bg-white shadow-[0_1px_0_rgba(255,255,255,0.75)]">
					{copy.summary.map((item, index) => (
						<div
							className={
								index === copy.summary.length - 1
									? "px-4 py-3"
									: "border-[#eceef4] border-b px-4 py-3"
							}
							key={item}
						>
							<div className="flex items-start gap-3">
								<Sparkles className="mt-[2px] h-4 w-4 shrink-0 text-[#4b5563]" />
								<p
									className="text-[#111827] text-[15px] leading-[20px]"
									style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
								>
									{item}
								</p>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="mt-5">
				<p
					className="mb-2 px-2 text-[#6b7280] text-[12px] uppercase tracking-[0.22em]"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
				>
					{copy.capabilitiesTitle}
				</p>
				<div className="overflow-hidden rounded-[16px] border border-[#d6dae3] bg-white shadow-[0_1px_0_rgba(255,255,255,0.75)]">
					{copy.capabilities.map((item, index) => (
						<div
							className={
								index === copy.capabilities.length - 1
									? "px-4 py-3"
									: "border-[#eceef4] border-b px-4 py-3"
							}
							key={item}
						>
							<div className="flex items-center justify-between gap-3">
								<div className="flex items-center gap-3">
									<Layers3 className="h-4 w-4 text-[#4b5563]" />
									<p
										className="text-[#111827] text-[16px]"
										style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
									>
										{item}
									</p>
								</div>
								<ChevronRight className="h-4 w-4 text-[#b3b8c2]" />
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="mt-5">
				<p
					className="mb-2 px-2 text-[#6b7280] text-[12px] uppercase tracking-[0.22em]"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
				>
					{copy.experienceTitle}
				</p>
				<div className="overflow-hidden rounded-[16px] border border-[#d6dae3] bg-white shadow-[0_1px_0_rgba(255,255,255,0.75)]">
					{experiences.map((experience, index) => (
						<div
							className={
								index === experiences.length - 1
									? "px-4 py-4"
									: "border-[#eceef4] border-b px-4 py-4"
							}
							key={experience.company}
						>
							<div className="flex items-start justify-between gap-4">
								<div className="min-w-0 flex-1">
									<p
										className="text-[#111827] text-[17px]"
										style={{
											fontFamily: LEGACY_IOS_FONT_FAMILY,
											fontWeight: 700,
										}}
									>
										{experience.company}
									</p>
									<p
										className="mt-1 text-[#4b5563] text-[14px]"
										style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
									>
										{experience.role}
									</p>
									<p
										className="mt-2 text-[#6b7280] text-[13px] leading-[18px]"
										style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
									>
										{experience.details}
									</p>
								</div>
								<div className="shrink-0 text-right">
									<p
										className="text-[#6b7280] text-[13px]"
										style={{
											fontFamily: LEGACY_IOS_FONT_FAMILY,
											fontWeight: 700,
										}}
									>
										{experience.period}
									</p>
									<p
										className="mt-1 text-[#9ca3af] text-[12px]"
										style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
									>
										{experience.location}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
