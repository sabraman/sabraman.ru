"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getConsoleFunction, setConsoleFunction } from "three";
import { FullScreenIntro } from "./FullScreenIntro";

const CLOCK_DEPRECATION_MESSAGE =
	"THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.";
const MOTION_SCROLL_WARNING =
	"Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' to ensure scroll offset is calculated correctly.";

let hasPatchedThreeConsole = false;

if (typeof window !== "undefined" && !hasPatchedThreeConsole) {
	hasPatchedThreeConsole = true;

	const forward = getConsoleFunction();

	// Filter a known upstream warning from @react-three/fiber until it switches to THREE.Timer.
	setConsoleFunction((level, message, ...params) => {
		if (
			level === "warn" &&
			typeof message === "string" &&
			message === `THREE.${CLOCK_DEPRECATION_MESSAGE}`
		) {
			return;
		}

		if (
			process.env.NODE_ENV !== "production" &&
			level === "warn" &&
			typeof message === "string" &&
			message === MOTION_SCROLL_WARNING
		) {
			return;
		}

		if (forward) {
			forward(level, message, ...params);
			return;
		}

		switch (level) {
			case "warn":
				console.warn(message, ...params);
				return;
			case "error":
				console.error(message, ...params);
				return;
			default:
				console.log(message, ...params);
		}
	});
}

export function ClientRoot({ children }: { children: React.ReactNode }) {
	const [showIntro, setShowIntro] = useState(true);
	const initialScrollYRef = useRef(0);
	const hasCapturedScrollRef = useRef(false);

	// Re-enable the state change based on intro finishing
	useEffect(() => {
		// Максимальное время для отображения интро - 5 секунд
		const timer = setTimeout(() => setShowIntro(false), 5000);
		return () => clearTimeout(timer);
	}, []);

	useLayoutEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const { body, documentElement } = document;
		const previousBodyOverflow = body.style.overflow;
		const previousHtmlOverflow = documentElement.style.overflow;

		if (showIntro) {
			if (!hasCapturedScrollRef.current) {
				initialScrollYRef.current = window.scrollY;
				hasCapturedScrollRef.current = true;
			}

			body.style.overflow = "hidden";
			documentElement.style.overflow = "hidden";

			if (window.scrollY !== 0) {
				window.scrollTo(0, 0);
			}
		} else {
			body.style.overflow = previousBodyOverflow;
			documentElement.style.overflow = previousHtmlOverflow;

			if (hasCapturedScrollRef.current && initialScrollYRef.current > 0) {
				window.scrollTo(0, initialScrollYRef.current);
			}
		}

		return () => {
			body.style.overflow = previousBodyOverflow;
			documentElement.style.overflow = previousHtmlOverflow;
		};
	}, [showIntro]);

	return (
		<>
			<AnimatePresence>
				{showIntro && <FullScreenIntro onFinish={() => setShowIntro(false)} />}
			</AnimatePresence>
			{/* The main content fades in, controlled by opacity */}
			<div
				style={{ opacity: showIntro ? 0 : 1, transition: "opacity 0.6s 0.3s" }}
			>
				{children}
			</div>
		</>
	);
}
