"use client";

import { motion } from "framer-motion";
import Contact from "~/components/Contact";
import type { HomeContactCopy } from "./home-copy";

type HomeContactSectionProps = {
	copy: HomeContactCopy;
};

export function HomeContactSection({ copy }: HomeContactSectionProps) {
	return (
		<section id="contact-section" className="relative overflow-hidden py-24">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 100 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
					viewport={{ once: true }}
					className="mb-16 overflow-hidden"
				>
					<h2
						className="font-extrabold text-5xl uppercase tracking-tight md:text-8xl xl:text-[12rem]"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 1000, 'wdth' 800`,
						}}
					>
						<span className="relative z-0 mr-4 inline-block md:mr-8 xl:mr-12">
							<span className="absolute -inset-1 bg-accent opacity-50 blur-sm" />
							{copy.copy.title}
						</span>
						{copy.copy.titleSecond}
					</h2>
				</motion.div>

				<Contact locale={copy.locale} copy={copy.copy} />
			</div>
		</section>
	);
}
