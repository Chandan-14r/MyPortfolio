"use client";

import React, { useEffect, useRef } from "react";

/**
 * Awwwards-Tier Live Dynamic Ambient Background.
 * Combines multi-speed parallax layers, continuous drifting orbs, an animated shifting gradient mesh,
 * low-opacity Perlin noise overlays, and a smooth cursor-tracking radial spotlight.
 * Highly optimized using requestAnimationFrame and linear interpolation (lerp) to deliver rock-solid 60fps execution.
 */
export default function DynamicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const layerMidRef = useRef<HTMLDivElement>(null);
  const layerDeepRef = useRef<HTMLDivElement>(null);

  // Mouse interpolation tracking coordinates
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  // Scroll velocity tracking variables
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);

  useEffect(() => {
    // 1. Setup continuous cursor tracking listeners
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = e.clientX;
      targetMouse.current.y = e.clientY;
    };

    // 2. Setup scroll tracking listener
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Calculate scroll speed delta to dynamically boost orb motion
      scrollVelocity.current = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    let animationFrameId: number;

    // 3. Centralized render loop interpolating cursor position and parallax layer depth
    const renderLoop = () => {
      // Smooth linear interpolation (lerp) for the cursor spotlight
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.08;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.08;

      if (mouseGlowRef.current) {
        mouseGlowRef.current.style.transform = `translate3d(${currentMouse.current.x}px, ${currentMouse.current.y}px, 0)`;
      }

      // Decay scroll velocity gradually back to neutral drift state
      scrollVelocity.current *= 0.95;

      // Apply distinct global parallax speeds based on scroll offsets
      const scrollY = lastScrollY.current;
      if (layerDeepRef.current) {
        // Deepest ambient base shifts extremely slowly
        layerDeepRef.current.style.transform = `translate3d(0, ${scrollY * 0.08}px, 0)`;
      }

      if (layerMidRef.current) {
        // Mid layer shifting faster, adding an acceleration multiplier driven by current scroll speed
        const velocityBoost = scrollVelocity.current * 0.2;
        layerMidRef.current.style.transform = `translate3d(0, ${scrollY * 0.25 + velocityBoost}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    // Clean up global sub-listeners
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* ── Layer 1: Animated Multi-Color Gradient Mesh ── */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-accent-cyan/10 via-transparent to-accent-purple/10 animate-gradient-shift bg-[length:200%_200%]" />

      {/* ── Layer 2: Deep Ambient Parallax Mesh (moves very slowly) ── */}
      <div ref={layerDeepRef} className="absolute inset-0 will-change-transform">
        {/* Soft amber radial base in bottom section */}
        <div className="absolute bottom-[-10%] right-[10%] w-[80vw] h-[80vw] rounded-full bg-radial-amber blur-[140px] opacity-15 animate-spin-slow" />
      </div>

      {/* ── Layer 3: Mid Parallax Drifting Glowing Orbs (moves faster + responds to scroll velocity) ── */}
      <div ref={layerMidRef} className="absolute inset-0 will-change-transform">
        {/* Cyan orb — top section */}
        <div className="absolute top-[15%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-radial-cyan blur-[120px] opacity-25 animate-float" />
        {/* Purple orb — middle section */}
        <div className="absolute top-[45%] right-[-5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-radial-purple blur-[120px] opacity-20 animate-float-delayed" />
      </div>

      {/* ── Layer 4: Smooth Cursor Tracking Ambient Glow Spotlight ── */}
      <div
        ref={mouseGlowRef}
        className="absolute top-[-300px] left-[-300px] w-[600px] h-[600px] rounded-full will-change-transform transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── Layer 5: High-Frequency Low-Opacity Shifting Perlin Noise Overlay ── */}
      <div className="absolute inset-0 noise-overlay opacity-[0.02]" />
    </div>
  );
}
