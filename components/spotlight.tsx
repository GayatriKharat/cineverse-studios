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
    const click = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest(".hero") || target.closest("a,button,input,select,textarea,[role='button']")) return;
      root.style.setProperty("--click-x", `${e.clientX}px`);
      root.style.setProperty("--click-y", `${e.clientY}px`);
      root.classList.remove("spotlight-clicked");
      requestAnimationFrame(() => root.classList.add("spotlight-clicked"));
    };
    const clearClick = () => root.classList.remove("spotlight-clicked");
    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerdown", click, { passive: true });
    root.addEventListener("animationend", clearClick);
    return () => {
      removeEventListener("pointermove", move);
      removeEventListener("pointerdown", click);
      root.removeEventListener("animationend", clearClick);
    };
  }, []);

  return <div className="spotlight" aria-hidden="true" />;
}
