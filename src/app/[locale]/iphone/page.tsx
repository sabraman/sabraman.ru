import type { Metadata } from "next";
import IOSContainer from "~/components/legacy/IOSContainer";
import { resolveSupportedLocale } from "~/i18n/types";
import { JsonLd } from "~/lib/seo/json-ld";
import { buildIndexableMetadata } from "~/lib/seo/metadata";
import { createWebPageJsonLd } from "~/lib/seo/structured-data";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const isRussian = resolvedLocale === "ru";
	const title = isRussian
		? "iPhone Portfolio - Даня Юдин"
		: "iPhone Portfolio - Danya Yudin";
	const description = isRussian
		? "Отдельная iPhone-версия портфолио с интерактивным интерфейсом."
		: "A separate iPhone-style portfolio experience with an interactive interface.";

	return buildIndexableMetadata({
		locale: resolvedLocale,
		pathEn: "/iphone",
		routeId: "iphone",
		title,
		description,
	});
}

export default async function IphonePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const path = resolvedLocale === "ru" ? "/ru/iphone" : "/iphone";
	const title =
		resolvedLocale === "ru"
			? "iPhone Portfolio"
			: "iPhone-style Portfolio Experience";
	const description =
		resolvedLocale === "ru"
			? "Интерактивная iPhone-версия портфолио Sabraman."
			: "An interactive iPhone-style version of the Sabraman portfolio.";

	return (
		<>
			<JsonLd
				data={createWebPageJsonLd({
					description,
					locale: resolvedLocale,
					name: title,
					path,
				})}
				id="iphone-json-ld"
			/>
			<IOSContainer locale={resolvedLocale} />
		</>
	);
}
