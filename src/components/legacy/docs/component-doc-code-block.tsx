"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import * as React from "react";

import { LegacyBarButton } from "~/components/legacy-bar-button";
import { ScrollFadeEffect } from "~/components/scroll-fade-effect/scroll-fade-effect";
import { cn } from "~/lib/utils";

const COPY_STATE_RESET_MS = 1800;
const CODE_BLOCK_MAX_HEIGHT = "22rem";

type CopyState = "idle" | "done" | "error";

interface LegacyDocCodeBlockProps {
	className?: string;
	code: string;
}

export function LegacyDocCodeBlock({
	className,
	code,
}: LegacyDocCodeBlockProps) {
	const [copyState, setCopyState] = React.useState<CopyState>("idle");

	React.useEffect(() => {
		if (copyState === "idle") {
			return;
		}

		const timeout = window.setTimeout(() => {
			setCopyState("idle");
		}, COPY_STATE_RESET_MS);

		return () => {
			window.clearTimeout(timeout);
		};
	}, [copyState]);

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(code);
			setCopyState("done");
		} catch {
			setCopyState("error");
		}
	}

	return (
		<div
			className={cn(
				"relative overflow-hidden bg-[linear-gradient(180deg,rgba(26,34,49,0.98)_0%,rgba(10,15,24,1)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
				className,
			)}
		>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(50,86,146,0.16),transparent_48%),linear-gradient(90deg,transparent_0%,rgba(34,72,128,0.16)_35%,rgba(34,72,128,0.16)_65%,transparent_100%)]" />

			<LegacyBarButton
				aria-label="Copy code block"
				className="absolute top-5 right-5 z-10 shrink-0"
				icon={
					copyState === "done" ? <CheckIcon strokeWidth={3} /> : <CopyIcon />
				}
				layout="icon"
				onClick={handleCopy}
				variant={copyState === "error" ? "destructive" : "default"}
			/>

			<ScrollFadeEffect
				className="relative px-6 py-6 pr-20"
				orientation="vertical"
				style={{ maxHeight: CODE_BLOCK_MAX_HEIGHT }}
			>
				<pre className="min-w-max overflow-x-auto whitespace-pre font-mono text-[#c8ddff] text-[14px] leading-[1.65]">
					<code>{code}</code>
				</pre>
			</ScrollFadeEffect>
		</div>
	);
}

export function LegacyDocPre({
	children,
	className,
}: React.ComponentProps<"pre">) {
	return (
		<LegacyDocCodeBlock
			className={className}
			code={extractText(children).trimEnd()}
		/>
	);
}

function extractText(node: React.ReactNode): string {
	if (typeof node === "string" || typeof node === "number") {
		return String(node);
	}

	if (Array.isArray(node)) {
		return node.map((child) => extractText(child)).join("");
	}

	if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
		return extractText(node.props.children);
	}

	return "";
}
