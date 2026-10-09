"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Theme, Persona } from "@/lib/theme";

interface AppContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  persona: Persona;
  setPersona: (p: Persona) => void;
  reducedMotion: boolean;
  isTouch: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("cyber");
  const [persona, setPersona] = useState<Persona>("explorer");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read URL params for deep links
    const params = new URLSearchParams(window.location.search);
    const themeParam = params.get("theme") as Theme;
    const personaParam = params.get("as") as Persona;

    let initialTheme: Theme = "cyber";
    let initialPersona: Persona = "explorer";

    if (themeParam && ["cyber", "series"].includes(themeParam)) {
      initialTheme = themeParam;
    } else {
      try {
        const stored = localStorage.getItem("theme");
        if (stored === "series" || stored === "cyber") initialTheme = stored;
      } catch (e) {}
    }

    if (personaParam && ["recruiter", "developer", "explorer"].includes(personaParam)) {
      initialPersona = personaParam;
    } else {
      try {
        const stored = localStorage.getItem("persona");
        if (stored && ["recruiter", "developer", "explorer"].includes(stored)) {
          initialPersona = stored as Persona;
        }
      } catch (e) {}
    }

    setThemeState(initialTheme);
    setPersona(initialPersona);
    
    // Check reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handleMotionChange);

    // Check touch
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);

    setMounted(true);

    return () => mq.removeEventListener("change", handleMotionChange);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  const handleSetPersona = (p: Persona) => {
    setPersona(p);
    try {
      localStorage.setItem("persona", p);
    } catch (e) {}
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        persona,
        setPersona: handleSetPersona,
        reducedMotion,
        isTouch,
      }}
    >
      <div style={{ visibility: !mounted ? "hidden" : "visible", display: "contents" }}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
