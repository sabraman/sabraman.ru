import { SITE_URL } from "~/lib/site-config";

const CACHE_CONTROL = "public, s-maxage=3600, stale-while-revalidate=86400";

// NOTE: Next.js supports EITHER the typed `robots.ts` convention OR a manual
// `robots.txt/route.ts`, not both. We use the manual route so we can emit the
// non-standard `Content-Signal` directive (Content Signals for AI usage
// preferences). The rules below mirror the previous `robots.ts` byte-for-byte.
function buildRobotsTxt() {
	const lines = [
		"User-agent: *",
		"Allow: /",
		"Disallow: /api/",
		"Disallow: /trpc/",
		"",
		"User-agent: Yandex",
		"Allow: /",
		"Crawl-delay: 1",
		"",
		"User-agent: Googlebot",
		"Allow: /",
		"",
		"User-agent: Bingbot",
		"Allow: /",
		"",
		"User-agent: YandexBot",
		"Allow: /",
		"",
		"User-agent: GPTBot",
		"Allow: /",
		"",
		"User-agent: ClaudeBot",
		"Allow: /",
		"",
		"User-agent: PerplexityBot",
		"Allow: /",
		"",
		// Content Signals (https://contentsignals.org/) — AI content usage
		// preferences. Fully permissive: training, search, and agent input all
		// allowed, consistent with the explicit AI-bot allow rules above.
		"Content-Signal: ai-train=yes, search=yes, ai-input=yes",
		"",
		`Host: ${SITE_URL}`,
		`Sitemap: ${SITE_URL}/sitemap.xml`,
		"",
	];

	return lines.join("\n");
}

export function GET() {
	return new Response(buildRobotsTxt(), {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": CACHE_CONTROL,
		},
	});
}
