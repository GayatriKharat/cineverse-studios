"use client";

import { useEffect } from "react";

/** One observer drives every scroll reveal, matching the client site's global runtime. */
export function ScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = (el: Element) => el.classList.add("reveal-in");
    if (reduce) {
      document.querySelectorAll("[data-rv]").forEach(reveal);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { reveal(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    const scan = () => document.querySelectorAll("[data-rv]:not(.reveal-in)").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
  return null;
}
