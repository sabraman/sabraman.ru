import type { Metadata } from "next";
import Link from "next/link";
import {
	getKindLabel,
	LAB_VARIANT_CONFIG,
} from "~/app/[locale]/services/lab/content";
import {
	getLocalizedHashPathname,
	getLocalizedPathname,
} from "~/i18n/locale-paths";
import { resolveSupportedLocale } from "~/i18n/types";
import { buildNoIndexMetadata } from "~/lib/seo/metadata";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const lang = resolveSupportedLocale(locale);

	return buildNoIndexMetadata({
		locale: lang,
		pathEn: "/services/lab",
		title:
			lang === "ru"
				? "Services Lab - 10 экспериментальных концептов"
				: "Services Lab - 10 experimental concepts",
		description:
			lang === "ru"
				? "Лаборатория из 10 контрастных концептов страницы услуг в рамках дизайн-системы Sabraman."
				: "A lab of 10 contrasting services-page concepts built within Sabraman design system.",
	});
}

export default async function ServicesLabPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const lang = resolveSupportedLocale(locale);
	const contactHref = getLocalizedHashPathname(lang, "/", "contact-section");
	const headline =
		lang === "ru"
			? "10 контрастных вариантов страницы услуг"
			: "10 contrasting versions of the services page";
	const subhead =
		lang === "ru"
			? "Здесь собраны longform, balanced и CTA-heavy подходы к одной задаче: как упаковать предложение в отдельную страницу."
			: "This lab collects longform, balanced, and CTA-heavy approaches to the same problem: packaging an offer into a standalone page.";

	return (
		<main className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
			<section className="mb-10 space-y-4 border-border/80 border-b pb-8">
				<p className="inline-flex rounded-full border border-accent/30 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em]">
					{lang === "ru" ? "Лаборатория" : "Lab"}
				</p>
				<h1
					className="max-w-5xl font-extrabold text-4xl leading-[0.92] tracking-tight md:text-6xl"
					style={{
						fontFamily: "Heading Now Variable",
						fontVariationSettings: `'wght' 900, 'wdth' 920`,
					}}
				>
					{headline}
				</h1>
				<p className="max-w-3xl text-base text-muted-foreground md:text-lg">
					{subhead}
				</p>
			</section>

			<section
				aria-label="Services Lab variants"
				className="mb-12 border-border/80 border-y"
			>
				{LAB_VARIANT_CONFIG.map((variant, index) => (
					<article
						key={variant.slug}
						className="grid grid-cols-1 gap-4 border-border/80 border-b py-5 last:border-b-0 md:grid-cols-12 md:items-center"
					>
						<div className="md:col-span-1">
							<p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.14em]">
								v{String(index + 1).padStart(2, "0")}
							</p>
						</div>
						<div className="md:col-span-4">
							<h2 className="font-bold text-xl">{variant.name}</h2>
							<p className="mt-1 text-muted-foreground text-sm">
								{variant.tagline}
							</p>
						</div>
						<div className="md:col-span-3">
							<p className="font-mono text-xs uppercase tracking-[0.14em]">
								{getKindLabel(variant.kind, lang)}
							</p>
						</div>
						<div className="md:col-span-4 md:text-right">
							<Link
								href={getLocalizedPathname(
									lang,
									`/services/lab/${variant.slug}`,
								)}
								className="inline-flex items-center rounded-xl bg-accent px-4 py-2 font-semibold text-accent-foreground text-sm transition-all hover:-translate-y-0.5 hover:opacity-90"
							>
								{lang === "ru" ? "Открыть вариант" : "Open variant"}
							</Link>
						</div>
					</article>
				))}
			</section>

			<section className="space-y-4 border-border/80 border-t pt-8">
				<p className="text-muted-foreground text-sm">
					{lang === "ru"
						? "Нужен рабочий вариант без лаборатории? Перейдите к блоку контактов на главной и опишите задачу."
						: "Need a practical version, not the lab? Jump to the homepage contact section and share your task."}
				</p>
				<Link
					href={contactHref}
					className="inline-flex items-center rounded-xl border border-border px-4 py-2 font-semibold text-sm transition-colors hover:border-accent/40 hover:text-accent"
				>
					{lang === "ru" ? "Перейти к контактам" : "Go to contacts"}
				</Link>
			</section>
		</main>
	);
}
