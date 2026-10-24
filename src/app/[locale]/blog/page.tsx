import type { Metadata } from "next";
import BlogPageClient from "~/components/blog/BlogPageClient";
import { resolveSupportedLocale } from "~/i18n/types";
import { getStaticIndexableContentEntry } from "~/lib/seo/content-registry";
import { buildIndexableMetadata } from "~/lib/seo/metadata";

export function generateStaticParams() {
	return [{ locale: "en" }, { locale: "ru" }];
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const entry = getStaticIndexableContentEntry("blog");

	if (!entry) {
		throw new Error("Missing registry entry for /blog.");
	}

	return buildIndexableMetadata({
		description: entry.description[resolvedLocale],
		locale: resolvedLocale,
		pathEn: entry.pathEn,
		routeId: entry.routeId,
		title: entry.title[resolvedLocale],
	});
}

export default async function BlogPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);

	const labels = {
		title: resolvedLocale === "ru" ? "Блог" : "Blog",
		description:
			resolvedLocale === "ru"
				? "Технические разборы, статьи о веб-разработке, E-E-A-T, AI-поиске и архитектурных решениях."
				: "Technical deep dives, articles on web development, E-E-A-T, AI search optimization, and architectural decisions.",
	};

	return <BlogPageClient locale={resolvedLocale} labels={labels} />;
}
