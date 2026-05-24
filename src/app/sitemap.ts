import type { MetadataRoute } from "next";
import { getLocalizedPathname } from "~/i18n/locale-paths";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "~/lib/site-config";
import { getAllIndexableRoutes, toSiteUrl } from "~/lib/site-discovery";

function getAlternates(path: string) {
	const languages = Object.fromEntries(
		SUPPORTED_LOCALES.map((locale) => [
			locale,
			toSiteUrl(getLocalizedPathname(locale, path)),
		]),
	);

	return {
		languages: {
			...languages,
			"x-default": toSiteUrl(getLocalizedPathname(DEFAULT_LOCALE, path)),
		},
	};
}

export default function sitemap(): MetadataRoute.Sitemap {
	return getAllIndexableRoutes().flatMap((route) => {
		const alternates = getAlternates(route.path);

		return SUPPORTED_LOCALES.map((locale) => ({
			url: toSiteUrl(getLocalizedPathname(locale, route.path)),
			changeFrequency: route.changeFrequency,
			priority: route.priority,
			alternates,
			...(route.lastModified ? { lastModified: route.lastModified } : {}),
		}));
	});
}
