import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export function FullScreenIntro({ onFinish }: { onFinish?: () => void }) {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            fontVariationSettings: `'wght' 1000, 'wdth' 100`,
            // scale: 1, // Keep scale if you want it to scale down, otherwise remove if size is handled by CSS
            transition: {
                fontVariationSettings: { duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 },
                // scale: { duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 },
            },
        }).then(() => {
            // Call onFinish after the animation completes
            if (onFinish) {
                // Add a slight delay before calling onFinish to let the animation visually settle
                setTimeout(() => onFinish(), 300);
            }
        });
    }, [controls, onFinish]);

    return (
        <motion.div
            // Use exit animation for a smoother transition out if needed
            // exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
            style={{ width: '100vw', height: '100vh' }}
        >
            <motion.h1
                layoutId="sabraman-title" // Add the layoutId here
                initial={{
                    fontVariationSettings: `'wght' 1000, 'wdth' 1000`,
                    fontSize: '100vh',
                    // scale: 1,
                }}
                animate={controls}
                style={{
                    fontFamily: 'Heading Now Variable',
                    fontVariationSettings: `'wght' 1000, 'wdth' 1000`,
                    fontSize: '100vh', // Keep initial size large
                    fontWeight: 1000,
                    lineHeight: 1,
                    textAlign: 'center',
                    margin: 0,
                    color: 'var(--foreground)',
                    willChange: 'transform, font-variation-settings',
                }}
            >
                SABRAMAN
            </motion.h1>
        </motion.div>
    );
} 