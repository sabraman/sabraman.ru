import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactPageClient from "~/components/ContactPageClient";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });
	const isRussian = locale === "ru";

	const title = isRussian
		? "Контакты - Даня Юдин - Sabraman"
		: "Contact - Danya Yudin (Даня Юдин) - Sabraman";

	const description = isRussian
		? "Свяжитесь с Даня Юдин - Sabraman. Креативный дизайнер и разработчик на раннем этапе, доступный для проектов в области визуального дизайна, брендинга и разработки приложений."
		: "Get in touch with Danya Yudin (Даня Юдин) - Sabraman. Creative Designer and Early-Stage Developer available for projects in visual design, branding, and application development.";

	return {
		title,
		description,
		keywords: [
			"contact sabraman",
			"contact danya yudin",
			"contact даня юдин",
			"картон контакты",
			"hire creative designer",
			"hire developer",
			"telegram bot developer",
			"web designer contact",
		],
		openGraph: {
			title,
			description,
			url: `https://sabraman.ru${locale === "en" ? "" : `/${locale}`}/contact`,
		},
	};
}

export default function ContactPage() {
	return <ContactPageClient />;
}
