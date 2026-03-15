import * as React from "react";

import {
	type LegacyClockVariant,
	LegacyClock as RegistryLegacyClock,
	type LegacyClockProps as RegistryLegacyClockProps,
} from "../../registry/default/legacy-clock/legacy-clock";

export type LegacyClockProps = RegistryLegacyClockProps;
export type { LegacyClockVariant };

export const LegacyClock = React.forwardRef<HTMLDivElement, LegacyClockProps>(
	(props, ref) => {
		return (
			<RegistryLegacyClock
				assetBaseUrl="/figma/legacy-clock"
				ref={ref}
				{...props}
			/>
		);
	},
);

LegacyClock.displayName = "LegacyClock";
