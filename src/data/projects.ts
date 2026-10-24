export type LocaleText = {
	en: string;
	ru: string;
};

export type ProjectSlug =
	| "vaparshop"
	| "horny-place"
	| "smoky-market-loyalty-miniapp"
	| "plonq-ai-search"
	| "flower-mini-app"
	| "smbro"
	| "arch-taplink"
	| "price-tag-printer"
	| "psp-book-reader"
	| "schrute-farm"
	| "lunaria-search-ecosystem"
	| "sleepoff"
	| "spritefusion-pixel-snapper";

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

export type ProjectCaseStudyRoute = "generic" | "dedicated";

export type ProjectSchemaEntityType = "CreativeWork" | "SoftwareApplication";

export type ProjectItem = {
	id: string;
	slug: ProjectSlug;
	repo: string;
	visibility: "public" | "private";
	category: ProjectCategoryId;
	isFeaturedWork: boolean;
	caseStudyRoute: ProjectCaseStudyRoute;
	schemaEntityType: ProjectSchemaEntityType;
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
		id: "lunaria-search-ecosystem",
		slug: "lunaria-search-ecosystem",
		repo: "lunaria-search-ecosystem",
		visibility: "private",
		category: "web_platforms",
		isFeaturedWork: true,
		caseStudyRoute: "generic",
		schemaEntityType: "CreativeWork",
		title: "Lunaria Search Ecosystem",
		short: {
			en: "A regional search ecosystem and AI-SEO content engine built to dominate search surfaces.",
			ru: "Региональная поисковая экосистема и AI-SEO контент-движок для доминирования в выдаче.",
		},
		details: {
			en: "Multi-site Next.js architecture integrated with n8n and Gemini pipelines to power local search and AI retrieval in Kazan.",
			ru: "Мультисайтовая Next.js архитектура, интегрированная с конвейерами n8n и Gemini для захвата локального поиска и AI-ответов в Казани.",
		},
		tags: [
			"Next.js",
			"Monorepo",
			"n8n Automation",
			"Gemini AI",
			"SEO / AI-Search",
		],
		status: "live",
		links: [],
	},
	{
		id: "vaparshop",
		slug: "vaparshop",
		repo: "vapar-scanner",
		visibility: "private",
		category: "mini_apps",
		isFeaturedWork: true,
		caseStudyRoute: "dedicated",
		schemaEntityType: "CreativeWork",
		title: "Vapar Tools",
		short: {
			en: "Retail management dashboard & gamified salesman workspace with GetMeBack loyalty, shift stats, and Telegram bots.",
			ru: "Система управления ритейлом и геймифицированное рабочее пространство продавца с интеграцией GetMeBack, сменами и ботами.",
		},
		details: {
			en: "A comprehensive Mini App suite for retail managers and staff: shift life-cycles, safe balance checks, customer objections tracking, GetMeBack QR scanner, automatic Telegram alerts, and employee progress game.",
			ru: "Комплексный Mini App для сотрудников и менеджеров: ведение смен, проверка сейфа, лог возражений клиентов, QR-сканер лояльности GetMeBack, авто-уведомления в Telegram и игра-симулятор смены.",
		},
		tags: [
			"Next.js 14",
			"Drizzle ORM",
			"GetMeBack API",
			"Telegram Mini App",
			"Employee Gamification",
		],
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
		caseStudyRoute: "dedicated",
		schemaEntityType: "CreativeWork",
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
		id: "smoky-market-loyalty-miniapp",
		slug: "smoky-market-loyalty-miniapp",
		repo: "smoky-market-loyalty-miniapp",
		visibility: "private",
		category: "mini_apps",
		isFeaturedWork: false,
		caseStudyRoute: "generic",
		schemaEntityType: "SoftwareApplication",
		title: "Smoky Market Loyalty Miniapp",
		short: {
			en: "Loyalty platform with Telegram mini app, web POS, and a full visual system for the brand.",
			ru: "Платформа лояльности: Telegram mini-app, web POS и полный визуальный стиль бренда.",
		},
		details: {
			en: "Role-based seller/admin flows, shift lifecycle, QR/manual customer lookup, discount logic, transaction analytics, plus logo, social templates, and branded print materials.",
			ru: "Ролевые потоки для продавцов и админов, смены, поиск клиента по QR/коду, скидки, аналитика транзакций, а также логотип, шаблоны для соцсетей и фирменные печатные материалы.",
		},
		tags: ["Loyalty", "POS", "Telegram", "Brand System", "Monorepo"],
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
		caseStudyRoute: "generic",
		schemaEntityType: "SoftwareApplication",
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
		repo: "flower-mini-app",
		visibility: "private",
		category: "mini_apps",
		isFeaturedWork: false,
		caseStudyRoute: "generic",
		schemaEntityType: "SoftwareApplication",
		title: "Flower Retail Suite",
		short: {
			en: "Complete retail digital suite for a flower brand: write-off tracking Telegram Mini App & interactive customer quiz.",
			ru: "Цифровой розничный пакет для цветочного бренда: Telegram Mini App для учета списаний и интерактивный квиз подбора букетов.",
		},
		details: {
			en: "A retail flower ecosystem featuring a Telegram Mini App with a reactive Convex backend for staff write-off audits, and a mobile-first PWA quiz with a rule-based matching engine and CRM forms.",
			ru: "Экосистема цветочной розницы: Telegram Mini App на Convex для учета списаний сотрудниками и мобильный PWA-квиз с логикой подбора букетов и формами сбора лидов.",
		},
		tags: [
			"Telegram Mini App",
			"Next.js 16",
			"Convex",
			"React Compiler",
			"PWA",
			"EdTech",
		],
		status: "live",
		links: [
			{
				kind: "live",
				url: "https://florist-quiz.vercel.app",
				label: { en: "Florist Quiz", ru: "Тест флориста" },
			},
			{
				kind: "github",
				url: "https://github.com/sabraman/florist-quiz",
				label: { en: "GitHub", ru: "GitHub" },
			},
		],
	},
	{
		id: "smbro-ru",
		slug: "smbro",
		repo: "smbro.ru",
		visibility: "private",
		category: "web_platforms",
		isFeaturedWork: true,
		caseStudyRoute: "generic",
		schemaEntityType: "SoftwareApplication",
		title: "SMOKE ME BRO Ecosystem",
		short: {
			en: "Comprehensive digital commerce ecosystem for SMOKE ME BRO: retail/wholesale platform, ordering Telegram Mini App, and WebGL landing.",
			ru: "Цифровая экосистема коммерции SMOKE ME BRO: оптово-розничная Next.js платформа, торговый Telegram Mini App и промо-лендинг на WebGL.",
		},
		details: {
			en: "A production-ready retail and wholesale ecosystem featuring a dynamic React storefront with Convex, a checkout cart, automated MoySklad inventory sync, and custom Three.js WebGL shaders.",
			ru: "Коммерческая экосистема бренда: динамический веб-каталог на Next.js с Convex, оптовая корзина с ролями, автоматическая интеграция с МойСклад и трехмерная анимация на Three.js.",
		},
		tags: [
			"Next.js",
			"Convex DB",
			"MoySklad API",
			"Three.js WebGL",
			"Telegram Mini App",
		],
		status: "live",
		links: [
			{
				kind: "live",
				url: "https://smbro.ru",
				label: LIVE_LINK,
			},
			{
				kind: "live",
				url: "https://opt.smbro.ru",
				label: { en: "Wholesale", ru: "Опт" },
			},
			{
				kind: "live",
				url: "https://vapemefast.ru",
				label: { en: "WebGL Promo", ru: "Промо" },
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
		caseStudyRoute: "generic",
		schemaEntityType: "CreativeWork",
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
		id: "price-tag-printer",
		slug: "price-tag-printer",
		repo: "price-tag-printer",
		visibility: "public",
		category: "tools",
		isFeaturedWork: false,
		caseStudyRoute: "dedicated",
		schemaEntityType: "SoftwareApplication",
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
		caseStudyRoute: "generic",
		schemaEntityType: "SoftwareApplication",
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
		id: "schrute-farm",
		slug: "schrute-farm",
		repo: "schrute-farm",
		visibility: "private",
		category: "learning_games",
		isFeaturedWork: false,
		caseStudyRoute: "generic",
		schemaEntityType: "SoftwareApplication",
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
	{
		id: "sleepoff",
		slug: "sleepoff",
		repo: "sleepoff",
		visibility: "public",
		category: "tools",
		isFeaturedWork: false,
		caseStudyRoute: "generic",
		schemaEntityType: "SoftwareApplication",
		title: "SleepOff",
		short: {
			en: "Lightweight macOS menu bar utility that prevents closed-lid sleep and auto-dims the screen.",
			ru: "Легкая утилита для macOS, предотвращающая спящий режим при закрытой крышке и гасящая экран.",
		},
		details: {
			en: "Mac menu bar app built in Swift that monitors active AI agents (Antigravity, Codex) to dynamically disable sleep, force dim built-in display to 0 on lid close, and auto-install narrow sudoers rules for pmset.",
			ru: "Приложение Swift для панели меню macOS, отслеживающее активных AI-агентов (Antigravity, Codex) для динамического блокирования сна, отключения встроенного дисплея при закрытой крышке через узкие правила sudoers для pmset.",
		},
		tags: ["Swift", "macOS", "pmset", "Automation", "Nix Flake"],
		status: "live",
		links: [
			{
				kind: "github",
				url: "https://github.com/sabraman/sleepoff",
				label: GITHUB_LINK,
			},
		],
	},
	{
		id: "spritefusion-pixel-snapper",
		slug: "spritefusion-pixel-snapper",
		repo: "spritefusion-pixel-snapper",
		visibility: "public",
		category: "tools",
		isFeaturedWork: false,
		caseStudyRoute: "generic",
		schemaEntityType: "SoftwareApplication",
		title: "Pixel Snapper",
		short: {
			en: "Rust/WASM grid snapper and color quantizer designed to fix messy AI-generated pixel art.",
			ru: "Rust/WASM инструмент для привязки пикселей к сетке и квантования цветов в AI-пиксель-арте.",
		},
		details: {
			en: "Methodical image optimizer written in Rust (CLI and WebAssembly modules) that snaps misaligned pixels to rigid grids, applies K-Means color quantization, maps palettes, and respects dithering.",
			ru: "Методичный оптимизатор изображений на Rust (CLI и WebAssembly): привязка пикселей к жесткой сетке, K-Means квантование цветов, сопоставление палитр и сохранение дизеринга.",
		},
		tags: ["Rust", "WebAssembly", "Quantization", "CLI Tool", "Game Dev"],
		status: "live",
		links: [
			{
				kind: "live",
				url: "https://spritefusion.com/pixel-snapper",
				label: LIVE_LINK,
			},
			{
				kind: "github",
				url: "https://github.com/sabraman/spritefusion-pixel-snapper",
				label: GITHUB_LINK,
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
