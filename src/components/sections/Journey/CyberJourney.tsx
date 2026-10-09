"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experience, education } from "@/lib/portfolio-data";
import { Reveal } from "@/components/primitives/Reveal";

export function CyberJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const items = [...experience, ...education];

  return (
    <section className="relative w-full py-24 bg-bg border-t border-border" id="journey">
      <div className="max-w-4xl mx-auto px-6" ref={containerRef}>
        <Reveal>
          <h2 className="text-section font-display-cyber mb-16 uppercase text-center">05. Journey</h2>
        </Reveal>

        <div className="relative">
          {/* Static Background Line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border md:-translate-x-1/2" />
          
          {/* Animated Draw Line */}
          <motion.div 
            className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[2px] bg-accent md:-translate-x-1/2 origin-top"
            style={{ scaleY }}
          />

          <div className="flex flex-col gap-16">
            {items.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={item.id} className="relative flex items-center md:justify-between w-full">
                  {/* Circle Marker */}
                  <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-bg border-2 border-accent md:-translate-x-1/2 z-10" />

                  {/* Content Desktop Left / Mobile Right */}
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${!isEven ? 'md:order-1' : 'md:order-2 md:text-right md:pr-16'}`}>
                    <Reveal direction={!isEven ? "right" : "left"}>
                      <div className="flex flex-col gap-2">
                        <span className="font-mono text-sm text-accent">{item.date}</span>
                        <h3 className="text-xl md:text-2xl font-bold">{item.title}</h3>
                        <span className="text-sm text-muted font-bold tracking-wider uppercase mb-2">{item.company}</span>
                        <p className="text-muted leading-relaxed text-sm mb-4">{item.description}</p>
                        <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                          {item.tags.map(tag => (
                            <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 bg-surface border border-border rounded text-fg">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Reveal>
                  </div>
                  
                  {/* Empty space for alternating layout on desktop */}
                  <div className={`hidden md:block w-[45%] ${!isEven ? 'order-2' : 'order-1'}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
