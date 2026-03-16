import {
	type LocaleText,
	PROJECT_BY_SLUG,
	type ProjectSlug,
} from "~/data/projects";

export type CaseStudySection = {
	id: string;
	title: LocaleText;
	paragraphs: LocaleText[];
	bullets?: LocaleText[];
};

export type CaseStudyFaqItem = {
	question: LocaleText;
	answer: LocaleText;
};

export type CaseStudySeo = {
	title: LocaleText;
	description: LocaleText;
	keywords: { en: string[]; ru: string[] };
	ogSubtitle: LocaleText;
};

export type ProjectCaseStudy = {
	slug: ProjectSlug;
	projectId: string;
	visibility: "public" | "private";
	status: "live" | "in_development";
	hero: {
		badge: LocaleText;
		summary: LocaleText;
	};
	sections: CaseStudySection[];
	faq: CaseStudyFaqItem[];
	seo: CaseStudySeo;
};

const section = (
	id: string,
	title: LocaleText,
	paragraphs: LocaleText[],
	bullets?: LocaleText[],
): CaseStudySection => ({ id, title, paragraphs, bullets });

const p = (en: string, ru: string): LocaleText => ({ en, ru });

export const PROJECT_CASE_STUDIES: Record<ProjectSlug, ProjectCaseStudy> = {
	vaparshop: {
		slug: "vaparshop",
		projectId: "vaparshop",
		visibility: PROJECT_BY_SLUG.vaparshop.visibility,
		status: PROJECT_BY_SLUG.vaparshop.status,
		hero: {
			badge: p("Retail Product System", "Ритейл-продуктовая система"),
			summary: p(
				"A long-running production stream where branding, Telegram automation, and operational tooling were shipped as one coherent stack.",
				"Долгий продакшн-поток, где брендинг, Telegram-автоматизация и операционные инструменты развивались как единая система.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"The team was operating through fragmented manual flows: communication in chats, reports in separate files, and repetitive formatting tasks for retail operations.",
					"Команда работала в разрозненных ручных процессах: коммуникация в чатах, отчеты в отдельных файлах и повторяющиеся задачи для розницы.",
				),
				p(
					"The product goal was not a single app, but a practical ecosystem that reduced friction for managers and sellers without introducing heavy internal complexity.",
					"Целью был не один продукт, а практичная экосистема, которая снижает трение для менеджеров и продавцов без лишней внутренней сложности.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"The solution evolved as modular services: Telegram bot workflows, a mini app surface, and internal web tooling connected by shared business rules.",
						"Решение развивалось как набор модулей: Telegram-боты, mini app и внутренние веб-инструменты на общих бизнес-правилах.",
					),
					p(
						"Product boundaries were defined by operations: catalog operations, loyalty interactions, and reporting/export pipelines were isolated to keep releases safe.",
						"Границы модулей задавались операционными процессами: каталог, лояльность и отчётность были изолированы для безопасных релизов.",
					),
				],
				[
					p("Telegram-first UX", "Telegram-first UX"),
					p(
						"Incremental delivery with reversible releases",
						"Итеративные релизы с безопасным откатом",
					),
					p(
						"Shared domain logic across tools",
						"Единая доменная логика между инструментами",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"The stack includes queue-like operational interactions in Telegram, role-specific controls, and practical automation blocks used in day-to-day store workflows.",
					"Стек включает операционные сценарии в Telegram, ролевые ограничения и рабочие блоки автоматизации для повседневных задач магазинов.",
				),
				p(
					"Frontline interactions were kept intentionally simple so non-technical staff could execute repetitive tasks with predictable outcomes.",
					"Фронтовые сценарии были специально упрощены, чтобы сотрудники без технического бэкграунда выполняли рутину предсказуемо.",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"Next.js and TypeScript were used for product surfaces, with Telegram APIs and supporting integrations connected through explicit domain boundaries.",
						"Next.js и TypeScript использовались для продуктовых интерфейсов, Telegram API и сопутствующие интеграции связывались через чёткие доменные границы.",
					),
					p(
						"The implementation prioritized maintainability for an evolving retail environment where requirements changed as stores scaled.",
						"В реализации приоритетом была поддерживаемость для растущей розницы, где требования менялись вместе с масштабом сети.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"Operations moved from fragmented manual actions to stable productized workflows. Teams gained clearer ownership over recurring tasks and reporting cycles.",
					"Операционные процессы перешли от разрозненных ручных действий к стабильным продуктовым сценариям. Команда получила более понятную ответственность за рутину и отчётность.",
				),
				p(
					"The main result is reliability under daily usage: fewer ad-hoc steps, faster handoffs, and less context loss between people and channels.",
					"Главный результат — устойчивость в ежедневной работе: меньше ручных шагов, быстрее передачи задач и меньше потери контекста между людьми и каналами.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Telegram-first decisions improved adoption, but imposed UI and interaction constraints compared to fully native web products.",
						"Telegram-first подход улучшил внедрение, но ограничил интерфейс и взаимодействия по сравнению с полностью независимыми веб-продуктами.",
					),
					p(
						"The team favored incremental delivery over big rewrites, which reduced risk but required disciplined consistency across modules.",
						"Команда выбрала постепенную поставку вместо крупных переписываний, что снижало риск, но требовало строгой согласованности между модулями.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"Was this a single app or multiple products?",
					"Это было одно приложение или несколько продуктов?",
				),
				answer: p(
					"Multiple production surfaces delivered as one system: bots, mini apps, and web tooling sharing operational logic.",
					"Несколько продакшн-поверхностей, собранных в единую систему: боты, mini app и веб-инструменты на общей логике.",
				),
			},
			{
				question: p("Why Telegram-first?", "Почему Telegram-first?"),
				answer: p(
					"It matched existing team habits and reduced onboarding time for daily operational usage.",
					"Это совпадало с привычками команды и сокращало время внедрения для ежедневной операционной работы.",
				),
			},
			{
				question: p(
					"What was the hardest technical part?",
					"Что было самым сложным технически?",
				),
				answer: p(
					"Keeping cross-surface business rules consistent while shipping features continuously.",
					"Поддерживать согласованность бизнес-правил между разными интерфейсами при постоянной поставке фич.",
				),
			},
		],
		seo: {
			title: p(
				"VAPARSHOP Case Study - Telegram Automation and Retail Tooling",
				"Кейс VAPARSHOP - Telegram-автоматизация и инструменты для ритейла",
			),
			description: p(
				"Detailed case study of a Telegram-first retail product system: bots, mini app, and operational tooling for daily store workflows.",
				"Подробный кейс Telegram-first системы для ритейла: боты, mini app и операционные инструменты для ежедневной работы магазинов.",
			),
			keywords: {
				en: [
					"vaparshop case study",
					"telegram retail automation",
					"telegram mini app commerce",
					"retail workflow automation",
				],
				ru: [
					"кейс vaparshop",
					"автоматизация ритейла в telegram",
					"telegram mini app для торговли",
					"операционные инструменты для магазинов",
				],
			},
			ogSubtitle: p(
				"Telegram automation, mini app, and retail operations",
				"Telegram-автоматизация, mini app и ритейл-операции",
			),
		},
	},
	"horny-place": {
		slug: "horny-place",
		projectId: "horny-place",
		visibility: PROJECT_BY_SLUG["horny-place"].visibility,
		status: PROJECT_BY_SLUG["horny-place"].status,
		hero: {
			badge: p("Brand and Retail Experience", "Брендинг и ритейл-опыт"),
			summary: p(
				"A full-cycle identity and digital execution project for a retail brand that needed consistency across physical and online channels.",
				"Проект полного цикла по айдентике и цифровым поверхностям для ритейл-бренда с задачей синхронизировать офлайн и онлайн.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"The brand had to scale communication assets fast while keeping a recognizable voice across storefronts, events, and digital touchpoints.",
					"Бренду нужно было быстро масштабировать коммуникационные материалы и сохранять узнаваемый характер в магазинах, ивентах и цифровых каналах.",
				),
				p(
					"The core challenge was not visual novelty alone, but controlled consistency under high content turnover.",
					"Ключевой вызов заключался не только в визуальной новизне, но и в управляемой консистентности при постоянном обновлении материалов.",
				),
			]),
			section("architecture", p("System design approach", "Системный подход"), [
				p(
					"A modular identity system was defined first, then applied to signage, promo units, and digital surfaces with shared pattern rules.",
					"Сначала была собрана модульная система айдентики, затем она применялась к вывескам, промо-материалам и цифровым интерфейсам по общим правилам.",
				),
				p(
					"Brand decisions were documented so production tasks could be delegated without losing stylistic control.",
					"Решения по бренду фиксировались в документации, чтобы задачи можно было делегировать без потери визуального контроля.",
				),
			]),
			section(
				"features",
				p("Deliverables and implementation", "Реализация и артефакты"),
				[
					p(
						"The project covered exterior signage, event graphics, retail promo packs, digital previews, and a web entry surface tailored to brand tone.",
						"Проект охватил внешние вывески, ивент-графику, промо-пакеты для розницы, цифровые превью и веб-поверхность в фирменной тональности.",
					),
					p(
						"Workflows were designed for repeatability: templates, compositional constraints, and usage boundaries were set explicitly.",
						"Процессы были построены на повторяемости: шаблоны, композиционные ограничения и границы применения задавались явно.",
					),
				],
			),
			section(
				"tooling",
				p("Tooling and production stack", "Инструменты и production-стек"),
				[
					p(
						"Design production combined Figma and Adobe workflows, while web touchpoints were shipped with a lightweight Next.js stack.",
						"Для дизайн-производства использовались Figma и Adobe-инструменты, а веб-поверхности выпускались на лёгком Next.js-стеке.",
					),
					p(
						"The implementation emphasized velocity with guardrails, not one-off design experiments.",
						"Реализация была ориентирована на скорость с чёткими рамками, а не на разовые визуальные эксперименты.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"The brand gained a practical visual operating system that scaled from physical retail to online communication without stylistic drift.",
					"Бренд получил практичную визуальную операционную систему, которая масштабировалась от офлайн-ритейла к онлайн-коммуникации без распада стиля.",
				),
				p(
					"Operationally, design tasks became easier to assign and review because criteria were explicit and reusable.",
					"С операционной точки зрения дизайн-задачи стало проще распределять и проверять, так как критерии стали явными и повторяемыми.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"A strong style framework improves consistency but reduces room for spontaneous visual deviation.",
						"Жёсткая стилистическая рамка усиливает консистентность, но уменьшает пространство для спонтанных отклонений.",
					),
					p(
						"Balancing retail legibility with expressive branding required constant iteration on hierarchy and contrast.",
						"Баланс между читаемостью в ритейле и выразительным брендингом требовал постоянной итерации по иерархии и контрасту.",
					),
				],
			),
		],
		faq: [
			{
				question: p("Was this only branding work?", "Это был только брендинг?"),
				answer: p(
					"No. The scope included physical assets and web entry surfaces with implementation support.",
					"Нет. В объём вошли физические носители и веб-поверхности с поддержкой реализации.",
				),
			},
			{
				question: p(
					"How was consistency controlled?",
					"Как контролировалась консистентность?",
				),
				answer: p(
					"Through explicit brand rules, template constraints, and repeatable production checklists.",
					"Через явные бренд-правила, ограничения шаблонов и повторяемые чек-листы производства.",
				),
			},
			{
				question: p(
					"What made this project difficult?",
					"Что было самым сложным в проекте?",
				),
				answer: p(
					"Maintaining quality while assets were produced at high velocity for different retail contexts.",
					"Сохранять качество при высоком темпе выпуска материалов для разных ритейл-сценариев.",
				),
			},
		],
		seo: {
			title: p(
				"HORNY PLACE Case Study - Brand System and Retail UX",
				"Кейс HORNY PLACE - Бренд-система и ритейл UX",
			),
			description: p(
				"Detailed case study of identity, retail graphics, and digital touchpoints built as one production-ready brand system.",
				"Подробный кейс по айдентике, ритейл-графике и цифровым поверхностям, собранным в единую производственную бренд-систему.",
			),
			keywords: {
				en: [
					"horny place case study",
					"retail branding system",
					"brand identity in retail",
					"next.js brand landing",
				],
				ru: [
					"кейс horny place",
					"брендинг для ритейла",
					"система айдентики",
					"дизайн цифровых точек контакта",
				],
			},
			ogSubtitle: p(
				"Identity system across retail and digital channels",
				"Система айдентики для ритейла и digital-каналов",
			),
		},
	},
	"smo-tg-miniapp": {
		slug: "smo-tg-miniapp",
		projectId: "smo-tg-miniapp",
		visibility: PROJECT_BY_SLUG["smo-tg-miniapp"].visibility,
		status: PROJECT_BY_SLUG["smo-tg-miniapp"].status,
		hero: {
			badge: p("Telegram Commerce", "Telegram-коммерция"),
			summary: p(
				"Production mini app for retail and wholesale order flows with role-aware UX and integrated backoffice controls.",
				"Продакшн mini app для розничных и оптовых заказов с ролевым UX и интегрированным backoffice-управлением.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"Retail and wholesale had overlapping but incompatible ordering flows. Staff needed one channel with role-based boundaries and predictable order lifecycle handling.",
					"Розница и опт имели пересекающиеся, но несовместимые сценарии заказов. Команде нужен был один канал с ролевыми границами и предсказуемой обработкой заказов.",
				),
				p(
					"Telegram was already the operational entry point, so product adoption depended on minimizing context switches to external systems.",
					"Telegram уже был основной рабочей точкой входа, поэтому внедрение продукта зависело от минимизации переключений в сторонние системы.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"The app was designed around catalog, cart, checkout, and post-order operations, with manager/admin panels built on the same domain model.",
						"Приложение строилось вокруг каталога, корзины, оформления и пост-обработки заказа, а панели менеджера/админа работали на той же доменной модели.",
					),
					p(
						"Integrations were isolated through adapter-style boundaries to keep product logic stable when external systems changed behavior.",
						"Интеграции были изолированы через адаптерные границы, чтобы сохранять стабильность продуктовой логики при изменениях внешних систем.",
					),
				],
				[
					p("Catalog + cart + checkout", "Каталог + корзина + checkout"),
					p(
						"Manager/admin role separation",
						"Ролевое разделение manager/admin",
					),
					p("Integration-safe boundaries", "Безопасные границы интеграций"),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"Operational features include broadcast messaging, reward wheel mechanics, and order-state control for real store workflows.",
					"В операционный набор входят рассылки, механика бонусного колеса и контроль статусов заказа для реальных процессов в точках.",
				),
				p(
					"UX was tuned for small-screen execution speed: short action paths, explicit status signaling, and low cognitive load for repeat tasks.",
					"UX настраивался под скорость на маленьких экранах: короткие сценарии, явные статусы и низкая когнитивная нагрузка для повторяющихся задач.",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"Next.js and Convex power the interactive and stateful parts, while MoySklad sync keeps inventory and order context aligned with business operations.",
						"Next.js и Convex обеспечивают интерактивную и stateful-часть, а синхронизация с МойСкладом держит складской и заказный контекст в актуальном состоянии.",
					),
					p(
						"Integration reliability was treated as a product concern, not a background technical detail.",
						"Надёжность интеграций рассматривалась как продуктовая задача, а не второстепенная техническая деталь.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"The team received a single execution surface for retail and wholesale ordering scenarios with transparent role governance.",
					"Команда получила единую рабочую поверхность для розничных и оптовых сценариев с прозрачным ролевым управлением.",
				),
				p(
					"Daily operations became easier to audit and maintain because user actions map directly to business states.",
					"Ежедневные процессы стало проще контролировать и поддерживать, потому что действия пользователей напрямую соответствуют бизнес-статусам.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Telegram platform constraints limit certain UI patterns, so product interactions favor robust clarity over visual complexity.",
						"Ограничения платформы Telegram сужают некоторые UI-паттерны, поэтому взаимодействия сделаны в пользу надёжной ясности, а не визуальной сложности.",
					),
					p(
						"Role-driven behavior increases implementation complexity but is necessary for operational safety.",
						"Ролевое поведение увеличивает сложность реализации, но критично для операционной безопасности.",
					),
				],
			),
		],
		faq: [
			{
				question: p("Is this only a storefront?", "Это только витрина?"),
				answer: p(
					"No. It includes operational admin and manager flows around ordering lifecycle control.",
					"Нет. В системе есть операционные сценарии для админов и менеджеров вокруг полного цикла заказа.",
				),
			},
			{
				question: p(
					"Why include MoySklad sync?",
					"Зачем нужна синхронизация с МойСклад?",
				),
				answer: p(
					"To keep catalog and order state consistent with real inventory and internal accounting routines.",
					"Чтобы каталог и статусы заказов соответствовали реальному складу и внутренним учетным процессам.",
				),
			},
			{
				question: p(
					"What defines production readiness here?",
					"Что здесь означает production readiness?",
				),
				answer: p(
					"Stable role flows, predictable order transitions, and integration behavior that supports daily usage.",
					"Стабильные ролевые сценарии, предсказуемые переходы статусов и интеграции, пригодные для ежедневной работы.",
				),
			},
		],
		seo: {
			title: p(
				"SMO TG Miniapp Case Study - Telegram Retail and Wholesale Ordering",
				"Кейс SMO TG Miniapp - Telegram-заказы для розницы и опта",
			),
			description: p(
				"Detailed case study of a production Telegram mini app with catalog, cart, role-based ordering, and MoySklad integration.",
				"Подробный кейс продакшн Telegram mini app: каталог, корзина, ролевые сценарии заказа и интеграция с МойСклад.",
			),
			keywords: {
				en: [
					"telegram mini app case study",
					"retail wholesale ordering app",
					"telegram commerce nextjs",
					"moysklad integration",
				],
				ru: [
					"кейс telegram mini app",
					"приложение для розницы и опта",
					"telegram коммерция nextjs",
					"интеграция мойсклад",
				],
			},
			ogSubtitle: p(
				"Role-based Telegram ordering with backoffice control",
				"Ролевые Telegram-заказы с backoffice-управлением",
			),
		},
	},
	"smoky-market-loyalty-miniapp": {
		slug: "smoky-market-loyalty-miniapp",
		projectId: "smoky-market-loyalty-miniapp",
		visibility: PROJECT_BY_SLUG["smoky-market-loyalty-miniapp"].visibility,
		status: PROJECT_BY_SLUG["smoky-market-loyalty-miniapp"].status,
		hero: {
			badge: p("Loyalty + POS", "Лояльность + POS"),
			summary: p(
				"A loyalty platform combining Telegram mini app experiences with web POS operations for staff.",
				"Платформа лояльности, объединяющая Telegram mini app для клиентов и web POS для сотрудников.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"Loyalty actions happened across disconnected channels, making discount handling and transaction traceability inconsistent.",
					"Действия по лояльности происходили в разрозненных каналах, из-за чего скидки и прослеживаемость транзакций были нестабильными.",
				),
				p(
					"The product had to support seller speed at checkout while preserving admin-level control over discount policy and shifts.",
					"Продукт должен был поддерживать скорость работы продавца на кассе и одновременно сохранять управляемость скидочной политики и смен для админов.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"The system split responsibilities between customer-facing Telegram interactions and staff-facing POS workflows with shared transaction state.",
						"Система разделила ответственность между клиентскими Telegram-сценариями и POS-процессами персонала на общем транзакционном состоянии.",
					),
					p(
						"Shift lifecycle, customer lookup, and discount validation were modeled as explicit state transitions to reduce ambiguity.",
						"Жизненный цикл смены, поиск клиента и проверка скидок были смоделированы как явные переходы состояния для снижения неоднозначности.",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"Store operators can process QR/manual customer lookup, apply policy-safe discounts, and close shifts with exportable reporting.",
					"Операторы точки могут искать клиента по QR/коду, применять скидки в рамках политики и закрывать смены с выгрузкой отчетов.",
				),
				p(
					"Admin views focus on transaction analytics and role governance instead of decorative dashboards.",
					"Админские интерфейсы сфокусированы на аналитике транзакций и ролевом управлении, а не на декоративных дашбордах.",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"The monorepo setup keeps mini app and POS codebases aligned while sharing domain contracts.",
						"Монорепо-подход синхронизирует mini app и POS-кодовую базу за счет общих доменных контрактов.",
					),
					p(
						"Convex-backed data workflows support real-time operations where stale status can break checkout routines.",
						"Data-процессы на Convex поддерживают near real-time операции, где устаревший статус ломает кассовые сценарии.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"The loyalty process became operationally explicit: staff actions, discount decisions, and shift accountability are recorded in one system.",
					"Процесс лояльности стал операционно прозрачным: действия персонала, решения по скидкам и ответственность по сменам фиксируются в одной системе.",
				),
				p(
					"This reduced ad-hoc handling and improved handoff quality between store staff and management.",
					"Это сократило ручные обходные решения и улучшило передачу контекста между продавцами и менеджментом.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Balancing speed for checkout staff with policy enforcement requires careful UX prioritization and strict domain validation.",
						"Баланс между скоростью на кассе и соблюдением политики требует аккуратного UX-приоритеза и строгой доменной валидации.",
					),
					p(
						"Monorepo coupling improves consistency but demands discipline in release coordination.",
						"Монорепо повышает согласованность, но требует дисциплины в координации релизов.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"Is this just a customer mini app?",
					"Это только клиентский mini app?",
				),
				answer: p(
					"No. It includes a full web POS layer for sellers and admins.",
					"Нет. В проект входит полноценный web POS слой для продавцов и админов.",
				),
			},
			{
				question: p(
					"How are discounts controlled?",
					"Как контролируются скидки?",
				),
				answer: p(
					"Through role-aware validation and explicit policy checks in transaction flow.",
					"Через ролевую валидацию и явные проверки политики в транзакционном потоке.",
				),
			},
			{
				question: p(
					"What is exported to Telegram?",
					"Что выгружается в Telegram?",
				),
				answer: p(
					"Operational reports and transaction summaries needed by management workflows.",
					"Операционные отчеты и сводки транзакций, нужные в управленческих сценариях.",
				),
			},
		],
		seo: {
			title: p(
				"Smoky Market Loyalty Miniapp Case Study - Telegram Loyalty and POS",
				"Кейс Smoky Market Loyalty Miniapp - Telegram-лояльность и POS",
			),
			description: p(
				"Detailed case study of a loyalty platform: Telegram mini app, web POS, shift lifecycle, discount control, and transaction analytics.",
				"Подробный кейс платформы лояльности: Telegram mini app, web POS, смены, контроль скидок и аналитика транзакций.",
			),
			keywords: {
				en: [
					"loyalty mini app",
					"telegram loyalty platform",
					"web pos case study",
					"shift lifecycle retail",
				],
				ru: [
					"платформа лояльности кейс",
					"telegram лояльность",
					"web pos для розницы",
					"смены и транзакции",
				],
			},
			ogSubtitle: p(
				"Loyalty workflows connected with web POS operations",
				"Сценарии лояльности, связанные с web POS",
			),
		},
	},
	"plonq-ai-search": {
		slug: "plonq-ai-search",
		projectId: "plonq-ai-search",
		visibility: PROJECT_BY_SLUG["plonq-ai-search"].visibility,
		status: PROJECT_BY_SLUG["plonq-ai-search"].status,
		hero: {
			badge: p("AI Search Experience", "AI-поисковый опыт"),
			summary: p(
				"Semantic product discovery for PLONQ catalog with hybrid retrieval and recommendation flows.",
				"Семантический поиск по каталогу PLONQ с гибридным retrieval и сценариями рекомендаций.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"Keyword-only search could not capture user intent for flavor profiles and product similarity in conversational queries.",
					"Поиск только по ключевым словам плохо отражал намерение пользователя для вкусовых профилей и похожих товаров в разговорных запросах.",
				),
				p(
					"The product required relevance that felt natural inside Telegram interaction patterns.",
					"Продукту требовалась релевантность, которая ощущается естественно в Telegram-сценариях.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"The engine combines vector retrieval with keyword constraints to balance semantic breadth and precision.",
						"Движок сочетает векторный retrieval с keyword-ограничениями для баланса между семантической широтой и точностью.",
					),
					p(
						"Catalog ingestion and normalization were treated as first-class product work, not just preprocessing.",
						"Загрузка и нормализация каталога рассматривались как часть продукта, а не просто предобработка данных.",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"The experience supports taste-oriented queries, related-item navigation, and streaming recommendation responses.",
					"Опыт поддерживает запросы по вкусовым предпочтениям, переход к похожим товарам и потоковую выдачу рекомендаций.",
				),
				p(
					"Recommendation explainability is handled through controlled output structure to avoid opaque ranking decisions.",
					"Объяснимость рекомендаций поддерживается контролируемой структурой выдачи, чтобы ранжирование не выглядело «черным ящиком».",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"The stack uses embedding workflows, vector indexing, and conversational UI delivery through Telegram and web mini app surfaces.",
						"Стек использует эмбеддинги, векторную индексацию и conversational-доставку результата через Telegram и web mini app.",
					),
					p(
						"Operational robustness depends on catalog freshness and guarded query transforms.",
						"Операционная устойчивость зависит от актуальности каталога и контролируемых преобразований запроса.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"Search moved from literal matching to intent-aware retrieval, improving discovery quality for non-exact user phrasing.",
					"Поиск перешел от буквального совпадения к intent-aware retrieval, что повысило качество выдачи для неточных формулировок.",
				),
				p(
					"Users can navigate catalog context faster because related options are surfaced with less manual filtering.",
					"Пользователю проще двигаться по каталогу, потому что связанные варианты появляются без ручной фильтрации.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Semantic retrieval adds complexity in debugging and evaluation compared to deterministic keyword ranking.",
						"Семантический retrieval усложняет отладку и оценку по сравнению с детерминированным keyword-ранжированием.",
					),
					p(
						"Result quality strongly depends on data normalization quality and embedding refresh discipline.",
						"Качество результата сильно зависит от качества нормализации данных и дисциплины обновления эмбеддингов.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"Why hybrid search instead of vector-only?",
					"Почему гибридный поиск, а не только векторный?",
				),
				answer: p(
					"Hybrid retrieval gives stronger precision controls while keeping semantic recall.",
					"Гибридный retrieval дает лучший контроль точности и сохраняет семантический охват.",
				),
			},
			{
				question: p(
					"What makes catalog normalization important?",
					"Почему важна нормализация каталога?",
				),
				answer: p(
					"It directly affects ranking quality, filter consistency, and recommendation trust.",
					"Она напрямую влияет на качество ранжирования, согласованность фильтров и доверие к рекомендациям.",
				),
			},
			{
				question: p(
					"Is this a chatbot or search system?",
					"Это чат-бот или поисковая система?",
				),
				answer: p(
					"It is a search system delivered through conversational interfaces.",
					"Это поисковая система, доставленная через conversational-интерфейс.",
				),
			},
		],
		seo: {
			title: p(
				"PLONQ AI Search Case Study - Semantic Product Discovery",
				"Кейс PLONQ AI Search - Семантический поиск по товарам",
			),
			description: p(
				"Detailed case study of hybrid vector and keyword product search with embeddings, similarity navigation, and streaming recommendations.",
				"Подробный кейс гибридного поиска по товарам: вектор + keyword, эмбеддинги, похожие товары и потоковые рекомендации.",
			),
			keywords: {
				en: [
					"ai product search case study",
					"hybrid vector keyword retrieval",
					"telegram ai search",
					"catalog semantic discovery",
				],
				ru: [
					"кейс ai поиска",
					"гибридный векторный поиск",
					"telegram ai поиск",
					"семантический поиск по каталогу",
				],
			},
			ogSubtitle: p(
				"Hybrid semantic retrieval for product discovery",
				"Гибридный семантический retrieval для поиска товаров",
			),
		},
	},
	"flower-mini-app": {
		slug: "flower-mini-app",
		projectId: "flower-mini-app",
		visibility: PROJECT_BY_SLUG["flower-mini-app"].visibility,
		status: PROJECT_BY_SLUG["flower-mini-app"].status,
		hero: {
			badge: p("Retail Operations Mini App", "Mini App для операционки"),
			summary: p(
				"A Telegram Mini App for flower write-off tracking across retail locations, with role-based access, fast daily flows, and built-in reporting.",
				"Telegram Mini App для учета списаний цветов по торговым точкам: с ролями, быстрыми ежедневными сценариями и встроенной отчетностью.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"Flower retail teams needed a lightweight way to record write-offs per location without falling back to chats, spreadsheets, and manual recounting.",
					"Команде цветочного ритейла нужен был легкий способ учитывать списания по точкам без возврата к чатам, таблицам и ручным пересчетам.",
				),
				p(
					"The goal was not a demo shell, but an operational product that staff could use daily while owners still had clean reporting visibility.",
					"Целью был не демонстрационный каркас, а рабочий продукт для ежедневного использования персоналом и прозрачной отчетности для владельца.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"The app uses server-side Telegram init-data verification in Convex, token-hashed sessions, and explicit role boundaries for owner, admin, and staff users.",
						"Приложение использует серверную проверку Telegram init-data в Convex, сессии с хэшированием токена и явные ролевые границы для owner, admin и staff.",
					),
					p(
						"Write-off events are stored as append-only records, while daily totals are pre-aggregated to keep owner-level reports fast.",
						"Списания хранятся как append-only события, а дневные итоги агрегируются отдельно, чтобы отчеты на уровне владельца работали быстро.",
					),
				],
			),
			section("features", p("Feature set", "Набор функций"), [
				p(
					"The Today screen supports search, one-tap `+1` write-offs, optimistic UI, haptic feedback, and undo for the last action within a 60-second window.",
					"Экран «Сегодня» поддерживает поиск, списание в один тап (`+1`), optimistic UI, haptic feedback и отмену последнего действия в окне 60 секунд.",
				),
				p(
					"Point invite links, date-based history, day/period reports, and CSV export turn the product into a real operating surface rather than a starter MVP.",
					"Инвайты по точкам, история по датам, отчеты за день и период, а также CSV-экспорт превращают проект в рабочий продукт, а не в стартовый MVP-шаблон.",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"Next.js 16, Convex, and Telegram Mini App tooling form the main stack, with shadcn/ui and Tailwind v4 used for the interface layer.",
						"Основной стек собран на Next.js 16, Convex и tooling для Telegram Mini Apps, а интерфейсный слой построен на shadcn/ui и Tailwind v4.",
					),
					p(
						"Automated checks cover init-data validation, permissions, invite limits, undo logic, and CSV reporting paths.",
						"Автоматические проверки покрывают валидацию init-data, права доступа, лимиты инвайтов, undo-логику и сценарии CSV-отчетов.",
					),
				],
			),
			section("outcome", p("Outcome and readiness", "Результат и готовность"), [
				p(
					"The project is still evolving, but it has already crossed the line from scaffold to usable operations product.",
					"Проект все еще развивается, но уже вышел за пределы каркаса и стал полноценным рабочим инструментом.",
				),
				p(
					"Core daily flows, access control, and reporting are already shaped around real point-level usage instead of placeholder functionality.",
					"Ключевые ежедневные сценарии, контроль доступа и отчетность уже собраны вокруг реальной работы точек, а не вокруг заглушек.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Telegram-first ergonomics keep the workflow fast on phones, but they also constrain information density and navigation depth.",
						"Telegram-first эргономика делает сценарии быстрыми на телефоне, но ограничивает плотность информации и глубину навигации.",
					),
					p(
						"Auditability and export requirements add data-model discipline, but that tradeoff makes the product safer for day-to-day retail use.",
						"Требования к аудиту и экспорту усложняют модель данных, но именно этот компромисс делает продукт надежнее для ежедневной розничной работы.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"What does the app handle today?",
					"Что приложение умеет уже сейчас?",
				),
				answer: p(
					"Daily flower write-offs, date-based history, point invite access, role-aware permissions, owner reports, and CSV export.",
					"Ежедневные списания цветов, история по датам, доступ по инвайтам точек, ролевые права, отчеты владельца и CSV-экспорт.",
				),
			},
			{
				question: p(
					"How is access controlled?",
					"Как устроен контроль доступа?",
				),
				answer: p(
					"Through Telegram-authenticated sessions in Convex plus explicit owner, admin, and staff role boundaries tied to store locations.",
					"Через Telegram-аутентифицированные сессии в Convex и явные роли owner, admin и staff, привязанные к торговым точкам.",
				),
			},
			{
				question: p(
					"Why is this no longer just a scaffold?",
					"Почему это уже не просто каркас?",
				),
				answer: p(
					"Because the app already contains production-shaped daily flows, reporting, exports, invite mechanics, and tested permission logic.",
					"Потому что в приложении уже есть ежедневные рабочие сценарии, отчетность, экспорт, механика инвайтов и протестированная логика прав доступа.",
				),
			},
		],
		seo: {
			title: p(
				"Flower Mini App Case Study - Telegram Retail Operations",
				"Кейс Flower Mini App - Telegram-инструмент для цветочного ритейла",
			),
			description: p(
				"Case study of a Telegram Mini App for flower write-offs, role-based retail workflows, owner reporting, and CSV export built with Next.js and Convex.",
				"Кейс Telegram Mini App для списаний цветов, ролевых retail-сценариев, отчетности владельца и CSV-экспорта на Next.js и Convex.",
			),
			keywords: {
				en: [
					"flower mini app case study",
					"telegram retail operations",
					"convex telegram app",
					"flower writeoff reporting",
				],
				ru: [
					"flower mini app кейс",
					"telegram для цветочного ритейла",
					"списания цветов mini app",
					"отчеты и csv экспорт",
				],
			},
			ogSubtitle: p(
				"Telegram write-off tracking and reporting for flower retail",
				"Telegram-учет списаний и отчетность для цветочного ритейла",
			),
		},
	},
	smbro: {
		slug: "smbro",
		projectId: "smbro-ru",
		visibility: PROJECT_BY_SLUG.smbro.visibility,
		status: PROJECT_BY_SLUG.smbro.status,
		hero: {
			badge: p("Brand Platform", "Бренд-платформа"),
			summary: p(
				"A brand website and operational platform combining customer discovery and role-based administration.",
				"Брендовый сайт и операционная платформа, объединяющая клиентский discovery и ролевую административную зону.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"The brand needed one platform for public communication and internal operational control instead of scattered tools.",
					"Бренду нужна была единая платформа для публичной коммуникации и внутреннего управления вместо разрозненных инструментов.",
				),
				p(
					"The architecture had to support both content agility and strict role segregation.",
					"Архитектура должна была одновременно поддерживать гибкость контента и строгое ролевое разграничение.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"The system separates customer-facing surfaces (locations, announcements, discovery pages) from admin zones (content, settings, users, analytics).",
						"Система разделяет клиентские поверхности (точки, анонсы, discovery-страницы) и админ-зоны (контент, настройки, пользователи, аналитика).",
					),
					p(
						"Domain partitions were designed to keep wholesale modules isolated from public browsing contexts.",
						"Доменные границы спроектированы так, чтобы оптовые модули были изолированы от публичных сценариев просмотра.",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"Public users get location and brand updates, while internal roles can manage content lifecycle and operational visibility.",
					"Публичные пользователи получают доступ к точкам и обновлениям бренда, а внутренние роли управляют жизненным циклом контента и операционной видимостью.",
				),
				p(
					"Role-specific interfaces reduce accidental cross-impact between editorial and operational work.",
					"Ролевые интерфейсы снижают риск случайного пересечения редакционных и операционных действий.",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"The platform uses Next.js and Convex with Telegram-auth-aware flows in parts where identity continuity matters for internal usage.",
						"Платформа построена на Next.js и Convex, а в сценариях с критичной идентификацией используется Telegram-auth подход.",
					),
					p(
						"Analytics and admin capabilities were implemented as working product functions, not post-launch add-ons.",
						"Аналитика и админ-возможности реализованы как продуктовые функции, а не как отложенные дополнения.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"The brand gained a controlled digital core where customer communication and team operations run on aligned product logic.",
					"Бренд получил управляемое цифровое ядро, где клиентская коммуникация и операционная работа команды построены на согласованной логике.",
				),
				p(
					"Day-to-day administration became faster because key controls are centralized and role-scoped.",
					"Ежедневное администрирование ускорилось за счет централизованных и ролевых контролов.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Combining public and internal workloads in one platform increases governance requirements and release discipline.",
						"Совмещение публичной и внутренней нагрузки в одной платформе повышает требования к управлению и релизной дисциплине.",
					),
					p(
						"Role precision reduces mistakes but adds design and implementation overhead.",
						"Точная ролевая модель снижает ошибки, но добавляет накладные расходы в дизайне и реализации.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"Is this only a marketing website?",
					"Это только маркетинговый сайт?",
				),
				answer: p(
					"No. It includes role-based admin and operational modules beyond public pages.",
					"Нет. Помимо публичных страниц, в системе есть ролевые админские и операционные модули.",
				),
			},
			{
				question: p(
					"Why include analytics in core scope?",
					"Почему аналитика входит в базовый scope?",
				),
				answer: p(
					"Operational and content decisions need direct visibility, not delayed external reports.",
					"Операционным и контентным решениям нужна прямая видимость, а не отложенные внешние отчеты.",
				),
			},
			{
				question: p(
					"How is wholesale isolated?",
					"Как изолирован оптовый контур?",
				),
				answer: p(
					"Through domain boundaries and role-scoped interfaces.",
					"Через доменные границы и ролевые интерфейсы.",
				),
			},
		],
		seo: {
			title: p(
				"smbro.ru Case Study - Brand Platform with Admin and Analytics",
				"Кейс smbro.ru - Бренд-платформа с админкой и аналитикой",
			),
			description: p(
				"Detailed case study of smbro.ru: customer-facing brand platform with role-based admin, analytics, and operational modules.",
				"Подробный кейс smbro.ru: публичная бренд-платформа с ролевой админкой, аналитикой и операционными модулями.",
			),
			keywords: {
				en: [
					"smbro case study",
					"brand platform nextjs",
					"role based admin panel",
					"retail brand website",
				],
				ru: [
					"кейс smbro",
					"бренд-платформа",
					"ролевая админка",
					"сайт для ритейл-бренда",
				],
			},
			ogSubtitle: p(
				"Customer discovery and admin operations in one platform",
				"Клиентский discovery и админ-операции в одной платформе",
			),
		},
	},
	"arch-taplink": {
		slug: "arch-taplink",
		projectId: "arch-taplink",
		visibility: PROJECT_BY_SLUG["arch-taplink"].visibility,
		status: PROJECT_BY_SLUG["arch-taplink"].status,
		hero: {
			badge: p("Landing + Link Hub", "Лендинг + link hub"),
			summary: p(
				"A practical conversion-oriented landing hub with dynamic store status and fast customer action paths.",
				"Практичный конверсионный лендинг-хаб с динамическим статусом магазина и быстрыми сценариями действий клиента.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"The project had to replace static link pages with a usable store-oriented flow for product discovery and contact actions.",
					"Проект должен был заменить статичные link-страницы на рабочий сценарий для ознакомления с ассортиментом и быстрых контактов.",
				),
				p(
					"Local-business conversion required immediate clarity: open/closed status, maps, and messaging entry points.",
					"Для локального бизнеса критична мгновенная ясность: статус работы, карты и точки входа в мессенджеры.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"The page structure is optimized for action density: status signal, catalog navigation, and contact shortcuts above exploratory content.",
						"Структура страницы оптимизирована под плотность действий: статус, навигация по ассортименту и быстрые контакты идут выше обзорного контента.",
					),
					p(
						"Time-aware logic ensures open/closed state reflects Moscow timezone rules.",
						"Time-aware логика обеспечивает корректный статус open/closed по московскому времени.",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"Users can quickly filter assortment blocks, open maps, jump to messenger channels, and choose the shortest path to purchase conversation.",
					"Пользователь быстро фильтрует ассортимент, открывает карты, переходит в мессенджеры и выбирает кратчайший путь к покупке.",
				),
				p(
					"Information hierarchy is tuned for short mobile sessions rather than long-form browsing.",
					"Иерархия информации настроена под короткие мобильные сессии, а не под длительный обзор.",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"Next.js is used as a lightweight runtime for status logic and responsive rendering with low operational overhead.",
						"Next.js используется как легкий runtime для статусной логики и адаптивного рендера при низких эксплуатационных издержках.",
					),
					p(
						"The implementation favors maintainable content blocks over custom-heavy CMS complexity.",
						"Реализация делает ставку на поддерживаемые контент-блоки вместо тяжелой CMS-сложности.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"The landing moved from passive links to an actionable local-business surface where users can decide and contact quickly.",
					"Лендинг перешел от пассивных ссылок к рабочей поверхности локального бизнеса, где пользователь быстро принимает решение и связывается.",
				),
				p(
					"Operationally, updates are simpler because dynamic status and structured blocks are already embedded in page logic.",
					"С операционной точки зрения обновления проще, так как динамический статус и структурированные блоки уже встроены в логику страницы.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Conversion-oriented hierarchy limits expressive narrative space but improves task completion speed.",
						"Иерархия, ориентированная на конверсию, уменьшает пространство для длинного повествования, но ускоряет выполнение целевых действий.",
					),
					p(
						"Timezone-driven status logic requires careful handling to avoid false availability signals.",
						"Логика статуса по таймзоне требует аккуратной реализации, чтобы не показывать ложную доступность.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"Is this a full e-commerce platform?",
					"Это полноценный e-commerce?",
				),
				answer: p(
					"No. It is a conversion-oriented landing and link hub for fast customer routing.",
					"Нет. Это конверсионный лендинг и link hub для быстрого маршрута клиента.",
				),
			},
			{
				question: p(
					"Why is dynamic open/closed status important?",
					"Почему важен динамический статус open/closed?",
				),
				answer: p(
					"It prevents user frustration and improves trust in local-business contact paths.",
					"Он снижает фрустрацию и повышает доверие к контактным сценариям локального бизнеса.",
				),
			},
			{
				question: p(
					"What is the main UX priority?",
					"Какой главный UX-приоритет?",
				),
				answer: p(
					"Shortest path from intent to contact action on mobile.",
					"Кратчайший путь от намерения к контактному действию на мобильном.",
				),
			},
		],
		seo: {
			title: p(
				"ARCH Taplink Case Study - Conversion Landing for Local Retail",
				"Кейс ARCH Taplink - Конверсионный лендинг для локального ритейла",
			),
			description: p(
				"Detailed case study of ARCH Taplink: dynamic store status, catalog blocks, and fast map/messenger actions.",
				"Подробный кейс ARCH Taplink: динамический статус магазина, блоки ассортимента и быстрые переходы в карты/мессенджеры.",
			),
			keywords: {
				en: [
					"taplink alternative case study",
					"local business landing page",
					"nextjs conversion landing",
					"store status by timezone",
				],
				ru: [
					"альтернатива taplink кейс",
					"лендинг локального бизнеса",
					"конверсионный лендинг nextjs",
					"статус магазина по времени",
				],
			},
			ogSubtitle: p(
				"Dynamic local-business landing with fast action UX",
				"Динамический лендинг локального бизнеса с быстрым UX",
			),
		},
	},
	"vape-me-fast": {
		slug: "vape-me-fast",
		projectId: "vape-me-fast-landing-page",
		visibility: PROJECT_BY_SLUG["vape-me-fast"].visibility,
		status: PROJECT_BY_SLUG["vape-me-fast"].status,
		hero: {
			badge: p("Experimental Landing", "Экспериментальный лендинг"),
			summary: p(
				"A conversion-focused landing page with a custom pixel-liquid visual layer and direct Telegram CTA flow.",
				"Конверсионный лендинг с кастомным pixel-liquid визуальным слоем и прямым Telegram CTA-сценарием.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"The landing had to stand out visually in a crowded niche while preserving direct and measurable conversion paths.",
					"Лендинг должен был выделяться визуально в перегретой нише и при этом сохранять прямые и измеримые пути конверсии.",
				),
				p(
					"The core challenge was balancing bold motion identity with practical usability and loading discipline.",
					"Ключевой вызов — баланс между яркой анимационной айдентикой и практичной удобностью с контролем загрузки.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"The page combines a motion-driven visual layer with a structured conversion funnel, keeping CTA visibility persistent.",
						"Страница совмещает motion-ориентированный визуальный слой и структурированную конверсионную воронку с постоянной видимостью CTA.",
					),
					p(
						"The rendering pipeline uses a controlled Three.js/postprocessing setup to avoid visual noise overtaking content intent.",
						"Рендер-пайплайн использует управляемую связку Three.js/postprocessing, чтобы визуальный эффект не подавлял смысл контента.",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"The signature element is a pixel-liquid backdrop aligned with brand mood, while action blocks route users directly into Telegram bot entry.",
					"Сигнатурный элемент — pixel-liquid фон в тональности бренда, а action-блоки напрямую ведут пользователя в Telegram-бот.",
				),
				p(
					"Interaction timing and hierarchy are tuned to maintain readability under animated backgrounds.",
					"Тайминг взаимодействий и иерархия настроены так, чтобы сохранять читаемость на анимированном фоне.",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"Three.js with postprocessing handles visual composition, while web app logic keeps CTA and message flow deterministic.",
						"Three.js с postprocessing отвечает за визуальную композицию, а логика веб-приложения сохраняет детерминированность CTA и пользовательского потока.",
					),
					p(
						"The implementation was optimized around perceived responsiveness, not just synthetic benchmark scores.",
						"Реализация оптимизировалась под воспринимаемую отзывчивость, а не только под формальные бенчмарки.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"The project delivers a recognizable visual identity without sacrificing direct conversion routing.",
					"Проект обеспечивает узнаваемую визуальную идентичность без потери прямого маршрута к конверсии.",
				),
				p(
					"The final result is a landing that feels distinct but remains operationally straightforward for campaign updates.",
					"Итог — лендинг с ярким характером, который при этом остается операционно простым для обновлений под кампании.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Visual intensity increases engineering and QA cost, especially for low-power devices and edge rendering conditions.",
						"Высокая визуальная насыщенность увеличивает стоимость инженерии и QA, особенно на слабых устройствах и пограничных условиях рендера.",
					),
					p(
						"Strict conversion clarity means some artistic interactions must be constrained.",
						"Строгая конверсионная ясность требует ограничивать часть художественных интеракций.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"Is this animation-first or conversion-first?",
					"Это animation-first или conversion-first?",
				),
				answer: p(
					"Conversion-first with animation serving brand differentiation.",
					"Conversion-first, где анимация работает на отличимость бренда.",
				),
			},
			{
				question: p("Why use Three.js here?", "Зачем здесь Three.js?"),
				answer: p(
					"To build a custom visual language that standard CSS effects could not express.",
					"Чтобы реализовать кастомный визуальный язык, который сложно выразить стандартными CSS-эффектами.",
				),
			},
			{
				question: p(
					"What is the main risk in this approach?",
					"Какой главный риск такого подхода?",
				),
				answer: p(
					"Performance drift when visual layers are expanded without strict constraints.",
					"Просадка производительности при расширении визуального слоя без строгих ограничений.",
				),
			},
		],
		seo: {
			title: p(
				"Vape Me Fast Case Study - Motion-Driven Conversion Landing",
				"Кейс Vape Me Fast - Motion-ориентированный конверсионный лендинг",
			),
			description: p(
				"Detailed case study of a landing page built with custom Three.js pixel-liquid visuals and direct Telegram conversion flow.",
				"Подробный кейс лендинга с кастомными Three.js pixel-liquid эффектами и прямым Telegram-конверсионным сценарием.",
			),
			keywords: {
				en: [
					"threejs landing page case study",
					"conversion landing with motion",
					"telegram cta landing",
					"pixel liquid background",
				],
				ru: [
					"кейс threejs лендинга",
					"конверсионный лендинг с анимацией",
					"лендинг с telegram cta",
					"pixel liquid фон",
				],
			},
			ogSubtitle: p(
				"Custom visual layer with direct conversion focus",
				"Кастомный визуальный слой с прямым фокусом на конверсию",
			),
		},
	},
	"price-tag-printer": {
		slug: "price-tag-printer",
		projectId: "price-tag-printer",
		visibility: PROJECT_BY_SLUG["price-tag-printer"].visibility,
		status: PROJECT_BY_SLUG["price-tag-printer"].status,
		hero: {
			badge: p("Next.js App", "Инструмент на Next.js"),
			summary: p(
				"A powerful, full-stack web application designed for retail businesses to create, customize, and print professional price tags with advanced pricing strategies.",
				"Мощное full-stack веб-приложение для ритейла: создание, кастомизация и печать профессиональных ценников со сложными стратегиями ценообразования.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"Retail businesses deal with frequent price updates, requiring scalable and error-free ways to generate price tags from existing databases.",
					"Ритейл-бизнес часто сталкивается с обновлениями цен и требует масштабируемых и безошибочных способов генерации ценников из баз данных.",
				),
				p(
					"Manual preparation took immense staff time and introduced formatting inconsistency across different branches and shifts.",
					"Ручная подготовка отнимала массу времени сотрудников и приводила к нестабильному оформлению в разных точках и сменах.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"The application leverages the Next.js App Router architecture, cleanly separating the frontend, state management, and API layers into distinct boundaries.",
						"Приложение использует архитектуру Next.js App Router, чисто разделяя frontend, управление состоянием и API-слои.",
					),
					p(
						"Data flows through three main Zustand stores (Items, Price Tags, Settings) equipped with persistence middleware to ensure data survives page reloads seamlessly.",
						"Данные проходят через три хранилища Zustand (Товары, Ценники, Настройки) с middleware сохранения, чтобы данные не терялись при перезагрузке.",
					),
					p(
						"An API-First design provides robust endpoints (/api/generate-pdf, /api/preview, /api/themes) allowing programmatic access for broader retail integrations.",
						"API-First дизайн предоставляет надежные эндпоинты (/api/generate-pdf, /api/preview) для программного доступа к функциям автоматизации.",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"A Unified Theme System centralized in the codebase offers 17 pre-configured theme options (light, dark, monochromes) tuned for perfect contrast and readability.",
					"Единая система тем предлагает 17 преднастроенных вариантов (светлые, темные, монохром) с идеально настроенным контрастом и читаемостью.",
				),
				p(
					"Advanced Data Processing handles direct XLSX file parsing, clipboard pasting, and fetching from Google Sheets API, normalizing everything via Zod.",
					"Продвинутая обработка данных парсит XLSX, данные из буфера и Google Sheets, нормализуя всё через Zod-схемы.",
				),
				p(
					"The rendering engine combines Puppeteer on the backend for high-quality PDF generation and client-side canvases for instant real-time previews.",
					"Движок рендера сочетает Puppeteer на бэкенде для качественных PDF и клиентский Canvas для мгновенных превью.",
				),
			]),
			section(
				"tooling",
				p("Tooling and Tech Stack", "Инструменты и технологии"),
				[
					p(
						"Core Framework: Next.js 15 and React 19 power the app, fully typed with strict TypeScript configurations.",
						"Ядро: Next.js 15 и React 19 являются основой приложения, с полной строгой типизацией на TypeScript.",
					),
					p(
						"State Management: Zustand combined with Immer handles complex and nested state mutations easily without re-render bloat.",
						"Управление состоянием: Zustand в связке с Immer легко обрабатывает сложные мутации без лишних рендеров.",
					),
					p(
						"UI & Styling: TailwindCSS combined with Shadcn UI and Framer Motion delivers a fast, extremely polished user interface.",
						"UI и дизайн: TailwindCSS вместе с Shadcn UI и Framer Motion обеспечивают быстрый и невероятно выверенный интерфейс.",
					),
					p(
						"Dev Tools: The codebase is maintained with Biome for blazing fast linting and formatting, alongside Vitest for ESM-native testing.",
						"Dev Tools: Код поддерживается Biome для молниеносного линтинга и форматирования, а Vitest отвечает за тестирование.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"The system replaced ad-hoc formatting and manual typing with predictable, automated production runs yielding consistent print quality.",
					"Система заменила ручную работу предсказуемыми и автоматизированными запусками, выдающими стабильное качество печати.",
				),
				p(
					"The codebase stands as a modern reference for unifying Next.js backend infrastructure, headless browsers, and intricate frontend builders.",
					"Кодовая база стала современным референсом объединения бэкенд-инфраструктуры Next.js, headless-браузеров и сложных UI-билдеров.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Running Puppeteer inside serverless Next.js functions requires meticulous optimization of execution limits and cold start overheads.",
						"Запуск Puppeteer внутри serverless-функций Next.js требует тщательной оптимизации лимитов выполнения и cold starts.",
					),
					p(
						"Keeping three separate Zustand stores synchronized introduces local storage limitations when users load massive inventory datasets.",
						"Синхронизация трех хранилищ Zustand сталкивается с лимитами local storage при загрузке огромных каталогов товаров.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"Why was Zustand chosen over React Context?",
					"Почему Zustand, а не React Context?",
				),
				answer: p(
					"To avoid unnecessary DOM re-renders in a highly interactive builder where performance during drag-and-drop scaling is critical.",
					"Чтобы избежать лишних рендеров DOM в сложном редакторе, где важна производительность интерфейса.",
				),
			},
			{
				question: p(
					"How is PDF generation handled to maintain quality?",
					"Как обеспечено качество генерации PDF?",
				),
				answer: p(
					"The job is pushed to an isolated Node.js API endpoint running Puppeteer to render true-to-life HTML without native browser print quirks.",
					"Задача вынесена в изолированный Node.js API эндпоинт с Puppeteer, чтобы рендерить HTML без багов браузерной печати.",
				),
			},
			{
				question: p(
					"Is the architecture scalable to native apps?",
					"Масштабируема ли архитектура для нативных приложений?",
				),
				answer: p(
					"Yes, the core business logic in Zustand and the API-first design perfectly accommodate a shift to React Native fronts if needed.",
					"Да, основная бизнес-логика в Zustand и API-first дизайн отлично подходят для внедрения React Native в будущем.",
				),
			},
		],
		seo: {
			title: p(
				"Price Tag Printer Case Study - Full-stack Retail App",
				"Кейс Price Tag Printer - Full-stack ритейл приложение",
			),
			description: p(
				"An in-depth review of a Next.js 15 retail price tag generator featuring Zustand state, PDF-lib, and an API-first approach.",
				"Глубокий обзор генератора ценников на Next.js 15 с состоянием Zustand, PDF-lib и API-first подходом.",
			),
			keywords: {
				en: [
					"next.js 15 case study",
					"zustand state management",
					"puppeteer pdf generation",
					"retail automation app",
				],
				ru: [
					"кейс next.js 15",
					"zustand реактивное состояние",
					"puppeteer генерация pdf",
					"автоматизация ритейла",
				],
			},
			ogSubtitle: p(
				"Modern App Router architecture with Headless PDF generation",
				"Архитектура App Router и генерация Headless PDF",
			),
		},
	},
	"psp-book-reader": {
		slug: "psp-book-reader",
		projectId: "psp-book-reader",
		visibility: PROJECT_BY_SLUG["psp-book-reader"].visibility,
		status: PROJECT_BY_SLUG["psp-book-reader"].status,
		hero: {
			badge: p("Embedded EPUB Engine", "Embedded EPUB-движок"),
			summary: p(
				"Native C++ EPUB reader for Sony PSP (480x272 screen, 32MB RAM) focused on stable long-form reading on 2004 handheld hardware.",
				"Нативный C++ EPUB-ридер для Sony PSP (экран 480x272, 32MB RAM), рассчитанный на стабильное чтение длинных текстов на железе 2004 года.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"PSP was designed as a game console, not an e-reader. It has no native EPUB workflow, a low-resolution 480x272 display, and strict memory limits on PSP-1000 (32MB RAM).",
					"PSP проектировалась как игровая консоль, а не как ридер. У нее нет нативного EPUB-сценария, экран 480x272 и жесткие ограничения памяти на PSP-1000 (32MB RAM).",
				),
				p(
					"The target was practical daily reading: fast library scan, chapter navigation, progress restore, readable typography, and battery-aware behavior without UI stalls.",
					"Целью было практичное ежедневное чтение: быстрый скан библиотеки, навигация по главам, восстановление прогресса, читабельная типографика и бережное энергопотребление без фризов UI.",
				),
				p(
					"The project scope covers the full stack: EPUB ZIP/XML parsing, XHTML text extraction, font rendering, input handling, settings persistence, and PSP power integration.",
					"Проект охватывает полный стек: парсинг EPUB ZIP/XML, извлечение текста из XHTML, рендеринг шрифтов, обработку ввода, сохранение настроек и интеграцию с энергоменеджментом PSP.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"The app is built as a modular, event-driven system with a core state machine (`library`, `reader`, `settings`) in the main loop.",
						"Приложение собрано как модульная event-driven система с центральной state machine (`library`, `reader`, `settings`) в основном цикле.",
					),
					p(
						"EPUB parsing uses miniz + pugixml: `container.xml` -> OPF metadata/spine -> NCX navigation mapping, with chapter files loaded on demand.",
						"Парсинг EPUB построен на miniz + pugixml: `container.xml` -> OPF metadata/spine -> NCX-навигация, а файлы глав загружаются по требованию.",
					),
					p(
						"Rendering and text layout are separated from parsing: extracted tokens flow into an incremental layout pipeline and then into cached SDL texture rendering.",
						"Рендер и layout текста отделены от парсинга: извлеченные токены проходят через инкрементальный layout-пайплайн и далее в кэшируемый рендер SDL-текстур.",
					),
				],
				[
					p(
						"Core loop + state machine orchestration",
						"Core loop + оркестрация state machine",
					),
					p(
						"ZIP/XML EPUB pipeline (miniz + pugixml)",
						"ZIP/XML EPUB-пайплайн (miniz + pugixml)",
					),
					p("On-demand chapter loading", "On-demand загрузка глав"),
					p(
						"Library manager + persistent cache",
						"Library manager + персистентный кэш",
					),
					p(
						"TATE mode + input coordinate remapping",
						"TATE-режим + ремап координат ввода",
					),
					p(
						"Reader/settings flows with binary persistence",
						"Reader/settings сценарии с бинарным сохранением",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"Reading progress is anchored by word index and persisted in `config.bin`, so reopening a book restores chapter and position without full re-navigation.",
					"Прогресс чтения привязан к индексу слова и сохраняется в `config.bin`, поэтому книга открывается с нужной главы и позиции без повторной навигации.",
				),
				p(
					"TATE vertical mode rotates rendering and remaps controls, making one-handed and vertical reading usable on the PSP form factor.",
					"Вертикальный TATE-режим поворачивает рендер и ремапит управление, делая вертикальное и одноручное чтение на PSP практически удобным.",
				),
				p(
					"Typography supports Latin/Cyrillic/CJK through font mode switching (Inter + Droid Sans Fallback), with page layout that remains stable under constrained memory.",
					"Типографика поддерживает Latin/Cyrillic/CJK через переключение font mode (Inter + Droid Sans Fallback), при этом layout страниц остается стабильным при ограниченной памяти.",
				),
				p(
					"The library layer handles metadata, cover handling, and cached scanning so large collections remain navigable without repeated heavy parsing.",
					"Библиотечный слой отвечает за метаданные, обложки и кэш сканирования, чтобы большие коллекции оставались навигируемыми без повторного тяжелого парсинга.",
				),
			]),
			section(
				"tooling",
				p(
					"Tooling and low-level optimization",
					"Инструменты и низкоуровневая оптимизация",
				),
				[
					p(
						"The stack uses SDL2, SDL2_ttf/FreeType, SDL2_image, miniz, pugixml, and PSP kernel APIs through PSPSDK Makefile builds.",
						"Стек построен на SDL2, SDL2_ttf/FreeType, SDL2_image, miniz, pugixml и PSP kernel API через сборку PSPSDK Makefile.",
					),
					p(
						"Layout is incremental and frame-budgeted: default 500 words/frame, burst to 1000 when the user is waiting, which keeps navigation responsive during pagination.",
						"Layout инкрементальный и ограничен бюджетом кадра: базово 500 слов/кадр, ускорение до 1000 при ожидании пользователя, что сохраняет отзывчивость навигации во время пагинации.",
					),
					p(
						"Text rendering uses dual-tier LRU caches (120 texture entries + 1000 metrics entries) with FNV-1a keys to avoid repeated glyph and width work.",
						"Рендер текста использует двухуровневый LRU-кэш (120 текстур + 1000 метрик) с FNV-1a ключами, чтобы не пересчитывать глифы и ширины повторно.",
					),
					p(
						"Dynamic power control switches between 333/166, 222/111, and 66/33 MHz tiers with idle detection (>2s) and frame throttling (1ms vs 32ms delay).",
						"Динамическое энергопотребление переключает режимы 333/166, 222/111 и 66/33 MHz по активности (>2с idle) и троттлингу кадров (1ms против 32ms задержки).",
					),
					p(
						"Memory guards reject oversized assets: cover extraction is capped (2MB), and oversize textures are resampled to PSP-friendly limits (including GE 512x512 constraints).",
						"Memory guards отсекают слишком тяжелые ресурсы: извлечение обложек ограничено (2MB), а крупные текстуры ресемплируются под лимиты PSP (включая ограничения GE 512x512).",
					),
				],
				[
					p("SDL2 + PSPSDK runtime", "SDL2 + PSPSDK рантайм"),
					p(
						"Frame-budgeted incremental layout",
						"Инкрементальный layout с budget на кадр",
					),
					p("Dual-tier LRU text cache", "Двухуровневый LRU-кэш текста"),
					p("FNV-1a keyed cache entries", "FNV-1a ключи для кэш-энтри"),
					p(
						"Battery-aware frequency scaling",
						"Частотный скейлинг с учетом батареи",
					),
					p(
						"Hard memory guards for PSP-1000",
						"Жесткие memory guards для PSP-1000",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"The project turns PSP into a reliable EPUB reader with practical library browsing, chapter navigation, and session continuity on real hardware.",
					"Проект превращает PSP в надежный EPUB-ридер с практичной библиотекой, навигацией по главам и сохранением сессии на реальном устройстве.",
				),
				p(
					"The main engineering result is consistency under constraints: predictable frame behavior, controlled memory usage, and readable typography across mixed scripts.",
					"Главный инженерный результат — стабильность в ограничениях: предсказуемое поведение кадров, контролируемая память и читаемая типографика для смешанных письменностей.",
				),
				p(
					"It is not trying to copy tablet readers feature-by-feature; it is a hardware-conscious implementation that stays usable over long reading sessions.",
					"Проект не копирует планшетные ридеры по списку функций; это hardware-conscious реализация, которая остается удобной на длительных сессиях чтения.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Compared to desktop/mobile readers, feature scope is intentionally narrower: performance and stability take priority over full CSS-like layout parity.",
						"По сравнению с desktop/mobile ридерами функциональность намеренно уже: приоритет у производительности и стабильности, а не у полного паритета с CSS-подобным layout.",
					),
					p(
						"Implementation complexity shifts into low-level paths: cache invalidation, memory guards, and power-mode transitions must be explicit and testable.",
						"Сложность реализации уходит в низкоуровневые механики: инвалидация кэша, memory guards и переключения power mode должны быть явными и проверяемыми.",
					),
					p(
						"PSP-specific behavior (GPU limits, controller semantics, clock APIs) requires hardware-aware testing, not only desktop emulation.",
						"PSP-специфика (лимиты GPU, семантика контроллера, clock API) требует hardware-aware тестирования, а не только эмуляции на десктопе.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"What was the hardest engineering challenge?",
					"Что было самым сложным инженерным вызовом?",
				),
				answer: p(
					"Balancing frame responsiveness, layout throughput, and battery behavior at the same time. The system had to stay interactive while parsing and paginating long chapters.",
					"Сбалансировать отзывчивость кадров, скорость layout и энергопотребление одновременно. Система должна оставаться интерактивной во время парсинга и пагинации длинных глав.",
				),
			},
			{
				question: p(
					"How does CJK line breaking work on PSP?",
					"Как реализован перенос CJK-текста на PSP?",
				),
				answer: p(
					"A lightweight UTF-8 heuristic treats typical 3-byte CJK sequences as standalone tokens, so the standard wrapping pipeline can break lines correctly without a heavy script engine.",
					"Легкая UTF-8 эвристика рассматривает типичные 3-байтные CJK-последовательности как отдельные токены, поэтому стандартный пайплайн переноса строк работает корректно без тяжелого script-engine.",
				),
			},
			{
				question: p(
					"How are memory spikes prevented on 32MB RAM?",
					"Как предотвращаются memory spikes при 32MB RAM?",
				),
				answer: p(
					"By strict size-aware loading and cache discipline: ZIP file sizes are checked before allocation, oversized covers are blocked/resampled, and LRU eviction keeps texture/metrics memory bounded.",
					"Через жесткую size-aware загрузку и кэш-дисциплину: размеры ZIP-файлов проверяются до аллокации, слишком крупные обложки блокируются/ресемплируются, а LRU-эвикция удерживает память текстур/метрик в границах.",
				),
			},
		],
		seo: {
			title: p(
				"PSP Book Reader Case Study - C++ EPUB Engine for Sony PSP",
				"Кейс PSP Book Reader - C++ EPUB-движок для Sony PSP",
			),
			description: p(
				"Detailed case study of a native PSP EPUB reader: ZIP/XML parsing, incremental layout, dual-tier LRU text caching, TATE mode, and dynamic CPU frequency scaling.",
				"Подробный кейс нативного PSP EPUB-ридера: ZIP/XML-парсинг, инкрементальный layout, двухуровневый LRU-кэш текста, TATE-режим и динамический CPU frequency scaling.",
			),
			keywords: {
				en: [
					"psp book reader",
					"sony psp epub reader",
					"c++ embedded reader",
					"sdl2 psp application",
					"pspsdk ebook app",
					"cjk line breaking",
					"lru texture cache",
				],
				ru: [
					"epub ридер для psp",
					"sony psp book reader",
					"c++ embedded ридер",
					"sdl2 приложение для psp",
					"pspsdk ebook приложение",
					"перенос строк cjk",
					"lru кэш текстур",
				],
			},
			ogSubtitle: p(
				"ZIP/XML parsing, frame-budgeted layout, and battery-aware runtime",
				"ZIP/XML-парсинг, layout с budget на кадр и battery-aware рантайм",
			),
		},
	},
	"florist-quiz": {
		slug: "florist-quiz",
		projectId: "florist-quiz",
		visibility: PROJECT_BY_SLUG["florist-quiz"].visibility,
		status: PROJECT_BY_SLUG["florist-quiz"].status,
		hero: {
			badge: p("Learning Product", "Обучающий продукт"),
			summary: p(
				"A mobile-first training app for florists with quiz modes, real catalog data, and installable PWA behavior.",
				"Mobile-first тренажер для флористов с разными режимами квиза, реальными данными каталога и PWA-установкой.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"Learning flower names and pricing in retail contexts often relies on static notes and inconsistent onboarding routines.",
					"Обучение названиям цветов и ценам в рознице часто опирается на статичные материалы и неравномерный онбординг.",
				),
				p(
					"The objective was to build a fast, game-like training loop that works on phones and remains usable offline.",
					"Цель — создать быстрый игровой цикл обучения, работающий на телефоне и доступный офлайн.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"The app organizes data around flower entities, quiz modes, and progress interactions with touch-first navigation.",
						"Приложение организовано вокруг сущностей цветов, режимов квиза и сценариев прогресса с touch-first навигацией.",
					),
					p(
						"PWA behavior is integrated to support installability and offline continuity in shop-floor environments.",
						"PWA-функциональность встроена для установки и офлайн-работы в условиях торговой точки.",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"Multiple quiz formats keep repetition effective while avoiding monotony in daily training.",
					"Несколько форматов квиза делают повторение эффективным и не превращают обучение в монотонную рутину.",
				),
				p(
					"Swipe-like navigation and concise feedback loops are tuned for short sessions between operational tasks.",
					"Навигация в стиле swipe и краткие циклы обратной связи оптимизированы под короткие сессии между рабочими задачами.",
				),
			]),
			section(
				"tooling",
				p("Tooling and product stack", "Инструменты и продуктовый стек"),
				[
					p(
						"The app combines mobile-focused UI patterns with PWA capabilities to maintain continuity across unstable connectivity.",
						"Приложение совмещает mobile-ориентированные UI-паттерны и PWA-возможности для стабильной работы при нестабильной связи.",
					),
					p(
						"Data structures were shaped for practical retail relevance rather than generic quiz abstractions.",
						"Структуры данных формировались под реальную розничную применимость, а не под абстрактный «квиз ради квиза».",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"Training shifted from passive memorization to active recall workflows that better fit store-level learning constraints.",
					"Обучение перешло от пассивного запоминания к активному recall-сценарию, который лучше подходит для ограничений розничной среды.",
				),
				p(
					"The product improves repeatability of onboarding and daily reinforcement without requiring separate training infrastructure.",
					"Продукт повышает повторяемость онбординга и ежедневного закрепления без отдельной учебной инфраструктуры.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Mobile-first simplification improves usability but limits depth per screen compared to desktop-heavy training systems.",
						"Mobile-first упрощение улучшает удобство, но ограничивает глубину контента на экране по сравнению с desktop-форматами.",
					),
					p(
						"Offline support adds complexity to data synchronization and update handling.",
						"Офлайн-поддержка усложняет синхронизацию данных и обработку обновлений.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"Is this a game or an education tool?",
					"Это игра или обучающий инструмент?",
				),
				answer: p(
					"It is an education product with game mechanics to improve retention.",
					"Это обучающий продукт с игровыми механиками для лучшего удержания знаний.",
				),
			},
			{
				question: p("Does it work offline?", "Работает ли это офлайн?"),
				answer: p(
					"Yes, it is built as an installable PWA with offline behavior.",
					"Да, это устанавливаемый PWA с офлайн-режимом.",
				),
			},
			{
				question: p(
					"What data is used in quizzes?",
					"Какие данные используются в квизах?",
				),
				answer: p(
					"A real flower and pricing dataset aligned with practical retail usage.",
					"Реальный набор цветов и цен, привязанный к практическим ритейл-сценариям.",
				),
			},
		],
		seo: {
			title: p(
				"Florist Quiz Case Study - Mobile-First Flower Training PWA",
				"Кейс Florist Quiz - Mobile-first PWA для обучения флористов",
			),
			description: p(
				"Detailed case study of a florist training app with quiz modes, real flower datasets, swipe UX, and offline PWA support.",
				"Подробный кейс тренажера для флористов: режимы квиза, реальные данные цветов, swipe UX и офлайн PWA.",
			),
			keywords: {
				en: [
					"florist quiz app",
					"flower training pwa",
					"mobile learning case study",
					"offline quiz app",
				],
				ru: [
					"квиз для флористов",
					"pwa тренажер цветов",
					"mobile обучение кейс",
					"офлайн квиз приложение",
				],
			},
			ogSubtitle: p(
				"Mobile training loops for florist onboarding",
				"Мобильные обучающие циклы для онбординга флористов",
			),
		},
	},
	"schrute-farm": {
		slug: "schrute-farm",
		projectId: "schrute-farm",
		visibility: PROJECT_BY_SLUG["schrute-farm"].visibility,
		status: PROJECT_BY_SLUG["schrute-farm"].status,
		hero: {
			badge: p("Idle Game Product", "Игровой idle-продукт"),
			summary: p(
				"A The Office-inspired idle clicker with progression systems, side modes, and PWA delivery.",
				"Idle-кликер по мотивам The Office с прогрессией, дополнительными режимами и PWA-доставкой.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"The game concept required humor-driven theme execution while preserving a robust progression economy.",
					"Концепция игры требовала юмористической тематической подачи и при этом устойчивой экономики прогрессии.",
				),
				p(
					"The goal was to build replayable idle loops with lightweight onboarding and persistent motivation.",
					"Цель — построить replayable idle-циклы с легким онбордингом и устойчивой мотивацией.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"The Phaser-based loop organizes income generation, upgrades, achievements, and prestige resets under predictable progression pacing.",
						"Игровой цикл на Phaser организует генерацию дохода, апгрейды, достижения и престиж-сбросы в предсказуемом темпе прогрессии.",
					),
					p(
						"Side modes are separated from core progression to keep balance tuning manageable.",
						"Дополнительные режимы отделены от основного цикла, чтобы сохранять управляемость баланса.",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"Core gameplay includes idle earnings, upgrade trees, achievement tracking, and auxiliary modes like Beet Blast and Solitaire.",
					"Базовый геймплей включает idle-доход, дерево апгрейдов, достижения и дополнительные режимы вроде Beet Blast и Solitaire.",
				),
				p(
					"Offline earnings logic keeps progression continuity between sessions.",
					"Логика офлайн-дохода поддерживает непрерывность прогресса между игровыми сессиями.",
				),
			]),
			section(
				"tooling",
				p("Tooling and game stack", "Инструменты и игровой стек"),
				[
					p(
						"Phaser powers the interaction loop while PWA packaging supports repeat access without store friction.",
						"Phaser обеспечивает основной интерактивный цикл, а PWA-упаковка облегчает повторный вход без store-фрикции.",
					),
					p(
						"Balancing and progression tuning are treated as iterative product tasks, not one-time content setup.",
						"Баланс и настройка прогрессии рассматриваются как итерационная продуктовая работа, а не одноразовая настройка контента.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"The project delivers a cohesive idle experience with enough mode variety to sustain longer-term engagement.",
					"Проект дает цельный idle-опыт с достаточным разнообразием режимов для более долгого удержания интереса.",
				),
				p(
					"Progression systems remain understandable for casual players while still allowing depth.",
					"Системы прогрессии остаются понятными для casual-аудитории и при этом сохраняют глубину.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Adding side content increases retention potential but complicates balancing and maintenance.",
						"Добавление бокового контента повышает потенциал удержания, но усложняет баланс и поддержку.",
					),
					p(
						"Theme fidelity must be managed carefully to avoid reducing gameplay clarity.",
						"Тематическую выразительность нужно аккуратно контролировать, чтобы не ухудшать читаемость геймплея.",
					),
				],
			),
		],
		faq: [
			{
				question: p("Is this game only a clicker?", "Это только кликер?"),
				answer: p(
					"No. It includes idle progression, prestige loops, and side game modes.",
					"Нет. Помимо кликера есть idle-прогрессия, престиж и дополнительные игровые режимы.",
				),
			},
			{
				question: p(
					"How is progression preserved between sessions?",
					"Как сохраняется прогресс между сессиями?",
				),
				answer: p(
					"Through offline earnings logic and persistent progression state.",
					"Через офлайн-доход и персистентное состояние прогрессии.",
				),
			},
			{
				question: p(
					"Why use PWA for this game?",
					"Почему игра сделана как PWA?",
				),
				answer: p(
					"To reduce install friction and support repeat short sessions.",
					"Чтобы снизить барьер установки и поддержать частые короткие сессии.",
				),
			},
		],
		seo: {
			title: p(
				"Schrute Farm Case Study - Idle Clicker Game with Phaser",
				"Кейс Schrute Farm - Idle-кликер на Phaser",
			),
			description: p(
				"Detailed case study of a Phaser-based idle game with upgrades, achievements, prestige, side modes, and offline earnings.",
				"Подробный кейс idle-игры на Phaser: апгрейды, достижения, престиж, дополнительные режимы и офлайн-доход.",
			),
			keywords: {
				en: [
					"phaser idle game",
					"clicker game case study",
					"pwa game development",
					"offline earnings game",
				],
				ru: [
					"idle игра на phaser",
					"кейс clicker игры",
					"pwa разработка игры",
					"офлайн доход в игре",
				],
			},
			ogSubtitle: p(
				"Idle progression and minigames in a PWA format",
				"Idle-прогрессия и мини-игры в формате PWA",
			),
		},
	},
};

export function getProjectCaseStudy(slug: string): ProjectCaseStudy | null {
	if (!(slug in PROJECT_CASE_STUDIES)) {
		return null;
	}

	return PROJECT_CASE_STUDIES[slug as ProjectSlug];
}
