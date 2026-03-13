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

export function VaparshopPage({
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
				accentClassName="bg-accent/20"
			/>

			<div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
				<div className="space-y-6 lg:col-span-7">
					<SectionCard
						section={pickSection(caseStudy, "context")}
						locale={locale}
					/>
					<SectionCard
						section={pickSection(caseStudy, "architecture")}
						locale={locale}
					/>
					<SectionCard
						section={pickSection(caseStudy, "features")}
						locale={locale}
					/>
				</div>
				<div className="space-y-6 self-start lg:sticky lg:top-24 lg:col-span-5">
					<SectionCard
						section={pickSection(caseStudy, "tooling")}
						locale={locale}
					/>
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
