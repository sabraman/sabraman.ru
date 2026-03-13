import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { getTranslations } from "next-intl/server";
import VaparshopPageClient from "~/components/work/VaparshopPageClient";

async function getVaparshopJsonLd(locale: string) {
	"use cache";
	cacheLife("days");

	const isRussian = locale === "ru";
	const pagePath = isRussian ? "/ru/vaparshop" : "/vaparshop";

	return {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name: "VAPARSHOP Case Study",
		url: `https://sabraman.ru${pagePath}`,
		inLanguage: locale,
		author: {
			"@type": "Person",
			name: "Danya Yudin",
			url: "https://sabraman.ru",
		},
		about: [
			"Telegram Bot Development",
			"Web Application Development",
			"Automation",
			"UI/UX Design",
		],
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
	const path = isRussian ? "/ru/vaparshop" : "/vaparshop";
	const title = `${t("vaparshop.title")} - ${t("vaparshop.subtitle")} - Sabraman`;
	const description = t("vaparshop.description");

	return {
		title,
		description,
		alternates: {
			canonical: path,
			languages: {
				en: "/vaparshop",
				ru: "/ru/vaparshop",
				"x-default": "/vaparshop",
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

export default async function VaparshopPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const jsonLd = await getVaparshopJsonLd(locale);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<VaparshopPageClient />
		</>
	);
}
