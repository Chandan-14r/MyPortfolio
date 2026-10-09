import { Persona } from "./theme";

export interface PersonaConfig {
  id: Persona;
  primaryCta: { label: string; href: string };
  sectionOrder: string[];
  emphasis: string;
}

export const personas: Record<Persona, PersonaConfig> = {
  recruiter: {
    id: "recruiter",
    primaryCta: { label: "Download Resume", href: "/resume" }, // TODO(me): link to real resume URL if different
    sectionOrder: ["hero", "about", "experience", "work", "skills", "contact"],
    emphasis: "Resume, roles and impact",
  },
  developer: {
    id: "developer",
    primaryCta: { label: "View GitHub", href: "https://github.com/Chandan-14r" },
    sectionOrder: ["hero", "work", "skills", "services", "experience", "contact"],
    emphasis: "Projects, stack and GitHub",
  },
  explorer: {
    id: "explorer",
    primaryCta: { label: "Play Intro", href: "#intro" },
    sectionOrder: ["hero", "services", "skills", "work", "journey", "about", "contact", "outro"],
    emphasis: "The full story",
  },
};
