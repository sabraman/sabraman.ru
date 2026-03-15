"use client";

import { CheckIcon, CircleXIcon, CopyIcon } from "lucide-react";
import * as React from "react";

import { LegacyBarButton } from "~/components/legacy-bar-button";
import {
	PackageManagerIcon,
	usePreferredPackageManager,
} from "~/components/legacy-code-block-command";
import {
	LegacySegmentedControl,
	type LegacySegmentedControlItem,
} from "~/components/legacy-segmented-control";
import {
	LegacyAlertDialog,
	LegacyAlertDialogButton,
	LegacyAlertDialogClose,
	LegacyAlertDialogContent,
	LegacyAlertDialogDescription,
	LegacyAlertDialogFooter,
	LegacyAlertDialogHeader,
	LegacyAlertDialogTitle,
} from "./LegacyAlertDialog";

const PACKAGE_MANAGERS = ["bun", "npm", "pnpm", "yarn"] as const;
const COPY_STATE_RESET_MS = 1800;

type PackageManager = (typeof PACKAGE_MANAGERS)[number];
type CopyState = "idle" | "done" | "error";

const SEGMENT_ITEMS: LegacySegmentedControlItem<PackageManager>[] =
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

export function LegacyRegistryAddDialog({
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
		<LegacyAlertDialog onOpenChange={onOpenChange} open={open}>
			<LegacyAlertDialogContent className="w-[min(92vw,34rem)] sm:w-[min(88vw,35rem)]">
				<LegacyAlertDialogHeader className="items-center gap-2 text-center">
					<LegacyAlertDialogTitle className="text-[22px] sm:text-[24px]">
						Add Registry
					</LegacyAlertDialogTitle>
					<LegacyAlertDialogDescription className="max-w-[28rem] text-center text-[15px] leading-[21px] sm:text-[16px]">
						Run this command to add <span className="font-bold">@sabraman</span>{" "}
						to your project.
					</LegacyAlertDialogDescription>
				</LegacyAlertDialogHeader>

				<div className="mt-4 px-1">
					<div className="mt-4 overflow-hidden rounded-[6px] border border-[rgba(255,255,255,0.12)] bg-[rgba(3,8,24,0.2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
						<div className="border-white/8 border-b px-3 py-2">
							<div className="flex items-center justify-between gap-3">
								<div className="flex min-w-0 items-center gap-3">
									<div className="flex w-[18px] shrink-0 items-center text-[#dbeaff] [filter:drop-shadow(0px_-1px_0px_rgba(0,0,0,0.45))] [&_svg]:size-[16px]">
										<PackageManagerIcon packageManager={packageManager} />
									</div>
									<LegacySegmentedControl
										items={SEGMENT_ITEMS}
										onValueChange={setPackageManager}
										value={packageManager}
									/>
								</div>
								<LegacyBarButton
									aria-label="Copy registry add command"
									className="shrink-0"
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
						</div>
						<div className="px-3 py-3">
							<code className="block font-mono text-[#d7deed] text-[14px] leading-[1.55] break-all sm:text-[15px]">
								<span className="select-none text-[#9ea8c1]">$ </span>
								{activeCommand}
							</code>
						</div>
					</div>
				</div>

				<LegacyAlertDialogFooter>
					<LegacyAlertDialogClose asChild>
						<LegacyAlertDialogButton
							className="min-w-0 w-full"
							variant="primary"
						>
							Done
						</LegacyAlertDialogButton>
					</LegacyAlertDialogClose>
				</LegacyAlertDialogFooter>
			</LegacyAlertDialogContent>
		</LegacyAlertDialog>
	);
}
