"use client";

import { useEffect } from "react";

/** One observer drives every scroll reveal — reveal once, never re-trigger. */
export function ScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const settleVisible = (el: Element) => {
      el.classList.add("reveal-in", "reveal-settle");
    };

    const reveal = (el: Element) => {
      if (el.classList.contains("reveal-in")) return;
      el.classList.add("reveal-in");
    };

    const isInView = (el: Element) => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return rect.top < vh * 0.94 && rect.bottom > 0;
    };

    // Settle already-visible sections BEFORE motion-ready hides the rest —
    // prevents refresh → hide → re-animate lag.
    document.querySelectorAll("[data-rv]").forEach((el) => {
      if (reduce || isInView(el)) settleVisible(el);
    });

    document.body.classList.add("motion-ready");

    if (reduce) {
      return () => document.body.classList.remove("motion-ready");
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          io.unobserve(entry.target);
        });
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px -4% 0px",
      }
    );

    const observeEl = (el: Element) => {
      if (el.classList.contains("reveal-in")) return;
      if (isInView(el)) {
        settleVisible(el);
        return;
      }
      io.observe(el);
    };

    const scan = () => {
      document.querySelectorAll("[data-rv]:not(.reveal-in)").forEach(observeEl);
    };

    scan();

    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          scan();
          break;
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      document.body.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
