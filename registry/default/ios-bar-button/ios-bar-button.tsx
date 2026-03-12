"use client";

import * as React from "react";

import { cn } from "~/lib/utils";

type IosBarButtonVariant = "default" | "accent" | "destructive";
type IosBarButtonLayout = "text" | "icon" | "text-icon";

const BAR_BUTTON_BACKGROUND: Record<IosBarButtonVariant, string> = {
	accent:
		"linear-gradient(180deg, rgb(147, 181, 246) 0%, rgb(103, 144, 225) 33%, rgb(60, 113, 218) 67%, rgb(37, 98, 217) 100%)",
	default:
		"linear-gradient(180deg, rgb(162, 178, 201) 0%, rgb(121, 142, 172) 33%, rgb(80, 109, 148) 67%, rgb(64, 95, 138) 100%)",
	destructive:
		"linear-gradient(180deg, rgb(219, 139, 146) 0%, rgb(195, 98, 106) 33%, rgb(178, 48, 59) 67%, rgb(176, 26, 39) 100%)",
};

export interface IosBarButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: React.ReactNode;
	label?: string;
	layout?: IosBarButtonLayout;
	trailingIcon?: React.ReactNode;
	variant?: IosBarButtonVariant;
}

const IosBarButton = React.forwardRef<HTMLButtonElement, IosBarButtonProps>(
	(
		{
			className,
			icon,
			label,
			layout = icon ? (label ? "text-icon" : "icon") : "text",
			style,
			trailingIcon,
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
					"relative inline-flex h-[29px] items-center justify-center overflow-hidden rounded-[5px] shadow-[0px_0.5px_0.5px_0px_rgba(255,255,255,0.4)] outline-none transition-transform duration-150 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50",
					layout === "text" && "min-w-[52px] px-[10px]",
					layout === "icon" && "min-w-[33px] px-[6px]",
					layout === "text-icon" &&
						"min-w-[50px] gap-[5px] pr-[15px] pl-[10px]",
					className,
				)}
				style={{
					...style,
					backgroundImage: BAR_BUTTON_BACKGROUND[variant],
					fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
				}}
				type={type}
				{...props}
			>
				{icon ? (
					<span className="relative z-[1] flex shrink-0 items-center justify-center text-white [filter:drop-shadow(0px_-1px_0px_rgba(0,0,0,0.4))] [&_svg]:size-[15px]">
						{icon}
					</span>
				) : null}
				{label ? (
					<span className="relative z-[1] min-w-[32px] whitespace-nowrap text-center font-bold text-[12px] text-white [text-shadow:0px_-1px_0px_rgba(0,0,0,0.4)]">
						{label}
					</span>
				) : null}
				{trailingIcon ? (
					<span className="relative z-[1] flex shrink-0 items-center justify-center text-white [filter:drop-shadow(0px_-1px_0px_rgba(0,0,0,0.4))] [&_svg]:size-[12px]">
						{trailingIcon}
					</span>
				) : null}
				<span
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_1px_0px_black,inset_0px_1px_0.5px_0px_rgba(0,0,0,0.4)]"
				/>
			</button>
		);
	},
);

IosBarButton.displayName = "IosBarButton";

export { IosBarButton };
