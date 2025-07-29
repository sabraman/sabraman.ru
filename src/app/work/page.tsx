import type { Metadata } from "next";
import WorkExperience from "../../components/WorkExperience";

export const metadata: Metadata = {
	title: "Work Experience - Danya Yudin (Даня Юдин) - Sabraman",
	description:
		"Work experience and professional background of Danya Yudin (Даня Юдин) - Sabraman. Creative Designer and Early-Stage Developer specializing in visual design, branding, and application development.",
	keywords: [
		"sabraman work experience",
		"danya yudin work",
		"даня юдин работа",
		"картон портфолио",
		"vaparshop",
		"horny place",
		"creative designer",
		"developer portfolio",
	],
	openGraph: {
		title: "Work Experience - Danya Yudin (Даня Юдин) - Sabraman",
		description:
			"Professional experience and portfolio of Danya Yudin (Даня Юдин) - Sabraman",
		url: "https://sabraman.ru/work",
	},
};

export default function WorkPage() {
	return (
		<main className="container mx-auto max-w-4xl px-4 py-16">
			<h1 className="mb-12 font-bold font-mono text-4xl text-foreground">
				Work Experience
			</h1>

			<WorkExperience
				company="VAPARSHOP"
				title="Designer & Junior Developer"
				period="June 2024 – Present"
				location="Saint Petersburg"
				achievements={[
					"Developed Telegram bots (VaparWaToTgBot, VaparScannerBot) improving operational efficiency",
					"Created custom Price Tag Generator web application",
					"Designed branded Telegram Emoji Pack for enhanced engagement",
					"Developed Next.js Taplink alternative with blogs and interactive features",
					"Building Telegram Mini App with GetMeBack API integration",
				]}
			/>

			<WorkExperience
				company="HORNY PLACE"
				title="Visual Designer & Developer"
				period="October 2022 – May 2024"
				location="Saint Petersburg"
				achievements={[
					"Created exterior signage designs for retail locations",
					"Developed comprehensive promotional materials",
					"Built interactive Taplink alternative using Next.js",
					"Authored brand book for visual consistency",
					"Designed custom clothing items including 'Languages' hoodie",
				]}
			/>

			<WorkExperience
				company="ELYSIUM"
				title="Visual Merchandising & Sales Specialist"
				period="September 2020 – September 2022"
				location="Saint Petersburg"
				achievements={[
					"Enhanced in-store visual merchandising to improve customer experience",
					"Developed engaging training materials and presentations for onboarding new staff",
				]}
			/>

			<WorkExperience
				company="VAPE CLUB"
				title="Visual Merchandiser & Sales Manager"
				period="February 2019 – August 2020"
				location="Saint Petersburg"
				achievements={[
					"Maintained attractive and engaging visual store layouts",
					"Leveraged trend analysis to optimize product placement",
				]}
			/>
		</main>
	);
}
