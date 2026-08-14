"use client";
import { useEffect } from "react";
import Lenis from "lenis";
export function SmoothScroll(){useEffect(()=>{if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;const lenis=new Lenis({lerp:.085,wheelMultiplier:.85,smoothWheel:true});let id=0;const raf=(time:number)=>{lenis.raf(time);id=requestAnimationFrame(raf)};id=requestAnimationFrame(raf);return()=>{cancelAnimationFrame(id);lenis.destroy()}},[]);return null}
