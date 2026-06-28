import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GlassCard } from "../../shared/ui/GlassCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "contact@nguyenphucvinh.io.vn",
    href: "mailto:contact@nguyenphucvinh.io.vn",
    icon: "✉",
  },
  {
    label: "GitHub",
    value: "github.com/vinhngph",
    href: "https://github.com/vinhngph",
    icon: "⌘",
  },
];

export function EducationContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(
        ".ec-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
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
      id="contact"
      data-section="2"
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
          left: "-5%",
          bottom: "20%",
          width: "45vw",
          height: "45vw",
          maxWidth: "650px",
          maxHeight: "650px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79,110,247,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <div
        ref={containerRef}
        style={{
          maxWidth: "1100px",
          width: "100%",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
          gap: "clamp(2rem, 5vw, 5rem)",
          alignItems: "start",
        }}
      >
        {/* Education */}
        <div
          className="ec-item"
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          <div>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>
              Background
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
              Where I <span className="gradient-text">studied.</span>
            </h2>
          </div>

          <GlassCard glow style={{ padding: "1.75rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "#E2E8FF",
                    marginBottom: "0.35rem",
                  }}
                >
                  Ho Chi Minh International University
                </p>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-muted)",
                  }}
                >
                  Computer Science &amp; Engineering
                </p>
              </div>
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: "0.75rem",
                  color: "var(--accent-blue)",
                  background: "rgba(79, 110, 247, 0.1)",
                  border: "1px solid rgba(79, 110, 247, 0.2)",
                  padding: "0.3rem 0.7rem",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                }}
              >
                2020 – 2024
              </span>
            </div>

            {/* Divider */}
            <div
              aria-hidden="true"
              style={{
                margin: "1.25rem 0",
                height: "1px",
                background:
                  "linear-gradient(90deg, rgba(79,110,247,0.2), transparent)",
              }}
            />

            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--text-muted)",
                lineHeight: 1.6,
              }}
            >
              Built a strong foundation in algorithms, distributed systems, and
              software engineering — then kept building on nights and weekends.
            </p>
          </GlassCard>
        </div>

        {/* Contact */}
        <div
          className="ec-item"
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          <div>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>
              Contact
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
              Let's <span className="gradient-text">talk.</span>
            </h2>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                style={{ textDecoration: "none" }}
              >
                <GlassCard
                  style={{
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    transition: "all 0.25s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(79,110,247,0.4)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                    (e.currentTarget as HTMLElement).style.transform = "";
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background:
                        "linear-gradient(135deg, rgba(79,110,247,0.2), rgba(139,92,246,0.2))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem",
                      flexShrink: 0,
                    }}
                  >
                    {link.icon}
                  </div>
                  <div>
                    <p
                      className="section-label"
                      style={{ marginBottom: "0.2rem", opacity: 0.7 }}
                    >
                      {link.label}
                    </p>
                    <p
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: "0.85rem",
                        color: "var(--text-primary)",
                      }}
                    >
                      {link.value}
                    </p>
                  </div>
                </GlassCard>
              </a>
            ))}
          </div>

          {/* Footer signature */}
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "0.75rem",
              color: "rgba(107, 124, 181, 0.4)",
              marginTop: "1rem",
            }}
          >
            © {new Date().getFullYear()} Nguyễn Phúc Vinh
          </p>
        </div>
      </div>
    </section>
  );
}
