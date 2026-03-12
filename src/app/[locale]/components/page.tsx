import type { Metadata } from "next";

import { ComponentsHub } from "~/components/ios/ComponentsHub";
import { getLocale } from "~/components/ios/component-pages-content";

export const metadata: Metadata = {
	title: "Components Gallery",
	description: `A collection of premium skeuomorphic UI components for React.`,
};

export default async function ComponentsPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	return <ComponentsHub locale={getLocale(locale)} />;
}
