"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useApp } from "@/providers/AppProvider";
import { personalInfo } from "@/lib/portfolio-data";

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useApp();

  const handleSkip = () => {
    onComplete();
  };

  useGSAP(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Initial state
    gsap.set(containerRef.current, { clipPath: "circle(0% at 50% 50%)" });
    gsap.set(textRef.current, { y: 20, opacity: 0 });

    tl.to(containerRef.current, {
      clipPath: "circle(150% at 50% 50%)",
      duration: 1.0,
      ease: "power3.inOut"
    })
    .to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.4")
    .to(textRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    }, "+=0.3")
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut"
    }, "-=0.1");

  }, { scope: containerRef });

  if (reducedMotion) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[150] bg-fg text-bg flex items-center justify-center cursor-pointer pointer-events-auto"
      onClick={handleSkip}
    >
      <div className="absolute top-8 right-8 text-xs font-mono opacity-50 uppercase tracking-widest">
        Click to Skip
      </div>
      
      <div ref={textRef} className="text-4xl md:text-6xl font-display-cyber uppercase font-bold tracking-tighter mix-blend-difference text-bg">
        {personalInfo.name.split(" ")[0]} 
        <span className="opacity-50">/SYSTEM</span>
      </div>
    </div>
  );
}
