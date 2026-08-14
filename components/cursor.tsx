"use client";
import { useEffect } from "react";

export function Cursor() {
  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    const dot = document.querySelector<HTMLElement>(".cursor");
    if (!dot) return;
    const move = (e: PointerEvent) => {
      dot.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
    };
    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      dot.classList.toggle("is-hot", Boolean(target?.closest("a, button, input, select, textarea")));
    };
    addEventListener("pointermove", move);
    addEventListener("pointerover", over);
    return () => {
      removeEventListener("pointermove", move);
      removeEventListener("pointerover", over);
    };
  }, []);
  return <div className="cursor" aria-hidden="true" />;
}
