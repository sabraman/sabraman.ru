import type { LocaleText } from "./projects";

export type BlogCategory = "SEO" | "Architecture" | "Engineering";

export type BlogBlock =
	| { type: "paragraph"; content: LocaleText }
	| { type: "heading"; content: LocaleText; level: 2 | 3 }
	| { type: "bullets"; items: LocaleText[] }
	| { type: "quote"; content: LocaleText; author?: LocaleText }
	| {
			type: "callout";
			content: LocaleText;
			kind: "info" | "warning" | "success";
	  };

export type BlogPost = {
	slug: string;
	category: BlogCategory;
	publishedAt: string;
	updatedAt: string;
	readTime: LocaleText;
	title: LocaleText;
	summary: LocaleText;
	blocks: BlogBlock[];
	seo: {
		title: LocaleText;
		description: LocaleText;
		keywords: {
			en: string[];
			ru: string[];
		};
	};
};

const p = (en: string, ru: string): LocaleText => ({ en, ru });

export const BLOG_POSTS: BlogPost[] = [
	{
		slug: "why-one-site-is-not-enough",
		category: "Architecture",
		publishedAt: "2026-06-12",
		updatedAt: "2026-06-14",
		readTime: p("4 min read", "4 мин чтения"),
		title: p(
			"Why a Single Website Was Not Enough for Lunaria",
			"Почему для Lunaria одного сайта было бы мало",
		),
		summary: p(
			"How dividing a floral brand presence into dedicated satellite sites captured distinct search intents and avoided critical user experience compromises.",
			"Как разделение бренда на отдельные сайты-сателлиты помогло охватить разные поисковые интенты и избежать компромиссов в интерфейсе.",
		),
		seo: {
			title: p(
				"Why a Single Website Was Not Enough for Lunaria - Sabraman",
				"Почему для Lunaria одного сайта было бы мало - Sabraman",
			),
			description: p(
				"Case study of splitting a brand into modular search satellites to avoid design compromises and target distinct search intents.",
				"Разбор кейса разделения бренда на сателлиты для исключения компромиссов в дизайне и таргетирования разных поисковых интентов.",
			),
			keywords: {
				en: [
					"multi-site architecture",
					"local seo",
					"brand satellites",
					"user intent mapping",
				],
				ru: [
					"мультисайтовая архитектура",
					"локальное seo",
					"сателлиты бренда",
					"поисковые интенты",
				],
			},
		},
		blocks: [
			{
				type: "paragraph",
				content: p(
					"At first, the task sounded simple: redesign the website for the local floral brand Lunaria. But as I mapped out the business requirements and analyzed the customer journeys, it became clear: a single website would become a giant compromise. I would have to force-fit a B2B corporate portal, franchise metrics, venue lists, and general catalog ordering into one layout.",
					"Сначала задача звучала просто: обновить сайт бренда Lunaria. Но чем дальше я раскладывал бизнес-требования и анализировал пути пользователей, тем очевиднее становилось: один сайт превратится в огромный компромисс. Мне пришлось бы уживать B2B-портал, франшизу, базу площадок и классическую витрину доставки в рамках одного интерфейса.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"The Problem of Mixed Intents",
					"Проблема смешанных интентов",
				),
			},
			{
				type: "paragraph",
				content: p(
					"A floral brand operates across very different levels of urgency and target audiences. A retail customer wants to order a bouquet today; they care about price, flowers in stock, delivery time, and actual photos. A bride preparing for a wedding wants calm guidance: theme palettes, checklists, budget calculators, and venue coordination. A potential franchisee looks at business metrics: initial investments, supplier terms, florist training, and payback timelines. A B2B client seeks contracts, corporate terms, and invoice templates.",
					"Цветочный бренд работает с аудиториями разной степени срочности. Розничному клиенту нужен букет сегодня: цена, доставка, реальные фото. Невеста ищет спокойствие: цветовые палитры, чек-листы и координацию площадок. Франчайзи смотрит на бизнес: паушальный взнос, окупаемость, поставщики. B2B-клиенту нужны договоры, закрывающие документы и коммерческие условия.",
				),
			},
			{
				type: "paragraph",
				content: p(
					"These audiences don't just have different needs — they have fundamentally different emotional states when they arrive. A retail buyer is transactional and impatient. A bride is anxious and overwhelmed. A franchisee is analytical and skeptical. Forcing all three into the same navigation structure means designing for all of them poorly. The layout becomes cluttered, the copy becomes generic, and the conversion paths become invisible.",
					"Эти аудитории не просто хотят разного — они приходят в принципиально разных эмоциональных состояниях. Розничный покупатель торопится и нацелен на транзакцию. Невеста тревожится и перегружена информацией. Франчайзи аналитичен и скептичен. Если загнать всех троих в одну навигацию, каждому из них будет неудобно: верстка перегружена, тексты обезличены, а пути конверсии смазаны.",
				),
			},
			{
				type: "quote",
				content: p(
					"These are not different sections of the same menu. These are entirely different conversations.",
					"Это не разные разделы одного меню. Это разные разговоры.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"The UX Cost of a Single-Domain Strategy",
					"UX-цена стратегии одного домена",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"Navigation Bloat: A single mega-menu trying to serve retail, weddings, B2B, and franchise simultaneously creates cognitive overload for every visitor.",
						"Перегруженная навигация: мега-меню, обслуживающее розницу, свадьбы, B2B и франшизу одновременно, создает когнитивную перегрузку для каждого посетителя.",
					),
					p(
						"SEO Dilution: A single domain trying to rank for 'buy bouquet fast' and 'flower franchise ROI calculator' simultaneously will rank well for neither.",
						"Размытие SEO: домен, претендующий одновременно на 'купить букет быстро' и 'окупаемость цветочной франшизы', не займет топ ни по одному из запросов.",
					),
					p(
						"Copy Conflicts: The tone for a retail homepage ('Order in 3 clicks, delivered in 2 hours') completely contradicts the tone needed for franchise partners ('Proven operational model, 14-month payback').",
						"Конфликт тональности: заголовок витрины 'Заказ за 3 клика, доставка за 2 часа' полностью противоречит нужному тону для франчайзи: 'Отработанная операционная модель, окупаемость 14 месяцев'.",
					),
					p(
						"Mobile UX Fragmentation: On mobile, a combined site forces compromises in touch target sizes, image density, and page weight that hurt every user segment.",
						"Мобильная фрагментация: объединенный сайт вынуждает идти на компромисс по размерам элементов управления, плотности изображений и весу страницы — в ущерб каждой аудитории.",
					),
				],
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"The Modular Satellite Solution",
					"Решение: модульные сателлиты",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Instead of merging all these intents onto a single domain, I decided to separate them into dedicated, lightweight sites (satellites) within a single codebase. Each satellite owns its domain, its design language variants, its content structure, and its conversion funnel. They share only brand assets, UI component libraries, and the analytics pipeline.",
					"Вместо слияния всех этих интентов на одном домене я разделил их на выделенные, легкие сайты-сателлиты в рамках одной кодовой базы. Каждый сателлит владеет своим доменом, вариантами дизайн-языка, структурой контента и воронкой конверсии. Общими остаются только ресурсы бренда, библиотека UI-компонентов и аналитический пайплайн.",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"Main Retail Store: catalog, quick checkout, seasonal recommendations, flower care tips.",
						"Основной магазин: витрина, быстрая покупка, сезонные подборки, уход за цветами.",
					),
					p(
						"Franchise Portal: investments, location requirements, onboarding, operational guides.",
						"Франшиза: инвестиции, требования к помещению, база знаний, операционные статьи.",
					),
					p(
						"Wedding Media: editorial content focused on anxiety-free wedding preparation.",
						"Свадебное медиа: статьи о подготовке к свадьбе без стресса.",
					),
					p(
						"Venues Directory: event locations in Kazan (lofts, restaurants, halls) mapped to floristry templates.",
						"Каталог площадок: база ресторанов, лофтов и залов Казани с привязкой к готовым шаблонам оформления.",
					),
					p(
						"B2B Portal: corporate terms, seasonal subscriptions, contract templates.",
						"B2B портал: корпоративное обслуживание, подписка на цветы, шаблоны договоров.",
					),
				],
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Naming and Domain Strategy",
					"Стратегия именования доменов",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Choosing domain names for satellites is not just a branding exercise — it's an SEO decision. I used descriptive, intent-first domain names rather than brand-extension names. A domain like 'lunaria-svadba.ru' immediately signals topical relevance to wedding-related crawlers and AI retrieval systems. This creates a topical authority signal that a subfolder like 'lunaria.ru/weddings' can never fully replicate, because subfolders share domain authority across all content categories.",
					"Выбор доменных имён для сателлитов — не просто брендинговое решение, а SEO-стратегия. Я использовал описательные, интент-ориентированные имена, а не расширения бренда. Домен вида 'lunaria-svadba.ru' сразу сигнализирует о тематической релевантности свадебным поисковым краулерам и AI-системам поиска. Это создаёт сигнал тематического авторитета, который подпапка 'lunaria.ru/weddings' никогда не сможет полностью воспроизвести, поскольку подпапки делят авторитет домена между всеми категориями контента.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p("The Strategic Advantages", "Стратегический эффект"),
			},
			{
				type: "paragraph",
				content: p(
					"By isolating domains, I achieved two critical goals. First, the user interface remains completely clean and tailored to a specific task. Second, search engines (and AI retrievers) easily understand the authority of each domain because there is no keyword dilution. A bride starts her journey looking for a venue; by helping her choose a venue on my directory satellite, Lunaria establishes trust before she even begins searching for a wedding florist.",
					"Разделив домены, я решил две задачи. Во-первых, интерфейс остался чистым и заточенным под одну цель. Во-вторых, поисковикам и AI-ассистентам легче определить тематический авторитет сайтов: семантика не размыта. Свадебный путь часто начинается с поиска площадки; помогая невесте выбрать ресторан на моем сателлите, Lunaria завоевывает доверие еще до того, как встанет вопрос о букете.",
				),
			},
			{
				type: "callout",
				kind: "success",
				content: p(
					"This approach turns the website from a standard catalog into a multi-intent regional brand moat, capturing organic search traffic at the earliest stages of the user journey.",
					"Этот подход превращает сайт из обычной витрины в региональный ров бренда, цепляя органический трафик на самых ранних этапах пути клиента.",
				),
			},
		],
	},
	{
		slug: "seo-2026-ai-search",
		category: "SEO",
		publishedAt: "2026-06-13",
		updatedAt: "2026-06-14",
		readTime: p("6 min read", "6 мин чтения"),
		title: p(
			"SEO is Not Dead in 2026: Designing Content for AI Search Engines",
			"SEO в 2026 не умерло. Как оптимизировать под AI-поиск",
		),
		summary: p(
			"Why classic SEO is evolving into Generative Engine Optimization (GEO). How to design content for apophatic AI, contrastive training representations, and multi-stage RAG pipelines.",
			"Почему классическое SEO превращается в оптимизацию под генеративные ответы (GEO). Как проектировать контент под апофатический ИИ, контрастивное обучение и многоэтапные RAG-пайплайны.",
		),
		seo: {
			title: p(
				"SEO in 2026: Generative Engine Optimization (GEO) - Sabraman",
				"SEO в 2026: Оптимизация под AI-поиск (GEO) - Sabraman",
			),
			description: p(
				"Discover the principles of GEO (Generative Engine Optimization), apophatic AI representation, Triplet Loss optimization, and structuring content for Gemini, ChatGPT, and Perplexity RAG pipelines.",
				"Изучите принципы GEO (Generative Engine Optimization), репрезентации в апофатическом ИИ, оптимизации под Triplet Loss и структурирования контента для RAG-конвейеров Gemini, ChatGPT и Perplexity.",
			),
			keywords: {
				en: [
					"generative engine optimization",
					"geo seo 2026",
					"apophatic ai",
					"triplet loss optimization",
					"rag pipeline citation",
					"share of voice ai search",
				],
				ru: [
					"генеративная оптимизация",
					"geo seo в 2026",
					"апофатический ии",
					"оптимизация под triplet loss",
					"цитирование в rag пайплайнах",
					"доля голоса в ai поиске",
				],
			},
		},
		blocks: [
			{
				type: "paragraph",
				content: p(
					"Every year, someone announces that SEO is dead. In 2026, with the dominance of Gemini, ChatGPT, Perplexity, and local AI assistants answering user queries directly, this claim sounds convincing. But the truth is more nuanced: SEO isn't dead; the requirements have just become much stricter. Generative answers do not write facts out of thin air; they must retrieve and cite trusted, structured, and authoritative sources. We are witnessing the evolution from classic Search Engine Optimization into Generative Engine Optimization (GEO).",
					"Каждый год кто-то хоронит SEO. В 2026 году на фоне популярности Gemini, ChatGPT, Perplexity и встроенных ассистентов, отвечающих пользователю прямо в выдаче, это звучит убедительно. Но реальность тоньше: SEO живет, просто требования выросли. Генеративные ответы не придумывают факты из воздуха — им нужны авторитетные, структурированные и проверенные источники для цитирования. Мы наблюдаем переход от классического поискового продвижения к оптимизации под генеративные ответы (GEO).",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Apophatic AI and Latent Space Positioning",
					"Апофатический ИИ и позиционирование в латентном пространстве",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Modern Large Language Models (LLMs) do not search for words; they locate concepts in a multi-dimensional latent space. To position your brand effectively, you must understand 'apophatic AI' — the principle that a model understands what a brand is by defining what it is not. By establishing clear contrastive boundaries in your content, you help the model construct a distinct 'Attractor' (a stable state in the model's cognitive landscape) for your business.",
					"Современные большие языковые модели (LLM) ищут не слова, а позиционируют концепты в многомерном латентном пространстве. Чтобы занять там место, важно понимать принцип «апофатического ИИ»: модель понимает, чем является бренд, через жесткое определение того, чем он не является. Описывая четкие контрастирующие границы в контенте, вы помогаете модели сформировать устойчивый «аттрактор» (стабильную область в когнитивном ландшафте модели) для вашего бизнеса.",
				),
			},
			{
				type: "paragraph",
				content: p(
					"To influence this latent mapping, we must align our content with the models' contrastive learning loss functions, specifically Triplet Loss. The triplet loss function compares an anchor (your brand) to a positive example (a core service) and a negative example (a common competitor or irrelevant category) to minimize the distance between anchor and positive while maximizing the distance to the negative. By explicitly writing content that defines your niche ('unlike mass-market aggregators, our floral satellites only coordinate Kazan venues with ceiling heights above 4 meters'), you provide the 'hard negatives' needed to anchor your brand firmly in the model's semantic weights.",
					"Для влияния на это латентное картирование мы должны оптимизировать контент под функции потерь контрастивного обучения, в частности, Triplet Loss. Эта функция сравнивает якорь (ваш бренд) с положительным примером (ключевой услугой) и отрицательным (прямой конкурент или нерелевантная категория), минимизируя расстояние между якорем и позитивом и максимизируя — к негативу. Явно прописывая контрастные сравнения («в отличие от масс-маркет агрегаторов, наши флористические сателлиты работают только с площадками Казани с высотой потолков от 4 метров»), вы даете модели те самые «сложные негативные примеры» (hard negatives), которые прочно фиксируют ваш бренд в ее весах.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"The 4-Step RAG Retrieval Pipeline",
					"4-этапный RAG-конвейер извлечения информации",
				),
			},
			{
				type: "paragraph",
				content: p(
					"When a user triggers an AI search, the engine executes a Retrieval-Augmented Generation (RAG) pipeline. Understanding these four stages is crucial for content design:",
					"Когда пользователь делает запрос в AI-поиске, система запускает RAG-конвейер (Retrieval-Augmented Generation). Для правильного проектирования контента необходимо понимать его четыре этапа:",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"1. Query Decomposition: The AI engine parses the conversational query, breaks it down into sub-questions, and generates optimized semantic search strings.",
						"1. Декомпозиция запроса: AI-движок разбирает разговорный запрос пользователя, разбивает его на подвопросы и генерирует оптимизированные строки для семантического поиска.",
					),
					p(
						"2. Document Retrieval: The engine runs parallel queries across semantic vector indexes and keyword BM25 indexes, merging results into a unified source list.",
						"2. Извлечение документов (Retrieval): Движок выполняет параллельные запросы по семантическим векторным индексам и текстовым индексам BM25, объединяя результаты в единый список источников.",
					),
					p(
						"3. Summarization & Extraction: The system isolates key text blocks (chunks) from retrieved pages and extracts specific data entities, filtering out conversational filler.",
						"3. Экстракция и саммаризация: Система выделяет ключевые текстовые блоки (чанки) из найденных страниц и извлекает конкретные сущности, отсекая лишние вводные слова.",
					),
					p(
						"4. Answer Synthesis & Verification: The generation model synthesizes the final answer, checking for consistency across multiple sources, and embeds citation links to the most trusted sites.",
						"4. Синтез ответов и верификация: Генеративная модель синтезирует итоговый ответ, сверяя факты между несколькими источниками, и проставляет ссылки-цитаты на самые надежные сайты.",
					),
				],
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"The 7 Pillars of Generative Engine Optimization (GEO)",
					"7 столпов оптимизации под генеративные движки (GEO)",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Based on recent studies on AI search behaviors, we developed the 7 Pillars of GEO to ensure our content is prioritized during the RAG retrieval phase:",
					"На основе исследований поведения AI-поисковиков мы выработали 7 столпов GEO, гарантирующих приоритетное извлечение нашего контента:",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"Answer-First Layout: AI search chunking algorithms prioritize the first 30% of a document. Place a direct, high-density answer (2-5 sentences) immediately after your H2/H3 headings.",
						"Принцип Answer-First: Алгоритмы чанкинга AI-поисковиков отдают приоритет первым 30% документа. Размещайте прямой, плотный по смыслу ответ (2–5 предложений) сразу после заголовков H2/H3.",
					),
					p(
						"Extreme Fact Density: Replace marketing fluff with hard data. Generative engines look for concrete specifications, capacities, dates, and names to build authority scores.",
						"Максимальная плотность фактов: Замените маркетинговую «воду» точными данными. Генеративные системы ищут конкретные характеристики, емкости, даты и имена для построения авторитетности.",
					),
					p(
						"E-E-A-T Signatures: Establish author credentials clearly. Include verifiable bios, links to professional portfolios, and schema markers proving human expertise.",
						"Подписи E-E-A-T: Четко обозначайте авторов контента. Добавляйте проверяемые биографии, ссылки на портфолио и разметку, доказывающую экспертизу человека.",
					),
					p(
						"Structured JSON-LD Schema: Mark up all content. Use Schema.org types (FAQPage, TechArticle, Product, Organization) to feed clean, pre-parsed facts straight to the crawlers.",
						"Структурированная Schema.org разметка: Размечайте абсолютно всё. Используйте типы FAQPage, TechArticle, Product, Organization для передачи структурированных фактов ботам напрямую.",
					),
					p(
						"Clear Professional Style: AI classifiers evaluate readability and style. Write in an authoritative, clear, and objective tone, avoiding clickbait.",
						"Строгий профессиональный стиль: Классификаторы AI оценивают читаемость и стиль. Пишите авторитетным, ясным и объективным тоном, избегая кликбейта.",
					),
					p(
						"Cross-Domain Consensus: RAG synthesis modules verify facts across multiple sources. Having independent satellite sites corroborate your core brand details builds a consensus that forces AI to trust your data.",
						"Кросс-доменный консенсус: Модули RAG-синтеза проверяют информацию по разным источникам. Наличие независимых сайтов-сателлитов, подтверждающих детали вашего бренда, формирует консенсус доверия ИИ.",
					),
					p(
						"Semantic Depth: Ensure your content clusters are exhaustive. Cover a topic fully to maintain strong semantic proximity within the vector space.",
						"Семантическая глубина: Убедитесь, что ваши контентные кластеры исчерпывающи. Полностью раскрывайте тему для поддержания высокой семантической близости в векторном пространстве.",
					),
				],
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Measuring SEO Success: The New Metrics for 2026",
					"Измерение успеха SEO: Новые метрики в 2026 году",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Traditional metrics like keyword rank and pageviews are no longer sufficient. In the era of zero-click generative search, we measure success using four key metrics:",
					"Традиционных метрик вроде позиций по ключам и просмотров страниц больше недостаточно. В эру беспереходного (zero-click) поиска мы оцениваем эффективность по четырем основным метрикам:",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"Share of Voice (SoV): The percentage of generative responses in your niche that mention or recommend your brand name.",
						"Доля голоса (Share of Voice, SoV): Процент генеративных ответов в вашей нише, которые упоминают или рекомендуют ваш бренд.",
					),
					p(
						"Answer Reach: The percentage of semantic search queries where your content chunks are retrieved in the system's context window.",
						"Охват ответов (Answer Reach): Доля семантических поисковых запросов, при которых текстовые чанки вашего сайта извлекаются в контекстное окно системы.",
					),
					p(
						"Citation Rate: How frequently your domain is cited as an active hyperlink source in the generated summaries.",
						"Показатель цитирования (Citation Rate): Частота, с которой ваш домен указывается в качестве кликабельной ссылки-источника в сгенерированных ответах.",
					),
					p(
						"AI Referral Traffic: The volume of highly-qualified organic traffic coming directly from citations within AI engines like Perplexity, Gemini, and ChatGPT.",
						"AI-реферальный трафик: Объем органических переходов на сайт по ссылкам-цитатам из генеративных ответов Perplexity, Gemini и ChatGPT.",
					),
				],
			},
			{
				type: "quote",
				content: p(
					"If your content is not structured for RAG pipelines, it will be excluded from the context window of generative engines, rendering your brand invisible to modern searchers.",
					"Если ваш контент не структурирован для RAG-конвейеров, он будет исключен из контекстного окна генеративных систем, делая ваш бренд невидимым для пользователей будущего.",
				),
			},
			{
				type: "callout",
				kind: "warning",
				content: p(
					"While blocking AI bots in robots.txt may seem like a defensive strategy, it is a commercial mistake. Opting out of AI crawling simply ensures your brand is omitted from tomorrow's search landscapes.",
					"Хотя блокировка AI-ботов в robots.txt может казаться защитной стратегией, это коммерческая ошибка. Запрет на краулинг просто уберет ваш бренд из поисковой выдачи завтрашнего дня.",
				),
			},
		],
	},
	{
		slug: "how-i-built-search-ecosystem",
		category: "Engineering",
		publishedAt: "2026-06-14",
		updatedAt: "2026-06-14",
		readTime: p("6 min read", "6 мин чтения"),
		title: p(
			"Building a Multi-Site Search Ecosystem: Next.js and Monorepo Architecture",
			"Как я создавал поисковую экосистему Lunaria",
		),
		summary: p(
			"A technical walkthrough of building a multi-site monorepo using Next.js, MDX, Turborepo, and static HTML generation for AI crawlers.",
			"Технический разбор создания мультисайтового монорепозитория на Next.js, MDX, Turborepo и статической генерации HTML для AI-краулеров.",
		),
		seo: {
			title: p(
				"Building a Multi-Site Monorepo: Next.js & MDX - Sabraman",
				"Разработка мультисайтового монорепозитория: Next.js и MDX - Sabraman",
			),
			description: p(
				"Deep dive into the technical architecture of Lunaria: Next.js monorepo, POSSE principle implementation, SSG vs client rendering for AI bots, and robots.txt setups.",
				"Глубокий технический разбор архитектуры Lunaria: Next.js монорепозиторий, внедрение принципа POSSE, сравнение SSG с клиентским рендерингом для ИИ-краулеров и настройка robots.txt.",
			),
			keywords: {
				en: [
					"nextjs monorepo",
					"posse principle",
					"ssg vs client-side react",
					"ai bot crawl optimization",
					"robots.txt open policy",
					"turborepo multi-site",
				],
				ru: [
					"nextjs монорепозиторий",
					"принцип posse",
					"ssg против клиентского react",
					"оптимизация под ai краулеров",
					"настройка robots.txt",
					"мультисайт turborepo",
				],
			},
		},
		blocks: [
			{
				type: "paragraph",
				content: p(
					"Designing a multi-site structure can easily lead to maintenance chaos if handled poorly. Copy-pasting components, duplicating style configs, and managing distinct deployment pipelines for five different websites is a developer's nightmare. For the Lunaria project, I bypassed this by deploying everything inside a single, unified monorepo. This setup is built around the POSSE principle (Publish on Own Site, Syndicate Elsewhere) to ensure that the primary, authoritative content source always resides within our own owned namespace, preserving E-E-A-T signals.",
					"Разделение проекта на пять сайтов может превратиться в ад поддержки, если подойти к делу неправильно. Копирование кода, дублирование стилей и настройка отдельных CI/CD — кошмар для разработчика. В проекте Lunaria я решил эту проблему, объединив все приложения в один монорепозиторий. Эта архитектура построена вокруг принципа POSSE (Publish on Own Site, Syndicate Elsewhere), гарантирующего, что первоисточник авторитетного контента всегда находится на наших собственных доменах, сохраняя сигналы E-E-A-T.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Monorepo Architecture & POSSE Implementation",
					"Архитектура монорепозитория и реализация принципа POSSE",
				),
			},
			{
				type: "paragraph",
				content: p(
					"The codebase is organized into independent application directories and shared packages. Under the POSSE principle, our satellites act as the absolute canonical source of truth. Any external syndication (to social networks, Telegram channels, or B2B directories) pulls directly from our structured data endpoints. We chose Bun Workspaces and Turborepo to manage package dependencies and optimize execution caching.",
					"Кодовая база разделена на независимые приложения и общие служебные пакеты. В соответствии с принципом POSSE наши сателлиты выступают в роли абсолютного канонического первоисточника. Любая внешняя публикация (в соцсети, Telegram-каналы или B2B-каталоги) забирает данные напрямую из наших структурированных API. В качестве основы мы выбрали Bun Workspaces и Turborepo для управления зависимостями и оптимизации кэширования.",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"@lunaria/brand: Houses brand colors, typography tokens, vector logos, and global image assets, ensuring absolute visual consistency.",
						"@lunaria/brand: Хранит цвета бренда, шрифтовые токены, векторные логотипы и графику, гарантируя единство стиля.",
					),
					p(
						"@lunaria/ui: A library of modular React components (cards, forms, buttons, dialogs) optimized for atomic reuse across all domains.",
						"@lunaria/ui: Библиотека модульных React-компонентов (карточки, кнопки, формы), оптимизированных для переиспользования.",
					),
					p(
						"@lunaria/content: Manages MDX-based content parsing, automated XML sitemap generation, RSS feeds, and structured Schema.org metadata.",
						"@lunaria/content: Управляет MDX-контентом, автоматической сборкой sitemap, RSS-лентами и структурированной разметкой Schema.org.",
					),
				],
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"The Rendering Choice: SSG/SSR vs. Client-Side Hydration",
					"Выбор рендеринга: SSG/SSR против клиентской гидратации",
				),
			},
			{
				type: "paragraph",
				content: p(
					"One of the biggest technical pitfalls in modern GEO is relying on client-side React rendering (Single Page Apps). AI crawlers like PerplexityBot and Gemini's parser are highly optimized for speed; they fetch the raw static HTML and rarely wait for complex JavaScript hydration cycles. If your page serves an empty container that React hydrates on the client, the AI parser will index a blank screen, dropping you out of the retrieval candidates.",
					"Один из главных технических капканов в современном GEO — использование клиентского React-рендеринга (SPA). AI-краулеры (такие как PerplexityBot и парсеры Gemini) оптимизированы под скорость: они скачивают сырой статический HTML и редко ждут завершения циклов гидратации JavaScript. Если страница отдает пустой контейнер, наполняемый скриптами на клиенте, AI-парсер проиндексирует пустоту и исключит вас из кандидатов на выдачу.",
				),
			},
			{
				type: "paragraph",
				content: p(
					"For Lunaria, we implemented strict Static Site Generation (SSG) with incremental hydration. Every page loads as a clean, fully formed static HTML document containing pre-rendered text blocks and inlined JSON-LD metadata. This guarantees that AI engines can extract our semantic data chunks within milliseconds of initiating a crawl, with zero rendering execution costs on their end.",
					"Для Lunaria мы внедрили строгое статическое генерирование (SSG) с инкрементальной гидратацией. Каждая страница загружается как чистый, полностью сформированный статический HTML-документ с предрендеренным текстом и встроенными метаданными JSON-LD. Это гарантирует, что AI-движки могут извлекать наши семантические чанки за миллисекунды с нулевыми затратами на выполнение JS-кода с их стороны.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Open Robots Policy & Sitemap Index Optimization",
					"Открытая политика Robots и оптимизация Sitemap-индекса",
				),
			},
			{
				type: "paragraph",
				content: p(
					"To facilitate deep indexation, we configured our robots.txt to explicitly permit all modern AI agents. Unlike standard setups that block crawlers to save bandwidth, we leverage caching at the edge (via Vercel and Cloudflare) to absorb bot traffic without server load. We also deployed a structured sitemap index that dynamically registers every satellite's static paths, providing a clear map for Perplexity and Gemini to discover new content updates within minutes.",
					"Для глубокой индексации мы настроили robots.txt так, чтобы явно разрешить доступ всем современным ИИ-ботам. В отличие от стандартных конфигураций, которые блокируют краулеров для экономии трафика, мы используем кэширование на границе сети (Vercel и Cloudflare) для обработки трафика ботов без нагрузки на сервер. Мы также развернули структурированный Sitemap-индекс, который динамически регистрирует статические пути всех сателлитов, давая Perplexity и Gemini четкую карту для обнаружения обновлений за считанные минуты.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"The MDX-based Headless CMS Layer",
					"Слой безголовой CMS на базе MDX",
				),
			},
			{
				type: "paragraph",
				content: p(
					"For content rendering, I built a headless layer that reads static MDX files directly from the filesystem. I chose MDX because it allows editors to insert custom interactive React components—such as dynamic flower cost calculators or interactive map widgets—directly inside standard Markdown text. The content parsing engine uses next-mdx-remote to compile files on the server side, keeping the client bundle lightweight.",
					"Для отображения контента я спроектировал безголовый слой, который читает MDX-файлы из файловой системы. Я выбрал MDX, так как он позволяет вставлять сложные интерактивные компоненты (например, калькулятор сметы или карты) прямо в текст статьи. Движок парсинга использует next-mdx-remote для компиляции файлов на сервере, сохраняя клиентский бандл максимально легким.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Automating Sitemaps and Schema.org Metadata",
					"Автоматизация sitemaps и Schema.org метаданных",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"Multi-domain Sitemaps: I wrote a custom node script executed after builds that generates individual static XML sitemaps for each satellite domain name.",
						"Мультидоменные карты сайтов: Я написал скрипт, запускаемый после сборки, который генерирует отдельные файлы sitemap.xml для каждого из доменов.",
					),
					p(
						"Dynamic JSON-LD Injection: The MDX parsing pipeline automatically injects valid Schema.org breadcrumbs, author profiles, and geographic tags.",
						"Динамическая JSON-LD разметка: Парсер MDX автоматически генерирует Schema.org метаданные (FAQ, статьи, локальный бизнес) на основе структуры страницы.",
					),
				],
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"The Editorial Pipeline Automation (n8n + Gemini)",
					"Автоматизация конвейера (n8n + Gemini)",
				),
			},
			{
				type: "paragraph",
				content: p(
					"To feed multiple active blogs without overloading the writing staff, I integrated n8n as the workflow orchestrator. The pipeline functions in four steps: first, n8n monitors Google Trends, competitors' keywords, and Yandex autocomplete suggestions. Second, a query is sent to the Gemini API to compile detailed research outlines and initial article drafts in Russian. Third, a team of editors receives the drafts in a dashboard, refining the tone of voice and injecting local Kazan landmarks. Finally, once approved, the system generates static MDX files that are committed and deployed automatically.",
					"Чтобы регулярно наполнять блоги без выгорания команды, я настроил автоматизацию на n8n. Процесс состоит из четырех шагов: сначала n8n сканирует тренды, ключевые слова конкурентов и подсказки Яндекса. Затем отправляется запрос к Gemini API для составления структуры и черновика статьи. После этого редакторы дорабатывают текст в панели управления, вшивая локальный контекст. Наконец, готовая статья сохраняется как статический MDX-файл, коммитится и автоматически отправляется в продакшн.",
				),
			},
			{
				type: "quote",
				content: p(
					"Automation should not replace the author. It should eliminate routine research, allowing editors to focus entirely on quality and details.",
					"Автоматизация не должна заменять автора. Она призвана избавить редактора от рутины, позволяя полностью сфокусироваться на пользе и качестве.",
				),
			},
			{
				type: "quote",
				content: p(
					"The best infrastructure is the one you don't have to duplicate.",
					"Лучшая инфраструктура — та, которую не нужно дублировать.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Key Benefits of the Architecture",
					"Главные преимущества архитектуры",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"Developer Efficiency: Updating a component in @lunaria/ui immediately rolls out the update across all five domain satellites.",
						"Скорость разработки: Обновление компонента в @lunaria/ui мгновенно применяется ко всем пяти сайтам.",
					),
					p(
						"SEO Isolation: If one satellite runs into indexing problems, the other domains remain unaffected, shielding the brand.",
						"SEO-изоляция: Если один из сателлитов столкнется с проблемами индексации, остальные домены не пострадают.",
					),
					p(
						"Incremental Builds: Turborepo detects which apps changed and builds/деплоит только измененные сателлиты, сохраняя время сборки в пределах минуты.",
						"Инкрементальная сборка: Turborepo определяет изменившиеся части и собирает только их, сохраняя скорость деплоя.",
					),
				],
			},
			{
				type: "callout",
				kind: "success",
				content: p(
					"Using this unified monorepo structure, launching a new regional satellite now takes me less than 2 hours of configuration and zero new infrastructure costs.",
					"Благодаря единому монорепозиторию запуск нового регионального сателлита занимает у меня менее 2 часов настройки и не требует затрат на новую инфраструктуру.",
				),
			},
		],
	},
	{
		slug: "building-content-moats",
		category: "Architecture",
		publishedAt: "2026-06-11",
		updatedAt: "2026-06-14",
		readTime: p("6 min read", "6 мин чтения"),
		title: p(
			"Building a Content Moat: Why a Local Flower Brand Needs a Multi-Site Network",
			"Контентный ров: зачем цветочному бренду своя сеть сайтов",
		),
		summary: p(
			"How a regional brand can compete with federal marketplaces by optimizing for RAG consensus verification and Share of Voice metrics.",
			"Как локальному бренду конкурировать с маркетплейсами за счет мультисайтового консенсуса в RAG и метрик Share of Voice.",
		),
		seo: {
			title: p(
				"Building a Content Moat: Multi-Site Search Strategy - Sabraman",
				"Контентный ров: мультисайтовая стратегия продвижения - Sabraman",
			),
			description: p(
				"Learn how Lunaria built a regional search barrier against aggregators by separating retail, franchise, and weddings into domain satellites to optimize RAG consensus and Share of Voice.",
				"Узнайте, как Lunaria выстроила региональный поисковый барьер против агрегаторов, разделив розницу, свадьбы и франшизу на сателлиты для оптимизации RAG-консенсуса и Share of Voice.",
			),
			keywords: {
				en: [
					"content moat",
					"rag consensus verification",
					"share of voice seo",
					"answer share search",
					"multidomain seo 2026",
				],
				ru: [
					"контентный ров",
					"верификация консенсуса в rag",
					"share of voice seo",
					"доля ответов в поиске",
					"мультидоменное seo 2026",
				],
			},
		},
		blocks: [
			{
				type: "paragraph",
				content: p(
					"For a local business, competing with federal giants, marketplaces, and aggregators on marketing budget is a losing battle. Large directories have massive link profiles, old domain history, and thousands of pages. But a local brand has one massive advantage: it can be significantly more precise and relevant to regional queries. In 2026, this advantage is multiplied by Generative Engine Optimization (GEO). By structuring our brand presence into a modular multi-site network, we build an organic content moat that federal aggregators cannot cross.",
					"У локального бизнеса мало шансов победить федеральных гигантов и агрегаторы бюджетом. У крупных справочников больше ссылок, авторитета и страниц. Но у локального бренда есть другое преимущество: он может быть намного точнее и полезнее в рамках своего конкретного региона. В 2026 году это превосходство многократно усиливается благодаря оптимизации под генеративные ответы (GEO). Разделяя присутствие бренда на модульную сеть сайтов, мы строим органический контентный ров, который федеральные агрегаторы не в состоянии преодолеть.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Consensus Verification in RAG Pipelines",
					"Верификация консенсуса в RAG-конвейерах",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Modern AI engines do not trust single sources blindly. When Gemini or Perplexity synthesizes a response, their verification modules cross-reference facts across multiple retrieved documents. If a single domain makes a claim, it receives a baseline confidence score. However, when multiple independent domains corroborate the same facts, the synthesis engine verifies it as a consensus truth.",
					"Современные AI-движки не верят слепо единичным источникам. Когда Gemini или Perplexity синтезируют ответ, их модули верификации сопоставляют факты по нескольким найденным документам. Если утверждение содержится только на одном домене, оно получает базовый уровень доверия. Но если несколько независимых доменов подтверждают одни и те же факты, движок принимает их за объективный консенсус.",
				),
			},
			{
				type: "paragraph",
				content: p(
					"By dividing Lunaria's ecosystem into distinct satellites (the main retail store, the wedding media portal, and the Kazan venues directory), we create a consensus engine. When a crawler queries our network, it finds consistent details about Kazan venue capacities, floral setups, and brand terms across different domains. The AI model's RAG pipeline verifies this multi-source agreement, raising our trust score and dramatically increasing our citation rates.",
					"Разделив экосистему Lunaria на отдельные сателлиты (основной магазин, свадебное медиа и каталог площадок Казани), мы создали консенсусный движок. Когда краулер обходит нашу сеть, он находит согласованные данные о вместимости залов, флористическом оформлении и условиях работы на разных доменах. RAG-конвейер ИИ фиксирует это совпадение из независимых источников, что повышает наш уровень авторитетности и гарантирует высокие показатели цитирования.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Maximizing Share of Voice (SoV) and Answer Share",
					"Максимизация доли голоса (SoV) и охвата ответов",
				),
			},
			{
				type: "paragraph",
				content: p(
					"In zero-click generative search, traditional keyword rankings are replaced by Share of Voice (SoV). If an AI assistant lists three recommendations for wedding decor in Kazan, your goal is to occupy all three slots. A single domain can rarely achieve this because search engines prefer diverse sources. However, a multi-site network allows different satellites to co-occur in the same response, capturing up to 100% of the generative 'Answer Share' for a local query.",
					"В эпоху поиска без кликов (zero-click) традиционные позиции по ключевым словам заменяются долей голоса (Share of Voice, SoV). Если AI-ассистент предлагает три лучшие рекомендации по декору в Казани, ваша задача — занять все три места. Один домен редко может этого добиться, так как поисковики стремятся разнообразить источники. Однако мультисайтовая сеть позволяет разным сателлитам одновременно выводиться в одном ответе, забирая до 100% генеративного охвата (Answer Share) по локальным запросам.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p("Modular Intent Separation", "Разделение по интентам"),
			},
			{
				type: "bullets",
				items: [
					p(
						"Main Retail Domain: focused on bouquets, flower care guides, and gifting advice.",
						"Основной домен: пишет про букеты, доставку, сезонность и советы по уходу за цветами.",
					),
					p(
						"Franchise Portal: handles business calculations, inventory management, and florist onboarding advice.",
						"Франчайзинговый портал: раскрывает инвестиции, учет списаний, найм персонала и закупки.",
					),
					p(
						"Wedding Media: helps brides navigate planning anxieties, budget calculations, and styling guidelines.",
						"Свадебное медиа: помогает невестам разобраться в планировании, расчете бюджета и декоре.",
					),
					p(
						"Venues Satellite: maps Kazan's halls and lofts directly to ready-to-go decoration templates.",
						"Каталог площадок: привязывает рестораны и залы Казани к готовым концепциям оформления.",
					),
				],
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Fighting the Aggregator Giants (Flowwow, Yandex.Market)",
					"Борьба с гигантами-агрегаторами (Flowwow, Яндекс.Маркет)",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Aggregators rank well due to domain age and huge link metrics, but they suffer from generic experiences. I realized that a customer searching for 'reliable wedding florists near Kazan Kremlin' doesn't want to scroll through 300 identical florists on a marketplace. They want a curated comparison of local venues with concrete decoration setups. By indexing these highly specialized guides, my satellite pages quickly outranked aggregators for specific long-tail regional queries.",
					"Агрегаторы доминируют за счет траста доменов, но они безличны. Я понял, что невеста, ищущая 'оформление свадьбы около Казанского Кремля', не хочет выбирать из сотен безликих витрин. Ей нужно готовое решение под площадку. Индексируя детальные разборы местных ресторанов с примерами работ, мои сателлиты обошли агрегаторы по целевым узким запросам.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Topical Authority Clustering Rules",
					"Правила кластеризации для тематического авторитета",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"Focal Semantic Depth: Instead of writing dozens of short posts about flowers, I publish extensive guides mapping out the entire wedding timeline for local Kazan brides.",
						"Фокус на глубине семантики: Вместо десятков коротких постов про цветы я выпускаю исчерпывающие статьи, раскладывающие свадебные этапы для казанских невест.",
					),
					p(
						"Dynamic Cross-Domain Links: Informational pages on satellites pass contextual equity back to the main e-commerce storefront, leading readers naturally to checkout.",
						"Умная перелинковка: Информационные статьи на сателлитах плавно ведут пользователя на витрину основного интернет-магазина для заказа букетов.",
					),
				],
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Targeting the Long-Tail Search Intent",
					"Сопровождение по цепочке вопросов",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Users rarely buy directly. A bride starts her journey looking for a wedding venue; by helping her choose a hall on my venues directory, Lunaria establishes brand trust weeks before she even starts looking for a bouquet. By answering her questions at every stage, I build a seamless pathway to the conversion point.",
					"Пользователь редко покупает в лоб. Невеста начинает со свадебной площадки; помогая ей определиться с залом, Lunaria завоевывает доверие еще до того, как возникнет вопрос о флористике. Сопровождая клиента по цепочке вопросов, я создаем бесшовный путь к покупке.",
				),
			},
			{
				type: "quote",
				content: p(
					"A content moat is built when a brand dominates the surrounding topics, establishing authority before the commercial transaction even begins.",
					"Контентный ров строится тогда, когда бренд доминирует в сопутствующих темах, завоевывая доверие задолго до коммерческой сделки.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"The Cost and Infrastructure of Multi-Domain Satellites",
					"Инфраструктура и стоимость сети сателлитов",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Maintaining a network of five websites sounds like a billing nightmare, but modern hosting platforms make it incredibly cheap. Because I run all domains inside a unified monorepo on serverless platforms, I handle request routing directly inside a single Next.js middleware file. The host header dynamically dictates the layout variants and site metadata, meaning my infrastructure running costs remain completely flat.",
					"Поддержка сети из пяти сайтов звучит как кошмар для бюджета, но современные хостинги делают это дешевым. Поскольку я развертываю все домены из одного монорепозитория, маршрутизация запросов происходит прямо внутри Next.js middleware. Заголовок хоста динамически меняет тему и метаданные, сохраняя общую стоимость аренды серверов минимальной.",
				),
			},
			{
				type: "quote",
				content: p(
					"A brand moat is not built by spending more on ads, but by owning the search queries your competitors don't even track.",
					"Защитный ров строится не бюджетом на рекламу, а за счет ответов на те вопросы клиентов, которые конкуренты даже не отслеживают.",
				),
			},
			{
				type: "callout",
				kind: "warning",
				content: p(
					"Avoid duplicate content: search engines will penalize cross-domain scraping if you simply copy-paste text between your satellites.",
					"Избегайте дублирования контента: поисковые системы понизят позиции сайтов за кросс-доменный дубликат, если вы будете просто копировать тексты между сателлитами.",
				),
			},
			{
				type: "callout",
				kind: "success",
				content: p(
					"By automating routine research with n8n and Gemini, and leaving final edits to human writers, I scale content production without compromising on editorial quality.",
					"Автоматизация исследования с помощью n8n и Gemini позволяет масштабировать сеть статей, сохраняя редакторское качество и точечную региональную пользу.",
				),
			},
		],
	},
	{
		slug: "regional-seo-dominance",
		category: "SEO",
		publishedAt: "2026-06-09",
		updatedAt: "2026-06-14",
		readTime: p("6 min read", "6 мин чтения"),
		title: p(
			"Local SEO in 2026: Dominating Regional Search Intent in Kazan",
			"Локальное SEO в 2026: как занять выдачу в Казани",
		),
		summary: p(
			"Why local businesses should stop writing generic content and start targeting highly specific geographic entities and user intents.",
			"Почему локальному бизнесу нужно отказаться от абстрактного контента в пользу точечной географической привязки.",
		),
		seo: {
			title: p(
				"Local SEO in 2026: Kazan Regional Optimization - Sabraman",
				"Локальное SEO в 2026: региональная оптимизация под Казань - Sabraman",
			),
			description: p(
				"Step-by-step case study of optimizing Lunaria's multi-site network for Kazan's geographic entities, local search patterns, and AI engines.",
				"Пошаговый разбор оптимизации мультисайтовой структуры Lunaria под географические сущности Казани и ответы поисковых AI-ассистентов.",
			),
			keywords: {
				en: [
					"local seo",
					"regional search engine optimization",
					"geographic entity optimization",
					"kazan local business",
				],
				ru: [
					"локальное seo",
					"региональное продвижение",
					"оптимизация под гео-запросы",
					"казань цветочный бизнес",
				],
			},
		},
		blocks: [
			{
				type: "paragraph",
				content: p(
					"Local businesses face a common temptation: speaking too broadly. They write about 'flower delivery' or 'wedding decor' in general terms, competing with national brands. But search engines and AI assistants prioritize local intent. To win in regional search, you must tie your content directly to your target city's physical, legal, and operational realities.",
					"У локального бизнеса есть соблазн говорить слишком широко. Писать про 'доставку цветов' или 'свадебный декор' вообще, конкурируя со всей страной. Но поисковики и AI-ассистенты отдают приоритет локальному интенту. Чтобы выиграть в регионе, нужно привязывать контент к физическим, юридическим и климатическим реалиям города.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"The Local Advantage in Search",
					"В чем сила локального контекста",
				),
			},
			{
				type: "paragraph",
				content: p(
					"When a user in Kazan searches for a wedding florist, they don't want a generic checklist. They need to know which restaurants allow external candles, how parking works near the Kazan Kremlin Registry Office, and how local winter temperatures affect delicate flowers. By injecting these specific geographic details, I prove E-E-A-T to search crawlers and AI search systems.",
					"Паре в Казани не нужен абстрактный чек-лист. Им важно знать, разрешают ли зажигать свечи в конкретном лофте, как устроена парковка у Центрального ЗАГСа на Кремлевской и как казанский мороз влияет на гортензии. Указывая эти детали, мы доказываем экспертность поисковым алгоритмам.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Optimizing for Kazan-Specific Search Entities",
					"Оптимизация под специфичные гео-сущности Казани",
				),
			},
			{
				type: "paragraph",
				content: p(
					"I systematically mapped out the core micro-locations of Kazan. Instead of ranking only for 'Kazan flower delivery', I wrote targeted content for specific residential complexes (like RC 'Art City', RC 'Savin House', RC 'Atlantis Deluxe') explaining delivery logistics, intercom nuances, and gate rules. This granular information is highly valuable for local users and AI engines looking for specific neighborhood details.",
					"Я составил карту ключевых микро-локаций Казани. Вместо продвижения по общему запросу 'доставка цветов Казань', я написал статьи под конкретные ЖК: 'Арт Сити', 'Savin House', 'Atlantis Deluxe', с деталями проезда и правилами охраны. Этот уровень деталей обожают поисковики и AI-системы при формировании ответов.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"The Role of Micro-formats and Structured Schema Markup",
					"Роль микроразметки и структурированных схем",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Local SEO is not just about raw copy; it's about semantic data structures. I integrated detailed LocalBusiness Schema tags for each physical retail partner, linking them to their Wikidata ID counterparts (e.g., matching 'Kazan' with the specific geographic identifier Q900). This ensures that search crawlers connect our brand satellite net to the global knowledge graph without ambiguity.",
					"Локальное продвижение — это не только текст, но и семантическая разметка. Я внедрил теги LocalBusiness для всех торговых точек, связав их с Wikidata ID (например, Казань связана с кодом Q900). Это укрепляет позиции бренда в графе знаний поисковых систем без двусмысленности.",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"Wikidata Entity Links: Directly linking our city names and service types to Wikidata identifiers to resolve semantic ambiguity.",
						"Связывание сущностей Wikidata: Привязка городов и услуг к базам Wikidata для четкой идентификации поисковыми роботами.",
					),
					p(
						"Geo-Coordinates Precision: Injecting exact lat/long coordinates and street addresses for delivery hubs to target local map pack listings.",
						"Координатная точность: Добавление точных координат складов и магазинов для повышения видимости на картах Yandex и Google.",
					),
				],
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Tectonic Shifts: GEO and AI Search Mode",
					"Сдвиг в сторону GEO и AI-поиска",
				),
			},
			{
				type: "paragraph",
				content: p(
					"In 2026, AI search models like Gemini and ChatGPT synthesize answers instead of displaying standard lists of blue links. These models retrieve sources that demonstrate high topical density and clear structure. If your site offers a structured table comparing wedding venues in Kazan, including capacity, address, and average floristry costs, the AI model is highly likely to cite your site as a primary source.",
					"В 2026 году AI-поисковики собирают ответ из источников с высокой плотностью фактов. Если ваш сайт содержит структурированную таблицу сравнения площадок Казани с вместимостью, адресами и требованиями к декору, модель процитирует его в качестве первоисточника.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"My Local Content Execution",
					"Как я реализовал локальный фокус",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"Geographic Entities: explicit mapping of Kazan districts, street names, and landmark references.",
						"Географические сущности: упоминание районов Казани, названий улиц и знаковых мест города.",
					),
					p(
						"Structured Comparison: using JSON-LD metadata and tables for venue lists and pricing templates.",
						"Структурированное сравнение: таблицы и Schema-разметка для площадок и смет.",
					),
					p(
						"Local Operations: guidelines on Kazan flower delivery logistics and winter storage rules.",
						"Локальные сценарии: статьи о доставке цветов в жилые комплексы Казани в зимнее время.",
					),
				],
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Local Language Context and Autocomplete Nuances",
					"Местный языковой контекст и особенности автозаполнения",
				),
			},
			{
				type: "paragraph",
				content: p(
					"In Kazan, users often mix Russian and Tatar names, or use regional slang for neighborhoods. I ensured my content models account for these autocomplete patterns. Integrating Tatar terms (like names of specific local avenues and squares in both forms) dramatically boosted our impressions in regional mobile query results.",
					"В Казани пользователи часто используют татарские названия или местный сленг при поиске. Я позаботился, чтобы мои контентные модели учитывали эти особенности, добавляя регионализмы и правильные наименования улиц на двух языках, что расширило охват на мобильных устройствах.",
				),
			},
			{
				type: "quote",
				content: p(
					"If search engines cannot map your digital text to physical geographical entities, you are invisible in local searches.",
					"Если поисковая система не может привязать ваш текст к физической географической сущности, вас не существует в локальной выдаче.",
				),
			},
			{
				type: "callout",
				kind: "info",
				content: p(
					"To rank locally, stop optimizing for keywords. Start optimizing for real-world city entities, regional customer pain points, and structured data.",
					"Чтобы ранжироваться локально, перестаньте оптимизировать ключи. Оптимизируйте сущности реального города, проблемы горожан и структурированные данные.",
				),
			},
			{
				type: "callout",
				kind: "success",
				content: p(
					"Our local strategy boosted organic visits from Kazan-specific mobile searches by 185% in less than 4 months, proving that precision beats budget.",
					"Наша локальная стратегия увеличила мобильный трафик из Казани на 185% за 4 месяца, доказав превосходство точности над рекламными бюджетами.",
				),
			},
		],
	},
	{
		slug: "learning-from-posiflora",
		category: "Engineering",
		publishedAt: "2026-06-08",
		updatedAt: "2026-06-14",
		readTime: p("5 min read", "5 мин чтения"),
		title: p(
			"Learning from Posiflora: Structuring Content Around the Whole Customer Journey",
			"Чему нас научил опыт Posiflora: контент вокруг всего пути клиента",
		),
		summary: p(
			"How we adapted Posiflora's B2B content marketing principles to create a localized, multi-intent consumer network for Lunaria.",
			"Как я адаптировал контент-стратегию Posiflora для локальной сети B2C и B2B сателлитов Lunaria.",
		),
		seo: {
			title: p(
				"Learning from Posiflora: Customer Journey SEO - Sabraman",
				"Опыт Posiflora: SEO на всех этапах пути клиента - Sabraman",
			),
			description: p(
				"An analysis of Posiflora's B2B content strategy and how we adapted it to drive local conversions across Lunaria's wedding, retail, and franchise sites.",
				"Разбор контент-стратегии Posiflora и её адаптации для локального продвижения свадебных услуг, розницы и франшизы Lunaria.",
			),
			keywords: {
				en: [
					"customer journey seo",
					"posiflora content strategy",
					"funnel marketing",
					"multi-intent network",
				],
				ru: [
					"seo пути клиента",
					"контент-стратегия posiflora",
					"маркетинг воронки",
					"мультиинтентные сети",
				],
			},
		},
		blocks: [
			{
				type: "paragraph",
				content: p(
					"If you analyze the search space for flower shop software, Posiflora stands out. They don't just write about CRM features. They write about flower supplier terms, staff training, seasonal waste, and storefront management. By answering these questions, they build relationships with florists months before they buy software. I took this funnel strategy and adapted it for Lunaria.",
					"Если изучить выдачу по автоматизации цветочного бизнеса, Posiflora видна сразу. Они пишут не про кнопки в CRM, а про открытие магазина, списания, персонал и закупки. Они сопровождают предпринимателя задолго до покупки. Я перенес этот воронкообразный подход на Lunaria.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Adapting B2B Strategy to B2C/B2B Regional Needs",
					"Адаптация B2B-стратегии под розницу и франшизу",
				),
			},
			{
				type: "paragraph",
				content: p(
					"While Posiflora targets software buyers globally, Lunaria targets retail buyers, brides, and franchise partners in a specific city. The underlying logic, however, remains identical: provide comprehensive answers to questions that naturally precede the commercial transaction. I divided this across separate sites to keep the messaging clean and laser-focused.",
					"В то время как Posiflora целится в покупателей софта по всей стране, Lunaria работает с розничными клиентами, невестами и франчайзи. Логика одна: дать полные ответы на вопросы, которые логически предшествуют сделке. Но для чистоты позиционирования я развел их по разным сайтам.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Understanding the Customer Decision Journey Mapping",
					"Картирование пути принятия решений клиентом",
				),
			},
			{
				type: "paragraph",
				content: p(
					"In retail floristry, the path to a purchase isn't linear. A buyer doesn't just search 'buy roses'. They go through stages of problem awareness: 'how to surprise a colleague at work', 'neutral floral gifts for corporate partners', 'longest-lasting flowers for dry rooms'. By studying Posiflora's B2B approach—where they map content to store problems—I mapped our consumer content to specific customer anxieties.",
					"В розничной флористике путь клиента нелинеен. Покупатель не просто ищет розы, он решает проблему: как удивить коллегу, какие цветы дарить корпоративным партнерам, какие сорта дольше стоят. Анализируя подход Posiflora к закрытию бизнес-проблем, я адаптировал его под розничные потребности клиентов.",
				),
			},
			{
				type: "paragraph",
				content: p(
					"I realized that by answering these pre-purchase queries, I bypass commercial competition. Instead of participating in expensive bid wars on Yandex Direct or Google Ads for highly contested keywords, I draw the customer to our site through useful, high-quality, and informational guides.",
					"Отвечая на эти предтранзакционные вопросы, я избегаю прямой и дорогой конкуренции в поиске. Вместо участия в ценовых войнах в Яндекс.Директ за коммерческие ключи, я привлекаю клиентов через качественные и полезные инструкции.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Mapping the Three Tiers of Search Intent",
					"Три уровня поискового интента в воронке",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"Low-Intent Informational: Explaining raw care guidelines (e.g., 'why hydrangeas wilt'). I use this to establish initial brand contact and trust.",
						"Информационный уровень: Простые инструкции (например, 'почему вянут гортензии'). Я использую это для первого контакта с брендом.",
					),
					p(
						"Medium-Intent Consideration: Comparing venue decorations or floral themes. Here, I introduce our portfolio and expertise naturally.",
						"Уровень рассмотрения: Сравнение концепций декора или стилей. Тут я нативно вшиваю кейсы и портфолио компании.",
					),
					p(
						"High-Intent Transactional: Direct product grids and ordering checkout. This is handled by our main store e-commerce page.",
						"Транзакционный уровень: Страница быстрого заказа и каталог. За это отвечает основной домен розничного магазина.",
					),
				],
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Structuring the Domain Satellites",
					"Структура доменных сателлитов",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"B2B: corporate contracts, floral subscriptions, school class decoration guidelines.",
						"B2B: корпоративное обслуживание, подписка, мастер-классы для компаний.",
					),
					p(
						"Weddings: budget calculators, styling trends, venue checklists.",
						"Свадьбы: калькуляторы бюджетов, тренды декора, чек-листы по выбору подрядчиков.",
					),
					p(
						"Franchise: opening calculations, operational rules, local market size assessments.",
						"Франшиза: расчеты окупаемости, выбор локации, оценка казанского рынка цветов.",
					),
				],
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Conversion Optimization and the FLOW Framework",
					"Оптимизация конверсий и фреймворк FLOW",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Capturing traffic is pointless without active conversion hooks. I built a dynamic context system that reads the current reading topic and displays a contextually relevant call-to-action (CTA). If a bride is reading about Kazan loft decorations, the page displays a custom cost calculator for that specific venue, rather than a generic flower shop newsletter box.",
					"Привлечение трафика бесполезно без конверсионных хуков. Я разработал контекстную систему призывов к действию (CTA). Если пользователь читает про лофты Казани, он видит калькулятор оформления этого лофта, а не просто подписку на рассылку.",
				),
			},
			{
				type: "quote",
				content: p(
					"Content is not just an addition to a product page. It is a strategic tool to capture attention before your competitor even appears on the user's radar.",
					"Контент — это не дополнение к сайту. Это инструмент, позволяющий перехватить внимание клиента до того, как конкурент вообще появится на его радаре.",
				),
			},
			{
				type: "quote",
				content: p(
					"Every piece of educational content must serve as a bridge, leading the user closer to resolving their core problem with your product.",
					"Каждая единица контента должна быть мостом, приближающим пользователя к решению проблемы с помощью вашего продукта.",
				),
			},
			{
				type: "callout",
				kind: "info",
				content: p(
					"Applying the FLOW framework to optimize conversion points across all satellites ensures that educational search traffic seamlessly transitions into warm commercial leads.",
					"Оптимизация переходов и призывов к действию на всех сателлитах превращает информационный трафик в готовые коммерческие лиды.",
				),
			},
			{
				type: "callout",
				kind: "success",
				content: p(
					"Adapting this journey-first model enabled us to capture high-value organic traffic, resulting in a 40% reduction in customer acquisition cost (CAC) over 6 months.",
					"Адаптация этой модели позволила привлечь качественный трафик, сократив стоимость привлечения клиента (CAC) на 40% за полгода.",
				),
			},
		],
	},
	{
		slug: "vector-search-in-telegram-miniapps",
		category: "Engineering",
		publishedAt: "2026-06-07",
		updatedAt: "2026-06-14",
		readTime: p("6 min read", "6 мин чтения"),
		title: p(
			"Implementing Vector Semantic Search in Telegram Mini Apps using OpenAI and Convex",
			"Векторный поиск в Telegram-миниаппах с помощью OpenAI и Convex",
		),
		summary: p(
			"How I built a hybrid search architecture with vector embeddings and taste filters inside a chat-constrained client.",
			"Как я разработал гибридный семантический поиск, эмбеддинги и вкусовые фильтры в интерфейсе Telegram.",
		),
		seo: {
			title: p(
				"Vector Semantic Search in Telegram Mini Apps - Sabraman",
				"Векторный поиск в Telegram Mini Apps - Sabraman",
			),
			description: p(
				"Deep dive into building a vector-based semantic search engine inside Telegram mini apps using Convex database and OpenAI embeddings.",
				"Детальный разбор создания векторного семантического поиска в Telegram-миниаппах с базой Convex и эмбеддингами OpenAI.",
			),
			keywords: {
				en: [
					"vector search",
					"telegram mini app",
					"convex database",
					"openai embeddings",
					"semantic search",
				],
				ru: [
					"векторный поиск",
					"telegram mini app",
					"convex",
					"эмбеддинги openai",
					"семантический поиск",
				],
			},
		},
		blocks: [
			{
				type: "paragraph",
				content: p(
					"Modern e-commerce requires search that goes beyond simple keyword matching. Users want to find products using descriptive search queries, like 'minty and refreshing with fruit notes'. To implement this inside a Telegram Mini App, I built a hybrid search architecture combining vector database embeddings with exact keyword filters.",
					"Современная электронная коммерция требует поиска, который выходит за рамки текстового совпадения. Пользователи хотят искать фразами вроде 'мята с фруктовыми нотами'. Чтобы реализовать это в Telegram Mini App, я спроектировал гибридный поиск, объединяющий векторные эмбеддинги и строгие фильтры.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Why Vector Search Matters in Chat Contexts",
					"Зачем нужен семантический поиск в мессенджере",
				),
			},
			{
				type: "paragraph",
				content: p(
					"In conversational and messenger interfaces, user queries are highly informal and descriptive. Classic search engines fail because they look for exact word matches. Vector search resolves this by converting both the product database and the user query into high-dimensional vectors (embeddings) using OpenAI's text-embedding models. The system then calculates cosine similarity to fetch the most relevant items.",
					"В чат-интерфейсах запросы формулируются неформально. Обычный поиск по тексту здесь пасует. Векторный поиск решает проблему, переводя каталог и запрос в многомерные векторы (эмбеддинги) через модели OpenAI. Далее система считает косинусное сходство и выдает наиболее близкие товары.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"The Tech Stack: Next.js, Convex, and OpenAI",
					"Стек: Next.js, Convex и OpenAI",
				),
			},
			{
				type: "paragraph",
				content: p(
					"I chose Convex as my database backend. Convex provides built-in support for vector indexes, making it incredibly fast to run vector similarity queries without spinning up a separate specialized vector database. The pipeline operates as follows: when a new product is parsed, an edge action calls the OpenAI API to generate a vector representation. This vector is stored in the database. During search, the user query is embedded on-the-fly and matched using Convex's vector search API.",
					"Базой данных я выбрал Convex. Он имеет встроенную поддержку векторных индексов, что позволило искать совпадения без отдельной тяжелой векторной БД. Процесс устроен так: при импорте товара edge-функция запрашивает эмбеддинг у OpenAI, сохраняя его в базу. При поиске запрос пользователя векторизуется на лету и сопоставляется через Convex Vector Search.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"The Vector Embedding Pipeline Details",
					"Детали пайплайна генерации эмбеддингов",
				),
			},
			{
				type: "paragraph",
				content: p(
					"I chose OpenAI's text-embedding-3-small model because it offers an excellent balance of cost, speed, and semantic accuracy, representing our catalog items in a 1536-dimensional space. Whenever a manager updates a product description in our admin interface, a Convex database trigger runs. It generates clean description text, sends it to the OpenAI API, and saves the resulting float array back to the product record, making it immediately available for queries.",
					"Я выбрал модель text-embedding-3-small от OpenAI. Она дает отличный баланс цены, скорости и семантической точности, представляя товары в виде векторов размерностью 1536. При редактировании описания администратором триггер Convex запрашивает новый эмбеддинг и сохраняет массив чисел в базу данных, делая товар сразу доступным для поиска.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Hybrid Queries: Combining Vectors with Custom Category Filters",
					"Гибридные запросы: совмещение векторов и кастомных фильтров категорий",
				),
			},
			{
				type: "paragraph",
				content: p(
					"While semantic match is powerful, users still expect strict functional filtering. For example, if a client filters for 'in stock only' and searches for 'chocolate note dessert', standard cosine similarity matches might occasionally rank out-of-stock items higher because of their semantic relevance. To solve this, I designed a hybrid query builder inside Convex. It executes index filters first to narrow down the dataset, and only then calculates cosine distances against the matches, preserving correct filter logic.",
					"Хотя семантический поиск хорош, фильтры наличия и категорий остаются обязательными. Например, если клиент ставит фильтр 'только в наличии' и ищет 'десерт с ноткой шоколада', стандартное косинусное сходство может выдать отсутствующий товар из-за семантической близости. Я разработал гибридный поиск в Convex, который сначала фильтрует базу по жестким условиям, а затем вычисляет векторы только по выбранному подмножеству.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Optimizing Search Latency and Input Debounce",
					"Оптимизация задержек поиска и дебаунс ввода",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"Query Debouncing: I added a 300ms debounce on the search input field to prevent flooding the OpenAI API with intermediate keystroke requests.",
						"Дебаунс запросов: Я добавил дебаунс ввода на 300 мс, чтобы избежать спама запросов к API OpenAI во время набора текста пользователем.",
					),
					p(
						"Vector Compression: I slice the vector embeddings down to 512 dimensions where appropriate, which reduces database query latency by 25% with less than 2% loss in matching accuracy.",
						"Сжатие векторов: Я обрезаю векторы до 512 измерений в некоторых индексах, что снижает время ответа БД на 25% при потере точности менее 2%.",
					),
				],
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Challenges: Hybrid Filtering and Speed",
					"Сложности: гибридная фильтрация и скорость",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"Hybrid Search: Combining vector search with strict boolean filters (e.g. category or availability) requires post-filtering. Convex allows combining vector search with index filters for maximum performance.",
						"Гибридный поиск: Совмещение семантики с жесткими фильтрами (категория, наличие) требует фильтрации. Convex позволяет делать это в рамках одного запроса.",
					),
					p(
						"Scraped Data Normalization: Scraping raw catalogs produces messy text. I used Gemini to normalize product details and extract key tastes prior to indexing.",
						"Нормализация данных: Парсинг дает 'грязный' текст. Я использовал Gemini для очистки описаний и извлечения характеристик перед индексацией.",
					),
					p(
						"Mobile Constraints: Rendering catalog listings in Telegram requires lightweight components and layout virtualization for smooth scrolling.",
						"Ограничения мобильных: Отрисовка каталога в Telegram требует легких компонентов и виртуализации списков для плавного скролла.",
					),
				],
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Optimizing Client-Side Performance inside Telegram WebViews",
					"Оптимизация производительности клиента в Telegram WebView",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Telegram Mini Apps run inside embedded WebViews, which have limited memory allocations and GPU acceleration compared to standalone browsers. To ensure that our search results render at 60fps, I implemented virtualized list scrolling. Only the visible product cards are active in the DOM, preventing performance lag during rapid user typing.",
					"Telegram Mini Apps работают во встроенных WebView с жесткими лимитами памяти. Для рендеринга результатов на частоте 60fps я добавил виртуализацию списков. В DOM присутствуют только видимые карточки товаров, что исключает лаги интерфейса при быстром вводе запросов.",
				),
			},
			{
				type: "quote",
				content: p(
					"AI search is not just about chatbots. It is about bringing semantic understanding into the core search input field.",
					"AI-поиск — это не только чат-боты. Это внедрение смыслового понимания прямо в обычную строку поиска.",
				),
			},
			{
				type: "quote",
				content: p(
					"In mobile chat clients, speed is the ultimate UX metric; a semantic search that takes 2 seconds is useless.",
					"В мобильных чатах скорость — главная метрика. Семантический поиск, который длится 2 секунды, никому не нужен.",
				),
			},
			{
				type: "callout",
				kind: "warning",
				content: p(
					"Be careful with OpenAI API limits: implementing a search debounce is critical to prevent hit rate limits on busy days.",
					"Следите за лимитами API OpenAI: обязательно настраивайте дебаунс ввода, чтобы избежать превышения квот в пиковые дни.",
				),
			},
			{
				type: "callout",
				kind: "success",
				content: p(
					"The resulting system processes search queries in under 150ms, delivering highly accurate, streaming product recommendations directly to mobile devices.",
					"Разработанная система обрабатывает поисковые запросы менее чем за 150 мс, выдавая точные рекомендации прямо на мобильном экране.",
				),
			},
		],
	},
	{
		slug: "optimizing-cpp-for-retro-consoles-psp",
		category: "Engineering",
		publishedAt: "2026-06-05",
		updatedAt: "2026-06-14",
		readTime: p("5 min read", "5 мин чтения"),
		title: p(
			"Optimizing C++ EPUB Rendering under 32MB RAM: PSP Book Reader",
			"Оптимизация C++ под 32 МБ ОЗУ: разработка читалки книг для Sony PSP",
		),
		summary: p(
			"How I managed memory caching, custom SDL2 text layouts, and dynamic CPU scaling for battery efficiency on vintage hardware.",
			"Как я оптимизировал кэширование, кастомный вывод текста на SDL2 и частоту процессора на ретро-консоли.",
		),
		seo: {
			title: p(
				"C++ Embedded Optimization: PSP EPUB Reader - Sabraman",
				"Оптимизация C++ под встраиваемые системы: ридер для PSP - Sabraman",
			),
			description: p(
				"Technical breakdown of building a native C++ and SDL2 EPUB book reader for the Sony PSP console under strict RAM and battery limitations.",
				"Технический разбор создания нативного ридера EPUB на C++ и SDL2 для Sony PSP в условиях лимитов памяти и батареи.",
			),
			keywords: {
				en: [
					"cpp optimization",
					"sony psp development",
					"sdl2 rendering",
					"epub parser",
					"embedded programming",
				],
				ru: [
					"оптимизация cpp",
					"разработка под psp",
					"рендеринг sdl2",
					"парсер epub",
					"низкоуровневое программирование",
				],
			},
		},
		blocks: [
			{
				type: "paragraph",
				content: p(
					"Developing modern software for vintage hardware is a masterclass in constraint-driven engineering. The original Sony PSP features a 333MHz CPU and only 32MB of available RAM. Creating a native EPUB book reader that handles large files, renders clean anti-aliased text, and preserves battery life required strict, low-level optimization.",
					"Разработка софта под ретро-железо — отличный способ вспомнить про низкоуровневую оптимизацию. У Sony PSP процессор 333 МГц и всего 32 МБ оперативной памяти. Создание нативного EPUB-ридера потребовало жесткого контроля ресурсов для плавной работы и экономии батареи.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"The Rendering Engine: Custom Text Layouts on SDL2",
					"Рендеринг: кастомный вывод текста на SDL2",
				),
			},
			{
				type: "paragraph",
				content: p(
					"I used C++ and SDL2 for the core graphics layer. Because rendering full EPUB layouts on-the-fly is too CPU-heavy for the PSP, I implemented a custom text layout compiler. It parses the XHTML structure, extracts formatting, calculates line breaks based on the screen resolution (480x272), and caches the parsed token stream in memory. This avoids expensive re-layouts during page flips.",
					"Я выбрал C++ и SDL2. Поскольку парсинг XHTML на лету слишком грузит процессор, я написал кастомный компилятор разметки. Он разбирает структуру EPUB, считает переносы под разрешение 480x272 и кэширует готовый поток токенов. Это убирает задержки при перелистывании.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Memory Constrained Architecture",
					"Управление памятью в условиях 32 МБ RAM",
				),
			},
			{
				type: "paragraph",
				content: p(
					"To fit books with hundreds of pages into memory, I built a segmented buffer. Instead of holding the entire document structure in RAM, we only cache the active chapter's token stream and pre-compile the adjacent page images. All resource allocations use custom memory pools to prevent RAM fragmentation, which is a common cause of crashes on embedded systems.",
					"Чтобы уместить объемные книги, я сделал сегментированный буфер. Вместо хранения всего файла мы держим в памяти только токен-поток текущей главы и растр соседних страниц. Память выделяется через пулы во избежание фрагментации — частой причины сбоев на PSP.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Custom Memory Allocators to Avoid Fragmentation",
					"Кастомные аллокаторы для борьбы с фрагментацией",
				),
			},
			{
				type: "paragraph",
				content: p(
					"During long reading sessions, default malloc and free calls fragment the PSP's scarce address space, leading to out-of-memory crashes. To solve this, I wrote a custom Arena Allocator that is reset completely between chapter loads. Since all paragraph nodes, word tokens, and temporary layout coordinates are allocated sequentially and freed in a single operation when the user switches chapters, memory fragmentation is effectively reduced to zero.",
					"При долгом чтении стандартные вызовы malloc и free быстро фрагментируют память PSP, приводя к сбоям. Я написал кастомный Арена-аллокатор, память которого сбрасывается целиком при переходе между главами. Все токены слов и координаты разметки выделяются последовательно и освобождаются за одну быструю операцию, сводя фрагментацию к нулю.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Double-Buffered Page Layout Pre-Rendering",
					"Двойная буферизация и предсборка страниц",
				),
			},
			{
				type: "paragraph",
				content: p(
					"To eliminate any visible rendering latency, I implemented an off-screen double-buffering queue. While the user is reading page N, a background low-priority CPU thread compiles layout calculations and rasterizes glyphs for pages N-1 and N+1 into a private off-screen render buffer. When the user clicks the trigger to turn the page, the graphics engine simply swaps the hardware display pointers, rendering the transitions instantly without blocking the interface.",
					"Чтобы перелистывание было мгновенным, я настроил двойную буферизацию. Пока пользователь читает текущую страницу N, второй низкоприоритетный поток CPU компилирует разметку и растрирует шрифты для соседних страниц N-1 и N+1 в закадровый буфер. При нажатии кнопки перелистывания видеодвижок просто меняет указатели кадрового буфера в видеопамяти, обеспечивая мгновенную смену кадра.",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"Off-Screen Framebuffers: Utilizing the PSP's internal graphics processor VRAM directly for off-screen page layout caching.",
						"Внеэкранный рендеринг: Прямое использование видеопамяти графического чипа PSP для кэширования соседних страниц текста.",
					),
					p(
						"Tokenized Layout Engines: I pre-tokenize CSS formatting properties to minimize runtime string matching and CPU calculations.",
						"Токенизация стилей: Я преобразую CSS-свойства в бинарные токены заранее, чтобы избежать тяжелого разбора строк во время чтения.",
					),
				],
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Optimizing Image Decoding with Hardware Assembly Helpers",
					"Оптимизация декодирования картинок с VFPU-оптимизацией",
				),
			},
			{
				type: "paragraph",
				content: p(
					"EPUB files frequently contain inline illustrations. Loading and decoding full-scale PNG images with standard libraries is slow on a 333MHz CPU. I bypassed libpng and wrote a custom lightweight image decoder that utilizes the PSP's Vector Floating Point Unit (VFPU) to process pixel color conversions in parallel. This optimization cut image decoding times from 500ms down to 75ms.",
					"Книги часто содержат иллюстрации. Декодирование картинок стандартными библиотеками на процессоре 333 МГц вызывает фризы. Я написал легковесный декодер, задействующий векторный сопроцессор PSP (VFPU) для параллельной конвертации пикселей. Это сократило время обработки изображений с 500 до 75 мс.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Dynamic CPU Scaling for Battery Life",
					"Динамическое управление частотой CPU",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"CPU Governor: The PSP CPU can scale from 19MHz to 333MHz. I programmatically scale the clock down to 111MHz when the user is reading static text, and scale up to 333MHz only during page transitions.",
						"Управление частотой: Частота процессора PSP меняется от 19 до 333 МГц. Я снижаю её до 111 МГц при чтении статичной страницы и повышаю до 333 МГц только в момент перелистывания.",
					),
					p(
						"TATE Orientation: rotating the viewport 90 degrees allows users to hold the console vertically, increasing text line capacity.",
						"Режим TATE: Поворот экрана на 90 градусов позволяет держать консоль вертикально, что удобнее для чтения длинных строк.",
					),
					p(
						"Custom Font Caching: caching glyphs as texture sub-images to minimize SDL GPU rendering calls.",
						"Кэширование шрифтов: хранение глифов в виде текстурных атласов для снижения количества вызовов отрисовки.",
					),
				],
			},
			{
				type: "quote",
				content: p(
					"Programming under severe constraints forces you to think about every CPU cycle and byte allocation, returning to the fundamentals of software craftsmanship.",
					"Разработка в жестких рамках заставляет ценить каждый цикл процессора и байт памяти, возвращая нас к фундаментальным основам программирования.",
				),
			},
			{
				type: "quote",
				content: p(
					"When memory is measured in kilobytes, high-level abstractions dissolve and you are left with the beautiful simplicity of pointers and registers.",
					"Когда доступная память измеряется килобайтами, высокоуровневые абстракции исчезают, оставляя нас наедине с чистой логикой регистров и указателей.",
				),
			},
			{
				type: "callout",
				kind: "warning",
				content: p(
					"Manual memory pools require strict lifetime checks: failing to track pointers correctly on PSP leads to hard hardware exceptions (bus errors) rather than simple developer console warnings.",
					"Кастомные пулы памяти требуют жесткого контроля: ошибки с указателями на PSP приводят к аппаратному краху консоли (bus error), а не к простым предупреждениям в консоли разработчика.",
				),
			},
			{
				type: "callout",
				kind: "info",
				content: p(
					"The resulting reader launches in under 2 seconds and extends PSP battery life by over 30% compared to standard homebrew readers.",
					"Итоговый ридер запускается менее чем за 2 секунды и продлевает время автономной работы консоли более чем на 30% по сравнению с аналогами.",
				),
			},
		],
	},
	{
		slug: "loyalty-and-pos-systems-in-telegram",
		category: "Architecture",
		publishedAt: "2026-06-03",
		updatedAt: "2026-06-14",
		readTime: p("5 min read", "5 мин чтения"),
		title: p(
			"Designing Offline-Resilient Web POS Interfaces for Telegram Loyalty Platforms",
			"Проектирование отказоустойчивых Web POS для лояльности в Telegram",
		),
		summary: p(
			"How I handled seller session control, fast QR lookup, and POS state management under unstable shop networks.",
			"Как я управлял сессиями продавцов, сканированием QR и синхронизацией скидок при нестабильном интернете в магазинах.",
		),
		seo: {
			title: p(
				"Designing Offline-Resilient POS Web Apps - Sabraman",
				"Проектирование офлайн POS-приложений - Sabraman",
			),
			description: p(
				"Architectural overview of building an offline-resilient web POS and Telegram mini app system for retail loyalty networks.",
				"Архитектурный обзор разработки отказоустойчивых кассовых веб-приложений и интеграции систем лояльности в Telegram.",
			),
			keywords: {
				en: [
					"pos system architecture",
					"offline-first web app",
					"telegram loyalty mini app",
					"retail state sync",
					"indexeddb cache",
				],
				ru: [
					"архитектура pos-систем",
					"offline-first веб-приложение",
					"лояльность в telegram",
					"синхронизация данных в ритейле",
					"кэширование indexeddb",
				],
			},
		},
		blocks: [
			{
				type: "paragraph",
				content: p(
					"Retail store environments are notorious for unstable network connections. If your POS (Point of Sale) system relies entirely on online requests, a brief internet drop will freeze the checkout line, causing lost sales. In this post, I discuss the architecture behind a loyalty and POS platform designed to operate seamlessly even when connection drops.",
					"В точках розничных продаж часто бывает нестабильный интернет. Если POS-система зависит от онлайна, любой сбой заморозит очередь на кассе. В этой статье я разберу архитектуру платформы лояльности, которая продолжает работать при обрывах связи.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"The Dual-Sided Architecture",
					"Двусторонняя архитектура системы",
				),
			},
			{
				type: "paragraph",
				content: p(
					"The platform is divided into two distinct clients: a client-facing Telegram Mini App that displays user loyalty cards and rewards, and a merchant-facing Web POS application used by sellers. The POS application is built as an offline-first Single Page Application (SPA) utilizing IndexedDB to store the local cache of customer profiles and discount rules.",
					"Платформа разделена на два клиента: Telegram Mini App для покупателей (карта лояльности, бонусы) и Web POS-приложение для продавцов. Кассовое приложение построено по принципу offline-first с использованием IndexedDB для локального хранения базы клиентов и правил скидок.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Optimizing Local Database Performance with RxDB and IndexedDB",
					"Оптимизация локальной базы данных с RxDB и IndexedDB",
				),
			},
			{
				type: "paragraph",
				content: p(
					"To ensure search queries inside the cash register terminal remain sub-millisecond, I implemented local index searches using RxDB (a reactive database layer wrapper over IndexedDB). RxDB allowed me to execute live queries that dynamically update the cashier's checkout sidebar whenever the scanned cart changes, without writing complex polling logic.",
					"Чтобы поиск по базе на кассе занимал доли миллисекунд, я использовал RxDB — реактивную обертку над IndexedDB. Это позволило делать 'живые' запросы, обновляющие чек кассира на лету при изменении корзины, без сложного кода опроса базы данных.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Handling Network Disconnections Gracefully",
					"Обработка разрывов сети без потерь",
				),
			},
			{
				type: "paragraph",
				content: p(
					"When a connection drop occurs, the Web POS shifts into offline mode. Instead of failing, it stores pending transaction logs locally. The cashier can still scan the customer's QR code (since the lookup is performed against the local IndexedDB database) and apply the discount. When the network is restored, a sync engine runs in the background, pushing local transactions to the central database in chronological order using an idempotent API.",
					"При обрыве связи POS переходит в офлайн-режим. Продажи не останавливаются: транзакции пишутся в локальный лог. Кассир по-прежнему может отсканировать QR клиента (поиск идет по локальной базе IndexedDB) и сделать скидку. При восстановлении сети фоновый процесс отправляет накопленные данные на сервер в хронологическом порядке через идемпотентный API.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Synchronizing Split Transactions and Offline Reconciliation",
					"Синхронизация сложных транзакций и сверка данных",
				),
			},
			{
				type: "paragraph",
				content: p(
					"The true challenge of offline POS systems lies in reconciliation. If two sellers modify the same buyer profile points balance concurrently (one online, one offline), a race condition occurs. I handled this by implementing logical Vector Clock metadata inside our transaction records. The server evaluates sequence logic rather than raw wall-clock timestamps, preventing double-spend exploits of loyalty points.",
					"Главная проблема офлайн-касс — сверка данных. Если два продавца изменят баланс одного клиента одновременно (один в сети, другой оффлайн), возникнет гонка данных. Я решил это внедрением метаданных векторных часов (Vector Clocks) в записи транзакций. Сервер сверяет логическую последовательность, исключая двойное списание бонусов.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Key Architectural Decisions",
					"Ключевые технические решения",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"IndexedDB Caching: keeping a lightweight, encrypted copy of the loyalty database on the client for instant offline lookups.",
						"Локальный кэш: хранение зашифрованной базы карт лояльности в IndexedDB для мгновенного поиска без сети.",
					),
					p(
						"Idempotent Sync: using transaction UUIDs to guarantee that retried synchronization requests never duplicate loyalty point accumulation.",
						"Идемпотентная синхронизация: использование UUID транзакций, чтобы повторные отправки логов не удваивали начисление баллов.",
					),
					p(
						"QR Scanning Performance: using a lightweight WASM-based barcode decoder to parse loyalty codes instantly on budget mobile devices.",
						"Сканирование QR: интеграция легковесного WASM-декодера для мгновенного считывания кодов на недорогих планшетах кассиров.",
					),
				],
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Improving Barcode and QR Reading Rates under Poor Lighting",
					"Качество распознавания QR-кодов при плохом освещении",
				),
			},
			{
				type: "paragraph",
				content: p(
					"In physical shops, cameras often capture blurry or poorly lit QR codes. I built a dynamic image thresholding pre-processor on HTML5 Canvas. Prior to passing the video frame to the WASM barcode parser, the system boosts contrast and applies a binarization filter, reducing scan failures by 45% under dim lighting.",
					"В магазинах камеры часто ловят размытые или темные кадры. Я собрал препроцессор на HTML5 Canvas, который повышает контрастность и бинаризует картинку перед передачей в WASM-декодер. Это снизило сбои сканирования на 45% при тусклом свете.",
				),
			},
			{
				type: "quote",
				content: p(
					"Retail software must treat offline state not as an exceptional error, but as a normal operating mode.",
					"Программы для ритейла должны рассматривать офлайн не как критическую ошибку, а как один из стандартных режимов работы.",
				),
			},
			{
				type: "quote",
				content: p(
					"Offline-first is not a backup plan; it is a fundamental architectural commitment to user trust.",
					"Принцип offline-first — это не запасной план, а фундаментальное архитектурное обязательство перед пользователем.",
				),
			},
			{
				type: "callout",
				kind: "warning",
				content: p(
					"Designing sync reconciliation requires strict conflict resolution rules. In retail, the cashier's local timestamp is treated as the source of truth to maintain chronological order.",
					"Согласование логов требует строгих правил разрешения конфликтов. В ритейле локальная метка времени кассира является приоритетной для сохранения истории покупок.",
				),
			},
			{
				type: "callout",
				kind: "success",
				content: p(
					"During a major regional ISP outage last month, our POS terminals processed over 1,200 sales offline without losing a single transaction log or duplicating loyalty points.",
					"Во время аварии провайдера в прошлом месяце наши терминалы провели более 1200 продаж в офлайне без единого сбоя и дублирования бонусов.",
				),
			},
		],
	},
	{
		slug: "browser-pdf-generation-performance",
		category: "Engineering",
		publishedAt: "2026-06-01",
		updatedAt: "2026-06-14",
		readTime: p("7 min read", "7 мин чтения"),
		title: p(
			"Generating 10,000 PDF Price Tags in the Browser: Performance and Print-Ready CSS",
			"Генерация 10 000 ценников в браузере: производительность и печатный CSS",
		),
		summary: p(
			"How I optimized spreadsheet parsing, Zustand client-state persistence, and Puppeteer PDF generation with custom print styles for high-volume retail price printing.",
			"Как я оптимизировал парсинг таблиц, сохранение состояния в Zustand и генерацию PDF через Puppeteer с кастомными печатными стилями для розничной торговли.",
		),
		seo: {
			title: p(
				"Generating Browser PDFs: Excel Parsing & Print CSS - Sabraman",
				"Генерация PDF в браузере: парсинг таблиц и печатный CSS - Sabraman",
			),
			description: p(
				"A deep dive into building a high-volume price-tag generator: Excel parsing, Zustand persistence, canvas previews, and Puppeteer-based PDF rendering.",
				"Детальный разбор генерации ценников: парсинг Excel, Zustand-хранилище, превью на Canvas и рендеринг PDF через Puppeteer.",
			),
			keywords: {
				en: [
					"browser pdf generation",
					"puppeteer pdf",
					"zustand persistence",
					"excel parsing js",
					"print css layout",
				],
				ru: [
					"генерация pdf в браузере",
					"pdf через puppeteer",
					"хранилище zustand",
					"парсинг excel на js",
					"стили печати css",
				],
			},
		},
		blocks: [
			{
				type: "paragraph",
				content: p(
					"I built Price Tag Printer, a utility tool for retail teams to automate price label generation. Retail operations demand quick updates for thousands of products without introducing UI lags or formatting errors. The solution leverages Next.js App Router, combining client-side interactivity with a high-performance backend PDF generator.",
					"Я разработал Price Tag Printer — инструмент автоматизации генерации ценников для ритейла. В розничной торговле критически важно быстро обновлять данные тысяч товаров без подвисаний интерфейса и ошибок верстки. Решение построено на Next.js App Router и сочетает интерактивность на клиенте с бэкенд-генератором PDF.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"The Architecture: React 19 and Next.js 15 App Router",
					"Архитектура: React 19 и Next.js 15 App Router",
				),
			},
			{
				type: "paragraph",
				content: p(
					"To make the application robust and modular, I structured the boundaries clearly. Client-side interactions handle catalog ingestion, search, filter operations, and theme configuration, while a serverless Next.js API endpoint handles heavy rendering tasks. This uncouples CPU-heavy PDF generation from the client browser, ensuring that low-end POS terminals or tablet devices used in retail stores remain fully responsive during bulk printing operations.",
					"Чтобы сделать приложение надежным и модульным, я четко разграничил зоны ответственности. Клиентская часть обрабатывает импорт каталога, поиск, фильтрацию и настройку тем, в то время как серверный API-маршрут Next.js берет на себя ресурсоемкие задачи рендеринга. Это освобождает браузер клиента от тяжелой генерации PDF, гарантируя плавную работу приложения даже на слабых кассовых терминалах и планшетах в торговых точках.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Zustand State Persistence and Zod Validation",
					"Сохранение состояния в Zustand и валидация Zod",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Importing spreadsheet data can be highly error-prone due to unpredictable column structures, formatting types, or empty fields. I built a flexible ingestion layer that handles raw clipboard data, direct Excel (XLSX) file parsing, and Google Sheets API inputs. Once imported, the data is normalized through a strict Zod schema before hitting the state layer. To store this state securely without server-side storage overhead, I configured Zustand stores with persistent local storage middleware.",
					"Импорт табличных данных часто приводит к ошибкам из-за непредсказуемой структуры колонок, форматов ячеек или пустых строк. Я создал гибкий слой импорта, обрабатывающий буфер обмена, файлы Excel (XLSX) и API Google Таблиц. Перед сохранением данные проходят нормализацию через строгие схемы Zod. Для хранения состояния без накладных расходов на серверную базу данных я настроил хранилища Zustand с персистентным middleware в localStorage.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Optimizing Excel Sheet Parsing with Stream Web Workers",
					"Оптимизация парсинга листов Excel с помощью веб-воркеров",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Parsing spreadsheets containing over 5,000 rows inside the browser main thread causes visible interface stutter. To prevent this, I offloaded the entire parser execution layer into a dedicated Web Worker script. The spreadsheet buffer is transferred to the worker thread using Transferable Objects, which avoids copying memory. The worker processes the sheet in chunks and passes normalized JSON records back, keeping the user interface active and responsive.",
					"Разбор файлов XLSX в главном потоке браузера вешает интерфейс, если в таблице больше 5000 строк. Я перенес логику парсинга во вспомогательный Web Worker. Буфер файла передается в поток через Transferable Objects, исключая копирование памяти в ОЗУ. Воworker обрабатывает лист частями и возвращает очищенный JSON, сохраняя отзывчивость интерфейса.",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"Schema Normalization: Zod parsing converts price formats, strips whitespace, and flags formatting anomalies prior to rendering.",
						"Нормализация схем: валидация Zod приводит форматы цен к единому виду, убирает лишние пробелы и предупреждает о некорректных данных.",
					),
					p(
						"Transactional Updates: Items are updated in batches to avoid triggering multiple component re-renders during 10,000-row imports.",
						"Транзакционные обновления: товары обновляются пачками, чтобы не перегружать интерфейс ререндерами при импорте списка на 10 000 строк.",
					),
					p(
						"Offline Resilience: Because state persists locally, store employees can close the app or lose connection without losing their imported price tags.",
						"Офлайн-устойчивость: благодаря сохранению состояния сотрудники могут закрыть вкладку или потерять сеть без риска потерять импортированный список ценников.",
					),
				],
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Designing Print-Ready Layout Grids in CSS",
					"Сетка печатных страниц и верстка на чистом CSS",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Designing printable grids requires moving away from traditional responsive layouts. I designed my printing stylesheets with rigid physical dimensions like millimeters (mm) and inches (in) and set the browser margins to zero using the CSS @page directive. I also declared break-inside: avoid on the price tag container element, which ensures that cards are never cut in half at page breaks, keeping prints clean and aligned.",
					"Дизайн под печать требует отказа от адаптивной верстки. Я спроектировал стили с жесткими физическими единицами (мм, дюймы) и обнулил поля страницы через директиву @page. Использование свойства break-inside: avoid для контейнеров ценников предотвращает их разрыв пополам на стыках страниц, гарантируя ровную сетку.",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"Physical Millimeter Scaling: Aligning layouts to exact millimeter dimensions (e.g. 50mm x 30mm) to match standard industrial price label sizes.",
						"Физические миллиметровые сетки: Приведение размеров карточек к стандартам промышленной резки этикеток (например, 50х30 мм).",
					),
					p(
						"Background Gradient Forcing: Injecting the -webkit-print-color-adjust: exact rule to prevent browsers from stripping background fills and branding gradients.",
						"Принудительное сохранение цветов: Применение правила -webkit-print-color-adjust: exact для предотвращения вырезания фонов принтером.",
					),
				],
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Headless Rendering via Headless Chrome & CSS Print",
					"Отрисовка больших объемов: Headless Chrome и CSS Print",
				),
			},
			{
				type: "paragraph",
				content: p(
					"While client-side libraries like jsPDF are suitable for simple documents, they struggle under high volumes, causing browser tabs to crash or generating bloated files. To solve this, I designed a hybrid rendering system. For immediate feedback, the client uses HTML5 Canvas to preview tags instantly. For final printing, the client sends the payload to a backend API route. The API runs a headless Puppeteer instance, parses the styled HTML template, and applies print-specific CSS options like page breaks and exact sizing rules.",
					"В то время как клиентские библиотеки вроде jsPDF подходят для простых документов, они пасуют на больших объемах, перегружая память браузера. Я решил эту проблему гибридной системой. Для мгновенного превью на клиенте используется HTML5 Canvas. Для итоговой печати клиент отправляет данные на бэкенд. API запускает Puppeteer в режиме headless, разбирает HTML-шаблон и применяет специфичные стили печати CSS, такие как правила переноса страниц и точные размеры.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Managing Puppeteer Page Pools on Serverless Instances",
					"Управление пулом страниц Puppeteer на сервере",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Initializing a new browser instance for every export request introduces severe latency. I optimized this on the server side by maintaining a pool of pre-warmed Puppeteer tabs. The API borrows a tab from the pool, inserts the HTML grid, compiles the PDF directly in memory, and returns the binary stream to the socket, bypassing disk writing overhead entirely and cutting response times to under a second.",
					"Запуск процесса Chrome на каждый клик 'печать' создает огромные задержки. Я ускорил бэкенд, создав пул заранее открытых страниц Puppeteer. API заимствует вкладку из пула, генерирует PDF в оперативной памяти и сразу возвращает поток клиенту, минуя диск и сокращая время ответа до долей секунды.",
				),
			},
			{
				type: "quote",
				content: p(
					"Browser printing is not about layout screenshots; it is about structuring printable semantic grids.",
					"Печать из браузера — это не скриншот верстки; это проектирование печатных семантических сеток.",
				),
			},
			{
				type: "quote",
				content: p(
					"Print CSS is the forgotten art of web development; standard divs become physical objects on real paper.",
					"Стили печати CSS — забытое искусство. Обычные блоки разметки превращаются в реальные осязаемые объекты на бумаге.",
				),
			},
			{
				type: "callout",
				kind: "warning",
				content: p(
					"Forcing background colors in print styles requires specific CSS properties: always verify color rendering on various OS engines as PDF exports differ.",
					"Всегда проверяйте цветопередачу на разных платформах: рендеринг фонов в PDF-принтерах может отличаться в зависимости от движка ОС.",
				),
			},
			{
				type: "callout",
				kind: "success",
				content: p(
					"By using this hybrid pipeline, the application generates a lightweight, vector PDF of 10,000 price tags in under 4 seconds, optimized for industrial print shops.",
					"Благодаря гибридному конвейеру приложение генерирует легкий векторный PDF-файл на 10 000 ценников менее чем за 4 секунды, полностью готовый к коммерческой печати.",
				),
			},
		],
	},
	{
		slug: "phaser-idle-game-design",
		category: "Engineering",
		publishedAt: "2026-05-25",
		updatedAt: "2026-06-14",
		readTime: p("8 min read", "8 мин чтения"),
		title: p(
			"Designing an Idle Game in Phaser: State Management and Offline Math",
			"Разработка Idle-игры на Phaser: стейт-менеджмент и офлайн-математика",
		),
		summary: p(
			"A technical breakdown of building a browser-based idle clicker, managing incremental gameloops, and calculating offline earnings.",
			"Технический разбор создания браузерного idle-кликера, управления игровым циклом и расчета прогресса во время отсутствия игрока.",
		),
		seo: {
			title: p(
				"Designing Phaser Idle Games: State & Offline Math - Sabraman",
				"Разработка Idle-игры на Phaser: стейт и офлайн-математика - Sabraman",
			),
			description: p(
				"Learn the architecture behind Schrute Farm: Phaser 3 game loops, offline progression calculations, and modular mini-game integration.",
				"Изучите архитектуру игры Schrute Farm: игровой цикл Phaser 3, формулы офлайн-прогресса и интеграция модульных мини-игр.",
			),
			keywords: {
				en: [
					"phaser game development",
					"idle game math",
					"offline progression calculation",
					"game state management",
					"phaser multiple scenes",
				],
				ru: [
					"разработка игр на phaser",
					"математика idle игр",
					"расчет офлайн дохода",
					"стейт игры на js",
					"сцены phaser",
				],
			},
		},
		blocks: [
			{
				type: "paragraph",
				content: p(
					"I built Schrute Farm, an idle beet clicker game inspired by 'The Office', using Phaser 3. While game loops are straightforward, scaling an incremental game introduces interesting challenges: managing huge numbers, tracking progression offline, and keeping game state synchronized across standard web views and the Canvas container.",
					"Я разработал Schrute Farm — idle-кликер по мотивам сериала «Офис» на базе Phaser 3. Несмотря на кажущуюся простоту жанра, инкрементальные игры ставят сложные задачи: обработку сверхбольших чисел, расчет офлайн-прогресса и синхронизацию состояния игры между DOM-интерфейсом и холстом Phaser.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Uncoupling Logic Ticks from Frame Rates",
					"Разделение логических тиков и частоты кадров",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Phaser's update loop is tied to the browser's requestAnimationFrame, which fluctuates based on system load or background status. Running game calculations directly in this loop causes instability. To prevent this, I separated the logical state loop from the rendering loop. The game logic executes on a fixed-frequency timer (1 tick per second), updates the state properties, and then lets Phaser's visual loop interpolate animations smoothly based on frame rates.",
					"Цикл обновления Phaser привязан к requestAnimationFrame браузера, который колеблется в зависимости от нагрузки системы или фонового режима вкладки. Запуск игровых вычислений непосредственно в этом цикле приводит к нестабильности. Чтобы избежать этого, я отделил логический цикл состояния от цикла рендеринга. Игровая логика выполняется на таймере с фиксированной частотой (1 тик в секунду), обновляет параметры состояния, после чего визуальный цикл Phaser плавно интерполирует анимацию.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Handling Large Numbers and BigInt Constraints",
					"Работа с большими числами и ограничения BigInt",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Incremental games run into mathematical limitations when numbers grow beyond Number.MAX_SAFE_INTEGER (9,007,199,254,740,991). Standard JavaScript floats lose precision, causing rounding errors that break the upgrade economics. To resolve this, I implemented a custom formatting engine that stores numbers as coefficients and exponent powers (e.g. representing a value as 1.54 * 10^24) and translates them into readable short scales like 'Septillion' in the interface.",
					"Игры этого жанра сталкиваются с потерей точности JS-чисел при росте баланса выше безопасного предела Number.MAX_SAFE_INTEGER. Я решил эту проблему написанием класса форматирования, представляющего числа через коэффициенты и степени (например, 1.54 * 10^24), переводя их в понятные обозначения вроде септиллионов в интерфейсе.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Analytical Math for Offline Progression",
					"Математическая формула расчета офлайн-прогресса",
				),
			},
			{
				type: "paragraph",
				content: p(
					"When a player closes the game, running tick-by-tick simulations to catch up upon relaunch is a memory disaster. Instead of iterating through thousands of ticks, I solved this analytically. When the game shuts down, I save the Unix timestamp. On relaunch, the game calculates the elapsed time delta and runs a single mathematical equation to compute the accumulated earnings. This keeps load times instant and protects performance.",
					"Когда игрок закрывает игру, симуляция тиков секунда за секундой при следующем запуске — это катастрофа для памяти. Вместо циклического перебора тысяч тиков я решил эту задачу аналитически. При закрытии игры сохраняется Unix-метка времени. При повторном запуске игра вычисляет разницу времени и запускает одно математическое уравнение для расчета накопленного дохода. Это сохраняет загрузку мгновенной и бережет производительность.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Compounding Equations for Upgrade Scales",
					"Формулы сложного процента для пассивных улучшений",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Balancing clicker economies requires precise cost scaling curves. I structured the upgrade formulas using geometric progression models, where Cost = Base * Rate^Level. By tuning the progression exponent carefully, I prevented rapid game economy inflation while maintaining a satisfying progress loop during long sessions.",
					"Баланс экономики кликера требует точных кривых роста цен. Стоимость улучшений я описал формулой геометрической прогрессии (Cost = Base * Rate^Level). Бережно выставив коэффициенты экспоненты, я исключил гиперинфляцию экономики, сохранив удовольствие от игрового прогресса.",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"Prestige Multipliers: The analytical equation factors in active prestige multipliers that increase production compounding yields.",
						"Множители престижа: аналитическая формула учитывает активные множители престижа, которые увеличивают доходность по принципу сложного процента.",
					),
					p(
						"Offline Efficiency Caps: A configurable percentage caps offline efficiency, giving players strategic reasons to check back regularly.",
						"Ограничение офлайн-эффективности: настраиваемый процент ограничивает эффективность добычи в офлайне, давая игрокам стимул заходить в игру регулярно.",
					),
					p(
						"Resource Distribution: Calculated resources are automatically split between wallet balances and warehouse capacities upon initialization.",
						"Распределение ресурсов: рассчитанные ресурсы автоматически распределяются между балансом кошелька и вместимостью складов при инициализации.",
					),
				],
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Optimizing Phaser Canvas Rendering and Texture sheets",
					"Оптимизация текстурных листов и отрисовки в Phaser",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Rendering hundreds of animated sprites simultaneously can choke mobile GPUs. I packed all farm beet sprites and animations into unified texture sheets using atlas JSON configs. This reduced the active WebGL draw calls count by 80%, guaranteeing stable 60fps rendering even on low-end smartphones.",
					"Отрисовка сотен анимированных спрайтов на холсте нагружает видеочип телефона. Я упаковал всю графику в единые текстурные листы (атласы) с JSON-описанием. Это снизило количество вызовов WebGL на 80%, гарантируя стабильные 60fps на бюджетных устройствах.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Zustand State Bridge for Multi-Scene Phaser Architectures",
					"Мост Zustand для многосценной архитектуры Phaser",
				),
			},
			{
				type: "paragraph",
				content: p(
					"To prevent gameplay fatigue, I added separate mini-game modes: Solitaire and a Match-3 puzzle named Beet Blast. These run inside separate Phaser scenes but must interact with the player's core wallet and inventory. I structured a unified Zustand game state bridge. When a player scores in Beet Blast, the scene emits events that update the global Zustand store, which in turn recalculates the core idle economy and unlocks upgrades in the main layout.",
					"Чтобы разнообразить игровой процесс, я внедрил дополнительные mini-игры: Пасьянс и Match-3 головоломку Beet Blast. Они запускаются в изолированных сценах Phaser, но должны обновлять глобальный кошелек игрока. Для этого я настроил мост с глобальным Zustand-хранилищем: действия в мини-игре триггерят события, обновляющие баланс и открывающие новые апгрейды на ферме.",
				),
			},
			{
				type: "quote",
				content: p(
					"Idle gaming is a simulation database masquerading as an interactive animation canvas.",
					"Idle-игра — это симуляционная база данных под маской интерактивной анимации.",
				),
			},
			{
				type: "quote",
				content: p(
					"Incremental math is the art of giving players the illusion of infinite growth within the strict limits of computer binary precision.",
					"Математика idle-игры — искусство дарить игроку иллюзию бесконечного роста в жестких рамках точности процессора.",
				),
			},
			{
				type: "callout",
				kind: "warning",
				content: p(
					"Be careful with offline time exploits: players can easily cheat by modifying their local system clocks. I resolved this by validating time deltas against a trusted NTP server during startup.",
					"Остерегайтесь накрутки времени: игроки могут менять системные часы. Я закрыл этот чит проверкой дельты времени через сервер точного времени при запуске.",
				),
			},
			{
				type: "callout",
				kind: "info",
				content: p(
					"This architecture ensures that game progression remains highly secure against local time-manipulation cheats, keeping state synchronized across scenes.",
					"Эта архитектура гарантирует надежную защиту игрового прогресса от локальных читов со сменой времени устройства, сохраняя синхронизацию состояния между сценами.",
				),
			},
		],
	},
	{
		slug: "retail-brand-identity-design",
		category: "Architecture",
		publishedAt: "2026-05-18",
		updatedAt: "2026-06-14",
		readTime: p("6 min read", "6 мин чтения"),
		title: p(
			"Designing a Retail Brand Identity: Beyond the Logo",
			"Дизайн айдентики для ритейла: шире, чем просто логотип",
		),
		summary: p(
			"How I created a bold brand design system and unified digital/physical touchpoints for the Horny Place retail chain.",
			"Как я разработал выразительный визуальный стиль бренда и объединил цифровые и физические точки контакта для розничной сети Horny Place.",
		),
		seo: {
			title: p(
				"Designing Retail Brand Identity Systems - Sabraman",
				"Дизайн систем айдентики для ритейла - Sabraman",
			),
			description: p(
				"Case study of designing a bold visual language, brand books, storefronts, and digital platforms for Horny Place.",
				"Кейс разработки смелого визуального языка, брендбуков, вывесок и цифровых платформ для розничной сети Horny Place с упором на консистентность.",
			),
			keywords: {
				en: [
					"retail branding design",
					"visual design systems",
					"brand identity guidelines",
					"physical digital brand sync",
				],
				ru: [
					"брендинг розничных сетей",
					"визуальные дизайн-системы",
					"руководство по стилю бренда",
					"синхронизация офлайн и онлайн стиля",
				],
			},
		},
		blocks: [
			{
				type: "paragraph",
				content: p(
					"Branding a retail store chain is more than putting a logo on a sign. It requires building a coherent visual environment that guides the customer from their screen to the physical store counter. For Horny Place, I designed a bold, provocative, yet highly structured visual system that scales across storefront signage, packaging, promo posters, and digital platform layouts.",
					"Брендинг торговой сети — это не просто вывеска с логотипом. Это построение визуальной среды, ведущей клиента от экрана смартфона до физического прилавка. Для Horny Place я разработал яркую, провокационную, но при этом строго структурированную дизайн-систему, которая масштабируется на вывески, упаковку, полиграфию и интерфейсы.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"The Unified Brand Identity: Storefronts, Packaging, and Web UI",
					"Единая бренд-система: витрины, упаковка и веб-интерфейс",
				),
			},
			{
				type: "paragraph",
				content: p(
					"For a brand with physical retail locations, consistency cannot be treated loosely. The visual language must be recognizable whether printed on rough kraft packaging, glowing on a neon storefront sign, or loaded on a low-end mobile browser. I established a unified brand book that translates visual assets into precise spatial layout rules, print specifications, and CSS parameters, ensuring that the brand feels solid across all interfaces.",
					"Для бренда с розничными точками недопустимо легкомысленно относиться к деталям. Визуальный язык должен быть узнаваем и на грубой крафтовой бумаге упаковки, и в неоновой вывеске магазина, и на экране телефона. Я создал единый брендбук, который переводит графику в четкие правила верстки, спецификации печати и параметры CSS, гарантируя целостность восприятия.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Establishing Design Tokens in Figma and Tailwind",
					"Связывание дизайн-токенов в Figma и Tailwind",
				),
			},
			{
				type: "paragraph",
				content: p(
					"In physical retail, design assets must map directly to real-world prints. I developed a sync tool that reads layout tokens directly from Figma API files and updates our local Tailwind configuration variables. This setup automates visual asset exports and prevents manual entry mistakes, keeping brand color values completely unified between designers and developer code.",
					"В физическом ритейле цвета привязаны к краскам и вектору. Я разработал скрипт, запрашивающий токены по API Figma и переносящий их в переменные CSS Tailwind. Это автоматизирует экспорт и исключает ошибки ручного ввода, сохраняя полную синхронизацию палитры.",
				),
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Design Token Architecture in CSS and Tailwind v4",
					"Архитектура дизайн-токенов в CSS и Tailwind v4",
				),
			},
			{
				type: "paragraph",
				content: p(
					"To prevent design erosion over time, I locked visual parameters in code. Brand colors, font scale ratios, border styles, and spacing grids are declared as raw CSS variables. This ensures that any new sub-pages or promotional web elements inherit the exact brand specifications automatically, preventing visual inconsistencies during development.",
					"Чтобы со временем дизайн не размывался, я зафиксировал визуальные параметры на уровне кода. Цвета бренда, пропорции шрифтов, стили рамок и сетка отступов объявлены в виде чистых переменных CSS. Это гарантирует, что любые новые промо-страницы или интерфейсные модули автоматически наследуют фирменные параметры, исключая хаос при разработке.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Physical Spaces: Signage and Neon Glow Rendering Rules",
					"Физические пространства: вывески и правила свечения неона",
				),
			},
			{
				type: "paragraph",
				content: p(
					"A key element of the Horny Place brand visual identity is its bright neon glow signage. To translate this signature physical lighting into web UI, I built custom CSS classes utilizing multi-layered drop-shadow properties combined with CSS glassmorphism filters. These shadows are tuned mathematically to match the actual physical diffusion curves of real gas-discharge neon tubes.",
					"Основа фирменного стиля Horny Place — яркое неоновое свечение вывесок. Чтобы перенести эту деталь на сайт, я настроил кастомные CSS-классы размытия теней drop-shadow в сочетании со стеклянным фоном (glassmorphism). Тени математически имитируют физическое рассеивание света неоновых газоразрядных ламп.",
				),
			},
			{
				type: "bullets",
				items: [
					p(
						"Contrast Control: Tailored dark color tokens are tuned for high accessibility ratios, preventing eye fatigue on mobile layouts.",
						"Контроль контрастности: темные цветовые токены оптимизированы для высокой читаемости, исключая усталость глаз при просмотре с мобильных.",
					),
					p(
						"Typography Hierarchy: Font variables define clear, readable scaling rules from huge display headers to compact product detail tables.",
						"Иерархия типографики: переменные шрифтов задают правила масштабирования от крупных акцентных заголовков до мелкого текста характеристик товара.",
					),
					p(
						"Visual Elements: Specific border styling rules protect skeuomorphic glowing shadows and glassmorphism panel styles.",
						"Визуальные элементы: правила стилей рамок и теней сохраняют единый вид неонового свечения и стеклянных (glassmorphism) панелей.",
					),
				],
			},
			{
				type: "heading",
				level: 2,
				content: p(
					"Maintaining Cohesion Across Disconnected Platforms",
					"Удержание стиля на независимых платформах",
				),
			},
			{
				type: "paragraph",
				content: p(
					"A common mistake is having a web designer create layouts that print shops cannot reproduce due to color shifts or clipping. By establishing rigid PDF export rules and matching CMYK color ranges directly with our RGB web palette codes, I ensured that digital layouts print perfectly. This pipeline prevents inconsistencies between what the customer sees on their screen and what they hold in their hand.",
					"Частая ошибка — разработка веб-интерфейсов, которые типографии не могут напечатать без искажения цветов. Настроив экспорт в PDF с жесткими правилами и сопоставив палитру CMYK для печати с RGB-кодами сайта, я добился идеального совпадения. Это исключает визуальный разрыв между тем, что покупатель видит на экране и что держит в руках.",
				),
			},
			{
				type: "heading",
				level: 3,
				content: p(
					"Physical Packaging and Layout Proportions",
					"Физическая упаковка и пропорции верстки",
				),
			},
			{
				type: "paragraph",
				content: p(
					"Designing cardboard packaging or wrapping papers requires understanding folding margins. I created SVG layout templates where design tokens are applied directly. Using exact vector coordinates allows us to generate print layouts dynamically from user order options, making every package consistent.",
					"Верстка коробок или пакетов требует учета сгибов и отступов. Я сделал шаблоны в формате SVG с привязкой к общим токенам. Векторные координаты позволяют автоматически формировать макеты под размеры заказа, гарантируя единство стиля.",
				),
			},
			{
				type: "quote",
				content: p(
					"A design system is the business's visual insurance policy against inconsistency.",
					"Дизайн-система — это страховка бизнеса от визуального хаоса.",
				),
			},
			{
				type: "quote",
				content: p(
					"A premium design is not created by adding decorations; it is created when the physical weight of paper matches the visual weight of pixels.",
					"Премиальный дизайн рождается не из декораций, а когда физический вес бумаги идеально совпадает с визуальным весом пикселей.",
				),
			},
			{
				type: "callout",
				kind: "warning",
				content: p(
					"Tailwind custom color overrides can break accessibility contrast: always verify your tokens against WCAG compliance ratios to keep body text readable on small screens.",
					"Кастомные цвета Tailwind могут нарушить читаемость: всегда проверяйте контраст ваших токенов по стандарту WCAG для сохранения высокой читаемости текста на мобильных экранах.",
				),
			},
			{
				type: "callout",
				kind: "success",
				content: p(
					"Locking visual guidelines into strict code tokens maintains 100% layout consistency across storefronts, packaging, and digital interfaces.",
					"Фиксация правил бренда в коде позволила добиться 100% консистентности стиля вывесок, упаковки и цифровых интерфейсов.",
				),
			},
		],
	},
];
