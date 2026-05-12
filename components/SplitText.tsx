"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Delay before the first character appears */
  startDelay?: number;
  /** Time between each character */
  stagger?: number;
  /** Apply glitch effect after text is fully revealed */
  glitch?: boolean;
}

/**
 * Animates text character-by-character with staggered fade-in.
 * Each character fades up individually for a premium "typing" feel.
 * Optional glitch effect triggers once all characters are visible.
 */
export default function SplitText({
  text,
  className = "",
  startDelay = 0.3,
  stagger = 0.03,
  glitch = false,
}: SplitTextProps) {
  const characters = text.split("");
  const totalDuration = startDelay + characters.length * stagger;

  return (
    <motion.span
      className={`inline-block ${className}`}
      aria-label={text}
      /* After all characters appear, optionally run a 300ms glitch */
      animate={glitch ? { animation: "glitch 0.3s ease-in-out" } : undefined}
      transition={{ delay: totalDuration + 0.1 }}
    >
      {characters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          aria-hidden="true"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.4,
            delay: startDelay + i * stagger,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Preserve spaces */}
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
