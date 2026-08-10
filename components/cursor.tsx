"use client";
import { useEffect } from "react";
export function Cursor(){useEffect(()=>{if(matchMedia("(pointer:coarse)").matches)return;const dot=document.querySelector<HTMLElement>(".cursor");if(!dot)return;const move=(e:PointerEvent)=>{dot.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`};addEventListener("pointermove",move);return()=>removeEventListener("pointermove",move)},[]);return <div className="cursor" aria-hidden="true"/>}
