# Chandan R.S. — Premium Portfolio

A luxury-tier animated portfolio built with **Next.js**, **Tailwind CSS**, **Framer Motion**, and **GSAP**.

## Quick Start

```bash
# Install dependencies
npm install

# Set up EmailJS (for contact form)
cp .env.local.example .env.local
# Edit .env.local with your EmailJS keys from https://www.emailjs.com/

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  layout.tsx          → Root layout, fonts, metadata, noise overlay
  page.tsx            → Single-page portfolio (all sections)
  globals.css         → Tailwind base + custom utilities
components/
  Navbar.tsx          → Glassmorphism sticky nav with scroll progress
  Hero.tsx            → Animated hero with split text + glitch
  About.tsx           → Bio reveal + photo with glow ring
  Projects.tsx        → Filterable project grid
  ProjectCard.tsx     → Card with hover physics + glow border
  Skills.tsx          → Animated marquee + category cards
  Experience.tsx      → Scroll-triggered vertical timeline
  Contact.tsx         → EmailJS form with micro-interactions
  MagneticButton.tsx  → Cursor-following magnetic CTA
  CustomCursor.tsx    → Custom cursor dot (desktop only)
  ScrollReveal.tsx    → Reusable scroll-triggered reveal
  SplitText.tsx       → Character-by-character text animation
hooks/
  useMousePosition.ts → Global mouse tracking for effects
lib/
  data.ts             → All portfolio content (single source of truth)
```

## Setup

### 1. Add Your Photo
Place your photo at `public/chandan-photo.jpg`.

### 2. Configure EmailJS
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create a service (e.g., Gmail)
3. Create an email template
4. Copy your keys to `.env.local`

### 3. Add Project Images
Place project thumbnails in `public/projects/`:
- `inheritance-os.jpg`
- `investisync.jpg`
- `nova-agent.jpg`
- `carecompanion.jpg`

## Deploy to Vercel

```bash
npx vercel
```

Add your `.env.local` variables in Vercel's dashboard under Settings → Environment Variables.

## Optional Enhancements
- **Blog**: Add `app/blog/` with MDX support
- **Dark/Light toggle**: Extend Tailwind with `darkMode: 'class'`
- **Analytics**: Add Vercel Analytics with `@vercel/analytics`
- **3D element**: Add a Three.js globe or particle field to the hero

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS 3.4** (custom config)
- **Framer Motion 11** (animations)
- **GSAP** (scroll-driven timeline)
- **EmailJS** (contact form)

## Performance
- Custom cursor lazy-loaded (desktop only)
- All images use `next/image` with AVIF/WebP
- Animations use `transform` + `opacity` only (60fps)
- Noise overlay via inline SVG (no extra download)

---

*Designed like an artist, implemented like an engineer.*
