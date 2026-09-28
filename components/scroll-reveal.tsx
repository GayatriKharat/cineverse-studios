"use client";

import { useEffect } from "react";

/** Sections stay visible — no scroll-triggered hide/reload animation. */
export function ScrollReveal() {
  useEffect(() => {
    const settle = () => {
      document.querySelectorAll("[data-rv]").forEach((el) => {
        el.classList.add("reveal-in", "reveal-settle");
      });
      document.querySelectorAll("[data-rv-media]").forEach((el) => {
        el.classList.add("media-reveal-in");
      });
      document.body.classList.add("motion-ready");
    };

    settle();

    // Catch late-mounted client sections once, then stop.
    const mo = new MutationObserver(() => {
      settle();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Disconnect after a short settle window so we don't keep scanning forever.
    const stop = window.setTimeout(() => mo.disconnect(), 2500);

    return () => {
      window.clearTimeout(stop);
      mo.disconnect();
      document.body.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
