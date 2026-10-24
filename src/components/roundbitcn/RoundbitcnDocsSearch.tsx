"use client";

import { useDocsSearch } from "fumadocs-core/search/client";
import type { SortedResult } from "fumadocs-core/search/server";
import { useRouter } from "next/navigation";
import * as React from "react";
import {
	PixelChevronRightIcon,
	PixelSearchIcon,
} from "~/components/roundbitcn-icons";
import { Button } from "~/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "~/components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";
import { getLocalizedPathname } from "~/i18n/locale-paths";
import type { SupportedLocale } from "~/i18n/types";
import { cn } from "~/lib/utils";

export type RoundbitcnSearchItem = {
	category: "Components" | "Forms" | "Sections";
	description?: string;
	href: string;
	keywords?: string[];
	title: string;
};

export function RoundbitcnDocsSearch({
	items,
	locale,
}: {
	items: RoundbitcnSearchItem[];
	locale: SupportedLocale;
}) {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const [renderDelayedGroups, setRenderDelayedGroups] = React.useState(false);
	const { query, search, setSearch } = useDocsSearch({
		api: "/api/search",
		type: "fetch",
	});

	// Collapse the delayed groups while the dialog is closed (adjust during render).
	if (!open && renderDelayedGroups) {
		setRenderDelayedGroups(false);
	}

	React.useEffect(() => {
		if (!open) {
			return;
		}

		const frame = window.requestAnimationFrame(() => {
			setRenderDelayedGroups(true);
		});

		return () => window.cancelAnimationFrame(frame);
	}, [open]);

	React.useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (
				event.target instanceof HTMLElement &&
				(event.target.isContentEditable ||
					event.target instanceof HTMLInputElement ||
					event.target instanceof HTMLTextAreaElement ||
					event.target instanceof HTMLSelectElement)
			) {
				return;
			}

			if (
				(event.key === "k" && (event.metaKey || event.ctrlKey)) ||
				event.key === "/"
			) {
				event.preventDefault();
				setOpen((current) => !current);
			}
		}

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	const commandFilter = React.useCallback(
		(value: string, searchValue: string, keywords?: string[]) => {
			const haystack = `${value} ${keywords?.join(" ") ?? ""}`.toLowerCase();

			if (haystack.includes(searchValue.toLowerCase())) {
				return 1;
			}

			return 0;
		},
		[],
	);

	const runCommand = React.useCallback(
		(href: string) => {
			setOpen(false);
			router.push(getLocalizedPathname(locale, href));
		},
		[locale, router],
	);

	const groupedItems = React.useMemo(() => {
		return items.reduce(
			(accumulator, item) => {
				accumulator[item.category].push(item);
				return accumulator;
			},
			{
				Components: [],
				Forms: [],
				Sections: [],
			} as Record<RoundbitcnSearchItem["category"], RoundbitcnSearchItem[]>,
		);
	}, [items]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					className="h-8 w-full justify-start px-3 font-normal text-muted-foreground shadow-none md:w-56"
					type="button"
					variant="outline"
				>
					<PixelSearchIcon aria-hidden="true" data-icon="inline-start" />
					<span className="hidden xl:inline-flex">Search documentation...</span>
					<span className="inline-flex xl:hidden">Search...</span>
					<span className="ml-auto hidden items-center gap-1 text-muted-foreground/70 text-xs lg:flex">
						<SearchKbd>⌘</SearchKbd>
						<SearchKbd>K</SearchKbd>
					</span>
				</Button>
			</DialogTrigger>
			<DialogContent
				className="top-[15%] translate-y-0 overflow-hidden p-2 pb-11 shadow-none sm:max-w-xl"
				showCloseButton={false}
			>
				<DialogHeader className="sr-only">
					<DialogTitle>Search documentation</DialogTitle>
					<DialogDescription>
						Search Roundbitcn documentation and components.
					</DialogDescription>
				</DialogHeader>
				<Command className="bg-transparent" filter={commandFilter}>
					<div className="relative">
						<CommandInput
							onValueChange={setSearch}
							placeholder="Search documentation..."
						/>
						{query.isLoading ? (
							<div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground text-xs">
								Searching
							</div>
						) : null}
					</div>
					<CommandList className="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5">
						<CommandEmpty className="py-12 text-center text-muted-foreground text-sm">
							{query.isLoading ? "Searching..." : "No results found."}
						</CommandEmpty>
						{renderDelayedGroups ? (
							<>
								<SearchGroup
									heading="Sections"
									items={groupedItems.Sections}
									onSelect={runCommand}
								/>
								<SearchGroup
									heading="Components"
									items={groupedItems.Components}
									onSelect={runCommand}
								/>
								<SearchGroup
									heading="Forms"
									items={groupedItems.Forms}
									onSelect={runCommand}
								/>
								<SearchResults
									locale={locale}
									query={query}
									search={search}
									setOpen={setOpen}
								/>
							</>
						) : null}
					</CommandList>
				</Command>
				<div className="roundbit-border-t roundbit-border-solid roundbit-border-border absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2 bg-muted/60 px-4 text-muted-foreground text-xs">
					<SearchKbd>↵</SearchKbd>
					<span>Open</span>
					<Separator className="h-4" orientation="vertical" />
					<SearchKbd>⌘</SearchKbd>
					<SearchKbd>K</SearchKbd>
					<span>Search</span>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function SearchGroup({
	heading,
	items,
	onSelect,
}: {
	heading: string;
	items: RoundbitcnSearchItem[];
	onSelect: (href: string) => void;
}) {
	if (items.length === 0) {
		return null;
	}

	return (
		<CommandGroup heading={heading}>
			{items.map((item) => (
				<CommandItem
					key={item.href}
					keywords={[
						item.category,
						item.description ?? "",
						...(item.keywords ?? []),
					]}
					onSelect={() => onSelect(item.href)}
					value={`${item.category} ${item.title}`}
				>
					<PixelChevronRightIcon aria-hidden="true" />
					<span>{item.title}</span>
					{item.description ? (
						<span className="ml-auto hidden max-w-52 truncate text-muted-foreground text-xs lg:inline">
							{item.description}
						</span>
					) : null}
				</CommandItem>
			))}
		</CommandGroup>
	);
}

function SearchResults({
	locale,
	query,
	search,
	setOpen,
}: {
	locale: SupportedLocale;
	query: ReturnType<typeof useDocsSearch>["query"];
	search: string;
	setOpen: (open: boolean) => void;
}) {
	const router = useRouter();
	const uniqueResults = React.useMemo(() => {
		if (!query.data || query.data === "empty") {
			return [];
		}

		return query.data.filter((item, index, self) => {
			if (
				item.type === "text" &&
				item.content.trim().split(/\s+/).length <= 1
			) {
				return false;
			}

			return (
				index ===
				self.findIndex((candidate) => {
					return (
						candidate.content === item.content && candidate.url === item.url
					);
				})
			);
		});
	}, [query.data]);

	if (!search.trim() || uniqueResults.length === 0) {
		return null;
	}

	return (
		<CommandGroup heading="Search Results">
			{uniqueResults.map((item) => (
				<CommandItem
					data-type={item.type}
					key={item.id}
					keywords={[item.content, item.type, ...(item.breadcrumbs ?? [])]}
					onSelect={() => {
						router.push(getLocalizedPathname(locale, item.url));
						setOpen(false);
					}}
					value={`${item.content} ${item.type}`}
				>
					<span className="line-clamp-1">{item.content}</span>
					<SearchResultType type={item.type} />
				</CommandItem>
			))}
		</CommandGroup>
	);
}

function SearchResultType({ type }: { type: SortedResult["type"] }) {
	return (
		<span
			className={cn(
				"ml-auto text-muted-foreground text-xs capitalize",
				type === "page" && "text-foreground",
			)}
		>
			{type}
		</span>
	);
}

function SearchKbd({ className, ...props }: React.ComponentProps<"kbd">) {
	return (
		<kbd
			className={cn(
				"roundbit-sm roundbit-step inline-flex h-5 min-w-5 items-center justify-center bg-background px-1 font-mono text-[0.7rem] text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}
