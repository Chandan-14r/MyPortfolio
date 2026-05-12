"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { skillCategories } from "@/lib/data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Premium Skills Stack section featuring mandatory requirements:
 * - Animated gauges and metrics triggers locked to viewport intersection
 * - Highly optimized CSS marquee ticker streams
 * - Hardware accelerated reveal wrappers leveraging useScrollAnimation
 */
export default function Skills() {
  // Double items array to ensure flawless continuous infinite looping
  const row1 = [...skillCategories[0].items, ...skillCategories[1].items];
  const row2 = [...skillCategories[2].items, ...skillCategories[3].items];

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

  return (
    <section id="skills" className="py-24 md:py-32 lg:py-40 relative overflow-hidden z-10">
      <div className="section-padding pb-0">
        <div ref={headerRef} className="max-w-6xl mx-auto will-change-transform">
          <p className="text-accent-amber text-sm font-mono tracking-widest uppercase mb-4">
            Stack
          </p>
          <h2 className="text-section font-bold mb-6 max-w-xl">
            The tools I bring to{" "}
            <span className="gradient-text">every project</span>.
          </h2>
          <p className="text-text-secondary text-lg mb-16 max-w-xl">
            From frontend frameworks to AI APIs and cloud infrastructure — a
            full-spectrum toolkit for shipping production-grade products.
          </p>
        </div>
      </div>

      {/* Persistent Animated CSS Marquee loops */}
      <div className="space-y-4">
        <MarqueeRow items={row1} colors={[skillCategories[0].color, skillCategories[1].color]} direction="left" />
        <MarqueeRow items={row2} colors={[skillCategories[2].color, skillCategories[3].color]} direction="right" />
      </div>

      {/* Premium Category Viewport-Intersecting Progress Gauges Legend */}
      <div className="section-padding pt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat, i) => (
              <SkillGaugeCard key={cat.title} category={cat} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Edge vignette horizontal gradients */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />
    </section>
  );
}

/**
 * Underlying animated skill gauges triggered strictly when entering viewport
 */
function SkillGaugeCard({
  category,
  index,
}: {
  category: typeof skillCategories[0];
  index: number;
}) {
  const [progressValue, setProgressValue] = useState(0);
  const targetProficiency = 90 + (index % 3) * 4; // Generates dynamic premium scores: 90%, 94%, 98%

  return (
    <motion.div
      className="glass rounded-xl p-5 relative overflow-hidden flex flex-col justify-between group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onViewportEnter={() => {
        // Increment gauge integer state sequentially
        let current = 0;
        const interval = setInterval(() => {
          current += 2;
          if (current >= targetProficiency) {
            setProgressValue(targetProficiency);
            clearInterval(interval);
          } else {
            setProgressValue(current);
          }
        }, 20);
      }}
      whileHover={{ borderColor: `${category.color}40` }}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <h3 className="text-sm font-semibold text-text-primary">
              {category.title}
            </h3>
          </div>
          <span className="text-xs font-mono font-bold" style={{ color: category.color }}>
            {progressValue}%
          </span>
        </div>

        {/* Viewport Intersecting Progress Bar Gauge */}
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-4 relative">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: category.color }}
            initial={{ width: "0%" }}
            whileInView={{ width: `${targetProficiency}%` }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 + index * 0.1 }}
          />
        </div>

        {/* Stack items string mapping */}
        <div className="flex flex-wrap gap-1.5">
          {category.items.map((item) => (
            <span
              key={item}
              className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-text-secondary border border-white/5 group-hover:border-white/10 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MarqueeRow({
  items,
  colors,
  direction,
}: {
  items: string[];
  colors: string[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];

  return (
    <div className="relative flex overflow-hidden">
      <motion.div
        className={`flex gap-4 ${
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
        }`}
      >
        {doubled.map((skill, i) => {
          const colorIndex = i < items.length / 2 ? 0 : 1;
          return (
            <div
              key={`${skill}-${i}`}
              className="flex-shrink-0 px-5 py-3 rounded-xl bg-bg-card border border-white/5 hover:border-white/15 transition-all group whitespace-nowrap"
            >
              <span className="flex items-center gap-2 text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                <span
                  className="w-1.5 h-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: colors[colorIndex % colors.length] }}
                />
                {skill}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
