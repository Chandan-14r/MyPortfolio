"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/providers/AppProvider";
import { personas } from "@/lib/persona-config";
import { ThemeSwitcher } from "../chrome/ThemeSwitcher";
import { Briefcase, Code2, Globe } from "lucide-react";
import { useSplitText } from "@/lib/motion";

export function PersonaGate({ onComplete }: { onComplete: () => void }) {
  const { theme, setPersona, reducedMotion } = useApp();
  const [selected, setSelected] = useState<string | null>(null);
  const [exiting, setExiting] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  useSplitText(headerRef);

  const handleSelect = (id: string) => {
    setSelected(id);
    setPersona(id as any);
    setExiting(true);
    setTimeout(() => {
      sessionStorage.setItem("gate-passed", "true");
      onComplete();
    }, 800);
  };

  const handleMouseMove = (e: React.MouseEvent, currentTarget: HTMLElement) => {
    if (reducedMotion) return;
    const rect = currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  if (exiting && reducedMotion) {
    onComplete();
    return null;
  }

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-bg flex flex-col items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
          
          <h1 ref={headerRef} className="text-3xl md:text-5xl font-display-cyber mb-12 relative z-10" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
            Who's watching?
          </h1>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 max-w-4xl w-full justify-center relative z-10">
            {Object.values(personas).map((p, i) => {
              const isSelected = selected === p.id;
              const isOtherSelected = selected && !isSelected;
              
              return (
                <motion.button
                  key={p.id}
                  layoutId={`persona-${p.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isOtherSelected ? 0 : 1, 
                    y: isOtherSelected ? 20 : 0,
                    scale: isSelected ? 1.5 : 1
                  }}
                  transition={{ 
                    delay: isSelected ? 0 : i * 0.1 + 0.2,
                    duration: isSelected ? 0.8 : 0.4,
                    ease: isSelected ? [0.16, 1, 0.3, 1] : "easeOut"
                  }}
                  onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                  onClick={() => handleSelect(p.id)}
                  className="group relative flex flex-col items-center gap-4 p-6 rounded-card bg-surface transition-transform overflow-hidden outline-none"
                  style={{ zIndex: isSelected ? 50 : 1 }}
                  whileHover={!reducedMotion && !selected ? { scale: 1.05, rotateY: 5, rotateX: -5 } : {}}
                  whileFocus={!reducedMotion && !selected ? { scale: 1.05 } : {}}
                >
                  {/* Spotlight border */}
                  {!reducedMotion && !selected && (
                    <div 
                      className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 rounded-card"
                      style={{
                        background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.4), transparent 40%)`
                      }}
                    />
                  )}
                  {/* Inner background */}
                  <div className="absolute inset-[1px] bg-bg rounded-[calc(var(--radius-card)-1px)] z-0" />

                  <div className="relative z-10 w-24 h-24 rounded-full bg-bg-2 border border-border flex items-center justify-center group-hover:shadow-glow transition-shadow text-muted group-hover:text-fg">
                    {p.id === "recruiter" && <Briefcase className="w-8 h-8" />}
                    {p.id === "developer" && <Code2 className="w-8 h-8" />}
                    {p.id === "explorer" && <Globe className="w-8 h-8" />}
                  </div>
                  <div className="relative z-10 text-center">
                    <h2 className="text-xl font-bold capitalize">{p.id}</h2>
                    <motion.p 
                      animate={{ opacity: isSelected ? 0 : 1 }}
                      className="text-sm text-muted mt-2 max-w-[200px]"
                    >
                      {p.emphasis}
                    </motion.p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div 
            animate={{ opacity: selected ? 0 : 1 }}
            className="absolute bottom-8 flex flex-col items-center gap-2 relative z-10"
          >
            <span className="text-xs text-muted uppercase tracking-widest font-mono">Visual Engine</span>
            <ThemeSwitcher />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
