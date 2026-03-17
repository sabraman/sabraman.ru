import { resolveSupportedLocale } from "~/i18n/types";
import {
	PORTFOLIO_SOCIAL_IMAGE_CONTENT_TYPE,
	PORTFOLIO_SOCIAL_IMAGE_SIZE,
} from "~/lib/seo/og-image";
import { createProjectSocialImageResponse } from "~/lib/seo/project-og";

export const alt = "Horny Place case study social preview";
export const size = PORTFOLIO_SOCIAL_IMAGE_SIZE;
export const contentType = PORTFOLIO_SOCIAL_IMAGE_CONTENT_TYPE;

export default async function Image({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	return createProjectSocialImageResponse({
		locale: resolveSupportedLocale(locale),
		slug: "horny-place",
	});
}
