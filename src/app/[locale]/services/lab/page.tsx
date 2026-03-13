import type { Metadata } from "next";
import Link from "next/link";
import {
	getKindLabel,
	getLocale,
	getLocalePrefix,
	LAB_VARIANT_CONFIG,
} from "~/app/[locale]/services/lab/content";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const lang = getLocale(locale);
	const prefix = getLocalePrefix(lang);
	const canonicalPath = `${prefix}/services/lab`;

	return {
		title:
			lang === "ru"
				? "Services Lab - 10 экспериментальных концептов"
				: "Services Lab - 10 experimental concepts",
		description:
			lang === "ru"
				? "Лаборатория из 10 контрастных концептов страницы услуг в рамках дизайн-системы Sabraman."
				: "A lab of 10 contrasting services-page concepts built within Sabraman design system.",
		alternates: {
			canonical: canonicalPath,
			languages: {
				en: "/services/lab",
				ru: "/ru/services/lab",
				"x-default": "/services/lab",
			},
		},
		robots: {
			index: false,
			follow: true,
		},
	};
}

export default async function ServicesLabPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const lang = getLocale(locale);
	const prefix = getLocalePrefix(lang);
	const contactHref = `${prefix}/contact`;
	const headline =
		lang === "ru"
			? "10 контрастных вариантов страницы услуг"
			: "10 contrasting versions of the services page";
	const subhead =
		lang === "ru"
			? "Здесь собраны longform, balanced и CTA-heavy подходы. Продовая /services пока без изменений."
			: "This lab contains longform, balanced, and CTA-heavy approaches. Production /services is unchanged.";

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
								href={`${prefix}/services/lab/${variant.slug}`}
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
						? "Нужен рабочий вариант без лаборатории? Переходите к контакту и опишите задачу."
						: "Need a practical version, not the lab? Go to contact and share your task."}
				</p>
				<Link
					href={contactHref}
					className="inline-flex items-center rounded-xl border border-border px-4 py-2 font-semibold text-sm transition-colors hover:border-accent/40 hover:text-accent"
				>
					{lang === "ru" ? "Перейти к контакту" : "Go to contact"}
				</Link>
			</section>
		</main>
	);
}
