import { Github, Instagram, Send, X } from "lucide-react";
import Link from "next/link";
import type { HomeAboutCopy } from "./home-copy";

type HomeAboutSectionProps = {
	copy: HomeAboutCopy;
};

const SOCIAL_ICONS = {
	github: Github,
	instagram: Instagram,
	telegram: Send,
	x: X,
} as const;

export function HomeAboutSection({ copy }: HomeAboutSectionProps) {
	return (
		<section className="relative pt-24" id="about">
			<div className="mx-auto max-w-2xl px-4">
				<div className="mb-8 overflow-hidden">
					<h2
						className="font-extrabold text-4xl text-primary uppercase tracking-tight md:text-5xl"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 1000, 'wdth' 880`,
						}}
					>
						<span className="relative z-0 mx-6 mr-3 inline-block text-6xl leading-none md:mr-4 md:text-7xl">
							<span className="absolute -inset-1 bg-accent opacity-50 blur-sm" />
							{copy.title}
						</span>
					</h2>
				</div>

				<div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]">
					<div className="border-white/10 border-b bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.008))] px-5 py-4 md:px-6">
						<div className="flex flex-wrap gap-2">
							{copy.socialLinks.map((socialLink) => {
								const Icon = SOCIAL_ICONS[socialLink.id];

								return (
									<Link
										key={socialLink.id}
										href={socialLink.href}
										className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.7rem] text-white/70 uppercase tracking-[0.18em] transition-colors duration-300 hover:border-white/18 hover:bg-white/[0.06] hover:text-white"
									>
										<Icon className="h-3.5 w-3.5 flex-shrink-0" />
										<span>{socialLink.label}</span>
									</Link>
								);
							})}
						</div>
					</div>

					<div className="border-white/10 border-b px-5 py-5 md:px-6 md:py-6">
						<p className="max-w-[42rem] text-2xl text-primary leading-[1.12] md:text-[2rem] [&_strong]:font-semibold [&_strong]:text-accent">
							{copy.description1}
						</p>
					</div>

					<div className="px-5 py-5 md:px-6 md:py-6">
						<p className="max-w-[40rem] text-base text-muted-foreground leading-[1.65] md:text-[1.05rem] [&_strong]:font-semibold [&_strong]:text-primary">
							{copy.description2}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
