import { resolveSupportedLocale } from "~/i18n/types";
import { getResolvedCaseStudyRecord } from "~/lib/projects/case-study-data";
import {
	PORTFOLIO_SOCIAL_IMAGE_CONTENT_TYPE,
	PORTFOLIO_SOCIAL_IMAGE_SIZE,
} from "~/lib/seo/og-image";
import { createProjectSocialImageResponse } from "~/lib/seo/project-og";

export const alt = "Project case study social preview";
export const size = PORTFOLIO_SOCIAL_IMAGE_SIZE;
export const contentType = PORTFOLIO_SOCIAL_IMAGE_CONTENT_TYPE;

export default async function Image({
	params,
}: {
	params: Promise<{ locale: string; projectSlug: string }>;
}) {
	const { locale, projectSlug } = await params;
	const record = await getResolvedCaseStudyRecord(projectSlug);

	if (!record || record.routeKind !== "generic") {
		return new Response("Not found", { status: 404 });
	}

	return createProjectSocialImageResponse({
		locale: resolveSupportedLocale(locale),
		slug: record.slug,
	});
}
