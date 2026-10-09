"use client";

import { useEffect, useRef } from "react";
import { skillCategories } from "@/lib/portfolio-data";
import { useApp } from "@/providers/AppProvider";
import { Reveal } from "@/components/primitives/Reveal";
import { Marquee } from "@/components/primitives/Marquee";
import { cn } from "@/lib/cn";

export function CyberSkills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion, isTouch } = useApp();

  // Combine skills into two rows
  const allSkills = skillCategories.flatMap(c => c.items.map(i => ({ ...i, color: c.color })));
  const half = Math.ceil(allSkills.length / 2);
  const row1 = allSkills.slice(0, half);
  const row2 = allSkills.slice(half);

  useEffect(() => {
    if (reducedMotion || isTouch || !containerRef.current) return;
    
    const container = containerRef.current;
    
    const handleEnter = () => {
      const animations = container.getAnimations({ subtree: true });
      animations.forEach(anim => {
        anim.playbackRate = 0.2;
      });
    };
    
    const handleLeave = () => {
      const animations = container.getAnimations({ subtree: true });
      animations.forEach(anim => {
        anim.playbackRate = 1.0;
      });
    };

    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mouseenter", handleEnter);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, [reducedMotion, isTouch]);

  return (
    <section className="relative w-full py-24 bg-bg overflow-hidden" id="skills">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <Reveal>
          <h2 className="text-section font-display-cyber uppercase">02. Skills</h2>
        </Reveal>
      </div>

      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

      <div ref={containerRef} className="flex flex-col gap-6 w-full">
        <Marquee>
          {row1.map((skill, i) => (
            <div 
              key={`r1-${i}`}
              className="flex items-center gap-3 px-6 py-3 rounded-pill bg-bg-2 border border-border mx-3 whitespace-nowrap"
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }} />
              <span className="font-mono text-sm text-fg">{skill.name}</span>
            </div>
          ))}
        </Marquee>

        <Marquee reverse>
          {row2.map((skill, i) => (
            <div 
              key={`r2-${i}`}
              className="flex items-center gap-3 px-6 py-3 rounded-pill bg-bg-2 border border-border mx-3 whitespace-nowrap"
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }} />
              <span className="font-mono text-sm text-fg">{skill.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
