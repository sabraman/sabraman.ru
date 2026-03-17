"use client";

import {
	ArrowUpRight,
	Disc3,
	Headphones,
	ListMusic,
	Music2,
	Pause,
	Play,
	Radio,
} from "lucide-react";
import { getCaseStudyPath, PROJECTS } from "~/data/projects";
import { useLegacyUiLocale } from "../legacy-locale-context";
import { LEGACY_IOS_FONT_FAMILY } from "../ui/legacy-status-data";

const COPY = {
	en: {
		nowPlayingLabel: "Now Playing",
		nowPlayingTitle: "Current work loop",
		nowPlayingText:
			"Telegram products, brand systems, and interfaces tuned for daily use.",
		playlistsTitle: "Playlists",
		recentTitle: "Recently added",
	},
	ru: {
		nowPlayingLabel: "Сейчас играет",
		nowPlayingTitle: "Текущий рабочий цикл",
		nowPlayingText:
			"Telegram-продукты, бренд-системы и интерфейсы, рассчитанные на повседневное использование.",
		playlistsTitle: "Плейлисты",
		recentTitle: "Недавно добавлено",
	},
} as const;

const PLAYLISTS = {
	en: [
		{
			title: "Telegram Systems",
			meta: "6 tracks",
			gradient: "from-[#f97316] via-[#f59e0b] to-[#fde68a]",
		},
		{
			title: "Retail Brands",
			meta: "4 tracks",
			gradient: "from-[#2563eb] via-[#60a5fa] to-[#dbeafe]",
		},
		{
			title: "Internal Tools",
			meta: "5 tracks",
			gradient: "from-[#10b981] via-[#34d399] to-[#d1fae5]",
		},
	],
	ru: [
		{
			title: "Telegram Systems",
			meta: "6 треков",
			gradient: "from-[#f97316] via-[#f59e0b] to-[#fde68a]",
		},
		{
			title: "Retail Brands",
			meta: "4 трека",
			gradient: "from-[#2563eb] via-[#60a5fa] to-[#dbeafe]",
		},
		{
			title: "Internal Tools",
			meta: "5 треков",
			gradient: "from-[#10b981] via-[#34d399] to-[#d1fae5]",
		},
	],
} as const;

export default function MusicApp() {
	const locale = useLegacyUiLocale();
	const copy = COPY[locale];
	const playlists = PLAYLISTS[locale];
	const recentProjects = PROJECTS.slice(0, 4);

	return (
		<div className="h-full overflow-y-auto bg-[#12151d] px-4 pt-5 pb-10 text-white">
			<section className="overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#2c3445_0%,#0f1219_100%)] p-5 shadow-[0_16px_34px_rgba(0,0,0,0.38)]">
				<div className="flex items-start justify-between gap-4">
					<div>
						<p
							className="text-[11px] text-white/55 uppercase tracking-[0.24em]"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
						>
							{copy.nowPlayingLabel}
						</p>
						<p
							className="mt-2 text-[24px] text-white leading-[1.05]"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
						>
							{copy.nowPlayingTitle}
						</p>
						<p
							className="mt-3 max-w-[220px] text-[14px] text-white/72 leading-[19px]"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
						>
							{copy.nowPlayingText}
						</p>
					</div>
					<div className="flex h-[76px] w-[76px] items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,#ff8b5c_0%,#7c3aed_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.24)]">
						<Disc3 className="h-9 w-9 text-white" />
					</div>
				</div>

				<div className="mt-5">
					<div className="h-[4px] overflow-hidden rounded-full bg-white/12">
						<div className="h-full w-[54%] rounded-full bg-[linear-gradient(90deg,#ff8b5c_0%,#facc15_100%)]" />
					</div>
					<div className="mt-4 flex items-center justify-between">
						<div className="flex items-center gap-4">
							<button
								type="button"
								className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8"
								aria-label="Previous"
							>
								<Radio className="h-4 w-4 text-white/78" />
							</button>
							<button
								type="button"
								className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f1219]"
								aria-label="Pause"
							>
								<Pause className="h-5 w-5" />
							</button>
							<button
								type="button"
								className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8"
								aria-label="Play queue"
							>
								<Play className="h-4 w-4 text-white/78" />
							</button>
						</div>
						<Headphones className="h-5 w-5 text-white/54" />
					</div>
				</div>
			</section>

			<section className="mt-6">
				<p
					className="mb-2 px-1 text-[12px] text-white/45 uppercase tracking-[0.22em]"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
				>
					{copy.playlistsTitle}
				</p>
				<div className="flex gap-3 overflow-x-auto pb-2">
					{playlists.map((playlist) => (
						<div
							key={playlist.title}
							className={`min-w-[158px] rounded-[20px] bg-gradient-to-br ${playlist.gradient} p-4 text-[#111827] shadow-[0_12px_24px_rgba(0,0,0,0.22)]`}
						>
							<div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white/30">
								<ListMusic className="h-5 w-5" />
							</div>
							<p
								className="mt-10 text-[16px]"
								style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
							>
								{playlist.title}
							</p>
							<p
								className="mt-1 text-[#1f2937]/70 text-[12px]"
								style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
							>
								{playlist.meta}
							</p>
						</div>
					))}
				</div>
			</section>

			<section className="mt-6">
				<p
					className="mb-2 px-1 text-[12px] text-white/45 uppercase tracking-[0.22em]"
					style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
				>
					{copy.recentTitle}
				</p>
				<div className="overflow-hidden rounded-[18px] border border-white/8 bg-white/5 backdrop-blur-sm">
					{recentProjects.map((project, index) => {
						const rowClassName =
							index === recentProjects.length - 1
								? "flex items-center justify-between gap-3 px-4 py-4"
								: "flex items-center justify-between gap-3 border-b border-white/8 px-4 py-4";

						return (
							<a
								key={project.slug}
								href={getCaseStudyPath(locale, project.slug)}
								className={rowClassName}
							>
								<div className="flex min-w-0 items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-white/10">
										<Music2 className="h-4 w-4 text-white/80" />
									</div>
									<div className="min-w-0">
										<p
											className="truncate text-[15px] text-white"
											style={{
												fontFamily: LEGACY_IOS_FONT_FAMILY,
												fontWeight: 700,
											}}
										>
											{project.title}
										</p>
										<p
											className="truncate text-[12px] text-white/55"
											style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
										>
											{project.tags.slice(0, 2).join(" • ")}
										</p>
									</div>
								</div>
								<ArrowUpRight className="h-4 w-4 shrink-0 text-white/45" />
							</a>
						);
					})}
				</div>
			</section>
		</div>
	);
}
