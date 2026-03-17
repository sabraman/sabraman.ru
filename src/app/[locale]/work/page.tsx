import type { Metadata } from "next";
import WorkPageClient from "~/components/work/WorkPageClient";
import { resolveSupportedLocale } from "~/i18n/types";
import {
	getCaseStudyIndexableContentEntries,
	getStaticIndexableContentEntry,
} from "~/lib/seo/content-registry";
import { JsonLd } from "~/lib/seo/json-ld";
import { buildIndexableMetadata } from "~/lib/seo/metadata";
import { createCollectionPageJsonLd } from "~/lib/seo/structured-data";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const entry = getStaticIndexableContentEntry("work");

	if (!entry) {
		throw new Error("Missing registry entry for /work.");
	}

	return buildIndexableMetadata({
		description: entry.description[resolvedLocale],
		locale: resolvedLocale,
		pathEn: entry.pathEn,
		routeId: entry.routeId,
		title: entry.title[resolvedLocale],
	});
}

export default async function WorkPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const entry = getStaticIndexableContentEntry("work");
	const caseStudies = getCaseStudyIndexableContentEntries();
	const jsonLd = createCollectionPageJsonLd({
		items: caseStudies.map((caseStudy) => ({
			name: caseStudy.title[resolvedLocale],
			path:
				resolvedLocale === "ru" ? `/ru${caseStudy.pathEn}` : caseStudy.pathEn,
		})),
		locale: resolvedLocale,
		name: entry?.title[resolvedLocale] ?? "Case studies",
		path: resolvedLocale === "ru" ? "/ru/work" : "/work",
	});

	return (
		<>
			<JsonLd data={jsonLd} id="work-json-ld" />
			<WorkPageClient
				locale={resolvedLocale}
				labels={{
					title: resolvedLocale === "ru" ? "Хаб кейсов" : "Case Study Hub",
					description:
						resolvedLocale === "ru"
							? "Полная коллекция кейсов и продуктовых запусков: брендинг, Telegram mini apps, AI-поиск, web-платформы, automation-инструменты и игровые продукты."
							: "A complete collection of case studies and product launches spanning branding, Telegram mini apps, AI search, web platforms, automation tools, and game products.",
					private: resolvedLocale === "ru" ? "Приватный" : "Private",
					public: resolvedLocale === "ru" ? "Публичный" : "Public",
					caseStudy: resolvedLocale === "ru" ? "Кейс" : "Case Study",
				}}
			/>
		</>
	);
}
