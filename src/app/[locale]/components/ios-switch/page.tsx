import { ArrowLeft, ExternalLink, Terminal } from "lucide-react";
import type { Metadata } from "next";

import { IosSwitchDemo } from "~/components/ios/IosSwitchDemo";
import {
	IOS_SWITCH_ALIAS_COMMANDS,
	IOS_SWITCH_DOCS_COPY,
	IOS_SWITCH_URLS,
	IOS_SWITCH_USAGE_SNIPPET,
} from "~/components/ios/ios-switch-content";
import { Link } from "~/i18n/navigation";

export const metadata: Metadata = {
	title: "Legacy iOS Switch",
	description: IOS_SWITCH_DOCS_COPY.summary,
};

export default async function IosSwitchPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	import("next-intl/server").then((m) => m.setRequestLocale(locale));

	return (
		<main className="relative min-h-screen bg-[#111419] pb-32 text-white selection:bg-white/20">
			<div
				className="pointer-events-none absolute inset-0 bg-[#161a22] opacity-80"
				style={{
					backgroundImage:
						"repeating-linear-gradient(45deg, #11141a 25%, transparent 25%, transparent 75%, #11141a 75%, #11141a), repeating-linear-gradient(45deg, #11141a 25%, #161a22 25%, #161a22 75%, #11141a 75%, #11141a)",
					backgroundPosition: "0 0, 10px 10px",
					backgroundSize: "20px 20px",
				}}
			/>

			<div className="relative mx-auto flex w-full max-w-[1040px] flex-col gap-16 px-6 py-12 md:px-12 md:py-20">
				<Link
					href="/components"
					className="group inline-flex w-fit items-center gap-2 text-[#8b9bb4] transition-colors hover:text-white"
				>
					<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
					<span className="font-medium text-sm">Components Gallery</span>
				</Link>

				<header className="space-y-6">
					<div className="inline-flex rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-4 py-1.5 font-semibold text-[#8ca8e8] text-[11px] uppercase tracking-[0.34em] shadow-[inset_0_1px_rgba(255,255,255,0.1)]">
						{IOS_SWITCH_DOCS_COPY.kicker}
					</div>
					<h1 className="font-medium text-5xl text-white tracking-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] md:text-6xl">
						{IOS_SWITCH_DOCS_COPY.title}
					</h1>
					<p className="max-w-2xl text-[#8b9bb4] text-lg leading-relaxed">
						{IOS_SWITCH_DOCS_COPY.summary}
					</p>

					<div className="flex flex-wrap gap-4 pt-4">
						<a
							className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-medium text-sm text-white shadow-[inset_0_1px_rgba(255,255,255,0.2)] backdrop-blur-md transition hover:bg-white/20"
							href={IOS_SWITCH_URLS.direct}
							rel="noreferrer"
							target="_blank"
						>
							Registry item
							<ExternalLink className="h-4 w-4" />
						</a>
						<a
							className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-medium text-black text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] transition hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
							href={IOS_SWITCH_URLS.registry}
							rel="noreferrer"
							target="_blank"
						>
							Registry index
							<ExternalLink className="h-4 w-4" />
						</a>
					</div>
				</header>

				<section className="relative overflow-hidden rounded-[38px] border-[rgba(0,0,0,0.6)] border-[rgba(255,255,255,0.6)] border-t border-b bg-[linear-gradient(180deg,#dbe3ec_0%,#a8b3c4_100%)] p-8 shadow-[0_30px_60px_rgba(10,20,35,0.3),inset_0_1px_3px_rgba(255,255,255,1)] md:p-16">
					<div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-[0.03]" />
					<div className="relative flex justify-center">
						<IosSwitchDemo />
					</div>
				</section>

				<div className="grid gap-12 pt-10 lg:grid-cols-[1fr_250px] lg:gap-16">
					<div className="space-y-16">
						<section className="space-y-6">
							<h2 className="font-medium text-3xl text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
								Installation
							</h2>
							<p className="text-[#8b9bb4] leading-relaxed">
								{IOS_SWITCH_DOCS_COPY.installDescription}
							</p>

							<div className="relative overflow-hidden rounded-[16px] border-[rgba(0,0,0,0.8)] border-[rgba(255,255,255,0.1)] border-t border-b bg-[#1a212d] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_2px_10px_rgba(0,0,0,0.8)]">
								<div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-10 mix-blend-overlay" />
								<div className="mb-4 flex items-center gap-3 border-black/40 border-b pb-4">
									<Terminal className="h-5 w-5 text-[#8b9bb4]" />
									<span className="font-mono text-[#8b9bb4] text-sm">
										Terminal
									</span>
								</div>
								<div className="relative overflow-x-auto whitespace-pre font-mono text-[#a5d6ff] text-sm">
									{IOS_SWITCH_ALIAS_COMMANDS.bun}
								</div>
							</div>
						</section>

						<section className="space-y-6">
							<h2 className="font-medium text-3xl text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
								Usage
							</h2>
							<p className="text-[#8b9bb4] leading-relaxed">
								{IOS_SWITCH_DOCS_COPY.usageDescription}
							</p>

							<div className="relative overflow-hidden rounded-[16px] border-[rgba(0,0,0,0.8)] border-[rgba(255,255,255,0.1)] border-t border-b bg-[#1a212d] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_2px_10px_rgba(0,0,0,0.8)]">
								<div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-10 mix-blend-overlay" />
								<div className="relative overflow-x-auto whitespace-pre font-mono text-[#a5d6ff] text-[13px] leading-relaxed">
									{IOS_SWITCH_USAGE_SNIPPET}
								</div>
							</div>
						</section>
					</div>

					<aside className="space-y-8">
						<div className="space-y-4">
							<h3 className="font-semibold text-[#5c6981] text-sm uppercase tracking-wider">
								Details
							</h3>

							<div className="space-y-4">
								<div className="rounded-[12px] border border-white/10 bg-white/5 p-4 text-sm shadow-[inset_0_1px_rgba(255,255,255,0.05)]">
									<p className="mb-1 font-medium text-white">Output</p>
									<p className="text-[#8b9bb4] leading-relaxed">
										Installs to{" "}
										<code className="rounded bg-black/30 px-1 text-[#a5d6ff]">
											components/ios-switch.tsx
										</code>{" "}
										so the final import stays{" "}
										<code className="rounded bg-black/30 px-1 text-[#a5d6ff]">
											@/components/ios-switch
										</code>
										.
									</p>
								</div>

								<div className="rounded-[12px] border border-white/10 bg-white/5 p-4 text-sm shadow-[inset_0_1px_rgba(255,255,255,0.05)]">
									<p className="mb-1 font-medium text-white">Dependency</p>
									<p className="text-[#8b9bb4] leading-relaxed">
										Built on top of{" "}
										<code className="rounded bg-black/30 px-1 text-[#a5d6ff]">
											@radix-ui/react-switch
										</code>{" "}
										while preserving the original glossy labels, thumb, and
										inset shadow treatment from the Figma source.
									</p>
								</div>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</main>
	);
}
