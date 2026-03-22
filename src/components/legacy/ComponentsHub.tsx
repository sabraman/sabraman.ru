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
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import * as React from "react";
import { LegacyAlertDialogDemo } from "~/components/legacy/LegacyAlertDialogDemo";
import { LegacyBarButtonDemo } from "~/components/legacy/LegacyBarButtonDemo";
import { LegacyNotificationDemo } from "~/components/legacy/LegacyNotificationDemo";
import { LegacyBarButton } from "~/components/legacy-bar-button";
import { LegacyClock } from "~/components/legacy-clock";
import {
	PackageManagerIcon,
	usePreferredPackageManager,
} from "~/components/legacy-code-block-command";
import {
	LegacySegmentedControl,
	type LegacySegmentedControlItem,
} from "~/components/legacy-segmented-control";
import { RoundbitFrameXlExample } from "~/components/roundbit/examples/RoundbitFrameXlExample";
import {
	getRoundbitHubPath,
	ROUNDBIT_DOCS_COPY,
} from "~/components/roundbit-content";
import { TextFlip } from "~/components/text-flip/text-flip";
import { getLocalizedPathname } from "~/i18n/locale-paths";
import type { SupportedLocale } from "~/i18n/types";
import { cn } from "~/lib/utils";
import { LEGACY_COMPONENT_PAGE_SHELL_CLASSNAME } from "./component-page-layout";
import { getLegacyWheelPickerHubPath } from "./component-pages-content";
import { LegacyCodeBlockCommandDemo } from "./LegacyCodeBlockCommandDemo";
import { LegacyRegistryAddDialog } from "./LegacyRegistryAddDialog";
import { LegacySliderDemo } from "./LegacySliderDemo";
import { LegacySwitchDemo } from "./LegacySwitchDemo";
import { LegacyWheelPickerDemo } from "./LegacyWheelPickerDemo";
import {
	getLegacyAlertDialogHubPath,
	LEGACY_ALERT_DIALOG_DOCS_COPY,
} from "./legacy-alert-dialog-content";
import {
	getLegacyBarButtonHubPath,
	LEGACY_BAR_BUTTON_DOCS_COPY,
} from "./legacy-bar-button-content";
import {
	getLegacyClockHubPath,
	LEGACY_CLOCK_DOCS_COPY,
} from "./legacy-clock-content";
import {
	getLegacyCodeBlockCommandHubPath,
	LEGACY_CODE_BLOCK_COMMAND_DOCS_COPY,
} from "./legacy-code-block-command-content";
import {
	LegacyUiLocaleProvider,
	useLegacyUiLocale,
} from "./legacy-locale-context";
import {
	getLegacyNotificationHubPath,
	LEGACY_NOTIFICATION_DOCS_COPY,
} from "./legacy-notification-content";
import {
	getLegacySliderHubPath,
	LEGACY_SLIDER_DOCS_COPY,
} from "./legacy-slider-content";
import {
	getLegacySwitchHubPath,
	LEGACY_SWITCH_DOCS_COPY,
} from "./legacy-switch-content";

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

const LEGACY_SANS_STYLE = {
	fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
} as const;

const HERO_SEGMENT_ITEMS: LegacySegmentedControlItem<PackageManager>[] =
	PACKAGE_MANAGERS.map((packageManager) => ({
		label: packageManager,
		value: packageManager,
		width: packageManager === "pnpm" ? 58 : 52,
	}));

type ShowcaseItem = {
	alias: string;
	description: string;
	href: string;
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
	const activeAlias = activeItem?.alias ?? "legacy-wheel-picker";

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
		<div className="w-full max-w-[980px] rounded-[24px] border-[rgba(0,0,0,0.72)] border-[rgba(255,255,255,0.65)] border-t border-b bg-[linear-gradient(180deg,#dbe3ec_0%,#aab5c7_100%)] p-[5px] shadow-[0_30px_60px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.96)]">
			<div className="relative overflow-hidden rounded-[18px] border-[rgba(0,0,0,0.82)] border-[rgba(255,255,255,0.16)] border-t border-b bg-[linear-gradient(180deg,#4c586e_0%,#1b2537_100%)] shadow-[0_18px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.12)]">
				<div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />

				<div className="relative flex flex-col gap-4 border-black/35 border-b px-4 py-4 shadow-[0_1px_0_rgba(255,255,255,0.08)] md:flex-row md:items-center md:justify-between">
					<div className="flex items-center gap-3">
						<div className="flex w-[20px] shrink-0 items-center text-[#dbeaff] [filter:drop-shadow(0px_-1px_0px_rgba(0,0,0,0.45))] [&_svg]:size-[18px]">
							<PackageManagerIcon packageManager={packageManager} />
						</div>
						<LegacySegmentedControl
							items={HERO_SEGMENT_ITEMS}
							onValueChange={setPackageManager}
							value={packageManager}
						/>
					</div>

					<div className="flex items-center gap-2 self-end md:self-auto">
						<LegacyBarButton
							icon={<PlusIcon />}
							label="Add"
							layout="text-icon"
							onClick={onAddRegistry}
						/>
						<LegacyBarButton
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

				<div className="relative overflow-hidden bg-[linear-gradient(180deg,#131922_0%,#070a10_100%)] px-4 py-5 md:px-5 md:py-6">
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
						<code className="flex min-w-max flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[#e8edf8] text-[clamp(1rem,1.45vw,1.45rem)] leading-[1.4]">
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

function HubHeader({
	items,
	onAddRegistry,
}: {
	items: HeroInstallItem[];
	onAddRegistry: () => void;
}) {
	return (
		<header>
			<div className="px-2 py-5 md:px-0 md:py-6">
				<h1
					className="font-bold text-[clamp(2.7rem,6.2vw,4.25rem)] text-white tracking-[-0.06em]"
					style={LEGACY_SANS_STYLE}
				>
					Components
				</h1>
			</div>

			<div className="px-2 py-4 md:px-0 md:py-5">
				<p className="max-w-3xl font-mono text-[#9aa3b8] text-[clamp(0.98rem,2.2vw,1.08rem)] leading-relaxed">
					A collection of reusable legacy skeuomorphic components.
				</p>
			</div>

			<div className="px-2 py-4 md:px-0 md:py-6">
				<HeroInstallSurface items={items} onAddRegistry={onAddRegistry} />
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
				"relative flex min-h-[190px] w-full items-center justify-center px-4 py-5 sm:px-6 sm:py-6 lg:justify-end lg:px-0 lg:py-0",
				className,
			)}
		>
			<div className="pointer-events-none absolute bottom-6 left-1/2 h-16 w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_72%)] blur-3xl lg:right-0 lg:left-auto lg:w-[58%] lg:translate-x-0" />
			<div className="relative w-full lg:flex lg:justify-end">{children}</div>
		</div>
	);
}

function WheelPickerPreview() {
	return (
		<PreviewStage className="min-h-[300px]">
			<LegacyWheelPickerDemo
				className="origin-top scale-[0.86] sm:scale-[0.94] lg:ml-auto"
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
			<div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 lg:justify-end">
				<div className="flex flex-col items-center gap-3">
					<LegacyClock
						aria-label="Legacy day clock preview"
						size={88}
						variant="day"
					/>
					<p className="font-mono text-[#8d97af] text-[11px] uppercase tracking-[0.24em]">
						Day
					</p>
				</div>
				<div className="flex flex-col items-center gap-3">
					<LegacyClock
						aria-label="Legacy night clock preview"
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

function NotificationPreview() {
	return (
		<PreviewStage className="min-h-[240px]">
			<div className="w-full max-w-[320px] lg:ml-auto">
				<LegacyNotificationDemo />
			</div>
		</PreviewStage>
	);
}

function AlertDialogPreview() {
	return (
		<PreviewStage className="min-h-[220px]">
			<LegacyAlertDialogDemo
				className="w-full max-w-[420px] lg:ml-auto"
				compact={true}
			/>
		</PreviewStage>
	);
}

function BarButtonPreview() {
	return (
		<PreviewStage className="min-h-[220px]">
			<LegacyBarButtonDemo className="max-w-[520px] lg:ml-auto" />
		</PreviewStage>
	);
}

function SwitchPreview() {
	return (
		<PreviewStage className="min-h-[190px]">
			<LegacySwitchDemo className="max-w-[320px] lg:ml-auto" compact={true} />
		</PreviewStage>
	);
}

function SliderPreview() {
	return (
		<PreviewStage className="min-h-[260px]">
			<LegacySliderDemo className="max-w-[430px] lg:ml-auto" compact={true} />
		</PreviewStage>
	);
}

function CodeBlockPreview() {
	return (
		<PreviewStage className="min-h-[240px]">
			<div className="w-full max-w-[460px] lg:ml-auto">
				<LegacyCodeBlockCommandDemo className="mx-auto" />
			</div>
		</PreviewStage>
	);
}

function RoundbitPreview() {
	return (
		<PreviewStage className="min-h-[280px]">
			<div className="w-full max-w-[420px] lg:ml-auto">
				<RoundbitFrameXlExample />
			</div>
		</PreviewStage>
	);
}

function ComponentSection({
	description,
	href,
	isLast = false,
	preview,
	title,
}: ShowcaseItem & { isLast?: boolean }) {
	const router = useRouter();
	const locale = useLegacyUiLocale();

	return (
		<motion.section
			initial="hidden"
			variants={revealVariants}
			viewport={{ once: true, margin: "-100px" }}
			whileInView="visible"
			className={cn(
				"px-2 py-8 md:px-0 md:py-9",
				!isLast && "border-white/8 border-b",
			)}
		>
			<div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,1fr)] lg:items-center lg:gap-10">
				<div className="space-y-4">
					<h2
						className="font-bold text-[2rem] text-white tracking-[-0.05em] md:text-[2.75rem]"
						style={LEGACY_SANS_STYLE}
					>
						{title}
					</h2>
					<p className="max-w-xl font-mono text-[#8f98ae] text-[14px] leading-relaxed">
						{description}
					</p>

					<div className="flex flex-wrap items-center gap-3">
						<LegacyBarButton
							label="View docs"
							trailingIcon={<ExternalLink />}
							onClick={() => {
								router.push(getLocalizedPathname(locale, href));
							}}
						></LegacyBarButton>
					</div>
				</div>

				<div className="min-w-0">{preview}</div>
			</div>
		</motion.section>
	);
}

function ComponentsChooserHub({ locale }: { locale: SupportedLocale }) {
	const [isRegistryDialogOpen, setIsRegistryDialogOpen] = React.useState(false);
	const showcases: ShowcaseItem[] = [
		{
			alias: "roundbit",
			description: ROUNDBIT_DOCS_COPY.summary,
			href: getLocalizedPathname(locale, getRoundbitHubPath()),
			preview: <RoundbitPreview />,
			title: ROUNDBIT_DOCS_COPY.title,
		},
		{
			alias: "legacy-wheel-picker",
			description:
				"A faithful time picker recreation with deep inset gradients, crisp dividers, and the original mechanical snap.",
			href: getLegacyWheelPickerHubPath(locale),
			preview: <WheelPickerPreview />,
			title: "Legacy Wheel Picker",
		},
		{
			alias: "legacy-alert-dialog",
			description: LEGACY_ALERT_DIALOG_DOCS_COPY.summary,
			href: getLocalizedPathname(locale, getLegacyAlertDialogHubPath()),
			preview: <AlertDialogPreview />,
			title: LEGACY_ALERT_DIALOG_DOCS_COPY.title,
		},
		{
			alias: "legacy-bar-button",
			description: LEGACY_BAR_BUTTON_DOCS_COPY.summary,
			href: getLocalizedPathname(locale, getLegacyBarButtonHubPath()),
			preview: <BarButtonPreview />,
			title: LEGACY_BAR_BUTTON_DOCS_COPY.title,
		},
		{
			alias: "legacy-clock",
			description: LEGACY_CLOCK_DOCS_COPY.summary,
			href: getLocalizedPathname(locale, getLegacyClockHubPath()),
			preview: <ClockPreview />,
			title: LEGACY_CLOCK_DOCS_COPY.title,
		},
		{
			alias: "legacy-notification",
			description: LEGACY_NOTIFICATION_DOCS_COPY.summary,
			href: getLocalizedPathname(locale, getLegacyNotificationHubPath()),
			preview: <NotificationPreview />,
			title: LEGACY_NOTIFICATION_DOCS_COPY.title,
		},
		{
			alias: "legacy-switch",
			description: LEGACY_SWITCH_DOCS_COPY.summary,
			href: getLocalizedPathname(locale, getLegacySwitchHubPath()),
			preview: <SwitchPreview />,
			title: LEGACY_SWITCH_DOCS_COPY.title,
		},
		{
			alias: "legacy-slider",
			description: LEGACY_SLIDER_DOCS_COPY.summary,
			href: getLocalizedPathname(locale, getLegacySliderHubPath()),
			preview: <SliderPreview />,
			title: LEGACY_SLIDER_DOCS_COPY.title,
		},
		{
			alias: "legacy-code-block-command",
			description: LEGACY_CODE_BLOCK_COMMAND_DOCS_COPY.summary,
			href: getLocalizedPathname(locale, getLegacyCodeBlockCommandHubPath()),
			preview: <CodeBlockPreview />,
			title: LEGACY_CODE_BLOCK_COMMAND_DOCS_COPY.title,
		},
	];

	return (
		<main className="relative -mb-24 min-h-[calc(100vh+6rem)] overflow-hidden bg-[#0d1117] pb-24 text-white selection:bg-white/14">
			<div className="legacy-components-doc-backdrop pointer-events-none absolute inset-0" />
			<div className="legacy-components-doc-overlay pointer-events-none absolute inset-0 opacity-90" />
			<div className="legacy-components-backdrop-vignette pointer-events-none absolute inset-0 opacity-90" />

			<div
				className={cn(
					LEGACY_COMPONENT_PAGE_SHELL_CLASSNAME,
					"relative z-[1] max-w-5xl gap-0 px-6 py-6 md:px-10 md:py-8",
				)}
			>
				<HubHeader
					items={showcases}
					onAddRegistry={() => {
						setIsRegistryDialogOpen(true);
					}}
				/>

				<div>
					{showcases.map((showcase, index) => (
						<ComponentSection
							{...showcase}
							isLast={index === showcases.length - 1}
							key={showcase.alias}
						/>
					))}
				</div>
			</div>

			<LegacyRegistryAddDialog
				onOpenChange={setIsRegistryDialogOpen}
				open={isRegistryDialogOpen}
			/>
		</main>
	);
}

export function ComponentsHub({ locale }: { locale: SupportedLocale }) {
	return (
		<LegacyUiLocaleProvider locale={locale}>
			<ComponentsChooserHub locale={locale} />
		</LegacyUiLocaleProvider>
	);
}
