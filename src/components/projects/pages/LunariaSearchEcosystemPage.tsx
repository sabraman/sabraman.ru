import {
	Bot,
	FileText,
	Network,
	TrendingUp,
	Users,
	ArrowUpRight,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { BLOG_POSTS } from "~/data/blog";
import Link from "next/link";
import {
	ExternalLinks,
	FaqBlock,
	PageTopNav,
	RelatedProjects,
	type ProjectPageProps,
	pickSection,
	type SupportedLocale,
	text,
	AuthorCard,
} from "./CaseStudyPrimitives";

const LABELS = {
	en: {
		contextTitle: "Project Context",
		architectureTitle: "Architecture & Monorepo",
		featuresTitle: "Editorial Factory",
		toolingTitle: "Tooling & Integrations",
		outcomeTitle: "Outcome & Value",
		tradeoffsTitle: "Constraints & Tradeoffs",
		satellitesTitle: "Satellite Platforms",
		satellitesDesc:
			"Different target audiences isolated into dedicated domains.",
		packagesTitle: "Shared Monorepo Packages",
		packagesDesc: "Code reuse and visual stability across the ecosystem.",
		pipelineTitle: "n8n + Gemini Content Factory",
		pipelineDesc:
			"How automated research maps to localized editorial articles.",
		step1Title: "Competitor Analysis",
		step1Desc: "n8n monitors search queries and identifies content gaps.",
		step2Title: "AI Research Drafts",
		step2Desc: "Gemini API outlines and drafts content in natural language.",
		step3Title: "Editorial Polishing",
		step3Desc: "Three editors curate and inject localized Kazan context.",
		step4Title: "Static MDX Sync",
		step4Desc: "Automated RSS/Sitemap generation for search indexers.",
		techStackTitle: "Tech Stack & Tooling",
		coreWeb: "Core Web",
		automationAi: "Automation & AI",
		seoCrawling: "SEO & Crawling",
		viewCase: "View Case Study",
	},
	ru: {
		contextTitle: "Контекст проекта",
		architectureTitle: "Архитектура и монорепозиторий",
		featuresTitle: "Контентный конвейер",
		toolingTitle: "Инструменты и интеграции",
		outcomeTitle: "Результат и эффект",
		tradeoffsTitle: "Ограничения и компромиссы",
		satellitesTitle: "Платформы-сателлиты",
		satellitesDesc:
			"Каждая целевая аудитория изолирована на собственном домене.",
		packagesTitle: "Общие пакеты монорепозитория",
		packagesDesc:
			"Повторное использование кода и визуальное единство всех сайтов.",
		pipelineTitle: "Конвейер n8n + Gemini",
		pipelineDesc:
			"Как автоматические исследования превращаются в локализованные статьи.",
		step1Title: "Анализ конкурентов",
		step1Desc: "n8n отслеживает поисковые запросы и находит пробелы.",
		step2Title: "Черновики от AI",
		step2Desc: "Gemini API собирает фактуру и пишет черновик живым языком.",
		step3Title: "Редакторский фильтр",
		step3Desc: "Три редактора дорабатывают текст и добавляют контекст Казани.",
		step4Title: "MDX Публикация",
		step4Desc: "Кастомные RSS-ленты и Sitemap для моментальной индексации.",
		techStackTitle: "Технологический стек",
		coreWeb: "Веб-платформа",
		automationAi: "AI и Автоматизация",
		seoCrawling: "SEO и Индексация",
		viewCase: "Открыть кейс",
	},
} as const;

function SectionText({
	title,
	paragraphs,
	locale,
}: {
	title: string;
	paragraphs: ProjectPageProps["caseStudy"]["sections"][number]["paragraphs"];
	locale: SupportedLocale;
}) {
	return (
		<article className="py-4">
			<h2
				className="mb-4 font-extrabold text-2xl md:text-3xl"
				style={{
					fontFamily: "Heading Now Variable",
					fontVariationSettings: `'wght' 840, 'wdth' 860`,
				}}
			>
				{title}
			</h2>
			<div className="space-y-4">
				{paragraphs.map((paragraph) => (
					<p
						key={`${title}-${paragraph.en}`}
						className="text-foreground/90 text-base leading-relaxed"
					>
						{text(paragraph, locale)}
					</p>
				))}
			</div>
		</article>
	);
}

export function LunariaSearchEcosystemPage({
	locale,
	project,
	caseStudy,
	relatedProjects,
}: ProjectPageProps) {
	const labels = LABELS[locale];
	const context = pickSection(caseStudy, "context");
	const architecture = pickSection(caseStudy, "architecture");
	const features = pickSection(caseStudy, "features");
	const tooling = pickSection(caseStudy, "tooling");
	const outcome = pickSection(caseStudy, "outcome");
	const tradeoffs = pickSection(caseStudy, "tradeoffs");

	const satellites = [
		{
			title: locale === "ru" ? "Розничный магазин" : "Main Retail Store",
			tag: "Retail / E-comm",
			desc:
				locale === "ru"
					? "Визуальный каталог, букеты, доставка цветов"
					: "Visual catalog, bouquets, local flower delivery",
		},
		{
			title: locale === "ru" ? "Портал франшизы" : "Franchise Portal",
			tag: "B2B Expansion",
			desc:
				locale === "ru"
					? "Бизнес-модель, условия открытия, окупаемость"
					: "Business model, conditions, payback metrics",
		},
		{
			title: locale === "ru" ? "Свадебное медиа" : "Wedding Media",
			tag: "Editorial",
			desc:
				locale === "ru"
					? "Тренды свадебной флористики, советы невестам"
					: "Wedding floristry trends, guides for brides",
		},
		{
			title: locale === "ru" ? "Сателлит площадок" : "Venues Satellite",
			tag: "Local SEO",
			desc:
				locale === "ru"
					? "База залов, ресторанов и локаций для ивентов"
					: "Directory of halls, restaurants and event sites",
		},
		{
			title: locale === "ru" ? "B2B портал" : "Corporate Portal",
			tag: "Corporate",
			desc:
				locale === "ru"
					? "Оформление офисов, отелей, договоры"
					: "Office decoration, hotels, contract conditions",
		},
	];

	const packages = [
		{
			name: "@lunaria/brand",
			desc:
				locale === "ru"
					? "Шрифты, логотипы, дизайн-токены бренда"
					: "Fonts, logos, brand design tokens",
		},
		{
			name: "@lunaria/ui",
			desc:
				locale === "ru"
					? "Модульные UI компоненты, сетка, формы"
					: "Modular UI components, grids, forms",
		},
		{
			name: "@lunaria/content",
			desc:
				locale === "ru"
					? "MDX парсинг, sitemaps, RSS генератор"
					: "MDX parsing, sitemaps, RSS generator",
		},
	];

	const pipelineSteps = [
		{
			num: "01",
			icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
			title: labels.step1Title,
			desc: labels.step1Desc,
		},
		{
			num: "02",
			icon: <Bot className="h-5 w-5 text-accent" />,
			title: labels.step2Title,
			desc: labels.step2Desc,
		},
		{
			num: "03",
			icon: <Users className="h-5 w-5 text-amber-500" />,
			title: labels.step3Title,
			desc: labels.step3Desc,
		},
		{
			num: "04",
			icon: <FileText className="h-5 w-5 text-sky-500" />,
			title: labels.step4Title,
			desc: labels.step4Desc,
		},
	];

	return (
		<main className="relative overflow-hidden py-14 md:py-20">
			<div className="container mx-auto max-w-2xl px-4">
				<PageTopNav locale={locale} />

				{/* Case Study Header Card */}
				<section className="relative py-4">
					<div className="pointer-events-none absolute -top-20 -right-20 h-52 w-52 rounded-full bg-emerald-500/15 blur-3xl" />
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
								Next.js · monorepo · n8n · Gemini
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

				{/* Layout Section 1: Context & Satellites */}
				<div className="mt-8 space-y-6">
					<SectionText
						title={labels.contextTitle}
						paragraphs={context.paragraphs}
						locale={locale}
					/>
					<aside className="flex flex-col py-4">
						<h3
							className="mb-2 font-extrabold text-2xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 840, 'wdth' 860`,
							}}
						>
							{labels.satellitesTitle}
						</h3>
						<p className="mb-4 text-muted-foreground text-sm">
							{labels.satellitesDesc}
						</p>
						<div className="mt-auto space-y-3">
							{satellites.map((sat) => (
								<div
									key={sat.title}
									className="border-b border-primary/10 pb-3 last:border-b-0 text-sm"
								>
									<div className="flex items-center justify-between">
										<span className="font-semibold text-foreground">
											{sat.title}
										</span>
										<Badge
											variant="outline"
											className="rounded-full text-[10px]"
										>
											{sat.tag}
										</Badge>
									</div>
									<p className="mt-1 text-muted-foreground text-xs">
										{sat.desc}
									</p>
								</div>
							))}
						</div>
					</aside>
				</div>

				{/* Layout Section 2: Architecture & Packages */}
				<div className="mt-6 space-y-6">
					<SectionText
						title={labels.architectureTitle}
						paragraphs={architecture.paragraphs}
						locale={locale}
					/>
					<aside className="flex flex-col py-4">
						<h3
							className="mb-2 font-extrabold text-2xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 840, 'wdth' 860`,
							}}
						>
							{labels.packagesTitle}
						</h3>
						<p className="mb-4 text-muted-foreground text-sm">
							{labels.packagesDesc}
						</p>
						<div className="mt-auto space-y-3">
							{packages.map((pkg) => (
								<div
									key={pkg.name}
									className="border-b border-primary/10 pb-3 last:border-b-0 text-sm"
								>
									<div className="flex items-center gap-2">
										<Network className="h-4 w-4 shrink-0 text-emerald-500" />
										<code className="font-mono font-semibold text-xs text-primary">
											{pkg.name}
										</code>
									</div>
									<p className="mt-1 pl-6 text-muted-foreground text-xs">
										{pkg.desc}
									</p>
								</div>
							))}
						</div>
					</aside>
				</div>

				{/* Layout Section 3: Feature & Editorial Factory (n8n + Gemini) Flow */}
				<section className="mt-6 py-4">
					<h2
						className="mb-2 font-extrabold text-2xl md:text-3xl"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 840, 'wdth' 860`,
						}}
					>
						{labels.featuresTitle}
					</h2>
					<div className="space-y-4">
						{features.paragraphs.map((p) => (
							<p
								key={p.en}
								className="text-foreground/90 text-base leading-relaxed"
							>
								{text(p, locale)}
							</p>
						))}
					</div>

					<div className="mt-6 grid grid-cols-1 gap-4">
						{pipelineSteps.map((step) => (
							<div
								key={step.num}
								className="relative overflow-hidden border-b border-primary/10 pb-4 last:border-b-0"
							>
								<div className="absolute top-2 right-3 font-mono font-bold text-lg text-primary/15">
									{step.num}
								</div>
								<div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-background/60 shadow-sm">
									{step.icon}
								</div>
								<h4 className="font-semibold text-sm text-foreground">
									{step.title}
								</h4>
								<p className="mt-1 text-muted-foreground text-xs leading-relaxed">
									{step.desc}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* Layout Section 4: Tooling & Tech Stack Grid */}
				<div className="mt-6 space-y-6">
					<SectionText
						title={labels.toolingTitle}
						paragraphs={tooling.paragraphs}
						locale={locale}
					/>
					<aside className="flex flex-col justify-between py-4">
						<h3
							className="mb-4 font-extrabold text-2xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 840, 'wdth' 860`,
							}}
						>
							{labels.techStackTitle}
						</h3>

						<div className="space-y-4">
							<div className="space-y-1.5">
								<span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
									{labels.coreWeb}
								</span>
								<div className="flex flex-wrap gap-1.5">
									<Badge variant="secondary">Next.js 15</Badge>
									<Badge variant="secondary">React 19</Badge>
									<Badge variant="secondary">TailwindCSS</Badge>
									<Badge variant="secondary">TypeScript</Badge>
								</div>
							</div>
							<div className="space-y-1.5">
								<span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
									{labels.automationAi}
								</span>
								<div className="flex flex-wrap gap-1.5">
									<Badge variant="secondary">n8n Automation</Badge>
									<Badge variant="secondary">Gemini API</Badge>
									<Badge variant="secondary">JSON Schema</Badge>
								</div>
							</div>
							<div className="space-y-1.5">
								<span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
									{labels.seoCrawling}
								</span>
								<div className="flex flex-wrap gap-1.5">
									<Badge variant="secondary">MDX Content</Badge>
									<Badge variant="secondary">Semantic Sitemap</Badge>
									<Badge variant="secondary">Custom RSS Feed</Badge>
								</div>
							</div>
						</div>
					</aside>
				</div>

				{/* Layout Section 5: Outcome & Tradeoffs */}
				<div className="mt-6 space-y-6">
					<article className="flex flex-col justify-between border-b border-primary/10 pb-6 last:border-b-0">
						<div>
							<h3
								className="mb-4 font-extrabold text-2xl md:text-3xl text-emerald-500"
								style={{
									fontFamily: "Heading Now Variable",
									fontVariationSettings: `'wght' 840, 'wdth' 860`,
								}}
							>
								{labels.outcomeTitle}
							</h3>
							<div className="space-y-3 text-muted-foreground">
								{outcome.paragraphs.map((p) => (
									<p
										key={p.en}
										className="text-foreground/90 text-sm leading-relaxed"
									>
										{text(p, locale)}
									</p>
								))}
							</div>
						</div>
						<div className="mt-6 grid grid-cols-2 gap-3 border-emerald-500/10 border-t pt-4">
							<div>
								<div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
									Brand Moat
								</div>
								<div className="mt-0.5 text-base font-bold text-emerald-400">
									Zero Continuous Ad Spend
								</div>
							</div>
							<div>
								<div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
									Local Reach
								</div>
								<div className="mt-0.5 text-base font-bold text-emerald-400">
									Multi-intent Capture
								</div>
							</div>
						</div>
					</article>

					<article className="flex flex-col justify-between border-b border-primary/10 pb-6 last:border-b-0">
						<div>
							<h3
								className="mb-4 font-extrabold text-2xl md:text-3xl text-amber-500"
								style={{
									fontFamily: "Heading Now Variable",
									fontVariationSettings: `'wght' 840, 'wdth' 860`,
								}}
							>
								{labels.tradeoffsTitle}
							</h3>
							<div className="space-y-3 text-muted-foreground">
								{tradeoffs.paragraphs.map((p) => (
									<p
										key={p.en}
										className="text-foreground/90 text-sm leading-relaxed"
									>
										{text(p, locale)}
									</p>
								))}
							</div>
						</div>
						<div className="mt-6 grid grid-cols-2 gap-3 border-amber-500/10 border-t pt-4">
							<div>
								<div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
									Complexity
								</div>
								<div className="mt-0.5 text-sm font-semibold text-amber-500">
									Multi-domain Satellites
								</div>
							</div>
							<div>
								<div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
									Training
								</div>
								<div className="mt-0.5 text-sm font-semibold text-amber-500">
									Continuous Editor Curation
								</div>
							</div>
						</div>
					</article>
				</div>

				{/* Related Blog Articles */}
				<RelatedArticles locale={locale} />

				{/* Bottom section: FAQ, Links & Related projects */}
				<div className="mt-12 space-y-6 lg:mt-16">
					<FaqBlock caseStudy={caseStudy} locale={locale} />
					<ExternalLinks project={project} locale={locale} />
					<RelatedProjects relatedProjects={relatedProjects} locale={locale} />
				</div>

				{/* Author Card E-E-A-T parameter */}
				<AuthorCard locale={locale} />
			</div>
		</main>
	);
}

function RelatedArticles({ locale }: { locale: SupportedLocale }) {
	const articles = BLOG_POSTS.filter((post) =>
		[
			"why-one-site-is-not-enough",
			"seo-2026-ai-search",
			"how-i-built-search-ecosystem",
		].includes(post.slug),
	);

	const title =
		locale === "ru" ? "Материалы по теме (Блог)" : "Related Articles (Blog)";
	const readLabel = locale === "ru" ? "Читать статью" : "Read article";

	return (
		<section className="mt-8 py-4">
			<h2 className="mb-4 font-bold text-2xl text-foreground">{title}</h2>
			<div className="grid grid-cols-1 gap-4">
				{articles.map((post) => (
					<Link
						key={post.slug}
						href={`/${locale}/blog/${post.slug}`}
						className="group flex flex-col justify-between border-b border-primary/10 pb-4 last:border-b-0 transition-colors hover:text-accent"
					>
						<div>
							<Badge className="mb-2 bg-accent/10 text-accent border border-accent/20 text-[10px] rounded-full animate-pulse-slow">
								{post.category}
							</Badge>
							<p className="font-semibold text-sm text-foreground group-hover:text-accent transition-colors leading-snug">
								{post.title[locale]}
							</p>
							<p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
								{post.summary[locale]}
							</p>
						</div>
						<span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-accent group-hover:text-accent/90">
							{readLabel}
							<ArrowUpRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</span>
					</Link>
				))}
			</div>
		</section>
	);
}
