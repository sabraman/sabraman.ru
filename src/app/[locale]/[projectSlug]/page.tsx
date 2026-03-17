import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECT_PAGE_COMPONENTS } from "~/components/projects/pages";
import { resolveSupportedLocale } from "~/i18n/types";
import {
	getGenericCaseStudySlugs,
	getRelatedProjectsForSlug,
	getResolvedCaseStudyRecord,
} from "~/lib/projects/case-study-data";
import {
	getCaseStudyJsonLd,
	getCaseStudyMetadata,
} from "~/lib/projects/case-study-seo";
import { JsonLd } from "~/lib/seo/json-ld";

export async function generateStaticParams() {
	const projectSlugs = await getGenericCaseStudySlugs();

	return projectSlugs.map((projectSlug) => ({ projectSlug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; projectSlug: string }>;
}): Promise<Metadata> {
	const { locale, projectSlug } = await params;
	const lang = resolveSupportedLocale(locale);
	const record = await getResolvedCaseStudyRecord(projectSlug);

	if (!record) {
		return {
			title: "Project not found",
			robots: {
				index: false,
				follow: false,
			},
		};
	}

	if (record.routeKind !== "generic") {
		return {
			title: "Project moved",
			robots: {
				index: false,
				follow: false,
			},
		};
	}

	const metadata = await getCaseStudyMetadata(lang, projectSlug);

	if (!metadata) {
		return {
			title: "Project not found",
			robots: {
				index: false,
				follow: false,
			},
		};
	}

	return metadata;
}

export default async function ProjectCaseStudyPage({
	params,
}: {
	params: Promise<{ locale: string; projectSlug: string }>;
}) {
	const { locale, projectSlug } = await params;
	const lang = resolveSupportedLocale(locale);
	const record = await getResolvedCaseStudyRecord(projectSlug);

	if (!record || record.routeKind !== "generic") {
		notFound();
	}

	const PageComponent = PROJECT_PAGE_COMPONENTS[record.slug];

	if (!PageComponent) {
		notFound();
	}

	const [relatedProjects, jsonLd] = await Promise.all([
		getRelatedProjectsForSlug(record.slug),
		getCaseStudyJsonLd(lang, record.slug),
	]);

	if (!jsonLd) {
		notFound();
	}

	return (
		<>
			<JsonLd data={jsonLd} id={`${record.slug}-json-ld`} />
			<PageComponent
				locale={lang}
				project={record.project}
				caseStudy={record.caseStudy}
				relatedProjects={relatedProjects}
			/>
		</>
	);
}
