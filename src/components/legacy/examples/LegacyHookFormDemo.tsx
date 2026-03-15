"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { LegacyBarButton } from "~/components/legacy-bar-button";
import {
	LegacyPickerColumn,
	LegacyPickerContainer,
} from "~/components/legacy-wheel-picker";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";

const formSchema = z.object({
	framework: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const formOptions = [
	{ label: "Vite", value: "vite" },
	{ label: "Laravel", value: "laravel", disabled: true },
	{ label: "Next.js", value: "nextjs" },
	{ label: "Astro", value: "astro" },
];

export function LegacyHookFormDemo() {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: { framework: "nextjs" },
	});

	const onSubmit: SubmitHandler<FormSchema> = (values) => {
		toast("Settings Saved", {
			description: `Framework set to ${formOptions.find((o) => o.value === values.framework)?.label}`,
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex w-full max-w-[320px] flex-col gap-6"
			>
				<FormField
					control={form.control}
					name="framework"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col items-center">
							<FormLabel className="sr-only">Framework</FormLabel>
							<FormControl>
								<LegacyPickerContainer className="w-full">
									<LegacyPickerColumn
										align="center"
										fontSize={22}
										onValueChange={field.onChange}
										options={formOptions}
										value={field.value}
									/>
								</LegacyPickerContainer>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<LegacyBarButton
					className="w-full justify-center"
					label="Submit"
					type="submit"
					variant="accent"
				/>
			</form>
		</Form>
	);
}
