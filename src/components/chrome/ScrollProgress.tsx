"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useApp } from "@/providers/AppProvider";

export function ScrollProgress() {
  const { reducedMotion } = useApp();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (reducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-50 origin-left"
      style={{ scaleX }}
    />
  );
}
