"use client";

import { MessageCircleIcon } from "lucide-react";

import { LegacyNotification } from "~/components/legacy-notification";

export function LegacyNotificationCustomIconExample() {
	return (
		<div className="flex w-full max-w-[320px] flex-col gap-3">
			<LegacyNotification
				body="Your order has left the warehouse."
				icon={<MessageCircleIcon strokeWidth={2.4} />}
				subtitle="Support"
				time="now"
				title="Store"
			/>
			<LegacyNotification
				body="There is feedback on the latest mockup."
				icon={<MessageCircleIcon strokeWidth={2.4} />}
				subtitle="Mention in design-crit"
				time="2m"
				title="Team Chat"
			/>
		</div>
	);
}
