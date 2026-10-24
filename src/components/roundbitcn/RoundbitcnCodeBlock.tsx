"use client";

import * as React from "react";
import { toast } from "sonner";
import { PixelCheckIcon, PixelCopyIcon } from "~/components/roundbitcn-icons";
import { Button } from "~/components/ui/button";

export function RoundbitcnCodeBlock({
	code,
	title,
}: {
	code: string;
	title?: string;
}) {
	return (
		<div className="roundbit-frame roundbit-lg roundbit-step roundbit-border roundbit-border-solid roundbit-border-border relative w-full overflow-hidden bg-muted/35 text-foreground">
			{title ? (
				<div className="roundbit-border-b roundbit-border-solid roundbit-border-border flex h-12 items-center gap-2 px-4 text-muted-foreground text-sm">
					<span className="roundbit-sm roundbit-step bg-foreground px-1.5 py-0.5 font-bold text-background text-xs">
						TS
					</span>
					<span className="font-mono">{title}</span>
				</div>
			) : null}
			<CopyButton value={code} />
			<pre className="no-scrollbar max-h-[32rem] overflow-auto p-6 font-mono text-sm leading-6">
				<code>{code}</code>
			</pre>
		</div>
	);
}

function CopyButton({ value }: { value: string }) {
	const [copied, setCopied] = React.useState(false);

	return (
		<Button
			aria-label="Copy"
			className="absolute top-3 right-3 z-10 size-8 p-0 shadow-none"
			onClick={async () => {
				await navigator.clipboard.writeText(value);
				setCopied(true);
				toast.success("Copied");
				window.setTimeout(() => setCopied(false), 1200);
			}}
			size="icon"
			type="button"
			variant="ghost"
		>
			{copied ? (
				<PixelCheckIcon aria-hidden="true" />
			) : (
				<PixelCopyIcon aria-hidden="true" />
			)}
		</Button>
	);
}
