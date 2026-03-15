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

export function LegacyAlertDialogConfirmExample() {
	return (
		<LegacyAlertDialog>
			<LegacyAlertDialogTrigger asChild>
				<LegacyAlertDialogButton>Delete Draft</LegacyAlertDialogButton>
			</LegacyAlertDialogTrigger>

			<LegacyAlertDialogContent>
				<LegacyAlertDialogHeader>
					<LegacyAlertDialogTitle>Delete Draft</LegacyAlertDialogTitle>
					<LegacyAlertDialogDescription>
						This removes the note from the current device and cannot be undone.
					</LegacyAlertDialogDescription>
				</LegacyAlertDialogHeader>

				<LegacyAlertDialogFooter>
					<LegacyAlertDialogClose asChild>
						<LegacyAlertDialogButton className="min-w-0 flex-1">
							Cancel
						</LegacyAlertDialogButton>
					</LegacyAlertDialogClose>
					<LegacyAlertDialogClose asChild>
						<LegacyAlertDialogButton
							className="min-w-0 flex-1"
							variant="primary"
						>
							Delete
						</LegacyAlertDialogButton>
					</LegacyAlertDialogClose>
				</LegacyAlertDialogFooter>
			</LegacyAlertDialogContent>
		</LegacyAlertDialog>
	);
}
