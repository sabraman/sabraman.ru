import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
	getAllComponentDocs,
	getComponentDocBySlug,
} from "~/components/legacy/docs/component-documents";
import { ComponentDocOgPreview } from "~/components/legacy/docs/component-og-preview";

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: false,
	},
};

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
	const { locale, slug } = await params;
	setRequestLocale(locale);

	const doc = getComponentDocBySlug(slug);

	if (!doc) {
		notFound();
	}

	return <ComponentDocOgPreview slug={doc.slug} />;
}
