"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { experience, education } from "@/lib/portfolio-data";
import { Reveal } from "@/components/primitives/Reveal";
import { useApp } from "@/providers/AppProvider";

export function CyberJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useApp();

  const items = [...experience, ...education];

  useGSAP(() => {
    if (reducedMotion || !containerRef.current || !lineRef.current) return;

    // Line drawing
    gsap.fromTo(lineRef.current, 
      { scaleY: 0 }, 
      { 
        scaleY: 1, 
        ease: "none", 
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      }
    );

    // Node ignition
    const nodes = gsap.utils.toArray('.journey-node') as HTMLElement[];
    nodes.forEach(node => {
      const marker = node.querySelector('.journey-marker');
      const date = node.querySelector('.journey-date');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: node,
          start: "center center+=100", // When node reaches just below center
          toggleActions: "play none none reverse"
        }
      });

      tl.to(marker, {
        backgroundColor: "var(--accent)",
        boxShadow: "0 0 20px var(--accent)",
        scale: 1.5,
        duration: 0.4,
        ease: "back.out(2)"
      })
      .fromTo(date, {
        opacity: 0,
        x: -20,
      }, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2");
    });

  }, { scope: containerRef, dependencies: [reducedMotion] });

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
          <div 
            ref={lineRef}
            className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[2px] bg-accent md:-translate-x-1/2 origin-top scale-y-0"
          />

          <div className="flex flex-col gap-16">
            {items.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={item.id} className="journey-node relative flex items-center md:justify-between w-full">
                  {/* Circle Marker */}
                  <div className="journey-marker absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-bg border-2 border-accent md:-translate-x-1/2 z-10" />

                  {/* Content Desktop Left / Mobile Right */}
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${!isEven ? 'md:order-1' : 'md:order-2 md:text-right md:pr-16'}`}>
                    <Reveal direction={!isEven ? "right" : "left"}>
                      <div className="flex flex-col gap-2">
                        <span className="journey-date font-mono text-sm text-accent opacity-0 inline-block">{item.date}</span>
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
