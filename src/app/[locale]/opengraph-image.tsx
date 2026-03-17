import {
	createPortfolioOgImageResponse,
	PORTFOLIO_SOCIAL_IMAGE_CONTENT_TYPE,
	PORTFOLIO_SOCIAL_IMAGE_SIZE,
} from "~/lib/seo/og-image";

export const alt = "Sabraman social preview";
export const size = PORTFOLIO_SOCIAL_IMAGE_SIZE;
export const contentType = PORTFOLIO_SOCIAL_IMAGE_CONTENT_TYPE;
export const runtime = "nodejs";

export default async function OpenGraphImage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	return createPortfolioOgImageResponse({
		title: "Sabraman",
		subtitle: locale === "ru" ? "Даня Юдин" : "Danya Yudin",
		variant: "site",
	});
}
