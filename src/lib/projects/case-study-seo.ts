import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { getCaseStudyPath } from "~/data/projects";
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
import { getResolvedCaseStudyRecord } from "./case-study-data";

export async function getCaseStudyMetadata(
	locale: SupportedLocale,
	slug: string,
): Promise<Metadata | null> {
	"use cache";
	cacheLife("days");
	cacheTag("projects");
	cacheTag(`project:${slug}`);

	const record = await getResolvedCaseStudyRecord(slug);

	if (!record) {
		return null;
	}

	const title = record.caseStudy.seo.title[locale];
	const description = record.caseStudy.seo.description[locale];

	return buildIndexableMetadata({
		locale,
		pathEn: `/${record.slug}`,
		routeId: getProjectPublicRouteId(record.slug),
		slug: record.slug,
		title,
		description,
		keywords: record.caseStudy.seo.keywords[locale],
		openGraphType: "article",
	});
}

export async function getCaseStudyJsonLd(
	locale: SupportedLocale,
	slug: string,
): Promise<JsonLdObject[] | null> {
	"use cache";
	cacheLife("days");
	cacheTag("projects");
	cacheTag(`project:${slug}`);

	const record = await getResolvedCaseStudyRecord(slug);

	if (!record) {
		return null;
	}

	const path = getCaseStudyPath(locale, record.slug);
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
		record.schemaEntityType === "SoftwareApplication"
			? createSoftwareApplicationJsonLd({
					description,
					keywords: record.project.tags,
					locale,
					name: record.project.title,
					path,
				})
			: createCreativeWorkJsonLd({
					about: record.project.tags,
					locale,
					name: record.project.title,
					path,
				});

	const faqJsonLd = createFaqJsonLd({
		items: record.caseStudy.faq.map((item) => ({
			question: item.question[locale],
			answer: item.answer[locale],
		})),
	});

	return [webPageJsonLd, breadcrumbJsonLd, projectJsonLd, faqJsonLd];
}
