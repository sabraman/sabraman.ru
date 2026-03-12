import "@ncdai/react-wheel-picker/style.css";

import * as WheelPickerPrimitive from "@ncdai/react-wheel-picker";
import type * as React from "react";

import { cn } from "~/lib/utils";

type WheelPickerValue = WheelPickerPrimitive.WheelPickerValue;

type WheelPickerOption<T extends WheelPickerValue = string> =
	WheelPickerPrimitive.WheelPickerOption<T>;

const FRAME_HEIGHT = 216;
const FRAME_PADDING_Y = 10;
const PICKER_ROW_HEIGHT = 44;
const PICKER_VISIBLE_COUNT = 16;
const PICKER_ANGLE = (360 / PICKER_VISIBLE_COUNT) * (Math.PI / 180);
const PICKER_HEIGHT = Math.round(
	(PICKER_ROW_HEIGHT / Math.tan(PICKER_ANGLE)) * 2 + PICKER_ROW_HEIGHT * 0.25,
);
// `@ncdai/react-wheel-picker` centers a 223px cylinder inside our 196px viewport.
const PICKER_OFFSET_Y =
	(PICKER_HEIGHT - (FRAME_HEIGHT - FRAME_PADDING_Y * 2)) / 2;

interface IosPickerContainerProps {
	children: React.ReactNode;
	className?: string;
	frameWidth?: number | string;
	width?: number | string;
}

export function IosPickerContainer({
	children,
	className,
	frameWidth = "100%",
	width = "100%",
}: IosPickerContainerProps) {
	return (
		<div
			data-ios-picker-root=""
			className={cn(
				"relative isolate flex h-[216px] w-full max-w-[320px] flex-col items-center justify-center bg-[#20212f] px-[12px] py-[10px] rounded-xl",
				className,
			)}
			style={frameWidth !== "100%" ? { width: frameWidth } : undefined}
		>
			<div
				data-ios-picker-content=""
				className="relative z-[2] flex min-h-px min-w-px w-full max-w-full flex-1 items-start overflow-clip rounded-[5px] bg-[#fcfcfc] shadow-[0px_1px_0.5px_0px_rgba(255,255,255,0.2)]"
				style={width !== "100%" ? { width } : undefined}
			>
				<div
					data-ios-picker-gloss=""
					className="pointer-events-none absolute top-1/2 right-0 left-0 z-[4] h-[44px] -translate-y-1/2 shadow-[0px_3px_5px_0px_rgba(0,0,0,0.3)]"
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
	width,
	zIndex,
}: IosPickerColumnProps<T>) {
	return (
		<div
			data-ios-picker-column=""
			className={cn(
				"relative h-full overflow-clip bg-[#fcfcfc]",
				width === undefined ? "flex-1 flex-shrink" : "shrink-0",
				className,
			)}
			style={
				{
					width,
					zIndex,
					"--ios-picker-offset-y": `-${PICKER_OFFSET_Y}px`,
					"--ios-picker-column-padding-x": `${padX}px`,
				} as React.CSSProperties
			}
		>
			<WheelPickerPrimitive.WheelPickerWrapper className="flex h-full w-full items-center justify-center border-0 bg-transparent shadow-none *:data-rwp:last:*:data-rwp-highlight-wrapper:rounded-none *:data-rwp:first:*:data-rwp-highlight-wrapper:rounded-none">
				<WheelPickerPrimitive.WheelPicker
					classNames={{
						highlightItem: cn(
							"flex h-[44px] w-full items-center font-['Helvetica_Neue:Bold',sans-serif] font-bold text-black whitespace-nowrap",
							align === "center" && "justify-center",
							align === "left" && "justify-start text-left",
							align === "right" && "justify-end text-right",
							fontSize === 20 ? "text-[20px]" : "text-[25px]",
						),
						highlightWrapper:
							"h-[44px] border-transparent bg-[rgba(252,252,252,0.92)] ring-0",
						optionItem: cn(
							"flex h-[44px] w-full items-center font-['Helvetica_Neue:Bold',sans-serif] font-bold text-[#666] whitespace-nowrap",
							align === "center" && "justify-center",
							align === "left" && "justify-start text-left",
							align === "right" && "justify-end text-right",
							fontSize === 20 ? "text-[20px]" : "text-[25px]",
						),
					}}
					infinite={infinite}
					onValueChange={onValueChange}
					optionItemHeight={PICKER_ROW_HEIGHT}
					options={options}
					value={value}
					visibleCount={PICKER_VISIBLE_COUNT}
				/>
				<style>{`
          [data-ios-picker-column] [data-rwp] {
            transform: translateY(var(--ios-picker-offset-y));
          }

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
