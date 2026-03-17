import type { Metadata } from "next";
import type { ComponentDocSlug } from "~/components/legacy/docs/component-doc-paths";
import type { ProjectSlug } from "~/data/projects";
import { getLocalizedPathname } from "~/i18n/locale-paths";
import type { SupportedLocale } from "~/i18n/types";
import {
	getPublicRoutePolicy,
	type PublicRouteId,
	type PublicRouteSocialImageKind,
} from "./public-route-policy";

const SITE_NAME = "Sabraman - Danya Yudin Portfolio";

type SocialImageSlug = ComponentDocSlug | ProjectSlug;

type MetadataOptions = {
	description: string;
	keywords?: Metadata["keywords"];
	locale: SupportedLocale;
	openGraphType?: "article" | "website";
	pathEn: string;
	routeId: PublicRouteId;
	slug?: SocialImageSlug;
	title: string;
};

function getOpenGraphLocale(locale: SupportedLocale) {
	return locale === "ru" ? "ru_RU" : "en_US";
}

export function buildLocalizedAlternates(
	pathEn: string,
	locale: SupportedLocale = "en",
): Metadata["alternates"] {
	return {
		canonical: getLocalizedPathname(locale, pathEn),
		languages: {
			en: pathEn,
			ru: getLocalizedPathname("ru", pathEn),
			"x-default": pathEn,
		},
	};
}

export function getLocalizedAbsoluteUrl(
	locale: SupportedLocale,
	pathEn: string,
) {
	return `https://sabraman.ru${getLocalizedPathname(locale, pathEn)}`;
}

export function getLocalizedSocialImagePath(
	locale: SupportedLocale,
	kind: PublicRouteSocialImageKind,
	slug?: SocialImageSlug,
) {
	let basePath: string | null = null;

	switch (kind) {
		case "home":
			basePath = "/opengraph-image";
			break;
		case "work":
			basePath = "/work/opengraph-image";
			break;
		case "services":
			basePath = "/services/opengraph-image";
			break;
		case "contact":
			basePath = "/contact/opengraph-image";
			break;
		case "components":
			basePath = "/components/opengraph-image";
			break;
		case "componentDoc":
			basePath = slug ? `/components/${slug}/opengraph-image` : null;
			break;
		case "iphone":
			basePath = "/iphone/opengraph-image";
			break;
		case "projectCaseStudy":
			basePath = slug ? `/${slug}/opengraph-image` : null;
			break;
		case "vaparshop":
			basePath = "/vaparshop/opengraph-image";
			break;
		case "hornyPlace":
			basePath = "/horny-place/opengraph-image";
			break;
		case "priceTagPrinter":
			basePath = "/price-tag-printer/opengraph-image";
			break;
		default:
			basePath = null;
	}

	return basePath ? getLocalizedPathname(locale, basePath) : undefined;
}

export function buildIndexableMetadata({
	description,
	keywords,
	locale,
	openGraphType = "website",
	pathEn,
	routeId,
	slug,
	title,
}: MetadataOptions): Metadata {
	const socialImagePath = getLocalizedSocialImagePath(
		locale,
		getPublicRoutePolicy(routeId).socialImageKind,
		slug,
	);

	return {
		title,
		description,
		...(keywords ? { keywords } : {}),
		alternates: buildLocalizedAlternates(pathEn, locale),
		openGraph: {
			title,
			description,
			url: getLocalizedAbsoluteUrl(locale, pathEn),
			siteName: SITE_NAME,
			locale: getOpenGraphLocale(locale),
			type: openGraphType,
			...(socialImagePath ? { images: [socialImagePath] } : {}),
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			...(socialImagePath ? { images: [socialImagePath] } : {}),
		},
		robots: {
			index: true,
			follow: true,
		},
	};
}

export function buildNoIndexMetadata({
	description,
	locale,
	pathEn,
	title,
}: {
	description?: string;
	locale: SupportedLocale;
	pathEn: string;
	title?: string;
}): Metadata {
	return {
		...(title ? { title } : {}),
		...(description ? { description } : {}),
		alternates: buildLocalizedAlternates(pathEn, locale),
		robots: {
			index: false,
			follow: true,
		},
	};
}
