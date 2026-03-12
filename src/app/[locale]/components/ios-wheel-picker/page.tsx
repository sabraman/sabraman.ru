import type { Metadata } from "next";
import { Link } from "~/i18n/navigation";
import { ArrowLeft, Terminal, ExternalLink } from "lucide-react";

import {
	IOS_WHEEL_PICKER_DOCS_COPY,
	IOS_WHEEL_PICKER_INSTALL_COMMANDS,
	IOS_WHEEL_PICKER_USAGE_SNIPPET,
	IOS_WHEEL_PICKER_MULTIPLE_SNIPPET,
	IOS_WHEEL_PICKER_FORM_SNIPPET,
	IOS_WHEEL_PICKER_URLS,
} from "~/components/ios/component-pages-content";
import { IosWheelPickerDemo } from "~/components/ios/IosWheelPickerDemo";
import { IosBasicPickerDemo } from "~/components/ios/examples/IosBasicPickerDemo";
import { IosHookFormDemo } from "~/components/ios/examples/IosHookFormDemo";
export const metadata: Metadata = {
	title: "iOS 6 Wheel Picker",
	description: IOS_WHEEL_PICKER_DOCS_COPY.summary,
};

export default async function IosWheelPickerChooserPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	// Call setRequestLocale to resolve Next-Intl dynamic api warnings
	import("next-intl/server").then((m) => m.setRequestLocale(locale));

	return (
		<main className="relative min-h-screen bg-[#111419] text-white selection:bg-white/20 pb-32">
			{/* Dramatic dark background elements */}
			<div className="pointer-events-none absolute inset-0 bg-[#161a22] opacity-80" style={{ backgroundImage: "repeating-linear-gradient(45deg, #11141a 25%, transparent 25%, transparent 75%, #11141a 75%, #11141a), repeating-linear-gradient(45deg, #11141a 25%, #161a22 25%, #161a22 75%, #11141a 75%, #11141a)", backgroundPosition: "0 0, 10px 10px", backgroundSize: "20px 20px" }} />

			<div className="relative mx-auto flex w-full max-w-[1000px] flex-col gap-16 px-6 py-12 md:px-12 md:py-20">

				{/* Back Navigation */}
				<Link
					href="/components"
					className="group inline-flex items-center gap-2 text-[#8b9bb4] hover:text-white transition-colors w-fit"
				>
					<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
					<span className="font-medium text-sm">Components Gallery</span>
				</Link>

				{/* Header Section */}
				<header className="space-y-6">
					<div className="inline-flex rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-4 py-1.5 font-semibold text-[#8ca8e8] text-[11px] uppercase tracking-[0.34em] shadow-[inset_0_1px_rgba(255,255,255,0.1)]">
						{IOS_WHEEL_PICKER_DOCS_COPY.kicker}
					</div>
					<h1 className="text-5xl font-medium tracking-tight text-white drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] md:text-6xl">
						{IOS_WHEEL_PICKER_DOCS_COPY.title}
					</h1>
					<p className="max-w-2xl text-[#8b9bb4] text-lg leading-relaxed">
						{IOS_WHEEL_PICKER_DOCS_COPY.summary}
					</p>

					{/* Registry Actions */}
					<div className="flex flex-wrap gap-4 pt-4">
						<a
							className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-medium text-sm text-white shadow-[inset_0_1px_rgba(255,255,255,0.2)] backdrop-blur-md transition hover:bg-white/20"
							href={IOS_WHEEL_PICKER_URLS.direct}
							rel="noreferrer"
							target="_blank"
						>
							Registry item
							<ExternalLink className="h-4 w-4" />
						</a>
						<a
							className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-medium text-sm text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] transition hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
							href={IOS_WHEEL_PICKER_URLS.registry}
							rel="noreferrer"
							target="_blank"
						>
							Registry index
							<ExternalLink className="h-4 w-4" />
						</a>
					</div>
				</header>

				{/* Live Demo Container - Apple Skeuo Styled */}
				<section className="relative overflow-hidden rounded-[38px] border-t border-[rgba(255,255,255,0.6)] border-b border-[rgba(0,0,0,0.6)] bg-[linear-gradient(180deg,#dbe3ec_0%,#a8b3c4_100%)] p-8 md:p-16 shadow-[0_30px_60px_rgba(10,20,35,0.3),inset_0_1px_3px_rgba(255,255,255,1)]">
					<div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />
					<div className="flex justify-center flex-col items-center gap-6">
						<div className="relative w-full max-w-[360px] rounded-[32px] border-t border-[rgba(255,255,255,0.15)] border-b border-[rgba(0,0,0,0.8)] bg-[linear-gradient(180deg,#3b465c,#192135)] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(0,0,0,0.5)]">
							<div className="absolute inset-x-0 top-0 h-1/2 rounded-t-[32px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
							<IosWheelPickerDemo
								className="mx-auto origin-top"
								frameWidth={320}
								showReadout={true}
								width={200}
							/>
						</div>
					</div>
				</section>

				{/* Component Details */}
				<div className="grid gap-12 lg:grid-cols-[1fr_250px] lg:gap-16 pt-10">

					{/* Main Content (Install & Usage) */}
					<div className="space-y-16">
						{/* Installation Section */}
						<section className="space-y-6">
							<h2 className="text-3xl font-medium tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
								Installation
							</h2>
							<p className="text-[#8b9bb4] leading-relaxed">
								{IOS_WHEEL_PICKER_DOCS_COPY.installDescription}
							</p>

							<div className="relative overflow-hidden rounded-[16px] border-t border-[rgba(255,255,255,0.1)] border-b border-[rgba(0,0,0,0.8)] bg-[#1a212d] shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_2px_10px_rgba(0,0,0,0.8)] p-6">
								<div className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
								<div className="flex items-center gap-3 border-b border-black/40 pb-4 mb-4">
									<Terminal className="h-5 w-5 text-[#8b9bb4]" />
									<span className="font-mono text-sm text-[#8b9bb4]">Terminal</span>
								</div>
								<div className="relative font-mono text-sm text-[#a5d6ff] overflow-x-auto whitespace-pre">
									{IOS_WHEEL_PICKER_INSTALL_COMMANDS.bun}
								</div>
							</div>
						</section>

						{/* Usage Section */}
						<section className="space-y-6">
							<h2 className="text-3xl font-medium tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
								Usage
							</h2>
							<p className="text-[#8b9bb4] leading-relaxed">
								{IOS_WHEEL_PICKER_DOCS_COPY.usageDescription}
							</p>

							<div className="relative overflow-hidden rounded-[16px] border-t border-[rgba(255,255,255,0.1)] border-b border-[rgba(0,0,0,0.8)] bg-[#1a212d] shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_2px_10px_rgba(0,0,0,0.8)] p-6">
								<div className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
								<div className="relative font-mono text-[13px] text-[#a5d6ff] overflow-x-auto whitespace-pre leading-relaxed">
									{IOS_WHEEL_PICKER_USAGE_SNIPPET}
								</div>
							</div>
						</section>

						{/* Examples Section */}
						<section className="space-y-16 pt-10 border-t border-white/10 relative">
							<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

							<div className="space-y-6">
								<h2 className="text-3xl font-medium tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
									Examples
								</h2>
								<p className="text-[#8b9bb4] leading-relaxed">
									Explore different configurations of the wheel picker, fully styled in the classic Apple Skeuo design language.
								</p>
							</div>

							{/* Basic Usage Example */}
							<div className="space-y-8 pt-8">
								<div className="space-y-2">
									<h3 className="text-xl font-medium tracking-tight text-white">Basic Usage</h3>
									<p className="text-sm text-[#8b9bb4]">Single column picker for simple string selections.</p>
								</div>
								<div className="relative overflow-hidden rounded-[24px] border-t border-[rgba(255,255,255,0.2)] border-b border-[rgba(0,0,0,0.8)] bg-[#1a212d] shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.05)] p-12">
									<div className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
									<div className="relative flex justify-center">
										<IosBasicPickerDemo />
									</div>
								</div>
								<div className="relative overflow-hidden rounded-[16px] border-t border-[rgba(255,255,255,0.1)] border-b border-[rgba(0,0,0,0.8)] bg-[#1a212d] shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_2px_10px_rgba(0,0,0,0.8)] p-6 mt-6">
									<div className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
									<div className="relative font-mono text-[13px] text-[#a5d6ff] overflow-x-auto whitespace-pre leading-relaxed">
										{IOS_WHEEL_PICKER_USAGE_SNIPPET}
									</div>
								</div>
							</div>

							{/* Multiple Pickers Example */}
							<div className="space-y-4 pt-8 border-t border-white/5">
								<div className="space-y-2 mb-4">
									<h3 className="text-xl font-medium tracking-tight text-white">Multiple Pickers, Infinite Loop</h3>
									<p className="text-sm text-[#8b9bb4]">Combine multiple columns and enable infinite looping for continuous input (like time pickers).</p>
								</div>
								<div className="relative overflow-hidden rounded-[24px] border-t border-[rgba(255,255,255,0.2)] border-b border-[rgba(0,0,0,0.8)] bg-[#1a212d] shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.05)] p-12">
									<div className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
									<div className="relative flex justify-center">
										<IosWheelPickerDemo frameWidth={320} width={200} showReadout={true} />
									</div>
								</div>
								<div className="relative overflow-hidden rounded-[16px] border-t border-[rgba(255,255,255,0.1)] border-b border-[rgba(0,0,0,0.8)] bg-[#1a212d] shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_2px_10px_rgba(0,0,0,0.8)] p-6 mt-6">
									<div className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
									<div className="relative font-mono text-[13px] text-[#a5d6ff] overflow-x-auto whitespace-pre leading-relaxed">
										{IOS_WHEEL_PICKER_MULTIPLE_SNIPPET}
									</div>
								</div>
							</div>

							{/* Form Integration Example */}
							<div className="space-y-4 pt-8 border-t border-white/5">
								<div className="space-y-2 mb-4">
									<h3 className="text-xl font-medium tracking-tight text-white">React Hook Form</h3>
									<p className="text-sm text-[#8b9bb4]">Seamless integration with <code>react-hook-form</code> and <code>zod</code> validation.</p>
								</div>
								<div className="relative overflow-hidden rounded-[24px] border-t border-[rgba(255,255,255,0.2)] border-b border-[rgba(0,0,0,0.8)] bg-[#1a212d] shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.05)] p-12">
									<div className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
									<div className="relative flex justify-center">
										<IosHookFormDemo />
									</div>
								</div>
								<div className="relative overflow-hidden rounded-[16px] border-t border-[rgba(255,255,255,0.1)] border-b border-[rgba(0,0,0,0.8)] bg-[#1a212d] shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_2px_10px_rgba(0,0,0,0.8)] p-6 mt-6">
									<div className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
									<div className="relative font-mono text-[13px] text-[#a5d6ff] overflow-x-auto whitespace-pre leading-relaxed">
										{IOS_WHEEL_PICKER_FORM_SNIPPET}
									</div>
								</div>
							</div>
						</section>
					</div>

					{/* Aside / Metadata */}
					<aside className="space-y-8 min-w-0 overflow-hidden">
						<div className="space-y-4">
							<h3 className="text-sm font-semibold uppercase tracking-wider text-[#5c6981]">
								Details
							</h3>

							<div className="space-y-4">
								<div className="rounded-[12px] border border-white/10 bg-white/5 p-4 text-sm shadow-[inset_0_1px_rgba(255,255,255,0.05)] break-words">
									<p className="font-medium text-white mb-1">Output</p>
									<p className="text-[#8b9bb4] leading-relaxed">
										Installs to <code className="text-[#a5d6ff] bg-black/30 px-1 rounded break-all">components/ios-wheel-picker.tsx</code> so the final import stays <code className="text-[#a5d6ff] bg-black/30 px-1 rounded break-all">@/components/ios-wheel-picker</code>.
									</p>
								</div>

								<div className="rounded-[12px] border border-white/10 bg-white/5 p-4 text-sm shadow-[inset_0_1px_rgba(255,255,255,0.05)] break-words">
									<p className="font-medium text-white mb-1">Dependency</p>
									<p className="text-[#8b9bb4] leading-relaxed">
										Built on top of <code className="text-[#a5d6ff] bg-black/30 px-1 rounded break-all">@ncdai/react-wheel-picker</code> while keeping the shell and wheel geometry under your control.
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
