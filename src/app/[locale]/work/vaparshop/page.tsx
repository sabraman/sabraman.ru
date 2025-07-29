"use client";

import {
	AnimatePresence,
	motion,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import {
	ArrowLeft,
	Braces,
	Code,
	ExternalLink,
	LayoutGrid,
	MessageSquare,
	Smartphone,
	Tablet,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

export default function VaparshopPage() {
	const t = useTranslations("work");

	// Refs for scroll animations
	const containerRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const [isMounted, setIsMounted] = useState(false);
	const [hoveredProject, setHoveredProject] = useState<number | null>(null);
	const router = useRouter();

	// Scroll animations
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		damping: 50,
		stiffness: 400,
	});

	// Transform values based on scroll
	const headerOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
	const headerScale = useTransform(smoothProgress, [0, 0.1], [1, 0.8]);
	const headerY = useTransform(smoothProgress, [0, 0.1], [0, -100]);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Skip rendering until client-side hydration is complete
	if (!isMounted) {
		return null;
	}

	// Get achievements as an array
	const achievements = [
		t("vaparshop.achievements.0"),
		t("vaparshop.achievements.1"),
		t("vaparshop.achievements.2"),
		t("vaparshop.achievements.3"),
		t("vaparshop.achievements.4"),
		t("vaparshop.achievements.5"),
	];

	// Get tech stack as an array
	const techStack = [
		t("vaparshop.techStack.0"),
		t("vaparshop.techStack.1"),
		t("vaparshop.techStack.2"),
		t("vaparshop.techStack.3"),
		t("vaparshop.techStack.4"),
		t("vaparshop.techStack.5"),
	];

	// Project details for the scrolling gallery
	const projects = [
		{
			id: 1,
			title: t("vaparshop.projects.vaparWaToTgBot.title"),
			description: t("vaparshop.projects.vaparWaToTgBot.description"),
			image: "/work/vaparshop/bot1.jpg",
			tags: [
				t("vaparshop.projects.vaparWaToTgBot.tags.0"),
				t("vaparshop.projects.vaparWaToTgBot.tags.1"),
				t("vaparshop.projects.vaparWaToTgBot.tags.2"),
			],
		},
		{
			id: 2,
			title: t("vaparshop.projects.vaparScannerBot.title"),
			description: t("vaparshop.projects.vaparScannerBot.description"),
			image: "/work/vaparshop/bot2.jpg",
			tags: [
				t("vaparshop.projects.vaparScannerBot.tags.0"),
				t("vaparshop.projects.vaparScannerBot.tags.1"),
				t("vaparshop.projects.vaparScannerBot.tags.2"),
			],
		},
		{
			id: 3,
			title: t("vaparshop.projects.priceTagGenerator.title"),
			description: t("vaparshop.projects.priceTagGenerator.description"),
			image: "/work/vaparshop/price-tag.jpg",
			tags: [
				t("vaparshop.projects.priceTagGenerator.tags.0"),
				t("vaparshop.projects.priceTagGenerator.tags.1"),
				t("vaparshop.projects.priceTagGenerator.tags.2"),
			],
		},
		{
			id: 4,
			title: t("vaparshop.projects.telegramMiniApp.title"),
			description: t("vaparshop.projects.telegramMiniApp.description"),
			image: "/work/vaparshop/mini-app.jpg",
			tags: [
				t("vaparshop.projects.telegramMiniApp.tags.0"),
				t("vaparshop.projects.telegramMiniApp.tags.1"),
				t("vaparshop.projects.telegramMiniApp.tags.2"),
				t("vaparshop.projects.telegramMiniApp.tags.3"),
			],
		},
	];

	return (
		<div ref={containerRef} className="bg-background">
			{/* Hero Section with Parallax */}
			<div className="relative flex h-screen items-center justify-center overflow-hidden">
				{/* Background gradient animation */}
				<div className="absolute inset-0 bg-gradient-radial from-primary/5 via-background to-background" />

				<motion.div
					className="absolute inset-0 z-0"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.5 }}
				>
					{Array.from({ length: 50 }).map((_, i) => (
						<motion.div
							key={`particle-${i}-${Math.random().toString(36).substring(2, 7)}`}
							className="absolute rounded-full bg-primary/10"
							style={{
								width: Math.random() * 300 + 50,
								height: Math.random() * 300 + 50,
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								filter: "blur(50px)",
							}}
							animate={{
								x: [0, Math.random() * 100 - 50],
								y: [0, Math.random() * 100 - 50],
							}}
							transition={{
								duration: Math.random() * 10 + 10,
								repeat: Number.POSITIVE_INFINITY,
								repeatType: "reverse",
								ease: "easeInOut",
							}}
						/>
					))}
				</motion.div>

				{/* Header Content */}
				<motion.div
					ref={headerRef}
					className="container relative z-10 flex flex-col items-center px-4 text-center"
					style={{
						opacity: headerOpacity,
						scale: headerScale,
						y: headerY,
					}}
				>
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
						className="flex flex-col items-center"
					>
						<Badge
							variant="secondary"
							className="mb-6 rounded-full px-4 py-1.5 text-sm"
						>
							CASE STUDY
						</Badge>

						<h1
							className="mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text font-extrabold text-5xl text-transparent md:text-8xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 1000, 'wdth' 1000`,
							}}
						>
							{t("vaparshop.title")}
						</h1>

						<p className="mb-12 max-w-2xl text-muted-foreground text-xl md:text-3xl">
							{t("vaparshop.description")}
						</p>

						<div className="flex flex-wrap justify-center gap-4 md:gap-6">
							<Badge className="bg-accent px-3 py-1.5 text-accent-foreground text-base">
								Telegram Bots
							</Badge>
							<Badge className="bg-primary/20 px-3 py-1.5 text-base text-primary">
								Web Applications
							</Badge>
							<Badge className="bg-primary/20 px-3 py-1.5 text-base text-primary">
								Automation
							</Badge>
							<Badge className="bg-primary/20 px-3 py-1.5 text-base text-primary">
								UI/UX Design
							</Badge>
						</div>
					</motion.div>
				</motion.div>
			</div>

			{/* Overview Section */}
			<section className="py-20 md:py-32">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
						<motion.div
							className="top-20 self-start lg:sticky lg:col-span-5"
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: "easeOut" }}
							viewport={{ once: true }}
						>
							<h2
								className="mb-8 font-bold text-3xl md:text-4xl"
								style={{
									fontFamily: "Heading Now Variable",
									fontVariationSettings: `'wght' 800, 'wdth' 900`,
								}}
							>
								PROJECT OVERVIEW
							</h2>

							<div className="space-y-8">
								<div>
									<h3 className="mb-2 font-medium text-muted-foreground text-xl">
										TIMELINE
									</h3>
									<p className="text-2xl">{t("vaparshop.period")}</p>
								</div>

								<div>
									<h3 className="mb-2 font-medium text-muted-foreground text-xl">
										ROLE
									</h3>
									<p className="text-2xl">{t("vaparshop.subtitle")}</p>
								</div>

								<div>
									<h3 className="mb-2 font-medium text-muted-foreground text-xl">
										DELIVERABLES
									</h3>
									<ul className="space-y-2 text-xl">
										<li className="flex items-center gap-2">
											<MessageSquare className="h-5 w-5 text-accent" />
											<span>Telegram Bots</span>
										</li>
										<li className="flex items-center gap-2">
											<LayoutGrid className="h-5 w-5 text-accent" />
											<span>Web Applications</span>
										</li>
										<li className="flex items-center gap-2">
											<Smartphone className="h-5 w-5 text-accent" />
											<span>Telegram Mini App</span>
										</li>
										<li className="flex items-center gap-2">
											<Braces className="h-5 w-5 text-accent" />
											<span>Custom API Integrations</span>
										</li>
									</ul>
								</div>
							</div>
						</motion.div>

						<motion.div
							className="lg:col-span-7"
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
							viewport={{ once: true }}
						>
							<div className="prose prose-lg dark:prose-invert max-w-none">
								<p className="mb-8 text-xl leading-relaxed md:text-2xl">
									{t("vaparshop.solutionText")}
								</p>

								<h3 className="mb-4 font-bold text-2xl">
									{t("vaparshop.challenge")}
								</h3>
								<p className="mb-8 text-lg text-muted-foreground md:text-xl">
									{t("vaparshop.challengeText")}
								</p>

								<h3 className="mb-4 font-bold text-2xl">
									{t("vaparshop.solution")}
								</h3>
								<p className="mb-8 text-lg text-muted-foreground md:text-xl">
									{t("vaparshop.solutionText")}
								</p>

								<ul className="mb-8 space-y-6">
									<li className="flex gap-4">
										<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
											<MessageSquare className="h-5 w-5" />
										</div>
										<div>
											<h4 className="font-semibold text-xl">Telegram Bots</h4>
											<p className="text-muted-foreground">
												Automated data conversion and reporting between WhatsApp
												and Telegram, reducing manual work and improving
												accuracy.
											</p>
										</div>
									</li>

									<li className="flex gap-4">
										<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
											<Code className="h-5 w-5" />
										</div>
										<div>
											<h4 className="font-semibold text-xl">
												Web Applications
											</h4>
											<p className="text-muted-foreground">
												Created a Price Tag Generator to automate the creation
												of standardized price displays across all stores.
											</p>
										</div>
									</li>

									<li className="flex gap-4">
										<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
											<Tablet className="h-5 w-5" />
										</div>
										<div>
											<h4 className="font-semibold text-xl">
												Telegram Mini App
											</h4>
											<p className="text-muted-foreground">
												Developed a comprehensive application integrating with
												GetMeBack API for loyalty card management and advanced
												reporting.
											</p>
										</div>
									</li>
								</ul>

								<h3 className="mb-4 font-bold text-2xl">
									{t("vaparshop.results")}
								</h3>
								<div className="space-y-4">
									{achievements.map((achievement, index) => (
										<p
											key={`achievement-${achievement.substring(0, 20).replace(/\s+/g, "")}`}
											className="text-lg text-muted-foreground md:text-xl"
										>
											• {achievement}
										</p>
									))}
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Technologies Section */}
			<section className="bg-primary/5 py-20">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						viewport={{ once: true }}
						className="mb-16 text-center"
					>
						<h2
							className="mb-6 font-bold text-3xl md:text-5xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 800, 'wdth' 900`,
							}}
						>
							{t("vaparshop.technologies")}
						</h2>
						<p className="mx-auto max-w-3xl text-muted-foreground text-xl">
							{techStack.join(", ")}
						</p>
					</motion.div>

					<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
						{[
							{ name: "Next.js", icon: "/icons/nextjs.svg", delay: 0 },
							{ name: "React", icon: "/icons/react.svg", delay: 0.1 },
							{ name: "TypeScript", icon: "/icons/typescript.svg", delay: 0.2 },
							{ name: "tRPC", icon: "/icons/trpc.svg", delay: 0.3 },
							{ name: "Telegram API", icon: "/icons/telegram.svg", delay: 0.4 },
							{ name: "Node.js", icon: "/icons/nodejs.svg", delay: 0.5 },
						].map((tech) => (
							<motion.div
								key={tech.name}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: tech.delay }}
								viewport={{ once: true }}
								className="flex flex-col items-center rounded-lg border bg-card p-6 shadow-sm"
							>
								<div className="mb-4 flex h-20 w-20 items-center justify-center">
									{/* Placeholder for technology icons */}
									<div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
										<span className="font-bold text-2xl">
											{tech.name.charAt(0)}
										</span>
									</div>
								</div>
								<h3 className="font-medium text-lg">{tech.name}</h3>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Project Gallery */}
			<section className="py-20 md:py-32">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						viewport={{ once: true }}
						className="mb-16"
					>
						<h2
							className="mb-6 font-bold text-3xl md:text-5xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 800, 'wdth' 900`,
							}}
						>
							{t("vaparshop.showcase.title")}
						</h2>
						<p className="text-muted-foreground text-xl">
							{t("vaparshop.showcase.description")}
						</p>
					</motion.div>

					<div className="grid grid-cols-1 gap-10 md:grid-cols-2">
						{projects.map((project, index) => (
							<motion.div
								key={project.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="group relative overflow-hidden rounded-xl"
								onMouseEnter={() => setHoveredProject(project.id)}
								onMouseLeave={() => setHoveredProject(null)}
							>
								<div className="relative aspect-video overflow-hidden bg-primary/20">
									{/* Image placeholder - in a real project, use actual project images */}
									<div className="absolute inset-0 flex items-center justify-center bg-card">
										<div className="font-bold text-4xl text-primary/40">
											{project.title}
										</div>
									</div>

									{/* Hover overlay */}
									<motion.div
										className="absolute inset-0 flex items-center justify-center bg-accent/80 p-8"
										initial={{ opacity: 0 }}
										animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
										transition={{ duration: 0.3 }}
									>
										<div className="text-center text-accent-foreground">
											<h3 className="mb-4 font-bold text-2xl">
												{project.title}
											</h3>
											<p className="mb-6">{project.description}</p>
											<div className="flex flex-wrap justify-center gap-2">
												{project.tags.map((tag) => (
													<Badge
														key={tag}
														variant="secondary"
														className="bg-white/20 text-white"
													>
														{tag}
													</Badge>
												))}
											</div>
										</div>
									</motion.div>
								</div>

								<div className="p-6">
									<h3 className="mb-2 font-bold text-2xl transition-colors group-hover:text-accent">
										{project.title}
									</h3>
									<p className="text-muted-foreground">{project.description}</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Process Section with Horizontal Scroll (simplified for this example) */}
			<section className="border-y bg-card py-20">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						viewport={{ once: true }}
						className="mb-16"
					>
						<h2
							className="mb-6 font-bold text-3xl md:text-5xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 800, 'wdth' 900`,
							}}
						>
							{t("vaparshop.process.title")}
						</h2>
						<p className="text-muted-foreground text-xl">
							{t("vaparshop.process.description")}
						</p>
					</motion.div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-4">
						{[
							{
								phase: t("vaparshop.process.phases.research.title"),
								description: t("vaparshop.process.phases.research.description"),
								delay: 0,
							},
							{
								phase: t("vaparshop.process.phases.design.title"),
								description: t("vaparshop.process.phases.design.description"),
								delay: 0.1,
							},
							{
								phase: t("vaparshop.process.phases.development.title"),
								description: t(
									"vaparshop.process.phases.development.description",
								),
								delay: 0.2,
							},
							{
								phase: t("vaparshop.process.phases.deployment.title"),
								description: t(
									"vaparshop.process.phases.deployment.description",
								),
								delay: 0.3,
							},
						].map((phase, index) => (
							<motion.div
								key={phase.phase}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: phase.delay }}
								viewport={{ once: true }}
								className="rounded-xl border bg-background p-8"
							>
								<div className="mb-4 font-bold text-4xl text-accent/30">
									0{index + 1}
								</div>
								<h3 className="mb-4 font-bold text-xl">{phase.phase}</h3>
								<p className="text-muted-foreground">{phase.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 md:py-32">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						viewport={{ once: true }}
						className="mx-auto max-w-3xl text-center"
					>
						<h2
							className="mb-8 font-bold text-3xl md:text-5xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 800, 'wdth' 900`,
							}}
						>
							{t("vaparshop.cta.title")}
						</h2>
						<p className="mb-12 text-muted-foreground text-xl">
							{t("vaparshop.cta.description")}
						</p>

						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<Button
								size="lg"
								className="group rounded-full px-8 py-6 font-medium text-base"
								asChild
							>
								<Link href="/contact">
									<span>{t("vaparshop.cta.getInTouch")}</span>
									<ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-[4px] group-hover:translate-y-[-4px]" />
								</Link>
							</Button>

							<Button
								variant="outline"
								size="lg"
								className="group rounded-full px-8 py-6 font-medium text-base"
								asChild
							>
								<Link href="/">
									<ArrowLeft className="group-hover:-translate-x-1 mr-2 h-5 w-5 transition-transform" />
									<span>{t("vaparshop.cta.backToHome")}</span>
								</Link>
							</Button>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
