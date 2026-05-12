"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const filters = ["all", "fullstack", "ai", "cloud"] as const;
const filterLabels: Record<string, string> = {
  all: "All",
  fullstack: "Full Stack",
  ai: "AI",
  cloud: "Cloud",
};

/**
 * Filterable project grid section featuring mandatory requirements:
 * - GSAP stagger fade-up entry flows on container view arrival
 * - Direct integration with hardware-accelerated category card overlays
 */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Custom GSAP trigger constraint: initiates animation when top reaches 85% depth
  // Easing: power2.out profile applied automatically
  const headerRef = useScrollAnimation<HTMLDivElement>({
    type: "from",
    animationProps: {
      opacity: 0,
      y: 40,
      duration: 0.8,
    },
  });

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter));

  return (
    <section id="projects" className="section-padding relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* GSAP tracked reveal block */}
        <div ref={headerRef} className="will-change-transform">
          <p className="text-accent-purple text-sm font-mono tracking-widest uppercase mb-4">
            Selected Projects
          </p>
          <h2 className="text-section font-bold mb-12 max-w-2xl">
            Full-stack, AI, and cloud work samples{" "}
            <span className="text-text-muted">from real projects.</span>
          </h2>

          {/* Filter bar */}
          <div className="mb-10">
            <div
              className="inline-flex gap-1 p-1 rounded-xl bg-bg-card border border-white/5"
              role="group"
              aria-label="Filter projects"
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-4 py-2 text-sm rounded-lg transition-colors focus-ring ${
                    activeFilter === filter
                      ? "text-text-primary"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {activeFilter === filter && (
                    <motion.div
                      layoutId="filterPill"
                      className="absolute inset-0 bg-white/10 rounded-lg"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{filterLabels[filter]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project grid */}
        <motion.div className="grid md:grid-cols-2 gap-6" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
