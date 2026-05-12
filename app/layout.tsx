import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import DynamicBackground from "@/components/DynamicBackground";
import "./globals.css";

/* ── Fonts ──────────────────────────────────────────────────── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

/* ── Metadata for SEO ───────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Chandan R.S. — Full Stack Developer",
  description:
    "AI-powered full-stack developer portfolio. MERN stack, Python, Docker, Gemini API, TensorFlow, and cloud deployment across fintech, productivity, and eldercare projects.",
  keywords: [
    "Chandan R.S.",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "AI",
    "Gemini API",
    "Portfolio",
  ],
  authors: [{ name: "Chandan R.S." }],
  openGraph: {
    title: "Chandan R.S. — Full Stack Developer",
    description: "AI-powered full-stack developer building premium digital products.",
    type: "website",
  },
};

/* ── Root Layout ────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans bg-bg text-text-primary antialiased relative">
        <LenisProvider>
          {/* Awwwards-Tier Live Dynamic Ambient Background */}
          <DynamicBackground />

          {/* Foreground content flow */}
          <div className="relative z-10">{children}</div>
        </LenisProvider>
      </body>
    </html>
  );
}
