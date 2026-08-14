"use client";
import { useEffect } from "react";

export function ScrollProgress() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(".progress");
    if (!el) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const value = max > 0 ? (scrollY / max) * 100 : 0;
      el.style.setProperty("--scroll", `${value}%`);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return <div className="progress" aria-hidden="true" />;
}
