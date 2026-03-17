import {
	createPortfolioOgImageResponse,
	PORTFOLIO_SOCIAL_IMAGE_CONTENT_TYPE,
	PORTFOLIO_SOCIAL_IMAGE_SIZE,
} from "~/lib/seo/og-image";

export const runtime = "nodejs";
export const alt = "iPhone portfolio social preview";
export const size = PORTFOLIO_SOCIAL_IMAGE_SIZE;
export const contentType = PORTFOLIO_SOCIAL_IMAGE_CONTENT_TYPE;

export default async function Image({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	return createPortfolioOgImageResponse({
		title: locale === "ru" ? "iPhone-портфолио" : "iPhone Portfolio",
		subtitle:
			locale === "ru"
				? "Интерактивная версия портфолио Sabraman"
				: "Interactive Sabraman portfolio experience",
		variant: "page",
	});
}
