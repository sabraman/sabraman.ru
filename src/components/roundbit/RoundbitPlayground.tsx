"use client";

import * as React from "react";

import { LegacyDocCodeBlock } from "~/components/legacy/docs/component-doc-code-block";
import { RoundbitFrame } from "~/components/roundbit";
import { initRoundbit } from "~/lib/roundbit";
import { cn } from "~/lib/utils";

type DemoMode = "direct" | "frame";
type RadiusMode = "token" | "arbitrary";
type RadiusToken = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
type RoundbitPattern =
	| "all"
	| "t"
	| "r"
	| "b"
	| "l"
	| "tl"
	| "tr"
	| "br"
	| "bl";
type RoundbitStep = 1 | 2 | 4;
type RoundbitStyle = React.CSSProperties & {
	"--roundbit-step"?: string;
};

const MODE_OPTIONS: { label: string; value: DemoMode }[] = [
	{ label: "Direct", value: "direct" },
	{ label: "Frame", value: "frame" },
];

const RADIUS_MODE_OPTIONS: { label: string; value: RadiusMode }[] = [
	{ label: "Token", value: "token" },
	{ label: "Arbitrary", value: "arbitrary" },
];

const TOKEN_OPTIONS: { label: string; value: RadiusToken }[] = [
	{ label: "sm", value: "sm" },
	{ label: "md", value: "md" },
	{ label: "lg", value: "lg" },
	{ label: "xl", value: "xl" },
	{ label: "2xl", value: "2xl" },
	{ label: "3xl", value: "3xl" },
	{ label: "4xl", value: "4xl" },
	{ label: "full", value: "full" },
];

const PATTERN_OPTIONS: { label: string; value: RoundbitPattern }[] = [
	{ label: "all", value: "all" },
	{ label: "top", value: "t" },
	{ label: "right", value: "r" },
	{ label: "bottom", value: "b" },
	{ label: "left", value: "l" },
	{ label: "tl", value: "tl" },
	{ label: "tr", value: "tr" },
	{ label: "br", value: "br" },
	{ label: "bl", value: "bl" },
];

const STEP_OPTIONS: RoundbitStep[] = [1, 2, 4];

export function RoundbitPlayground() {
	const scopeRef = React.useRef<HTMLDivElement | null>(null);
	const [mode, setMode] = React.useState<DemoMode>("direct");
	const [radiusMode, setRadiusMode] = React.useState<RadiusMode>("token");
	const [token, setToken] = React.useState<RadiusToken>("xl");
	const [arbitraryPx, setArbitraryPx] = React.useState(18);
	const [pattern, setPattern] = React.useState<RoundbitPattern>("all");
	const [step, setStep] = React.useState<RoundbitStep>(2);
	const [width, setWidth] = React.useState(320);
	const [height, setHeight] = React.useState(176);
	const arbitrarySliderStep = mode === "frame" ? step : 1;

	React.useLayoutEffect(() => {
		if (mode !== "direct" || !scopeRef.current) {
			return;
		}

		return initRoundbit(scopeRef.current).disconnect;
	}, [mode]);

	React.useEffect(() => {
		if (radiusMode !== "arbitrary") {
			return;
		}

		const snappedValue = clampToStep(arbitraryPx, arbitrarySliderStep);

		if (snappedValue !== arbitraryPx) {
			setArbitraryPx(snappedValue);
		}
	}, [arbitraryPx, arbitrarySliderStep, radiusMode]);

	const utilityClass = buildUtilityClass({
		arbitraryPx,
		pattern,
		radiusMode,
		step,
		token,
	});
	const previewStyle = buildPreviewStyle({
		arbitraryPx,
		height,
		pattern,
		radiusMode,
		step,
		token,
		width,
	});
	const frameClassName = cn(
		"w-auto",
		step === 1 &&
			"roundbit-border roundbit-border-solid roundbit-border-sky-500/80 shadow-[0_10px_0_rgba(36,56,102,0.24)]",
		step === 2 &&
			"roundbit-border-2 roundbit-border-solid roundbit-border-sky-500/85 shadow-[0_10px_0_rgba(36,56,102,0.26)]",
		step === 4 &&
			"roundbit-border-4 roundbit-border-solid roundbit-border-sky-500/90 shadow-[0_12px_0_rgba(36,56,102,0.3)]",
	);
	const code = buildSnippet({
		arbitraryPx,
		height,
		mode,
		pattern,
		radiusMode,
		step,
		token,
		utilityClass,
		width,
	});
	const radiusSummary =
		radiusMode === "token" ? `token: ${token}` : `arbitrary: ${arbitraryPx}px`;

	return (
		<section className="overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,18,24,0.98)_0%,rgba(7,10,15,1)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_32px_70px_rgba(0,0,0,0.28)]">
			<div className="border-white/10 border-b bg-[radial-gradient(circle_at_top_left,rgba(125,173,255,0.2),transparent_36%),linear-gradient(180deg,rgba(23,30,44,0.94)_0%,rgba(12,16,24,0.94)_100%)] px-6 py-5 md:px-8">
				<p className="font-mono text-[#86aef9] text-[11px] uppercase tracking-[0.34em]">
					Live Playground
				</p>
				<h3 className="mt-2 font-semibold text-2xl text-white tracking-tight">
					Tune the same roundbit system in real time.
				</h3>
				<p className="mt-2 max-w-[64ch] text-[#97a8c3] leading-relaxed">
					Switch between direct clip mode and the frame primitive, then change
					the radius source, corner pattern, step grid, and box size. The
					snippet below updates to the exact public API you should copy.
				</p>
			</div>

			<div className="grid gap-0 lg:grid-cols-[320px_minmax(0,1fr)]">
				<div className="border-white/10 border-b lg:border-r lg:border-b-0">
					<div className="space-y-6 p-6 md:p-7">
						<ControlSection label="Mode">
							<div className="grid grid-cols-2 gap-2">
								{MODE_OPTIONS.map((option) => (
									<ToggleButton
										isActive={mode === option.value}
										key={option.value}
										onClick={() => setMode(option.value)}
									>
										{option.label}
									</ToggleButton>
								))}
							</div>
						</ControlSection>

						<ControlSection label="Radius">
							<div className="grid grid-cols-2 gap-2">
								{RADIUS_MODE_OPTIONS.map((option) => (
									<ToggleButton
										isActive={radiusMode === option.value}
										key={option.value}
										onClick={() => setRadiusMode(option.value)}
									>
										{option.label}
									</ToggleButton>
								))}
							</div>

							{radiusMode === "token" ? (
								<label className="mt-3 block">
									<span className="sr-only">Radius token</span>
									<select
										className="w-full rounded-[14px] border border-white/12 bg-white/[0.04] px-4 py-3 font-mono text-[14px] text-white outline-none transition focus:border-[#79a2ff]/60"
										onChange={(event) =>
											setToken(event.target.value as RadiusToken)
										}
										value={token}
									>
										{TOKEN_OPTIONS.map((option) => (
											<option
												className="bg-[#0d1118]"
												key={option.value}
												value={option.value}
											>
												{option.label}
											</option>
										))}
									</select>
								</label>
							) : (
								<SliderControl
									label="Radius px"
									max={40}
									min={4}
									onChange={setArbitraryPx}
									step={arbitrarySliderStep}
									value={arbitraryPx}
								/>
							)}
						</ControlSection>

						<ControlSection label="Corner pattern">
							<div className="grid grid-cols-3 gap-2">
								{PATTERN_OPTIONS.map((option) => (
									<ToggleButton
										isActive={pattern === option.value}
										key={option.value}
										onClick={() => setPattern(option.value)}
									>
										{option.label}
									</ToggleButton>
								))}
							</div>
						</ControlSection>

						<ControlSection label="Step grid">
							<div className="grid grid-cols-3 gap-2">
								{STEP_OPTIONS.map((option) => (
									<ToggleButton
										isActive={step === option}
										key={option}
										onClick={() => setStep(option)}
									>
										{option}px
									</ToggleButton>
								))}
							</div>
						</ControlSection>

						<ControlSection label="Surface size">
							<SliderControl
								label="Width"
								max={420}
								min={200}
								onChange={setWidth}
								step={4}
								value={width}
							/>
							<SliderControl
								label="Height"
								max={240}
								min={120}
								onChange={setHeight}
								step={4}
								value={height}
							/>
						</ControlSection>
					</div>
				</div>

				<div className="flex flex-col">
					<div className="border-white/10 border-b p-5 md:p-7">
						<div className="grid gap-3 md:grid-cols-3">
							<InfoCard label="Utility" value={utilityClass} />
							<InfoCard label="Radius source" value={radiusSummary} />
							<InfoCard label="Size" value={`${width} x ${height}`} />
						</div>
					</div>

					<div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_24%),linear-gradient(180deg,#040506_0%,#0b0e14_100%)] px-5 py-7 md:px-7 md:py-9">
						<div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-position:center] [background-size:22px_22px]" />

						<div className="relative overflow-x-auto pb-2">
							<div
								className="flex min-h-[320px] min-w-max items-center justify-center px-4"
								ref={mode === "direct" ? scopeRef : undefined}
							>
								{mode === "direct" ? (
									<div
										className="roundbit-host roundbit-preview flex flex-col justify-between border border-zinc-900/15 bg-[linear-gradient(180deg,#fcfdff_0%,#edf3ff_100%)] p-5 text-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
										style={previewStyle}
									>
										<PreviewHeader mode={mode} step={step} />
										<PreviewFooter
											height={height}
											label={utilityClass}
											width={width}
										/>
									</div>
								) : (
									<RoundbitFrame
										className={frameClassName}
										contentClassName="flex h-full flex-col justify-between bg-[linear-gradient(180deg,#fbfdff_0%,#eff4ff_100%)] p-5 text-zinc-950"
										style={previewStyle}
									>
										<PreviewHeader mode={mode} step={step} />
										<PreviewFooter
											height={height}
											label={utilityClass}
											width={width}
										/>
									</RoundbitFrame>
								)}
							</div>
						</div>

						<p className="relative mt-5 max-w-[60ch] text-[#93a3bc] text-sm leading-relaxed">
							The selected radius stays the same physical size while the box
							grows or shrinks. Changing the width and height only lengthens the
							straight segments, except for the normal small-box clamp you
							already get from CSS border-radius behavior.
						</p>
					</div>

					<div className="border-white/10 border-t">
						<LegacyDocCodeBlock code={code} />
					</div>
				</div>
			</div>
		</section>
	);
}

function ControlSection({
	children,
	label,
}: {
	children: React.ReactNode;
	label: string;
}) {
	return (
		<section>
			<p className="font-mono text-[#7e92b2] text-[11px] uppercase tracking-[0.28em]">
				{label}
			</p>
			<div className="mt-3">{children}</div>
		</section>
	);
}

function ToggleButton({
	children,
	isActive,
	onClick,
}: {
	children: React.ReactNode;
	isActive: boolean;
	onClick: () => void;
}) {
	return (
		<button
			className={cn(
				"rounded-[14px] border px-3 py-2.5 font-mono text-[13px] transition",
				isActive
					? "border-[#7ea9ff]/70 bg-[linear-gradient(180deg,rgba(88,132,220,0.35)_0%,rgba(38,55,97,0.55)_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
					: "border-white/12 bg-white/[0.04] text-[#90a3c3] hover:border-white/20 hover:bg-white/[0.06] hover:text-white",
			)}
			onClick={onClick}
			type="button"
		>
			{children}
		</button>
	);
}

function SliderControl({
	label,
	max,
	min,
	onChange,
	step,
	value,
}: {
	label: string;
	max: number;
	min: number;
	onChange: (value: number) => void;
	step: number;
	value: number;
}) {
	return (
		<label className="mt-3 block first:mt-0">
			<div className="mb-2 flex items-center justify-between gap-3 font-mono text-[#9db0cc] text-[12px]">
				<span>{label}</span>
				<span className="text-white">{value}px</span>
			</div>
			<input
				className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#88b0ff]"
				max={max}
				min={min}
				onChange={(event) => onChange(Number(event.target.value))}
				step={step}
				type="range"
				value={value}
			/>
		</label>
	);
}

function InfoCard({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-[16px] border border-white/10 bg-white/[0.03] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
			<p className="font-mono text-[#7f93b3] text-[11px] uppercase tracking-[0.28em]">
				{label}
			</p>
			<p className="mt-2 break-words font-mono text-[13px] text-white leading-relaxed">
				{value}
			</p>
		</div>
	);
}

function PreviewHeader({ mode, step }: { mode: DemoMode; step: RoundbitStep }) {
	return (
		<div className="flex items-start justify-between gap-3">
			<div className="rounded-[12px] border border-zinc-950/10 bg-white/60 px-3 py-2 font-mono text-[11px] text-zinc-700 uppercase tracking-[0.26em]">
				{mode}
			</div>
			<div className="rounded-[12px] bg-zinc-950 px-3 py-2 font-mono text-[11px] text-white">
				{step}px grid
			</div>
		</div>
	);
}

function PreviewFooter({
	height,
	label,
	width,
}: {
	height: number;
	label: string;
	width: number;
}) {
	return (
		<div className="space-y-2">
			<p className="break-words font-mono text-[13px] text-zinc-950 leading-relaxed">
				{label}
			</p>
			<p className="font-mono text-[12px] text-zinc-500">
				{width} x {height}
			</p>
		</div>
	);
}

function buildUtilityClass({
	arbitraryPx,
	pattern,
	radiusMode,
	step,
	token,
}: {
	arbitraryPx: number;
	pattern: RoundbitPattern;
	radiusMode: RadiusMode;
	step: RoundbitStep;
	token: RadiusToken;
}) {
	const radiusSegment =
		radiusMode === "token" ? token : `[${formatInteger(arbitraryPx)}px]`;
	const base =
		pattern === "all"
			? `roundbit-${radiusSegment}`
			: `roundbit-${pattern}-${radiusSegment}`;

	return step === 2 ? base : `${base} roundbit-step-${step}`;
}

function buildPreviewStyle({
	arbitraryPx,
	height,
	pattern,
	radiusMode,
	step,
	token,
	width,
}: {
	arbitraryPx: number;
	height: number;
	pattern: RoundbitPattern;
	radiusMode: RadiusMode;
	step: RoundbitStep;
	token: RadiusToken;
	width: number;
}) {
	const radiusValue =
		radiusMode === "token"
			? getTokenRadiusValue(token)
			: `${formatInteger(arbitraryPx)}px`;
	const style: RoundbitStyle = {
		"--roundbit-step": `${step}px`,
		clipPath: "var(--roundbit-clip-path)",
		height: `${formatInteger(height)}px`,
		minWidth: `${formatInteger(width)}px`,
		width: `${formatInteger(width)}px`,
	};

	switch (pattern) {
		case "all":
			style.borderRadius = radiusValue;
			return style;
		case "t":
			style.borderTopLeftRadius = radiusValue;
			style.borderTopRightRadius = radiusValue;
			return style;
		case "r":
			style.borderTopRightRadius = radiusValue;
			style.borderBottomRightRadius = radiusValue;
			return style;
		case "b":
			style.borderBottomRightRadius = radiusValue;
			style.borderBottomLeftRadius = radiusValue;
			return style;
		case "l":
			style.borderTopLeftRadius = radiusValue;
			style.borderBottomLeftRadius = radiusValue;
			return style;
		case "tl":
			style.borderTopLeftRadius = radiusValue;
			return style;
		case "tr":
			style.borderTopRightRadius = radiusValue;
			return style;
		case "br":
			style.borderBottomRightRadius = radiusValue;
			return style;
		case "bl":
			style.borderBottomLeftRadius = radiusValue;
			return style;
	}
}

function buildSnippet({
	arbitraryPx,
	height,
	mode,
	pattern,
	radiusMode,
	step,
	token,
	utilityClass,
	width,
}: {
	arbitraryPx: number;
	height: number;
	mode: DemoMode;
	pattern: RoundbitPattern;
	radiusMode: RadiusMode;
	step: RoundbitStep;
	token: RadiusToken;
	utilityClass: string;
	width: number;
}) {
	const bodyCopy = getBodyCopy({ arbitraryPx, pattern, radiusMode, token });
	const sizeLine = `style={{ width: ${formatInteger(width)}, height: ${formatInteger(height)} }}`;

	if (mode === "frame") {
		const frameStrokeClass =
			step === 1
				? "roundbit-border roundbit-border-solid roundbit-border-sky-500/80 shadow-[0_10px_0_rgba(36,56,102,0.24)]"
				: step === 2
					? "roundbit-border-2 roundbit-border-solid roundbit-border-sky-500/85 shadow-[0_10px_0_rgba(36,56,102,0.26)]"
					: "roundbit-border-4 roundbit-border-solid roundbit-border-sky-500/90 shadow-[0_12px_0_rgba(36,56,102,0.3)]";

		return `"use client";

import { RoundbitFrame } from "@/components/roundbit";

export function RoundbitExample() {
  return (
    <RoundbitFrame
      className="${utilityClass} ${frameStrokeClass}"
      contentClassName="bg-[linear-gradient(180deg,#fbfdff_0%,#eff4ff_100%)] p-5 text-zinc-950"
      style={{ width: ${formatInteger(width)}, height: ${formatInteger(height)} }}
    >
      <p className="font-mono text-[13px] text-zinc-950">${utilityClass}</p>
      <p className="mt-2 text-[13px] text-zinc-600 leading-relaxed">
        ${bodyCopy}
      </p>
    </RoundbitFrame>
  );
}`;
	}

	return `"use client";

import { useEffect, useRef } from "react";

import { initRoundbit } from "@/lib/roundbit";

export function RoundbitExample() {
  const scopeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scopeRef.current) {
      return;
    }

    return initRoundbit(scopeRef.current).disconnect;
  }, []);

  return (
    <div ref={scopeRef}>
      <div
        className="${utilityClass} border border-zinc-900/15 bg-zinc-100 p-5 text-zinc-950"
        ${sizeLine}
      >
        <p className="font-mono text-[13px] text-zinc-950">${utilityClass}</p>
        <p className="mt-2 text-[13px] text-zinc-600 leading-relaxed">
          ${bodyCopy}
        </p>
      </div>
    </div>
  );
}`;
}

function getBodyCopy({
	arbitraryPx,
	pattern,
	radiusMode,
	token,
}: {
	arbitraryPx: number;
	pattern: RoundbitPattern;
	radiusMode: RadiusMode;
	token: RadiusToken;
}) {
	const radiusText =
		radiusMode === "token" ? `the ${token} radius token` : `${arbitraryPx}px`;
	const patternText =
		pattern === "all" ? "all corners" : describePattern(pattern);

	return `Previewing ${patternText} with ${radiusText}.`;
}

function describePattern(pattern: RoundbitPattern) {
	switch (pattern) {
		case "all":
			return "all";
		case "t":
			return "the top edge";
		case "r":
			return "the right edge";
		case "b":
			return "the bottom edge";
		case "l":
			return "the left edge";
		case "tl":
			return "the top-left corner";
		case "tr":
			return "the top-right corner";
		case "br":
			return "the bottom-right corner";
		case "bl":
			return "the bottom-left corner";
	}
}

function formatInteger(value: number) {
	return Math.round(value);
}

function getTokenRadiusValue(token: RadiusToken) {
	switch (token) {
		case "sm":
			return "calc(var(--radius) - 4px)";
		case "md":
			return "calc(var(--radius) - 2px)";
		case "lg":
			return "var(--radius)";
		case "xl":
			return "calc(var(--radius) + 4px)";
		case "2xl":
			return "calc(var(--radius) + 6px)";
		case "3xl":
			return "calc(var(--radius) + 14px)";
		case "4xl":
			return "calc(var(--radius) + 22px)";
		case "full":
			return "9999px";
	}
}

function clampToStep(value: number, step: number) {
	return Math.max(step, Math.round(value / step) * step);
}
