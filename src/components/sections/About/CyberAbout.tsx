"use client";

import { useRef } from "react";
import { personalInfo, stats } from "@/lib/portfolio-data";
import { Reveal } from "@/components/primitives/Reveal";
import { CountUp } from "@/components/primitives/CountUp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useApp } from "@/providers/AppProvider";

export function CyberAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const { reducedMotion } = useApp();

  useGSAP(() => {
    if (reducedMotion || !bioRef.current) return;

    const split = new SplitText(bioRef.current, { type: "words" });
    
    // Set initial dim state
    gsap.set(split.words, { opacity: 0.15 });

    // Scrub opacity based on scroll
    gsap.to(split.words, {
      opacity: 1,
      stagger: 0.1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 80%",
        scrub: true,
      }
    });

    return () => split.revert();
  }, { scope: containerRef, dependencies: [reducedMotion] });

  return (
    <section ref={containerRef} className="relative w-full py-24 bg-bg border-t border-border" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <h2 className="text-section font-display-cyber mb-12 uppercase">03. About</h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-7">
            <p ref={bioRef} className="text-xl md:text-2xl leading-relaxed text-fg font-medium">
              {personalInfo.bioLong}
            </p>
          </div>
          
          <div className="lg:col-span-5 grid grid-cols-2 gap-x-8 gap-y-12">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.2 + i * 0.1}>
                <div className="flex flex-col gap-2">
                  <div className="text-4xl md:text-6xl font-display-cyber font-bold text-fg">
                    <CountUp to={stat.value} decimals={stat.decimals} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm font-mono text-muted uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
