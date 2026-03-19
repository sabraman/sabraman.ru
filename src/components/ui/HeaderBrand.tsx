"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { SupportedLocale } from "~/i18n/types";

const LOGO_MASK_STYLE: CSSProperties = {
	backgroundColor: "rgb(255 255 255 / 0.01)",
	backdropFilter: "invert(1)",
	WebkitBackdropFilter: "invert(1)",
	maskImage: "url('/logo.svg')",
	maskRepeat: "no-repeat",
	maskSize: "contain",
	maskPosition: "center",
	WebkitMaskImage: "url('/logo.svg')",
	WebkitMaskRepeat: "no-repeat",
	WebkitMaskSize: "contain",
	WebkitMaskPosition: "center",
};

export function HeaderBrand({ locale }: { locale: SupportedLocale }) {
	return (
		<Link
			href={locale === "ru" ? "/ru" : "/"}
			aria-label="Sabraman home"
			className="flex h-9 items-center"
		>
			<span
				aria-hidden="true"
				className="block aspect-[1106/1057] h-9"
				style={LOGO_MASK_STYLE}
			/>
		</Link>
	);
}
