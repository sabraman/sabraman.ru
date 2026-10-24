"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { getLocalizedPathname } from "~/i18n/locale-paths";
import type { SupportedLocale } from "~/i18n/types";
import { BLOG_POSTS, type BlogCategory } from "~/data/blog";

const CATEGORIES: ("All" | BlogCategory)[] = [
	"All",
	"SEO",
	"Architecture",
	"Engineering",
];

const LABELS = {
	en: {
		all: "All Posts",
		filter: "Filter by topic",
		empty: "No posts found in this category.",
		read: "Read post",
	},
	ru: {
		all: "Все статьи",
		filter: "Фильтр по темам",
		empty: "Нет статей в этой категории.",
		read: "Читать статью",
	},
} as const;

export default function BlogPageClient({
	locale,
	labels,
}: {
	locale: SupportedLocale;
	labels: {
		title: string;
		description: string;
	};
}) {
	const [selectedCategory, setSelectedCategory] = useState<
		"All" | BlogCategory
	>("All");
	const t = LABELS[locale];

	const filteredPosts = BLOG_POSTS.filter(
		(post) => selectedCategory === "All" || post.category === selectedCategory,
	);

	return (
		<main className="relative min-h-screen py-16 md:py-24">
			<div className="container mx-auto max-w-2xl px-4">
				<header className="mb-12 text-center md:text-left">
					<motion.h1
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="mb-4 font-extrabold text-5xl uppercase tracking-tight md:text-7xl"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 950, 'wdth' 860`,
						}}
					>
						{labels.title}
					</motion.h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="text-lg text-muted-foreground leading-relaxed"
					>
						{labels.description}
					</motion.p>
				</header>

				{/* Categories Filter Dock */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mb-10"
				>
					<span className="mb-3 block text-xs font-semibold text-muted-foreground uppercase tracking-widest">
						{t.filter}
					</span>
					<div className="flex flex-wrap gap-2">
						{CATEGORIES.map((cat) => {
							const isActive = selectedCategory === cat;
							return (
								<button
									key={cat}
									onClick={() => setSelectedCategory(cat)}
									className={`rounded-full px-4 py-2 text-xs uppercase tracking-wider transition-all duration-200 ${
										isActive
											? "bg-white text-black shadow-lg"
											: "border border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white/90"
									}`}
								>
									{cat === "All" ? t.all : cat}
								</button>
							);
						})}
					</div>
				</motion.div>

				{/* Posts Feed */}
				<div className="space-y-4">
					<AnimatePresence mode="popLayout">
						{filteredPosts.map((post, idx) => {
							const postHref = getLocalizedPathname(
								locale,
								`/blog/${post.slug}`,
							);
							return (
								<motion.article
									layout
									key={post.slug}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.95 }}
									transition={{ duration: 0.5, delay: idx * 0.05 }}
									className="group relative border-b border-white/10 py-6 last:border-b-0"
								>
									<div className="relative flex flex-col justify-between">
										<div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-white/50">
											<div className="flex items-center gap-1">
												<Calendar className="h-3.5 w-3.5" />
												<span>{post.publishedAt}</span>
											</div>
											<div className="flex items-center gap-1.5">
												<span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-[9px] font-bold text-accent ring-1 ring-accent/30">
													DY
												</span>
												<span className="font-medium text-white/70">
													Danya Yudin
												</span>
											</div>
											<div className="flex items-center gap-1">
												<Clock className="h-3.5 w-3.5" />
												<span>{post.readTime[locale]}</span>
											</div>
										</div>

										<Badge className="mb-4 w-fit rounded-full bg-accent/10 px-3 py-1 text-accent border border-accent/20">
											<Tag className="mr-1 h-3 w-3 inline" />
											{post.category}
										</Badge>

										<Link href={postHref}>
											<h2
												className="mb-3 font-extrabold text-2xl tracking-tight text-white transition-colors group-hover:text-accent md:text-3xl"
												style={{
													fontFamily: "Heading Now Variable",
													fontVariationSettings: `'wght' 840, 'wdth' 860`,
												}}
											>
												{post.title[locale]}
											</h2>
										</Link>

										<p className="mb-6 text-sm text-white/70 leading-relaxed">
											{post.summary[locale]}
										</p>

										<div className="mt-auto">
											<Link
												href={postHref}
												className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 uppercase tracking-widest transition-colors hover:text-white"
											>
												{t.read}
												<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
											</Link>
										</div>
									</div>
								</motion.article>
							);
						})}
					</AnimatePresence>

					{filteredPosts.length === 0 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-muted-foreground"
						>
							{t.empty}
						</motion.div>
					)}
				</div>
			</div>
		</main>
	);
}
