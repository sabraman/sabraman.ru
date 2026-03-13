"use client";

import { CheckIcon, CircleXIcon, CopyIcon } from "lucide-react";
import * as React from "react";

import { IosBarButton } from "~/components/ios-bar-button";
import {
	PackageManagerIcon,
	usePreferredPackageManager,
} from "~/components/ios-code-block-command";
import {
	IosSegmentedControl,
	type IosSegmentedControlItem,
} from "~/components/ios-segmented-control";
import {
	IosAlertDialog,
	IosAlertDialogButton,
	IosAlertDialogClose,
	IosAlertDialogContent,
	IosAlertDialogDescription,
	IosAlertDialogFooter,
	IosAlertDialogHeader,
	IosAlertDialogTitle,
} from "./IosAlertDialog";

const PACKAGE_MANAGERS = ["bun", "npm", "pnpm", "yarn"] as const;
const COPY_STATE_RESET_MS = 1800;

type PackageManager = (typeof PACKAGE_MANAGERS)[number];
type CopyState = "idle" | "done" | "error";

const SEGMENT_ITEMS: IosSegmentedControlItem<PackageManager>[] =
	PACKAGE_MANAGERS.map((packageManager) => ({
		label: packageManager,
		value: packageManager,
		width: packageManager === "pnpm" ? 58 : 52,
	}));

function getRegistryAddCommand(packageManager: PackageManager) {
	switch (packageManager) {
		case "pnpm":
			return "pnpm dlx shadcn@latest registry add @sabraman";
		case "yarn":
			return "yarn dlx shadcn@latest registry add @sabraman";
		case "npm":
			return "npx shadcn@latest registry add @sabraman";
		default:
			return "bunx --bun shadcn@latest registry add @sabraman";
	}
}

export function IosRegistryAddDialog({
	open,
	onOpenChange,
}: {
	onOpenChange: (open: boolean) => void;
	open: boolean;
}) {
	const [packageManager, setPackageManager] = usePreferredPackageManager("bun");
	const [copyState, setCopyState] = React.useState<CopyState>("idle");

	const activeCommand = React.useMemo(() => {
		return getRegistryAddCommand(packageManager);
	}, [packageManager]);

	React.useEffect(() => {
		if (copyState === "idle") {
			return;
		}

		const timeout = window.setTimeout(() => {
			setCopyState("idle");
		}, COPY_STATE_RESET_MS);

		return () => {
			window.clearTimeout(timeout);
		};
	}, [copyState]);

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(activeCommand);
			setCopyState("done");
		} catch {
			setCopyState("error");
		}
	}

	return (
		<IosAlertDialog onOpenChange={onOpenChange} open={open}>
			<IosAlertDialogContent
				className="w-[min(92vw,64rem)]"
				showCloseButton={true}
			>
				<IosAlertDialogHeader className="items-start gap-3">
					<IosAlertDialogTitle className="text-[20px] sm:text-[22px]">
						Add Registry
					</IosAlertDialogTitle>
					<IosAlertDialogDescription className="max-w-3xl text-left text-[16px] sm:text-[17px]">
						Run this command to add{" "}
						<span className="underline underline-offset-4">@sabraman</span> to
						your project.
					</IosAlertDialogDescription>
				</IosAlertDialogHeader>

				<div className="mt-5 rounded-[18px] border border-[rgba(255,255,255,0.12)] bg-[linear-gradient(180deg,rgba(25,27,38,0.82)_0%,rgba(13,15,23,0.92)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_30px_rgba(0,0,0,0.24)]">
					<div className="flex flex-col gap-3 border-white/10 border-b px-4 py-4 md:flex-row md:items-center md:justify-between">
						<div className="flex items-center gap-3">
							<div className="flex w-[20px] shrink-0 items-center text-[#dbeaff] [filter:drop-shadow(0px_-1px_0px_rgba(0,0,0,0.45))] [&_svg]:size-[18px]">
								<PackageManagerIcon packageManager={packageManager} />
							</div>
							<IosSegmentedControl
								items={SEGMENT_ITEMS}
								onValueChange={setPackageManager}
								value={packageManager}
							/>
						</div>

						<IosBarButton
							aria-label="Copy registry add command"
							icon={
								copyState === "done" ? (
									<CheckIcon strokeWidth={3} />
								) : copyState === "error" ? (
									<CircleXIcon />
								) : (
									<CopyIcon />
								)
							}
							layout="icon"
							onClick={handleCopy}
						/>
					</div>

					<div className="relative overflow-hidden px-5 py-6">
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-0 opacity-[0.14]"
							style={{
								backgroundImage:
									"repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 2px, transparent 2px, transparent 12px)",
							}}
						/>
						<div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),inset_0_-18px_28px_rgba(0,0,0,0.32)]" />

						<div className="relative z-[1] overflow-x-auto">
							<code className="flex min-w-max flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[#d6dce9] text-[clamp(1rem,1.8vw,1.65rem)] leading-[1.45]">
								<span className="select-none text-[#8f9cb8]">$</span>
								<span className="whitespace-pre">{activeCommand}</span>
							</code>
						</div>
					</div>
				</div>

				<IosAlertDialogFooter className="mt-6 justify-end">
					<IosAlertDialogClose asChild>
						<IosAlertDialogButton variant="primary">Done</IosAlertDialogButton>
					</IosAlertDialogClose>
				</IosAlertDialogFooter>
			</IosAlertDialogContent>
		</IosAlertDialog>
	);
}
