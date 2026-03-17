import {
	Code,
	Github,
	Instagram,
	LineChart,
	Paintbrush,
	Send,
	X,
} from "lucide-react";
import Link from "next/link";
import type { HomeAboutCopy } from "./home-copy";

type HomeAboutSectionProps = {
	copy: HomeAboutCopy;
};

const EXPERTISE_ICONS = {
	branding: LineChart,
	"app-development": Code,
	"visual-design": Paintbrush,
} as const;

const SOCIAL_ICONS = {
	github: Github,
	instagram: Instagram,
	telegram: Send,
	x: X,
} as const;

export function HomeAboutSection({ copy }: HomeAboutSectionProps) {
	return (
		<section className="relative min-h-screen bg-secondary/5 py-32" id="about">
			<div className="container mx-auto px-4">
				<div className="mb-20 overflow-hidden">
					<h2
						className="font-extrabold text-6xl uppercase tracking-tight md:text-6xl xl:text-[12rem]"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 1000, 'wdth' 1000`,
						}}
					>
						<span className="relative z-0 ml-4 inline-block md:ml-8 xl:ml-12">
							<span className="absolute -inset-1 bg-accent opacity-50 blur-sm" />
							{copy.title}
						</span>
					</h2>
				</div>

				<div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<div className="prose prose-xl dark:prose-invert max-w-none">
							<p className="mb-8 text-2xl leading-relaxed lg:text-3xl">
								{copy.description1}
							</p>

							<p className="text-muted-foreground text-xl leading-relaxed lg:text-2xl">
								{copy.description2}
							</p>

							<div className="mt-12 flex flex-wrap gap-6">
								{copy.socialLinks.map((socialLink) => {
									const Icon = SOCIAL_ICONS[socialLink.id];

									return (
										<div
											className="flex items-center gap-2"
											key={socialLink.id}
										>
											<Icon className="h-6 w-6 text-primary" />
											<Link
												href={socialLink.href}
												className="text-xl transition-colors hover:text-accent"
											>
												{socialLink.label}
											</Link>
										</div>
									);
								})}
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-8">
						<div className="rounded-xl border bg-card p-6 shadow-lg backdrop-blur-sm">
							<h3 className="mb-4 font-bold text-2xl">{copy.expertiseAreas}</h3>
							<ul className="space-y-4">
								{copy.expertiseCards.map((card) => {
									const Icon = EXPERTISE_ICONS[card.id];

									return (
										<li className="flex items-start gap-3" key={card.id}>
											<Icon className="mt-0.5 h-6 w-6 flex-shrink-0 text-accent" />
											<div>
												<h4 className="font-semibold text-xl">{card.title}</h4>
												<p className="text-muted-foreground">
													{card.description}
												</p>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
