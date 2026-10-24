"use client";

import { usePathname } from "next/navigation";
import type * as React from "react";
import { cn } from "~/lib/utils";

function isFullScreenRoute(pathname: string) {
	return (
		pathname === "/components/roundbitcn" ||
		pathname.endsWith("/components/roundbitcn")
	);
}

export function RouteChrome({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	if (isFullScreenRoute(pathname)) {
		return null;
	}

	return <>{children}</>;
}

export function RouteMain({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<main className={cn(!isFullScreenRoute(pathname) && "pb-24")}>
			{children}
		</main>
	);
}
