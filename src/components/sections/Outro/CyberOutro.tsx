"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/portfolio-data";
import { Reveal } from "@/components/primitives/Reveal";

export function CyberOutro() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-bg pt-32 pb-32 border-t border-border overflow-hidden" id="outro">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,240,255,0.05),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 text-center">
        <Reveal>
          <div className="text-[15vw] md:text-[10vw] font-display-cyber font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 select-none mb-8">
            {personalInfo.name.split(" ")[0].toUpperCase()}
          </div>
        </Reveal>
        
        <Reveal delay={0.2}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 font-mono text-sm text-muted">
            <span>© {year} {personalInfo.name}</span>
            <span className="hidden md:inline text-border">/</span>
            <span>All systems nominal</span>
            <span className="hidden md:inline text-border">/</span>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-accent transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
