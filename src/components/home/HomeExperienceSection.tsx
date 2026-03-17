"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { HomeExperienceCopy } from "./home-copy";

type HomeExperienceSectionProps = {
	copy: HomeExperienceCopy;
};

function getAchievementSegments(achievement: string) {
	const matches = Array.from(achievement.matchAll(/\*\*(.*?)\*\*/g));

	if (!matches.length) {
		return [{ emphasis: false, key: `${achievement}-0`, text: achievement }];
	}

	const segments: Array<{ emphasis: boolean; key: string; text: string }> = [];
	let cursor = 0;

	for (const match of matches) {
		const matchIndex = match.index ?? 0;
		const [fullMatch, emphasizedText = ""] = match;

		if (matchIndex > cursor) {
			segments.push({
				emphasis: false,
				key: `plain-${cursor}`,
				text: achievement.slice(cursor, matchIndex),
			});
		}

		segments.push({
			emphasis: true,
			key: `bold-${matchIndex}`,
			text: emphasizedText,
		});
		cursor = matchIndex + fullMatch.length;
	}

	if (cursor < achievement.length) {
		segments.push({
			emphasis: false,
			key: `plain-${cursor}`,
			text: achievement.slice(cursor),
		});
	}

	return segments;
}

function CompanyLogo({ company }: { company: string }) {
	const logos = {
		ELYSIUM: "/Elysium-logo.png",
		"HORNY PLACE": "/Hornyplace-logo.png",
		"VAPE CLUB": "/Vapeclub-logo.png",
		VAPARSHOP: "/Vaparshop-logo.png",
	} as const;

	const logoSrc = logos[company as keyof typeof logos];

	if (!logoSrc) {
		return (
			<div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary font-extrabold text-2xl text-primary-foreground md:h-24 md:w-24 md:text-4xl">
				{company.charAt(0)}
			</div>
		);
	}

	return (
		<div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white p-2 md:h-24 md:w-24">
			<Image
				src={logoSrc}
				alt={`${company} logo`}
				width={96}
				height={96}
				className="h-full w-full object-contain"
			/>
		</div>
	);
}

function WorkExperienceItem({
	achievementDelay,
	achievements,
	company,
	location,
	period,
	title,
}: {
	achievementDelay: number;
	achievements: string[];
	company: string;
	location: string;
	period: string;
	title: string;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 100 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.8,
				ease: [0.22, 1, 0.36, 1],
				delay: achievementDelay,
			}}
			viewport={{ once: true }}
			className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12"
		>
			<div className="relative lg:col-span-4">
				<div className="sticky top-32">
					<div className="mb-6 flex items-center gap-6">
						<CompanyLogo company={company} />
						<div>
							<h3 className="font-extrabold text-3xl md:text-4xl">{company}</h3>
							<p className="text-muted-foreground text-xl">{period}</p>
						</div>
					</div>
					<div>
						<h4 className="mb-2 font-bold text-2xl">{title}</h4>
						<p className="text-muted-foreground text-xl">{location}</p>
					</div>
				</div>
			</div>

			<div className="lg:col-span-8">
				<ul className="space-y-6">
					{achievements.map((achievement, index) => {
						const uniqueKey = `${company}-${index}-${achievement.slice(0, 10)}`;
						const segments = getAchievementSegments(achievement);

						return (
							<motion.li
								key={uniqueKey}
								initial={{ opacity: 0, x: 50 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{
									duration: 0.5,
									ease: [0.22, 1, 0.36, 1],
									delay: 0.1 * index,
								}}
								viewport={{ once: true }}
								className="relative pl-6 text-xl leading-relaxed before:absolute before:top-[14px] before:left-0 before:h-3 before:w-3 before:rounded-full before:bg-accent before:content-[''] md:text-2xl"
							>
								{segments.map((segment) =>
									segment.emphasis ? (
										<strong
											key={`${uniqueKey}-${segment.key}`}
											className="text-accent"
										>
											{segment.text}
										</strong>
									) : (
										<span key={`${uniqueKey}-${segment.key}`}>
											{segment.text}
										</span>
									),
								)}
							</motion.li>
						);
					})}
				</ul>
			</div>
		</motion.div>
	);
}

export function HomeExperienceSection({ copy }: HomeExperienceSectionProps) {
	return (
		<section className="relative min-h-screen py-32" id="experience">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 100 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
					viewport={{ once: true }}
					className="mb-20 overflow-hidden"
				>
					<h2
						className="font-extrabold text-4xl uppercase tracking-tight md:text-7xl xl:text-[9rem]"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 1000, 'wdth' 1000`,
						}}
					>
						<span className="relative z-0 mr-4 inline-block md:mr-8 xl:mr-12">
							<span className="absolute -inset-1 bg-accent opacity-50 blur-sm" />
							{copy.title}
						</span>
						{copy.titleSecond}
					</h2>
				</motion.div>

				<div className="space-y-40">
					{copy.items.map((item, index) => (
						<WorkExperienceItem
							key={item.company}
							achievementDelay={index * 0.2}
							achievements={item.achievements}
							company={item.company}
							location={item.location}
							period={item.period}
							title={item.title}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
