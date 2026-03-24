import { Github, Instagram, Mail } from "lucide-react";
import Link from "next/link";
import { TelegramIcon, VKIcon } from "~/components/contact/contact-links";
import { getLocalizedPathname } from "~/i18n/locale-paths";
import type { SupportedLocale } from "~/i18n/types";
import { getLegalPageLinkItems, type LegalPageSlug } from "~/lib/legal-pages";
import { SITE_LEGAL_PROFILE, SITE_SOCIAL_LINKS } from "~/lib/site-config";

type ContactRailItem = {
	external?: boolean;
	href: string;
	icon: React.ReactNode;
	label: string;
	value: string;
};

type FooterCopy = {
	eyebrow: string;
	lead: string;
	meta: string;
};

const FOOTER_COPY: Record<SupportedLocale, FooterCopy> = {
	en: {
		eyebrow: "Legal links",
		lead: "All moderation-required business information is published on separate pages.",
		meta: `${SITE_LEGAL_PROFILE.status.en} · TIN ${SITE_LEGAL_PROFILE.inn} · ${SITE_LEGAL_PROFILE.phone} · ${SITE_LEGAL_PROFILE.address.en}`,
	},
	ru: {
		eyebrow: "Юридические ссылки",
		lead: "Вся обязательная для модерации информация вынесена на отдельные страницы.",
		meta: `${SITE_LEGAL_PROFILE.status.ru} · ИНН ${SITE_LEGAL_PROFILE.inn} · ${SITE_LEGAL_PROFILE.phone} · ${SITE_LEGAL_PROFILE.address.ru}`,
	},
};

function getContactRail(locale: SupportedLocale): ContactRailItem[] {
	void locale;

	return [
		{
			href: `mailto:${SITE_LEGAL_PROFILE.email}`,
			icon: <Mail className="h-6 w-6" />,
			label: "Email",
			value: SITE_LEGAL_PROFILE.email,
		},
		{
			external: true,
			href: SITE_SOCIAL_LINKS.telegram,
			icon: <TelegramIcon className="h-6 w-6" />,
			label: "Telegram",
			value: SITE_LEGAL_PROFILE.telegram,
		},
		{
			external: true,
			href: SITE_SOCIAL_LINKS.vk,
			icon: <VKIcon className="h-6 w-6" />,
			label: "VK",
			value: "sabraman",
		},
		{
			external: true,
			href: SITE_SOCIAL_LINKS.github,
			icon: <Github className="h-6 w-6" />,
			label: "GitHub",
			value: "sabraman",
		},
		{
			external: true,
			href: SITE_SOCIAL_LINKS.instagram,
			icon: <Instagram className="h-6 w-6" />,
			label: "Instagram",
			value: "sabraman",
		},
	];
}

function ContactRailRow({ item }: { item: ContactRailItem }) {
	return (
		<a
			href={item.href}
			target={item.external ? "_blank" : undefined}
			rel={item.external ? "noreferrer" : undefined}
			className="group grid gap-4 border-white/10 border-b py-6 transition sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-8 sm:py-8"
		>
			<div className="flex items-center gap-5">
				<span className="text-[#ff1979] transition duration-200 group-hover:scale-[1.06] group-hover:text-[#ff4d98]">
					{item.icon}
				</span>
				<span className="text-[0.88rem] text-white/44 uppercase tracking-[0.38em]">
					{item.label}
				</span>
			</div>
			<div className="text-left text-[1.9rem] text-white leading-none tracking-[-0.04em] transition group-hover:text-[#ffd7e7] sm:text-right sm:text-[3rem]">
				{item.value}
			</div>
		</a>
	);
}

function LegalLink({
	label,
	locale,
	slug,
}: {
	label: string;
	locale: SupportedLocale;
	slug: LegalPageSlug;
}) {
	return (
		<Link
			href={getLocalizedPathname(locale, `/legal/${slug}`)}
			className="rounded-full border border-white/10 px-3 py-2 text-[0.68rem] text-white/58 uppercase tracking-[0.24em] transition hover:border-[#ff1979]/40 hover:text-white"
		>
			{label}
		</Link>
	);
}

export function SiteComplianceFooter({ locale }: { locale: SupportedLocale }) {
	const copy = FOOTER_COPY[locale];
	const contactRail = getContactRail(locale);
	const legalLinks = getLegalPageLinkItems(locale);

	return (
		<footer className="border-white/10 border-t bg-[#070709] pt-10 pb-32">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="border-white/10 border-t">
					{contactRail.map((item) => (
						<ContactRailRow key={`${item.label}-${item.value}`} item={item} />
					))}
				</div>

				<div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<div className="max-w-2xl">
						<p className="text-[0.68rem] text-white/32 uppercase tracking-[0.34em]">
							{copy.eyebrow}
						</p>
						<p className="mt-3 text-sm text-white/54 leading-7">{copy.lead}</p>
						<p className="mt-2 text-sm text-white/36 leading-7">{copy.meta}</p>
					</div>

					<div className="flex flex-wrap gap-2">
						{legalLinks.map((item) => (
							<LegalLink
								key={item.slug}
								label={item.label}
								locale={locale}
								slug={item.slug}
							/>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
