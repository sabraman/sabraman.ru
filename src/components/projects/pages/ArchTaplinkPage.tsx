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

export function ArchTaplinkPage({
	locale,
	project,
	caseStudy,
	relatedProjects,
}: ProjectPageProps) {
	return (
		<main className="container mx-auto max-w-2xl px-4 py-14 md:py-20">
			<PageTopNav locale={locale} />
			<ProjectHero
				project={project}
				caseStudy={caseStudy}
				locale={locale}
				accentClassName="bg-orange-500/20"
			/>

			<div className="mt-8 space-y-6">
				<SectionCard
					section={pickSection(caseStudy, "context")}
					locale={locale}
				/>
				<SectionCard
					section={pickSection(caseStudy, "architecture")}
					locale={locale}
				/>
				<SectionCard
					section={pickSection(caseStudy, "tooling")}
					locale={locale}
				/>
				<SectionCard
					section={pickSection(caseStudy, "features")}
					locale={locale}
				/>
				<SectionCard
					section={pickSection(caseStudy, "tradeoffs")}
					locale={locale}
				/>
				<SectionCard
					section={pickSection(caseStudy, "outcome")}
					locale={locale}
				/>
			</div>

			<div className="mt-8 space-y-6">
				<FaqBlock caseStudy={caseStudy} locale={locale} />
				<ExternalLinks project={project} locale={locale} />
			</div>
			<div className="mt-6">
				<RelatedProjects relatedProjects={relatedProjects} locale={locale} />
			</div>
		</main>
	);
}
