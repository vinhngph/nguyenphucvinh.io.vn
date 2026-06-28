import { forwardRef } from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = "", glow = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`glass ${className}`}
        style={{
          boxShadow: glow
            ? "0 0 40px rgba(79, 110, 247, 0.12), 0 4px 24px rgba(0,0,0,0.4)"
            : "0 4px 24px rgba(0,0,0,0.3)",
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

GlassCard.displayName = "GlassCard";
