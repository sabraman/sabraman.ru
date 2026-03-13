"use client";

import { XIcon } from "lucide-react";
import * as React from "react";
import { cn } from "~/lib/utils";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

const IOS_ALERT_BUTTON_BACKGROUNDS = {
	default:
		"linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0.04) 50.01%, rgba(255,255,255,0.08) 100%)",
	primary:
		"linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.36) 50.004%, rgba(255,255,255,0.24) 50.014%, rgba(255,255,255,0.36) 100%)",
} as const;

type IosAlertDialogButtonVariant = keyof typeof IOS_ALERT_BUTTON_BACKGROUNDS;

const IOS_SANS_STYLE = {
	fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
} as const;

export type IosAlertDialogProps = React.ComponentProps<typeof Dialog>;

export interface IosAlertDialogContentProps
	extends React.ComponentProps<typeof DialogContent> {
	showCloseButton?: boolean;
}

export interface IosAlertDialogPanelProps
	extends React.HTMLAttributes<HTMLDivElement> {
	showCloseButton?: boolean;
}

export type IosAlertDialogHeaderProps = React.ComponentProps<"div">;
export type IosAlertDialogTitleProps = React.ComponentProps<typeof DialogTitle>;
export type IosAlertDialogDescriptionProps = React.ComponentProps<
	typeof DialogDescription
>;
export type IosAlertDialogFooterProps = React.ComponentProps<"div">;

export interface IosAlertDialogButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: IosAlertDialogButtonVariant;
}

function IosAlertDialog(props: IosAlertDialogProps) {
	return <Dialog {...props} />;
}

const IosAlertDialogPanel = React.forwardRef<
	HTMLDivElement,
	IosAlertDialogPanelProps
>(({ children, className, showCloseButton = false, style, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				"relative overflow-hidden rounded-[10px] border-[2px] border-[rgba(255,255,255,0.72)] bg-[rgba(8,26,80,0.82)] px-[8px] pt-[14px] pb-[9px] shadow-[0_0_0.5px_1px_rgba(0,0,0,0.4),0_4px_5px_rgba(0,0,0,0.5)]",
				className,
			)}
			style={{ ...IOS_SANS_STYLE, ...style }}
			{...props}
		>
			<div className="pointer-events-none absolute inset-x-[-2px] top-[-2px] h-[29px] bg-[radial-gradient(135%_88%_at_50%_-12%,rgba(249,251,255,0.95)_0%,rgba(196,205,226,0.64)_38%,rgba(94,110,149,0.28)_63%,rgba(8,26,80,0)_88%)]" />
			<div className="pointer-events-none absolute inset-x-[2px] top-[1px] h-px bg-white/26" />
			<div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(0,0,0,0.24)]" />

			{showCloseButton ? (
				<DialogClose asChild>
					<button
						aria-label="Close dialog"
						className="absolute top-3 right-3 z-[1] inline-flex size-8 items-center justify-center rounded-full text-white/86 transition hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
						type="button"
					>
						<XIcon className="size-5" strokeWidth={2.15} />
					</button>
				</DialogClose>
			) : null}

			<div className="relative z-[1]">{children}</div>
		</div>
	);
});

IosAlertDialogPanel.displayName = "IosAlertDialogPanel";

function IosAlertDialogContent({
	children,
	className,
	showCloseButton = false,
	...props
}: IosAlertDialogContentProps) {
	return (
		<DialogContent
			className={cn(
				"w-[min(92vw,17.25rem)] max-w-none border-none bg-transparent p-0 shadow-none sm:max-w-none",
				className,
			)}
			showCloseButton={false}
			{...props}
		>
			<IosAlertDialogPanel showCloseButton={showCloseButton}>
				{children}
			</IosAlertDialogPanel>
		</DialogContent>
	);
}

function IosAlertDialogHeader({
	className,
	...props
}: IosAlertDialogHeaderProps) {
	return (
		<DialogHeader
			className={cn("gap-[8px] text-center sm:text-left", className)}
			{...props}
		/>
	);
}

function IosAlertDialogTitle({
	className,
	...props
}: IosAlertDialogTitleProps) {
	return (
		<DialogTitle
			className={cn(
				"font-bold text-[18px] text-white leading-none [text-shadow:0px_-1px_0px_rgba(0,0,0,0.8)]",
				className,
			)}
			style={IOS_SANS_STYLE}
			{...props}
		/>
	);
}

function IosAlertDialogDescription({
	className,
	...props
}: IosAlertDialogDescriptionProps) {
	return (
		<DialogDescription
			className={cn(
				"text-[16px] text-white leading-[20px] [text-shadow:0px_-1px_0px_rgba(0,0,0,0.8)]",
				className,
			)}
			style={IOS_SANS_STYLE}
			{...props}
		/>
	);
}

function IosAlertDialogFooter({
	className,
	...props
}: IosAlertDialogFooterProps) {
	return (
		<DialogFooter
			className={cn("mt-[18px] flex-row gap-[10px]", className)}
			{...props}
		/>
	);
}

const IosAlertDialogButton = React.forwardRef<
	HTMLButtonElement,
	IosAlertDialogButtonProps
>(
	(
		{
			children,
			className,
			style,
			type = "button",
			variant = "default",
			...props
		},
		ref,
	) => {
		return (
			<button
				ref={ref}
				className={cn(
					"relative inline-flex min-h-[40px] min-w-[108px] items-center justify-center overflow-hidden rounded-[5px] border border-[rgba(0,0,0,0.4)] px-[8px] pt-[8px] pb-[10px] shadow-[0px_0.5px_0.5px_0px_rgba(255,255,255,0.2)] outline-none transition-transform duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
					className,
				)}
				style={{
					...IOS_SANS_STYLE,
					...style,
					backgroundImage: IOS_ALERT_BUTTON_BACKGROUNDS[variant],
				}}
				type={type}
				{...props}
			>
				<span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/16 to-transparent" />
				<span className="relative z-[1] font-bold text-[18px] text-white leading-[22px] [text-shadow:0px_-1px_0px_rgba(0,0,0,0.8)]">
					{children}
				</span>
			</button>
		);
	},
);

IosAlertDialogButton.displayName = "IosAlertDialogButton";

export {
	DialogClose as IosAlertDialogClose,
	IosAlertDialog,
	IosAlertDialogButton,
	IosAlertDialogContent,
	IosAlertDialogDescription,
	IosAlertDialogFooter,
	IosAlertDialogHeader,
	IosAlertDialogPanel,
	IosAlertDialogTitle,
	DialogTrigger as IosAlertDialogTrigger,
};
