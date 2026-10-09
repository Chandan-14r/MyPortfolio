"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/providers/AppProvider";
import { personas } from "@/lib/persona-config";
import { ThemeSwitcher } from "../chrome/ThemeSwitcher";

export function PersonaGate({ onComplete }: { onComplete: () => void }) {
  const { theme, setPersona, reducedMotion } = useApp();
  const [selected, setSelected] = useState<string | null>(null);
  const [exiting, setExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    setPersona(id as any);
    setExiting(true);
    setTimeout(() => {
      sessionStorage.setItem("gate-passed", "true");
      onComplete();
    }, 700);
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
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-bg flex flex-col items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <h1 className="text-3xl md:text-5xl font-display-cyber mb-12">Who's watching?</h1>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 max-w-4xl w-full justify-center">
            {Object.values(personas).map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                onClick={() => handleSelect(p.id)}
                className="group relative flex flex-col items-center gap-4 p-6 rounded-card border border-transparent hover:border-accent/50 focus-visible:border-accent outline-none bg-surface transition-all duration-300"
                whileHover={!reducedMotion ? { scale: 1.05 } : {}}
                whileFocus={!reducedMotion ? { scale: 1.05 } : {}}
              >
                <div className="w-24 h-24 rounded-full bg-bg-2 border border-border flex items-center justify-center group-hover:shadow-glow transition-shadow">
                  {p.id === "recruiter" && <span className="text-3xl">💼</span>}
                  {p.id === "developer" && <span className="text-3xl">{'</>'}</span>}
                  {p.id === "explorer" && <span className="text-3xl">🌍</span>}
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold capitalize">{p.id}</h2>
                  <p className="text-sm text-muted mt-2 max-w-[200px]">{p.emphasis}</p>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="absolute bottom-8 flex flex-col items-center gap-2">
            <span className="text-xs text-muted uppercase tracking-widest font-mono">Visual Engine</span>
            <ThemeSwitcher />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
