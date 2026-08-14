"use client";
import Image from "next/image";
import Link from "next/link";

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
          <Image
            src="/narayani-lockup-official.png"
            alt=""
            width={708}
            height={212}
            className={`brand-logo-image is-on-dark${variant === "dark" ? " is-on" : ""}`}
            priority
          />
          <Image
            src="/narayani-lockup-official-light.png"
            alt=""
            width={708}
            height={212}
            className={`brand-logo-image is-on-light${variant === "light" ? " is-on" : ""}`}
            priority
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
