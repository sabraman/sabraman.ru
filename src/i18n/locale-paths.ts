import type { SupportedLocale } from "./types";

function trimTrailingSlash(pathname: string) {
	if (pathname !== "/" && pathname.endsWith("/")) {
		return pathname.slice(0, -1);
	}

	return pathname;
}

export function stripLocalePrefix(pathname: string) {
	const normalizedPathname = trimTrailingSlash(pathname);

	if (normalizedPathname === "/ru" || normalizedPathname === "/en") {
		return "/";
	}

	if (normalizedPathname.startsWith("/ru/")) {
		return normalizedPathname.slice(3);
	}

	if (normalizedPathname.startsWith("/en/")) {
		return normalizedPathname.slice(3);
	}

	return normalizedPathname;
}

export function normalizeLocalizedPathname(pathname: string) {
	return trimTrailingSlash(pathname);
}

export function getLocalePrefix(locale: SupportedLocale): "" | "/ru" {
	return locale === "ru" ? "/ru" : "";
}

export function getLocalizedPathname(
	locale: SupportedLocale,
	pathname: string,
) {
	const basePathname = stripLocalePrefix(pathname);

	if (locale === "ru") {
		return basePathname === "/"
			? "/ru"
			: `${getLocalePrefix(locale)}${basePathname}`;
	}

	return basePathname;
}

export function getLocalizedHashPathname(
	locale: SupportedLocale,
	pathname: string,
	hash: string,
) {
	const normalizedHash = hash.startsWith("#") ? hash.slice(1) : hash;

	return `${getLocalizedPathname(locale, pathname)}#${normalizedHash}`;
}

export function isLocalizedRouteActive(pathname: string, href: string) {
	const normalizedPathname = stripLocalePrefix(pathname);
	const normalizedHref = stripLocalePrefix(href);

	if (normalizedHref === "/") {
		return normalizedPathname === "/";
	}

	return (
		normalizedPathname === normalizedHref ||
		normalizedPathname.startsWith(`${normalizedHref}/`)
	);
}
