"use client";

import { useApp } from "@/providers/AppProvider";
import dynamic from "next/dynamic";
import { CyberOutro } from "./CyberOutro";

const SeriesOutro = dynamic(() => import("./SeriesOutro").then(mod => mod.SeriesOutro), { ssr: true });

export function Outro() {
  const { theme } = useApp();
  
  if (theme === "series") return <SeriesOutro />;
  return <CyberOutro />;
}
