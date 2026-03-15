"use client";

import { RotateCcwIcon, Trash2Icon, XIcon } from "lucide-react";
import { LegacyBarButton } from "~/components/legacy-bar-button";

export function LegacyBarButtonDestructiveExample() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<LegacyBarButton label="Stop Sync" variant="destructive" />
			<LegacyBarButton
				icon={<RotateCcwIcon />}
				label="Reset"
				layout="text-icon"
				variant="destructive"
			/>
			<LegacyBarButton
				icon={<Trash2Icon />}
				label="Delete"
				layout="text-icon"
				variant="destructive"
			/>
			<LegacyBarButton icon={<XIcon />} layout="icon" variant="destructive" />
		</div>
	);
}
