import type { Metadata } from "next";
import ContactPageClient from "~/components/ContactPageClient";
import { getContactCopy } from "~/components/home/get-contact-copy";
import { getMessageNamespace } from "~/i18n/get-messages";
import { resolveSupportedLocale } from "~/i18n/types";
import { JsonLd } from "~/lib/seo/json-ld";
import { buildIndexableMetadata } from "~/lib/seo/metadata";
import { createWebPageJsonLd } from "~/lib/seo/structured-data";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const isRussian = resolvedLocale === "ru";

	const title = isRussian
		? "Контакты - Даня Юдин - Sabraman"
		: "Contact - Danya Yudin (Даня Юдин) - Sabraman";

	const description = isRussian
		? "Свяжитесь с Даня Юдин - Sabraman. Design-led frontend и product developer, доступный для проектов в области визуального дизайна, брендинга и разработки интерфейсов."
		: "Get in touch with Danya Yudin (Даня Юдин) - Sabraman. Design-led frontend and product developer available for projects in visual design, branding, and interface development.";

	return buildIndexableMetadata({
		locale: resolvedLocale,
		pathEn: "/contact",
		routeId: "contact",
		title,
		description,
		keywords: [
			"contact sabraman",
			"contact danya yudin",
			"contact даня юдин",
			"картон контакты",
			"hire creative designer",
			"hire developer",
			"telegram bot developer",
			"web designer contact",
		],
	});
}

export default async function ContactPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const resolvedLocale = resolveSupportedLocale(locale);
	const messages = await getMessageNamespace(resolvedLocale, "contact");
	const copy = getContactCopy(resolvedLocale, messages);
	const path = resolvedLocale === "ru" ? "/ru/contact" : "/contact";
	const title = resolvedLocale === "ru" ? "Контакты" : "Contact";
	const description =
		resolvedLocale === "ru"
			? "Связь с Даней Юдиным по проектам в дизайне, брендинге и разработке."
			: "Contact Danya Yudin about design, branding, and development work.";

	return (
		<>
			<JsonLd
				data={createWebPageJsonLd({
					description,
					locale: resolvedLocale,
					name: title,
					path,
				})}
				id="contact-json-ld"
			/>
			<ContactPageClient locale={resolvedLocale} copy={copy} />
		</>
	);
}
