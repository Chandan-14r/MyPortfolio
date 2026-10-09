"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useRef, ReactNode, MouseEvent } from "react";
import { useApp } from "@/providers/AppProvider";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  as?: any;
  href?: string;
  onClick?: () => void;
}

export function Magnetic({ children, strength = 0.3, className, as = "button", href, onClick }: MagneticProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const { reducedMotion, isTouch } = useApp();

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: MouseEvent) => {
    if (reducedMotion || isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // max pull roughly calculated by strength
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = motion(as);

  return (
    <Component
      ref={ref}
      style={!reducedMotion && !isTouch ? { x: springX, y: springY } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      href={href}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}
