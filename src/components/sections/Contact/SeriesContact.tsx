"use client";

import { useState } from "react";
import { Reveal } from "@/components/primitives/Reveal";
import { personalInfo } from "@/lib/portfolio-data";

export function SeriesContact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
    }, 2000);
  };

  return (
    <section className="relative w-full py-32 bg-bg flex flex-col items-center justify-center text-center" id="contact">
      <div className="max-w-xl w-full px-6">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-display-series mb-4">Connect</h2>
          <p className="text-muted mb-12">Ready for the next episode? Send a message.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <input 
              type="text" 
              placeholder="Name" 
              required
              className="w-full bg-[#333] text-white px-5 py-4 rounded focus:outline-none focus:ring-2 focus:ring-accent transition-shadow placeholder:text-muted"
            />
            <input 
              type="email" 
              placeholder="Email address" 
              required
              className="w-full bg-[#333] text-white px-5 py-4 rounded focus:outline-none focus:ring-2 focus:ring-accent transition-shadow placeholder:text-muted"
            />
            <textarea 
              placeholder="Message" 
              required
              rows={4}
              className="w-full bg-[#333] text-white px-5 py-4 rounded focus:outline-none focus:ring-2 focus:ring-accent transition-shadow placeholder:text-muted resize-none"
            />
            
            <button 
              type="submit"
              disabled={status !== "idle"}
              className="w-full bg-accent text-white font-bold py-4 rounded mt-4 hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              {status === "idle" && "Send Message"}
              {status === "sending" && "Sending..."}
              {status === "sent" && "Message Sent"}
            </button>
          </form>

          <div className="mt-12 flex justify-center gap-8">
            <a href={`mailto:${personalInfo.email}`} className="text-muted hover:text-white transition-colors">Email</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white transition-colors">LinkedIn</a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white transition-colors">GitHub</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
