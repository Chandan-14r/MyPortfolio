export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.76, 0, 0.24, 1],
} as const;

export const spring = {
  snappy: { type: "spring", stiffness: 380, damping: 30, mass: 0.8 },
  parallax: { stiffness: 120, damping: 20 },
  soft: { type: "spring", stiffness: 60, damping: 18 },
} as const;
