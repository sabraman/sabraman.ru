import type { SupportedLocale } from "~/i18n/types";
import {
	SITE_LOCATION,
	SITE_NAME,
	SITE_OWNER_ALIASES,
	SITE_OWNER_NAME,
	SITE_OWNER_ROLE,
	SITE_SOCIAL_LINKS,
	SITE_TITLE,
	SITE_URL,
	toAbsoluteSiteUrl,
} from "~/lib/site-config";

export type JsonLdObject = Record<string, unknown>;

export function createPersonJsonLd(): JsonLdObject {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: SITE_OWNER_NAME,
		alternateName: [...SITE_OWNER_ALIASES],
		url: SITE_URL,
		image: `${SITE_URL}/logo.svg`,
		sameAs: Object.values(SITE_SOCIAL_LINKS),
		jobTitle: SITE_OWNER_ROLE,
		address: {
			"@type": "PostalAddress",
			addressLocality: SITE_LOCATION.locality,
			addressCountry: SITE_LOCATION.country,
		},
		knowsAbout: [
			"Visual Design",
			"Branding",
			"Application Development",
			"Telegram Bots",
			"UI/UX Design",
			"Next.js",
			"React",
		],
	};
}

export function createWebsiteJsonLd(): JsonLdObject {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: SITE_TITLE,
		url: SITE_URL,
		description:
			"Portfolio website of Danya Yudin (Даня Юдин), a creative designer and frontend developer",
		author: {
			"@type": "Person",
			name: SITE_OWNER_NAME,
		},
	};
}

export function createBreadcrumbJsonLd({
	items,
}: {
	items: Array<{ name: string; path: string }>;
}): JsonLdObject {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: toAbsoluteSiteUrl(item.path),
		})),
	};
}

export function createCollectionPageJsonLd({
	items,
	locale,
	name,
	path,
}: {
	items: Array<{ name: string; path: string }>;
	locale: SupportedLocale;
	name: string;
	path: string;
}): JsonLdObject {
	return {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name,
		url: toAbsoluteSiteUrl(path),
		inLanguage: locale,
		mainEntity: {
			"@type": "ItemList",
			itemListElement: items.map((item, index) => ({
				"@type": "ListItem",
				position: index + 1,
				url: toAbsoluteSiteUrl(item.path),
				name: item.name,
			})),
		},
	};
}

export function createCreativeWorkJsonLd({
	about,
	dateModified,
	datePublished,
	locale,
	name,
	path,
}: {
	about?: string[];
	dateModified?: string;
	datePublished?: string;
	locale: SupportedLocale;
	name: string;
	path: string;
}): JsonLdObject {
	return {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name,
		url: toAbsoluteSiteUrl(path),
		inLanguage: locale,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": toAbsoluteSiteUrl(path),
		},
		author: {
			"@type": "Person",
			name: SITE_OWNER_NAME,
			url: SITE_URL,
		},
		...(about?.length ? { about } : {}),
		publisher: {
			"@type": "Person",
			name: SITE_OWNER_NAME,
		},
		...(dateModified ? { dateModified } : {}),
		...(datePublished ? { datePublished } : {}),
	};
}

export function createSoftwareApplicationJsonLd({
	description,
	dateModified,
	datePublished,
	keywords,
	locale,
	name,
	path,
}: {
	description: string;
	dateModified?: string;
	datePublished?: string;
	keywords?: string[];
	locale: SupportedLocale;
	name: string;
	path: string;
}): JsonLdObject {
	return {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name,
		description,
		url: toAbsoluteSiteUrl(path),
		applicationCategory: "BusinessApplication",
		operatingSystem: "Web",
		inLanguage: locale,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": toAbsoluteSiteUrl(path),
		},
		...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
		author: {
			"@type": "Person",
			name: SITE_OWNER_NAME,
			url: SITE_URL,
		},
		publisher: {
			"@type": "Person",
			name: SITE_OWNER_NAME,
		},
		...(dateModified ? { dateModified } : {}),
		...(datePublished ? { datePublished } : {}),
	};
}

export function createFaqJsonLd({
	items,
}: {
	items: Array<{ answer: string; question: string }>;
}): JsonLdObject {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	};
}

export function createProfessionalServiceJsonLd({
	description,
	locale,
	name,
	path,
	services,
}: {
	description: string;
	locale: SupportedLocale;
	name: string;
	path: string;
	services: Array<{ description: string; title: string }>;
}): JsonLdObject {
	return {
		"@context": "https://schema.org",
		"@type": "ProfessionalService",
		name,
		url: toAbsoluteSiteUrl(path),
		inLanguage: locale,
		description,
		areaServed: "Worldwide",
		availableLanguage: ["en", "ru"],
		provider: {
			"@type": "Person",
			name: SITE_OWNER_NAME,
			alternateName: SITE_NAME,
			url: SITE_URL,
		},
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: locale === "ru" ? "Услуги Sabraman" : "Sabraman Services",
			itemListElement: services.map((service) => ({
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: service.title,
					description: service.description,
				},
			})),
		},
	};
}

export function createWebPageJsonLd({
	description,
	locale,
	name,
	path,
}: {
	description: string;
	locale: SupportedLocale;
	name: string;
	path: string;
}): JsonLdObject {
	return {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name,
		description,
		url: toAbsoluteSiteUrl(path),
		inLanguage: locale,
	};
}

export function createTechArticleJsonLd({
	dateModified,
	datePublished,
	description,
	keywords,
	locale,
	path,
	title,
}: {
	dateModified?: string;
	datePublished?: string;
	description: string;
	keywords?: string[];
	locale: SupportedLocale;
	path: string;
	title: string;
}): JsonLdObject {
	return {
		"@context": "https://schema.org",
		"@type": "TechArticle",
		headline: title,
		name: title,
		description,
		url: toAbsoluteSiteUrl(path),
		inLanguage: locale,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": toAbsoluteSiteUrl(path),
		},
		author: {
			"@type": "Person",
			name: SITE_OWNER_NAME,
			url: SITE_URL,
		},
		publisher: {
			"@type": "Person",
			name: SITE_OWNER_NAME,
		},
		...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
		...(dateModified ? { dateModified } : {}),
		...(datePublished ? { datePublished } : {}),
	};
}
