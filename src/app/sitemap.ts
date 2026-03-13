import type { MetadataRoute } from "next";
import {
	getAllIndexableRoutes,
	SITE_LOCALES,
	toSiteUrl,
	withLocalePrefix,
} from "~/lib/site-discovery";

function getAlternates(path: string) {
	return {
		languages: {
			en: toSiteUrl(withLocalePrefix("en", path)),
			ru: toSiteUrl(withLocalePrefix("ru", path)),
			"x-default": toSiteUrl(withLocalePrefix("en", path)),
		},
	};
}

export default function sitemap(): MetadataRoute.Sitemap {
	return getAllIndexableRoutes().flatMap((route) => {
		const alternates = getAlternates(route.path);

		return SITE_LOCALES.map((locale) => ({
			url: toSiteUrl(withLocalePrefix(locale, route.path)),
			changeFrequency: route.changeFrequency,
			priority: route.priority,
			alternates,
		}));
	});
}
