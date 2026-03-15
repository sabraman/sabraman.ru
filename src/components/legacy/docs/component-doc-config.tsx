import type { ReactNode } from "react";
import {
	LEGACY_WHEEL_PICKER_INSTALL_COMMANDS,
	LEGACY_WHEEL_PICKER_URLS,
} from "~/components/legacy/component-pages-content";
import type { ComponentDocSlug } from "~/components/legacy/docs/component-doc-paths";
import { LegacyAlertDialogConfirmExample } from "~/components/legacy/examples/LegacyAlertDialogConfirmExample";
import { LegacyAlertDialogDestructiveExample } from "~/components/legacy/examples/LegacyAlertDialogDestructiveExample";
import { LegacyAlertDialogMessageExample } from "~/components/legacy/examples/LegacyAlertDialogMessageExample";
import { LegacyAlertDialogStackedExample } from "~/components/legacy/examples/LegacyAlertDialogStackedExample";
import { LegacyBarButtonAccentExample } from "~/components/legacy/examples/LegacyBarButtonAccentExample";
import { LegacyBarButtonDestructiveExample } from "~/components/legacy/examples/LegacyBarButtonDestructiveExample";
import { LegacyBarButtonToolbarExample } from "~/components/legacy/examples/LegacyBarButtonToolbarExample";
import { LegacyBarButtonUsageExample } from "~/components/legacy/examples/LegacyBarButtonUsageExample";
import { LegacyBasicPickerDemo } from "~/components/legacy/examples/LegacyBasicPickerDemo";
import { LegacyClockFixedSnapshotExample } from "~/components/legacy/examples/LegacyClockFixedSnapshotExample";
import { LegacyClockSizeExample } from "~/components/legacy/examples/LegacyClockSizeExample";
import { LegacyClockStatusRowExample } from "~/components/legacy/examples/LegacyClockStatusRowExample";
import { LegacyClockUsageExample } from "~/components/legacy/examples/LegacyClockUsageExample";
import { LegacyCodeBlockCommandExplicitExample } from "~/components/legacy/examples/LegacyCodeBlockCommandExplicitExample";
import { LegacyCodeBlockCommandHeaderActionExample } from "~/components/legacy/examples/LegacyCodeBlockCommandHeaderActionExample";
import { LegacyCodeBlockCommandInitialManagerExample } from "~/components/legacy/examples/LegacyCodeBlockCommandInitialManagerExample";
import { LegacyCodeBlockCommandUsageExample } from "~/components/legacy/examples/LegacyCodeBlockCommandUsageExample";
import { LegacyHookFormDemo } from "~/components/legacy/examples/LegacyHookFormDemo";
import { LegacyNotificationCustomIconExample } from "~/components/legacy/examples/LegacyNotificationCustomIconExample";
import { LegacyNotificationNoIconExample } from "~/components/legacy/examples/LegacyNotificationNoIconExample";
import { LegacyNotificationUsageExample } from "~/components/legacy/examples/LegacyNotificationUsageExample";
import { LegacySliderFormExample } from "~/components/legacy/examples/LegacySliderFormExample";
import { LegacySliderSignedRangeExample } from "~/components/legacy/examples/LegacySliderSignedRangeExample";
import { LegacySliderSingleExample } from "~/components/legacy/examples/LegacySliderSingleExample";
import { LegacySliderUsageExample } from "~/components/legacy/examples/LegacySliderUsageExample";
import { LegacySwitchDisabledExample } from "~/components/legacy/examples/LegacySwitchDisabledExample";
import { LegacySwitchFormExample } from "~/components/legacy/examples/LegacySwitchFormExample";
import { LegacySwitchSettingsRowExample } from "~/components/legacy/examples/LegacySwitchSettingsRowExample";
import { LegacySwitchUsageExample } from "~/components/legacy/examples/LegacySwitchUsageExample";
import { LegacyTimePickerExample } from "~/components/legacy/examples/LegacyTimePickerExample";
import { LegacyWheelPickerFiniteExample } from "~/components/legacy/examples/LegacyWheelPickerFiniteExample";
import { LegacyAlertDialogDemo } from "~/components/legacy/LegacyAlertDialogDemo";
import { LegacyBarButtonDemo } from "~/components/legacy/LegacyBarButtonDemo";
import { LegacyClockDemo } from "~/components/legacy/LegacyClockDemo";
import { LegacyCodeBlockCommandDemo } from "~/components/legacy/LegacyCodeBlockCommandDemo";
import { LegacyNotificationDemo } from "~/components/legacy/LegacyNotificationDemo";
import { LegacySliderDemo } from "~/components/legacy/LegacySliderDemo";
import { LegacySwitchDemo } from "~/components/legacy/LegacySwitchDemo";
import { LegacyWheelPickerDemo } from "~/components/legacy/LegacyWheelPickerDemo";
import {
	LEGACY_ALERT_DIALOG_INSTALL_COMMANDS,
	LEGACY_ALERT_DIALOG_URLS,
} from "~/components/legacy/legacy-alert-dialog-content";
import {
	LEGACY_BAR_BUTTON_INSTALL_COMMANDS,
	LEGACY_BAR_BUTTON_URLS,
} from "~/components/legacy/legacy-bar-button-content";
import {
	LEGACY_CLOCK_INSTALL_COMMANDS,
	LEGACY_CLOCK_URLS,
} from "~/components/legacy/legacy-clock-content";
import {
	LEGACY_CODE_BLOCK_COMMAND_INSTALL_COMMANDS,
	LEGACY_CODE_BLOCK_COMMAND_URLS,
} from "~/components/legacy/legacy-code-block-command-content";
import {
	LEGACY_NOTIFICATION_INSTALL_COMMANDS,
	LEGACY_NOTIFICATION_URLS,
} from "~/components/legacy/legacy-notification-content";
import {
	LEGACY_SLIDER_INSTALL_COMMANDS,
	LEGACY_SLIDER_URLS,
} from "~/components/legacy/legacy-slider-content";
import {
	LEGACY_SWITCH_INSTALL_COMMANDS,
	LEGACY_SWITCH_URLS,
} from "~/components/legacy/legacy-switch-content";
import type { PackageManager } from "~/components/legacy-code-block-command";
import { LegacySwitch } from "~/components/legacy-switch";

type InstallCommandSet = Partial<Record<PackageManager, string>>;

export interface ComponentDocConfig {
	featuredPreview: ComponentDocPreviewName;
	installCommands: InstallCommandSet;
	registryDirectUrl: string;
	registryIndexUrl: string;
	renderHeroPreview: () => ReactNode;
}

export const COMPONENT_DOC_CONFIG = {
	"legacy-alert-dialog": {
		featuredPreview: "legacy-alert-dialog-demo",
		installCommands: LEGACY_ALERT_DIALOG_INSTALL_COMMANDS,
		registryDirectUrl: LEGACY_ALERT_DIALOG_URLS.direct,
		registryIndexUrl: LEGACY_ALERT_DIALOG_URLS.registry,
		renderHeroPreview: () => (
			<div className="relative flex justify-center">
				<LegacyAlertDialogDemo />
			</div>
		),
	},
	"legacy-bar-button": {
		featuredPreview: "legacy-bar-button-demo",
		installCommands: LEGACY_BAR_BUTTON_INSTALL_COMMANDS,
		registryDirectUrl: LEGACY_BAR_BUTTON_URLS.direct,
		registryIndexUrl: LEGACY_BAR_BUTTON_URLS.registry,
		renderHeroPreview: () => (
			<div className="relative flex justify-center">
				<LegacyBarButtonDemo />
			</div>
		),
	},
	"legacy-code-block-command": {
		featuredPreview: "legacy-code-block-command-demo",
		installCommands: LEGACY_CODE_BLOCK_COMMAND_INSTALL_COMMANDS,
		registryDirectUrl: LEGACY_CODE_BLOCK_COMMAND_URLS.direct,
		registryIndexUrl: LEGACY_CODE_BLOCK_COMMAND_URLS.registry,
		renderHeroPreview: () => (
			<div className="relative flex justify-center">
				<LegacyCodeBlockCommandDemo />
			</div>
		),
	},
	"legacy-clock": {
		featuredPreview: "legacy-clock-demo",
		installCommands: LEGACY_CLOCK_INSTALL_COMMANDS,
		registryDirectUrl: LEGACY_CLOCK_URLS.direct,
		registryIndexUrl: LEGACY_CLOCK_URLS.registry,
		renderHeroPreview: () => (
			<div className="relative flex justify-center">
				<LegacyClockDemo />
			</div>
		),
	},
	"legacy-notification": {
		featuredPreview: "legacy-notification-demo",
		installCommands: LEGACY_NOTIFICATION_INSTALL_COMMANDS,
		registryDirectUrl: LEGACY_NOTIFICATION_URLS.direct,
		registryIndexUrl: LEGACY_NOTIFICATION_URLS.registry,
		renderHeroPreview: () => (
			<div className="flex flex-col items-center justify-center gap-6">
				<div className="relative w-full max-w-[372px] rounded-[30px] border-[rgba(0,0,0,0.8)] border-[rgba(255,255,255,0.14)] border-t border-b bg-[linear-gradient(180deg,#3b465c_0%,#192135_100%)] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(0,0,0,0.5)]">
					<div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[30px] bg-gradient-to-b from-white/10 to-transparent" />
					<div className="relative">
						<LegacyNotificationDemo />
					</div>
				</div>
			</div>
		),
	},
	"legacy-slider": {
		featuredPreview: "legacy-slider-demo",
		installCommands: LEGACY_SLIDER_INSTALL_COMMANDS,
		registryDirectUrl: LEGACY_SLIDER_URLS.direct,
		registryIndexUrl: LEGACY_SLIDER_URLS.registry,
		renderHeroPreview: () => (
			<div className="relative flex justify-center">
				<LegacySliderDemo />
			</div>
		),
	},
	"legacy-switch": {
		featuredPreview: "legacy-switch-demo",
		installCommands: LEGACY_SWITCH_INSTALL_COMMANDS,
		registryDirectUrl: LEGACY_SWITCH_URLS.direct,
		registryIndexUrl: LEGACY_SWITCH_URLS.registry,
		renderHeroPreview: () => (
			<div className="relative flex justify-center">
				<LegacySwitchDemo />
			</div>
		),
	},
	"legacy-wheel-picker": {
		featuredPreview: "legacy-wheel-picker-time",
		installCommands: LEGACY_WHEEL_PICKER_INSTALL_COMMANDS,
		registryDirectUrl: LEGACY_WHEEL_PICKER_URLS.direct,
		registryIndexUrl: LEGACY_WHEEL_PICKER_URLS.registry,
		renderHeroPreview: () => (
			<div className="flex flex-col items-center justify-center gap-6">
				<div className="relative w-full max-w-[360px] rounded-[32px] border-[rgba(0,0,0,0.8)] border-[rgba(255,255,255,0.15)] border-t border-b bg-[linear-gradient(180deg,#3b465c,#192135)] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(0,0,0,0.5)]">
					<div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[32px] bg-gradient-to-b from-white/10 to-transparent" />
					<LegacyWheelPickerDemo
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
	| "legacy-alert-dialog-confirm"
	| "legacy-alert-dialog-demo"
	| "legacy-alert-dialog-destructive"
	| "legacy-alert-dialog-message"
	| "legacy-alert-dialog-stacked"
	| "legacy-bar-button-accent"
	| "legacy-bar-button-demo"
	| "legacy-bar-button-destructive"
	| "legacy-bar-button-toolbar"
	| "legacy-bar-button-usage"
	| "legacy-clock-demo"
	| "legacy-clock-fixed"
	| "legacy-clock-live"
	| "legacy-clock-sizes"
	| "legacy-clock-status"
	| "legacy-notification-custom-icon"
	| "legacy-notification-demo"
	| "legacy-notification-no-icon"
	| "legacy-notification-toast"
	| "legacy-code-block-command-demo"
	| "legacy-code-block-command-explicit"
	| "legacy-code-block-command-header-actions"
	| "legacy-code-block-command-initial-manager"
	| "legacy-code-block-command-usage"
	| "legacy-slider-demo"
	| "legacy-slider-form"
	| "legacy-slider-rack"
	| "legacy-slider-signed"
	| "legacy-slider-single"
	| "legacy-switch-basic"
	| "legacy-switch-demo"
	| "legacy-switch-disabled"
	| "legacy-switch-form"
	| "legacy-switch-settings-row"
	| "legacy-wheel-picker-basic"
	| "legacy-wheel-picker-finite"
	| "legacy-wheel-picker-form"
	| "legacy-wheel-picker-time";

interface ComponentDocPreviewConfig {
	codeTitle: string;
	render: () => ReactNode;
	sourcePath: string;
	viewportClassName?: string;
}

const COMPONENT_DOC_PREVIEWS: Record<
	ComponentDocPreviewName,
	ComponentDocPreviewConfig
> = {
	"legacy-alert-dialog-confirm": {
		codeTitle: "components/legacy-alert-dialog-confirm-example.tsx",
		render: () => <LegacyAlertDialogConfirmExample />,
		sourcePath:
			"src/components/legacy/examples/LegacyAlertDialogConfirmExample.tsx",
		viewportClassName: "items-start justify-start",
	},
	"legacy-alert-dialog-demo": {
		codeTitle: "components/legacy-alert-dialog-demo.tsx",
		render: () => <LegacyAlertDialogDemo />,
		sourcePath: "src/components/legacy/LegacyAlertDialogDemo.tsx",
	},
	"legacy-alert-dialog-destructive": {
		codeTitle: "components/legacy-alert-dialog-destructive-example.tsx",
		render: () => <LegacyAlertDialogDestructiveExample />,
		sourcePath:
			"src/components/legacy/examples/LegacyAlertDialogDestructiveExample.tsx",
		viewportClassName: "items-start justify-start",
	},
	"legacy-alert-dialog-message": {
		codeTitle: "components/legacy-alert-dialog-message-example.tsx",
		render: () => <LegacyAlertDialogMessageExample />,
		sourcePath:
			"src/components/legacy/examples/LegacyAlertDialogMessageExample.tsx",
		viewportClassName: "items-start justify-start",
	},
	"legacy-alert-dialog-stacked": {
		codeTitle: "components/legacy-alert-dialog-stacked-example.tsx",
		render: () => <LegacyAlertDialogStackedExample />,
		sourcePath:
			"src/components/legacy/examples/LegacyAlertDialogStackedExample.tsx",
		viewportClassName: "items-start justify-start",
	},
	"legacy-bar-button-accent": {
		codeTitle: "components/legacy-bar-button-accent-example.tsx",
		render: () => <LegacyBarButtonAccentExample />,
		sourcePath:
			"src/components/legacy/examples/LegacyBarButtonAccentExample.tsx",
		viewportClassName: "items-start justify-start",
	},
	"legacy-bar-button-demo": {
		codeTitle: "components/legacy-bar-button-demo.tsx",
		render: () => <LegacyBarButtonDemo />,
		sourcePath: "src/components/legacy/LegacyBarButtonDemo.tsx",
	},
	"legacy-bar-button-destructive": {
		codeTitle: "components/legacy-bar-button-destructive-example.tsx",
		render: () => <LegacyBarButtonDestructiveExample />,
		sourcePath:
			"src/components/legacy/examples/LegacyBarButtonDestructiveExample.tsx",
		viewportClassName: "items-start justify-start",
	},
	"legacy-bar-button-toolbar": {
		codeTitle: "components/legacy-bar-button-toolbar-example.tsx",
		render: () => <LegacyBarButtonToolbarExample />,
		sourcePath:
			"src/components/legacy/examples/LegacyBarButtonToolbarExample.tsx",
		viewportClassName: "items-start justify-start",
	},
	"legacy-bar-button-usage": {
		codeTitle: "components/legacy-bar-button-usage-example.tsx",
		render: () => <LegacyBarButtonUsageExample />,
		sourcePath:
			"src/components/legacy/examples/LegacyBarButtonUsageExample.tsx",
		viewportClassName: "items-start justify-start",
	},
	"legacy-clock-demo": {
		codeTitle: "components/legacy-clock-demo.tsx",
		render: () => <LegacyClockDemo />,
		sourcePath: "src/components/legacy/LegacyClockDemo.tsx",
	},
	"legacy-clock-fixed": {
		codeTitle: "components/legacy-clock-fixed-snapshot-example.tsx",
		render: () => <LegacyClockFixedSnapshotExample />,
		sourcePath:
			"src/components/legacy/examples/LegacyClockFixedSnapshotExample.tsx",
	},
	"legacy-clock-live": {
		codeTitle: "components/legacy-clock-usage-example.tsx",
		render: () => <LegacyClockUsageExample />,
		sourcePath: "src/components/legacy/examples/LegacyClockUsageExample.tsx",
	},
	"legacy-clock-sizes": {
		codeTitle: "components/legacy-clock-size-example.tsx",
		render: () => <LegacyClockSizeExample />,
		sourcePath: "src/components/legacy/examples/LegacyClockSizeExample.tsx",
	},
	"legacy-clock-status": {
		codeTitle: "components/legacy-clock-status-row-example.tsx",
		render: () => <LegacyClockStatusRowExample />,
		sourcePath:
			"src/components/legacy/examples/LegacyClockStatusRowExample.tsx",
		viewportClassName: "items-start justify-start",
	},
	"legacy-notification-custom-icon": {
		codeTitle: "components/legacy-notification-custom-icon-example.tsx",
		render: () => <LegacyNotificationCustomIconExample />,
		sourcePath:
			"src/components/legacy/examples/LegacyNotificationCustomIconExample.tsx",
	},
	"legacy-notification-demo": {
		codeTitle: "components/legacy-notification-demo.tsx",
		render: () => <LegacyNotificationDemo />,
		sourcePath: "src/components/legacy/LegacyNotificationDemo.tsx",
	},
	"legacy-notification-no-icon": {
		codeTitle: "components/legacy-notification-no-icon-example.tsx",
		render: () => <LegacyNotificationNoIconExample />,
		sourcePath:
			"src/components/legacy/examples/LegacyNotificationNoIconExample.tsx",
	},
	"legacy-notification-toast": {
		codeTitle: "components/legacy-notification-usage-example.tsx",
		render: () => <LegacyNotificationUsageExample />,
		sourcePath:
			"src/components/legacy/examples/LegacyNotificationUsageExample.tsx",
		viewportClassName: "items-start justify-center",
	},
	"legacy-code-block-command-demo": {
		codeTitle: "components/legacy-code-block-command-demo.tsx",
		render: () => <LegacyCodeBlockCommandDemo />,
		sourcePath: "src/components/legacy/LegacyCodeBlockCommandDemo.tsx",
	},
	"legacy-code-block-command-explicit": {
		codeTitle: "components/legacy-code-block-command-explicit-example.tsx",
		render: () => <LegacyCodeBlockCommandExplicitExample />,
		sourcePath:
			"src/components/legacy/examples/LegacyCodeBlockCommandExplicitExample.tsx",
		viewportClassName: "items-start justify-center",
	},
	"legacy-code-block-command-header-actions": {
		codeTitle: "components/legacy-code-block-command-header-action-example.tsx",
		render: () => <LegacyCodeBlockCommandHeaderActionExample />,
		sourcePath:
			"src/components/legacy/examples/LegacyCodeBlockCommandHeaderActionExample.tsx",
		viewportClassName: "items-start justify-center",
	},
	"legacy-code-block-command-initial-manager": {
		codeTitle:
			"components/legacy-code-block-command-initial-manager-example.tsx",
		render: () => <LegacyCodeBlockCommandInitialManagerExample />,
		sourcePath:
			"src/components/legacy/examples/LegacyCodeBlockCommandInitialManagerExample.tsx",
		viewportClassName: "items-start justify-center",
	},
	"legacy-code-block-command-usage": {
		codeTitle: "components/legacy-code-block-command-usage-example.tsx",
		render: () => <LegacyCodeBlockCommandUsageExample />,
		sourcePath:
			"src/components/legacy/examples/LegacyCodeBlockCommandUsageExample.tsx",
		viewportClassName: "items-start justify-center",
	},
	"legacy-slider-demo": {
		codeTitle: "components/legacy-slider-demo.tsx",
		render: () => <LegacySliderDemo />,
		sourcePath: "src/components/legacy/LegacySliderDemo.tsx",
	},
	"legacy-slider-form": {
		codeTitle: "components/legacy-slider-form-example.tsx",
		render: () => <LegacySliderFormExample />,
		sourcePath: "src/components/legacy/examples/LegacySliderFormExample.tsx",
	},
	"legacy-slider-rack": {
		codeTitle: "components/legacy-slider-usage-example.tsx",
		render: () => <LegacySliderUsageExample />,
		sourcePath: "src/components/legacy/examples/LegacySliderUsageExample.tsx",
	},
	"legacy-slider-signed": {
		codeTitle: "components/legacy-slider-signed-range-example.tsx",
		render: () => <LegacySliderSignedRangeExample />,
		sourcePath:
			"src/components/legacy/examples/LegacySliderSignedRangeExample.tsx",
	},
	"legacy-slider-single": {
		codeTitle: "components/legacy-slider-single-example.tsx",
		render: () => <LegacySliderSingleExample />,
		sourcePath: "src/components/legacy/examples/LegacySliderSingleExample.tsx",
	},
	"legacy-switch-basic": {
		codeTitle: "components/legacy-switch-usage-example.tsx",
		render: () => <LegacySwitchUsageExample />,
		sourcePath: "src/components/legacy/examples/LegacySwitchUsageExample.tsx",
	},
	"legacy-switch-demo": {
		codeTitle: "components/legacy-switch-demo.tsx",
		render: () => <LegacySwitchDemo />,
		sourcePath: "src/components/legacy/LegacySwitchDemo.tsx",
	},
	"legacy-switch-disabled": {
		codeTitle: "components/legacy-switch-disabled-example.tsx",
		render: () => <LegacySwitchDisabledExample />,
		sourcePath:
			"src/components/legacy/examples/LegacySwitchDisabledExample.tsx",
	},
	"legacy-switch-form": {
		codeTitle: "components/legacy-switch-form-example.tsx",
		render: () => <LegacySwitchFormExample />,
		sourcePath: "src/components/legacy/examples/LegacySwitchFormExample.tsx",
		viewportClassName: "items-start justify-center",
	},
	"legacy-switch-settings-row": {
		codeTitle: "components/legacy-switch-settings-row-example.tsx",
		render: () => <LegacySwitchSettingsRowExample />,
		sourcePath:
			"src/components/legacy/examples/LegacySwitchSettingsRowExample.tsx",
		viewportClassName: "items-start justify-center",
	},
	"legacy-wheel-picker-basic": {
		codeTitle: "components/legacy-wheel-picker-basic.tsx",
		render: () => <LegacyBasicPickerDemo />,
		sourcePath: "src/components/legacy/examples/LegacyBasicPickerDemo.tsx",
	},
	"legacy-wheel-picker-finite": {
		codeTitle: "components/legacy-wheel-picker-finite-example.tsx",
		render: () => <LegacyWheelPickerFiniteExample />,
		sourcePath:
			"src/components/legacy/examples/LegacyWheelPickerFiniteExample.tsx",
	},
	"legacy-wheel-picker-form": {
		codeTitle: "components/legacy-wheel-picker-form.tsx",
		render: () => <LegacyHookFormDemo />,
		sourcePath: "src/components/legacy/examples/LegacyHookFormDemo.tsx",
		viewportClassName: "items-start justify-center",
	},
	"legacy-wheel-picker-time": {
		codeTitle: "components/legacy-wheel-picker-time-picker.tsx",
		render: () => <LegacyTimePickerExample />,
		sourcePath: "src/components/legacy/examples/LegacyTimePickerExample.tsx",
	},
};

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
				<LegacySwitch
					aria-label="Legacy switch off preview"
					className="pointer-events-none"
				/>
				<LegacySwitch
					aria-label="Legacy switch on preview"
					checked={true}
					className="pointer-events-none"
				/>
			</div>
		</div>
	);
}
