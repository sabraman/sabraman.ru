import type { NamespaceMessages } from "~/i18n/get-messages";
import type { SupportedLocale } from "~/i18n/types";
import type { ContactCopy } from "./home-copy";

export function getContactCopy(
	locale: SupportedLocale,
	messages: NamespaceMessages<"contact">,
): ContactCopy {
	return {
		title: messages.title,
		titleSecond: messages.titleSecond,
		description: messages.description,
		form: {
			title: messages.form.title,
			name: messages.form.name,
			namePlaceholder: messages.form.namePlaceholder,
			email: messages.form.email,
			emailPlaceholder: messages.form.emailPlaceholder,
			message: messages.form.message,
			messagePlaceholder: messages.form.messagePlaceholder,
			submit: messages.form.submit,
			sending: messages.form.sending,
			success: messages.form.success,
			error: messages.form.error,
			validation:
				locale === "ru"
					? {
							name: "Имя должно содержать минимум 2 символа",
							email: "Введите корректный email",
							message: "Сообщение должно содержать минимум 10 символов",
						}
					: {
							name: "Name must be at least 2 characters",
							email: "Please enter a valid email",
							message: "Message must be at least 10 characters",
						},
		},
		direct: {
			downloadResume: messages.direct.downloadResume,
			telegram: messages.direct.telegram,
			email: messages.direct.email,
			github: messages.direct.github,
			instagram: messages.direct.instagram,
		},
		location: {
			title: messages.location.title,
			description: messages.location.description,
		},
		remote: {
			title: messages.remote.title,
			description: messages.remote.description,
		},
	};
}
