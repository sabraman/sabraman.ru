import type { Metadata } from "next";
import type { SupportedLocale } from "~/i18n/types";
import {
	buildLocalizedAlternates,
	getLocalizedAbsoluteUrl,
} from "~/lib/seo/metadata";
import { SITE_LEGAL_PROFILE, SITE_TITLE } from "~/lib/site-config";

type LegalPageSection = {
	items?: string[];
	paragraphs: string[];
	title: string;
};

type LegalPageData = {
	description: string;
	eyebrow: string;
	lead: string;
	navLabel: string;
	sections: LegalPageSection[];
	title: string;
};

export const LEGAL_PAGE_SLUGS = [
	"contacts",
	"delivery",
	"refunds",
	"privacy",
	"offer",
	"ip-rights",
] as const;

export type LegalPageSlug = (typeof LEGAL_PAGE_SLUGS)[number];

const LEGAL_PAGES: Record<
	SupportedLocale,
	Record<LegalPageSlug, LegalPageData>
> = {
	en: {
		contacts: {
			navLabel: "Contacts",
			title: "Contacts and support",
			description:
				"Current contacts, support channels, and contractor details for sabraman.ru.",
			eyebrow: "Contacts",
			lead: "Current contact details for service requests, payment, refunds, and support.",
			sections: [
				{
					title: "Service provider",
					paragraphs: [
						`${SITE_LEGAL_PROFILE.fullNameEn} (${SITE_LEGAL_PROFILE.fullNameRu}), ${SITE_LEGAL_PROFILE.status.en}, TIN ${SITE_LEGAL_PROFILE.inn}.`,
					],
				},
				{
					title: "Contact channels",
					paragraphs: [
						`Email: ${SITE_LEGAL_PROFILE.email}.`,
						`Phone: ${SITE_LEGAL_PROFILE.phone}.`,
						`Telegram: ${SITE_LEGAL_PROFILE.telegram}.`,
						`Address for contact and business correspondence: ${SITE_LEGAL_PROFILE.address.en}.`,
					],
				},
				{
					title: "Support",
					paragraphs: [
						"Questions about services, invoices, cancellations, refunds, and follow-up support are handled via email, Telegram, or phone.",
					],
				},
			],
		},
		delivery: {
			navLabel: "Delivery",
			title: "Delivery, pricing, and service regions",
			description:
				"Digital delivery terms, pricing baseline, and service regions for sabraman.ru.",
			eyebrow: "Delivery",
			lead: "The website provides digital services only. No physical shipping is used.",
			sections: [
				{
					title: "Delivery format",
					paragraphs: [
						"Physical delivery does not apply. Results are transferred via Git repository, archive, deployment link, Figma, email, or Telegram.",
						"Delivery cost for the result is 0 RUB.",
					],
				},
				{
					title: "Pricing and timelines",
					paragraphs: [
						`Public base rate: ${SITE_LEGAL_PROFILE.baseRate.en}.`,
						"The final price, project scope, milestones, and deadlines are agreed before payment and fixed in the invoice, correspondence, or project brief.",
					],
				},
				{
					title: "Regions",
					paragraphs: [
						"Services are provided remotely in Russia and in other regions when this does not violate applicable law or payment-provider restrictions.",
					],
				},
			],
		},
		refunds: {
			navLabel: "Refunds",
			title: "Refunds and payment cancellation",
			description:
				"Order cancellation and refund policy for sabraman.ru digital services.",
			eyebrow: "Refunds",
			lead: "Standard cancellation and refund terms for digital services.",
			sections: [
				{
					title: "Refund rules",
					paragraphs: [
						"If an order is cancelled before work starts, the paid amount is refunded in full.",
						"If work has already started, the refund is calculated proportionally to the unperformed part of the services. Hours worked, agreed stages, and accepted interim results remain payable.",
						"If the client has accepted a stage or received source files, access credentials, layouts, code, or other materials for that stage, that stage is non-refundable.",
					],
				},
				{
					title: "How to request a refund",
					paragraphs: [
						`Refund or cancellation requests should be sent to ${SITE_LEGAL_PROFILE.email} or ${SITE_LEGAL_PROFILE.telegram}.`,
						"The request should include the payment date, amount, and order description.",
						"Requests are reviewed within up to 10 calendar days unless the law or payment-service rules require another deadline.",
					],
				},
			],
		},
		privacy: {
			navLabel: "Privacy",
			title: "Personal data policy",
			description: "Personal data processing policy for sabraman.ru.",
			eyebrow: "Privacy",
			lead: "This page describes what personal data may be processed and why.",
			sections: [
				{
					title: "Operator and purposes",
					paragraphs: [
						`Personal data operator: ${SITE_LEGAL_PROFILE.fullNameEn} (${SITE_LEGAL_PROFILE.fullNameRu}), ${SITE_LEGAL_PROFILE.status.en}, TIN ${SITE_LEGAL_PROFILE.inn}, address: ${SITE_LEGAL_PROFILE.address.en}, email: ${SITE_LEGAL_PROFILE.email}.`,
						"Personal data is processed to respond to enquiries, agree project scope, issue invoices, perform contractual obligations, process refunds, and comply with Russian law.",
					],
				},
				{
					title: "Data that may be processed",
					paragraphs: [],
					items: [
						"Name and other information voluntarily provided by the user.",
						"Email, phone number, Telegram handle, and other contact information.",
						"The contents of messages, attached files, and technical briefs.",
						"Technical visit data including IP address, user agent, cookies, and hosting logs.",
					],
				},
				{
					title: "Processing and rights",
					paragraphs: [
						"Processing may include collecting, recording, storing, updating, using, transferring to contractors when required for performance, anonymizing, and deleting data within the scope needed for those purposes.",
						"Cross-border transfer is not performed unless it is separately required to execute an order and explicitly agreed.",
						`A data subject may request information about processing, correction, blocking, or deletion of their data by writing to ${SITE_LEGAL_PROFILE.email}.`,
					],
				},
			],
		},
		offer: {
			navLabel: "Offer",
			title: "Public offer",
			description: "Public offer for digital services on sabraman.ru.",
			eyebrow: "Offer",
			lead: "Standing public offer for digital services rendered remotely.",
			sections: [
				{
					title: "Contractor and subject",
					paragraphs: [
						`Contractor: ${SITE_LEGAL_PROFILE.fullNameEn} (${SITE_LEGAL_PROFILE.fullNameRu}), ${SITE_LEGAL_PROFILE.status.en}, TIN ${SITE_LEGAL_PROFILE.inn}, address: ${SITE_LEGAL_PROFILE.address.en}, email: ${SITE_LEGAL_PROFILE.email}, phone: ${SITE_LEGAL_PROFILE.phone}.`,
						"The subject of the offer is the provision of digital services related to frontend development, interface design, consulting, implementation, and delivery of electronic results.",
					],
				},
				{
					title: "Price and acceptance",
					paragraphs: [
						`Public base rate: ${SITE_LEGAL_PROFILE.baseRate.en}. Final price, deadlines, and scope are fixed in the invoice, correspondence, or project brief.`,
						"Acceptance of the offer occurs through full or partial invoice payment or written confirmation of the order by email or Telegram.",
						"After payment, a receipt is issued through the Russian 'My Tax' application in accordance with the rules for professional income tax payers.",
					],
				},
			],
		},
		"ip-rights": {
			navLabel: "IP Rights",
			title: "IP rights, licenses, and trademarks",
			description:
				"Intellectual property, licensing, and trademark terms for sabraman.ru.",
			eyebrow: "IP Rights",
			lead: "The website sells lawful digital services, not third-party software licenses as goods.",
			sections: [
				{
					title: "Rights to work results",
					paragraphs: [
						"Rights to the work result are transferred only to the extent agreed by the parties and, by default, after full payment for the relevant scope of work.",
						"The contractor's own tools, reusable know-how, open-source libraries, frameworks, and third-party components do not transfer automatically unless explicitly agreed in writing.",
					],
				},
				{
					title: "Customer materials and trademarks",
					paragraphs: [
						"When a project uses trademarks, logos, texts, images, fonts, source files, or other customer-supplied materials, the customer confirms that it has the necessary rights or the rights holder's permission to transfer them for order fulfillment.",
						"The contractor may refuse any order that appears to violate third-party rights, Russian law, or payment-service rules.",
					],
				},
				{
					title: "Compliance statement",
					paragraphs: [],
					items: [
						"No prohibited goods or services under Russian law.",
						"No counterfeit goods, replica products, or rights-infringing goods.",
						"No magical or psychic services, file hosting, telemarketing, financial pyramids, loan-brokering, alcohol, tobacco, or prohibited drugs.",
						"No software resale without supplier or developer agreements.",
					],
				},
			],
		},
	},
	ru: {
		contacts: {
			navLabel: "Контакты",
			title: "Контакты и поддержка",
			description:
				"Актуальные контакты, поддержка и сведения об исполнителе на sabraman.ru.",
			eyebrow: "Контакты",
			lead: "Актуальные контакты для связи по услугам, оплате, возвратам и сопровождению.",
			sections: [
				{
					title: "Исполнитель",
					paragraphs: [
						`${SITE_LEGAL_PROFILE.fullNameRu}, ${SITE_LEGAL_PROFILE.status.ru}, ИНН ${SITE_LEGAL_PROFILE.inn}.`,
					],
				},
				{
					title: "Каналы связи",
					paragraphs: [
						`Email: ${SITE_LEGAL_PROFILE.email}.`,
						`Телефон: ${SITE_LEGAL_PROFILE.phone}.`,
						`Telegram: ${SITE_LEGAL_PROFILE.telegram}.`,
						`Адрес для связи и деловой корреспонденции: ${SITE_LEGAL_PROFILE.address.ru}.`,
					],
				},
				{
					title: "Поддержка",
					paragraphs: [
						"По вопросам услуг, счетов, отмены, возврата и сопровождения можно писать на email, в Telegram или звонить по телефону.",
					],
				},
			],
		},
		delivery: {
			navLabel: "Доставка",
			title: "Передача результата, цена и регионы",
			description:
				"Условия цифровой передачи результата, базовая цена и регионы оказания услуг на sabraman.ru.",
			eyebrow: "Передача результата",
			lead: "Сайт оказывает только цифровые услуги. Физическая доставка не используется.",
			sections: [
				{
					title: "Формат передачи",
					paragraphs: [
						"Физическая доставка не применяется. Результат передается через Git-репозиторий, архив, ссылку на деплой, Figma, email или Telegram.",
						"Стоимость передачи результата: 0 ₽.",
					],
				},
				{
					title: "Цена и сроки",
					paragraphs: [
						`Публичная базовая ставка: ${SITE_LEGAL_PROFILE.baseRate.ru}.`,
						"Итоговая стоимость, объем работ, этапы и сроки фиксируются до оплаты в счете, переписке или техническом задании.",
					],
				},
				{
					title: "Регионы",
					paragraphs: [
						"Услуги оказываются дистанционно по России и в иных регионах, если это не нарушает законодательство и ограничения платежного сервиса.",
					],
				},
			],
		},
		refunds: {
			navLabel: "Возврат",
			title: "Возврат и отмена платежа",
			description: "Условия отмены заказа и возврата средств на sabraman.ru.",
			eyebrow: "Возврат",
			lead: "Стандартные условия отмены заказа и возврата средств для цифровых услуг.",
			sections: [
				{
					title: "Правила возврата",
					paragraphs: [
						"Если заказ отменен до начала работ, оплаченная сумма возвращается в полном объеме.",
						"Если работы уже начаты, возврат рассчитывается пропорционально неоказанной части услуг. Фактически выполненные часы, согласованные этапы и принятые промежуточные результаты подлежат оплате.",
						"Если заказчик принял этап или получил исходники, доступы, макеты, код или иные материалы по этапу, возврат за такой этап не производится.",
					],
				},
				{
					title: "Как запросить возврат",
					paragraphs: [
						`Запросы на возврат или отмену принимаются через ${SITE_LEGAL_PROFILE.email} или ${SITE_LEGAL_PROFILE.telegram}.`,
						"В запросе нужно указать дату оплаты, сумму и описание заказа.",
						"Срок рассмотрения: до 10 календарных дней, если иной срок не требуется по закону или правилам платежного сервиса.",
					],
				},
			],
		},
		privacy: {
			navLabel: "Политика ПД",
			title: "Политика обработки персональных данных",
			description: "Политика обработки персональных данных сайта sabraman.ru.",
			eyebrow: "Персональные данные",
			lead: "На этой странице описано, какие персональные данные могут обрабатываться и зачем.",
			sections: [
				{
					title: "Оператор и цели обработки",
					paragraphs: [
						`Оператор персональных данных: ${SITE_LEGAL_PROFILE.fullNameRu}, ${SITE_LEGAL_PROFILE.status.ru}, ИНН ${SITE_LEGAL_PROFILE.inn}, адрес: ${SITE_LEGAL_PROFILE.address.ru}, email: ${SITE_LEGAL_PROFILE.email}.`,
						"Персональные данные обрабатываются для ответа на обращения, согласования заказа, выставления счета, исполнения договоренностей, возврата средств и соблюдения законодательства РФ.",
					],
				},
				{
					title: "Какие данные могут обрабатываться",
					paragraphs: [],
					items: [
						"Имя и иные сведения, которые пользователь сообщает самостоятельно.",
						"Email, номер телефона, Telegram и иные контактные данные.",
						"Содержание сообщений, приложенные файлы и технические задания.",
						"Технические данные визита: IP-адрес, user-agent, cookie и логи хостинга.",
					],
				},
				{
					title: "Порядок обработки и права субъекта",
					paragraphs: [
						"Обработка может включать сбор, запись, хранение, уточнение, использование, передачу контрагентам при необходимости исполнения заказа, обезличивание и удаление данных в необходимом объеме.",
						"Трансграничная передача не осуществляется, если иное отдельно не требуется для исполнения заказа и не согласовано прямо.",
						`Субъект персональных данных может запросить сведения об обработке, уточнение, блокирование или удаление данных, написав на ${SITE_LEGAL_PROFILE.email}.`,
					],
				},
			],
		},
		offer: {
			navLabel: "Оферта",
			title: "Договор оферты",
			description:
				"Публичная оферта на оказание цифровых услуг на sabraman.ru.",
			eyebrow: "Оферта",
			lead: "Публичная оферта на оказание цифровых услуг дистанционно.",
			sections: [
				{
					title: "Исполнитель и предмет",
					paragraphs: [
						`Исполнитель: ${SITE_LEGAL_PROFILE.fullNameRu}, ${SITE_LEGAL_PROFILE.status.ru}, ИНН ${SITE_LEGAL_PROFILE.inn}, адрес: ${SITE_LEGAL_PROFILE.address.ru}, email: ${SITE_LEGAL_PROFILE.email}, телефон: ${SITE_LEGAL_PROFILE.phone}.`,
						"Предмет оферты: оказание цифровых услуг по фронтенд-разработке, дизайну интерфейсов, консультациям, внедрению и передаче электронного результата.",
					],
				},
				{
					title: "Цена и акцепт",
					paragraphs: [
						`Публичная базовая ставка: ${SITE_LEGAL_PROFILE.baseRate.ru}. Итоговая стоимость, сроки и объем работ фиксируются в счете, переписке или техническом задании.`,
						"Акцептом оферты считается полная или частичная оплата счета либо письменное подтверждение заказа по email или в Telegram.",
						"После оплаты исполнитель формирует чек в приложении «Мой налог» в порядке, предусмотренном для плательщиков налога на профессиональный доход.",
					],
				},
			],
		},
		"ip-rights": {
			navLabel: "Права",
			title: "Права, лицензии и товарные знаки",
			description:
				"Условия по интеллектуальной собственности, лицензиям и товарным знакам на sabraman.ru.",
			eyebrow: "Права",
			lead: "Сайт оказывает законные цифровые услуги и не продает чужие лицензии как самостоятельный товар.",
			sections: [
				{
					title: "Права на результат работ",
					paragraphs: [
						"Права на результат работ передаются только в объеме, согласованном сторонами, и по умолчанию после полной оплаты соответствующего объема работ.",
						"Права на собственные инструменты исполнителя, переиспользуемые наработки, open-source библиотеки, фреймворки и сторонние компоненты автоматически не переходят, если иное не согласовано письменно.",
					],
				},
				{
					title: "Материалы заказчика и товарные знаки",
					paragraphs: [
						"Если в заказе используются товарные знаки, логотипы, тексты, изображения, шрифты, исходники или иные материалы заказчика, заказчик подтверждает наличие прав или разрешения правообладателя на их использование и передачу исполнителю.",
						"Исполнитель вправе отказаться от заказа, если есть признаки нарушения прав третьих лиц, законодательства РФ или правил платежного сервиса.",
					],
				},
				{
					title: "Заявление о соответствии",
					paragraphs: [],
					items: [
						"Нет товаров и услуг, запрещенных законодательством РФ.",
						"Нет подделок, реплик и товаров, нарушающих права правообладателей.",
						"Нет магических услуг, файлового хостинга, телемаркетинга, финансовых пирамид, сервисов займов, алкоголя, табака и запрещенных препаратов.",
						"Нет продажи ПО без договоров с поставщиками или разработчиками.",
					],
				},
			],
		},
	},
};

export function isLegalPageSlug(value: string): value is LegalPageSlug {
	return LEGAL_PAGE_SLUGS.includes(value as LegalPageSlug);
}

export function getLegalPage(locale: SupportedLocale, slug: LegalPageSlug) {
	return LEGAL_PAGES[locale][slug];
}

export function getLegalPageLinkItems(locale: SupportedLocale) {
	return LEGAL_PAGE_SLUGS.map((slug) => ({
		label: LEGAL_PAGES[locale][slug].navLabel,
		slug,
	}));
}

export function buildLegalPageMetadata(
	locale: SupportedLocale,
	slug: LegalPageSlug,
): Metadata {
	const page = getLegalPage(locale, slug);
	const path = `/legal/${slug}`;

	return {
		title: page.title,
		description: page.description,
		alternates: buildLocalizedAlternates(path, locale),
		openGraph: {
			title: page.title,
			description: page.description,
			url: getLocalizedAbsoluteUrl(locale, path),
			siteName: SITE_TITLE,
			locale: locale === "ru" ? "ru_RU" : "en_US",
			type: "article",
		},
		twitter: {
			card: "summary",
			title: page.title,
			description: page.description,
		},
		robots: {
			index: true,
			follow: true,
		},
	};
}
