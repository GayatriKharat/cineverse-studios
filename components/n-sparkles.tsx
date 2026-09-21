import type { CSSProperties } from "react";

/** Continuous gold/blue sparkles for N hero marks */
export function NSparkles({ className = "" }: { className?: string }) {
  const dots = Array.from({ length: 28 }, (_, i) => i);
  return (
    <div className={`n-sparkles ${className}`.trim()} aria-hidden="true">
      {dots.map((i) => (
        <i
          key={i}
          className={`n-sparkle n-sparkle-${(i % 4) + 1}${i % 5 === 0 ? " is-blue" : ""}`}
          style={
            {
              "--sx": `${8 + ((i * 17) % 78)}%`,
              "--sy": `${52 + ((i * 11) % 42)}%`,
              "--dur": `${3.2 + (i % 7) * 0.55}s`,
              "--delay": `${(i % 9) * -0.45}s`,
              "--drift": `${10 + (i % 6) * 6}px`,
              "--size": `${2 + (i % 5)}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
