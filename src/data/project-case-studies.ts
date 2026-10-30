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
	updatedAt: string;
	publishedAt?: string;
	hero: {
		badge: LocaleText;
		summary: LocaleText;
	};
	sections: CaseStudySection[];
	faq: CaseStudyFaqItem[];
	seo: CaseStudySeo;
};

type ProjectCaseStudyDraft = Omit<
	ProjectCaseStudy,
	"publishedAt" | "updatedAt"
> & {
	publishedAt?: string;
};

const section = (
	id: string,
	title: LocaleText,
	paragraphs: LocaleText[],
	bullets?: LocaleText[],
): CaseStudySection => ({ id, title, paragraphs, bullets });

const p = (en: string, ru: string): LocaleText => ({ en, ru });

const CASE_STUDY_UPDATED_AT_BY_SLUG: Record<ProjectSlug, string> = {
	kukaracha: "2026-10-24",
	daariatrans: "2026-10-24",
	"lunaria-search-ecosystem": "2026-06-14",
	"arch-taplink": "2026-06-14",
	"flower-mini-app": "2026-06-14",
	"horny-place": "2026-06-14",
	"plonq-ai-search": "2026-06-14",
	"price-tag-printer": "2026-06-14",
	"psp-book-reader": "2026-06-14",
	"schrute-farm": "2026-06-14",
	smbro: "2026-06-14",
	"smoky-market-loyalty-miniapp": "2026-06-14",
	vaparshop: "2026-06-14",
	sleepoff: "2026-06-14",
	"spritefusion-pixel-snapper": "2026-06-14",
};

const CASE_STUDY_PUBLISHED_AT_BY_SLUG: Record<ProjectSlug, string> = {
	kukaracha: "2026-10-22",
	daariatrans: "2026-10-12",
	"lunaria-search-ecosystem": "2026-06-12",
	"arch-taplink": "2025-05-10",
	"flower-mini-app": "2025-08-15",
	sleepoff: "2026-06-14",
	"spritefusion-pixel-snapper": "2026-06-14",
	"horny-place": "2026-01-20",
	"plonq-ai-search": "2026-02-10",
	"price-tag-printer": "2026-03-01",
	"psp-book-reader": "2025-11-15",
	"schrute-farm": "2024-04-12",
	smbro: "2025-03-22",
	"smoky-market-loyalty-miniapp": "2025-09-10",
	vaparshop: "2025-06-15",
};

const PROJECT_CASE_STUDIES_BASE = {
	kukaracha: {
		slug: "kukaracha",
		projectId: "kukaracha",
		visibility: PROJECT_BY_SLUG.kukaracha.visibility,
		status: PROJECT_BY_SLUG.kukaracha.status,
		hero: {
			badge: p(
				"Retail Operations OS & AI Automation",
				"Операционная система ритейла и AI-автоматизация",
			),
			summary: p(
				"Unified retail OS for Kukaracha and Runduk: Astro + React B2B portal, SQLite expiration tracker, interactive staff LMS, and Whisper-powered cashier bot.",
				"Комплексная операционная платформа торговой сети «Кукарача» и «Рундук»: B2B-портал на Astro и React, база сроков годности на SQLite, интерактивная база знаний персонала и кассовый Telegram-бот с Whisper STT.",
			),
		},
		sections: [
			section(
				"context",
				p(
					"Problem and retail operations context",
					"Контекст и проблемы розничной сети",
				),
				[
					p(
						"A fast-growing multi-brand regional retail network across Murmansk («Кукарача» — Asian delicacies and food market, «Рундук» — Arctic souvenirs and northern delicacies, 13+ retail points) faced escalating operational friction on the retail floor.",
						"Быстрорастущая мультибрендовая розничная сеть в Мурманске («Кукарача» — азиатские деликатесы и маркет, «Рундук» — арктические сувениры и северная гастрономия, 13+ точек) столкнулась с нарастающим трением в ежедневных операциях торговых залов.",
					),
					p(
						"Point-of-sale restock requests for house-brand products were lost in chaotic Telegram chats; cashier review rewards required tedious manual counting; store clerks lacked quick on-shift guidance for airport liquid rules, 11:00-21:00 alcohol regulations, and foreign tourist interactions.",
						"Заявки на дозаказ позиций СТМ «По Северу» тонули в общих чатах; расчет мотивационных выплат за отзывы требовал вечерней ручной проверки менеджерами; у продавцов на смене не было быстрого доступа к регламентам провоза жидкостей в аэропорту, закону об алкоголе 11:00–21:00 и работе с туристами.",
					),
					p(
						"Additionally, product margins and expiration dates across thousands of SKUs were difficult to track consistently without a lightweight, mobile-first floor interface tailored to retail staff smartphones.",
						"Кроме того, контроль маржинальности и сроков годности по тысячам позиций требовал простого mobile-first интерфейса, рассчитанного на реальные условия работы персонала на смартфоне.",
					),
				],
			),
			section(
				"architecture",
				p(
					"Edge portal and serverless data architecture",
					"Edge-архитектура портала и слой данных",
				),
				[
					p(
						"We built Severu CRM as a high-performance edge web platform on Astro, React, TypeScript, and shadcn/ui, deployed directly to Cloudflare Pages for ultra-low latency mobile access.",
						"Мы спроектировали и разработали единый портал Severu CRM на стеке Astro, React, TypeScript и shadcn/ui с деплоем на Cloudflare Pages для минимальной задержки при загрузке на мобильных устройствах продавцов.",
					),
					p(
						"A lightweight SQLite database engine (`sroki.db` / `server-sroki.ts`) handles store expiration tracking and B2B ordering catalogs, providing instant client filtering with zero monthly hosting overhead.",
						"Легковесный слой данных на SQLite (`sroki.db` / `server-sroki.ts`) обеспечивает ведение сроков годности и каталог позиций для дозаказа, гарантируя мгновенную фильтрацию без затрат на инфраструктуру.",
					),
					p(
						"The Telegram cashier assistant is built with Python and Cloudflare Workers, integrating faster-whisper / Deepgram voice transcription, YuNet face detection for review verification, and direct SBIS POS lookup endpoints.",
						"Кассовый Telegram-бот построен на Python и Cloudflare Workers, объединяя голосовую транскрипцию через faster-whisper / Deepgram, детекцию лиц YuNet для подтверждения отзывов и интеграцию со СБИС.",
					),
				],
				[
					p(
						"Astro + React + shadcn/ui edge portal on Cloudflare Pages",
						"Edge-портал на Astro, React и shadcn/ui на Cloudflare Pages",
					),
					p(
						"SQLite-backed expiration tracking and B2B ordering",
						"Учёт сроков годности и B2B-заказник на SQLite",
					),
					p(
						"Cashier Telegram assistant with voice-to-lead STT and SBIS POS sync",
						"Кассовый бот с голосовой фиксацией упущенных продаж и синхронизацией СБИС",
					),
				],
			),
			section(
				"features",
				p(
					"B2B ordering, interactive LMS, and cashier bot",
					"B2B-заказник, интерактивная база знаний и кассовый бот",
				),
				[
					p(
						"1-Click Store Restocking: Branch staff can browse the proprietary 'По Северу' catalog by SKU and submit verified replenishment orders instantly, eliminating text-based order confusion.",
						"Заказ СТМ в 1 клик: продавцы формируют дозаказ фирменной линейки «По Северу» по артикулам в один клик без ручной переписки в чатах.",
					),
					p(
						"Interactive Knowledge Base & LMS: Dedicated guides for Runduk (16 artisan souvenir masters, 100ml air travel restrictions), Kukaracha (tap beverages, draft noodles), and tourist communication, complete with on-shift compliance quizzes.",
						"Интерактивная база знаний и LMS: регламенты под бренды «Рундук» (крафт 16 мастеров, авиаправила 100 мл), «Кукарача» (краны, рамёны, закон 11:00–21:00) и правила для туристов с проверочными тестами.",
					),
					p(
						"Cashier Motivation & Voice Lost Sales: Automated validation for customer Google/Yandex 5-star reviews with selfie verification (+100 ₽ bonus counter), 2-second tour-guide SBIS cashback lookup (15%), and instant voice-memo capture of out-of-stock customer requests.",
						"Мотивация кассиров и голосовой фикс: автоматический подсчет бонусов за отзывы с селфи (+100 ₽ к смене), поиск гидов в СБИС (15% кэшбэк) за 2 секунды и голосовая фиксация упущенного спроса.",
					),
				],
			),
			section(
				"tooling",
				p(
					"Data analysis, invoice processing, and E2E testing",
					"Анализ накладных, обработка данных и E2E-тесты",
				),
				[
					p(
						"We processed 156+ supplier invoices representing 18,500+ SKUs using custom Python data pipelines. The audit calculated weighted markup multipliers (2.74x overall, 4.9–6.4x on proprietary northern products) and mapped monthly sales seasonality.",
						"С помощью кастомных Python-скриптов обработали 156+ накладных поставщиков (18 500+ позиций). Анализ выявил среднюю наценку 2.74x (4.9–6.4x на собственную линейку «По Северу») и сезонный профиль сети.",
					),
					p(
						"Automated end-to-end testing with Playwright scripts (`ui_e2e.py`, `e2e_flow.py`) validates cart interactions, catalog searches, and mobile layout rendering across device viewports.",
						"Автоматизированные E2E-тесты на Playwright (`ui_e2e.py`, `e2e_flow.py`) гарантируют безошибочную работу корзины, каталога и адаптивной верстки на мобильных экранах.",
					),
				],
			),
			section(
				"outcome",
				p(
					"Operational impact and business results",
					"Результаты и операционный эффект",
				),
				[
					p(
						"Reduced daily store replenishment ordering overhead from 25 minutes to under 2 minutes per point, eliminating incorrect SKU shipments.",
						"Сократили время оформления ежедневного дозаказа с 25 до 2 минут на точку, полностью исключив ошибки в отгрузках артикулов.",
					),
					p(
						"Automated review reward auditing, supporting continuous 5.0-star customer ratings across 2GIS and Yandex Maps across all branches with zero manual managerial effort.",
						"Автоматизировали учет бонусов за отзывы покупателей, поддержав рейтинг 5.0 на 2ГИС и Яндекс Картах по всем филиалам сети.",
					),
					p(
						"Accelerated floor clerk onboarding via interactive training modules and real-time regulatory compliance checks.",
						"Ускорили стажировку новых продавцов через интерактивные тесты и мгновенный доступ к правилам обслуживания.",
					),
				],
			),
			section(
				"tradeoffs",
				p(
					"Architecture decisions and constraints",
					"Инженерные решения и компромиссы",
				),
				[
					p(
						"Selected Astro with partial hydration instead of a client-heavy SPA to ensure instant first contentful paint inside basement retail stores with weak 4G reception.",
						"Выбрали Astro с точечной гидратацией вместо тяжелого SPA, обеспечив мгновенное открытие каталога и регламентов даже в цокольных помещениях с плохой связью.",
					),
					p(
						"Opted for an embedded SQLite database for expiration tracking rather than an external managed SQL service, keeping operating infrastructure costs at zero while ensuring instant query response times.",
						"Использовали SQLite для базы сроков годности вместо внешнего платного SQL-кластера, сохранив нулевую стоимость хостинга при субмиллисекундном отклике.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"How does the cashier bot calculate review motivation?",
					"Как бот кассира начисляет бонусы за отзывы?",
				),
				answer: p(
					"Cashiers submit photos of customer reviews and selfies; the bot validates the entry, adds +100 ₽ to the shift report, and eliminates manual managerial auditing.",
					"Кассир отправляет фото отзыва покупателя и селфи; бот валидирует заявку, начисляет +100 ₽ в смену и формирует прозрачную сводку без ручной проверки управляющим.",
				),
			},
			{
				question: p(
					"Why deploy the portal on Cloudflare Pages with Astro?",
					"Почему для портала были выбраны Astro и Cloudflare Pages?",
				),
				answer: p(
					"Astro delivers zero-JS static HTML for content pages and hydrates only interactive order buttons, guaranteeing fast performance on retail floor smartphones.",
					"Astro отдает чистый HTML для базы знаний и гидрирует только интерактивную корзину, обеспечивая максимальную скорость на смартфонах продавцов.",
				),
			},
			{
				question: p(
					"How does voice-driven lost sales tracking work?",
					"Как работает фиксация упущенных продаж голосом?",
				),
				answer: p(
					"When an item is unavailable, the clerk dictates a 5-second voice note. The bot transcribes it via Whisper, extracts the SKU, and routes it to procurement analytics.",
					"При отсутствии нужного товара продавец надиктовывает короткое голосовое сообщение. Бот транскрибирует аудио через Whisper, извлекает наименование и передает в отдел закупок.",
				),
			},
		],
		seo: {
			title: p(
				"Severu Retail Suite & Kukaracha Retail OS - Case Study",
				"Severu Retail Suite: Операционная система ритейла «Кукарача» - Кейс",
			),
			description: p(
				"Technical case study: Astro + React retail portal, SQLite expiration tracking, cashier Telegram assistant with Whisper STT, and invoice big data analytics.",
				"Технический разбор: B2B-портал на Astro и React, учёт сроков годности на SQLite, кассовый Telegram-бот с Whisper STT и анализ накладных сети «Кукарача».",
			),
			keywords: {
				en: [
					"retail OS",
					"Astro",
					"React",
					"Telegram Bot",
					"Whisper STT",
					"Cloudflare Pages",
					"Kukaracha",
					"Runduk",
				],
				ru: [
					"ритейл",
					"Astro",
					"React",
					"Telegram бот",
					"Whisper STT",
					"Cloudflare Pages",
					"Кукарача",
					"Рундук",
				],
			},
			ogSubtitle: p(
				"Retail operations portal, 1-click B2B restocking, and AI cashier Telegram assistant.",
				"Операционный портал розничной сети, B2B-заказник в 1 клик и кассовый AI-ассистент.",
			),
		},
	},
	daariatrans: {
		slug: "daariatrans",
		projectId: "daariatrans",
		visibility: PROJECT_BY_SLUG.daariatrans.visibility,
		status: PROJECT_BY_SLUG.daariatrans.status,
		hero: {
			badge: p(
				"Enterprise Logistics OS & Operational Analytics",
				"Операционная система логистики и аналитика скрытой маржи",
			),
			summary: p(
				"Mission-critical transport platform for an interregional freight carrier: reverse-engineered legacy Delphi SOAP TMS, 10,000+ flight audit uncovering systemic margin variance, sub-30ms DuckDB OLAP engine, combinatorial backhaul consolidation achieving a 4.9% freight procurement reduction, and resilient Proxmox VDI infrastructure.",
				"Отказоустойчивая IT-экосистема крупного межрегионального грузоперевозчика: реверс-инжиниринг Delphi SOAP TMS, аудит 10 000+ рейсов с выявлением скрытой асимметрии маржи до ~40%, sub-30ms DuckDB OLAP-движок, комбинаторная склейка обратки со снижением затрат на закупку на 4.9% и VDI-инфраструктура на Proxmox.",
			),
		},
		sections: [
			section(
				"context",
				p(
					"Legacy TMS constraints, harsh geography, and hidden margin erosion",
					"Контекст логистики, невидимая утечка маржи и ограничения legacy TMS",
				),
				[
					p(
						"A major interregional freight and heavy transport carrier operating across Northwest and Arctic logistics corridors (handling consolidated LTL, oversized equipment, industrial machinery, and regulated contracts) relied on a legacy Delphi desktop TMS with hundreds of database tables and no open APIs.",
						"Крупный межрегиональный грузоперевозчик на Северо-Западном и Арктическом направлениях (сборные грузы LTL, негабаритное промышленное оборудование, спецперевозки) работал на закрытом настольном Delphi-комплексе TMS с сотнями таблиц базы данных и полным отсутствием открытых API.",
					),
					p(
						"While nominal management reports claimed a healthy gross margin of ~27%, actual bank cash flows lagged behind. Data fragmented across multiple corporate mailboxes, dozens of freight exchanges, and phone negotiations obscured heavy empty return mileage and unmonitored intermediary deductions.",
						"В то время как управленческие отчёты рапортовали о номинальной марже около 27%, реальные остатки на счетах систематически отставали. Разрозненность данных между корпоративными ящиками, десятками бирж и телефонными переговорами скрывала высокий порожний пробег и неконтролируемые посреднические вычеты.",
					),
					p(
						"Strict operational constraints ruled out conventional enterprise ERP replacements: active dispatchers could not tolerate system downtime during peak shipping cycles, drivers could not be burdened with intrusive tracking apps during an industry-wide driver shortage, and the project required maximizing capital efficiency on top of existing software assets.",
						"Жёсткие производственные рамки исключали замену системы «в лоб»: диспетчеры не могли прерывать работу на время внедрения тяжёлых ERP, водителей нельзя было перегружать сложными мобильными трекерами под риском схода машин с линии, а решение должно было обеспечить максимальную отдачу без раздувания бюджета на софт.",
					),
				],
			),
			section(
				"architecture",
				p(
					"SOAP DataSnap reverse-engineering and dual-core analytical engine",
					"Реверс-инжиниринг SOAP DataSnap и двухконтурная аналитическая архитектура",
				),
				[
					p(
						"Rather than attempting a disruptive, multi-million enterprise ERP replacement, we non-invasively reverse-engineered the proprietary Delphi SOAP / DataSnap architecture of the TMS server. Extracted and mapped ~90 private RPC methods, enabling direct automated delta writes into the core database provider, route geocoding, exchange deal synchronization, and state electronic consignment note integration (ЭТрН / ГИС ЭПД under federal regulations).",
						"Вместо рискованной и дорогостоящей замены ядра мы применили неинвазивный реверс-инжиниринг проприетарной архитектуры Delphi SOAP / DataSnap сервера TMS. Декомпилировали и задокументировали ~90 RPC-методов, открыв прямую запись дельт в ядро базы данных, геокодирование, синхронизацию биржевых торгов и титулов государственных электронных накладных (ЭТрН / ГИС ЭПД).",
					),
					p(
						"Built a high-performance in-memory DuckDB OLAP engine running sub-30ms analytical aggregations over 10,000+ flights. An AST-validated Natural Language-to-SQL compiler enables non-technical leadership to ask arbitrary business questions, generating verifiable SQL and downloadable .xlsx workbooks with live Excel SUM formulas.",
						"Развернули аналитический in-memory OLAP-движок DuckDB, выполняющий сложные многомерные агрегации по 10 000+ рейсам за 1–30 мс. Компилятор естественных запросов со строгой валидацией AST позволяет руководству формулировать вопросы на естественном языке, получая верифицируемый SQL и скачиваемый Excel с живыми формулами SUM.",
					),
					p(
						"Zero-driver-friction telematics bridge: integrated cellular triangulation and courier tracking webhooks, automatically pinpointing cargo transit milestones and tracking physical waybill delivery between regional logistics hubs without installing mobile apps on driver phones.",
						"Телематический мост без участия водителей: связали сотовую триангуляцию оператора и вебхуки курьерских служб, обеспечив сквозной трекинг движения автопоездов и контроль оригиналов документов между региональными терминалами без установки мобильных приложений водителям.",
					),
				],
				[
					p(
						"Delphi SOAP / DataSnap reverse-engineering (~90 RPC methods mapped)",
						"Реверс-инжиниринг Delphi SOAP / DataSnap (~90 методов API)",
					),
					p(
						"In-memory DuckDB OLAP engine with sub-30ms execution and Excel formula exporter",
						"In-memory OLAP-движок DuckDB с откликом 1–30 мс и генерацией формул Excel",
					),
					p(
						"Zero-driver-friction telematics bridge and document lifecycle watchdog",
						"Телематический мост без приложений водителям и автоматический контроль первички",
					),
				],
			),
			section(
				"features",
				p(
					"Margin leakage forensics, backhaul consolidator, and order conveyor",
					"Форензик утечки маржи, алгоритмическая склейка рейсов и конвейер заявок",
				),
				[
					p(
						"Margin Leakage Forensic Audit: Analyzed tens of thousands of underlying calculation events across 10,000+ historical dispatches. Identified that nominal ~27% gross margin was eroded down to ~17% net operating margin due to asymmetric VAT structures (charging OSNO corporate clients with 20% VAT while paying non-VAT subcontractor carriers) and unclassified intermediary commissions.",
						"Форензик утечки маржинальности: исследовали десятки тысяч расчётных проводок по 10 000+ рейсам. Выявили, что номинальная маржа ~27% снижалась до ~17% чистой операционной маржи из-за асимметрии НДС (клиенты на ОСНО с 20% НДС против привлечённых перевозчиков без НДС) и скрытых посреднических комиссий.",
					),
					p(
						"Combinatorial Backhaul Consolidator: Measured actual empty-haul patterns across thousands of paired vehicle runs, identifying a 74% empty mileage ratio on northern return legs. Built a combinatorial multi-drop engine that clusters compatible LTL shipments, respecting temperature regimes, driver rest limits, and route detour caps to deliver a 4.9% freight procurement reduction.",
						"Алгоритмическая склейка рейсов: измерили реальный порожний пробег по тысячам спаренных рейсов, выявив коэффициент порожняка до 74% на обратном плече. Разработали алгоритм склейки, формирующий цепочки догрузов с учётом температурных режимов, правил режима труда и лимитов отклонения от трассы, обеспечив стабильное снижение затрат на закупку на 4.9%.",
					),
					p(
						"Multi-Mailbox NLP Conveyor: Automated ingestion pipeline aggregating incoming requests across corporate inboxes. Parses unstructured emails, extracts cargo specifications, dimensions, and tender deadlines, and compiles them directly into structured transport orders.",
						"Почтовый NLP-конвейер: единый шлюз сбора входящих запросов по корпоративным ящикам. Обрабатывает входящую почту, извлекает спецификации груза, плечи и дедлайны торгов, автоматически формируя структурированные карточки заявок для логистов.",
					),
				],
			),
			section(
				"tooling",
				p(
					"Full-stack engineering, Proxmox VDI, and 4-tier disaster recovery",
					"Инженерный стек, Proxmox VDI и четырёхуровневый контур резервирования",
				),
				[
					p(
						"Modern Web & Analytics: Next.js 15 App Router, React 19, TypeScript, DuckDB-Wasm, TailwindCSS, and TanStack Table delivering sub-second query performance across large freight portfolios.",
						"Веб-ядро и аналитика: Next.js 15 App Router, React 19, TypeScript, DuckDB-Wasm, TailwindCSS и TanStack Table, обеспечивающие мгновенный отклик при фильтрации многотысячных реестров рейсов.",
					),
					p(
						"Enterprise Virtualization: Proxmox VE hypervisor hosting a master Windows Server VM alongside isolated dispatcher VDI workstations cloned from a standardized Golden Image template, reducing dispatcher workstation provisioning from 4 hours to 15 minutes.",
						"Виртуализация Proxmox VE: выделенная мастер-ВМ Windows Server и изолированные рабочие места VDI, клонируемые из эталонного Golden Image, что сократило развёртывание рабочего места диспетчера с 4 часов до 15 минут.",
					),
					p(
						"Automated 4-Tier Disaster Recovery: 3-hour Volume Shadow Copy (VSS) filesystem snapshots, bi-daily automated database backups via PowerShell, nightly hypervisor-level vzdump images, and offsite secret vault synchronization.",
						"Четырёхуровневое резервирование: 3-часовые теневые копии томов VSS, автоматический экспорт баз данных дважды в сутки через PowerShell, ночные vzdump-снимки на уровне гипервизора и защищённое хранилище секретов.",
					),
				],
			),
			section(
				"outcome",
				p(
					"Audited business outcomes and operational velocity",
					"Подтверждённый бизнес-эффект, защищённый капитал и скорость",
				),
				[
					p(
						"Eliminated systemic margin variance and equipped executive leadership with granular profitability matrices across commodity types (proving packaging and industrial cargo deliver 38% margin, while bulk furniture yields only ~11%).",
						"Ликвидировали системную асимметрию маржинальности и вооружили руководство точной юнит-экономикой по типам грузов (показав, что тара и промышленное оборудование дают 38% маржи, а сборная мебель — лишь ~11%).",
					),
					p(
						"Backhaul consolidation model unlocked a 4.9% reduction in freight procurement costs by systematically converting empty return trips into paid multi-drop corridors.",
						"Модель склейки рейсов обеспечила снижение затрат на наёмный транспорт на 4.9% за счёт системной ликвидации холостых пробегов на ключевых магистралях.",
					),
					p(
						"Accelerated order intake response latency by over 60%, standardized dispatcher workstation onboarding to 15 minutes, and ensured zero-downtime operational resilience across all freight operations.",
						"Сократили время реакции на входящие заявки более чем на 60%, стандартизировали ввод диспетчеров до 15 минут и обеспечили 100% готовность к аварийному восстановлению данных без остановки перевозок.",
					),
				],
			),
			section(
				"tradeoffs",
				p(
					"Engineering tradeoffs and pragmatic architecture",
					"Инженерные компромиссы и прагматизм архитектуры",
				),
				[
					p(
						"Reverse-Engineering vs Monolithic Replacement: Commercial monolithic TMS or ERP licenses would require massive CapEx plus heavy recurring SaaS fees. Reverse-engineering Delphi SOAP delivered modern automation on top of an existing proven system with zero staff retraining downtime.",
						"Реверс-инжиниринг против замены TMS: покупка тяжёлых ERP потребовала бы огромного бюджета и месяцев адаптации персонала. Реверс-инжиниринг Delphi SOAP дал современную автоматизацию поверх проверенной системы с нулевым простоем логистов.",
					),
					p(
						"In-Memory DuckDB vs Cloud Data Warehouse: Rather than maintaining a costly managed cloud cluster, DuckDB operates in-memory directly alongside the application layer, executing analytical queries in single-digit milliseconds at zero cloud infrastructure cost.",
						"In-memory DuckDB вместо облачного хранилища: вместо аренды дорогостоящих облачных кластеров DuckDB работает прямо в памяти процесса, выполняя аналитику за единицы миллисекунд с нулевыми расходами на внешнюю инфраструктуру.",
					),
					p(
						"Cellular Triangulation vs Driver Mobile App: In a severe national driver shortage, demanding drivers install tracking apps leads to driver turnover. Tapping into cellular carrier telematics eliminated 80% of routine check-in calls with zero driver friction.",
						"Сотовая триангуляция вместо приложений водителям: в условиях дефицита кадров водители саботируют установку стороннего софта. Интеграция с сотовой телематикой сняла 80% рутинных звонков диспетчера без единого требования к водителям.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"How was legacy Delphi SOAP TMS reverse-engineered without documentation?",
					"Как был выполнен реверс-инжиниринг Delphi SOAP TMS без документации?",
				),
				answer: p(
					"We analyzed the TMS service binaries and DataSnap protocol structure, mapping ~90 RPC methods across server interfaces. Analyzing live SOAP envelopes allowed replicating automated delta updates directly into the core database provider, exchange deals, and state electronic freight notes (ЭТрН).",
					"Мы исследовали бинарные файлы службы TMS и структуру протокола DataSnap, составив карту ~90 RPC-методов. Анализ SOAP-пакетов позволил воспроизвести запись дельт в провайдер базы данных, синхронизацию бирж и титулов электронных транспортных накладных (ЭТрН).",
				),
			},
			{
				question: p(
					"How did margin leakage analytics reveal the gap between nominal and net margin?",
					"Как аналитика маржинальности вскрыла разрыв между номинальной и чистой маржой?",
				),
				answer: p(
					"Standard reports calculate gross margin as (Customer Price - Carrier Price). Our audit extracted tens of thousands of underlying ledger events, exposing unhedged VAT differentials (charging 20% VAT to clients while paying non-VAT subcontractors) and unclassified commissions that slashed effective operating margins from ~27% down to ~17%.",
					"Стандартные отчёты считали маржу как «ставка заказчика минус ставка перевозчику». Анализ детальных проводок вскрыл скрытые перекосы НДС (клиенты с 20% НДС против перевозчиков без НДС) и неклассифицированные комиссии, снижавшие реальную маржу с ~27% до ~17%.",
				),
			},
			{
				question: p(
					"How does the Backhaul Consolidator algorithm achieve a 4.9% procurement cost reduction?",
					"За счёт чего алгоритм склейки рейсов снижает затраты на закупку транспорта на 4.9%?",
				),
				answer: p(
					"The corridor historically suffered from high empty mileage on return runs. The engine clusters multi-drop backhaul routing matching cargo temperature requirements, driver rest constraints, and maximum detour limits, turning unprofitable empty runs into paid consolidated legs.",
					"Магистраль исторически страдала от высокого порожнего пробега на обратном плече. Алгоритм склейки рассчитывает цепочки догрузов с соблюдением температурных режимов, правил отдыха водителей и лимитов отклонения от трассы, превращая пустые пробеги в оплачиваемые сборные рейсы.",
				),
			},
			{
				question: p(
					"What comprises the 4-tier disaster recovery architecture?",
					"Как устроена 4-уровневая архитектура резервирования?",
				),
				answer: p(
					"Tier 1: 3-hour VSS filesystem shadow copies for instant rollback. Tier 2: Bi-daily automated PowerShell database backups. Tier 3: Nightly hypervisor vzdump full VM snapshots on Proxmox VE. Tier 4: Encrypted credential and secret synchronization.",
					"Уровень 1: 3-часовые теневые копии томов VSS для мгновенного отката файлов. Уровень 2: выгрузка баз данных дважды в сутки через PowerShell. Уровень 3: ночные полные vzdump-образы виртуальных машин на Proxmox VE. Уровень 4: защищённая синхронизация учётных данных.",
				),
			},
		],
		seo: {
			title: p(
				"Daaria Logistics Platform: Enterprise TMS & Analytics Architecture - Case Study",
				"Daaria Logistics Platform: Архитектура корпоративной TMS и аналитика маржи - Кейс",
			),
			description: p(
				"Enterprise case study: reverse-engineering Delphi SOAP TMS, 10,000+ flight audit uncovering margin leakage, sub-30ms DuckDB OLAP engine, combinatorial backhaul consolidation, and Proxmox VDI infrastructure.",
				"Корпоративный кейс: реверс-инжиниринг Delphi SOAP TMS, аудит 10 000+ рейсов с устранением утечки маржи, sub-30ms DuckDB OLAP-движок, склейка рейсов и VDI-инфраструктура на Proxmox.",
			),
			keywords: {
				en: [
					"enterprise logistics",
					"TMS architecture",
					"Delphi SOAP reverse engineering",
					"DuckDB OLAP",
					"margin leakage audit",
					"Proxmox VDI",
					"backhaul consolidation",
					"freight operations",
				],
				ru: [
					"корпоративная логистика",
					"архитектура TMS",
					"реверс-инжиниринг Delphi SOAP",
					"DuckDB OLAP",
					"аудит маржинальности",
					"склейка рейсов",
					"Proxmox VDI",
					"грузоперевозки",
				],
			},
			ogSubtitle: p(
				"Enterprise logistics OS: Delphi SOAP TMS reverse-engineering, margin audit, DuckDB OLAP, and Proxmox VDI.",
				"Платформа логистики: реверс-инжиниринг Delphi SOAP, аудит маржи, DuckDB OLAP и Proxmox VDI.",
			),
		},
	},
	"lunaria-search-ecosystem": {
		slug: "lunaria-search-ecosystem",
		projectId: "lunaria-search-ecosystem",
		visibility: PROJECT_BY_SLUG["lunaria-search-ecosystem"].visibility,
		status: PROJECT_BY_SLUG["lunaria-search-ecosystem"].status,
		hero: {
			badge: p("SEO & AI-Search Ecosystem", "SEO и AI-поисковая экосистема"),
			summary: p(
				"A regional search ecosystem and RAG-optimized content engine built for a floral brand to dominate local query surfaces and AI-driven retrieval.",
				"Региональная поисковая экосистема и RAG-оптимизированный контент-движок для цветочного бренда с целью доминирования в поиске и ИИ-ответах.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"A single corporate website often acts as a visual catalog but fails to address distinct search intents. Lunaria had to engage diverse audiences—retail floral buyers, brides planning weddings, venue seekers, corporate managers, and potential franchisees—each operating with different urgency and language. Mixing these intents onto a single domain dilutes E-E-A-T signals and confuses search engine crawlers.",
					"Один корпоративный сайт часто превращается в компромисс и не справляется с разными поисковыми интентами. Бренду Lunaria требовалось охватить разные аудитории — розничных покупателей, невест, B2B-клиентов и потенциальных франчайзи. Смешивание этих интентов на одном домене размывает сигналы E-E-A-T и путает поисковых роботов.",
				),
				p(
					"Instead of a mixed-intent strategy, we built a modular multi-domain satellite network functioning as a RAG-optimized consensus engine. The goal was to occupy the entire semantic search landscape in Kazan, capturing users at early query phases and preparing for the AI-search era where generative engines prioritize highly structured local authorities.",
					"Вместо этого мы создали модульную сеть доменов-сателлитов, работающую как RAG-оптимизированный консенсусный движок. Целью было занять поисковое поле в Казани по всем смежным темам, выстраивая доверие до прямой продажи и готовясь к эпохе AI-поиска, где генеративные системы выбирают структурированных локальных авторов.",
				),
				p(
					"By separating distinct user journeys into dedicated domains, each site speaks in its audience's direct language: B2B corporate managers see clear contract terms, while retail buyers view bouquet aesthetics and local delivery terms. Every satellite page is designed 'Answer-First', placing the core response in the first 2-5 sentences to match the 44.2% ML retrieval window where LLMs prioritize the top of document chunks.",
					"Разделение путей пользователей позволило каждому сателлиту общаться на языке своей аудитории: B2B-клиенты видят договоры, а розница — букеты. Каждая страница спроектирована по принципу 'Answer-First', выводя ключевой ответ в первых 2-5 предложениях, чтобы попасть в 44.2% окно цитирования, где LLM отдают приоритет началу текстовых чанков.",
				),
			]),
			section(
				"architecture",
				p("Architecture and monorepo", "Архитектура и монорепозиторий"),
				[
					p(
						"The entire ecosystem lives inside a single Next.js and Bun Workspaces monorepo. This allows shared design standards and codebase stability while isolating different business directions into separate client applications: main retail store, franchise portal, wedding media, event venues satellite, and B2B portal.",
						"Вся экосистема развернута в рамках единого Next.js и Bun Workspaces монорепозитория. Это позволяет использовать общие дизайн-токены и контролировать бренд-стиль, разделяя направления на отдельные приложения: розница, франшиза, свадьбы, спутник-площадки и B2B.",
					),
					p(
						"Common elements are extracted into shared packages: `@lunaria/brand` for assets, `@lunaria/ui` for modular interfaces, and `@lunaria/content` for MDX-based blogging mechanics. We prioritized static HTML rendering (SSG/SSR) over client-side JS. Since AI search crawlers often fail to execute complex Javascript, serving pure HTML guarantees that bots can instantly parse and index our pages.",
						"Общие части вынесены в пакеты: `@lunaria/brand` для бренд-ресурсов, `@lunaria/ui` для интерфейсов и `@lunaria/content` для MDX-публикаций. Мы отдали приоритет серверному рендерингу (SSG/SSR) перед клиентским JS: краулеры AI-поисковиков не всегда исполняют JS, поэтому чистый HTML гарантирует моментальный парсинг.",
					),
					p(
						"Routing and domain mapping are configured at the edge layer, directing traffic to individual Next.js applications while sharing a centralized deployment pipeline. A custom sitemap index and open robots.txt configurations ensure that AI crawlers from Perplexity, ChatGPT Search, and Gemini index our content without barriers.",
						"Маршрутизация и доменное маппирование настроены на уровне edge-прокси, направляя трафик на нужные приложения Next.js при сохранении единого конвейера деплоя. Кастомные карты сайтов и открытый robots.txt позволяют краулерам Perplexity, ChatGPT Search и Gemini индексировать контент без преград.",
					),
				],
				[
					p(
						"Static HTML-first multi-site Next.js architecture",
						"Статическая HTML-first архитектура Next.js сайтов",
					),
					p(
						"Shared domain packages in a monorepo",
						"Общие доменные пакеты в монорепозитории",
					),
					p("MDX-driven content pipelines", "Контентная механика на базе MDX"),
				],
			),
			section(
				"features",
				p("Automated editorial engine", "Контентный конвейер"),
				[
					p(
						"To fuel multiple active blogs without manual research fatigue, we designed a workflow powered by n8n. The system analyzes competitors, monitors search query trends, and generates initial content outlines. Instead of generating high-frequency thin content, the pipeline focuses on high information density to trigger gradient shifts in the model's weights.",
						"Для наполнения блогов без рутинного выгорания мы собрали автоматизацию на n8n. Система исследует конкурентов, мониторит поисковые подсказки и сезонные тренды. Вместо генерации спама конвейер нацелен на высокую плотность фактов, вызывающую отклик у функций потерь нейросетей.",
					),
					p(
						"To establish a clear positioning vector, we write using contrastive structures (Hard Negatives). Rather than stating 'Lunaria has quality arrangements', we define what the brand is NOT, creating sharp conceptual boundaries. By using triplet comparisons (Anchor Task - Brand Positive - Negative Alternative), we shape our content to act as semantic Attractors inside the LLM's latent space.",
						"Для формирования четкого вектора позиционирования мы пишем с использованием контрастных структур (Hard Negatives). Вместо фраз вроде 'у нас качественные цветы' мы определяем то, чем бренд НЕ является, создавая жесткие концептуальные границы. Через тройные сравнения мы делаем контент семантическим аттрактором.",
					),
					p(
						"Gemini acts as a draft writer targeting high surprisal and logical consistency. Russian texts avoid corporate jargon. Human oversight remains absolute: three editors curate themes, refine structures, and inject local Kazan context to keep the text engaging, while verifying the factual accuracy of our statistics and tables.",
						"Gemini выступает в роли создателя черновиков, ориентированных на логическую новизну и последовательность. Финальное решение за людьми: три редактора дорабатывают черновики, добавляют локальный контекст Казани и проверяют факты в таблицах данных.",
					),
				],
			),
			section(
				"tooling",
				p("Tooling & integrations", "Инструменты и интеграции"),
				[
					p(
						"Satellites are built on Next.js, MDX, and Tailwind CSS. The automation layer uses self-hosted n8n coupled with Gemini API. Custom RSS generation and semantic sitemaps ensure rapid crawling by search robots. The MDX parser automatically injects structured JSON-LD schemas (FAQPage, Product, Organization) to make our facts highly extractable.",
						"Сайты собраны на Next.js, MDX и Tailwind CSS. Автоматизация работает на self-hosted n8n и Gemini API. Генерация кастомных RSS-лент и семантических sitemaps обеспечивает быструю индексацию. Парсер MDX автоматически внедряет валидный JSON-LD (FAQPage, Product, Organization) для легкого извлечения фактов.",
					),
					p(
						"Design is closely coupled with content constraints: the retail site presents rich dark theme visuals, the wedding blog mimics clean premium media, franchise uses charts, and B2B focuses on contract terms. The author layer is explicitly marked as Person entities to satisfy E-E-A-T requirements.",
						"Дизайн адаптирован под ограничения контента: розница выполнена в темных тонах, свадебный блог напоминает премиальное медиа, франшиза говорит цифрами, а B2B — условиями. Профили авторов явно размечены как сущности Person для соблюдения стандартов E-E-A-T.",
					),
					p(
						"Deployments are managed atomically through modern Vercel/Docker setups, ensuring zero-downtime updates across the monorepo's multiple domains.",
						"Деплой контролируется атомарно через интеграцию Vercel/Docker, гарантируя бесперебойное обновление всех многочисленных доменов монорепозитория.",
					),
				],
			),
			section("outcome", p("Outcome & value", "Результат и эффект"), [
				p(
					"By splitting brand presence by search intents, Lunaria established a persistent organic marketing asset. When multiple independent satellites confirm the same facts (e.g. event venue sizes, suppliers), the AI search engine synthesis module verifies the consensus and cites Lunaria, driving up our Share of Voice (SoV).",
					"Разделив присутствие бренда по поисковым интентам, Lunaria получила долговечный маркетинговый актив. Когда независимые сателлиты подтверждают одни и те же факты, ИИ-поисковики верифицируют этот консенсус и цитируют бренд, увеличивая долю упоминаний (Share of Voice).",
				),
				p(
					"Highly structured MDX pages and rich Schema.org markups make the ecosystem highly visible to modern search engines and AI assistants, turning content into a regional brand moat that continues to bring organic and AI-referral traffic without continuous ad spend.",
					"Структурированные MDX-страницы и разметка Schema.org делают экосистему видимой для поисковиков и AI-ассистентов, превращая контент в региональный ров бренда, который генерирует органический и AI-referral трафик без рекламного бюджета.",
				),
				p(
					"Organic search traffic increased by 180% within the first six months, and the brand achieved dominant visibility in regional AI search answers across Perplexity and YandexGPT.",
					"Органический поисковый трафик вырос на 180% за первые шесть месяцев, а бренд занял лидирующие позиции в региональных AI-ответах Perplexity и YandexGPT.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints & tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Managing multiple domains and satellites in a monorepo reduces redundancy but increases initial setup complexity and routing overhead in next.config.js.",
						"Управление несколькими доменами и сателлитами в монорепозитории снижает дублирование, но усложняет первичную настройку и роутинг в next.config.js.",
					),
					p(
						"Combining AI drafts with editorial staff improves scale but requires ongoing editor training to eliminate generic AI phrases, keeping text logically consistent and surprising.",
						"Использование AI повышает масштаб, но требует регулярного обучения редакторов для исключения банальностей и сохранения высокой логической ценности контента.",
					),
					p(
						"Operational maintenance requires disciplined package synchronization; a breaking change in the shared UI package must be tested across all five client sites.",
						"Поддержка требует строгой дисциплины при синхронизации общих пакетов: любые изменения в `@lunaria/ui` должны тестироваться на всех пяти сайтах.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"Why not use one single website?",
					"Почему бы не сделать один большой сайт?",
				),
				answer: p(
					"A single domain dilutes thematic focus. A user looking for flower delivery gets distracted by franchise numbers, while search engines struggle to identify the main topic of a mixed domain.",
					"Один домен размывает тематический фокус. Пользователь доставки видит цифры франшизы, а поисковику сложнее определить основной авторитет смешанного сайта.",
				),
			},
			{
				question: p(
					"How does Gemini compare to other models here?",
					"Как Gemini показал себя в этой задаче?",
				),
				answer: p(
					"Gemini was chosen because of its natural flow in Russian language processing. It generates readable structures with less corporate jargon, requiring fewer editing steps.",
					"Gemini был выбран из-за естественной генерации текстов на русском языке. Он создает читаемые структуры с меньшим количеством канцелярита и требует меньше правок.",
				),
			},
			{
				question: p(
					"Is the content published automatically?",
					"Публикуется ли контент автоматически?",
				),
				answer: p(
					"No, all articles undergo strict editing by a team of three human editors. AI is used solely for research, outlining, and drafting, while humans ensure quality.",
					"Нет, все материалы проходят проверку тремя редакторами. AI используется только для поиска тем, структуры и черновиков, а люди отвечают за качество.",
				),
			},
		],
		seo: {
			title: p(
				"Lunaria Search Ecosystem Case Study - Regional AI-SEO",
				"Кейс Lunaria Search Ecosystem - Региональный AI-SEO",
			),
			description: p(
				"Detailed case study of the multi-site search ecosystem built for Lunaria floral brand to dominate search and AI-driven answers in Kazan.",
				"Подробный кейс мультисайтовой поисковой экосистемы для цветочного бренда Lunaria с целью захвата поиска и AI-выдачи в Казани.",
			),
			keywords: {
				en: [
					"lunaria search ecosystem",
					"regional search marketing",
					"n8n content automation",
					"gemini seo content generation",
				],
				ru: [
					"поисковая экосистема lunaria",
					"региональное продвижение казань",
					"автоматизация контента n8n",
					"генерация статей gemini",
				],
			},
			ogSubtitle: p(
				"Multi-site Next.js architecture and AI-driven SEO machine",
				"Мультисайтовая Next.js архитектура и AI-генерация контента",
			),
		},
	},
	vaparshop: {
		slug: "vaparshop",
		projectId: "vaparshop",
		visibility: PROJECT_BY_SLUG.vaparshop.visibility,
		status: PROJECT_BY_SLUG.vaparshop.status,
		hero: {
			badge: p("Retail Management System", "Система управления ритейлом"),
			summary: p(
				"A unified Telegram Mini App suite for retail managers and staff: shift life-cycles, safe balance checks, GetMeBack loyalty scanner, customer objections logs, and a built-in progress clicker game.",
				"Комплексный Mini App для сотрудников и менеджеров: ведение смен, проверка сейфа, лог возражений клиентов, сканер лояльности GetMeBack, авто-уведомления и игра-симулятор смены.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"Frontline retail staff operated through fragmented manual communication: shift logs in chats, safe balances in spreadsheets, and customer objections left untracked. This resulted in frequent cash discrepancies and slow reporting.",
					"Линейные сотрудники работали в разрозненных процессах: смены в чатах, баланс сейфа в таблицах, а возражения клиентов не фиксировались. Это приводило к расхождениям в кассе и медленной отчетности.",
				),
				p(
					"The goal was to build a single mobile-first dashboard integrating shift operations, loyalty API scans, and staff motivation without introducing heavy corporate software complexity.",
					"Целью было создание единого мобильного дашборда, объединяющего смены, сканирование карт лояльности и мотивацию персонала без внедрения сложного корпоративного ПО.",
				),
				p(
					"We needed to support instant shift handoffs, offline-first reliability, QR scans for loyalty programs, and employee progression to fight high retail staff turnover.",
					"Было необходимо обеспечить быструю сдачу смен, офлайн-надежность, сканирование QR для программы лояльности и геймификацию для борьбы с текучестью кадров.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"We built a robust Next.js 14 app with Drizzle ORM and PostgreSQL. The application is integrated with GetMeBack API for loyalty scans with PIN-auth and 3-hour token refresh cycles.",
						"Мы построили приложение на Next.js 14 с Drizzle ORM и PostgreSQL. Реализовали интеграцию с API GetMeBack для проверки карт лояльности с PIN-авторизацией и циклом обновления токена в 3 часа.",
					),
					p(
						"A background Telegram bot monitors shift actions, warns managers automatically when a shift closing check is overdue, and alerts on safe balance discrepancies.",
						"Фоновый Telegram-бот отслеживает действия со сменами, автоматически предупреждая менеджеров при задержке закрытия смены и сообщая о расхождениях в сейфе.",
					),
					p(
						"The frontend is optimized for slow mobile connections using Biome for strict formatting and minimal Javascript footprints.",
						"Интерфейс оптимизирован под медленный мобильный интернет: используется Biome для форматирования и минимизации размера JavaScript-бандла.",
					),
				],
				[
					p(
						"Next.js 14 & Drizzle ORM database layer",
						"Слой данных на Next.js 14 и Drizzle ORM",
					),
					p(
						"GetMeBack API PIN-auth & QR integration",
						"Интеграция GetMeBack API с PIN-авторизацией и QR",
					),
					p(
						"Telegram bot shift closing alerts",
						"Уведомления о закрытии смен в Telegram-боте",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"Staff manage shift life-cycles, validating opening and closing safe balances, logging customer objections (like 'too expensive'), and registering missing products.",
					"Сотрудники управляют жизненным циклом смены, подтверждая баланс сейфа на открытие и закрытие, фиксируя возражения клиентов ('дорого') и дефицит товаров.",
				),
				p(
					"The built-in employee progression clicker game motivates staff: they start with 14 HP per shift, manage shop rental costs, and navigate burnout debuffs as they progress.",
					"Встроенный кликер-симулятор мотивирует персонал: они начинают с 14 HP на смену, управляют расходами на аренду магазина и борются с дебаффами выгорания по мере прогресса.",
				),
				p(
					"The admin view compiles daily statistics, objection category analytics, and logs cashier performance across all active retail outlets.",
					"Панель администратора собирает ежедневную статистику, аналитику категорий возражений и фиксирует продуктивность кассиров по всем торговым точкам.",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"Powered by Next.js, Drizzle ORM, and Tailwind CSS. Biome is configured for code linting and formatting to ensure high code quality.",
						"Стек: Next.js, Drizzle ORM и Tailwind CSS. Настроен Biome для линтинга и форматирования кода, обеспечивая высокое качество кодовой базы.",
					),
					p(
						"GetMeBack API provides loyalty card scans, transaction validation, and automatic cashback calculations for customer checkouts.",
						"API GetMeBack обеспечивает сканирование карт лояльности, валидацию транзакций и автоматический расчет кэшбэка при покупке.",
					),
					p(
						"A custom Telegram bot handles notifications, alerts on shift closing status, and posts daily summaries directly to manager groups.",
						"Кастомный Telegram-бот отвечает за уведомления, предупреждает о просроченных сменах и отправляет ежедневные сводки в группы менеджеров.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"Shift closing times dropped by 40%, and cash register safe discrepancies were reduced to absolute zero within the first month of usage.",
					"Время закрытия смены сократилось на 40%, а расхождения по кассе и сейфу снизились до абсолютного нуля в первый же месяц работы.",
				),
				p(
					"Staff engagement rose substantially through the clicker progression system, helping managers address daily objection trends and log missing items instantly.",
					"Вовлеченность сотрудников значительно выросла благодаря кликеру-симулятору, помогая менеджерам отслеживать тренды возражений и дефицит на точках.",
				),
				p(
					"Manager manual oversight was cut in half, as the system automatically flags late shift status and logs discrepancies in real time.",
					"Ручной контроль менеджеров сократился вдвое: система автоматически предупреждает о задержках и фиксирует расхождения в реальном времени.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Using GetMeBack PIN-auth and 3-hour token refresh cycles improves security but requires staff to re-authenticate if sessions expire during their shifts.",
						"Использование PIN-авторизации GetMeBack и 3-часового цикла токенов повышает безопасность, но требует повторного входа при истечении сессии.",
					),
					p(
						"The gamified clicker runs entirely on client-side state, which speeds up gameplay but allows tech-savvy employees to alter local files.",
						"Игровой кликер работает полностью на клиенте, что ускоряет геймплей, но позволяет продвинутым сотрудникам редактировать локальные файлы.",
					),
					p(
						"The Telegram bot notifications depend on the Telegram API uptime, which could delay shift alerts in case of platform outages.",
						"Уведомления бота зависят от доступности API Telegram, что может задержать предупреждения о сменах в случае сбоев платформы.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"How does the employee game work?",
					"Как устроена игра для сотрудников?",
				),
				answer: p(
					"It's a progression clicker mimicking daily retail challenges. Employees spend HP, pay virtual rent, earn profits, and manage burnout debuffs.",
					"Это симулятор-кликер, имитирующий будни ритейла. Сотрудники тратят HP, платят виртуальную аренду, зарабатывают прибыль и борются с выгоранием.",
				),
			},
			{
				question: p(
					"Why 3-hour GetMeBack tokens?",
					"Почему токены GetMeBack обновляются каждые 3 часа?",
				),
				answer: p(
					"To balance security and convenience, ensuring active terminals stay authorized during shifts while preventing open-ended sessions on shared devices.",
					"Для баланса безопасности и удобства: активные терминалы остаются авторизованными, но сессии не остаются открытыми бесконечно на общих устройствах.",
				),
			},
			{
				question: p(
					"How are shift closing alerts triggered?",
					"Как работают предупреждения о закрытии смен?",
				),
				answer: p(
					"The scheduler checks if active shifts exceed normal duration limits and triggers the Telegram bot to send manager warnings.",
					"Планировщик проверяет, превышают ли активные смены стандартную длительность, и запускает бота для отправки уведомлений менеджерам.",
				),
			},
		],
		seo: {
			title: p(
				"Vapar Tools Case Study - Retail Management and Gamification",
				"Кейс Vapar Tools - Управление ритейлом и геймификация",
			),
			description: p(
				"Detailed case study of Vapar Tools: a Telegram Mini App with GetMeBack loyalty, shift management, automated alerts, and staff progress game.",
				"Подробный кейс Vapar Tools: Telegram Mini App с картами GetMeBack, управлением сменами, авто-уведомлениями и игрой-симулятором для сотрудников.",
			),
			keywords: {
				en: [
					"vapar tools case study",
					"getmeback loyalty api",
					"retail shift tracking",
					"employee gamification clicker",
				],
				ru: [
					"кейс vapar tools",
					"интеграция getmeback",
					"учет смен в магазине",
					"геймификация персонала кликер",
				],
			},
			ogSubtitle: p(
				"GetMeBack integration, shift operations, and staff gamification",
				"Интеграция GetMeBack, управление сменами и геймификация",
			),
		},
	},
	"horny-place": {
		slug: "horny-place",
		projectId: "horny-place",
		visibility: PROJECT_BY_SLUG["horny-place"].visibility,
		status: PROJECT_BY_SLUG["horny-place"].status,
		hero: {
			badge: p("Brand System & Web", "Бренд-система и веб"),
			summary: p(
				"A bold brand identity and responsive digital ecosystem launched to establish a unified visual presence across retail locations and customer-facing webs.",
				"Смелая бренд-айдентика и адаптивная цифровая экосистема, созданная для объединения визуального стиля розничных точек и веб-интерфейсов.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"The brand needed a distinct visual presence to stand out in a competitive, crowded retail environment, starting from storefront signage down to mobile interfaces.",
					"Бренду требовалось яркое визуальное лицо для отстройки от конкурентов в плотной розничной среде — от вывесок на улицах до экранов смартфонов.",
				),
				p(
					"The task was to design an identity system that was both high-contrast and adaptable, followed by launching visual platforms that maintained consistent aesthetics.",
					"Задача заключалась в создании контрастной и адаптивной дизайн-системы с последующим запуском веб-ресурсов, сохраняющих единую эстетику.",
				),
				p(
					"It was crucial to create a brand language that connected with urban youth cultures, combining typography rules with strict layout spacing guidelines.",
					"Было критически важно создать визуальный язык, близкий молодежной культуре, объединяющий строгие правила типографики и отступов.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"We established a design system built on rigid type scales, high-contrast layouts, and dynamic visual assets optimized for both physical print and digital rendering.",
						"Основой стала дизайн-система с жесткой сеткой шрифтов, контрастными макетами и медиаресурсами, оптимизированными под печать и экраны.",
					),
					p(
						"The web implementation isolates brand guidelines into shared packages to maintain visual consistency across primary web pages and promo micro-sites.",
						"Веб-реализация выносит стилевые правила в изолированные пакеты для визуального контроля над основными страницами и промо-лендингами.",
					),
					p(
						"SVG layouts and optimized asset directories ensure that complex decorative brand components render quickly even on slow mobile connections.",
						"Использование SVG-графики и оптимизация ассетов гарантируют быструю отрисовку сложных брендовых элементов на мобильных устройствах.",
					),
				],
				[
					p(
						"High-contrast typography-led design",
						"Шрифтовой контрастный дизайн",
					),
					p(
						"Shared visual assets across print and web",
						"Общие визуальные ресурсы для веба и полиграфии",
					),
					p(
						"Tailwind-based design tokens structure",
						"Структурированные дизайн-токены на базе Tailwind",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"Responsive landing pages adjust to diverse device widths, keeping visual layouts balanced without losing brand alignment or typography sizing.",
					"Адаптивные страницы подстраиваются под любые экраны, сохраняя баланс пропорций макета, размеры шрифтов и композицию бренда.",
				),
				p(
					"Custom visual components, SVG assets, and interactive layouts are optimized to present brand identity with high performance.",
					"Кастомные UI-компоненты, SVG-ассеты и интерактивные блоки оптимизированы для производительного отображения идентичности бренда.",
				),
				p(
					"Fluid motion transitions and modern scroll-triggered triggers add interactive polish, encouraging users to discover catalog categories.",
					"Плавная анимация переходов и современные эффекты при прокрутке добавляют интерактивного лоска, вовлекая в просмотр категорий каталога.",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"Built using React, Next.js, and Tailwind CSS. Design tokens are mapped to Tailwind utility values to ensure immediate UI consistency across assets.",
						"Проект реализован на React, Next.js и Tailwind CSS. Дизайн-токены напрямую связаны со стилями Tailwind для единства интерфейсов.",
					),
					p(
						"Vector graphics, custom SVG implementations, and web-optimized images keep layout loads extremely fast across mobile network connections.",
						"Векторная графика, кастомные SVG и оптимизированные растровые изображения обеспечивают высокую скорость загрузки страниц на мобильных.",
					),
					p(
						"CSS variable configurations let the team switch between high-contrast promo modes and standard catalog presentations instantly.",
						"Конфигурация CSS-переменных позволяет моментально переключаться между контрастным промо-режимом и стандартной подачей каталога.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"The brand launched a unified visual presence across retail signage, physical packaging, social media templates, and primary website domains.",
					"Бренд получил единое визуальное оформление: от наружных вывесок и упаковки до шаблонов соцсетей и основных веб-ресурсов.",
				),
				p(
					"Consistent typography rules and asset reuse reduced frontend layout iteration cycles for promo campaigns from weeks to days.",
					"Согласованные правила типографики и переиспользование ресурсов сократили циклы верстки промо-кампаний с недель до дней.",
				),
				p(
					"Audience engagement rates on promo pages increased by 35% due to improved visual clarity and smooth, fast mobile layout rendering.",
					"Показатели вовлеченности на промо-страницах выросли на 35% благодаря визуальной чистоте и плавной адаптивной работе интерфейса.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Focusing heavily on custom typography and high-contrast SVG assets requires careful size optimization to prevent rendering blocks on mobile devices.",
						"Упор на выразительную типографику и тяжелые SVG требует строгого контроля размеров файлов для быстрой отрисовки на мобильных.",
					),
					p(
						"Dynamic layouts and interactive scroll behaviors require continuous testing across legacy mobile browsers to avoid layout breaking.",
						"Сложные сетки и анимации при скролле требуют постоянного тестирования на старых мобильных браузерах во избежание сдвигов верстки.",
					),
					p(
						"Maintaining visual consistency across print and web formats meant design decisions had to be simplified to work in both mediums.",
						"Для сохранения идентичности в вебе и печати пришлось упростить некоторые дизайн-решения, сделав их универсальными.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"How was visual consistency maintained?",
					"Как поддерживалось визуальное единство?",
				),
				answer: p(
					"Through shared design tokens, vector layouts, and strict type scale rules applied across all print and web assets.",
					"Через единые дизайн-токены, векторные исходники и строгую шрифтовую сетку для веба и печатных материалов.",
				),
			},
			{
				question: p(
					"Why focus on typography-heavy layouts?",
					"Почему акцент сделан на шрифтовых макетах?",
				),
				answer: p(
					"Bold, structured typography creates a recognizable style that stands out without relying on heavy graphical files.",
					"Крупная структурированная типографика формирует узнаваемый стиль, работающий без тяжелой графики.",
				),
			},
			{
				question: p(
					"How is mobile performance optimized?",
					"Как оптимизирована производительность на мобильных?",
				),
				answer: p(
					"By converting graphical patterns into light inline SVGs and using CSS transformations for scroll animations.",
					"За счет перевода сложных паттернов в легкий инлайновый SVG и применения CSS-трансформаций для анимаций.",
				),
			},
		],
		seo: {
			title: p(
				"HORNY PLACE Case Study - Brand Identity and Web System",
				"Кейс HORNY PLACE - Бренд-система и веб-платформа",
			),
			description: p(
				"Detailed case study of brand identity design and responsive web implementation, focusing on visual consistency across digital surfaces.",
				"Подробный кейс разработки визуального стиля и адаптивной веб-платформы с упором на единство графических стандартов и высокую скорость.",
			),
			keywords: {
				en: [
					"horny place case study",
					"brand identity design",
					"responsive web system",
					"typography design tokens",
				],
				ru: [
					"кейс horny place",
					"разработка фирменного стиля",
					"адаптивная веб платформа",
					"шрифтовые дизайн токены",
				],
			},
			ogSubtitle: p(
				"Brand identity system, print materials, and web layout",
				"Бренд-система, печатные материалы и веб-интерфейсы",
			),
		},
	},
	"smoky-market-loyalty-miniapp": {
		slug: "smoky-market-loyalty-miniapp",
		projectId: "smoky-market-loyalty-miniapp",
		visibility: PROJECT_BY_SLUG["smoky-market-loyalty-miniapp"].visibility,
		status: PROJECT_BY_SLUG["smoky-market-loyalty-miniapp"].status,
		hero: {
			badge: p("Loyalty Platform & Web POS", "Платформа лояльности и Web POS"),
			summary: p(
				"A custom loyalty ecosystem uniting a Telegram client mini app, web-based seller POS terminals, and automatic discount calculations.",
				"Кастомная экосистема лояльности: клиентский Telegram mini-app, терминалы продавцов Web POS и автоматический расчет скидок.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"The retail chain was losing return visits due to a lack of clear loyalty programs. Physical cards were expensive and often forgotten by clients.",
					"Розничная сеть теряла повторные продажи из-за отсутствия понятной программы лояльности. Пластиковые карты были неудобны и часто терялись.",
				),
				p(
					"Sellers needed a simple web POS to look up customer point balances, validate profiles via QR codes, and apply discounts within seconds.",
					"Продавцам требовался простой веб-терминал (POS) для проверки баланса баллов, валидации карт по QR и списания бонусов за секунды.",
				),
				p(
					"The branding aspect required launching a unified visual system, including logo variants, packaging rules, and digital templates.",
					"Графический блок требовал разработки единого стиля: вариантов логотипа, правил упаковки и шаблонов для соцсетей.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"We designed a multi-client architecture: Next.js Client Mini App, React Web POS for cashier devices, and a shared backend api layer.",
						"Мы спроектировали мультиплатформенную систему: клиентский Next.js Mini App, React Web POS для кассиров и общий бэкенд.",
					),
					p(
						"The loyalty points engine processes transactions using transactional locks to prevent double-spending or point generation exploits.",
						"Ядро программы лояльности обрабатывает начисление и списание баллов с транзакционной изоляцией для защиты от накруток.",
					),
					p(
						"The design system uses dark color palettes, typography tokens, and responsive layout spacing guidelines to ensure identity matches across surfaces.",
						"Визуальный язык использует темные тона, шрифтовые токены и адаптивные сетки, сохраняя фирменный стиль на всех устройствах.",
					),
				],
				[
					p(
						"Multi-client design: Client App + Seller POS",
						"Мультиплатформенная архитектура: клиент + POS продавца",
					),
					p(
						"Transactional logic for points calculations",
						"Транзакционная логика начисления и списания баллов",
					),
					p(
						"Unified branding system across print and digital",
						"Единый фирменный стиль в цифре и печатных материалах",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"Clients access their QR code, point balance history, store map lists, and catalog menus directly within Telegram.",
					"Клиент видит свой персональный QR-код, историю операций с баллами, карту магазинов и меню прямо в Telegram.",
				),
				p(
					"The seller POS interface simplifies customer lookup, scans QR layouts, logs purchase values, and updates transaction balances.",
					"Интерфейс продавца POS упрощает поиск клиента по коду или телефону, сканирует QR, проводит чеки и обновляет баланс баллов.",
				),
				p(
					"Branding deliverables included dynamic packaging assets, typography rules, social templates, and store interior visual elements.",
					"Бренд-пакет включил макеты упаковки, правила оформления вывесок, шаблоны для соцсетей и элементы интерьера.",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"Built on React, Next.js, and Tailwind CSS. The databases are designed with relational schemas to manage customer profiles and points.",
						"Проект собран на React, Next.js и Tailwind CSS. Базы данных используют реляционную структуру для истории транзакций.",
					),
					p(
						"QR generation utilizes custom canvas rendering vectors to display scan patterns quickly on diverse mobile displays.",
						"Генерация QR-кодов работает на холсте (canvas), обеспечивая быстрое считывание сканером с экрана любого смартфона.",
					),
					p(
						"Deployments run through automated pipelines, separating cashier POS surfaces from public client mini-apps.",
						"Конвейер деплоя разделен на независимые ветки для кассового терминала POS и публичного клиентского приложения.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"The loyalty program drove customer return rates up by 25%, establishing a direct communication channel via Telegram.",
					"Программа лояльности увеличила возвращаемость клиентов на 25%, создав прямой канал коммуникации через Telegram.",
				),
				p(
					"Sellers process discount calculations within 5 seconds using the optimized web POS interface, keeping queue speeds fast.",
					"Кассиры тратят на проверку и списание баллов в POS-терминале менее 5 секунд, не задерживая очередь на кассах.",
				),
				p(
					"The brand launched a unified visual identity across stores, products, social media platforms, and digital applications.",
					"Бренд получил целостное визуальное лицо на вывесках магазинов, упаковке, страницах соцсетей и экранах телефонов.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Maintaining cashier POS availability requires offline status indicators and debounced sync handlers in case of temporary store network drops.",
						"Для стабильной работы кассы POS на точках внедрен оффлайн-режим с буферизацией данных при сбоях интернета.",
					),
					p(
						"Balancing design choices for print packaging and digital screens meant modifying brand color values to match ink profiles.",
						"Согласование цветов для печати упаковки и экранов потребовало калибровки палитры под профили CMYK и RGB.",
					),
					p(
						"Using Telegram WebApp features reduced onboarding barriers but limited custom web-sharing capabilities for customers.",
						"Применение WebApp в Telegram снизило барьер входа для клиентов, но ограничило возможности репостов в другие соцсети.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"How is security handled for points?",
					"Как защищены балансы баллов клиентов?",
				),
				answer: p(
					"Points mutations are verified using secure server-side logic, session validation, and cashier POS double-checks.",
					"Списание баллов подтверждается на сервере, проверяя сессию продавца в POS и авторизацию клиента по QR.",
				),
			},
			{
				question: p(
					"Does it require installing any apps?",
					"Нужно ли скачивать приложение?",
				),
				answer: p(
					"No, the client loyalty program runs directly inside Telegram using the native WebApp container framework.",
					"Нет, программа лояльности работает прямо внутри Telegram через стандартный контейнер WebApp.",
				),
			},
			{
				question: p(
					"What print templates were designed?",
					"Какие макеты были разработаны под печать?",
				),
				answer: p(
					" Branded cups, bags, business cards, stickers, and physical store banner layouts matching typography rules.",
					"Фирменные стаканы, пакеты, визитки, наклейки и макеты баннеров для наружного оформления розничных точек.",
				),
			},
		],
		seo: {
			title: p(
				"Smoky Market Loyalty Case Study - Web POS and Brand System",
				"Кейс Smoky Market - Платформа лояльности и Web POS",
			),
			description: p(
				"Detailed case study of retail loyalty implementation: Telegram mini app for clients, web POS for cashiers, and comprehensive brand identity.",
				"Подробный кейс платформы лояльности: Telegram mini-app для гостей, веб-терминал POS для продавцов и фирменный стиль сети.",
			),
			keywords: {
				en: [
					"smoky market case study",
					"retail loyalty platform",
					"cashier web pos system",
					"brand identity guidelines",
				],
				ru: [
					"кейс smoky market",
					"программа лояльности для ритейла",
					"веб pos кассира",
					"руководство по фирменному стилю",
				],
			},
			ogSubtitle: p(
				"Loyalty engine, client Telegram app, and cashier web POS",
				"Ядро лояльности, Telegram-приложение и Web POS кассира",
			),
		},
	},

	"plonq-ai-search": {
		slug: "plonq-ai-search",
		projectId: "plonq-ai-search",
		visibility: PROJECT_BY_SLUG["plonq-ai-search"].visibility,
		status: PROJECT_BY_SLUG["plonq-ai-search"].status,
		hero: {
			badge: p("GEO / AI Search Engine", "GEO / ИИ-поисковый движок"),
			summary: p(
				"Production-ready hybrid vector-keyword RAG search and recommendation engine optimizing catalog query understanding, citation rates, and semantic discovery.",
				"Гибридный поисковый RAG-движок (векторный + текстовый) для каталогов с оптимизацией семантического поиска, цитируемости и понимания запросов.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"Standard keyword search failed to resolve conversational queries like 'sweet mint device with high puff count' or 'flavor similar to apple but without ice'. The strict lexer dropped users into blank results, while typical LLM chatbot integrations hallucinated non-existent catalog items, harming user trust.",
					"Классический поиск по ключевым словам не справлялся с разговорными запросами вроде «сладкая мята на много затяжек» или «вкус похожий на яблоко, но без холодка». Строгий лексический анализатор выдавал пустые результаты, а типичные интеграции чат-ботов на LLM галлюцинировали несуществующими позициями, разрушая доверие.",
				),
				p(
					"To solve this, we needed a robust, low-latency hybrid search engine tailored for Telegram mini app interfaces. It had to map imprecise, intent-rich user expressions to strict database entities, ensuring 100% catalog compliance while showing clear citations and source transparency.",
					"Для решения этой проблемы требовался быстрый гибридный поисковый движок для Telegram Mini App. Он должен был связывать неточные разговорные формулировки с точными сущностями в БД, гарантируя соответствие каталогу на 100% и предоставляя прозрачные ссылки на источники.",
				),
			]),
			section(
				"architecture",
				p(
					"RAG Pipeline & Retrieval Architecture",
					"Архитектура RAG-конвейера и поиска",
				),
				[
					p(
						"We built a multi-stage retrieval architecture running on Convex. The pipeline converts catalog data into optimized chunks of 200-500 tokens, embedding them using OpenAI's text-embedding-3-small (1536 dimensions) to capture flavor profiles, device parameters, and usage contexts.",
						"Мы построили многоэтапную архитектуру поиска на базе Convex. Конвейер разбивает каталог на оптимизированные чанки размером 200–500 токенов и генерирует для них векторные представления через API OpenAI text-embedding-3-small (1536 измерений), кодируя вкусовые профили, характеристики устройств и контексты использования.",
					),
					p(
						"The search is hybrid: a vector search query runs in parallel with a keyword BM25 search index. A reciprocal rank fusion (RRF) algorithm combines the results, weighted dynamically based on query length. This balances high semantic recall (finding 'berry breeze' for 'forest fruit') with exact keyword filtering (finding '1200' for model numbers).",
						"Поиск является гибридным: векторный запрос выполняется параллельно с текстовым поиском по индексу BM25. Алгоритм взаимного ранжирования (RRF) объединяет результаты с динамическими весами, зависящими от длины запроса. Это сбалансировало семантический охват (поиск «лесных ягод» по запросу «земляничный микс») и точную фильтрацию («1200» для номеров моделей).",
					),
					p(
						"Before retrieval, an LLM-driven decomposition step normalizes incoming queries, extracting intent filters (e.g., puff count range, flavor profile, brand constraint) and converting them into strict metadata parameters passed directly to Convex query filters.",
						"Перед поиском этап декомпозиции на базе LLM нормализует входящие запросы, извлекая фильтры намерений (диапазон затяжек, профиль вкуса, ограничения бренда) и преобразуя их в строгие метаданные для фильтров запросов Convex.",
					),
				],
			),
			section(
				"features",
				p(
					"AI Synthesis & Answer-First UX",
					"Синтез ответов и Answer-First интерфейс",
				),
				[
					p(
						"The UI adopts an 'Answer-First' layout. Instead of forcing users to scroll past product cards to read descriptions, the system provides a direct, concise summary response (2-3 sentences max) at the very top, immediately followed by interactive, checkable product cards that match the retrieval sources.",
						"Интерфейс использует принцип «Сначала Ответ» (Answer-First). Вместо прокрутки карточек товаров система выводит точную выжимку (максимум 2–3 предложения) в самом верху, после чего сразу идут интерактивные карточки товаров, соответствующие источникам выдачи.",
					),
					p(
						"To guarantee citation integrity, we implemented a strict verification consensus step: the generation model (Gemini-1.5-Flash) is constrained by a JSON schema that forces it to reference only the retrieved document IDs. Any item mentioned in the text must have a verified link to a database product card.",
						"Для гарантии точности цитирования мы внедрили этап проверки консенсуса: генеративная модель (Gemini-1.5-Flash) жестко ограничена JSON-схемой, требующей ссылаться только на ID извлеченных документов. Любой товар в тексте обязан иметь проверенную ссылку на карточку из базы данных.",
					),
					p(
						"We integrated real-time latency optimization, streaming responses chunk-by-chunk to the user while fetching product image tokens, reducing the perceived time-to-first-token (TTFT) to under 250ms.",
						"Мы оптимизировали задержку интерфейса, отправляя ответы пользователю по частям (стриминг) одновременно с подгрузкой изображений, что снизило время до первого токена (TTFT) до менее чем 250 мс.",
					),
				],
			),
			section(
				"tooling",
				p("Tooling and Tech Stack", "Инструменты и технологический стек"),
				[
					p(
						"The serverless backend runs on Convex, offering reactive document syncing and built-in vector search. Node.js edge functions handle the integration with OpenAI embedding models and Gemini API orchestration.",
						"Бессерверный бэкенд развернут на Convex, обеспечивая реактивную синхронизацию документов и встроенный векторный поиск. Edge-функции Node.js управляют интеграцией с моделями эмбеддингов OpenAI и API-оркестрацией Gemini.",
					),
					p(
						"The client application is built with React, styled using vanilla CSS variables for dynamic theme adaptation inside Telegram WebApp containers. Global state synchronization handles search history, cart updates, and persistent user preferences.",
						"Клиентское приложение разработано на React с оформлением на чистом CSS для динамической подстройки под тему оформления Telegram WebApp. Глобальная синхронизация состояния отвечает за историю поиска, корзину и сохраненные настройки.",
					),
				],
			),
			section("outcome", p("Outcome and metrics", "Результат и метрики"), [
				p(
					"Semantic matching resolved over 92% of conversational queries that previously yielded empty search screens. User engagement within the search screen rose by 34%, measured by repeat query runs per session.",
					"Семантический поиск успешно обработал более 92% разговорных запросов, которые раньше вели на пустые экраны. Вовлеченность пользователей на экране поиска выросла на 34% (по показателю повторных запросов за сессию).",
				),
				p(
					"By prioritizing Answer-First layouts with explicit citation marks, the average click-through rate (CTR) on recommended product cards grew from 11% to 27%, confirming that direct text justifications build strong user trust.",
					"Благодаря внедрению Answer-First макета с явными отметками цитирования, средний кликаут (CTR) по карточкам рекомендованных товаров вырос с 11% до 27%, подтверждая высокую степень доверия к обоснованным ответам.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Maintaining a hybrid ranking system introduces tuning complexity. We had to carefully balance RRF coefficients to prevent short model numbers from dominating over semantic flavor expressions.",
						"Поддержка гибридного ранжирования усложняет отладку. Нам пришлось долго подбирать коэффициенты алгоритма RRF, чтобы короткие номера моделей не вытесняли семантические описания вкусов.",
					),
					p(
						"Serverless vector index updates have a propagation delay of up to 10 seconds. We built a local cache verification layer to ensure that out-of-stock items are omitted from search results in real time.",
						"Обновления векторного индекса в Convex имеют задержку распространения до 10 секунд. Мы добавили уровень локальной валидации кэша, чтобы товары, которых нет в наличии, отсекались от выдачи в реальном времени.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"Why was the document chunk size set to 200-500 tokens?",
					"Почему размер чанка документов был выбран в 200-500 токенов?",
				),
				answer: p(
					"This range matches the semantic density of individual product catalogs. Chunks smaller than 200 tokens lose key context (like brand metadata), while chunks larger than 500 tokens dilute specific details, reducing the cosine similarity match precision.",
					"Этот диапазон соответствует плотности информации в каталогах. Чанки меньше 200 токенов теряют контекст (например, метаданные бренда), а чанки больше 500 токенов размывают детали, ухудшая точность косинусного сходства.",
				),
			},
			{
				question: p(
					"How does the system prevent hallucinated product names?",
					"Как система защищает от галлюцинаций с названиями товаров?",
				),
				answer: p(
					"The generation step uses strict function calling and JSON schemas. The LLM cannot invent product names; it is only allowed to synthesize descriptions using the exact text snippets retrieved from the Convex vector database, citing the source document IDs.",
					"Генерация использует строгое функциональное вызывание (Function Calling) и JSON-схемы. LLM не может выдумывать названия — она лишь формулирует текст на основе фрагментов из векторной БД Convex, ссылаясь на конкретные ID документов.",
				),
			},
			{
				question: p(
					"What metrics were used to evaluate search success?",
					"Какие метрики использовались для оценки успешности поиска?",
				),
				answer: p(
					"We measured Citation Rate (ensuring every answer has at least 1 verified source card), Answer Reach (percentage of semantic queries answered without fallback), and Click-Through Rate (CTR) on cited product links.",
					"Мы измеряли показатель цитирования (Citation Rate — наличие хотя бы 1 проверенной карточки-источника), охват ответов (Answer Reach — доля семантических запросов, обработанных без сброса на заглушку) и CTR по карточкам товаров.",
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
			badge: p("Flower Retail Suite", "Розничный пакет флориста"),
			summary: p(
				"Complete retail digital suite for a flower brand: a secure write-off tracking Telegram Mini App with optimistic UI rollbacks, and an interactive customer bouquet recommendation quiz PWA.",
				"Комплексный цифровой пакет для розничной сети: Telegram Mini App для учета списаний с optimistic UI и PWA-квиз с рекомендациями и сбором лидов.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"Our flower retail client suffered from two main friction points in their digital operations: shop managers and staff struggled with manual, untracked inventory write-off logs (often leading to lost profits and delays), while the marketing team had low customer conversion rates using static forms.",
					"Розничный цветочный бренд столкнулся с двумя проблемами: продавцы вели учет списаний вручную в чатах (что мешало оценивать потери), а маркетологи имели низкую конверсию на статичных формах.",
				),
				p(
					"The goal was to design a unified digital suite: a fast, mobile-friendly Telegram Mini App for retail workers to submit real-time write-offs, and an interactive matching PWA quiz to guide customers through aesthetic bouquet selections, capturing qualified leads.",
					"Было решено создать единый пакет инструментов: быстрый Telegram Mini App для персонала для логирования списаний на точках и PWA-квиз, помогающий клиентам подобрать букет под повод с формой обратной связи.",
				),
				p(
					"We needed to support secure user roles, rapid entry (write-off in one tap), optimistic UI rollback within 60 seconds, and group chat invites via Telegram deep links, alongside responsive layouts that load quickly on mobile networks.",
					"Было необходимо обеспечить безопасность ролей, быстрый ввод (списание в 1 тап), optimistic UI с откатом за 60 секунд, инвайты в чаты через deep links и высокую скорость загрузки на мобильных.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"The Telegram Mini App is built using Next.js 16 and a reactive Convex database backend, featuring hashed-token session validation and optimistic UI decrements to match active staff actions.",
						"Mini App разработан на Next.js 16 и Convex с защищенным хэшированием сессий. Списания используют optimistic UI с тактильным откликом.",
					),
					p(
						"The bouquet recommendation quiz is a single-page PWA leveraging a client-side rule engine matching bouquet tags with user lifestyle and aesthetic answer profiles.",
						"Квиз реализован в виде PWA на клиенте с алгоритмом сопоставления тегов букетов с предпочтениями в ответах.",
					),
					p(
						"Data flows separate the internal operations logs and the public marketing capture endpoints, keeping security high and validation strict.",
						"Потоки данных разделяют логи операций розницы и внешние формы сбора лидов, сохраняя строгую серверную валидацию.",
					),
				],
				[
					p(
						"Next.js 16 and Convex reactive database backend",
						"Next.js 16 и реактивная база данных Convex",
					),
					p(
						"Optimistic UI with 60s rollback window for staff write-offs",
						"Optimistic UI с окном отката на 60 секунд для списаний",
					),
					p(
						"Rule-based scoring algorithm for flower matching quiz",
						"Алгоритм подбора букетов на основе весов ответов",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"The write-off interface allows staff to log items in one tap, supported by optimistic state updates, a 60-second rollback timer, and haptic feedback. Invitation deep links (`startapp`) automate onboarding for new outlets.",
					"Экран списаний позволяет фиксировать списания в один тап с мгновенным откликом и 60-секундным таймером отмены. Инвайты на точки работают через Telegram deep links.",
				),
				p(
					"The customer quiz uses a five-step visual lifestyle questionnaire, dynamically filtering bouquet arrangements, explaining pairings, and offering coupon discount codes upon lead form submission.",
					"Опросник состоит из пяти визуальных шагов, фильтрует каталог букетов, аргументирует выбор под характер получателя и выдает промокоды за контакты.",
				),
				p(
					"Owners access global multi-point reports, period summary cards, CSV exports, and direct copy-to-clipboard spreadsheet formatting.",
					"Владельцы имеют доступ к сводкам по всем точкам, отчетам за период, экспорту в CSV и прямому копированию таблиц в буфер обмена.",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"Built with Next.js 16, Tailwind CSS v4, and React Compiler. Haptics and native theme colors are controlled using the Telegram Mini App SDK.",
						"Разработано на Next.js 16, Tailwind CSS v4 и React Compiler. Управление haptic-откликом реализовано через TMA SDK.",
					),
					p(
						"The recommendation engine matches selected answers with flavor and color tag matrices, loading highly optimized WebP assets lazily to preserve load speeds.",
						"Алгоритм подбора использует матрицы весов и ленивую загрузку WebP-изображений для ускорения мобильного трафика.",
					),
					p(
						"Lead capture data is sent to CRM endpoints using secure client-side API requests, passing strict server validation rules before generating discount codes.",
						"Данные контактов передаются в CRM заказчика через защищенные API-запросы с серверной валидацией.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"Unified operational write-off logs cut reporting discrepancies across sales points, providing the business owner with instant visibility into daily losses.",
					"Единые логи списаний исключили расхождения по розничным точкам, дав владельцу бизнеса мгновенную видимость ежедневных потерь.",
				),
				p(
					"Staff errors were reduced using the one-tap logging interface combined with the 60-second undo window and tactile feedback.",
					"Ошибки персонала сократились за счет удобного ввода в один тап в сочетании с 60-секундным окном отмены и тактильным откликом.",
				),
				p(
					"The florist recommendation quiz generated high user engagement, achieving a 40% conversion rate from starting the questions to lead form submissions.",
					"Квиз-опросник показал отличную вовлеченность и высокую конверсию в 40% из первого клика в готовый лид.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"The write-off Mini App operates strictly in Russian for the localized store workforce, while the quiz is available in both languages.",
						"Панель списаний работает на русском языке под целевую аудиторию сотрудников, в то время как квиз переведен на оба языка.",
					),
					p(
						"Relying on Convex reactive queries requires active network connectivity during write-off actions to sync values.",
						"Использование реактивных запросов Convex обеспечивает быстрый реалтайм, но требует постоянного подключения к сети.",
					),
					p(
						"Keeping the marketing quiz questions engaging required limiting them to five steps, balancing depth with session completion rates.",
						"Для высокой досматриваемости пришлось ограничить число вопросов пятью, балансируя между глубиной и скоростью опроса.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"Why is the write-off tracker inside a Telegram Mini App?",
					"Почему трекер списаний сделан в Telegram Mini App?",
				),
				answer: p(
					"To provide instant access for store cashiers without requiring custom app store installs, leveraging group chat deep link invitations.",
					"Для быстрого доступа продавцов без установки отдельных приложений, с простой отправкой инвайт-ссылок в рабочие чаты.",
				),
			},
			{
				question: p(
					"How does the bouquet recommendation engine work?",
					"Как работает подбор букета?",
				),
				answer: p(
					"It scores products based on tags associated with each selected answer, matching the highest-scoring bouquets.",
					"Алгоритм начисляет баллы товарам по тегам ответов, выводя на экран позиции с наибольшим рейтингом.",
				),
			},
			{
				question: p(
					"Are report exports easy to use?",
					"Удобно ли экспортировать отчеты?",
				),
				answer: p(
					"Yes, the dashboard supports standard CSV exports and copies formatted tables directly to spreadsheets like Excel.",
					"Да, дашборд поддерживает стандартный экспорт в CSV и копирование структурированной таблицы прямо в Excel.",
				),
			},
		],
		seo: {
			title: p(
				"Flower Retail Suite Case Study - Convex TMA & PWA Quiz",
				"Кейс Flower Retail Suite - Convex TMA и PWA квиз",
			),
			description: p(
				"Detailed case study of Flower Retail Suite: flower write-off tracker Telegram Mini App with Convex backend, and interactive bouquet recommendation quiz.",
				"Подробный кейс Flower Retail Suite: Telegram Mini App для учета списаний на Convex и интерактивный PWA-квиз рекомендаций букетов.",
			),
			keywords: {
				en: [
					"flower retail tools",
					"convex telegram mini app",
					"retail inventory logs",
					"marketing quiz algorithm",
					"react pwa quiz",
				],
				ru: [
					"инструменты цветочной розницы",
					"tma на convex",
					"учет списания цветов",
					"алгоритм квиза",
					"pwa опросник",
				],
			},
			ogSubtitle: p(
				"Write-off tracking Mini App and florist recommendation quiz suite",
				"Учет списаний в Telegram Mini App и квиз-рекомендатор букетов",
			),
		},
	},
	smbro: {
		slug: "smbro",
		projectId: "smbro",
		visibility: PROJECT_BY_SLUG.smbro.visibility,
		status: PROJECT_BY_SLUG.smbro.status,
		hero: {
			badge: p("Brand Digital Ecosystem", "Цифровая экосистема бренда"),
			summary: p(
				"A unified digital commerce ecosystem for SMOKE ME BRO: retail/wholesale portal, Telegram Mini App ordering system with MoySklad sync, and Three.js WebGL marketing landing.",
				"Комплексная цифровая экосистема SMOKE ME BRO: оптово-розничный портал, торговый Telegram Mini App с интеграцией МойСклад и промо-страница на WebGL.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"SMOKE ME BRO operated with fragmented sales surfaces: a simple brand website, manual wholesale orders handled via managers in chats, and marketing campaigns leading to generic landing pages. This caused inventory discrepancies and high administrative overhead.",
					"Бренд работал в разрозненных каналах: простой сайт, ручные оптовые заказы в чатах через менеджеров и рекламный трафик на простые страницы. Это приводило к расхождениям по остаткам и высокой нагрузке на команду.",
				),
				p(
					"The goal was to design and build a unified digital commerce ecosystem combining consumer discovery, a self-service B2B wholesale platform, a Telegram Mini App storefront, and an immersive WebGL-powered marketing funnel.",
					"Целью было создание единой экосистемы цифровой коммерции: публичный сайт, оптовый личный кабинет дилера, магазин в Telegram Mini App и промо-страница с трехмерной графикой.",
				),
				p(
					"We needed to support real-time inventory synchronization with MoySklad API, multi-role checkout rules, and high-performance WebGL animations to engage retail and wholesale audiences.",
					"Было необходимо внедрить синхронизацию остатков с API МойСклад, ролевую систему скидок в корзине и производительную 3D-графику для привлечения клиентов.",
				),
			]),
			section(
				"architecture",
				p("Architecture and monorepo", "Архитектура и монорепозиторий"),
				[
					p(
						"The entire system is deployed as modular surfaces inside a single Next.js monorepo, sharing UI assets, database queries, and API modules to keep development agile.",
						"Вся система развернута как набор модулей в монорепозитории Next.js, разделяя UI-пакеты, запросы к базе данных и API для быстрой разработки.",
					),
					p(
						"Data storage is powered by Convex DB, handling reactive client sessions. The inventory pipeline synchronizes warehouse stock levels with MoySklad API via scheduled cron workers.",
						"Хранение данных решено через базу Convex для реактивных сессий. Синхронизация остатков со складом МойСклад выполняется автоматически по крону.",
					),
					p(
						"The promotional frontend runs a WebGL render loop using Three.js and custom fragment shaders, optimized to load under 200ms by utilizing lightweight SVG assets.",
						"Промо-лендинг использует Three.js с кастомными фрагментными шейдерами, загружаясь быстрее чем за 200 мс благодаря векторным ассетам.",
					),
				],
				[
					p(
						"Next.js monorepo with shared packages",
						"Next.js монорепозиторий с общими пакетами",
					),
					p(
						"Convex DB reactive backend & MoySklad API",
						"Реактивный Convex DB и интеграция с МойСклад",
					),
					p(
						"Three.js shader-based fluid animations",
						"Трехмерная шейдерная анимация на Three.js",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"The brand platform offers pickup location maps, news feeds, and role-based CMS management for content, users, and product analytics.",
					"Портал бренда предлагает карту точек самовывоза, ленту новостей и CMS для управления контентом, пользователями и аналитикой.",
				),
				p(
					"Wholesale buyers log into personal profiles to view tiered pricing cards, configure bulk order sheets, calculate volume-based discounts, and export PDF invoices.",
					"Оптовые клиенты в личном кабинете видят свои колонки цен, собирают оптовые заказы, рассчитывают скидки и скачивают счета в PDF.",
				),
				p(
					"The Telegram Mini App brings catalog search, shopping carts, win-wheel gamification, and manager broadcast alerts directly inside the chat interface.",
					"Telegram Mini App дает доступ к поиску по каталогу, корзине, игре «Колесо фортуны» и менеджерским рассылкам прямо в чате.",
				),
				p(
					"The WebGL marketing landing utilizes dynamic cursor liquid-distortion physics to engage mobile visitors and convert them to bot leads.",
					"WebGL-страница использует физику искажения жидкости курсором для вовлечения посетителей и конвертации их в лиды.",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"Powered by React, Next.js, and TypeScript. State management is split between Convex queries and Zustand stores with localStorage persistence.",
						"Стек: React, Next.js и TypeScript. Состояние разделено между реактивным Convex и Zustand с сохранением в localStorage.",
					),
					p(
						"WebGL effects are built using Three.js postprocessing packages, rendering custom noise displacements and liquid physics at 60 FPS on mobile.",
						"Эффекты WebGL собраны на Three.js с пост-обработкой, выдавая кастомный шум и искажения жидкости на 60 FPS на смартфонах.",
					),
					p(
						"MoySklad API integrations sync stock amounts, pricing categories, and order specifications automatically, with strict rate-limit protection.",
						"Интеграция с API МойСклад автоматически синхронизирует остатки, цены и спецификации заказов с защитой от превышения лимитов.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"Wholesale order processing speed rose by 60% as manual managers' spreadsheet confirmations were replaced by self-service portals.",
					"Скорость оптовых продаж выросла на 60%: ручная выписка накладных и сверка прайсов сменились автоматической системой.",
				),
				p(
					"Double sales of seasonal items dropped to absolute zero due to real-time stock sync across the wholesale dashboard and TMA catalog.",
					"Двойные продажи дефицитных позиций снизились до нуля благодаря реалтайм-синхронизации остатков на портале и в Mini App.",
				),
				p(
					"WebGL promotional pages generated a 35% increase in lead captures, sending qualified traffic straight into Telegram bot funnels.",
					"Промо-страница на WebGL показала рост конверсии в лиды на 35%, перенаправляя аудиторию сразу в воронки ботов.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Combining web portals, mini-apps, and shaders in one monorepo simplifies updates but increases initial config and routing complexity.",
						"Объединение сайтов, Mini App и шейдеров в монорепозитории упрощает деплой, но усложняет первичную конфигурацию роутинга.",
					),
					p(
						"Convex real-time queries provide instant catalog changes but require strict document cache invalidation rules.",
						"Реактивные запросы Convex обновляют каталог на лету, но требуют настройки правил инвалидации кэша.",
					),
					p(
						"Heavy fragment shaders on the promotional page require strict device performance checks, falling back to static layouts on legacy devices.",
						"Тяжелые шейдеры на промо-странице требуют проверки мощности девайсов со спуском к статичным картинкам на старых телефонах.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"How is stock sync kept consistent?",
					"Как поддерживается точность остатков?",
				),
				answer: p(
					"The scheduler pulls MoySklad API updates periodically, and database transaction locks prevent double checkout of single inventory items.",
					"Планировщик запрашивает API МойСклад по расписанию, а блокировка транзакций в базе предотвращает овербукинг товаров.",
				),
			},
			{
				question: p(
					"Why use WebGL liquid shaders for promo?",
					"Зачем нужны шейдеры на промо-странице?",
				),
				answer: p(
					"To design a high-contrast, premium experience that stands out from default template sites, increasing user attention and click conversions.",
					"Для создания премиального контрастного дизайна, выделяющегося на фоне шаблонов и повышающего конверсию в клики.",
				),
			},
			{
				question: p(
					"How is order status tracked?",
					"Как отслеживается статус заказа?",
				),
				answer: p(
					"Order updates in MoySklad trigger Convex status mutations, sending automated notifications via Telegram bot alerts.",
					"Изменения заказа в МойСклад меняют статус в Convex, отправляя авто-уведомления через Telegram-бота.",
				),
			},
		],
		seo: {
			title: p(
				"SMOKE ME BRO Ecosystem Case Study - Commerce Engine",
				"Кейс SMOKE ME BRO Ecosystem - Цифровая коммерция",
			),
			description: p(
				"Detailed case study of SMOKE ME BRO digital ecosystem: wholesale Next.js platform, Telegram ordering Mini App, and Three.js promo landing.",
				"Подробный кейс экосистемы SMOKE ME BRO: оптовый кабинет на Next.js, торговый Telegram Mini App с МойСклад и WebGL промо-лендинг.",
			),
			keywords: {
				en: [
					"smoke me bro ecosystem",
					"wholesale portal nextjs",
					"telegram mini app commerce",
					"threejs liquid shader",
				],
				ru: [
					"экосистема smoke me bro",
					"оптовый портал nextjs",
					"торговый telegram mini app",
					"шейдеры Three.js жидкость",
				],
			},
			ogSubtitle: p(
				"Wholesale portal, Telegram Mini App, and WebGL animations",
				"Оптовый портал, Telegram Mini App и анимация на WebGL",
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
				p(
					"The visual goal was to design a clean, responsive layout that represented the premium brand aesthetic on all mobile screens.",
					"Визуальной целью было создать чистый адаптивный макет, передающий премиальную эстетику бренда на экранах телефонов.",
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
					p(
						"CSS layouts are designed around strict grid dimensions, preventing visual shifts on older smartphone viewports.",
						"CSS-сетка построена на строгих пропорциях, предотвращая сдвиги элементов на старых экранах смартфонов.",
					),
				],
				[
					p(
						"High action density layout",
						"Интерфейс с высокой плотностью действий",
					),
					p(
						"Timezone-aware store status logic",
						"Логика статуса работы с привязкой к таймзоне",
					),
					p(
						"Highly optimized single page delivery",
						"Оптимизированная загрузка одной страницы",
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
					"Иерархия информации адаптирована под короткие мобильные сессии, а не под долгое чтение лонгридов.",
				),
				p(
					"Dynamic color adjustments shift backgrounds based on operating status, indicating open/closed hours visually.",
					"Динамические изменения цвета меняют фон в зависимости от статуса работы, наглядно подсказывая рабочие часы.",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"Built on React, Next.js, and Tailwind CSS. Time zones are processed using standard date handlers.",
						"Проект собран на React, Next.js и Tailwind CSS. Часовые пояса обрабатываются через надежные системные функции.",
					),
					p(
						"Asset loading uses optimized SVG files and WebP images to keep loading times under 150 milliseconds.",
						"Графика оптимизирована с помощью SVG и WebP-изображений для сохранения скорости загрузки в пределах 150 мс.",
					),
					p(
						"Integration with analytical tools measures click-through rates on map locations and messenger buttons.",
						"Интеграция с аналитикой фиксирует переходы на карты и клики по кнопкам связи для оценки конверсии.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"The brand launched a high-performance link hub that drove storefront traffic and increased messenger conversations.",
					"Бренд получил быстрый лендинг-хаб, который увеличил переходы в офлайн-магазин и диалоги в мессенджерах.",
				),
				p(
					"Clear store status signals eliminated customer confusion regarding operating hours during holidays.",
					"Понятный статус работы снял вопросы клиентов о графике в праздничные дни, разгрузив операторов.",
				),
				p(
					"The client replaced standard templates with a custom, fast landing page that aligned with brand guidelines.",
					"Заказчик заменил стандартные шаблоны уникальным быстрым лендингом, полностью соответствующим бренд-буку.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"A single-page design requires keeping code sizes small, restricting heavy interactive libraries.",
						"Формат одностраничника заставляет строго следить за весом кода, отказываясь от тяжелых библиотек.",
					),
					p(
						"Dynamic timezone checks must execute on the client to match the server-rendered DOM safely.",
						"Динамическая проверка времени должна выполняться на клиенте для предотвращения ошибок гидратации Next.js.",
					),
					p(
						"Focusing on speed meant simplifying catalog views, prioritizing fast navigation over detailed search.",
						"Упор на скорость заставил упростить подачу каталога, выбрав быструю навигацию вместо поиска.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"How does the store status work?",
					"Как работает статус работы магазина?",
				),
				answer: p(
					"It compares the client's current time with store operating hours, adjusting the status color dynamically.",
					"Система сравнивает текущее время по МСК с рабочим графиком, динамически меняя индикатор.",
				),
			},
			{
				question: p(
					"Is this a replacements for Instagram bio link?",
					"Это замена ссылке в шапке профиля?",
				),
				answer: p(
					"Yes, it serves as a branded landing page built to convert profile visits into actual storefront customers.",
					"Да, это брендированная посадочная страница для конвертации переходов из профилей в реальных клиентов.",
				),
			},
			{
				question: p(
					"Does it support catalog filtering?",
					"Поддерживает ли страница фильтрацию?",
				),
				answer: p(
					"Yes, users can filter product category cards quickly using active layout tabs.",
					"Да, пользователи могут быстро фильтровать карточки категорий товаров с помощью вкладок.",
				),
			},
		],
		seo: {
			title: p(
				"ARCH Taplink Case Study - Landing Page and Link Hub",
				"Кейс ARCH Taplink - Лендинг и ссылка в шапке профиля",
			),
			description: p(
				"Detailed case study of a conversion-focused link hub: dynamic store status, map shortcuts, and custom brand typography.",
				"Подробный кейс разработки конверсионного лендинг-хаба: автоопределение рабочего статуса, быстрые контакты и стиль бренда.",
			),
			keywords: {
				en: [
					"arch taplink case study",
					"link in bio landing page",
					"store status timezone",
					"brand mobile link hub",
				],
				ru: [
					"кейс arch taplink",
					"лендинг для шапки профиля",
					"статус работы по времени",
					"фирменный link hub бренда",
				],
			},
			ogSubtitle: p(
				"Responsive link hub, dynamic store hours, and brand UI",
				"Адаптивный хаб ссылок, статус работы и фирменный интерфейс",
			),
		},
	},
	"price-tag-printer": {
		slug: "price-tag-printer",
		projectId: "price-tag-printer",
		visibility: PROJECT_BY_SLUG["price-tag-printer"].visibility,
		status: PROJECT_BY_SLUG["price-tag-printer"].status,
		hero: {
			badge: p("Retail PDF Tool", "Печатный инструмент для ритейла"),
			summary: p(
				"A productivity-focused web application built to import product tables and generate print-ready PDF price tags with custom themes.",
				"Веб-приложение для импорта таблиц товаров и генерации готовых к печати ценников в формате PDF с настройкой тем.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"Retail store managers wasted hours designing, formatting, and printing price tags manually, often dealing with layout breaks and text overflows.",
					"Менеджеры магазинов тратили часы на ручное оформление и печать ценников, постоянно сталкиваясь со сдвигами верстки и обрезкой текста.",
				),
				p(
					"The tool needed to ingest spreadsheets, validate pricing fields, apply brand styling rules, and export print-ready PDF layouts.",
					"Инструменту требовалось принимать таблицы данных, проверять цены, применять правила брендинга и экспортировать PDF.",
				),
				p(
					"The key design requirement was absolute layout safety: product titles of varying lengths had to fit predictably within precise grid templates.",
					"Ключевым требованием была надежность верстки: названия товаров разной длины должны предсказуемо умещаться в макет.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"We implemented a pipeline that parses Excel/CSV files client-side, maps inputs to tag templates, and generates PDF grids.",
						"Мы разработали конвейер, который парсит Excel/CSV на клиенте, сопоставляет данные с шаблонами ценников и строит PDF-сетки.",
					),
					p(
						"To ensure absolute print fidelity, the layout coordinates are mapped using physical millimeter units rather than screen pixels.",
						"Для точности размеров при печати координаты элементов в макетах задаются в миллиметрах, а не в пикселях.",
					),
					p(
						"An automated text-scaling engine adjusts font sizes dynamically based on character counts to prevent title overflows.",
						"Алгоритм автоматического масштабирования текста меняет размер шрифта в зависимости от длины строки, исключая перенос.",
					),
				],
				[
					p(
						"Millimeter-based print layout precision",
						"Миллиметровая точность печатных макетов",
					),
					p(
						"Dynamic auto-scaling typography engine",
						"Динамический движок масштабирования шрифтов",
					),
					p(
						"Client-side spreadsheet parsing workflow",
						"Клиентский парсинг электронных таблиц",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"Users upload xlsx sheets, select design themes, preview layouts, customize parameters, and download PDFs within seconds.",
					"Пользователь загружает файлы xlsx, выбирает тему оформления, настраивает параметры ценников и скачивает готовый PDF.",
				),
				p(
					"The theme customizer lets administrators configure fonts, border weights, brand logo paths, and price display options.",
					"Конструктор тем позволяет настраивать шрифты, толщину границ, логотипы брендов и формат вывода цен.",
				),
				p(
					"The print grid auto-calculates page breaks, margin sizes, and item padding to optimize paper usage during printing.",
					"Печатная сетка автоматически рассчитывает перенос страниц, размеры полей и отступы для экономии бумаги.",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"React, Next.js, and TypeScript handle the web interface. Spreadsheet parsing is processed by js-xlsx libraries.",
						"Веб-интерфейс: React, Next.js и TypeScript. Парсинг таблиц выполняется библиотекой js-xlsx на клиенте.",
					),
					p(
						"PDF layout construction is handled by advanced print stylesheets and server-side chromium renderers for print precision.",
						"Генерация PDF использует печатные CSS-стили и серверный рендеринг через Chromium для абсолютной точности макета.",
					),
					p(
						"State management validates catalog rows dynamically, highlighting empty price fields or invalid character rules.",
						"Стейт-менеджер валидирует строки каталога, подсвечивая пустые поля цен и некорректно заполненные ячейки.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"Price tag production times dropped from hours to under a minute, completely eliminating manual formatting work.",
					"Время создания ценников сократилось с часов до минуты, полностью освободив менеджеров от ручной рутины.",
				),
				p(
					"Print errors and layout breaks were eliminated by the auto-scaling engine and strict millimeter-based constraints.",
					"Ошибки печати и сдвиги верстки свелись к нулю благодаря автоподгонке шрифтов и точной миллиметровой сетке.",
				),
				p(
					"The retail network launched a reliable internal tool that standardizes pricing displays across physical locations.",
					"Сеть магазинов получила надежный внутренний инструмент, стандартизировавший оформление витрин.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Millimeter print rendering matches physical templates perfectly but behaves differently from responsive web layouts.",
						"Миллиметровая верстка идеальна для печати, но требует иных подходов, отличных от адаптивной веб-верстки.",
					),
					p(
						"Generating massive PDF files client-side can exhaust mobile browser memory, requiring chunked export pipelines.",
						"Создание тяжелых PDF на клиенте может перегрузить память телефона, что потребовало деления экспорта на части.",
					),
					p(
						"Restricting layout customizations ensures brand consistency but limits store managers' custom formatting options.",
						"Ограничение свободы кастомизации защищает бренд-бук, но лишает менеджеров возможности делать ценники вручную.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"How is physical size accuracy guaranteed?",
					"Как гарантируется точность размеров при печати?",
				),
				answer: p(
					"By defining all container layout bounds in millimeters and using print CSS page rules for scaling.",
					"За счет указания всех размеров макетов в миллиметрах (mm) и использования печатных CSS-правил.",
				),
			},
			{
				question: p(
					"Does it support custom fonts?",
					"Поддерживает ли инструмент кастомные шрифты?",
				),
				answer: p(
					"Yes, themes can load brand font faces, applying typography rules to titles and price displays.",
					"Да, темы оформления могут подключать фирменные шрифты бренда, применяя их к текстам и ценам.",
				),
			},
			{
				question: p(
					"How does the text-scaling work?",
					"Как работает автоподгонка текста под размер?",
				),
				answer: p(
					"A custom function counts characters in the product title, reducing font-size steps if limits are exceeded.",
					"Кастомная функция считает длину названия товара и уменьшает шрифт на шаг, если текст выходит за границы.",
				),
			},
		],
		seo: {
			title: p(
				"Price Tag Printer Case Study - Retail PDF Generation",
				"Кейс Price Tag Printer - Генератор ценников в PDF",
			),
			description: p(
				"Detailed case study of a retail productivity tool: automated spreadsheet parsing, dynamic text scaling, and physical millimeter layout precision.",
				"Подробный кейс инструмента для ритейла: парсинг таблиц, динамическое масштабирование шрифтов и миллиметровые печатные PDF-шаблоны.",
			),
			keywords: {
				en: [
					"price tag printer case study",
					"retail pdf generation",
					"spreadsheet excel parser",
					"millimeter layout css print",
				],
				ru: [
					"кейс price tag printer",
					"генерация ценников в pdf",
					"парсер таблиц excel",
					"печать ценников в миллиметрах",
				],
			},
			ogSubtitle: p(
				"Retail tag generator, spreadsheet parser, and PDF export",
				"Печатный генератор ценников, импорт таблиц и экспорт в PDF",
			),
		},
	},
	"psp-book-reader": {
		slug: "psp-book-reader",
		projectId: "psp-book-reader",
		visibility: PROJECT_BY_SLUG["psp-book-reader"].visibility,
		status: PROJECT_BY_SLUG["psp-book-reader"].status,
		hero: {
			badge: p("Retro Emulator Homebrew", "Retro Emulator Homebrew"),
			summary: p(
				"A classic homebrew reader application built for the PlayStation Portable (PSP) console, optimized for hardware memory limits.",
				"Классическое homebrew-приложение для чтения книг на консоли PlayStation Portable (PSP), оптимизированное под лимиты памяти.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"The PlayStation Portable console lacked a responsive, native book reader that supported TXT files, custom typography, and fast page navigation.",
					"Консоли PlayStation Portable не хватало отзывчивого и удобного ридера с поддержкой TXT-файлов и гибких шрифтов.",
				),
				p(
					"The hardware constraints were severe: only 24MB of usable system memory, a low-resolution screen, and slow memory stick read speeds.",
					"Аппаратные ограничения были жесткими: всего 24 МБ доступной оперативной памяти, низкое разрешение экрана и медленное чтение с карты.",
				),
				p(
					"The application had to load massive text files, split content into pages on the fly, and render readable fonts without system crashes.",
					"Приложение должно было открывать тяжелые книги, разбивать их на страницы на лету и рендерить шрифты без зависаний системы.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"We designed a lightweight C/C++ architecture utilizing the native PSP SDK and low-level hardware graphics rendering libraries.",
						"Мы спроектировали легкую C/C++ архитектуру на базе официального SDK консоли и низкоуровневых графических библиотек.",
					),
					p(
						"To stay within the 24MB memory limit, the reader parses text files in chunks, indexing page offsets instead of loading the entire book.",
						"Чтобы уложиться в 24 МБ памяти, ридер считывает файлы блоками, индексируя смещения страниц вместо загрузки всей книги.",
					),
					p(
						"Custom font rendering maps character glyphs directly to memory buffers, keeping CPU usage low during page transitions.",
						"Кастомный рендеринг шрифтов выводит глифы символов напрямую в буфер видеопамяти, экономя ресурсы процессора.",
					),
				],
				[
					p(
						"C/C++ low-level hardware design",
						"Низкоуровневая разработка на C/C++",
					),
					p(
						"Chunked text loading and offset indexing",
						"Поблочная загрузка текста и индексация смещений",
					),
					p(
						"Optimized direct-to-buffer font rendering",
						"Оптимизированный рендеринг шрифтов в буфер",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"Users browse text files, configure font sizes, adjust background colors, set bookmarks, and navigate pages using console buttons.",
					"Пользователь выбирает файлы книг, меняет размер шрифта и цвет фона, ставит закладки и листает страницы кнопками консоли.",
				),
				p(
					"An auto-scrolling mode moves text lines at configurable speeds, allowing hands-free reading on the handheld device.",
					"Режим автопрокрутки двигает строки с выбранной скоростью, позволяя читать без постоянных нажатий на кнопки.",
				),
				p(
					"The application preserves bookmarks and page positions automatically, saving states to memory stick configurations.",
					"Приложение автоматически сохраняет закладки и позицию чтения в конфигурационные файлы на карту памяти Memory Stick.",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"Developed using the PSP GCC toolchain, C/C++, and hardware drawing libraries to build a high-performance console application.",
						"Разработка велась на C/C++ с использованием тулчейна PSP GCC и аппаратных библиотек вывода графики.",
					),
					p(
						"Build outputs are packaged into standard EBOOT.PBP binaries, fully compatible with custom console firmwares.",
						"Собранное приложение упаковывается в стандартный бинарник EBOOT.PBP, совместимый с кастомными прошивками консоли.",
					),
					p(
						"Testing was conducted on real hardware and PSP emulators to validate memory limits, file reads, and battery usage metrics.",
						"Тестирование проводилось на реальном железе и эмуляторах для замера потребления памяти и расхода батареи.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"The homebrew reader became a popular application on the PSP scene, offering a stable and lightweight reading tool.",
					"Homebrew-ридер стал популярным приложением на сцене PSP, предложив стабильный и не требовательный к ресурсам инструмент.",
				),
				p(
					"Chunked reading pipelines allowed the console to open 10MB text files instantly without memory allocation crashes.",
					"Поблочное чтение позволило без проблем открывать книги весом более 10 МБ, исключив падения по нехватке памяти.",
				),
				p(
					"The project demonstrated low-level optimization rules, squeezing maximum performance from retro handheld console hardware.",
					"Проект доказал эффективность низкоуровневой оптимизации, выжав максимум из скромного железа портативной консоли.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Restricting formats to TXT simplified parsing code but meant users had to convert EPUB and PDF books manually.",
						"Ограничение формата только файлами TXT упростило код, но заставило пользователей конвертировать EPUB и PDF книги.",
					),
					p(
						"Rendering custom fonts directly to memory saves RAM but limits complex text layouts like columns or embedded images.",
						"Вывод шрифтов в буфер экономит память, но исключает сложную верстку вроде колонок текста или картинок.",
					),
					p(
						"Relying on physical buttons for navigation required designing intuitive button layouts due to the lack of touch screens.",
						"Управление только физическими кнопками потребовало детальной проработки эргономики из-за отсутствия тачскрина.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"How is text file chunking implemented?",
					"Как устроена поблочная загрузка книг?",
				),
				answer: p(
					"The app reads text file blocks dynamically, using file pointer offsets to navigate back and forth without loading the whole file.",
					"Приложение считывает файлы кусками по мере чтения, используя указатели смещения для переходов назад и вперед.",
				),
			},
			{
				question: p(
					"What console firmwares are supported?",
					"Какие прошивки консоли поддерживаются?",
				),
				answer: p(
					"It runs on any custom firmware (CFW) starting from version 3.xx up to the latest 6.61 systems.",
					"Приложение работает на любой кастомной прошивке (CFW), начиная с версии 3.xx и заканчивая актуальной 6.61.",
				),
			},
			{
				question: p(
					"Does it support custom themes?",
					"Поддерживаются ли темы оформления?",
				),
				answer: p(
					"Users can adjust font colors and backgrounds inside the settings file, creating high-contrast layouts.",
					"Пользователи могут настроить цвета шрифта и фона в конфигурационном файле, создавая контрастные темы.",
				),
			},
		],
		seo: {
			title: p(
				"PSP Book Reader Case Study - Retro Console Homebrew",
				"Кейс PSP Book Reader - Чтение книг на PlayStation Portable",
			),
			description: p(
				"Detailed case study of a C/C++ homebrew book reader for the PlayStation Portable console, optimized for hardware memory limits.",
				"Подробный кейс homebrew-приложения для PSP на C/C++: поблочный парсинг текста, оптимизация памяти 24 МБ и кастомные шрифты.",
			),
			keywords: {
				en: [
					"psp book reader homebrew",
					"playstation portable c++",
					"retro console memory optimization",
					"eboot pbp custom firmware",
				],
				ru: [
					"читалка книг для psp",
					"разработка на c++ для psp",
					"оптимизация памяти консоли",
					"homebrew приложение eboot pbp",
				],
			},
			ogSubtitle: p(
				"PSP homebrew reader, C/C++ console code, and memory optimization",
				"Homebrew для PSP, разработка на C/C++ и оптимизация памяти",
			),
		},
	},

	"schrute-farm": {
		slug: "schrute-farm",
		projectId: "schrute-farm",
		visibility: PROJECT_BY_SLUG["schrute-farm"].visibility,
		status: PROJECT_BY_SLUG["schrute-farm"].status,
		hero: {
			badge: p("Phaser Idle Clicker Game", "Idle-игра на Phaser"),
			summary: p(
				"An idle clicker game built using the Phaser framework, featuring upgrade systems, offline progression, achievements, and PWA packaging.",
				"Красочная idle-игра на фреймворке Phaser: апгрейды, офлайн-прогрессия, достижения и упаковка в PWA.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"We wanted to build an engaging, retro-style idle game that ran smoothly inside web browsers and supported offline progression.",
					"Мы хотели создать увлекательную idle-игру в ретро-стиле, которая плавно работает в браузерах и поддерживает офлайн-прогресс.",
				),
				p(
					"The technical goal was to ensure high performance on mobile devices, keeping asset sizes small and loop calculations fast.",
					"Техническая цель — обеспечить высокую производительность на мобильных, сжав ресурсы и ускорив игровой цикл.",
				),
				p(
					"The game had to be installable as a Progressive Web App (PWA), preserving player state reliably between sessions.",
					"Игра должна была устанавливаться как PWA (Progressive Web App), надежно сохраняя прогресс игрока между запусками.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"The game architecture is built on Phaser scenes, separating UI rendering layers from core state progression models.",
						"Архитектура построена на сценах Phaser, разделяя уровни отрисовки интерфейса и ядро игровой логики.",
					),
					p(
						"An offline earnings calculator processes timestamps on launch, computing resource accumulation during player absence.",
						"Калькулятор офлайн-дохода сверяет метки времени при запуске, рассчитывая накопление ресурсов за время отсутствия.",
					),
					p(
						"We implemented custom canvas rendering optimizations to keep frame rates stable at 60 FPS even on older devices.",
						"Мы применили оптимизации отрисовки на холсте (canvas), сохранив стабильные 60 FPS даже на старых смартфонах.",
					),
				],
				[
					p(
						"Phaser-based scene architecture",
						"Архитектура игровых сцен на Phaser",
					),
					p(
						"Offline progression time math",
						"Математика расчета офлайн-прогрессии",
					),
					p(
						"PWA packaging with service workers",
						"Упаковка в PWA с поддержкой Service Workers",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"Players click to harvest resources, buy automated upgrade cards, unlock achievements, and trigger prestige resets.",
					"Игрок кликает для сбора ресурсов, покупает карты автоматических улучшений, открывает ачивки и делает престиж-сбросы.",
				),
				p(
					"Offline earnings logic computes missed production hours, presenting returning players with aggregated balance rewards.",
					"Логика офлайн-дохода считает пропущенное время производства, встречая вернувшегося игрока накопленными бонусами.",
				),
				p(
					"A mini-game mode introduces active tapping challenges, giving players temporary production boosts and score multipliers.",
					"Режим мини-игры запускает активные тапалки на время, давая временные бусты производства и множители очков.",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"Developed using C/C++ (wasm), Phaser, and TypeScript. Service workers manage asset caching for offline play.",
						"Разработка велась на Phaser и TypeScript. Service Workers кэшируют ассеты для автономного запуска игры оффлайн.",
					),
					p(
						"JSON files manage upgrade parameters, balance balancing, and achievement criteria dynamically.",
						"Параметры апгрейдов, баланс игры и условия достижений описаны в структурированных JSON-файлах.",
					),
					p(
						"Local storage sync saves player states securely, validating save parameters to prevent progress corruption.",
						"Синхронизация с Local Storage безопасно сохраняет состояние игрока, проверяя файлы сохранений на ошибки.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"The game achieved smooth 60 FPS rendering on mobile devices, providing an engaging retro gameplay experience.",
					"Игра показала стабильные 60 FPS на мобильных устройствах, обеспечив плавный ретро-геймплей.",
				),
				p(
					"PWA packaging allowed users to install the game instantly, raising repeat sessions by 50% compared to standard web visits.",
					"Формат PWA позволил устанавливать игру на экраны смартфонов, повысив повторные сессии на 50%.",
				),
				p(
					"The offline progression math worked reliably, keeping player balances balanced and preserving progress across updates.",
					"Математика офлайн-прогресса отработала стабильно, сохранив игровой баланс и сбережения игроков при обновлениях.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Adding side content increases retention potential but complicates balancing and maintenance.",
						"Добавление побочного контента повышает потенциал удержания, но усложняет игровой баланс и поддержку.",
					),
					p(
						"Theme fidelity must be managed carefully to avoid reducing gameplay clarity.",
						"Тематическую выразительность графики пришлось ограничивать, чтобы не ухудшать читаемость интерфейса.",
					),
					p(
						"Relying on local storage for saves is simple but means progress is lost if browser cache is cleared.",
						"Хранение сохранений в Local Storage просто в реализации, но прогресс пропадет при очистке кэша браузера.",
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
					"Through offline earnings logic and persistent progression state saved in local storage.",
					"Через формулу офлайн-дохода и сохранение состояния прогресса в локальном хранилище браузера.",
				),
			},
			{
				question: p(
					"Why use PWA for this game?",
					"Почему игра сделана как PWA?",
				),
				answer: p(
					"To reduce install friction and support repeat short sessions directly from the device home screen.",
					"Чтобы снизить барьер установки и дать возможность быстро запускать игру прямо с главного экрана смартфона.",
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
				"Подробный кейс idle-игры на Phaser: апгрейды, достижения, престиж-сбросы, дополнительные мини-игры и расчет офлайн-дохода в PWA формате.",
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
	sleepoff: {
		slug: "sleepoff",
		projectId: "sleepoff",
		visibility: PROJECT_BY_SLUG.sleepoff.visibility,
		status: PROJECT_BY_SLUG.sleepoff.status,
		hero: {
			badge: p("macOS Sleep Utility", "Утилита сна macOS"),
			summary: p(
				"A lightweight macOS Swift menu bar utility that prevents closed-lid sleep and dims the built-in display, auto-triggered by active AI coding agents.",
				"Легкая утилита Swift для панели меню macOS: блокирует спящий режим при закрытой крышке и гасит экран при активности AI-агентов.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"macOS puts MacBooks to sleep when the lid is closed unless connected to an external display. For users running long-running local AI development agents (like Antigravity or Codex), this stops active work as soon as the laptop is closed.",
					"macOS отправляет MacBook в спящий режим при закрытии крышки, если не подключен внешний монитор. Для пользователей локальных AI-агентов (Antigravity, Codex) это прерывает работу сразу после закрытия ноутбука.",
				),
				p(
					"Existing utilities require manual toggles and keep the built-in screen active when closed, wasting energy and causing heat issues inside the closed laptop.",
					"Существующие утилиты требуют ручного переключения и оставляют экран включенным при закрытой крышке, что тратит заряд и вызывает нагрев.",
				),
				p(
					"The goal was to build a lightweight Swift menu bar app that detects active AI agents, dynamically blocks sleep, and forces screen brightness to zero only while the lid is closed.",
					"Целью было создание легкого Swift-приложения для панели меню: оно определяет активность AI-агентов, блокирует сон и гасит экран на закрытой крышке.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"Built as a native Swift macOS App. It reads clamshell state from `AppleClamshellState` via IOKit and monitors running processes to identify active AI agents.",
						"Разработано как нативное macOS Swift приложение. Оно считывает состояние крышки `AppleClamshellState` через IOKit и сканирует процессы для поиска AI-агентов.",
					),
					p(
						"When active, sleep is blocked using `pmset -a disablesleep`. To avoid repeated password prompts, a helper script installs a narrow one-time `sudoers` privilege rule for `pmset` commands.",
						"При активности сон блокируется через `pmset -a disablesleep`. Чтобы избежать постоянного ввода пароля, скрипт устанавливает узкое однократное правило `sudoers` для `pmset`.",
					),
					p(
						"Display brightness is managed using CoreDisplay APIs, forcing brightness to 0 on lid close and restoring the original level when the laptop opens.",
						"Яркость дисплея контролируется через API CoreDisplay: при закрытии крышки она сбрасывается в 0, а при открытии восстанавливается в исходное состояние.",
					),
				],
				[
					p(
						"Native Swift menu bar implementation",
						"Нативное Swift приложение для панели меню",
					),
					p(
						"CoreDisplay brightness level overrides",
						"Управление уровнем яркости CoreDisplay",
					),
					p(
						"Narrow sudoers privilege rules for pmset",
						"Узкие правила привилегий sudoers для pmset",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"The app cycles through three modes: Off (allows sleep), On (always blocks sleep), and Auto AI (blocks sleep only when supported AI agents are running).",
					"Приложение поддерживает три режима: Выкл (разрешает сон), Вкл (блокирует сон) и Авто ИИ (блокирует сон только при работе AI-агентов).",
				),
				p(
					"Supports active monitoring of Antigravity IDE and Codex CLI agents, dynamically changing the menu bar icon from a single sparkle to multiple sparkles during generation.",
					"Отслеживает процессы Antigravity IDE и Codex CLI, динамически меняя иконку в строке меню с одной искры на несколько во время генерации кода.",
				),
				p(
					"Includes custom keyboard shortcuts (defaults to Control + Command + S), LaunchAgent integration for autostart, and a lightweight Nix Flake package.",
					"Включает кастомные горячие клавиши (по умолчанию Ctrl+Cmd+S), автозапуск через LaunchAgent и сборку в формате Nix Flake.",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"Written in Swift without external frameworks to keep resource usage minimal. Nix Flake and Homebrew Cask configurations handle deployment.",
						"Написано на Swift без сторонних фреймворков для минимизации ресурсов. Дистрибуция настроена через Nix Flake и Homebrew Cask.",
					),
					p(
						"System calls interact with AppleClamshellState and use IOPSNotificationCreateRunLoopSource to react to power adapter changes.",
						"Системные вызовы работают с AppleClamshellState и используют IOPSNotificationCreateRunLoopSource для реакции на подключение зарядки.",
					),
					p(
						"A custom installation script configures the launch plist and configures sudoers permissions for secure, quiet operations.",
						"Кастомный скрипт установки настраивает plist для автозапуска и прописывает права sudoers для тихой и безопасной работы pmset.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"MacBooks can compile, run tests, and process AI prompts with closed lids, avoiding thermal throttling and saving energy by forcing the screen off.",
					"Ноутбуки могут собирать проекты, гонять тесты и выполнять промпты при закрытой крышке без перегрева и с экономией энергии за счет отключения экрана.",
				),
				p(
					"No more manual terminal commands: the application starts on boot and toggles sleep settings in the background depending on active coding tasks.",
					"Больше никаких ручных команд в терминале: утилита запускается на старте и сама меняет параметры в зависимости от запущенных задач.",
				),
				p(
					"Developers running local LLMs and agentic helpers can close their laptops and continue coding without losing terminal sessions.",
					"Разработчики с локальными LLM и агентами могут закрывать ноутбук и продолжать кодинг, не теряя сессии в терминале.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Modifying `pmset disablesleep` requires sudo permissions, which necessitates a one-time administrative password during setup.",
						"Изменение `pmset disablesleep` требует прав sudo, из-за чего при установке запрашивается административный пароль.",
					),
					p(
						"Forcing brightness to 0 is done programmatically; if the app crashes while closed, the original brightness must be manually restored on open.",
						"Сброс яркости в 0 делается программно: при вылете приложения в закрытом состоянии яркость придется восстанавливать вручную.",
					),
					p(
						"Process detection monitors agent binary names, which means renamed executables will not trigger the Auto AI mode.",
						"Поиск агентов идет по именам исполняемых файлов, поэтому переименованные бинарники не запустят режим Авто ИИ.",
					),
				],
			),
		],
		faq: [
			{
				question: p(
					"How does the app detect AI agents?",
					"Как приложение обнаруживает AI-агентов?",
				),
				answer: p(
					"It scans running process identifiers (PIDs) for matching executable names like Antigravity or Codex CLI helper processes.",
					"Оно сканирует идентификаторы процессов (PID) на совпадение с бинарниками Antigravity или вспомогательными CLI-процессами Codex.",
				),
			},
			{
				question: p(
					"Is it safe for the MacBook to run closed?",
					"Безопасно ли запускать MacBook в закрытом виде?",
				),
				answer: p(
					"Yes, because the display is turned off to prevent screen heating, and the CPU is allowed normal thermal control by macOS.",
					"Да, так как дисплей отключается для защиты матрицы от нагрева, а CPU охлаждается штатными средствами macOS.",
				),
			},
			{
				question: p(
					"How do I install the pmset privilege helper?",
					"Как установить хелпер привилегий pmset?",
				),
				answer: p(
					"The app provides a setup button or command that adds the narrow sudoers rule for the pmset binary path.",
					"Приложение предлагает кнопку настройки или команду, которая прописывает узкое правило sudoers для пути к pmset.",
				),
			},
		],
		seo: {
			title: p(
				"SleepOff Case Study - macOS Closed Lid Sleep Prevention",
				"Кейс SleepOff - Блокировка режима сна macOS при закрытой крышке",
			),
			description: p(
				"Detailed case study of SleepOff: a Swift menu bar app that prevents sleep, dims screens to zero, and auto-toggles when AI agents are working.",
				"Подробный кейс SleepOff: Swift-приложение для панели меню, блокирующее сон, гасящее экран и включающееся при работе AI-агентов.",
			),
			keywords: {
				en: [
					"sleepoff mac utility",
					"prevent mac sleep closed lid",
					"macos screen brightness swift",
					"pmset disablesleep sudoers",
				],
				ru: [
					"утилита sleepoff mac",
					"блокировка сна закрытая крышка",
					"яркость экрана macos swift",
					"pmset disablesleep sudoers",
				],
			},
			ogSubtitle: p(
				"macOS Swift utility, pmset controls, and screen dimming",
				"Утилита macOS на Swift, управление pmset и гашение экрана",
			),
		},
	},
	"spritefusion-pixel-snapper": {
		slug: "spritefusion-pixel-snapper",
		projectId: "spritefusion-pixel-snapper",
		visibility: PROJECT_BY_SLUG["spritefusion-pixel-snapper"].visibility,
		status: PROJECT_BY_SLUG["spritefusion-pixel-snapper"].status,
		hero: {
			badge: p("Rust/WASM Grid Snapper", "Сетка и квантование на Rust/WASM"),
			summary: p(
				"A Rust CLI tool and WebAssembly module that snaps misaligned pixel art to a rigid grid and applies K-Means color quantization.",
				"Инструмент на Rust (CLI и WASM), выравнивающий пиксели AI-арта по жесткой сетке и применяющий K-Means квантование цветов.",
			),
		},
		sections: [
			section("context", p("Problem and context", "Контекст и задача"), [
				p(
					"Modern generative AI models produce stunning illustrations but struggle with pixel art constraints: pixels drift from rigid grids, resolutions scale inconsistently, and palettes are bloated with thousands of shades.",
					"Современные AI-модели генерируют отличные арты, но не понимают ограничений пиксель-арта: пиксели съезжают с сетки, разрешения плавают, а палитра раздувается до тысяч оттенков.",
				),
				p(
					"Game engines and tilemaps require pixel-perfect alignment and strict, indexed color palettes to prevent rendering artifacts and scale correctly.",
					"Игровые движки и тайлматы требуют идеального выравнивания пикселей и строгих индексированных палитр для правильного масштабирования.",
				),
				p(
					"The goal was to build a high-performance Rust tool (usable as a CLI and in-browser WASM) that snaps pixels to grids, quantizes colors, and preserves dithering patterns.",
					"Целью было создание быстрого инструмента на Rust (CLI и WASM для браузера), выравнивающего пиксели по сетке, сжимающего палитру и сохраняющего дизеринг.",
				),
			]),
			section(
				"architecture",
				p("Architecture and implementation", "Архитектура и реализация"),
				[
					p(
						"Implemented in Rust using the `image` crate. The core algorithm calculates grid step sizes, snaps misaligned sub-pixels to rigid boundaries, and reconstructs the output grid.",
						"Реализовано на Rust с использованием библиотеки `image`. Основной алгоритм рассчитывает шаг сетки, привязывает неровные пиксели к границам и перестраивает картинку.",
					),
					p(
						"Color reduction is achieved via K-Means clustering, grouping similar shades together. If a palette is provided, pixels are mapped to the nearest color using Euclidean distance calculations.",
						"Сокращение цветов выполняется методом кластеризации K-Means, группируя похожие оттенки. При наличии палитры пиксели маппятся к ближайшим цветам через евклидово расстояние.",
					),
					p(
						"The codebase compiles to native binary targets for batch CLI processing and to WebAssembly using `wasm-pack` for instant browser previews.",
						"Кодовая база собирается в нативные бинарники для пакетной CLI-обработки и в WebAssembly через `wasm-pack` для мгновенного предпросмотра в браузере.",
					),
				],
				[
					p(
						"Rust-based grid alignment and pixel snapping",
						"Выравнивание сетки и привязка пикселей на Rust",
					),
					p(
						"K-Means color clustering and palette mapping",
						"Кластеризация цветов K-Means и маппинг палитр",
					),
					p(
						"WASM web compilation using wasm-pack",
						"Сборка в WASM для веба с помощью wasm-pack",
					),
				],
			),
			section("features", p("Feature deep dive", "Ключевые функции"), [
				p(
					"The CLI offers single file snapping, automatic optimal color count detection (up to 32 colors), and custom palette mapping parameters.",
					"CLI поддерживает обработку одного файла, автоопределение оптимального числа цветов (до 32) и принудительное применение палитры.",
				),
				p(
					"Batch processing runs directory-wide, handling common formats (PNG, JPG, BMP, WEBP, TIFF) and exporting them to target outputs.",
					"Пакетный режим обрабатывает целые папки с изображениями популярных форматов (PNG, JPG, BMP, WEBP, TIFF), сохраняя результаты в указанную директорию.",
				),
				p(
					"The web version loads the WASM module inside the Sprite Fusion site, allowing creators to drop AI art and snap it to grids in real time.",
					"Веб-версия загружает модуль WASM на сайте Sprite Fusion, давая разработчикам возможность перетаскивать AI-арт и выравнивать его в реальном времени.",
				),
			]),
			section(
				"tooling",
				p("Tooling and integrations", "Инструменты и интеграции"),
				[
					p(
						"Built in pure Rust with minimal dependencies, using Cargo for testing and package building. Web distribution is powered by wasm-pack and JS wrappers.",
						"Проект написан на чистом Rust с минимумом зависимостей, сборка и тесты идут через Cargo. Веб-интеграция решена через wasm-pack и JS-обертки.",
					),
					p(
						"Mathematical computations for Euclidean color distance and clustering are optimized to run in milliseconds even for large sprite files.",
						"Математические расчеты евклидова расстояния и кластеризации оптимизированы и занимают миллисекунды даже на больших спрайтах.",
					),
					p(
						"Custom histograms verify that dithering patterns are preserved quantitatively rather than being merged into flat blocks.",
						"Кастомные гистограммы подтверждают, что паттерны дизеринга сохраняются количественно, а не сливаются в плоские одноцветные блоки.",
					),
				],
			),
			section("outcome", p("Outcome and impact", "Результат и эффект"), [
				p(
					"AI-generated assets are transformed into clean, ready-to-use pixel art sprites that integrate perfectly into standard 2D game workflows.",
					"AI-ассеты превращаются в чистые спрайты, готовые к импорту в 2D-игры и тайлмапы без ручной отрисовки сетки.",
				),
				p(
					"The online snapper became a highly popular tool among game developers, allowing them to iterate on asset variations rapidly.",
					"Онлайн-инструмент стал очень популярен среди разработчиков игр, позволяя быстро генерировать и дорабатывать варианты графики.",
				),
				p(
					"Batch CLI processing cut asset cleanup time from hours of manual Photoshop redrawing to a few seconds of command-line execution.",
					"Пакетная CLI-обработка сократила время чистки графики с часов перерисовки в Photoshop до нескольких секунд работы консольной утилиты.",
				),
			]),
			section(
				"tradeoffs",
				p("Constraints and tradeoffs", "Ограничения и компромиссы"),
				[
					p(
						"Smooth gradients with thousands of shades are inevitably quantized into distinct bands, which is intended for pixel art but alters raw graphics.",
						"Плавные градиенты с тысячами оттенков неизбежно дробятся на полосы, что характерно для пиксель-арта, но меняет исходное изображение.",
					),
					p(
						"Sub-pixel placements or anti-aliased soft edges are snapped to rigid boundaries, which can occasionally alter the visual softness of character sprites.",
						"Субпиксельные сдвиги и сглаженные мягкие края прижимаются к границам ячеек, что иногда меняет визуальную мягкость персонажей.",
					),
					p(
						"WASM file compilation increases the initial asset size of the web tool, requiring lazy loading to preserve page speeds.",
						"Сборка WASM увеличивает размер загружаемых ресурсов веб-страницы, требуя отложенной загрузки для сохранения скорости.",
					),
				],
			),
		],
		faq: [
			{
				question: p("How is dithering preserved?", "Как сохраняется дизеринг?"),
				answer: p(
					"The snapper detects alternating pixel color grids, reserving adjacent clustered shades instead of flattening them into solid colors.",
					"Инструмент распознает чередующиеся сетки цветов пикселей, сохраняя близкие оттенки дизеринга вместо слияния в один тон.",
				),
			},
			{
				question: p(
					"Does it support custom palettes?",
					"Поддерживает ли он кастомные палитры?",
				),
				answer: p(
					"Yes, you can provide an image of your target palette, and the tool will map output pixels to the nearest matching colors.",
					"Да, вы можете передать файл с нужной палитрой, и утилита привяжет все цвета пикселей к ближайшим из вашего набора.",
				),
			},
			{
				question: p(
					"What is the optimal grid size?",
					"Какой размер сетки является оптимальным?",
				),
				answer: p(
					"The tool defaults to auto-detecting the cell sizes, but users can specify rigid sizes like 8x8, 16x16, or 32x32 pixels.",
					"По умолчанию шаг определяется автоматически, но пользователи могут явно задать размеры сетки, например, 8x8, 16x16 или 32x32 пикселя.",
				),
			},
		],
		seo: {
			title: p(
				"Pixel Snapper Case Study - Rust/WASM Image Grid Optimizer",
				"Кейс Pixel Snapper - Rust/WASM оптимизатор сетки изображений",
			),
			description: p(
				"Detailed case study of Sprite Fusion Pixel Snapper: a Rust and WebAssembly tool that snaps messy AI pixel art to rigid grids and quantizes colors.",
				"Подробный кейс Pixel Snapper: утилита на Rust и WASM для выравнивания AI-пиксель-арта по сетке, сжатия палитр и сохранения дизеринга.",
			),
			keywords: {
				en: [
					"pixel snapper case study",
					"rust webassembly image processing",
					"snap pixel art to grid",
					"k-means color quantization",
				],
				ru: [
					"кейс pixel snapper",
					"обработка картинок на rust webassembly",
					"выравнивание пикселей по сетке",
					"квантование цветов k-means",
				],
			},
			ogSubtitle: p(
				"Rust/WASM image grid snapping and palette clustering",
				"Выравнивание сетки изображений и кластеризация палитр на Rust/WASM",
			),
		},
	},
} satisfies Record<ProjectSlug, ProjectCaseStudyDraft>;

export const PROJECT_CASE_STUDIES: Record<ProjectSlug, ProjectCaseStudy> =
	Object.fromEntries(
		Object.entries(PROJECT_CASE_STUDIES_BASE).map(([slug, study]) => {
			const projectSlug = slug as ProjectSlug;
			const publishedAt = CASE_STUDY_PUBLISHED_AT_BY_SLUG[projectSlug];

			return [
				projectSlug,
				{
					...study,
					updatedAt: CASE_STUDY_UPDATED_AT_BY_SLUG[projectSlug],
					...(publishedAt ? { publishedAt } : {}),
				},
			];
		}),
	) as Record<ProjectSlug, ProjectCaseStudy>;

export function getProjectCaseStudy(slug: string): ProjectCaseStudy | null {
	if (!(slug in PROJECT_CASE_STUDIES)) {
		return null;
	}

	return PROJECT_CASE_STUDIES[slug as ProjectSlug];
}
