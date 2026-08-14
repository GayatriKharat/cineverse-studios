"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PageTransition() {
  const pathname = usePathname();
  const first = useRef(true);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOn(true);
    const id = window.setTimeout(() => setOn(false), 650);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return <div className={`veil${on ? " on" : ""}`} aria-hidden="true" />;
}
