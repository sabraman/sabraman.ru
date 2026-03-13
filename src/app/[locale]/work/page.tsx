import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import WorkPageClient from "~/components/work/WorkPageClient";
import {
	PROJECT_CATALOG_GROUP_ORDER,
	PROJECTS,
	type ProjectCatalogGroupId,
} from "~/data/projects";

function withLocalePrefix(locale: string, path: string) {
	return locale === "ru" ? `/ru${path}` : path;
}

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

	return {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: isRussian
			? "Хаб кейсов - Даня Юдин - Sabraman"
			: "Case Study Hub - Danya Yudin - Sabraman",
		url: `https://sabraman.ru${pagePath}`,
		inLanguage: locale,
		mainEntity: {
			"@type": "ItemList",
			itemListElement: orderedProjects.map((project, index) => ({
				"@type": "ListItem",
				position: index + 1,
				url: `https://sabraman.ru${withLocalePrefix(locale, `/${project.slug}`)}`,
				name: project.title,
			})),
		},
	};
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const isRussian = locale === "ru";
	const path = isRussian ? "/ru/work" : "/work";
	const title = isRussian
		? "Хаб кейсов - Даня Юдин - Sabraman"
		: "Case Study Hub - Danya Yudin (Даня Юдин) - Sabraman";
	const description = isRussian
		? "Полный индекс кейсов Дани Юдина (Sabraman): брендинг, Telegram mini apps, AI-поиск, web-платформы, инструменты и игровые продукты."
		: "Complete case-study index of Danya Yudin (Sabraman): branding, Telegram mini apps, AI search, web platforms, tools, and game products.";

	return {
		title,
		description,
		alternates: {
			canonical: path,
			languages: {
				en: "/work",
				ru: "/ru/work",
				"x-default": "/work",
			},
		},
		openGraph: {
			title,
			description,
			url: `https://sabraman.ru${path}`,
			siteName: "Sabraman - Danya Yudin Portfolio",
			locale: isRussian ? "ru_RU" : "en_US",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [
				"/api/og?title=Case%20Study%20Hub&subtitle=All%20projects%20in%20one%20index",
			],
		},
	};
}

export default async function WorkPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const jsonLd = await getWorkCollectionJsonLd(locale);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<WorkPageClient />
		</>
	);
}
