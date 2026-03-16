"use client";

import { motion } from "framer-motion";
import {
	ArrowRight,
	ChevronDown,
	Code,
	Download,
	FileText,
	Github,
	Instagram,
	LineChart,
	Paintbrush,
	X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import Contact from "~/components/Contact";
import { HomeWorkSection } from "~/components/projects/HomeWorkSection";
import { SEOKeywords } from "~/components/SEOKeywords";
import { AwwwardsHero } from "~/components/ui/AwwwardsHero";
import { Button } from "~/components/ui/button";
import { ButtonGroup } from "~/components/ui/button-group";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Toaster } from "~/components/ui/sonner";
import { getResumeAsset } from "~/lib/resume";

// Company Logo Component
function CompanyLogo({ company }: { company: string }) {
	const getLogoProps = () => {
		switch (company) {
			case "VAPARSHOP":
				return {
					src: "/Vaparshop-logo.png",
					alt: "Vaparshop Logo",
					className: "h-full w-full object-contain",
				};
			case "HORNY PLACE":
				return {
					src: "/Hornyplace-logo.png",
					alt: "Horny Place Logo",
					className: "h-full w-full object-contain",
				};
			case "ELYSIUM":
				return {
					src: "/Elysium-logo.png",
					alt: "Elysium Logo",
					className: "h-full w-full object-contain",
				};
			case "VAPE CLUB":
				return {
					src: "/Vapeclub-logo.png",
					alt: "Vape Club Logo",
					className: "h-full w-full object-contain",
				};
			default:
				return null;
		}
	};

	const logoProps = getLogoProps();

	// If no logo is found, render a fallback with the first letter of the company
	if (!logoProps) {
		return (
			<div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary font-extrabold text-2xl text-primary-foreground md:h-24 md:w-24 md:text-4xl">
				{company.charAt(0)}
			</div>
		);
	}

	return (
		<div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white p-2 md:h-24 md:w-24">
			<Image
				{...logoProps}
				width={96}
				height={96}
				className="h-full w-full object-contain"
			/>
		</div>
	);
}

// Work Experience Item Component with staggered animations
function WorkExperienceItem({
	company,
	title,
	period,
	location,
	achievements,
	delay,
}: {
	company: string;
	title: string;
	period: string;
	location: string;
	achievements: string[];
	delay: number;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 100 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
			viewport={{ once: true }}
			className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12"
		>
			<div className="relative lg:col-span-4">
				<div className="sticky top-32">
					<div className="mb-6 flex items-center gap-6">
						<CompanyLogo company={company} />
						<div>
							<h3 className="font-extrabold text-3xl md:text-4xl">{company}</h3>
							<p className="text-muted-foreground text-xl">{period}</p>
						</div>
					</div>
					<div>
						<h4 className="mb-2 font-bold text-2xl">{title}</h4>
						<p className="text-muted-foreground text-xl">{location}</p>
					</div>
				</div>
			</div>

			<div className="lg:col-span-8">
				<ul className="space-y-6">
					{achievements.map((achievement, index) => {
						const uniqueKey = `${company}-achievement-${index}-${achievement.substring(0, 10).replace(/\s+/g, "")}`;

						// Check if achievement has bold text (marked with ** **)
						if (achievement.includes("**")) {
							return (
								<motion.li
									key={uniqueKey}
									initial={{ opacity: 0, x: 50 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{
										duration: 0.5,
										ease: [0.22, 1, 0.36, 1],
										delay: 0.1 * index,
									}}
									viewport={{ once: true }}
									className="relative pl-6 text-xl leading-relaxed before:absolute before:top-[14px] before:left-0 before:h-3 before:w-3 before:rounded-full before:bg-accent before:content-[''] md:text-2xl"
								>
									{achievement.split(/\*\*(.*?)\*\*/g).map((part, i) => {
										// Even indices are regular text, odd indices are bold text
										return i % 2 === 0 ? (
											<span key={`regular-${i}-${part.substring(0, 5)}`}>
												{part}
											</span>
										) : (
											<strong
												key={`bold-${i}-${part.substring(0, 5)}`}
												className="text-accent"
											>
												{part}
											</strong>
										);
									})}
								</motion.li>
							);
						}

						return (
							<motion.li
								key={uniqueKey}
								initial={{ opacity: 0, x: 50 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{
									duration: 0.5,
									ease: [0.22, 1, 0.36, 1],
									delay: 0.1 * index,
								}}
								viewport={{ once: true }}
								className="relative pl-6 text-xl leading-relaxed before:absolute before:top-[14px] before:left-0 before:h-3 before:w-3 before:rounded-full before:bg-accent before:content-[''] md:text-2xl"
							>
								{achievement}
							</motion.li>
						);
					})}
				</ul>
			</div>
		</motion.div>
	);
}

// Add the custom icons after imports
interface IconProps {
	className?: string;
}

const TelegramIcon: React.FC<IconProps> = ({ className }) => (
	<svg
		stroke="currentColor"
		fill="currentColor"
		strokeWidth="0"
		viewBox="0 0 24 24"
		height="1em"
		width="1em"
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<path d="M17.0943 7.14643C17.6874 6.93123 17.9818 6.85378 18.1449 6.82608C18.1461 6.87823 18.1449 6.92051 18.1422 6.94825C17.9096 9.39217 16.8906 15.4048 16.3672 18.2026C16.2447 18.8578 16.1507 19.1697 15.5179 18.798C15.1014 18.5532 14.7245 18.2452 14.3207 17.9805C12.9961 17.1121 11.1 15.8189 11.2557 15.8967C9.95162 15.0373 10.4975 14.5111 11.2255 13.8093C11.3434 13.6957 11.466 13.5775 11.5863 13.4525C11.64 13.3967 11.9027 13.1524 12.2731 12.8081C13.4612 11.7035 15.7571 9.56903 15.8151 9.32202C15.8246 9.2815 15.8334 9.13045 15.7436 9.05068C15.6539 8.97092 15.5215 8.9982 15.4259 9.01989C15.2904 9.05064 13.1326 10.4769 8.95243 13.2986C8.33994 13.7192 7.78517 13.9242 7.28811 13.9134L7.29256 13.9156C6.63781 13.6847 5.9849 13.4859 5.32855 13.286C4.89736 13.1546 4.46469 13.0228 4.02904 12.8812C3.92249 12.8466 3.81853 12.8137 3.72083 12.783C8.24781 10.8109 11.263 9.51243 12.7739 8.884C14.9684 7.97124 16.2701 7.44551 17.0943 7.14643ZM19.5169 5.21806C19.2635 5.01244 18.985 4.91807 18.7915 4.87185C18.5917 4.82412 18.4018 4.80876 18.2578 4.8113C17.7814 4.81969 17.2697 4.95518 16.4121 5.26637C15.5373 5.58382 14.193 6.12763 12.0058 7.03736C10.4638 7.67874 7.39388 9.00115 2.80365 11.001C2.40046 11.1622 2.03086 11.3451 1.73884 11.5619C1.46919 11.7622 1.09173 12.1205 1.02268 12.6714C0.970519 13.0874 1.09182 13.4714 1.33782 13.7738C1.55198 14.037 1.82635 14.1969 2.03529 14.2981C2.34545 14.4483 2.76276 14.5791 3.12952 14.6941C3.70264 14.8737 4.27444 15.0572 4.84879 15.233C6.62691 15.7773 8.09066 16.2253 9.7012 17.2866C10.8825 18.0651 12.041 18.8775 13.2243 19.6531C13.6559 19.936 14.0593 20.2607 14.5049 20.5224C14.9916 20.8084 15.6104 21.0692 16.3636 20.9998C17.5019 20.8951 18.0941 19.8479 18.3331 18.5703C18.8552 15.7796 19.8909 9.68351 20.1332 7.13774C20.1648 6.80544 20.1278 6.433 20.097 6.25318C20.0653 6.068 19.9684 5.58448 19.5169 5.21806Z" />
	</svg>
);

export default function HomePage() {
	const t = useTranslations();
	const locale = useLocale();
	const containerRef = useRef<HTMLDivElement>(null);
	const [isMounted, setIsMounted] = useState(false);
	const pdfResume = getResumeAsset(locale);
	const markdownResume = getResumeAsset(locale, "markdown");

	const setContainerRef = useCallback((node: HTMLDivElement | null) => {
		containerRef.current = node;
	}, []);

	// Random letter animation setup
	const originalName = t("hero.title");
	const [displayName, setDisplayName] = useState(originalName);

	useEffect(() => {
		setIsMounted(true);

		// Fixed set of characters for scrambling - no randomness
		const scrambleChars = "BCDEFGHJKLMNPQRSTVWXYZ";

		// Function to get a character from the scramble set based on position
		const getScrambleChar = (position: number) => {
			return scrambleChars[position % scrambleChars.length];
		};

		// Function to create a scrambled version of the name
		const scrambleName = (progress: number) => {
			const targetLength = originalName.length;
			let result = "";

			for (let i = 0; i < targetLength; i++) {
				if (i < progress * targetLength) {
					result += originalName[i];
				} else if (originalName[i] === " ") {
					result += " ";
				} else {
					// Use a deterministic character based on position
					result += getScrambleChar(i);
				}
			}

			return result;
		};

		// Animation loop for name scrambling
		let frame = 0;
		let progress = 0;
		const totalFrames = 20;

		const animate = () => {
			if (progress < 1) {
				frame++;
				progress = frame / totalFrames;
				setDisplayName(scrambleName(progress));
				requestAnimationFrame(animate);
			}
		};

		const timeout = setTimeout(() => {
			animate();
		}, 500);

		return () => clearTimeout(timeout);
	}, [originalName]);

	if (!isMounted) {
		return null;
	}

	// Get achievements as arrays for each company
	const vaparshopAchievements = [
		t("experience.vaparshop.achievements.0"),
		t("experience.vaparshop.achievements.1"),
		t("experience.vaparshop.achievements.2"),
		t("experience.vaparshop.achievements.3"),
		t("experience.vaparshop.achievements.4"),
		t("experience.vaparshop.achievements.5"),
	];

	const hornyPlaceAchievements = [
		t("experience.hornyPlace.achievements.0"),
		t("experience.hornyPlace.achievements.1"),
		t("experience.hornyPlace.achievements.2"),
		t("experience.hornyPlace.achievements.3"),
		t("experience.hornyPlace.achievements.4"),
		t("experience.hornyPlace.achievements.5"),
	];

	const elysiumAchievements = [
		t("experience.elysium.achievements.0"),
		t("experience.elysium.achievements.1"),
	];

	const vapeClubAchievements = [
		t("experience.vapeClub.achievements.0"),
		t("experience.vapeClub.achievements.1"),
	];

	return (
		<div ref={setContainerRef} className="relative">
			<SEOKeywords />
			<Toaster />
			{/* Award-winning Hero Section */}
			<AwwwardsHero>
				{/* Background Logo - Centered behind title, draws itself after intro */}
				<motion.svg
					width="900"
					height="900"
					viewBox="0 0 1106 1057"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="pointer-events-none absolute top-1/2 left-1/2 z-1 -ml-12 flex -translate-x-1/2 -translate-y-1/2 scale-[2] items-center justify-center"
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 0.4 }}
					transition={{ duration: 1.5, delay: 2.5 }}
					role="img"
					aria-label="Логотип Sabraman"
					// style={{
					// 	position: "absolute",
					// 	top: "-70%",
					// 	left: "0%",
					// 	transform: "translate(-50%, -50%)",
					// 	zIndex: 1,
					// }}
				>
					<title>Логотип Sabraman</title>
					{/* First path - draws after intro */}
					<motion.path
						d="M861.369 247.228C861.333 247.353 861.307 247.481 861.261 247.604C859.745 251.632 849.864 263.106 846.718 267.154L753.594 387.119C743.695 399.893 734.093 413.073 723.875 425.598C722.562 427.213 720.881 428.772 718.881 429.546C716.653 430.402 714.04 429.336 711.921 428.638C704.881 426.322 697.988 423.362 691.082 420.698L651.906 405.611L534.427 360.602C545.858 356.025 601.362 338.802 605.729 335.035C606.49 327.907 583.263 258.01 579.257 247.097C559.698 193.807 520.081 115.298 463.736 90.5882C440.364 80.3359 410.784 80.8487 386.638 89.503C350.339 104.693 326.467 141.137 309.025 173.841C304.669 182.005 301.006 193.251 294.943 200.095C301.777 180.307 308.826 160.956 319.033 142.447C337.081 109.726 364.647 80.401 402.202 68.9848C411.406 66.1872 420.725 64.6062 430.285 63.789C440.123 62.9481 450.194 63.2456 460.058 63.101C474.419 62.8583 488.778 62.5148 503.136 62.0705L562.821 60.5274C579.94 60.1498 597.226 59.4249 614.212 61.5247C616.153 61.7582 618.086 62.034 620.012 62.3523C621.938 62.6705 623.855 63.0309 625.763 63.4334C627.67 63.836 629.566 64.2803 631.451 64.7664C633.336 65.2525 635.207 65.7797 637.066 66.3481C638.924 66.9167 640.767 67.5259 642.596 68.1756C644.423 68.8254 646.234 69.5151 648.028 70.2447C649.823 70.9746 651.598 71.7435 653.354 72.5516C655.11 73.3596 656.845 74.2062 658.56 75.0912C705.829 99.3213 745.984 162.183 765.542 208.712C774.168 229.231 780.306 250.595 786.793 271.837L837.542 254.837C845.075 252.311 853.599 248.522 861.369 247.228Z"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						fill="transparent"
						initial={{ pathLength: 0, opacity: 0 }}
						animate={{ pathLength: 1, opacity: 1 }}
						transition={{ duration: 3, delay: 2.8, ease: "easeInOut" }}
					/>
					{/* Second path - draws after first */}
					<motion.path
						d="M66.109 398.261L254.566 406.441C259.134 406.637 294.045 407.339 295.758 409.432C298.711 413.045 354.226 585.454 358.513 603.17C337.141 588.239 316.046 572.896 294.554 558.123C279.134 580.824 262.88 602.984 248.834 626.511C218.877 676.687 184.858 755.549 197.342 813.929C203.414 842.333 222.318 870.719 247.73 886.303C279.493 905.784 321.407 905.361 357.863 900.547C368.161 899.185 378.681 896.143 388.983 895.563C341.847 911.871 291.7 920.412 245.157 899.091C243.438 898.295 241.738 897.463 240.056 896.598C238.374 895.732 236.713 894.831 235.071 893.895C233.43 892.961 231.81 891.994 230.212 890.992C228.615 889.991 227.04 888.957 225.489 887.889C223.939 886.824 222.412 885.727 220.909 884.596C219.409 883.467 217.932 882.308 216.48 881.119C215.031 879.929 213.609 878.709 212.214 877.46C210.818 876.211 209.452 874.933 208.114 873.626C198.237 864.073 190.116 853.049 181.694 842.32L151.831 804.562L113.342 756.379C104.751 745.626 95.7392 734.999 88.2052 723.512C86.3256 720.674 84.5391 717.783 82.8454 714.838C81.1491 711.895 79.5481 708.902 78.0424 705.859C76.534 702.817 75.124 699.733 73.8122 696.605C72.5005 693.477 71.2874 690.314 70.173 687.115C69.2498 684.457 68.2996 681.708 67.6804 678.958L67.2567 679.106L64.6251 668.455L65.0606 668.442C51.8859 607.669 81.534 522.688 116.094 471.285C121.761 462.998 127.511 454.765 133.342 446.585L66.109 398.261ZM65.0606 668.442L64.6251 668.455L67.2567 679.106L67.6804 678.958C66.8922 675.437 65.942 671.939 65.0606 668.442Z"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						fill="transparent"
						initial={{ pathLength: 0, opacity: 0 }}
						animate={{ pathLength: 1, opacity: 1 }}
						transition={{ duration: 3, delay: 4.5, ease: "easeInOut" }}
					/>
					{/* Third path - draws last */}
					<motion.path
						d="M1045.62 548.718L1046.48 552.204C1046.59 555.81 1047.62 559.597 1048.11 563.197C1048.36 565.048 1048.57 566.906 1048.72 568.769C1048.87 570.633 1048.97 572.499 1049.02 574.368C1049.06 576.237 1049.06 578.108 1049 579.98C1048.94 581.852 1048.83 583.723 1048.67 585.592C1048.51 587.278 1048.31 588.96 1048.08 590.64C1047.84 592.321 1047.57 593.996 1047.27 595.665C1046.96 597.335 1046.62 598.998 1046.24 600.653C1045.86 602.312 1045.45 603.962 1045 605.604C1044.55 607.246 1044.07 608.88 1043.55 610.505C1043.03 612.127 1042.47 613.739 1041.88 615.341C1041.29 616.943 1040.67 618.534 1040.01 620.112C1039.35 621.691 1038.66 623.257 1037.93 624.81C1032.29 637.109 1024.72 648.699 1017.75 660.354L986.15 713.324L953.685 768.283C945.526 782.159 937.747 796.281 928.065 809.265C925.553 812.638 922.937 815.935 920.216 819.156C917.496 822.379 914.676 825.519 911.756 828.573C908.838 831.631 905.825 834.6 902.719 837.48C899.613 840.361 896.419 843.147 893.137 845.838C890.939 847.623 888.708 849.368 886.445 851.074C884.182 852.783 881.888 854.449 879.562 856.073C877.237 857.699 874.882 859.285 872.498 860.828C870.113 862.372 867.701 863.874 865.262 865.334C862.822 866.794 860.356 868.21 857.864 869.583C855.371 870.956 852.854 872.283 850.312 873.564C847.771 874.849 845.207 876.089 842.621 877.284C840.034 878.476 837.426 879.624 834.797 880.726C780.087 904.109 698.019 916.86 638.89 917.975C614.974 918.422 591.597 916.729 567.833 915.04C561.649 944.021 555.403 973.043 548.724 1001.93L445.433 821.472C440.42 812.703 435.115 803.99 430.427 795.06C429.525 793.339 427.697 790.329 427.988 788.408C428.854 786.779 430.084 785.697 431.497 784.509C444.672 773.432 458.364 762.85 471.764 752.027L600.017 648.33C608.482 641.478 616.827 633.916 625.869 627.82L608.222 709.857C707.333 716.645 813.688 720.861 909.966 690.486C931.982 683.537 953.744 675.02 973.045 662.356C1001.47 643.706 1024.95 614.661 1031.66 581.803C1039.91 541.468 1011.41 499.636 985.465 470.9C981.631 466.566 977.64 462.37 973.492 458.312C969.192 454.051 964.399 449.86 960.951 444.91L960.508 444.267C966.612 447.674 972.471 452.699 977.91 457.018C1001.38 475.667 1022.16 497.031 1035.75 523.562C1039.88 531.628 1042.02 540.107 1045.46 548.364L1045.62 548.718Z"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						fill="transparent"
						initial={{ pathLength: 0, opacity: 0 }}
						animate={{ pathLength: 1, opacity: 1 }}
						transition={{ duration: 3, delay: 6.2, ease: "easeInOut" }}
					/>
				</motion.svg>

				{/* Main text content - in front of logo */}
				<div className="relative z-20">
					<motion.h1
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.8,
							ease: [0.22, 1, 0.36, 1],
							delay: 0.5,
						}}
						className="mb-8 font-extrabold text-[8vw] leading-none tracking-tight md:text-[6vw] lg:text-[5vw] xl:text-[4vw]"
						style={{
							fontFamily: "Heading Now Variable",
							fontVariationSettings: `'wght' 1000, 'wdth' 1000`,
						}}
					>
						{displayName}
					</motion.h1>
					{/* SEO-optimized subtitle with target keywords */}
					<div className="sr-only">
						<h2>
							Sabraman - Danya Yudin (Даня Юдин) - Creative Designer & Developer
						</h2>
						<p>
							Картон - Creative Designer and Frontend Developer with a strong
							background in visual design, branding, and application development
						</p>
					</div>

					<motion.h2
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.8,
							ease: [0.22, 1, 0.36, 1],
							delay: 1.8,
						}}
						className="mb-10 text-[5vw] text-muted-foreground leading-tight md:text-[4vw] lg:text-[3vw] xl:text-[2.5vw]"
					>
						{t("hero.subtitle")}
						<br />
						<span className="bg-[linear-gradient(92deg,#e9e8f1_0%,#cbc9da_52%,#aaa6c0_100%)] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(194,190,214,0.12)]">
							{t("hero.subtitleHighlight")}
						</span>
					</motion.h2>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.6,
							ease: [0.22, 1, 0.36, 1],
							delay: 2.1,
						}}
						className="flex flex-col justify-center gap-4 md:flex-row"
					>
						<ButtonGroup className="w-fit max-w-full overflow-hidden rounded-[2rem] border border-white/15 bg-zinc-100/92 text-zinc-950 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
							<Button
								size={null}
								variant={null}
								className="h-16 justify-center gap-4 rounded-none bg-transparent px-6 font-medium text-[0.95rem] text-zinc-950 uppercase tracking-[0.08em] hover:bg-black/[0.035] hover:text-zinc-950 focus-visible:ring-white/50 focus-visible:ring-offset-0 md:px-7"
								asChild
							>
								<a href={pdfResume.href} download={pdfResume.downloadName}>
									<span
										style={{
											fontFamily: "Heading Now Variable",
											fontVariationSettings: `'wght' 780, 'wdth' 450`,
										}}
									>
										{t("hero.downloadResume")}
									</span>
									<Download className="size-6" strokeWidth={2.2} />
								</a>
							</Button>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										size={null}
										variant={null}
										className="h-16 w-[4.5rem] rounded-none border-black/10 border-l bg-transparent px-0 text-zinc-950 hover:bg-black/[0.035] hover:text-zinc-950 focus-visible:ring-white/50 focus-visible:ring-offset-0"
										aria-label={t("hero.resumeFormats")}
									>
										<ChevronDown className="size-6" strokeWidth={2.4} />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									className="w-56 rounded-2xl border-white/10 bg-zinc-950/96 p-1.5 text-zinc-50 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl"
								>
									<DropdownMenuGroup>
										<DropdownMenuItem
											asChild
											className="rounded-xl px-3 py-2.5"
										>
											<a
												href={pdfResume.href}
												download={pdfResume.downloadName}
											>
												<Download />
												{t("hero.downloadPdf")}
											</a>
										</DropdownMenuItem>
										<DropdownMenuItem
											asChild
											className="rounded-xl px-3 py-2.5"
										>
											<a
												href={markdownResume.href}
												download={markdownResume.downloadName}
											>
												<FileText />
												{t("hero.downloadMarkdown")}
											</a>
										</DropdownMenuItem>
									</DropdownMenuGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</ButtonGroup>

						<Button
							size={null}
							variant={null}
							className="group relative h-16 cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-black/92 px-10 text-zinc-50 hover:bg-black hover:text-zinc-50 focus-visible:ring-white/50 focus-visible:ring-offset-0"
							onClick={() => {
								// Scroll to contact section
								const contactSection =
									document.getElementById("contact-section");
								if (contactSection) {
									contactSection.scrollIntoView({ behavior: "smooth" });
								}
							}}
						>
							<span
								className="relative z-10 uppercase tracking-[0.08em]"
								style={{
									fontFamily: "Heading Now Variable",
									fontVariationSettings: `'wght' 780, 'wdth' 450`,
								}}
							>
								{t("hero.getInTouch")}
							</span>
							<ArrowRight className="relative z-10 ml-3 size-6 transition-transform group-hover:translate-x-1" />
							<motion.span
								className="absolute inset-0 bg-accent/10"
								initial={{ scale: 0, opacity: 0 }}
								whileHover={{ scale: 1, opacity: 1 }}
								transition={{ duration: 0.3, ease: "easeInOut" }}
							/>
						</Button>
					</motion.div>
				</div>
			</AwwwardsHero>

			{/* About Section with glitch effect */}
			<section
				className="relative min-h-screen bg-secondary/5 py-32"
				id="about"
			>
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
						viewport={{ once: true }}
						className="mb-20 overflow-hidden"
					>
						<h2
							className="font-extrabold text-6xl uppercase tracking-tight md:text-6xl xl:text-[12rem]"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 1000, 'wdth' 1000`,
							}}
						>
							<span className="relative z-0 ml-4 inline-block md:ml-8 xl:ml-12">
								<span className="absolute -inset-1 bg-accent opacity-50 blur-sm" />
								{t("about.title")}
							</span>
						</h2>
					</motion.div>

					<div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
						<motion.div
							className="lg:col-span-2"
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
							viewport={{ once: true }}
						>
							<div className="prose prose-xl dark:prose-invert max-w-none">
								<p className="mb-8 text-2xl leading-relaxed lg:text-3xl">
									{t.rich("about.description1", {
										sabraman: (chunks) => <strong>{chunks}</strong>,
									})}
								</p>

								<p className="text-muted-foreground text-xl leading-relaxed lg:text-2xl">
									{t.rich("about.description2", {
										karton: (chunks) => <strong>{chunks}</strong>,
									})}
								</p>

								<div className="mt-12 flex flex-wrap gap-6">
									<div className="flex items-center gap-2">
										<TelegramIcon className="h-6 w-6 text-primary" />
										<Link
											href="https://t.me/sabraman"
											className="text-xl transition-colors hover:text-accent"
										>
											@sabraman
										</Link>
									</div>

									<div className="flex items-center gap-2">
										<Github className="h-6 w-6 text-primary" />
										<Link
											href="https://github.com/sabraman"
											className="text-xl transition-colors hover:text-accent"
										>
											sabraman
										</Link>
									</div>

									<div className="flex items-center gap-2">
										<Instagram className="h-6 w-6 text-primary" />
										<Link
											href="https://instagram.com/sabraman"
											className="text-xl transition-colors hover:text-accent"
										>
											sabraman
										</Link>
									</div>

									<div className="flex items-center gap-2">
										<X className="h-6 w-6 text-primary" />
										<Link
											href="https://x.com/1sabraman"
											className="text-xl transition-colors hover:text-accent"
										>
											1sabraman
										</Link>
									</div>
								</div>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								ease: [0.22, 1, 0.36, 1],
								delay: 0.2,
							}}
							viewport={{ once: true }}
							className="flex flex-col gap-8"
						>
							<div className="rounded-xl border bg-card p-6 shadow-lg backdrop-blur-sm">
								<h3 className="mb-4 font-bold text-2xl">
									{t("about.expertiseAreas")}
								</h3>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<Paintbrush className="mt-0.5 h-6 w-6 flex-shrink-0 text-accent" />
										<div>
											<h4 className="font-semibold text-xl">
												{t("about.visualDesign.title")}
											</h4>
											<p className="text-muted-foreground">
												{t("about.visualDesign.description")}
											</p>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<Code className="mt-0.5 h-6 w-6 flex-shrink-0 text-accent" />
										<div>
											<h4 className="font-semibold text-xl">
												{t("about.appDevelopment.title")}
											</h4>
											<p className="text-muted-foreground">
												{t("about.appDevelopment.description")}
											</p>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<LineChart className="mt-0.5 h-6 w-6 flex-shrink-0 text-accent" />
										<div>
											<h4 className="font-semibold text-xl">
												{t("about.branding.title")}
											</h4>
											<p className="text-muted-foreground">
												{t("about.branding.description")}
											</p>
										</div>
									</li>
								</ul>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
			<HomeWorkSection />
			<section className="relative min-h-screen py-32" id="experience">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
						viewport={{ once: true }}
						className="mb-20 overflow-hidden"
					>
						<h2
							className="font-extrabold text-4xl uppercase tracking-tight md:text-7xl xl:text-[9rem]"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 1000, 'wdth' 1000`,
							}}
						>
							<span className="relative z-0 mr-4 inline-block md:mr-8 xl:mr-12">
								<span className="absolute -inset-1 bg-accent opacity-50 blur-sm" />
								{t("experience.title")}
							</span>
							{t("experience.titleSecond")}
						</h2>
					</motion.div>

					<div className="space-y-40">
						<WorkExperienceItem
							company="VAPARSHOP"
							title={t("experience.vaparshop.title")}
							period={t("experience.vaparshop.period")}
							location={t("experience.vaparshop.location")}
							achievements={vaparshopAchievements}
							delay={0}
						/>

						{/* HORNY PLACE */}
						<WorkExperienceItem
							company="HORNY PLACE"
							title={t("experience.hornyPlace.title")}
							period={t("experience.hornyPlace.period")}
							location={t("experience.hornyPlace.location")}
							achievements={hornyPlaceAchievements}
							delay={0.2}
						/>

						{/* ELYSIUM */}
						<WorkExperienceItem
							company="ELYSIUM"
							title={t("experience.elysium.title")}
							period={t("experience.elysium.period")}
							location={t("experience.elysium.location")}
							achievements={elysiumAchievements}
							delay={0.4}
						/>

						{/* VAPE CLUB */}
						<WorkExperienceItem
							company="VAPE CLUB"
							title={t("experience.vapeClub.title")}
							period={t("experience.vapeClub.period")}
							location={t("experience.vapeClub.location")}
							achievements={vapeClubAchievements}
							delay={0.6}
						/>
					</div>
				</div>
			</section>
			<section id="contact-section" className="relative overflow-hidden py-24">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
						viewport={{ once: true }}
						className="mb-16 overflow-hidden"
					>
						<h2
							className="font-extrabold text-5xl uppercase tracking-tight md:text-8xl xl:text-[12rem]"
							style={{
								fontFamily: "Heading Now Variable",
								fontVariationSettings: `'wght' 1000, 'wdth' 800`,
							}}
						>
							<span className="relative z-0 mr-4 inline-block md:mr-8 xl:mr-12">
								<span className="absolute -inset-1 bg-accent opacity-50 blur-sm" />
								{t("contact.title")}
							</span>
							{t("contact.titleSecond")}
						</h2>
					</motion.div>

					<Contact />
				</div>
			</section>
			<div
				className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
				style={{ top: "80vh" }}
			>
				<div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background opacity-90" />

				<motion.div
					className="absolute rounded-full bg-accent/5"
					style={{
						width: "400px",
						height: "400px",
						left: "20%",
						top: "60%",
						filter: "blur(100px)",
					}}
					animate={{
						x: [0, 20],
						y: [0, -20],
					}}
					transition={{
						duration: 20,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "reverse",
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute rounded-full bg-accent/5"
					style={{
						width: "600px",
						height: "500px",
						left: "60%",
						top: "40%",
						filter: "blur(100px)",
					}}
					animate={{
						x: [0, -30],
						y: [0, 30],
					}}
					transition={{
						duration: 25,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "reverse",
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute rounded-full bg-primary/5"
					style={{
						width: "300px",
						height: "300px",
						left: "70%",
						top: "70%",
						filter: "blur(100px)",
					}}
					animate={{
						x: [0, -20],
						y: [0, -10],
					}}
					transition={{
						duration: 15,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "reverse",
						ease: "easeInOut",
					}}
				/>
			</div>
			<footer className="border-t py-12">
				<div className="container mx-auto px-4">
					<div className="flex flex-col items-center justify-between md:flex-row">
						<p className="mb-4 md:mb-0">
							{t("footer.copyright", { year: new Date().getFullYear() })}
						</p>

						<div className="flex gap-6">
							<Link
								href="https://t.me/sabraman"
								className="text-muted-foreground text-sm transition-colors duration-300 hover:text-foreground"
							>
								{t("footer.links.telegram")}
							</Link>
							<Link
								href="https://github.com/sabraman"
								className="text-muted-foreground text-sm transition-colors duration-300 hover:text-foreground"
							>
								{t("footer.links.github")}
							</Link>
							<Link
								href="https://instagram.com/sabraman"
								className="text-muted-foreground text-sm transition-colors duration-300 hover:text-foreground"
							>
								{t("footer.links.instagram")}
							</Link>
							<Link
								href="https://x.com/1sabraman"
								className="text-muted-foreground text-sm transition-colors duration-300 hover:text-foreground"
							>
								{t("footer.links.x")}
							</Link>
							<Link
								href="https://vk.com/sabraman"
								className="text-muted-foreground text-sm transition-colors duration-300 hover:text-foreground"
							>
								{t("footer.links.vk")}
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
