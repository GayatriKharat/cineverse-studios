"use client";
import { useEffect, useRef, type ReactNode } from "react";

export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(pointer: coarse)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const x = (e.clientX - box.left - box.width / 2) * 0.18;
      const y = (e.clientY - box.top - box.height / 2) * 0.18;
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
    };
    const leave = () => {
      el.style.transform = "translate3d(0,0,0)";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <span ref={ref} className={`magnetic ${className}`} style={{ display: "inline-flex", transition: "transform .25s cubic-bezier(.16,1,.3,1)" }}>
      {children}
    </span>
  );
}
