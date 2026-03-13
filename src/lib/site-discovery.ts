import type { MetadataRoute } from "next";
import { getComponentDocPath } from "~/components/ios/docs/component-doc-paths";
import { getAllComponentDocs } from "~/components/ios/docs/component-documents";
import {
	getCaseStudyPath,
	getProjectBySlug,
	PROJECT_SLUGS,
} from "~/data/projects";

export const SITE_URL = "https://sabraman.ru";
export const SITE_LOCALES = ["en", "ru"] as const;

export type SiteLocale = (typeof SITE_LOCALES)[number];
export type SitemapFrequency = NonNullable<
	MetadataRoute.Sitemap[number]["changeFrequency"]
>;

export type IndexableRoute = {
	path: string;
	changeFrequency: SitemapFrequency;
	priority: number;
};

const STATIC_INDEXABLE_ROUTES: IndexableRoute[] = [
	{
		path: "/",
		changeFrequency: "weekly",
		priority: 1,
	},
	{
		path: "/work",
		changeFrequency: "weekly",
		priority: 0.95,
	},
	{
		path: "/services",
		changeFrequency: "monthly",
		priority: 0.85,
	},
	{
		path: "/components",
		changeFrequency: "weekly",
		priority: 0.8,
	},
	{
		path: "/iphone",
		changeFrequency: "monthly",
		priority: 0.65,
	},
	{
		path: "/contact",
		changeFrequency: "monthly",
		priority: 0.7,
	},
];

export function withLocalePrefix(locale: SiteLocale, path: string) {
	if (locale !== "ru") {
		return path;
	}

	return path === "/" ? "/ru" : `/ru${path}`;
}

export function toSiteUrl(path: string) {
	return `${SITE_URL}${path}`;
}

export function getStaticIndexableRoutes() {
	return [...STATIC_INDEXABLE_ROUTES];
}

export function getCaseStudyIndexableRoutes(): IndexableRoute[] {
	return PROJECT_SLUGS.map((slug) => {
		const project = getProjectBySlug(slug);

		return {
			path: getCaseStudyPath("en", slug),
			changeFrequency: project?.isFeaturedWork ? "weekly" : "monthly",
			priority: project?.isFeaturedWork ? 0.9 : 0.75,
		};
	});
}

export function getComponentDocIndexableRoutes(): IndexableRoute[] {
	return getAllComponentDocs().map((doc) => ({
		path: getComponentDocPath(doc.slug, "en"),
		changeFrequency: "monthly",
		priority: 0.72,
	}));
}

export function getAllIndexableRoutes() {
	return [
		...getStaticIndexableRoutes(),
		...getCaseStudyIndexableRoutes(),
		...getComponentDocIndexableRoutes(),
	];
}
