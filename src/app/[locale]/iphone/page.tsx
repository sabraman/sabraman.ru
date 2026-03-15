import type { Metadata } from "next";
import IOSContainer from "~/components/legacy/IOSContainer";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const isRussian = locale === "ru";
	const path = isRussian ? "/ru/iphone" : "/iphone";

	return {
		title: isRussian
			? "iPhone Portfolio - Даня Юдин"
			: "iPhone Portfolio - Danya Yudin",
		description: isRussian
			? "Отдельная iPhone-версия портфолио с интерактивным интерфейсом."
			: "A separate iPhone-style portfolio experience with an interactive interface.",
		alternates: {
			canonical: path,
			languages: {
				en: "/iphone",
				ru: "/ru/iphone",
				"x-default": "/iphone",
			},
		},
	};
}

export default function IphonePage() {
	return <IOSContainer />;
}
