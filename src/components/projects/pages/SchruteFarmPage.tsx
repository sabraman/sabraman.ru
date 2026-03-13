import {
	ExternalLinks,
	FaqBlock,
	PageTopNav,
	ProjectHero,
	type ProjectPageProps,
	pickSection,
	RelatedProjects,
	SectionCard,
} from "./CaseStudyPrimitives";

export function SchruteFarmPage({
	locale,
	project,
	caseStudy,
	relatedProjects,
}: ProjectPageProps) {
	return (
		<main className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
			<PageTopNav locale={locale} />
			<ProjectHero
				project={project}
				caseStudy={caseStudy}
				locale={locale}
				accentClassName="bg-emerald-400/25"
			/>

			<div className="mt-8 space-y-6">
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					<SectionCard
						section={pickSection(caseStudy, "context")}
						locale={locale}
					/>
					<SectionCard
						section={pickSection(caseStudy, "architecture")}
						locale={locale}
					/>
				</div>
				<SectionCard
					section={pickSection(caseStudy, "features")}
					locale={locale}
					className="md:p-8"
				/>
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					<SectionCard
						section={pickSection(caseStudy, "tooling")}
						locale={locale}
					/>
					<SectionCard
						section={pickSection(caseStudy, "outcome")}
						locale={locale}
						className="lg:col-span-2"
					/>
					<SectionCard
						section={pickSection(caseStudy, "tradeoffs")}
						locale={locale}
						className="lg:col-span-3"
					/>
				</div>
			</div>

			<div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<FaqBlock caseStudy={caseStudy} locale={locale} />
				</div>
				<ExternalLinks project={project} locale={locale} />
			</div>
			<div className="mt-6">
				<RelatedProjects relatedProjects={relatedProjects} locale={locale} />
			</div>
		</main>
	);
}
