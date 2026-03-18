import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getLocalizedHashPathname } from "~/i18n/locale-paths";
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

export function SmokyMarketLoyaltyMiniappPage({
	locale,
	project,
	caseStudy,
	relatedProjects,
}: ProjectPageProps) {
	const labels = {
		en: {
			title: "A similar project can be adapted for your brand",
			description:
				"If you need the same kind of setup, I can build it around your brand and workflows: identity, Telegram mini app, POS logic, social templates, and print surfaces.",
			cta: "Discuss project",
		},
		ru: {
			title: "Похожий проект можно собрать под ваш бренд",
			description:
				"Если вам нужен такой же контур, я могу собрать его под ваш бренд и процессы: айдентику, Telegram mini app, POS-логику, шаблоны для соцсетей и печатные поверхности.",
			cta: "Обсудить проект",
		},
	} as const;
	const contactHref = getLocalizedHashPathname(locale, "/", "contact-section");

	return (
		<main className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
			<PageTopNav locale={locale} />
			<ProjectHero
				project={project}
				caseStudy={caseStudy}
				locale={locale}
				accentClassName="bg-emerald-500/20"
			/>

			<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
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
					className="md:col-span-2"
				/>
				<SectionCard
					section={pickSection(caseStudy, "outcome")}
					locale={locale}
				/>
				<SectionCard
					section={pickSection(caseStudy, "tradeoffs")}
					locale={locale}
				/>
				<SectionCard
					section={pickSection(caseStudy, "tooling")}
					locale={locale}
					className="md:col-span-2"
				/>
			</div>

			<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
				<ExternalLinks project={project} locale={locale} />
				<RelatedProjects relatedProjects={relatedProjects} locale={locale} />
			</div>
			<div className="mt-6">
				<FaqBlock caseStudy={caseStudy} locale={locale} />
			</div>
			<section className="mt-6 rounded-3xl border border-primary/15 bg-background/70 p-6 shadow-sm md:p-8">
				<div className="max-w-3xl">
					<h2
						className="mb-3 font-extrabold text-2xl leading-tight md:text-3xl"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 840, 'wdth' 860`,
						}}
					>
						{labels[locale].title}
					</h2>
					<p className="text-base text-foreground/90 leading-relaxed md:text-lg">
						{labels[locale].description}
					</p>
				</div>
				<div className="mt-5">
					<Button asChild size="lg">
						<Link href={contactHref}>{labels[locale].cta}</Link>
					</Button>
				</div>
			</section>
		</main>
	);
}
