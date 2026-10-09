"use client";

import { useApp } from "@/providers/AppProvider";
import dynamic from "next/dynamic";
import { CyberWork } from "./CyberWork";

const SeriesWork = dynamic(() => import("./SeriesWork").then(mod => mod.SeriesWork), { ssr: true });

export function Work() {
  const { theme } = useApp();
  
  if (theme === "series") return <SeriesWork />;
  return <CyberWork />;
}
