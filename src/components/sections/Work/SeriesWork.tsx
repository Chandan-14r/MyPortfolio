"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/lib/portfolio-data";
import { Rail } from "@/components/primitives/Rail";
import { Modal } from "@/components/primitives/Modal";

export function SeriesWork() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Split projects roughly into rails
  const topPicks = projects.slice(0, Math.ceil(projects.length / 2));
  const top10 = projects.slice(Math.ceil(projects.length / 2));

  return (
    <section className="relative w-full py-24 bg-bg overflow-hidden" id="work">
      <Rail title="Top Picks for You">
        {topPicks.map((project, i) => (
          <div 
            key={`pick-${project.id}`}
            className="group relative flex-none w-[78vw] md:w-[350px] aspect-video bg-bg-2 rounded-md overflow-visible cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <motion.div
              layoutId={`series-card-${project.id}`}
              className="absolute inset-0 bg-bg-2 rounded-md overflow-hidden border border-border group-hover:z-50 shadow-none group-hover:shadow-2xl origin-center"
              whileHover={{ scale: 1.25, transition: { delay: 0.25, duration: 0.3 } }}
            >
              <Image src={project.image} alt={project.title} fill className="object-cover" sizes="350px" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex gap-2 mb-2">
                  <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">▶</span>
                  <span className="w-8 h-8 rounded-full border border-white/50 text-white flex items-center justify-center font-bold">+</span>
                </div>
                <h4 className="font-bold text-sm truncate">{project.title}</h4>
                <div className="flex items-center gap-2 text-[10px] text-muted font-bold mt-1">
                  <span className="text-match">99% Match</span>
                  <span className="border border-muted/30 px-1 rounded">{project.durationTag}</span>
                  <span className="border border-muted/30 px-1 rounded">HD</span>
                </div>
                <div className="flex gap-2 mt-2">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[9px] text-muted">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </Rail>

      <Rail title="Top 10 in Tech">
        {top10.map((project, i) => (
          <div 
            key={`top-${project.id}`}
            className="flex-none w-[78vw] md:w-[400px] flex items-center cursor-pointer relative"
            onClick={() => setSelectedProject(project)}
          >
            {/* Giant Numeral */}
            <div className="w-[40%] md:w-[150px] relative z-10 flex justify-end -mr-4 md:-mr-8">
              <span 
                className="text-8xl md:text-[180px] font-display-series leading-none tracking-tighter"
                style={{
                  WebkitTextStroke: "4px #333",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {i + 1}
              </span>
            </div>
            
            {/* Card */}
            <motion.div
              layoutId={`series-card-top-${project.id}`}
              className="w-[60%] md:w-[250px] aspect-[2/3] relative rounded-md overflow-hidden bg-bg-2 border border-border z-0"
              whileHover={{ scale: 1.05 }}
            >
              <Image src={project.image} alt={project.title} fill className="object-cover" sizes="250px" />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-bg to-transparent">
                <h4 className="font-bold text-sm text-shadow-sm truncate">{project.title}</h4>
                <span className="text-match text-[10px] font-bold">New Episode</span>
              </div>
            </motion.div>
          </div>
        ))}
      </Rail>

      {/* Shared Modal (using same content structure as Cyber but different styling can be applied) */}
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} layoutId={`series-card-${selectedProject?.id}`}>
        {selectedProject && (
          <div className="flex flex-col bg-bg text-fg min-h-[50vh]">
            <div className="relative w-full h-[50vh]">
              <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
              <div className="absolute bottom-12 left-12 max-w-2xl">
                <h2 className="text-5xl md:text-7xl font-display-series font-bold mb-4 drop-shadow-lg">{selectedProject.title}</h2>
                <div className="flex gap-4">
                  {selectedProject.liveUrl && (
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white text-black font-bold px-8 py-3 rounded hover:bg-white/90">
                      ▶ Play Demo
                    </a>
                  )}
                  {selectedProject.repoUrl && (
                    <a href={selectedProject.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-surface border border-white/20 text-white font-bold px-8 py-3 rounded hover:bg-surface/80">
                      + My List
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="p-12 relative z-10 max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-8">
                  <div className="flex items-center gap-3 text-sm font-bold mb-6">
                    <span className="text-match">99% Match</span>
                    <span className="text-muted border border-muted/30 px-1 rounded">{selectedProject.durationTag}</span>
                    <span className="text-muted border border-muted/30 px-1 rounded">HD</span>
                    <span className="text-muted">{selectedProject.type}</span>
                  </div>
                  <p className="text-lg leading-relaxed text-fg/90 mb-8">{selectedProject.overview}</p>
                  <p className="text-base text-muted"><strong className="text-white">Problem:</strong> {selectedProject.problem}</p>
                  <p className="text-base text-muted"><strong className="text-white">Solution:</strong> {selectedProject.solution}</p>
                  <p className="text-base text-muted mb-8"><strong className="text-white">Result:</strong> <span className="text-accent">{selectedProject.result}</span></p>
                </div>
                <div className="md:col-span-4 flex flex-col gap-4 text-sm">
                  <div>
                    <span className="text-muted">Stack:</span>
                    <span className="text-white ml-2">{selectedProject.tags.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-muted">Genres:</span>
                    <span className="text-white ml-2">{selectedProject.categories.join(", ")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
