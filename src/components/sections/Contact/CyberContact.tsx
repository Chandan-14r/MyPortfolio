"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/primitives/Reveal";
import { SplitText } from "@/components/primitives/SplitText";
import { personalInfo } from "@/lib/portfolio-data";

export function CyberContact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate API call
    setTimeout(() => {
      setStatus("sent");
    }, 2000);
  };

  return (
    <section className="relative w-full py-24 bg-bg border-t border-border" id="contact">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        <Reveal>
          <div>
            <h2 className="text-section font-display-cyber mb-8 uppercase">06. Initiate Contact</h2>
            <p className="text-muted font-mono mb-8">
              &gt; SYSTEM_READY <br/>
              &gt; AWAITING_INPUT
            </p>
            
            <div className="flex flex-col gap-4 font-mono text-sm">
              <a href={`mailto:${personalInfo.email}`} className="text-fg hover:text-accent transition-colors">
                <span className="text-muted">E:</span> {personalInfo.email}
              </a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-fg hover:text-accent transition-colors">
                <span className="text-muted">G:</span> github.com/{personalInfo.github.split("/").pop()}
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-fg hover:text-accent transition-colors">
                <span className="text-muted">L:</span> linkedin.com/in/{personalInfo.linkedin.split("/").pop()}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} direction="left">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-xs text-muted uppercase">Name_</label>
              <input 
                type="text" 
                id="name"
                required
                className="w-full bg-surface border border-border px-4 py-3 text-fg font-mono focus:outline-none focus:border-accent transition-colors"
                placeholder="John Doe"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-xs text-muted uppercase">Email_</label>
              <input 
                type="email" 
                id="email"
                required
                className="w-full bg-surface border border-border px-4 py-3 text-fg font-mono focus:outline-none focus:border-accent transition-colors"
                placeholder="john@example.com"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-mono text-xs text-muted uppercase">Message_</label>
              <textarea 
                id="message"
                required
                rows={4}
                className="w-full bg-surface border border-border px-4 py-3 text-fg font-mono focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Hello, I'd like to talk about..."
              />
            </div>

            <button
              type="submit"
              disabled={status !== "idle"}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full bg-accent text-bg font-bold font-mono py-4 uppercase overflow-hidden transition-colors hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className={status !== "idle" ? "opacity-0" : "opacity-100"}>
                {isHovered ? <SplitText text="TRANSMIT" glitch /> : "TRANSMIT"}
              </span>
              
              {status === "sending" && (
                <span className="absolute inset-0 flex items-center justify-center">
                  UPLOADING...
                </span>
              )}
              
              {status === "sent" && (
                <span className="absolute inset-0 flex items-center justify-center">
                  RECEIVED
                </span>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
