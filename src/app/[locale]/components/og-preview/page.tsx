import type { Metadata } from "next";
import { ComponentsHubOgPreview } from "~/components/legacy/docs/component-og-preview";
import { resolveSupportedLocale } from "~/i18n/types";
import { buildNoIndexMetadata } from "~/lib/seo/metadata";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return buildNoIndexMetadata({
		locale: resolveSupportedLocale(locale),
		pathEn: "/components/og-preview",
	});
}

export default async function ComponentsOgPreviewPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	await params;

	return <ComponentsHubOgPreview />;
}
