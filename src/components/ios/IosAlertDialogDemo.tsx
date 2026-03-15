"use client";

import {
	IosAlertDialog,
	IosAlertDialogButton,
	IosAlertDialogClose,
	IosAlertDialogContent,
	IosAlertDialogDescription,
	IosAlertDialogFooter,
	IosAlertDialogHeader,
	IosAlertDialogTitle,
	IosAlertDialogTrigger,
} from "~/components/ios-alert-dialog";
import { cn } from "~/lib/utils";

interface IosAlertDialogDemoProps {
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

const ALERT_DIALOG_EXAMPLES: AlertDialogExample[] = [
	{
		description:
			"A simple notice with a title and message, without action buttons.",
		title: "Message",
		triggerLabel: "Message",
		variant: "message",
	},
	{
		description:
			"A confirmation alert with one default action and one primary action.",
		title: "Horizontal",
		triggerLabel: "Horizontal",
		variant: "horizontal",
	},
	{
		description:
			"A stacked alert with full-width actions for more emphatic decisions.",
		title: "Vertical",
		triggerLabel: "Vertical",
		variant: "vertical",
	},
] as const;

export function IosAlertDialogDemo({
	className,
	compact = false,
}: IosAlertDialogDemoProps) {
	return (
		<div className="flex w-full justify-center">
			<div
				className={cn(
					"flex w-full flex-wrap items-center justify-center",
					compact ? "max-w-[420px] gap-3" : "max-w-[520px] gap-4",
					className,
				)}
			>
				{ALERT_DIALOG_EXAMPLES.map((example) => (
					<IosAlertDialogExampleTrigger
						compact={compact}
						description={example.description}
						key={example.variant}
						title={example.title}
						triggerLabel={example.triggerLabel}
						variant={example.variant}
					/>
				))}
			</div>
		</div>
	);
}

function IosAlertDialogExampleTrigger({
	compact,
	description,
	title,
	triggerLabel,
	variant,
}: AlertDialogExample & {
	compact: boolean;
}) {
	return (
		<IosAlertDialog>
			<IosAlertDialogTrigger asChild>
				<IosAlertDialogButton
					className={cn("min-w-[108px]", compact ? "px-[10px]" : "px-[12px]")}
				>
					{triggerLabel}
				</IosAlertDialogButton>
			</IosAlertDialogTrigger>

			<IosAlertDialogContent>
				<IosAlertDialogHeader>
					<IosAlertDialogTitle>{title}</IosAlertDialogTitle>
					<IosAlertDialogDescription>{description}</IosAlertDialogDescription>
				</IosAlertDialogHeader>

				{variant === "horizontal" ? (
					<IosAlertDialogFooter>
						<IosAlertDialogClose asChild>
							<IosAlertDialogButton className="min-w-0 flex-1">
								Default
							</IosAlertDialogButton>
						</IosAlertDialogClose>
						<IosAlertDialogClose asChild>
							<IosAlertDialogButton
								className="min-w-0 flex-1"
								variant="primary"
							>
								Primary
							</IosAlertDialogButton>
						</IosAlertDialogClose>
					</IosAlertDialogFooter>
				) : null}

				{variant === "vertical" ? (
					<IosAlertDialogFooter className="flex-col sm:flex-col sm:justify-start">
						<IosAlertDialogClose asChild>
							<IosAlertDialogButton
								className="w-full min-w-0"
								variant="primary"
							>
								Primary
							</IosAlertDialogButton>
						</IosAlertDialogClose>
						<IosAlertDialogClose asChild>
							<IosAlertDialogButton
								className="w-full min-w-0"
								variant="primary"
							>
								Primary
							</IosAlertDialogButton>
						</IosAlertDialogClose>
						<IosAlertDialogClose asChild>
							<IosAlertDialogButton className="w-full min-w-0">
								Default
							</IosAlertDialogButton>
						</IosAlertDialogClose>
					</IosAlertDialogFooter>
				) : null}
			</IosAlertDialogContent>
		</IosAlertDialog>
	);
}
