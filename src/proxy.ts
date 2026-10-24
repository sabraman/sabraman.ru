import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { renderMarkdownForAgents } from "./lib/seo/markdown-for-agents";

const intlMiddleware = createMiddleware(routing);

/**
 * Markdown for Agents: when a client sends `Accept: text/markdown`, return a
 * structured-data markdown rendering of the content route instead of HTML.
 * HTML remains the default for browsers and all other clients. The markdown
 * branch only short-circuits on an explicit markdown Accept, so normal
 * next-intl locale negotiation and redirects are unaffected.
 */
async function proxy(request: NextRequest) {
	const accept = request.headers.get("accept") ?? "";
	if (accept.includes("text/markdown")) {
		const result = await renderMarkdownForAgents(request.nextUrl.pathname);
		if (result) {
			return new NextResponse(result.body, {
				status: 200,
				headers: {
					"Content-Type": "text/markdown; charset=utf-8",
					"x-markdown-tokens": String(result.tokens),
					Vary: "Accept",
					"Cache-Control":
						"public, s-maxage=3600, stale-while-revalidate=86400",
				},
			});
		}
	}

	return intlMiddleware(request);
}

export default proxy;

export const config = {
	// Match only internationalized pathnames. `well-known` is excluded so the
	// /.well-known/* agent-discovery routes are served verbatim.
	matcher: "/((?!api|trpc|_next|_vercel|opengraph-image|well-known|.*\\..*).*)",
};
