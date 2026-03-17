import enMessages from "../../messages/en.json";
import ruMessages from "../../messages/ru.json";
import type { SupportedLocale } from "./types";

export type AppMessages = typeof enMessages;
type MessagesByLocale = Record<SupportedLocale, AppMessages>;

const MESSAGES_BY_LOCALE: MessagesByLocale = {
	en: enMessages,
	ru: ruMessages as AppMessages,
};

export type MessageNamespace = keyof AppMessages;
export type NamespaceMessages<N extends MessageNamespace> = AppMessages[N];

export async function getAllMessages(locale: SupportedLocale) {
	return MESSAGES_BY_LOCALE[locale];
}

export async function getMessageNamespace<N extends MessageNamespace>(
	locale: SupportedLocale,
	namespace: N,
): Promise<NamespaceMessages<N>> {
	return MESSAGES_BY_LOCALE[locale][namespace];
}

export async function getMessageNamespaces<
	N extends readonly MessageNamespace[],
>(locale: SupportedLocale, namespaces: N) {
	const messages = MESSAGES_BY_LOCALE[locale];

	return Object.fromEntries(
		namespaces.map((namespace) => [namespace, messages[namespace]]),
	) as Pick<AppMessages, N[number]>;
}
