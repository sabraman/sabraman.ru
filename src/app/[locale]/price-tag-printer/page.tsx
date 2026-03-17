import type { Metadata } from "next";
import { getPriceTagPrinterPageCopy } from "~/components/work/get-work-copy";
import PriceTagPrinterPageClient from "~/components/work/PriceTagPrinterPageClient";
import { resolveSupportedLocale } from "~/i18n/types";
import {
	getCaseStudyJsonLd,
	getCaseStudyMetadata,
} from "~/lib/projects/case-study-seo";
import { JsonLd } from "~/lib/seo/json-ld";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const metadata = await getCaseStudyMetadata(
		resolvedLocale,
		"price-tag-printer",
		{
			routeKind: "dedicated",
		},
	);

	if (!metadata) {
		throw new Error("Missing SEO metadata for price-tag-printer.");
	}

	return metadata;
}

export default async function PriceTagPrinterRoutePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const [jsonLd, copy] = await Promise.all([
		getCaseStudyJsonLd(resolvedLocale, "price-tag-printer", {
			routeKind: "dedicated",
		}),
		getPriceTagPrinterPageCopy(resolvedLocale),
	]);

	return (
		<>
			{jsonLd ? <JsonLd data={jsonLd} id="price-tag-printer-json-ld" /> : null}
			<PriceTagPrinterPageClient locale={resolvedLocale} copy={copy} />
		</>
	);
}
