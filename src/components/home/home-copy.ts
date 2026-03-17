import type { ReactNode } from "react";
import type { SupportedLocale } from "~/i18n/types";

export type HomeHeroCopy = {
	title: string;
	subtitle: string;
	subtitleHighlight: string;
	downloadResume: string;
	resumeFormats: string;
	downloadPdf: string;
	downloadMarkdown: string;
	getInTouch: string;
	pdfResumeHref: string;
	pdfResumeDownloadName: string;
	markdownResumeHref: string;
	markdownResumeDownloadName: string;
};

export type HomeAboutCopy = {
	title: string;
	description1: ReactNode;
	description2: ReactNode;
	expertiseAreas: string;
	expertiseCards: Array<{
		id: "visual-design" | "app-development" | "branding";
		title: string;
		description: string;
	}>;
	socialLinks: Array<{
		href: string;
		label: string;
		id: "telegram" | "github" | "instagram" | "x";
	}>;
};

export type HomeExperienceEntry = {
	company: string;
	title: string;
	period: string;
	location: string;
	achievements: string[];
};

export type HomeExperienceCopy = {
	title: string;
	titleSecond: string;
	items: HomeExperienceEntry[];
};

export type HomeWorkSectionCopy = {
	title: string;
	titleSecond: string;
	description: string;
	openHub: string;
	featureLabel: string;
	allCaseStudies: string;
	caseStudy: string;
	private: string;
	public: string;
	links: string;
};

export type ContactCopy = {
	title: string;
	titleSecond: string;
	description: string;
	form: {
		title: string;
		name: string;
		namePlaceholder: string;
		email: string;
		emailPlaceholder: string;
		message: string;
		messagePlaceholder: string;
		submit: string;
		sending: string;
		success: string;
		error: string;
		validation: {
			name: string;
			email: string;
			message: string;
		};
	};
	direct: {
		title: string;
		downloadResume: string;
		telegram: string;
		email: string;
		github: string;
		instagram: string;
	};
	location: {
		title: string;
		description: string;
	};
	remote: {
		title: string;
		description: string;
	};
};

export type HomeContactCopy = {
	locale: SupportedLocale;
	copy: ContactCopy;
};
