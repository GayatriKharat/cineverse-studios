"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Magnetic } from "@/components/magnetic";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 1.55 });
      gsap.fromTo(
        ".hero-reel",
        { opacity: 0, x: 28, scale: 0.94 },
        { opacity: 1, x: 0, scale: 1, duration: 1.35, ease: "power3.out", delay: 1.55 }
      );
      tl.from(".hero-line span", { yPercent: 110, duration: 1.05, stagger: 0.1 }, 0)
        .from(".hero-lede", { opacity: 0, y: 14, duration: 0.65 }, 0.25)
        .from(".hero-actions", { opacity: 0, y: 14, duration: 0.6 }, 0.45);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="hero" id="top">
      <div className="hero-n-field" aria-hidden="true">
        <span className="hero-mid-haze" />
        <span className="hero-mid-ring is-a" />
        <span className="hero-mid-ring is-b" />
        <span className="hero-mid-dust" />
        <span className="hero-n-cast" />
        <div className="hero-reel">
          <span className="hero-n-light" />
        </div>
      </div>
      <div className="hero-shade" />
      <div className="hero-copy wrap">
        <h1>
          <span className="hero-line"><span>Script to screen,</span></span>
          <span className="hero-line"><span><em>under one <span className="title-end">roof<span className="title-stop">.</span></span></em></span></span>
        </h1>
        <p className="hero-lede hero-meta">
          Strategy, story, shoot, edit, distribute, launch, one studio for every stage of the work.
        </p>
        <div className="hero-actions">
          <Magnetic><Link className="button" href="/services">Our Services ↗</Link></Magnetic>
          <Link className="button-ghost" href="/contact">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
