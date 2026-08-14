"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navIndex, navPrimary } from "@/lib/site-data";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className={`nav${scrolled ? " scrolled" : ""}`}>
        <Link className="wordmark" href="/">NARAYANI <i>STUDIOS</i></Link>
        <nav>
          {navPrimary.map(([label, href]) => (
            <Link key={href} href={href} className={isActive(href) ? "is-active" : undefined}>{label}</Link>
          ))}
        </nav>
        <div className="nav-end">
          <Link className="nav-cta" href="/contact">Enquire</Link>
          <button className="menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Open index">{open ? "Close" : "Index"}</button>
        </div>
      </header>
      <div className={`index-menu ${open ? "open" : ""}`} aria-hidden={!open}>
        <p className="eyebrow">Index</p>
        <div className="index-cols">
          {navIndex.map(([label, href], i) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
