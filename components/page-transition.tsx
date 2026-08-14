"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function PageTransition() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    first.current = false;
  }, [pathname]);

  return null;
}
