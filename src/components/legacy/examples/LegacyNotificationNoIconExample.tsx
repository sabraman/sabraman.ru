"use client";

import { LegacyNotification } from "~/components/legacy-notification";

export function LegacyNotificationNoIconExample() {
	return (
		<div className="flex w-full max-w-[320px] flex-col gap-3">
			<LegacyNotification
				body="Changes are ready to ship."
				showIcon={false}
				subtitle="Deployment"
				time="now"
				title="Build Passed"
			/>
			<LegacyNotification
				body="Your message was delivered successfully."
				showIcon={false}
				subtitle="Direct Message"
				time="1m"
				title="Sent"
			/>
		</div>
	);
}
