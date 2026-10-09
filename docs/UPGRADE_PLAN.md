# Portfolio Aliveness Upgrade Plan

## Shortlist & Mapping

1. **Fix Leaked Copy (Gate)**
   - Section: Gate
   - Level: N/A
   - Tier: Lite

2. **Preloader Handoff**
   - Section: Intro -> Hero
   - Level: 5
   - Tier: Lite
   - Details: The persona selection card visually expands and transforms into the Hero sequence.

3. **Variable Font Proximity Weight**
   - Section: Cyber Hero (Level 5) & Outro (Level 4)
   - Tier: Medium (falls back to static bold on Lite/Touch)

4. **Ambient Canvas Particle Field**
   - Section: Cyber Hero
   - Tier: Medium
   - Details: Canvas2D particle net repelled by the cursor.

5. **Scroll-Scrubbed Text Lighting**
   - Section: About (Level 2 - whisper)
   - Tier: Lite
   - Details: GSAP ScrollTrigger `scrub: true` on SplitText words.

6. **Velocity-Driven Skew & Speed**
   - Section: Skills Marquee (Level 3), Work Rails (Series - Level 5)
   - Tier: Medium
   - Details: Lenis velocity drives GSAP `quickTo` for skew and timescale.

7. **Pinned Horizontal Scroll**
   - Section: Work (Cyber - Level 5)
   - Tier: High / Medium (Desktop only)
   - Details: Projects stack and advance horizontally while pinned.

8. **WebGL RGB Hover Distortion**
   - Section: Work mockups
   - Tier: High
   - Details: Lazy-loaded OGL/Three canvas for liquid hover on images.

9. **Drawn Timeline + Node Ignition**
   - Section: Journey (Level 3)
   - Tier: Lite
   - Details: Scroll draws the line, nodes pop and text scrambles in.

10. **Magnetic Morphing Cursor**
    - Section: Global Chrome
    - Tier: Medium
    - Details: "View" text, magnetic pull on CTAs.

11. **Form Feedback Burst**
    - Section: Contact (Level 4)
    - Tier: Lite
    - Details: Button click physics + drawn checkmark + particle burst.

12. **Section Color Crossfade**
    - Section: Global boundaries
    - Tier: Lite
    - Details: GSAP modifying `--bg` tokens smoothly based on scroll progress.

*Rejected Techniques:*
- *ASCII Portrait:* Rejected because the spec requests keeping the real portrait intact for the Series theme, and WebGL distortion is a better spend of the budget.
- *SVG Mask Transitions everywhere:* Too jarring if overused. We will use them only for the Hero -> About boundary.

## Phase Execution

- **L1 (Hotfix & Foundation):** Copy fixes, GSAP+Lenis integration, `motion.ts` updates, `quality.ts` governor creation.
- **L2 (Gate & Hero):** Persona flip transition, Intro sequence timeline, Canvas 2D ambient field, Variable font pointer math.
- **L3 (Scroll Choreography):** Pinned horizontal work scroll, Scrubbed bio text, Velocity skew marquees, Color crossfades.
- **L4 (Pointer & WebGL):** Global morphing cursor, Magnetic buttons, WebGL OGL image distortion canvas.
- **L5 (Signature Moments):** Services accordion ticks, Skills tile mastery meters, Journey ignition, Contact form physics & burst.
- **L6 (QA & Rhythm):** Throttled testing, Lighthouse audits, Rhythm tweaks, Multi-device verification, README update.
