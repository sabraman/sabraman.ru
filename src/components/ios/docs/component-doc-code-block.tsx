"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import * as React from "react";

import { IosBarButton } from "~/components/ios-bar-button";
import { cn } from "~/lib/utils";

const COPY_STATE_RESET_MS = 1800;

type CopyState = "idle" | "done" | "error";

interface IosDocCodeBlockProps {
	className?: string;
	code: string;
	language?: string;
	title?: string;
}

export function IosDocCodeBlock({
	className,
	code,
	language,
	title,
}: IosDocCodeBlockProps) {
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
				"relative overflow-hidden rounded-[16px] border-[rgba(0,0,0,0.8)] border-[rgba(255,255,255,0.1)] border-t border-b bg-[#1a212d] shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_2px_10px_rgba(0,0,0,0.8)]",
				className,
			)}
		>
			<div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-10 mix-blend-overlay" />

			<div className="relative flex items-center justify-between gap-3 border-white/10 border-b px-4 py-3">
				<div className="min-w-0 space-y-1">
					{title ? (
						<p className="truncate font-medium text-[#dbeaff] text-sm">
							{title}
						</p>
					) : null}
					{language ? (
						<p className="font-medium text-[#7da9ff] text-[11px] uppercase tracking-[0.16em]">
							{language}
						</p>
					) : null}
				</div>

				<IosBarButton
					aria-label="Copy code block"
					className="shrink-0"
					icon={
						copyState === "done" ? <CheckIcon strokeWidth={3} /> : <CopyIcon />
					}
					layout="icon"
					onClick={handleCopy}
					variant={copyState === "error" ? "destructive" : "default"}
				/>
			</div>

			<div className="relative px-6 py-5">
				<pre className="overflow-x-auto whitespace-pre font-mono text-[#a5d6ff] text-[13px] leading-relaxed">
					<code>{code}</code>
				</pre>
			</div>
		</div>
	);
}

export function IosDocPre({
	children,
	className,
}: React.ComponentProps<"pre">) {
	const codeElement = React.Children.toArray(children)[0];
	const language =
		React.isValidElement<{ className?: string }>(codeElement) &&
		typeof codeElement.props.className === "string"
			? codeElement.props.className.replace(/^language-/, "")
			: undefined;

	return (
		<IosDocCodeBlock
			className={className}
			code={extractText(children).trimEnd()}
			language={language}
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
