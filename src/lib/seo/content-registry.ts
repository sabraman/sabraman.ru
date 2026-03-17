import type { MetadataRoute } from "next";
import type { ComponentDocSlug } from "~/components/legacy/docs/component-doc-paths";
import type { LocaleText, ProjectSlug } from "~/data/projects";
import { getAllCaseStudyDiscoverabilityRecords } from "~/lib/projects/case-study-seo";
import { SUPPORTED_LOCALES } from "~/lib/site-config";
import { getAllComponentDocDiscoverabilityRecords } from "./component-doc-seo";
import {
	getPublicRoutePolicy,
	type PublicRouteId,
	type PublicRouteSocialImageKind,
} from "./public-route-policy";

type SitemapFrequency = NonNullable<
	MetadataRoute.Sitemap[number]["changeFrequency"]
>;

type ContentKind = "caseStudy" | "componentDoc" | "staticPage";

type LocalizedContent = {
	description: LocaleText;
	title: LocaleText;
};

export type IndexableContentEntry = LocalizedContent & {
	changeFrequency: SitemapFrequency;
	includeInLlms: boolean;
	includeInSitemap: boolean;
	kind: ContentKind;
	localeStrategy: "localized";
	pathEn: string;
	priority: number;
	publishedAt?: string;
	routeId: PublicRouteId;
	slug?: ComponentDocSlug | ProjectSlug;
	socialImageKind: PublicRouteSocialImageKind;
	updatedAt?: string;
};

type StaticIndexableConfig = LocalizedContent & {
	changeFrequency: SitemapFrequency;
	pathEn: string;
	priority: number;
	routeId: Extract<
		PublicRouteId,
		"components" | "contact" | "home" | "iphone" | "services" | "work"
	>;
};

const STATIC_INDEXABLE_CONTENT: StaticIndexableConfig[] = [
	{
		changeFrequency: "weekly",
		description: {
			en: "Portfolio of Danya Yudin (Sabraman): case studies, services, reusable UI components, and experimental frontend work.",
			ru: "Портфолио Дани Юдина (Sabraman): кейсы, услуги, переиспользуемые UI-компоненты и экспериментальный фронтенд.",
		},
		pathEn: "/",
		priority: 1,
		routeId: "home",
		title: {
			en: "Danya Yudin (Sabraman) Portfolio",
			ru: "Портфолио Дани Юдина (Sabraman)",
		},
	},
	{
		changeFrequency: "weekly",
		description: {
			en: "Case studies spanning Telegram mini apps, web platforms, retail tooling, product design, and frontend engineering.",
			ru: "Кейсы по Telegram mini apps, веб-платформам, retail tooling, продуктовой разработке и фронтенду.",
		},
		pathEn: "/work",
		priority: 0.95,
		routeId: "work",
		title: {
			en: "Case Studies and Product Work - Sabraman",
			ru: "Кейсы и продуктовая работа - Sabraman",
		},
	},
	{
		changeFrequency: "monthly",
		description: {
			en: "Design, web product development, and Telegram automation services by Danya Yudin (Sabraman).",
			ru: "Услуги по дизайну, веб-разработке и Telegram-автоматизации от Дани Юдина (Sabraman).",
		},
		pathEn: "/services",
		priority: 0.85,
		routeId: "services",
		title: {
			en: "Design and Product Services - Sabraman",
			ru: "Услуги дизайна и разработки - Sabraman",
		},
	},
	{
		changeFrequency: "weekly",
		description: {
			en: "Reusable legacy and skeuomorphic React components with docs, install commands, and previews for Next.js and shadcn/ui projects.",
			ru: "Переиспользуемые legacy и skeuomorphic React-компоненты с документацией, install-командами и превью для проектов на Next.js и shadcn/ui.",
		},
		pathEn: "/components",
		priority: 0.8,
		routeId: "components",
		title: {
			en: "Legacy React Components for Next.js - Sabraman",
			ru: "Legacy React-компоненты для Next.js - Sabraman",
		},
	},
	{
		changeFrequency: "monthly",
		description: {
			en: "An alternate iPhone-style portfolio experience that explores Sabraman through a playful UI shell.",
			ru: "Альтернативное iPhone-стилизованное портфолио с игровой UI-оболочкой Sabraman.",
		},
		pathEn: "/iphone",
		priority: 0.65,
		routeId: "iphone",
		title: {
			en: "iPhone Portfolio Experience - Sabraman",
			ru: "iPhone-портфолио Sabraman",
		},
	},
	{
		changeFrequency: "monthly",
		description: {
			en: "Contact Danya Yudin (Sabraman) about design, branding, and product development projects.",
			ru: "Свяжитесь с Даней Юдиным (Sabraman) по вопросам дизайна, брендинга и продуктовой разработки.",
		},
		pathEn: "/contact",
		priority: 0.7,
		routeId: "contact",
		title: {
			en: "Contact Danya Yudin - Sabraman",
			ru: "Контакты Дани Юдина - Sabraman",
		},
	},
];

function duplicateLocaleText(value: string): LocaleText {
	return {
		en: value,
		ru: value,
	};
}

function toIndexableEntry(
	kind: ContentKind,
	entry: Omit<
		IndexableContentEntry,
		| "includeInLlms"
		| "includeInSitemap"
		| "kind"
		| "localeStrategy"
		| "socialImageKind"
	>,
): IndexableContentEntry {
	const policy = getPublicRoutePolicy(entry.routeId);

	return {
		...entry,
		includeInLlms: policy.includeInLlms,
		includeInSitemap: policy.includeInSitemap,
		kind,
		localeStrategy: "localized",
		socialImageKind: policy.socialImageKind,
	};
}

export function getStaticIndexableContentEntries() {
	return STATIC_INDEXABLE_CONTENT.map((entry) =>
		toIndexableEntry("staticPage", entry),
	);
}

export function getStaticIndexableContentEntry(
	id: StaticIndexableConfig["routeId"],
) {
	return (
		getStaticIndexableContentEntries().find((entry) => entry.routeId === id) ??
		null
	);
}

export function getCaseStudyIndexableContentEntries() {
	return getAllCaseStudyDiscoverabilityRecords().map((entry) =>
		toIndexableEntry("caseStudy", {
			changeFrequency: entry.changeFrequency,
			description: entry.description,
			pathEn: entry.pathEn,
			priority: entry.priority,
			...(entry.publishedAt ? { publishedAt: entry.publishedAt } : {}),
			routeId: entry.routeId,
			slug: entry.projectSlug,
			title: entry.title,
			updatedAt: entry.updatedAt,
		}),
	);
}

export function getComponentDocIndexableContentEntries() {
	return getAllComponentDocDiscoverabilityRecords().map((entry) =>
		toIndexableEntry("componentDoc", {
			changeFrequency: entry.changeFrequency,
			description: duplicateLocaleText(entry.description),
			pathEn: entry.pathEn,
			priority: entry.priority,
			...(entry.publishedAt ? { publishedAt: entry.publishedAt } : {}),
			routeId: "componentDoc",
			slug: entry.slug,
			title: duplicateLocaleText(entry.title),
			updatedAt: entry.updatedAt,
		}),
	);
}

export function getAllIndexableContentEntries() {
	return [
		...getStaticIndexableContentEntries(),
		...getCaseStudyIndexableContentEntries(),
		...getComponentDocIndexableContentEntries(),
	];
}

export function getLlmsPreferredContentEntries() {
	return getAllIndexableContentEntries().filter((entry) => entry.includeInLlms);
}

export const CONTENT_REGISTRY_LOCALES = SUPPORTED_LOCALES;
export type ContentRegistryLocale = (typeof CONTENT_REGISTRY_LOCALES)[number];
