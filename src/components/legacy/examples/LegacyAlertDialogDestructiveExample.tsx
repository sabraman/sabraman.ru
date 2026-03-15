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
import { LegacyBarButton } from "~/components/legacy-bar-button";

export function LegacyAlertDialogDestructiveExample() {
	return (
		<LegacyAlertDialog>
			<LegacyAlertDialogTrigger asChild>
				<LegacyBarButton label="Erase Phone" variant="destructive" />
			</LegacyAlertDialogTrigger>

			<LegacyAlertDialogContent>
				<LegacyAlertDialogHeader>
					<LegacyAlertDialogTitle>Erase All Content</LegacyAlertDialogTitle>
					<LegacyAlertDialogDescription>
						This clears photos, saved settings, and offline files from the
						device.
					</LegacyAlertDialogDescription>
				</LegacyAlertDialogHeader>

				<LegacyAlertDialogFooter>
					<LegacyAlertDialogClose asChild>
						<LegacyAlertDialogButton className="min-w-0 flex-1">
							Keep Data
						</LegacyAlertDialogButton>
					</LegacyAlertDialogClose>
					<LegacyAlertDialogClose asChild>
						<LegacyAlertDialogButton
							className="min-w-0 flex-1"
							variant="primary"
						>
							Erase
						</LegacyAlertDialogButton>
					</LegacyAlertDialogClose>
				</LegacyAlertDialogFooter>
			</LegacyAlertDialogContent>
		</LegacyAlertDialog>
	);
}
