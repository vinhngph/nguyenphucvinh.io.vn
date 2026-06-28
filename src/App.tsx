import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ThreeBackground } from "./features/three-background/ThreeBackground";
import { HeroSection } from "./features/hero/HeroSection";
import { ProjectsSection } from "./features/projects/ProjectsSection";
import { EducationContactSection } from "./features/education-contact/EducationContactSection";
import { NavDots } from "./shared/ui/NavDots";
import { useStore } from "./store/useStore";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  const setActiveSection = useStore((s) => s.setActiveSection);
  const setScrollProgress = useStore((s) => s.setScrollProgress);
  const setMousePosition = useStore((s) => s.setMousePosition);

  // Track scroll — update active section and progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const winH = window.innerHeight;
      const docH = document.documentElement.scrollHeight - winH;
      setScrollProgress(docH > 0 ? scrollY / docH : 0);

      const sections = document.querySelectorAll<HTMLElement>("[data-section]");
      sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= winH * 0.55 && rect.bottom > winH * 0.45) {
          setActiveSection(i);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialise
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrollProgress, setActiveSection]);

  // Track normalised mouse position
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePosition(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      );
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [setMousePosition]);

  return (
    <>
      {/* Fixed 3D canvas — behind everything */}
      <ThreeBackground />

      {/* Fixed navigation dots */}
      <NavDots />

      {/* Main scroll container */}
      <main style={{ position: "relative", zIndex: 10 }}>
        <HeroSection />
        <ProjectsSection />
        <EducationContactSection />
      </main>
    </>
  );
}
