// Re-export for backward compatibility
export { routing } from "./i18n/routing";
export const locales = ["en", "ru"] as const;
export type Locale = (typeof locales)[number];
