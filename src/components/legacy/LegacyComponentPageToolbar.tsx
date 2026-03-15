"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { LegacyBarButton } from "~/components/legacy-bar-button";
import { useRouter } from "~/i18n/navigation";
import { cn } from "~/lib/utils";

const TOOLBAR_BACKGROUND =
	"linear-gradient(180deg, rgb(181, 196, 215) 0%, rgb(152, 171, 195) 33%, rgb(113, 137, 168) 67%, rgb(87, 114, 150) 100%)";
const COPY_STATE_RESET_MS = 1800;
const MARKDOWN_CACHE = new Map<string, string>();

type CopyState = "idle" | "done" | "error";

interface LegacyComponentPageToolbarProps {
	className?: string;
	markdownUrl?: string;
	nextHref?: string;
	previousHref?: string;
	title: string;
}

export function LegacyComponentPageToolbar({
	className,
	markdownUrl,
	nextHref,
	previousHref,
	title,
}: LegacyComponentPageToolbarProps) {
	const router = useRouter();
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

	async function copyCurrentPageMarkdown() {
		try {
			await navigator.clipboard.writeText(
				await resolveMarkdownCopyValue(markdownUrl, title),
			);
			setCopyState("done");
		} catch {
			setCopyState("error");
		}
	}

	async function shareCurrentPage() {
		if (typeof navigator.share === "function") {
			try {
				await navigator.share({
					title,
					url: window.location.href,
				});
				return;
			} catch (error) {
				if (error instanceof DOMException && error.name === "AbortError") {
					return;
				}
			}
		}

		try {
			await navigator.clipboard.writeText(window.location.href);
		} catch {}
	}

	return (
		<div className={cn("relative", className)}>
			<div
				className="relative overflow-hidden rounded-[10px] px-[6px] pt-[8px] pb-[7px] shadow-[0_1px_2px_rgba(0,0,0,0.16)]"
				style={{ backgroundImage: TOOLBAR_BACKGROUND }}
			>
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.45),inset_0px_2px_0px_0px_rgba(255,255,255,0.18),inset_0px_-1px_0px_0px_rgba(63,86,121,0.28)]"
				/>

				<div className="relative flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
					<div className="flex shrink-0 items-center">
						<LegacyBarButton
							label="Components"
							layout="backward"
							onClick={() => {
								router.push("/components");
							}}
						/>
					</div>

					<div className="flex flex-wrap items-center justify-end gap-2">
						<LegacyBarButton
							icon={
								copyState === "done" ? (
									<CheckIcon strokeWidth={3} />
								) : (
									<CopyIcon />
								)
							}
							label={copyState === "done" ? "Copied" : "Copy Page"}
							layout="text-icon"
							onClick={copyCurrentPageMarkdown}
							variant={copyState === "error" ? "destructive" : "default"}
						/>

						<LegacyBarButton
							aria-label="Share page"
							icon={
								<ToolbarAssetIcon
									height={18}
									src="/figma/legacy-safari/page-share.svg"
									width={23}
								/>
							}
							layout="icon"
							onClick={shareCurrentPage}
						/>

						<LegacyBarButton
							aria-label="Previous component"
							disabled={!previousHref}
							icon={
								<ToolbarAssetIcon
									height={15}
									src="/figma/legacy-safari/page-back.svg"
									width={12}
								/>
							}
							layout="icon"
							onClick={() => {
								if (previousHref) {
									router.push(previousHref);
								}
							}}
						/>

						<LegacyBarButton
							aria-label="Next component"
							disabled={!nextHref}
							icon={
								<ToolbarAssetIcon
									height={15}
									src="/figma/legacy-safari/page-forward.svg"
									width={12}
								/>
							}
							layout="icon"
							onClick={() => {
								if (nextHref) {
									router.push(nextHref);
								}
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function buildMarkdownLink(title: string) {
	return `[${escapeMarkdownLabel(title)}](${window.location.href})`;
}

async function resolveMarkdownCopyValue(
	markdownUrl: string | undefined,
	title: string,
) {
	if (!markdownUrl) {
		return buildMarkdownLink(title);
	}

	const cachedMarkdown = MARKDOWN_CACHE.get(markdownUrl);

	if (cachedMarkdown) {
		return cachedMarkdown;
	}

	const response = await fetch(markdownUrl, {
		headers: {
			Accept: "text/markdown, text/plain; q=0.9, */*; q=0.1",
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to load markdown for ${markdownUrl}`);
	}

	const markdown = await response.text();
	MARKDOWN_CACHE.set(markdownUrl, markdown);

	return markdown;
}

function escapeMarkdownLabel(value: string) {
	return value.replaceAll("[", "\\[").replaceAll("]", "\\]");
}

function ToolbarAssetIcon({
	height,
	src,
	width,
}: {
	height: number;
	src: string;
	width: number;
}) {
	return (
		<span
			className="relative block shrink-0"
			style={{
				height,
				width,
			}}
		>
			<Image alt="" fill sizes={`${width}px`} src={src} />
		</span>
	);
}
