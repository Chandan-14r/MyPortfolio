"use client";

import { useApp } from "@/providers/AppProvider";
import dynamic from "next/dynamic";
import { CyberServices } from "./CyberServices";

const SeriesServices = dynamic(() => import("./SeriesServices").then(mod => mod.SeriesServices), { ssr: true });

export function Services() {
  const { theme } = useApp();
  
  if (theme === "series") return <SeriesServices />;
  return <CyberServices />;
}
