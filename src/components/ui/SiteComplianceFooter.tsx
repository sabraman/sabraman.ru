import Link from "next/link";
import { getLocalizedPathname } from "~/i18n/locale-paths";
import type { SupportedLocale } from "~/i18n/types";
import { getLegalPageLinkItems, type LegalPageSlug } from "~/lib/legal-pages";
import { SITE_LEGAL_PROFILE } from "~/lib/site-config";

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
	const legalLinks = getLegalPageLinkItems(locale);

	return (
		<footer className="border-white/10 border-t bg-[#070709] pt-10 pb-32">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
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
