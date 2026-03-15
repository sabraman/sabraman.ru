export function getLegacySliderHubPath() {
	return "/components/legacy-slider";
}

export const LEGACY_SLIDER_URLS = {
	direct: "https://sabraman.ru/r/legacy-slider.json",
	registry: "https://sabraman.ru/r/registry.json",
	docs: "https://sabraman.ru/components/legacy-slider",
} as const;

export const LEGACY_SLIDER_INSTALL_COMMANDS = {
	bun: `bunx --bun shadcn@latest add ${LEGACY_SLIDER_URLS.direct}`,
	npm: `npx shadcn@latest add ${LEGACY_SLIDER_URLS.direct}`,
	pnpm: `pnpm dlx shadcn@latest add ${LEGACY_SLIDER_URLS.direct}`,
	yarn: `yarn dlx shadcn@latest add ${LEGACY_SLIDER_URLS.direct}`,
} as const;

export const LEGACY_SLIDER_ALIAS_COMMANDS = {
	bun: "bunx --bun shadcn@latest add @sabraman/legacy-slider",
	npm: "npx shadcn@latest add @sabraman/legacy-slider",
	pnpm: "pnpm dlx shadcn@latest add @sabraman/legacy-slider",
	yarn: "yarn dlx shadcn@latest add @sabraman/legacy-slider",
} as const;

export const LEGACY_SLIDER_USAGE_SNIPPET = `"use client";

import { useState } from "react";

import { LegacySlider } from "@/components/legacy-slider";

function formatBalance(value: number) {
  const roundedValue = Math.round(value);

  if (roundedValue === 0) {
    return "Center";
  }

  if (roundedValue < 0) {
    return \`L \${Math.abs(roundedValue)}\`;
  }

  return \`R \${roundedValue}\`;
}

export function LegacyControlRack() {
  const [ringer, setRinger] = useState(68);
  const [brightness, setBrightness] = useState(44);
  const [balance, setBalance] = useState(12);

  return (
    <div className="flex w-full max-w-[340px] flex-col gap-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between font-medium text-slate-500 text-sm">
          <span>Ringer</span>
          <span>{Math.round(ringer)}%</span>
        </div>
        <LegacySlider
          aria-label="Ringer"
          onValueChange={setRinger}
          value={ringer}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between font-medium text-slate-500 text-sm">
          <span>Brightness</span>
          <span>{Math.round(brightness)}%</span>
        </div>
        <LegacySlider
          aria-label="Brightness"
          onValueChange={setBrightness}
          value={brightness}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between font-medium text-slate-500 text-sm">
          <span>Balance</span>
          <span>{formatBalance(balance)}</span>
        </div>
        <LegacySlider
          aria-label="Stereo balance"
          max={50}
          min={-50}
          onValueChange={setBalance}
          value={balance}
        />
      </div>
    </div>
  );
}`;

export const LEGACY_SLIDER_DOCS_COPY = {
	title: "Legacy Slider",
	summary:
		"Settings, media controls, and signed numeric adjustments with legacy chrome.",
	kicker: "Registry component",
	installDescription:
		"Install the direct item URL for the shortest path, or use the Sabraman registry alias once your components config points at the registry.",
	usageDescription:
		"The component wraps Radix Slider behavior in a classic glossy shell, so you get a real interactive value control while matching the original chrome.",
} as const;
