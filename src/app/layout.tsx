import "~/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "~/lib/utils";
import { ThemeProvider } from "~/components/ThemeProvider";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import Link from "next/link";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Danya Yudin - Creative Designer & Developer",
	description: "Creative Designer and Early-Stage Developer crafting minimal, functional, and intuitive digital experiences",
	icons: [{ rel: "icon", url: "/logo.svg" }],
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f6f6f6" },
		{ media: "(prefers-color-scheme: dark)", color: "#1a1a1a" }
	]
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={jetbrainsMono.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
						<nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
							<Link href="/" className="text-lg font-medium">
								SABRAMAN
							</Link>
							<div className="flex items-center gap-6">
								<Link href="/work" className="text-sm text-muted-foreground hover:text-foreground">
									Work
								</Link>
								<ThemeToggle />
							</div>
						</nav>
					</header>
					<main className="pt-16">
						{children}
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
