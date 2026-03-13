"use client";

import { motion, type Variants } from "framer-motion";
import {
	CheckIcon,
	CircleXIcon,
	CopyIcon,
	ExternalLink,
	PlusIcon,
} from "lucide-react";
import { motion as motionCore } from "motion/react";
import type { ReactNode } from "react";
import * as React from "react";
import { IosAlertDialogDemo } from "~/components/ios/IosAlertDialogDemo";
import { IosBarButtonDemo } from "~/components/ios/IosBarButtonDemo";
import { IosBarButton } from "~/components/ios-bar-button";
import { IosClock } from "~/components/ios-clock";
import {
	PackageManagerIcon,
	usePreferredPackageManager,
} from "~/components/ios-code-block-command";
import {
	IosSegmentedControl,
	type IosSegmentedControlItem,
} from "~/components/ios-segmented-control";
import { TextFlip } from "~/components/text-flip/text-flip";
import type { Locale } from "~/i18n";
import { useRouter } from "~/i18n/navigation";
import { cn } from "~/lib/utils";
import {
	getIosWheelPickerHubPath,
	IOS_WHEEL_PICKER_URLS,
} from "./component-pages-content";
import { IosCodeBlockCommandDemo } from "./IosCodeBlockCommandDemo";
import { IosRegistryAddDialog } from "./IosRegistryAddDialog";
import { IosSliderDemo } from "./IosSliderDemo";
import { IosSwitchDemo } from "./IosSwitchDemo";
import { IosWheelPickerDemo } from "./IosWheelPickerDemo";
import {
	getIosAlertDialogHubPath,
	IOS_ALERT_DIALOG_DOCS_COPY,
	IOS_ALERT_DIALOG_URLS,
} from "./ios-alert-dialog-content";
import {
	getIosBarButtonHubPath,
	IOS_BAR_BUTTON_DOCS_COPY,
	IOS_BAR_BUTTON_URLS,
} from "./ios-bar-button-content";
import {
	getIosClockHubPath,
	IOS_CLOCK_DOCS_COPY,
	IOS_CLOCK_URLS,
} from "./ios-clock-content";
import {
	getIosCodeBlockCommandHubPath,
	IOS_CODE_BLOCK_COMMAND_DOCS_COPY,
	IOS_CODE_BLOCK_COMMAND_URLS,
} from "./ios-code-block-command-content";
import {
	getIosSliderHubPath,
	IOS_SLIDER_DOCS_COPY,
	IOS_SLIDER_URLS,
} from "./ios-slider-content";
import {
	getIosSwitchHubPath,
	IOS_SWITCH_DOCS_COPY,
	IOS_SWITCH_URLS,
} from "./ios-switch-content";

const PACKAGE_MANAGERS = ["bun", "npm", "pnpm", "yarn"] as const;
const COPY_STATE_RESET_MS = 1800;

type PackageManager = (typeof PACKAGE_MANAGERS)[number];
type CopyState = "idle" | "done" | "error";

const revealVariants: Variants = {
	hidden: { opacity: 0, y: 28 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
	},
};

const flipVariants = {
	animate: { filter: "blur(0px)", opacity: 1, y: 0 },
	exit: { filter: "blur(4px)", opacity: 0, y: 10 },
	initial: { filter: "blur(4px)", opacity: 0, y: -10 },
} as const;

const IOS_SANS_STYLE = {
	fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
} as const;

const HERO_SEGMENT_ITEMS: IosSegmentedControlItem<PackageManager>[] =
	PACKAGE_MANAGERS.map((packageManager) => ({
		label: packageManager,
		value: packageManager,
		width: packageManager === "pnpm" ? 58 : 52,
	}));

type ShowcaseItem = {
	alias: string;
	description: string;
	href: string;
	itemUrl: string;
	preview: ReactNode;
	title: string;
};

type HeroInstallItem = Pick<ShowcaseItem, "alias">;

function getAliasInstallPrefix(packageManager: PackageManager) {
	switch (packageManager) {
		case "pnpm":
			return "pnpm dlx shadcn@latest add @sabraman/";
		case "yarn":
			return "yarn dlx shadcn@latest add @sabraman/";
		case "npm":
			return "npx shadcn@latest add @sabraman/";
		default:
			return "bunx --bun shadcn@latest add @sabraman/";
	}
}

function getAliasInstallCommand(
	packageManager: PackageManager,
	componentAlias: string,
) {
	return `${getAliasInstallPrefix(packageManager)}${componentAlias}`;
}

function HeroInstallSurface({
	items,
	onAddRegistry,
}: {
	items: HeroInstallItem[];
	onAddRegistry: () => void;
}) {
	const [packageManager, setPackageManager] = usePreferredPackageManager("bun");
	const [activeIndex, setActiveIndex] = React.useState(0);
	const [copyState, setCopyState] = React.useState<CopyState>("idle");

	const activeItem = items[activeIndex] ?? items[0];
	const activeAlias = activeItem?.alias ?? "ios-wheel-picker";

	const activeCommand = React.useMemo(() => {
		return getAliasInstallCommand(packageManager, activeAlias);
	}, [activeAlias, packageManager]);

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
			await navigator.clipboard.writeText(activeCommand);
			setCopyState("done");
		} catch {
			setCopyState("error");
		}
	}

	return (
		<div className="rounded-[24px] border-[rgba(0,0,0,0.72)] border-[rgba(255,255,255,0.65)] border-t border-b bg-[linear-gradient(180deg,#dbe3ec_0%,#aab5c7_100%)] p-[5px] shadow-[0_30px_60px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.96)]">
			<div className="relative overflow-hidden rounded-[18px] border-[rgba(0,0,0,0.82)] border-[rgba(255,255,255,0.16)] border-t border-b bg-[linear-gradient(180deg,#4c586e_0%,#1b2537_100%)] shadow-[0_18px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.12)]">
				<div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />

				<div className="relative flex flex-col gap-4 border-black/35 border-b px-4 py-4 shadow-[0_1px_0_rgba(255,255,255,0.08)] md:flex-row md:items-center md:justify-between">
					<div className="flex items-center gap-3">
						<div className="flex w-[20px] shrink-0 items-center text-[#dbeaff] [filter:drop-shadow(0px_-1px_0px_rgba(0,0,0,0.45))] [&_svg]:size-[18px]">
							<PackageManagerIcon packageManager={packageManager} />
						</div>
						<IosSegmentedControl
							items={HERO_SEGMENT_ITEMS}
							onValueChange={setPackageManager}
							value={packageManager}
						/>
					</div>

					<div className="flex items-center gap-2 self-end md:self-auto">
						<IosBarButton
							icon={<PlusIcon />}
							label="Add"
							layout="text-icon"
							onClick={onAddRegistry}
						/>
						<IosBarButton
							aria-label="Copy install command"
							icon={
								copyState === "done" ? (
									<CheckIcon strokeWidth={3} />
								) : copyState === "error" ? (
									<CircleXIcon />
								) : (
									<CopyIcon />
								)
							}
							layout="icon"
							onClick={handleCopy}
						/>
					</div>
				</div>

				<div className="relative overflow-hidden bg-[linear-gradient(180deg,#131922_0%,#070a10_100%)] px-5 py-6 md:px-6 md:py-7">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 opacity-[0.18]"
						style={{
							backgroundImage:
								"repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 2px, transparent 2px, transparent 12px)",
						}}
					/>
					<div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),inset_0_18px_30px_rgba(255,255,255,0.03),inset_0_-28px_40px_rgba(0,0,0,0.52)]" />

					<div className="relative z-[1] overflow-x-auto">
						<code className="flex min-w-max flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[#e8edf8] text-[clamp(1.1rem,2vw,1.7rem)] leading-[1.45]">
							<span className="select-none text-[#8895b2]">$</span>
							<span className="whitespace-pre">
								{getAliasInstallPrefix(packageManager)}
							</span>
							<TextFlip
								as={motionCore.span}
								className="whitespace-pre text-[#6b7388]"
								interval={2.2}
								onIndexChange={setActiveIndex}
								transition={{ duration: 0.22, ease: "easeOut" }}
								variants={flipVariants}
							>
								{items.map((item) => (
									<span key={item.alias}>{item.alias}</span>
								))}
							</TextFlip>
						</code>
					</div>
				</div>
			</div>
		</div>
	);
}

function GridRail() {
	return <div className="hidden border-white/8 border-r md:block" />;
}

function HubHeader({
	items,
	onAddRegistry,
}: {
	items: HeroInstallItem[];
	onAddRegistry: () => void;
}) {
	return (
		<header className="border-white/8 border-y">
			<div className="grid md:grid-cols-[68px_minmax(0,1fr)]">
				<GridRail />
				<div className="px-5 py-6 md:px-8 md:py-7">
					<h1
						className="font-bold text-[clamp(2.9rem,7vw,4.8rem)] text-white tracking-[-0.06em]"
						style={IOS_SANS_STYLE}
					>
						Components
					</h1>
				</div>
			</div>

			<div className="grid border-white/8 border-t md:grid-cols-[68px_minmax(0,1fr)]">
				<GridRail />
				<div className="px-5 py-5 md:px-8 md:py-6">
					<p className="max-w-4xl font-mono text-[#9aa3b8] text-[clamp(1rem,2.6vw,1.15rem)] leading-relaxed">
						A collection of reusable iOS 6 skeuomorphic components. Trusted
						registry for shadcn/ui.
					</p>
				</div>
			</div>

			<div className="grid border-white/8 border-t md:grid-cols-[68px_minmax(0,1fr)]">
				<GridRail />
				<div className="px-5 py-5 md:px-8 md:py-8">
					<HeroInstallSurface items={items} onAddRegistry={onAddRegistry} />
				</div>
			</div>
		</header>
	);
}

function PreviewStage({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"relative flex min-h-[220px] w-full items-center justify-center px-4 py-6 sm:px-8 sm:py-8",
				className,
			)}
		>
			<div className="pointer-events-none absolute bottom-6 left-1/2 h-16 w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_72%)] blur-3xl" />
			<div className="relative w-full">{children}</div>
		</div>
	);
}

function WheelPickerPreview() {
	return (
		<PreviewStage className="min-h-[330px]">
			<IosWheelPickerDemo
				className="mx-auto origin-top scale-[0.86] sm:scale-[0.94]"
				frameWidth={300}
				showReadout={false}
				width={170}
			/>
		</PreviewStage>
	);
}

function ClockPreview() {
	return (
		<PreviewStage>
			<div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10">
				<div className="flex flex-col items-center gap-3">
					<IosClock
						aria-label="Legacy iOS day clock preview"
						size={88}
						variant="day"
					/>
					<p className="font-mono text-[#8d97af] text-[11px] uppercase tracking-[0.24em]">
						Day
					</p>
				</div>
				<div className="flex flex-col items-center gap-3">
					<IosClock
						aria-label="Legacy iOS night clock preview"
						size={88}
						variant="night"
					/>
					<p className="font-mono text-[#8d97af] text-[11px] uppercase tracking-[0.24em]">
						Night
					</p>
				</div>
			</div>
		</PreviewStage>
	);
}

function AlertDialogPreview() {
	return (
		<PreviewStage className="min-h-[240px]">
			<IosAlertDialogDemo
				className="mx-auto w-full max-w-[420px]"
				compact={true}
			/>
		</PreviewStage>
	);
}

function BarButtonPreview() {
	return (
		<PreviewStage className="min-h-[250px]">
			<IosBarButtonDemo className="mx-auto max-w-[520px]" />
		</PreviewStage>
	);
}

function SwitchPreview() {
	return (
		<PreviewStage className="min-h-[210px]">
			<IosSwitchDemo className="mx-auto max-w-[320px]" compact={true} />
		</PreviewStage>
	);
}

function SliderPreview() {
	return (
		<PreviewStage className="min-h-[300px]">
			<IosSliderDemo className="mx-auto max-w-[430px]" compact={true} />
		</PreviewStage>
	);
}

function CodeBlockPreview() {
	return (
		<PreviewStage className="min-h-[290px]">
			<div className="mx-auto w-full max-w-[460px]">
				<IosCodeBlockCommandDemo className="mx-auto" />
			</div>
		</PreviewStage>
	);
}

function ComponentSection({
	description,
	href,
	itemUrl,
	preview,
	title,
}: ShowcaseItem) {
	const router = useRouter();

	return (
		<motion.section
			initial="hidden"
			variants={revealVariants}
			viewport={{ once: true, margin: "-100px" }}
			whileInView="visible"
			className="grid gap-8 border-white/8 border-b px-5 py-10 md:px-8 md:py-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,1.08fr)] lg:items-center lg:gap-16"
		>
			<div className="space-y-5">
				<h2
					className="font-bold text-4xl text-white tracking-[-0.05em] md:text-5xl"
					style={IOS_SANS_STYLE}
				>
					{title}
				</h2>
				<p className="max-w-xl font-mono text-[#8f98ae] text-[15px] leading-relaxed">
					{description}
				</p>

				<div className="flex flex-wrap items-center gap-3">
					<IosBarButton
						label="View docs"
						trailingIcon={<ExternalLink />}
						onClick={() => {
							router.push(href);
						}}
					></IosBarButton>
					<IosBarButton
						label="Item JSON"
						trailingIcon={<ExternalLink />}
						onClick={() => {
							window.open(itemUrl, "_blank", "noopener,noreferrer");
						}}
					></IosBarButton>
				</div>
			</div>

			<div>{preview}</div>
		</motion.section>
	);
}

function ComponentsChooserHub({ locale }: { locale: Locale }) {
	const [isRegistryDialogOpen, setIsRegistryDialogOpen] = React.useState(false);
	const showcases: ShowcaseItem[] = [
		{
			alias: "ios-wheel-picker",
			description:
				"A faithful time picker recreation with deep inset gradients, crisp dividers, and the original mechanical snap.",
			href: getIosWheelPickerHubPath(locale),
			itemUrl: IOS_WHEEL_PICKER_URLS.direct,
			preview: <WheelPickerPreview />,
			title: "iOS 6 Wheel Picker",
		},
		{
			alias: "ios-alert-dialog",
			description: IOS_ALERT_DIALOG_DOCS_COPY.summary,
			href: getIosAlertDialogHubPath(),
			itemUrl: IOS_ALERT_DIALOG_URLS.direct,
			preview: <AlertDialogPreview />,
			title: IOS_ALERT_DIALOG_DOCS_COPY.title,
		},
		{
			alias: "ios-bar-button",
			description: IOS_BAR_BUTTON_DOCS_COPY.summary,
			href: getIosBarButtonHubPath(),
			itemUrl: IOS_BAR_BUTTON_URLS.direct,
			preview: <BarButtonPreview />,
			title: IOS_BAR_BUTTON_DOCS_COPY.title,
		},
		{
			alias: "ios-clock",
			description: IOS_CLOCK_DOCS_COPY.summary,
			href: getIosClockHubPath(),
			itemUrl: IOS_CLOCK_URLS.direct,
			preview: <ClockPreview />,
			title: IOS_CLOCK_DOCS_COPY.title,
		},
		{
			alias: "ios-switch",
			description: IOS_SWITCH_DOCS_COPY.summary,
			href: getIosSwitchHubPath(),
			itemUrl: IOS_SWITCH_URLS.direct,
			preview: <SwitchPreview />,
			title: IOS_SWITCH_DOCS_COPY.title,
		},
		{
			alias: "ios-slider",
			description: IOS_SLIDER_DOCS_COPY.summary,
			href: getIosSliderHubPath(),
			itemUrl: IOS_SLIDER_URLS.direct,
			preview: <SliderPreview />,
			title: IOS_SLIDER_DOCS_COPY.title,
		},
		{
			alias: "ios-code-block-command",
			description: IOS_CODE_BLOCK_COMMAND_DOCS_COPY.summary,
			href: getIosCodeBlockCommandHubPath(),
			itemUrl: IOS_CODE_BLOCK_COMMAND_URLS.direct,
			preview: <CodeBlockPreview />,
			title: IOS_CODE_BLOCK_COMMAND_DOCS_COPY.title,
		},
	];

	return (
		<main className="relative min-h-screen overflow-hidden bg-[#03050a] text-white selection:bg-white/14">
			<div
				className="pointer-events-none absolute inset-0 opacity-90"
				style={{
					backgroundImage:
						"linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
					backgroundSize: "64px 64px",
				}}
			/>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.08]"
				style={{
					backgroundImage:
						"repeating-linear-gradient(135deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 2px, transparent 2px, transparent 14px)",
					maskImage:
						"linear-gradient(to bottom, transparent 0%, black 18%, black 78%, transparent 100%)",
				}}
			/>
			<div className="pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-[#07101c] to-transparent opacity-60" />

			<div className="relative mx-auto flex w-full max-w-[1600px] flex-col px-0 py-8 md:py-10">
				<HubHeader
					items={showcases}
					onAddRegistry={() => {
						setIsRegistryDialogOpen(true);
					}}
				/>

				<div className="border-white/8 border-x md:mx-[68px]">
					{showcases.map((showcase) => (
						<ComponentSection {...showcase} key={showcase.alias} />
					))}
				</div>
			</div>

			<IosRegistryAddDialog
				onOpenChange={setIsRegistryDialogOpen}
				open={isRegistryDialogOpen}
			/>
		</main>
	);
}

export function ComponentsHub({ locale }: { locale: Locale }) {
	return <ComponentsChooserHub locale={locale} />;
}
