"use client";

import { Reveal } from "@/components/primitives/Reveal";
import { personalInfo } from "@/lib/portfolio-data";

export function SeriesOutro() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-black py-16 px-6" id="outro">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="text-3xl font-display-series uppercase">
              {personalInfo.name}
            </div>
            
            <div className="flex gap-6 text-sm text-muted">
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <a href={personalInfo.resume} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Resume</a>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
            <p>© {year} {personalInfo.name}. All rights reserved.</p>
            <p>Designed as a Series Original.</p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
