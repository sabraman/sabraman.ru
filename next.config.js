/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
	reactCompiler: true,
	cacheComponents: true,
	transpilePackages: ["next-mdx-remote"],

	// SEO and Performance optimizations
	experimental: {
		webpackMemoryOptimizations: false,
		viewTransition: true,
		turbopackFileSystemCacheForBuild: true,
		optimizePackageImports: ["framer-motion", "lucide-react"],
	},

	// Image optimization
	images: {
		formats: ["image/webp", "image/avif"],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},

	// Headers for better SEO
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "Referrer-Policy",
						value: "origin-when-cross-origin",
					},
				],
			},
		];
	},

	// Redirects for SEO
	async redirects() {
		return [
			{
				source: "/home",
				destination: "/",
				permanent: true,
			},
			{
				source: "/esperansa-mini-app",
				destination: "/flower-mini-app",
				permanent: true,
			},
			{
				source: "/ru/esperansa-mini-app",
				destination: "/ru/flower-mini-app",
				permanent: true,
			},
			{
				source: "/work/esperansa-mini-app",
				destination: "/flower-mini-app",
				permanent: true,
			},
			{
				source: "/ru/work/esperansa-mini-app",
				destination: "/ru/flower-mini-app",
				permanent: true,
			},
			{
				source:
					"/work/:slug(vaparshop|horny-place|smo-tg-miniapp|smoky-market-loyalty-miniapp|plonq-ai-search|flower-mini-app|smbro|arch-taplink|vape-me-fast|price-tag-printer|psp-book-reader|florist-quiz|schrute-farm)",
				destination: "/:slug",
				permanent: true,
			},
			{
				source:
					"/ru/work/:slug(vaparshop|horny-place|smo-tg-miniapp|smoky-market-loyalty-miniapp|plonq-ai-search|flower-mini-app|smbro|arch-taplink|vape-me-fast|price-tag-printer|psp-book-reader|florist-quiz|schrute-farm)",
				destination: "/ru/:slug",
				permanent: true,
			},
		];
	},

	async rewrites() {
		return [
			{
				source: "/components/:slug.mdx",
				destination: "/api/component-docs/:slug",
			},
			{
				source: "/ru/components/:slug.mdx",
				destination: "/api/component-docs/:slug",
			},
		];
	},
};

export default config;
