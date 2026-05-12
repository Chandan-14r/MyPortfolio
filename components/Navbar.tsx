"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { navLinks, personalInfo } from "@/lib/data";

/**
 * Glassmorphism sticky navbar.
 * - Appears after scrolling past hero
 * - Scroll progress indicator bar at bottom
 * - Active section detection via scroll position
 */
export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress, scrollY } = useScroll();

  // Show navbar after scrolling 100px
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 100);
  });

  // Detect active section
  useMotionValueEvent(scrollY, "change", () => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    for (const id of sections.reverse()) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          setActiveSection(id);
          break;
        }
      }
    }
  });

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <nav
        className="glass-strong mx-4 mt-4 rounded-2xl px-6 py-3 flex items-center justify-between"
        aria-label="Primary navigation"
      >
        {/* Brand */}
        <a
          href="#hero"
          className="flex items-center gap-3 group focus-ring rounded-lg"
        >
          <span className="w-9 h-9 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan font-bold text-sm group-hover:bg-accent-cyan/20 transition-colors">
            CR
          </span>
          <span className="font-semibold text-sm text-text-primary hidden sm:block">
            {personalInfo.name}
          </span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative px-3 py-1.5 text-sm rounded-lg transition-colors focus-ring ${
                activeSection === link.href.replace("#", "")
                  ? "text-accent-cyan"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {link.label}
              {activeSection === link.href.replace("#", "") && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-accent-cyan/10 rounded-lg"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:block text-sm px-4 py-1.5 rounded-lg bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 hover:bg-accent-cyan/20 transition-colors focus-ring"
        >
          Contact
        </a>
      </nav>

      {/* Scroll progress bar */}
      <motion.div
        className="h-[2px] bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-amber origin-left mx-4"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.header>
  );
}
