"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import {
	PixelCheckIcon,
	PixelCopyIcon,
	PixelMenuIcon,
	PixelPlusIcon,
	PixelXIcon,
} from "~/components/roundbitcn-icons";
import { Slider } from "~/components/ui/slider";
import { cn } from "~/lib/utils";

const steps = [1, 2, 3, 4, 5, 6, 7, 8] as const;
const packageManagers = ["pnpm", "npm", "yarn", "bun"] as const;
const styles = ["nova", "vega", "maia", "lyra"] as const;
const colors = ["neutral", "stone", "zinc", "mauve", "olive", "mist"] as const;
const fonts = [
	"sans",
	"geist",
	"inter",
	"noto-sans",
	"nunito-sans",
	"figtree",
	"roboto",
	"raleway",
	"dm-sans",
	"public-sans",
	"outfit",
	"oxanium",
	"jetbrains-mono",
	"pixel",
] as const;
const iconLibraries = [
	"pixel",
	"pixelarticons",
	"lucide",
	"tabler",
	"hugeicons",
	"phosphor",
	"remix",
] as const;
const radii = ["none", "sm", "md", "lg", "xl"] as const;
const menuColors = ["dark", "solid", "muted"] as const;
const menuAccents = ["subtle", "bold"] as const;
const templates = ["next", "vite", "astro"] as const;

type RoundbitStep = (typeof steps)[number];
type PackageManager = (typeof packageManagers)[number];
type StyleName = (typeof styles)[number];
type ColorName = (typeof colors)[number];
type FontName = (typeof fonts)[number];
type IconLibrary = (typeof iconLibraries)[number];
type RadiusName = (typeof radii)[number];
type MenuColor = (typeof menuColors)[number];
type MenuAccent = (typeof menuAccents)[number];
type TemplateName = (typeof templates)[number];

type CreateState = {
	baseColor: ColorName;
	chartColor: ColorName;
	font: FontName;
	iconLibrary: IconLibrary;
	menuAccent: MenuAccent;
	menuColor: MenuColor;
	packageManager: PackageManager;
	radius: RadiusName;
	step: RoundbitStep;
	style: StyleName;
	template: TemplateName;
	theme: ColorName;
};

type CreateCssProperties = React.CSSProperties & {
	"--create-accent": string;
	"--create-accent-soft": string;
	"--create-canvas": string;
	"--create-card": string;
	"--create-card-strong": string;
	"--create-border": string;
	"--create-control": string;
	"--create-font-family": string;
	"--create-muted": string;
	"--create-primary": string;
	"--create-primary-contrast": string;
	"--create-row": string;
	"--create-sidebar": string;
};

type SliderCssProperties = React.CSSProperties & {
	"--roundbit-slider-fill": string;
};

const defaults: CreateState = {
	baseColor: "neutral",
	chartColor: "neutral",
	font: "inter",
	iconLibrary: "pixel",
	menuAccent: "subtle",
	menuColor: "dark",
	packageManager: "bun",
	radius: "lg",
	step: 2,
	style: "nova",
	template: "next",
	theme: "neutral",
};

const labels = {
	baseColor: {
		mauve: "Mauve",
		mist: "Mist",
		neutral: "Neutral",
		olive: "Olive",
		stone: "Stone",
		zinc: "Zinc",
	},
	chartColor: {
		mauve: "Mauve",
		mist: "Mist",
		neutral: "Neutral",
		olive: "Olive",
		stone: "Stone",
		zinc: "Zinc",
	},
	font: {
		"dm-sans": "DM Sans",
		figtree: "Figtree",
		geist: "Geist",
		inter: "Inter",
		"jetbrains-mono": "JetBrains Mono",
		"noto-sans": "Noto Sans",
		"nunito-sans": "Nunito Sans",
		outfit: "Outfit",
		oxanium: "Oxanium",
		pixel: "Pixel",
		"public-sans": "Public Sans",
		raleway: "Raleway",
		roboto: "Roboto",
		sans: "Sans",
	},
	iconLibrary: {
		hugeicons: "Hugeicons",
		lucide: "Lucide",
		phosphor: "Phosphor",
		pixel: "Pixel",
		pixelarticons: "Pixelarticons",
		remix: "Remix",
		tabler: "Tabler",
	},
	menuAccent: {
		bold: "Bold",
		subtle: "Subtle",
	},
	menuColor: {
		dark: "Dark",
		muted: "Muted",
		solid: "Solid",
	},
	radius: {
		lg: "Large",
		md: "Medium",
		none: "None",
		sm: "Small",
		xl: "Extra Large",
	},
	style: {
		lyra: "Lyra",
		maia: "Maia",
		nova: "Nova",
		vega: "Vega",
	},
	template: {
		astro: "Astro",
		next: "Next.js",
		vite: "Vite",
	},
	theme: {
		mauve: "Mauve",
		mist: "Mist",
		neutral: "Neutral",
		olive: "Olive",
		stone: "Stone",
		zinc: "Zinc",
	},
} as const;

const colorVars = {
	mauve: {
		accent: "#d8b4fe",
		soft: "rgba(216, 180, 254, 0.18)",
	},
	mist: {
		accent: "#bae6fd",
		soft: "rgba(186, 230, 253, 0.16)",
	},
	neutral: {
		accent: "#e5e5e5",
		soft: "rgba(229, 229, 229, 0.12)",
	},
	olive: {
		accent: "#bef264",
		soft: "rgba(190, 242, 100, 0.14)",
	},
	stone: {
		accent: "#d6d3d1",
		soft: "rgba(214, 211, 209, 0.13)",
	},
	zinc: {
		accent: "#d4d4d8",
		soft: "rgba(212, 212, 216, 0.13)",
	},
} as const;

const swatchClassNames = {
	mauve: "bg-purple-300",
	mist: "bg-sky-200",
	neutral: "bg-neutral-300",
	olive: "bg-lime-300",
	stone: "bg-stone-300",
	zinc: "bg-zinc-300",
} as const;

function parseLiteral<T extends readonly string[]>(
	value: string | null,
	options: T,
	fallback: T[number],
): T[number] {
	return value && options.includes(value) ? value : fallback;
}

function parseStep(value: string | null): RoundbitStep {
	const parsed = Number(value);
	return steps.includes(parsed as RoundbitStep)
		? (parsed as RoundbitStep)
		: defaults.step;
}

function getCreateState(searchParams: URLSearchParams): CreateState {
	return {
		baseColor: parseLiteral(
			searchParams.get("base"),
			colors,
			defaults.baseColor,
		),
		chartColor: parseLiteral(
			searchParams.get("chart"),
			colors,
			defaults.chartColor,
		),
		font: parseLiteral(searchParams.get("font"), fonts, defaults.font),
		heading: parseLiteral(searchParams.get("heading"), fonts, defaults.heading),
		iconLibrary: parseLiteral(
			searchParams.get("icons"),
			iconLibraries,
			defaults.iconLibrary,
		),
		menuAccent: parseLiteral(
			searchParams.get("menuAccent"),
			menuAccents,
			defaults.menuAccent,
		),
		menuColor: parseLiteral(
			searchParams.get("menu"),
			menuColors,
			defaults.menuColor,
		),
		packageManager: parseLiteral(
			searchParams.get("pm"),
			packageManagers,
			defaults.packageManager,
		),
		radius: parseLiteral(searchParams.get("radius"), radii, defaults.radius),
		step: parseStep(searchParams.get("step")),
		style: parseLiteral(searchParams.get("style"), styles, defaults.style),
		template: parseLiteral(
			searchParams.get("template"),
			templates,
			defaults.template,
		),
		theme: parseLiteral(searchParams.get("theme"), colors, defaults.theme),
	};
}

function useCreateState() {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const urlState = React.useMemo(
		() => getCreateState(searchParams),
		[searchParams],
	);
	const [state, setLocalState] = React.useState(urlState);
	const [syncedUrlState, setSyncedUrlState] = React.useState(urlState);

	// Re-apply the URL state when it changes (adjust during render).
	if (urlState !== syncedUrlState) {
		setSyncedUrlState(urlState);
		setLocalState(urlState);
	}

	const setState = React.useCallback(
		(updates: Partial<CreateState>) => {
			setLocalState((current) => ({ ...current, ...updates }));
			const next = new URLSearchParams(searchParams);
			for (const [key, value] of Object.entries(updates)) {
				const param =
					key === "baseColor"
						? "base"
						: key === "chartColor"
							? "chart"
							: key === "iconLibrary"
								? "icons"
								: key === "menuColor"
									? "menu"
									: key === "packageManager"
										? "pm"
										: key;
				next.set(param, String(value));
			}
			const query = next.toString();
			router.replace(query ? `${pathname}?${query}` : pathname, {
				scroll: false,
			});
		},
		[pathname, router, searchParams],
	);

	return [state, setState] as const;
}

function getCommandPrefix(packageManager: PackageManager) {
	switch (packageManager) {
		case "bun":
			return "bunx --bun";
		case "npm":
			return "npx";
		case "yarn":
			return "yarn dlx";
		default:
			return "pnpm dlx";
	}
}

function getInstallCommand(state: CreateState) {
	const prefix = getCommandPrefix(state.packageManager);
	return state.step === defaults.step
		? `${prefix} shadcn@latest add @sabraman/roundbitcn`
		: `${prefix} @sabraman/roundbitcn add --step ${state.step}`;
}

function getCreateCommand(state: CreateState) {
	const prefix = getCommandPrefix(state.packageManager);
	return [
		`${prefix} shadcn@latest init`,
		`${prefix} @sabraman/roundbitcn add --step ${state.step}`,
	].join("\n");
}

function getPresetCode(state: CreateState) {
	return [
		`style=${state.style}`,
		`base=${state.baseColor}`,
		`theme=${state.theme}`,
		`chart=${state.chartColor}`,
		`radius=${state.radius}`,
		`step=${state.step}`,
	].join(" ");
}

function getFontFamily(font: FontName) {
	switch (font) {
		case "display":
			return '"Heading Now Variable", Arial, Helvetica, sans-serif';
		case "mono":
			return '"JetBrains Mono", monospace';
		case "system":
			return "Arial, Helvetica, sans-serif";
		default:
			return "var(--font-geist-pixel-square), JetBrains Mono, monospace";
	}
}

function getRadiusClassName(radius: RadiusName) {
	switch (radius) {
		case "none":
			return "roundbit-none";
		case "sm":
			return "roundbit-sm";
		case "md":
			return "roundbit-md";
		case "xl":
			return "roundbit-xl";
		default:
			return "roundbit-lg";
	}
}

function getStyleClassName(style: StyleName) {
	switch (style) {
		case "vega":
			return "contrast-125";
		case "maia":
			return "saturate-150";
		case "lyra":
			return "brightness-110";
		default:
			return "";
	}
}

function getThemeVars(state: CreateState): CreateCssProperties {
	const base = colorVars[state.baseColor];
	const theme = colorVars[state.theme];
	return {
		"--create-accent": base.accent,
		"--create-accent-soft": base.soft,
		"--create-canvas": `linear-gradient(135deg, ${theme.soft}, rgba(0, 0, 0, 0) 38%), #030303`,
		"--create-card": `linear-gradient(180deg, ${theme.soft}, rgba(24, 24, 27, 0.82))`,
		"--create-card-strong": `linear-gradient(180deg, ${base.soft}, rgba(38, 38, 38, 0.92))`,
		"--create-font-family": getFontFamily(state.font),
		"--create-heading-font-family": getFontFamily(state.heading),
	};
}

async function copyToClipboard(value: string) {
	await navigator.clipboard.writeText(value);
}

export function RoundbitcnCreatePage() {
	const [state, setState] = useCreateState();
	const [dialogOpen, setDialogOpen] = React.useState(false);

	React.useEffect(() => {
		document.documentElement.style.setProperty(
			"--roundbit-step-default",
			`${state.step}px`,
		);
		window.dispatchEvent(new Event("roundbit:refresh"));
	}, [state.step]);

	return (
		<main
			className="dark flex min-h-screen flex-col bg-black text-neutral-100 [font-family:var(--create-font-family)] md:h-screen md:overflow-hidden"
			style={getThemeVars(state)}
		>
			<div className="flex min-h-0 flex-1 flex-col gap-4 p-4 md:flex-row">
				<Sidebar
					onCreate={() => setDialogOpen(true)}
					setState={setState}
					state={state}
				/>
				<PreviewCanvas state={state} />
			</div>
			{dialogOpen ? (
				<CreateDialog
					onClose={() => setDialogOpen(false)}
					setState={setState}
					state={state}
				/>
			) : null}
		</main>
	);
}

function Sidebar({
	onCreate,
	setState,
	state,
}: {
	onCreate: () => void;
	setState: (updates: Partial<CreateState>) => void;
	state: CreateState;
}) {
	const shuffle = React.useCallback(() => {
		const pick = <T extends readonly unknown[]>(items: T) =>
			items[Math.floor(Math.random() * items.length)] as T[number];
		setState({
			baseColor: pick(colors),
			chartColor: pick(colors),
			font: pick(fonts),
			heading: pick(fonts),
			iconLibrary: pick(iconLibraries),
			menuAccent: pick(menuAccents),
			menuColor: pick(menuColors),
			radius: pick(radii),
			step: pick(steps),
			style: pick(styles),
			template: pick(templates),
			theme: pick(colors),
		});
	}, [setState]);

	return (
		<aside className="roundbit-frame roundbit-xl roundbit-step roundbit-border roundbit-border-solid roundbit-border-neutral-800 flex max-h-[38rem] min-h-0 w-full shrink-0 flex-col bg-neutral-950/95 md:h-full md:max-h-none md:w-64">
			<div className="roundbit-border-b-1 roundbit-border-solid roundbit-border-neutral-800 flex items-center justify-between p-3">
				<p className="font-semibold text-sm">Menu</p>
				<PixelMenuIcon className="size-5 text-neutral-400" />
			</div>
			<div className="no-scrollbar min-h-0 flex-1 overflow-x-auto overflow-y-hidden p-3 md:overflow-y-auto md:overflow-x-hidden">
				<div className="flex w-max gap-2.5 md:w-auto md:flex-col">
					<PickerRow
						label="Style"
						meta="□"
						onClick={() => setState({ style: nextOption(styles, state.style) })}
						value={labels.style[state.style]}
					/>
					<SidebarSeparator />
					<ColorRow
						label="Base Color"
						onClick={() =>
							setState({ baseColor: nextOption(colors, state.baseColor) })
						}
						value={state.baseColor}
					/>
					<ColorRow
						label="Theme"
						onClick={() => setState({ theme: nextOption(colors, state.theme) })}
						value={state.theme}
					/>
					<ColorRow
						label="Chart Color"
						onClick={() =>
							setState({ chartColor: nextOption(colors, state.chartColor) })
						}
						value={state.chartColor}
					/>
					<SidebarSeparator />
					<PickerRow
						label="Heading"
						meta="Aa"
						onClick={() =>
							setState({ heading: nextOption(fonts, state.heading) })
						}
						value={labels.heading[state.heading]}
					/>
					<PickerRow
						label="Font"
						meta="Aa"
						onClick={() => setState({ font: nextOption(fonts, state.font) })}
						value={labels.font[state.font]}
					/>
					<SidebarSeparator />
					<PickerRow
						label="Icon Library"
						meta={state.iconLibrary === "pixel" ? "PX" : "•"}
						onClick={() =>
							setState({
								iconLibrary: nextOption(iconLibraries, state.iconLibrary),
							})
						}
						value={labels.iconLibrary[state.iconLibrary]}
					/>
					<PickerRow
						label="Radius"
						meta="⌒"
						onClick={() =>
							setState({ radius: nextOption(radii, state.radius) })
						}
						value={labels.radius[state.radius]}
					/>
					<StepControl setState={setState} state={state} />
					<SidebarSeparator />
					<PickerRow
						label="Menu"
						meta="☰"
						onClick={() =>
							setState({ menuColor: nextOption(menuColors, state.menuColor) })
						}
						value={labels.menuColor[state.menuColor]}
					/>
					<PickerRow
						label="Menu Accent"
						meta="◒"
						onClick={() =>
							setState({
								menuAccent: nextOption(menuAccents, state.menuAccent),
							})
						}
						value={labels.menuAccent[state.menuAccent]}
					/>
					<SidebarSeparator />
					<PickerRow
						label="Template"
						meta="→"
						onClick={() =>
							setState({ template: nextOption(templates, state.template) })
						}
						value={labels.template[state.template]}
					/>
					<PickerRow
						label="Package"
						meta="$"
						onClick={() =>
							setState({
								packageManager: nextOption(
									packageManagers,
									state.packageManager,
								),
							})
						}
						value={state.packageManager}
					/>
				</div>
			</div>
			<div className="roundbit-border-neutral-800 roundbit-border-solid roundbit-border-t-1 grid gap-2 p-3">
				<Button
					onClick={() => copyToClipboard(getPresetCode(state))}
					variant="ghost"
				>
					Copy preset
				</Button>
				<Button onClick={shuffle} variant="ghost">
					Shuffle
				</Button>
				<Button onClick={onCreate}>Create Project</Button>
			</div>
		</aside>
	);
}

function ControlGroup({
	children,
	title,
}: {
	children: React.ReactNode;
	title: string;
}) {
	return (
		<section className="roundbit-frame roundbit-lg roundbit-step roundbit-border roundbit-border-solid roundbit-border-neutral-800 grid w-72 shrink-0 gap-3 bg-neutral-950/70 p-3 md:w-auto">
			<h2 className="font-semibold text-neutral-300 text-xs uppercase tracking-widest">
				{title}
			</h2>
			{children}
		</section>
	);
}

function nextOption<T extends string>(options: readonly T[], value: T) {
	const index = options.indexOf(value);
	return options[(index + 1) % options.length] ?? options[0];
}

function PickerRow({
	label,
	meta,
	onClick,
	value,
}: {
	label: string;
	meta: string;
	onClick: () => void;
	value: string;
}) {
	return (
		<button
			className="roundbit-frame roundbit-lg roundbit-step roundbit-border roundbit-border-solid roundbit-border-neutral-800 flex w-40 shrink-0 items-center justify-between gap-3 bg-neutral-950 px-3 py-2 text-left outline-none hover:bg-neutral-900 md:w-full"
			onClick={onClick}
			type="button"
		>
			<span className="min-w-0">
				<span className="block text-neutral-500 text-xs">{label}</span>
				<span className="block truncate font-medium text-neutral-100 text-sm">
					{value}
				</span>
			</span>
			<span className="shrink-0 text-neutral-300 text-sm">{meta}</span>
		</button>
	);
}

function ColorRow({
	label,
	onClick,
	value,
}: {
	label: string;
	onClick: () => void;
	value: ColorName;
}) {
	return (
		<button
			className="roundbit-frame roundbit-lg roundbit-step roundbit-border roundbit-border-solid roundbit-border-neutral-800 flex w-40 shrink-0 items-center justify-between gap-3 bg-neutral-950 px-3 py-2 text-left outline-none hover:bg-neutral-900 md:w-full"
			onClick={onClick}
			type="button"
		>
			<span className="min-w-0">
				<span className="block text-neutral-500 text-xs">{label}</span>
				<span className="block truncate font-medium text-neutral-100 text-sm">
					{labels.baseColor[value]}
				</span>
			</span>
			<span
				className={cn(
					"roundbit-frame roundbit-full roundbit-step size-5 shrink-0",
					swatchClassNames[value],
				)}
			/>
		</button>
	);
}

function SidebarSeparator() {
	return (
		<div className="roundbit-border-neutral-800 roundbit-border-solid roundbit-border-t-1 hidden md:block" />
	);
}

function OptionGrid<T extends string>({
	columns,
	onChange,
	options,
	value,
	valueLabels,
}: {
	columns: string;
	onChange: (value: T) => void;
	options: readonly T[];
	value: T;
	valueLabels?: Record<T, string>;
}) {
	return (
		<div className={cn("grid gap-2", columns)}>
			{options.map((option) => (
				<OptionButton
					active={option === value}
					key={option}
					onClick={() => onChange(option)}
				>
					{valueLabels?.[option] ?? option}
				</OptionButton>
			))}
		</div>
	);
}

function OptionButton({
	active,
	children,
	onClick,
}: {
	active: boolean;
	children: React.ReactNode;
	onClick: () => void;
}) {
	return (
		<button
			className={cn(
				"roundbit-frame roundbit-md roundbit-step min-h-9 px-2 py-1 font-medium text-xs outline-none",
				active
					? "roundbit-border roundbit-border-solid roundbit-border-neutral-100 bg-neutral-100 text-neutral-950"
					: "roundbit-border roundbit-border-solid roundbit-border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800",
			)}
			onClick={onClick}
			type="button"
		>
			{children}
		</button>
	);
}

function StepControl({
	setState,
	state,
}: {
	setState: (updates: Partial<CreateState>) => void;
	state: CreateState;
}) {
	return (
		<div className="grid gap-2">
			<div className="flex items-center justify-between">
				<p className="text-neutral-500 text-xs">Roundbit step</p>
				<p className="font-medium text-neutral-100 text-sm">{state.step}px</p>
			</div>
			<Slider
				className="h-7"
				max={8}
				min={1}
				onValueChange={([value]) => {
					if (value) {
						setState({ step: value as RoundbitStep });
					}
				}}
				step={1}
				value={[state.step]}
			/>
			<div className="grid grid-cols-8 gap-1">
				{steps.map((step) => (
					<button
						className={cn(
							"roundbit-frame roundbit-sm roundbit-step h-7 text-xs",
							step === state.step
								? "bg-neutral-100 text-neutral-950"
								: "bg-neutral-900 text-neutral-500",
						)}
						key={step}
						onClick={() => setState({ step })}
						type="button"
					>
						{step}
					</button>
				))}
			</div>
		</div>
	);
}

function PreviewCanvas({ state }: { state: CreateState }) {
	const scrollRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		scrollRef.current?.scrollTo({ left: 0 });
	}, []);

	return (
		<section
			className={cn(
				"roundbit-frame roundbit-xl roundbit-step roundbit-border roundbit-border-solid roundbit-border-neutral-800 relative min-h-[42rem] flex-1 overflow-hidden bg-[var(--create-canvas)]",
				getStyleClassName(state.style),
			)}
		>
			<div
				className="flex h-full min-h-0 flex-col overflow-y-auto overflow-x-hidden bg-neutral-950/40 p-4 md:overflow-y-hidden md:overflow-x-scroll md:p-8"
				ref={scrollRef}
			>
				<div className="grid w-full grid-cols-1 items-start gap-5 md:w-[3000px] md:grid-cols-7">
					<PreviewColumn>
						<StyleOverviewCard state={state} />
						<TypographyCard state={state} />
						<ContributionCard state={state} />
						<ReleaseCard state={state} />
					</PreviewColumn>
					<PreviewColumn>
						<IconGridCard state={state} />
						<PayoutCard state={state} />
						<ClaimableCard state={state} />
						<PreferencesCard state={state} />
					</PreviewColumn>
					<PreviewColumn wide>
						<SavingsCard state={state} />
						<TransactionsCard state={state} />
						<div className="grid gap-5 md:grid-cols-2">
							<div className="grid gap-5">
								<NavigationCard state={state} />
								<FaqCard state={state} />
							</div>
							<div className="grid gap-5">
								<PaymentsCard state={state} />
								<FrontDoorCard state={state} />
							</div>
						</div>
						<ReleaseCatalogCard state={state} />
					</PreviewColumn>
					<PreviewColumn>
						<AccountCard state={state} />
						<TransferCard state={state} />
						<LoadingCard state={state} />
					</PreviewColumn>
					<PreviewColumn>
						<ReceivingMethodCard state={state} />
						<PowerUsageCard state={state} />
						<EmptyBankCard state={state} />
						<UpcomingPaymentsCard state={state} />
					</PreviewColumn>
					<PreviewColumn>
						<StockCard state={state} />
						<ExploreCard state={state} />
						<MilestoneCard state={state} />
						<SocialLinksCard state={state} />
					</PreviewColumn>
					<PreviewColumn>
						<AnomalyCard state={state} />
						<WaveformCard state={state} />
						<VisitorsCard state={state} />
						<NavigationCard state={state} />
						<InstallCard state={state} />
					</PreviewColumn>
				</div>
			</div>
			<div className="pointer-events-none absolute inset-y-0 right-0 hidden w-32 bg-gradient-to-l from-black via-black/80 to-transparent md:block" />
			<div className="roundbit-frame roundbit-full roundbit-step roundbit-border roundbit-border-solid roundbit-border-neutral-700 pointer-events-none absolute right-5 bottom-5 hidden bg-black/80 px-3 py-1 text-neutral-300 text-xs md:block">
				Scroll horizontally
			</div>
		</section>
	);
}

function PreviewColumn({
	children,
	wide,
}: {
	children: React.ReactNode;
	wide?: boolean;
}) {
	return (
		<div
			className={cn("grid w-full content-start gap-5", wide && "md:col-span-2")}
		>
			{children}
		</div>
	);
}

function Card({
	children,
	className,
	state,
	strong,
}: {
	children: React.ReactNode;
	className?: string;
	state: CreateState;
	strong?: boolean;
}) {
	return (
		<div
			className={cn(
				"roundbit-frame roundbit-step roundbit-border roundbit-border-solid roundbit-border-neutral-800 overflow-hidden bg-[var(--create-card)] text-neutral-100 shadow-2xl",
				getRadiusClassName(state.radius),
				strong && "bg-[var(--create-card-strong)]",
				className,
			)}
		>
			{children}
		</div>
	);
}

function CardHeader({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return <div className={cn("grid gap-1.5 p-5", className)}>{children}</div>;
}

function CardTitle({ children }: { children: React.ReactNode }) {
	return (
		<h3
			className="font-semibold text-xl"
			style={{ fontFamily: "var(--create-heading-font-family)" }}
		>
			{children}
		</h3>
	);
}

function CardDescription({ children }: { children: React.ReactNode }) {
	return <p className="text-neutral-400 text-sm">{children}</p>;
}

function ContributionCard({ state }: { state: CreateState }) {
	const bars = [56, 82, 67, 96, 58, 100];
	const chart = colorVars[state.chartColor];
	return (
		<Card state={state} strong>
			<CardHeader>
				<CardTitle>Contribution History</CardTitle>
				<CardDescription>Last 6 months of activity</CardDescription>
			</CardHeader>
			<div className="grid gap-5 p-5 pt-0">
				<div className="relative flex h-44 items-end gap-4">
					<svg
						aria-hidden="true"
						className="absolute inset-0 h-full w-full"
						preserveAspectRatio="none"
						viewBox="0 0 240 144"
					>
						<path
							d="M0 32H240M0 72H240M0 112H240"
							fill="none"
							stroke="rgba(255,255,255,0.08)"
							strokeWidth="1"
						/>
						<polyline
							fill="none"
							points="8,96 48,70 88,84 128,38 168,88 224,28"
							stroke={chart.accent}
							strokeWidth="4"
							vectorEffect="non-scaling-stroke"
						/>
					</svg>
					{bars.map((height, index) => (
						<div className="relative z-10 grid flex-1 gap-2" key={height}>
							<div
								className="roundbit-frame roundbit-sm roundbit-step"
								style={{
									background: chart.accent,
									height: `${height}%`,
								}}
							/>
							<span className="text-center text-neutral-500 text-xs">
								{["Dec", "Jan", "Feb", "Mar", "Apr", "May"][index]}
							</span>
						</div>
					))}
				</div>
				<div className="grid grid-cols-2 gap-3">
					<Metric state={state} title="Upcoming" value="May 25, 2026" />
					<Metric
						state={state}
						title="Plan"
						value={labels.style[state.style]}
					/>
				</div>
			</div>
			<CardFooter>
				<Button full>View Full Report</Button>
			</CardFooter>
		</Card>
	);
}

function Metric({
	state,
	title,
	value,
}: {
	state: CreateState;
	title: string;
	value: string;
}) {
	return (
		<div
			className={cn(
				"roundbit-frame roundbit-step bg-neutral-800/70 p-4",
				getRadiusClassName(state.radius),
			)}
		>
			<p className="text-neutral-500 text-xs uppercase tracking-widest">
				{title}
			</p>
			<p className="mt-2 font-semibold text-lg">{value}</p>
			<p className="text-neutral-400 text-sm">{state.step}px step</p>
		</div>
	);
}

function PayoutCard({ state }: { state: CreateState }) {
	return (
		<Card state={state}>
			<CardHeader>
				<div className="flex items-start justify-between gap-4">
					<div>
						<CardTitle>Payout Threshold</CardTitle>
						<CardDescription>Minimum balance before payout.</CardDescription>
					</div>
					<IconButton label="Close">
						<PixelXIcon className="size-4" />
					</IconButton>
				</div>
			</CardHeader>
			<div className="grid gap-5 p-5 pt-0">
				<Field label="Preferred Currency" value="USD - United States Dollar" />
				<div className="grid gap-3">
					<div className="flex items-end justify-between gap-3">
						<span className="font-medium text-sm">Minimum Amount</span>
						<span className="font-semibold text-3xl">${state.step}500.00</span>
					</div>
					<Slider
						className="h-7"
						max={80}
						min={10}
						style={
							{
								"--roundbit-slider-fill": colorVars[state.chartColor].accent,
							} as SliderCssProperties
						}
						value={[state.step * 10]}
					/>
					<div className="flex justify-between text-neutral-500 text-xs">
						<span>$50 MIN</span>
						<span>$10,000 MAX</span>
					</div>
				</div>
				<Field multiline label="Notes" value="Roundbit geometry is enabled." />
			</div>
			<CardFooter>
				<Button full>Save Threshold</Button>
			</CardFooter>
		</Card>
	);
}

function SavingsCard({ state }: { state: CreateState }) {
	return (
		<Card state={state}>
			<CardHeader>
				<div className="flex items-start justify-between gap-4">
					<div>
						<CardTitle>Savings Targets</CardTitle>
						<CardDescription>
							Active milestones for this preset.
						</CardDescription>
					</div>
					<Button size="sm" variant="ghost">
						New Goal
					</Button>
				</div>
			</CardHeader>
			<div className="grid gap-3 p-5 pt-0">
				<Target label="Retirement" progress={62 + state.step} state={state} />
				<Target label="Real Estate" progress={30 + state.step} state={state} />
			</div>
			<CardFooter muted>Chart color and step are reflected above.</CardFooter>
		</Card>
	);
}

function Target({
	label,
	progress,
	state,
}: {
	label: string;
	progress: number;
	state: CreateState;
}) {
	const chart = colorVars[state.chartColor];
	return (
		<div
			className={cn(
				"roundbit-frame roundbit-step bg-neutral-800/70 p-4",
				getRadiusClassName(state.radius),
			)}
		>
			<p className="text-neutral-500 text-xs uppercase tracking-widest">
				{label}
			</p>
			<p className="mt-3 font-semibold text-4xl">
				${label === "Retirement" ? "420,000" : "85,000"}
			</p>
			<div className="roundbit-frame roundbit-full roundbit-step mt-4 bg-neutral-700 p-1">
				<div
					className="h-2"
					style={{ background: chart.accent, width: `${progress}%` }}
				/>
			</div>
			<p className="mt-3 text-neutral-400 text-sm">{progress}% achieved</p>
		</div>
	);
}

function ReleaseCard({ state }: { state: CreateState }) {
	return (
		<Card className="grid min-h-72 place-items-center" state={state}>
			<div className="grid justify-items-center gap-4 p-8 text-center">
				<IconButton label="Add">
					{state.iconLibrary === "pixel" ? (
						<PixelPlusIcon className="size-5" />
					) : (
						<span className="text-lg">+</span>
					)}
				</IconButton>
				<div>
					<CardTitle>Distribute Track</CardTitle>
					<CardDescription>
						Upload a master and generate release controls.
					</CardDescription>
				</div>
				<Button>Create Release</Button>
			</div>
		</Card>
	);
}

function ClaimableCard({ state }: { state: CreateState }) {
	return (
		<Card state={state} strong>
			<CardHeader>
				<CardDescription>Claimable Balance</CardDescription>
				<h3
					className="font-semibold text-5xl"
					style={{ fontFamily: "var(--create-heading-font-family)" }}
				>
					$0.00
				</h3>
				<span className="roundbit-frame roundbit-full roundbit-step roundbit-border roundbit-border-solid roundbit-border-neutral-700 w-fit px-2 py-0.5 text-neutral-200 text-xs">
					Pending Setup
				</span>
			</CardHeader>
			<div className="grid gap-3 p-5 pt-0">
				<Metric state={state} title="Net Royalties" value="$0.00" />
				<Metric state={state} title="Ready" value="$0.00 USD" />
			</div>
			<CardFooter muted>Balances over $10.00 become eligible.</CardFooter>
		</Card>
	);
}

function NavigationCard({ state }: { state: CreateState }) {
	return (
		<Card className="grid gap-4 p-5" state={state}>
			<CardTitle>Navigation</CardTitle>
			<div className="flex flex-wrap gap-2">
				{["Home", "Work", "Components"].map((item, index) => (
					<button
						className={cn(
							"roundbit-frame roundbit-full roundbit-step px-4 py-2 font-medium text-sm outline-none",
							getMenuButtonClassName(state, index === 2),
						)}
						key={item}
						type="button"
					>
						{item}
					</button>
				))}
			</div>
			<div
				className={cn(
					"roundbit-frame roundbit-lg roundbit-step p-5",
					getMenuPanelClassName(state),
				)}
			>
				<p className="font-medium">Selected preset</p>
				<p className="mt-1 text-neutral-400 text-sm">
					{labels.style[state.style]} / {labels.theme[state.theme]} /{" "}
					{labels.menuAccent[state.menuAccent]}
				</p>
			</div>
		</Card>
	);
}

function TransactionsCard({ state }: { state: CreateState }) {
	const items = [
		["Blue Bottle Coffee", "Food & Drink", "Today, 10:24 AM"],
		["Whole Foods Market", "Groceries", "Yesterday"],
		["Stripe Payout", "Income", "Oct 12"],
		["Uber Technologies", "Transport", "Oct 11"],
		["Netflix Subscription", "Entertainment", "Oct 10"],
	];
	return (
		<Card className="min-h-full" state={state}>
			<CardHeader>
				<CardTitle>Recent Transactions</CardTitle>
				<CardDescription>Every row uses Roundbit dividers.</CardDescription>
			</CardHeader>
			<div>
				{items.map(([title, subtitle, date]) => (
					<div
						className="roundbit-border-neutral-800 roundbit-border-solid roundbit-border-t-1 flex items-center gap-4 px-5 py-4"
						key={title}
					>
						<div
							className={cn(
								"roundbit-frame roundbit-step grid size-11 place-items-center bg-neutral-800",
								getRadiusClassName(state.radius),
							)}
						>
							{state.iconLibrary === "pixel" ? (
								<PixelCheckIcon className="size-4" />
							) : (
								<span>•</span>
							)}
						</div>
						<div className="min-w-0 flex-1">
							<p className="truncate font-medium">{title}</p>
							<p className="text-neutral-400 text-sm">{subtitle}</p>
						</div>
						<p className="text-neutral-400 text-sm">{date}</p>
					</div>
				))}
			</div>
		</Card>
	);
}

function InstallCard({ state }: { state: CreateState }) {
	return (
		<Card state={state}>
			<CardHeader>
				<CardTitle>Roundbitcn Install</CardTitle>
				<CardDescription>
					Commands are generated from the sidebar state.
				</CardDescription>
			</CardHeader>
			<div className="grid gap-4 p-5 pt-0">
				<CodePanel code={getInstallCommand(state)} label="Install" />
				<CodePanel code={getCreateCommand(state)} label="Create project" />
				<CodePanel
					code={`:root {\n  --roundbit-step-default: ${state.step}px;\n}`}
					label="CSS"
				/>
			</div>
		</Card>
	);
}

function StyleOverviewCard({ state }: { state: CreateState }) {
	return (
		<Card state={state} strong>
			<CardHeader>
				<CardTitle>{labels.style[state.style]}</CardTitle>
				<CardDescription>
					{labels.baseColor[state.baseColor]} base, {labels.theme[state.theme]}{" "}
					theme.
				</CardDescription>
			</CardHeader>
			<div className="grid grid-cols-4 gap-2 p-5 pt-0">
				{colors.slice(0, 4).map((color) => (
					<div
						className={cn(
							"roundbit-frame roundbit-md roundbit-step h-16",
							swatchClassNames[color],
						)}
						key={color}
					/>
				))}
			</div>
		</Card>
	);
}

function TypographyCard({ state }: { state: CreateState }) {
	return (
		<Card state={state}>
			<CardHeader>
				<CardTitle>Typography</CardTitle>
				<CardDescription>
					{labels.heading[state.heading]} heading
				</CardDescription>
			</CardHeader>
			<div className="grid gap-3 p-5 pt-0">
				<p
					className="font-semibold text-4xl"
					style={{ fontFamily: "var(--create-heading-font-family)" }}
				>
					Aa 123
				</p>
				<p className="text-neutral-400 text-sm">
					{labels.font[state.font]} body text with {state.step}px pixel
					rounding.
				</p>
			</div>
		</Card>
	);
}

function IconGridCard({ state }: { state: CreateState }) {
	return (
		<Card state={state}>
			<CardHeader>
				<CardTitle>Icon Grid</CardTitle>
				<CardDescription>
					{labels.iconLibrary[state.iconLibrary]} icon set
				</CardDescription>
			</CardHeader>
			<div className="grid grid-cols-5 gap-3 p-5 pt-0">
				{Array.from({ length: 10 }, (_, index) => `icon-${index}`).map(
					(item, index) => (
						<div
							className={cn(
								"roundbit-frame roundbit-md roundbit-step grid size-12 place-items-center bg-neutral-800",
								getRadiusClassName(state.radius),
							)}
							key={item}
						>
							{state.iconLibrary === "pixel" ? (
								index % 2 === 0 ? (
									<PixelCheckIcon className="size-5" />
								) : (
									<PixelPlusIcon className="size-5" />
								)
							) : (
								<span>{index % 2 === 0 ? "•" : "+"}</span>
							)}
						</div>
					),
				)}
			</div>
		</Card>
	);
}

function PreferencesCard({ state }: { state: CreateState }) {
	return (
		<Card state={state}>
			<CardHeader>
				<CardTitle>Preferences</CardTitle>
				<CardDescription>Switches and segmented controls.</CardDescription>
			</CardHeader>
			<div className="grid gap-3 p-5 pt-0">
				{["Notifications", "Auto payout", "Pixel mode"].map((item, index) => (
					<div className="flex items-center justify-between gap-4" key={item}>
						<span className="text-sm">{item}</span>
						<div className="roundbit-frame roundbit-full roundbit-step roundbit-border roundbit-border-solid roundbit-border-neutral-700 flex h-8 w-14 items-center bg-neutral-800 p-1">
							<span
								className={cn(
									"roundbit-frame roundbit-full roundbit-step size-6 bg-neutral-100",
									index === 1 && "ml-auto",
								)}
							/>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
}

function FaqCard({ state }: { state: CreateState }) {
	return (
		<Card state={state}>
			<CardHeader>
				<CardTitle>FAQ</CardTitle>
			</CardHeader>
			<div className="grid p-5 pt-0">
				{["Install command", "Configured step", "Provider"].map((item) => (
					<div
						className="roundbit-border-neutral-800 roundbit-border-solid roundbit-border-t-1 flex items-center justify-between py-3"
						key={item}
					>
						<span className="text-sm">{item}</span>
						<span className="text-neutral-500">+</span>
					</div>
				))}
			</div>
		</Card>
	);
}

function PaymentsCard({ state }: { state: CreateState }) {
	return (
		<SmallMetricCard
			label="Payments"
			state={state}
			title="$2,840"
			value="4 pending"
		/>
	);
}

function FrontDoorCard({ state }: { state: CreateState }) {
	return (
		<SmallMetricCard
			label="Access"
			state={state}
			title="Front Door"
			value="Locked"
		/>
	);
}

function AccountCard({ state }: { state: CreateState }) {
	return (
		<SmallMetricCard
			label="Account"
			state={state}
			title="Verified"
			value="2FA enabled"
		/>
	);
}

function TransferCard({ state }: { state: CreateState }) {
	return (
		<SmallMetricCard
			label="Transfer"
			state={state}
			title="$12,400"
			value="Ready"
		/>
	);
}

function LoadingCard({ state }: { state: CreateState }) {
	return (
		<Card state={state}>
			<CardHeader>
				<CardTitle>Loading</CardTitle>
			</CardHeader>
			<div className="grid gap-3 p-5 pt-0">
				{[72, 100, 56, 88].map((width) => (
					<div
						className="roundbit-frame roundbit-md roundbit-step h-5 bg-neutral-800"
						key={width}
						style={{ width: `${width}%` }}
					/>
				))}
			</div>
		</Card>
	);
}

function ReceivingMethodCard({ state }: { state: CreateState }) {
	return (
		<SmallMetricCard
			label="Receiving"
			state={state}
			title="Bank ACH"
			value="Primary"
		/>
	);
}

function PowerUsageCard({ state }: { state: CreateState }) {
	return (
		<SmallMetricCard
			label="Power Usage"
			state={state}
			title="84%"
			value="Stable"
		/>
	);
}

function EmptyBankCard({ state }: { state: CreateState }) {
	return (
		<Card className="grid min-h-56 place-items-center" state={state}>
			<div className="grid justify-items-center gap-3 p-6 text-center">
				<IconButton label="Connect">
					<PixelPlusIcon className="size-5" />
				</IconButton>
				<CardTitle>Connect Bank</CardTitle>
				<CardDescription>No account connected.</CardDescription>
			</div>
		</Card>
	);
}

function UpcomingPaymentsCard({ state }: { state: CreateState }) {
	return (
		<SmallMetricCard
			label="Upcoming"
			state={state}
			title="May 25"
			value="$1,000 scheduled"
		/>
	);
}

function StockCard({ state }: { state: CreateState }) {
	return (
		<Card state={state}>
			<CardHeader>
				<CardTitle>Stock Performance</CardTitle>
			</CardHeader>
			<div className="flex h-36 items-end gap-2 p-5 pt-0">
				{[20, 50, 35, 75, 42, 92, 64].map((height) => (
					<div
						className="roundbit-frame roundbit-sm roundbit-step flex-1"
						key={height}
						style={{
							background: colorVars[state.chartColor].accent,
							height: `${height}%`,
						}}
					/>
				))}
			</div>
		</Card>
	);
}

function ExploreCard({ state }: { state: CreateState }) {
	return (
		<SmallMetricCard
			label="Explore"
			state={state}
			title="Catalog"
			value="18 components"
		/>
	);
}

function MilestoneCard({ state }: { state: CreateState }) {
	return (
		<SmallMetricCard
			label="Milestone"
			state={state}
			title="New Goal"
			value={`${state.step}px step`}
		/>
	);
}

function SocialLinksCard({ state }: { state: CreateState }) {
	return (
		<Card className="p-5" state={state}>
			<div className="flex flex-wrap gap-2">
				{["GitHub", "X", "Discord"].map((item) => (
					<Button key={item} size="sm" variant="ghost">
						{item}
					</Button>
				))}
			</div>
		</Card>
	);
}

function AnomalyCard({ state }: { state: CreateState }) {
	return (
		<SmallMetricCard
			label="Alert"
			state={state}
			title="Anomaly"
			value="Threshold crossed"
		/>
	);
}

function WaveformCard({ state }: { state: CreateState }) {
	return (
		<Card state={state}>
			<CardHeader>
				<CardTitle>Live Waveform</CardTitle>
			</CardHeader>
			<div className="flex h-28 items-center gap-1 p-5 pt-0">
				{Array.from({ length: 32 }, (_, index) => `wave-${index}`).map(
					(item, index) => (
						<div
							className="roundbit-frame roundbit-sm roundbit-step w-full"
							key={item}
							style={{
								background: colorVars[state.chartColor].accent,
								height: `${20 + ((index * 17) % 70)}%`,
							}}
						/>
					),
				)}
			</div>
		</Card>
	);
}

function VisitorsCard({ state }: { state: CreateState }) {
	return (
		<SmallMetricCard
			label="Visitors"
			state={state}
			title="24,802"
			value="+12.4%"
		/>
	);
}

function ReleaseCatalogCard({ state }: { state: CreateState }) {
	return (
		<Card state={state}>
			<CardHeader>
				<CardTitle>Release Catalog</CardTitle>
				<CardDescription>Wide table-like card.</CardDescription>
			</CardHeader>
			<div className="grid p-5 pt-0">
				{["Roundbit core", "Roundbitcn provider", "Pixel icons"].map((item) => (
					<div
						className="roundbit-border-neutral-800 roundbit-border-solid roundbit-border-t-1 grid grid-cols-[1fr_auto] gap-4 py-3"
						key={item}
					>
						<span>{item}</span>
						<span className="text-neutral-400">Ready</span>
					</div>
				))}
			</div>
		</Card>
	);
}

function SmallMetricCard({
	label,
	state,
	title,
	value,
}: {
	label: string;
	state: CreateState;
	title: string;
	value: string;
}) {
	return (
		<Card state={state}>
			<CardHeader>
				<CardDescription>{label}</CardDescription>
				<CardTitle>{title}</CardTitle>
				<p className="text-neutral-400 text-sm">{value}</p>
			</CardHeader>
		</Card>
	);
}

function Field({
	label,
	multiline,
	value,
}: {
	label: string;
	multiline?: boolean;
	value: string;
}) {
	return (
		<div className="grid gap-2">
			<span className="font-medium text-sm">{label}</span>
			<span
				className={cn(
					"roundbit-frame roundbit-md roundbit-step roundbit-border roundbit-border-solid roundbit-border-neutral-700 block bg-neutral-800 px-3 py-2 text-neutral-300 text-sm",
					multiline && "min-h-24",
				)}
			>
				{value}
			</span>
		</div>
	);
}

function CardFooter({
	children,
	muted,
}: {
	children: React.ReactNode;
	muted?: boolean;
}) {
	return (
		<div
			className={cn(
				"roundbit-border-neutral-800 roundbit-border-solid roundbit-border-t-1 p-5",
				muted && "text-neutral-400 text-sm",
			)}
		>
			{children}
		</div>
	);
}

function Button({
	children,
	full,
	onClick,
	size = "default",
	variant = "default",
}: {
	children: React.ReactNode;
	full?: boolean;
	onClick?: () => void;
	size?: "default" | "sm";
	variant?: "default" | "ghost";
}) {
	return (
		<button
			className={cn(
				"roundbit-frame roundbit-md roundbit-step inline-flex items-center justify-center font-medium text-sm outline-none transition-colors",
				size === "sm" ? "h-8 px-3" : "h-10 px-4",
				full && "w-full",
				variant === "ghost"
					? "roundbit-border roundbit-border-solid roundbit-border-neutral-700 bg-neutral-900 text-neutral-100 hover:bg-neutral-800"
					: "bg-neutral-100 text-neutral-950 hover:bg-neutral-200",
			)}
			onClick={onClick}
			type="button"
		>
			{children}
		</button>
	);
}

function IconButton({
	children,
	label,
	onClick,
}: {
	children: React.ReactNode;
	label: string;
	onClick?: () => void;
}) {
	return (
		<button
			aria-label={label}
			className="roundbit-frame roundbit-md roundbit-step grid size-9 place-items-center bg-neutral-800 text-neutral-100 outline-none hover:bg-neutral-700"
			onClick={onClick}
			type="button"
		>
			{children}
		</button>
	);
}

function CodePanel({ code, label }: { code: string; label: string }) {
	return (
		<div className="roundbit-frame roundbit-lg roundbit-step roundbit-border roundbit-border-solid roundbit-border-neutral-800 overflow-hidden bg-neutral-950">
			<div className="roundbit-border-b-1 roundbit-border-neutral-800 roundbit-border-solid flex items-center justify-between px-4 py-2">
				<span className="text-neutral-400 text-sm">{label}</span>
				<button
					aria-label={`Copy ${label}`}
					className="roundbit-frame roundbit-sm roundbit-step grid size-8 place-items-center text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
					onClick={() => copyToClipboard(code)}
					type="button"
				>
					<PixelCopyIcon className="size-4" />
				</button>
			</div>
			<pre className="overflow-x-auto p-4 text-neutral-300 text-sm leading-7">
				<code>{code}</code>
			</pre>
		</div>
	);
}

function CreateDialog({
	onClose,
	setState,
	state,
}: {
	onClose: () => void;
	setState: (updates: Partial<CreateState>) => void;
	state: CreateState;
}) {
	return (
		<div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4">
			<div className="roundbit-frame roundbit-xl roundbit-step roundbit-border roundbit-border-solid roundbit-border-neutral-800 grid w-full max-w-xl gap-5 bg-neutral-950 p-6 text-neutral-100">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h2 className="font-semibold text-xl">Create Project</h2>
						<p className="text-neutral-400 text-sm">
							Pick template and package manager. The command updates
							immediately.
						</p>
					</div>
					<IconButton label="Close" onClick={onClose}>
						<PixelXIcon className="size-4" />
					</IconButton>
				</div>
				<ControlGroup title="Template">
					<OptionGrid
						columns="grid-cols-3"
						onChange={(template) => setState({ template })}
						options={templates}
						value={state.template}
						valueLabels={labels.template}
					/>
				</ControlGroup>
				<ControlGroup title="Package manager">
					<OptionGrid
						columns="grid-cols-4"
						onChange={(packageManager) => setState({ packageManager })}
						options={packageManagers}
						value={state.packageManager}
					/>
				</ControlGroup>
				<CodePanel code={getCreateCommand(state)} label="Command" />
				<div className="grid grid-cols-2 gap-3">
					<Button onClick={onClose} variant="ghost">
						Close
					</Button>
					<Button onClick={() => copyToClipboard(getCreateCommand(state))}>
						Copy Command
					</Button>
				</div>
			</div>
		</div>
	);
}

function getMenuButtonClassName(state: CreateState, active: boolean) {
	if (state.menuColor === "solid") {
		return active
			? "bg-neutral-100 text-neutral-950"
			: "roundbit-border roundbit-border-solid roundbit-border-neutral-700 bg-neutral-900 text-neutral-200";
	}
	if (state.menuColor === "muted") {
		return active
			? "roundbit-border roundbit-border-solid roundbit-border-neutral-500 bg-neutral-800 text-neutral-100"
			: "bg-neutral-900/40 text-neutral-500";
	}
	return active
		? cn(
				"roundbit-border roundbit-border-solid roundbit-border-neutral-600 bg-neutral-900 text-neutral-100",
				state.menuAccent === "bold" && "roundbit-border-2",
			)
		: "text-neutral-500";
}

function getMenuPanelClassName(state: CreateState) {
	return cn(
		state.menuColor === "solid"
			? "bg-neutral-100 text-neutral-950"
			: state.menuColor === "muted"
				? "bg-neutral-800/60 text-neutral-100"
				: "bg-neutral-950 text-neutral-100",
		state.menuAccent === "bold" &&
			"roundbit-border roundbit-border-2 roundbit-border-solid roundbit-border-neutral-100",
	);
}
