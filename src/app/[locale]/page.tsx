import HomePage from "~/components/home/HomePage";
import { resolveSupportedLocale } from "~/i18n/types";

export default async function LocaleHomePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	return <HomePage locale={resolveSupportedLocale(locale)} />;
}
