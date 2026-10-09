"use client";

import { useApp } from "@/providers/AppProvider";
import dynamic from "next/dynamic";
import { CyberSkills } from "./CyberSkills";

const SeriesSkills = dynamic(() => import("./SeriesSkills").then(mod => mod.SeriesSkills), { ssr: true });

export function Skills() {
  const { theme } = useApp();
  
  if (theme === "series") return <SeriesSkills />;
  return <CyberSkills />;
}
