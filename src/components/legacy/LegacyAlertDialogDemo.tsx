"use client";

import {
	LegacyAlertDialog,
	LegacyAlertDialogButton,
	LegacyAlertDialogClose,
	LegacyAlertDialogContent,
	LegacyAlertDialogDescription,
	LegacyAlertDialogFooter,
	LegacyAlertDialogHeader,
	LegacyAlertDialogTitle,
	LegacyAlertDialogTrigger,
} from "~/components/legacy-alert-dialog";
import { cn } from "~/lib/utils";
import { useLegacyUiLocale } from "./legacy-locale-context";

interface LegacyAlertDialogDemoProps {
	className?: string;
	compact?: boolean;
}

type AlertDialogVariant = "message" | "horizontal" | "vertical";

type AlertDialogExample = {
	description: string;
	title: string;
	triggerLabel: string;
	variant: AlertDialogVariant;
};

const ALERT_DIALOG_COPY = {
	en: {
		message: {
			title: "Message",
			triggerLabel: "Message",
			description:
				"A simple notice with a title and message, without action buttons.",
		},
		horizontal: {
			title: "Horizontal",
			triggerLabel: "Horizontal",
			description:
				"A confirmation alert with one default action and one primary action.",
		},
		vertical: {
			title: "Vertical",
			triggerLabel: "Vertical",
			description:
				"A stacked alert with full-width actions for more emphatic decisions.",
		},
		defaultBtn: "Default",
		primaryBtn: "Primary",
	},
	ru: {
		message: {
			title: "Сообщение",
			triggerLabel: "Сообщение",
			description:
				"Простое уведомление с заголовком и сообщением, без кнопок действий.",
		},
		horizontal: {
			title: "Горизонтальный",
			triggerLabel: "Горизонтальный",
			description:
				"Предупреждение о подтверждении с одним действием по умолчанию и одним основным действием.",
		},
		vertical: {
			title: "Вертикальный",
			triggerLabel: "Вертикальный",
			description:
				"Каскадное предупреждение с полноразмерными кнопками для более важных решений.",
		},
		defaultBtn: "По умолчанию",
		primaryBtn: "Основной",
	},
} as const;

export function LegacyAlertDialogDemo({
	className,
	compact = false,
}: LegacyAlertDialogDemoProps) {
	const locale = useLegacyUiLocale();
	const copy = ALERT_DIALOG_COPY[locale];

	const examples = [
		{
			description: copy.message.description,
			title: copy.message.title,
			triggerLabel: copy.message.triggerLabel,
			variant: "message" as const,
		},
		{
			description: copy.horizontal.description,
			title: copy.horizontal.title,
			triggerLabel: copy.horizontal.triggerLabel,
			variant: "horizontal" as const,
		},
		{
			description: copy.vertical.description,
			title: copy.vertical.title,
			triggerLabel: copy.vertical.triggerLabel,
			variant: "vertical" as const,
		},
	];

	return (
		<div className="flex w-full justify-center">
			<div
				className={cn(
					"flex w-full flex-wrap items-center justify-center",
					compact ? "max-w-[420px] gap-3" : "max-w-[520px] gap-4",
					className,
				)}
			>
				{examples.map((example) => (
					<LegacyAlertDialogExampleTrigger
						compact={compact}
						defaultBtn={copy.defaultBtn}
						description={example.description}
						key={example.variant}
						primaryBtn={copy.primaryBtn}
						title={example.title}
						triggerLabel={example.triggerLabel}
						variant={example.variant}
					/>
				))}
			</div>
		</div>
	);
}

function LegacyAlertDialogExampleTrigger({
	compact,
	defaultBtn,
	description,
	primaryBtn,
	title,
	triggerLabel,
	variant,
}: AlertDialogExample & {
	compact: boolean;
	defaultBtn: string;
	primaryBtn: string;
}) {
	return (
		<LegacyAlertDialog>
			<LegacyAlertDialogTrigger asChild>
				<LegacyAlertDialogButton
					className={cn("min-w-[108px]", compact ? "px-[10px]" : "px-[12px]")}
				>
					{triggerLabel}
				</LegacyAlertDialogButton>
			</LegacyAlertDialogTrigger>

			<LegacyAlertDialogContent>
				<LegacyAlertDialogHeader>
					<LegacyAlertDialogTitle>{title}</LegacyAlertDialogTitle>
					<LegacyAlertDialogDescription>
						{description}
					</LegacyAlertDialogDescription>
				</LegacyAlertDialogHeader>

				{variant === "horizontal" ? (
					<LegacyAlertDialogFooter>
						<LegacyAlertDialogClose asChild>
							<LegacyAlertDialogButton className="min-w-0 flex-1">
								{defaultBtn}
							</LegacyAlertDialogButton>
						</LegacyAlertDialogClose>
						<LegacyAlertDialogClose asChild>
							<LegacyAlertDialogButton
								className="min-w-0 flex-1"
								variant="primary"
							>
								{primaryBtn}
							</LegacyAlertDialogButton>
						</LegacyAlertDialogClose>
					</LegacyAlertDialogFooter>
				) : null}

				{variant === "vertical" ? (
					<LegacyAlertDialogFooter className="flex-col sm:flex-col sm:justify-start">
						<LegacyAlertDialogClose asChild>
							<LegacyAlertDialogButton
								className="w-full min-w-0"
								variant="primary"
							>
								{primaryBtn}
							</LegacyAlertDialogButton>
						</LegacyAlertDialogClose>
						<LegacyAlertDialogClose asChild>
							<LegacyAlertDialogButton
								className="w-full min-w-0"
								variant="primary"
							>
								{primaryBtn}
							</LegacyAlertDialogButton>
						</LegacyAlertDialogClose>
						<LegacyAlertDialogClose asChild>
							<LegacyAlertDialogButton className="w-full min-w-0">
								{defaultBtn}
							</LegacyAlertDialogButton>
						</LegacyAlertDialogClose>
					</LegacyAlertDialogFooter>
				) : null}
			</LegacyAlertDialogContent>
		</LegacyAlertDialog>
	);
}
