"use client";

import { useEffect, useState, useRef } from "react";
import { useApp } from "@/providers/AppProvider";
import { switchTheme } from "@/lib/theme";
import { personas } from "@/lib/persona-config";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, persona, setPersona } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette on Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      
      // Toggle theme on T (if not in an input)
      if (e.key.toLowerCase() === "t" && !isOpen) {
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          e.preventDefault();
          const next = theme === "cyber" ? "series" : "cyber";
          const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
          switchTheme(next, center, setTheme);
        }
      }
      
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, theme, setTheme]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/80 backdrop-blur-sm p-4">
      <div 
        className="w-full max-w-lg bg-bg-2 border border-border rounded-card shadow-2xl overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-4 border-b border-border">
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Type a command or search..."
            className="w-full bg-transparent outline-none text-fg placeholder:text-muted"
          />
        </div>
        <div className="p-2 max-h-64 overflow-y-auto">
          <div className="px-2 py-1 text-xs font-mono text-muted uppercase">Themes</div>
          <button 
            className="w-full text-left px-2 py-2 rounded hover:bg-surface text-sm flex items-center justify-between"
            onClick={(e) => {
              const next = theme === "cyber" ? "series" : "cyber";
              switchTheme(next, { x: e.clientX, y: e.clientY }, setTheme);
              setIsOpen(false);
            }}
          >
            Switch to {theme === "cyber" ? "Series" : "Cyber"} Theme
            <span className="text-xs text-muted">T</span>
          </button>
          
          <div className="px-2 py-1 mt-2 text-xs font-mono text-muted uppercase">Personas</div>
          {(Object.keys(personas) as (keyof typeof personas)[]).map((p) => (
            <button 
              key={p}
              className="w-full text-left px-2 py-2 rounded hover:bg-surface text-sm flex items-center justify-between capitalize"
              onClick={() => {
                setPersona(p);
                setIsOpen(false);
              }}
            >
              Set Persona to {p}
              {persona === p && <span className="text-xs text-accent">Active</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
