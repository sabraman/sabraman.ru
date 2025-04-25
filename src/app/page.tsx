"use client";

import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { Separator } from "~/components/ui/separator";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import Link from "next/link";

export default function HomePage() {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Only show theme info after client-side hydration
	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div className="relative min-h-screen bg-background">
			{/* Hero Section */}
			<section className="flex min-h-[80vh] flex-col items-left justify-center px-4">
				<div className="relative flex flex-col items-center gap-6 text-left">
					<h1 className="font-mono text-6xl font-bold tracking-tight text-foreground">
						Danya Yudin
					</h1>
					<p className="max-w-[42rem] text-lg text-muted-foreground text-left">
						Creative Designer and Early-Stage Developer crafting minimal, functional, and intuitive digital experiences
					</p>
					<div className="flex items-center gap-4">
						<Button asChild variant="default">
							<Link href="/work">View Work</Link>
						</Button>
						<Button asChild variant="outline">
							<Link href="mailto:sabraman@ya.ru">Contact</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Skills Section */}
			<section className="mx-auto max-w-5xl px-4 py-24">
				<div className="mb-12">
					<h2 className="font-mono text-2xl font-semibold text-foreground">Skills & Expertise</h2>
					<div className="mt-8 flex flex-wrap gap-2">
						<Badge variant="outline">Visual Design</Badge>
						<Badge variant="outline">UI/UX</Badge>
						<Badge variant="outline">Next.js</Badge>
						<Badge variant="outline">React</Badge>
						<Badge variant="outline">TypeScript</Badge>
						<Badge variant="outline">Telegram Bots</Badge>
						<Badge variant="outline">Brand Identity</Badge>
						<Badge variant="outline">Web Development</Badge>
					</div>
				</div>

				{/* Featured Work Preview */}
				<div className="grid gap-6 md:grid-cols-2">
					<Card className="p-6">
						<h3 className="font-mono text-xl font-medium text-foreground">VAPARSHOP</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Developed Telegram bots and web applications improving operational efficiency
						</p>
						<Button asChild variant="ghost" className="mt-4">
							<Link href="/work">View Project →</Link>
						</Button>
					</Card>
					<Card className="p-6">
						<h3 className="font-mono text-xl font-medium text-foreground">HORNY PLACE</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Created comprehensive brand identity and interactive web solutions
						</p>
						<Button asChild variant="ghost" className="mt-4">
							<Link href="/work">View Project →</Link>
						</Button>
					</Card>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t py-8">
				<div className="mx-auto flex max-w-5xl items-center justify-between px-4">
					<p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Danya Yudin</p>
					<div className="flex gap-6">
						<Link href="https://t.me/sabraman" className="text-sm text-muted-foreground hover:text-foreground">
							Telegram
						</Link>
						<Link href="https://github.com/sabraman" className="text-sm text-muted-foreground hover:text-foreground">
							GitHub
						</Link>
						<Link href="https://instagram.com/sabraman" className="text-sm text-muted-foreground hover:text-foreground">
							Instagram
						</Link>
						<Link href="https://x.com/1sabraman" className="text-sm text-muted-foreground hover:text-foreground">
							X
						</Link>
						<Link href="https://vk.com/sabraman" className="text-sm text-muted-foreground hover:text-foreground">
							VK
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
