import type { RoutePlan } from "./router";
import {
	ArtifactSchema,
	type Artifact,
	type EvidenceRegistry,
	type ValidationIssue,
	type ValidationResult,
	SURFACE_LIMITS,
} from "./schemas";

const BANNED_PHRASES = [
	"в современном мире",
	"в мире, где",
	"играет важную роль",
	"играют важную роль",
	"ключевую роль",
	"это не просто",
	"не просто ",
	"давайте разбер",
	"в заключение",
	"стоит отметить",
	"важно отметить",
	"мощный инструмент",
	"революционн",
	"бесшовн",
	"эффективное решение",
	"комплексное решение",
	"инновационн",
	"цифровая трансформация",
	"оптимизаци",
	"синерг",
	"уникальное предложение",
	"лидер рынка",
];

const FABRICATED_PROOF = [
	/клиенты\s+(говорят|отмечают)/iu,
	/по\s+данным\s+исследован/iu,
	/исследования\s+показывают/iu,
	/статистика\s+(говорит|показывает)/iu,
	/доказано/iu,
	/по\s+статистике/iu,
];

const BANNED_OPENERS = [
	"сегодня",
	"в этой статье",
	"давайте",
	"хочу рассказать",
	"многие знают",
	"все знают",
	"как известно",
];

const METRIC_PATTERN =
	/(\d+(?:[.,]\d+)?)\s*(%|процент[а-яё]*|раз[а-яё]*|час[а-яё]*|минут[а-яё]*|точ[а-яё]*|магазин[а-яё]*|sku|клиент[а-яё]*|руб[а-яё]*|₽|тыс[а-яё]*)/giu;

const HASHTAG_PATTERN = /(^|\s)#[A-Za-zА-Яа-яЁё0-9_]+/u;
const EMOJI_PATTERN = /\p{Extended_Pictographic}/gu;

function normalizeNumber(value: string): string {
	return value.replace(",", ".").replace(/\s+/g, "");
}

function issue(code: string, message: string): ValidationIssue {
	return { code, message };
}

function collectMetrics(
	text: string,
): Array<{ raw: string; value: string; unit: string }> {
	const found: Array<{ raw: string; value: string; unit: string }> = [];
	for (const match of text.matchAll(METRIC_PATTERN)) {
		const value = match[1];
		const unit = match[2];
		if (!value || !unit) continue;
		found.push({
			raw: match[0],
			value: normalizeNumber(value),
			unit: unit.toLowerCase(),
		});
	}
	return found;
}

function comparable(text: string): string {
	return text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
}

export interface ComposedPost {
	text: string;
	hookDuplicated: boolean;
	ctaDuplicated: boolean;
}

export function composePost(artifact: Artifact): ComposedPost {
	const hook = artifact.hook.trim();
	const body = artifact.body.trim();
	const cta = artifact.cta.trim();

	const bodyComparable = comparable(body);
	const hookDuplicated =
		hook.length > 0 && bodyComparable.startsWith(comparable(hook).slice(0, 40));
	let text = hookDuplicated ? body : `${hook}\n\n${body}`;

	const textComparable = comparable(text);
	const ctaDuplicated =
		cta.length > 0 && textComparable.endsWith(comparable(cta));
	if (cta && !ctaDuplicated) {
		text = `${text}\n\n${cta}`;
	}

	return { text, hookDuplicated, ctaDuplicated };
}

const NEGATIVE_PARALLELISM = [
	/\bне\s+[^.!?\n]{1,40}[.!?]\s*не\s+/iu,
	/\bэто\s+не\s+[^,.\n]{1,40},\s*это\s+/iu,
	/\bне\s+[^,.\n]{1,30},\s*а\s+[^,.\n]{1,30}\b/iu,
];

const APHORISM = [
	/\b[а-яё]{3,}\s+—\s+это\s+[а-яё]/iu,
	/\b[а-яё]{3,}\s+—\s+не\s+[^,.\n]{1,30},\s*а\s+/iu,
];

const META_COMMENTARY = [
	/^(пишу|вот|держи|надеюсь|готово|как вам)/iu,
	/уложусь в\s+\d+/iu,
	/без лишних приёмов/iu,
	/надеюсь,\s+(помог|понрав|пригод)/iu,
	/если хочешь,\s+могу/iu,
];

function sentences(text: string): string[] {
	return text
		.split(/(?<=[.!?])\s+/u)
		.map((sentence) => sentence.trim())
		.filter(Boolean);
}

export function validateProse(text: string): ValidationIssue[] {
	const issues: ValidationIssue[] = [];
	const clean = text.trim();

	for (const pattern of NEGATIVE_PARALLELISM) {
		const match = clean.match(pattern);
		if (match) {
			issues.push(
				issue(
					"negative_parallelism",
					`Отрицательная параллель: «${match[0].trim()}»`,
				),
			);
		}
	}

	for (const pattern of APHORISM) {
		const match = clean.match(pattern);
		if (match) {
			issues.push(issue("aphorism", `Афоризм-формула: «${match[0].trim()}»`));
		}
	}

	for (const pattern of META_COMMENTARY) {
		const match = clean.match(pattern);
		if (match) {
			issues.push(
				issue(
					"meta_commentary",
					`Комментарий автора вместо текста: «${match[0].trim()}»`,
				),
			);
		}
	}

	let shortRun = 0;
	for (const sentence of sentences(clean)) {
		if (sentence.length <= 45) {
			shortRun += 1;
			if (shortRun === 3) {
				issues.push(
					issue("staccato_triplet", "Три коротких рубленых предложения подряд"),
				);
			}
		} else {
			shortRun = 0;
		}
	}

	const numbers = clean.match(/\d+(?:[.,]\d+)?/gu) ?? [];
	if (numbers.length > 3) {
		issues.push(
			issue(
				"detail_dump",
				`Цифр в тексте: ${numbers.length}. Похоже на свалку деталей`,
			),
		);
	}

	const colons = (clean.match(/:/gu) ?? []).length;
	if (colons > 2) {
		issues.push(issue("colon_overuse", `Двоеточий: ${colons}`));
	}

	for (const sentence of sentences(clean)) {
		const commas = (sentence.match(/,/gu) ?? []).length;
		if (commas >= 4) {
			issues.push(
				issue("long_list", `Перечисление на ${commas + 1} элементов`),
			);
			break;
		}
	}

	return issues;
}

export function parseArtifact(raw: string): Artifact {
	const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
	const candidate =
		fenced ?? raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
	if (!candidate.trim()) {
		throw new Error("artifact_json_missing");
	}
	const parsed: unknown = JSON.parse(candidate.trim());
	return ArtifactSchema.parse(parsed);
}

export function validateArtifact(
	artifact: Artifact,
	evidence: EvidenceRegistry,
	plan: RoutePlan,
): ValidationResult {
	const errors: ValidationIssue[] = [];
	const warnings: ValidationIssue[] = [];

	const composed = composePost(artifact);
	const fullText = [composed.text, ...artifact.slides].join("\n");
	const lower = fullText.toLowerCase();
	const limits = SURFACE_LIMITS[artifact.surface];
	const chars = composed.text.trim().length;
	const words = composed.text.trim().split(/\s+/u).filter(Boolean).length;
	const emDashes = (fullText.match(/—/gu) ?? []).length;
	const emoji = (fullText.match(EMOJI_PATTERN) ?? []).length;

	if (composed.hookDuplicated) {
		warnings.push(
			issue(
				"hook_duplicated",
				"Модель повторила хук в теле — при публикации дубль убирается",
			),
		);
	}
	if (composed.ctaDuplicated) {
		warnings.push(
			issue(
				"cta_duplicated",
				"Модель повторила CTA в теле — при публикации дубль убирается",
			),
		);
	}

	if (artifact.surface !== plan.surface) {
		errors.push(
			issue(
				"surface_mismatch",
				`Артефакт ${artifact.surface}, ожидался ${plan.surface}`,
			),
		);
	}
	if (artifact.route.productLine !== plan.route.productLine) {
		errors.push(
			issue("route_mismatch", "productLine не совпадает с маршрутом"),
		);
	}
	if (artifact.route.recipient !== plan.route.recipient) {
		errors.push(issue("route_mismatch", "recipient не совпадает с маршрутом"));
	}
	if (artifact.route.objective !== plan.route.objective) {
		errors.push(issue("route_mismatch", "objective не совпадает с маршрутом"));
	}

	if (chars > limits.maxChars) {
		errors.push(
			issue(
				"too_long",
				`${chars} символов при лимите ${limits.maxChars} для ${artifact.surface}`,
			),
		);
	}
	if (words < limits.minWords) {
		errors.push(
			issue("too_thin", `${words} слов при минимуме ${limits.minWords}`),
		);
	}

	for (const phrase of BANNED_PHRASES) {
		if (lower.includes(phrase)) {
			errors.push(
				issue("ai_tell", `Запрещённая конструкция: «${phrase.trim()}»`),
			);
		}
	}

	for (const pattern of FABRICATED_PROOF) {
		const match = fullText.match(pattern);
		if (match) {
			errors.push(
				issue("fabricated_proof", `Придуманное доказательство: «${match[0]}»`),
			);
		}
	}

	if (HASHTAG_PATTERN.test(fullText)) {
		errors.push(issue("hashtags", "Хештеги запрещены"));
	}

	if (emoji > 1) {
		errors.push(issue("emoji", `Эмодзи ${emoji}, максимум один`));
	}

	if (emDashes > 6) {
		warnings.push(
			issue("em_dash_heavy", `Тире ${emDashes}, похоже на машинный ритм`),
		);
	}

	const hookLength = artifact.hook.trim().length;
	if (hookLength > 120) {
		errors.push(
			issue("hook_too_long", `Хук ${hookLength} символов, максимум 120`),
		);
	}
	const hookLower = artifact.hook.trim().toLowerCase();
	for (const opener of BANNED_OPENERS) {
		if (hookLower.startsWith(opener)) {
			errors.push(issue("weak_hook", `Хук начинается с «${opener}»`));
		}
	}

	if (artifact.cta.length > 200) {
		errors.push(issue("cta_too_long", "CTA длиннее 200 символов"));
	}
	if (plan.route.objective === "lead" && artifact.cta.trim().length === 0) {
		errors.push(issue("cta_missing", "Для цели lead нужен CTA"));
	}
	if (
		plan.route.objective === "authority" &&
		/(пиши|пишите|записывай|записывайте|оставь|оставьте)\s+(заявку|в личк|в лс)/iu.test(
			artifact.cta,
		)
	) {
		errors.push(
			issue("hard_sell", "Для цели authority запрещён продающий CTA"),
		);
	}

	if (
		artifact.surface === "carousel" &&
		(artifact.slides.length < 5 || artifact.slides.length > 9)
	) {
		errors.push(
			issue("slides_count", `Слайдов ${artifact.slides.length}, нужно 5–9`),
		);
	}

	const claimIds = new Set(evidence.claims.map((claim) => claim.id));
	const publicIds = new Set(
		evidence.claims
			.filter((claim) => claim.visibility === "public")
			.map((claim) => claim.id),
	);
	for (const id of artifact.evidenceIds) {
		if (!claimIds.has(id)) {
			errors.push(issue("unknown_evidence", `Нет такого факта: ${id}`));
		} else if (!publicIds.has(id)) {
			errors.push(
				issue(
					"private_evidence",
					`Факт ${id} помечен как internal и не идёт в публикацию`,
				),
			);
		}
	}

	const usedClaims = evidence.claims.filter((claim) =>
		artifact.evidenceIds.includes(claim.id),
	);
	const allowedNumbers = new Set(
		usedClaims.flatMap((claim) => claim.numbers.map(normalizeNumber)),
	);

	for (const metric of collectMetrics(fullText)) {
		if (!allowedNumbers.has(metric.value)) {
			errors.push(
				issue(
					"invented_number",
					`Цифра «${metric.raw.trim()}» отсутствует в evidence.json. Выдуманные метрики запрещены`,
				),
			);
		}
	}

	for (const declared of artifact.numbers) {
		if (!allowedNumbers.has(normalizeNumber(declared))) {
			errors.push(
				issue(
					"declared_number_not_in_evidence",
					`Заявленная цифра ${declared} не подтверждена evidence`,
				),
			);
		}
	}

	if (artifact.assumptions.length > 0) {
		warnings.push(
			issue(
				"assumptions",
				`В посте есть допущения: ${artifact.assumptions.join("; ")}`,
			),
		);
	}

	if (artifact.surface === "reels_script" && !/0:\d{2}/u.test(artifact.body)) {
		warnings.push(issue("no_timecodes", "В сценарии Reels нет таймкодов"));
	}

	return {
		ok: errors.length === 0,
		errors,
		warnings,
		stats: { chars, words, emDashes, emoji },
	};
}
