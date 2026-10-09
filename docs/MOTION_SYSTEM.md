# Portfolio Motion System & Quality Tiers

This project uses a unified motion architecture governed by a central performance tier system.

## Performance Governor (`src/lib/quality.ts`)
The governor evaluates device capability on initial load and dictates the `tier`:
- **high**: Uses WebGL (OGL) distortion canvases, dense canvas-based particle fields, and advanced GSAP `quickTo` cursor logic.
- **medium**: Skips WebGL ambient effects but retains interactive physics.
- **lite**: Triggered by `prefers-reduced-motion` or low hardware specs. Converts WebGL effects to pure CSS fallbacks, removes particles, and flattens advanced transitions into simple fades.

### How to use
```tsx
const tier = useQualityTier();
if (tier === "lite") return <Fallback />
```

## Motion Tech Stack
- **React State / UI Layout**: Framer Motion (e.g. accordion expanding, modal `layoutId` shared elements).
- **Scroll Choreography & Text**: GSAP, ScrollTrigger, SplitText.
- **Shared WebGL**: `ogl` running behind the scenes, using `globalWebGLState` to lazily bind image textures and pass uniforms on hover.

*Note: Never animate the same element property with both GSAP and Framer Motion.*

## Defining a New Effect
1. If it relies on scroll, use `gsap.timeline({ scrollTrigger: {...} })`.
2. If it relies on pointer proximity, use `gsap.quickTo()`.
3. Wrap it in `useGSAP()` and include `dependencies: [reducedMotion, tier]`.
4. Return an empty layout if `reducedMotion` is true and the effect is purely decorative.

## Known Limitations
- The GSAP `SplitText` implementation expects the text string to not aggressively mutate.
- Next.js hydration requires `data-theme` to be injected manually in `layout.tsx` before React boots to prevent FOUC.
