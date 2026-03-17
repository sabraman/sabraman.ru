import type { SupportedLocale } from "~/i18n/types";

export type JsonLdObject = Record<string, unknown>;

const SITE_URL = "https://sabraman.ru";

export function toAbsoluteUrl(path: string) {
	return new URL(path, SITE_URL).toString();
}

export function createPersonJsonLd(): JsonLdObject {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Danya Yudin",
		alternateName: ["Даня Юдин", "Sabraman"],
		url: SITE_URL,
		image: `${SITE_URL}/logo.svg`,
		sameAs: [
			"https://t.me/sabraman",
			"https://github.com/sabraman",
			"https://instagram.com/sabraman",
			"https://x.com/1sabraman",
			"https://vk.com/sabraman",
		],
		jobTitle: "Creative Designer & Frontend Developer",
		address: {
			"@type": "PostalAddress",
			addressLocality: "Saint Petersburg",
			addressCountry: "RU",
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
		name: "Sabraman - Danya Yudin Portfolio",
		url: SITE_URL,
		description:
			"Portfolio website of Danya Yudin (Даня Юдин), a creative designer and frontend developer",
		author: {
			"@type": "Person",
			name: "Danya Yudin",
		},
		potentialAction: {
			"@type": "SearchAction",
			target: `${SITE_URL}/search?q={search_term_string}`,
			"query-input": "required name=search_term_string",
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
			item: toAbsoluteUrl(item.path),
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
		url: toAbsoluteUrl(path),
		inLanguage: locale,
		mainEntity: {
			"@type": "ItemList",
			itemListElement: items.map((item, index) => ({
				"@type": "ListItem",
				position: index + 1,
				url: toAbsoluteUrl(item.path),
				name: item.name,
			})),
		},
	};
}

export function createCreativeWorkJsonLd({
	about,
	locale,
	name,
	path,
}: {
	about?: string[];
	locale: SupportedLocale;
	name: string;
	path: string;
}): JsonLdObject {
	return {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name,
		url: toAbsoluteUrl(path),
		inLanguage: locale,
		author: {
			"@type": "Person",
			name: "Danya Yudin",
			url: SITE_URL,
		},
		...(about?.length ? { about } : {}),
		publisher: {
			"@type": "Person",
			name: "Danya Yudin",
		},
	};
}

export function createSoftwareApplicationJsonLd({
	description,
	keywords,
	locale,
	name,
	path,
}: {
	description: string;
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
		url: toAbsoluteUrl(path),
		applicationCategory: "BusinessApplication",
		operatingSystem: "Web",
		inLanguage: locale,
		...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
		author: {
			"@type": "Person",
			name: "Danya Yudin",
			url: SITE_URL,
		},
		publisher: {
			"@type": "Person",
			name: "Danya Yudin",
		},
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
		url: toAbsoluteUrl(path),
		inLanguage: locale,
		description,
		areaServed: "Worldwide",
		availableLanguage: ["en", "ru"],
		provider: {
			"@type": "Person",
			name: "Danya Yudin",
			alternateName: "Sabraman",
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
		url: toAbsoluteUrl(path),
		inLanguage: locale,
	};
}

export function createTechArticleJsonLd({
	description,
	keywords,
	locale,
	path,
	title,
}: {
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
		url: toAbsoluteUrl(path),
		inLanguage: locale,
		author: {
			"@type": "Person",
			name: "Danya Yudin",
			url: SITE_URL,
		},
		publisher: {
			"@type": "Person",
			name: "Danya Yudin",
		},
		...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
	};
}
