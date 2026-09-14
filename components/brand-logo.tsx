"use client";

import Link from "next/link";

type BrandLogoProps = {
  href?: string | null;
  variant?: "dark" | "light";
  showTagline?: boolean;
  compact?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
};

/** Exact client logo file — do not redraw as SVG. */
const LOGO_SRC = "/narayani-logo.png?v=nobg-big-20260914";

export function BrandLogo({
  href = "/",
  variant = "dark",
  showTagline = false,
  compact = false,
  className = "",
  width,
}: BrandLogoProps) {
  const defaultWidth = compact ? 240 : 300;
  const computedWidth = width ?? defaultWidth;

  const content = (
    <span
      className={`brand-logo is-${variant}${compact ? " is-compact" : ""}${showTagline ? " has-tagline" : ""} ${className}`.trim()}
      style={{
        display: "inline-flex",
        alignItems: "center",
        width: typeof computedWidth === "number" ? `${computedWidth}px` : computedWidth,
        maxWidth: "100%",
        lineHeight: 1,
        background: "transparent",
      }}
    >
      <img
        className="brand-logo-image"
        src={LOGO_SRC}
        alt="Narayani Studios"
        width={typeof computedWidth === "number" ? computedWidth : 300}
        height={typeof computedWidth === "number" ? Math.round(computedWidth * 0.24) : 72}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "contain",
          background: "transparent",
        }}
        decoding="async"
      />
    </span>
  );

  if (href) {
    return (
      <Link
        className="brand-logo-link"
        href={href}
        aria-label="Narayani Studios home"
        style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}
      >
        {content}
      </Link>
    );
  }

  return content;
}

/** Kept for older imports — still serves the exact PNG. */
export function BrandLogoSvgLockup(props: { className?: string }) {
  return <BrandLogo href={null} className={props.className} />;
}
