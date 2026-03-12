import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { IOS_COMPONENT_PAGE_SHELL_CLASSNAME } from "~/components/ios/component-page-layout";
import { getComponentDocConfig } from "~/components/ios/docs/component-doc-config";
import { ComponentDocMdx } from "~/components/ios/docs/component-doc-mdx";
import {
	getComponentDocMarkdownUrl,
	getComponentDocPath,
} from "~/components/ios/docs/component-doc-paths";
import {
	getAllComponentDocs,
	getComponentDocBySlug,
	getComponentDocNeighbours,
} from "~/components/ios/docs/component-documents";
import { IosComponentPageToolbar } from "~/components/ios/IosComponentPageToolbar";

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

	return (
		<main className="relative min-h-screen bg-[#111419] pb-32 text-white selection:bg-white/20">
			<div
				className="pointer-events-none absolute inset-0 bg-[#161a22] opacity-80"
				style={PAGE_BACKGROUND_STYLE}
			/>

			<div className={IOS_COMPONENT_PAGE_SHELL_CLASSNAME}>
				<IosComponentPageToolbar
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

				<header className="space-y-6">
					<div className="inline-flex rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-4 py-1.5 font-semibold text-[#8ca8e8] text-[11px] uppercase tracking-[0.34em] shadow-[inset_0_1px_rgba(255,255,255,0.1)]">
						{doc.frontmatter.kicker}
					</div>
					<h1 className="font-medium text-5xl text-white tracking-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] md:text-6xl">
						{doc.frontmatter.title}
					</h1>
					<p className="max-w-2xl text-[#8b9bb4] text-lg leading-relaxed">
						{doc.frontmatter.description}
					</p>

					<div className="flex flex-wrap gap-4 pt-4">
						<a
							className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-medium text-sm text-white shadow-[inset_0_1px_rgba(255,255,255,0.2)] backdrop-blur-md transition hover:bg-white/20"
							href={config.registryDirectUrl}
							rel="noreferrer"
							target="_blank"
						>
							Registry item
							<ExternalLink className="h-4 w-4" />
						</a>
						<a
							className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-medium text-black text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] transition hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
							href={config.registryIndexUrl}
							rel="noreferrer"
							target="_blank"
						>
							Registry index
							<ExternalLink className="h-4 w-4" />
						</a>
					</div>
				</header>

				<section className="relative overflow-hidden rounded-[38px] border-[rgba(0,0,0,0.6)] border-[rgba(255,255,255,0.6)] border-t border-b bg-[linear-gradient(180deg,#dbe3ec_0%,#a8b3c4_100%)] p-8 shadow-[0_30px_60px_rgba(10,20,35,0.3),inset_0_1px_3px_rgba(255,255,255,1)] md:p-16">
					<div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-[0.03]" />
					{config.renderHeroPreview()}
				</section>

				<article className="pt-10 [&>*+*]:mt-8">
					<ComponentDocMdx code={doc.content} slug={doc.slug} />
				</article>
			</div>
		</main>
	);
}
