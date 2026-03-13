"use client";

import { DownloadIcon, ExternalLink, PlusIcon } from "lucide-react";

import { IosBarButton } from "~/components/ios-bar-button";

export function IosBarButtonUsageExample() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<IosBarButton label="Library" layout="backward" />
			<IosBarButton icon={<PlusIcon />} layout="icon" />
			<IosBarButton
				icon={<DownloadIcon />}
				label="Install"
				layout="text-icon"
			/>
			<IosBarButton
				label="Docs"
				trailingIcon={<ExternalLink />}
				variant="accent"
			/>
			<IosBarButton label="Remove" variant="destructive" />
		</div>
	);
}
