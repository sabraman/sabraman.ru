import type { Metadata, MetadataRoute } from "next";
import {
	type ComponentDocSlug,
	getComponentDocPath,
} from "~/components/legacy/docs/component-doc-paths";
import {
	type ComponentDoc,
	type ComponentDocFrontmatter,
	getAllComponentDocs,
	getComponentDocBySlug,
} from "~/components/legacy/docs/component-documents";
import type { SupportedLocale } from "~/i18n/types";
import { buildIndexableMetadata } from "~/lib/seo/metadata";
import {
	createTechArticleJsonLd,
	type JsonLdObject,
} from "~/lib/seo/structured-data";

export type ComponentDocDiscoverabilityRecord = {
	changeFrequency: NonNullable<
		MetadataRoute.Sitemap[number]["changeFrequency"]
	>;
	description: string;
	keywords: ComponentDocFrontmatter["keywords"];
	pathEn: string;
	priority: number;
	publishedAt?: string;
	slug: ComponentDocSlug;
	title: string;
	updatedAt: string;
};

function toDiscoverabilityRecord(
	doc: ComponentDoc,
): ComponentDocDiscoverabilityRecord {
	return {
		changeFrequency: "monthly",
		description: doc.frontmatter.description,
		keywords: doc.frontmatter.keywords,
		pathEn: getComponentDocPath(doc.slug, "en"),
		priority: 0.72,
		slug: doc.slug,
		title: doc.frontmatter.title,
		updatedAt: doc.frontmatter.updatedAt,
	};
}

export function getAllComponentDocDiscoverabilityRecords() {
	return getAllComponentDocs().map(toDiscoverabilityRecord);
}

export function getComponentDocDiscoverabilityRecord(slug: string) {
	const doc = getComponentDocBySlug(slug);

	return doc ? toDiscoverabilityRecord(doc) : null;
}

export function getComponentDocMetadata(
	locale: SupportedLocale,
	slug: string,
): Metadata | null {
	const doc = getComponentDocBySlug(slug);

	if (!doc) {
		return null;
	}

	return buildIndexableMetadata({
		description: doc.frontmatter.description,
		keywords: doc.frontmatter.keywords,
		locale,
		openGraphType: "article",
		pathEn: getComponentDocPath(doc.slug, "en"),
		routeId: "componentDoc",
		slug: doc.slug,
		title: doc.frontmatter.title,
	});
}

export function getComponentDocJsonLd(
	locale: SupportedLocale,
	slug: string,
): JsonLdObject | null {
	const doc = getComponentDocBySlug(slug);

	if (!doc) {
		return null;
	}

	return createTechArticleJsonLd({
		dateModified: doc.frontmatter.updatedAt,
		description: doc.frontmatter.description,
		keywords: doc.frontmatter.keywords,
		locale,
		path: getComponentDocPath(doc.slug, locale),
		title: doc.frontmatter.title,
	});
}
