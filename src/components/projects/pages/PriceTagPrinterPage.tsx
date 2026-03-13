import {
	BarChart3,
	BookOpenText,
	Database,
	Layers,
	LayoutTemplate,
	MonitorSmartphone,
	Paintbrush,
	Printer,
	Settings2,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import {
	ExternalLinks,
	FaqBlock,
	MetaBar,
	PageTopNav,
	ProjectHero,
	type ProjectPageProps,
	pickSection,
	RelatedProjects,
	type SupportedLocale,
} from "./CaseStudyPrimitives";

const LABELS = {
	en: {
		architectureTitle: "API-First Architecture",
		architectureDesc:
			"A Next.js 15 App Router foundation cleanly separates UI rendering from state management and backend PDF generation workflows.",
		themeTitle: "Unified Theme Engine",
		themeDesc:
			"17 pre-configured palettes covering light, dark, and monochrome setups, ensuring perfect contrast across any retail environment.",
		dataTitle: "Data Processing Pipeline",
		dataDesc:
			"Direct parsing from XLSX and Google Sheets APIs with robust Zod validation to ensure stable formatting before print.",
		pdfTitle: "Headless PDF Rendering",
		pdfDesc:
			"Leveraging Puppeteer on the backend to bypass browser print quirks, delivering pixel-perfect retail tags every time.",
		techStackTitle: "Tech Stack & Tooling",
		frontend: "Frontend & State",
		backend: "Backend & Generation",
		tools: "Dev Tools",
	},
	ru: {
		architectureTitle: "API-First Архитектура",
		architectureDesc:
			"База на Next.js 15 App Router четко разделяет UI-рендеринг, управление состоянием и серверные процессы генерации PDF.",
		themeTitle: "Единый движок тем",
		themeDesc:
			"17 преднастроенных палитр (светлые, темные, монохром), гарантирующих идеальный контраст в любой среде ритейла.",
		dataTitle: "Пайплайн обработки данных",
		dataDesc:
			"Прямой парсинг XLSX и Google Sheets API со строгой Zod-валидацией для стабильного форматирования перед печатью.",
		pdfTitle: "Headless генерация PDF",
		pdfDesc:
			"Использование Puppeteer на бэкенде для обхода багов браузерной печати и создания пиксель-перфект ценников.",
		techStackTitle: "Технологии и инструменты",
		frontend: "Frontend и Состояние",
		backend: "Backend и Выгрузка",
		tools: "Dev Инструменты",
	},
} as const;

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
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-3">
				<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100/50 text-zinc-900 ring-1 ring-zinc-200/50 dark:bg-zinc-800/50 dark:text-zinc-100 dark:ring-zinc-700/50">
					{icon}
				</div>
				<h3 className="font-medium text-xl text-zinc-900 tracking-tight dark:text-zinc-100">
					{title}
				</h3>
			</div>
			<div className="space-y-4 text-base/relaxed text-zinc-600 dark:text-zinc-400">
				{paragraphs.map((p, i) => (
					/* biome-ignore lint/suspicious/noArrayIndexKey: paragraphs are static */
					<p key={i}>{p[locale]}</p>
				))}
			</div>
		</div>
	);
}

export function PriceTagPrinterPage({
	locale,
	project,
	caseStudy,
	relatedProjects,
}: ProjectPageProps) {
	const t = LABELS[locale];
	const contextSection = pickSection(caseStudy, "context");
	const architectureSection = pickSection(caseStudy, "architecture");
	const featuresSection = pickSection(caseStudy, "features");
	const toolingSection = pickSection(caseStudy, "tooling");
	const outcomeSection = pickSection(caseStudy, "outcome");
	const tradeoffsSection = pickSection(caseStudy, "tradeoffs");

	return (
		<main className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
			<PageTopNav locale={locale} />

			<ProjectHero
				project={project}
				caseStudy={caseStudy}
				locale={locale}
				accentClassName="bg-emerald-500/20"
			/>

			<div className="mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
				{/* Sticky Left Sidebar: Context */}
				<div className="lg:sticky lg:top-24 lg:col-span-4">
					<div className="flex flex-col space-y-8 rounded-2xl bg-zinc-50 p-6 md:p-8 dark:bg-zinc-800/40">
						<SectionText
							title={contextSection.title[locale]}
							paragraphs={contextSection.paragraphs}
							locale={locale}
							icon={<BookOpenText className="h-5 w-5" />}
						/>
						{outcomeSection && (
							<SectionText
								title={outcomeSection.title[locale]}
								paragraphs={outcomeSection.paragraphs}
								locale={locale}
								icon={<BarChart3 className="h-5 w-5" />}
							/>
						)}
					</div>
				</div>

				{/* Right Column: Deep Dive */}
				<div className="flex flex-col space-y-16 lg:col-span-8">
					{/* Architecture Section */}
					<div className="space-y-8">
						<SectionText
							title={architectureSection.title[locale]}
							paragraphs={architectureSection.paragraphs}
							locale={locale}
							icon={<Layers className="h-5 w-5" />}
						/>

						{/* Custom Callout Grid */}
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div className="uppercase-style-container flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
								<div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
									<MonitorSmartphone className="h-5 w-5" />
									<h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
										{t.architectureTitle}
									</h4>
								</div>
								<p className="text-sm/relaxed text-zinc-600 dark:text-zinc-400">
									{t.architectureDesc}
								</p>
							</div>
							<div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
								<div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
									<Paintbrush className="h-5 w-5" />
									<h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
										{t.themeTitle}
									</h4>
								</div>
								<p className="text-sm/relaxed text-zinc-600 dark:text-zinc-400">
									{t.themeDesc}
								</p>
							</div>
							<div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
								<div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
									<Database className="h-5 w-5" />
									<h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
										{t.dataTitle}
									</h4>
								</div>
								<p className="text-sm/relaxed text-zinc-600 dark:text-zinc-400">
									{t.dataDesc}
								</p>
							</div>
							<div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
								<div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
									<Printer className="h-5 w-5" />
									<h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
										{t.pdfTitle}
									</h4>
								</div>
								<p className="text-sm/relaxed text-zinc-600 dark:text-zinc-400">
									{t.pdfDesc}
								</p>
							</div>
						</div>
					</div>

					{/* Features Section */}
					<div className="space-y-8 border-zinc-100 border-t pt-8 dark:border-zinc-800/50">
						<SectionText
							title={featuresSection.title[locale]}
							paragraphs={featuresSection.paragraphs}
							locale={locale}
							icon={<LayoutTemplate className="h-5 w-5" />}
						/>
					</div>

					{/* Tech Stack & Tooling */}
					<div className="space-y-8 border-zinc-100 border-t pt-8 dark:border-zinc-800/50">
						<SectionText
							title={toolingSection.title[locale]}
							paragraphs={toolingSection.paragraphs}
							locale={locale}
							icon={<Settings2 className="h-5 w-5" />}
						/>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
							<div className="flex flex-col gap-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/40">
								<div className="font-semibold text-xs text-zinc-500 uppercase tracking-wider">
									{t.frontend}
								</div>
								<div className="flex flex-wrap gap-2 pt-1">
									<Badge variant="secondary">Next.js 15</Badge>
									<Badge variant="secondary">React 19</Badge>
									<Badge variant="secondary">Zustand</Badge>
									<Badge variant="secondary">Immer</Badge>
									<Badge variant="secondary">TailwindCSS</Badge>
									<Badge variant="secondary">Framer Motion</Badge>
								</div>
							</div>
							<div className="flex flex-col gap-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/40">
								<div className="font-semibold text-xs text-zinc-500 uppercase tracking-wider">
									{t.backend}
								</div>
								<div className="flex flex-wrap gap-2 pt-1">
									<Badge variant="secondary">Next.js API</Badge>
									<Badge variant="secondary">Puppeteer</Badge>
									<Badge variant="secondary">PDF-lib</Badge>
									<Badge variant="secondary">Google Sheets API</Badge>
									<Badge variant="secondary">XLSX</Badge>
								</div>
							</div>
							<div className="flex flex-col gap-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/40">
								<div className="font-semibold text-xs text-zinc-500 uppercase tracking-wider">
									{t.tools}
								</div>
								<div className="flex flex-wrap gap-2 pt-1">
									<Badge variant="secondary">TypeScript</Badge>
									<Badge variant="secondary">Zod</Badge>
									<Badge variant="secondary">Biome</Badge>
									<Badge variant="secondary">Vitest</Badge>
								</div>
							</div>
						</div>
					</div>

					{/* Tradeoffs */}
					{tradeoffsSection && (
						<div className="space-y-8 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm md:p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
							<SectionText
								title={tradeoffsSection.title[locale]}
								paragraphs={tradeoffsSection.paragraphs}
								locale={locale}
								icon={<Layers className="h-5 w-5 text-amber-500" />}
							/>
						</div>
					)}
				</div>
			</div>

			<div className="mt-16 grid grid-cols-1 gap-8 lg:mt-24 lg:grid-cols-3 lg:gap-12">
				<div className="lg:col-span-2">
					<FaqBlock caseStudy={caseStudy} locale={locale} />
				</div>
				<div className="flex flex-col space-y-8">
					<ExternalLinks project={project} locale={locale} />
					<RelatedProjects relatedProjects={relatedProjects} locale={locale} />
				</div>
			</div>
		</main>
	);
}
