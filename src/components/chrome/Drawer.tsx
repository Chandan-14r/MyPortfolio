"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/providers/AppProvider";
import { personas } from "@/lib/persona-config";

export function Drawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { persona, reducedMotion } = useApp();
  const config = personas[persona];

  useEffect(() => {
    if (isOpen) {
      document.documentElement.setAttribute("data-lenis-prevent", "true");
    } else {
      document.documentElement.removeAttribute("data-lenis-prevent");
    }
  }, [isOpen]);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden">
      <button 
        onClick={toggle}
        className="fixed top-4 right-4 z-[60] p-2 bg-surface backdrop-blur-md rounded border border-border"
        aria-label="Toggle Menu"
      >
        <div className="space-y-1 w-5">
          <div className="h-[2px] bg-fg w-full" />
          <div className="h-[2px] bg-fg w-4" />
          <div className="h-[2px] bg-fg w-full" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={!reducedMotion ? { duration: 0.5, ease: [0.76, 0, 0.24, 1] } : { duration: 0 }}
            className="fixed inset-0 z-[55] bg-bg flex flex-col justify-center items-center"
            role="dialog"
            aria-modal="true"
          >
            <nav className="flex flex-col gap-6 text-center">
              {config.sectionOrder.map((section, i) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.2 }}
                  className="text-section font-bold capitalize text-fg hover:text-accent transition-colors"
                >
                  {section}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
