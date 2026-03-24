import Link from "next/link";
import { getLocalizedPathname } from "~/i18n/locale-paths";
import type { SupportedLocale } from "~/i18n/types";
import { getLegalPageLinkItems, type LegalPageSlug } from "~/lib/legal-pages";
import { SITE_LEGAL_PROFILE } from "~/lib/site-config";

const FOOTER_META: Record<SupportedLocale, string> = {
	en: `${SITE_LEGAL_PROFILE.status.en} · TIN ${SITE_LEGAL_PROFILE.inn} · ${SITE_LEGAL_PROFILE.phone} · ${SITE_LEGAL_PROFILE.address.en}`,
	ru: `${SITE_LEGAL_PROFILE.status.ru} · ИНН ${SITE_LEGAL_PROFILE.inn} · ${SITE_LEGAL_PROFILE.phone} · ${SITE_LEGAL_PROFILE.address.ru}`,
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
	const meta = FOOTER_META[locale];
	const legalLinks = getLegalPageLinkItems(locale);

	return (
		<footer className="border-white/10 border-t bg-[#070709] pt-10 pb-32">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<div className="max-w-2xl">
						<p className="text-sm text-white/36 leading-7">{meta}</p>
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
