"use client";

import { ArrowUpRight, Camera, Film, Grid2x2, Star } from "lucide-react";
import { useLocale } from "next-intl";
import {
	getCaseStudyPath,
	PROJECT_CATEGORY_LABELS,
	PROJECTS,
} from "~/data/projects";
import { LEGACY_IOS_FONT_FAMILY } from "../ui/legacy-status-data";

const COPY = {
	en: {
		header: "Camera Roll",
		featured: "Featured Albums",
		library: "Project Library",
		open: "Open on web",
		statusLive: "Live",
		statusBuild: "In build",
	},
	ru: {
		header: "Фотопленка",
		featured: "Ключевые альбомы",
		library: "Библиотека проектов",
		open: "Открыть в вебе",
		statusLive: "Live",
		statusBuild: "В работе",
	},
} as const;

function projectGradient(index: number) {
	const gradients = [
		"from-[#4f7cff] via-[#7dd3fc] to-[#dbeafe]",
		"from-[#ff7b72] via-[#f59e0b] to-[#fde68a]",
		"from-[#2dd4bf] via-[#14b8a6] to-[#99f6e4]",
		"from-[#a78bfa] via-[#f472b6] to-[#fbcfe8]",
		"from-[#34d399] via-[#22c55e] to-[#dcfce7]",
	];

	return gradients[index % gradients.length];
}

export default function ProjectsApp() {
	const locale = useLocale() === "ru" ? "ru" : "en";
	const copy = COPY[locale];
	const featured = PROJECTS.filter((project) => project.isFeaturedWork);
	const library = PROJECTS.slice(0, 8);

	return (
		<div className="h-full overflow-y-auto bg-[#f6f7fb] text-black">
			<div className="sticky top-0 z-20 border-[#d2d8e3] border-b bg-[rgba(246,247,251,0.92)] px-4 pt-3 pb-3 backdrop-blur-md">
				<div className="flex items-center justify-between">
					<div>
						<p
							className="text-[#7b8797] text-[11px] uppercase tracking-[0.22em]"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
						>
							Photos
						</p>
						<h2
							className="mt-1 text-[#111827] text-[24px]"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
						>
							{copy.header}
						</h2>
					</div>
					<div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[linear-gradient(180deg,#ffffff_0%,#dfe7f5_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_3px_8px_rgba(104,120,151,0.18)]">
						<Camera className="h-5 w-5 text-[#55637a]" />
					</div>
				</div>
			</div>

			<section className="px-4 pt-4">
				<div className="mb-3 flex items-center gap-2">
					<Star className="h-4 w-4 text-[#f59e0b]" />
					<p
						className="text-[#6b7280] text-[12px] uppercase tracking-[0.22em]"
						style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
					>
						{copy.featured}
					</p>
				</div>

				<div className="flex gap-3 overflow-x-auto pb-2">
					{featured.map((project, index) => (
						<a
							href={getCaseStudyPath(locale, project.slug)}
							target="_blank"
							rel="noreferrer"
							key={project.slug}
							className={`group relative min-w-[228px] overflow-hidden rounded-[24px] bg-gradient-to-br ${projectGradient(index)} p-4 text-white shadow-[0_18px_40px_rgba(67,84,122,0.18)]`}
						>
							<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0)_30%,rgba(0,0,0,0.18)_100%)]" />
							<div className="relative z-10">
								<div className="mb-10 flex items-center justify-between gap-3">
									<span
										className="rounded-full bg-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.22em]"
										style={{
											fontFamily: LEGACY_IOS_FONT_FAMILY,
											fontWeight: 700,
										}}
									>
										{PROJECT_CATEGORY_LABELS[project.category][locale]}
									</span>
									<ArrowUpRight className="h-4 w-4 opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
								</div>
								<h3
									className="text-[22px] leading-[1.05]"
									style={{
										fontFamily: LEGACY_IOS_FONT_FAMILY,
										fontWeight: 700,
									}}
								>
									{project.title}
								</h3>
								<p
									className="mt-3 text-[14px] text-white/90 leading-[18px]"
									style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
								>
									{project.short[locale]}
								</p>
							</div>
						</a>
					))}
				</div>
			</section>

			<section className="px-4 pt-5 pb-6">
				<div className="mb-3 flex items-center gap-2">
					<Grid2x2 className="h-4 w-4 text-[#5b6575]" />
					<p
						className="text-[#6b7280] text-[12px] uppercase tracking-[0.22em]"
						style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
					>
						{copy.library}
					</p>
				</div>

				<div className="grid grid-cols-2 gap-3">
					{library.map((project, index) => (
						<a
							href={getCaseStudyPath(locale, project.slug)}
							target="_blank"
							rel="noreferrer"
							key={project.slug}
							className="group overflow-hidden rounded-[22px] bg-white shadow-[0_10px_24px_rgba(72,86,121,0.12)]"
						>
							<div
								className={`relative flex aspect-square items-end overflow-hidden bg-gradient-to-br p-3 text-white ${projectGradient(index + 2)}`}
							>
								<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent_55%)]" />
								<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0)_35%,rgba(0,0,0,0.18)_100%)]" />
								<div className="relative z-10">
									<p
										className="text-[11px] text-white/85 uppercase tracking-[0.2em]"
										style={{
											fontFamily: LEGACY_IOS_FONT_FAMILY,
											fontWeight: 700,
										}}
									>
										{project.status === "live"
											? copy.statusLive
											: copy.statusBuild}
									</p>
									<h3
										className="mt-1 text-[18px] leading-[1.05]"
										style={{
											fontFamily: LEGACY_IOS_FONT_FAMILY,
											fontWeight: 700,
										}}
									>
										{project.title}
									</h3>
								</div>
							</div>
							<div className="space-y-3 px-3 pt-3 pb-4">
								<p
									className="min-h-[54px] text-[#566170] text-[13px] leading-[17px]"
									style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
								>
									{project.details[locale]}
								</p>
								<div className="flex items-center justify-between">
									<div className="flex flex-wrap gap-1.5">
										{project.tags.slice(0, 2).map((tag) => (
											<span
												className="rounded-full bg-[#eef2f8] px-2 py-1 text-[#516071] text-[10px] uppercase tracking-[0.14em]"
												key={tag}
												style={{
													fontFamily: LEGACY_IOS_FONT_FAMILY,
													fontWeight: 700,
												}}
											>
												{tag}
											</span>
										))}
									</div>
									<div className="flex items-center gap-1 text-[#4f7cff]">
										<Film className="h-4 w-4" />
										<span
											className="text-[11px] uppercase tracking-[0.18em]"
											style={{
												fontFamily: LEGACY_IOS_FONT_FAMILY,
												fontWeight: 700,
											}}
										>
											{copy.open}
										</span>
									</div>
								</div>
							</div>
						</a>
					))}
				</div>
			</section>
		</div>
	);
}
