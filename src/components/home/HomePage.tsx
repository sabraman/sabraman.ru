import type { ReactNode } from "react";
import { HomeWorkSection } from "~/components/projects/HomeWorkSection";
import { getMessageNamespace } from "~/i18n/get-messages";
import type { SupportedLocale } from "~/i18n/types";
import { getResumeAsset } from "~/lib/resume";
import { getContactCopy } from "./get-contact-copy";
import { HomeAboutSection } from "./HomeAboutSection";
import { HomeContactSection } from "./HomeContactSection";
import { HomeExperienceSection } from "./HomeExperienceSection";
import { HomeHeroClient } from "./HomeHeroClient";

type HomePageProps = {
	locale: SupportedLocale;
};

function renderTaggedStrongText(value: string, tagName: string): ReactNode {
	const openingTag = `<${tagName}>`;
	const closingTag = `</${tagName}>`;
	const [before, remainder] = value.split(openingTag);

	if (!remainder) {
		return value;
	}

	const [highlight, after] = remainder.split(closingTag);

	if (!highlight || after === undefined) {
		return value;
	}

	return (
		<>
			{before}
			<strong>{highlight}</strong>
			{after}
		</>
	);
}

export default async function HomePage({ locale }: HomePageProps) {
	const [hero, about, projects, experience, contact] = await Promise.all([
		getMessageNamespace(locale, "hero"),
		getMessageNamespace(locale, "about"),
		getMessageNamespace(locale, "projects"),
		getMessageNamespace(locale, "experience"),
		getMessageNamespace(locale, "contact"),
	]);
	const pdfResume = getResumeAsset(locale);
	const markdownResume = getResumeAsset(locale, "markdown");
	const contactCopy = getContactCopy(contact);

	return (
		<div className="relative">
			<HomeHeroClient
				locale={locale}
				copy={{
					title: hero.title,
					subtitle: hero.subtitle,
					subtitleHighlight: hero.subtitleHighlight,
					downloadResume: hero.downloadResume,
					resumeFormats: hero.resumeFormats,
					downloadPdf: hero.downloadPdf,
					downloadMarkdown: hero.downloadMarkdown,
					getInTouch: hero.getInTouch,
					pdfResumeHref: pdfResume.href,
					pdfResumeDownloadName: pdfResume.downloadName,
					markdownResumeHref: markdownResume.href,
					markdownResumeDownloadName: markdownResume.downloadName,
				}}
			/>

			<HomeAboutSection
				copy={{
					title: about.title,
					description1: renderTaggedStrongText(about.description1, "sabraman"),
					description2: renderTaggedStrongText(about.description2, "karton"),
					expertiseAreas: about.expertiseAreas,
					expertiseCards: [
						{
							id: "visual-design",
							title: about.visualDesign.title,
							description: about.visualDesign.description,
						},
						{
							id: "app-development",
							title: about.appDevelopment.title,
							description: about.appDevelopment.description,
						},
						{
							id: "branding",
							title: about.branding.title,
							description: about.branding.description,
						},
					],
					socialLinks: [
						{
							href: "https://t.me/sabraman",
							label: "@sabraman",
							id: "telegram",
						},
						{
							href: "https://github.com/sabraman",
							label: "sabraman",
							id: "github",
						},
						{
							href: "https://instagram.com/sabraman",
							label: "sabraman",
							id: "instagram",
						},
						{ href: "https://x.com/1sabraman", label: "1sabraman", id: "x" },
					],
				}}
			/>

			<HomeWorkSection
				locale={locale}
				copy={{
					title: projects.title,
					titleSecond: projects.titleSecond,
					description: projects.description,
					openHub: locale === "ru" ? "Открыть хаб кейсов" : "Open Work Hub",
					featureLabel: locale === "ru" ? "Ключевой кейс" : "Featured case",
					allCaseStudies: locale === "ru" ? "Все кейсы" : "All case studies",
					caseStudy: locale === "ru" ? "Кейс" : "Case Study",
					private: locale === "ru" ? "Приватный" : "Private",
					public: locale === "ru" ? "Публичный" : "Public",
					links: locale === "ru" ? "ссылки" : "links",
				}}
			/>

			<HomeExperienceSection
				copy={{
					title: experience.title,
					titleSecond: experience.titleSecond,
					items: [
						{
							company: "VAPARSHOP",
							title: experience.vaparshop.title,
							period: experience.vaparshop.period,
							location: experience.vaparshop.location,
							achievements: Object.values(experience.vaparshop.achievements),
						},
						{
							company: "HORNY PLACE",
							title: experience.hornyPlace.title,
							period: experience.hornyPlace.period,
							location: experience.hornyPlace.location,
							achievements: Object.values(experience.hornyPlace.achievements),
						},
						{
							company: "ELYSIUM",
							title: experience.elysium.title,
							period: experience.elysium.period,
							location: experience.elysium.location,
							achievements: Object.values(experience.elysium.achievements),
						},
						{
							company: "VAPE CLUB",
							title: experience.vapeClub.title,
							period: experience.vapeClub.period,
							location: experience.vapeClub.location,
							achievements: Object.values(experience.vapeClub.achievements),
						},
					],
				}}
			/>

			<HomeContactSection copy={contactCopy} />
		</div>
	);
}
