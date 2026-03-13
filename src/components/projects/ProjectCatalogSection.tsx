"use client";

import { ArrowUpRight, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	getCaseStudyPath,
	getProjectExternalLinks,
	PROJECT_CATEGORY_LABELS,
	PROJECT_CATEGORY_ORDER,
	PROJECTS,
	type ProjectCategoryId,
} from "~/data/projects";

type SupportedLocale = "en" | "ru";

const LABELS = {
	en: {
		title: "PROJECT",
		titleSecond: "CATALOG",
		description:
			"All case studies in one place: architecture decisions, feature depth, and delivery tradeoffs.",
		caseStudy: "Case Study",
		private: "Private",
		public: "Public",
		privateInDev: "Private / In development",
	},
	ru: {
		title: "КАТАЛОГ",
		titleSecond: "ПРОЕКТОВ",
		description:
			"Все кейсы в одном разделе: архитектурные решения, глубина функций и компромиссы реализации.",
		caseStudy: "Кейс",
		private: "Приватный",
		public: "Публичный",
		privateInDev: "Приватный / В разработке",
	},
} as const;

function getGroupProjects(group: ProjectCategoryId) {
	return PROJECTS.filter(
		(project) => project.category === group && !project.isFeaturedWork,
	);
}

export function ProjectCatalogSection() {
	const locale = (useLocale() === "ru" ? "ru" : "en") as SupportedLocale;
	const labels = LABELS[locale];

	return (
		<section id="projects-catalog" className="relative overflow-hidden py-28">
			<div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/5 to-background" />
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 32 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
					viewport={{ once: true }}
					className="mb-16"
				>
					<h2
						className="font-extrabold text-5xl uppercase tracking-tight md:text-7xl xl:text-[9rem]"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 1000, 'wdth' 840`,
						}}
					>
						<span className="relative mr-3 inline-block md:mr-5 xl:mr-8">
							<span className="absolute -inset-1 bg-accent/50 blur-sm" />
							{labels.title}
						</span>
						{labels.titleSecond}
					</h2>
					<p className="mt-6 max-w-3xl text-lg text-muted-foreground leading-relaxed md:text-xl">
						{labels.description}
					</p>
				</motion.div>

				<div className="space-y-12">
					{PROJECT_CATEGORY_ORDER.map((group, groupIndex) => {
						const projects = getGroupProjects(group);

						if (!projects.length) {
							return null;
						}

						return (
							<motion.div
								key={group}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.45, delay: groupIndex * 0.05 }}
								viewport={{ once: true }}
							>
								<div className="mb-4 flex items-center justify-between border-primary/15 border-b pb-2">
									<h3
										className="font-extrabold text-2xl uppercase tracking-tight md:text-3xl"
										style={{
											fontFamily: "Heading Now Variable",
											fontVariationSettings: `'wght' 860, 'wdth' 860`,
										}}
									>
										{PROJECT_CATEGORY_LABELS[group][locale]}
									</h3>
									<Badge className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
										{projects.length}
									</Badge>
								</div>

								<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
									{projects.map((project) => {
										const externalLinks = getProjectExternalLinks(project);
										const showInDev =
											project.status === "in_development" &&
											project.visibility === "private" &&
											externalLinks.length === 0;

										return (
											<article
												key={project.id}
												className="group flex h-full flex-col rounded-3xl border border-primary/10 bg-background/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:shadow-accent/10 hover:shadow-lg"
											>
												<div className="mb-3 flex items-center justify-between gap-2">
													<h4
														className="font-extrabold text-2xl leading-tight"
														style={{
															fontFamily: "Heading Now Variable",
															fontVariationSettings: `'wght' 760, 'wdth' 860`,
														}}
													>
														{project.title}
													</h4>
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
												<div className="mt-auto flex flex-wrap gap-2">
													<Button asChild size="sm" className="gap-1.5">
														<Link href={getCaseStudyPath(locale, project.slug)}>
															<BookOpen className="h-3.5 w-3.5" />
															{labels.caseStudy}
														</Link>
													</Button>
													{externalLinks.slice(0, 2).map((link) => (
														<Button
															key={link.url}
															asChild
															size="sm"
															variant="outline"
														>
															<Link
																href={link.url}
																target="_blank"
																rel="noreferrer"
																className="gap-1.5"
															>
																{link.label[locale]}
																<ArrowUpRight className="h-3.5 w-3.5" />
															</Link>
														</Button>
													))}
													{showInDev ? (
														<Badge className="rounded-full bg-primary/10 px-2.5 py-1 text-primary/90 text-xs">
															{labels.privateInDev}
														</Badge>
													) : null}
												</div>
											</article>
										);
									})}
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
