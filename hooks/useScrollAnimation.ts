import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Safely register ScrollTrigger plugin on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface UseScrollAnimationOptions {
  /** The element triggering the scroll event. Defaults to the attached ref element. */
  trigger?: React.RefObject<HTMLElement> | string | null;
  /** Trigger entry configuration. Example: "top 80%" triggers when the element's top edge crosses 80% down the viewport. */
  start?: string;
  /** Trigger exit configuration. Example: "bottom 20%" ends animation when element's bottom crosses 20% from top. */
  end?: string;
  /** Ties animation progress directly to scrollbar movement. Boolean or interpolation delay value (e.g., 1). */
  scrub?: boolean | number;
  /** Locks the element in place during scrub duration. */
  pin?: boolean;
  /** Displays visual guidelines for debugging intersection states. */
  markers?: boolean;
  /** Controls playback behavior for intersection states: onEnter, onLeave, onEnterBack, onLeaveBack. */
  toggleActions?: string;
  /** Target GSAP animation variables (opacity, x, y, scale, easing). */
  animationProps?: gsap.TweenVars;
  /** Determines GSAP tween topology. */
  type?: "from" | "to" | "fromTo";
  /** Initial state values when using fromTo topology. */
  fromProps?: gsap.TweenVars;
}

/**
 * Custom hook wrapping GSAP ScrollTrigger for automated intersection animations.
 * Provides granular reactive animation triggers built on top of high-performance ScrollTrigger listeners.
 * Every trigger context leverages hardware-accelerated transforms to ensure fluid 60fps framerates.
 */
export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Resolve target trigger node
    const triggerEl =
      typeof options.trigger === "string"
        ? options.trigger
        : options.trigger?.current || el;

    // Compile ScrollTrigger configuration dictionary
    // Default trigger constraint: initiates animation when target top crosses 80% viewport height
    // Easing default: power2.out applies a smooth, natural deceleration profile
    const stConfig: ScrollTrigger.Vars = {
      trigger: triggerEl,
      start: options.start || "top 85%",
      end: options.end || "bottom 15%",
      scrub: options.scrub,
      pin: options.pin,
      markers: options.markers,
      // "play none none reverse" -> Plays forward when entering view, reverses back when leaving viewport upwards
      toggleActions: options.toggleActions || "play none none reverse",
    };

    // Construct scoped GSAP animation block to simplify component teardowns
    const ctx = gsap.context(() => {
      const animTargetProps: gsap.TweenVars = {
        scrollTrigger: stConfig,
        ease: "power2.out", // Natural friction curve easing
        duration: 0.8,
        ...options.animationProps,
      };

      if (options.type === "from") {
        gsap.from(el, animTargetProps);
      } else if (options.type === "fromTo" && options.fromProps) {
        gsap.fromTo(el, options.fromProps, animTargetProps);
      } else {
        gsap.to(el, animTargetProps);
      }
    }, el);

    // Clean up instances safely on unmount
    return () => {
      ctx.revert();
    };
  }, [options]);

  return elementRef;
}
