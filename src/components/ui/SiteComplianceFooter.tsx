import Link from "next/link";
import { getLocalizedPathname } from "~/i18n/locale-paths";
import type { SupportedLocale } from "~/i18n/types";
import { getLegalPageLinkItems, type LegalPageSlug } from "~/lib/legal-pages";

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
	const legalLinks = getLegalPageLinkItems(locale);

	return (
		<footer className="border-white/10 border-t bg-[#070709] pt-6 pb-32">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
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
		</footer>
	);
}
