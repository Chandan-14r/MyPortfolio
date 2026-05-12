"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

/**
 * Premium Lenis smooth scrolling provider wrapper.
 * Intercepts native scroll to apply customized fluid easing physics.
 * Synced directly with GSAP's internal requestAnimationFrame ticker to prevent jitter.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with optimized premium curve physics
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom exponential decay easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Synchronize ScrollTrigger update loop with Lenis scroll event
    lenis.on("scroll", ScrollTrigger.update);

    // Connect Lenis rAF loop directly to GSAP ticker for frame-locked 60fps animations
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0, 0); // Disable lag smoothing to prevent animation jumps during rapid scrolls

    // Clean up instances on unmount
    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
