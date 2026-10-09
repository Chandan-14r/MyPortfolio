"use client";

import { useApp } from "@/providers/AppProvider";
import { switchTheme } from "@/lib/theme";

export function ThemeSwitcher() {
  const { theme, setTheme } = useApp();

  const handleToggle = (e: React.MouseEvent) => {
    const next = theme === "cyber" ? "series" : "cyber";
    switchTheme(next, { x: e.clientX, y: e.clientY }, setTheme);
  };

  return (
    <button
      onClick={handleToggle}
      className="relative flex items-center w-32 h-8 rounded-pill bg-surface border border-border p-1 outline-none focus-visible:ring-2 focus-visible:ring-accent overflow-hidden"
      aria-label="Toggle Theme: Cyber or Series"
    >
      <div 
        className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-fg rounded-pill transition-transform duration-300 ease-out"
        style={{
          transform: theme === "series" ? "translateX(100%)" : "translateX(0)",
        }}
      />
      <div className="relative w-1/2 text-xs font-bold text-center z-10 mix-blend-difference text-bg">
        Cyber
      </div>
      <div className="relative w-1/2 text-xs font-bold text-center z-10 mix-blend-difference text-bg">
        Series
      </div>
    </button>
  );
}
