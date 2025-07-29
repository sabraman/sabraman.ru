"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Contact from "~/components/Contact";

export default function ContactPageClient() {
	const t = useTranslations();

	return (
		<div className="relative">
			<section className="py-24">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
						className="mb-16 overflow-hidden"
					>
						<h1
							className="text-center font-extrabold text-5xl uppercase tracking-tight md:text-6xl xl:text-7xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 1000, 'wdth' 800`,
							}}
						>
							<span className="relative z-0 mr-4 inline-block md:mr-8">
								<span className="-inset-1 absolute bg-accent opacity-50 blur-sm" />
								{t("contact.title")}
							</span>
							{t("contact.titleSecond")}
						</h1>
						<p className="mx-auto mt-6 max-w-2xl text-center text-muted-foreground text-xl">
							{t("contact.description")}
						</p>
					</motion.div>

					<Contact />
				</div>
			</section>

			{/* Visual element - abstract background */}
			<div className="-z-10 pointer-events-none fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background opacity-90" />
				<motion.div
					className="absolute rounded-full bg-accent/5"
					style={{
						width: "400px",
						height: "400px",
						left: "20%",
						top: "20%",
						filter: "blur(100px)",
					}}
					animate={{
						x: [0, 20],
						y: [0, -20],
					}}
					transition={{
						duration: 20,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "reverse",
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute rounded-full bg-accent/5"
					style={{
						width: "600px",
						height: "500px",
						left: "50%",
						top: "60%",
						filter: "blur(100px)",
					}}
					animate={{
						x: [0, -30],
						y: [0, 30],
					}}
					transition={{
						duration: 25,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "reverse",
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute rounded-full bg-primary/5"
					style={{
						width: "300px",
						height: "300px",
						left: "80%",
						top: "30%",
						filter: "blur(100px)",
					}}
					animate={{
						x: [0, -20],
						y: [0, -10],
					}}
					transition={{
						duration: 15,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "reverse",
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute rounded-full bg-accent/5"
					style={{
						width: "500px",
						height: "500px",
						left: "10%",
						top: "70%",
						filter: "blur(100px)",
					}}
					animate={{
						x: [0, 30],
						y: [0, 20],
					}}
					transition={{
						duration: 18,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "reverse",
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute rounded-full bg-primary/5"
					style={{
						width: "450px",
						height: "450px",
						left: "70%",
						top: "80%",
						filter: "blur(100px)",
					}}
					animate={{
						x: [0, -15],
						y: [0, -25],
					}}
					transition={{
						duration: 22,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "reverse",
						ease: "easeInOut",
					}}
				/>
			</div>
		</div>
	);
}
