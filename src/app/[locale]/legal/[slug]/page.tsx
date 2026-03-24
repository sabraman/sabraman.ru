import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalInfoPage } from "~/components/legal/LegalInfoPage";
import { resolveSupportedLocale } from "~/i18n/types";
import {
	buildLegalPageMetadata,
	isLegalPageSlug,
	LEGAL_PAGE_SLUGS,
} from "~/lib/legal-pages";

export function generateStaticParams() {
	return LEGAL_PAGE_SLUGS.flatMap((slug) => [
		{ locale: "en", slug },
		{ locale: "ru", slug },
	]);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
	const { locale, slug } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);

	if (!isLegalPageSlug(slug)) {
		return {};
	}

	return buildLegalPageMetadata(resolvedLocale, slug);
}

export default async function LegalPage({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}) {
	const { locale, slug } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);

	if (!isLegalPageSlug(slug)) {
		notFound();
	}

	return <LegalInfoPage locale={resolvedLocale} slug={slug} />;
}
