"use client";

import { useState, useRef } from "react";
import { Reveal } from "@/components/primitives/Reveal";
import { SplitText } from "@/components/primitives/SplitText";
import { personalInfo } from "@/lib/portfolio-data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useApp } from "@/providers/AppProvider";

export function CyberContact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const checkRef = useRef<SVGPathElement>(null);
  const { reducedMotion } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    
    setStatus("sending");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("sent");
      
      if (reducedMotion || !buttonRef.current || !checkRef.current) return;
      
      // Button press physics
      gsap.fromTo(buttonRef.current, 
        { scale: 0.95 }, 
        { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" }
      );
      
      // Draw checkmark
      gsap.fromTo(checkRef.current,
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.5, ease: "power2.out", delay: 0.1 }
      );

      // Particle burst (CSS driven by GSAP)
      const rect = buttonRef.current.getBoundingClientRect();
      const parent = buttonRef.current.parentElement;
      if (!parent) return;

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute w-2 h-2 bg-accent rounded-full pointer-events-none";
        parent.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 50;
        
        gsap.set(particle, {
          x: rect.left - parent.getBoundingClientRect().left + rect.width / 2,
          y: rect.top - parent.getBoundingClientRect().top + rect.height / 2,
        });

        gsap.to(particle, {
          x: `+=${Math.cos(angle) * velocity}`,
          y: `+=${Math.sin(angle) * velocity}`,
          opacity: 0,
          scale: 0,
          duration: 0.6 + Math.random() * 0.4,
          ease: "power2.out",
          onComplete: () => particle.remove()
        });
      }

      // Reset
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
      
    }, 1500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    // Could add toast here
  };

  return (
    <section className="relative w-full py-24 bg-bg border-t border-border overflow-hidden" id="contact">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        <Reveal>
          <div>
            <h2 className="text-section font-display-cyber mb-8 uppercase">06. Initiate Contact</h2>
            <p className="text-muted font-mono mb-8">
              &gt; SYSTEM_READY <br/>
              &gt; AWAITING_INPUT
            </p>
            
            <div className="flex flex-col gap-4 font-mono text-sm">
              <button 
                onClick={copyEmail}
                className="text-left text-fg hover:text-accent transition-colors cursor-none"
                data-cursor="hover"
              >
                <span className="text-muted">E:</span> {personalInfo.email}
              </button>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-fg hover:text-accent transition-colors cursor-none" data-cursor="hover">
                <span className="text-muted">G:</span> github.com/{personalInfo.github.split("/").pop()}
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-fg hover:text-accent transition-colors cursor-none" data-cursor="hover">
                <span className="text-muted">L:</span> linkedin.com/in/{personalInfo.linkedin.split("/").pop()}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} direction="left">
          <form ref={formRef} onSubmit={handleSubmit} className="relative flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-xs text-muted uppercase transition-colors focus-within:text-accent">Name_</label>
              <input 
                type="text" 
                id="name"
                required
                className="w-full bg-surface border border-border px-4 py-3 text-fg font-mono focus:outline-none focus:border-accent transition-colors"
                placeholder="John Doe"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-xs text-muted uppercase transition-colors focus-within:text-accent">Email_</label>
              <input 
                type="email" 
                id="email"
                required
                className="w-full bg-surface border border-border px-4 py-3 text-fg font-mono focus:outline-none focus:border-accent transition-colors"
                placeholder="john@example.com"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-mono text-xs text-muted uppercase transition-colors focus-within:text-accent">Message_</label>
              <textarea 
                id="message"
                required
                rows={4}
                className="w-full bg-surface border border-border px-4 py-3 text-fg font-mono focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Hello, I'd like to talk about..."
              />
            </div>

            <button
              ref={buttonRef}
              type="submit"
              disabled={status === "sending" || status === "sent"}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full bg-accent text-bg font-bold font-mono py-4 uppercase transition-colors hover:bg-white disabled:opacity-80"
              style={{ transformOrigin: "center" }}
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
                <span className="absolute inset-0 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-bg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path ref={checkRef} d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 100, strokeDashoffset: 100 }} />
                  </svg>
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
