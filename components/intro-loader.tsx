"use client";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";

export function IntroLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = matchMedia("(max-width: 860px)").matches;
    const t = window.setTimeout(() => setDone(true), reduce ? 120 : compact ? 450 : 900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className={`intro-loader${done ? " is-done" : ""}`} aria-hidden={done}>
      <BrandLogo href={null} variant="dark" showTagline />
      <b><i /></b>
    </div>
  );
}
