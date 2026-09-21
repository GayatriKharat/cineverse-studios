"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Spark = {
  x: number;
  y: number;
  size: number;
  blue: boolean;
  delay: number;
  dur: number;
  dx: number;
  dy: number;
  kind: number;
};

const SPARKS: Spark[] = Array.from({ length: 42 }, (_, i) => ({
  x: 48 + ((i * 17) % 46),
  y: 22 + ((i * 13) % 62),
  size: 3 + (i % 5),
  blue: i % 4 === 0,
  delay: (i % 10) * 0.22,
  dur: 1.6 + (i % 6) * 0.35,
  dx: (i % 2 === 0 ? 1 : -1) * (28 + (i % 7) * 10),
  dy: -(24 + (i % 8) * 12),
  kind: i % 5,
}));

/** Continuous gold/blue sparkles with clear live motion around the N dissolve */
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
        const tl = gsap.timeline({ repeat: -1, delay: s.delay });

        gsap.set(node, {
          left: `${s.x}%`,
          top: `${s.y}%`,
          width: s.size,
          height: s.size,
          opacity: 0,
          x: 0,
          y: 0,
          scale: 0.35,
        });

        if (s.kind === 0) {
          // rise + fade
          tl.to(node, { opacity: 1, scale: 1.15, duration: s.dur * 0.22, ease: "power2.out" })
            .to(node, { x: s.dx, y: s.dy, duration: s.dur * 0.78, ease: "none" }, 0)
            .to(node, { opacity: 0, scale: 0.25, duration: s.dur * 0.35, ease: "power1.in" }, s.dur * 0.65);
        } else if (s.kind === 1) {
          // orbit arc
          tl.to(node, { opacity: 1, scale: 1.2, duration: 0.25 })
            .to(node, {
              motionPath: undefined,
              x: s.dx,
              y: s.dy * 0.4,
              rotation: 180,
              duration: s.dur * 0.5,
              ease: "sine.inOut",
            })
            .to(node, {
              x: s.dx * -0.35,
              y: s.dy,
              rotation: 360,
              opacity: 0,
              scale: 0.3,
              duration: s.dur * 0.5,
              ease: "sine.in",
            });
        } else if (s.kind === 2) {
          // lateral sweep from N spray edge
          tl.fromTo(
            node,
            { x: -16, y: 10, opacity: 0, scale: 0.4 },
            { x: s.dx * 1.2, y: s.dy * 0.55, opacity: 1, scale: 1.1, duration: s.dur * 0.45, ease: "power2.out" }
          ).to(node, { opacity: 0, scale: 0.2, duration: s.dur * 0.4, ease: "power1.in" });
        } else if (s.kind === 3) {
          // twinkle in place
          tl.to(node, { opacity: 1, scale: 1.6, duration: 0.28, ease: "power2.out" })
            .to(node, { opacity: 0.35, scale: 0.7, duration: 0.35 })
            .to(node, { opacity: 1, scale: 1.35, duration: 0.3 })
            .to(node, { opacity: 0, scale: 0.4, duration: 0.4 });
        } else {
          // float up with flicker
          tl.to(node, { opacity: 1, duration: 0.2 })
            .to(node, {
              y: s.dy,
              x: s.dx * 0.45,
              duration: s.dur,
              ease: "none",
              opacity: 0.9,
            }, 0)
            .to(node, { opacity: 0, scale: 0.2, duration: 0.35 }, s.dur * 0.7);
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={`n-sparkles ${className}`.trim()} aria-hidden="true">
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className={`n-sparkle${s.blue ? " is-blue" : ""}${s.size >= 6 ? " is-lg" : ""}`}
        />
      ))}
    </div>
  );
}
