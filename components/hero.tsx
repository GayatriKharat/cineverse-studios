"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cssUrl } from "@/lib/asset";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      gsap.to(".hero-visual", { scale: 1.05, duration: 18, ease: "none" });
      tl.from(".hero-kicker", { opacity: 0, y: 10, duration: 0.5 }, 0.15)
        .from(".hero-title span", { opacity: 0, y: 36, duration: 0.85, stagger: 0.12 }, 0.25)
        .from(".hero-lede", { opacity: 0, y: 12, duration: 0.6 }, 0.7);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="hero" id="top">
      <div className="hero-stage wrap">
        <div className="hero-copy">
          <p className="eyebrow hero-kicker">Services</p>
          <h1 className="hero-title">
            <span>Six divisions.</span>
            <span className="hero-accent">One</span>
            <span>floor.</span>
          </h1>
          <p className="hero-lede">
            From the first idea to the final delivery, every craft lives in one connected production house. Open a division to find the right route for your brief.
          </p>
        </div>
        <div className="hero-visual" style={{ backgroundImage: cssUrl("/Updated Images/narayani Home white.png") }} aria-label="Narayani production studio" />
      </div>
    </section>
  );
}
