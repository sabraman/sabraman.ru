import type { MetadataRoute } from "next";
import type { SupportedLocale } from "~/i18n/types";
import {
	getAllIndexableContentEntries,
	getCaseStudyIndexableContentEntries,
	getComponentDocIndexableContentEntries,
	getLlmsPreferredContentEntries,
	getStaticIndexableContentEntries,
} from "~/lib/seo/content-registry";
import { SUPPORTED_LOCALES, toAbsoluteSiteUrl } from "~/lib/site-config";

export { SITE_URL } from "~/lib/site-config";
export const SITE_LOCALES = SUPPORTED_LOCALES as readonly SupportedLocale[];

export type SiteLocale = (typeof SITE_LOCALES)[number];
export type SitemapFrequency = NonNullable<
	MetadataRoute.Sitemap[number]["changeFrequency"]
>;

export type IndexableRoute = {
	path: string;
	changeFrequency: SitemapFrequency;
	lastModified?: string;
	priority: number;
};

export function toSiteUrl(path: string) {
	return toAbsoluteSiteUrl(path);
}

function mapEntryToRoute(
	entry: ReturnType<typeof getAllIndexableContentEntries>[number],
): IndexableRoute {
	return {
		changeFrequency: entry.changeFrequency,
		...(entry.updatedAt ? { lastModified: entry.updatedAt } : {}),
		path: entry.pathEn,
		priority: entry.priority,
	};
}

export function getStaticIndexableRoutes() {
	return getStaticIndexableContentEntries()
		.filter((entry) => entry.includeInSitemap)
		.map(mapEntryToRoute);
}

export function getCaseStudyIndexableRoutes(): IndexableRoute[] {
	return getCaseStudyIndexableContentEntries()
		.filter((entry) => entry.includeInSitemap)
		.map(mapEntryToRoute);
}

export function getComponentDocIndexableRoutes(): IndexableRoute[] {
	return getComponentDocIndexableContentEntries()
		.filter((entry) => entry.includeInSitemap)
		.map(mapEntryToRoute);
}

export function getLlmsPreferredRoutes() {
	return getLlmsPreferredContentEntries().map((entry) => entry.pathEn);
}

export function getAllIndexableRoutes() {
	return getAllIndexableContentEntries()
		.filter((entry) => entry.includeInSitemap)
		.map(mapEntryToRoute);
}
