import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	// All locales that are supported
	locales: ["en", "ru"],

	// Used when no locale matches
	defaultLocale: "en",
});
