"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Magnetic } from "@/components/magnetic";
import { asset } from "@/lib/asset";
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
        poster={asset("/service-documentary.png")}
      >
        <source src={asset("/house-reel.mp4?v=3")} type="video/mp4" />
        <source src={asset("/reels/house-reel.mp4?v=3")} type="video/mp4" />
        <source src={asset("/reels/set.mp4")} type="video/mp4" />
      </video>
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
          <Magnetic>
            <Link className="button" href="/services">See our services <span>↗</span></Link>
          </Magnetic>
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
