"use client";

import { motion } from "framer-motion";
import { ChevronDown, Download, FileText } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { ButtonGroup } from "~/components/ui/button-group";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { HomeHeroCopy } from "./home-copy";

type HomeHeroClientProps = {
	copy: HomeHeroCopy;
};

const HERO_TITLE_TARGET_VH = 0.36;
const HERO_TITLE_MIN_FONT_SIZE = 64;
const HERO_TITLE_MIN_WDTH = 60;
const HERO_TITLE_MAX_WDTH = 1000;
const HERO_TITLE_MOBILE_INSET = 8;
const HERO_TITLE_DESKTOP_INSET = 6;
const HERO_ROLE_MOBILE_INSET = 8;
const HERO_ROLE_DESKTOP_INSET = 4;
const HERO_RESUME_LABEL_FONT_SIZE = "0.92rem";

function splitHeroTitle(title: string) {
	const [firstWord = title, ...restWords] = title.split(" ");

	return {
		firstWord,
		restWords: restWords.join(" "),
	};
}

function useFittedRoleWdth(lines: string[]) {
	const containerRef = useRef<HTMLDivElement>(null);
	const measureRef = useRef<HTMLSpanElement>(null);
	const [roleWdth, setRoleWdth] = useState(420);

	useLayoutEffect(() => {
		const container = containerRef.current;
		const measure = measureRef.current;

		if (!container || !measure) {
			return;
		}

		const calculateWdth = () => {
			const availableWidth =
				container.clientWidth -
				(window.innerWidth < 640
					? HERO_ROLE_MOBILE_INSET * 2
					: HERO_ROLE_DESKTOP_INSET * 2);

			if (availableWidth <= 0) {
				return;
			}

			const computed = window.getComputedStyle(container);
			measure.style.fontFamily = computed.fontFamily;
			measure.style.fontSize = computed.fontSize;
			measure.style.fontWeight = computed.fontWeight;
			measure.style.letterSpacing = computed.letterSpacing;
			measure.style.textTransform = computed.textTransform;

			let low = 60;
			let high = 1000;
			let best = low;

			for (let iteration = 0; iteration < 12; iteration += 1) {
				const mid = (low + high) / 2;
				measure.style.fontVariationSettings = `'wght' 1000, 'wdth' ${mid}`;

				let widestLine = 0;

				for (const line of lines) {
					measure.textContent = line;
					widestLine = Math.max(
						widestLine,
						measure.getBoundingClientRect().width,
					);
				}

				if (widestLine <= availableWidth) {
					best = mid;
					low = mid;
				} else {
					high = mid;
				}
			}

			setRoleWdth(Math.round(best));
		};

		calculateWdth();

		if (typeof document !== "undefined" && "fonts" in document) {
			void document.fonts.ready.then(calculateWdth);
		}

		const resizeObserver = new ResizeObserver(calculateWdth);
		resizeObserver.observe(container);

		return () => {
			resizeObserver.disconnect();
		};
	}, [lines]);

	return {
		containerRef,
		measureRef,
		roleWdth,
	};
}

function useFittedResumeLabelWdth(label: string) {
	const containerRef = useRef<HTMLAnchorElement>(null);
	const measureRef = useRef<HTMLSpanElement>(null);
	const [labelWdth, setLabelWdth] = useState(430);

	useLayoutEffect(() => {
		const container = containerRef.current;
		const measure = measureRef.current;

		if (!container || !measure) {
			return;
		}

		const calculateWdth = () => {
			const availableWidth = container.clientWidth - 32;

			if (availableWidth <= 0) {
				return;
			}

			measure.style.fontFamily = "Heading Now Variable";
			measure.style.fontSize = HERO_RESUME_LABEL_FONT_SIZE;
			measure.style.fontWeight = "1000";
			measure.style.letterSpacing = "0.08em";
			measure.style.textTransform = "uppercase";

			let low = 120;
			let high = 1000;
			let best = low;

			for (let iteration = 0; iteration < 12; iteration += 1) {
				const mid = (low + high) / 2;
				measure.style.fontVariationSettings = `'wght' 1000, 'wdth' ${mid}`;
				measure.textContent = label;

				if (measure.getBoundingClientRect().width <= availableWidth) {
					best = mid;
					low = mid;
				} else {
					high = mid;
				}
			}

			setLabelWdth(Math.round(best));
		};

		calculateWdth();

		if (typeof document !== "undefined" && "fonts" in document) {
			void document.fonts.ready.then(calculateWdth);
		}

		const resizeObserver = new ResizeObserver(calculateWdth);
		resizeObserver.observe(container);

		return () => {
			resizeObserver.disconnect();
		};
	}, [label]);

	return {
		containerRef,
		measureRef,
		labelWdth,
	};
}

function useFittedHeroTitle(lines: [string, string]) {
	const containerRef = useRef<HTMLHeadingElement>(null);
	const firstMeasureRef = useRef<HTMLSpanElement>(null);
	const secondMeasureRef = useRef<HTMLSpanElement>(null);
	const [titleMetrics, setTitleMetrics] = useState({
		firstWdth: 100,
		secondWdth: 100,
		fontSizePx: 0,
		isReady: false,
	});

	useLayoutEffect(() => {
		const container = containerRef.current;
		const firstMeasure = firstMeasureRef.current;
		const secondMeasure = secondMeasureRef.current;

		if (!container || !firstMeasure || !secondMeasure) {
			return;
		}

		const applyMeasurementStyles = (
			element: HTMLSpanElement,
			fontSizePx: number,
		) => {
			const computed = window.getComputedStyle(container);
			element.style.fontFamily = computed.fontFamily;
			element.style.fontSize = `${fontSizePx}px`;
			element.style.fontWeight = "1000";
			element.style.fontStyle = computed.fontStyle;
			element.style.letterSpacing = computed.letterSpacing;
			element.style.lineHeight = "0.8";
			element.style.textTransform = computed.textTransform;
		};

		const measureLineWidth = (
			element: HTMLSpanElement,
			text: string,
			fontSizePx: number,
			wdth: number,
		) => {
			applyMeasurementStyles(element, fontSizePx);
			element.style.fontVariationSettings = `'wght' 1000, 'wdth' ${wdth}`;
			element.textContent = text;
			return element.getBoundingClientRect().width;
		};

		const fitLineWdth = (
			element: HTMLSpanElement,
			text: string,
			fontSizePx: number,
			availableWidth: number,
		) => {
			let low = HERO_TITLE_MIN_WDTH;
			let high = HERO_TITLE_MAX_WDTH;
			let best = low;

			for (let iteration = 0; iteration < 12; iteration += 1) {
				const mid = (low + high) / 2;
				const measuredWidth = measureLineWidth(element, text, fontSizePx, mid);

				if (measuredWidth <= availableWidth) {
					best = mid;
					low = mid;
				} else {
					high = mid;
				}
			}

			return Math.round(best);
		};

		const calculateTitleMetrics = () => {
			const availableWidth = container.clientWidth;

			if (!availableWidth) {
				return;
			}

			const fitWidth = Math.max(
				availableWidth -
					(window.innerWidth < 640
						? HERO_TITLE_MOBILE_INSET * 2
						: HERO_TITLE_DESKTOP_INSET * 2),
				1,
			);

			const targetFontSizePx = Math.max(
				HERO_TITLE_MIN_FONT_SIZE,
				window.innerHeight * HERO_TITLE_TARGET_VH,
			);

			const minWidthFits = (fontSizePx: number) =>
				lines.every((line, index) => {
					const measure = index === 0 ? firstMeasure : secondMeasure;
					return (
						measureLineWidth(measure, line, fontSizePx, HERO_TITLE_MIN_WDTH) <=
						fitWidth
					);
				});

			let fittedFontSizePx = targetFontSizePx;

			if (!minWidthFits(targetFontSizePx)) {
				let low = HERO_TITLE_MIN_FONT_SIZE;
				let high = targetFontSizePx;
				let best = HERO_TITLE_MIN_FONT_SIZE;

				if (minWidthFits(HERO_TITLE_MIN_FONT_SIZE)) {
					for (let iteration = 0; iteration < 12; iteration += 1) {
						const mid = (low + high) / 2;

						if (minWidthFits(mid)) {
							best = mid;
							low = mid;
						} else {
							high = mid;
						}
					}

					fittedFontSizePx = best;
				} else {
					fittedFontSizePx = HERO_TITLE_MIN_FONT_SIZE;
				}
			}

			setTitleMetrics({
				firstWdth: fitLineWdth(
					firstMeasure,
					lines[0],
					fittedFontSizePx,
					fitWidth,
				),
				secondWdth: fitLineWdth(
					secondMeasure,
					lines[1],
					fittedFontSizePx,
					fitWidth,
				),
				fontSizePx: Math.round(fittedFontSizePx),
				isReady: true,
			});
		};

		calculateTitleMetrics();

		if (typeof document !== "undefined" && "fonts" in document) {
			void document.fonts.ready.then(calculateTitleMetrics);
		}

		const resizeObserver = new ResizeObserver(calculateTitleMetrics);
		resizeObserver.observe(container);
		window.addEventListener("resize", calculateTitleMetrics);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener("resize", calculateTitleMetrics);
		};
	}, [lines]);

	return {
		containerRef,
		firstMeasureRef,
		secondMeasureRef,
		...titleMetrics,
	};
}

export function HomeHeroClient({ copy }: HomeHeroClientProps) {
	const [displayName, setDisplayName] = useState(copy.title);

	useEffect(() => {
		const scrambleChars = "BCDEFGHJKLMNPQRSTVWXYZ";
		let frame = 0;
		const totalFrames = 20;

		const scrambleName = (progress: number) => {
			let result = "";

			for (let index = 0; index < copy.title.length; index += 1) {
				if (index < progress * copy.title.length) {
					result += copy.title[index];
				} else if (copy.title[index] === " ") {
					result += " ";
				} else {
					result += scrambleChars[index % scrambleChars.length];
				}
			}

			return result;
		};

		const animate = () => {
			frame += 1;
			const progress = frame / totalFrames;
			setDisplayName(scrambleName(progress));

			if (progress < 1) {
				requestAnimationFrame(animate);
			}
		};

		setDisplayName(copy.title);
		const timeout = window.setTimeout(animate, 500);

		return () => window.clearTimeout(timeout);
	}, [copy.title]);

	const { firstWord, restWords } = useMemo(
		() => splitHeroTitle(displayName),
		[displayName],
	);
	const { firstWord: titleFirstWord, restWords: titleRestWords } = useMemo(
		() => splitHeroTitle(copy.title),
		[copy.title],
	);
	const roleLines = useMemo(
		() => [copy.subtitle, copy.subtitleHighlight],
		[copy.subtitle, copy.subtitleHighlight],
	);
	const titleLines = useMemo(
		() => [titleFirstWord, titleRestWords] as [string, string],
		[titleFirstWord, titleRestWords],
	);
	const {
		containerRef: titleContainerRef,
		firstMeasureRef,
		secondMeasureRef,
		firstWdth,
		secondWdth,
		fontSizePx,
		isReady: isTitleReady,
	} = useFittedHeroTitle(titleLines);
	const {
		containerRef: roleContainerRef,
		measureRef: roleMeasureRef,
		roleWdth,
	} = useFittedRoleWdth(roleLines);
	const {
		containerRef: resumeButtonRef,
		measureRef: resumeMeasureRef,
		labelWdth,
	} = useFittedResumeLabelWdth(copy.downloadResume);

	return (
		<section
			className="relative overflow-hidden pt-14 pb-14 md:pt-16 md:pb-20"
			id="hero"
		>
			<div className="relative mx-auto max-w-2xl px-4">
				<div className="grid gap-6 md:gap-7">
					<motion.div
						initial={{ opacity: 0, y: 70 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.85,
							ease: [0.22, 1, 0.36, 1],
							delay: 0.15,
						}}
						className="overflow-hidden"
					>
						<h1
							ref={titleContainerRef}
							data-header-invert-surface
							className="font-extrabold text-primary uppercase tracking-[-0.01em] md:tracking-tight"
							style={{
								fontFamily: "Heading Now Variable",
								fontSize:
									fontSizePx > 0
										? `${fontSizePx}px`
										: `${HERO_TITLE_TARGET_VH * 100}vh`,
								visibility: isTitleReady ? "visible" : "hidden",
							}}
						>
							<span
								ref={firstMeasureRef}
								aria-hidden="true"
								className="pointer-events-none invisible absolute top-0 left-0 whitespace-nowrap uppercase"
							/>
							<span
								ref={secondMeasureRef}
								aria-hidden="true"
								className="pointer-events-none invisible absolute top-0 left-0 whitespace-nowrap uppercase"
							/>
							<span
								className="block leading-[0.8]"
								style={{
									fontVariationSettings: `'wght' 1000, 'wdth' ${firstWdth}`,
								}}
							>
								<span className="relative z-0 inline-block">{firstWord}</span>
							</span>
							<span
								className="block leading-[0.8]"
								style={{
									fontVariationSettings: `'wght' 1000, 'wdth' ${secondWdth}`,
								}}
							>
								{restWords}
							</span>
						</h1>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.8,
							ease: [0.22, 1, 0.36, 1],
							delay: 0.45,
						}}
						className="flex flex-col gap-4"
					>
						<div className="py-2">
							<span
								ref={roleMeasureRef}
								aria-hidden="true"
								className="pointer-events-none invisible absolute top-0 left-0 whitespace-nowrap uppercase"
							/>
							<div
								ref={roleContainerRef}
								className="w-full text-[10vw] text-white/88 uppercase leading-[0.9] tracking-[0.03em] sm:text-[1.8rem] md:text-[2rem]"
								style={{
									fontFamily: "Heading Now Variable",
									fontVariationSettings: `'wght' 1000, 'wdth' ${roleWdth}`,
								}}
							>
								<span className="block whitespace-nowrap">{copy.subtitle}</span>
								<span className="block whitespace-nowrap text-white/62">
									{copy.subtitleHighlight}
								</span>
							</div>
						</div>

						<div className="flex w-full flex-col items-stretch gap-3">
							<ButtonGroup className="w-full max-w-full overflow-hidden rounded-full border border-white/10 bg-white/[0.03] text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm">
								<Button
									size={null}
									variant={null}
									className="h-12 flex-1 justify-center gap-2.5 rounded-none bg-transparent px-5 text-white/72 hover:bg-white/[0.06] hover:text-white focus-visible:ring-white/20 focus-visible:ring-offset-0 sm:px-6"
									asChild
								>
									<a
										ref={resumeButtonRef}
										href={copy.pdfResumeHref}
										download={copy.pdfResumeDownloadName}
									>
										<span
											ref={resumeMeasureRef}
											aria-hidden="true"
											className="pointer-events-none invisible absolute top-0 left-0 whitespace-nowrap uppercase"
										/>
										<span
											className="uppercase tracking-[0.08em]"
											style={{
												fontFamily: "Heading Now Variable",
												fontSize: HERO_RESUME_LABEL_FONT_SIZE,
												fontVariationSettings: `'wght' 1000, 'wdth' ${labelWdth}`,
											}}
										>
											{copy.downloadResume}
										</span>
										<Download className="size-5" strokeWidth={2.2} />
									</a>
								</Button>

								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											size={null}
											variant={null}
											className="h-12 w-[3.5rem] rounded-none border-white/10 border-l bg-transparent px-0 text-white/72 hover:bg-white/[0.06] hover:text-white focus-visible:ring-white/20 focus-visible:ring-offset-0"
											aria-label={copy.resumeFormats}
										>
											<ChevronDown className="size-5" strokeWidth={2.4} />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="start"
										className="w-56 rounded-2xl border-white/10 bg-zinc-950/96 p-1.5 text-zinc-50 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl"
									>
										<DropdownMenuGroup>
											<DropdownMenuItem
												asChild
												className="rounded-xl px-3 py-2.5"
											>
												<a
													href={copy.pdfResumeHref}
													download={copy.pdfResumeDownloadName}
												>
													<Download />
													{copy.downloadPdf}
												</a>
											</DropdownMenuItem>
											<DropdownMenuItem
												asChild
												className="rounded-xl px-3 py-2.5"
											>
												<a
													href={copy.markdownResumeHref}
													download={copy.markdownResumeDownloadName}
												>
													<FileText />
													{copy.downloadMarkdown}
												</a>
											</DropdownMenuItem>
										</DropdownMenuGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							</ButtonGroup>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
