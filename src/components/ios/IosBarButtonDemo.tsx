"use client";

import { ExternalLink, PlusIcon } from "lucide-react";

import { IosBarButton } from "~/components/ios-bar-button";
import { cn } from "~/lib/utils";

interface IosBarButtonDemoProps {
	className?: string;
}

export function IosBarButtonDemo({ className }: IosBarButtonDemoProps) {
	return (
		<div className={cn("flex flex-col items-center gap-4", className)}>
			<div className="flex flex-wrap items-center justify-center gap-3">
				<IosBarButton label="Label" />
				<IosBarButton icon={<PlusIcon />} layout="icon" />
				<IosBarButton icon={<PlusIcon />} label="Add" layout="text-icon" />
				<IosBarButton label="Back" layout="backward" />
			</div>

			<div className="flex flex-wrap items-center justify-center gap-3">
				<IosBarButton label="Primary" variant="accent" />
				<IosBarButton icon={<PlusIcon />} layout="icon" variant="accent" />
				<IosBarButton
					label="Open"
					layout="text-icon"
					trailingIcon={<ExternalLink />}
					variant="accent"
				/>
			</div>

			<div className="flex flex-wrap items-center justify-center gap-3">
				<IosBarButton label="Delete" variant="destructive" />
				<IosBarButton
					icon={<PlusIcon />}
					label="Danger"
					layout="text-icon"
					variant="destructive"
				/>
			</div>
		</div>
	);
}
