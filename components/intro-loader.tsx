"use client";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

export function IntroLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setDone(true), reduce ? 200 : 1200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className={`intro-loader${done ? " is-done" : ""}`} aria-hidden={done}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset("/narayani-lockup-official.png")} alt="" width={708} height={212} />
      <b><i /></b>
    </div>
  );
}
