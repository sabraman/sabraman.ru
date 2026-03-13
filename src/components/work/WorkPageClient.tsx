"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	getCaseStudyPath,
	PROJECT_CATALOG_GROUP_LABELS,
	PROJECT_CATALOG_GROUP_ORDER,
	PROJECTS,
	type ProjectCatalogGroupId,
} from "~/data/projects";

type SupportedLocale = "en" | "ru";

const LABELS = {
	en: {
		title: "Work Hub",
		description:
			"Complete case-study index across all shipped products and long-term project streams.",
		private: "Private",
		public: "Public",
		caseStudy: "Open case study",
	},
	ru: {
		title: "Хаб кейсов",
		description:
			"Полный индекс кейсов по всем запущенным продуктам и долгим проектным направлениям.",
		private: "Приватный",
		public: "Публичный",
		caseStudy: "Открыть кейс",
	},
} as const;

function getGroupProjects(group: ProjectCatalogGroupId) {
	if (group === "featured") {
		return PROJECTS.filter((project) => project.isFeaturedWork);
	}

	return PROJECTS.filter(
		(project) => project.category === group && !project.isFeaturedWork,
	);
}

export default function WorkPageClient() {
	const locale = (useLocale() === "ru" ? "ru" : "en") as SupportedLocale;
	const labels = LABELS[locale];

	return (
		<main className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
			<header className="mb-12">
				<h1
					className="mb-4 font-extrabold text-5xl uppercase tracking-tight md:text-7xl"
					style={{
						fontFamily: "Heading Now Variable",
						fontVariationSettings: `'wght' 950, 'wdth' 860`,
					}}
				>
					{labels.title}
				</h1>
				<p className="max-w-3xl text-lg text-muted-foreground leading-relaxed">
					{labels.description}
				</p>
			</header>

			<div className="space-y-12">
				{PROJECT_CATALOG_GROUP_ORDER.map((group) => {
					const projects = getGroupProjects(group);
					if (!projects.length) {
						return null;
					}

					return (
						<section key={group}>
							<div className="mb-4 flex items-center justify-between border-primary/15 border-b pb-2">
								<h2
									className="font-extrabold text-2xl uppercase tracking-tight md:text-3xl"
									style={{
										fontFamily: "Heading Now Variable",
										fontVariationSettings: `'wght' 840, 'wdth' 860`,
									}}
								>
									{PROJECT_CATALOG_GROUP_LABELS[group][locale]}
								</h2>
								<Badge className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
									{projects.length}
								</Badge>
							</div>

							<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
								{projects.map((project) => (
									<article
										key={project.id}
										className="group flex h-full flex-col rounded-3xl border border-primary/10 bg-background/80 p-5 shadow-sm transition-all duration-300 hover:border-accent/30 hover:shadow-accent/10 hover:shadow-lg"
									>
										<div className="mb-3 flex items-center justify-between gap-2">
											<h3
												className="font-extrabold text-2xl leading-tight"
												style={{
													fontFamily: "Heading Now Variable",
													fontVariationSettings: `'wght' 760, 'wdth' 860`,
												}}
											>
												{project.title}
											</h3>
											<Badge
												variant="outline"
												className="rounded-full border-primary/15 px-2.5 py-1 text-[11px] uppercase tracking-wide"
											>
												{project.visibility === "private"
													? labels.private
													: labels.public}
											</Badge>
										</div>
										<p className="mb-4 text-muted-foreground text-sm leading-relaxed">
											{project.short[locale]}
										</p>
										<div className="mb-4 flex flex-wrap gap-2">
											{project.tags.slice(0, 4).map((tag) => (
												<Badge
													key={tag}
													variant="secondary"
													className="rounded-full px-2.5 py-1"
												>
													{tag}
												</Badge>
											))}
										</div>
										<div className="mt-auto">
											<Button asChild size="sm" className="gap-1.5">
												<Link href={getCaseStudyPath(locale, project.slug)}>
													{labels.caseStudy}
													<ArrowUpRight className="h-3.5 w-3.5" />
												</Link>
											</Button>
										</div>
									</article>
								))}
							</div>
						</section>
					);
				})}
			</div>
		</main>
	);
}
