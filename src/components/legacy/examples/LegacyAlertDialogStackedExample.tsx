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

export function LegacyAlertDialogStackedExample() {
	return (
		<LegacyAlertDialog>
			<LegacyAlertDialogTrigger asChild>
				<LegacyAlertDialogButton>Leave Call</LegacyAlertDialogButton>
			</LegacyAlertDialogTrigger>

			<LegacyAlertDialogContent>
				<LegacyAlertDialogHeader>
					<LegacyAlertDialogTitle>Call in Progress</LegacyAlertDialogTitle>
					<LegacyAlertDialogDescription>
						Pick the next step before disconnecting this line.
					</LegacyAlertDialogDescription>
				</LegacyAlertDialogHeader>

				<LegacyAlertDialogFooter className="flex-col sm:flex-col sm:justify-start">
					<LegacyAlertDialogClose asChild>
						<LegacyAlertDialogButton
							className="w-full min-w-0"
							variant="primary"
						>
							Hold and Exit
						</LegacyAlertDialogButton>
					</LegacyAlertDialogClose>
					<LegacyAlertDialogClose asChild>
						<LegacyAlertDialogButton
							className="w-full min-w-0"
							variant="primary"
						>
							Transfer Call
						</LegacyAlertDialogButton>
					</LegacyAlertDialogClose>
					<LegacyAlertDialogClose asChild>
						<LegacyAlertDialogButton className="w-full min-w-0">
							Stay Here
						</LegacyAlertDialogButton>
					</LegacyAlertDialogClose>
				</LegacyAlertDialogFooter>
			</LegacyAlertDialogContent>
		</LegacyAlertDialog>
	);
}
