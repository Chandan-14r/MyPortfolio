"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useApp } from "@/providers/AppProvider";

type CursorState = "default" | "link" | "view" | "drag" | "text" | "hidden";

export function Cursor() {
  const { reducedMotion, isTouch } = useApp();
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>("hidden");

  useGSAP(() => {
    if (reducedMotion || isTouch || !cursorRef.current) return;

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      // Offset by half width/height (16px)
      xTo(e.clientX - 16);
      yTo(e.clientY - 16);
      if (cursorState === "hidden") setCursorState("default");
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isLink = target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a");
      const isText = window.getSelection()?.type === "Range" || target.tagName === "P" || target.tagName === "H1" || target.tagName === "H2" || target.tagName === "H3";
      
      const customCursor = target.closest('[data-cursor]');
      
      if (customCursor) {
        setCursorState(customCursor.getAttribute('data-cursor') as CursorState);
      } else if (isLink) {
        setCursorState("link");
      } else if (isText) {
        setCursorState("text");
      } else {
        setCursorState("default");
      }
    };

    const handleMouseLeave = () => setCursorState("hidden");

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { dependencies: [reducedMotion, isTouch, cursorState] });

  // Handle state animations
  useGSAP(() => {
    if (!cursorRef.current || !textRef.current) return;

    const el = cursorRef.current;
    const txt = textRef.current;

    switch (cursorState) {
      case "link":
        gsap.to(el, { scale: 1.5, backgroundColor: "rgba(255,255,255,1)", borderColor: "transparent", duration: 0.3 });
        gsap.to(txt, { opacity: 0, scale: 0, duration: 0.2 });
        break;
      case "view":
        gsap.to(el, { scale: 3, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,1)", duration: 0.4, ease: "back.out(2)" });
        txt.innerText = "VIEW";
        gsap.to(txt, { opacity: 1, scale: 1, duration: 0.3, delay: 0.1 });
        break;
      case "drag":
        gsap.to(el, { scale: 3, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,1)", duration: 0.4, ease: "back.out(2)" });
        txt.innerText = "DRAG";
        gsap.to(txt, { opacity: 1, scale: 1, duration: 0.3, delay: 0.1 });
        break;
      case "text":
        gsap.to(el, { scale: 0.5, backgroundColor: "rgba(255,255,255,0)", borderColor: "rgba(255,255,255,0.5)", duration: 0.3 });
        gsap.to(txt, { opacity: 0, scale: 0, duration: 0.2 });
        break;
      case "hidden":
        gsap.to(el, { opacity: 0, duration: 0.2 });
        break;
      default: // default
        gsap.to(el, { opacity: 1, scale: 1, backgroundColor: "rgba(255,255,255,0)", borderColor: "rgba(255,255,255,1)", duration: 0.3 });
        gsap.to(txt, { opacity: 0, scale: 0, duration: 0.2 });
        break;
    }
  }, { dependencies: [cursorState] });

  if (reducedMotion || isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] mix-blend-difference hidden md:flex items-center justify-center rounded-full border border-white/50"
      style={{ opacity: 0 }}
    >
      <div className="w-1 h-1 bg-white rounded-full mix-blend-difference absolute" />
      <div 
        ref={textRef} 
        className="text-[6px] font-bold tracking-widest text-white mix-blend-difference opacity-0 scale-0 absolute pointer-events-none"
      />
    </div>
  );
}
