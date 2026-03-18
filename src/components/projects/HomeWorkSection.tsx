"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { HomeWorkSectionCopy } from "~/components/home/home-copy";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { getCaseStudyPath, PROJECTS, type ProjectItem } from "~/data/projects";
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
			"bg-[linear-gradient(145deg,rgba(8,8,10,0.98),rgba(14,14,18,0.97)_46%,rgba(6,6,8,0.99))]",
		topGlowClassName: "bg-white/4",
		bottomGlowClassName: "bg-white/3",
	},
	"horny-place": {
		surfaceClassName:
			"bg-[linear-gradient(145deg,rgba(8,8,10,0.98),rgba(14,14,18,0.97)_46%,rgba(6,6,8,0.99))]",
		topGlowClassName: "bg-white/4",
		bottomGlowClassName: "bg-white/3",
	},
};

function FeaturedProjectCard({
	locale,
	project,
}: {
	locale: SupportedLocale;
	project: ProjectItem;
}) {
	const href = getCaseStudyPath(locale, project.slug);
	const visual = FEATURED_VISUALS[project.slug];

	return (
		<motion.article
			initial={{ opacity: 0, y: 60 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.75,
				ease: [0.22, 1, 0.36, 1],
			}}
			viewport={{ once: true, amount: 0.25 }}
			className={cn(
				"group relative overflow-hidden rounded-[2rem] border border-white/10",
				visual?.surfaceClassName,
			)}
		>
			<div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.08]" />
			<div
				className={cn(
					"absolute -top-16 left-0 h-64 w-64 rounded-full blur-[115px]",
					visual?.topGlowClassName,
				)}
			/>
			<div
				className={cn(
					"absolute right-0 bottom-0 h-72 w-72 rounded-full blur-[125px]",
					visual?.bottomGlowClassName,
				)}
			/>
			<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_35%,rgba(255,255,255,0.02))]" />

			<Link
				href={href}
				className="relative flex h-full flex-col p-5 text-white"
			>
				<div className="absolute top-5 right-5">
					<ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
				</div>

				<div className="mt-2 max-w-xl">
					<h3
						className="text-3xl text-white leading-none md:text-4xl"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 870, 'wdth' 860`,
						}}
					>
						{project.title}
					</h3>
					<p className="mt-4 max-w-xl px-2 text-sm text-white/68 leading-relaxed md:text-base">
						{project.details[locale]}
					</p>
				</div>

				<div className="pt-6">
					<div className="flex flex-wrap gap-2">
						{project.tags.slice(0, 4).map((tag) => (
							<Badge
								key={tag}
								className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-white/82 backdrop-blur-sm"
							>
								{tag}
							</Badge>
						))}
					</div>
				</div>
			</Link>
		</motion.article>
	);
}

function ArchiveProjectRow({
	locale,
	project,
}: {
	locale: SupportedLocale;
	project: ProjectItem;
}) {
	const href = getCaseStudyPath(locale, project.slug);

	return (
		<motion.div
			initial={{ opacity: 0, y: 28 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.55,
				ease: [0.22, 1, 0.36, 1],
			}}
			viewport={{ once: true, amount: 0.15 }}
		>
			<Link
				href={href}
				className="group grid gap-4 border-white/10 border-t px-5 py-5 transition-colors duration-300 hover:bg-white/[0.035] md:grid-cols-[minmax(0,1fr)_auto] md:items-start"
			>
				<div className="min-w-0">
					<h4
						className="text-white text-xl leading-none transition-transform duration-300 group-hover:translate-x-1 md:text-2xl"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 760, 'wdth' 860`,
						}}
					>
						{project.title}
					</h4>
					<p className="mt-2 max-w-xl px-2 text-sm text-white/62 leading-relaxed">
						{project.short[locale]}
					</p>
					<div className="mt-4 flex flex-wrap items-center gap-2">
						{project.tags.slice(0, 3).map((tag) => (
							<Badge
								key={tag}
								className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-white/72"
							>
								{tag}
							</Badge>
						))}
					</div>
				</div>

				<div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:text-right">
					<ArrowUpRight className="h-4 w-4 flex-shrink-0 text-white/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
				</div>
			</Link>
		</motion.div>
	);
}

export function HomeWorkSection({
	copy,
	locale,
}: {
	copy: HomeWorkSectionCopy;
	locale: SupportedLocale;
}) {
	const workHref = getLocalizedPathname(locale, "/work");
	const featuredProjects = PROJECTS.filter((project) => project.isFeaturedWork);
	const archiveProjects = PROJECTS.filter((project) => !project.isFeaturedWork);

	return (
		<section id="projects" className="relative pt-7 pb-12 md:pt-16">
			<div className="mx-auto max-w-2xl px-4">
				<motion.div
					initial={{ opacity: 0, y: 70 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
					viewport={{ once: true }}
					className="pb-8"
				>
					<h2
						className="mx-6 font-extrabold text-4xl text-primary uppercase tracking-tight md:text-5xl"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 1000, 'wdth' 880`,
						}}
					>
						<span className="relative z-0 mr-4 inline-block md:mr-8">
							<span className="absolute -inset-1 bg-accent opacity-50 blur-sm" />
							{copy.title}
						</span>
						{copy.titleSecond}
					</h2>
				</motion.div>

				<div className="mt-2 grid gap-4">
					{featuredProjects.map((project) => (
						<FeaturedProjectCard
							key={project.id}
							locale={locale}
							project={project}
						/>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
					viewport={{ once: true, amount: 0.2 }}
					className="mt-5"
				>
					<div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] backdrop-blur-sm">
						<div>
							{archiveProjects.map((project) => (
								<ArchiveProjectRow
									key={project.id}
									locale={locale}
									project={project}
								/>
							))}
						</div>
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
