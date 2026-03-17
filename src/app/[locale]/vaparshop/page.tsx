import type { Metadata } from "next";
import { getVaparshopPageCopy } from "~/components/work/get-work-copy";
import VaparshopPageClient from "~/components/work/VaparshopPageClient";
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
	const metadata = await getCaseStudyMetadata(resolvedLocale, "vaparshop", {
		routeKind: "dedicated",
	});

	if (!metadata) {
		throw new Error("Missing SEO metadata for vaparshop.");
	}

	return metadata;
}

export default async function VaparshopPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const [jsonLd, copy] = await Promise.all([
		getCaseStudyJsonLd(resolvedLocale, "vaparshop", {
			routeKind: "dedicated",
		}),
		getVaparshopPageCopy(resolvedLocale),
	]);

	return (
		<>
			{jsonLd ? <JsonLd data={jsonLd} id="vaparshop-json-ld" /> : null}
			<VaparshopPageClient locale={resolvedLocale} copy={copy} />
		</>
	);
}
