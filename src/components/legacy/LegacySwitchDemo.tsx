"use client";

import { LegacySwitch } from "~/components/legacy-switch";
import { cn } from "~/lib/utils";
import { useLegacyUiLocale } from "./legacy-locale-context";

interface LegacySwitchDemoProps {
	className?: string;
	compact?: boolean;
}

const SWITCH_COPY = {
	en: {
		switchAria: "Interactive legacy switch",
	},
	ru: {
		switchAria: "Интерактивный переключатель в ретро-стиле",
	},
} as const;

export function LegacySwitchDemo({ className }: LegacySwitchDemoProps) {
	const locale = useLegacyUiLocale();
	const copy = SWITCH_COPY[locale];

	return (
		<div className={cn("flex w-full justify-center", className)}>
			<LegacySwitch aria-label={copy.switchAria} defaultChecked={true} />
		</div>
	);
}
