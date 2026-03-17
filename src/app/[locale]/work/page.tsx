import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import WorkPageClient from "~/components/work/WorkPageClient";
import {
	PROJECT_CATALOG_GROUP_ORDER,
	PROJECTS,
	type ProjectCatalogGroupId,
} from "~/data/projects";
import { getLocalizedPathname } from "~/i18n/locale-paths";
import { resolveSupportedLocale } from "~/i18n/types";
import { JsonLd } from "~/lib/seo/json-ld";
import { buildIndexableMetadata } from "~/lib/seo/metadata";
import { createCollectionPageJsonLd } from "~/lib/seo/structured-data";

function getGroupedProjects(group: ProjectCatalogGroupId) {
	if (group === "featured") {
		return PROJECTS.filter((project) => project.isFeaturedWork);
	}

	return PROJECTS.filter(
		(project) => project.category === group && !project.isFeaturedWork,
	);
}

function getOrderedProjects() {
	return PROJECT_CATALOG_GROUP_ORDER.flatMap((group) =>
		getGroupedProjects(group),
	);
}

async function getWorkCollectionJsonLd(locale: string) {
	"use cache";
	cacheLife("days");

	const isRussian = locale === "ru";
	const pagePath = isRussian ? "/ru/work" : "/work";
	const orderedProjects = getOrderedProjects();

	return createCollectionPageJsonLd({
		locale: resolveSupportedLocale(locale),
		name: isRussian
			? "Хаб кейсов - Даня Юдин - Sabraman"
			: "Case Study Hub - Danya Yudin - Sabraman",
		path: pagePath,
		items: orderedProjects.map((project) => ({
			name: project.title,
			path: getLocalizedPathname(
				resolveSupportedLocale(locale),
				`/${project.slug}`,
			),
		})),
	});
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const isRussian = resolvedLocale === "ru";
	const title = isRussian
		? "Хаб кейсов - Даня Юдин - Sabraman"
		: "Case Study Hub - Danya Yudin (Даня Юдин) - Sabraman";
	const description = isRussian
		? "Полный индекс кейсов Дани Юдина (Sabraman): брендинг, Telegram mini apps, AI-поиск, web-платформы, инструменты и игровые продукты."
		: "Complete case-study index of Danya Yudin (Sabraman): branding, Telegram mini apps, AI search, web platforms, tools, and game products.";

	return buildIndexableMetadata({
		locale: resolvedLocale,
		pathEn: "/work",
		routeId: "work",
		title,
		description,
	});
}

export default async function WorkPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const jsonLd = await getWorkCollectionJsonLd(locale);

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
