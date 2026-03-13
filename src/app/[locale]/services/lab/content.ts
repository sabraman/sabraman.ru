export const LAB_VARIANTS = [
	"v01-editorial-longform",
	"v02-technical-spec",
	"v03-timeline-proof",
	"v04-case-narrative",
	"v05-offer-matrix",
	"v06-single-cta",
	"v07-faq-conversion",
	"v08-scope-pricing",
	"v09-minimal-letter",
	"v10-direct-response",
] as const;

export type LabVariantSlug = (typeof LAB_VARIANTS)[number];
export type Locale = "en" | "ru";

export type SectionItem = {
	title: string;
	description: string;
	result: string;
};

export type LabVariantContent = {
	eyebrow: string;
	heroTitle: string;
	heroLead: string;
	heroPunch: string;
	offersTitle: string;
	proofTitle: string;
	processTitle: string;
	faqTitle: string;
	offers: SectionItem[];
	proof: string[];
	process: string[];
	faq: Array<{ question: string; answer: string }>;
	ctaTitle: string;
	ctaBody: string;
	ctaButton: string;
};

export type LabVariantConfig = {
	slug: LabVariantSlug;
	kind: "longform" | "balanced" | "cta";
	name: string;
	tagline: string;
	styleToken: string;
	content: Record<Locale, LabVariantContent>;
};

const makeContent = (
	ru: Partial<LabVariantContent>,
	en: Partial<LabVariantContent>,
): Record<Locale, LabVariantContent> => ({
	ru: {
		eyebrow: "Услуги",
		heroTitle: "Собираю дизайн и продукт в одной руке",
		heroLead:
			"Работаю как самостоятельный специалист: без лишних созвонов, менеджеров и длинных согласований.",
		heroPunch:
			"Если задача понятна, первую рабочую версию можно увидеть уже в первую неделю.",
		offersTitle: "Что входит в работу",
		proofTitle: "Что вы получите на практике",
		processTitle: "Как проходит проект",
		faqTitle: "Частые вопросы перед стартом",
		offers: [
			{
				title: "Дизайн-система и айдентика",
				description:
					"Собираю визуальную базу, чтобы продукт и маркетинг выглядели как единое целое.",
				result:
					"На выходе: единый стиль, который легко поддерживать в команде.",
			},
			{
				title: "Web-продукт на Next.js",
				description:
					"Делаю сайты и интерфейсы с адекватной скоростью, доступностью и понятной структурой.",
				result:
					"На выходе: рабочий релиз, который можно развивать без переписывания.",
			},
			{
				title: "Telegram боты и mini app",
				description:
					"Автоматизирую операционные задачи и клиентские сценарии внутри Telegram.",
				result:
					"На выходе: меньше рутины и быстрее путь пользователя до действия.",
			},
		],
		proof: [
			"Веду проект лично, без передачи задачи «дальше по цепочке».",
			"Отвечаю за визуал и код в одном контуре, поэтому меньше потерь на стыке.",
			"Работаю итерациями: каждую неделю есть видимый прогресс.",
		],
		process: [
			"Фиксируем цель, границы задачи и критерии результата.",
			"Собираем первый релевантный прототип и проверяем на реальных сценариях.",
			"Доводим до релиза, подключаем метрики и план следующего шага.",
		],
		faq: [
			{
				question: "Берешься за маленькие задачи?",
				answer:
					"Да. Если задача четкая и дает понятный результат, можно начать даже с короткого спринта.",
			},
			{
				question: "Можно только дизайн, без разработки?",
				answer:
					"Можно. Но обычно эффективнее делать связку дизайн + реализация, чтобы не терять контекст.",
			},
			{
				question: "Как быстро стартуем?",
				answer:
					"Обычно старт в течение 2-5 дней после согласования объема и приоритетов.",
			},
		],
		ctaTitle: "Если есть задача, давай разложим ее по шагам",
		ctaBody:
			"Напиши контекст, сроки и бюджетный диапазон. Верну рабочий план без воды.",
		ctaButton: "Обсудить проект",
		...ru,
	},
	en: {
		eyebrow: "Services",
		heroTitle: "Design and product delivery in one pair of hands",
		heroLead:
			"I work as an independent builder. No extra manager layer, no ceremony, no fake process.",
		heroPunch:
			"If the scope is clear, you can get a working first version in the first week.",
		offersTitle: "What is included",
		proofTitle: "What you get in practice",
		processTitle: "How the project runs",
		faqTitle: "Questions before kickoff",
		offers: [
			{
				title: "Brand system and visual direction",
				description:
					"I build a visual base that keeps product and marketing aligned.",
				result:
					"Result: one clear style that your team can maintain without friction.",
			},
			{
				title: "Web product with Next.js",
				description:
					"I ship websites and interfaces with solid speed, accessibility, and structure.",
				result:
					"Result: a usable release you can extend without rewriting from zero.",
			},
			{
				title: "Telegram bots and mini apps",
				description:
					"I automate routine workflows and client actions inside Telegram.",
				result:
					"Result: less manual work and faster user flow to the key action.",
			},
		],
		proof: [
			"You work with me directly from scope to launch.",
			"Design and code are handled in one loop, so handoff loss is minimal.",
			"The process is iterative: each week ends with visible progress.",
		],
		process: [
			"We lock goal, constraints, and success criteria.",
			"I deliver the first relevant prototype and test real user paths.",
			"We ship, measure, and define the next practical iteration.",
		],
		faq: [
			{
				question: "Do you take small tasks?",
				answer:
					"Yes. If the scope is clear and outcome is measurable, we can start with a short sprint.",
			},
			{
				question: "Can we do design only?",
				answer:
					"Yes. But design plus implementation is usually faster and cleaner in practice.",
			},
			{
				question: "How fast can we start?",
				answer:
					"Usually within 2-5 days after scope and priorities are aligned.",
			},
		],
		ctaTitle: "If you have a task, let's break it into clear steps",
		ctaBody:
			"Send context, timeline, and budget range. I will reply with a practical plan.",
		ctaButton: "Discuss project",
		...en,
	},
});

export const LAB_VARIANT_CONFIG: LabVariantConfig[] = [
	{
		slug: "v01-editorial-longform",
		kind: "longform",
		name: "Editorial Longform",
		tagline: "Большой контекст, ясная структура, спокойный ритм",
		styleToken: "editorial",
		content: makeContent(
			{
				heroTitle: "Запускаю сложные продукты без потери фокуса",
				heroLead:
					"Если в проекте много вводных и участников, собираю общую логику, приоритеты и план релиза.",
				heroPunch:
					"Вы получаете понятный план и рабочий прототип, а не бесконечные обсуждения.",
				offersTitle: "Состав проекта по блокам",
				proofTitle: "Критерии, по которым оцениваем результат",
				processTitle: "Этапы от брифа до релиза",
				faqTitle: "Что обычно уточняют команды",
			},
			{
				heroTitle: "I ship complex products without losing focus",
				heroLead:
					"When a project has many constraints and stakeholders, I turn it into one clear delivery path.",
				heroPunch:
					"You get a practical plan and a working prototype instead of endless meetings.",
				offersTitle: "Project scope by workstream",
				proofTitle: "How success is evaluated",
				processTitle: "Stages from brief to release",
				faqTitle: "Typical team questions",
			},
		),
	},
	{
		slug: "v02-technical-spec",
		kind: "longform",
		name: "Technical Spec",
		tagline: "Инженерная подача без маркетинговой обертки",
		styleToken: "spec",
		content: makeContent(
			{
				heroTitle: "Превращаю идею в техзадание и рабочий релиз",
				heroLead:
					"До старта фиксирую scope, архитектуру интерфейсов и критерии качества.",
				heroPunch:
					"Команда сразу понимает, что делаем, в каком порядке и каким будет результат.",
				offersTitle: "Deliverables и технические выходы",
				proofTitle: "Проверки качества и риски",
				processTitle: "Порядок поставки",
				faqTitle: "Вопросы по интеграции",
			},
			{
				heroTitle: "I turn product ideas into clear specs and shipped releases",
				heroLead:
					"Before execution starts, I lock scope boundaries, UX architecture, and quality criteria.",
				heroPunch:
					"Your team knows what we build, in which order, and what done actually means.",
				offersTitle: "Deliverables and technical outputs",
				proofTitle: "Quality checks and delivery risks",
				processTitle: "Execution order",
				faqTitle: "Integration questions",
			},
		),
	},
	{
		slug: "v03-timeline-proof",
		kind: "longform",
		name: "Timeline Proof",
		tagline: "Сильный фокус на этапах, сроках и контрольных точках",
		styleToken: "timeline",
		content: makeContent(
			{
				heroTitle: "Результат по неделям, а не когда-нибудь потом",
				heroLead:
					"Сразу раскладываю проект на этапы с контрольными точками и видимым прогрессом.",
				heroPunch:
					"Каждую неделю вы получаете артефакт: прототип, функционал или релиз.",
				offersTitle: "Что делаем по неделям",
				proofTitle: "Контрольные точки и промежуточные результаты",
				processTitle: "План-график",
				faqTitle: "Вопросы по срокам",
			},
			{
				heroTitle: "Weekly results instead of vague delivery dates",
				heroLead:
					"I split the project into clear milestones with visible progress from week one.",
				heroPunch:
					"Each week ends with an artifact: prototype, feature set, or release candidate.",
				offersTitle: "Weekly scope",
				proofTitle: "Milestones and intermediate outputs",
				processTitle: "Timeline plan",
				faqTitle: "Questions about schedule",
			},
		),
	},
	{
		slug: "v04-case-narrative",
		kind: "longform",
		name: "Case Narrative",
		tagline: "История решения задач с фокусом на принятие решений",
		styleToken: "narrative",
		content: makeContent(
			{
				heroTitle: "Делаю продуктовые решения, которые можно защитить цифрами",
				heroLead:
					"Показываю не только что делаем, но зачем это бизнесу и как проверяем гипотезы.",
				heroPunch: "Каждое решение привязано к цели, метрике и сроку.",
				offersTitle: "Что делаю как исполнитель",
				proofTitle: "Какие изменения видит бизнес",
				processTitle: "Логика принятия решений",
				faqTitle: "Что спрашивают перед стартом",
			},
			{
				heroTitle: "Product decisions you can defend with numbers",
				heroLead:
					"I focus on what we build, why it matters to the business, and how we validate it.",
				heroPunch:
					"Every decision is tied to a goal, a metric, and a delivery date.",
				offersTitle: "What I handle",
				proofTitle: "What changes for the business",
				processTitle: "Decision logic",
				faqTitle: "Questions before starting",
			},
		),
	},
	{
		slug: "v05-offer-matrix",
		kind: "balanced",
		name: "Offer Matrix",
		tagline: "Сбалансированный формат с быстрой ориентацией",
		styleToken: "matrix",
		content: makeContent(
			{
				heroTitle: "Выберите формат работы под задачу и бюджет",
				heroLead:
					"Три сценария сотрудничества: быстрый спринт, полный цикл и поддержка после релиза.",
				heroPunch: "Легко понять, с чего начать уже на этой неделе.",
				offersTitle: "Пакеты и сценарии применения",
				proofTitle: "Какие задачи закрываем",
				processTitle: "Как выберем подходящий формат",
				faqTitle: "Главные вопросы по выбору",
			},
			{
				heroTitle: "Pick the engagement model that fits your scope and budget",
				heroLead:
					"Three collaboration paths: quick sprint, full-cycle build, and post-launch support.",
				heroPunch: "You can decide where to start in minutes.",
				offersTitle: "Packages and use cases",
				proofTitle: "What problems are covered",
				processTitle: "How we choose the right format",
				faqTitle: "Top selection questions",
			},
		),
	},
	{
		slug: "v06-single-cta",
		kind: "cta",
		name: "Single CTA",
		tagline: "Минимум отвлечений, один главный шаг",
		styleToken: "singleCta",
		content: makeContent(
			{
				heroTitle: "Нужен релиз в ближайшие недели?",
				heroLead:
					"Берусь за задачи, где важны скорость, качество и личная ответственность.",
				heroPunch:
					"Пишите вводные, и я верну план первого спринта без лишней теории.",
				offersTitle: "Что можно запустить быстро",
				proofTitle: "Почему это срабатывает",
				processTitle: "Как стартуем",
				faqTitle: "Перед первым сообщением",
				ctaTitle: "Есть задача? Напиши одним сообщением",
				ctaBody:
					"Опиши цель, срок и бюджетную вилку. Я отвечу конкретным планом и ближайшим шагом.",
			},
			{
				heroTitle: "Need a release in the next few weeks?",
				heroLead:
					"I work on projects where speed, quality, and personal ownership all matter.",
				heroPunch:
					"Send the context and get a concrete first-sprint plan, not a generic deck.",
				offersTitle: "What can launch fast",
				proofTitle: "Why this approach works",
				processTitle: "How we start",
				faqTitle: "Before your first message",
				ctaTitle: "Have a task? Send one clear message",
				ctaBody:
					"Share goal, timeline, and budget range. I will reply with a concrete plan and first step.",
			},
		),
	},
	{
		slug: "v07-faq-conversion",
		kind: "balanced",
		name: "FAQ Conversion",
		tagline: "Снимаем возражения до первого сообщения",
		styleToken: "faq",
		content: makeContent(
			{
				heroTitle: "Закрываю ключевые вопросы до старта проекта",
				heroLead:
					"Сроки, процесс, риски и формат коммуникации фиксируем заранее.",
				heroPunch: "Меньше неопределенности, быстрее старт и меньше правок.",
				offersTitle: "Что именно получите",
				proofTitle: "Какие риски снимаем",
				processTitle: "План работы без сюрпризов",
				faqTitle: "Ответы до начала проекта",
			},
			{
				heroTitle: "I remove key objections before kickoff",
				heroLead:
					"We align timeline, process, communication, and delivery risks upfront.",
				heroPunch:
					"That means less uncertainty, faster start, and fewer late-stage edits.",
				offersTitle: "Exactly what you get",
				proofTitle: "Which risks are reduced",
				processTitle: "Project flow without surprises",
				faqTitle: "Answers before kickoff",
			},
		),
	},
	{
		slug: "v08-scope-pricing",
		kind: "balanced",
		name: "Scope Pricing",
		tagline: "Прозрачный разговор про объем и бюджет",
		styleToken: "scope",
		content: makeContent(
			{
				heroTitle: "Прозрачный объем работ и честный бюджет",
				heroLead:
					"Здесь акцент на прозрачности: что входит в работу, а что остается за рамками.",
				heroPunch:
					"Вы понимаете экономику проекта до подписания и без скрытых доплат.",
				offersTitle: "Состав работ и ценовые диапазоны",
				proofTitle: "Где экономим бюджет без потери качества",
				processTitle: "Как фиксируем объем",
				faqTitle: "Вопросы о деньгах и сроках",
				offers: [
					{
						title: "Sprint: аудит и прототип",
						description:
							"1-2 недели на диагностику, приоритизацию и рабочий прототип ключевого экрана.",
						result: "Вы понимаете реальный объем работ до большого бюджета.",
					},
					{
						title: "Build: дизайн + разработка",
						description:
							"4-8 недель на реализацию сайта или web-продукта с релизом в прод.",
						result: "Получаете готовый продукт и базу для дальнейшего роста.",
					},
					{
						title: "Support: развитие после релиза",
						description:
							"Итерации по данным, улучшение UX, технический долг и новые функции.",
						result: "Продукт не замирает после запуска и растет управляемо.",
					},
				],
			},
			{
				heroTitle: "Transparent scope and realistic budget",
				heroLead:
					"This version is explicit about what is included and what is out of scope.",
				heroPunch:
					"You see project economics upfront, with no hidden add-ons later.",
				offersTitle: "Work scope and budget ranges",
				proofTitle: "Where we save budget without quality loss",
				processTitle: "How scope is locked",
				faqTitle: "Questions about cost and timing",
				offers: [
					{
						title: "Sprint: audit and prototype",
						description:
							"1-2 weeks to diagnose priorities and ship a usable prototype of the key flow.",
						result:
							"You get realistic scope visibility before committing bigger budget.",
					},
					{
						title: "Build: design + development",
						description:
							"4-8 weeks to ship a website or web product to production.",
						result:
							"You get a live product and a clean base for future iterations.",
					},
					{
						title: "Support: post-launch growth",
						description:
							"Data-driven iterations, UX polish, technical debt cleanup, and new features.",
						result: "The product keeps improving after launch, not freezing.",
					},
				],
			},
		),
	},
	{
		slug: "v09-minimal-letter",
		kind: "cta",
		name: "Minimal Letter",
		tagline: "Почти личное письмо вместо продающей страницы",
		styleToken: "letter",
		content: makeContent(
			{
				heroTitle: "Я лично веду проект от задачи до релиза",
				heroLead:
					"Без студийного слоя и лишних ролей: вы общаетесь напрямую со мной.",
				heroPunch:
					"Короткая коммуникация, быстрые решения, осязаемый результат.",
				offersTitle: "Чем я могу помочь прямо сейчас",
				proofTitle: "Почему мне доверяют задачи",
				processTitle: "Как начнем работу",
				faqTitle: "Если остались вопросы",
				ctaTitle: "Напиши, что болит в продукте",
				ctaBody:
					"Можно коротко: где затык, к какому сроку нужен результат и какой бюджет рассматриваете.",
			},
			{
				heroTitle: "I lead the project myself from brief to release",
				heroLead:
					"No agency layers or unnecessary roles. You work with me directly.",
				heroPunch:
					"Short communication, fast decisions, and delivery you can track.",
				offersTitle: "How I can help right now",
				proofTitle: "Why clients trust me with delivery",
				processTitle: "How we start",
				faqTitle: "If you still have questions",
				ctaTitle: "Send what hurts in your product",
				ctaBody:
					"You can keep it short: bottleneck, desired timeline, and budget range.",
			},
		),
	},
	{
		slug: "v10-direct-response",
		kind: "cta",
		name: "Direct Response",
		tagline: "Жесткий фокус на действии и ценности",
		styleToken: "direct",
		content: makeContent(
			{
				heroTitle: "Есть продуктовая боль? Закроем ее в ближайший спринт",
				heroLead:
					"Фокус на конкретной проблеме: находим узкое место, делаем решение, выкатываем в прод.",
				heroPunch: "Никакой воды. Только план, сроки и измеримый результат.",
				offersTitle: "Решения под типовые боли",
				proofTitle: "Что меняется после запуска",
				processTitle: "Три шага до релиза",
				faqTitle: "Быстрые ответы",
				ctaTitle: "Нужен результат, а не длинный процесс?",
				ctaBody:
					"Напишите задачу сегодня. В ответ получите план с этапами, сроками и первым релизом.",
			},
			{
				heroTitle:
					"Have a product bottleneck? We can fix it in the next sprint",
				heroLead:
					"Focused execution: identify the bottleneck, ship the fix, release to production.",
				heroPunch: "No fluff. Just plan, timeline, and measurable outcome.",
				offersTitle: "Solutions for common bottlenecks",
				proofTitle: "What changes after launch",
				processTitle: "Three steps to release",
				faqTitle: "Quick answers",
				ctaTitle: "Need outcome, not process theater?",
				ctaBody:
					"Send your task today. You get a plan with stages, timeline, and first release target.",
			},
		),
	},
];

export function getLocale(locale: string): Locale {
	return locale === "ru" ? "ru" : "en";
}

export function getLocalePrefix(locale: Locale) {
	return locale === "ru" ? "/ru" : "";
}

export function getVariantBySlug(slug: string) {
	return LAB_VARIANT_CONFIG.find((variant) => variant.slug === slug);
}

export function getKindLabel(kind: LabVariantConfig["kind"], locale: Locale) {
	if (locale === "ru") {
		if (kind === "longform") return "Longform";
		if (kind === "balanced") return "Balanced";
		return "CTA-heavy";
	}

	if (kind === "longform") return "Longform";
	if (kind === "balanced") return "Balanced";
	return "CTA-heavy";
}

export function getStyleClasses(styleToken: string) {
	const shared = {
		container: "mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20",
		heroTitle:
			"font-extrabold leading-[0.94] tracking-tight text-3xl md:text-5xl lg:text-6xl",
		heroLead:
			"max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg",
		heroPunch: "max-w-3xl font-medium text-sm leading-relaxed md:text-base",
		tag: "inline-flex rounded-full border border-accent/30 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em]",
		sectionTitle: "font-bold text-2xl md:text-3xl",
		itemRow: "border-b border-border/80 py-5 last:border-b-0",
		ctaButton:
			"inline-flex items-center rounded-xl bg-accent px-5 py-3 font-semibold text-accent-foreground text-sm transition-all hover:-translate-y-0.5 hover:opacity-90",
	};

	const map: Record<string, Partial<typeof shared>> = {
		editorial: {
			container: `${shared.container} space-y-16`,
			heroTitle: `${shared.heroTitle} max-w-4xl`,
		},
		spec: {
			container: `${shared.container} space-y-10`,
			tag: `${shared.tag} rounded-md border-primary/40`,
			itemRow: "border-primary/20 border-l-2 py-4 pl-4 last:border-b",
		},
		timeline: {
			container: `${shared.container} space-y-14`,
			itemRow:
				"relative border-border/70 border-b py-5 pl-5 before:absolute before:left-0 before:top-8 before:h-2 before:w-2 before:rounded-full before:bg-accent",
		},
		narrative: {
			container: `${shared.container} space-y-12`,
			heroTitle: `${shared.heroTitle} max-w-4xl`,
			itemRow: "border-border/80 border-b py-6",
		},
		matrix: {
			container: `${shared.container} space-y-10`,
			itemRow: "border-border/80 border-b py-4",
			heroPunch: "max-w-2xl font-medium text-sm",
		},
		singleCta: {
			container: `${shared.container} space-y-8`,
			heroTitle: `${shared.heroTitle} max-w-3xl text-4xl md:text-6xl`,
			itemRow: "border-border/80 border-b py-3",
		},
		faq: {
			container: `${shared.container} space-y-10`,
			tag: `${shared.tag} border-accent/40 bg-accent/10`,
		},
		scope: {
			container: `${shared.container} space-y-10`,
			itemRow: "border-border/80 border-b py-4",
		},
		letter: {
			container: `${shared.container} max-w-4xl space-y-10`,
			heroTitle: `${shared.heroTitle} text-3xl md:text-5xl`,
			tag: `${shared.tag} rounded-none border-x-0 border-t-0`,
		},
		direct: {
			container: `${shared.container} space-y-9`,
			heroTitle: `${shared.heroTitle} max-w-4xl md:text-6xl`,
			ctaButton:
				"inline-flex items-center rounded-none bg-accent px-6 py-3 font-semibold text-accent-foreground text-sm uppercase tracking-[0.12em] transition-all hover:opacity-90",
		},
	};

	return {
		...shared,
		...(map[styleToken] ?? {}),
	};
}
