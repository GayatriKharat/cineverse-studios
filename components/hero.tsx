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
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      gsap.to(".hero-reel", { scale: 1.08, duration: 18, ease: "none" });
      tl.from(".hero .eyebrow", { opacity: 0, y: 10, duration: 0.7 }, 0.2)
        .from(".hero-line span", { yPercent: 110, duration: 1.15, stagger: 0.12 }, 0.4)
        .from(".hero-lede", { opacity: 0, y: 16, duration: 0.75 }, 0.65)
        .from(".hero-actions", { opacity: 0, y: 16, duration: 0.7 }, 0.85)
        .from(".stage-rail", { opacity: 0, y: 18, duration: 0.8 }, 1.05)
        .from(".hero-slate, .hero-now", { opacity: 0, duration: 0.6 }, 1.15);
    }, el);
    return () => ctx.revert();
  }, []);


  return (
    <section ref={root} className="hero" id="top">
      <div className="hero-reel" aria-hidden="true" />
      <div className="hero-shade" />
      <div className="hero-copy wrap">
        <p className="eyebrow hero-meta">We create. You remember.</p>
        <h1>
          <span className="hero-line"><span>Brand it.</span></span>
          <span className="hero-line"><span>Shoot it.</span></span>
          <span className="hero-line"><span><em>Finish it.</em></span></span>
        </h1>
        <p className="hero-lede hero-meta">
          Script, shoot, edit — then digital, branded campaigns, conferences, broadcast and live.
        </p>
        <div className="hero-actions">
          <Magnetic><Link className="button" href="/services">Our services <span>↗</span></Link></Magnetic>
          <Link className="text-link" href="/contact">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
