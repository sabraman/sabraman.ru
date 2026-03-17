"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
	ArrowRight,
	CheckCircle2,
	Download,
	Github,
	Instagram,
	Loader2,
	Mail,
	MessageSquareText,
	User,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import type { ContactCopy } from "~/components/home/home-copy";
import InputWithIcon from "~/components/input-with-icon";
import { Button } from "~/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "~/components/ui/form";
import type { SupportedLocale } from "~/i18n/types";
import { getResumeAsset } from "~/lib/resume";

interface IconProps {
	className?: string;
}

type FormData = {
	name: string;
	email: string;
	message: string;
};

const TelegramIcon = ({ className }: IconProps) => (
	<svg
		stroke="currentColor"
		fill="currentColor"
		strokeWidth="0"
		viewBox="0 0 24 24"
		height="1em"
		width="1em"
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<path d="M17.0943 7.14643C17.6874 6.93123 17.9818 6.85378 18.1449 6.82608C18.1461 6.87823 18.1449 6.92051 18.1422 6.94825C17.9096 9.39217 16.8906 15.4048 16.3672 18.2026C16.2447 18.8578 16.1507 19.1697 15.5179 18.798C15.1014 18.5532 14.7245 18.2452 14.3207 17.9805C12.9961 17.1121 11.1 15.8189 11.2557 15.8967C9.95162 15.0373 10.4975 14.5111 11.2255 13.8093C11.3434 13.6957 11.466 13.5775 11.5863 13.4525C11.64 13.3967 11.9027 13.1524 12.2731 12.8081C13.4612 11.7035 15.7571 9.56903 15.8151 9.32202C15.8246 9.2815 15.8334 9.13045 15.7436 9.05068C15.6539 8.97092 15.5215 8.9982 15.4259 9.01989C15.2904 9.05064 13.1326 10.4769 8.95243 13.2986C8.33994 13.7192 7.78517 13.9242 7.28811 13.9134L7.29256 13.9156C6.63781 13.6847 5.9849 13.4859 5.32855 13.286C4.89736 13.1546 4.46469 13.0228 4.02904 12.8812C3.92249 12.8466 3.81853 12.8137 3.72083 12.783C8.24781 10.8109 11.263 9.51243 12.7739 8.884C14.9684 7.97124 16.2701 7.44551 17.0943 7.14643ZM19.5169 5.21806C19.2635 5.01244 18.985 4.91807 18.7915 4.87185C18.5917 4.82412 18.4018 4.80876 18.2578 4.8113C17.7814 4.81969 17.2697 4.95518 16.4121 5.26637C15.5373 5.58382 14.193 6.12763 12.0058 7.03736C10.4638 7.67874 7.39388 9.00115 2.80365 11.001C2.40046 11.1622 2.03086 11.3451 1.73884 11.5619C1.46919 11.7622 1.09173 12.1205 1.02268 12.6714C0.970519 13.0874 1.09182 13.4714 1.33782 13.7738C1.55198 14.037 1.82635 14.1969 2.03529 14.2981C2.34545 14.4483 2.76276 14.5791 3.12952 14.6941C3.70264 14.8737 4.27444 15.0572 4.84879 15.233C6.62691 15.7773 8.09066 16.2253 9.7012 17.2866C10.8825 18.0651 12.041 18.8775 13.2243 19.6531C13.6559 19.936 14.0593 20.2607 14.5049 20.5224C14.9916 20.8084 15.6104 21.0692 16.3636 20.9998C17.5019 20.8951 18.0941 19.8479 18.3331 18.5703C18.8552 15.7796 19.8909 9.68351 20.1332 7.13774C20.1648 6.80544 20.1278 6.433 20.097 6.25318C20.0653 6.068 19.9684 5.58448 19.5169 5.21806Z" />
	</svg>
);

const VKIcon = ({ className }: IconProps) => (
	<svg
		stroke="currentColor"
		fill="currentColor"
		strokeWidth="0"
		viewBox="0 0 576 512"
		height="1em"
		width="1em"
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<path d="M545 117.7c3.7-12.5 0-21.7-17.8-21.7h-58.9c-15 0-21.9 7.9-25.6 16.7 0 0-30 73.1-72.4 120.5-13.7 13.7-20 18.1-27.5 18.1-3.7 0-9.4-4.4-9.4-16.9V117.7c0-15-4.2-21.7-16.6-21.7h-92.6c-9.4 0-15 7-15 13.5 0 14.2 21.2 17.5 23.4 57.5v86.8c0 19-3.4 22.5-10.9 22.5-20 0-68.6-73.4-97.4-157.4-5.8-16.3-11.5-22.9-26.6-22.9H38.8c-16.8 0-20.2 7.9-20.2 16.7 0 15.6 20 93.1 93.1 195.5C160.4 378.1 229 416 291.4 416c37.5 0 42.1-8.4 42.1-22.9 0-66.8-3.4-73.1 15.4-73.1 8.7 0 23.7 4.4 58.7 38.1 40 40 46.6 57.9 69 57.9h58.9c16.8 0 25.3-8.4 20.4-25-11.2-34.9-86.9-106.7-90.3-111.5-8.7-11.2-6.2-16.2 0-26.2.1-.1 72-101.3 79.4-135.6z" />
	</svg>
);

export default function Contact({
	copy,
	locale,
}: {
	copy: ContactCopy;
	locale: SupportedLocale;
}) {
	const resume = getResumeAsset(locale);
	const [formStatus, setFormStatus] = useState<
		"idle" | "submitting" | "success" | "error"
	>("idle");

	const formSchema = useMemo(
		() =>
			z.object({
				name: z.string().min(2, copy.form.validation.name),
				email: z.string().email(copy.form.validation.email),
				message: z.string().min(10, copy.form.validation.message),
			}),
		[
			copy.form.validation.email,
			copy.form.validation.message,
			copy.form.validation.name,
		],
	);

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});

	const onSubmit = async (data: FormData) => {
		try {
			setFormStatus("submitting");

			const response = await fetch("/api/send", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Failed to send message");
			}

			setFormStatus("success");
			toast.success(copy.form.success, {
				position: "top-center",
				duration: 4000,
			});
			form.reset();

			setTimeout(() => {
				setFormStatus("idle");
			}, 3000);
		} catch (_error) {
			setFormStatus("error");
			toast.error(copy.form.error, {
				position: "top-center",
				duration: 4000,
			});

			setTimeout(() => {
				setFormStatus("idle");
			}, 3000);
		}
	};

	return (
		<div className="relative">
			<div className="mx-auto max-w-8xl">
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="relative lg:col-span-7"
					>
						<div className="absolute -top-12 -right-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
						<div className="absolute -bottom-12 -left-20 h-40 w-40 rounded-full bg-accent/5 blur-3xl" />

						<div className="group relative h-full overflow-hidden rounded-3xl backdrop-blur-sm">
							<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/40 via-primary/20 to-background/0 opacity-30 transition-opacity duration-500 group-hover:opacity-50" />

							<div className="relative m-[1px] flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-card/95 p-8 backdrop-blur-md md:p-10">
								<motion.h3
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5 }}
									className="mb-8 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text font-bold text-2xl"
								>
									{copy.form.title}
								</motion.h3>

								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className="flex flex-1 flex-col space-y-6"
									>
										<div className="flex-1 space-y-6">
											{[
												{
													delay: 0.1,
													icon: <User className="h-4 w-4" />,
													label: copy.form.name,
													name: "name" as const,
													placeholder: copy.form.namePlaceholder,
													type: "text",
												},
												{
													delay: 0.2,
													icon: <Mail className="h-4 w-4" />,
													label: copy.form.email,
													name: "email" as const,
													placeholder: copy.form.emailPlaceholder,
													type: "email",
												},
												{
													delay: 0.3,
													icon: <MessageSquareText className="h-4 w-4" />,
													label: copy.form.message,
													name: "message" as const,
													placeholder: copy.form.messagePlaceholder,
													rows: 7,
													type: "text",
												},
											].map((fieldConfig) => (
												<motion.div
													key={fieldConfig.name}
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{
														duration: 0.5,
														delay: fieldConfig.delay,
													}}
													className={
														fieldConfig.name === "message"
															? "flex-1"
															: undefined
													}
												>
													<FormField
														control={form.control}
														name={fieldConfig.name}
														render={({ field }) => (
															<FormItem
																className={
																	fieldConfig.name === "message"
																		? "h-full"
																		: undefined
																}
															>
																<FormControl>
																	<div
																		className={
																			fieldConfig.name === "message"
																				? "flex h-full flex-col space-y-1"
																				: "space-y-1"
																		}
																	>
																		<InputWithIcon
																			label={fieldConfig.label}
																			placeholder={fieldConfig.placeholder}
																			type={fieldConfig.type}
																			icon={fieldConfig.icon}
																			isTextarea={
																				fieldConfig.name === "message"
																			}
																			rows={fieldConfig.rows}
																			{...field}
																		/>
																		<FormMessage />
																	</div>
																</FormControl>
															</FormItem>
														)}
													/>
												</motion.div>
											))}
										</div>

										<motion.div
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.5, delay: 0.4 }}
											className="pt-4"
										>
											<Button
												type="submit"
												disabled={
													form.formState.isSubmitting ||
													formStatus === "submitting" ||
													formStatus === "success"
												}
												className={`group relative h-14 w-full cursor-pointer overflow-hidden rounded-2xl text-base transition-all duration-500 ${
													formStatus === "success"
														? "bg-green-500 hover:bg-green-600"
														: formStatus === "error"
															? "bg-destructive hover:bg-destructive/90"
															: "bg-accent hover:bg-accent/90"
												}`}
											>
												<span className="relative z-10 flex items-center justify-center gap-2 text-foreground">
													{formStatus === "submitting" ? (
														<>
															<Loader2 className="h-5 w-5 animate-spin" />
															<span>{copy.form.sending}</span>
														</>
													) : formStatus === "success" ? (
														<>
															<CheckCircle2 className="h-5 w-5" />
															<span>{copy.form.success}</span>
														</>
													) : (
														<>
															<span>{copy.form.submit}</span>
															<ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
														</>
													)}
												</span>
												<span className="absolute inset-0 -z-10 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
											</Button>
										</motion.div>
									</form>
								</Form>
							</div>
						</div>
					</motion.div>

					<div className="lg:col-span-5">
						<div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2">
							<motion.div
								initial={{ opacity: 0, y: 40 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.4 }}
								className="md:col-span-2"
							>
								<div className="group relative h-full overflow-hidden rounded-3xl backdrop-blur-sm">
									<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/40 via-accent/20 to-background/0 opacity-30 transition-opacity duration-500 group-hover:opacity-50" />

									<div className="relative m-[1px] rounded-[calc(1.5rem-1px)] bg-card/95 p-8 backdrop-blur-md md:p-10">
										<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
											<h3 className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text font-bold text-2xl">
												{copy.direct.title}
											</h3>
											<Button
												asChild
												className="h-11 rounded-xl px-5"
												size="sm"
											>
												<a href={resume.href} download={resume.downloadName}>
													{copy.direct.downloadResume}
													<Download className="ml-2 h-4 w-4" />
												</a>
											</Button>
										</div>

										<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
											{[
												{
													icon: <Mail className="h-6 w-6" />,
													label: copy.direct.email,
													href: "mailto:sabraman@ya.ru",
													value: "sabraman@ya.ru",
												},
												{
													icon: <TelegramIcon className="h-6 w-6" />,
													label: copy.direct.telegram,
													href: "https://t.me/sabraman",
													value: "@sabraman",
												},
												{
													icon: <VKIcon className="h-6 w-6" />,
													label: "VK",
													href: "https://vk.com/sabraman",
													value: "sabraman",
												},
												{
													icon: <Github className="h-6 w-6" />,
													label: copy.direct.github,
													href: "https://github.com/sabraman",
													value: "sabraman",
												},
												{
													icon: <Instagram className="h-6 w-6" />,
													label: copy.direct.instagram,
													href: "https://instagram.com/sabraman",
													value: "sabraman",
												},
											].map((directContact) => (
												<motion.div
													key={directContact.href}
													className="group/item flex items-center gap-4"
													whileHover={{ x: 5, scale: 1.01 }}
													transition={{
														type: "spring",
														stiffness: 400,
														damping: 10,
													}}
												>
													<div className="rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 p-3 text-accent transition-all duration-300 group-hover/item:from-accent/30 group-hover/item:to-primary/30">
														{directContact.icon}
													</div>
													<div>
														<p className="text-muted-foreground text-sm">
															{directContact.label}
														</p>
														<a
															href={directContact.href}
															className="font-medium transition-colors duration-300 hover:text-accent"
														>
															{directContact.value}
														</a>
													</div>
												</motion.div>
											))}
										</div>
									</div>
								</div>
							</motion.div>

							{[
								{
									copyBlock: copy.location,
									delay: 0.5,
									gradient: "from-background/0 via-accent/20 to-primary/40",
								},
								{
									copyBlock: copy.remote,
									delay: 0.6,
									gradient: "from-primary/40 via-accent/20 to-background/0",
								},
							].map((infoCard) => (
								<motion.div
									key={infoCard.copyBlock.title}
									initial={{ opacity: 0, y: 40 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: infoCard.delay }}
									className="h-full"
								>
									<div className="group relative h-full overflow-hidden rounded-3xl backdrop-blur-sm transition-transform duration-500 hover:scale-[1.02]">
										<div
											className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${infoCard.gradient} opacity-30 transition-opacity duration-500 group-hover:opacity-70`}
										/>

										<div className="relative m-[1px] flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-card/95 p-8 backdrop-blur-md">
											<h3 className="mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text font-bold text-2xl">
												{infoCard.copyBlock.title}
											</h3>
											<div className="flex flex-1 items-center">
												<p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
													{infoCard.copyBlock.description}
												</p>
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
