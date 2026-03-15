"use client";

import type { Transition, Variants } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { Children, useEffect, useEffectEvent, useRef, useState } from "react";

import { cn } from "~/lib/utils";

const defaultVariants: Variants = {
	initial: { y: -8, opacity: 0 },
	animate: { y: 0, opacity: 1 },
	exit: { y: 8, opacity: 0 },
};

type MotionElement = typeof motion.p | typeof motion.span | typeof motion.code;

export type TextFlipProps = {
	/**
	 * Motion element to render.
	 * @defaultValue motion.p
	 * */
	as?: MotionElement;
	className?: string;
	/** Array of children to cycle through. */
	children: React.ReactNode[];

	/**
	 * Time in seconds between each flip.
	 * @defaultValue 2
	 * */
	interval?: number;
	/**
	 * Motion transition configuration.
	 * @defaultValue { duration: 0.3 }
	 * */
	transition?: Transition;
	/** Motion variants for enter/exit animations. */
	variants?: Variants;

	/** Called with the new index after each flip. */
	onIndexChange?: (index: number) => void;
};

export function TextFlip({
	as: Component = motion.p,
	className,
	children,

	interval = 2,
	transition = { duration: 0.3 },
	variants = defaultVariants,

	onIndexChange,
}: TextFlipProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const items = Children.toArray(children);
	const itemCount = items.length;
	const hasCommittedIndexChange = useRef(false);
	const notifyIndexChange = useEffectEvent((index: number) => {
		onIndexChange?.(index);
	});

	useEffect(() => {
		if (!itemCount) {
			setCurrentIndex(0);
			return;
		}

		setCurrentIndex((prev) => (prev >= itemCount ? 0 : prev));
	}, [itemCount]);

	useEffect(() => {
		if (itemCount <= 1) {
			return;
		}

		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % itemCount);
		}, interval * 1000);

		return () => clearInterval(timer);
	}, [itemCount, interval]);

	useEffect(() => {
		if (!hasCommittedIndexChange.current) {
			hasCommittedIndexChange.current = true;
			return;
		}

		notifyIndexChange(currentIndex);
	}, [currentIndex]);

	return (
		<AnimatePresence mode="wait" initial={false}>
			<Component
				key={currentIndex}
				className={cn("inline-block", className)}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={transition}
				variants={variants}
			>
				{items[currentIndex]}
			</Component>
		</AnimatePresence>
	);
}
