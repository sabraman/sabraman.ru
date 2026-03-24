import "~/styles/globals.css";
import "~/styles/vendor/tw-animate.css";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ClientRoot } from "~/components/ui/ClientRoot";
import { FloatingDock } from "~/components/ui/FloatingDock";
import { HeaderBrand } from "~/components/ui/HeaderBrand";
import { LanguageSwitcher } from "~/components/ui/language-switcher";
import { SiteComplianceFooter } from "~/components/ui/SiteComplianceFooter";
import { SmoothMarquee } from "~/components/ui/SmoothMarquee";
import { Toaster } from "~/components/ui/sonner";
import { routing } from "~/i18n/routing";
import { resolveSupportedLocale } from "~/i18n/types";
import { JsonLd } from "~/lib/seo/json-ld";
import {
	buildLocalizedAlternates,
	getLocalizedAbsoluteUrl,
	getLocalizedSocialImagePath,
} from "~/lib/seo/metadata";
import {
	createPersonJsonLd,
	createWebsiteJsonLd,
} from "~/lib/seo/structured-data";
import {
	SITE_OWNER_NAME,
	SITE_TITLE,
	SITE_URL,
	SITE_URL_OBJECT,
} from "~/lib/site-config";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const isRussian = resolvedLocale === "ru";
	const title = isRussian
		? "Даня Юдин - Sabraman | Креативный дизайнер и разработчик"
		: "Danya Yudin (Даня Юдин) - Sabraman | Creative Designer & Frontend Developer";

	const description = isRussian
		? "Даня Юдин - Sabraman. Design-led frontend и product developer с сильной базой в визуальном дизайне, брендинге и разработке интерфейсов. Эксперт в Telegram-ботах, веб-приложениях и UI/UX дизайне. Базируется в Санкт-Петербурге, Россия."
		: "Danya Yudin (Даня Юдин) - Sabraman. Design-led frontend and product developer with a strong background in visual design, branding, and interface development. Expert in Telegram bots, web applications, and UI/UX design. Based in Saint Petersburg, Russia.";
	const socialImagePath =
		getLocalizedSocialImagePath(resolvedLocale, "home") ?? "/opengraph-image";

	return {
		title: {
			default: title,
			template: "%s | Danya Yudin - Sabraman",
		},
		description,
		keywords: [
			"sabraman",
			"danya yudin",
			"даня юдин",
			"картон",
			"creative designer",
			"developer",
			"telegram bot developer",
			"web designer",
			"UI/UX designer",
			"branding",
			"Saint Petersburg",
			"Russia",
			"vaparshop",
			"horny place",
			"next.js developer",
			"react developer",
		],
		authors: [{ name: SITE_OWNER_NAME, url: SITE_URL }],
		creator: SITE_OWNER_NAME,
		publisher: SITE_OWNER_NAME,
		applicationName: SITE_TITLE,
		appleWebApp: {
			capable: true,
			statusBarStyle: "default",
			title: "Sabraman",
		},
		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
		metadataBase: SITE_URL_OBJECT,
		alternates: buildLocalizedAlternates("/", resolvedLocale),
		openGraph: {
			type: "website",
			locale: isRussian ? "ru_RU" : "en_US",
			url: getLocalizedAbsoluteUrl(resolvedLocale, "/"),
			title,
			description,
			siteName: SITE_TITLE,
			images: [
				{
					url: socialImagePath,
					width: 1200,
					height: 630,
					alt: "Danya Yudin - Sabraman Portfolio",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [socialImagePath],
			creator: "@1sabraman",
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		verification: {
			google: "google9a037a0cda852d94",
			yandex: "yandex_9f4476abe564070b",
		},
		other: {
			"lava-verify": "cc4c90d6db6570a8",
			"mobile-web-app-capable": "yes",
			"msapplication-TileColor": "#1a1a1a",
		},
		icons: [
			{ rel: "icon", type: "image/x-icon", url: "/favicon.ico" },
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				url: "/favicon-16x16.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				url: "/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "48x48",
				url: "/favicon-48x48.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "57x57",
				url: "/apple-touch-icon-57x57.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "60x60",
				url: "/apple-touch-icon-60x60.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "72x72",
				url: "/apple-touch-icon-72x72.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "76x76",
				url: "/apple-touch-icon-76x76.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "114x114",
				url: "/apple-touch-icon-114x114.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "120x120",
				url: "/apple-touch-icon-120x120.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "144x144",
				url: "/apple-touch-icon-144x144.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "152x152",
				url: "/apple-touch-icon-152x152.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "167x167",
				url: "/apple-touch-icon-167x167.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				url: "/apple-touch-icon-180x180.png",
			},
		],
		manifest: "/site.webmanifest",
	};
}

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f6f6f6" },
		{ media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
	],
};

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const isProduction = process.env.NODE_ENV === "production";

	if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
		notFound();
	}

	return (
		<html lang={locale} className="dark" suppressHydrationWarning>
			<body className={jetbrainsMono.className}>
				<JsonLd
					id="site-structured-data"
					data={[createPersonJsonLd(), createWebsiteJsonLd()]}
				/>
				{isProduction ? (
					<Script id="yandex-metrica" strategy="afterInteractive">
						{`
							(function(m,e,t,r,i,k,a){
								m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
								m[i].l=1*new Date();
								for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
								k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
							})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=103523450', 'ym');

							ym(103523450, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
						`}
					</Script>
				) : null}
				<ClientRoot>
					{isProduction ? (
						<noscript>
							<div>
								{/* biome-ignore lint/performance/noImgElement: Yandex Metrica noscript requires a plain tracking image. */}
								<img
									src="https://mc.yandex.ru/watch/103523450"
									style={{ position: "absolute", left: "-9999px" }}
									alt=""
								/>
							</div>
						</noscript>
					) : null}
					<div className="fixed inset-x-0 top-4 z-50 px-4">
						<div className="mx-auto max-w-2xl">
							<div className="mx-6 flex items-center justify-between">
								<HeaderBrand locale={resolvedLocale} />
								<LanguageSwitcher locale={resolvedLocale} />
							</div>
						</div>
					</div>
					<SmoothMarquee locale={resolvedLocale} />
					<main className="pb-24">{children}</main>
					<SiteComplianceFooter locale={resolvedLocale} />
					<FloatingDock locale={resolvedLocale} />
					<Toaster />
				</ClientRoot>
			</body>
		</html>
	);
}
