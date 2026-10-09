"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/lib/portfolio-data";
import { ease } from "@/lib/motion";
import { Reveal } from "@/components/primitives/Reveal";
import { cn } from "@/lib/cn";

export function SeriesServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];

  return (
    <section className="relative w-full py-24 bg-bg" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <h2 className="text-section font-display-series mb-8">Browse by Genre</h2>
        </Reveal>

        {/* Chips */}
        <div className="flex overflow-x-auto no-scrollbar gap-3 mb-12 pb-2">
          {services.map((service, idx) => (
            <button
              key={service.id}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "whitespace-nowrap px-6 py-2 rounded-pill border transition-all text-sm font-bold",
                activeIndex === idx
                  ? "bg-white text-black border-white"
                  : "bg-surface text-muted border-border hover:text-white"
              )}
            >
              {service.title}
            </button>
          ))}
        </div>

        {/* Featured Panel */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-bg-2 rounded-card overflow-hidden border border-border">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
              transition={{ duration: 0.5, ease: ease.out }}
              className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end"
            >
              {/* Red subtle ambient light */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent z-0" />
              <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(229,9,20,0.1),transparent_70%)] z-0" />

              <div className="relative z-10 max-w-2xl">
                <h3 className="text-3xl md:text-5xl font-display-series mb-4 drop-shadow-lg">
                  {activeService.title}
                </h3>
                <p className="text-lg text-fg/90 mb-6 font-medium text-shadow-sm">
                  {activeService.value}
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeService.checklist.map((item) => (
                    <span 
                      key={item}
                      className="px-3 py-1 bg-black/50 border border-border rounded text-xs font-bold text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
