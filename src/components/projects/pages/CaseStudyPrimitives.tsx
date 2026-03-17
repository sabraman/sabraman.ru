import { ArrowUpRight } from "lucide-react";
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
import { getLocalizedPathname } from "~/i18n/locale-paths";

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
		<article
			className={`rounded-3xl border border-primary/15 bg-background/70 p-6 shadow-sm backdrop-blur-sm ${
				className ?? ""
			}`}
		>
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
				<ul className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
					{section.bullets.map((bullet) => (
						<li
							key={`${section.id}-${bullet.en}`}
							className="rounded-full border border-primary/15 bg-primary/5 px-3 py-2 text-sm"
						>
							{text(bullet, locale)}
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
		<section className="relative overflow-hidden rounded-3xl border border-primary/15 bg-background/70 p-6 shadow-sm md:p-10">
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
	const labels = LABELS[locale];

	return (
		<section className="rounded-3xl border border-primary/15 bg-background/70 p-6 shadow-sm">
			<h2 className="mb-4 font-bold text-2xl">{labels.external}</h2>
			{links.length ? (
				<div className="flex flex-wrap gap-2">
					{links.map((link) => (
						<Button key={link.url} asChild size="sm" variant="outline">
							<Link
								href={link.url}
								target="_blank"
								rel="noreferrer"
								className="gap-1.5"
							>
								{text(link.label, locale)}
								<ArrowUpRight className="h-3.5 w-3.5" />
							</Link>
						</Button>
					))}
				</div>
			) : (
				<p className="text-muted-foreground text-sm">{labels.privateInDev}</p>
			)}
		</section>
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
		<section className="rounded-3xl border border-primary/15 bg-background/70 p-6 shadow-sm">
			<h2 className="mb-4 font-bold text-2xl">{labels.faq}</h2>
			<div className="space-y-4">
				{caseStudy.faq.map((entry) => (
					<article
						key={entry.question.en}
						className="rounded-2xl border border-primary/10 p-4"
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
		<section className="rounded-3xl border border-primary/15 bg-background/70 p-6 shadow-sm">
			<h2 className="mb-4 font-bold text-2xl">{labels.related}</h2>
			<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
				{relatedProjects.slice(0, 4).map((item) => (
					<Link
						key={item.id}
						href={getCaseStudyPath(locale, item.slug)}
						className="group rounded-2xl border border-primary/10 p-4 transition-colors hover:border-accent/30"
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
