import { useStore } from "../../store/useStore";

const SECTIONS = ["Hero", "Projects", "Background"];

export function NavDots() {
  const activeSection = useStore((s) => s.activeSection);

  const handleClick = (index: number) => {
    const sectionEls = document.querySelectorAll("[data-section]");
    const target = sectionEls[index] as HTMLElement | undefined;
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        right: "2rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        gap: "0.875rem",
        alignItems: "center",
      }}
      aria-label="Section navigation"
    >
      {SECTIONS.map((label, i) => (
        <button
          key={label}
          onClick={() => handleClick(i)}
          aria-label={`Go to ${label}`}
          title={label}
          style={{
            width: i === activeSection ? "8px" : "6px",
            height: i === activeSection ? "8px" : "6px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            background:
              i === activeSection
                ? "linear-gradient(135deg, #4F6EF7, #8B5CF6)"
                : "rgba(107, 124, 181, 0.4)",
            boxShadow:
              i === activeSection ? "0 0 10px rgba(79, 110, 247, 0.6)" : "none",
            padding: 0,
          }}
        />
      ))}
    </nav>
  );
}
