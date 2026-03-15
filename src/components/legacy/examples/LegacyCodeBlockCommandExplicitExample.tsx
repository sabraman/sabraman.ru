"use client";

import { LegacyCodeBlockCommand } from "~/components/legacy-code-block-command";

export function LegacyCodeBlockCommandExplicitExample() {
	return (
		<LegacyCodeBlockCommand
			bun="bun add @radix-ui/react-switch"
			npm="npm install @radix-ui/react-switch"
			pnpm="pnpm add @radix-ui/react-switch"
			yarn="yarn add @radix-ui/react-switch"
		/>
	);
}
