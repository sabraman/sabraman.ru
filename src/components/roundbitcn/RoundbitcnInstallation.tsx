"use client";

import * as React from "react";
import { toast } from "sonner";
import {
	PixelCheckIcon,
	PixelCopyIcon,
	PixelMenuIcon,
} from "~/components/roundbitcn-icons";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const packageManagers = ["pnpm", "npm", "yarn", "bun"] as const;

export function RoundbitcnInstallation({
	component = "roundbitcn",
}: {
	component?: string;
}) {
	const installName = component === "roundbitcn" ? "roundbitcn" : component;
	const sourcePath =
		component === "roundbitcn"
			? "components/roundbitcn.tsx"
			: `components/ui/${component}.tsx`;

	return (
		<div className="not-prose mt-6 w-full">
			<Tabs
				className="relative w-full *:data-[slot=tabs-list]:gap-6"
				defaultValue="cli"
			>
				<TabsList>
					<TabsTrigger value="cli">Command</TabsTrigger>
					<TabsTrigger value="manual">Manual</TabsTrigger>
				</TabsList>
				<TabsContent value="cli">
					<CommandBlock
						bun="bunx --bun shadcn@latest add @sabraman/roundbitcn"
						npm="npx shadcn@latest add @sabraman/roundbitcn"
						pnpm="pnpm dlx shadcn@latest add @sabraman/roundbitcn"
						yarn="yarn dlx shadcn@latest add @sabraman/roundbitcn"
					/>
				</TabsContent>
				<TabsContent value="manual">
					<Steps>
						<Step>
							Install the following dependencies:
							<CommandBlock
								bun="bun add radix-ui @sabraman/roundbit class-variance-authority clsx tailwind-merge"
								npm="npm install radix-ui @sabraman/roundbit class-variance-authority clsx tailwind-merge"
								pnpm="pnpm add radix-ui @sabraman/roundbit class-variance-authority clsx tailwind-merge"
								yarn="yarn add radix-ui @sabraman/roundbit class-variance-authority clsx tailwind-merge"
							/>
						</Step>
						<Step>
							Add the Roundbitcn registry item:
							<CommandBlock
								bun={`bunx --bun shadcn@latest add @sabraman/roundbitcn`}
								npm={`npx shadcn@latest add @sabraman/roundbitcn`}
								pnpm={`pnpm dlx shadcn@latest add @sabraman/roundbitcn`}
								yarn={`yarn dlx shadcn@latest add @sabraman/roundbitcn`}
							/>
						</Step>
						<Step>
							Copy the generated component into{" "}
							<code className="roundbit-sm roundbit-step bg-muted px-1.5 py-0.5 font-mono text-sm">
								{sourcePath}
							</code>{" "}
							and update imports for your project.
							<SourceBlock
								code={`// ${installName}\n// Installed by @sabraman/roundbitcn.\n// Uses roundbit-frame, roundbit-border, and roundbit-step by default.`}
								title={sourcePath}
							/>
						</Step>
					</Steps>
				</TabsContent>
			</Tabs>
		</div>
	);
}

function CommandBlock({
	bun,
	npm,
	pnpm,
	yarn,
}: {
	bun: string;
	npm: string;
	pnpm: string;
	yarn: string;
}) {
	const [packageManager, setPackageManager] =
		React.useState<PackageManager>("bun");
	const commands = React.useMemo(
		() => ({ bun, npm, pnpm, yarn }),
		[bun, npm, pnpm, yarn],
	);
	const value = commands[packageManager];

	return (
		<div className="roundbit-frame roundbit-lg roundbit-step roundbit-border roundbit-border-solid roundbit-border-border relative mt-4 w-full overflow-hidden bg-muted/35 text-foreground">
			<Tabs
				className="gap-0"
				onValueChange={(nextValue) =>
					setPackageManager(nextValue as PackageManager)
				}
				value={packageManager}
			>
				<div className="roundbit-border-b roundbit-border-solid roundbit-border-border flex items-center gap-3 px-4 py-2">
					<div className="roundbit-sm roundbit-step flex size-5 items-center justify-center bg-foreground text-background">
						<PixelMenuIcon aria-hidden="true" className="size-3" />
					</div>
					<TabsList className="h-8 bg-transparent p-0">
						{packageManagers.map((item) => (
							<TabsTrigger
								className="data-[state=active]:roundbit-border data-[state=active]:roundbit-border-solid data-[state=active]:roundbit-border-input h-7 border border-transparent bg-transparent px-3 shadow-none data-[state=active]:bg-background"
								key={item}
								value={item}
							>
								{item}
							</TabsTrigger>
						))}
					</TabsList>
				</div>
				<div className="no-scrollbar overflow-x-auto">
					{Object.entries(commands).map(([key, command]) => (
						<TabsContent className="mt-0 px-4 py-4" key={key} value={key}>
							<pre>
								<code
									className="relative font-mono text-muted-foreground text-sm leading-6"
									data-language="bash"
								>
									{command}
								</code>
							</pre>
						</TabsContent>
					))}
				</div>
			</Tabs>
			<CopyButton value={value} />
		</div>
	);
}

function SourceBlock({ code, title }: { code: string; title: string }) {
	return (
		<div className="roundbit-frame roundbit-lg roundbit-step roundbit-border roundbit-border-solid roundbit-border-border relative mt-4 w-full overflow-hidden bg-muted/35 text-foreground">
			<div className="roundbit-border-b roundbit-border-solid roundbit-border-border flex h-12 items-center gap-2 px-4 text-muted-foreground text-sm">
				<span className="roundbit-sm roundbit-step bg-foreground px-1.5 py-0.5 font-bold text-background text-xs">
					TS
				</span>
				<span className="font-mono">{title}</span>
			</div>
			<CopyButton value={code} />
			<pre className="no-scrollbar max-h-96 overflow-x-auto p-4 font-mono text-sm leading-6">
				<code>{code}</code>
			</pre>
		</div>
	);
}

function CopyButton({ value }: { value: string }) {
	const [copied, setCopied] = React.useState(false);

	return (
		<Button
			aria-label="Copy"
			className="absolute top-3 right-3 z-10 size-8 p-0 shadow-none"
			onClick={async () => {
				await navigator.clipboard.writeText(value);
				setCopied(true);
				toast.success("Copied");
				window.setTimeout(() => setCopied(false), 1200);
			}}
			size="icon"
			type="button"
			variant="ghost"
		>
			{copied ? (
				<PixelCheckIcon aria-hidden="true" />
			) : (
				<PixelCopyIcon aria-hidden="true" />
			)}
		</Button>
	);
}

function Steps({ children }: { children: React.ReactNode }) {
	const items = React.Children.toArray(children);

	return (
		<div className="grid gap-8 pt-2">
			{items.map((child, index) =>
				React.isValidElement<{ isLast?: boolean; step?: number }>(child)
					? React.cloneElement(child, {
							isLast: index === items.length - 1,
							step: index + 1,
						})
					: child,
			)}
		</div>
	);
}

function Step({
	children,
	isLast = false,
	step = 1,
}: {
	children: React.ReactNode;
	isLast?: boolean;
	step?: number;
}) {
	return (
		<div className="grid grid-cols-[3rem_1fr] gap-4 text-foreground">
			<div className="relative flex justify-center">
				<div className="roundbit-full roundbit-step flex size-9 items-center justify-center bg-muted font-mono text-lg">
					{step}
				</div>
				{isLast ? null : (
					<div className="absolute top-11 bottom-[-2rem] w-px bg-border" />
				)}
			</div>
			<div className="min-w-0 pt-1 font-medium text-lg leading-7">
				{children}
			</div>
		</div>
	);
}
