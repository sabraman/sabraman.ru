"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "~/lib/utils";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "~/components/ui/hover-card";

export type TOCItemType = {
	title: React.ReactNode;
	url: string;
	depth: number;
};

export type TOCMinimapProps = {
	/** @fumadocsHref #tocitemtype */
	items: TOCItemType[];
	className?: string;
};

export function TOCMinimap({ items, className }: TOCMinimapProps) {
	const itemIds = useMemo(
		() => items.map((item) => item.url.replace("#", "")),
		[items],
	);

	const activeHeading = useActiveHeading(itemIds);

	if (!items.length) {
		return null;
	}

	return (
		<div className={cn("w-10", className)}>
			<HoverCard openDelay={100} closeDelay={100}>
				<HoverCardTrigger asChild>
					<div className="flex max-h-[50dvh] cursor-pointer flex-col gap-2.5 overflow-hidden py-3 pl-4 transition-opacity duration-200 data-[state=open]:opacity-0">
						{items.map((item) => (
							<div
								key={item.url}
								className={cn(
									"h-0.5 shrink-0 rounded-full transition-[background-color,width] duration-200",
									item.depth === 2
										? "w-6"
										: item.depth === 3
											? "ml-2 w-4"
											: "ml-4 w-2",
									item.url === `#${activeHeading}` ? "bg-white" : "bg-white/25",
								)}
							/>
						))}
					</div>
				</HoverCardTrigger>

				<HoverCardContent
					className="w-60 overflow-hidden border-white/10 bg-black/80 p-0 shadow-2xl backdrop-blur-xl data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=left]:slide-in-from-right-2"
					align="start"
					alignOffset={-12}
					side="left"
					sideOffset={8}
				>
					<div className="flex max-h-[50dvh] overflow-y-auto overscroll-contain">
						<ul className="flex size-full flex-col px-5 py-4 text-sm">
							{items.map((item) => (
								<li key={item.url} className="flex py-1">
									<a
										href={item.url}
										className={cn(
											"line-clamp-2 w-full transition-colors duration-150",
											item.depth === 3
												? "pl-3"
												: item.depth === 4
													? "pl-6"
													: "",
											item.url === `#${activeHeading}`
												? "font-medium text-white"
												: "text-white/50 hover:text-white/90",
										)}
										onClick={handleItemClick}
									>
										{item.title}
									</a>
								</li>
							))}
						</ul>
					</div>
				</HoverCardContent>
			</HoverCard>
		</div>
	);
}

export function useActiveHeading(itemIds: string[]) {
	const [activeId, setActiveId] = useState<string | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{ rootMargin: "0% 0% -80% 0%", threshold: 0.98 },
		);

		for (const id of itemIds ?? []) {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		}

		return () => {
			for (const id of itemIds ?? []) {
				const element = document.getElementById(id);
				if (element) {
					observer.unobserve(element);
				}
			}
		};
	}, [itemIds]);

	return activeId;
}

function handleItemClick(e: React.MouseEvent<HTMLAnchorElement>) {
	e.preventDefault();
	const url = e.currentTarget.getAttribute("href") ?? "";
	scrollToHeading(url);
}

function scrollToHeading(url: string) {
	history.pushState(null, "", url);
	document.getElementById(url.replace("#", ""))?.scrollIntoView({
		behavior: "smooth",
	});
}
