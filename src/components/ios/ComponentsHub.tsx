"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

import { IosSwitch } from "~/components/ios-switch";
import type { Locale } from "~/i18n";
import { Link } from "~/i18n/navigation";
import {
	getIosWheelPickerHubPath,
	IOS_WHEEL_PICKER_URLS,
} from "./component-pages-content";
import { IosWheelPickerDemo } from "./IosWheelPickerDemo";
import {
	getIosSwitchHubPath,
	IOS_SWITCH_DOCS_COPY,
	IOS_SWITCH_URLS,
} from "./ios-switch-content";

function HubHeader() {
	return (
		<motion.header
			initial={{ opacity: 0, y: -40 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
			className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#060b14]/60 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-3xl md:p-12"
		>
			<motion.div
				animate={{
					backgroundPosition: ["0% 0%", "100% 100%"],
				}}
				transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
				className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
				style={{
					backgroundImage:
						"radial-gradient(circle at 50% 50%, rgba(98,142,255,0.15), transparent 50%), radial-gradient(circle at 100% 0%, rgba(135,115,255,0.15), transparent 50%)",
					backgroundSize: "200% 200%",
				}}
			/>
			<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />

			<div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
				<div className="max-w-4xl space-y-5">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2 }}
						className="inline-flex rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-4 py-1.5 font-semibold text-[#8ca8e8] text-[11px] uppercase tracking-[0.34em]"
					>
						UI Elements
					</motion.div>
					<h1 className="max-w-4xl bg-gradient-to-br from-white via-white to-white/50 bg-clip-text font-medium text-5xl text-transparent tracking-tight md:text-7xl">
						Handcrafted React Components.
					</h1>
					<p className="max-w-3xl text-[#8b9bb4] text-lg leading-relaxed md:text-xl">
						A collection of highly polished, incredibly detailed skeuomorphic
						interfaces.
					</p>
				</div>

				<div className="flex flex-wrap gap-4">
					<motion.a
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-medium text-white shadow-[inset_0_1px_rgba(255,255,255,0.2)] backdrop-blur-md transition hover:bg-white/20"
						href={IOS_WHEEL_PICKER_URLS.direct}
						rel="noreferrer"
						target="_blank"
					>
						Registry item
						<ExternalLink className="h-4 w-4" />
					</motion.a>
					<motion.a
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] transition hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
						href={IOS_WHEEL_PICKER_URLS.registry}
						rel="noreferrer"
						target="_blank"
					>
						Registry index
						<ExternalLink className="h-4 w-4" />
					</motion.a>
				</div>
			</div>
		</motion.header>
	);
}

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function AppleTeaser({ locale }: { locale: Locale }) {
	const href = getIosWheelPickerHubPath(locale);

	return (
		<motion.article
			variants={cardVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-100px" }}
			whileHover={{ scale: 1.01 }}
			className="group relative h-full overflow-hidden rounded-[38px] border-[rgba(0,0,0,0.6)] border-[rgba(255,255,255,0.6)] border-t border-b bg-[linear-gradient(180deg,#dbe3ec_0%,#a8b3c4_100%)] p-8 shadow-[0_30px_60px_rgba(10,20,35,0.3),inset_0_1px_3px_rgba(255,255,255,1)]"
		>
			<div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-[0.03]" />

			<div
				className="relative z-10 space-y-8"
				style={{
					fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
				}}
			>
				<div className="space-y-4 text-center">
					<p className="font-bold text-[#5c6981] text-[10px] uppercase tracking-[0.35em] drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
						Time / Date Input
					</p>
					<h2 className="font-medium text-5xl text-[#1a2333] tracking-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] md:text-6xl">
						iOS 6 Wheel Picker
					</h2>
					<p className="mx-auto max-w-sm font-medium text-[#4a5875] text-[15px] leading-relaxed drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
						A flawless recreation of the classic iPhone rotary slot machine
						picker. Complete with deep inset gradients and infinite snapping
						loops.
					</p>
				</div>

				<div className="flex flex-col items-center gap-6">
					<motion.div
						whileHover={{ scale: 1.05, rotateX: 5 }}
						style={{ perspective: 1000 }}
					>
						<div className="relative rounded-[32px] border-[rgba(0,0,0,0.8)] border-[rgba(255,255,255,0.15)] border-t border-b bg-[linear-gradient(180deg,#3b465c,#192135)] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(0,0,0,0.5)]">
							<div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[32px] bg-gradient-to-b from-white/10 to-transparent" />
							<IosWheelPickerDemo
								className="mx-auto origin-top scale-[0.85]"
								frameWidth={270}
								showReadout={false}
								width={156}
							/>
						</div>
					</motion.div>

					<Link
						className="inline-flex items-center gap-3 rounded-full border-[rgba(0,0,0,0.8)] border-[rgba(255,255,255,0.1)] border-t border-b bg-[linear-gradient(180deg,#4e5b75,#212b40)] px-8 py-4 font-bold text-[14px] text-white shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all hover:brightness-110 active:scale-95 active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.4)]"
						href={href}
					>
						View docs
						<ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			</div>
		</motion.article>
	);
}

function IosSwitchTeaser({ locale: _locale }: { locale: Locale }) {
	const href = getIosSwitchHubPath();

	return (
		<motion.article
			variants={cardVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-100px" }}
			whileHover={{ scale: 1.01 }}
			className="group relative h-full overflow-hidden rounded-[38px] border-[rgba(0,0,0,0.65)] border-[rgba(255,255,255,0.55)] border-t border-b bg-[linear-gradient(180deg,#d8dee7_0%,#9ba7ba_100%)] p-8 shadow-[0_30px_60px_rgba(10,20,35,0.28),inset_0_1px_3px_rgba(255,255,255,0.9)]"
		>
			<div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-[0.03]" />

			<div
				className="relative z-10 flex h-full flex-col justify-between gap-8"
				style={{
					fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
				}}
			>
				<div className="space-y-4 text-center">
					<p className="font-bold text-[#5c6981] text-[10px] uppercase tracking-[0.35em] drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
						Controls / Toggles
					</p>
					<h2 className="font-medium text-5xl text-[#1a2333] tracking-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] md:text-6xl">
						{IOS_SWITCH_DOCS_COPY.title}
					</h2>
					<p className="mx-auto max-w-md font-medium text-[#4a5875] text-[15px] leading-relaxed drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
						Classic glossy track, bevelled thumb, and the exact ON / OFF label
						layout from the legacy iPhone UI kit.
					</p>
				</div>

				<div className="flex flex-col items-center gap-6">
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

					<div className="flex flex-wrap justify-center gap-3">
						<Link
							className="inline-flex items-center gap-3 rounded-full border-[rgba(0,0,0,0.8)] border-[rgba(255,255,255,0.1)] border-t border-b bg-[linear-gradient(180deg,#4e5b75,#212b40)] px-8 py-4 font-bold text-[14px] text-white shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all hover:brightness-110 active:scale-95 active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.4)]"
							href={href}
						>
							View docs
							<ArrowRight className="h-4 w-4" />
						</Link>
						<a
							className="inline-flex items-center gap-2 rounded-full border border-[#4f6179]/35 bg-[#eef3fb]/70 px-5 py-3 font-semibold text-[#1a2333] text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition hover:bg-white/80"
							href={IOS_SWITCH_URLS.direct}
							rel="noreferrer"
							target="_blank"
						>
							Item JSON
							<ExternalLink className="h-4 w-4" />
						</a>
					</div>
				</div>
			</div>
		</motion.article>
	);
}

function ComponentsChooserHub({ locale }: { locale: Locale }) {
	return (
		<main className="relative min-h-screen bg-[#111419] text-white selection:bg-white/20">
			{/* Dramatic dark background elements */}
			<div
				className="pointer-events-none absolute inset-0 bg-[#161a22] opacity-80"
				style={{
					backgroundImage:
						"repeating-linear-gradient(45deg, #11141a 25%, transparent 25%, transparent 75%, #11141a 75%, #11141a), repeating-linear-gradient(45deg, #11141a 25%, #161a22 25%, #161a22 75%, #11141a 75%, #11141a)",
					backgroundPosition: "0 0, 10px 10px",
					backgroundSize: "20px 20px",
				}}
			/>

			<div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-6 py-12 md:px-12 md:py-20 lg:gap-14">
				<HubHeader />

				<div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
					<div>
						<AppleTeaser locale={locale} />
					</div>
					<div>
						<IosSwitchTeaser locale={locale} />
					</div>
				</div>
			</div>
		</main>
	);
}

export function ComponentsHub({ locale }: { locale: Locale }) {
	return <ComponentsChooserHub locale={locale} />;
}
