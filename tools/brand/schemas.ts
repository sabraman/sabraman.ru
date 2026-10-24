import { z } from "zod";

export const SurfaceSchema = z.enum([
	"threads_post",
	"ig_caption",
	"reels_script",
	"carousel",
]);

export const ProductLineSchema = z.enum(["retail", "logistics", "dev"]);

export const RecipientSchema = z.enum(["owner", "manager", "peer"]);

export const ObjectiveSchema = z.enum(["authority", "lead", "hire"]);

export const RouteSchema = z.object({
	productLine: ProductLineSchema,
	recipient: RecipientSchema,
	objective: ObjectiveSchema,
});

export type Surface = z.infer<typeof SurfaceSchema>;
export type ProductLine = z.infer<typeof ProductLineSchema>;
export type Recipient = z.infer<typeof RecipientSchema>;
export type Objective = z.infer<typeof ObjectiveSchema>;
export type Route = z.infer<typeof RouteSchema>;

export const EvidenceClaimSchema = z.object({
	id: z.string().min(1),
	claim: z.string().min(1),
	source: z.string().min(1),
	visibility: z.enum(["public", "internal"]).default("public"),
	numbers: z.array(z.string()).default([]),
});

export const EvidenceRegistrySchema = z.object({
	schemaVersion: z.literal(1),
	updated: z.string(),
	claims: z.array(EvidenceClaimSchema),
});

export type EvidenceClaim = z.infer<typeof EvidenceClaimSchema>;
export type EvidenceRegistry = z.infer<typeof EvidenceRegistrySchema>;

export const ArtifactSchema = z.object({
	schemaVersion: z.literal(1),
	surface: SurfaceSchema,
	route: RouteSchema,
	hook: z.string().min(1),
	body: z.string().min(1),
	cta: z.string().default(""),
	slides: z.array(z.string()).default([]),
	evidenceIds: z.array(z.string()).min(1),
	assumptions: z.array(z.string()).default([]),
	numbers: z.array(z.string()).default([]),
	notes: z.string().default(""),
});

export type Artifact = z.infer<typeof ArtifactSchema>;

export interface ValidationIssue {
	code: string;
	message: string;
}

export interface ValidationResult {
	ok: boolean;
	errors: ValidationIssue[];
	warnings: ValidationIssue[];
	stats: {
		chars: number;
		words: number;
		emDashes: number;
		emoji: number;
	};
}

export const SURFACE_LIMITS = {
	threads_post: { maxChars: 500, minWords: 15 },
	ig_caption: { maxChars: 2200, minWords: 25 },
	reels_script: { maxChars: 1400, minWords: 40 },
	carousel: { maxChars: 4000, minWords: 60 },
} as const;

export const PRESETS: Record<
	string,
	{ surface: Surface; route: Route; topicHint: string }
> = {
	"retail-owner": {
		surface: "threads_post",
		route: {
			productLine: "retail",
			recipient: "owner",
			objective: "authority",
		},
		topicHint: "наблюдение из розницы",
	},
	"retail-lead": {
		surface: "threads_post",
		route: { productLine: "retail", recipient: "owner", objective: "lead" },
		topicHint: "как забрать ручную работу у менеджера",
	},
	"logistics-owner": {
		surface: "threads_post",
		route: {
			productLine: "logistics",
			recipient: "owner",
			objective: "authority",
		},
		topicHint: "три отчёта, которые собирают руками",
	},
	"ig-carousel": {
		surface: "carousel",
		route: {
			productLine: "retail",
			recipient: "owner",
			objective: "authority",
		},
		topicHint: "признаки ручного учёта",
	},
	"reels-demo": {
		surface: "reels_script",
		route: { productLine: "dev", recipient: "peer", objective: "authority" },
		topicHint: "демонстрация инструмента за 20 секунд",
	},
};
