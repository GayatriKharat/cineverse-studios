"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function PageTransition() {
  const pathname = usePathname();
  const first = useRef(true);
  const veil = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = veil.current;
    if (!el) return;
    el.classList.remove("on");
    void el.offsetWidth;
    el.classList.add("on");
  }, [pathname]);

  return <div ref={veil} className="veil" aria-hidden="true" />;
}
