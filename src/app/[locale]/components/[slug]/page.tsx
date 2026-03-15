import { ChevronDownIcon, ListIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { LEGACY_COMPONENT_PAGE_SHELL_CLASSNAME } from "~/components/legacy/component-page-layout";
import { getComponentDocConfig } from "~/components/legacy/docs/component-doc-config";
import { slugifyComponentDocHeading } from "~/components/legacy/docs/component-doc-headings";
import { ComponentDocMdx } from "~/components/legacy/docs/component-doc-mdx";
import {
	getComponentDocMarkdownUrl,
	getComponentDocPath,
} from "~/components/legacy/docs/component-doc-paths";
import { ComponentDocShowcase } from "~/components/legacy/docs/component-doc-showcase";
import {
	getAllComponentDocs,
	getComponentDocBySlug,
	getComponentDocNeighbours,
} from "~/components/legacy/docs/component-documents";
import { LegacyComponentPageToolbar } from "~/components/legacy/LegacyComponentPageToolbar";

const PAGE_BACKGROUND_STYLE = {
	backgroundImage:
		"repeating-linear-gradient(45deg, #11141a 25%, transparent 25%, transparent 75%, #11141a 75%, #11141a), repeating-linear-gradient(45deg, #11141a 25%, #161a22 25%, #161a22 75%, #11141a 75%, #11141a)",
	backgroundPosition: "0 0, 10px 10px",
	backgroundSize: "20px 20px",
} as const;

export function generateStaticParams() {
	return getAllComponentDocs().map((doc) => ({
		slug: doc.slug,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
	const { locale, slug } = await params;
	const doc = getComponentDocBySlug(slug);

	if (!doc) {
		return notFound();
	}

	const localizedPath = getComponentDocPath(doc.slug, locale);

	return {
		title: doc.frontmatter.title,
		description: doc.frontmatter.description,
		alternates: {
			canonical: localizedPath,
			languages: {
				en: getComponentDocPath(doc.slug, "en"),
				ru: getComponentDocPath(doc.slug, "ru"),
				"x-default": getComponentDocPath(doc.slug, "en"),
			},
		},
	};
}

export default async function ComponentDocPage({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}) {
	const { locale, slug } = await params;
	setRequestLocale(locale);

	const doc = getComponentDocBySlug(slug);

	if (!doc) {
		notFound();
	}

	const config = getComponentDocConfig(doc.slug);
	const neighbours = getComponentDocNeighbours(doc.slug);
	const sections = extractComponentDocSections(doc.content);

	return (
		<main className="relative min-h-screen bg-[#111419] pb-32 text-white selection:bg-white/20">
			<div
				className="pointer-events-none absolute inset-0 bg-[#161a22] opacity-80"
				style={PAGE_BACKGROUND_STYLE}
			/>

			<div className={`${LEGACY_COMPONENT_PAGE_SHELL_CLASSNAME} gap-10`}>
				<LegacyComponentPageToolbar
					markdownUrl={getComponentDocMarkdownUrl(doc.slug, locale)}
					nextHref={
						neighbours.next
							? getComponentDocPath(neighbours.next.slug, locale)
							: undefined
					}
					previousHref={
						neighbours.previous
							? getComponentDocPath(neighbours.previous.slug, locale)
							: undefined
					}
					title={doc.frontmatter.title}
				/>

				<section className="border-white/8 border-y">
					<div className="px-2 py-6 md:px-0">
						<h1 className="font-semibold text-[clamp(3rem,6vw,4.3rem)] text-white tracking-[-0.05em]">
							{doc.frontmatter.title}
						</h1>
					</div>

					<div className="border-white/8 border-t px-2 py-8 md:px-0">
						<p className="max-w-4xl text-[#9aa3b8] text-[clamp(1.15rem,2.2vw,1.45rem)] leading-relaxed">
							{doc.frontmatter.description}
						</p>
					</div>
				</section>

				{sections.length ? (
					<details className="group overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(30,32,39,0.94)_0%,rgba(18,20,25,0.98)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
						<summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-white">
							<span className="flex items-center gap-3">
								<ListIcon className="size-5 text-[#c8ccd8]" />
								<span className="font-semibold text-[1.65rem] tracking-[-0.03em]">
									On this page
								</span>
							</span>
							<ChevronDownIcon className="size-5 text-[#9aa3b8] transition group-open:rotate-180" />
						</summary>

						<div className="border-white/8 border-t px-6 py-5">
							<nav className="grid gap-3 sm:grid-cols-2">
								{sections.map((section) => (
									<a
										className="text-[#aeb7ca] text-lg transition hover:text-white"
										href={`#${section.id}`}
										key={section.id}
									>
										{section.title}
									</a>
								))}
							</nav>
						</div>
					</details>
				) : null}

				<ComponentDocShowcase name={config.featuredPreview} />

				<article className="[&>*+*]:mt-8">
					<ComponentDocMdx code={doc.content} slug={doc.slug} />
				</article>
			</div>
		</main>
	);
}

function extractComponentDocSections(content: string) {
	return content
		.split("\n")
		.filter((line) => line.startsWith("## "))
		.map((line) => line.replace(/^##\s+/, "").trim())
		.filter(Boolean)
		.map((title) => ({
			id: slugifyComponentDocHeading(title),
			title,
		}));
}
