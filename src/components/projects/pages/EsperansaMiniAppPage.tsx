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

export function EsperansaMiniAppPage({
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
				accentClassName="bg-blue-500/20"
			/>

			<div className="mt-8 space-y-6">
				<SectionCard
					section={pickSection(caseStudy, "context")}
					locale={locale}
					className="md:p-8"
				/>
				<SectionCard
					section={pickSection(caseStudy, "architecture")}
					locale={locale}
					className="md:p-8"
				/>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<SectionCard
						section={pickSection(caseStudy, "features")}
						locale={locale}
					/>
					<SectionCard
						section={pickSection(caseStudy, "tooling")}
						locale={locale}
					/>
				</div>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<SectionCard
						section={pickSection(caseStudy, "outcome")}
						locale={locale}
					/>
					<SectionCard
						section={pickSection(caseStudy, "tradeoffs")}
						locale={locale}
					/>
				</div>
			</div>

			<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
				<ExternalLinks project={project} locale={locale} />
				<FaqBlock caseStudy={caseStudy} locale={locale} />
			</div>
			<div className="mt-6">
				<RelatedProjects relatedProjects={relatedProjects} locale={locale} />
			</div>
		</main>
	);
}
