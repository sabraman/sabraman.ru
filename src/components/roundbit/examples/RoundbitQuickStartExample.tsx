"use client";

import * as React from "react";

import { initRoundbit } from "~/lib/roundbit";

export function RoundbitQuickStartExample() {
	const scopeRef = React.useRef<HTMLDivElement | null>(null);

	React.useLayoutEffect(() => {
		if (!scopeRef.current) {
			return;
		}

		return initRoundbit(scopeRef.current).disconnect;
	}, []);

	return (
		<div ref={scopeRef}>
			<button
				className="roundbit-xl border border-zinc-900/15 bg-zinc-100 px-5 py-4 text-zinc-950"
				type="button"
			>
				roundbit-xl
			</button>
		</div>
	);
}
