"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { value?: number; text?: string; suffix?: string; label: string; decimals?: number };

export function AnimatedStats({ stats }: { stats: Stat[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const run = () => {
      if (reduce) { setProgress(1); return; }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1700);
        setProgress(1 - Math.pow(1 - t, 3));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { run(); observer.disconnect(); }
    }, { threshold: 0.25 });
    observer.observe(element);
    return () => { observer.disconnect(); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return <div ref={root} className="stats-band" aria-label="Studio at a glance">
    {stats.map((stat, index) => <div key={stat.label} style={{ "--stat-index": index } as React.CSSProperties}>
      <b>{stat.text ?? (stat.decimals ? ((stat.value ?? 0) * progress).toFixed(stat.decimals) : Math.round((stat.value ?? 0) * progress).toLocaleString("en-IN"))}{stat.suffix ?? ""}</b>
      <span>{stat.label}</span>
    </div>)}
  </div>;
}
