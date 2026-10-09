"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/lib/portfolio-data";
import { ease, spring } from "@/lib/motion";
import { Reveal } from "@/components/primitives/Reveal";
import { cn } from "@/lib/cn";

export function CyberServices() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full py-24 bg-bg border-t border-border" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <h2 className="text-section font-display-cyber mb-12 uppercase">01. Services</h2>
        </Reveal>

        <div className="flex flex-col border-t border-border">
          {services.map((service, idx) => {
            const isOpen = openIndex === idx;
            
            return (
              <div 
                key={service.id}
                className="group relative border-b border-border overflow-hidden"
                onMouseEnter={() => setOpenIndex(idx)}
                onMouseLeave={() => setOpenIndex(null)}
              >
                {/* Wipe-up inversion background */}
                <motion.div
                  className="absolute inset-0 bg-accent origin-bottom z-0"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: ease.out }}
                />

                <button
                  aria-expanded={isOpen}
                  className="relative z-10 w-full text-left px-4 py-8 flex items-center justify-between outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <div className="flex items-center gap-8">
                    <span className={cn(
                      "font-mono text-sm transition-colors duration-300",
                      isOpen ? "text-on-accent" : "text-muted"
                    )}>
                      0{idx + 1}
                    </span>
                    <h3 className={cn(
                      "text-2xl md:text-4xl font-bold uppercase transition-colors duration-300",
                      isOpen ? "text-on-accent" : "text-fg"
                    )}>
                      {service.title}
                    </h3>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={spring.soft}
                    className={cn(
                      "text-2xl transition-colors duration-300",
                      isOpen ? "text-on-accent" : "text-accent"
                    )}
                  >
                    ↗
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: ease.out }}
                      className="relative z-10 overflow-hidden"
                    >
                      <div className="px-4 pb-8 pt-4 flex flex-col md:flex-row gap-8 md:gap-16">
                        <ul className="flex-1 space-y-3 font-mono text-sm text-on-accent/80">
                          {service.checklist.map((item, i) => (
                            <motion.li
                              key={item}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04 + 0.1 }}
                              className="flex items-center gap-3"
                            >
                              <span className="text-on-accent font-bold">✓</span> {item}
                            </motion.li>
                          ))}
                        </ul>
                        <div className="flex-1 border-l border-on-accent/20 pl-8">
                          <p className="text-lg text-on-accent font-medium max-w-md">
                            {service.value}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
