import { IosDocCodeBlock } from "~/components/ios/docs/component-doc-code-block";
import {
	type ComponentDocPreviewName,
	getComponentDocPreview,
} from "~/components/ios/docs/component-doc-config";
import { readRepoFileForDocs } from "~/components/ios/docs/component-doc-source";

export function ComponentDocShowcase({
	name,
}: {
	name: ComponentDocPreviewName;
}) {
	const preview = getComponentDocPreview(name);

	return (
		<div className="space-y-0 overflow-hidden rounded-[24px] border border-white/10 bg-[#050608] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
			<div className="relative min-h-[500px] overflow-hidden border-white/10 border-b bg-black px-8 py-10 md:px-10 md:py-14">
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_30%)]" />
				<div className="relative flex min-h-[392px] w-full items-center justify-center">
					<div className="flex w-full items-center justify-center">
						{preview.render()}
					</div>
				</div>
			</div>

			<IosDocCodeBlock
				className="rounded-none border-0 border-white/10 border-t shadow-none"
				code={readRepoFileForDocs(preview.sourcePath).trimEnd()}
			/>
		</div>
	);
}
