"use client";

import Image from "next/image";
import { personalInfo, education, stats } from "@/lib/portfolio-data";
import { Reveal } from "@/components/primitives/Reveal";

export function SeriesAbout() {
  return (
    <section className="relative w-full py-24 bg-bg" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <h2 className="text-section font-display-series mb-8">About the Creator</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col md:flex-row bg-bg-2 rounded-card border border-border overflow-hidden">
            <div className="w-full md:w-1/3 aspect-square relative">
              <Image
                src={personalInfo.photo}
                alt={personalInfo.name}
                fill
                className="object-cover grayscale mix-blend-luminosity opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-2 via-bg-2/20 to-transparent" />
            </div>
            
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">{personalInfo.role}</h3>
              <p className="text-muted leading-relaxed mb-8 max-w-2xl">
                {personalInfo.bioLong}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 border-t border-border pt-8">
                {stats.map(stat => (
                  <div key={stat.label}>
                    <div className="text-3xl font-display-series text-fg">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-xs text-muted uppercase font-bold tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {education.length > 0 && (
                <div className="mt-auto border-t border-border pt-6">
                  <span className="text-xs text-accent uppercase font-bold tracking-wider mb-2 block">Education</span>
                  <h4 className="font-bold">{education[0].title}</h4>
                  <p className="text-sm text-muted">{education[0].company} • {education[0].date}</p>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
