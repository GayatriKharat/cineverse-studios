"use client";
import { useEffect, useRef } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
  }, []);

  return (
    <div ref={ref} data-rv className={className} style={{ "--reveal-delay": `${delay}s` } as React.CSSProperties}>
      {children}
    </div>
  );
}

export function Stagger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`stagger ${className}`}>{children}</div>;
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`stagger-item ${className}`}>
      <div style={{ height: "100%" }}>{children}</div>
    </Reveal>
  );
}

export function MediaReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add("media-reveal-in"); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} data-rv-media className={`media-reveal ${className}`}>{children}</div>;
}
