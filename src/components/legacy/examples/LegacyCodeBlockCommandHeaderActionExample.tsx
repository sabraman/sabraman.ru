"use client";

import { ExternalLinkIcon } from "lucide-react";
import { LegacyBarButton } from "~/components/legacy-bar-button";
import {
	convertNpmCommand,
	LegacyCodeBlockCommand,
} from "~/components/legacy-code-block-command";

export function LegacyCodeBlockCommandHeaderActionExample() {
	return (
		<LegacyCodeBlockCommand
			headerActions={
				<LegacyBarButton
					icon={<ExternalLinkIcon />}
					label="Docs"
					layout="text-icon"
				/>
			}
			{...convertNpmCommand("npx shadcn@latest add @sabraman/legacy-slider")}
		/>
	);
}
