"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { navPrimary, type NavItem } from "@/lib/site-data";

function norm(href: string) {
  if (!href || href === "/") return "/";
  return href.replace(/\/+$/, "");
}

function isActive(pathname: string, item: NavItem) {
  const path = norm(pathname);
  const href = norm(item.href);
  if (href === "/") return path === "/";
  if (path === href || path.startsWith(`${href}/`)) return true;
  return Boolean(item.children?.some((child) => {
    const to = norm(child.href);
    return path === to || path.startsWith(`${to}/`);
  }));
}

export function Navigation() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenDrop(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenDrop(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDrop(null);
        setOpen(false);
      }
    };
    addEventListener("pointerdown", onPointer);
    addEventListener("keydown", onKey);
    return () => {
      removeEventListener("pointerdown", onPointer);
      removeEventListener("keydown", onKey);
    };
  }, []);

  const onDarkHero = pathname === "/" && !scrolled;

  const openParent = (event: React.MouseEvent, item: NavItem) => {
    if (!item.children?.length) return;
    const touch = window.matchMedia("(hover: none)").matches;
    if (touch && openDrop !== item.label) {
      event.preventDefault();
      setOpenDrop(item.label);
    }
  };

  return (
    <>
      <header ref={navRef} className={`nav${scrolled ? " scrolled" : ""}${onDarkHero ? " on-hero" : ""}${open ? " is-open" : ""}`}>
        <BrandLogo variant="dark" compact showTagline />
        <nav aria-label="Primary">
          {navPrimary.map((item) => (
            <div key={item.label} className={`nav-item${item.children ? " has-drop" : ""}${openDrop === item.label ? " is-open" : ""}`}>
              <Link
                href={item.href}
                className={`nav-link${isActive(pathname, item) ? " is-active" : ""}`}
                onClick={(event) => openParent(event, item)}
              >
                {item.label}
              </Link>
              {item.children ? (
                <>
                  <button
                    type="button"
                    className="nav-caret"
                    aria-label={`${item.label} menu`}
                    aria-expanded={openDrop === item.label}
                    onClick={() => setOpenDrop((current) => (current === item.label ? null : item.label))}
                  >
                    ▾
                  </button>
                  <div className="nav-drop">
                    <div className="nav-drop-inner">
                      {item.children.map((child) => (
                        <Link key={`${child.href}-${child.label}`} href={child.href} onClick={() => setOpenDrop(null)}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </nav>
        <button className="menu" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? "Close" : "Menu"}
        </button>
      </header>
      <div className={`index-menu${open ? " open" : ""}`} aria-hidden={!open}>
        <p className="eyebrow">Menu</p>
        <div className="index-cols">
          {navPrimary.map((item, i) => (
            <div key={item.label} className="index-block">
              <Link className="index-main" href={item.href} onClick={() => setOpen(false)}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
              {item.children ? (
                <div className="index-sub">
                  {item.children.filter((child) => norm(child.href) !== norm(item.href)).map((child) => (
                    <Link key={child.href} href={child.href} onClick={() => setOpen(false)}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
