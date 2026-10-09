"use client";

import { useApp } from "@/providers/AppProvider";
import dynamic from "next/dynamic";
import { CyberJourney } from "./CyberJourney";

const SeriesJourney = dynamic(() => import("./SeriesJourney").then(mod => mod.SeriesJourney), { ssr: true });

export function Journey() {
  const { theme } = useApp();
  
  if (theme === "series") return <SeriesJourney />;
  return <CyberJourney />;
}
