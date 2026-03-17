"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import type { SupportedLocale } from "~/i18n/types";

const LegacyUiLocaleContext = createContext<SupportedLocale | null>(null);

export function LegacyUiLocaleProvider({
	children,
	locale,
}: {
	children: ReactNode;
	locale: SupportedLocale;
}) {
	return (
		<LegacyUiLocaleContext.Provider value={locale}>
			{children}
		</LegacyUiLocaleContext.Provider>
	);
}

export function useLegacyUiLocale() {
	const locale = useContext(LegacyUiLocaleContext);

	if (!locale) {
		throw new Error("Legacy UI locale context is missing.");
	}

	return locale;
}
