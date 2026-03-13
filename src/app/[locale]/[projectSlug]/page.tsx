import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECT_PAGE_COMPONENTS } from "~/components/projects/pages";
import { getProjectCaseStudy } from "~/data/project-case-studies";
import {
	getCaseStudyPath,
	getProjectBySlug,
	PROJECT_SLUGS,
	type ProjectItem,
	type ProjectSlug,
} from "~/data/projects";

type SupportedLocale = "en" | "ru";
const DEDICATED_PROJECT_SLUGS: ProjectSlug[] = [
	"vaparshop",
	"horny-place",
	"price-tag-printer",
];

function isDedicatedProjectSlug(slug: string): slug is ProjectSlug {
	return DEDICATED_PROJECT_SLUGS.includes(slug as ProjectSlug);
}

function resolveLocale(locale: string): SupportedLocale {
	return locale === "ru" ? "ru" : "en";
}

function getRelatedProjects(project: ProjectItem): ProjectItem[] {
	const sameCategory = PROJECT_SLUGS.map((slug) => getProjectBySlug(slug))
		.filter((item): item is ProjectItem => Boolean(item))
		.filter(
			(item) =>
				item.slug !== project.slug && item.category === project.category,
		);
	const featured = PROJECT_SLUGS.map((slug) => getProjectBySlug(slug))
		.filter((item): item is ProjectItem => Boolean(item))
		.filter((item) => item.slug !== project.slug && item.isFeaturedWork);

	const uniqueRelated: ProjectItem[] = [];

	for (const item of [...sameCategory, ...featured]) {
		if (uniqueRelated.some((entry) => entry.slug === item.slug)) {
			continue;
		}
		uniqueRelated.push(item);
	}

	return uniqueRelated.slice(0, 4);
}

function toSiteUrl(path: string) {
	return `https://sabraman.ru${path}`;
}

function getWorkPath(locale: SupportedLocale) {
	return locale === "ru" ? "/ru/work" : "/work";
}

function getSchemaType(
	project: ProjectItem,
): "CreativeWork" | "SoftwareApplication" {
	if (project.category === "web_platforms" && project.slug === "horny-place") {
		return "CreativeWork";
	}

	if (project.category === "web_platforms" && project.slug === "arch-taplink") {
		return "CreativeWork";
	}

	if (project.category === "web_platforms" && project.slug === "vape-me-fast") {
		return "CreativeWork";
	}

	return "SoftwareApplication";
}

export function generateStaticParams() {
	return PROJECT_SLUGS.filter(
		(projectSlug) => !isDedicatedProjectSlug(projectSlug),
	).map((projectSlug) => ({ projectSlug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; projectSlug: string }>;
}): Promise<Metadata> {
	const { locale, projectSlug } = await params;
	const lang = resolveLocale(locale);
	if (isDedicatedProjectSlug(projectSlug)) {
		return {
			title: "Project moved",
			robots: {
				index: false,
				follow: false,
			},
		};
	}

	const project = getProjectBySlug(projectSlug);
	const caseStudy = getProjectCaseStudy(projectSlug);

	if (!project || !caseStudy) {
		return {
			title: "Project not found",
			robots: {
				index: false,
				follow: false,
			},
		};
	}

	const slug = project.slug;
	const path = getCaseStudyPath(lang, slug);
	const title = caseStudy.seo.title[lang];
	const description = caseStudy.seo.description[lang];
	const ogImage = `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(
		caseStudy.seo.ogSubtitle[lang],
	)}`;

	return {
		title,
		description,
		keywords: caseStudy.seo.keywords[lang],
		alternates: {
			canonical: path,
			languages: {
				en: `/${slug}`,
				ru: `/ru/${slug}`,
				"x-default": `/${slug}`,
			},
		},
		openGraph: {
			title,
			description,
			url: toSiteUrl(path),
			siteName: "Sabraman - Danya Yudin Portfolio",
			locale: lang === "ru" ? "ru_RU" : "en_US",
			type: "article",
			images: [ogImage],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
		},
	};
}

export default async function ProjectCaseStudyPage({
	params,
}: {
	params: Promise<{ locale: string; projectSlug: string }>;
}) {
	const { locale, projectSlug } = await params;
	if (isDedicatedProjectSlug(projectSlug)) {
		notFound();
	}

	const lang = resolveLocale(locale);
	const project = getProjectBySlug(projectSlug);
	const caseStudy = getProjectCaseStudy(projectSlug);

	if (!project || !caseStudy) {
		notFound();
	}

	const PageComponent = PROJECT_PAGE_COMPONENTS[project.slug as ProjectSlug];

	if (!PageComponent) {
		notFound();
	}

	const path = getCaseStudyPath(lang, project.slug);
	const relatedProjects = getRelatedProjects(project);
	const title = caseStudy.seo.title[lang];
	const description = caseStudy.seo.description[lang];
	const schemaType = getSchemaType(project);

	const webPageJsonLd = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: title,
		description,
		url: toSiteUrl(path),
		inLanguage: lang,
	};

	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: lang === "ru" ? "Главная" : "Home",
				item: toSiteUrl(lang === "ru" ? "/ru" : "/"),
			},
			{
				"@type": "ListItem",
				position: 2,
				name: lang === "ru" ? "Кейсы" : "Work",
				item: toSiteUrl(getWorkPath(lang)),
			},
			{
				"@type": "ListItem",
				position: 3,
				name: project.title,
				item: toSiteUrl(path),
			},
		],
	};

	const projectJsonLd =
		schemaType === "SoftwareApplication"
			? {
					"@context": "https://schema.org",
					"@type": "SoftwareApplication",
					name: project.title,
					description,
					url: toSiteUrl(path),
					applicationCategory: "BusinessApplication",
					operatingSystem: "Web",
					inLanguage: lang,
					keywords: project.tags.join(", "),
				}
			: {
					"@context": "https://schema.org",
					"@type": "CreativeWork",
					name: project.title,
					description,
					url: toSiteUrl(path),
					inLanguage: lang,
					about: project.tags,
				};

	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: caseStudy.faq.map((item) => ({
			"@type": "Question",
			name: item.question[lang],
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer[lang],
			},
		})),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<PageComponent
				locale={lang}
				project={project}
				caseStudy={caseStudy}
				relatedProjects={relatedProjects}
			/>
		</>
	);
}
