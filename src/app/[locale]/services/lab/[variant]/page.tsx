import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	getKindLabel,
	getLocale,
	getLocalePrefix,
	getStyleClasses,
	getVariantBySlug,
	LAB_VARIANT_CONFIG,
	LAB_VARIANTS,
} from "~/app/[locale]/services/lab/content";

export function generateStaticParams() {
	return LAB_VARIANTS.map((variant) => ({ variant }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; variant: string }>;
}): Promise<Metadata> {
	const { locale, variant } = await params;
	const lang = getLocale(locale);
	const prefix = getLocalePrefix(lang);
	const config = getVariantBySlug(variant);

	if (!config) {
		return {};
	}

	const localizedPath = `${prefix}/services/lab/${config.slug}`;
	const title =
		lang === "ru"
			? `${config.name} - Services Lab | Sabraman`
			: `${config.name} - Services Lab | Sabraman`;

	return {
		title,
		description: config.content[lang].heroLead,
		alternates: {
			canonical: localizedPath,
			languages: {
				en: `/services/lab/${config.slug}`,
				ru: `/ru/services/lab/${config.slug}`,
				"x-default": `/services/lab/${config.slug}`,
			},
		},
		robots: {
			index: false,
			follow: true,
		},
	};
}

type VariantPageProps = {
	params: Promise<{ locale: string; variant: string }>;
};

type ContentShape = (typeof LAB_VARIANT_CONFIG)[number]["content"]["en"];
type ClassesShape = ReturnType<typeof getStyleClasses>;

function renderOffersStack(content: ContentShape, classes: ClassesShape) {
	return (
		<div className="border-border/80 border-y">
			{content.offers.map((offer) => (
				<article key={offer.title} className={classes.itemRow}>
					<h3 className="mb-2 font-bold text-xl">{offer.title}</h3>
					<p className="mb-2 max-w-4xl text-muted-foreground">
						{offer.description}
					</p>
					<p className="font-medium text-sm">{offer.result}</p>
				</article>
			))}
		</div>
	);
}

function renderVariantBody(
	slug: string,
	lang: "en" | "ru",
	classes: ClassesShape,
	content: ContentShape,
) {
	if (slug === "v01-editorial-longform") {
		return (
			<>
				<section className="grid grid-cols-1 gap-8 md:grid-cols-12">
					<div className="md:col-span-8">
						<h2 className={`${classes.sectionTitle} mb-5`}>
							{content.offersTitle}
						</h2>
						{renderOffersStack(content, classes)}
					</div>
					<aside className="md:col-span-4">
						<h2 className={`${classes.sectionTitle} mb-5`}>
							{content.proofTitle}
						</h2>
						<ul className="space-y-3">
							{content.proof.map((item) => (
								<li
									key={item}
									className="border-border/70 border-l-2 pl-3 text-sm"
								>
									{item}
								</li>
							))}
						</ul>
					</aside>
				</section>
				<section>
					<h2 className={`${classes.sectionTitle} mb-5`}>
						{content.processTitle}
					</h2>
					<ol className="grid grid-cols-1 gap-3 md:grid-cols-3">
						{content.process.map((step, index) => (
							<li key={step} className="border border-border/70 p-4">
								<p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em]">
									{lang === "ru" ? `Этап ${index + 1}` : `Stage ${index + 1}`}
								</p>
								<p className="text-sm">{step}</p>
							</li>
						))}
					</ol>
				</section>
			</>
		);
	}

	if (slug === "v02-technical-spec") {
		return (
			<>
				<section className="border-border/80 border-y py-2">
					<h2 className="sr-only">{content.offersTitle}</h2>
					{content.offers.map((offer, index) => (
						<article
							key={offer.title}
							className="grid grid-cols-1 border-border/80 border-b py-4 last:border-b-0 md:grid-cols-12 md:gap-6"
						>
							<p className="font-mono text-xs uppercase tracking-[0.12em] md:col-span-2">
								{lang === "ru" ? `Блок ${index + 1}` : `Module ${index + 1}`}
							</p>
							<div className="md:col-span-4">
								<h3 className="font-bold text-lg">{offer.title}</h3>
							</div>
							<p className="text-muted-foreground text-sm md:col-span-4">
								{offer.description}
							</p>
							<p className="text-sm md:col-span-2">{offer.result}</p>
						</article>
					))}
				</section>
				<section className="grid grid-cols-1 gap-10 md:grid-cols-2">
					<div>
						<h2 className={`${classes.sectionTitle} mb-4`}>
							{content.processTitle}
						</h2>
						<ol className="space-y-2 font-mono text-sm">
							{content.process.map((step, index) => (
								<li key={step}>
									{index + 1}. {step}
								</li>
							))}
						</ol>
					</div>
					<div>
						<h2 className={`${classes.sectionTitle} mb-4`}>
							{content.proofTitle}
						</h2>
						<ul className="space-y-2">
							{content.proof.map((item) => (
								<li key={item} className="text-sm">
									• {item}
								</li>
							))}
						</ul>
					</div>
				</section>
			</>
		);
	}

	if (slug === "v03-timeline-proof") {
		return (
			<>
				<section>
					<h2 className={`${classes.sectionTitle} mb-6`}>
						{content.processTitle}
					</h2>
					<div className="space-y-5 border-border/60 border-l pl-5">
						{content.process.map((step, index) => (
							<div key={step} className="relative">
								<div className="absolute top-1 -left-[1.55rem] h-3 w-3 rounded-full bg-accent" />
								<p className="mb-1 font-mono text-[11px] uppercase tracking-[0.12em]">
									{lang === "ru" ? `Неделя ${index + 1}` : `Week ${index + 1}`}
								</p>
								<p className="text-sm md:text-base">{step}</p>
							</div>
						))}
					</div>
				</section>
				<section className="grid grid-cols-1 gap-8 md:grid-cols-2">
					<div>
						<h2 className={`${classes.sectionTitle} mb-4`}>
							{content.offersTitle}
						</h2>
						{renderOffersStack(content, classes)}
					</div>
					<div>
						<h2 className={`${classes.sectionTitle} mb-4`}>
							{content.proofTitle}
						</h2>
						{content.proof.map((item) => (
							<p key={item} className="border-border/70 border-b py-3 text-sm">
								{item}
							</p>
						))}
					</div>
				</section>
			</>
		);
	}

	if (slug === "v04-case-narrative") {
		return (
			<>
				<section className="grid grid-cols-1 gap-8 md:grid-cols-3">
					<div className="md:col-span-2">
						<h2 className={`${classes.sectionTitle} mb-4`}>
							{content.offersTitle}
						</h2>
						{content.offers.map((offer) => (
							<article
								key={offer.title}
								className="border-border/80 border-b py-5"
							>
								<h3 className="mb-2 font-bold text-xl">{offer.title}</h3>
								<p className="mb-3 text-muted-foreground">
									{offer.description}
								</p>
								<p className="font-medium text-sm">{offer.result}</p>
							</article>
						))}
					</div>
					<div>
						<h2 className={`${classes.sectionTitle} mb-4`}>
							{content.proofTitle}
						</h2>
						<ul className="space-y-4">
							{content.proof.map((item) => (
								<li key={item} className="text-sm">
									{item}
								</li>
							))}
						</ul>
					</div>
				</section>
				<section className="border-border/80 border-y py-6">
					<h2 className={`${classes.sectionTitle} mb-4`}>
						{content.processTitle}
					</h2>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
						{content.process.map((step, index) => (
							<div key={step} className="border border-border/60 p-4">
								<p className="mb-2 font-semibold text-sm">
									{lang === "ru"
										? `Решение ${index + 1}`
										: `Decision ${index + 1}`}
								</p>
								<p className="text-muted-foreground text-sm">{step}</p>
							</div>
						))}
					</div>
				</section>
			</>
		);
	}

	if (slug === "v05-offer-matrix") {
		return (
			<>
				<section className="border-border/80 border-y">
					<h2 className="sr-only">{content.offersTitle}</h2>
					{content.offers.map((offer) => (
						<article
							key={offer.title}
							className="grid grid-cols-1 border-border/80 border-b py-4 last:border-b-0 md:grid-cols-3 md:gap-6"
						>
							<h3 className="font-bold text-lg">{offer.title}</h3>
							<p className="text-muted-foreground text-sm">
								{offer.description}
							</p>
							<p className="text-sm">{offer.result}</p>
						</article>
					))}
				</section>
				<section className="grid grid-cols-1 gap-10 md:grid-cols-2">
					<div>
						<h2 className={`${classes.sectionTitle} mb-4`}>
							{content.faqTitle}
						</h2>
						{content.faq.map((qa) => (
							<div key={qa.question} className="border-border/70 border-b py-3">
								<p className="mb-1 font-semibold text-sm">{qa.question}</p>
								<p className="text-muted-foreground text-sm">{qa.answer}</p>
							</div>
						))}
					</div>
					<div>
						<h2 className={`${classes.sectionTitle} mb-4`}>
							{content.proofTitle}
						</h2>
						<ul className="space-y-2">
							{content.proof.map((item) => (
								<li key={item} className="text-sm">
									• {item}
								</li>
							))}
						</ul>
					</div>
				</section>
			</>
		);
	}

	if (slug === "v06-single-cta") {
		return (
			<>
				<section className="border-border/80 border-y py-8">
					<h2 className={`${classes.sectionTitle} mb-4`}>
						{content.offersTitle}
					</h2>
					<ul className="space-y-2">
						{content.offers.map((offer) => (
							<li key={offer.title} className="text-sm md:text-base">
								• <span className="font-semibold">{offer.title}:</span>{" "}
								{offer.result}
							</li>
						))}
					</ul>
				</section>
				<section className="space-y-4">
					<h2 className={`${classes.sectionTitle} text-3xl md:text-5xl`}>
						{content.ctaTitle}
					</h2>
					<p className="max-w-3xl text-muted-foreground">{content.ctaBody}</p>
				</section>
			</>
		);
	}

	if (slug === "v07-faq-conversion") {
		return (
			<>
				<section className="border-border/80 border-y py-6">
					<h2 className={`${classes.sectionTitle} mb-6`}>{content.faqTitle}</h2>
					<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
						{content.faq.map((qa) => (
							<article key={qa.question}>
								<h3 className="mb-2 font-semibold text-base">{qa.question}</h3>
								<p className="text-muted-foreground text-sm">{qa.answer}</p>
							</article>
						))}
					</div>
				</section>
				<section className="grid grid-cols-1 gap-8 md:grid-cols-12">
					<div className="md:col-span-7">
						<h2 className={`${classes.sectionTitle} mb-4`}>
							{content.offersTitle}
						</h2>
						{renderOffersStack(content, classes)}
					</div>
					<div className="md:col-span-5">
						<h2 className={`${classes.sectionTitle} mb-4`}>
							{content.proofTitle}
						</h2>
						{content.proof.map((item) => (
							<p key={item} className="border-border/70 border-b py-3 text-sm">
								{item}
							</p>
						))}
					</div>
				</section>
			</>
		);
	}

	if (slug === "v08-scope-pricing") {
		return (
			<>
				<section>
					<h2 className={`${classes.sectionTitle} mb-4`}>
						{content.offersTitle}
					</h2>
					<div className="space-y-3">
						{content.offers.map((offer) => (
							<article
								key={offer.title}
								className="border border-border/70 p-4"
							>
								<h3 className="mb-2 font-bold text-lg">{offer.title}</h3>
								<p className="mb-2 text-muted-foreground text-sm">
									{offer.description}
								</p>
								<p className="font-medium text-sm">{offer.result}</p>
							</article>
						))}
					</div>
				</section>
				<section className="grid grid-cols-1 gap-8 border-border/80 border-y py-6 md:grid-cols-2">
					<div>
						<h2 className={`${classes.sectionTitle} mb-4`}>
							{content.processTitle}
						</h2>
						<ol className="space-y-2">
							{content.process.map((step, index) => (
								<li key={step} className="text-sm">
									{index + 1}. {step}
								</li>
							))}
						</ol>
					</div>
					<div>
						<h2 className={`${classes.sectionTitle} mb-4`}>
							{content.faqTitle}
						</h2>
						{content.faq.slice(0, 2).map((qa) => (
							<div key={qa.question} className="border-border/70 border-b py-2">
								<p className="font-semibold text-sm">{qa.question}</p>
								<p className="text-muted-foreground text-sm">{qa.answer}</p>
							</div>
						))}
					</div>
				</section>
			</>
		);
	}

	if (slug === "v09-minimal-letter") {
		return (
			<section className="mx-auto max-w-3xl border-border/80 border-y py-8">
				<p className="mb-4 text-muted-foreground text-sm">
					{lang === "ru" ? "Привет." : "Hi,"}
				</p>
				<p className="mb-4 text-sm md:text-base">{content.heroLead}</p>
				<p className="mb-6 text-sm md:text-base">{content.heroPunch}</p>
				<h2 className="mb-3 font-bold text-xl">{content.offersTitle}</h2>
				<ul className="mb-6 space-y-2">
					{content.offers.map((offer) => (
						<li key={offer.title} className="text-sm">
							• <span className="font-semibold">{offer.title}</span> —{" "}
							{offer.result}
						</li>
					))}
				</ul>
				<p className="text-sm md:text-base">
					{lang === "ru"
						? "Если формат подходит, напишите пару строк про задачу."
						: "If this format fits, send a short note about your task."}
				</p>
			</section>
		);
	}

	if (slug === "v10-direct-response") {
		return (
			<>
				<section className="border-border/80 border-y py-8">
					<h2 className={`${classes.sectionTitle} mb-4`}>
						{content.offersTitle}
					</h2>
					{content.offers.map((offer) => (
						<article
							key={offer.title}
							className="border-border/70 border-b py-3 last:border-b-0"
						>
							<p className="font-semibold text-sm uppercase tracking-[0.08em]">
								{offer.title}
							</p>
							<p className="text-muted-foreground text-sm">
								{offer.description}
							</p>
							<p className="text-sm">{offer.result}</p>
						</article>
					))}
				</section>
				<section className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{content.proof.map((item) => (
						<p key={item} className="text-sm md:text-base">
							{item}
						</p>
					))}
				</section>
				<section>
					<h2 className={`${classes.sectionTitle} mb-4`}>
						{content.processTitle}
					</h2>
					<ol className="space-y-1 font-mono text-sm">
						{content.process.map((step, index) => (
							<li key={step}>
								{index + 1}. {step}
							</li>
						))}
					</ol>
				</section>
			</>
		);
	}

	return (
		<section className="border-border/80 border-y py-8">
			{renderOffersStack(content, classes)}
		</section>
	);
}

export default async function ServicesLabVariantPage({
	params,
}: VariantPageProps) {
	const { locale, variant } = await params;
	const lang = getLocale(locale);
	const config = getVariantBySlug(variant);

	if (!config) {
		notFound();
	}

	const content = config.content[lang];
	const classes = getStyleClasses(config.styleToken);
	const prefix = getLocalePrefix(lang);
	const contactHref = `${prefix}/contact`;
	const indexHref = `${prefix}/services/lab`;

	return (
		<main className={classes.container}>
			<section className="space-y-5">
				<div className="flex flex-wrap items-center gap-3">
					<p className={classes.tag}>{content.eyebrow}</p>
					<p className="font-mono text-muted-foreground text-xs uppercase tracking-[0.14em]">
						{getKindLabel(config.kind, lang)}
					</p>
				</div>
				<h1
					className={`${classes.heroTitle} fade-in slide-in-from-bottom-2 animate-in duration-500`}
					style={{
						fontFamily: "Heading Now Variable",
						fontVariationSettings: `'wght' 900, 'wdth' 900`,
					}}
				>
					{content.heroTitle}
				</h1>
				<p className={classes.heroLead}>{content.heroLead}</p>
				<p className={classes.heroPunch}>{content.heroPunch}</p>
			</section>

			{renderVariantBody(config.slug, lang, classes, content)}

			<section className="border-accent/30 border-t pt-8">
				<h2 className="mb-3 font-bold text-2xl md:text-3xl">
					{content.ctaTitle}
				</h2>
				<p className="mb-5 max-w-3xl text-muted-foreground">
					{content.ctaBody}
				</p>
				<div className="flex flex-wrap gap-3">
					<Link href={contactHref} className={classes.ctaButton}>
						{content.ctaButton}
					</Link>
					<Link
						href={indexHref}
						className="inline-flex items-center rounded-xl border border-border px-4 py-3 font-semibold text-sm transition-colors hover:border-accent/40 hover:text-accent"
					>
						{lang === "ru" ? "Все варианты" : "All variants"}
					</Link>
				</div>
			</section>

			<nav
				aria-label="Variant navigation"
				className="border-border/80 border-t pt-6"
			>
				<ul className="grid grid-cols-2 gap-2 md:grid-cols-5">
					{LAB_VARIANT_CONFIG.map((item, index) => (
						<li key={item.slug}>
							<Link
								href={`${prefix}/services/lab/${item.slug}`}
								className={`block border px-2 py-2 text-center font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${
									item.slug === config.slug
										? "border-accent/40 bg-accent/10"
										: "border-border hover:border-accent/40"
								}`}
							>
								v{String(index + 1).padStart(2, "0")}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</main>
	);
}
