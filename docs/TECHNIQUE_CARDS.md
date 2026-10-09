# Technique Cards (Research from Awwwards / Codrops / GSAP)

## 1. Velocity-Driven Skew & Speed
- **Experience:** As the user scrolls faster, marquees speed up and project cards skew/stretch, returning to normal when scroll stops.
- **Build:** Lenis `velocity` hooked into GSAP `quickTo` on the elements' `skewY` and `timeScale`.
- **Fit:** Skills marquee, Work rails.
- **Tier:** Low cost.

## 2. Scroll-Scrubbed Text Lighting
- **Experience:** A large paragraph of text starts dim/transparent. As the user scrolls, words light up sequentially, perfectly tied to the scroll position.
- **Build:** GSAP ScrollTrigger with `scrub: true` and SplitText (splitting by words).
- **Fit:** About / Bio section.
- **Tier:** Low cost.

## 3. WebGL RGB Hover Distortion
- **Experience:** Hovering over a project thumbnail causes the image to warp fluidly, separating RGB channels slightly, guided by the mouse velocity.
- **Build:** A single shared OGL or Three.js canvas placed behind/over images. When hovering an image, its texture is passed to the shader.
- **Fit:** Work section mockups.
- **Tier:** High cost (requires `high` tier governor).

## 4. Drawn Timeline + Node Ignition
- **Experience:** A line draws down the screen as you scroll. When it hits a milestone node, the node bursts/glows, and the year scrambles into view.
- **Build:** GSAP ScrollTrigger + DrawSVG (or CSS `stroke-dashoffset` scrub) + GSAP ScrambleText.
- **Fit:** Journey section.
- **Tier:** Low cost.

## 5. Pinned Horizontal Scroll
- **Experience:** The user scrolls down, the section pins in place, and further scrolling translates the content horizontally.
- **Build:** GSAP ScrollTrigger `pin: true` and `x` translation.
- **Fit:** Work section (Cyber desktop).
- **Tier:** Medium cost.

## 6. Magnetic Morphing Cursor
- **Experience:** The cursor is a small dot. When near a button, it snaps to the center and the button pulls slightly. When over a project, the cursor expands and says "VIEW".
- **Build:** GSAP `quickTo` for cursor X/Y. Event listeners update a React state or CSS class to change the cursor label/size.
- **Fit:** Global.
- **Tier:** Low cost (assuming no heavy filters).

## 7. Ambient Particle/Noise Field
- **Experience:** A subtle, slow-drifting field of particles or noise in the background that reacts to the mouse moving across it.
- **Build:** Canvas 2D with a simple physics loop for particles, repelled by mouse coordinates.
- **Fit:** Cyber Hero background.
- **Tier:** Medium cost.

## 8. Variable Font Proximity Weight
- **Experience:** A giant headline reacts to the cursor—letters closer to the mouse get thicker (`wght` axis increases).
- **Build:** JS tracks mouse position, calculates distance to each letter's bounding box, and updates a CSS variable for `font-variation-settings`.
- **Fit:** Cyber Hero headline, Cyber Outro watermark.
- **Tier:** Low cost.

## 9. SVG Mask Section Transitions
- **Experience:** Scrolling from one section to the next doesn't just scroll—it wipes via an expanding custom shape (like a star or circle).
- **Build:** GSAP ScrollTrigger manipulating an SVG `<clipPath>` wrapping the next section.
- **Fit:** Hero to About handoff.
- **Tier:** Medium cost.

## 10. Shared-Element Modal (Flip)
- **Experience:** Clicking a card causes the image to physically detach and smoothly fly to the top of the modal, expanding as it goes.
- **Build:** Framer Motion `layoutId` (already partially there, needs refinement) or GSAP Flip plugin.
- **Fit:** Work case study modal.
- **Tier:** Low cost.

## 11. Form Success Burst + Checkmark
- **Experience:** Hitting submit draws a checkmark SVG and emits a small burst of confetti/particles from the button.
- **Build:** Canvas-confetti (or GSAP custom particles) + GSAP draw effect.
- **Fit:** Contact form.
- **Tier:** Low cost.

## 12. ScrambleText Reveals
- **Experience:** Text doesn't just fade; it decodes into place like a terminal.
- **Build:** GSAP ScrambleText plugin (or custom interval logic).
- **Fit:** Cyber Nav, Headers.
- **Tier:** Low cost.
