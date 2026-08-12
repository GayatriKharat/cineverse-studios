"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DroneFlight } from "./drone-flight";
gsap.registerPlugin(ScrollTrigger);

export function Hero(){
  const section=useRef<HTMLElement>(null); const copy=useRef<HTMLDivElement>(null);
  const base=process.env.NEXT_PUBLIC_BASE_PATH??"";
  const visualStyle={"--hero-image":`url(${base}/cinematic-aurora-hero.png)`} as CSSProperties;
  useEffect(()=>{const el=section.current;if(!el||matchMedia("(prefers-reduced-motion:reduce)").matches)return;const context=gsap.context(()=>{gsap.fromTo(copy.current,{y:36,opacity:0},{y:0,opacity:1,duration:1.35,ease:"power3.out"});gsap.to(".hero-fallback",{scale:1.08,ease:"none",scrollTrigger:{trigger:el,start:"top top",end:"bottom bottom",scrub:.5}})},el);return()=>context.revert()},[]);
  return <section ref={section} id="top" className="hero-wrap aurora-hero" style={visualStyle}><div className="hero"><div className="hero-fallback"/><div className="hero-grid"/><div className="particles" aria-hidden="true"/><DroneFlight/><div ref={copy} className="hero-copy"><p className="eyebrow">Production · Branding · Media</p><h1>Ideas built<br/>to <em>move forward.</em></h1><p className="hero-lede">From strategy and pre-production to production, post-production, digital, advertising and live experiences—Narayani Studios brings ambitious ideas to life.</p><a className="button aurora-button" href="/contact">Start a conversation <span>↗</span></a></div><p className="scroll-note">Scroll to explore</p></div></section>
}
