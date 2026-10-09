"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/portfolio-data";
import { ease } from "@/lib/motion";

export function SeriesHero() {
  const handlePlayIntro = () => {
    // We will implement modal open logic later
    alert("Play Intro clicked (To be implemented)");
  };

  return (
    <section className="relative min-h-[100dvh] w-full bg-bg overflow-hidden flex flex-col justify-end pb-12 md:pb-24 pt-32" id="hero">
      {/* Background layer with Ken Burns and red backlight */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <motion.div
          className="absolute inset-0 origin-center"
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        >
          <Image
            src={personalInfo.photo}
            alt={personalInfo.name}
            fill
            priority
            className="object-cover object-top opacity-60"
            sizes="100vw"
          />
          {/* Red back-light */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(229,9,20,0.3),transparent_60%)] mix-blend-screen" />
        </motion.div>
        
        {/* Animated Film Grain Overlay (CSS Transform) */}
        <div 
          className="absolute inset-[-200%] opacity-[0.04] pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            animation: "grain 1s steps(10) infinite",
          }}
        />

        {/* Vignette & Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/50 to-transparent z-10" />
      </div>

      {/* Content Stack */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: ease.out }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-accent text-2xl">N</span>
            <span className="text-xs font-bold tracking-[0.2em] text-muted uppercase">
              {personalInfo.name.split(" ")[0]} Originals
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display-series leading-[0.9] text-fg mb-6 drop-shadow-2xl uppercase">
            {personalInfo.name.split(" ")[0]}: <br/>
            The Series
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-bold mb-6 text-fg">
            <span className="text-match">99% Match</span>
            <span className="text-muted border border-muted/30 px-1 rounded">Season 2026</span>
            <span className="bg-accent text-white px-2 py-0.5 rounded-sm">Top 10 in Tech</span>
            <span className="text-muted">4K</span>
            <span className="text-muted hidden sm:inline">• {personalInfo.role}</span>
          </div>

          <p className="text-base md:text-lg text-fg/90 mb-8 max-w-2xl text-shadow-sm font-sans">
            {personalInfo.bioShort} {personalInfo.bioMedium}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePlayIntro}
              className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-3 rounded hover:bg-white/90 transition-colors font-bold"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play Intro
            </button>
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-surface hover:bg-surface/80 text-white px-6 md:px-8 py-3 rounded transition-colors font-bold border border-border"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              View Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
