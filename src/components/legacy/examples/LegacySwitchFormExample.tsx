"use client";

import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { LegacyBarButton } from "~/components/legacy-bar-button";
import { showLegacyNotification } from "~/components/legacy-notification";
import { LegacySwitch } from "~/components/legacy-switch";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "~/components/ui/form";

type SwitchFormValues = {
	notifications: boolean;
};

export function LegacySwitchFormExample() {
	const form = useForm<SwitchFormValues>({
		defaultValues: {
			notifications: true,
		},
	});

	const onSubmit: SubmitHandler<SwitchFormValues> = (values) => {
		showLegacyNotification({
			body: values.notifications
				? "Push notifications are enabled."
				: "Push notifications are disabled.",
			showIcon: false,
			subtitle: "Notifications",
			time: "now",
			title: "Preferences Updated",
		});
	};

	return (
		<Form {...form}>
			<form
				className="flex w-full max-w-[340px] flex-col gap-5"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="notifications"
					render={({ field }) => (
						<FormItem className="flex items-center justify-between gap-4 rounded-[14px] border border-white/10 bg-white/6 px-4 py-3">
							<div>
								<FormLabel className="font-medium text-sm text-white">
									Push Notifications
								</FormLabel>
								<p className="mt-1 text-[#8b9bb4] text-sm leading-relaxed">
									Use a controlled switch inside form state without losing the
									legacy chrome.
								</p>
							</div>
							<FormControl>
								<LegacySwitch
									aria-label="Push notifications"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<LegacyBarButton
					className="w-full justify-center"
					label="Save Preference"
					type="submit"
					variant="accent"
				/>
			</form>
		</Form>
	);
}
