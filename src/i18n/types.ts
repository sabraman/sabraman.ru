export const SUPPORTED_LOCALES = ["en", "ru"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function resolveSupportedLocale(locale: string): SupportedLocale {
	return locale === "ru" ? "ru" : "en";
}

export function isSupportedLocale(locale: string): locale is SupportedLocale {
	return locale === "en" || locale === "ru";
}
