import {
	getComponentDocConfig,
	getComponentDocPreview,
} from "~/components/legacy/docs/component-doc-config";
import type { ComponentDocSlug } from "~/components/legacy/docs/component-doc-paths";
import { cn } from "~/lib/utils";

const OG_STAGE_CLASSNAME =
	"fixed top-0 left-0 z-[9999] flex h-[630px] w-[1200px] overflow-hidden bg-black";

const COMPONENT_OG_SCALE_CLASSNAMES: Partial<Record<ComponentDocSlug, string>> =
	{
		"legacy-alert-dialog": "scale-[1.55]",
		"legacy-bar-button": "scale-[1.3]",
		"legacy-clock": "scale-[1.45]",
		"legacy-code-block-command": "scale-[1.2]",
		"legacy-notification": "scale-[1.55]",
		"legacy-slider": "scale-[1.28]",
		"legacy-switch": "scale-[1.75]",
		"legacy-wheel-picker": "scale-[1.35]",
	};

export function ComponentsHubOgPreview() {
	return (
		<>
			<style>{`nextjs-portal { display: none !important; }`}</style>
			<div
				data-og-stage="components"
				style={{
					background: "#000",
					display: "flex",
					flexDirection: "column",
					height: 630,
					justifyContent: "space-between",
					left: 0,
					overflow: "hidden",
					padding: "76px",
					position: "fixed",
					top: 0,
					width: 1200,
					zIndex: 9999,
				}}
			>
				<div style={{ maxWidth: 620 }}>
					<h1
						style={{
							color: "#fff",
							fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
							fontSize: 92,
							fontWeight: 700,
							letterSpacing: "-0.07em",
							lineHeight: 0.92,
							margin: 0,
						}}
					>
						Components
					</h1>
					<p
						style={{
							color: "#9ea3ad",
							fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
							fontSize: 38,
							letterSpacing: "-0.03em",
							lineHeight: 1.16,
							margin: "28px 0 0",
							maxWidth: 560,
						}}
					>
						A collection of reusable legacy skeuomorphic components.
					</p>
				</div>

				<div style={{ display: "flex", justifyContent: "flex-end" }}>
					{/* biome-ignore lint/performance/noImgElement: raw svg is more reliable for screenshot capture */}
					<img
						alt=""
						aria-hidden="true"
						height={92}
						src="/logo.svg"
						style={{
							height: 92,
							objectFit: "contain",
							width: 96,
						}}
						width={96}
					/>
				</div>
			</div>
		</>
	);
}

export function ComponentDocOgPreview({ slug }: { slug: ComponentDocSlug }) {
	const config = getComponentDocConfig(slug);
	const preview = getComponentDocPreview(config.featuredPreview);

	return (
		<>
			<style>{`nextjs-portal { display: none !important; }`}</style>
			<div className={OG_STAGE_CLASSNAME} data-og-stage={slug}>
				<div
					className={cn(
						"flex h-full w-full items-center justify-center overflow-hidden",
						preview.viewportClassName,
					)}
				>
					<div
						className={cn(
							"flex w-full items-center justify-center",
							COMPONENT_OG_SCALE_CLASSNAMES[slug],
						)}
					>
						{preview.render()}
					</div>
				</div>
			</div>
		</>
	);
}
