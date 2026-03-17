"use client";

import { ArrowUpRight, Inbox, MailOpen, Send, Sparkles } from "lucide-react";
import { useLegacyUiLocale } from "../legacy-locale-context";
import { LEGACY_IOS_FONT_FAMILY } from "../ui/legacy-status-data";

function buildMailtoHref(subject: string) {
	return `mailto:sabraman@ya.ru?subject=${encodeURIComponent(subject)}`;
}

const COPY = {
	en: {
		header: "Inbox",
		subline:
			"Use email for structured briefs and Telegram for fast back-and-forth.",
		compose: "Compose",
		composeHref: buildMailtoHref("New project"),
		unread: "Unread",
		archive: "Archive",
		rhythm: "Reply rhythm",
		rhythmValue: "Same day",
		noteLabel: "Note",
		note: "For detailed requests, send scope, links, deadlines, and rough constraints. The tighter the brief, the faster the reply.",
	},
	ru: {
		header: "Входящие",
		subline:
			"Почта подходит для структурных брифов, Telegram - для быстрых созвонов и уточнений.",
		compose: "Написать",
		composeHref: buildMailtoHref("Новый проект"),
		unread: "Непрочит.",
		archive: "Архив",
		rhythm: "Ответ",
		rhythmValue: "В тот же день",
		noteLabel: "Заметка",
		note: "Для содержательного запроса лучше сразу прислать scope, ссылки, дедлайны и ограничения. Чем точнее бриф, тем быстрее ответ.",
	},
} as const;

const MESSAGES = {
	en: [
		{
			from: "new business",
			subject: "Telegram retail tool",
			preview:
				"Need a bot plus mini app flow for store operations, analytics, and reporting.",
			time: "09:21",
			unread: true,
			href: buildMailtoHref("Telegram retail tool"),
		},
		{
			from: "portfolio",
			subject: "New website inquiry",
			preview:
				"Looking for a portfolio-grade landing page with stronger visual direction and motion.",
			time: "Yesterday",
			unread: true,
			href: "/contact",
		},
		{
			from: "work hub",
			subject: "Case studies and shipped work",
			preview:
				"Open the project index and review recent launches and product surfaces.",
			time: "Tue",
			unread: false,
			href: "/work",
		},
		{
			from: "github",
			subject: "Source and experiments",
			preview:
				"Browse public repos, UI experiments, and tool prototypes on GitHub.",
			time: "Mon",
			unread: false,
			href: "https://github.com/sabraman",
		},
	],
	ru: [
		{
			from: "new business",
			subject: "Telegram-инструмент для ритейла",
			preview:
				"Нужен бот и mini app для операционки магазина, аналитики и отчетности.",
			time: "09:21",
			unread: true,
			href: buildMailtoHref("Telegram-инструмент для ритейла"),
		},
		{
			from: "portfolio",
			subject: "Запрос на новый сайт",
			preview:
				"Нужен лендинг с сильнее выраженной визуальной подачей, движением и аккуратной версткой.",
			time: "Вчера",
			unread: true,
			href: "/ru/contact",
		},
		{
			from: "work hub",
			subject: "Кейсы и запущенные продукты",
			preview:
				"Открыть индекс проектов и посмотреть недавние запуски, инструменты и продуктовые поверхности.",
			time: "Вт",
			unread: false,
			href: "/ru/work",
		},
		{
			from: "github",
			subject: "Код и эксперименты",
			preview:
				"Открыть публичные репозитории, UI-эксперименты и рабочие прототипы на GitHub.",
			time: "Пн",
			unread: false,
			href: "https://github.com/sabraman",
		},
	],
} as const;

function Metric({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-[16px] bg-[#f3f6fb] px-3 py-3">
			<p
				className="text-[#7d8796] text-[10px] uppercase tracking-[0.22em]"
				style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
			>
				{label}
			</p>
			<p
				className="mt-2 text-[#101828] text-[18px]"
				style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
			>
				{value}
			</p>
		</div>
	);
}

export default function MailApp() {
	const locale = useLegacyUiLocale();
	const copy = COPY[locale];
	const messages = MESSAGES[locale];

	return (
		<div className="h-full overflow-y-auto bg-[#eef2f7] px-4 pt-5 pb-10 text-black">
			<section className="rounded-[20px] bg-white p-4 shadow-[0_12px_24px_rgba(89,104,133,0.12)]">
				<div className="flex items-start justify-between gap-4">
					<div>
						<div className="flex items-center gap-2">
							<Inbox className="h-4 w-4 text-[#516277]" />
							<p
								className="text-[#111827] text-[24px]"
								style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
							>
								{copy.header}
							</p>
						</div>
						<p
							className="mt-2 max-w-[210px] text-[#697789] text-[13px] leading-[18px]"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
						>
							{copy.subline}
						</p>
					</div>
					<a
						href={copy.composeHref}
						className="inline-flex h-[36px] items-center rounded-full bg-[linear-gradient(180deg,#4b90ff_0%,#2563eb_100%)] px-4 text-[12px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
						style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
					>
						{copy.compose}
					</a>
				</div>

				<div className="mt-4 grid grid-cols-3 gap-3">
					<Metric label={copy.unread} value="2" />
					<Metric label={copy.archive} value="14" />
					<Metric label={copy.rhythm} value={copy.rhythmValue} />
				</div>
			</section>

			<section className="mt-5 overflow-hidden rounded-[18px] border border-[#d8dee7] bg-white shadow-[0_1px_0_rgba(255,255,255,0.75)]">
				{messages.map((message, index) => {
					const rowClassName =
						index === messages.length - 1
							? "flex items-start gap-3 px-4 py-4"
							: "flex items-start gap-3 border-b border-[#edf1f5] px-4 py-4";

					return (
						<a
							key={`${message.from}-${message.subject}`}
							href={message.href}
							target={message.href.startsWith("http") ? "_blank" : undefined}
							rel={message.href.startsWith("http") ? "noreferrer" : undefined}
							className={rowClassName}
						>
							<div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center">
								{message.unread ? (
									<div className="h-[10px] w-[10px] rounded-full bg-[#2f80ff]" />
								) : (
									<MailOpen className="h-4 w-4 text-[#b3bac5]" />
								)}
							</div>
							<div className="min-w-0 flex-1">
								<div className="flex items-start justify-between gap-3">
									<p
										className="truncate text-[#111827] text-[15px]"
										style={{
											fontFamily: LEGACY_IOS_FONT_FAMILY,
											fontWeight: message.unread ? 700 : 500,
										}}
									>
										{message.from}
									</p>
									<p
										className="shrink-0 text-[#8a94a4] text-[12px]"
										style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
									>
										{message.time}
									</p>
								</div>
								<p
									className="mt-1 text-[#283445] text-[14px]"
									style={{
										fontFamily: LEGACY_IOS_FONT_FAMILY,
										fontWeight: message.unread ? 700 : 500,
									}}
								>
									{message.subject}
								</p>
								<p
									className="mt-1 text-[#6b7280] text-[13px] leading-[18px]"
									style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
								>
									{message.preview}
								</p>
							</div>
							<ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#b3bac5]" />
						</a>
					);
				})}
			</section>

			<section className="mt-5 rounded-[18px] bg-white px-4 py-4 shadow-[0_8px_18px_rgba(90,108,138,0.12)]">
				<div className="mb-3 flex items-center gap-2">
					<Send className="h-4 w-4 text-[#516277]" />
					<p
						className="text-[#7d8796] text-[12px] uppercase tracking-[0.22em]"
						style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
					>
						{copy.noteLabel}
					</p>
				</div>
				<div className="flex items-start gap-3 rounded-[16px] bg-[#f3f6fb] px-4 py-3">
					<Sparkles className="mt-[2px] h-4 w-4 shrink-0 text-[#516277]" />
					<p
						className="text-[#1f2937] text-[14px] leading-[19px]"
						style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
					>
						{copy.note}
					</p>
				</div>
			</section>
		</div>
	);
}
