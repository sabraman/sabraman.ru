import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export function IntroAnimation() {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            fontVariationSettings: `'wght' 900, 'wdth' 1000`,
            transition: {
                fontVariationSettings: { duration: 1.8, ease: [0.4, 0, 0.2, 1] },
            },
        });
    }, [controls]);

    return (
        <motion.h1
            initial={{ fontVariationSettings: `'wght' 100, 'wdth' 100` }}
            animate={controls}
            style={{
                fontFamily: 'Heading Now Variable',
                fontVariationSettings: `'wght' 100, 'wdth' 100`,
                fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                fontWeight: 100,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                textAlign: 'center',
                margin: 0,
            }}
            className="text-foreground"
        >
            Danya Yudin
        </motion.h1>
    );
} 