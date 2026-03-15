"use client";

import { LegacyNotification } from "~/components/legacy-notification";
import { cn } from "~/lib/utils";

interface LegacyNotificationDemoProps {
	className?: string;
}

export function LegacyNotificationDemo({
	className,
}: LegacyNotificationDemoProps) {
	return (
		<div className={cn("flex w-full justify-center", className)}>
			<LegacyNotification
				body="Body"
				subtitle="Subtitle"
				time="now"
				title="Title"
			/>
		</div>
	);
}
