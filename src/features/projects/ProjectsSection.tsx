import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ProjectCard } from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PROJECTS = [
  {
    id: "rbac-rag",
    title: "rbac-rag",
    description:
      "Semantic search API with fine-grained role-based access control layers. Query the right data, with the right permissions — no overexposure.",
    tags: ["Python", "FastAPI", "LangChain", "PostgreSQL", "RAG"],
    href: "https://github.com/vinhngph/rbac-rag",
    featured: true,
  },
  {
    id: "realtime-vi-asr",
    title: "realtime-vi-asr",
    description:
      "Low-latency Vietnamese speech recognition engine built for real-world, noisy audio environments. Streams text as you speak.",
    tags: ["Python", "PyTorch", "WebSocket", "ASR", "DeepSpeech"],
    href: "https://github.com/vinhngph/realtime-vi-asr",
    featured: true,
  },
  {
    id: "clash-royale-terminal",
    title: "Clash Royale Terminal",
    description:
      "Terminal-native recreation of Clash Royale's core card battle engine. Full game logic, AI opponents, real-time CLI rendering.",
    tags: ["Python", "Game Engine", "CLI", "OOP"],
    href: "https://github.com/vinhngph/clash-royale-terminal",
    featured: false,
  },
  {
    id: "others",
    title: "More on GitHub",
    description:
      "Explore other experiments, tools, and open-source contributions on my GitHub profile.",
    tags: ["GitHub", "Open Source"],
    href: "https://github.com/vinhngph",
    featured: false,
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Section header reveal
      gsap.fromTo(
        ".projects-header",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      // Cards staggered reveal
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-section="1"
      style={{
        minHeight: "100vh",
        position: "relative",
        zIndex: 10,
        padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 6vw, 8rem)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-5%",
          top: "30%",
          width: "40vw",
          height: "40vw",
          maxWidth: "600px",
          maxHeight: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <div ref={containerRef} style={{ maxWidth: "1100px", width: "100%" }}>
        {/* Header */}
        <div className="projects-header" style={{ marginBottom: "3rem" }}>
          <p className="section-label" style={{ marginBottom: "0.75rem" }}>
            Selected Work
          </p>
          <h2
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "#E2E8FF",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Things I've <span className="gradient-text">built.</span>
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
