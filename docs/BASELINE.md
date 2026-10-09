# Baseline Audit of the Live Site
**URL:** https://my-portfolio-rho-olive-14.vercel.app/ (or equivalent local version)

## 1. Known Leaked Copy & Placeholders
- **Gate Personas:** Currently using internal spec text ("Roles, years, real metrics; GitHub de-emphasized", "Stack pills, repo links, a terminal/code flourish in hero", "The full narrative order"). Need to be replaced with visitor-facing copy.
- **Persona Icons:** Emoji (`💼`, `</>`, `🌍`) are used instead of custom SVGs.
- **Theme Switcher:** Displays cryptic "CY" and "SR" labels.
- **Data File (`portfolio-data.ts`):** Contains `// TODO(me)` comments and placeholder text (e.g., "Estate planning is slow and fragmented.") which should be verified by the owner, but we must ensure no internal DEV notes leak into the UI.

## 2. Section-by-Section "Aliveness" Score (1-5)

### Gate & Intro
- **Load:** Mask reveal is basic. Intro sequence is a fast progress bar or slide. (Score: 3)
- **Pointer:** Hover states on persona cards are standard scales. (Score: 2)
- **Scroll:** N/A
- **Idle:** Static. (Score: 1)
- **Overall Feel:** Functional but lacks the "wow" polish of a shared-element zoom or mask expansion.

### Hero
- **Load:** Text staggers up. Portrait fades in. (Score: 3)
- **Pointer:** 3D tilt on the portrait in Cyber. (Score: 4)
- **Scroll:** Basic parallax fallback. (Score: 2)
- **Idle:** Nothing moves in Cyber. Series has a Ken Burns scale. (Score: 2)
- **Overall Feel:** Needs ambient life (particles/noise) and scroll-scrubbed handoffs.

### About
- **Load:** Standard fade up. Count-up stats fire once. (Score: 3)
- **Pointer:** None. (Score: 1)
- **Scroll:** In-view triggers only. No scrubbing. (Score: 2)
- **Idle:** Static. (Score: 1)
- **Overall Feel:** Very static after initial load.

### Services
- **Load:** Staggers in. (Score: 3)
- **Pointer:** Hover inverts the accordion (Cyber). (Score: 4)
- **Scroll:** In-view triggers. (Score: 2)
- **Idle:** Static. (Score: 1)
- **Overall Feel:** Interaction is good, but lacks ambient or scroll dynamics.

### Skills
- **Load:** Infinite CSS marquee starts. (Score: 3)
- **Pointer:** Hover slows down the marquee via playbackRate. (Score: 3)
- **Scroll:** In-view triggers. (Score: 2)
- **Idle:** Marquee runs continuously. (Score: 4)
- **Overall Feel:** The marquee provides good ambient life.

### Work
- **Load:** Cards stagger up. (Score: 3)
- **Pointer:** 3D tilt on mockups. (Score: 4)
- **Scroll:** Image parallax inside the frame. (Score: 3)
- **Idle:** Static. (Score: 1)
- **Overall Feel:** Needs the promised WebGL distortion or velocity skew to feel premium.

### Journey
- **Load:** In-view triggers. (Score: 2)
- **Pointer:** None. (Score: 1)
- **Scroll:** The center line is drawn with scroll progress. (Score: 4)
- **Idle:** Static. (Score: 1)
- **Overall Feel:** Scroll drawing is nice, but nodes don't "ignite".

### Contact & Footer
- **Load:** Standard fade up. (Score: 2)
- **Pointer:** Glitch effect on submit button. (Score: 3)
- **Scroll:** In-view triggers. (Score: 1)
- **Idle:** Static. (Score: 1)
- **Overall Feel:** Form feels standard. Needs physics or particles.

## 3. The 5 Biggest Reasons the Site Feels Flat
1. **No Ambient Life:** Except for the Skills marquee, nothing breathes or moves when the user is idle.
2. **Binary Scroll:** Animations trigger when entering the viewport, but they don't scrub *with* the scroll position or velocity.
3. **Basic Transitions:** Navigating the gate to the hero is a harsh cut/fade rather than a smooth layout expansion.
4. **Missing Polish (Pointer):** The custom cursor is basic; it lacks morphing states for "Drag", "View", or text selection.
5. **Lack of Shader/WebGL Depth:** The 3D CSS tilts are nice, but true premium portfolios use WebGL shaders for hover distortion and RGB splitting on project images.
