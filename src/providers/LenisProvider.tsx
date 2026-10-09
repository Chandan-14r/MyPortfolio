"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useApp } from "./AppProvider";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const { reducedMotion } = useApp();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
