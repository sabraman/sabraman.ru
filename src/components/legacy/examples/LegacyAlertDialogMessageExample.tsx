"use client";

import {
	LegacyAlertDialog,
	LegacyAlertDialogButton,
	LegacyAlertDialogContent,
	LegacyAlertDialogDescription,
	LegacyAlertDialogHeader,
	LegacyAlertDialogTitle,
	LegacyAlertDialogTrigger,
} from "~/components/legacy-alert-dialog";

export function LegacyAlertDialogMessageExample() {
	return (
		<LegacyAlertDialog>
			<LegacyAlertDialogTrigger asChild>
				<LegacyAlertDialogButton>System Notice</LegacyAlertDialogButton>
			</LegacyAlertDialogTrigger>

			<LegacyAlertDialogContent showCloseButton={true}>
				<LegacyAlertDialogHeader>
					<LegacyAlertDialogTitle>SIM Updated</LegacyAlertDialogTitle>
					<LegacyAlertDialogDescription>
						Carrier settings were refreshed. Signal bars may settle for a few
						seconds.
					</LegacyAlertDialogDescription>
				</LegacyAlertDialogHeader>
			</LegacyAlertDialogContent>
		</LegacyAlertDialog>
	);
}
