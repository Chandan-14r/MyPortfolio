"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP, CustomEase, SplitText);
  // Re-map Framer motion tokens to CustomEase
  // framer out: [0.16, 1, 0.3, 1]
  CustomEase.create("framer-out", "M0,0 C0.16,1 0.3,1 1,1");
  // framer inOut: [0.76, 0, 0.24, 1]
  CustomEase.create("framer-inOut", "M0,0 C0.76,0 0.24,1 1,1");
}

export const ease = { out: [0.16, 1, 0.3, 1], inOut: [0.76, 0, 0.24, 1] } as const;
export const spring = {
  snappy:   { type: "spring", stiffness: 380, damping: 30, mass: 0.8 },
  parallax: { stiffness: 120, damping: 20 },   // useSpring config for cursor parallax
  soft:     { type: "spring", stiffness: 60,  damping: 18 },
} as const;

export const gsapEase = {
  out: "framer-out",
  inOut: "framer-inOut"
};

// --- GSAP Helpers ---
export function useReveal(ref: React.RefObject<Element>, options = {}) {
  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: gsapEase.out,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
      ...options
    });
  }, { scope: ref });
}

export function useSplitText(ref: React.RefObject<Element>, options = {}) {
  useGSAP(() => {
    if (!ref.current) return;
    const split = new SplitText(ref.current, { type: "lines,words" });
    gsap.from(split.words, {
      y: "100%",
      opacity: 0,
      duration: 0.8,
      stagger: 0.02,
      ease: gsapEase.out,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
      ...options
    });
    return () => split.revert();
  }, { scope: ref });
}

export function useMagnetic(ref: React.RefObject<Element>, strength = 20) {
  useGSAP(() => {
    if (!ref.current) return;
    const el = ref.current;
    
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    const mouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      xTo((relX / rect.width) * strength);
      yTo((relY / rect.height) * strength);
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", mouseMove as EventListener);
    el.addEventListener("mouseleave", mouseLeave);
    
    return () => {
      el.removeEventListener("mousemove", mouseMove as EventListener);
      el.removeEventListener("mouseleave", mouseLeave);
    };
  }, { scope: ref });
}

export function useQuickFollow(ref: React.RefObject<Element>) {
  // Returns quickTo setters for a custom cursor
  const xTo = useRef<gsap.QuickToFunc>();
  const yTo = useRef<gsap.QuickToFunc>();

  useGSAP(() => {
    if (!ref.current) return;
    xTo.current = gsap.quickTo(ref.current, "x", { duration: 0.15, ease: "power3" });
    yTo.current = gsap.quickTo(ref.current, "y", { duration: 0.15, ease: "power3" });
  }, { scope: ref });

  return { xTo, yTo };
}

