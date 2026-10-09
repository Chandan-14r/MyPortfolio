"use client";

import { useApp } from "@/providers/AppProvider";
import dynamic from "next/dynamic";
import { CyberContact } from "./CyberContact";

const SeriesContact = dynamic(() => import("./SeriesContact").then(mod => mod.SeriesContact), { ssr: true });

export function Contact() {
  const { theme } = useApp();
  
  if (theme === "series") return <SeriesContact />;
  return <CyberContact />;
}
