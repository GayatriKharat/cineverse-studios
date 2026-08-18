"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (matchMedia("(pointer: coarse)").matches) return;
    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      autoRaf: true,
      stopInertiaOnNavigate: true,
      prevent: (node) => Boolean(node.closest?.(".nav-drop, .index-menu, .contact-form")),
    });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}
