import {
	createPortfolioOgImageResponse,
	PORTFOLIO_SOCIAL_IMAGE_CONTENT_TYPE,
	PORTFOLIO_SOCIAL_IMAGE_SIZE,
} from "~/lib/seo/og-image";

export const alt = "Contact page social preview";
export const size = PORTFOLIO_SOCIAL_IMAGE_SIZE;
export const contentType = PORTFOLIO_SOCIAL_IMAGE_CONTENT_TYPE;

export default async function Image({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	return createPortfolioOgImageResponse({
		title: locale === "ru" ? "Контакты" : "Contact",
		subtitle:
			locale === "ru"
				? "Даня Юдин — дизайн и разработка"
				: "Danya Yudin — design and development",
		variant: "page",
	});
}
