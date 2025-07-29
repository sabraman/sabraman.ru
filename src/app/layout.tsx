import "~/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "~/components/ThemeProvider";
import { ClientRoot } from "~/components/ui/ClientRoot";
import { SmoothMarquee } from "~/components/ui/SmoothMarquee";
import { ThemeToggle } from "~/components/ui/theme-toggle";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default:
			"Danya Yudin (Даня Юдин) - Sabraman | Creative Designer & Developer",
		template: "%s | Danya Yudin - Sabraman",
	},
	description:
		"Danya Yudin (Даня Юдин) - Sabraman. Creative Designer and Early-Stage Developer specializing in visual design, branding, and application development. Expert in Telegram bots, web applications, and UI/UX design. Based in Saint Petersburg, Russia.",
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
	authors: [{ name: "Danya Yudin", url: "https://sabraman.ru" }],
	creator: "Danya Yudin",
	publisher: "Danya Yudin",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://sabraman.ru"),
	alternates: {
		canonical: "/",
		languages: {
			"en-US": "/",
			"ru-RU": "/",
		},
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://sabraman.ru",
		title: "Danya Yudin (Даня Юдин) - Sabraman | Creative Designer & Developer",
		description:
			"Creative Designer and Early-Stage Developer specializing in visual design, branding, and application development. Expert in Telegram bots and web applications.",
		siteName: "Sabraman - Danya Yudin Portfolio",
		images: [
			{
				url: "/api/og",
				width: 1200,
				height: 630,
				alt: "Danya Yudin - Sabraman Portfolio",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Danya Yudin (Даня Юдин) - Sabraman | Creative Designer & Developer",
		description:
			"Creative Designer and Early-Stage Developer specializing in visual design, branding, and application development.",
		images: ["/api/og"],
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
		google: "your-google-verification-code",
		yandex: "your-yandex-verification-code",
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
	manifest: "/manifest.webmanifest",
};

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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{/* Structured Data for Person */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Person",
							name: "Danya Yudin",
							alternateName: ["Даня Юдин", "Sabraman"],
							url: "https://sabraman.ru",
							image: "https://sabraman.ru/logo.svg",
							sameAs: [
								"https://t.me/sabraman",
								"https://github.com/sabraman",
								"https://instagram.com/sabraman",
								"https://x.com/1sabraman",
								"https://vk.com/sabraman",
							],
							jobTitle: "Creative Designer & Early-Stage Developer",
							worksFor: {
								"@type": "Organization",
								name: "VAPARSHOP",
							},
							address: {
								"@type": "PostalAddress",
								addressLocality: "Saint Petersburg",
								addressCountry: "RU",
							},
							knowsAbout: [
								"Visual Design",
								"Branding",
								"Application Development",
								"Telegram Bots",
								"UI/UX Design",
								"Next.js",
								"React",
							],
						}),
					}}
				/>

				{/* Structured Data for Website */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "WebSite",
							name: "Sabraman - Danya Yudin Portfolio",
							url: "https://sabraman.ru",
							description:
								"Portfolio website of Danya Yudin (Даня Юдин), a Creative Designer and Early-Stage Developer",
							author: {
								"@type": "Person",
								name: "Danya Yudin",
							},
							potentialAction: {
								"@type": "SearchAction",
								target: "https://sabraman.ru/search?q={search_term_string}",
								"query-input": "required name=search_term_string",
							},
						}),
					}}
				/>
			</head>
			<body className={jetbrainsMono.className}>
				<ClientRoot>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{/* Additional favicon meta tags */}
						<meta name="mobile-web-app-capable" content="yes" />
						<meta
							name="application-name"
							content="Sabraman - Danya Yudin Portfolio"
						/>
						<meta name="apple-mobile-web-app-capable" content="yes" />
						<meta
							name="apple-mobile-web-app-status-bar-style"
							content="default"
						/>
						<meta name="apple-mobile-web-app-title" content="Sabraman" />
						<meta name="msapplication-TileColor" content="#1a1a1a" />

						<div className="fixed top-4 right-4 z-50 hidden">
							<ThemeToggle />
						</div>

						{/* Используем SmoothMarquee вместо CSS-анимации */}
						<SmoothMarquee />

						<main>{children}</main>
					</ThemeProvider>
				</ClientRoot>
			</body>
		</html>
	);
}
