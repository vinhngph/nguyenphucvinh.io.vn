import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.6 },
      )
        .fromTo(
          ".hero-line-1",
          { opacity: 0, y: 60, skewY: 4 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9 },
          "-=0.2",
        )
        .fromTo(
          ".hero-line-2",
          { opacity: 0, y: 60, skewY: 4 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9 },
          "-=0.65",
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4",
        )
        .fromTo(
          ".hero-mission",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.45",
        )
        .fromTo(
          ".hero-ctas",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".hero-scroll-hint",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.2",
        );
    },
    { scope: containerRef },
  );

  // Blinking cursor
  useEffect(() => {
    if (!cursorRef.current) return;
    const anim = gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      ease: "none",
    });
    return () => {
      anim.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="0"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        zIndex: 10,
        padding: "0 clamp(1.5rem, 6vw, 8rem)",
      }}
    >
      {/* Radial spotlight behind content */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10%",
          top: "20%",
          width: "55vw",
          height: "55vw",
          maxWidth: "700px",
          maxHeight: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79,110,247,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <div ref={containerRef} style={{ maxWidth: "900px", width: "100%" }}>
        {/* Location badge */}
        <div
          className="hero-badge glass-subtle"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 1rem",
            borderRadius: "100px",
            marginBottom: "2.5rem",
          }}
        >
          <span style={{ fontSize: "0.8rem" }}>📍</span>
          <span
            className="section-label"
            style={{ letterSpacing: "0.15em", opacity: 1 }}
          >
            Ho Chi Minh City, Vietnam
          </span>
        </div>

        {/* Name — two lines, enormous */}
        <h1
          style={{
            fontFamily: '"Space Grotesk", sans-serif',
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
            overflow: "hidden",
          }}
        >
          <div
            className="hero-line-1"
            style={{
              fontSize: "clamp(4rem, 11vw, 10rem)",
              fontWeight: 700,
              color: "#E2E8FF",
              display: "block",
            }}
          >
            Nguyễn
          </div>
          <div
            className="hero-line-2"
            style={{
              fontSize: "clamp(4rem, 11vw, 10rem)",
              fontWeight: 700,
              display: "block",
            }}
          >
            <span className="gradient-text">Phúc Vinh</span>
            <span
              style={{
                background: "linear-gradient(135deg, #4f6ef7, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              .
            </span>
          </div>
        </h1>

        {/* Title with cursor */}
        <div
          className="hero-sub"
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: "clamp(1rem, 2.2vw, 1.4rem)",
            color: "var(--text-muted)",
            marginBottom: "1.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          <span style={{ color: "var(--accent-blue)", marginRight: "0.5rem" }}>
            //
          </span>
          Full-Stack Developer
          <span
            ref={cursorRef}
            style={{
              display: "inline-block",
              width: "2px",
              height: "1.1em",
              background: "var(--accent-blue)",
              marginLeft: "2px",
              verticalAlign: "middle",
              borderRadius: "1px",
            }}
          />
        </div>

        {/* Mission */}
        <p
          className="hero-mission"
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
            color: "var(--text-muted)",
            lineHeight: 1.7,
            maxWidth: "520px",
            marginBottom: "2.5rem",
          }}
        >
          Building impactful products that{" "}
          <span style={{ color: "var(--text-primary)", fontStyle: "italic" }}>
            help people
          </span>{" "}
          in their daily lives.
        </p>

        {/* CTAs */}
        <div
          className="hero-ctas"
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <a href="#projects" className="btn-primary">
            View Projects →
          </a>
          <a href="#contact" className="btn-ghost">
            Get in Touch
          </a>
        </div>

        {/* Scroll hint */}
        <div
          className="hero-scroll-hint"
          style={{
            marginTop: "4rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            color: "rgba(107, 124, 181, 0.5)",
            fontSize: "0.78rem",
            fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: "0.1em",
          }}
        >
          <ScrollArrow />
          scroll
        </div>
      </div>
    </section>
  );
}

function ScrollArrow() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const anim = gsap.to(ref.current, {
      y: 5,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: "sine.inOut",
    });
    return () => {
      anim.kill();
    };
  }, []);

  return (
    <svg
      ref={ref}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 1v12M2 8l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
