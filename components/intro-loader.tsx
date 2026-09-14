"use client";

import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

export function IntroLoader() {
  const [phase, setPhase] = useState<"boot" | "lit" | "done">("boot");

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("done");
      return;
    }

    const lit = window.setTimeout(() => setPhase("lit"), 120);
    const done = window.setTimeout(() => setPhase("done"), 1680);
    return () => {
      window.clearTimeout(lit);
      window.clearTimeout(done);
    };
  }, []);

  return (
    <div
      className={`intro-loader is-${phase}`}
      aria-hidden={phase === "done"}
      role="presentation"
    >
      <div className="intro-stage">
        <div className="intro-n-wrap">
          <img
            className="intro-logo"
            src={asset("/narayani-logo.png?v=loader-white-20260914")}
            alt=""
          />
          <span className="intro-beam" aria-hidden="true" />
          <span className="intro-glow" aria-hidden="true" />
        </div>
        <div className="intro-progress" aria-hidden="true">
          <i />
        </div>
      </div>
    </div>
  );
}
