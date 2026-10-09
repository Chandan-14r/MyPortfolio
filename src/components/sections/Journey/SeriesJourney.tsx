"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience, education } from "@/lib/portfolio-data";
import { Rail } from "@/components/primitives/Rail";

export function SeriesJourney() {
  const [activeSeason, setActiveSeason] = useState(0);
  const items = [...experience, ...education];
  const activeItem = items[activeSeason];

  return (
    <section className="relative w-full py-24 bg-bg overflow-hidden" id="journey">
      <Rail title="Seasons (Journey)">
        {items.map((item, i) => (
          <div 
            key={item.id}
            onClick={() => setActiveSeason(i)}
            className={`flex-none w-[280px] md:w-[320px] aspect-video rounded-card border overflow-hidden relative cursor-pointer group transition-all duration-300 ${activeSeason === i ? 'border-white scale-100' : 'border-border scale-95 opacity-50 hover:opacity-100 hover:scale-100'}`}
          >
            <div className="absolute inset-0 bg-bg-2 p-6 flex flex-col justify-between z-10">
              <h4 className="font-bold text-lg md:text-xl">{item.title}</h4>
              <div>
                <span className="text-xs font-bold text-accent uppercase tracking-widest mb-1 block">Season {i + 1}</span>
                <span className="text-sm text-muted">{item.date}</span>
              </div>
            </div>
            
            {/* Play overlay on hover */}
            {activeSeason !== i && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 backdrop-blur-sm">
                <span className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center pl-1 font-bold">▶</span>
              </div>
            )}
          </div>
        ))}
      </Rail>

      {/* Season Details */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeason}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold">S1:E{activeSeason + 1}</span>
              <span className="text-xl text-muted font-light">{activeItem.company}</span>
            </div>
            <p className="text-lg leading-relaxed text-fg/90 mb-6">{activeItem.description}</p>
            <div className="flex gap-2">
              {activeItem.tags.map(tag => (
                <span key={tag} className="text-xs font-bold px-2 py-1 bg-surface border border-border rounded text-muted">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
