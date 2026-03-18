import type { ProjectSlug } from "~/data/projects";

export type PublicRouteId =
	| "home"
	| "work"
	| "components"
	| "componentDoc"
	| "iphone"
	| "projectCaseStudy"
	| "vaparshop"
	| "hornyPlace"
	| "priceTagPrinter"
	| "componentOgPreview"
	| "componentDocOgPreview";

export type RouteIndexationPolicy = "index" | "noindex";

export type PublicRouteSocialImageKind =
	| "home"
	| "work"
	| "components"
	| "componentDoc"
	| "iphone"
	| "projectCaseStudy"
	| "vaparshop"
	| "hornyPlace"
	| "priceTagPrinter"
	| null;

export type PublicRouteJsonLdKind =
	| "site"
	| "collectionPage"
	| "webPage"
	| "techArticle"
	| "projectCaseStudy"
	| null;

export type PublicRoutePolicy = {
	id: PublicRouteId;
	includeInLlms: boolean;
	includeInSitemap: boolean;
	indexation: RouteIndexationPolicy;
	jsonLdKind: PublicRouteJsonLdKind;
	socialImageKind: PublicRouteSocialImageKind;
};

const INDEXABLE_POLICY = {
	includeInLlms: true,
	includeInSitemap: true,
	indexation: "index",
} as const;

const NOINDEX_POLICY = {
	includeInLlms: false,
	includeInSitemap: false,
	indexation: "noindex",
} as const;

export const PUBLIC_ROUTE_POLICIES: Record<PublicRouteId, PublicRoutePolicy> = {
	home: {
		id: "home",
		...INDEXABLE_POLICY,
		socialImageKind: "home",
		jsonLdKind: "site",
	},
	work: {
		id: "work",
		...INDEXABLE_POLICY,
		socialImageKind: "work",
		jsonLdKind: "collectionPage",
	},
	components: {
		id: "components",
		...INDEXABLE_POLICY,
		socialImageKind: "components",
		jsonLdKind: "collectionPage",
	},
	componentDoc: {
		id: "componentDoc",
		...INDEXABLE_POLICY,
		socialImageKind: "componentDoc",
		jsonLdKind: "techArticle",
	},
	iphone: {
		id: "iphone",
		...INDEXABLE_POLICY,
		socialImageKind: "iphone",
		jsonLdKind: "webPage",
	},
	projectCaseStudy: {
		id: "projectCaseStudy",
		...INDEXABLE_POLICY,
		socialImageKind: "projectCaseStudy",
		jsonLdKind: "projectCaseStudy",
	},
	vaparshop: {
		id: "vaparshop",
		...INDEXABLE_POLICY,
		socialImageKind: "vaparshop",
		jsonLdKind: "projectCaseStudy",
	},
	hornyPlace: {
		id: "hornyPlace",
		...INDEXABLE_POLICY,
		socialImageKind: "hornyPlace",
		jsonLdKind: "projectCaseStudy",
	},
	priceTagPrinter: {
		id: "priceTagPrinter",
		...INDEXABLE_POLICY,
		socialImageKind: "priceTagPrinter",
		jsonLdKind: "projectCaseStudy",
	},
	componentOgPreview: {
		id: "componentOgPreview",
		...NOINDEX_POLICY,
		socialImageKind: null,
		jsonLdKind: null,
	},
	componentDocOgPreview: {
		id: "componentDocOgPreview",
		...NOINDEX_POLICY,
		socialImageKind: null,
		jsonLdKind: null,
	},
};

export function getPublicRoutePolicy(id: PublicRouteId): PublicRoutePolicy {
	return PUBLIC_ROUTE_POLICIES[id];
}

export function getProjectPublicRouteId(
	slug: ProjectSlug,
): "projectCaseStudy" | "vaparshop" | "hornyPlace" | "priceTagPrinter" {
	switch (slug) {
		case "vaparshop":
			return "vaparshop";
		case "horny-place":
			return "hornyPlace";
		case "price-tag-printer":
			return "priceTagPrinter";
		default:
			return "projectCaseStudy";
	}
}
