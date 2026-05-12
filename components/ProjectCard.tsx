"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * Individual project card featuring premium hover effects:
 * - Inner glass layer revealing case study links and expanded context
 * - Fluid glowing border responses mapped directly to category accent tokens
 * - Hardware-accelerated entrance cascades
 */
export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      className="group relative bg-bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 will-change-transform"
      initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.02,
      }}
    >
      {/* Outer reactive hover glowing border layer */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
        style={{
          boxShadow: `inset 0 0 0 1.5px ${project.color}50, 0 0 25px ${project.color}20`,
        }}
      />

      {/* Thumbnail block with interactive inner hover glass layer */}
      <div className="relative h-48 md:h-52 overflow-hidden bg-bg-surface">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/20 to-transparent z-10" />

        {/* Inner Glass Layer Reveal on Hover */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-400 z-20 flex flex-col justify-center items-center p-4 text-center gap-2">
          <span
            className="text-xs uppercase tracking-widest font-mono font-bold"
            style={{ color: project.color }}
          >
            Explore Architecture
          </span>
          <p className="text-xs text-text-primary max-w-xs line-clamp-3 px-2">
            Click to analyze stack configurations, live endpoints, and continuous deployment workflows.
          </p>
          <span className="mt-2 px-4 py-1.5 rounded-lg bg-white/10 text-xs font-semibold text-white border border-white/10 hover:bg-white/20 transition-colors">
            Open Details →
          </span>
        </div>

        {/* Project category micro-tag */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className="text-xs font-mono px-2.5 py-1 rounded-md bg-bg-card/90 backdrop-blur-sm"
            style={{
              color: project.color,
              border: `1px solid ${project.color}30`,
            }}
          >
            {project.type}
          </span>
        </div>
      </div>

      {/* Persistent Content section */}
      <div className="p-6 space-y-4 relative z-10">
        <h3 className="text-xl font-bold text-text-primary group-hover:text-white transition-colors">
          {project.title}
        </h3>

        <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tags mapping */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md bg-white/5 text-text-muted border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View indication link */}
        <div className="flex items-center gap-2 pt-2">
          <span
            className="text-sm font-medium transition-colors"
            style={{ color: project.color }}
          >
            View Case Study
          </span>
          <motion.span
            className="text-sm"
            style={{ color: project.color }}
            initial={{ x: 0, opacity: 0.5 }}
            whileHover={{ x: 0 }}
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}
