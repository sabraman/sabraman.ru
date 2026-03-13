import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import Link from "next/link";

type Locale = "en" | "ru";

type ServiceCard = {
	title: string;
	description: string;
	deliverables: string[];
};

type ServicePageContent = {
	title: string;
	description: string;
	teaser: string;
	heroBullets: string[];
	servicesTitle: string;
	services: ServiceCard[];
	processTitle: string;
	processSteps: string[];
	ctaTitle: string;
	ctaDescription: string;
	ctaButton: string;
	keywords: string[];
};

const contentByLocale: Record<Locale, ServicePageContent> = {
	en: {
		title: "Services - Sabraman | Design, Telegram Bots, Web Apps",
		description:
			"Indie designer-developer services by Danya Yudin (Sabraman): brand design, web app development, Telegram bots and mini apps.",
		teaser:
			"I work with founders and small teams who need clean design and working product delivery without agency overhead.",
		heroBullets: [
			"You work directly with me from start to launch",
			"Design and development stay in one workflow",
			"Clear scope, fast iterations, no extra layers",
		],
		servicesTitle: "What I can build for you",
		services: [
			{
				title: "Brand & Visual System",
				description:
					"I build visual identity systems that look sharp and stay consistent across product and marketing.",
				deliverables: [
					"Logo direction and core identity",
					"Brand assets for product, social, and content",
					"Simple usage guide your team can follow",
				],
			},
			{
				title: "Web Product Development",
				description:
					"I ship websites and web apps with Next.js and TypeScript, with a focus on speed, clarity, and long-term support.",
				deliverables: [
					"Marketing pages and product websites",
					"Internal tools and workflow apps",
					"Solid performance, accessibility, and SEO baseline",
				],
			},
			{
				title: "Telegram Bots & Mini Apps",
				description:
					"I build Telegram bots and mini apps that automate routine work and improve user experience.",
				deliverables: [
					"Telegram bots for business operations",
					"Mini apps with clear and usable interfaces",
					"API integrations and reporting flows",
				],
			},
		],
		processTitle: "How we work",
		processSteps: [
			"Short discovery call: goals, priorities, constraints",
			"Build in iterations: design and development in parallel",
			"Launch and follow-up: fixes, polish, and next steps",
		],
		ctaTitle: "Need a focused partner, not a big agency?",
		ctaDescription:
			"Send your task, timeline, and budget range. I will reply with a practical plan and scope.",
		ctaButton: "Discuss project",
		keywords: [
			"indie developer services",
			"telegram bot developer",
			"next.js developer",
			"brand designer developer",
			"web app development services",
		],
	},
	ru: {
		title: "Услуги - Sabraman | Дизайн, Telegram-боты, веб-приложения",
		description:
			"Услуги инди-дизайнера и разработчика Дани Юдина (Sabraman): брендинг, веб-разработка, Telegram-боты и mini app.",
		teaser:
			"Работаю с фаундерами и небольшими командами: делаю дизайн и разработку без студийной бюрократии.",
		heroBullets: [
			"Прямой контакт со мной от брифа до запуска",
			"Дизайн и разработка в одном рабочем потоке",
			"Понятный объем задач и быстрые итерации",
		],
		servicesTitle: "Что я могу сделать для вас",
		services: [
			{
				title: "Брендинг и визуальная система",
				description:
					"Собираю фирменный стиль, который хорошо выглядит и стабильно работает в продукте и маркетинге.",
				deliverables: [
					"Лого-направление и базовая айдентика",
					"Бренд-материалы для продукта, соцсетей и контента",
					"Короткий гайд по использованию",
				],
			},
			{
				title: "Разработка веб-продуктов",
				description:
					"Делаю сайты и веб-приложения на Next.js и TypeScript с упором на скорость, понятность и поддержку.",
				deliverables: [
					"Продуктовые сайты и посадочные страницы",
					"Внутренние сервисы и рабочие инструменты",
					"Нормальная производительность, доступность и SEO-база",
				],
			},
			{
				title: "Telegram-боты и mini app",
				description:
					"Разрабатываю Telegram-ботов и mini app, которые снимают рутину и улучшают клиентский опыт.",
				deliverables: [
					"Боты для операционных задач бизнеса",
					"Mini app с удобным и понятным интерфейсом",
					"Интеграции с API и отчетностью",
				],
			},
		],
		processTitle: "Как строится работа",
		processSteps: [
			"Короткий созвон: цель, приоритеты, ограничения",
			"Работа итерациями: дизайн и разработка параллельно",
			"Запуск и сопровождение: правки, полировка, следующий этап",
		],
		ctaTitle:
			"Нужен специалист, который лично ведет проект, а не большая студия?",
		ctaDescription:
			"Напишите задачу, сроки и вилку бюджета. В ответ дам понятный план работ и объем.",
		ctaButton: "Обсудить проект",
		keywords: [
			"услуги инди разработчика",
			"разработка telegram ботов",
			"разработка на next.js",
			"брендинг и веб-разработка",
			"создание веб-приложений",
		],
	},
};

function withLocalePrefix(locale: Locale, path: string) {
	return locale === "ru" ? `/ru${path}` : path;
}

async function getServicesJsonLd(locale: Locale) {
	"use cache";
	cacheLife("days");

	const localizedPath = withLocalePrefix(locale, "/services");
	const isRussian = locale === "ru";

	return {
		"@context": "https://schema.org",
		"@type": "ProfessionalService",
		name: "Sabraman",
		url: `https://sabraman.ru${localizedPath}`,
		inLanguage: locale,
		description: isRussian
			? "Инди-дизайнер и разработчик: брендинг, веб-приложения, Telegram-боты и mini app."
			: "Indie designer-developer: branding, web apps, Telegram bots, and mini apps.",
		areaServed: "Worldwide",
		availableLanguage: ["en", "ru"],
		provider: {
			"@type": "Person",
			name: "Danya Yudin",
			alternateName: "Sabraman",
			url: "https://sabraman.ru",
		},
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: isRussian ? "Услуги Sabraman" : "Sabraman Services",
			itemListElement: contentByLocale[locale].services.map((service) => ({
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: service.title,
					description: service.description,
				},
			})),
		},
	};
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const lang: Locale = locale === "ru" ? "ru" : "en";
	const isRussian = lang === "ru";
	const path = withLocalePrefix(lang, "/services");
	const content = contentByLocale[lang];

	return {
		title: content.title,
		description: content.description,
		keywords: content.keywords,
		alternates: {
			canonical: path,
			languages: {
				en: "/services",
				ru: "/ru/services",
				"x-default": "/services",
			},
		},
		openGraph: {
			title: content.title,
			description: content.description,
			url: `https://sabraman.ru${path}`,
			siteName: "Sabraman - Danya Yudin Portfolio",
			locale: isRussian ? "ru_RU" : "en_US",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: content.title,
			description: content.description,
			images: ["/api/og"],
		},
	};
}

export default async function ServicesPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const lang: Locale = locale === "ru" ? "ru" : "en";
	const content = contentByLocale[lang];
	const servicesJsonLd = await getServicesJsonLd(lang);
	const contactHref = withLocalePrefix(lang, "/contact");

	return (
		<main className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
			/>

			<section className="mb-20">
				<p className="mb-4 font-medium text-accent text-sm uppercase tracking-[0.16em]">
					{lang === "ru" ? "Услуги" : "Services"}
				</p>
				<h1
					className="mb-6 font-extrabold text-5xl leading-[0.95] tracking-tight md:text-7xl"
					style={{
						fontFamily: "Heading Now Variable",
						fontVariationSettings: `'wght' 900, 'wdth' 900`,
					}}
				>
					{lang === "ru"
						? "Дизайн + разработка без студийной бюрократии"
						: "Design + development without agency overhead"}
				</h1>
				<p className="mb-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
					{content.teaser}
				</p>
				<ul className="space-y-2">
					{content.heroBullets.map((item) => (
						<li key={item} className="text-sm md:text-base">
							• {item}
						</li>
					))}
				</ul>
			</section>

			<section className="mb-16">
				<h2 className="mb-8 font-bold text-3xl md:text-4xl">
					{content.servicesTitle}
				</h2>
				<div className="border-primary/20 border-y">
					{content.services.map((service) => (
						<article
							key={service.title}
							className="grid grid-cols-1 gap-6 border-primary/15 border-b py-8 last:border-b-0 md:grid-cols-12"
						>
							<div className="md:col-span-4">
								<h3 className="font-bold text-2xl leading-tight">
									{service.title}
								</h3>
							</div>
							<div className="md:col-span-8">
								<p className="mb-4 max-w-3xl text-muted-foreground">
									{service.description}
								</p>
								<ul className="space-y-2">
									{service.deliverables.map((deliverable) => (
										<li key={deliverable} className="text-sm md:text-base">
											• {deliverable}
										</li>
									))}
								</ul>
							</div>
						</article>
					))}
				</div>
			</section>

			<section className="mb-16">
				<h2 className="mb-8 font-bold text-3xl md:text-4xl">
					{content.processTitle}
				</h2>
				<ol className="space-y-4">
					{content.processSteps.map((step, index) => (
						<li
							key={step}
							className="flex gap-4 border-primary/15 border-b pb-4 last:border-b-0"
						>
							<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-accent/40 font-mono text-accent text-xs">
								{index + 1}
							</div>
							<div>
								<p className="mb-1 font-mono text-muted-foreground text-xs uppercase tracking-[0.14em]">
									{lang === "ru" ? `Шаг ${index + 1}` : `Step ${index + 1}`}
								</p>
								<p className="text-sm md:text-base">{step}</p>
							</div>
						</li>
					))}
				</ol>
			</section>

			<section className="border-accent/25 border-t pt-10">
				<h2 className="mb-3 font-bold text-2xl md:text-3xl">
					{content.ctaTitle}
				</h2>
				<p className="mb-5 max-w-3xl text-muted-foreground">
					{content.ctaDescription}
				</p>
				<Link
					href={contactHref}
					className="inline-flex items-center rounded-xl bg-accent px-5 py-2.5 font-semibold text-accent-foreground text-sm transition-opacity hover:opacity-90"
				>
					{content.ctaButton}
				</Link>
			</section>
		</main>
	);
}
