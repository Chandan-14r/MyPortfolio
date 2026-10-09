"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/providers/AppProvider";

export type Tier = "high" | "medium" | "lite";

export function detectInitialTier(): Tier {
  if (typeof window === "undefined") return "high";
  
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mql.matches) return "lite";
  
  if ("connection" in navigator) {
    const conn = (navigator as any).connection;
    if (conn.saveData) return "lite";
  }

  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 4;
  
  if (cores <= 2 || memory <= 2) return "lite";
  if (cores <= 4) return "medium";
  
  return "high";
}

export function useQualityTier() {
  const [tier, setTier] = useState<Tier>("high");
  const { reducedMotion } = useApp();

  useEffect(() => {
    setTier(detectInitialTier());
    
    // We would normally add rolling average rAF checks here to downgrade
    // if frames consistently drop below 60fps.
  }, [reducedMotion]);

  return tier;
}

export function FPSOverlay() {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("fps")) return;

    let frames = 0;
    let prevTime = performance.now();

    const loop = () => {
      const time = performance.now();
      frames++;
      if (time >= prevTime + 1000) {
        setFps(Math.round((frames * 1000) / (time - prevTime)));
        frames = 0;
        prevTime = time;
      }
      requestAnimationFrame(loop);
    };
    
    const raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  if (!params.has("fps")) return null;

  return (
    <div className="fixed top-4 left-4 z-[9999] bg-black/80 text-green-400 font-mono text-xs px-2 py-1 rounded border border-green-400/30 backdrop-blur pointer-events-none">
      {fps} FPS
    </div>
  );
}
