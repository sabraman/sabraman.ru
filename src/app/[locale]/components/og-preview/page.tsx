import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ComponentsHubOgPreview } from "~/components/legacy/docs/component-og-preview";

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: false,
	},
};

export default async function ComponentsOgPreviewPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	return <ComponentsHubOgPreview />;
}
