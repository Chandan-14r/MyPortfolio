"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/lib/portfolio-data";
import { useApp } from "@/providers/AppProvider";
import { Reveal } from "@/components/primitives/Reveal";
import { Tilt } from "@/components/primitives/Tilt";
import { Modal } from "@/components/primitives/Modal";

function CyberProject({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const { reducedMotion } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center border-b border-border py-16 lg:py-24">
      {/* Content */}
      <div className={`lg:col-span-5 flex flex-col gap-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <Reveal direction={isEven ? "right" : "left"}>
          <div className="flex items-center gap-4 mb-2">
            <span className="font-mono text-sm text-muted">0{index + 1}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-bg px-2 py-1 rounded" style={{ backgroundColor: project.color }}>
              {project.categories[0]}
            </span>
          </div>
          
          <h3 className="text-3xl md:text-5xl font-display-cyber uppercase font-bold text-fg mb-4">
            {project.title}
          </h3>
          
          <div className="space-y-4 mb-6">
            <p className="text-sm font-mono border-l-2 pl-4 text-muted border-border hover:border-accent hover:text-fg transition-colors">
              <span className="text-accent">P</span>: {project.problem}
            </p>
            <p className="text-sm font-mono border-l-2 pl-4 text-muted border-border hover:border-accent hover:text-fg transition-colors">
              <span className="text-accent">S</span>: {project.solution}
            </p>
            <p className="text-sm font-mono border-l-2 pl-4 text-muted border-border hover:border-accent hover:text-fg transition-colors">
              <span className="text-accent">R</span>: {project.result}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-surface border border-border rounded-pill text-xs font-bold text-fg">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <button 
              onClick={onOpen}
              className="px-6 py-2 bg-accent text-bg font-bold rounded-pill hover:bg-white transition-colors"
            >
              Case Study
            </button>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-accent text-accent font-bold rounded-pill hover:bg-accent hover:text-bg transition-colors">
                Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-muted text-muted font-bold rounded-pill hover:bg-surface transition-colors">
                GitHub
              </a>
            )}
          </div>
        </Reveal>
      </div>

      {/* Mockup */}
      <div className={`lg:col-span-7 w-full ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <Reveal direction={isEven ? "left" : "right"}>
          <Tilt className="w-full relative aspect-video bg-bg-2 rounded-xl border border-border overflow-hidden shadow-2xl flex flex-col">
            {/* Browser Chrome */}
            <div className="h-8 bg-surface border-b border-border flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="ml-4 px-2 py-0.5 bg-bg rounded text-[10px] font-mono text-muted max-w-[200px] truncate">
                {project.liveUrl || `localhost:3000/${project.id}`}
              </div>
            </div>
            {/* Inner image */}
            <div className="relative flex-1 overflow-hidden cursor-pointer" onClick={onOpen}>
              <motion.div 
                className="absolute inset-[-10%]"
                style={!reducedMotion ? { y: imgY } : {}}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </motion.div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-accent/0 hover:bg-accent/10 transition-colors duration-500 mix-blend-overlay" />
            </div>
          </Tilt>
        </Reveal>
      </div>
    </div>
  );
}

export function CyberWork() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="relative w-full py-24 bg-bg" id="work">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <h2 className="text-section font-display-cyber mb-12 uppercase">04. Selected Work</h2>
        </Reveal>

        <div className="flex flex-col">
          {projects.map((project, i) => (
            <CyberProject 
              key={project.id} 
              project={project} 
              index={i} 
              onOpen={() => setSelectedProject(project)} 
            />
          ))}
        </div>
      </div>

      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="flex flex-col bg-bg text-fg min-h-[50vh]">
            <div className="relative w-full h-[40vh]">
              <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent" />
            </div>
            <div className="p-8 md:p-12 -mt-20 relative z-10 max-w-4xl mx-auto">
              <span className="text-accent font-mono mb-4 block">{selectedProject.type}</span>
              <h2 className="text-4xl md:text-6xl font-display-cyber font-bold mb-8 uppercase">{selectedProject.title}</h2>
              <p className="text-xl leading-relaxed text-muted mb-8">{selectedProject.overview}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div>
                  <h4 className="text-sm font-bold text-fg mb-2 uppercase">Problem</h4>
                  <p className="text-sm text-muted">{selectedProject.problem}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-fg mb-2 uppercase">Solution</h4>
                  <p className="text-sm text-muted">{selectedProject.solution}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-fg mb-2 uppercase">Result</h4>
                  <p className="text-sm text-accent font-bold">{selectedProject.result}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-8 border-t border-border">
                {selectedProject.liveUrl && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-accent text-bg font-bold rounded-pill hover:bg-white transition-colors">
                    View Live Site
                  </a>
                )}
                {selectedProject.repoUrl && (
                  <a href={selectedProject.repoUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-muted text-muted font-bold rounded-pill hover:bg-surface transition-colors">
                    View Source
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
