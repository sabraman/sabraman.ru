import {
	getMessageNamespace,
	type NamespaceMessages,
} from "~/i18n/get-messages";
import type { SupportedLocale } from "~/i18n/types";

type WorkMessages = NamespaceMessages<"work">;

export type VaparshopPageCopy = WorkMessages["vaparshop"];
export type HornyPlacePageCopy = WorkMessages["hornyPlace"]["page"];
export type PriceTagPrinterPageCopy =
	WorkMessages["hornyPlace"]["priceTagPrinter"];

export type WorkCaseStudySlug =
	| "vaparshop"
	| "horny-place"
	| "price-tag-printer";

type WorkCaseStudyMeta = {
	title: string;
	description: string;
};

async function getWorkMessages(locale: SupportedLocale) {
	return getMessageNamespace(locale, "work");
}

export async function getVaparshopPageCopy(locale: SupportedLocale) {
	const work = await getWorkMessages(locale);
	return work.vaparshop;
}

export async function getHornyPlacePageCopy(locale: SupportedLocale) {
	const work = await getWorkMessages(locale);
	return work.hornyPlace.page;
}

export async function getPriceTagPrinterPageCopy(locale: SupportedLocale) {
	const work = await getWorkMessages(locale);
	return work.hornyPlace.priceTagPrinter;
}

export async function getWorkCaseStudyMeta(
	locale: SupportedLocale,
	slug: WorkCaseStudySlug,
): Promise<WorkCaseStudyMeta> {
	const work = await getWorkMessages(locale);

	switch (slug) {
		case "vaparshop":
			return {
				title: `${work.vaparshop.title} - ${work.vaparshop.subtitle} - Sabraman`,
				description: work.vaparshop.description,
			};
		case "horny-place":
			return {
				title: `${work.hornyPlace.title} - ${work.hornyPlace.subtitle} - Sabraman`,
				description: work.hornyPlace.description,
			};
		default:
			return {
				title: `${work.hornyPlace.priceTagPrinter.title} - ${work.hornyPlace.priceTagPrinter.subtitle} - Sabraman`,
				description: work.hornyPlace.priceTagPrinter.description,
			};
	}
}
