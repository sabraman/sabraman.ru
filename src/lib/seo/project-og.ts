import type { SupportedLocale } from "~/i18n/types";
import { getResolvedCaseStudyRecord } from "~/lib/projects/case-study-data";
import { createPortfolioOgImageResponse } from "./og-image";

export async function createProjectSocialImageResponse({
	locale,
	slug,
}: {
	locale: SupportedLocale;
	slug: string;
}) {
	const record = await getResolvedCaseStudyRecord(slug);

	if (!record) {
		return new Response("Not found", { status: 404 });
	}

	return createPortfolioOgImageResponse({
		title: record.caseStudy.seo.title[locale],
		subtitle: record.caseStudy.seo.ogSubtitle[locale] ?? record.project.title,
		variant: "project",
	});
}
