"use client";

import { motion } from "framer-motion";
import { personalInfo, stats } from "@/lib/portfolio-data";
import { ease } from "@/lib/motion";
import { Reveal } from "@/components/primitives/Reveal";
import { CountUp } from "@/components/primitives/CountUp";

export function CyberAbout() {
  // We'll manually parse the bioLong string to find keywords to highlight
  // E.g., "Python", "Docker pipelines", "CI/CD workflows", "Gemini API", "TensorFlow"
  const keywords = ["Python", "Docker pipelines", "CI/CD workflows", "Gemini API", "TensorFlow"];
  
  const highlightBio = (text: string) => {
    let result: React.ReactNode[] = [text];
    
    keywords.forEach(keyword => {
      const newResult: React.ReactNode[] = [];
      result.forEach(segment => {
        if (typeof segment === "string") {
          const parts = segment.split(keyword);
          for (let i = 0; i < parts.length; i++) {
            newResult.push(parts[i]);
            if (i < parts.length - 1) {
              newResult.push(
                <span key={`${keyword}-${i}`} className="relative inline-block text-on-accent font-bold px-1 mx-1 z-10 group">
                  <motion.span
                    className="absolute inset-0 bg-accent z-[-1] origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, ease: ease.out, delay: 0.2 }}
                  />
                  {keyword}
                </span>
              );
            }
          }
        } else {
          newResult.push(segment);
        }
      });
      result = newResult;
    });
    
    return result;
  };

  return (
    <section className="relative w-full py-24 bg-bg border-t border-border" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <h2 className="text-section font-display-cyber mb-12 uppercase">03. About</h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="text-xl md:text-2xl leading-relaxed text-fg/80 font-medium">
                {highlightBio(personalInfo.bioLong)}
              </p>
            </Reveal>
          </div>
          
          <div className="lg:col-span-5 grid grid-cols-2 gap-x-8 gap-y-12">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.2 + i * 0.1}>
                <div className="flex flex-col gap-2">
                  <div className="text-4xl md:text-6xl font-display-cyber font-bold text-fg">
                    <CountUp to={stat.value} decimals={stat.decimals} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm font-mono text-muted uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
