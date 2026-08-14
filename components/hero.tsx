"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { houseReelBeats } from "@/lib/house-reel";
import { pillars } from "@/lib/site-data";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [beat, setBeat] = useState(0);
  const [active, setActive] = useState(1);

  useEffect(() => {
    const el = root.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line span", { yPercent: 110, duration: 1.4, stagger: 0.14, ease: "power4.out", delay: 0.12 });
      gsap.from(".hero-meta, .hero-actions, .stage-rail", { opacity: 0, y: 20, duration: 1, delay: 0.9, ease: "power3.out" });
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    const play = () => {
      el.play().catch(() => undefined);
    };
    play();
    el.addEventListener("canplay", play);
    el.addEventListener("loadeddata", play);
    const onTime = () => {
      const duration = el.duration || 1;
      const n = houseReelBeats.length;
      const index = Math.min(n - 1, Math.floor((el.currentTime / duration) * n));
      setBeat(index);
    };
    el.addEventListener("timeupdate", onTime);
    return () => {
      el.removeEventListener("canplay", play);
      el.removeEventListener("loadeddata", play);
      el.removeEventListener("timeupdate", onTime);
    };
  }, []);

  const current = pillars[active];
  const slate = houseReelBeats[beat];

  return (
    <section ref={root} className="hero" id="top">
      <video
        ref={video}
        className="hero-reel"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/service-documentary.png"
      >
        <source src="/house-reel.mp4?v=3" type="video/mp4" />
        <source src="/reels/house-reel.mp4?v=3" type="video/mp4" />
        <source src="/reels/set.mp4" type="video/mp4" />
      </video>
      <div className="hero-shade" />
      <div className="hero-copy wrap">
        <p className="eyebrow hero-meta">Narayani Studios LLP · House reel</p>
        <h1>
          <span className="hero-line"><span>Brand it.</span></span>
          <span className="hero-line"><span>Shoot it.</span></span>
          <span className="hero-line"><span><em>Finish it.</em></span></span>
        </h1>
        <p className="hero-lede hero-meta">
          Script, shoot, edit — then digital, branded campaigns, conferences, broadcast and live.
        </p>
        <div className="hero-actions">
          <Link className="button" href="/services">See our services <span>↗</span></Link>
          <Link className="text-link" href="/contact">Start a brief</Link>
        </div>
      </div>
      <p className="hero-slate" aria-live="polite">
        <span>{slate.code}</span>
        On the reel · {slate.label}
      </p>
      <div className="stage-rail wrap">
        {pillars.map((pillar, i) => (
          <Link
            key={pillar.slug}
            href={`/services/${pillar.slug}`}
            className={i === active ? "is-on" : ""}
            onMouseEnter={() => setActive(i)}
          >
            <span>{pillar.code}</span>
            <strong>{pillar.title}</strong>
            <small>{pillar.items.slice(0, 3).join(" · ")}</small>
          </Link>
        ))}
      </div>
      <p className="hero-now">Now showing · {current.title}</p>
    </section>
  );
}
