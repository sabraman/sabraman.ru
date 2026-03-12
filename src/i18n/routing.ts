import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	// All locales that are supported
	locales: ["en", "ru"],

	// Used when no locale matches
	defaultLocale: "en",

	// Keep default locale unprefixed for canonical SEO URLs
	localePrefix: "as-needed",

	// Avoid redirecting unprefixed default-locale URLs like `/` or `/components`
	// back to `/en/*`, which conflicts with canonical English routes.
	localeDetection: false,
});
