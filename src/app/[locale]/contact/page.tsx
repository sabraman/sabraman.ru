import type { Metadata } from "next";
import ContactPageClient from "~/components/ContactPageClient";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const isRussian = locale === "ru";
	const path = isRussian ? "/ru/contact" : "/contact";

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
		alternates: {
			canonical: path,
			languages: {
				en: "/contact",
				ru: "/ru/contact",
				"x-default": "/contact",
			},
		},
		openGraph: {
			title,
			description,
			url: `https://sabraman.ru${path}`,
			siteName: "Sabraman - Danya Yudin Portfolio",
			locale: isRussian ? "ru_RU" : "en_US",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: ["/api/og"],
		},
	};
}

export default function ContactPage() {
	return <ContactPageClient />;
}
