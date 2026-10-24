"use client";

import { useEffect, useState } from "react";
import {
	ArrowLeft,
	Calendar,
	Clock,
	Quote,
	AlertCircle,
	CheckCircle,
	Info,
	Tag,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { getLocalizedPathname } from "~/i18n/locale-paths";
import type { SupportedLocale } from "~/i18n/types";
import { type BlogPost, type BlogBlock } from "~/data/blog";
import { TOCMinimap, type TOCItemType } from "~/components/toc-minimap";
import { CaseStudyCTA } from "~/components/projects/pages/CaseStudyPrimitives";

const LABELS = {
	en: {
		back: "Back to all posts",
		toc: "On this page",
	},
	ru: {
		back: "Назад ко всем статьям",
		toc: "Содержание",
	},
} as const;

export default function BlogPostPageClient({
	locale,
	post,
}: {
	locale: SupportedLocale;
	post: BlogPost;
}) {
	const t = LABELS[locale];
	const [scrollProgress, setScrollProgress] = useState(0);

	// Update reading progress bar on scroll
	useEffect(() => {
		const handleScroll = () => {
			const totalHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			if (totalHeight > 0) {
				const progress = (window.scrollY / totalHeight) * 100;
				setScrollProgress(progress);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Custom Block Renderer
	const renderBlock = (block: BlogBlock, index: number) => {
		switch (block.type) {
			case "paragraph":
				return (
					<p
						key={index}
						className="text-foreground/95 text-base md:text-[1.125rem] leading-relaxed mb-6 font-normal"
					>
						{block.content[locale]}
					</p>
				);

			case "heading": {
				const id = block.content[locale]
					.toLowerCase()
					.replace(/[^a-z0-9а-яё-]/g, "-");
				if (block.level === 2) {
					return (
						<h2
							key={index}
							id={id}
							className="mt-10 mb-5 font-extrabold text-2xl md:text-3xl tracking-tight text-white border-b border-white/5 pb-2"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 840, 'wdth' 860`,
							}}
						>
							{block.content[locale]}
						</h2>
					);
				}
				return (
					<h3
						key={index}
						id={id}
						className="mt-8 mb-4 font-bold text-xl md:text-2xl text-white/90"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 780, 'wdth' 860`,
						}}
					>
						{block.content[locale]}
					</h3>
				);
			}

			case "bullets":
				return (
					<ul key={index} className="list-none space-y-3 mb-6 pl-1">
						{block.items.map((bullet, i) => (
							<li
								key={i}
								className="flex items-start gap-2 text-foreground/90 text-sm md:text-base leading-relaxed"
							>
								<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
								<span>{bullet[locale]}</span>
							</li>
						))}
					</ul>
				);

			case "quote":
				return (
					<blockquote
						key={index}
						className="relative my-8 rounded-3xl border border-accent/10 bg-accent/[0.02] p-6 md:p-8"
					>
						<Quote className="absolute top-4 left-4 h-10 w-10 text-accent/10" />
						<p className="relative z-10 text-lg md:text-xl font-medium italic text-accent/90 leading-relaxed">
							“{block.content[locale]}”
						</p>
						{block.author && (
							<p className="mt-3 text-right text-xs text-white/60 font-semibold uppercase tracking-wider">
								— {block.author[locale]}
							</p>
						)}
					</blockquote>
				);

			case "callout": {
				const isSuccess = block.kind === "success";
				const isWarning = block.kind === "warning";
				const colorClass = isSuccess
					? "border-emerald-500/20 bg-emerald-500/[0.02] text-emerald-300"
					: isWarning
						? "border-amber-500/20 bg-amber-500/[0.02] text-amber-300"
						: "border-accent/20 bg-accent/[0.02] text-accent";

				const icon = isSuccess ? (
					<CheckCircle className="h-5 w-5 shrink-0 text-emerald-500" />
				) : isWarning ? (
					<AlertCircle className="h-5 w-5 shrink-0 text-amber-500" />
				) : (
					<Info className="h-5 w-5 shrink-0 text-accent" />
				);

				return (
					<div
						key={index}
						className={`my-8 flex gap-3.5 rounded-3xl border p-5 shadow-sm ${colorClass}`}
					>
						{icon}
						<p className="text-foreground/90 text-sm md:text-base leading-relaxed">
							{block.content[locale]}
						</p>
					</div>
				);
			}

			default:
				return null;
		}
	};

	const minimapItems: TOCItemType[] = post.blocks
		.filter(
			(block): block is Extract<BlogBlock, { type: "heading" }> =>
				block.type === "heading",
		)
		.map((block) => ({
			title: block.content[locale],
			url: `#${block.content[locale].toLowerCase().replace(/[^a-z0-9а-яё-]/g, "-")}`,
			depth: block.level,
		}));

	return (
		<main className="relative min-h-screen py-16 md:py-24">
			{/* Floating TOC Minimap on large viewports */}
			<TOCMinimap
				items={minimapItems}
				className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
			/>

			{/* Reading Progress Bar */}
			<div className="fixed top-0 left-0 z-50 h-1 bg-white/10 w-full">
				<div
					className="h-full bg-gradient-to-right from-accent to-emerald-500 transition-all duration-75"
					style={{ width: `${scrollProgress}%` }}
				/>
			</div>

			<div className="container mx-auto max-w-2xl px-4">
				{/* Back button */}
				<div className="mb-8">
					<Link
						href={getLocalizedPathname(locale, "/blog")}
						className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-semibold text-white/70 uppercase tracking-widest transition-all hover:border-white/20 hover:text-white"
					>
						<ArrowLeft className="h-4 w-4" />
						{t.back}
					</Link>
				</div>

				{/* Article Hero */}
				<header className="relative mb-8 py-4">
					<div className="relative">
						<div className="mb-4 flex flex-wrap items-center gap-3">
							<Badge className="rounded-full bg-accent/10 px-3 py-1 text-accent border border-accent/20">
								<Tag className="mr-1 h-3 w-3 inline" />
								{post.category}
							</Badge>
							<div className="flex items-center gap-1.5 text-xs text-white/50">
								<Calendar className="h-3.5 w-3.5" />
								<span>{post.publishedAt}</span>
							</div>
							<span className="text-white/20">•</span>
							<div className="flex items-center gap-1.5 text-xs text-white/50">
								<Clock className="h-3.5 w-3.5" />
								<span>{post.readTime[locale]}</span>
							</div>
						</div>

						<h1
							className="mb-6 font-extrabold text-4xl uppercase tracking-tight text-white md:text-5xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 950, 'wdth' 860`,
							}}
						>
							{post.title[locale]}
						</h1>

						<p className="text-lg text-white/72 leading-relaxed md:text-xl">
							{post.summary[locale]}
						</p>
					</div>
				</header>

				{/* Article Content */}
				<article>
					<div className="space-y-6">
						{post.blocks.map((block, idx) => renderBlock(block, idx))}

						{/* About the Author E-E-A-T section */}
						<div className="mt-12 border-t border-white/10 pt-10">
							<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 py-4">
								<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] shadow-sm">
									{/* biome-ignore lint/accessibility/noRedundantAlt: Logo represents the author brand */}
									<img
										src="/logo.svg"
										className="h-10 w-10 object-contain brightness-0 invert"
										alt="Sabraman Logo"
									/>
								</div>
								<div>
									<h4
										className="font-extrabold text-lg text-white"
										style={{
											fontFamily: "Heading Now Variable",
											fontVariationSettings: `'wght' 840, 'wdth' 860`,
										}}
									>
										Danya Yudin (Sabraman)
									</h4>
									<p className="mt-0.5 text-xs text-white/50">
										{locale === "ru"
											? "Дизайнер & Frontend Инженер"
											: "Designer & Frontend Engineer"}
									</p>
									<p className="mt-3 text-sm/relaxed text-white/70">
										{locale === "ru"
											? "Design-led frontend и product developer. Специализируется на веб-приложениях, дизайне интерфейсов и Telegram-системах."
											: "Design-led frontend and product developer specializing in web applications, interface design, and Telegram systems."}
									</p>
								</div>
							</div>
						</div>
					</div>
				</article>
			</div>

			<div className="mt-16">
				<CaseStudyCTA
					locale={locale}
					backHref={getLocalizedPathname(locale, "/blog")}
					backLabel={locale === "ru" ? "Назад в блог" : "Back to all posts"}
				/>
			</div>
		</main>
	);
}
