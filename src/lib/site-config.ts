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
export const SITE_CONTACT_PATH = "/contact";
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

export function toAbsoluteSiteUrl(path: string) {
	return new URL(path, SITE_URL).toString();
}
