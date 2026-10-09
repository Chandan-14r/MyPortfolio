"use client";

import { useApp } from "@/providers/AppProvider";
import dynamic from "next/dynamic";
import { CyberAbout } from "./CyberAbout";

const SeriesAbout = dynamic(() => import("./SeriesAbout").then(mod => mod.SeriesAbout), { ssr: true });

export function About() {
  const { theme } = useApp();
  
  if (theme === "series") return <SeriesAbout />;
  return <CyberAbout />;
}
