export function getIosSliderHubPath() {
	return "/components/ios-slider";
}

export const IOS_SLIDER_URLS = {
	direct: "https://sabraman.ru/r/ios-slider.json",
	registry: "https://sabraman.ru/r/registry.json",
	docs: "https://sabraman.ru/components/ios-slider",
} as const;

export const IOS_SLIDER_INSTALL_COMMANDS = {
	bun: `bunx --bun shadcn@latest add ${IOS_SLIDER_URLS.direct}`,
	npm: `npx shadcn@latest add ${IOS_SLIDER_URLS.direct}`,
	pnpm: `pnpm dlx shadcn@latest add ${IOS_SLIDER_URLS.direct}`,
	yarn: `yarn dlx shadcn@latest add ${IOS_SLIDER_URLS.direct}`,
} as const;

export const IOS_SLIDER_ALIAS_COMMANDS = {
	bun: "bunx --bun shadcn@latest add @sabraman/ios-slider",
	npm: "npx shadcn@latest add @sabraman/ios-slider",
	pnpm: "pnpm dlx shadcn@latest add @sabraman/ios-slider",
	yarn: "yarn dlx shadcn@latest add @sabraman/ios-slider",
} as const;

export const IOS_SLIDER_USAGE_SNIPPET = `"use client";

import { useState } from "react";

import { IosSlider } from "@/components/ios-slider";

export function VolumeSlider() {
  const [volume, setVolume] = useState(36);

  return (
    <div className="flex w-full max-w-[320px] flex-col gap-4">
      <IosSlider
        aria-label="Volume"
        onValueChange={setVolume}
        value={volume}
      />
      <p className="font-medium text-sm text-slate-500">
        Volume: {Math.round(volume)}%
      </p>
    </div>
  );
}`;

export const IOS_SLIDER_DOCS_COPY = {
	title: "Legacy iOS Slider",
	summary:
		"A registry-ready recreation of the glossy iOS 6 slider, complete with the raised metallic thumb and the original silver-to-blue track treatment from the UI kit.",
	kicker: "Registry component",
	installDescription:
		"Install the direct item URL for the shortest path, or use the Sabraman registry alias once your components config points at the registry.",
	usageDescription:
		"The component wraps Radix Slider behavior in the old iPhone visual language, so you get a real interactive value control while matching the iOS 6 chrome.",
} as const;
