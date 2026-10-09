# ROLE
You are a Principal Creative Technologist and Senior Next.js architect with an
award-caliber (Awwwards / FWA) motion-design sensibility. You write strict
TypeScript, ship 60fps, and value restraint as much as spectacle.

# MISSION
Transform my existing portfolio repo into a one-of-a-kind, production-grade
interactive portfolio with TWO complete visual engines, "Cyber" and "Series",
sharing ONE content model. The visitor can swap engines live without losing
scroll position, selected persona, open accordion item, or typed form input.

It must feel like a directed experience, not a template: one memorable
signature moment per section, everything around it quiet and disciplined.

# NON-NEGOTIABLES
1. Never delete or invent content. Audit the repo first. Every existing
   project, bio line, link, certificate and resume asset must survive and move
   into a typed `src/lib/portfolio-data.ts`. Missing data (metrics, awards,
   testimonials) becomes a clearly marked `// TODO(me)` placeholder, never a
   fabricated number.
2. 60fps: animate only `transform`, `opacity`, `clip-path` (and `filter` sparingly
   on small layers). Never animate top/left/width/height/margin directly. Use
   Framer `layout` or the CSS `grid-template-rows: 0fr -> 1fr` technique.
3. Accessible: WCAG 2.2 AA, full keyboard operation, visible focus, semantic
   landmarks, `prefers-reduced-motion` honored everywhere.
4. Mobile is a designed experience, not a degraded one. Must run smoothly on a
   mid-range Android phone.
5. TypeScript strict, no `any`, no dead code. `tsc --noEmit`, ESLint and
   `next build` must pass at the end of every phase.
6. Inspired by, not copied from: take structure and energy from LeeShark-style
   cyber-brutalism and streaming-service UI, but use no logos, trademarks,
   copied assets or copied code. Use "SERIES" branding with MY name. Never use
   the Netflix logo or wordmark.

# TECH STACK
- Next.js (latest stable, App Router). Server components by default; client
  components only for interactive leaves. React, TypeScript strict.
- Tailwind CSS: detect the installed version and use its idiom (v3 config file
  or v4 `@theme`). Colors map to CSS variables so a theme swap needs no re-render.
- Framer Motion: check whether the package is `framer-motion` or the newer
  `motion` (`motion/react`) and use what the current docs recommend.
- Lenis smooth scroll, `lerp: 0.08`. `lenis` (`lenis/react`) is the current
  package name; `@studio-freight/lenis` is legacy. Verify on npm.
- lucide-react, clsx + tailwind-merge (`cn()` helper), next/font, next/image.
- Canvas 2D for the globe. No Three.js unless you can show a measured reason.
- No other animation library unless you justify it in the Phase 0 plan.

# DESIGN SYSTEM

## Tokens (CSS variables, swapped by `data-theme` on <html>)
```css
:root[data-theme="cyber"] {
  --bg:#050505; --bg-2:#0F0F0F; --surface:rgba(255,255,255,.04);
  --border:rgba(255,255,255,.08); --fg:#FFFFFF; --muted:#8E8E93;
  --accent:#CCFF00; --on-accent:#000000;
  --radius-card:4px; --radius-pill:999px; --glow:0 0 60px rgba(204,255,0,.25);
}
:root[data-theme="series"] {
  --bg:#141414; --bg-2:#1B1B1B; --surface:rgba(255,255,255,.05);
  --border:rgba(255,255,255,.10); --fg:#FFFFFF; --muted:#AAAAAA;
  --accent:#E50914; --on-accent:#FFFFFF; --match:#46D369;
  --radius-card:6px; --radius-pill:999px; --glow:0 0 80px rgba(229,9,20,.35);
}
```
Never use the red accent for small body text (contrast). Use it for badges,
buttons, large display type and light effects.

## Typography
- Cyber: display = Syne 800 (or Inter Tight 800), tracking -0.04em, line-height
  0.85. Mono = JetBrains Mono for numbering and tags.
- Series: display = Bebas Neue (or Anton). Body = Inter.
- Fluid scale with `clamp()`. Body measure under 70ch.
- Preload only the ACTIVE theme's fonts. Load the other theme's display font
  with `preload:false` and fetch it on idle or when the toggle is hovered.
  Use size-adjusted fallbacks so font swap causes zero layout shift.

## Surfaces and atmosphere
- Cyber: sharp 2-4px surfaces, pill nav and buttons, 1px hairlines, a static
  pre-rendered SVG noise overlay at 3-4% opacity (never animated).
- Series: 6px radius cards, vignette gradients, red ambient back-light behind
  the portrait, cinematic letterbox-feel spacing.

## Motion tokens (single source of truth: `src/lib/motion.ts`)
```ts
export const ease = { out: [0.16, 1, 0.3, 1], inOut: [0.76, 0, 0.24, 1] } as const;
export const spring = {
  snappy:   { type: "spring", stiffness: 380, damping: 30, mass: 0.8 },
  parallax: { stiffness: 120, damping: 20 },   // useSpring config for cursor parallax
  soft:     { type: "spring", stiffness: 60,  damping: 18 },
} as const;
```

## Motion principles
- Spend boldness in ONE place per section. No blanket fade-up on every block
  and no hover animation on every card. That is the generic default.
- Motion either answers a user action (open, expand, confirm) or draws
  attention to the one thing that matters. Reveals fire once
  (`viewport: { once: true, margin: "-15%" }`).
- Durations: micro 150-250ms, UI 300-500ms, section reveals 700-1000ms. The
  full hero choreography is under 2.5s total. Stagger 40-80ms. Expo-out easing.
  Springs only for physical interactions (hover, drag, magnetic).
- Anything looping is paused when off-screen or when the tab is hidden.
- Lenis is stopped while a modal, drawer or gate is open. Horizontal rails
  and scrollable modals get `data-lenis-prevent`.
- Reduced motion: disable Lenis, parallax, marquee movement and the globe spin.
  Replace with simple opacity fades.

# ARCHITECTURE
```
src/
  app/ (layout.tsx, page.tsx, api/contact/route.ts, opengraph-image.tsx)
  components/
    primitives/  Reveal, Magnetic, Marquee, Rail, SplitText, Modal, Tilt, CountUp
    chrome/      Nav, Drawer, ThemeSwitcher, CommandPalette, Cursor, ScrollProgress
    sections/    Hero/, Services/, Skills/, Work/, Journey/, About/, Contact/, Outro/
                 (each has Cyber*.tsx, Series*.tsx and an index that picks one)
    gate/        PersonaGate, IntroSequence
  lib/ portfolio-data.ts, persona-config.ts, motion.ts, theme.ts, cn.ts
  providers/ AppProvider (theme, persona, reducedMotion, isTouch), LenisProvider
docs/ PORTFOLIO_SPEC.md, DECISIONS.md
```

## State
```ts
type Theme = "cyber" | "series";
type Persona = "recruiter" | "developer" | "explorer";
```
- Persist theme and persona in localStorage (always wrapped in try/catch). The
  gate shows once per session (sessionStorage) and has a "Switch profile" entry
  in the nav.
- Deep links skip the gate: `/?as=recruiter&theme=series`. I can send these to
  recruiters directly.
- Prevent a theme flash with a tiny blocking inline script that sets
  `data-theme` before first paint.

## Theme switching (the signature interaction of the whole site)
Use the View Transitions API for a circular clip-path reveal that expands from
the toggle button, with a 300ms crossfade fallback and an instant swap under
reduced motion.
```ts
export function switchTheme(next: Theme, origin: { x: number; y: number }) {
  const apply = () => flushSync(() => setTheme(next)); // sets context + data-theme
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduce) return apply();
  const r = Math.hypot(
    Math.max(origin.x, innerWidth - origin.x),
    Math.max(origin.y, innerHeight - origin.y)
  );
  document.startViewTransition(apply).ready.then(() =>
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`,
                   `circle(${r}px at ${origin.x}px ${origin.y}px)`] },
      { duration: 700, easing: "cubic-bezier(.76,0,.24,1)",
        pseudoElement: "::view-transition-new(root)" }
    )
  );
}
/* globals.css */
/* ::view-transition-old(root), ::view-transition-new(root)
   { animation: none; mix-blend-mode: normal; } */
```

## One content model, two skins
Each section component reads the same data and renders a Cyber or Series
variant. State lives in context or in components that are theme-agnostic and
skinned only by tokens, so form input, accordion state and scroll survive a
switch. Lazy-load the inactive theme's variants with `next/dynamic` and
prefetch them on idle.

## Persona logic (data-driven in `persona-config.ts`)
| Persona | Primary hero CTA | Section order | Emphasis |
|---|---|---|---|
| Recruiter | Download Resume | Hero, Impact stats, Experience, Work, Skills, Contact | Roles, years, real metrics; GitHub de-emphasized |
| Developer | View GitHub | Hero, Work (architecture notes + repo links), Skills, Services, Experience, Contact | Stack pills, repo links, a terminal/code flourish in hero |
| Explorer | Play Intro | Full narrative order | Everything |

Changing persona reorders sections with a layout animation and swaps CTAs.

# SECTION MAP
| Section | Cyber variant | Series variant |
|---|---|---|
| Intro sequence | Mono 0-100 counter + lime bar, name wipe | Dark screen, name draws in with red light sweep |
| Gate | "Who's watching?" in cyber skin | Same in Series skin |
| Hero | Layered giant type + cutout portrait + cursor parallax | Billboard: "[NAME]: THE SERIES" |
| Services | Inverting accordion | "Browse by Genre" chips + featured panel |
| Skills | Dual-track marquee | "Skill Universe" tabs with mastery tiles |
| Work | Alternating two-column showcase | Rails: Continue Exploring, Top Picks, Top 10 |
| Journey | Scroll-drawn vertical timeline | "The Journey" episode rail |
| About | Bio with keyword highlights + count-up stats | "About the Creator" featurette card |
| Contact | Dotted globe + glass form | Same globe + form, red accent |
| Outro | Giant outline watermark + neon underglow | "TO BE CONTINUED..." end credits |

# SECTION SPECS

## 0. Intro sequence (once per session, skippable, silent, under 1.8s)
Hands off to the hero choreography with no gap. Skip on Esc, click, or when a
deep link or reduced motion is detected. No audio, ever.

## 1. "Who's Watching?" gate
- Full-screen `role="dialog" aria-modal="true"` with focus trap. Cards:
  Recruiter ("Resume, impact and metrics first"), Developer ("Projects, stack
  and GitHub first"), Explorer ("The full story").
- Arrow keys move between cards, Enter selects. Visible focus ring.
- Hover or focus: spring scale 1.08 with an accent outline glow. Selection: the
  chosen card scales up and the gate zoom-fades into the page (~700ms).
- A small "Visual engine: Cyber | Series" pill at the bottom lets the visitor
  pick the skin before entering.
- Avatars are SVG: briefcase badge, code-bracket glyph, and the portrait.

## 2. Global chrome
- Floating glass pill nav with a section-aware active indicator, persona chip,
  and a ThemeSwitcher (pill with a sliding thumb, labeled "Cyber / Series").
- Thin scroll-progress line (motion value, not React state).
- Command palette on Cmd/Ctrl+K: jump to section, toggle theme, switch persona,
  open resume, copy email. Lazy-loaded. Press `T` to toggle theme when no
  input is focused.
- Custom cursor on fine pointers only: a dot with a ring that grows over
  interactive elements, plus magnetic buttons (max pull 12px). Never on touch.
- Mobile: full-screen slide-down drawer revealed with clip-path, staggered
  links, focus trap, Esc closes, Lenis stopped while open.

## 3. Hero
**Cyber**
- Layer 0: giant silver-to-white gradient text (`background-clip:text`) at
  85-90vw behind the subject. Default text is my name; "PORTFOLIO" is allowed
  if it fits the data. Layer 1: transparent portrait cutout, centered. Layer 2:
  floating pill nav, subtitle, location chip, "Contact" pill.
- Cursor parallax with `useMotionValue` + `useSpring(parallax)`. Three depth
  multipliers (text moves least, portrait most). On touch, use slow
  scroll-linked parallax instead.
- Signature moment: headline letters rise from a mask line (30ms stagger) while
  the portrait "develops" (blur and brightness resolving), then parallax goes live.
- If no cutout exists, use a placeholder and leave a visible TODO.

**Series**
- Full-bleed billboard: portrait with red ambient back-light and a radial fade,
  slow Ken Burns zoom (transform only).
- Left stack: "[NAME] ORIGINALS" ribbon, giant "[NAME]: THE SERIES", metadata
  row (99% Match in `--match`, Season 2026, "Top 10 in Tech" badge, role
  descriptors, 4K chip), a 2-sentence pitch from my real bio, and two buttons:
  "Play Intro" (white) and "View Resume" (translucent gray).
- "Play Intro" opens a modal player that plays `/intro.mp4` if it exists,
  otherwise a kinetic-typography reel of my roles and stack.

## 4. Services
**Cyber: inverting accordion.** Rows with index number, title, thin border and
a diagonal arrow. Rows: AI Full-Stack Development, Frontend Architecture,
Backend and Distributed Systems, AI and Automation, Mobile and Cross-Platform,
DevOps and Infrastructure. Keep only those supported by my real data.
- Use `<button aria-expanded aria-controls>`. Opens on hover, focus or click on
  desktop and on tap for touch. One open at a time.
- Inversion is a lime layer that wipes up from the bottom of the row
  (`transform-origin: bottom`) while text color transitions to #000, not an
  instant background swap. The arrow rotates 45 degrees with a spring.
- Expanded panel: left column of skill points (2-column checklist, ticks
  appear on a 40ms stagger), right column with the value proposition.

**Series: "Browse by Genre".** Genre chips along the top. A featured panel
crossfades between services with `AnimatePresence mode="wait"`.

## 5. Skills
**Cyber: dual-track marquee.** Row 1 moves left, Row 2 moves right. CSS
keyframes only, with the track content duplicated so a `-50%` loop is seamless.
On hover, ease the speed down to about 20% via `getAnimations()` playbackRate
rather than a hard pause. Edge-fade mask, pills with icon and label. Reduced
motion: static wrapped layout.

**Series: "Skill Universe".** Tabs: Languages, Frontend, Backend and Cloud, AI
and Tools. Tiles with an honest segmented proficiency meter (labels like
"Daily driver / Comfortable / Learning"), animated once when a tab opens.

## 6. Work
**Cyber.** Alternating two-column list. Per project: index, category badge,
bold uppercase title, problem -> solution -> result, tech pills, "Live Demo"
(filled lime) and "GitHub" (ghost outline). Mockup frame has browser chrome and
a screenshot with a 3D pointer tilt (max 6 degrees, spring) and inner image
parallax (+/-5%). Reverses per index. Stacked on mobile.

**Series.** Three rails:
- "Continue Exploring": progress bars driven by REAL tracking of which
  projects the visitor opened (localStorage).
- "Top Picks": episode cards ("EP 01: The Architect") with duration tags
  ("6 min read") and hover expansion (scale 1.25 after 250ms delay, origin-aware
  at rail edges) showing Live Demo, GitHub and More Info pills.
- "Top 10 in Tech": giant outlined numerals behind cards.

Rail mechanics: `snap-x snap-mandatory overflow-x-auto no-scrollbar`, chevron
arrows (visible on hover and focus, hidden on touch), keyboard arrow support,
drag-to-scroll on desktop, edge gradient masks.

**Shared project modal** (both skins): opens with a `layoutId` shared-element
transition from the card. Contains a case study (overview, role, stack,
metrics, links). Scroll-locked via Lenis stop. Esc and backdrop close it.

## 7. Journey
Cyber: sticky vertical timeline whose line draws with scroll (`useScroll` ->
`scaleY`). Series: "The Journey" episode rail. Entries are derived from my real
experience and education data.

## 8. About
Cyber: bio paragraph with tech keywords that underline-wipe in once, plus
count-up stats that run when visible. Series: horizontal documentary-style
featurette card with portrait, education, milestones and stats. Stats come from
real data only. Hide any stat that has no data.

## 9. Contact
**Globe (Canvas 2D, ref-driven single rAF loop, no React state per frame):**
- Points on a lat/long grid: ~24 latitude rings, per-ring longitude count
  proportional to cos(latitude) for even spacing. About 1,100 dots on desktop,
  about 550 on mobile.
- Auto-spin plus pointer-driven tilt (X +/-0.35 rad, Y offset +/-0.6 rad)
  smoothed by lerp 0.06. On touch, tilt by dragging.
- Perspective projection. Dot radius and alpha scale with depth (back
  hemisphere about 15% alpha). Accent color follows theme.
- A pulsing pin at my location from `portfolio-data` (`location: {lat,lng,label}`).
- DPR capped at 2. `ResizeObserver` for sizing. `IntersectionObserver` and
  `visibilitychange` pause the loop. Reduced motion renders one static frame.
- `aria-hidden` on the canvas with a text alternative beside it.

**Form:**
- Glass surface, floating labels (CSS `peer` + `placeholder-shown`), accent
  focus ring, native validation with clear inline messages.
- Submit states: idle -> sending (button morphs to a loader) -> success
  (checkmark draws with `pathLength`) -> error with retry.
- Honeypot field and basic rate limiting. `POST /api/contact` using Resend if
  an env key exists; otherwise fall back to `mailto:` and document it.
- Input must survive a theme switch.

## 10. Outro
**Cyber:** my name as a giant edge-to-edge outline watermark
(`-webkit-text-stroke`, transparent fill), with a bright horizontal lime
gradient bar beneath it and a static upward radial bloom whose opacity gently
breathes only while in view. Social pill badges and a back-to-top control.

**Series:** "TO BE CONTINUED..." in condensed display type, red "Let's Talk"
pill, LinkedIn, GitHub and Email shortcuts, and "Replay Experience" which
reopens the gate. Optional delight: a "Next episode in 5..." countdown button
that links to the resume.

# SMALL DELIGHTS (keep it to these)
`T` toggles theme, Cmd/Ctrl+K palette, tab-title change when the tab is hidden
("Come back: to be continued..."), a console hiring note, per-theme favicon,
and at most ONE easter egg.

# PERFORMANCE BUDGET
- Lighthouse mobile: Performance >= 90, Accessibility 100, Best Practices 100,
  SEO 100. Desktop Performance >= 97.
- LCP < 2.2s, CLS = 0, INP < 150ms, TBT < 150ms. Initial JS for `/` under
  170KB gzip, excluding lazy chunks.
- Images via next/image (AVIF/WebP), explicit sizes, blur placeholders, hero
  `priority`. Portrait cutout under 150KB.
- Code-split the globe, command palette, project modal, intro player and the
  inactive theme.
- Off-screen: pause rAF and CSS animations (`animation-play-state` via
  IntersectionObserver). Apply `will-change` only while animating, never
  permanently. Use `content-visibility:auto` with `contain-intrinsic-size` on
  heavy below-fold sections (verify Lenis anchor scrolling still works).
- No scroll listeners that set React state. Use `useScroll` and `useTransform`
  motion values.

# RESPONSIVE (below 768px)
- Test at 360, 390, 768, 1024, 1440, 1920 and 2560 (cap content at 1600px).
- Collapse multi-column layouts. Rails become touch swipe containers with the
  next card peeking (card width ~78vw). Accordion rows become tap cards.
- Hero: portrait centered, headline stacked and fitted. Globe ~75vw. Use `dvh`
  not `vh`. Respect safe-area insets. Disable the cursor and heavy parallax.
- Full-screen slide-down drawer menu as specified in Global chrome.

# SEO AND META
Next metadata API, per-theme OG image via `next/og`, JSON-LD `Person`,
sitemap, robots, canonical, per-theme `theme-color`, `color-scheme: dark`.

# QUALITY BAR: DO NOT
- No lorem ipsum, "John Doe", emoji used as icons, or invented metrics.
- No copy like "passionate developer" or "crafting digital experiences".
  Write plain, specific copy with active verbs and sentence case.
- No autoplaying audio, no scroll-jacking beyond Lenis, no infinite animations
  running off-screen, no unoptimized images, no `any`.
- No more than one signature effect fighting for attention in any viewport.

# WORKING PROTOCOL
1. Save this spec as `docs/PORTFOLIO_SPEC.md`.
2. Run the Phase 0 audit and produce a plan. STOP and wait for my "go".
3. Work on branch `feat/portfolio-v2`, commit per phase. After each phase run
   typecheck, lint and build. If you have a browser tool, screenshot both
   themes at 390px and 1440px, critique them against this spec, and fix what
   you find before reporting.
4. Report each phase as: done, deviations, risks. Keep it short.
5. If this spec conflicts with reality (renamed package, changed API), choose
   current best practice, note it in one line in `docs/DECISIONS.md`, and continue.
6. Ask me at most three questions in total, and only when truly blocked.

# DEFINITION OF DONE
- [ ] Both themes complete and switchable live with circular reveal; scroll,
      persona, accordion state and form input survive a switch
- [ ] Gate, intro, all 10 sections and the shared project modal implemented
- [ ] All original content preserved in `portfolio-data.ts`; TODOs listed in
      `docs/TODO-CONTENT.md`
- [ ] Lighthouse and Core Web Vitals targets met
- [ ] Keyboard-only run-through works end to end; reduced motion verified
- [ ] Verified at all listed viewports
- [ ] Zero TypeScript, ESLint or build errors; README updated
