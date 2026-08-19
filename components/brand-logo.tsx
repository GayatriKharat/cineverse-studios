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
  const src = asset(variant === "light" ? "/narayani-lockup-official-light.png?v=2" : "/narayani-lockup-official.png?v=2");
  const content = (
    <span className={`brand-logo is-${variant}${compact ? " is-compact" : ""}${showTagline ? " has-tagline" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="Narayani Studios" width={708} height={212} className="brand-logo-image" />
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
