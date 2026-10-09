"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

export function Reveal({ children, className, delay = 0, direction = "up", once = true }: RevealProps) {
  const yOffset = direction === "up" ? 40 : direction === "down" ? -40 : 0;
  const xOffset = direction === "left" ? 40 : direction === "right" ? -40 : 0;

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      initial={{ opacity: 0, y: yOffset, x: xOffset, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-15%" }}
      transition={{ duration: 0.7, delay, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
}
