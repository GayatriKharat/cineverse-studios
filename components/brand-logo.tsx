"use client";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

type BrandLogoProps = {
  href?: string | null;
  variant?: "dark" | "light";
  showTagline?: boolean;
  compact?: boolean;
  className?: string;
};

// Official custom geometric letterforms for NARAYANI featuring the signature triangular A's with center dots
function NarayaniWordmark({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      viewBox="0 0 248 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="brand-logo-narayani-svg"
      aria-label="NARAYANI"
    >
      {/* N */}
      <path d="M2 36V2H8.5L22 26.5V2H28V36H21.5L8 11.5V36H2Z" fill={color} />
      
      {/* A (signature geometric triangle with inverted apex cutout & center dot) */}
      <g transform="translate(33, 0)">
        <path d="M14 2L27 36H20.2L14 17L7.8 36H1L14 2Z" fill={color} />
        <circle cx="14" cy="27" r="2.5" fill={color} />
      </g>
      
      {/* R */}
      <g transform="translate(66, 0)">
        <path d="M2 36V2H15.5C21.5 2 25.5 5.5 25.5 12C25.5 17 22.5 20.5 17.5 21.8L26.5 36H18.5L11.5 23H8V36H2ZM8 10V16.8H15C17.5 16.8 19 15.5 19 13.2C19 10.8 17.5 10 15 10H8Z" fill={color} />
      </g>
      
      {/* A */}
      <g transform="translate(98, 0)">
        <path d="M14 2L27 36H20.2L14 17L7.8 36H1L14 2Z" fill={color} />
        <circle cx="14" cy="27" r="2.5" fill={color} />
      </g>
      
      {/* Y */}
      <g transform="translate(131, 0)">
        <path d="M2 2H9L15.5 16.5L22 2H29L19 20.5V36H12V20.5L2 2Z" fill={color} />
      </g>
      
      {/* A */}
      <g transform="translate(164, 0)">
        <path d="M14 2L27 36H20.2L14 17L7.8 36H1L14 2Z" fill={color} />
        <circle cx="14" cy="27" r="2.5" fill={color} />
      </g>
      
      {/* N */}
      <g transform="translate(197, 0)">
        <path d="M2 36V2H8.5L22 26.5V2H28V36H21.5L8 11.5V36H2Z" fill={color} />
      </g>
      
      {/* I */}
      <g transform="translate(231, 0)">
        <path d="M2 2H8V36H2V2Z" fill={color} />
      </g>
    </svg>
  );
}

export function BrandLogo({
  href = "/",
  variant = "dark",
  showTagline = false,
  compact = false,
  className = "",
}: BrandLogoProps) {
  // textColor: on light header variant="dark", use #000000; on dark footer/hero variant="light", use #FFFFFF
  const textColor = variant === "light" ? "#FFFFFF" : "#000000";

  const content = (
    <span
      className={`brand-logo is-${variant}${compact ? " is-compact" : ""}${showTagline ? " has-tagline" : ""} ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: compact ? "10px" : "14px",
        textDecoration: "none",
      }}
    >
      <BrandMark className="brand-logo-mark" size={compact ? 42 : 50} />
      <span
        className="brand-logo-text-group"
        style={{
          display: "inline-flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "2px",
          color: textColor,
        }}
      >
        <span
          style={{
            display: "block",
            width: compact ? "138px" : "164px",
            height: "auto",
          }}
        >
          <NarayaniWordmark color={textColor} />
        </span>
        <span
          className="brand-logo-studios-label"
          style={{
            fontSize: compact ? "10px" : "11.5px",
            fontWeight: 800,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: textColor,
            lineHeight: 1.1,
            paddingLeft: "2px",
            fontFamily: "var(--font-sans), Outfit, 'Montserrat', sans-serif",
          }}
        >
          STUDIOS
        </span>
        {showTagline && (
          <small
            className="brand-logo-tag"
            style={{
              fontSize: "7.5px",
              letterSpacing: "0.14em",
              color: variant === "light" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
              marginTop: "2px",
              paddingLeft: "2px",
            }}
          >
            WE CREATE. YOU REMEMBER.
          </small>
        )}
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
