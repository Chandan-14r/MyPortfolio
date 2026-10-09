"use client";

import { useApp } from "@/providers/AppProvider";
import dynamic from "next/dynamic";
import { CyberHero } from "./CyberHero";

// Lazy load SeriesHero
const SeriesHero = dynamic(() => import("./SeriesHero").then(mod => mod.SeriesHero), { ssr: true });

export function Hero() {
  const { theme } = useApp();
  
  if (theme === "series") return <SeriesHero />;
  return <CyberHero />;
}
