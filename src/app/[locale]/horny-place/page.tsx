import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import {
	getHornyPlacePageCopy,
	getWorkCaseStudyMeta,
} from "~/components/work/get-work-copy";
import HornyPlacePageClient from "~/components/work/HornyPlacePageClient";
import { resolveSupportedLocale } from "~/i18n/types";
import { JsonLd } from "~/lib/seo/json-ld";
import { buildIndexableMetadata } from "~/lib/seo/metadata";
import { createCreativeWorkJsonLd } from "~/lib/seo/structured-data";

async function getHornyPlaceJsonLd(locale: string) {
	"use cache";
	cacheLife("days");

	const isRussian = locale === "ru";
	const pagePath = isRussian ? "/ru/horny-place" : "/horny-place";

	return createCreativeWorkJsonLd({
		locale: resolveSupportedLocale(locale),
		name: "HORNY PLACE Case Study",
		path: pagePath,
		about: ["Brand Identity", "Visual Design", "Web Development", "Retail UX"],
	});
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const meta = await getWorkCaseStudyMeta(resolvedLocale, "horny-place");

	return buildIndexableMetadata({
		locale: resolvedLocale,
		pathEn: "/horny-place",
		routeId: "hornyPlace",
		title: meta.title,
		description: meta.description,
		openGraphType: "article",
	});
}

export default async function HornyPlacePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const jsonLd = await getHornyPlaceJsonLd(locale);
	const copy = await getHornyPlacePageCopy(resolvedLocale);

	return (
		<>
			<JsonLd data={jsonLd} id="horny-place-json-ld" />
			<HornyPlacePageClient locale={resolvedLocale} copy={copy} />
		</>
	);
}
