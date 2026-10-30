import {
	Activity,
	Layers,
	Network,
	Scale,
	Server,
	TrendingUp,
	Truck,
	Wrench,
	Zap,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import {
	AuthorCard,
	ExternalLinks,
	FaqBlock,
	PageTopNav,
	ProjectHero,
	type ProjectPageProps,
	RelatedProjects,
	type SupportedLocale,
	pickSection,
} from "./CaseStudyPrimitives";

const LABELS = {
	en: {
		kpiTitle: "Audited Production Impact",
		kpiDesc:
			"Enterprise data extracted and verified across 10,000+ operational flight records.",
		flights: "10,000+",
		flightsLabel: "Historical Shipments Audited",
		flightsSub: "9-year database extraction across 180+ tables",
		marginGap: "~40%",
		marginGapLabel: "Margin Variance Resolved",
		marginGapSub: "Exposed unhedged VAT asymmetry & broker cuts",
		savings: "-4.9%",
		savingsLabel: "Freight Procurement Cost",
		savingsSub: "Reduced via combinatorial backhaul optimization",
		endpoints: "~90",
		endpointsLabel: "Delphi RPC Methods Mapped",
		endpointsSub: "DataSnap delta writes & state electronic notes (ЭТрН)",
		speed: "1–30 ms",
		speedLabel: "OLAP Analytical Query Latency",
		speedSub: "In-memory DuckDB query engine with SQL validator",
		setupTime: "15 min",
		setupTimeLabel: "Workstation Provisioning",
		setupTimeSub: "Proxmox Golden Image VDI vs 4 hours previously",
		pillarsTitle: "Core Engineering Architecture",
		pillarsSubtitle:
			"How we modernized a mission-critical logistics stack without operational downtime.",
		techTitle: "Technical Stack & Infrastructure",
		step01: "01",
		step01Title: "Delphi SOAP / DataSnap Reverse-Engineering",
		step01Tag: "Non-Invasive Protocol Modernization",
		step01Desc:
			"Rather than attempting a multi-million-ruble ERP migration during peak shipping cycles, we reverse-engineered the proprietary Delphi SOAP service. Mapped ~90 private RPC endpoints across core server interfaces, capturing live DataSnap delta packets to automate order writes into the database provider, geocoding lookups, freight exchange deals, and state electronic consignment notes (ЭТрН under federal regulations).",
		step02: "02",
		step02Title: "Forensic Margin Audit & Ledger Ledger Reconstruction",
		step02Tag: "Tax & Intermediary Anomaly Detection",
		step02Desc:
			"Deep audit across tens of thousands of ledger calculation records revealed that the nominal gross margin of ~27% was eroded down to ~17% net operational margin. The root cause was systemic: invoicing corporate clients with 20% VAT while paying non-VAT subcontractor carriers, alongside untracked fixed broker deductions. Granular unit economics proved industrial cargo and packaging deliver 38% margin, while bulk furniture delivered only ~11%.",
		step03: "03",
		step03Title: "Combinatorial Backhaul Consolidator («Склейка»)",
		step03Tag: "Empty Mileage Optimization",
		step03Desc:
			"Analysis of paired round-trips revealed a 74% empty mileage ratio on return legs from northern terminals. We developed a combinatorial multi-drop optimization engine that clusters compatible LTL shipments, respecting temperature constraints, driver rest hours, and route detour caps. Backtested models confirmed a 4.9% freight procurement cost reduction, systematically converting empty return runs into paid consolidated legs.",
		step04: "04",
		step04Title: "In-Memory DuckDB Natural Language OLAP",
		step04Tag: "Zero-Cloud Analytics Engine",
		step04Desc:
			"Built an embedded in-memory OLAP analytics engine executing complex multi-year aggregations across 10,000+ flights in 1–30 ms. An AST-validated Natural Language-to-SQL compiler safely translates executive questions into verified read-only SQL, auto-generating Excel workbooks (.xlsx) with live Excel =SUM() formulas and sandboxed HTML reports at zero recurring cloud warehouse cost.",
		step05: "05",
		step05Title: "Proxmox VE Virtualization & 4-Tier Disaster Recovery",
		step05Tag: "High-Availability Infrastructure",
		step05Desc:
			"Deployed a Proxmox VE hypervisor hosting a master Windows Server VM alongside isolated dispatcher VDI workstations cloned from a standardized Golden Image template. Station onboarding dropped from 4 hours to 15 minutes. Safeguarded operations through automated 4-tier protection: 3-hour VSS filesystem shadow copies, bi-daily database dumps via PowerShell, nightly vzdump hypervisor images, and encrypted secret management.",
	},
	ru: {
		kpiTitle: "Подтверждённые производственные метрики",
		kpiDesc:
			"Данные извлечены и верифицированы по реестру более 10 000 выполненных коммерческих рейсов.",
		flights: "10 000+",
		flightsLabel: "Рейсов в базе аудита",
		flightsSub: "9 лет данных из 180+ таблиц базы данных",
		marginGap: "~40%",
		marginGapLabel: "Устранённый разрыв маржи",
		marginGapSub: "Выявлен перекос НДС и скрытые брокерские комиссии",
		savings: "-4.9%",
		savingsLabel: "Затраты на закупку транспорта",
		savingsSub: "Сокращение за счёт комбинаторной склейки обратки",
		endpoints: "~90",
		endpointsLabel: "Методов Delphi RPC в карте",
		endpointsSub: "DataSnap дельты, биржи и титулы ЭТрН",
		speed: "1–30 мс",
		speedLabel: "Отклик OLAP-аналитики",
		speedSub: "In-memory движок DuckDB с SQL-валидатором",
		setupTime: "15 мин",
		setupTimeLabel: "Развёртывание рабочего места",
		setupTimeSub: "Proxmox Golden Image вместо 4 часов настройки",
		pillarsTitle: "Архитектура инженерного решения",
		pillarsSubtitle:
			"Модернизация критического контура логистики без остановки перевозок.",
		techTitle: "Инженерный стек и системные компоненты",
		step01: "01",
		step01Title: "Реверс-инжиниринг Delphi SOAP / DataSnap",
		step01Tag: "Неинвазивная модернизация протокола",
		step01Desc:
			"Вместо дорогостоящей замены ядра в разгар сезона мы применили реверс-инжиниринг проприетарной службы Delphi SOAP. Декомпилировали и задокументировали ~90 приватных RPC-методов, разобрав формат DataSnap дельт для автоматической записи заявок в провайдер базы данных, геокодирования, синхронизации торгов и титулов государственных электронных накладных (ЭТрН).",
		step02: "02",
		step02Title: "Форензик утечки маржи и аудит проводок",
		step02Tag: "Выявление налоговых и брокерских перекосов",
		step02Desc:
			"Глубокий аудит десятков тысяч проводок выявил, что номинальная маржа ~27% снижалась до ~17% реальной операционной маржи. Причина — системная асимметрия: счета клиентам с 20% НДС при найме перевозчиков на УСН без входящего НДС, а также неклассифицированные посреднические списания. Точный расчёт юнит-экономики доказал, что промышленное оборудование и тара дают 38% маржи, а мебель — лишь ~11%.",
		step03: "03",
		step03Title: "Комбинаторная склейка рейсов («Обратка»)",
		step03Tag: "Ликвидация холостых пробегов",
		step03Desc:
			"Анализ спаренных рейсов вскрыл 74% порожнего пробега на обратном плече с северных терминалов. Мы разработали алгоритм комбинаторной склейки сборных грузов (LTL) с соблюдением температурных режимов, правил режима труда и лимитов отклонения от трассы. Модель подтвердила снижение затрат на закупку транспорта на 4.9%, системно превращая порожние обратные пробеги в оплачиваемые сборные коридоры.",
		step04: "04",
		step04Title: "In-Memory DuckDB OLAP с естественным языком",
		step04Tag: "Аналитика без затрат на облачный DWH",
		step04Desc:
			"Создали встраиваемый in-memory OLAP-движок, выполняющий сложные многомерные агрегации по 10 000+ рейсам за 1–30 мс. Компилятор естественного языка со строгой валидацией AST транслирует вопросы руководства в безопасный SQL, автоматически генерируя Excel-отчёты (.xlsx) с живыми формулами =SUM() без аренды дорогостоящих облачных хранилищ.",
		step05: "05",
		step05Title: "Виртуализация Proxmox VE и 4-уровневое DR",
		step05Tag: "Отказоустойчивая инфраструктура",
		step05Desc:
			"Развернули гипервизор Proxmox VE с базовой ВМ Windows Server и изолированными VDI-местами диспетчеров, клонируемыми из эталонного Golden Image. Ввод нового диспетчера сократился с 4 часов до 15 минут. Защитили контур 4-уровневым резервированием: 3-часовые теневые копии томов VSS, выгрузка баз через PowerShell дважды в сутки, ночные vzdump-образы и менеджер паролей Vaultwarden.",
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
		<article className="py-6 border-b border-primary/10 last:border-b-0">
			<div className="mb-4 flex items-center gap-3">
				<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
					{icon}
				</div>
				<h2
					className="font-extrabold text-2xl tracking-tight text-foreground md:text-3xl"
					style={{
						fontFamily: "Heading Now Variable",
						fontVariationSettings: `'wght' 840, 'wdth' 860`,
					}}
				>
					{title}
				</h2>
			</div>
			<div className="space-y-4 text-foreground/85 text-base leading-relaxed">
				{paragraphs.map((p, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: paragraphs are static
					<p key={i}>{p[locale]}</p>
				))}
			</div>
		</article>
	);
}

const TECH_GROUPS = [
	{
		title: { en: "Web Core & Analytics", ru: "Веб-ядро и аналитика" },
		badges: [
			"Next.js 15 App Router",
			"React 19",
			"TypeScript",
			"DuckDB-Wasm",
			"TailwindCSS",
			"TanStack Table",
		],
	},
	{
		title: { en: "Legacy TMS Protocols", ru: "TMS-протоколы и СУБД" },
		badges: [
			"Delphi SOAP / DataSnap",
			"MS SQL Database",
			"ProposalsDSP Provider",
			"1C:Enterprise 8 Bridge",
		],
	},
	{
		title: {
			en: "Freight & Regulatory Services",
			ru: "Логистические сервисы",
		},
		badges: [
			"ATI.SU Deals RPC",
			"Electronic Freight Notes (ЭТрН / ГИС ЭПД)",
			"Carrier Cellular Triangulation",
			"Courier Tracking Webhooks",
		],
	},
	{
		title: {
			en: "Virtualization & Security",
			ru: "Виртуализация и безопасность",
		},
		badges: [
			"Proxmox VE Hypervisor",
			"Windows Server VDI",
			"PowerShell Automation",
			"Volume Shadow Copy (VSS)",
			"Vaultwarden",
		],
	},
];

export function DaariatransPage({
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
		<main className="container mx-auto max-w-3xl px-4 py-14 md:py-20">
			<PageTopNav locale={locale} />

			{/* Project Hero Banner */}
			<ProjectHero
				project={project}
				caseStudy={caseStudy}
				locale={locale}
				accentClassName="bg-blue-500/15"
			/>

			{/* Audited Production Metrics */}
			<section className="mt-12 pt-8 border-t border-primary/10">
				<div className="mb-6">
					<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						<Activity className="h-4 w-4 text-blue-500" />
						<span>{t.kpiTitle}</span>
					</div>
					<p className="mt-1 text-sm text-muted-foreground">{t.kpiDesc}</p>
				</div>

				<div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
					<div>
						<div
							className="font-extrabold text-3xl tracking-tight text-foreground md:text-4xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 900, 'wdth' 840`,
							}}
						>
							{t.flights}
						</div>
						<div className="mt-1 font-semibold text-sm text-foreground">
							{t.flightsLabel}
						</div>
						<div className="mt-0.5 text-xs text-muted-foreground">
							{t.flightsSub}
						</div>
					</div>

					<div>
						<div
							className="font-extrabold text-3xl tracking-tight text-foreground md:text-4xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 900, 'wdth' 840`,
							}}
						>
							{t.marginGap}
						</div>
						<div className="mt-1 font-semibold text-sm text-foreground">
							{t.marginGapLabel}
						</div>
						<div className="mt-0.5 text-xs text-muted-foreground">
							{t.marginGapSub}
						</div>
					</div>

					<div>
						<div
							className="font-extrabold text-3xl tracking-tight text-foreground md:text-4xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 900, 'wdth' 840`,
							}}
						>
							{t.savings}
						</div>
						<div className="mt-1 font-semibold text-sm text-foreground">
							{t.savingsLabel}
						</div>
						<div className="mt-0.5 text-xs text-muted-foreground">
							{t.savingsSub}
						</div>
					</div>

					<div>
						<div
							className="font-extrabold text-3xl tracking-tight text-foreground md:text-4xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 900, 'wdth' 840`,
							}}
						>
							{t.endpoints}
						</div>
						<div className="mt-1 font-semibold text-sm text-foreground">
							{t.endpointsLabel}
						</div>
						<div className="mt-0.5 text-xs text-muted-foreground">
							{t.endpointsSub}
						</div>
					</div>

					<div>
						<div
							className="font-extrabold text-3xl tracking-tight text-foreground md:text-4xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 900, 'wdth' 840`,
							}}
						>
							{t.speed}
						</div>
						<div className="mt-1 font-semibold text-sm text-foreground">
							{t.speedLabel}
						</div>
						<div className="mt-0.5 text-xs text-muted-foreground">
							{t.speedSub}
						</div>
					</div>

					<div>
						<div
							className="font-extrabold text-3xl tracking-tight text-foreground md:text-4xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 900, 'wdth' 840`,
							}}
						>
							{t.setupTime}
						</div>
						<div className="mt-1 font-semibold text-sm text-foreground">
							{t.setupTimeLabel}
						</div>
						<div className="mt-0.5 text-xs text-muted-foreground">
							{t.setupTimeSub}
						</div>
					</div>
				</div>
			</section>

			{/* Core Engineering Architecture Pillars */}
			<section className="mt-14 pt-10 border-t border-primary/10">
				<div className="mb-8">
					<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						<Layers className="h-4 w-4 text-blue-500" />
						<span>{t.pillarsTitle}</span>
					</div>
					<h2
						className="mt-2 font-extrabold text-2xl tracking-tight text-foreground md:text-3xl"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 860, 'wdth' 860`,
						}}
					>
						{t.pillarsSubtitle}
					</h2>
				</div>

				<div className="space-y-8">
					{/* Pillar 01 */}
					<div className="group border-b border-primary/10 pb-8 last:border-b-0">
						<div className="flex items-baseline gap-4">
							<span className="font-mono text-sm font-bold text-blue-500">
								{t.step01}
							</span>
							<div>
								<div className="flex flex-wrap items-center gap-2">
									<h3 className="font-bold text-lg text-foreground md:text-xl">
										{t.step01Title}
									</h3>
									<Badge variant="outline" className="rounded-full text-[11px]">
										{t.step01Tag}
									</Badge>
								</div>
								<p className="mt-3 text-base/relaxed text-foreground/85">
									{t.step01Desc}
								</p>
							</div>
						</div>
					</div>

					{/* Pillar 02 */}
					<div className="group border-b border-primary/10 pb-8 last:border-b-0">
						<div className="flex items-baseline gap-4">
							<span className="font-mono text-sm font-bold text-amber-500">
								{t.step02}
							</span>
							<div>
								<div className="flex flex-wrap items-center gap-2">
									<h3 className="font-bold text-lg text-foreground md:text-xl">
										{t.step02Title}
									</h3>
									<Badge variant="outline" className="rounded-full text-[11px]">
										{t.step02Tag}
									</Badge>
								</div>
								<p className="mt-3 text-base/relaxed text-foreground/85">
									{t.step02Desc}
								</p>
							</div>
						</div>
					</div>

					{/* Pillar 03 */}
					<div className="group border-b border-primary/10 pb-8 last:border-b-0">
						<div className="flex items-baseline gap-4">
							<span className="font-mono text-sm font-bold text-purple-500">
								{t.step03}
							</span>
							<div>
								<div className="flex flex-wrap items-center gap-2">
									<h3 className="font-bold text-lg text-foreground md:text-xl">
										{t.step03Title}
									</h3>
									<Badge variant="outline" className="rounded-full text-[11px]">
										{t.step03Tag}
									</Badge>
								</div>
								<p className="mt-3 text-base/relaxed text-foreground/85">
									{t.step03Desc}
								</p>
							</div>
						</div>
					</div>

					{/* Pillar 04 */}
					<div className="group border-b border-primary/10 pb-8 last:border-b-0">
						<div className="flex items-baseline gap-4">
							<span className="font-mono text-sm font-bold text-emerald-500">
								{t.step04}
							</span>
							<div>
								<div className="flex flex-wrap items-center gap-2">
									<h3 className="font-bold text-lg text-foreground md:text-xl">
										{t.step04Title}
									</h3>
									<Badge variant="outline" className="rounded-full text-[11px]">
										{t.step04Tag}
									</Badge>
								</div>
								<p className="mt-3 text-base/relaxed text-foreground/85">
									{t.step04Desc}
								</p>
							</div>
						</div>
					</div>

					{/* Pillar 05 */}
					<div className="group border-b border-primary/10 pb-8 last:border-b-0">
						<div className="flex items-baseline gap-4">
							<span className="font-mono text-sm font-bold text-sky-500">
								{t.step05}
							</span>
							<div>
								<div className="flex flex-wrap items-center gap-2">
									<h3 className="font-bold text-lg text-foreground md:text-xl">
										{t.step05Title}
									</h3>
									<Badge variant="outline" className="rounded-full text-[11px]">
										{t.step05Tag}
									</Badge>
								</div>
								<p className="mt-3 text-base/relaxed text-foreground/85">
									{t.step05Desc}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Narrative Case Study Sections */}
			<section className="mt-14 pt-6 border-t border-primary/10">
				{contextSection && (
					<SectionText
						title={contextSection.title[locale]}
						paragraphs={contextSection.paragraphs}
						locale={locale}
						icon={<Truck className="h-5 w-5" />}
					/>
				)}

				{architectureSection && (
					<SectionText
						title={architectureSection.title[locale]}
						paragraphs={architectureSection.paragraphs}
						locale={locale}
						icon={<Network className="h-5 w-5" />}
					/>
				)}

				{featuresSection && (
					<SectionText
						title={featuresSection.title[locale]}
						paragraphs={featuresSection.paragraphs}
						locale={locale}
						icon={<Zap className="h-5 w-5" />}
					/>
				)}

				{toolingSection && (
					<SectionText
						title={toolingSection.title[locale]}
						paragraphs={toolingSection.paragraphs}
						locale={locale}
						icon={<Wrench className="h-5 w-5" />}
					/>
				)}

				{outcomeSection && (
					<SectionText
						title={outcomeSection.title[locale]}
						paragraphs={outcomeSection.paragraphs}
						locale={locale}
						icon={<TrendingUp className="h-5 w-5" />}
					/>
				)}

				{tradeoffsSection && (
					<SectionText
						title={tradeoffsSection.title[locale]}
						paragraphs={tradeoffsSection.paragraphs}
						locale={locale}
						icon={<Scale className="h-5 w-5" />}
					/>
				)}
			</section>

			{/* Technical Stack & Components */}
			<section className="mt-14 pt-8 border-t border-primary/10">
				<div className="mb-6 flex items-center gap-2">
					<Server className="h-4 w-4 text-blue-500" />
					<h3
						className="font-extrabold text-xl text-foreground md:text-2xl"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 840, 'wdth' 860`,
						}}
					>
						{t.techTitle}
					</h3>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{TECH_GROUPS.map((group) => (
						<div
							key={group.title.en}
							className="border-b border-primary/10 pb-4 last:border-b-0"
						>
							<div className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">
								{group.title[locale]}
							</div>
							<div className="flex flex-wrap gap-1.5">
								{group.badges.map((badge) => (
									<Badge
										key={badge}
										variant="secondary"
										className="rounded-full text-xs font-normal"
									>
										{badge}
									</Badge>
								))}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* FAQ & External Links */}
			<div className="mt-12 space-y-6">
				<ExternalLinks project={project} locale={locale} />
				<FaqBlock caseStudy={caseStudy} locale={locale} />
			</div>

			{/* Author Signature */}
			<AuthorCard locale={locale} />

			{/* Related Projects */}
			<div className="mt-10">
				<RelatedProjects relatedProjects={relatedProjects} locale={locale} />
			</div>
		</main>
	);
}
