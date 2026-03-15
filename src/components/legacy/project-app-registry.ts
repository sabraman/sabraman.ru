import {
	PROJECT_CATEGORY_ORDER,
	PROJECTS,
	type ProjectSlug,
} from "~/data/projects";

export type ProjectAppId = `project:${ProjectSlug}`;
export type ProjectAppTemplateKind = "featured_bespoke" | "case_shell";
export type ProjectIconMotif =
	| "bars"
	| "orbit"
	| "cards"
	| "grid"
	| "book"
	| "spark"
	| "wave";

export type ProjectAppIconMeta = {
	accentFrom: string;
	accentTo: string;
	glow: string;
	badge: string;
	symbol: string;
	motif: ProjectIconMotif;
};

export type ProjectAppRegistryEntry = {
	slug: ProjectSlug;
	appId: ProjectAppId;
	order: number;
	templateKind: ProjectAppTemplateKind;
	featuredVariant?: "vaparshop" | "horny-place";
	icon: ProjectAppIconMeta;
};

const PROJECT_ICON_META: Record<ProjectSlug, ProjectAppIconMeta> = {
	"arch-taplink": {
		accentFrom: "#c2a165",
		accentTo: "#7e4e18",
		glow: "#fff4d1",
		badge: "LINK",
		symbol: "AR",
		motif: "cards",
	},
	"esperansa-mini-app": {
		accentFrom: "#5ea6d8",
		accentTo: "#204f85",
		glow: "#d8f2ff",
		badge: "LAB",
		symbol: "E",
		motif: "spark",
	},
	"florist-quiz": {
		accentFrom: "#d98d9f",
		accentTo: "#8e3751",
		glow: "#ffe5ec",
		badge: "QUIZ",
		symbol: "FQ",
		motif: "spark",
	},
	"horny-place": {
		accentFrom: "#f29f7d",
		accentTo: "#991f25",
		glow: "#ffe4d8",
		badge: "BRAND",
		symbol: "HP",
		motif: "orbit",
	},
	"plonq-ai-search": {
		accentFrom: "#7ca6fb",
		accentTo: "#24458f",
		glow: "#dbe6ff",
		badge: "AI",
		symbol: "PL",
		motif: "wave",
	},
	"price-tag-printer": {
		accentFrom: "#8fbd86",
		accentTo: "#315d2c",
		glow: "#e6ffdc",
		badge: "PDF",
		symbol: "PT",
		motif: "book",
	},
	"psp-book-reader": {
		accentFrom: "#d7dde7",
		accentTo: "#49576b",
		glow: "#ffffff",
		badge: "C++",
		symbol: "PSP",
		motif: "book",
	},
	"schrute-farm": {
		accentFrom: "#c46d86",
		accentTo: "#5b2333",
		glow: "#ffe6f0",
		badge: "GAME",
		symbol: "SF",
		motif: "grid",
	},
	smbro: {
		accentFrom: "#63b17e",
		accentTo: "#18503d",
		glow: "#dbffe8",
		badge: "WEB",
		symbol: "SB",
		motif: "bars",
	},
	"smo-tg-miniapp": {
		accentFrom: "#62c3e0",
		accentTo: "#25508e",
		glow: "#dff8ff",
		badge: "TG",
		symbol: "SMO",
		motif: "cards",
	},
	"smoky-market-loyalty-miniapp": {
		accentFrom: "#f4cb7a",
		accentTo: "#8d4723",
		glow: "#fff2d1",
		badge: "POS",
		symbol: "SM",
		motif: "grid",
	},
	vaparshop: {
		accentFrom: "#7cb0ff",
		accentTo: "#1f3d86",
		glow: "#e3eeff",
		badge: "OPS",
		symbol: "V",
		motif: "bars",
	},
	"vape-me-fast": {
		accentFrom: "#cfe162",
		accentTo: "#5d6f10",
		glow: "#f7ffd4",
		badge: "LP",
		symbol: "VF",
		motif: "wave",
	},
};

export function toProjectAppId(slug: ProjectSlug): ProjectAppId {
	return `project:${slug}`;
}

const orderedProjects = [
	...PROJECTS.filter((project) => project.isFeaturedWork),
	...PROJECT_CATEGORY_ORDER.flatMap((category) =>
		PROJECTS.filter(
			(project) => !project.isFeaturedWork && project.category === category,
		),
	),
];

export const ORDERED_PROJECT_APP_ENTRIES: ProjectAppRegistryEntry[] =
	orderedProjects.map((project, index) => ({
		slug: project.slug,
		appId: toProjectAppId(project.slug),
		order: index,
		templateKind: project.isFeaturedWork ? "featured_bespoke" : "case_shell",
		featuredVariant:
			project.slug === "vaparshop" || project.slug === "horny-place"
				? project.slug
				: undefined,
		icon: PROJECT_ICON_META[project.slug],
	}));

export const PROJECT_APP_REGISTRY: Record<
	ProjectSlug,
	ProjectAppRegistryEntry
> = Object.fromEntries(
	ORDERED_PROJECT_APP_ENTRIES.map((entry) => [entry.slug, entry]),
) as Record<ProjectSlug, ProjectAppRegistryEntry>;

export function isProjectAppId(appId: string): appId is ProjectAppId {
	if (!appId.startsWith("project:")) {
		return false;
	}

	const slug = appId.slice("project:".length) as ProjectSlug;
	return Object.hasOwn(PROJECT_APP_REGISTRY, slug);
}

export function getProjectSlugFromAppId(appId: ProjectAppId): ProjectSlug {
	return appId.slice("project:".length) as ProjectSlug;
}
