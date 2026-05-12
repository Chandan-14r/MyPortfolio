"use client";

import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Animated minimal footer eliminating plain dead zones:
 * - Implements smooth entry arrival triggers via custom useScrollAnimation hook
 * - Hardware accelerated transformations
 */
export default function Footer() {
  // GSAP custom hook triggering smooth entry arrival fade-up
  // Trigger constraint: starts animation when footer top hits 95% viewport depth
  const footerRef = useScrollAnimation<HTMLElement>({
    type: "from",
    start: "top 95%",
    animationProps: {
      opacity: 0,
      y: 30,
      duration: 0.8,
    },
  });

  return (
    <footer ref={footerRef} className="py-8 px-6 border-t border-white/5 relative z-10 will-change-transform bg-bg/40 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
        <span>
          © {new Date().getFullYear()} Chandan R.S. — Built with Next.js & Lenis Smooth Scroll
        </span>
        <span className="text-accent-cyan/80 font-mono">Designed like an artist, implemented like an engineer.</span>
      </div>
    </footer>
  );
}
