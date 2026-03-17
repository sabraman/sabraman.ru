import type { MetadataRoute } from "next";
import { getComponentDocPath } from "~/components/legacy/docs/component-doc-paths";
import { getAllComponentDocs } from "~/components/legacy/docs/component-documents";
import { getCaseStudyPath, PROJECTS } from "~/data/projects";
import type { SupportedLocale } from "~/i18n/types";
import {
	getProjectPublicRouteId,
	getPublicRoutePolicy,
	type PublicRouteId,
} from "~/lib/seo/public-route-policy";

export const SITE_URL = "https://sabraman.ru";
export const SITE_LOCALES = [
	"en",
	"ru",
] as const satisfies readonly SupportedLocale[];

export type SiteLocale = (typeof SITE_LOCALES)[number];
export type SitemapFrequency = NonNullable<
	MetadataRoute.Sitemap[number]["changeFrequency"]
>;

export type IndexableRoute = {
	path: string;
	changeFrequency: SitemapFrequency;
	priority: number;
};

type StaticDiscoverableRoute = IndexableRoute & {
	id: PublicRouteId;
};

const STATIC_DISCOVERABLE_ROUTES: StaticDiscoverableRoute[] = [
	{
		id: "home",
		path: "/",
		changeFrequency: "weekly",
		priority: 1,
	},
	{
		id: "work",
		path: "/work",
		changeFrequency: "weekly",
		priority: 0.95,
	},
	{
		id: "services",
		path: "/services",
		changeFrequency: "monthly",
		priority: 0.85,
	},
	{
		id: "components",
		path: "/components",
		changeFrequency: "weekly",
		priority: 0.8,
	},
	{
		id: "iphone",
		path: "/iphone",
		changeFrequency: "monthly",
		priority: 0.65,
	},
	{
		id: "contact",
		path: "/contact",
		changeFrequency: "monthly",
		priority: 0.7,
	},
];

export function toSiteUrl(path: string) {
	return `${SITE_URL}${path}`;
}

export function getStaticIndexableRoutes() {
	return STATIC_DISCOVERABLE_ROUTES.filter(
		(route) => getPublicRoutePolicy(route.id).includeInSitemap,
	).map(({ id: _id, ...route }) => route);
}

export function getCaseStudyIndexableRoutes(): IndexableRoute[] {
	return PROJECTS.filter(
		(project) =>
			getPublicRoutePolicy(getProjectPublicRouteId(project.slug))
				.includeInSitemap,
	).map((project) => ({
		path: getCaseStudyPath("en", project.slug),
		changeFrequency: project.isFeaturedWork ? "weekly" : "monthly",
		priority: project.isFeaturedWork ? 0.9 : 0.75,
	}));
}

export function getComponentDocIndexableRoutes(): IndexableRoute[] {
	if (!getPublicRoutePolicy("componentDoc").includeInSitemap) {
		return [];
	}

	return getAllComponentDocs().map((doc) => ({
		path: getComponentDocPath(doc.slug, "en"),
		changeFrequency: "monthly",
		priority: 0.72,
	}));
}

export function getLlmsPreferredRoutes() {
	return STATIC_DISCOVERABLE_ROUTES.filter(
		(route) => getPublicRoutePolicy(route.id).includeInLlms,
	).map((route) => route.path);
}

export function getAllIndexableRoutes() {
	return [
		...getStaticIndexableRoutes(),
		...getCaseStudyIndexableRoutes(),
		...getComponentDocIndexableRoutes(),
	];
}
