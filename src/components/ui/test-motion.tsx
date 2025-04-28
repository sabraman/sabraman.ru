"use client";

import { motion } from "framer-motion";

export function TestMotion() {
  return (
    <motion.div
      animate={{ x: 100 }}
      transition={{ duration: 1 }}
      className="w-20 h-20 bg-blue-500"
    />
  );
} 