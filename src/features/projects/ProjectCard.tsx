import { useRef } from "react";
import { GlassCard } from "../../shared/ui/GlassCard";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  featured?: boolean;
  externalIcon?: boolean;
}

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className = "" }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;
    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return (
    <GlassCard
      ref={cardRef}
      glow
      className={`project-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "transform 0.15s ease, box-shadow 0.25s ease",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      {/* Subtle top-edge glow */}
      {project.featured && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            right: "20%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(79,110,247,0.6), transparent)",
          }}
        />
      )}

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <h3
          style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: "1.15rem",
            fontWeight: 600,
            color: "#E2E8FF",
            letterSpacing: "-0.01em",
          }}
        >
          {project.title}
        </h3>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title}`}
          style={{
            flexShrink: 0,
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(79, 110, 247, 0.12)",
            borderRadius: "8px",
            color: "var(--accent-blue)",
            border: "1px solid rgba(79, 110, 247, 0.2)",
            transition: "all 0.2s ease",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "rgba(79, 110, 247, 0.25)";
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(79, 110, 247, 0.5)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "rgba(79, 110, 247, 0.12)";
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(79, 110, 247, 0.2)";
          }}
        >
          <ArrowIcon />
        </a>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--text-muted)",
          lineHeight: 1.65,
          flex: 1,
        }}
      >
        {project.description}
      </p>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "0.72rem",
              color: "var(--accent-violet)",
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              padding: "0.25rem 0.6rem",
              borderRadius: "4px",
              letterSpacing: "0.02em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M2 12L12 2M12 2H6M12 2V8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
