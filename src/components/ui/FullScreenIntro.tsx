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

		controls
			.start({
				fontVariationSettings: `'wght' 1000, 'wdth' 100`,
				// scale: 1, // Keep scale if you want it to scale down, otherwise remove if size is handled by CSS
				transition: {
					fontVariationSettings: {
						duration: 1.8,
						ease: [0.4, 0, 0.2, 1],
						delay: 0.2,
					},
					// scale: { duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 },
				},
			})
			.then(() => {
				// Call onFinish after the animation completes
				if (onFinish) {
					// Add a slight delay before calling onFinish to let the animation visually settle
					setTimeout(() => onFinish(), 300);
				}
			});
	}, [controls, isFontReady, onFinish]);

	return (
		<motion.div
			// Use exit animation for a smoother transition out if needed
			// exit={{ opacity: 0, transition: { duration: 0.5 } }}
			className="fixed inset-0 z-[9999] flex items-center justify-center bg-background relative"
			style={{ width: "100vw", height: "100vh" }}
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
