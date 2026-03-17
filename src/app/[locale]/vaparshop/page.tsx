import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import {
	getVaparshopPageCopy,
	getWorkCaseStudyMeta,
} from "~/components/work/get-work-copy";
import VaparshopPageClient from "~/components/work/VaparshopPageClient";
import { resolveSupportedLocale } from "~/i18n/types";
import { JsonLd } from "~/lib/seo/json-ld";
import { buildIndexableMetadata } from "~/lib/seo/metadata";
import { createCreativeWorkJsonLd } from "~/lib/seo/structured-data";

async function getVaparshopJsonLd(locale: string) {
	"use cache";
	cacheLife("days");

	const isRussian = locale === "ru";
	const pagePath = isRussian ? "/ru/vaparshop" : "/vaparshop";

	return createCreativeWorkJsonLd({
		locale: resolveSupportedLocale(locale),
		name: "VAPARSHOP Case Study",
		path: pagePath,
		about: [
			"Telegram Bot Development",
			"Web Application Development",
			"Automation",
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
	const meta = await getWorkCaseStudyMeta(resolvedLocale, "vaparshop");

	return buildIndexableMetadata({
		locale: resolvedLocale,
		pathEn: "/vaparshop",
		routeId: "vaparshop",
		title: meta.title,
		description: meta.description,
		openGraphType: "article",
	});
}

export default async function VaparshopPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const jsonLd = await getVaparshopJsonLd(locale);
	const copy = await getVaparshopPageCopy(resolvedLocale);

	return (
		<>
			<JsonLd data={jsonLd} id="vaparshop-json-ld" />
			<VaparshopPageClient locale={resolvedLocale} copy={copy} />
		</>
	);
}
