"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface RailProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function Rail({ children, className, title }: RailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scrollBy = (direction: 1 | -1) => {
    if (!containerRef.current) return;
    const { clientWidth } = containerRef.current;
    containerRef.current.scrollBy({ left: (clientWidth * 0.8) * direction, behavior: "smooth" });
  };

  return (
    <div className="relative group w-full mb-12">
      {title && (
        <div className="px-6 md:px-12 mb-4">
          <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
        </div>
      )}
      
      <div 
        ref={containerRef}
        onScroll={checkScroll}
        className={cn(
          "flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 md:px-12 gap-4 pb-8 pt-4",
          className
        )}
        data-lenis-prevent
      >
        {children}
      </div>

      {/* Chevrons */}
      {canScrollLeft && (
        <button 
          onClick={() => scrollBy(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur border border-white/20 rounded-full text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity hidden md:block"
          aria-label="Scroll left"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      
      {canScrollRight && (
        <button 
          onClick={() => scrollBy(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur border border-white/20 rounded-full text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity hidden md:block"
          aria-label="Scroll right"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Edge Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-bg to-transparent pointer-events-none hidden md:block" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-bg to-transparent pointer-events-none hidden md:block" />
    </div>
  );
}
