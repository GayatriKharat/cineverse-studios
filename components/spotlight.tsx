"use client";
import { useEffect } from "react";

export function Spotlight() {
  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const move = (e: PointerEvent) => {
      root.style.setProperty("--spot-x", `${e.clientX}px`);
      root.style.setProperty("--spot-y", `${e.clientY}px`);
    };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, []);

  return <div className="spotlight" aria-hidden="true" />;
}
