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

export function LegacyAlertDialogUsageExample() {
	return (
		<div className="flex flex-wrap items-center gap-4">
			{ALERT_DIALOG_EXAMPLES.map((example) => (
				<LegacyAlertDialogExample key={example.variant} {...example} />
			))}
		</div>
	);
}

function LegacyAlertDialogExample({
	description,
	title,
	triggerLabel,
	variant,
}: AlertDialogExample) {
	return (
		<LegacyAlertDialog>
			<LegacyAlertDialogTrigger asChild>
				<LegacyAlertDialogButton>{triggerLabel}</LegacyAlertDialogButton>
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
								Default
							</LegacyAlertDialogButton>
						</LegacyAlertDialogClose>
						<LegacyAlertDialogClose asChild>
							<LegacyAlertDialogButton
								className="min-w-0 flex-1"
								variant="primary"
							>
								Primary
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
								Primary
							</LegacyAlertDialogButton>
						</LegacyAlertDialogClose>
						<LegacyAlertDialogClose asChild>
							<LegacyAlertDialogButton
								className="w-full min-w-0"
								variant="primary"
							>
								Primary
							</LegacyAlertDialogButton>
						</LegacyAlertDialogClose>
						<LegacyAlertDialogClose asChild>
							<LegacyAlertDialogButton className="w-full min-w-0">
								Default
							</LegacyAlertDialogButton>
						</LegacyAlertDialogClose>
					</LegacyAlertDialogFooter>
				) : null}
			</LegacyAlertDialogContent>
		</LegacyAlertDialog>
	);
}
