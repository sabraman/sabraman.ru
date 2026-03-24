import type { SupportedLocale } from "~/i18n/types";

export const SITE_URL = "https://sabraman.ru";
export const SITE_URL_OBJECT = new URL(SITE_URL);
export const SITE_NAME = "Sabraman";
export const SITE_TITLE = "Sabraman - Danya Yudin Portfolio";
export const SITE_OWNER_NAME = "Danya Yudin";
export const SITE_OWNER_ALIASES = ["Даня Юдин", "Sabraman"] as const;
export const DEFAULT_LOCALE = "en" as const satisfies SupportedLocale;
export const SUPPORTED_LOCALES = [
	"en",
	"ru",
] as const satisfies readonly SupportedLocale[];
export const SITE_OWNER_ROLE = "Creative Designer & Frontend Developer";
export const SITE_LOCATION = {
	country: "RU",
	locality: "Saint Petersburg",
} as const;

export const SITE_SOCIAL_LINKS = {
	github: "https://github.com/sabraman",
	instagram: "https://instagram.com/sabraman",
	telegram: "https://t.me/sabraman",
	vk: "https://vk.com/sabraman",
	x: "https://x.com/1sabraman",
} as const;

export const SITE_LEGAL_PROFILE = {
	fullNameRu: "Юдин Данила Русланович",
	fullNameEn: "Danila Ruslanovich Yudin",
	status: {
		ru: "Самозанятый",
		en: "Self-employed",
	},
	inn: "780724792304",
	email: "sabraman@ya.ru",
	phone: "+7 996 785-90-26",
	phoneHref: "tel:+79967859026",
	telegram: "@sabraman",
	telegramHref: SITE_SOCIAL_LINKS.telegram,
	address: {
		ru: "Санкт-Петербург, ул. Садовая, 14",
		en: "14 Sadovaya St, Saint Petersburg, Russia",
	},
	baseRate: {
		ru: "от 1 200 ₽/час",
		en: "from 1,200 RUB/hour",
	},
} as const;

export function toAbsoluteSiteUrl(path: string) {
	return new URL(path, SITE_URL).toString();
}
