"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useApp } from "@/providers/AppProvider";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
}

export function Marquee({ children, className, reverse = false }: MarqueeProps) {
  const { reducedMotion } = useApp();

  return (
    <div className={cn("overflow-hidden flex relative group", className)}>
      <div 
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around",
          reducedMotion ? "flex-wrap" : reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {children}
      </div>
      {!reducedMotion && (
        <div 
          className={cn(
            "flex min-w-full shrink-0 items-center justify-around",
            reverse ? "animate-marquee-reverse" : "animate-marquee"
          )}
          aria-hidden="true"
        >
          {children}
        </div>
      )}
    </div>
  );
}
