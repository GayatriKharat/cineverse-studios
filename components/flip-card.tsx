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
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (href) {
            router.push(href);
          } else {
            setFlipped((prev) => !prev);
          }
        }
      }}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) return;
        if (href) {
          router.push(href);
        } else {
          setFlipped((prev) => !prev);
        }
      }}
    >
      <div className="flip-inner">
        <div className="flip-face flip-front">{front}</div>
        <div className="flip-face flip-back">{back}</div>
      </div>
    </div>
  );
}
