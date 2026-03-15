"use client";

import { DownloadIcon, ExternalLink, PlusIcon } from "lucide-react";

import { LegacyBarButton } from "~/components/legacy-bar-button";

export function LegacyBarButtonUsageExample() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<LegacyBarButton label="Library" layout="backward" />
			<LegacyBarButton icon={<PlusIcon />} layout="icon" />
			<LegacyBarButton
				icon={<DownloadIcon />}
				label="Install"
				layout="text-icon"
			/>
			<LegacyBarButton
				label="Docs"
				trailingIcon={<ExternalLink />}
				variant="accent"
			/>
			<LegacyBarButton label="Remove" variant="destructive" />
		</div>
	);
}
