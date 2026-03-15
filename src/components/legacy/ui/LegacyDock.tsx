import Image from "next/image";
import type { CSSProperties } from "react";

type DockApp = {
	id: string;
	name: string;
	iconPath: string;
	badge?: string;
	zIndex: number;
};

const DOCK_ASSET_PATH = "/figma/legacy-dock/dock.svg";
const GLOSS_ASSET_PATH = "/figma/legacy-dock/gloss.svg";
const BADGE_GLOSS_ASSET_PATH = "/figma/legacy-dock/badge-gloss.svg";
const ICON_BASE_ASSET_PATH = "/figma/legacy-dock/icon-base.png";

const DOCK_APPS: DockApp[] = [
	{
		id: "contact",
		name: "Phone",
		iconPath: "/figma/legacy-dock/phone.png",
		zIndex: 4,
	},
	{
		id: "mail",
		name: "Mail",
		iconPath: "/figma/legacy-dock/mail.png",
		badge: "2",
		zIndex: 3,
	},
	{
		id: "safari",
		name: "Safari",
		iconPath: "/figma/legacy-dock/safari.png",
		zIndex: 2,
	},
	{
		id: "music",
		name: "Music",
		iconPath: "/figma/legacy-dock/music.png",
		zIndex: 1,
	},
];

const LABEL_STYLE: CSSProperties = {
	fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
	textShadow: "0 2px 2px rgba(0, 0, 0, 0.8)",
};

const BADGE_TEXT_STYLE: CSSProperties = {
	fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
	fontStyle: "normal",
};

function DockIconArtwork({ iconPath }: { iconPath: string }) {
	return (
		<div className="relative size-[57px] shrink-0" data-name="Icon">
			<div
				aria-hidden="true"
				className="absolute inset-0 overflow-hidden rounded-[10px]"
			>
				<Image
					alt=""
					src={ICON_BASE_ASSET_PATH}
					fill
					sizes="57px"
					className="pointer-events-none object-cover"
				/>
				<Image
					alt=""
					src={iconPath}
					fill
					sizes="57px"
					className="pointer-events-none object-cover"
				/>
			</div>
		</div>
	);
}

function NotificationBadge({ value }: { value: string }) {
	return (
		<div
			className="absolute top-[-7px] left-[calc(50%+24px)] isolate flex min-w-[23px] -translate-x-1/2 items-center justify-center overflow-hidden rounded-[15px] border-2 border-white bg-[linear-gradient(180deg,#ff232d_0%,#c60103_100%)] px-[6px] pb-px shadow-[0_0_2px_rgba(0,0,0,0.4),0_2px_3px_rgba(0,0,0,0.4)]"
			data-name="Badge"
		>
			<div className="absolute top-[-10px] left-1/2 z-[1] h-[20px] w-[41px] -translate-x-1/2">
				<Image
					alt=""
					src={BADGE_GLOSS_ASSET_PATH}
					fill
					sizes="41px"
					unoptimized
					className="pointer-events-none object-fill"
				/>
			</div>
			<span
				className="relative z-[2] whitespace-nowrap text-center font-bold text-[17px] text-white leading-[22px]"
				style={BADGE_TEXT_STYLE}
			>
				{value}
			</span>
		</div>
	);
}

function DockAppItem({
	app,
	onAppOpen,
	showLabel = true,
	showBadge = true,
}: {
	app: DockApp;
	onAppOpen?: (id: string) => void;
	showLabel?: boolean;
	showBadge?: boolean;
}) {
	const content = (
		<>
			<div className="relative overflow-visible">
				<DockIconArtwork iconPath={app.iconPath} />
				{showBadge && app.badge ? (
					<NotificationBadge value={app.badge} />
				) : null}
			</div>
			{showLabel ? (
				<span
					className="min-w-full select-none text-center font-bold text-[11px] text-white leading-[12px]"
					style={LABEL_STYLE}
				>
					{app.name}
				</span>
			) : null}
		</>
	);

	if (!onAppOpen) {
		return (
			<div className="flex flex-col items-center gap-[4px]" aria-hidden="true">
				{content}
			</div>
		);
	}

	return (
		<button
			type="button"
			onClick={() => onAppOpen(app.id)}
			className="flex flex-col items-center gap-[4px] transition-transform active:scale-[0.94]"
			aria-label={app.name}
		>
			{content}
		</button>
	);
}

function DockRow({
	onAppOpen,
	showLabel = true,
	showBadge = true,
}: {
	onAppOpen?: (id: string) => void;
	showLabel?: boolean;
	showBadge?: boolean;
}) {
	return (
		<div className="mx-auto flex w-[320px] items-start px-[6px]">
			{DOCK_APPS.map((app) => (
				<div
					key={app.id}
					className="flex flex-1 justify-center"
					style={{ zIndex: app.zIndex }}
				>
					<DockAppItem
						app={app}
						onAppOpen={onAppOpen}
						showLabel={showLabel}
						showBadge={showBadge}
					/>
				</div>
			))}
		</div>
	);
}

export default function LegacyDock({
	onAppOpen,
}: {
	onAppOpen: (id: string) => void;
}) {
	return (
		<div className="absolute inset-x-0 bottom-0 h-[104px] overflow-visible">
			<div
				className="pointer-events-none absolute inset-x-0 bottom-[-35px] opacity-20"
				data-name="Dock Row Reflection"
				data-node-id="827:28669"
				aria-hidden="true"
				style={{
					transform: "scaleY(-1)",
					WebkitMaskImage:
						"linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 72%)",
					maskImage:
						"linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 72%)",
				}}
			>
				<DockRow showLabel={false} showBadge={false} />
			</div>

			<div
				className="absolute inset-x-0 bottom-0 h-[45px]"
				data-name="Dock"
				data-node-id="189:4265"
			>
				<div className="absolute inset-0">
					<Image
						alt=""
						src={DOCK_ASSET_PATH}
						fill
						sizes="320px"
						unoptimized
						className="pointer-events-none object-fill"
					/>
				</div>
				<div
					className="absolute top-0 right-[10px] left-[10px] h-[33px]"
					data-name="Gloss"
					data-node-id="189:4262"
				>
					<Image
						alt=""
						src={GLOSS_ASSET_PATH}
						fill
						sizes="300px"
						unoptimized
						className="pointer-events-none object-fill"
					/>
				</div>
				<div
					className="absolute right-0 bottom-0 left-0 h-[4px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.2)_100%)]"
					data-name="Edge"
					data-node-id="189:4264"
				/>
			</div>

			<div
				className="absolute inset-x-0 bottom-[6px]"
				data-name="Dock Row"
				data-node-id="827:28670"
			>
				<DockRow onAppOpen={onAppOpen} />
			</div>
		</div>
	);
}
