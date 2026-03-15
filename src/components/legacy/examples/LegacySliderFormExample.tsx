"use client";

import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { LegacyBarButton } from "~/components/legacy-bar-button";
import { showLegacyNotification } from "~/components/legacy-notification";
import { LegacySlider } from "~/components/legacy-slider";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "~/components/ui/form";

type SliderFormValues = {
	brightness: number;
};

export function LegacySliderFormExample() {
	const form = useForm<SliderFormValues>({
		defaultValues: {
			brightness: 64,
		},
	});

	const onSubmit: SubmitHandler<SliderFormValues> = (values) => {
		showLegacyNotification({
			body: `Brightness set to ${Math.round(values.brightness)}%.`,
			showIcon: false,
			subtitle: "Display",
			time: "now",
			title: "Display Updated",
		});
	};

	return (
		<Form {...form}>
			<form
				className="flex w-full max-w-[320px] flex-col gap-5"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="brightness"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<div className="flex items-center justify-between">
								<FormLabel className="font-medium text-[#98a6bf] text-sm">
									Display Brightness
								</FormLabel>
								<span className="font-medium text-[#98a6bf] text-sm">
									{Math.round(field.value)}%
								</span>
							</div>
							<FormControl>
								<LegacySlider
									aria-label="Display brightness"
									onValueChange={field.onChange}
									value={field.value}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<LegacyBarButton
					className="w-full justify-center"
					label="Save Brightness"
					type="submit"
					variant="accent"
				/>
			</form>
		</Form>
	);
}
