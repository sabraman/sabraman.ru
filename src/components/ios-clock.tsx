import * as React from "react";

import {
	type IosClockVariant,
	IosClock as RegistryIosClock,
	type IosClockProps as RegistryIosClockProps,
} from "../../registry/default/ios-clock/ios-clock";

export type IosClockProps = RegistryIosClockProps;
export type { IosClockVariant };

export const IosClock = React.forwardRef<HTMLDivElement, IosClockProps>(
	(props, ref) => {
		return (
			<RegistryIosClock
				assetBaseUrl="/figma/legacy-clock"
				ref={ref}
				{...props}
			/>
		);
	},
);

IosClock.displayName = "IosClock";
