import type { CSSProperties } from "react";

/** Continuous gold/blue sparkles for N hero marks — live motion around the dissolve edge */
export function NSparkles({ className = "" }: { className?: string }) {
  const dots = Array.from({ length: 36 }, (_, i) => i);
  return (
    <div className={`n-sparkles ${className}`.trim()} aria-hidden="true">
      {dots.map((i) => {
        const lane = i % 6;
        // Cluster around the N body / bottom-right dissolve (right half of the field)
        const sx = 42 + ((i * 19) % 52);
        const sy = 18 + ((i * 13) % 68);
        return (
          <i
            key={i}
            className={`n-sparkle n-sparkle-m${lane}${i % 4 === 0 ? " is-blue" : ""}${i % 7 === 0 ? " is-lg" : ""}`}
            style={
              {
                "--sx": `${sx}%`,
                "--sy": `${sy}%`,
                "--dur": `${2.8 + (i % 8) * 0.45}s`,
                "--delay": `${(i % 11) * -0.38}s`,
                "--drift-x": `${(lane % 2 === 0 ? 1 : -1) * (12 + (i % 5) * 7)}px`,
                "--drift-y": `${-18 - (i % 6) * 8}px`,
                "--size": `${2 + (i % 4) + (i % 7 === 0 ? 2 : 0)}px`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
