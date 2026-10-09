"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useApp } from "@/providers/AppProvider";
import { personalInfo } from "@/lib/portfolio-data";
import { personas } from "@/lib/persona-config";
import { ease, spring } from "@/lib/motion";

export function CyberHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { persona, reducedMotion, isTouch } = useApp();
  const config = personas[persona];

  // Cursor parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, spring.parallax);
  const smoothY = useSpring(mouseY, spring.parallax);

  // Scroll parallax fallback for touch
  const { scrollY } = useScroll();
  const scrollYSpring = useSpring(scrollY, { stiffness: 100, damping: 30 });
  const touchParallax = useTransform(scrollYSpring, [0, 1000], [0, 200]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion || isTouch) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
    mouseX.set(x);
    mouseY.set(y);
  };

  const titleChars = (personalInfo.name.toUpperCase() || "PORTFOLIO").split("");

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden pt-20 pb-12"
      id="hero"
    >
      {/* Layer 0: Giant Text */}
      <motion.div 
        className="absolute z-0 flex items-center justify-center w-full text-[12vw] md:text-[10vw] font-display-cyber leading-none font-bold tracking-tighter whitespace-nowrap"
        style={!reducedMotion && !isTouch ? { x: useTransform(smoothX, [-1, 1], [-20, 20]), y: useTransform(smoothY, [-1, 1], [-20, 20]) } : { y: touchParallax }}
      >
        <div className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20 select-none">
          {titleChars.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block relative"
              initial={{ opacity: 0, y: 100, clipPath: "inset(100% 0 0 0)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1, delay: 1.5 + i * 0.04, ease: ease.out }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Layer 1: Portrait */}
      <motion.div
        className="relative z-10 w-[80vw] max-w-[500px] aspect-[3/4] md:aspect-square pointer-events-none"
        style={!reducedMotion && !isTouch ? { x: useTransform(smoothX, [-1, 1], [-40, 40]), y: useTransform(smoothY, [-1, 1], [-40, 40]) } : { y: useTransform(touchParallax, v => typeof v === 'number' ? v * 0.5 : v) }}
        initial={{ filter: "blur(20px) brightness(0.5)", opacity: 0 }}
        animate={{ filter: "blur(0px) brightness(1)", opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5, ease: ease.out }}
      >
        <Image
          src={personalInfo.photo}
          alt={personalInfo.name}
          fill
          priority
          className="object-contain object-bottom"
          sizes="(max-width: 768px) 80vw, 500px"
        />
      </motion.div>

      {/* Layer 2: UI Overlays */}
      <motion.div 
        className="absolute bottom-32 md:bottom-20 flex flex-col md:flex-row items-center gap-6 z-20"
        style={!reducedMotion && !isTouch ? { x: useTransform(smoothX, [-1, 1], [-10, 10]), y: useTransform(smoothY, [-1, 1], [-10, 10]) } : {}}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5, ease: ease.out }}
      >
        <div className="flex flex-col items-center md:items-start">
          <p className="text-xl md:text-2xl font-mono text-fg bg-bg/50 px-4 py-1 rounded backdrop-blur">
            {personalInfo.role}
          </p>
          <div className="flex gap-3 mt-4">
            <a 
              href={config.primaryCta.href}
              className="px-6 py-3 rounded-pill bg-accent text-on-accent font-bold hover:bg-white transition-colors"
            >
              {config.primaryCta.label}
            </a>
            {persona === "developer" && (
              <div className="flex items-center px-4 py-2 border border-accent/50 text-accent font-mono text-xs rounded-pill bg-bg/50 backdrop-blur">
                <span className="mr-2">&gt;</span> init_protocol
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
