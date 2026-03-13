import {
	ArrowUpRight,
	BatteryCharging,
	BookOpenText,
	Cpu,
	Gauge,
	HardDrive,
	Languages,
	Layers,
	Library,
	Workflow,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import {
	ExternalLinks,
	FaqBlock,
	PageTopNav,
	type ProjectPageProps,
	pickSection,
	RelatedProjects,
	type SupportedLocale,
	text,
} from "./CaseStudyPrimitives";

const LABELS = {
	en: {
		hardwareTitle: "Hardware Envelope",
		pipelineTitle: "EPUB Processing Pipeline",
		pipelineDesc:
			"Container parsing, chapter loading, and rendering are isolated so each stage stays predictable on legacy hardware.",
		runtimeTitle: "Runtime Power Modes",
		mode: "Mode",
		frequency: "Frequency",
		usage: "Usage",
		modePerformance: "Performance",
		modeBalanced: "Balanced",
		modeSaving: "Saving",
		docsTitle: "Technical Deep Dives",
		docsDesc:
			"Architecture notes generated from repository code and implementation walkthroughs.",
		optimizationTitle: "Optimization Stack",
		contextTitle: "Project Context",
		architectureTitle: "Architecture",
		toolingTitle: "Implementation Notes",
		featuresTitle: "Core Reader Capabilities",
		outcomeTitle: "Outcome",
		tradeoffsTitle: "Tradeoffs",
		metricsTitle: "Key Runtime Metrics",
		display: "Display",
		memory: "Memory",
		target: "Target device",
		layoutMetric: "Incremental layout budget",
		cacheMetric: "Text cache",
		progressMetric: "Progress restore anchor",
		guardMetric: "Memory guard",
		layoutMetricDetail: "500 words/frame, burst to 1000",
		cacheMetricDetail: "120 textures + 1000 metrics",
		progressMetricDetail: "Word-index anchors in config.bin",
		guardMetricDetail: "2MB cover cap + PSP-safe textures",
	},
	ru: {
		hardwareTitle: "Аппаратные рамки",
		pipelineTitle: "EPUB-пайплайн обработки",
		pipelineDesc:
			"Парсинг контейнера, загрузка глав и рендер отделены друг от друга, чтобы каждый этап оставался предсказуемым на старом железе.",
		runtimeTitle: "Режимы энергопотребления",
		mode: "Режим",
		frequency: "Частоты",
		usage: "Сценарий",
		modePerformance: "Performance",
		modeBalanced: "Balanced",
		modeSaving: "Saving",
		docsTitle: "Технические deep dive",
		docsDesc:
			"Архитектурные заметки, собранные по коду репозитория и подробным walkthrough-материалам.",
		optimizationTitle: "Стек оптимизаций",
		contextTitle: "Контекст проекта",
		architectureTitle: "Архитектура",
		toolingTitle: "Заметки по реализации",
		featuresTitle: "Ключевые возможности ридера",
		outcomeTitle: "Результат",
		tradeoffsTitle: "Компромиссы",
		metricsTitle: "Ключевые runtime-метрики",
		display: "Экран",
		memory: "Память",
		target: "Целевое устройство",
		layoutMetric: "Инкрементальный budget layout",
		cacheMetric: "Текстовый кэш",
		progressMetric: "Якорь восстановления прогресса",
		guardMetric: "Memory guard",
		layoutMetricDetail: "500 слов/кадр, буст до 1000",
		cacheMetricDetail: "120 текстур + 1000 метрик",
		progressMetricDetail: "Якоря по word index в config.bin",
		guardMetricDetail: "Лимит 2MB для обложек + PSP-safe текстуры",
	},
} as const;

const ZREAD_DOCS = [
	{
		slug: "1-overview",
		en: "Overview",
		ru: "Обзор",
	},
	{
		slug: "6-application-state-machine-and-main-loop",
		en: "State machine and main loop",
		ru: "State machine и основной цикл",
	},
	{
		slug: "7-epub-file-format-and-parsing",
		en: "EPUB format and parsing",
		ru: "Формат EPUB и парсинг",
	},
	{
		slug: "9-dynamic-power-management-and-frequency-scaling",
		en: "Dynamic power management",
		ru: "Динамический энергоменеджмент",
	},
	{
		slug: "10-incremental-layout-engine-with-frame-budgeting",
		en: "Incremental layout engine",
		ru: "Инкрементальный layout-движок",
	},
	{
		slug: "11-lru-texture-caching-system",
		en: "LRU texture caching",
		ru: "LRU-кэширование текстур",
	},
];

function SectionText({
	title,
	paragraphs,
	locale,
	icon,
}: {
	title: string;
	paragraphs: ProjectPageProps["caseStudy"]["sections"][number]["paragraphs"];
	locale: SupportedLocale;
	icon: React.ReactNode;
}) {
	return (
		<article className="rounded-3xl border border-primary/15 bg-background/75 p-6 shadow-sm backdrop-blur-sm">
			<h2
				className="mb-4 flex items-center gap-2 font-extrabold text-2xl md:text-3xl"
				style={{
					fontFamily: "Heading Now Variable",
					fontVariationSettings: `'wght' 840, 'wdth' 860`,
				}}
			>
				<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
					{icon}
				</span>
				{title}
			</h2>
			<div className="space-y-3">
				{paragraphs.map((paragraph) => (
					<p
						key={`${title}-${paragraph.en}`}
						className="text-foreground/90 leading-relaxed"
					>
						{text(paragraph, locale)}
					</p>
				))}
			</div>
		</article>
	);
}

export function PspBookReaderPage({
	locale,
	project,
	caseStudy,
	relatedProjects,
}: ProjectPageProps) {
	const labels = LABELS[locale];
	const context = pickSection(caseStudy, "context");
	const architecture = pickSection(caseStudy, "architecture");
	const tooling = pickSection(caseStudy, "tooling");
	const features = pickSection(caseStudy, "features");
	const outcome = pickSection(caseStudy, "outcome");
	const tradeoffs = pickSection(caseStudy, "tradeoffs");

	const runtimeModes = [
		{
			mode: labels.modePerformance,
			frequency: "333 / 166 MHz",
			usage:
				locale === "ru"
					? "Скан библиотеки и тяжелые операции"
					: "Library scanning and intensive tasks",
		},
		{
			mode: labels.modeBalanced,
			frequency: "222 / 111 MHz",
			usage:
				locale === "ru"
					? "Основной UI и навигация"
					: "Primary UI and navigation",
		},
		{
			mode: labels.modeSaving,
			frequency: "66 / 33 MHz",
			usage:
				locale === "ru"
					? "Idle > 2с и чтение без активности"
					: "Idle > 2s and passive reading",
		},
	];

	const pipelineSteps = [
		locale === "ru"
			? "ZIP container extraction (miniz)"
			: "ZIP container extraction (miniz)",
		locale === "ru"
			? "container.xml -> OPF metadata/spine"
			: "container.xml -> OPF metadata/spine",
		locale === "ru"
			? "NCX navigation mapping + chapter titles"
			: "NCX navigation mapping + chapter titles",
		locale === "ru"
			? "On-demand chapter load + XHTML tokenization"
			: "On-demand chapter load + XHTML tokenization",
		locale === "ru"
			? "CJK-aware line breaking + incremental layout"
			: "CJK-aware line breaking + incremental layout",
		locale === "ru"
			? "Cached glyph rendering + progress persistence"
			: "Cached glyph rendering + progress persistence",
	];

	return (
		<main className="relative overflow-hidden py-14 md:py-20">
			<div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_0%,rgba(16,185,129,0.18),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.14),transparent_48%)]" />
			<div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:26px_26px]" />

			<div className="container mx-auto max-w-6xl px-4">
				<PageTopNav locale={locale} />

				<section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-background/80 p-6 shadow-sm backdrop-blur-sm md:p-10">
					<div className="pointer-events-none absolute -top-20 -right-20 h-52 w-52 rounded-full bg-emerald-400/15 blur-3xl" />
					<div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-sky-500/15 blur-3xl" />
					<div className="relative">
						<div className="mb-4 flex flex-wrap items-center gap-2">
							<Badge className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-200">
								{text(caseStudy.hero.badge, locale)}
							</Badge>
							<Badge
								variant="outline"
								className="rounded-full border-primary/20 px-3 py-1 text-xs uppercase tracking-wide"
							>
								C++ · SDL2 · PSPSDK
							</Badge>
						</div>
						<h1
							className="font-extrabold text-4xl uppercase tracking-tight md:text-6xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 980, 'wdth' 820`,
							}}
						>
							{project.title}
						</h1>
						<p className="mt-4 max-w-3xl text-lg text-muted-foreground leading-relaxed md:text-xl">
							{text(caseStudy.hero.summary, locale)}
						</p>
					</div>
				</section>

				<div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
					<div className="lg:col-span-3">
						<SectionText
							title={labels.contextTitle}
							paragraphs={context.paragraphs}
							locale={locale}
							icon={<BookOpenText className="h-4 w-4" />}
						/>
					</div>
					<aside className="rounded-3xl border border-primary/15 bg-background/75 p-6 shadow-sm backdrop-blur-sm lg:col-span-2">
						<h2
							className="mb-4 font-extrabold text-2xl md:text-3xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 840, 'wdth' 860`,
							}}
						>
							{labels.hardwareTitle}
						</h2>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
							<div className="rounded-2xl border border-primary/10 bg-primary/5 p-3">
								<p className="text-muted-foreground text-xs uppercase tracking-wide">
									{labels.display}
								</p>
								<p className="mt-1 font-semibold text-lg">480 x 272</p>
							</div>
							<div className="rounded-2xl border border-primary/10 bg-primary/5 p-3">
								<p className="text-muted-foreground text-xs uppercase tracking-wide">
									{labels.memory}
								</p>
								<p className="mt-1 font-semibold text-lg">32MB RAM</p>
							</div>
							<div className="rounded-2xl border border-primary/10 bg-primary/5 p-3">
								<p className="text-muted-foreground text-xs uppercase tracking-wide">
									{labels.target}
								</p>
								<p className="mt-1 font-semibold text-lg">PSP-1000</p>
							</div>
						</div>
					</aside>
				</div>

				<div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
					<section className="rounded-3xl border border-primary/15 bg-background/75 p-6 shadow-sm backdrop-blur-sm lg:col-span-3">
						<h2
							className="mb-2 flex items-center gap-2 font-extrabold text-2xl md:text-3xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 840, 'wdth' 860`,
							}}
						>
							<Workflow className="h-5 w-5 text-primary" />
							{labels.pipelineTitle}
						</h2>
						<p className="mb-4 text-muted-foreground">{labels.pipelineDesc}</p>
						<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
							{pipelineSteps.map((step, index) => (
								<div
									key={step}
									className="rounded-2xl border border-primary/10 bg-primary/[0.03] p-3"
								>
									<p className="font-mono text-muted-foreground text-xs">
										0{index + 1}
									</p>
									<p className="mt-1 text-sm leading-relaxed">{step}</p>
								</div>
							))}
						</div>
					</section>
					<section className="rounded-3xl border border-primary/15 bg-background/75 p-6 shadow-sm backdrop-blur-sm lg:col-span-2">
						<h2
							className="mb-4 flex items-center gap-2 font-extrabold text-2xl md:text-3xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 840, 'wdth' 860`,
							}}
						>
							<BatteryCharging className="h-5 w-5 text-primary" />
							{labels.runtimeTitle}
						</h2>
						<div className="space-y-3">
							{runtimeModes.map((item) => (
								<div
									key={item.mode}
									className="rounded-2xl border border-primary/10 bg-primary/[0.03] p-3"
								>
									<div className="mb-1 flex items-center justify-between gap-2">
										<p className="font-semibold text-sm">{item.mode}</p>
										<p className="font-mono text-muted-foreground text-xs">
											{item.frequency}
										</p>
									</div>
									<p className="text-muted-foreground text-sm">{item.usage}</p>
								</div>
							))}
						</div>
						<div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl border border-primary/10 p-2 text-center text-xs">
							<div>
								<p className="text-muted-foreground">{labels.mode}</p>
							</div>
							<div>
								<p className="text-muted-foreground">{labels.frequency}</p>
							</div>
							<div>
								<p className="text-muted-foreground">{labels.usage}</p>
							</div>
						</div>
					</section>
				</div>

				<div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
					<SectionText
						title={labels.architectureTitle}
						paragraphs={architecture.paragraphs}
						locale={locale}
						icon={<Layers className="h-4 w-4" />}
					/>
					<SectionText
						title={labels.toolingTitle}
						paragraphs={tooling.paragraphs}
						locale={locale}
						icon={<Cpu className="h-4 w-4" />}
					/>
				</div>

				<div className="mt-6 rounded-3xl border border-primary/15 bg-background/75 p-6 shadow-sm backdrop-blur-sm">
					<h2
						className="mb-4 flex items-center gap-2 font-extrabold text-2xl md:text-3xl"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 840, 'wdth' 860`,
						}}
					>
						<Gauge className="h-5 w-5 text-primary" />
						{labels.metricsTitle}
					</h2>
					<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
						<div className="rounded-2xl border border-primary/10 bg-primary/[0.03] p-4">
							<p className="font-medium text-sm">{labels.layoutMetric}</p>
							<p className="mt-1 font-semibold text-base">
								{labels.layoutMetricDetail}
							</p>
						</div>
						<div className="rounded-2xl border border-primary/10 bg-primary/[0.03] p-4">
							<p className="font-medium text-sm">{labels.cacheMetric}</p>
							<p className="mt-1 font-semibold text-base">
								{labels.cacheMetricDetail}
							</p>
						</div>
						<div className="rounded-2xl border border-primary/10 bg-primary/[0.03] p-4">
							<p className="font-medium text-sm">{labels.progressMetric}</p>
							<p className="mt-1 font-semibold text-base">
								{labels.progressMetricDetail}
							</p>
						</div>
						<div className="rounded-2xl border border-primary/10 bg-primary/[0.03] p-4">
							<p className="font-medium text-sm">{labels.guardMetric}</p>
							<p className="mt-1 font-semibold text-base">
								{labels.guardMetricDetail}
							</p>
						</div>
					</div>
				</div>

				<div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
					<article className="rounded-3xl border border-primary/15 bg-background/75 p-6 shadow-sm backdrop-blur-sm lg:col-span-2">
						<h2
							className="mb-4 flex items-center gap-2 font-extrabold text-2xl md:text-3xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 840, 'wdth' 860`,
							}}
						>
							<Library className="h-5 w-5 text-primary" />
							{labels.featuresTitle}
						</h2>
						<div className="space-y-3">
							{features.paragraphs.map((paragraph) => (
								<p
									key={paragraph.en}
									className="text-foreground/90 leading-relaxed"
								>
									{text(paragraph, locale)}
								</p>
							))}
						</div>
					</article>
					<section className="rounded-3xl border border-primary/15 bg-background/75 p-6 shadow-sm backdrop-blur-sm">
						<h2
							className="mb-4 flex items-center gap-2 font-extrabold text-2xl md:text-3xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 840, 'wdth' 860`,
							}}
						>
							<HardDrive className="h-5 w-5 text-primary" />
							{labels.optimizationTitle}
						</h2>
						<ul className="space-y-2">
							<li className="rounded-xl border border-primary/10 bg-primary/[0.03] px-3 py-2 text-sm">
								{locale === "ru"
									? "Инкрементальная пагинация вместо блокирующего full-layout"
									: "Incremental pagination instead of blocking full-chapter layout"}
							</li>
							<li className="rounded-xl border border-primary/10 bg-primary/[0.03] px-3 py-2 text-sm">
								{locale === "ru"
									? "Стабильная эвикция LRU без memory spikes"
									: "Stable LRU eviction without memory spikes"}
							</li>
							<li className="rounded-xl border border-primary/10 bg-primary/[0.03] px-3 py-2 text-sm">
								{locale === "ru"
									? "Частотные профили CPU/ME под активность пользователя"
									: "CPU/ME frequency profiles tied to user activity"}
							</li>
							<li className="rounded-xl border border-primary/10 bg-primary/[0.03] px-3 py-2 text-sm">
								{locale === "ru"
									? "CJK line-break эвристика без тяжелого script engine"
									: "CJK line-break heuristic without a heavy script engine"}
							</li>
						</ul>
					</section>
				</div>

				<div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
					<SectionText
						title={labels.outcomeTitle}
						paragraphs={outcome.paragraphs}
						locale={locale}
						icon={<Languages className="h-4 w-4" />}
					/>
					<SectionText
						title={labels.tradeoffsTitle}
						paragraphs={tradeoffs.paragraphs}
						locale={locale}
						icon={<Cpu className="h-4 w-4" />}
					/>
				</div>

				<section className="mt-6 rounded-3xl border border-primary/15 bg-background/75 p-6 shadow-sm backdrop-blur-sm">
					<h2
						className="mb-2 font-extrabold text-2xl md:text-3xl"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 840, 'wdth' 860`,
						}}
					>
						{labels.docsTitle}
					</h2>
					<p className="mb-4 text-muted-foreground">{labels.docsDesc}</p>
					<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
						{ZREAD_DOCS.map((doc) => (
							<Link
								key={doc.slug}
								href={`https://zread.ai/sabraman/psp-book-reader/${doc.slug}`}
								target="_blank"
								rel="noreferrer"
								className="group rounded-2xl border border-primary/10 bg-primary/[0.03] px-4 py-3 transition-colors hover:border-primary/30"
							>
								<div className="flex items-center justify-between gap-2">
									<p className="text-sm leading-relaxed">
										{locale === "ru" ? doc.ru : doc.en}
									</p>
									<ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
								</div>
							</Link>
						))}
					</div>
				</section>

				<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
					<FaqBlock caseStudy={caseStudy} locale={locale} />
					<ExternalLinks project={project} locale={locale} />
				</div>

				<div className="mt-6">
					<RelatedProjects relatedProjects={relatedProjects} locale={locale} />
				</div>
			</div>
		</main>
	);
}
