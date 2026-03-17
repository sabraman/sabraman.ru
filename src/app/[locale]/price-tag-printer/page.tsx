import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import {
	getPriceTagPrinterPageCopy,
	getWorkCaseStudyMeta,
} from "~/components/work/get-work-copy";
import PriceTagPrinterPageClient from "~/components/work/PriceTagPrinterPageClient";
import { resolveSupportedLocale } from "~/i18n/types";
import { JsonLd } from "~/lib/seo/json-ld";
import { buildIndexableMetadata } from "~/lib/seo/metadata";
import { createSoftwareApplicationJsonLd } from "~/lib/seo/structured-data";

async function getPriceTagPrinterJsonLd(locale: string) {
	"use cache";
	cacheLife("days");

	const isRussian = locale === "ru";
	const pagePath = isRussian ? "/ru/price-tag-printer" : "/price-tag-printer";

	return createSoftwareApplicationJsonLd({
		description: "Price Tag Printer Case Study",
		locale: resolveSupportedLocale(locale),
		name: "Price Tag Printer Case Study",
		path: pagePath,
		keywords: [
			"Next.js Development",
			"Retail Automation",
			"PDF Generation",
			"UI/UX Design",
		],
	});
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const meta = await getWorkCaseStudyMeta(resolvedLocale, "price-tag-printer");

	return buildIndexableMetadata({
		locale: resolvedLocale,
		pathEn: "/price-tag-printer",
		routeId: "priceTagPrinter",
		title: meta.title,
		description: meta.description,
		openGraphType: "article",
	});
}

export default async function PriceTagPrinterRoutePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const jsonLd = await getPriceTagPrinterJsonLd(locale);
	const copy = await getPriceTagPrinterPageCopy(resolvedLocale);

	return (
		<>
			<JsonLd data={jsonLd} id="price-tag-printer-json-ld" />
			<PriceTagPrinterPageClient locale={resolvedLocale} copy={copy} />
		</>
	);
}
