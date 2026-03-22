"use client";

import * as React from "react";

import { initRoundbit } from "~/lib/roundbit";

export function RoundbitScope({ children }: { children: React.ReactNode }) {
	const scopeRef = React.useRef<HTMLDivElement | null>(null);

	React.useLayoutEffect(() => {
		if (!scopeRef.current) {
			return;
		}

		try {
			return initRoundbit(scopeRef.current).disconnect;
		} catch (error) {
			console.error("Failed to initialize roundbit scope.", error);
		}
	}, []);

	return (
		<div className="contents" ref={scopeRef}>
			{children}
		</div>
	);
}
