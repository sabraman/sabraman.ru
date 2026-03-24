import type { SupportedLocale } from "~/i18n/types";
import { SITE_LEGAL_PROFILE } from "~/lib/site-config";

type FooterSection = {
	id: string;
	title: string;
	summary: string;
	paragraphs: string[];
	items?: string[];
};

type FooterCopy = {
	eyebrow: string;
	title: string;
	description: string;
	serviceLabel: string;
	serviceValue: string;
	sellerLabel: string;
	sellerValue: string;
	addressLabel: string;
	addressValue: string;
	contactsLabel: string;
	supportLabel: string;
	supportValue: string;
	rateLabel: string;
	rateValue: string;
	sections: FooterSection[];
};

const FOOTER_COPY: Record<SupportedLocale, FooterCopy> = {
	en: {
		eyebrow: "Legal & Moderation",
		title: "Site information for payment and moderation checks",
		description:
			"This website offers lawful digital services in frontend development, interface design, and related production support. The sections below collect the information usually requested for moderation under Russian law and payment-service rules.",
		serviceLabel: "Services",
		serviceValue:
			"Frontend development, interface design, product support, and digital production services.",
		sellerLabel: "Service provider",
		sellerValue: `${SITE_LEGAL_PROFILE.fullNameEn} (${SITE_LEGAL_PROFILE.fullNameRu}), ${SITE_LEGAL_PROFILE.status.en}, TIN ${SITE_LEGAL_PROFILE.inn}.`,
		addressLabel: "Address",
		addressValue: SITE_LEGAL_PROFILE.address.en,
		contactsLabel: "Contacts",
		supportLabel: "Support",
		supportValue:
			"Questions about services, invoices, cancellations, refunds, and support are handled via email, Telegram, or phone.",
		rateLabel: "Base rate",
		rateValue: SITE_LEGAL_PROFILE.baseRate.en,
		sections: [
			{
				id: "contacts",
				title: "Contacts and support",
				summary:
					"Current contact details for service, payment, and support requests.",
				paragraphs: [
					`Email: ${SITE_LEGAL_PROFILE.email}. Phone: ${SITE_LEGAL_PROFILE.phone}. Telegram: ${SITE_LEGAL_PROFILE.telegram}.`,
					`Business correspondence and support requests are accepted using the same channels. Address for contact and business correspondence: ${SITE_LEGAL_PROFILE.address.en}.`,
				],
			},
			{
				id: "delivery",
				title: "Delivery, timelines, and regions",
				summary:
					"Digital-only delivery terms, transfer methods, and service regions.",
				paragraphs: [
					"Physical delivery does not apply. Results are delivered digitally through a Git repository, archive, deployment link, Figma, email, or Telegram.",
					"Delivery cost for the result is 0 RUB. Timelines, stages, and final scope are agreed individually before payment and recorded in the invoice, correspondence, or technical brief.",
					"Services are provided remotely in Russia and other regions when this does not violate applicable law or payment-provider restrictions.",
				],
			},
			{
				id: "refund",
				title: "Refunds and payment cancellation",
				summary:
					"Cancellation rules before work starts and proportional refunds after work begins.",
				paragraphs: [
					"If an order is cancelled before work starts, the paid amount is refunded in full.",
					"If work has already started, the refund is calculated proportionally to the unperformed part of the services. Hours worked, agreed stages, and accepted interim results remain payable.",
					"If the client has accepted a stage or received source files, access credentials, layouts, code, or other materials for that stage, that stage is non-refundable.",
					`To request a cancellation or refund, contact ${SITE_LEGAL_PROFILE.email} or ${SITE_LEGAL_PROFILE.telegram} and include the payment date, amount, and order description. Requests are reviewed within up to 10 calendar days unless the law or payment-service rules require another deadline.`,
				],
			},
			{
				id: "privacy",
				title: "Personal data policy",
				summary:
					"The operator, processing purposes, data categories, and data-subject rights.",
				paragraphs: [
					`Personal data operator: ${SITE_LEGAL_PROFILE.fullNameEn} (${SITE_LEGAL_PROFILE.fullNameRu}), ${SITE_LEGAL_PROFILE.status.en}, TIN ${SITE_LEGAL_PROFILE.inn}, address: ${SITE_LEGAL_PROFILE.address.en}, email: ${SITE_LEGAL_PROFILE.email}.`,
					"Personal data is processed to respond to enquiries, agree project scope, issue invoices, perform contractual obligations, process refunds, and comply with Russian law.",
					"Processing may include collecting, recording, storing, updating, using, transferring to contractors when required for performance, anonymizing, and deleting data within the scope needed for those purposes.",
					"Cross-border transfer is not performed unless it is directly required to execute an order and separately agreed.",
					`A data subject may request information about processing, correction, blocking, or deletion of their data by sending a request to ${SITE_LEGAL_PROFILE.email}.`,
				],
				items: [
					"Name and other details voluntarily provided by the user.",
					"Email, phone number, Telegram handle, and other contact details.",
					"The contents of messages, files, and technical briefs.",
					"Technical data that may be transmitted automatically during visits, including IP address, user agent, cookies, and hosting logs.",
				],
			},
			{
				id: "offer",
				title: "Public offer",
				summary:
					"The website publishes a standing offer for digital services rendered remotely.",
				paragraphs: [
					`The contractor is ${SITE_LEGAL_PROFILE.fullNameEn} (${SITE_LEGAL_PROFILE.fullNameRu}), ${SITE_LEGAL_PROFILE.status.en}, TIN ${SITE_LEGAL_PROFILE.inn}, address ${SITE_LEGAL_PROFILE.address.en}, email ${SITE_LEGAL_PROFILE.email}, phone ${SITE_LEGAL_PROFILE.phone}.`,
					"The subject of the offer is the provision of digital services related to frontend development, interface design, consulting, implementation, and transfer of results in electronic form.",
					`The base public rate is ${SITE_LEGAL_PROFILE.baseRate.en}. The final price, stages, and deadlines are fixed in the invoice, correspondence, or project brief.`,
					"Acceptance of the offer occurs through full or partial invoice payment or written confirmation of the order by email or Telegram. After payment, a receipt is issued through the Russian 'My Tax' application in accordance with the rules for professional income tax payers.",
				],
			},
			{
				id: "ip",
				title: "Intellectual property, licenses, and trademarks",
				summary:
					"This website sells services, not third-party software licenses or infringing goods.",
				paragraphs: [
					"This website provides services for designing and building digital products and does not sell ready-made software licenses, databases, media files, gaming software, file hosting, or other third-party intellectual property as standalone goods.",
					"Rights to the work result are transferred only to the extent agreed by the parties and, by default, after full payment for the relevant scope of work.",
					"Rights to the contractor's own tools, reusable know-how, open-source libraries, frameworks, and third-party components do not transfer automatically unless explicitly agreed in writing.",
					"When a project uses trademarks, logos, texts, images, fonts, source files, or other customer-supplied materials, the customer confirms that it has the rights to use them or the rights holder's permission to transfer them for the performance of the order.",
					"The contractor may refuse any order that appears to violate third-party rights, Russian law, or payment-service rules.",
				],
			},
			{
				id: "compliance",
				title: "Compliance statement",
				summary:
					"The website is limited to lawful digital services and is not connected to prohibited categories.",
				paragraphs: [
					"The website is hosted on commercial infrastructure, contains working pages and contact details, and presents portfolio and service information for lawful digital work.",
					"The website does not publish or support calls to unlawful conduct, terrorism propaganda, hate speech, pornography, or sales of prohibited goods and services.",
				],
				items: [
					"No sale of goods or services prohibited by Russian law.",
					"No unlicensed sponsorship, fees, or donations processing.",
					"No prohibited drugs, supplements, alcohol, or tobacco sales.",
					"No counterfeit goods, replicas, or goods infringing rights holders.",
					"No magical or psychic services.",
					"No resale of software without agreements with suppliers or developers.",
					"No gaming software goods, file hosting, telemarketing, or phone-prank services.",
					"No financial pyramids, investment projects, currency exchange points, or loan-brokering services.",
				],
			},
		],
	},
	ru: {
		eyebrow: "Юридическая информация",
		title: "Сведения для модерации, оплаты и клиентской проверки",
		description:
			"Сайт оказывает законные цифровые услуги по фронтенд-разработке, дизайну интерфейсов и сопутствующей продуктовой поддержке. Ниже собрана информация, которую обычно требуют модерация, платежные сервисы и законодательство РФ.",
		serviceLabel: "Услуги",
		serviceValue:
			"Фронтенд-разработка, дизайн интерфейсов, продуктовая поддержка и цифровое производство.",
		sellerLabel: "Исполнитель",
		sellerValue: `${SITE_LEGAL_PROFILE.fullNameRu}, ${SITE_LEGAL_PROFILE.status.ru}, ИНН ${SITE_LEGAL_PROFILE.inn}.`,
		addressLabel: "Адрес",
		addressValue: SITE_LEGAL_PROFILE.address.ru,
		contactsLabel: "Контакты",
		supportLabel: "Поддержка",
		supportValue:
			"По вопросам услуг, счетов, отмены, возврата и сопровождения можно написать на email, в Telegram или позвонить по телефону.",
		rateLabel: "Базовая ставка",
		rateValue: SITE_LEGAL_PROFILE.baseRate.ru,
		sections: [
			{
				id: "contacts",
				title: "Контакты и поддержка",
				summary:
					"Актуальные контакты для связи по услугам, оплате и сопровождению.",
				paragraphs: [
					`Email: ${SITE_LEGAL_PROFILE.email}. Телефон: ${SITE_LEGAL_PROFILE.phone}. Telegram: ${SITE_LEGAL_PROFILE.telegram}.`,
					`Контакты поддержки и сервисной связи совпадают с указанными каналами. Адрес для связи и деловой корреспонденции: ${SITE_LEGAL_PROFILE.address.ru}.`,
				],
			},
			{
				id: "delivery",
				title: "Передача результата, сроки и регионы",
				summary:
					"Условия цифровой передачи результата, сроки и география оказания услуг.",
				paragraphs: [
					"Физическая доставка не применяется. Результат передается в цифровом виде через Git-репозиторий, архив, ссылку на деплой, Figma, email или Telegram.",
					"Стоимость передачи результата: 0 ₽. Сроки, этапы и итоговый объем работ согласуются индивидуально до оплаты и фиксируются в счете, переписке или техническом задании.",
					"Услуги оказываются дистанционно по России и в иных регионах, если это не нарушает законодательство и ограничения платежного сервиса.",
				],
			},
			{
				id: "refund",
				title: "Возврат и отмена платежа",
				summary:
					"Полный возврат до старта работ и пропорциональный расчет после начала работ.",
				paragraphs: [
					"Если заказ отменен до начала работ, оплаченная сумма возвращается в полном объеме.",
					"Если работы уже начаты, возврат рассчитывается пропорционально неоказанной части услуг. Фактически выполненные часы, согласованные этапы и принятые промежуточные результаты подлежат оплате.",
					"Если заказчик принял этап или получил исходники, доступы, макеты, код или иные материалы по этапу, возврат за такой этап не производится.",
					`Для отмены или запроса возврата нужно написать на ${SITE_LEGAL_PROFILE.email} или ${SITE_LEGAL_PROFILE.telegram} и указать дату оплаты, сумму и описание заказа. Обращение рассматривается в срок до 10 календарных дней, если иной срок не требуется по закону или правилам платежного сервиса.`,
				],
			},
			{
				id: "privacy",
				title: "Политика обработки персональных данных",
				summary:
					"Оператор, цели обработки, категории данных и права субъекта данных.",
				paragraphs: [
					`Оператор персональных данных: ${SITE_LEGAL_PROFILE.fullNameRu}, ${SITE_LEGAL_PROFILE.status.ru}, ИНН ${SITE_LEGAL_PROFILE.inn}, адрес: ${SITE_LEGAL_PROFILE.address.ru}, email: ${SITE_LEGAL_PROFILE.email}.`,
					"Персональные данные обрабатываются в целях ответа на обращения, согласования заказа, выставления счета, исполнения договоренностей, возврата средств и соблюдения требований законодательства РФ.",
					"Обработка может включать сбор, запись, хранение, уточнение, использование, передачу контрагентам при необходимости исполнения заказа, обезличивание и удаление данных в объеме, необходимом для указанных целей.",
					"Трансграничная передача не осуществляется, если иное прямо не требуется для исполнения заказа и не согласовано отдельно.",
					`Субъект персональных данных вправе запросить сведения об обработке, уточнение, блокирование или удаление своих данных, направив запрос на ${SITE_LEGAL_PROFILE.email}.`,
				],
				items: [
					"Имя и иные сведения, которые пользователь сообщает самостоятельно.",
					"Email, номер телефона, Telegram и иные контактные данные.",
					"Содержание сообщений, файлов и технических заданий.",
					"Технические данные, которые могут автоматически передаваться при посещении сайта: IP-адрес, user-agent, cookie и логи хостинга.",
				],
			},
			{
				id: "offer",
				title: "Договор оферты",
				summary:
					"На сайте действует публичная оферта на оказание цифровых услуг дистанционно.",
				paragraphs: [
					`Исполнитель: ${SITE_LEGAL_PROFILE.fullNameRu}, ${SITE_LEGAL_PROFILE.status.ru}, ИНН ${SITE_LEGAL_PROFILE.inn}, адрес: ${SITE_LEGAL_PROFILE.address.ru}, email: ${SITE_LEGAL_PROFILE.email}, телефон: ${SITE_LEGAL_PROFILE.phone}.`,
					"Предмет оферты: оказание цифровых услуг по разработке, доработке, консультациям, проектированию и передаче результата в электронном виде.",
					`Базовая публичная ставка: ${SITE_LEGAL_PROFILE.baseRate.ru}. Итоговая стоимость, этапы и сроки фиксируются в счете, переписке или техническом задании.`,
					"Акцептом оферты считается полная или частичная оплата счета либо письменное подтверждение заказа по email или в Telegram. После оплаты исполнитель формирует чек в приложении «Мой налог» в порядке, предусмотренном для плательщиков налога на профессиональный доход.",
				],
			},
			{
				id: "ip",
				title: "Права, лицензии и товарные знаки",
				summary:
					"Сайт продает услуги, а не чужие лицензии на ПО или иные спорные объекты.",
				paragraphs: [
					"Сайт оказывает услуги по проектированию и разработке цифровых продуктов и не продает готовые лицензии на программное обеспечение, базы данных, медиафайлы, ПО для игр, файловый хостинг и иные чужие объекты интеллектуальной собственности как самостоятельный товар.",
					"Права на результат работ передаются только в объеме, который отдельно согласован сторонами, и по умолчанию после полной оплаты соответствующего объема работ.",
					"Права на собственные инструменты исполнителя, переиспользуемые наработки, open-source библиотеки, фреймворки и сторонние компоненты автоматически не переходят, если иное не согласовано письменно.",
					"Если в заказе используются товарные знаки, логотипы, тексты, изображения, шрифты, исходники или иные материалы заказчика, заказчик подтверждает наличие у него прав или разрешения правообладателя на их использование и передачу исполнителю.",
					"Исполнитель вправе отказаться от заказа, если есть признаки нарушения прав третьих лиц, законодательства РФ или правил платежного сервиса.",
				],
			},
			{
				id: "compliance",
				title: "Заявление о соответствии требованиям",
				summary:
					"Сайт ограничен законными цифровыми услугами и не связан с запрещенными тематиками.",
				paragraphs: [
					"Сайт размещен на коммерческом хостинге, содержит рабочие страницы и контакты, а также публикует портфолио и сведения об услугах, связанных с законной цифровой работой.",
					"На сайте отсутствуют призывы к правонарушениям, террористическая пропаганда, разжигание межнациональной, расовой или религиозной розни, порнография, а также предложения запрещенных товаров и услуг.",
				],
				items: [
					"Нет продажи товаров и услуг, запрещенных законодательством РФ.",
					"Нет приема спонсорства, взносов и пожертвований без лицензии.",
					"Нет продажи запрещенных препаратов, БАДов, алкоголя и табака.",
					"Нет подделок, реплик и товаров, нарушающих права правообладателей.",
					"Нет магических и экстрасенсорных услуг.",
					"Нет продажи ПО без договоров с поставщиками или разработчиками.",
					"Нет ПО для игр, файлового хостинга, телемаркетинга и телефонных розыгрышей.",
					"Нет финансовых пирамид, инвестиционных проектов, обмена валют и сервисов по подбору займов.",
				],
			},
		],
	},
};

function ContactLink({
	href,
	label,
	value,
}: {
	href: string;
	label: string;
	value: string;
}) {
	return (
		<a
			href={href}
			target={href.startsWith("http") ? "_blank" : undefined}
			rel={href.startsWith("http") ? "noreferrer" : undefined}
			className="rounded-full border border-white/12 px-3 py-2 text-white/72 text-xs uppercase tracking-[0.18em] transition hover:border-white/20 hover:text-white"
		>
			<span className="text-white/38">{label}</span>{" "}
			<span className="text-white">{value}</span>
		</a>
	);
}

export function SiteComplianceFooter({ locale }: { locale: SupportedLocale }) {
	const copy = FOOTER_COPY[locale];

	return (
		<footer className="relative border-white/10 border-t bg-[linear-gradient(180deg,rgba(7,8,10,0.9),rgba(6,6,8,0.98))] pt-12 pb-32">
			<div className="mx-auto max-w-5xl px-4">
				<div className="rounded-[2rem] border border-white/10 bg-[rgba(11,11,15,0.72)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8">
					<div className="grid gap-6 border-white/10 border-b pb-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
						<div className="space-y-4">
							<p className="text-[0.65rem] text-white/36 uppercase tracking-[0.3em]">
								{copy.eyebrow}
							</p>
							<h2 className="max-w-3xl text-white text-xl leading-tight sm:text-2xl">
								{copy.title}
							</h2>
							<p className="max-w-3xl text-sm text-white/62 leading-7">
								{copy.description}
							</p>
							<div className="flex flex-wrap gap-2">
								<ContactLink
									href={`mailto:${SITE_LEGAL_PROFILE.email}`}
									label="Email"
									value={SITE_LEGAL_PROFILE.email}
								/>
								<ContactLink
									href={SITE_LEGAL_PROFILE.phoneHref}
									label={locale === "ru" ? "Телефон" : "Phone"}
									value={SITE_LEGAL_PROFILE.phone}
								/>
								<ContactLink
									href={SITE_LEGAL_PROFILE.telegramHref}
									label="Telegram"
									value={SITE_LEGAL_PROFILE.telegram}
								/>
							</div>
						</div>

						<div className="grid gap-3 sm:grid-cols-2">
							<div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
								<p className="text-[0.65rem] text-white/36 uppercase tracking-[0.28em]">
									{copy.serviceLabel}
								</p>
								<p className="mt-3 text-sm text-white/74 leading-7">
									{copy.serviceValue}
								</p>
							</div>
							<div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
								<p className="text-[0.65rem] text-white/36 uppercase tracking-[0.28em]">
									{copy.rateLabel}
								</p>
								<p className="mt-3 text-sm text-white/74 leading-7">
									{copy.rateValue}
								</p>
							</div>
							<div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
								<p className="text-[0.65rem] text-white/36 uppercase tracking-[0.28em]">
									{copy.sellerLabel}
								</p>
								<p className="mt-3 text-sm text-white/74 leading-7">
									{copy.sellerValue}
								</p>
							</div>
							<div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
								<p className="text-[0.65rem] text-white/36 uppercase tracking-[0.28em]">
									{copy.addressLabel}
								</p>
								<p className="mt-3 text-sm text-white/74 leading-7">
									{copy.addressValue}
								</p>
							</div>
						</div>
					</div>

					<div className="grid gap-3 border-white/10 border-b py-8 sm:grid-cols-3">
						<div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
							<p className="text-[0.65rem] text-white/36 uppercase tracking-[0.28em]">
								{copy.contactsLabel}
							</p>
							<p className="mt-3 text-sm text-white/74 leading-7">
								{SITE_LEGAL_PROFILE.email}
								<br />
								{SITE_LEGAL_PROFILE.phone}
								<br />
								{SITE_LEGAL_PROFILE.telegram}
							</p>
						</div>
						<div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:col-span-2">
							<p className="text-[0.65rem] text-white/36 uppercase tracking-[0.28em]">
								{copy.supportLabel}
							</p>
							<p className="mt-3 text-sm text-white/74 leading-7">
								{copy.supportValue}
							</p>
						</div>
					</div>

					<div className="grid gap-3 py-8">
						{copy.sections.map((section) => (
							<details
								key={section.id}
								id={`site-footer-${section.id}`}
								className="group rounded-3xl border border-white/10 bg-white/[0.03] p-4 open:bg-white/[0.04]"
							>
								<summary className="cursor-pointer list-none">
									<div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
										<div>
											<p className="text-sm text-white/88 uppercase tracking-[0.18em]">
												{section.title}
											</p>
											<p className="mt-2 max-w-3xl text-sm text-white/56 leading-7">
												{section.summary}
											</p>
										</div>
										<span className="text-[0.65rem] text-white/34 uppercase tracking-[0.24em] transition group-open:text-white/58">
											{locale === "ru" ? "Открыть" : "Open"}
										</span>
									</div>
								</summary>

								<div className="mt-5 space-y-4 border-white/10 border-t pt-5 text-sm text-white/70 leading-7">
									{section.paragraphs.map((paragraph) => (
										<p key={paragraph}>{paragraph}</p>
									))}
									{section.items ? (
										<ul className="space-y-2 text-white/64">
											{section.items.map((item) => (
												<li key={item} className="flex gap-3">
													<span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40" />
													<span>{item}</span>
												</li>
											))}
										</ul>
									) : null}
								</div>
							</details>
						))}
					</div>

					<div className="border-white/10 border-t pt-6 text-white/32 text-xs uppercase tracking-[0.22em]">
						© Sabraman
					</div>
				</div>
			</div>
		</footer>
	);
}
