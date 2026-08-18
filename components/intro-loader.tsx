"use client";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset("/narayani-lockup-official.png?v=2")} alt="Narayani Studios" width={708} height={212} />
      <b><i /></b>
    </div>
  );
}
