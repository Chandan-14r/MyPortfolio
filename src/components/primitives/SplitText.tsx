"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  glitch?: boolean;
}

export function SplitText({ text, className, stagger = 0.03, delay = 0, glitch = false }: SplitTextProps) {
  const chars = text.split("");

  return (
    <motion.span className={`inline-block ${className || ""}`}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + i * stagger }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
