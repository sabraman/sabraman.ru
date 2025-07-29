import type { Metadata } from "next";
import ContactPageClient from "~/components/ContactPageClient";

export const metadata: Metadata = {
	title: "Contact - Danya Yudin (Даня Юдин) - Sabraman",
	description:
		"Get in touch with Danya Yudin (Даня Юдин) - Sabraman. Creative Designer and Early-Stage Developer available for projects in visual design, branding, and application development.",
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
		title: "Contact - Danya Yudin (Даня Юдин) - Sabraman",
		description:
			"Get in touch with Danya Yudin (Даня Юдин) - Sabraman for creative design and development projects",
		url: "https://sabraman.ru/contact",
	},
};

export default function ContactPage() {
	return <ContactPageClient />;
}
