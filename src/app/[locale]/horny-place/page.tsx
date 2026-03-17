import type { Metadata } from "next";
import { getHornyPlacePageCopy } from "~/components/work/get-work-copy";
import HornyPlacePageClient from "~/components/work/HornyPlacePageClient";
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
	const metadata = await getCaseStudyMetadata(resolvedLocale, "horny-place", {
		routeKind: "dedicated",
	});

	if (!metadata) {
		throw new Error("Missing SEO metadata for horny-place.");
	}

	return metadata;
}

export default async function HornyPlacePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const [jsonLd, copy] = await Promise.all([
		getCaseStudyJsonLd(resolvedLocale, "horny-place", {
			routeKind: "dedicated",
		}),
		getHornyPlacePageCopy(resolvedLocale),
	]);

	return (
		<>
			{jsonLd ? <JsonLd data={jsonLd} id="horny-place-json-ld" /> : null}
			<HornyPlacePageClient locale={resolvedLocale} copy={copy} />
		</>
	);
}
