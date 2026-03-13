import type { Metadata } from "next";
import { ComponentsHub } from "~/components/ios/ComponentsHub";
import { getLocale } from "~/components/ios/component-pages-content";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const isRussian = locale === "ru";
	const path = isRussian ? "/ru/components" : "/components";

	return {
		title: "Components Gallery",
		description:
			"A collection of premium skeuomorphic UI components for React.",
		alternates: {
			canonical: path,
			languages: {
				en: "/components",
				ru: "/ru/components",
				"x-default": "/components",
			},
		},
	};
}

export default async function ComponentsPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	return <ComponentsHub locale={getLocale(locale)} />;
}
