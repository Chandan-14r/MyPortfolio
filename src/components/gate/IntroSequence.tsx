"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/providers/AppProvider";
import { personalInfo } from "@/lib/portfolio-data";

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const { theme, reducedMotion } = useApp();
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    const duration = 1500;
    const interval = 30;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min(100, Math.floor((currentStep / steps) * 100)));
      if (currentStep >= steps) {
        clearInterval(timer);
        setIsDone(true);
        setTimeout(onComplete, 300); // Wait for fade out
      }
    }, interval);

    const handleSkip = (e: KeyboardEvent | MouseEvent) => {
      if ((e as KeyboardEvent).key === "Escape" || e.type === "click") {
        clearInterval(timer);
        setIsDone(true);
        onComplete();
      }
    };

    window.addEventListener("keydown", handleSkip);
    window.addEventListener("click", handleSkip);

    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", handleSkip);
      window.removeEventListener("click", handleSkip);
    };
  }, [onComplete, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[150] bg-bg flex flex-col items-center justify-center p-8 cursor-pointer"
        >
          {theme === "cyber" ? (
            <div className="w-full max-w-md flex flex-col items-center gap-4">
              <div className="text-6xl font-mono font-bold text-fg">{progress}%</div>
              <div className="w-full h-1 bg-surface overflow-hidden">
                <motion.div 
                  className="h-full bg-accent"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-accent/20 mix-blend-overlay"
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.5, ease: "linear" }}
              />
              <h1 className="text-4xl md:text-7xl font-display-series tracking-widest text-fg mix-blend-difference">
                {personalInfo.name.toUpperCase()}
              </h1>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
