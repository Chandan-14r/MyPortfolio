"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "@/lib/portfolio-data";
import { ease } from "@/lib/motion";
import { Reveal } from "@/components/primitives/Reveal";
import { cn } from "@/lib/cn";

export function SeriesSkills() {
  const [activeTab, setActiveTab] = useState(0);
  const activeCategory = skillCategories[activeTab];

  return (
    <section className="relative w-full py-24 bg-bg" id="skills">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <h2 className="text-section font-display-series mb-8 text-center md:text-left">Skill Universe</h2>
        </Reveal>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Tabs */}
          <div className="w-full md:w-64 flex flex-row md:flex-col gap-2 overflow-x-auto no-scrollbar">
            {skillCategories.map((cat, idx) => (
              <button
                key={cat.title}
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "text-left px-4 py-3 rounded whitespace-nowrap transition-colors",
                  activeTab === idx
                    ? "bg-surface border-l-2 border-accent text-white font-bold"
                    : "text-muted hover:bg-surface/50 border-l-2 border-transparent hover:text-white"
                )}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Tiles */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: ease.out }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {activeCategory.items.map((skill, i) => {
                  // Determine meter segments based on level
                  const levelVal = skill.level === "Daily driver" ? 3 : skill.level === "Comfortable" ? 2 : 1;
                  
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 + 0.2, duration: 0.4, ease: ease.out }}
                      className="bg-bg-2 p-5 rounded-card border border-border flex flex-col gap-4"
                    >
                      <h4 className="font-bold text-fg">{skill.name}</h4>
                      
                      <div className="flex flex-col gap-2 mt-auto">
                        <div className="flex gap-1 h-1.5 w-full">
                          {[1, 2, 3].map((segment) => (
                            <motion.div
                              key={segment}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ 
                                delay: i * 0.05 + 0.3 + (segment * 0.1), 
                                duration: 0.4, 
                                ease: ease.out 
                              }}
                              className={cn(
                                "flex-1 rounded-sm origin-left",
                                segment <= levelVal ? "bg-accent" : "bg-surface"
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-muted uppercase font-bold tracking-wider">
                          {skill.level}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
