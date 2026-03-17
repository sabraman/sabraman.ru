import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
	getAllComponentDocs,
	getComponentDocBySlug,
} from "~/components/legacy/docs/component-documents";
import { ComponentDocOgPreview } from "~/components/legacy/docs/component-og-preview";
import { resolveSupportedLocale } from "~/i18n/types";
import { buildNoIndexMetadata } from "~/lib/seo/metadata";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
	const { locale, slug } = await params;
	const doc = getComponentDocBySlug(slug);

	if (!doc) {
		notFound();
	}

	return buildNoIndexMetadata({
		locale: resolveSupportedLocale(locale),
		pathEn: `/components/${doc.slug}/og-preview`,
	});
}

export function generateStaticParams() {
	return getAllComponentDocs().map((doc) => ({
		slug: doc.slug,
	}));
}

export default async function ComponentDocOgPreviewPage({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}) {
	const { slug } = await params;

	const doc = getComponentDocBySlug(slug);

	if (!doc) {
		notFound();
	}

	return <ComponentDocOgPreview slug={doc.slug} />;
}
