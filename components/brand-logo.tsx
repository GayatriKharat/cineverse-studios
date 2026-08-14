"use client";
import Link from "next/link";
import { asset } from "@/lib/asset";

type BrandLogoProps = {
  href?: string;
  variant?: "dark" | "light";
  showTagline?: boolean;
  compact?: boolean;
};

export function BrandLogo({ href = "/", variant = "dark", showTagline = true, compact = false }: BrandLogoProps) {
  const content = (
    <span className={`brand-logo is-${variant}${compact ? " is-compact" : ""}${showTagline ? " has-tagline" : ""}`}>
      <span className="brand-logo-stage">
        <span className="brand-logo-float">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/narayani-lockup-official.png")}
            alt=""
            width={708}
            height={212}
            className={`brand-logo-image is-on-dark${variant === "dark" ? " is-on" : ""}`}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/narayani-lockup-official-light.png")}
            alt=""
            width={708}
            height={212}
            className={`brand-logo-image is-on-light${variant === "light" ? " is-on" : ""}`}
          />
        </span>
        <span className="brand-logo-shine" aria-hidden="true" />
      </span>
      <span className="sr-only">Narayani Studios</span>
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
