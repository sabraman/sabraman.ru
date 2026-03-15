"use client";

import { MapPinnedIcon, Share2Icon, SparklesIcon } from "lucide-react";
import { LegacyBarButton } from "~/components/legacy-bar-button";

export function LegacyBarButtonAccentExample() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<LegacyBarButton
				icon={<SparklesIcon />}
				label="Apply"
				layout="text-icon"
				variant="accent"
			/>
			<LegacyBarButton
				icon={<Share2Icon />}
				label="Share"
				layout="text-icon"
				variant="accent"
			/>
			<LegacyBarButton
				icon={<MapPinnedIcon />}
				label="Route"
				layout="text-icon"
				variant="accent"
			/>
		</div>
	);
}
