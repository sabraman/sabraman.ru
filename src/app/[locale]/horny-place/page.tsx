import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { getTranslations } from "next-intl/server";
import HornyPlacePageClient from "~/components/work/HornyPlacePageClient";

async function getHornyPlaceJsonLd(locale: string) {
	"use cache";
	cacheLife("days");

	const isRussian = locale === "ru";
	const pagePath = isRussian ? "/ru/horny-place" : "/horny-place";

	return {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name: "HORNY PLACE Case Study",
		url: `https://sabraman.ru${pagePath}`,
		inLanguage: locale,
		author: {
			"@type": "Person",
			name: "Danya Yudin",
			url: "https://sabraman.ru",
		},
		about: ["Brand Identity", "Visual Design", "Web Development", "Retail UX"],
		publisher: {
			"@type": "Person",
			name: "Danya Yudin",
		},
	};
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "work" });
	const isRussian = locale === "ru";
	const path = isRussian ? "/ru/horny-place" : "/horny-place";
	const title = `${t("hornyPlace.title")} - ${t("hornyPlace.subtitle")} - Sabraman`;
	const description = t("hornyPlace.description");

	return {
		title,
		description,
		alternates: {
			canonical: path,
			languages: {
				en: "/horny-place",
				ru: "/ru/horny-place",
				"x-default": "/horny-place",
			},
		},
		openGraph: {
			title,
			description,
			url: `https://sabraman.ru${path}`,
			siteName: "Sabraman - Danya Yudin Portfolio",
			locale: isRussian ? "ru_RU" : "en_US",
			type: "article",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: ["/api/og"],
		},
	};
}

export default async function HornyPlacePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const jsonLd = await getHornyPlaceJsonLd(locale);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<HornyPlacePageClient />
		</>
	);
}
