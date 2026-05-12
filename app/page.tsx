import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/* Lazy-load the custom cursor — desktop-only, non-critical */
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

/**
 * Single-page portfolio assembling all advanced animated sections.
 * CustomCursor is lazy-loaded since it's desktop-only and non-essential.
 */
export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
