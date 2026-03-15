import { LegacyDocCodeBlock } from "~/components/legacy/docs/component-doc-code-block";
import {
	type ComponentDocPreviewName,
	getComponentDocPreview,
} from "~/components/legacy/docs/component-doc-config";
import { readRepoFileForDocs } from "~/components/legacy/docs/component-doc-source";
import { cn } from "~/lib/utils";

export function ComponentDocShowcase({
	description,
	name,
	size = "default",
	title,
}: {
	description?: string;
	name: ComponentDocPreviewName;
	size?: "compact" | "default";
	title?: string;
}) {
	const preview = getComponentDocPreview(name);
	const isCompact = size === "compact";

	return (
		<div
			className={cn(
				"space-y-0 overflow-hidden border border-white/10 bg-[#050608] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
				isCompact ? "rounded-[20px]" : "rounded-[24px]",
			)}
		>
			{title || description ? (
				<div
					className={cn(
						"border-white/10 border-b bg-[linear-gradient(180deg,rgba(24,28,36,0.92)_0%,rgba(12,15,20,0.94)_100%)]",
						isCompact ? "px-5 py-4 md:px-6" : "px-6 py-5 md:px-8",
					)}
				>
					{title ? (
						<h3
							className={cn(
								"font-semibold text-white tracking-tight",
								isCompact ? "text-xl" : "text-2xl",
							)}
						>
							{title}
						</h3>
					) : null}
					{description ? (
						<p
							className={cn(
								"text-[#9aa3b8] leading-relaxed",
								isCompact ? "mt-1.5 text-sm" : "mt-2 text-base",
							)}
						>
							{description}
						</p>
					) : null}
				</div>
			) : null}

			<div
				className={cn(
					"relative overflow-hidden border-white/10 border-b bg-black",
					isCompact
						? "min-h-[260px] px-5 py-6 md:px-6 md:py-7"
						: "min-h-[500px] px-8 py-10 md:px-10 md:py-14",
				)}
			>
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_30%)]" />
				<div
					className={cn(
						"relative flex w-full",
						isCompact ? "min-h-[208px]" : "min-h-[392px]",
						preview.viewportClassName ?? "items-center justify-center",
					)}
				>
					<div className="flex w-full items-center justify-center">
						{preview.render()}
					</div>
				</div>
			</div>

			<LegacyDocCodeBlock
				className={cn(
					"rounded-none border-0 border-white/10 border-t shadow-none",
					isCompact && "[&_pre]:text-[13px]",
				)}
				code={readRepoFileForDocs(preview.sourcePath).trimEnd()}
			/>
		</div>
	);
}
