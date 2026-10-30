import HomePage from "~/components/home/HomePage";
import { routing } from "~/i18n/routing";
import { resolveSupportedLocale } from "~/i18n/types";

export const instant = false;

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleHomePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	return <HomePage locale={resolveSupportedLocale(locale)} />;
}
