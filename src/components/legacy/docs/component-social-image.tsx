import { readFile } from "node:fs/promises";
import { ImageResponse } from "next/og";
import type { CSSProperties, ReactNode } from "react";
import type { ComponentDocSlug } from "~/components/legacy/docs/component-doc-paths";
import { getComponentDocPath } from "~/components/legacy/docs/component-doc-paths";
import { getComponentDocBySlug } from "~/components/legacy/docs/component-documents";

export const SOCIAL_IMAGE_SIZE = {
	width: 1200,
	height: 630,
} as const;

export const SOCIAL_IMAGE_CONTENT_TYPE = "image/png";

type Palette = {
	accent: string;
	glow: string;
	line: string;
};

const COMPONENT_PALETTES: Record<ComponentDocSlug, Palette> = {
	"legacy-alert-dialog": {
		accent: "#f2ddba",
		glow: "rgba(242, 221, 186, 0.2)",
		line: "rgba(242, 221, 186, 0.24)",
	},
	"legacy-bar-button": {
		accent: "#d4e0f8",
		glow: "rgba(176, 203, 250, 0.2)",
		line: "rgba(176, 203, 250, 0.24)",
	},
	"legacy-clock": {
		accent: "#f0d279",
		glow: "rgba(240, 210, 121, 0.18)",
		line: "rgba(240, 210, 121, 0.24)",
	},
	"legacy-code-block-command": {
		accent: "#9ae7cf",
		glow: "rgba(154, 231, 207, 0.18)",
		line: "rgba(154, 231, 207, 0.24)",
	},
	"legacy-notification": {
		accent: "#d6dcee",
		glow: "rgba(175, 193, 234, 0.18)",
		line: "rgba(175, 193, 234, 0.24)",
	},
	"legacy-slider": {
		accent: "#f1c5a8",
		glow: "rgba(241, 197, 168, 0.18)",
		line: "rgba(241, 197, 168, 0.24)",
	},
	"legacy-switch": {
		accent: "#a7e0b0",
		glow: "rgba(167, 224, 176, 0.18)",
		line: "rgba(167, 224, 176, 0.24)",
	},
	"legacy-wheel-picker": {
		accent: "#d8dcf5",
		glow: "rgba(171, 177, 232, 0.18)",
		line: "rgba(171, 177, 232, 0.24)",
	},
};

export async function createComponentsHubSocialImage({
	locale,
}: {
	locale: string;
}) {
	void locale;
	const fabricDataUrl = await getPngDataUrl(
		"public/figma/legacy-home/folder-fabric.png",
	);
	const logoDataUrl = await getLogoDataUrl();

	return new ImageResponse(
		<div
			style={{
				backgroundColor: "#0d1117",
				backgroundImage: `radial-gradient(860px 380px at 50% 0%, rgba(198, 210, 227, 0.1) 0%, transparent 70%), linear-gradient(180deg, rgba(22, 27, 34, 0.82) 0%, rgba(15, 19, 26, 0.88) 48%, rgba(12, 16, 22, 0.94) 100%), url("${fabricDataUrl}")`,
				backgroundPosition: "center top, center, top left",
				backgroundRepeat: "no-repeat, no-repeat, repeat",
				backgroundSize: "auto, auto, 256px 256px",
				color: "#f5f7fb",
				display: "flex",
				height: "100%",
				overflow: "hidden",
				position: "relative",
				width: "100%",
			}}
		>
			<div
				style={{
					backgroundImage:
						"radial-gradient(1200px 420px at 50% 15%, rgba(255, 255, 255, 0.035) 0%, transparent 72%), linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.012) 11%, transparent 28%)",
					backgroundPosition: "center top, center top",
					backgroundRepeat: "no-repeat, no-repeat",
					backgroundSize: "auto, auto",
					display: "flex",
					inset: 0,
					opacity: 0.9,
					position: "absolute",
				}}
			/>
			<div
				style={{
					backgroundImage:
						"linear-gradient(90deg, rgba(7, 11, 16, 0.42) 0%, rgba(7, 11, 16, 0.1) 14%, rgba(7, 11, 16, 0) 24%, rgba(7, 11, 16, 0) 76%, rgba(7, 11, 16, 0.1) 86%, rgba(7, 11, 16, 0.42) 100%), linear-gradient(180deg, rgba(255, 255, 255, 0.045) 0%, transparent 16%, transparent 72%, rgba(0, 0, 0, 0.28) 100%)",
					backgroundPosition: "center, center",
					backgroundRepeat: "no-repeat, no-repeat",
					backgroundSize: "auto, auto",
					display: "flex",
					inset: 0,
					opacity: 0.9,
					position: "absolute",
				}}
			/>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					height: "100%",
					justifyContent: "space-between",
					padding: "104px 92px 72px",
					position: "relative",
					width: "100%",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 24,
						maxWidth: 640,
					}}
				>
					<div
						style={{
							display: "flex",
							fontFamily: "sans-serif",
							fontSize: 82,
							fontWeight: 800,
							letterSpacing: "-0.06em",
							lineHeight: 0.94,
						}}
					>
						Components
					</div>
					<div
						style={{
							color: "rgba(210, 214, 224, 0.82)",
							display: "flex",
							fontFamily: "sans-serif",
							fontSize: 27,
							fontWeight: 400,
							lineHeight: 1.34,
							maxWidth: 620,
						}}
					>
						A collection of reusable legacy skeuomorphic components.
					</div>
				</div>

				<div
					style={{
						alignItems: "flex-end",
						display: "flex",
						justifyContent: "flex-end",
						width: "100%",
					}}
				>
					<div
						style={{
							backgroundImage: `url("${logoDataUrl}")`,
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
							backgroundSize: "contain",
							display: "flex",
							height: 72,
							opacity: 0.94,
							width: 128,
						}}
					/>
				</div>
			</div>
		</div>,
		SOCIAL_IMAGE_SIZE,
	);
}

export async function createComponentDocSocialImage({
	locale,
	slug,
}: {
	locale: string;
	slug: ComponentDocSlug;
}) {
	const doc = getComponentDocBySlug(slug);

	if (!doc) {
		throw new Error(`Missing component doc for slug "${slug}"`);
	}

	return createSocialImage({
		description: doc.frontmatter.description,
		icon: renderComponentIcon(slug),
		path: getComponentDocPath(slug, locale),
		palette: COMPONENT_PALETTES[slug],
		title: doc.frontmatter.title,
	});
}

async function createSocialImage({
	description,
	icon,
	path,
	palette,
	title,
}: {
	description: string;
	icon: ReactNode;
	path: string;
	palette: Palette;
	title: string;
}) {
	return new ImageResponse(
		<div
			style={{
				background:
					"radial-gradient(circle at 78% 34%, rgba(120, 136, 184, 0.14) 0%, transparent 24%), linear-gradient(135deg, #0a0f18 0%, #0d1422 52%, #0b111d 100%)",
				color: "#f5f7fb",
				display: "flex",
				height: "100%",
				overflow: "hidden",
				position: "relative",
				width: "100%",
			}}
		>
			<div
				style={{
					backgroundImage:
						"linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
					backgroundSize: "24px 24px",
					display: "flex",
					inset: 0,
					opacity: 0.18,
					position: "absolute",
				}}
			/>
			<div
				style={{
					display: "flex",
					height: "100%",
					padding: "60px 68px",
					position: "relative",
					width: "100%",
				}}
			>
				<div
					style={{
						display: "flex",
						flex: "0 0 56%",
						flexDirection: "column",
						justifyContent: "space-between",
						paddingRight: 24,
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: 24,
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								fontFamily: "sans-serif",
								fontSize: getTitleSize(title),
								fontWeight: 800,
								letterSpacing: "-0.07em",
								lineHeight: 0.88,
								maxWidth: 620,
							}}
						>
							{renderTitle(title)}
						</div>
						<div
							style={{
								color: "rgba(211, 218, 235, 0.78)",
								display: "flex",
								fontFamily: "sans-serif",
								fontSize: 30,
								fontWeight: 400,
								lineHeight: 1.34,
								maxWidth: 560,
							}}
						>
							{description}
						</div>
					</div>

					<div
						style={{
							alignItems: "center",
							display: "flex",
							gap: 18,
						}}
					>
						<div
							style={{
								alignItems: "center",
								border: `1px solid ${palette.line}`,
								borderRadius: 999,
								color: "rgba(240, 244, 255, 0.92)",
								display: "flex",
								fontFamily: "sans-serif",
								fontSize: 24,
								fontWeight: 500,
								height: 58,
								padding: "0 24px",
							}}
						>
							View docs
						</div>
						<div
							style={{
								alignItems: "center",
								border: `1px solid ${palette.line}`,
								borderRadius: 999,
								color: "rgba(215, 223, 244, 0.86)",
								display: "flex",
								fontFamily: "sans-serif",
								fontSize: 24,
								fontWeight: 400,
								height: 58,
								padding: "0 24px",
							}}
						>
							{path}
						</div>
					</div>
				</div>

				<div
					style={{
						alignItems: "center",
						display: "flex",
						flex: "1 1 auto",
						justifyContent: "center",
						position: "relative",
					}}
				>
					<div
						style={{
							background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)`,
							display: "flex",
							filter: "blur(12px)",
							height: 340,
							position: "absolute",
							width: 340,
						}}
					/>
					<div
						style={{
							alignItems: "center",
							display: "flex",
							justifyContent: "center",
							position: "relative",
						}}
					>
						{icon}
					</div>
				</div>
			</div>
		</div>,
		SOCIAL_IMAGE_SIZE,
	);
}

function renderTitle(title: string) {
	const words = title.split(" ");

	if (words.length >= 2) {
		const midpoint = Math.ceil(words.length / 2);

		return (
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div style={{ display: "flex" }}>
					{words.slice(0, midpoint).join(" ")}
				</div>
				<div style={{ display: "flex" }}>{words.slice(midpoint).join(" ")}</div>
			</div>
		);
	}

	return <div style={{ display: "flex" }}>{title}</div>;
}

function getTitleSize(title: string) {
	if (title.length > 26) {
		return 76;
	}

	if (title.length > 18) {
		return 84;
	}

	return 94;
}

function renderComponentIcon(slug: ComponentDocSlug) {
	switch (slug) {
		case "legacy-alert-dialog":
			return renderAlertDialogIcon();
		case "legacy-bar-button":
			return renderBarButtonIcon();
		case "legacy-clock":
			return renderClockIcon();
		case "legacy-code-block-command":
			return renderCodeBlockIcon();
		case "legacy-notification":
			return renderNotificationIcon();
		case "legacy-slider":
			return renderSliderIcon();
		case "legacy-switch":
			return renderSwitchIcon();
		case "legacy-wheel-picker":
			return renderWheelPickerIcon();
	}
}

const iconStageStyle: CSSProperties = {
	display: "flex",
	height: 360,
	position: "relative",
	width: 320,
};

const orbStyle: CSSProperties = {
	borderRadius: 999,
	boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
	display: "flex",
	height: 112,
	position: "absolute",
	width: 112,
};

const wheelStyle: CSSProperties = {
	background:
		"linear-gradient(180deg, #efece5 0%, #d0cbc3 18%, #f0ece5 52%, #d8d2ca 100%)",
	borderRadius: 20,
	boxShadow:
		"inset 0 0 0 1px rgba(62,67,90,0.28), inset 0 0 0 2px rgba(255,255,255,0.28), 0 20px 40px rgba(0,0,0,0.22)",
	display: "flex",
	overflow: "hidden",
	position: "absolute",
};

const switchStyle: CSSProperties = {
	alignItems: "center",
	background: "linear-gradient(180deg, #8fdd9e 0%, #5ead70 100%)",
	borderRadius: 999,
	boxShadow:
		"inset 0 1px 0 rgba(255,255,255,0.32), 0 18px 34px rgba(0,0,0,0.2)",
	display: "flex",
	height: 58,
	justifyContent: "flex-end",
	padding: "0 6px",
	position: "absolute",
	width: 112,
};

const commandStyle: CSSProperties = {
	background: "rgba(6,10,16,0.96)",
	borderRadius: 22,
	boxShadow: "0 22px 40px rgba(0,0,0,0.26)",
	display: "flex",
	flexDirection: "column",
	gap: 12,
	padding: "20px 18px",
	position: "absolute",
	width: 190,
};

const commandLineStyle: CSSProperties = {
	background: "#c8f1e4",
	borderRadius: 999,
	display: "flex",
	height: 14,
};

function renderWheelPickerIcon() {
	return (
		<div style={{ ...wheelStyle, height: 250, width: 196 }}>
			<div style={wheelColumnStyle} />
			<div style={wheelDividerStyle} />
			<div style={wheelColumnStyle} />
			<div style={wheelDividerStyle} />
			<div style={wheelColumnStyle} />
			<div style={wheelHighlightStyle} />
		</div>
	);
}

const wheelColumnStyle: CSSProperties = {
	display: "flex",
	flex: 1,
};

const wheelDividerStyle: CSSProperties = {
	background: "rgba(71,76,100,0.2)",
	boxShadow: "inset 1px 0 0 rgba(255,255,255,0.34)",
	display: "flex",
	width: 1,
};

const wheelHighlightStyle: CSSProperties = {
	background:
		"linear-gradient(180deg, transparent 0%, rgba(121,127,181,0.12) 34%, rgba(121,127,181,0.4) 50%, rgba(121,127,181,0.12) 66%, transparent 100%)",
	display: "flex",
	inset: 0,
	position: "absolute",
};

function renderClockIcon() {
	return (
		<div style={{ ...iconStageStyle, width: 280 }}>
			<div
				style={{
					...orbStyle,
					background:
						"radial-gradient(circle at 34% 30%, #fff1bf 0%, #ebc75f 46%, #a5762f 100%)",
					left: 22,
					top: 76,
				}}
			/>
			<div
				style={{
					...orbStyle,
					background:
						"radial-gradient(circle at 34% 30%, #e6ebff 0%, #a2b1e2 46%, #324066 100%)",
					height: 104,
					left: 148,
					top: 100,
					width: 104,
				}}
			/>
		</div>
	);
}

function renderSwitchIcon() {
	return (
		<div style={{ ...switchStyle, height: 92, width: 176 }}>
			<div
				style={{
					background:
						"linear-gradient(180deg, rgba(247,249,252,0.98) 0%, rgba(205,212,224,0.92) 100%)",
					borderRadius: 999,
					boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
					display: "flex",
					height: 76,
					width: 76,
				}}
			/>
		</div>
	);
}

function renderCodeBlockIcon() {
	return (
		<div style={{ ...commandStyle, width: 248 }}>
			<div style={{ ...commandLineStyle, background: "#92ead2", width: 152 }} />
			<div style={{ width: 174, ...commandLineStyle }} />
			<div style={{ width: 156, ...commandLineStyle }} />
		</div>
	);
}

function renderNotificationIcon() {
	return (
		<div
			style={{
				background:
					"linear-gradient(180deg, rgba(82,93,117,0.96) 0%, rgba(30,37,52,0.98) 100%)",
				borderRadius: 28,
				boxShadow: "0 24px 44px rgba(0,0,0,0.24)",
				display: "flex",
				flexDirection: "column",
				gap: 16,
				padding: "22px 24px",
				width: 256,
			}}
		>
			<div
				style={{
					alignItems: "center",
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<div
					style={{
						alignItems: "center",
						display: "flex",
						gap: 12,
					}}
				>
					<div
						style={{
							background:
								"linear-gradient(180deg, #eff4ff 0%, rgba(175,193,234,0.94) 100%)",
							borderRadius: 14,
							display: "flex",
							height: 40,
							width: 40,
						}}
					/>
					<div style={{ ...textBarStyle, width: 82 }} />
				</div>
				<div style={{ ...textBarStyle, opacity: 0.54, width: 34 }} />
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 10,
				}}
			>
				<div style={{ ...textBarStyle, width: 118 }} />
				<div style={{ ...textBarStyle, opacity: 0.78, width: 174 }} />
				<div style={{ ...textBarStyle, opacity: 0.62, width: 156 }} />
			</div>
		</div>
	);
}

const textBarStyle: CSSProperties = {
	background: "rgba(239, 243, 252, 0.88)",
	borderRadius: 999,
	display: "flex",
	height: 10,
};

function renderAlertDialogIcon() {
	return (
		<div
			style={{
				background:
					"linear-gradient(180deg, rgba(39,46,60,0.98) 0%, rgba(18,22,31,0.98) 100%)",
				borderRadius: 30,
				boxShadow: "0 26px 48px rgba(0,0,0,0.24)",
				display: "flex",
				flexDirection: "column",
				gap: 18,
				padding: "26px 24px 22px",
				width: 248,
			}}
		>
			<div
				style={{
					background: "#f2ddba",
					borderRadius: 999,
					display: "flex",
					height: 18,
					width: 18,
				}}
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 10,
				}}
			>
				<div style={{ ...textBarStyle, width: 112 }} />
				<div style={{ ...textBarStyle, opacity: 0.72, width: 182 }} />
				<div style={{ ...textBarStyle, opacity: 0.56, width: 150 }} />
			</div>
			<div
				style={{
					display: "flex",
					gap: 10,
				}}
			>
				<div
					style={{
						alignItems: "center",
						border: "1px solid rgba(242, 221, 186, 0.18)",
						borderRadius: 16,
						display: "flex",
						flex: 1,
						height: 44,
						justifyContent: "center",
					}}
				>
					<div style={{ ...textBarStyle, width: 48 }} />
				</div>
				<div
					style={{
						alignItems: "center",
						background: "#f2ddba",
						borderRadius: 16,
						display: "flex",
						flex: 1,
						height: 44,
						justifyContent: "center",
					}}
				>
					<div
						style={{
							background: "rgba(28, 24, 17, 0.82)",
							borderRadius: 999,
							display: "flex",
							height: 10,
							width: 56,
						}}
					/>
				</div>
			</div>
		</div>
	);
}

function renderBarButtonIcon() {
	return (
		<div
			style={{
				alignItems: "center",
				display: "flex",
				gap: 14,
			}}
		>
			{[108, 132, 94].map((width) => (
				<div
					key={String(width)}
					style={{
						alignItems: "center",
						background:
							"linear-gradient(180deg, rgba(234,241,250,0.98) 0%, rgba(121,145,190,0.94) 100%)",
						borderRadius: 16,
						boxShadow: "0 16px 30px rgba(0,0,0,0.2)",
						display: "flex",
						height: 56,
						justifyContent: "center",
						width,
					}}
				>
					<div
						style={{
							background: "rgba(24, 36, 56, 0.8)",
							borderRadius: 999,
							display: "flex",
							height: 10,
							width: Math.max(34, width - 48),
						}}
					/>
				</div>
			))}
		</div>
	);
}

function renderSliderIcon() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 20,
				width: 260,
			}}
		>
			<div style={{ ...sliderTrackStyle, width: 260 }}>
				<div style={{ ...sliderFillStyle, width: 166 }} />
				<div style={{ ...sliderThumbStyle, left: 148 }} />
			</div>
			<div style={{ ...sliderTrackStyle, width: 220 }}>
				<div style={{ ...sliderFillStyle, width: 102 }} />
				<div style={{ ...sliderThumbStyle, left: 88 }} />
			</div>
		</div>
	);
}

const sliderTrackStyle: CSSProperties = {
	background: "rgba(255,255,255,0.1)",
	borderRadius: 999,
	display: "flex",
	height: 20,
	position: "relative",
};

const sliderFillStyle: CSSProperties = {
	background: "#f1c5a8",
	borderRadius: 999,
	display: "flex",
	height: 20,
	left: 0,
	position: "absolute",
};

const sliderThumbStyle: CSSProperties = {
	background:
		"linear-gradient(180deg, rgba(249,241,232,0.98) 0%, rgba(206,185,167,0.96) 100%)",
	borderRadius: 999,
	boxShadow: "0 10px 18px rgba(0,0,0,0.18)",
	display: "flex",
	height: 36,
	position: "absolute",
	top: -8,
	width: 36,
};

async function getLogoDataUrl() {
	const svg = await readFile("public/logo.svg", "utf8");
	const normalizedSvg = svg.replaceAll("#D9D9D9", "#F4F6FB");
	const base64 = Buffer.from(normalizedSvg).toString("base64");

	return `data:image/svg+xml;base64,${base64}`;
}

async function getPngDataUrl(path: string) {
	const file = await readFile(path);
	const base64 = Buffer.from(file).toString("base64");

	return `data:image/png;base64,${base64}`;
}
