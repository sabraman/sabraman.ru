import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export function FullScreenIntro({ onFinish }: { onFinish?: () => void }) {
	const controls = useAnimation();
	const [isFontReady, setIsFontReady] = useState(false);

	useEffect(() => {
		let isCancelled = false;

		const waitForIntroFont = async () => {
			if (typeof document === "undefined" || !("fonts" in document)) {
				if (!isCancelled) {
					setIsFontReady(true);
				}
				return;
			}

			try {
				await document.fonts.load('1em "Heading Now Variable"');
				await document.fonts.ready;
			} finally {
				if (!isCancelled) {
					setIsFontReady(true);
				}
			}
		};

		waitForIntroFont();

		return () => {
			isCancelled = true;
		};
	}, []);

	useEffect(() => {
		if (!isFontReady) {
			return;
		}

		let active = true;
		let timeoutId: number | undefined;

		controls
			.start({
				fontVariationSettings: `'wght' 1000, 'wdth' 100`,
				transition: {
					fontVariationSettings: {
						duration: 1.8,
						ease: [0.4, 0, 0.2, 1],
						delay: 0.2,
					},
				},
			})
			.then(() => {
				if (!active) {
					return;
				}

				if (onFinish) {
					// Add a slight delay before calling onFinish to let the animation visually settle
					timeoutId = window.setTimeout(() => {
						if (active) {
							onFinish();
						}
					}, 300);
				}
			});

		return () => {
			active = false;
			if (timeoutId !== undefined) {
				window.clearTimeout(timeoutId);
			}
		};
	}, [controls, isFontReady, onFinish]);

	return (
		<motion.div
			// Use exit animation for a smoother transition out if needed
			// exit={{ opacity: 0, transition: { duration: 0.5 } }}
			className="fixed inset-0 z-[9999] flex h-dvh w-screen items-center justify-center overflow-hidden bg-background"
		>
			<motion.h1
				initial={{
					fontVariationSettings: `'wght' 1000, 'wdth' 1000`,
					fontSize: "min(100vh, 80vw)", // Min size

					// scale: 1,
				}}
				animate={controls}
				style={{
					fontFamily: "Heading Now Variable",
					fontVariationSettings: `'wght' 1000, 'wdth' 1000`,
					fontSize: "min(100vh, 80vw)", // Min size
					fontWeight: 1000,
					lineHeight: 1,
					textAlign: "center",
					margin: 0,
					color: "var(--foreground)",
					visibility: isFontReady ? "visible" : "hidden",
					willChange: "transform, font-variation-settings",
				}}
			>
				SABRAMAN
			</motion.h1>
		</motion.div>
	);
}
