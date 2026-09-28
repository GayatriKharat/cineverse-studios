"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Spark = {
  /** spawn within the bottom spray of the N */
  x: number;
  y: number;
  size: number;
  mist: boolean;
  delay: number;
  dur: number;
  /** directed travel: up + slightly out along the spray */
  dx: number;
  dy: number;
};

/** Soft gold dust clustered at the N’s bottom tip, drifting up-right like the dissolve spray */
const SPARKS: Spark[] = Array.from({ length: 22 }, (_, i) => {
  const t = i / 21;
  // Bottom-right leg / tip of the N (matches the dissolve sparkle zone)
  const x = 58 + (i % 7) * 3.2 + (i % 3) * 1.1;
  const y = 78 + (i % 5) * 2.4 + (t * 4);
  // Direction: soft arc up and outward (same space as the painted sparkles)
  const dx = 10 + (i % 6) * 4 + t * 18;
  const dy = -(22 + (i % 5) * 6 + t * 28);
  return {
    x,
    y: Math.min(y, 94),
    size: i % 5 === 0 ? 3.5 : i % 3 === 0 ? 2.4 : 1.6,
    mist: i % 5 === 0,
    delay: (i % 11) * 0.28,
    dur: 2.8 + (i % 5) * 0.45,
    dx,
    dy,
  };
});

export function NSparkles({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = el.querySelectorAll<HTMLElement>(".n-sparkle");
    const ctx = gsap.context(() => {
      nodes.forEach((node, i) => {
        const s = SPARKS[i];
        if (!s) return;

        gsap.set(node, {
          left: `${s.x}%`,
          top: `${s.y}%`,
          width: s.size,
          height: s.size,
          opacity: 0,
          x: 0,
          y: 0,
          scale: 0.4,
        });

        // Soft knowing drift along the spray path — fade in, ease up-right, fade out
        gsap
          .timeline({ repeat: -1, delay: s.delay, defaults: { ease: "sine.inOut" } })
          .to(node, {
            opacity: s.mist ? 0.55 : 0.95,
            scale: s.mist ? 1.05 : 1.2,
            duration: s.dur * 0.22,
            ease: "power1.out",
          })
          .to(
            node,
            {
              x: s.dx,
              y: s.dy,
              duration: s.dur * 0.78,
              ease: "sine.out",
            },
            0.05
          )
          .to(
            node,
            {
              opacity: 0,
              scale: 0.35,
              duration: s.dur * 0.32,
              ease: "power1.in",
            },
            s.dur * 0.62
          );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={`n-sparkles is-directed ${className}`.trim()} aria-hidden="true">
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className={`n-sparkle${s.mist ? " is-mist" : ""}${s.size >= 3 ? " is-lg" : ""}`}
        />
      ))}
    </div>
  );
}
