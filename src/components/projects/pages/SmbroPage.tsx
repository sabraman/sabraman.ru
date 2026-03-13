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

export function SmbroPage({
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
				accentClassName="bg-violet-500/20"
			/>

			<div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-4">
				<SectionCard
					section={pickSection(caseStudy, "context")}
					locale={locale}
					className="xl:col-span-2"
				/>
				<SectionCard
					section={pickSection(caseStudy, "architecture")}
					locale={locale}
					className="xl:col-span-2"
				/>
				<SectionCard
					section={pickSection(caseStudy, "features")}
					locale={locale}
					className="xl:col-span-2"
				/>
				<SectionCard
					section={pickSection(caseStudy, "tooling")}
					locale={locale}
				/>
				<SectionCard
					section={pickSection(caseStudy, "tradeoffs")}
					locale={locale}
				/>
				<SectionCard
					section={pickSection(caseStudy, "outcome")}
					locale={locale}
					className="xl:col-span-4"
				/>
			</div>

			<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
				<FaqBlock caseStudy={caseStudy} locale={locale} />
				<ExternalLinks project={project} locale={locale} />
			</div>
			<div className="mt-6">
				<RelatedProjects relatedProjects={relatedProjects} locale={locale} />
			</div>
		</main>
	);
}
