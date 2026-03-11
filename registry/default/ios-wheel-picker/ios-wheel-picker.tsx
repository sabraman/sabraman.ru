import "@ncdai/react-wheel-picker/style.css";

import * as WheelPickerPrimitive from "@ncdai/react-wheel-picker";
import type * as React from "react";

import { cn } from "~/lib/utils";

type WheelPickerValue = WheelPickerPrimitive.WheelPickerValue;

type WheelPickerOption<T extends WheelPickerValue = string> =
	WheelPickerPrimitive.WheelPickerOption<T>;

interface IosPickerContainerProps {
	children: React.ReactNode;
	className?: string;
	width?: number | string;
}

export function IosPickerContainer({
	children,
	className,
	width = 176,
}: IosPickerContainerProps) {
	return (
		<div
			className={cn(
				"relative isolate flex h-[216px] flex-col items-center justify-center bg-[#20212f] px-[12px] py-[10px]",
				className,
			)}
		>
			<div
				className="relative z-[2] flex min-h-px min-w-px items-start overflow-clip rounded-[5px] bg-black shadow-[0px_1px_0.5px_0px_rgba(255,255,255,0.2)]"
				style={{ width }}
			>
				<div
					className="pointer-events-none absolute right-0 left-0 z-[4] h-[44px] -translate-y-1/2 shadow-[0px_3px_5px_0px_rgba(0,0,0,0.3)]"
					style={{ top: "calc(50% + 13.5px)" }}
				>
					<div aria-hidden="true" className="absolute inset-0">
						<div className="absolute inset-0 bg-[rgba(85,92,153,0.5)] mix-blend-multiply" />
						<div
							className="absolute inset-0"
							style={{
								backgroundImage:
									"linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 100%)",
							}}
						/>
					</div>
					<div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_0.5px_0px_0px_rgba(0,0,0,0.1),inset_0px_1px_0px_0px_rgba(0,0,0,0.6),inset_0px_2px_0px_0px_rgba(255,255,255,0.1),inset_0px_-0.5px_0px_0px_rgba(0,0,0,0.1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.3)]" />
				</div>

				{children}

				<div className="pointer-events-none absolute inset-0 z-[5] rounded-[inherit] shadow-[inset_0px_15px_10px_-10px_rgba(0,0,0,0.6),inset_0px_50px_30px_-30px_rgba(0,0,0,0.4),inset_0px_-15px_10px_-10px_rgba(0,0,0,0.6),inset_0px_-50px_30px_-30px_rgba(0,0,0,0.4)]" />
			</div>

			<div
				className="pointer-events-none absolute inset-0 z-[1] mix-blend-plus-lighter"
				style={{
					backgroundImage:
						"linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.05) 100%)",
				}}
			/>
			<div className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(0,0,0,0.6),inset_0px_1.5px_0px_0px_rgba(255,255,255,0.4),inset_0px_2px_0px_0px_rgba(255,255,255,0.2)]" />
		</div>
	);
}

export interface IosPickerColumnProps<T extends string | number> {
	align?: "left" | "center" | "right";
	className?: string;
	fontSize?: number;
	infinite?: boolean;
	onValueChange: (value: T) => void;
	options: WheelPickerOption<T>[];
	padX?: number;
	value: T;
	width?: string | number;
	zIndex?: number;
}

export function IosPickerColumn<T extends string | number>({
	align = "center",
	className,
	fontSize = 25,
	infinite = true,
	onValueChange,
	options,
	padX = 15,
	value,
	width = 60,
	zIndex,
}: IosPickerColumnProps<T>) {
	return (
		<div
			data-ios-picker-column=""
			className={cn(
				"relative h-[216px] shrink-0 overflow-clip bg-[#fcfcfc]",
				className,
			)}
			style={
				{
					width,
					zIndex,
					"--ios-picker-column-padding-x": `${padX}px`,
				} as React.CSSProperties
			}
		>
			<WheelPickerPrimitive.WheelPickerWrapper className="flex h-full w-full items-center justify-center border-0 bg-transparent shadow-none *:data-rwp:last:*:data-rwp-highlight-wrapper:rounded-none *:data-rwp:first:*:data-rwp-highlight-wrapper:rounded-none">
				<WheelPickerPrimitive.WheelPicker
					classNames={{
						highlightItem: cn(
							"flex h-[44px] items-center font-['Helvetica_Neue:Bold',sans-serif] font-bold text-black",
							align === "center" && "justify-center",
							align === "left" && "justify-start text-left",
							align === "right" && "justify-end text-right",
							fontSize === 20 ? "text-[20px]" : "text-[25px]",
						),
						highlightWrapper:
							"h-[44px] border-transparent bg-[rgba(252,252,252,0.92)] ring-0",
						optionItem: cn(
							"flex h-[44px] items-center font-['Helvetica_Neue:Bold',sans-serif] font-bold text-[#666]",
							align === "center" && "justify-center",
							align === "left" && "justify-start text-left",
							align === "right" && "justify-end text-right",
							fontSize === 20 ? "text-[20px]" : "text-[25px]",
						),
					}}
					infinite={infinite}
					onValueChange={onValueChange}
					optionItemHeight={44}
					options={options}
					value={value}
					visibleCount={16}
				/>
				<style>{`
          [data-ios-picker-column] [data-rwp-item] {
            padding-left: var(--ios-picker-column-padding-x);
            padding-right: var(--ios-picker-column-padding-x);
          }
        `}</style>
			</WheelPickerPrimitive.WheelPickerWrapper>

			<div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_1px_0px_0px_0px_black,inset_4px_0px_0px_0px_#c8cadc,inset_-1px_0px_0px_0px_black,inset_-4px_0px_0px_0px_#c8cadc]" />
		</div>
	);
}

export type { WheelPickerOption };
