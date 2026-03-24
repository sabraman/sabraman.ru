import Link from "next/link";
import { getLocalizedPathname } from "~/i18n/locale-paths";
import type { SupportedLocale } from "~/i18n/types";
import {
	getLegalPage,
	getLegalPageLinkItems,
	type LegalPageSlug,
} from "~/lib/legal-pages";

export function LegalInfoPage({
	locale,
	slug,
}: {
	locale: SupportedLocale;
	slug: LegalPageSlug;
}) {
	const page = getLegalPage(locale, slug);
	const links = getLegalPageLinkItems(locale);

	return (
		<section className="px-4 pt-28 pb-24 sm:px-6">
			<div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-[rgba(11,11,15,0.78)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8">
				<p className="text-[0.7rem] text-white/34 uppercase tracking-[0.34em]">
					{page.eyebrow}
				</p>
				<h1 className="mt-4 text-3xl text-white leading-tight sm:text-4xl">
					{page.title}
				</h1>
				<p className="mt-4 max-w-3xl text-sm text-white/58 leading-7 sm:text-base">
					{page.lead}
				</p>

				<nav className="mt-8 flex flex-wrap gap-2 border-white/10 border-t pt-6">
					{links.map((item) => {
						const isActive = item.slug === slug;

						return (
							<Link
								key={item.slug}
								href={getLocalizedPathname(locale, `/legal/${item.slug}`)}
								className={
									isActive
										? "rounded-full border border-[#ff1979]/50 bg-[#ff1979]/10 px-3 py-2 text-[0.68rem] text-white uppercase tracking-[0.24em]"
										: "rounded-full border border-white/10 px-3 py-2 text-[0.68rem] text-white/58 uppercase tracking-[0.24em] transition hover:border-[#ff1979]/40 hover:text-white"
								}
							>
								{item.label}
							</Link>
						);
					})}
				</nav>

				<div className="mt-10 grid gap-4">
					{page.sections.map((section) => (
						<article
							key={section.title}
							className="rounded-[1.6rem] border border-white/10 bg-white/[0.025] p-5 sm:p-6"
						>
							<h2 className="text-sm text-white uppercase tracking-[0.2em]">
								{section.title}
							</h2>

							{section.paragraphs.length > 0 ? (
								<div className="mt-4 space-y-4 text-sm text-white/68 leading-7">
									{section.paragraphs.map((paragraph) => (
										<p key={paragraph}>{paragraph}</p>
									))}
								</div>
							) : null}

							{section.items ? (
								<ul className="mt-4 space-y-2 text-sm text-white/62 leading-7">
									{section.items.map((item) => (
										<li key={item} className="flex gap-3">
											<span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#ff1979]/70" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							) : null}
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
