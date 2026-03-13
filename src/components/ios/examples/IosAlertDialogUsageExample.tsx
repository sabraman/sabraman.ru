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

export function IosAlertDialogUsageExample() {
	return (
		<div className="flex flex-wrap items-center gap-4">
			{ALERT_DIALOG_EXAMPLES.map((example) => (
				<IosAlertDialogExample key={example.variant} {...example} />
			))}
		</div>
	);
}

function IosAlertDialogExample({
	description,
	title,
	triggerLabel,
	variant,
}: AlertDialogExample) {
	return (
		<IosAlertDialog>
			<IosAlertDialogTrigger asChild>
				<IosAlertDialogButton>{triggerLabel}</IosAlertDialogButton>
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
