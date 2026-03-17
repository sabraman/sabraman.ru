import type { Metadata } from "next";
import {
	PROJECT_CASE_STUDIES,
	type ProjectCaseStudy,
} from "~/data/project-case-studies";
import type {
	LocaleText,
	ProjectCaseStudyRoute,
	ProjectSlug,
} from "~/data/projects";
import { getCaseStudyPath, PROJECT_BY_SLUG, PROJECTS } from "~/data/projects";
import { getLocalizedPathname } from "~/i18n/locale-paths";
import type { SupportedLocale } from "~/i18n/types";
import { buildIndexableMetadata } from "~/lib/seo/metadata";
import { getProjectPublicRouteId } from "~/lib/seo/public-route-policy";
import {
	createBreadcrumbJsonLd,
	createCreativeWorkJsonLd,
	createFaqJsonLd,
	createSoftwareApplicationJsonLd,
	createWebPageJsonLd,
	type JsonLdObject,
} from "~/lib/seo/structured-data";

export type CaseStudyDiscoverabilityRecord = {
	changeFrequency: "monthly" | "weekly";
	description: LocaleText;
	pathEn: string;
	priority: number;
	projectSlug: ProjectSlug;
	publishedAt?: string;
	routeId: ReturnType<typeof getProjectPublicRouteId>;
	title: LocaleText;
	updatedAt: string;
};

type CaseStudySeoRecord = {
	caseStudy: ProjectCaseStudy;
	project: (typeof PROJECTS)[number];
};

function getCaseStudySeoRecord(
	slug: string,
	routeKind: ProjectCaseStudyRoute | "any" = "any",
): CaseStudySeoRecord | null {
	const project = PROJECT_BY_SLUG[slug as ProjectSlug];
	const caseStudy = PROJECT_CASE_STUDIES[slug as ProjectSlug];

	if (!project || !caseStudy) {
		return null;
	}

	if (routeKind !== "any" && project.caseStudyRoute !== routeKind) {
		return null;
	}

	return {
		caseStudy,
		project,
	};
}

export function getCaseStudyDiscoverabilityRecord(
	slug: ProjectSlug,
): CaseStudyDiscoverabilityRecord | null {
	const record = getCaseStudySeoRecord(slug);

	if (!record) {
		return null;
	}

	return {
		changeFrequency: record.project.isFeaturedWork ? "weekly" : "monthly",
		description: record.caseStudy.seo.description,
		pathEn: `/${record.project.slug}`,
		priority: record.project.isFeaturedWork ? 0.9 : 0.75,
		projectSlug: record.project.slug,
		...(record.caseStudy.publishedAt
			? { publishedAt: record.caseStudy.publishedAt }
			: {}),
		routeId: getProjectPublicRouteId(record.project.slug),
		title: record.caseStudy.seo.title,
		updatedAt: record.caseStudy.updatedAt,
	};
}

export function getAllCaseStudyDiscoverabilityRecords() {
	return PROJECTS.map((project) =>
		getCaseStudyDiscoverabilityRecord(project.slug),
	).filter(
		(record): record is CaseStudyDiscoverabilityRecord => record !== null,
	);
}

export async function getCaseStudyMetadata(
	locale: SupportedLocale,
	slug: string,
	options?: {
		routeKind?: ProjectCaseStudyRoute | "any";
	},
): Promise<Metadata | null> {
	const record = getCaseStudySeoRecord(slug, options?.routeKind ?? "any");

	if (!record) {
		return null;
	}

	return buildIndexableMetadata({
		description: record.caseStudy.seo.description[locale],
		keywords: record.caseStudy.seo.keywords[locale],
		locale,
		openGraphType: "article",
		pathEn: `/${record.project.slug}`,
		routeId: getProjectPublicRouteId(record.project.slug),
		slug: record.project.slug,
		title: record.caseStudy.seo.title[locale],
	});
}

export async function getCaseStudyJsonLd(
	locale: SupportedLocale,
	slug: string,
	options?: {
		routeKind?: ProjectCaseStudyRoute | "any";
	},
): Promise<JsonLdObject[] | null> {
	const record = getCaseStudySeoRecord(slug, options?.routeKind ?? "any");

	if (!record) {
		return null;
	}

	const path = getCaseStudyPath(locale, record.project.slug);
	const title = record.caseStudy.seo.title[locale];
	const description = record.caseStudy.seo.description[locale];
	const workPath = getLocalizedPathname(locale, "/work");

	const webPageJsonLd = createWebPageJsonLd({
		description,
		locale,
		name: title,
		path,
	});

	const breadcrumbJsonLd = createBreadcrumbJsonLd({
		items: [
			{
				name: locale === "ru" ? "Главная" : "Home",
				path: getLocalizedPathname(locale, "/"),
			},
			{
				name: locale === "ru" ? "Кейсы" : "Work",
				path: workPath,
			},
			{
				name: record.project.title,
				path,
			},
		],
	});

	const projectJsonLd =
		record.project.schemaEntityType === "SoftwareApplication"
			? createSoftwareApplicationJsonLd({
					dateModified: record.caseStudy.updatedAt,
					description,
					...(record.caseStudy.publishedAt
						? { datePublished: record.caseStudy.publishedAt }
						: {}),
					keywords: record.caseStudy.seo.keywords[locale],
					locale,
					name: record.project.title,
					path,
				})
			: createCreativeWorkJsonLd({
					about: record.project.tags,
					dateModified: record.caseStudy.updatedAt,
					...(record.caseStudy.publishedAt
						? { datePublished: record.caseStudy.publishedAt }
						: {}),
					locale,
					name: record.project.title,
					path,
				});

	const faqJsonLd = createFaqJsonLd({
		items: record.caseStudy.faq.map((item) => ({
			answer: item.answer[locale],
			question: item.question[locale],
		})),
	});

	return [webPageJsonLd, breadcrumbJsonLd, projectJsonLd, faqJsonLd];
}
