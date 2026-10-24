import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { RoutePlan } from "./router";
import { SURFACE_LIMITS, type EvidenceRegistry, type Surface } from "./schemas";

const SURFACE_BRIEF: Record<Surface, string> = {
	threads_post:
		"Пост для Threads. До 500 символов. Первая строка — хук, который цепляет за секунду. Один абзац — одна мысль. Без списков и без заголовков.",
	ig_caption:
		"Подпись к посту в Instagram. До 2200 символов, но лучше короче. Первые 125 символов видны до «ещё». Абзацы по 1–2 строки.",
	reels_script:
		"Сценарий вертикального видео на 20–40 секунд. Формат: таймкод, что в кадре, что говорит голос. Только экран, без лица.",
	carousel:
		"Карточки для карусели Instagram, 5–9 слайдов. Первый слайд — хук, последний — вывод. На слайде не больше 12 слов.",
};

export function loadProfile(repoRoot: string): string {
	return readFileSync(join(repoRoot, "tools", "brand", "profile.md"), "utf8");
}

export function loadEvidence(repoRoot: string): EvidenceRegistry {
	const raw = JSON.parse(
		readFileSync(join(repoRoot, "tools", "brand", "evidence.json"), "utf8"),
	) as {
		schemaVersion: 1;
		updated: string;
		claims: Array<{
			id: string;
			claim: string;
			source: string;
			visibility?: "public" | "internal";
			numbers?: string[];
		}>;
	};
	return {
		schemaVersion: 1,
		updated: raw.updated,
		claims: raw.claims.map((claim) => ({
			...claim,
			visibility: claim.visibility ?? "public",
			numbers: claim.numbers ?? [],
		})),
	};
}

export function buildPrompt(input: {
	plan: RoutePlan;
	topic: string;
	profile: string;
	evidence: EvidenceRegistry;
	extra?: string;
	previousErrors?: string[];
	variantBlock?: string;
	research?: Array<{ claim: string; source: string; date: string }>;
}): string {
	const {
		plan,
		topic,
		profile,
		evidence,
		extra,
		previousErrors,
		variantBlock,
		research,
	} = input;
	const publicClaims = evidence.claims.filter(
		(claim) => claim.visibility === "public",
	);
	const allowedNumbers = publicClaims.flatMap((claim) => claim.numbers);
	const limits = SURFACE_LIMITS[plan.surface];
	const claimLines = publicClaims
		.map((claim) => `- ${claim.id}: ${claim.claim} (${claim.source})`)
		.join("\n");

	const lines = [
		"Ты пишешь от первого лица для Дани Юдина (sabraman). Это не копирайтинг, а наблюдение из опыта.",
		"",
		"## Профиль",
		profile.trim(),
		"",
		"## Проверенные факты",
		"Используй только эти факты. В поле evidenceIds укажи id тех, на которые опираешься — минимум один.",
		claimLines,
		"",
		`Разрешённые цифры: ${allowedNumbers.length > 0 ? allowedNumbers.join(", ") : "нет"}.`,
		"Любая другая цифра, процент, срок или количество — запрещены. Если нужна цифра, которой нет, — перестрой текст без неё.",
		"",
		"## Задача",
		`Поверхность: ${plan.surface}. ${SURFACE_BRIEF[plan.surface]}`,
		`Лимит: ${limits.maxChars} символов, минимум ${limits.minWords} слов.`,
		`Тема: ${topic}`,
		"",
		"## Правила маршрута",
		...plan.rules.map((rule) => `- ${rule}`),
		"",
		"## Жёсткие запреты",
		"- Никаких выдуманных кейсов, процентов, сроков и количеств точек.",
		"- Никаких «клиенты говорят», «исследования показывают», «доказано».",
		"- Никаких хештегов.",
		"- Максимум один эмодзи.",
		"- Никаких «в современном мире», «играет важную роль», «комплексное решение», «это не просто X, это Y».",
		"- Хук не начинается с «Сегодня», «В этой статье», «Давайте», «Многие знают».",
		"- Хук не длиннее 120 символов.",
		"- В `body` не повторяй хук: он уже в поле `hook`. И не дублируй CTA в конце тела.",
		"",
		...(research && research.length > 0
			? [
					"## Проверенные факты из поиска",
					"Эти факты собраны поиском с датами. Память модели может быть устаревшей — доверяй только этому списку. Цифры из него в текст не переноси.",
					...research.map(
						(item) => `- ${item.claim} (${item.source}, ${item.date})`,
					),
					"",
				]
			: []),
		...(variantBlock ? [variantBlock.trim(), ""] : []),
		"## Формат ответа",
		"Верни только JSON без markdown-обёртки и без пояснений:",
		JSON.stringify(
			{
				schemaVersion: 1,
				surface: plan.surface,
				route: plan.route,
				hook: "первая строка поста",
				body: "текст поста без хука и без CTA",
				cta: "призыв или пустая строка",
				slides: plan.surface === "carousel" ? ["слайд 1", "слайд 2"] : [],
				evidenceIds: ["один или два id из списка фактов"],
				assumptions: [],
				numbers: [],
				notes: "чем рискнул, что проверить перед публикацией",
			},
			null,
			2,
		),
	];

	if (extra) {
		lines.push("", "## Дополнительно от автора", extra);
	}

	if (previousErrors && previousErrors.length > 0) {
		lines.push(
			"",
			"## Предыдущая попытка отклонена",
			"Исправь эти ошибки и верни только JSON:",
			...previousErrors.map((error) => `- ${error}`),
		);
	}

	return lines.join("\n");
}

export const ARTIFACT_JSON_SCHEMA = {
	type: "object",
	additionalProperties: false,
	required: [
		"schemaVersion",
		"surface",
		"route",
		"hook",
		"body",
		"cta",
		"slides",
		"evidenceIds",
		"assumptions",
		"numbers",
		"notes",
	],
	properties: {
		schemaVersion: { type: "number", enum: [1] },
		surface: {
			type: "string",
			enum: ["threads_post", "ig_caption", "reels_script", "carousel"],
		},
		route: {
			type: "object",
			additionalProperties: false,
			required: ["productLine", "recipient", "objective"],
			properties: {
				productLine: { type: "string", enum: ["retail", "logistics", "dev"] },
				recipient: { type: "string", enum: ["owner", "manager", "peer"] },
				objective: { type: "string", enum: ["authority", "lead", "hire"] },
			},
		},
		hook: { type: "string" },
		body: { type: "string" },
		cta: { type: "string" },
		slides: { type: "array", items: { type: "string" } },
		evidenceIds: { type: "array", items: { type: "string" } },
		assumptions: { type: "array", items: { type: "string" } },
		numbers: { type: "array", items: { type: "string" } },
		notes: { type: "string" },
	},
} as const;
