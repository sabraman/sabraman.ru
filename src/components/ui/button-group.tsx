"use client";

import type * as React from "react";

import { cn } from "~/lib/utils";

export function ButtonGroup({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"inline-flex items-stretch gap-0 [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none",
				className,
			)}
			{...props}
		/>
	);
}
