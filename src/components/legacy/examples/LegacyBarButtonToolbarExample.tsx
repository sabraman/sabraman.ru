"use client";

import { CopyIcon } from "lucide-react";

import { LegacyBarButton } from "~/components/legacy-bar-button";

const TOOLBAR_BACKGROUND =
	"linear-gradient(180deg, rgba(201,214,231,0.98) 0%, rgba(158,180,208,0.96) 40%, rgba(112,142,186,0.96) 100%)";

export function LegacyBarButtonToolbarExample() {
	return (
		<div className="w-full max-w-[760px]">
			<div
				className="relative overflow-hidden rounded-[18px] px-[8px] pt-[10px] pb-[9px] shadow-[0_16px_30px_rgba(0,0,0,0.26)]"
				style={{ backgroundImage: TOOLBAR_BACKGROUND }}
			>
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.48),inset_0px_2px_0px_0px_rgba(255,255,255,0.18),inset_0px_-1px_0px_0px_rgba(63,86,121,0.28)]"
				/>

				<div className="relative flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
					<div className="flex shrink-0 items-center">
						<LegacyBarButton label="Components" layout="backward" />
					</div>

					<div className="flex flex-wrap items-center justify-end gap-2">
						<LegacyBarButton
							icon={<CopyIcon />}
							label="Copy Page"
							layout="text-icon"
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
						/>

						<LegacyBarButton
							aria-label="Previous component"
							icon={
								<ToolbarAssetIcon
									height={15}
									src="/figma/legacy-safari/page-back.svg"
									width={12}
								/>
							}
							layout="icon"
						/>

						<LegacyBarButton
							aria-label="Next component"
							disabled={true}
							icon={
								<ToolbarAssetIcon
									height={15}
									src="/figma/legacy-safari/page-forward.svg"
									width={12}
								/>
							}
							layout="icon"
						/>
					</div>
				</div>
			</div>
		</div>
	);
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
			aria-hidden="true"
			className="inline-block bg-center bg-no-repeat"
			style={{
				backgroundImage: `url(${src})`,
				backgroundSize: "contain",
				height,
				width,
			}}
		/>
	);
}
