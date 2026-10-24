import type {
	Objective,
	ProductLine,
	Recipient,
	Route,
	Surface,
} from "./schemas";

export interface RoutePlan {
	surface: Surface;
	route: Route;
	skills: string[];
	rules: string[];
}

const SURFACE_SKILLS: Record<Surface, string[]> = {
	threads_post: ["humanizer", "marketing-ideas"],
	ig_caption: ["humanizer", "seo-geo"],
	reels_script: ["humanizer"],
	carousel: ["humanizer", "marketing-ideas"],
};

const LINE_RULES: Record<ProductLine, string[]> = {
	retail: [
		"Пиши про точку, смену, товар, ценник, списание или отчёт.",
		"Герой поста — владелец или управляющий, а не разработчик.",
		"Не объясняй, что такое ритейл. Читатель там работает.",
	],
	logistics: [
		"Пиши про склад, поставку, расхождение в остатках или ручной отчёт.",
		"Показывай цену ошибки, а не красоту решения.",
		"Не используй слова «цепочка поставок» и «оптимизация процессов».",
	],
	dev: [
		"Пиши про инструмент и его поведение, а не про стек.",
		"Показывай ограничения решения: где оно ломается.",
		"Технические детали — только те, которые меняют вывод.",
	],
};

const RECIPIENT_RULES: Record<Recipient, string[]> = {
	owner: [
		"Обращайся к человеку, который платит свои деньги.",
		"Ему важен результат и срок, а не архитектура.",
	],
	manager: [
		"Обращайся к тому, кто собирает отчёты руками.",
		"Ему важен процесс и меньше рутины к следующей неделе.",
	],
	peer: [
		"Обращайся к разработчику как к равному.",
		"Не объясняй базу и не хвали инструмент.",
	],
};

const OBJECTIVE_RULES: Record<Objective, string[]> = {
	authority: [
		"Цель — узнавание и доверие, не продажа.",
		"CTA либо отсутствует, либо это вопрос к читателю.",
		"Не предлагай созвон, не пиши «пишите в личку».",
	],
	lead: [
		"Цель — заявка.",
		"CTA конкретный и низкий по порогу: один вопрос или одно действие.",
		"Не обещай результат в цифрах.",
	],
	hire: [
		"Цель — предложение о работе или контракт.",
		"Покажи, как думаешь, а не что умеешь.",
		"CTA — открытость к разговору, без резюме в тексте.",
	],
};

export function routePlan(surface: Surface, route: Route): RoutePlan {
	return {
		surface,
		route,
		skills: SURFACE_SKILLS[surface],
		rules: [
			...LINE_RULES[route.productLine],
			...RECIPIENT_RULES[route.recipient],
			...OBJECTIVE_RULES[route.objective],
		],
	};
}
