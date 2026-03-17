import type { Metadata } from "next";
import { ComponentsHub } from "~/components/legacy/ComponentsHub";
import { getLocale } from "~/components/legacy/component-pages-content";
import { resolveSupportedLocale } from "~/i18n/types";
import {
	getComponentDocIndexableContentEntries,
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
	const entry = getStaticIndexableContentEntry("components");

	if (!entry) {
		throw new Error("Missing registry entry for /components.");
	}

	return buildIndexableMetadata({
		description: entry.description[resolvedLocale],
		locale: resolvedLocale,
		pathEn: entry.pathEn,
		routeId: entry.routeId,
		title: entry.title[resolvedLocale],
	});
}

export default async function ComponentsPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const entry = getStaticIndexableContentEntry("components");
	const docs = getComponentDocIndexableContentEntries();
	const path = resolvedLocale === "ru" ? "/ru/components" : "/components";

	return (
		<>
			<JsonLd
				data={createCollectionPageJsonLd({
					items: docs.map((doc) => ({
						name: doc.title[resolvedLocale],
						path: resolvedLocale === "ru" ? `/ru${doc.pathEn}` : doc.pathEn,
					})),
					locale: resolvedLocale,
					name: entry?.title[resolvedLocale] ?? "Legacy components collection",
					path,
				})}
				id="components-json-ld"
			/>
			<ComponentsHub locale={getLocale(resolvedLocale)} />
		</>
	);
}
