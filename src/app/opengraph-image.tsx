import {
	createPortfolioOgImageResponse,
	PORTFOLIO_SOCIAL_IMAGE_CONTENT_TYPE,
	PORTFOLIO_SOCIAL_IMAGE_SIZE,
} from "~/lib/seo/og-image";

export const alt = "Sabraman social preview";
export const size = PORTFOLIO_SOCIAL_IMAGE_SIZE;
export const contentType = PORTFOLIO_SOCIAL_IMAGE_CONTENT_TYPE;
export const runtime = "nodejs";

export default async function OpenGraphImage() {
	return createPortfolioOgImageResponse({
		title: "Sabraman",
		subtitle: "Danya Yudin",
		variant: "site",
	});
}
