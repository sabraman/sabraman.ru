import type { MetadataRoute } from "next";
import { getLocalizedPathname } from "~/i18n/locale-paths";
import { SUPPORTED_LOCALES } from "~/lib/site-config";
import { getAllIndexableRoutes, toSiteUrl } from "~/lib/site-discovery";

function getAlternates(path: string) {
	return {
		languages: {
			en: toSiteUrl(getLocalizedPathname("en", path)),
			ru: toSiteUrl(getLocalizedPathname("ru", path)),
			"x-default": toSiteUrl(getLocalizedPathname("en", path)),
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
