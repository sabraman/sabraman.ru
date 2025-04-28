import "~/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "~/components/ThemeProvider";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import Link from "next/link";
import { ClientRoot } from "~/components/ui/ClientRoot";
import { SmoothMarquee } from "~/components/ui/SmoothMarquee";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Danya Yudin - Creative Designer & Developer",
	description:
		"Creative Designer and Early-Stage Developer crafting minimal, functional, and intuitive digital experiences",
	icons: [{ rel: "icon", url: "/logo.svg" }],
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
			<body className={jetbrainsMono.className}>
				<ClientRoot>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
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
