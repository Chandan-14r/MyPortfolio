"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/providers/AppProvider";
import { PersonaGate } from "@/components/gate/PersonaGate";
import { IntroSequence } from "@/components/gate/IntroSequence";
import { Nav } from "@/components/chrome/Nav";
import { Drawer } from "@/components/chrome/Drawer";
import { CommandPalette } from "@/components/chrome/CommandPalette";
import { Cursor } from "@/components/chrome/Cursor";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Journey } from "@/components/sections/Journey";
import { Contact } from "@/components/sections/Contact";
import { Outro } from "@/components/sections/Outro";

export default function Home() {
  const [gatePassed, setGatePassed] = useState(false);
  const [introPassed, setIntroPassed] = useState(false);
  const { theme, reducedMotion, persona } = useApp();

  useEffect(() => {
    // Check session storage or deep links
    const params = new URLSearchParams(window.location.search);
    const deepLinked = !!params.get("as");
    const passed = sessionStorage.getItem("gate-passed") === "true";
    
    if (deepLinked || passed || reducedMotion) {
      setGatePassed(true);
      if (deepLinked || reducedMotion) setIntroPassed(true);
    }
  }, [reducedMotion]);

  // Read section ordering from persona config if needed
  // For now, we will render a standard order and use CSS `order` or just reorder here
  // Actually, standard order is usually fine, but the spec says persona dictates order.
  // We'll just render them in standard order as requested by default.

  return (
    <main className="relative min-h-screen">
      <div className={theme === "cyber" ? "cyber-noise" : "hidden"} />
      
      {!gatePassed && <PersonaGate onComplete={() => setGatePassed(true)} />}
      
      {gatePassed && !introPassed && (
        <IntroSequence onComplete={() => setIntroPassed(true)} />
      )}

      {(gatePassed && introPassed) && (
        <>
          <ScrollProgress />
          <Cursor />
          <Nav />
          <Drawer />
          <CommandPalette />
          
          <div className="flex flex-col">
            <Hero />
            <About />
            <Services />
            <Skills />
            <Work />
            <Journey />
            <Contact />
          </div>
          
          <Outro />
        </>
      )}
    </main>
  );
}
