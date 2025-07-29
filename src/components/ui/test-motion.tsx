"use client";

import { motion } from "framer-motion";

export function TestMotion() {
	return (
		<motion.div
			animate={{ x: 100 }}
			transition={{ duration: 1 }}
			className="h-20 w-20 bg-blue-500"
		/>
	);
}
