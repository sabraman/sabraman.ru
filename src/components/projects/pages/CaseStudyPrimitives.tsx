import { ArrowUpRight, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import type {
	CaseStudySection,
	ProjectCaseStudy,
} from "~/data/project-case-studies";
import {
	getCaseStudyPath,
	getProjectExternalLinks,
	type LocaleText,
	type ProjectItem,
} from "~/data/projects";
import {
	getLocalizedPathname,
	getLocalizedHashPathname,
} from "~/i18n/locale-paths";

export type SupportedLocale = "en" | "ru";

export type ProjectPageProps = {
	locale: SupportedLocale;
	project: ProjectItem;
	caseStudy: ProjectCaseStudy;
	relatedProjects: ProjectItem[];
};

const LABELS = {
	en: {
		backToWork: "Back to work hub",
		related: "Related projects",
		external: "External links",
		faq: "FAQ",
		privateInDev: "Private / In development",
		privateRepo: "Private repository",
		publicRepo: "Public repository",
		repo: "Repository",
		status: "Status",
		live: "Live",
		inDevelopment: "In development",
		caseStudy: "Case Study",
		viewCase: "Open case study",
	},
	ru: {
		backToWork: "Назад в хаб кейсов",
		related: "Связанные проекты",
		external: "Внешние ссылки",
		faq: "FAQ",
		privateInDev: "Приватный / В разработке",
		privateRepo: "Приватный репозиторий",
		publicRepo: "Публичный репозиторий",
		repo: "Репозиторий",
		status: "Статус",
		live: "Запущен",
		inDevelopment: "В разработке",
		caseStudy: "Кейс",
		viewCase: "Открыть кейс",
	},
} as const;

export function text(content: LocaleText, locale: SupportedLocale): string {
	return content[locale];
}

export function pickSection(
	caseStudy: ProjectCaseStudy,
	id: string,
): CaseStudySection {
	const section = caseStudy.sections.find((item) => item.id === id);

	if (!section) {
		throw new Error(`Missing section "${id}" for ${caseStudy.slug}`);
	}

	return section;
}

export function SectionCard({
	section,
	locale,
	className,
}: {
	section: CaseStudySection;
	locale: SupportedLocale;
	className?: string;
}) {
	return (
		<article className={`py-4 ${className ?? ""}`}>
			<h2
				className="mb-4 font-extrabold text-2xl leading-tight md:text-3xl"
				style={{
					fontFamily: "Heading Now Variable",
					fontVariationSettings: `'wght' 840, 'wdth' 860`,
				}}
			>
				{text(section.title, locale)}
			</h2>
			<div className="space-y-3">
				{section.paragraphs.map((paragraph) => (
					<p
						key={`${section.id}-${paragraph.en}`}
						className="text-base text-foreground/90 leading-relaxed"
					>
						{text(paragraph, locale)}
					</p>
				))}
			</div>
			{section.bullets?.length ? (
				<ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
					{section.bullets.map((bullet) => (
						<li
							key={`${section.id}-${bullet.en}`}
							className="group relative flex items-center overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent px-5 py-4 text-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
						>
							<span className="text-foreground/85 leading-relaxed font-medium transition-colors duration-300 group-hover:text-foreground">
								{text(bullet, locale)}
							</span>
						</li>
					))}
				</ul>
			) : null}
		</article>
	);
}

export function ProjectHero({
	project,
	caseStudy,
	locale,
	accentClassName = "",
}: {
	project: ProjectItem;
	caseStudy: ProjectCaseStudy;
	locale: SupportedLocale;
	accentClassName?: string;
}) {
	const labels = LABELS[locale];

	return (
		<section className="relative py-4">
			<div
				className={`pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl ${accentClassName}`}
			/>
			<div className="relative">
				<div className="mb-4 flex flex-wrap items-center gap-2">
					<Badge className="rounded-full bg-accent/10 px-3 py-1 text-accent">
						{text(caseStudy.hero.badge, locale)}
					</Badge>
					<Badge
						variant="outline"
						className="rounded-full border-primary/20 px-3 py-1"
					>
						{labels.caseStudy}
					</Badge>
				</div>
				<h1
					className="mb-4 font-extrabold text-4xl uppercase tracking-tight md:text-6xl"
					style={{
						fontFamily: "Heading Now Variable",
						fontVariationSettings: `'wght' 980, 'wdth' 820`,
					}}
				>
					{project.title}
				</h1>
				<p className="max-w-3xl text-lg text-muted-foreground leading-relaxed md:text-xl">
					{text(caseStudy.hero.summary, locale)}
				</p>
			</div>
		</section>
	);
}

export function MetaBar({
	project,
	locale,
}: {
	project: ProjectItem;
	locale: SupportedLocale;
}) {
	const labels = LABELS[locale];

	return (
		<div className="flex flex-wrap gap-2">
			<Badge className="rounded-full bg-primary/10 px-3 py-1 text-primary/90">
				{labels.repo}:{" "}
				{project.visibility === "private"
					? labels.privateRepo
					: labels.publicRepo}
			</Badge>
			<Badge className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
				{labels.status}:{" "}
				{project.status === "live" ? labels.live : labels.inDevelopment}
			</Badge>
		</div>
	);
}

export function ExternalLinks({
	project,
	locale,
}: {
	project: ProjectItem;
	locale: SupportedLocale;
}) {
	const links = getProjectExternalLinks(project);

	if (!links.length) {
		return null;
	}

	return (
		<div className="flex flex-wrap gap-2 py-4">
			{links.map((link) => (
				<Button key={link.url} asChild size="sm" variant="outline">
					<Link
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						className="gap-1.5"
					>
						{text(link.label, locale)}
						<ArrowUpRight className="h-3.5 w-3.5" />
					</Link>
				</Button>
			))}
		</div>
	);
}

export function FaqBlock({
	caseStudy,
	locale,
}: {
	caseStudy: ProjectCaseStudy;
	locale: SupportedLocale;
}) {
	const labels = LABELS[locale];

	return (
		<section className="py-4">
			<h2 className="mb-4 font-bold text-2xl">{labels.faq}</h2>
			<div className="space-y-4">
				{caseStudy.faq.map((entry) => (
					<article
						key={entry.question.en}
						className="border-b border-primary/10 pb-4 last:border-b-0"
					>
						<h3 className="mb-2 font-semibold text-base leading-snug">
							{text(entry.question, locale)}
						</h3>
						<p className="text-muted-foreground text-sm leading-relaxed">
							{text(entry.answer, locale)}
						</p>
					</article>
				))}
			</div>
		</section>
	);
}

export function RelatedProjects({
	relatedProjects,
	locale,
}: {
	relatedProjects: ProjectItem[];
	locale: SupportedLocale;
}) {
	const labels = LABELS[locale];

	return (
		<section className="py-4">
			<h2 className="mb-4 font-bold text-2xl">{labels.related}</h2>
			<div className="grid grid-cols-1 gap-3">
				{relatedProjects.slice(0, 4).map((item) => (
					<Link
						key={item.id}
						href={getCaseStudyPath(locale, item.slug)}
						className="group border-b border-primary/10 pb-4 last:border-b-0 block transition-colors hover:text-accent"
					>
						<p className="font-semibold text-base">{item.title}</p>
						<p className="mt-1 text-muted-foreground text-sm">
							{item.short[locale]}
						</p>
						<span className="mt-3 inline-flex items-center text-accent text-sm">
							{labels.viewCase}
							<ArrowUpRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</span>
					</Link>
				))}
			</div>
		</section>
	);
}

export function PageTopNav({ locale }: { locale: SupportedLocale }) {
	const labels = LABELS[locale];

	return (
		<div className="mb-6">
			<Link
				href={getLocalizedPathname(locale, "/work")}
				className="inline-flex items-center rounded-full border border-primary/20 px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:border-accent/30 hover:text-foreground"
			>
				{labels.backToWork}
			</Link>
		</div>
	);
}

export function AuthorCard({ locale }: { locale: SupportedLocale }) {
	return (
		<section className="mt-12 border-t border-primary/10 pt-10">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 py-6">
				<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] shadow-sm">
					{/* biome-ignore lint/accessibility/noRedundantAlt: Logo represents the author brand */}
					<img
						src="/logo.svg"
						className="h-10 w-10 object-contain brightness-0 invert"
						alt="Sabraman Logo"
					/>
				</div>
				<div>
					<h4
						className="font-extrabold text-lg text-foreground"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 840, 'wdth' 860`,
						}}
					>
						Danya Yudin (Sabraman)
					</h4>
					<p className="mt-0.5 text-xs text-muted-foreground">
						{locale === "ru"
							? "Дизайнер & Frontend Инженер"
							: "Designer & Frontend Engineer"}
					</p>
					<p className="mt-3 text-sm/relaxed text-foreground/80">
						{locale === "ru"
							? "Design-led frontend и product developer. Специализируется на веб-приложениях, дизайне интерфейсов и Telegram-системах."
							: "Design-led frontend and product developer specializing in web applications, interface design, and Telegram systems."}
					</p>
				</div>
			</div>
		</section>
	);
}

const CTA_LABELS = {
	en: {
		title: "INTERESTED IN WORKING TOGETHER?",
		description:
			"Let's build high-performance web platforms, custom Telegram Mini Apps, or premium design systems for your business.",
		getInTouch: "GET IN TOUCH",
	},
	ru: {
		title: "ИНТЕРЕСУЕТ РАБОТА ВМЕСТЕ?",
		description:
			"Давайте разработаем производительные веб-платформы, удобные Telegram Mini Apps или уникальные дизайн-системы для вашего бизнеса.",
		getInTouch: "СВЯЗАТЬСЯ",
	},
} as const;

export function CaseStudyCTA({
	locale,
	backHref,
	backLabel,
}: {
	locale: SupportedLocale;
	backHref: string;
	backLabel: string;
}) {
	const labels = CTA_LABELS[locale];
	const contactHref = getLocalizedHashPathname(locale, "/", "contact-section");

	return (
		<section className="border-t border-white/5 py-20 md:py-28 bg-white/[0.01]">
			<div className="container mx-auto max-w-2xl px-4 text-center">
				<h2
					className="mb-6 font-extrabold text-3xl uppercase tracking-tight md:text-5xl"
					style={{
						fontFamily: "Heading Now Variable",
						fontVariationSettings: `'wght' 840, 'wdth' 860`,
					}}
				>
					{labels.title}
				</h2>
				<p className="mb-10 text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto">
					{labels.description}
				</p>

				<div className="flex flex-col justify-center gap-3.5 sm:flex-row">
					<Button
						size="lg"
						className="group rounded-full px-8 py-5.5 font-semibold text-sm transition-all hover:scale-[1.02]"
						asChild
					>
						<Link href={contactHref}>
							<span>{labels.getInTouch}</span>
							<ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</Link>
					</Button>

					<Button
						variant="outline"
						size="lg"
						className="group rounded-full px-8 py-5.5 font-semibold text-sm border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:scale-[1.02]"
						asChild
					>
						<Link href={backHref}>
							<ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
							<span>{backLabel}</span>
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
