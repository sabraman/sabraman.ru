export const COMPONENT_DOC_SLUGS = [
	"ios-wheel-picker",
	"ios-clock",
	"ios-switch",
	"ios-slider",
	"ios-code-block-command",
] as const;

export type ComponentDocSlug = (typeof COMPONENT_DOC_SLUGS)[number];

export function isComponentDocSlug(value: string): value is ComponentDocSlug {
	return (COMPONENT_DOC_SLUGS as readonly string[]).includes(value);
}

export function resolveComponentDocSlug(
	value: string | undefined,
	fallback: ComponentDocSlug,
): ComponentDocSlug {
	return value && isComponentDocSlug(value) ? value : fallback;
}

export function getComponentDocPath(slug: ComponentDocSlug, locale: string) {
	const localePrefix = locale === "ru" ? "/ru" : "";

	return `${localePrefix}/components/${slug}`;
}

export function getComponentDocMarkdownUrl(
	slug: ComponentDocSlug,
	locale: string,
) {
	return `${getComponentDocPath(slug, locale)}.mdx`;
}
