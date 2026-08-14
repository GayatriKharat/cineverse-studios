"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function FlipCard({
  front,
  back,
  className = "",
  href,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const router = useRouter();
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card ${className}${flipped ? " is-flipped" : ""}`}
      role={href ? "link" : undefined}
      tabIndex={href ? 0 : undefined}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onKeyDown={(event) => {
        if (!href) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(href);
        }
      }}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) return;
        const touch = window.matchMedia("(hover: none)").matches;
        if (touch) {
          if (!flipped) {
            setFlipped(true);
            return;
          }
        }
        if (href) router.push(href);
      }}
    >
      <div className="flip-inner">
        <div className="flip-face flip-front">{front}</div>
        <div className="flip-face flip-back">{back}</div>
      </div>
    </div>
  );
}
