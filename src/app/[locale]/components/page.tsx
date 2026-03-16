import type { Metadata } from "next";
import { ComponentsHub } from "~/components/legacy/ComponentsHub";
import { getLocale } from "~/components/legacy/component-pages-content";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const isRussian = locale === "ru";
	const path = isRussian ? "/ru/components" : "/components";
	const title = "Components";
	const description =
		"A collection of reusable legacy skeuomorphic components.";

	return {
		title,
		description,
		alternates: {
			canonical: path,
			languages: {
				en: "/components",
				ru: "/ru/components",
				"x-default": "/components",
			},
		},
		openGraph: {
			title,
			description,
			url: `https://sabraman.ru${path}`,
			siteName: "Sabraman - Danya Yudin Portfolio",
			locale: isRussian ? "ru_RU" : "en_US",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
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
