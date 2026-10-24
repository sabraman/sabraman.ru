import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPageClient from "~/components/blog/BlogPostPageClient";
import { BLOG_POSTS } from "~/data/blog";
import { getLocalizedPathname } from "~/i18n/locale-paths";
import { resolveSupportedLocale } from "~/i18n/types";
import { buildIndexableMetadata } from "~/lib/seo/metadata";
import { JsonLd } from "~/lib/seo/json-ld";
import {
	createBreadcrumbJsonLd,
	createTechArticleJsonLd,
	createWebPageJsonLd,
} from "~/lib/seo/structured-data";

export async function generateStaticParams() {
	const locales = ["en", "ru"];
	return locales.flatMap((locale) =>
		BLOG_POSTS.map((post) => ({
			locale,
			postSlug: post.slug,
		})),
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; postSlug: string }>;
}): Promise<Metadata> {
	const { locale, postSlug } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const post = BLOG_POSTS.find((p) => p.slug === postSlug);

	if (!post) {
		notFound();
	}

	return buildIndexableMetadata({
		description: post.seo.description[resolvedLocale],
		keywords: post.seo.keywords[resolvedLocale],
		locale: resolvedLocale,
		openGraphType: "article",
		pathEn: `/blog/${post.slug}`,
		routeId: "blogPost",
		slug: post.slug,
		title: post.seo.title[resolvedLocale],
	});
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ locale: string; postSlug: string }>;
}) {
	const { locale, postSlug } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const post = BLOG_POSTS.find((p) => p.slug === postSlug);

	if (!post) {
		notFound();
	}

	const path = `/blog/${post.slug}`;
	const title = post.seo.title[resolvedLocale];
	const description = post.seo.description[resolvedLocale];

	const webPageJsonLd = createWebPageJsonLd({
		description,
		locale: resolvedLocale,
		name: title,
		path,
	});

	const breadcrumbJsonLd = createBreadcrumbJsonLd({
		items: [
			{
				name: resolvedLocale === "ru" ? "Главная" : "Home",
				path: getLocalizedPathname(resolvedLocale, "/"),
			},
			{
				name: resolvedLocale === "ru" ? "Блог" : "Blog",
				path: getLocalizedPathname(resolvedLocale, "/blog"),
			},
			{
				name: post.title[resolvedLocale],
				path: getLocalizedPathname(resolvedLocale, path),
			},
		],
	});

	const articleJsonLd = createTechArticleJsonLd({
		dateModified: post.updatedAt,
		datePublished: post.publishedAt,
		description,
		keywords: post.seo.keywords[resolvedLocale],
		locale: resolvedLocale,
		path,
		title,
	});

	const jsonLds = [webPageJsonLd, breadcrumbJsonLd, articleJsonLd];

	return (
		<>
			{jsonLds.map((ld, i) => (
				<JsonLd key={i} data={ld} id={`blog-post-json-ld-${i}`} />
			))}
			<BlogPostPageClient locale={resolvedLocale} post={post} />
		</>
	);
}
