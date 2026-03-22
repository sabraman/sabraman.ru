export function getRoundbitHubPath() {
	return "/components/roundbit";
}

export const ROUNDBIT_URLS = {
	direct: "https://sabraman.ru/r/roundbit.json",
	registry: "https://sabraman.ru/r/registry.json",
	docs: "https://sabraman.ru/components/roundbit",
} as const;

export const ROUNDBIT_INSTALL_COMMANDS = {
	bun: `bunx --bun shadcn@latest add ${ROUNDBIT_URLS.direct}`,
	npm: `npx shadcn@latest add ${ROUNDBIT_URLS.direct}`,
	pnpm: `pnpm dlx shadcn@latest add ${ROUNDBIT_URLS.direct}`,
	yarn: `yarn dlx shadcn@latest add ${ROUNDBIT_URLS.direct}`,
} as const;

export const ROUNDBIT_ALIAS_COMMANDS = {
	bun: "bunx --bun shadcn@latest add @sabraman/roundbit",
	npm: "npx shadcn@latest add @sabraman/roundbit",
	pnpm: "pnpm dlx shadcn@latest add @sabraman/roundbit",
	yarn: "yarn dlx shadcn@latest add @sabraman/roundbit",
} as const;

export const ROUNDBIT_USAGE_SNIPPET = `"use client";

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
      <button className="roundbit-xl border border-zinc-900/15 bg-zinc-100 px-5 py-4 text-zinc-950">
        roundbit-xl
      </button>
    </div>
  );
}`;

export const ROUNDBIT_DOCS_COPY = {
	title: "Roundbit",
	summary:
		"Pixel-stepped rounded corners inspired by pixel-corner generators, but normalized to Tailwind and CSS radius behavior.",
	kicker: "Registry component",
	installDescription:
		"Install the registry item, then use the `roundbit-*` utilities for direct clipping or `RoundbitFrame` plus `roundbit-border-*` when borders and shadows must follow the stepped shape.",
	usageDescription:
		"The utilities mirror Tailwind's `rounded-*` naming, while `roundbit-border-*` mirrors Tailwind's border mental model for framed surfaces and the runtime rasterizes the stepped geometry at the configured grid size.",
} as const;
