"use client";

import { ExternalLink, PlusIcon } from "lucide-react";

import { LegacyBarButton } from "~/components/legacy-bar-button";
import { cn } from "~/lib/utils";

interface LegacyBarButtonDemoProps {
	className?: string;
}

export function LegacyBarButtonDemo({ className }: LegacyBarButtonDemoProps) {
	return (
		<div className={cn("flex flex-col items-center gap-4", className)}>
			<div className="flex flex-wrap items-center justify-center gap-3">
				<LegacyBarButton label="Label" />
				<LegacyBarButton icon={<PlusIcon />} layout="icon" />
				<LegacyBarButton icon={<PlusIcon />} label="Add" layout="text-icon" />
				<LegacyBarButton label="Back" layout="backward" />
			</div>

			<div className="flex flex-wrap items-center justify-center gap-3">
				<LegacyBarButton label="Primary" variant="accent" />
				<LegacyBarButton icon={<PlusIcon />} layout="icon" variant="accent" />
				<LegacyBarButton
					label="Open"
					layout="text-icon"
					trailingIcon={<ExternalLink />}
					variant="accent"
				/>
			</div>

			<div className="flex flex-wrap items-center justify-center gap-3">
				<LegacyBarButton label="Delete" variant="destructive" />
				<LegacyBarButton
					icon={<PlusIcon />}
					label="Danger"
					layout="text-icon"
					variant="destructive"
				/>
			</div>
		</div>
	);
}
