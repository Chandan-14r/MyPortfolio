"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useApp } from "@/providers/AppProvider";
import { personalInfo } from "@/lib/portfolio-data";
import { personas } from "@/lib/persona-config";
import { Particles } from "@/components/primitives/Particles";

export function CyberHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const { persona, reducedMotion, isTouch } = useApp();
  const config = personas[persona];

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }));
    updateTime();
    const t = setInterval(updateTime, 1000);
    return () => clearInterval(t);
  }, []);

  useGSAP(() => {
    if (reducedMotion || !containerRef.current || !titleRef.current || !portraitRef.current) return;

    // Pointer math for variable font weight on title characters
    const chars = titleRef.current.children;
    const handleMouse = (e: MouseEvent) => {
      if (isTouch) return;
      const { clientX, clientY } = e;
      
      // Calculate font weight based on distance
      Array.from(chars).forEach((char: Element) => {
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;
        const dist = Math.sqrt(Math.pow(clientX - charX, 2) + Math.pow(clientY - charY, 2));
        
        // Closer = heavier. Range ~200 to 800
        const weight = Math.max(200, 800 - dist * 1.5);
        // Using font-variation-settings for variable fonts
        (char as HTMLElement).style.fontVariationSettings = `"wght" ${weight}`;
        
        // Parallax push
        const pushX = (charX - clientX) * 0.05;
        const pushY = (charY - clientY) * 0.05;
        gsap.to(char, { x: pushX, y: pushY, duration: 0.4, ease: "power2.out" });
      });

      // Portrait 3-layer parallax
      const relX = (clientX / window.innerWidth - 0.5) * 2;
      const relY = (clientY / window.innerHeight - 0.5) * 2;
      
      gsap.to(portraitRef.current, {
        x: relX * -40,
        y: relY * -40,
        rotateY: relX * 10,
        rotateX: relY * -10,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouse);

    // Scroll scrub handoff
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    tl.to(chars, {
      skewY: 10,
      scaleY: 1.5,
      y: -100,
      opacity: 0,
      stagger: 0.05
    }, 0)
    .to(portraitRef.current, {
      scale: 0.8,
      clipPath: "inset(20% 20% 20% 20%)",
      y: 100,
      opacity: 0.5
    }, 0);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
    };
  }, { scope: containerRef, dependencies: [reducedMotion, isTouch] });

  const titleChars = (personalInfo.name.toUpperCase() || "PORTFOLIO").split("");

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden pt-20 pb-12 bg-bg"
      id="hero"
    >
      <Particles />

      {/* Live strip */}
      <div className="absolute top-24 left-6 md:left-12 flex flex-col gap-1 z-30 font-mono text-xs text-accent">
        <div>SYS.TIME: {time}</div>
        <div>LOC: Earth</div>
      </div>

      {/* Layer 0: Giant Text */}
      <div 
        ref={titleRef}
        className="absolute z-10 flex items-center justify-center w-full text-[12vw] md:text-[10vw] font-display-cyber leading-none tracking-tighter whitespace-nowrap select-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20"
      >
        {titleChars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block relative transition-colors duration-300"
            style={{ fontVariationSettings: '"wght" 800' }} // Default weight
            initial={{ opacity: 0, y: 100, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1, delay: 1.5 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>

      {/* Layer 1: Portrait */}
      <motion.div
        ref={portraitRef}
        className="relative z-20 w-[80vw] max-w-[500px] aspect-[3/4] md:aspect-square pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
        initial={{ filter: "blur(20px) brightness(0.5)", opacity: 0, scale: 0.9 }}
        animate={{ filter: "blur(0px) brightness(1)", opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={personalInfo.photo}
          alt={personalInfo.name}
          fill
          priority
          className="object-contain object-bottom drop-shadow-2xl"
          sizes="(max-width: 768px) 80vw, 500px"
        />
        {/* Idle breathing overlay */}
        <motion.div 
          className="absolute inset-0 bg-accent mix-blend-overlay opacity-0"
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Layer 2: UI Overlays based on persona */}
      <motion.div 
        className="absolute bottom-12 md:bottom-20 flex flex-col items-center gap-6 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col items-center text-center">
          <h2 className="text-xl md:text-2xl font-mono text-fg bg-bg/50 px-4 py-1 rounded backdrop-blur border border-border/50">
            {personalInfo.role}
          </h2>
          
          <div className="mt-6 flex flex-col items-center gap-4">
            <a 
              href={config.primaryCta.href}
              className="px-8 py-4 rounded-pill bg-accent text-on-accent font-bold hover:bg-white transition-colors"
            >
              {config.primaryCta.label}
            </a>
            
            {/* Persona specifics */}
            {persona === "developer" && (
              <div className="flex flex-col items-center font-mono text-xs text-muted">
                <span>&gt; Stack verified. Repos ready.</span>
                <span className="text-accent animate-pulse">&gt; _</span>
              </div>
            )}
            {persona === "recruiter" && (
              <div className="flex gap-4 font-mono text-xs text-muted">
                <span>IMPACT: HIGH</span>
                <span>AVAILABILITY: YES</span>
              </div>
            )}
            {persona === "explorer" && (
              <div className="font-mono text-xs text-muted animate-pulse">
                Scroll to begin journey ↓
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
