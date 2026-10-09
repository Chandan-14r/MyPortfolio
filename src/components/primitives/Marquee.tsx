"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";
import { useApp } from "@/providers/AppProvider";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
}

export function Marquee({ children, className, reverse = false }: MarqueeProps) {
  const { reducedMotion } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (reducedMotion || !trackRef.current) return;

    // We will do a JS-based infinite loop using GSAP xPercent
    const tl = gsap.to(trackRef.current, {
      xPercent: reverse ? 50 : -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });

    const timeScaleTo = gsap.quickTo(tl, "timeScale", { duration: 0.3, ease: "power2.out" });
    const skewTo = gsap.quickTo(trackRef.current, "skewX", { duration: 0.3, ease: "power2.out" });

    let isHovered = false;

    // Slow down on hover
    const enter = () => { isHovered = true; timeScaleTo(0.2); skewTo(0); };
    const leave = () => { isHovered = false; timeScaleTo(1); };

    containerRef.current?.addEventListener("mouseenter", enter);
    containerRef.current?.addEventListener("mouseleave", leave);

    // Velocity driven scale/skew
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (isHovered) return;
        const velocity = self.getVelocity() / 500; // normalized
        // Speed up based on scroll
        const speed = 1 + Math.abs(velocity);
        timeScaleTo(reverse ? speed : speed); // If reversing direction on scroll, use Math.sign(velocity)
        // Add skew
        skewTo(velocity * -2); // Skew opposite to scroll direction
      }
    });

    return () => {
      containerRef.current?.removeEventListener("mouseenter", enter);
      containerRef.current?.removeEventListener("mouseleave", leave);
    };
  }, { scope: containerRef, dependencies: [reducedMotion, reverse] });

  return (
    <div ref={containerRef} className={cn("overflow-hidden flex relative", className)}>
      <div 
        ref={trackRef}
        className={cn(
          "flex shrink-0 items-center justify-around",
          reducedMotion ? "flex-wrap w-full" : "w-[200%] gap-4"
        )}
      >
        {/* We need double the children to create a seamless loop at 50% width */}
        {children}
        {!reducedMotion && children}
        {!reducedMotion && children}
        {!reducedMotion && children}
      </div>
    </div>
  );
}
