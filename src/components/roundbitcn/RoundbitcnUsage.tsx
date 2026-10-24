import { RoundbitcnCodeBlock } from "~/components/roundbitcn/RoundbitcnCodeBlock";
import { getRoundbitcnDemoSource } from "~/components/roundbitcn/roundbitcn-demo-source";
import type { RoundbitcnComponentSlug } from "~/components/roundbitcn-content";

export function RoundbitcnUsage({
	component,
}: {
	component: RoundbitcnComponentSlug;
}) {
	return (
		<div className="not-prose mt-4 w-full">
			<RoundbitcnCodeBlock
				code={getRoundbitcnDemoSource(component)}
				title={`usage/${component}.tsx`}
			/>
		</div>
	);
}
