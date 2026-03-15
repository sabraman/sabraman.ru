"use client";

import { LegacyBarButton } from "~/components/legacy-bar-button";
import { showLegacyNotification } from "~/components/legacy-notification";

export function LegacyNotificationUsageExample() {
	return (
		<div className="flex w-full max-w-[340px] flex-col items-center gap-4">
			<LegacyBarButton
				className="min-w-[180px] justify-center"
				label="Show Notification"
				onClick={() => {
					showLegacyNotification({
						body: "Can you review the latest build?",
						subtitle: "Ava",
						time: "now",
						title: "Messages",
					});
				}}
				variant="accent"
			/>
			<p className="text-center text-[#8b9bb4] text-sm leading-relaxed">
				Uses the exported helper, which renders the component through Sonner
				with <code>toast.custom</code>.
			</p>
		</div>
	);
}
