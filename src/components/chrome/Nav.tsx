"use client";

import { useApp } from "@/providers/AppProvider";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { cn } from "@/lib/cn";
import { personas } from "@/lib/persona-config";

export function Nav() {
  const { persona } = useApp();
  const config = personas[persona];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 rounded-pill bg-surface/80 backdrop-blur-md border border-border">
      <div className="hidden md:flex items-center px-4">
        <span className="text-xs font-mono text-muted uppercase tracking-widest">{config.id}</span>
      </div>
      
      <div className="w-[1px] h-4 bg-border hidden md:block" />
      
      <ul className="flex items-center gap-1 px-2">
        {config.sectionOrder.slice(0, 4).map((section) => (
          <li key={section}>
            <a 
              href={`#${section}`} 
              className="text-sm font-medium px-3 py-1.5 rounded-pill text-muted hover:text-fg hover:bg-bg/50 transition-colors capitalize"
            >
              {section}
            </a>
          </li>
        ))}
      </ul>

      <div className="w-[1px] h-4 bg-border" />
      
      <ThemeSwitcher />
    </nav>
  );
}
