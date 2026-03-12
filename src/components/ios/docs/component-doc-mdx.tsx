import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
	IosDocCodeBlock,
	IosDocPre,
} from "~/components/ios/docs/component-doc-code-block";
import {
	type ComponentDocPreviewName,
	getComponentDocConfig,
	getComponentDocPreview,
} from "~/components/ios/docs/component-doc-config";
import {
	type ComponentDocSlug,
	resolveComponentDocSlug,
} from "~/components/ios/docs/component-doc-paths";
import {
	getCodeLanguage,
	getCodeTitle,
	readRepoFileForDocs,
} from "~/components/ios/docs/component-doc-source";
import { getComponentTypeTable } from "~/components/ios/docs/component-doc-type-table";
import { IosInstallCommand } from "~/components/ios/IosInstallCommand";
import { cn } from "~/lib/utils";

const mdxOptions: MDXRemoteProps["options"] = {
	mdxOptions: {
		remarkPlugins: [remarkGfm],
	},
};

export function ComponentDocMdx({
	code,
	slug,
}: {
	code: string;
	slug: ComponentDocSlug;
}) {
	return (
		<MDXRemote
			components={getMdxComponents(slug)}
			options={mdxOptions}
			source={code}
		/>
	);
}

function getMdxComponents(
	slug: ComponentDocSlug,
): MDXRemoteProps["components"] {
	return {
		a: ({ className, ...props }) => (
			<a
				className={cn(
					"font-medium text-[#a8c8ff] underline decoration-[#5f82b7] underline-offset-4 transition hover:text-white",
					className,
				)}
				{...props}
			/>
		),
		AutoTypeTable: ({ name, path }: { name: string; path: string }) => (
			<ComponentDocAutoTypeTable exportName={name} path={path} />
		),
		blockquote: ({ className, ...props }) => (
			<blockquote
				className={cn(
					"rounded-[14px] border border-white/10 bg-white/5 px-5 py-4 text-[#c3d1e7] shadow-[inset_0_1px_rgba(255,255,255,0.05)]",
					className,
				)}
				{...props}
			/>
		),
		code: ({ className, ...props }) => (
			<code
				className={cn(
					"rounded bg-black/30 px-1.5 py-0.5 text-[#a5d6ff]",
					className,
				)}
				{...props}
			/>
		),
		ComponentPreview: ({ name }: { name: ComponentDocPreviewName }) => (
			<ComponentDocPreview name={name} />
		),
		ComponentSource: ({ src, title }: { src: string; title?: string }) => (
			<ComponentDocSource src={src} title={title} />
		),
		h2: ({ className, ...props }) => (
			<h2
				className={cn(
					"pt-2 font-medium text-3xl text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]",
					className,
				)}
				{...props}
			/>
		),
		h3: ({ className, ...props }) => (
			<h3
				className={cn(
					"font-medium text-white text-xl tracking-tight",
					className,
				)}
				{...props}
			/>
		),
		hr: ({ className, ...props }) => (
			<hr className={cn("border-white/10", className)} {...props} />
		),
		InstallCommand: ({ component }: { component?: string }) => {
			const resolvedComponent = resolveComponentDocSlug(component, slug);

			return <ComponentDocInstallCommand component={resolvedComponent} />;
		},
		li: ({ className, ...props }) => (
			<li className={cn("leading-relaxed", className)} {...props} />
		),
		ol: ({ className, ...props }) => (
			<ol
				className={cn("list-decimal space-y-3 pl-5 text-[#8b9bb4]", className)}
				{...props}
			/>
		),
		p: ({ className, ...props }) => (
			<p
				className={cn("text-[#8b9bb4] leading-relaxed", className)}
				{...props}
			/>
		),
		pre: IosDocPre,
		Step: ({ className, ...props }) => (
			<h3
				className={cn(
					"font-medium text-lg text-white tracking-tight",
					className,
				)}
				{...props}
			/>
		),
		Steps: ({ className, ...props }) => (
			<div
				className={cn(
					"prose-h3:mb-2 space-y-5 border-white/10 border-l pl-6",
					className,
				)}
				{...props}
			/>
		),
		strong: ({ className, ...props }) => (
			<strong
				className={cn("font-semibold text-white", className)}
				{...props}
			/>
		),
		table: ({ className, ...props }) => (
			<div className="overflow-x-auto">
				<table
					className={cn(
						"w-full min-w-[520px] border-collapse overflow-hidden rounded-[16px] border border-white/10 bg-white/5 shadow-[inset_0_1px_rgba(255,255,255,0.04)]",
						className,
					)}
					{...props}
				/>
			</div>
		),
		tbody: ({ className, ...props }) => (
			<tbody className={cn("divide-y divide-white/10", className)} {...props} />
		),
		td: ({ className, ...props }) => (
			<td
				className={cn("px-4 py-3 align-top text-[#8b9bb4] text-sm", className)}
				{...props}
			/>
		),
		th: ({ className, ...props }) => (
			<th
				className={cn(
					"px-4 py-3 text-left font-semibold text-sm text-white",
					className,
				)}
				{...props}
			/>
		),
		thead: ({ className, ...props }) => (
			<thead
				className={cn(
					"bg-white/[0.04] shadow-[inset_0_-1px_rgba(255,255,255,0.08)]",
					className,
				)}
				{...props}
			/>
		),
		tr: ({ className, ...props }) => (
			<tr className={cn("align-top", className)} {...props} />
		),
		ul: ({ className, ...props }) => (
			<ul
				className={cn("list-disc space-y-3 pl-5 text-[#8b9bb4]", className)}
				{...props}
			/>
		),
	};
}

function ComponentDocInstallCommand({
	component,
}: {
	component: ComponentDocSlug;
}) {
	return (
		<IosInstallCommand {...getComponentDocConfig(component).installCommands} />
	);
}

function ComponentDocSource({ src, title }: { src: string; title?: string }) {
	return (
		<IosDocCodeBlock
			code={readRepoFileForDocs(src).trimEnd()}
			language={getCodeLanguage(src)}
			title={getCodeTitle(src, title)}
		/>
	);
}

function ComponentDocPreview({ name }: { name: ComponentDocPreviewName }) {
	const preview = getComponentDocPreview(name);

	return (
		<div className="space-y-6">
			<div className="relative overflow-hidden rounded-[24px] border-[rgba(0,0,0,0.8)] border-[rgba(255,255,255,0.2)] border-t border-b bg-[#1a212d] p-10 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.05)]">
				<div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-10 mix-blend-overlay" />
				<div className="relative flex justify-center">{preview.render()}</div>
			</div>

			<ComponentDocSource src={preview.sourcePath} title={preview.title} />
		</div>
	);
}

function ComponentDocAutoTypeTable({
	exportName,
	path,
}: {
	exportName: string;
	path: string;
}) {
	const typeTable = getComponentTypeTable(path, exportName);

	return (
		<div className="space-y-4">
			{typeTable.extendsTypes.length ? (
				<p className="text-[#8b9bb4] text-sm leading-relaxed">
					Also inherits:{" "}
					<span className="text-white">
						{typeTable.extendsTypes.join(", ")}
					</span>
				</p>
			) : null}

			<div className="overflow-x-auto">
				<table className="w-full min-w-[520px] border-collapse overflow-hidden rounded-[16px] border border-white/10 bg-white/5 shadow-[inset_0_1px_rgba(255,255,255,0.04)]">
					<thead className="bg-white/[0.04] shadow-[inset_0_-1px_rgba(255,255,255,0.08)]">
						<tr>
							<th className="px-4 py-3 text-left font-semibold text-sm text-white">
								Prop
							</th>
							<th className="px-4 py-3 text-left font-semibold text-sm text-white">
								Type
							</th>
							<th className="px-4 py-3 text-left font-semibold text-sm text-white">
								Required
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-white/10">
						{typeTable.rows.map((row) => (
							<tr key={row.name}>
								<td className="px-4 py-3 align-top text-sm text-white">
									<code className="rounded bg-black/30 px-1.5 py-0.5 text-[#a5d6ff]">
										{row.name}
									</code>
								</td>
								<td className="px-4 py-3 align-top text-[#8b9bb4] text-sm">
									<code className="rounded bg-black/30 px-1.5 py-0.5 text-[#a5d6ff]">
										{row.type}
									</code>
								</td>
								<td className="px-4 py-3 align-top text-[#8b9bb4] text-sm">
									{row.required ? "Yes" : "No"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
