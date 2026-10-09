"use client";

import { useRef, ReactNode, MouseEvent } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useApp } from "@/providers/AppProvider";

interface TiltProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

export function Tilt({ children, className, max = 6 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion, isTouch } = useApp();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30, mass: 1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [-1, 1], [max, -max]);
  const rotateY = useTransform(smoothX, [-1, 1], [-max, max]);

  const handleMouseMove = (e: MouseEvent) => {
    if (reducedMotion || isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: !reducedMotion && !isTouch ? rotateX : 0,
        rotateY: !reducedMotion && !isTouch ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
