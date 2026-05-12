"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { personalInfo } from "@/lib/data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * About section with mandatory Awwwards-level mechanics:
 * - Text blocks sliding in from alternating left/right entry vectors
 * - Individual staggered words reveal on viewport intersection
 * - High-end glow ring animations wrapping priority portrait
 * - Interactive Git terminal snippet showcasing engineering character
 */
export default function About() {
  // GSAP triggers sliding text blocks in from the left side
  // Trigger constraint: starts animation when top crosses 85% viewport depth
  const leftSlideRef = useScrollAnimation<HTMLDivElement>({
    type: "from",
    animationProps: {
      x: -120,
      opacity: 0,
      ease: "power3.out",
      duration: 1,
    },
  });

  // GSAP triggers photo and terminal sliding in from the right side
  const rightSlideRef = useScrollAnimation<HTMLDivElement>({
    type: "from",
    animationProps: {
      x: 120,
      opacity: 0,
      ease: "power3.out",
      duration: 1,
    },
  });

  const bioParagraphs = [
    "Computer Science graduate from Bangalore Institute of Technology, building AI-powered full-stack products that ship directly to production.",
    "MERN stack developer deeply experienced with Python, Docker pipelines, CI/CD workflows, Gemini API, TensorFlow architectures, and highly resilient cloud deployments.",
    "I thrive at the intersection of complex backend algorithms and premium visual interfaces. With engineering experience spanning fintech modules, productivity platforms, and automated predictive healthcare systems, I prioritize robust delivery.",
  ];

  return (
    <section id="about" className="section-padding relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section title sliding from top */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-accent-cyan text-sm font-mono tracking-widest uppercase mb-4">
            About Me
          </p>
          <h2 className="text-section font-bold max-w-xl">
            Building digital products with{" "}
            <span className="gradient-text-cyan">real impact</span>.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* ── Left Column: Side-Sliding Text Blocks with Staggered Words ── */}
          <div ref={leftSlideRef} className="space-y-8 will-change-transform">
            <div className="space-y-6">
              {bioParagraphs.map((paragraph, pIdx) => {
                const words = paragraph.split(" ");
                return (
                  <p key={pIdx} className="text-text-secondary text-lg leading-relaxed flex flex-wrap gap-x-1.5">
                    {words.map((word, wIdx) => (
                      <motion.span
                        key={wIdx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                          duration: 0.4,
                          delay: wIdx * 0.015,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="inline-block"
                      >
                        {word}{" "}
                      </motion.span>
                    ))}
                  </p>
                );
              })}
            </div>

            {/* Quick facts */}
            <div className="flex flex-wrap gap-3 pt-2">
              {["AWS Community Builder", "Top 2% Cohort", "200+ LeetCode"].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 text-xs font-mono rounded-lg bg-bg-card border border-white/5 text-text-secondary"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right Column: Side-Sliding Photo & Terminal Snippet ── */}
          <div ref={rightSlideRef} className="flex flex-col items-center gap-10 will-change-transform">
            {/* Portrait Container */}
            <div className="relative">
              {/* Animated aura ring behind photo */}
              <motion.div
                className="absolute -inset-4 rounded-3xl opacity-40"
                style={{
                  background: "linear-gradient(135deg, rgba(0,240,255,0.25), rgba(139,92,246,0.25))",
                  filter: "blur(30px)",
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.03, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Photo layer */}
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden border border-white/10 glass">
                <Image
                  src={personalInfo.photo}
                  alt={`${personalInfo.name} portrait`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 288px, 320px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
              </div>

              {/* Floating micro-badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-16 h-16 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center glass"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-accent-cyan text-xl">⚡</span>
              </motion.div>
            </div>

            {/* Terminal snippet */}
            <div className="w-full max-w-sm glass rounded-xl p-4 font-mono text-xs md:text-sm border-gradient">
              <div className="flex gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <p className="text-text-muted">
                <span className="text-accent-cyan">$</span> git log --oneline -3
              </p>
              <p className="text-text-secondary mt-1">
                <span className="text-accent-amber">a3f2d1e</span> feat: deploy inheritance-os to GCP Cloud Run
              </p>
              <p className="text-text-secondary">
                <span className="text-accent-amber">b7c4e2f</span> perf: optimize MongoDB queries with compound index
              </p>
              <p className="text-text-secondary">
                <span className="text-accent-amber">d9a1b3c</span> feat: integrate Gemini API for document parsing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
