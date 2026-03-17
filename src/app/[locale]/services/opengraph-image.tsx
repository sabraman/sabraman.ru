import {
	createPortfolioOgImageResponse,
	PORTFOLIO_SOCIAL_IMAGE_CONTENT_TYPE,
	PORTFOLIO_SOCIAL_IMAGE_SIZE,
} from "~/lib/seo/og-image";

export const alt = "Services page social preview";
export const size = PORTFOLIO_SOCIAL_IMAGE_SIZE;
export const contentType = PORTFOLIO_SOCIAL_IMAGE_CONTENT_TYPE;

export default async function Image({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	return createPortfolioOgImageResponse({
		title: locale === "ru" ? "Услуги" : "Services",
		subtitle:
			locale === "ru"
				? "Дизайн, Telegram-боты и веб-продукты"
				: "Design, Telegram bots, and web products",
		variant: "page",
	});
}
