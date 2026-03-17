import type { MetadataRoute } from "next";
import { SITE_URL } from "~/lib/site-config";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/trpc/"],
			},
			{
				userAgent: "Yandex",
				allow: "/",
				crawlDelay: 1,
			},
			{
				userAgent: "Googlebot",
				allow: "/",
			},
			{
				userAgent: "Bingbot",
				allow: "/",
			},
			{
				userAgent: "YandexBot",
				allow: "/",
			},
			{
				userAgent: "GPTBot",
				allow: "/",
			},
			{
				userAgent: "ClaudeBot",
				allow: "/",
			},
			{
				userAgent: "PerplexityBot",
				allow: "/",
			},
		],
		host: SITE_URL,
		sitemap: `${SITE_URL}/sitemap.xml`,
	};
}
