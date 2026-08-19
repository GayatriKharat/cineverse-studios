"use client";
import Link from "next/link";
import { asset } from "@/lib/asset";

type BrandLogoProps = {
  href?: string | null;
  variant?: "dark" | "light";
  showTagline?: boolean;
  compact?: boolean;
};

export function BrandLogo({ href = "/", variant = "dark", showTagline = true, compact = false }: BrandLogoProps) {
  const content = (
    <span className={`brand-logo is-${variant}${compact ? " is-compact" : ""}${showTagline ? " has-tagline" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset("/narayani-n-mark.svg")} alt="" width={128} height={128} className="brand-logo-mark" />
      <span className="brand-logo-copy">
        <span className="brand-logo-name">NARAYANI</span>
        <span className="brand-logo-studios"><i />STUDIOS<i /></span>
        {showTagline ? <span className="brand-logo-tag">WE CREATE. YOU REMEMBER.</span> : null}
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
