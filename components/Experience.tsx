"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/lib/data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Vertical Experience timeline featuring mandatory requirements:
 * - Alternating horizontal entry sliding vectors (left/right staggered entries)
 * - Animated hardware-accelerated connection pipeline tracking overall section progress
 * - Integration with useScrollAnimation header triggers
 */
export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  // GSAP custom hook triggering container introduction
  // Trigger constraint: starts reveal cascade when top crosses 85% depth
  const headerRef = useScrollAnimation<HTMLDivElement>({
    type: "from",
    animationProps: {
      opacity: 0,
      y: 40,
      duration: 0.8,
    },
  });

  // Timeline fluid rendering pipeline
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="section-padding relative z-10" ref={containerRef}>
      <div className="max-w-4xl mx-auto">
        <div ref={headerRef} className="will-change-transform">
          <p className="text-accent-cyan text-sm font-mono tracking-widest uppercase mb-4">
            Experience
          </p>
          <h2 className="text-section font-bold mb-16 max-w-xl">
            Internship and project experience with{" "}
            <span className="text-text-muted">real delivery pressure.</span>
          </h2>
        </div>

        {/* Timeline structural layout */}
        <div className="relative pl-8 md:pl-12">
          {/* Animated vertical gradient bar */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5">
            <motion.div
              className="w-full bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-amber"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Staggered Alternating Entries */}
          <div className="space-y-16 overflow-hidden">
            {experience.map((entry, i) => (
              <TimelineEntry key={entry.title} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({
  entry,
  index,
}: {
  entry: (typeof experience)[number];
  index: number;
}) {
  // Map index parity to alternating horizontal slide configurations
  // Even index slides from Left (-80px), Odd index slides from Right (80px)
  const isEven = index % 2 === 0;
  const initialX = isEven ? -80 : 80;

  return (
    <motion.div
      className="relative glass rounded-xl p-6 border-gradient will-change-transform"
      initial={{ opacity: 0, x: initialX, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ borderColor: "rgba(0, 240, 255, 0.3)" }}
    >
      {/* Timeline indicator node */}
      <motion.div
        className="absolute -left-8 md:-left-12 top-6 w-3 h-3 rounded-full border-2 border-accent-cyan bg-bg shadow-glow-sm"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
      />

      {/* Entry header mapping */}
      <h3 className="text-lg font-semibold text-text-primary">
        {entry.title}
      </h3>
      <p className="text-accent-cyan text-sm mb-3">{entry.company}</p>

      {/* Description body */}
      <p className="text-text-secondary leading-relaxed mb-4 text-sm md:text-base">
        {entry.description}
      </p>

      {/* Tags payload string presentation */}
      <div className="flex flex-wrap gap-2">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-md bg-white/5 text-text-muted border border-white/5"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
