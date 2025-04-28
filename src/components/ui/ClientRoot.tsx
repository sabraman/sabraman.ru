"use client";

import { useEffect, useState } from "react";
import { FullScreenIntro } from "./FullScreenIntro";
import { AnimatePresence } from "framer-motion";

export function ClientRoot({ children }: { children: React.ReactNode }) {
    const [showIntro, setShowIntro] = useState(true);

    // Re-enable the state change based on intro finishing
    useEffect(() => {
        // Optional: Set a maximum time for the intro, e.g., if animation fails
        // const timer = setTimeout(() => setShowIntro(false), 5000);
        // return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {showIntro && <FullScreenIntro onFinish={() => setShowIntro(false)} />}
            </AnimatePresence>
            {/* The main content fades in, controlled by opacity */}
            <div style={{ opacity: showIntro ? 0 : 1, transition: 'opacity 0.6s 0.3s' }}>
                {children}
            </div>
        </>
    );
} 