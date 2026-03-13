import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { getTranslations } from "next-intl/server";
import PriceTagPrinterPageClient from "~/components/work/PriceTagPrinterPageClient";

async function getPriceTagPrinterJsonLd(locale: string) {
	"use cache";
	cacheLife("days");

	const isRussian = locale === "ru";
	const pagePath = isRussian ? "/ru/price-tag-printer" : "/price-tag-printer";

	return {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Price Tag Printer Case Study",
		url: `https://sabraman.ru${pagePath}`,
		inLanguage: locale,
		applicationCategory: "BusinessApplication",
		operatingSystem: "Web",
		author: {
			"@type": "Person",
			name: "Danya Yudin",
			url: "https://sabraman.ru",
		},
		about: [
			"Next.js Development",
			"Retail Automation",
			"PDF Generation",
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
	const path = isRussian ? "/ru/price-tag-printer" : "/price-tag-printer";
	const title = `${t("priceTagPrinter.title")} - ${t("priceTagPrinter.subtitle")} - Sabraman`;
	const description = t("priceTagPrinter.description");

	return {
		title,
		description,
		alternates: {
			canonical: path,
			languages: {
				en: "/price-tag-printer",
				ru: "/ru/price-tag-printer",
				"x-default": "/price-tag-printer",
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

export default async function PriceTagPrinterRoutePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const jsonLd = await getPriceTagPrinterJsonLd(locale);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<PriceTagPrinterPageClient />
		</>
	);
}
