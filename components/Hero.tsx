"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SplitText from "./SplitText";
import MagneticButton from "./MagneticButton";
import { personalInfo, stats } from "@/lib/data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Premium Hero Section with Awwwards-tier mechanics:
 * - Pixelated glitch text on load (single fire)
 * - Sticky scroll behaviors tied to GSAP ScrollTrigger
 * - Hardware accelerated reveal layers
 * - Live integrated magnetic buttons
 */
export default function Hero() {
  // Use custom GSAP hook to fade out and stick elements as user scrolls down
  // Trigger constraint: starts scrub transformation once hero top leaves viewport top
  const heroContentRef = useScrollAnimation<HTMLDivElement>({
    start: "top top",
    end: "bottom top",
    scrub: true,
    animationProps: {
      opacity: 0.05,
      scale: 0.95,
      y: 100,
    },
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center section-padding overflow-hidden z-10"
    >
      {/* ── Foreground flow wrapper tracked by GSAP ScrollTrigger ── */}
      <div ref={heroContentRef} className="relative z-10 max-w-5xl will-change-transform">
        {/* Eyebrow */}
        <motion.p
          className="text-accent-cyan text-sm font-mono tracking-widest uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          AI Full-Stack Developer Portfolio
        </motion.p>

        {/* Name with single-fire pixelated glitch sequence */}
        <h1 className="text-hero font-extrabold leading-[1.05] mb-4">
          <SplitText text={personalInfo.name} glitch={true} stagger={0.04} />
        </h1>

        {/* Tagline */}
        <motion.p
          className="text-section text-text-secondary font-light mb-6 max-w-2xl"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          {personalInfo.tagline}{" "}
          <span className="inline-block animate-pulse text-accent-cyan">→</span>
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          MERN stack developer with Python, Docker, CI/CD, Gemini API,
          TensorFlow, and cloud deployment experience across fintech,
          productivity, and eldercare projects.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          <MagneticButton
            as="a"
            href="#projects"
            className="px-8 py-3 rounded-xl bg-accent-cyan text-bg font-semibold text-sm tracking-wide hover:shadow-glow-lg transition-shadow focus-ring"
          >
            View Projects
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            className="px-8 py-3 rounded-xl border border-white/10 text-text-primary font-medium text-sm hover:border-accent-cyan/40 hover:bg-accent-cyan/5 transition-all focus-ring"
          >
            Contact Me
          </MagneticButton>
          <MagneticButton
            as="a"
            href={personalInfo.resume}
            target="_blank"
            rel="noopener"
            className="px-8 py-3 rounded-xl border border-white/10 text-text-secondary font-medium text-sm hover:border-accent-purple/40 hover:text-text-primary transition-all focus-ring"
          >
            Resume PDF
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap gap-8 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.1 }}
        >
          {stats.map((stat, i) => (
            <StatCounter
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              decimals={stat.decimals}
              delay={2.3 + i * 0.15}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
          animate={{ borderColor: ["rgba(255,255,255,0.2)", "rgba(0,240,255,0.3)", "rgba(255,255,255,0.2)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-accent-cyan"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── Stat counter with animated count-up ── */
function StatCounter({
  label,
  value,
  suffix,
  decimals = 0,
  delay,
}: {
  label: string;
  value: number;
  suffix: string;
  decimals: number;
  delay: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1500;
      const start = Date.now();
      const step = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Number((eased * value).toFixed(decimals)));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [value, delay, decimals]);

  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-text-primary">
        {count}
        <span className="text-accent-cyan">{suffix}</span>
      </div>
      <div className="text-xs text-text-muted uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  );
}
