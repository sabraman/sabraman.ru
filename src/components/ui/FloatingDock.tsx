"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocalizedPathname, stripLocalePrefix } from "~/i18n/locale-paths";
import type { SupportedLocale } from "~/i18n/types";
import { cn } from "~/lib/utils";

type DockHref = "/" | "/work" | "/components" | "/contact";

type DockItem = {
	href: DockHref;
	label: {
		en: string;
		ru: string;
	};
};

const DOCK_ITEMS: DockItem[] = [
	{
		href: "/",
		label: { en: "Home", ru: "Главная" },
	},
	{
		href: "/work",
		label: { en: "Work", ru: "Работы" },
	},
	{
		href: "/components",
		label: { en: "Components", ru: "Компоненты" },
	},
	{
		href: "/contact",
		label: { en: "Contact", ru: "Контакты" },
	},
];

function normalizePathname(pathname: string) {
	return stripLocalePrefix(pathname);
}

function isItemActive(pathname: string, href: DockHref) {
	if (href === "/") {
		return pathname === "/";
	}

	return pathname === href || pathname.startsWith(`${href}/`);
}

export function FloatingDock({ locale }: { locale: SupportedLocale }) {
	const pathname = normalizePathname(usePathname());

	return (
		<nav
			aria-label={
				locale === "ru" ? "Глобальная навигация" : "Global navigation"
			}
			className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 sm:bottom-6"
		>
			<motion.div
				className="pointer-events-auto relative"
				initial={false}
				animate={{
					y: [0, -3, 0],
				}}
				transition={{
					y: {
						duration: 5.5,
						ease: "easeInOut",
						repeat: Number.POSITIVE_INFINITY,
					},
				}}
			>
				<div className="absolute inset-x-12 bottom-0 h-8 rounded-full bg-black/30 blur-2xl" />
				<motion.div
					className="relative flex items-center gap-1 rounded-full border border-white/10 bg-[rgba(12,12,16,0.78)] p-1 shadow-[0_16px_40px_rgba(0,0,0,0.32)] backdrop-blur-xl"
					animate={{
						boxShadow: [
							"0 16px 40px rgba(0,0,0,0.32)",
							"0 20px 52px rgba(0,0,0,0.38)",
							"0 16px 40px rgba(0,0,0,0.32)",
						],
					}}
					transition={{
						duration: 5.5,
						ease: "easeInOut",
						repeat: Number.POSITIVE_INFINITY,
					}}
				>
					{DOCK_ITEMS.map((item) => {
						const isActive = isItemActive(pathname, item.href);

						return (
							<Link
								key={item.href}
								href={getLocalizedPathname(locale, item.href)}
								scroll={false}
								className="group relative"
								aria-current={isActive ? "page" : undefined}
							>
								<motion.span
									whileHover={{ y: -2, scale: 1.02 }}
									whileTap={{ y: 0, scale: 0.98 }}
									className={cn(
										"relative flex items-center rounded-full px-3 py-2 text-[0.7rem] uppercase tracking-[0.18em] transition-all duration-200 sm:px-4 sm:text-[0.76rem]",
										isActive
											? "text-white"
											: "text-white/52 hover:text-white/82",
									)}
								>
									{isActive ? (
										<motion.span
											layoutId="floating-dock-active-pill"
											className="absolute inset-0 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_24px_rgba(0,0,0,0.22)]"
											transition={{
												type: "spring",
												stiffness: 380,
												damping: 30,
												mass: 0.8,
											}}
										/>
									) : null}
									<span className="relative z-10">{item.label[locale]}</span>
								</motion.span>
							</Link>
						);
					})}
				</motion.div>
			</motion.div>
		</nav>
	);
}
