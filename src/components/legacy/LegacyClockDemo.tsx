"use client";

import { LegacyClock } from "~/components/legacy-clock";
import { cn } from "~/lib/utils";
import { useLegacyUiLocale } from "./legacy-locale-context";

interface LegacyClockDemoProps {
	className?: string;
}

const CLOCK_COPY = {
	en: {
		dayAria: "Legacy day clock",
		nightAria: "Legacy night clock",
		day: "Day",
		night: "Night",
		description: "Live analog time with the original red seconds hand",
	},
	ru: {
		dayAria: "Аналоговые часы (дневные)",
		nightAria: "Аналоговые часы (ночные)",
		day: "День",
		night: "Ночь",
		description:
			"Аналоговое время в реальном времени с оригинальной красной секундной стрелкой",
	},
} as const;

export function LegacyClockDemo({ className }: LegacyClockDemoProps) {
	const locale = useLegacyUiLocale();
	const copy = CLOCK_COPY[locale];

	return (
		<div className={cn("flex flex-col items-center gap-8", className)}>
			<div className="flex flex-wrap items-center justify-center gap-6">
				<div className="flex flex-col items-center gap-3">
					<LegacyClock aria-label={copy.dayAria} size={76} variant="day" />
					<p className="font-medium text-[#8b9bb4] text-xs uppercase tracking-[0.18em]">
						{copy.day}
					</p>
				</div>
				<div className="flex flex-col items-center gap-3">
					<LegacyClock aria-label={copy.nightAria} size={76} variant="night" />
					<p className="font-medium text-[#8b9bb4] text-xs uppercase tracking-[0.18em]">
						{copy.night}
					</p>
				</div>
			</div>

			<p className="text-center font-medium text-[#8b9bb4] text-sm uppercase tracking-[0.08em]">
				{copy.description}
			</p>
		</div>
	);
}
