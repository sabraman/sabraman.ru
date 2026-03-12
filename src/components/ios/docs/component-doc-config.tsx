import type { ReactNode } from "react";
import {
	IOS_WHEEL_PICKER_INSTALL_COMMANDS,
	IOS_WHEEL_PICKER_URLS,
} from "~/components/ios/component-pages-content";
import type { ComponentDocSlug } from "~/components/ios/docs/component-doc-paths";
import { IosBasicPickerDemo } from "~/components/ios/examples/IosBasicPickerDemo";
import { IosHookFormDemo } from "~/components/ios/examples/IosHookFormDemo";
import { IosTimePickerExample } from "~/components/ios/examples/IosTimePickerExample";
import { IosClockDemo } from "~/components/ios/IosClockDemo";
import { IosCodeBlockCommandDemo } from "~/components/ios/IosCodeBlockCommandDemo";
import { IosSliderDemo } from "~/components/ios/IosSliderDemo";
import { IosSwitchDemo } from "~/components/ios/IosSwitchDemo";
import { IosWheelPickerDemo } from "~/components/ios/IosWheelPickerDemo";
import {
	IOS_CLOCK_INSTALL_COMMANDS,
	IOS_CLOCK_URLS,
} from "~/components/ios/ios-clock-content";
import {
	IOS_CODE_BLOCK_COMMAND_INSTALL_COMMANDS,
	IOS_CODE_BLOCK_COMMAND_URLS,
} from "~/components/ios/ios-code-block-command-content";
import {
	IOS_SLIDER_INSTALL_COMMANDS,
	IOS_SLIDER_URLS,
} from "~/components/ios/ios-slider-content";
import {
	IOS_SWITCH_INSTALL_COMMANDS,
	IOS_SWITCH_URLS,
} from "~/components/ios/ios-switch-content";
import type { PackageManager } from "~/components/ios-code-block-command";
import { IosSwitch } from "~/components/ios-switch";

type InstallCommandSet = Partial<Record<PackageManager, string>>;

export interface ComponentDocConfig {
	installCommands: InstallCommandSet;
	registryDirectUrl: string;
	registryIndexUrl: string;
	renderHeroPreview: () => ReactNode;
}

export const COMPONENT_DOC_CONFIG = {
	"ios-code-block-command": {
		installCommands: IOS_CODE_BLOCK_COMMAND_INSTALL_COMMANDS,
		registryDirectUrl: IOS_CODE_BLOCK_COMMAND_URLS.direct,
		registryIndexUrl: IOS_CODE_BLOCK_COMMAND_URLS.registry,
		renderHeroPreview: () => (
			<div className="relative flex justify-center">
				<IosCodeBlockCommandDemo />
			</div>
		),
	},
	"ios-clock": {
		installCommands: IOS_CLOCK_INSTALL_COMMANDS,
		registryDirectUrl: IOS_CLOCK_URLS.direct,
		registryIndexUrl: IOS_CLOCK_URLS.registry,
		renderHeroPreview: () => (
			<div className="relative flex justify-center">
				<IosClockDemo />
			</div>
		),
	},
	"ios-slider": {
		installCommands: IOS_SLIDER_INSTALL_COMMANDS,
		registryDirectUrl: IOS_SLIDER_URLS.direct,
		registryIndexUrl: IOS_SLIDER_URLS.registry,
		renderHeroPreview: () => (
			<div className="relative flex justify-center">
				<IosSliderDemo />
			</div>
		),
	},
	"ios-switch": {
		installCommands: IOS_SWITCH_INSTALL_COMMANDS,
		registryDirectUrl: IOS_SWITCH_URLS.direct,
		registryIndexUrl: IOS_SWITCH_URLS.registry,
		renderHeroPreview: () => (
			<div className="relative flex justify-center">
				<IosSwitchDemo />
			</div>
		),
	},
	"ios-wheel-picker": {
		installCommands: IOS_WHEEL_PICKER_INSTALL_COMMANDS,
		registryDirectUrl: IOS_WHEEL_PICKER_URLS.direct,
		registryIndexUrl: IOS_WHEEL_PICKER_URLS.registry,
		renderHeroPreview: () => (
			<div className="flex flex-col items-center justify-center gap-6">
				<div className="relative w-full max-w-[360px] rounded-[32px] border-[rgba(0,0,0,0.8)] border-[rgba(255,255,255,0.15)] border-t border-b bg-[linear-gradient(180deg,#3b465c,#192135)] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(0,0,0,0.5)]">
					<div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[32px] bg-gradient-to-b from-white/10 to-transparent" />
					<IosWheelPickerDemo
						className="mx-auto origin-top"
						frameWidth={320}
						showReadout={true}
						width={200}
					/>
				</div>
			</div>
		),
	},
} satisfies Record<ComponentDocSlug, ComponentDocConfig>;

export type ComponentDocPreviewName =
	| "ios-code-block-command-demo"
	| "ios-clock-demo"
	| "ios-slider-demo"
	| "ios-switch-demo"
	| "ios-wheel-picker-basic"
	| "ios-wheel-picker-form"
	| "ios-wheel-picker-multiple";

interface ComponentDocPreviewConfig {
	render: () => ReactNode;
	sourcePath: string;
	title: string;
}

const COMPONENT_DOC_PREVIEWS = {
	"ios-code-block-command-demo": {
		render: () => <IosCodeBlockCommandDemo />,
		sourcePath: "src/components/ios/IosCodeBlockCommandDemo.tsx",
		title: "components/ios-code-block-command-demo.tsx",
	},
	"ios-clock-demo": {
		render: () => <IosClockDemo />,
		sourcePath: "src/components/ios/IosClockDemo.tsx",
		title: "components/ios-clock-demo.tsx",
	},
	"ios-slider-demo": {
		render: () => <IosSliderDemo />,
		sourcePath: "src/components/ios/IosSliderDemo.tsx",
		title: "components/ios-slider-demo.tsx",
	},
	"ios-switch-demo": {
		render: () => <IosSwitchDemo />,
		sourcePath: "src/components/ios/IosSwitchDemo.tsx",
		title: "components/ios-switch-demo.tsx",
	},
	"ios-wheel-picker-basic": {
		render: () => <IosBasicPickerDemo />,
		sourcePath: "src/components/ios/examples/IosBasicPickerDemo.tsx",
		title: "components/ios-wheel-picker-basic.tsx",
	},
	"ios-wheel-picker-form": {
		render: () => <IosHookFormDemo />,
		sourcePath: "src/components/ios/examples/IosHookFormDemo.tsx",
		title: "components/ios-wheel-picker-form.tsx",
	},
	"ios-wheel-picker-multiple": {
		render: () => <IosTimePickerExample />,
		sourcePath: "src/components/ios/examples/IosTimePickerExample.tsx",
		title: "components/ios-wheel-picker-time-picker.tsx",
	},
} satisfies Record<ComponentDocPreviewName, ComponentDocPreviewConfig>;

export function getComponentDocConfig(slug: ComponentDocSlug) {
	return COMPONENT_DOC_CONFIG[slug];
}

export function getComponentDocPreview(name: ComponentDocPreviewName) {
	return COMPONENT_DOC_PREVIEWS[name];
}

export function isComponentDocPreviewName(
	value: string,
): value is ComponentDocPreviewName {
	return value in COMPONENT_DOC_PREVIEWS;
}

export function renderSwitchTeaserPreview() {
	return (
		<div className="relative rounded-[30px] border-[rgba(0,0,0,0.8)] border-[rgba(255,255,255,0.16)] border-t border-b bg-[linear-gradient(180deg,#3a465d_0%,#182034_100%)] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(0,0,0,0.5)]">
			<div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[30px] bg-gradient-to-b from-white/10 to-transparent" />
			<div className="relative flex flex-col items-center gap-5">
				<IosSwitch
					aria-label="Legacy iOS switch off preview"
					className="pointer-events-none"
				/>
				<IosSwitch
					aria-label="Legacy iOS switch on preview"
					checked={true}
					className="pointer-events-none"
				/>
			</div>
		</div>
	);
}
