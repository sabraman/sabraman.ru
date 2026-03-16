export type LocaleText = {
	en: string;
	ru: string;
};

export type ProjectSlug =
	| "vaparshop"
	| "horny-place"
	| "smo-tg-miniapp"
	| "smoky-market-loyalty-miniapp"
	| "plonq-ai-search"
	| "flower-mini-app"
	| "smbro"
	| "arch-taplink"
	| "vape-me-fast"
	| "price-tag-printer"
	| "psp-book-reader"
	| "florist-quiz"
	| "schrute-farm";

export type ProjectCategoryId =
	| "mini_apps"
	| "web_platforms"
	| "tools"
	| "learning_games";

export type ProjectCatalogGroupId = "featured" | ProjectCategoryId;

export type ProjectLink = {
	kind: "live" | "live_secondary" | "github";
	url: string;
	label: LocaleText;
};

export type ProjectItem = {
	id: string;
	slug: ProjectSlug;
	repo: string;
	visibility: "public" | "private";
	category: ProjectCategoryId;
	isFeaturedWork: boolean;
	title: string;
	short: LocaleText;
	details: LocaleText;
	tags: string[];
	status: "live" | "in_development";
	links: ProjectLink[];
};

export const PROJECT_CATEGORY_ORDER: ProjectCategoryId[] = [
	"mini_apps",
	"web_platforms",
	"tools",
	"learning_games",
];

export const PROJECT_CATALOG_GROUP_ORDER: ProjectCatalogGroupId[] = [
	"featured",
	...PROJECT_CATEGORY_ORDER,
];

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategoryId, LocaleText> = {
	mini_apps: {
		en: "Mini Apps",
		ru: "Мини-приложения",
	},
	web_platforms: {
		en: "Web Platforms",
		ru: "Веб-платформы",
	},
	tools: {
		en: "Tools",
		ru: "Инструменты",
	},
	learning_games: {
		en: "Learning & Games",
		ru: "Обучение и игры",
	},
};

export const PROJECT_CATALOG_GROUP_LABELS: Record<
	ProjectCatalogGroupId,
	LocaleText
> = {
	featured: {
		en: "Featured Work",
		ru: "Ключевые кейсы",
	},
	...PROJECT_CATEGORY_LABELS,
};

const LIVE_LINK: LocaleText = { en: "Live", ru: "Открыть" };
const LIVE_SECONDARY_LINK: LocaleText = { en: "POS", ru: "POS" };
const GITHUB_LINK: LocaleText = { en: "GitHub", ru: "GitHub" };

export const PROJECTS: ProjectItem[] = [
	{
		id: "vaparshop",
		slug: "vaparshop",
		repo: "vaparshop",
		visibility: "private",
		category: "mini_apps",
		isFeaturedWork: true,
		title: "VAPARSHOP",
		short: {
			en: "Design and engineering portfolio of internal tools, bots, and Telegram commerce flows.",
			ru: "Кейс по дизайну и разработке внутренних инструментов, ботов и Telegram-коммерции.",
		},
		details: {
			en: "A multi-product case covering Telegram bots, backoffice tooling, brand assets, and operational automations for retail teams.",
			ru: "Комплексный кейс: Telegram-боты, backoffice-инструменты, брендовые материалы и автоматизация операционной работы сети.",
		},
		tags: ["Telegram Bots", "Internal Tools", "Next.js", "Automation"],
		status: "live",
		links: [],
	},
	{
		id: "horny-place",
		slug: "horny-place",
		repo: "horny-place",
		visibility: "private",
		category: "web_platforms",
		isFeaturedWork: true,
		title: "HORNY PLACE",
		short: {
			en: "Brand system and digital touchpoints for a retail chain with bold visual language.",
			ru: "Бренд-система и цифровые точки контакта для сети с выразительным визуальным стилем.",
		},
		details: {
			en: "End-to-end brand implementation across storefronts, promo materials, and web touchpoints with consistent design control.",
			ru: "Полный цикл внедрения бренда: торговые точки, промо-материалы и веб-платформы с единой системой визуального контроля.",
		},
		tags: ["Brand Identity", "Retail", "Web", "Design Systems"],
		status: "live",
		links: [],
	},
	{
		id: "smo-tg-miniapp",
		slug: "smo-tg-miniapp",
		repo: "smo-tg-miniapp",
		visibility: "private",
		category: "mini_apps",
		isFeaturedWork: false,
		title: "SMO TG Miniapp",
		short: {
			en: "Telegram commerce mini app for retail and wholesale ordering with role-based flows.",
			ru: "Telegram mini-app для розничных и оптовых заказов с ролевыми сценариями.",
		},
		details: {
			en: "Production-grade mini app with catalog, cart, order pipeline, manager/admin panels, wheel rewards, broadcasts, and MoySklad sync.",
			ru: "Продакшн mini-app: каталог, корзина, оформление заказов, панели менеджера/админа, колесо бонусов, рассылки и синхронизация с МойСклад.",
		},
		tags: ["Telegram Mini App", "Next.js", "Convex", "MoySklad", "Admin Panel"],
		status: "live",
		links: [
			{
				kind: "live",
				url: "https://opt.smbro.ru",
				label: LIVE_LINK,
			},
		],
	},
	{
		id: "smoky-market-loyalty-miniapp",
		slug: "smoky-market-loyalty-miniapp",
		repo: "smoky-market-loyalty-miniapp",
		visibility: "private",
		category: "mini_apps",
		isFeaturedWork: false,
		title: "Smoky Market Loyalty Miniapp",
		short: {
			en: "Loyalty platform with Telegram mini app plus web POS for store operations.",
			ru: "Платформа лояльности: Telegram mini-app + web POS для работы точек.",
		},
		details: {
			en: "Role-based seller/admin flows, shift lifecycle, QR/manual customer lookup, discount logic, transaction analytics, and Telegram export tooling.",
			ru: "Ролевые потоки для продавцов и админов, смены, поиск клиента по QR/коду, скидки, аналитика транзакций и экспорт отчетов в Telegram.",
		},
		tags: ["Loyalty", "POS", "Telegram", "Convex", "Monorepo"],
		status: "live",
		links: [
			{
				kind: "live",
				url: "https://sm-loyalty-miniapp.vercel.app",
				label: LIVE_LINK,
			},
			{
				kind: "live_secondary",
				url: "https://smoky-pos.vercel.app",
				label: LIVE_SECONDARY_LINK,
			},
		],
	},
	{
		id: "plonq-ai-search",
		slug: "plonq-ai-search",
		repo: "plonq-ai-search",
		visibility: "private",
		category: "mini_apps",
		isFeaturedWork: false,
		title: "PLONQ AI Search",
		short: {
			en: "AI product finder for PLONQ with semantic search and taste filters.",
			ru: "AI-поиск по каталогу PLONQ с семантикой и вкусовыми фильтрами.",
		},
		details: {
			en: "Hybrid vector+keyword retrieval with embeddings, product similarity, streaming recommendations, and normalized scraped catalog data.",
			ru: "Гибридный поиск (векторный + текстовый), эмбеддинги, похожие товары, потоковые рекомендации и нормализованный каталог из парсинга.",
		},
		tags: ["AI Search", "Vector Index", "OpenAI", "Telegram", "Convex"],
		status: "live",
		links: [
			{
				kind: "live",
				url: "https://plonq-ai-miniapp.vercel.app",
				label: LIVE_LINK,
			},
		],
	},
	{
		id: "flower-mini-app",
		slug: "flower-mini-app",
		repo: "esperansa-mini-app",
		visibility: "private",
		category: "mini_apps",
		isFeaturedWork: false,
		title: "Flower Mini App",
		short: {
			en: "Telegram Mini App for flower write-off tracking, staff actions, and reporting across store locations.",
			ru: "Telegram Mini App для списания цветов, работы команды и отчетности по торговым точкам.",
		},
		details: {
			en: "Role-based flower operations app with Telegram auth, point invites, daily write-off flows, owner reports, and CSV export.",
			ru: "Ролевое mini-app решение для цветочного ритейла: Telegram-авторизация, инвайты по точкам, списания, отчеты владельца и CSV-экспорт.",
		},
		tags: [
			"Telegram Mini App",
			"Convex",
			"Reports",
			"CSV Export",
			"Role-Based Access",
		],
		status: "in_development",
		links: [],
	},
	{
		id: "smbro-ru",
		slug: "smbro",
		repo: "smbro.ru",
		visibility: "private",
		category: "web_platforms",
		isFeaturedWork: false,
		title: "smbro.ru",
		short: {
			en: "Brand platform for SMOKE ME BRO with pickup points, announcements, and admin tooling.",
			ru: "Бренд-платформа SMOKE ME BRO с точками самовывоза, объявлениями и админкой.",
		},
		details: {
			en: "Customer-facing discovery pages plus role-based management for content, settings, users, analytics, and wholesale modules.",
			ru: "Публичный сайт с точками и анонсами + ролевое управление контентом, настройками, пользователями, аналитикой и оптовыми модулями.",
		},
		tags: ["Next.js", "Convex", "Telegram Auth", "Admin CMS", "Analytics"],
		status: "live",
		links: [
			{
				kind: "live",
				url: "https://smbro.ru",
				label: LIVE_LINK,
			},
		],
	},
	{
		id: "arch-taplink",
		slug: "arch-taplink",
		repo: "arch-taplink",
		visibility: "public",
		category: "web_platforms",
		isFeaturedWork: false,
		title: "ARCH Taplink",
		short: {
			en: "Store landing and link hub for ARCH with catalog sections and fast contact actions.",
			ru: "Лендинг и link-hub для ARCH с разделами каталога и быстрыми контактами.",
		},
		details: {
			en: "Includes dynamic open/closed status by Moscow time, searchable assortment blocks, and map/messenger shortcuts.",
			ru: "Динамический статус работы по МСК, поиск по ассортименту, быстрые переходы в мессенджеры и карты.",
		},
		tags: ["Next.js", "Landing", "Catalog UI", "Local Business"],
		status: "live",
		links: [
			{
				kind: "live",
				url: "https://www.archsmoke.ru",
				label: LIVE_LINK,
			},
			{
				kind: "github",
				url: "https://github.com/sabraman/arch-taplink",
				label: GITHUB_LINK,
			},
		],
	},
	{
		id: "vape-me-fast-landing-page",
		slug: "vape-me-fast",
		repo: "vape-me-fast-landing-page",
		visibility: "private",
		category: "web_platforms",
		isFeaturedWork: false,
		title: "Vape Me Fast Landing",
		short: {
			en: "Conversion-focused landing page with custom pixel-liquid motion background.",
			ru: "Конверсионный лендинг с кастомным pixel-liquid анимированным фоном.",
		},
		details: {
			en: "Three.js/postprocessing visual layer with gothic-pixel style and direct Telegram bot entry CTA.",
			ru: "Визуальный слой на Three.js/postprocessing, gothic-pixel стилистика и прямой CTA в Telegram-бота.",
		},
		tags: ["Landing", "Three.js", "Motion", "Telegram CTA"],
		status: "live",
		links: [
			{
				kind: "live",
				url: "https://vapemefast.ru",
				label: LIVE_LINK,
			},
		],
	},
	{
		id: "price-tag-printer",
		slug: "price-tag-printer",
		repo: "price-tag-printer",
		visibility: "public",
		category: "tools",
		isFeaturedWork: false,
		title: "Price Tag Printer",
		short: {
			en: "Price-tag production tool with spreadsheet import and print-ready export.",
			ru: "Система генерации ценников с импортом таблиц и печатным экспортом.",
		},
		details: {
			en: "Excel/Google Sheets ingestion, bulk editing workflows, configurable theme engine, and API endpoints for HTML/PDF output.",
			ru: "Импорт из Excel/Google Sheets, массовое редактирование, настраиваемая система тем и API-эндпоинты для HTML/PDF.",
		},
		tags: ["Retail Tool", "PDF", "Excel", "Google Sheets", "API"],
		status: "live",
		links: [
			{
				kind: "github",
				url: "https://github.com/sabraman/price-tag-printer",
				label: GITHUB_LINK,
			},
		],
	},
	{
		id: "psp-book-reader",
		slug: "psp-book-reader",
		repo: "psp-book-reader",
		visibility: "public",
		category: "tools",
		isFeaturedWork: false,
		title: "PSP Book Reader",
		short: {
			en: "Native EPUB reader for Sony PSP, optimized for memory and battery constraints.",
			ru: "Нативный EPUB-ридер для Sony PSP с оптимизацией под память и батарею.",
		},
		details: {
			en: "C/C++ + SDL2 reader with library mode, chapter navigation, TATE orientation, caching, and dynamic CPU scaling for power savings.",
			ru: "Ридер на C/C++ и SDL2: библиотека, навигация по главам, TATE-режим, кэши и динамическое управление частотой CPU для экономии энергии.",
		},
		tags: ["C++", "SDL2", "Embedded Optimization", "PSP"],
		status: "live",
		links: [
			{
				kind: "github",
				url: "https://github.com/sabraman/psp-book-reader",
				label: GITHUB_LINK,
			},
		],
	},
	{
		id: "florist-quiz",
		slug: "florist-quiz",
		repo: "florist-quiz",
		visibility: "public",
		category: "learning_games",
		isFeaturedWork: false,
		title: "Florist Quiz",
		short: {
			en: "Mobile-first flower training app with quiz modes and offline support.",
			ru: "Mobile-first тренажер для флористов с игровыми режимами и офлайном.",
		},
		details: {
			en: "Multiple quiz formats, real flower/price dataset, iOS-like swipe navigation, and installable PWA behavior.",
			ru: "Несколько форматов квиза, реальный набор цветов и цен, навигация в стиле iOS и режим PWA с офлайн-поддержкой.",
		},
		tags: ["EdTech", "PWA", "Mobile UX", "Quiz"],
		status: "live",
		links: [
			{
				kind: "live",
				url: "https://florist-quiz.vercel.app",
				label: LIVE_LINK,
			},
			{
				kind: "github",
				url: "https://github.com/sabraman/florist-quiz",
				label: GITHUB_LINK,
			},
		],
	},
	{
		id: "schrute-farm",
		slug: "schrute-farm",
		repo: "schrute-farm",
		visibility: "private",
		category: "learning_games",
		isFeaturedWork: false,
		title: "Schrute Farm",
		short: {
			en: "The Office-inspired beet clicker with idle progression and minigames.",
			ru: "Кликер по мотивам The Office с idle-прогрессией и мини-играми.",
		},
		details: {
			en: "Phaser-based game loop with upgrades, achievements, prestige, offline earnings, and side modes like Beet Blast and Solitaire.",
			ru: "Игровой цикл на Phaser: апгрейды, достижения, престиж, офлайн-доход и дополнительные режимы Beet Blast и Solitaire.",
		},
		tags: ["Game", "Phaser", "Idle", "PWA"],
		status: "live",
		links: [
			{
				kind: "live",
				url: "https://schrute-farm.vercel.app",
				label: LIVE_LINK,
			},
		],
	},
];

export const PROJECT_SLUGS: ProjectSlug[] = PROJECTS.map(
	(project) => project.slug,
);

export const PROJECT_BY_SLUG: Record<ProjectSlug, ProjectItem> =
	Object.fromEntries(
		PROJECTS.map((project) => [project.slug, project]),
	) as Record<ProjectSlug, ProjectItem>;

export function getProjectBySlug(slug: string): ProjectItem | null {
	return PROJECTS.find((project) => project.slug === slug) ?? null;
}

export function getProjectExternalLinks(project: ProjectItem): ProjectLink[] {
	if (project.visibility === "private") {
		return project.links.filter(
			(link) => link.kind === "live" || link.kind === "live_secondary",
		);
	}

	return project.links;
}

export function getCaseStudyPath(
	locale: "en" | "ru",
	slug: ProjectSlug,
): string {
	return locale === "ru" ? `/ru/${slug}` : `/${slug}`;
}
