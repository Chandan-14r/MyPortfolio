import { flushSync } from "react-dom";

export type Theme = "cyber" | "series";
export type Persona = "recruiter" | "developer" | "explorer";

export function switchTheme(next: Theme, origin: { x: number; y: number }, setThemeContext: (t: Theme) => void) {
  const apply = () => {
    flushSync(() => {
      setThemeContext(next);
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  };

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  if (!(document as any).startViewTransition || reduce) {
    return apply();
  }

  const r = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y)
  );

  const transition = (document as any).startViewTransition(apply);
  
  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${origin.x}px ${origin.y}px)`,
          `circle(${r}px at ${origin.x}px ${origin.y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "cubic-bezier(.76,0,.24,1)",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  });
}
