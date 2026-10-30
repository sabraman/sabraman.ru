"use client";

import { CodeXmlIcon, PaletteIcon } from "lucide-react";
import {
	type ExperienceItemType,
	WorkExperience,
} from "~/components/work-experience";
import type { HomeExperienceCopy } from "./home-copy";

type HomeExperienceSectionProps = {
	copy: HomeExperienceCopy;
};

const COMPANY_LOGOS: Record<string, string> = {
	KUKARACHA: "/Kukaracha-logo.svg",
	"DAARIA TRANS": "/Daariatrans-logo.svg",
	"HORNY PLACE": "/Hornyplace-logo.png",
	VAPARSHOP: "/Vaparshop-logo.png",
};

function slugifyCompany(company: string) {
	return company.toLowerCase().replace(/\s+/g, "-");
}

function toMarkdownBulletList(items: string[]) {
	return items.map((item) => `- ${item}`).join("\n");
}

export function HomeExperienceSection({ copy }: HomeExperienceSectionProps) {
	const visibleItems = copy.items.filter((item) => !item.hidden);
	const experiences: ExperienceItemType[] = visibleItems.map((item, index) => ({
		id: slugifyCompany(item.company),
		companyName: item.company,
		companyLogo: COMPANY_LOGOS[item.company],
		isCurrentEmployer: index === 0,
		positions: [
			{
				id: `${slugifyCompany(item.company)}-role`,
				title: item.title,
				employmentPeriod: `${item.period} · ${item.location}`,
				description: toMarkdownBulletList(item.achievements),
				icon: item.company === "HORNY PLACE" ? PaletteIcon : CodeXmlIcon,
				isExpanded: index < 2,
			},
		],
	}));

	return (
		<section className="relative pt-24 pb-8" id="experience">
			<div className="mx-auto max-w-2xl px-4">
				<div className="grid grid-cols-1 gap-10">
					<div className="max-w-2xl">
						<h2
							className="font-extrabold text-4xl text-primary uppercase tracking-tight md:text-5xl"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 1000, 'wdth' 880`,
							}}
						>
							<span className="relative z-0 mr-4 inline-block md:mr-8">
								<span className="absolute -inset-1 bg-accent opacity-50 blur-sm" />
								{copy.title}
							</span>
							{copy.titleSecond}
						</h2>
					</div>

					<div className="grid grid-cols-1">
						<WorkExperience
							className="w-full px-0"
							experiences={experiences}
							currentEmployerLabel={copy.currentEmployerLabel}
							employmentTypeLabel={copy.employmentTypeLabel}
							employmentPeriodLabel={copy.employmentPeriodLabel}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
