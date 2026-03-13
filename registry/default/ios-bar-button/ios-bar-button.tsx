"use client";

import * as React from "react";

import { cn } from "~/lib/utils";

type IosBarButtonVariant = "default" | "accent" | "destructive";
type IosBarButtonLayout = "text" | "icon" | "text-icon" | "backward";

const BAR_BUTTON_GRADIENT_STOPS: Record<IosBarButtonVariant, string[]> = {
	accent: ["#93B5F6", "#6790E1", "#3C71DA", "#2562D9"],
	default: ["#A2B2C9", "#798EAC", "#506D94", "#405F8A"],
	destructive: ["#DB8B92", "#C3626A", "#B2303B", "#B01A27"],
};

function getBarButtonBackground(variant: IosBarButtonVariant) {
	const [start, second, third, end] = BAR_BUTTON_GRADIENT_STOPS[variant];

	return `linear-gradient(180deg, ${start} 0%, ${second} 33%, ${third} 67%, ${end} 100%)`;
}

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
			layout,
			style,
			trailingIcon,
			type = "button",
			variant = "default",
			...props
		},
		ref,
	) => {
		const backgroundImage = getBarButtonBackground(variant);
		const resolvedLayout =
			layout ??
			(icon || trailingIcon ? (label ? "text-icon" : "icon") : "text");
		const labelNode = label ? (
			<div className="relative z-[1] flex min-w-[32px] shrink-0 flex-col justify-center whitespace-nowrap text-center font-bold text-[12px] text-white leading-[0] [text-shadow:0px_-1px_0px_rgba(0,0,0,0.4)]">
				<p className="leading-[normal]">{label}</p>
			</div>
		) : null;

		if (resolvedLayout === "backward") {
			return (
				<button
					ref={ref}
					className={cn(
						"relative inline-flex h-[29px] items-center justify-center pr-[8px] pl-[18px] outline-none transition-transform duration-150 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50",
						className,
					)}
					style={{
						...style,
						fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
					}}
					type={type}
					{...props}
				>
					<span
						aria-hidden="true"
						className="absolute inset-y-0 left-0 w-[18px] bg-white shadow-[0_0.5px_0.5px_rgba(255,255,255,0.4),0_1px_1.5px_rgba(0,0,0,0.2)] [clip-path:polygon(0_50%,100%_0,100%_100%)]"
					/>
					<span
						aria-hidden="true"
						className="absolute inset-y-[1px] left-[1px] w-[16px] [clip-path:polygon(0_50%,100%_0,100%_100%)]"
						style={{ backgroundImage }}
					/>
					<span
						aria-hidden="true"
						className="absolute inset-y-0 right-0 left-[10px] rounded-r-[5px] bg-white shadow-[0_0.5px_0.5px_rgba(255,255,255,0.4),0_1px_1.5px_rgba(0,0,0,0.2)]"
					/>
					<span
						aria-hidden="true"
						className="absolute inset-y-[1px] right-[1px] left-[11px] rounded-r-[4px]"
						style={{ backgroundImage }}
					/>
					<span
						aria-hidden="true"
						className="absolute top-[1px] right-[1px] left-[11px] h-[11px] rounded-tr-[4px] bg-gradient-to-b from-white/32 via-white/10 to-transparent"
					/>
					<span
						aria-hidden="true"
						className="absolute top-[1px] left-[1px] h-[11px] w-[16px] bg-gradient-to-b from-white/16 to-transparent [clip-path:polygon(0_50%,100%_0,100%_100%)]"
					/>
					<span className="relative z-[1] flex h-full items-center justify-center">
						{labelNode}
					</span>
					<span
						aria-hidden="true"
						className="pointer-events-none absolute inset-x-[14px] bottom-0 h-px bg-black/18"
					/>
				</button>
			);
		}

		return (
			<button
				ref={ref}
				className={cn(
					"relative inline-flex h-[29px] items-center justify-center overflow-hidden rounded-[5px] shadow-[0px_0.5px_0.5px_0px_rgba(255,255,255,0.4)] outline-none transition-transform duration-150 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50",
					resolvedLayout === "text" && "min-w-[52px] px-[10px]",
					resolvedLayout === "icon" && "min-w-[33px] px-[6px]",
					resolvedLayout === "text-icon" &&
						"min-w-[50px] gap-[5px] pr-[15px] pl-[10px]",
					className,
				)}
				style={{
					...style,
					backgroundImage,
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
				{labelNode}
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
