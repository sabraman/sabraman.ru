"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { HomeWorkSectionCopy } from "~/components/home/home-copy";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	getCaseStudyPath,
	getProjectExternalLinks,
	PROJECT_CATEGORY_LABELS,
	PROJECTS,
	type ProjectItem,
} from "~/data/projects";
import { getLocalizedPathname } from "~/i18n/locale-paths";
import type { SupportedLocale } from "~/i18n/types";
import { cn } from "~/lib/utils";

const FEATURED_VISUALS: Partial<
	Record<
		ProjectItem["slug"],
		{
			surfaceClassName: string;
			topGlowClassName: string;
			bottomGlowClassName: string;
		}
	>
> = {
	vaparshop: {
		surfaceClassName:
			"bg-[linear-gradient(135deg,rgba(18,18,22,0.98),rgba(26,26,32,0.96)_48%,rgba(14,14,18,0.99))]",
		topGlowClassName: "bg-primary/14",
		bottomGlowClassName: "bg-accent/10",
	},
	"horny-place": {
		surfaceClassName:
			"bg-[linear-gradient(135deg,rgba(20,16,20,0.98),rgba(30,20,26,0.96)_48%,rgba(16,14,18,0.99))]",
		topGlowClassName: "bg-accent/18",
		bottomGlowClassName: "bg-primary/12",
	},
};

export function HomeWorkSection({
	copy,
	locale,
}: {
	copy: HomeWorkSectionCopy;
	locale: SupportedLocale;
}) {
	const workHref = getLocalizedPathname(locale, "/work");

	const featuredProjects = PROJECTS.filter((project) => project.isFeaturedWork);
	const archiveProjects = PROJECTS.filter(
		(project) => !project.isFeaturedWork,
	).slice(0, 6);

	return (
		<section
			id="projects"
			className="relative min-h-screen overflow-hidden py-32"
		>
			<div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(5,10,16,0.96),rgba(8,17,26,0.98))]" />
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(253,186,116,0.14),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(217,70,239,0.1),transparent_40%)]" />
			<div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] opacity-[0.06]" />
			<div className="absolute top-20 left-[8%] -z-10 h-72 w-72 rounded-full bg-cyan-300/10 blur-[110px]" />
			<div className="absolute right-[6%] bottom-10 -z-10 h-80 w-80 rounded-full bg-orange-300/10 blur-[130px]" />

			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 70 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
					viewport={{ once: true }}
					className="mb-14"
				>
					<h2
						className="max-w-5xl font-extrabold text-6xl text-white uppercase tracking-tight md:text-8xl xl:text-[13rem]"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 1000, 'wdth' 790`,
						}}
					>
						<span className="relative z-0 mr-4 inline-block md:mr-8 xl:mr-10">
							<span className="absolute -inset-1 bg-accent opacity-50 blur-sm" />
							{copy.title}
						</span>
						{copy.titleSecond}
					</h2>

					<p className="mt-8 max-w-3xl text-lg text-white/68 leading-relaxed md:text-xl">
						{copy.description}
					</p>

					<Button
						asChild
						variant="outline"
						className="mt-8 rounded-full border-white/14 bg-transparent text-white hover:bg-white hover:text-black"
					>
						<Link href={workHref}>
							{copy.openHub}
							<ArrowUpRight className="h-4 w-4" />
						</Link>
					</Button>
				</motion.div>

				<div className="grid gap-6 md:grid-cols-12">
					{featuredProjects.map((project, index) => {
						const visual = FEATURED_VISUALS[project.slug];
						const href = getCaseStudyPath(locale, project.slug);
						const externalLinks = getProjectExternalLinks(project);

						return (
							<motion.article
								key={project.id}
								initial={{ opacity: 0, y: 60 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.75,
									delay: index * 0.12,
									ease: [0.22, 1, 0.36, 1],
								}}
								viewport={{ once: true, amount: 0.25 }}
								className={cn(
									"group relative overflow-hidden rounded-[2rem] border border-white/10",
									index === 0
										? "md:col-span-7 md:min-h-[32rem]"
										: "md:col-span-5 md:min-h-[32rem]",
									visual?.surfaceClassName,
								)}
							>
								<div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.08]" />
								<div
									className={cn(
										"absolute -top-14 -left-10 h-56 w-56 rounded-full blur-[100px]",
										visual?.topGlowClassName,
									)}
								/>
								<div
									className={cn(
										"absolute right-0 bottom-0 h-64 w-64 rounded-full blur-[120px]",
										visual?.bottomGlowClassName,
									)}
								/>
								<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_38%,rgba(255,255,255,0.02))]" />

								<Link
									href={href}
									className="relative flex h-full flex-col p-7 text-white md:p-8"
								>
									<div className="mb-12 flex items-start justify-between gap-4">
										<div className="space-y-3">
											<Badge className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[0.65rem] text-white/72 uppercase tracking-[0.28em]">
												{copy.featureLabel}
											</Badge>
											<p className="text-sm text-white/48 uppercase tracking-[0.3em]">
												{PROJECT_CATEGORY_LABELS[project.category][locale]}
											</p>
										</div>
										<div
											className="text-right text-6xl text-white/14"
											style={{
												fontFamily: "Heading Now Variable",
												fontVariationSettings: `'wght' 950, 'wdth' 820`,
											}}
										>
											0{index + 1}
										</div>
									</div>

									<div className="max-w-xl">
										<h3
											className="text-4xl text-white leading-none md:text-5xl"
											style={{
												fontFamily: "Heading Now Variable",
												fontVariationSettings: `'wght' 860, 'wdth' 860`,
											}}
										>
											{project.title}
										</h3>
										<p className="mt-4 max-w-lg text-base text-white/72 leading-relaxed md:text-lg">
											{project.details[locale]}
										</p>
									</div>

									<div className="mt-auto">
										<div className="mb-6 flex flex-wrap gap-2">
											{project.tags.slice(0, 4).map((tag) => (
												<Badge
													key={tag}
													className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-white/82 backdrop-blur-sm"
												>
													{tag}
												</Badge>
											))}
										</div>

										<div className="flex flex-wrap items-center justify-between gap-4">
											<div className="flex flex-wrap items-center gap-3 text-sm text-white/58">
												<Badge className="rounded-full bg-white/8 px-3 py-1 text-white/78">
													{project.visibility === "private"
														? copy.private
														: copy.public}
												</Badge>
												{externalLinks.length ? (
													<span>
														{externalLinks.length} {copy.links}
													</span>
												) : null}
											</div>
											<div className="inline-flex items-center gap-2 font-medium text-white transition-transform duration-300 group-hover:translate-x-1">
												{copy.caseStudy}
												<ArrowUpRight className="h-4 w-4" />
											</div>
										</div>
									</div>
								</Link>
							</motion.article>
						);
					})}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
					viewport={{ once: true, amount: 0.2 }}
					className="mt-6"
				>
					<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
						{archiveProjects.map((project, index) => (
							<Link
								key={project.id}
								href={getCaseStudyPath(locale, project.slug)}
								className="group relative min-h-[13.5rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]"
							>
								<div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.06]" />
								<div className="absolute top-4 right-5 text-white/28 text-xs uppercase tracking-[0.26em]">
									0{index + 3}
								</div>
								<div className="relative flex h-full flex-col">
									<div className="mb-6">
										<p className="mb-3 text-[0.72rem] text-white/46 uppercase tracking-[0.28em]">
											{PROJECT_CATEGORY_LABELS[project.category][locale]}
										</p>
										<h4
											className="max-w-[14rem] text-3xl text-white leading-none"
											style={{
												fontFamily: "Heading Now Variable",
												fontVariationSettings: `'wght' 760, 'wdth' 860`,
											}}
										>
											{project.title}
										</h4>
									</div>

									<p className="max-w-[18rem] text-sm text-white/62 leading-relaxed">
										{project.short[locale]}
									</p>

									<div className="mt-auto flex items-end justify-between gap-4 pt-6">
										<div className="flex flex-wrap gap-2">
											{project.tags.slice(0, 2).map((tag) => (
												<Badge
													key={tag}
													className="rounded-full border border-white/10 bg-black/15 px-2.5 py-1 text-white/70"
												>
													{tag}
												</Badge>
											))}
										</div>
										<ArrowUpRight className="h-4 w-4 text-white/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
									</div>
								</div>
							</Link>
						))}
					</div>

					<Button
						asChild
						className="mt-8 h-12 rounded-full bg-white px-6 text-black hover:bg-white/90"
					>
						<Link href={workHref}>
							{copy.allCaseStudies}
							<ArrowRight className="h-4 w-4" />
						</Link>
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
