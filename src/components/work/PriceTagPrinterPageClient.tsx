"use client";

import {
	Code2,
	Database,
	FileDown,
	FileText,
	Layers,
	Palette,
	Server,
	Table,
	Terminal,
	Wand2,
	Workflow,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
	SiJest,
	SiNextdotjs,
	SiOpenapiinitiative,
	SiPuppeteer,
	SiReact,
	SiTailwindcss,
} from "react-icons/si";
import { Badge } from "~/components/ui/badge";

const CodeWindow = ({ code }: { code: string }) => {
	return (
		<div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#0d0d0d] font-mono shadow-2xl">
			<div className="flex items-center justify-between border-zinc-800 border-b bg-zinc-900/50 px-4 py-3">
				<div className="flex gap-2">
					<div className="h-3 w-3 rounded-full bg-red-500/80" />
					<div className="h-3 w-3 rounded-full bg-yellow-500/80" />
					<div className="h-3 w-3 rounded-full bg-green-500/80" />
				</div>
				<div className="text-xs text-zinc-500">api/generate-pdf • bash</div>
			</div>
			<div className="overflow-x-auto whitespace-pre p-4 text-sm text-zinc-300">
				{code}
			</div>
		</div>
	);
};

interface ArchNodeProps {
	icon: any;
	title: string;
	desc: string;
	delay: number;
	active?: boolean;
}

const ArchNode = ({
	icon: Icon,
	title,
	desc,
	delay,
	active = false,
}: ArchNodeProps) => (
	<motion.div
		initial={{ opacity: 0, y: 10 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true }}
		transition={{ delay, duration: 0.5 }}
		className={`relative z-10 flex flex-col items-center rounded-xl border ${
			active
				? "border-accent/50 bg-accent/10"
				: "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
		} p-6 text-center shadow-lg transition-colors`}
	>
		<div
			className={`mb-4 rounded-full p-4 ${
				active
					? "bg-accent/20 text-accent"
					: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
			}`}
		>
			<Icon className="h-6 w-6" />
		</div>
		<h4 className="mb-2 font-semibold">{title}</h4>
		<p className="max-w-[140px] text-xs text-zinc-500 leading-relaxed dark:text-zinc-400">
			{desc}
		</p>
	</motion.div>
);

const ShadcnIcon = ({ className }: { className?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 256 256"
		className={className}
	>
		<title>Shadcn UI</title>
		<rect width="256" height="256" fill="none" />
		<line
			x1="208"
			y1="128"
			x2="128"
			y2="208"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="32"
		/>
		<line
			x1="192"
			y1="40"
			x2="40"
			y2="192"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="32"
		/>
	</svg>
);

export default function PriceTagPrinterPageClient() {
	const t = useTranslations("work");
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	const apiCodeSnippet = `curl -X POST https://api.domain.com/v1/generate-pdf \\
  -H "Authorization: Bearer ds_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "themeId": "dark-monochrome",
    "paperSize": "A4",
    "items": [
      {
        "name": "Premium Beans",
        "price": 1499,
        "discountPrice": 999,
        "sku": "CF-102"
      }
    ]
  }'`;

	return (
		<div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-accent/30 dark:bg-zinc-950 dark:text-zinc-50">
			{/* TECH HERO */}
			<section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
				<div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

				<div className="container relative z-10 mx-auto px-4 md:px-8">
					<div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-8">
						<div className="max-w-2xl">
							<div className="mb-6 flex flex-wrap gap-3">
								<Badge className="border-none bg-zinc-900 px-3 py-1 font-semibold text-white text-xs uppercase tracking-widest hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900">
									REST API + SaaS
								</Badge>
								<Badge
									variant="outline"
									className="border-accent/40 bg-accent/10 px-3 py-1 text-accent dark:border-accent/40 dark:bg-accent/20"
								>
									Next.js App Router
								</Badge>
							</div>

							<h1
								className="mb-6 font-bold text-5xl leading-[1.1] tracking-tighter md:text-7xl"
								style={{
									fontFamily: "Heading Now Variable",
									fontVariationSettings: `'wght' 800, 'wdth' 900`,
								}}
							>
								{t("priceTagPrinter.title")}
							</h1>

							<p className="mb-8 max-w-xl text-xl text-zinc-600 leading-relaxed dark:text-zinc-400">
								{t("priceTagPrinter.solutionText")}
							</p>

							<div className="mb-8 flex flex-wrap items-center gap-6">
								<a
									href="https://print.sabraman.ru"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 font-medium text-sm text-white shadow transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50"
								>
									Visit Live Project
								</a>
								<div className="flex items-center gap-3">
									<Server className="h-5 w-5 text-accent" />
									<span className="font-mono text-sm">openapi v3.1</span>
								</div>
								<div className="flex items-center gap-3">
									<Terminal className="h-5 w-5 text-accent" />
									<span className="font-mono text-sm">headless puppeteer</span>
								</div>
							</div>
						</div>

						{/* Terminal API Mockup */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.7, delay: 0.2 }}
							className="w-full max-w-lg lg:ml-auto"
						>
							<CodeWindow code={apiCodeSnippet} />
						</motion.div>
					</div>
				</div>
			</section>

			{/* PIPELINE ARCHITECTURE */}
			<section className="border-zinc-200 border-y bg-white/50 py-24 dark:border-zinc-800/50 dark:bg-black/20">
				<div className="container mx-auto px-4 md:px-8">
					<div className="mx-auto mb-16 max-w-2xl text-center">
						<Badge
							variant="outline"
							className="mb-4 border-accent/30 bg-accent/10 text-accent"
						>
							System Architecture
						</Badge>
						<h2 className="mb-4 font-bold text-3xl">
							The Data-to-PDF Generation Pipeline
						</h2>
						<p className="text-zinc-500 dark:text-zinc-400">
							A highly resilient, serverless architecture that accepts data from
							external systems, evaluates logic through Zustand, and renders
							pixel-perfect PDFs bypassing browser print quirks.
						</p>
					</div>

					<div className="relative mx-auto max-w-5xl">
						{/* Animated connecting lines (Hidden on small screens for simplicity, visible on md+) */}
						{/* Aligning the top to ~48px (top-12) so it strikes squarely through the circular icons, not the text */}
						<div className="relative mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
							{/* Connecting line */}
							<div className="absolute top-12 left-0 hidden h-px w-full bg-white/5 md:block" />
							<motion.div
								className="absolute top-12 left-0 hidden h-px origin-left bg-[var(--accent)] md:block"
								initial={{ scaleX: 0 }}
								whileInView={{ scaleX: 1 }}
								viewport={{ once: true, margin: "-100px" }}
								transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
							/>

							{[
								{
									title: "Data Ingestion",
									icon: Database,
									desc: "Parses Excel (.xlsx) files or Google Sheets API directly into normalized models.",
								},
								{
									title: "State Engine",
									icon: Layers,
									desc: "3 Zustand stores (Items, Settings, Tags) with infinite undo/redo computing multi-tier discounts & CVA themes.",
								},
								{
									title: "Headless PDF",
									icon: FileText,
									desc: "Puppeteer executes in a Node environment to snapshot high-res PDFs via /api/generate-pdf.",
								},
							].map((node, i) => (
								<ArchNode key={i} {...node} delay={0.1 + i * 0.3} />
							))}
						</div>
					</div>
				</div>
			</section>

			{/* DEEP DIVES: GRID OF COMPLEXITY */}
			<section className="py-24 md:py-32">
				<div className="container mx-auto px-4 md:px-8">
					<div className="mb-16">
						<h2 className="mb-4 font-bold text-3xl">Core Systems</h2>
						<p className="max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
							Delving into the complex sub-systems that power the generator.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
						{/* Multi-Tier Pricing */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900/50"
						>
							<div className="relative z-10 mb-6 flex items-center gap-4">
								<div className="rounded-lg bg-accent/10 p-3 text-accent">
									<Table className="h-6 w-6" />
								</div>
								<h3 className="font-semibold text-2xl">
									Multi-Tier Pricing Engine
								</h3>
							</div>
							<p className="relative z-10 mb-8 text-zinc-600 leading-relaxed dark:text-zinc-400">
								A complex rule engine that computes volume-based discounts on
								the fly. Automatically evaluating standard vs. wholesale
								brackets (e.g., "Price for 2", "Price from 3") and applying
								localized formatting before injecting into the Zustand store.
							</p>

							{/* Visual Placeholder / Code Demo */}
							<div className="relative z-10 mt-auto rounded-xl border border-zinc-100 bg-zinc-50 p-4 font-mono text-xs shadow-inner transition-colors group-hover:border-accent/30 dark:border-zinc-800/80 dark:bg-zinc-950">
								<div className="mb-2 flex justify-between border-zinc-200 border-b pb-2 text-zinc-500 dark:border-zinc-800">
									<span>Qty</span>
									<span>Calculation</span>
									<span>Final</span>
								</div>
								<div className="flex justify-between py-1">
									<span>1x</span>
									<span className="text-zinc-400">base_price</span>
									<span>$12.99</span>
								</div>
								<div className="flex justify-between py-1 text-accent">
									<span>3x</span>
									<span className="text-zinc-400">apply_tier(tier_3)</span>
									<span>$9.99/ea</span>
								</div>
							</div>
							{/* Background glow placeholder */}
							<div className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-accent/5 blur-3xl transition-all group-hover:bg-accent/10" />
						</motion.div>

						{/* Unified Theme System */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900/50"
						>
							<div className="relative z-10 mb-6 flex items-center gap-4">
								<div className="rounded-lg bg-accent/10 p-3 text-accent">
									<Palette className="h-6 w-6" />
								</div>
								<h3 className="font-semibold text-2xl">
									CVA Theme Architecture
								</h3>
							</div>
							<p className="relative z-10 mb-8 text-zinc-600 leading-relaxed dark:text-zinc-400">
								17 pre-configured palettes managed via a centralized Class
								Variance Authority (CVA) system. Ensures contrast ratios remain
								optimal across Light, Dark, and Monochrome variants universally
								in web previews, Telegram bot outputs, and Print.
							</p>

							{/* Visual element */}
							<div className="relative z-10 mt-auto flex h-20 gap-3">
								<div className="flex flex-1 items-center justify-center rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 font-mono text-xs text-zinc-500 shadow-inner transition-transform group-hover:-translate-y-1 dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900">
									Light
								</div>
								<div className="flex flex-1 items-center justify-center rounded-xl border border-zinc-700 bg-gradient-to-br from-zinc-800 to-black font-mono text-xs text-zinc-400 shadow-inner transition-transform delay-75 group-hover:-translate-y-2">
									Dark
								</div>
								<div className="flex flex-1 items-center justify-center rounded-xl border border-accent/40 bg-gradient-to-br from-accent/20 to-accent/40 font-mono text-accent text-xs shadow-inner transition-transform delay-150 group-hover:-translate-y-3">
									Brand
								</div>
							</div>
							<div className="pointer-events-none absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
						</motion.div>

						{/* LLM Pipeline */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border bg-black/50 p-6"
						>
							<div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
							<div>
								<div className="mb-4 flex items-center gap-3">
									<div className="rounded-lg bg-[var(--accent)]/10 p-2 text-[var(--accent)]">
										<Wand2 className="h-5 w-5" />
									</div>
									<h3 className="font-bold text-xl tracking-tight">
										LLM Content Pipeline
									</h3>
								</div>
								<p className="max-w-sm text-neutral-400 text-sm leading-relaxed">
									Integrated language models instantly generate natural product
									descriptions directly onto the canvas. The payload captures
									product attributes and contextual data, returning
									hyper-optimized copy that strictly fits physical print
									dimensions.
								</p>
							</div>

							<div className="relative mt-6 flex-1 overflow-hidden rounded-lg border border-white/5 bg-black p-4 font-mono text-xs">
								<div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent" />
								<motion.div
									className="space-y-1 text-neutral-500"
									initial={{ opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.2 }}
								>
									<div>
										<span className="text-blue-400">const</span> prompt = `
									</div>
									<div className="pl-4 text-green-400/70">
										Optimize description for: {"{"}name{"}"}
										<br />
										Max lines: 3. Fit canvas width.
									</div>
									<div>`;</div>
								</motion.div>
								<motion.div
									className="mt-4 text-neutral-300"
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									transition={{ duration: 2, delay: 0.8 }}
								>
									<span className="text-[var(--accent)]">Answering: </span>
									<motion.span
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 1 }}
										transition={{
											duration: 2,
											delay: 0.8,
											repeat: Number.POSITIVE_INFINITY,
											repeatType: "reverse",
										}}
									>
										"Premium aerodynamic design..."
									</motion.span>
								</motion.div>
							</div>
						</motion.div>

						{/* Robust QA & Testing */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border bg-black/50 p-6"
						>
							<div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
							<div>
								<div className="mb-4 flex items-center gap-3">
									<div className="rounded-lg bg-[var(--accent)]/10 p-2 text-[var(--accent)]">
										<Workflow className="h-5 w-5" />
									</div>
									<h3 className="font-bold text-xl tracking-tight">
										API First Design & Stability
									</h3>
								</div>
								<p className="max-w-sm text-neutral-400 text-sm leading-relaxed">
									A rock-solid foundation with comprehensive endpoints (
									<code className="px-1 text-[var(--accent)] text-xs">
										/preview
									</code>
									,{" "}
									<code className="px-1 text-[var(--accent)] text-xs">
										/themes
									</code>
									,{" "}
									<code className="px-1 text-[var(--accent)] text-xs">
										/generate-pdf
									</code>
									). Protected by Jest testing covering calculation boundaries
									across light, dark, and monochrome variants.
								</p>
							</div>

							<div className="relative mt-6 flex flex-1 flex-col overflow-hidden rounded-lg border border-white/5 bg-black p-4 font-mono text-xs">
								<div className="mb-2 flex items-center gap-2 border-white/5 border-b pb-2">
									<div className="h-2 w-2 rounded-full bg-red-500" />
									<div className="h-2 w-2 rounded-full bg-yellow-500" />
									<div className="h-2 w-2 rounded-full bg-green-500" />
									<span className="ml-2 text-neutral-600">jest --watchAll</span>
								</div>
								<motion.div
									className="flex-1 space-y-2 overflow-hidden text-neutral-400"
									initial={{ y: 20, opacity: 0 }}
									whileInView={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.5 }}
								>
									{[
										"PASS src/store/itemsStore.test.ts",
										"PASS src/app/api/generate-pdf/route.test.ts",
										"PASS src/services/priceCalculationService.test.ts",
									].map((test, i) => (
										<motion.div
											key={test}
											className="flex gap-2"
											initial={{ opacity: 0, x: -10 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.3 * (i + 1) }}
										>
											<span className="rounded bg-green-500/10 px-1 font-bold text-green-500">
												PASS
											</span>
											<span>{test}</span>
										</motion.div>
									))}
								</motion.div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* LIVE GALLERY */}
			<section className="bg-white py-24 dark:bg-zinc-950">
				<div className="container mx-auto px-4 md:px-8">
					<div className="mx-auto mb-16 max-w-2xl text-center">
						<Badge
							variant="outline"
							className="mb-4 border-accent/30 bg-accent/10 text-accent"
						>
							Live Interface
						</Badge>
						<h2 className="mb-4 font-bold text-3xl">Production Ready UI</h2>
						<p className="text-zinc-500 dark:text-zinc-400">
							A glimpse into the actual web application powering price tag
							generation for multiple enterprises.
						</p>
					</div>

					<div className="flex flex-col gap-24">
						{[
							{
								src: "/images/projects/price-tag-printer/dashboard.png",
								alt: "Dashboard View",
								label: "Data Imports",
								desc: "Seamlessly ingest your pricing data via Excel, CSV, or direct Google Sheets synchronization. The dashboard provides instant feedback and validation.",
							},
							{
								src: "/images/projects/price-tag-printer/editor.png",
								alt: "Editor View",
								label: "Tag Editor",
								desc: "A powerful, real-time visual editing environment. Adjust prices, titles, layouts, and apply promotional discounts with instantaneous visual rendering.",
							},
							{
								src: "/images/projects/price-tag-printer/settings.png",
								alt: "Settings View",
								label: "Theme Engine",
								desc: "Total control over your visual identity. Switch between default structural designs or customize your exact brand color palette for exporting.",
							},
						].map((img, i) => (
							<motion.div
								key={img.src}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7 }}
								viewport={{ once: true, margin: "-100px" }}
								className={`flex flex-col items-center justify-between gap-8 md:gap-16 ${i % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
							>
								<div className="w-full overflow-hidden rounded-2xl border border-zinc-200/50 bg-zinc-100 p-2 shadow-2xl md:w-3/5 lg:p-4 dark:border-zinc-800/50 dark:bg-zinc-900/50">
									<div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
										<img
											src={img.src}
											alt={img.alt}
											className="h-auto w-full object-cover lg:rounded-xl"
										/>
									</div>
								</div>
								<div className="flex w-full flex-col justify-center px-4 md:w-2/5 md:px-0">
									<div className="mb-3 font-semibold text-accent text-sm uppercase tracking-widest">
										0{i + 1}
									</div>
									<h3 className="mb-4 font-bold text-3xl lg:text-4xl">
										{img.label}
									</h3>
									<p className="text-lg text-zinc-500 leading-relaxed dark:text-zinc-400">
										{img.desc}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* TECH STACK FOOTER */}
			<section className="border-zinc-200 border-t bg-zinc-100 py-24 dark:border-zinc-800/50 dark:bg-black/30">
				<div className="container mx-auto px-4 md:px-8">
					<div className="flex flex-col items-center justify-between gap-12 md:flex-row">
						<div className="max-w-md">
							<h3 className="mb-4 font-bold text-2xl">
								{t("priceTagPrinter.technologies")}
							</h3>
							<p className="text-zinc-500 dark:text-zinc-400">
								Strictly typed, edge-ready, and highly isolated
								responsibilities.
							</p>
						</div>

						<div className="flex flex-wrap items-center justify-center gap-8 text-zinc-400">
							<div className="flex flex-col items-center gap-2 transition-colors hover:text-accent">
								<SiNextdotjs className="h-8 w-8" />
								<span className="font-mono text-xs">Next.js 15</span>
							</div>
							<div className="flex flex-col items-center gap-2 transition-colors hover:text-accent">
								<SiReact className="h-8 w-8" />
								<span className="font-mono text-xs">React 19</span>
							</div>
							<div className="flex flex-col items-center gap-2 transition-colors hover:text-accent">
								<Layers className="h-8 w-8" />
								<span className="font-mono text-xs">Zustand</span>
							</div>
							<div className="flex flex-col items-center gap-2 transition-colors hover:text-accent">
								<SiOpenapiinitiative className="h-8 w-8" />
								<span className="font-mono text-xs">OpenAPI</span>
							</div>
							<div className="flex flex-col items-center gap-2 transition-colors hover:text-accent">
								<SiPuppeteer className="h-8 w-8" />
								<span className="font-mono text-xs">Puppeteer</span>
							</div>
							<div className="flex flex-col items-center gap-2 transition-colors hover:text-accent">
								<SiJest className="h-8 w-8" />
								<span className="font-mono text-xs">Jest</span>
							</div>
							<div className="flex flex-col items-center gap-2 transition-colors hover:text-accent">
								<SiTailwindcss className="h-8 w-8" />
								<span className="font-mono text-xs">Tailwind</span>
							</div>
							<div className="flex flex-col items-center gap-2 transition-colors hover:text-accent">
								<ShadcnIcon className="h-8 w-8" />
								<span className="font-mono text-xs">Shadcn</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
