"use client";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

type BrandLogoProps = {
  href?: string | null;
  variant?: "dark" | "light";
  showTagline?: boolean;
  compact?: boolean;
};

export function BrandLogo({ href = "/", variant = "dark", showTagline = true, compact = false }: BrandLogoProps) {
  const content = (
    <span className={`brand-logo is-${variant}${compact ? " is-compact" : ""}${showTagline ? " has-tagline" : ""}`}>
      <BrandMark className="brand-logo-mark" size={compact ? 40 : 46} />
      <span className="brand-logo-copy">
        <strong className="brand-logo-name">NARAYANI</strong>
        <span className="brand-logo-studios"><i /> STUDIOS <i /></span>
        {showTagline && <small className="brand-logo-tag">WE CREATE. YOU REMEMBER.</small>}
      </span>
    </span>
  );

  if (href) {
    return (
      <Link className="brand-logo-link" href={href} aria-label="Narayani Studios home">
        {content}
      </Link>
    );
  }

  return content;
}
