"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { getLocalizedPathname } from "~/i18n/locale-paths";
import { routing } from "~/i18n/routing";
import type { SupportedLocale } from "~/i18n/types";

const localeLabels = {
	en: "EN",
	ru: "РУ",
} as const;

export function LanguageSwitcher({ locale }: { locale: SupportedLocale }) {
	const router = useRouter();
	const pathname = usePathname();

	const switchLocale = (newLocale: SupportedLocale) => {
		router.replace(getLocalizedPathname(newLocale, pathname));
	};

	return (
		<div className="relative flex items-center justify-center">
			<div className="relative flex items-center rounded-full border border-neutral-200/20 bg-neutral-950/50 p-1 backdrop-blur-xl">
				{routing.locales.map((lng) => {
					const isActive = locale === lng;
					return (
						<button
							type="button"
							key={lng}
							onClick={() => switchLocale(lng as SupportedLocale)}
							className={`relative z-10 cursor-pointer px-3 py-1.5 font-medium text-xs transition-colors duration-200 ${
								isActive
									? "text-neutral-900"
									: "text-neutral-400 hover:text-neutral-200"
							}`}
						>
							{isActive && (
								<motion.div
									layoutId="activeLanguage"
									className="absolute inset-0 rounded-full bg-white"
									initial={false}
									transition={{
										type: "spring",
										stiffness: 500,
										damping: 30,
									}}
								/>
							)}
							<span className="relative z-10">
								{localeLabels[lng as keyof typeof localeLabels]}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}
