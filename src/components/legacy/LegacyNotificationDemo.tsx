"use client";

import { LegacyNotification } from "~/components/legacy-notification";
import { cn } from "~/lib/utils";
import { useLegacyUiLocale } from "./legacy-locale-context";

interface LegacyNotificationDemoProps {
	className?: string;
}

const NOTIFICATION_COPY = {
	en: {
		title: "Title",
		subtitle: "Subtitle",
		body: "Body text of the notification.",
		time: "now",
	},
	ru: {
		title: "Заголовок",
		subtitle: "Подзаголовок",
		body: "Текст уведомления.",
		time: "сейчас",
	},
} as const;

export function LegacyNotificationDemo({
	className,
}: LegacyNotificationDemoProps) {
	const locale = useLegacyUiLocale();
	const copy = NOTIFICATION_COPY[locale];

	return (
		<div className={cn("flex w-full justify-center", className)}>
			<LegacyNotification
				body={copy.body}
				subtitle={copy.subtitle}
				time={copy.time}
				title={copy.title}
			/>
		</div>
	);
}
