import { ChevronDownIcon, ListIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import { LegacyUiLocaleProvider } from "~/components/legacy/legacy-locale-context";
import { resolveSupportedLocale } from "~/i18n/types";
import { JsonLd } from "~/lib/seo/json-ld";
import { buildIndexableMetadata } from "~/lib/seo/metadata";
import { createTechArticleJsonLd } from "~/lib/seo/structured-data";

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
	const resolvedLocale = resolveSupportedLocale(locale);
	const doc = getComponentDocBySlug(slug);

	if (!doc) {
		return notFound();
	}

	const title = doc.frontmatter.title;
	const description = doc.frontmatter.description;

	return buildIndexableMetadata({
		locale: resolvedLocale,
		pathEn: getComponentDocPath(doc.slug, "en"),
		routeId: "componentDoc",
		slug: doc.slug,
		title,
		description,
		openGraphType: "article",
	});
}

export default async function ComponentDocPage({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}) {
	const { locale, slug } = await params;
	const doc = getComponentDocBySlug(slug);
	const resolvedLocale = resolveSupportedLocale(locale);

	if (!doc) {
		notFound();
	}

	const config = getComponentDocConfig(doc.slug);
	const neighbours = getComponentDocNeighbours(doc.slug);
	const sections = extractComponentDocSections(doc.content);

	return (
		<LegacyUiLocaleProvider locale={resolvedLocale}>
			<JsonLd
				data={createTechArticleJsonLd({
					description: doc.frontmatter.description,
					locale: resolvedLocale,
					path: getComponentDocPath(doc.slug, resolvedLocale),
					title: doc.frontmatter.title,
					keywords: [doc.frontmatter.kicker],
				})}
				id={`${doc.slug}-json-ld`}
			/>
			<main className="relative min-h-screen overflow-hidden bg-[#0d1117] pb-32 text-white selection:bg-white/20">
				<div className="legacy-components-doc-backdrop pointer-events-none absolute inset-0" />
				<div className="legacy-components-doc-overlay pointer-events-none absolute inset-0 opacity-90" />
				<div className="legacy-components-backdrop-vignette pointer-events-none absolute inset-0 opacity-90" />

				<div
					className={`${LEGACY_COMPONENT_PAGE_SHELL_CLASSNAME} relative z-[1] gap-10`}
				>
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
		</LegacyUiLocaleProvider>
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
