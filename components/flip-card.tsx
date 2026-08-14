"use client";
import { useState } from "react";

export function FlipCard({
  front,
  back,
  className = "",
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card ${className}${flipped ? " is-flipped" : ""}`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) return;
        if (window.matchMedia("(hover: none)").matches) setFlipped((value) => !value);
      }}
    >
      <div className="flip-inner">
        <div className="flip-face flip-front">{front}</div>
        <div className="flip-face flip-back">{back}</div>
      </div>
    </div>
  );
}
