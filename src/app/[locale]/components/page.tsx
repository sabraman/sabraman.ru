import type { Metadata } from "next";
import { ComponentsHub } from "~/components/legacy/ComponentsHub";
import { getLocale } from "~/components/legacy/component-pages-content";
import { getComponentDocPath } from "~/components/legacy/docs/component-doc-paths";
import { getAllComponentDocs } from "~/components/legacy/docs/component-documents";
import { resolveSupportedLocale } from "~/i18n/types";
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
	const title = "Components";
	const description =
		"A collection of reusable legacy skeuomorphic components.";

	return buildIndexableMetadata({
		locale: resolvedLocale,
		pathEn: "/components",
		routeId: "components",
		title,
		description,
	});
}

export default async function ComponentsPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const path = resolvedLocale === "ru" ? "/ru/components" : "/components";
	const docs = getAllComponentDocs();
	const collectionName =
		resolvedLocale === "ru"
			? "Коллекция legacy компонентов"
			: "Legacy components collection";

	return (
		<>
			<JsonLd
				data={createCollectionPageJsonLd({
					locale: resolvedLocale,
					name: collectionName,
					path,
					items: docs.map((doc) => ({
						name: doc.frontmatter.title,
						path: getComponentDocPath(doc.slug, resolvedLocale),
					})),
				})}
				id="components-json-ld"
			/>
			<ComponentsHub locale={getLocale(resolvedLocale)} />
		</>
	);
}
