import { BLOG_POSTS, type BlogBlock, type BlogPost } from "~/data/blog";
import { renderComponentDocMarkdown } from "~/components/legacy/docs/component-doc-markdown";
import { getComponentDocBySlug } from "~/components/legacy/docs/component-documents";
import { getLocalizedPathname, stripLocalePrefix } from "~/i18n/locale-paths";
import type { SupportedLocale } from "~/i18n/types";
import { SITE_URL } from "~/lib/site-config";
import {
	getCaseStudyIndexableContentEntries,
	getComponentDocIndexableContentEntries,
	getStaticIndexableContentEntry,
} from "./content-registry";

export interface MarkdownForAgentsResult {
	body: string;
	tokens: number;
}

const FOOTER = `\n\n---\n_Source: ${SITE_URL} — markdown rendering for agents. HTML is the canonical version._`;

const STATIC_ROUTE_IDS = [
	"home",
	"work",
	"components",
	"blog",
	"iphone",
] as const;
type StaticRouteId = (typeof STATIC_ROUTE_IDS)[number];

/**
 * Resolve the locale for a request pathname. English is unprefixed
 * (localePrefix: "as-needed"); Russian lives under /ru. English /en is
 * accepted but normalized away (the canonical default-locale URLs are
 * unprefixed).
 */
function resolveLocaleFromPathname(pathname: string): SupportedLocale {
	if (pathname === "/ru" || pathname.startsWith("/ru/")) {
		return "ru";
	}
	return "en";
}

function estimateTokens(body: string) {
	return Math.max(1, Math.round(body.length / 4));
}

function linkList(items: { href: string; label: string }[]) {
	return items.map((item) => `- [${item.label}](${item.href})`).join("\n");
}

function buildStaticListMarkdown(
	routeId: StaticRouteId,
	locale: SupportedLocale,
): string | null {
	const entry = getStaticIndexableContentEntry(routeId);
	if (!entry) {
		return null;
	}

	const title = entry.title[locale];
	const description = entry.description[locale];

	let links: { href: string; label: string }[] = [];
	if (routeId === "home") {
		links = getCaseStudyIndexableContentEntries()
			.slice(0, 6)
			.map((c) => ({
				href: getLocalizedPathname(locale, c.pathEn),
				label: c.title[locale],
			}));
	} else if (routeId === "work") {
		links = getCaseStudyIndexableContentEntries().map((c) => ({
			href: getLocalizedPathname(locale, c.pathEn),
			label: c.title[locale],
		}));
	} else if (routeId === "components") {
		links = getComponentDocIndexableContentEntries().map((c) => ({
			href: getLocalizedPathname(locale, c.pathEn),
			label: c.title[locale],
		}));
	} else if (routeId === "blog") {
		links = BLOG_POSTS.map((post) => ({
			href: getLocalizedPathname(locale, `/blog/${post.slug}`),
			label: post.title[locale],
		}));
	}

	const intro =
		routeId === "iphone"
			? `_This route is an interactive iOS-style simulator experience. The summary below is provided for agents; the HTML version is required to see the full interface._`
			: "";

	const linksSection =
		links.length > 0
			? `\n\n## ${locale === "ru" ? "Содержание" : "Contents"}\n${linkList(links)}\n`
			: "\n";

	return `# ${title}\n\n${description}${intro ? `\n\n${intro}` : ""}${linksSection}`.trim();
}

function serializeBlogBlock(block: BlogBlock, locale: SupportedLocale): string {
	switch (block.type) {
		case "heading": {
			const prefix = block.level === 2 ? "## " : "### ";
			return `${prefix}${block.content[locale]}`;
		}
		case "paragraph":
			return block.content[locale];
		case "bullets":
			return block.items.map((item) => `- ${item[locale]}`).join("\n");
		case "quote":
			return block.author
				? `> ${block.content[locale]}\n> — ${block.author[locale]}`
				: `> ${block.content[locale]}`;
		case "callout":
			return `> **${block.kind}**: ${block.content[locale]}`;
		default:
			return "";
	}
}

function buildBlogPostMarkdown(
	post: BlogPost,
	locale: SupportedLocale,
): string {
	const title = post.title[locale];
	const summary = post.summary[locale];
	const body = post.blocks
		.map((block) => serializeBlogBlock(block, locale))
		.filter(Boolean)
		.join("\n\n");

	return `# ${title}\n\n${summary}\n\n${body}`.trim();
}

/**
 * Render a markdown representation of the given pathname for AI agents.
 * Returns null when the route has no meaningful markdown (e.g. purely visual
 * or unmapped routes), so the caller falls through to the default HTML.
 *
 * Note: this is a structured-data summary derived from existing content
 * registries and blog/component-doc sources — not a lossy HTML scrape.
 */
export async function renderMarkdownForAgents(
	pathname: string,
): Promise<MarkdownForAgentsResult | null> {
	const locale = resolveLocaleFromPathname(pathname);
	const basePath = stripLocalePrefix(pathname);

	// Static index routes
	const staticMap: Record<string, StaticRouteId> = {
		"/": "home",
		"/work": "work",
		"/components": "components",
		"/blog": "blog",
		"/iphone": "iphone",
	};
	const staticId = staticMap[basePath];
	if (staticId) {
		const body = buildStaticListMarkdown(staticId, locale);
		if (!body) {
			return null;
		}
		const full = `${body}${FOOTER}`;
		return { body: full, tokens: estimateTokens(full) };
	}

	// Blog post: /blog/{slug}
	if (basePath.startsWith("/blog/")) {
		const slug = basePath.slice("/blog/".length);
		const post = BLOG_POSTS.find((candidate) => candidate.slug === slug);
		if (!post) {
			return null;
		}
		const body = `${buildBlogPostMarkdown(post, locale)}${FOOTER}`;
		return { body, tokens: estimateTokens(body) };
	}

	// Component doc: /components/{slug}
	if (basePath.startsWith("/components/")) {
		const slug = basePath.slice("/components/".length);
		const doc = getComponentDocBySlug(slug);
		if (!doc) {
			return null;
		}
		const rendered = await renderComponentDocMarkdown(doc);
		const body = `${rendered}${FOOTER}`;
		return { body, tokens: estimateTokens(body) };
	}

	// Case study: canonical path like /vaparshop (from the content registry)
	const caseStudy = getCaseStudyIndexableContentEntries().find(
		(entry) => entry.pathEn === basePath,
	);
	if (caseStudy) {
		const title = caseStudy.title[locale];
		const description = caseStudy.description[locale];
		const backHref = getLocalizedPathname(locale, "/work");
		const backLabel = locale === "ru" ? "Все кейсы" : "All case studies";
		const body = `# ${title}\n\n${description}\n\n## ${locale === "ru" ? "Связанные материалы" : "Related"}\n- [${backLabel}](${backHref})${FOOTER}`;
		return { body, tokens: estimateTokens(body) };
	}

	// Unmapped route — no meaningful markdown; fall through to HTML.
	return null;
}
