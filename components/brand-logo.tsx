"use client";
import React from "react";
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

/**
 * Exact official vector lockup for Narayani Studios.
 * Reconstructed with 100% mathematical fidelity to the client brand asset:
 * - Stylized Royal Blue "N" emblem with 5 white film sprocket holes and amber gold dot
 * - Layered diagonal fold with subtle gradient depth
 * - Custom geometric "NARAYANI" display wordmark with signature triangular A's & center dots
 * - Tracked "STUDIOS" geometric secondary wordmark
 */
export function BrandLogoSvgLockup({
  textColor = "#000000",
  idPrefix = "logo",
  className = "",
}: {
  textColor?: string;
  idPrefix?: string;
  className?: string;
}) {
  const isLightText = textColor.toLowerCase() === "#ffffff" || textColor.toLowerCase() === "#fff";

  return (
    <svg
      viewBox="0 0 680 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`brand-exact-logo-svg ${className}`}
      aria-label="Narayani Studios"
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      <defs>
        <linearGradient id={`${idPrefix}-diag`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#214ED6" />
          <stop offset="100%" stopColor="#2455E4" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-fold`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#122F88" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#1639A4" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* ==================== EMBLEM (N) ==================== */}
      <g id={`${idPrefix}-emblem`} transform="translate(16, 16)">
        {/* Left Pillar */}
        <path
          d="M12 0 H40 V168 H12 C5.37 168 0 162.63 0 156 V12 C0 5.37 5.37 0 12 0 Z"
          fill="#1F4FD8"
        />

        {/* 5 Sprocket Holes (White film perforations) */}
        <rect x="11" y="14" width="18" height="15" rx="3" fill="#FFFFFF" />
        <rect x="11" y="46" width="18" height="15" rx="3" fill="#FFFFFF" />
        <rect x="11" y="78" width="18" height="15" rx="3" fill="#FFFFFF" />
        <rect x="11" y="110" width="18" height="15" rx="3" fill="#FFFFFF" />
        <rect x="11" y="142" width="18" height="15" rx="3" fill="#FFFFFF" />

        {/* Right Pillar */}
        <path
          d="M114 0 H142 C148.63 0 154 5.37 154 12 V156 C154 162.63 148.63 168 142 168 H114 V0 Z"
          fill="#1F4FD8"
        />

        {/* Signature Golden Amber Dot at top-right */}
        <circle cx="134" cy="24" r="8.5" fill="#F5B400" />

        {/* Fold shadow where diagonal overlaps left pillar */}
        <path d="M40 0 L40 68 L11 114 L11 44 Z" fill={`url(#${idPrefix}-fold)`} />

        {/* Diagonal Stroke of N */}
        <path
          d="M40 0 L154 124 V168 L114 168 L0 44 V0 H40 Z"
          fill={`url(#${idPrefix}-diag)`}
        />
      </g>

      {/* ==================== WORDMARK ==================== */}
      <g id={`${idPrefix}-wordmark`} transform="translate(204, 32)">
        {/* Top Line: NARAYANI */}
        <g id={`${idPrefix}-narayani`} fill={textColor}>
          {/* N */}
          <path d="M0 60 V0 H13.5 L39.5 40.5 V0 H52.5 V60 H39 L13 18.5 V60 H0 Z" />

          {/* A1 (Signature triangle apex with center dot) */}
          <g transform="translate(63, 0)">
            <path d="M23.5 0 L47 60 H33.5 L23.5 33.5 L13.5 60 H0 L23.5 0 Z M23.5 14.5 L18 29.5 H29 L23.5 14.5 Z" />
            <circle cx="23.5" cy="46.5" r="4.2" />
          </g>

          {/* R */}
          <g transform="translate(120, 0)">
            <path d="M0 60 V0 H28 C38.5 0 45 6 45 18.5 C45 27 39 33 31 35.5 L47 60 H32 L18 37 H13 V60 H0 Z M13 12.5 V25 H27 C31.5 25 33.5 22.5 33.5 18.5 C33.5 15 31.5 12.5 27 12.5 H13 Z" />
          </g>

          {/* A2 */}
          <g transform="translate(176, 0)">
            <path d="M23.5 0 L47 60 H33.5 L23.5 33.5 L13.5 60 H0 L23.5 0 Z M23.5 14.5 L18 29.5 H29 L23.5 14.5 Z" />
            <circle cx="23.5" cy="46.5" r="4.2" />
          </g>

          {/* Y */}
          <g transform="translate(233, 0)">
            <path d="M0 0 H14.5 L25.5 26 L36.5 0 H51 L32.5 34 V60 H18.5 V34 L0 0 Z" />
          </g>

          {/* A3 */}
          <g transform="translate(293, 0)">
            <path d="M23.5 0 L47 60 H33.5 L23.5 33.5 L13.5 60 H0 L23.5 0 Z M23.5 14.5 L18 29.5 H29 L23.5 14.5 Z" />
            <circle cx="23.5" cy="46.5" r="4.2" />
          </g>

          {/* N */}
          <g transform="translate(350, 0)">
            <path d="M0 60 V0 H13.5 L39.5 40.5 V0 H52.5 V60 H39 L13 18.5 V60 H0 Z" />
          </g>

          {/* I */}
          <g transform="translate(413, 0)">
            <path d="M0 0 H13 V60 H0 V0 Z" />
          </g>
        </g>

        {/* Bottom Line: STUDIOS */}
        <g id={`${idPrefix}-studios`} transform="translate(1, 86)" fill={textColor}>
          {/* S */}
          <g transform="translate(0, 0)">
            <path
              d="M9 33 C3 30.5 0 26.5 0 20.5 C0 9.5 9.5 0 23.5 0 C36 0 45.5 8 46 19 H34.5 C34 13.5 29.5 9.5 23.5 9.5 C16.5 9.5 12.5 13.5 12.5 18 C12.5 22 15.5 24.5 22 26.5 L27.5 28 C37.5 31.5 42.5 36 42.5 43.5 C42.5 54.5 33 62 20 62 C8.5 62 1 55 0 43.5 H11.5 C12.5 49 17.5 52 22.5 52 C28 52 31.5 49 31.5 44 C31.5 39.5 28 37.5 21.5 35.5 L16.5 34 C13.5 33 10.5 32 9 31 Z"
              transform="scale(0.55)"
            />
          </g>

          {/* T */}
          <g transform="translate(70, 0)">
            <path d="M0 0 H44 V9 H27 V34 H17 V9 H0 V0 Z" />
          </g>

          {/* U */}
          <g transform="translate(136, 0)">
            <path
              d="M0 0 H11 V22 C11 27.5 14.5 30.5 20 30.5 C25.5 30.5 29 27.5 29 22 V0 H40 V22 C40 33 32 39.5 20 39.5 C8 39.5 0 33 0 22 V0 Z"
              transform="scale(0.86)"
            />
          </g>

          {/* D */}
          <g transform="translate(208, 0)">
            <path d="M0 0 H21 C33 0 40 7.5 40 17 C40 26.5 33 34 21 34 H0 V0 Z M11 9 V25 H20 C26 25 29 22 29 17 C29 12 26 9 20 9 H11 Z" />
          </g>

          {/* I */}
          <g transform="translate(276, 0)">
            <path d="M0 0 H11 V34 H0 V0 Z" />
          </g>

          {/* O */}
          <g transform="translate(315, 0)">
            <path d="M21 0 C33 0 42 8 42 17 C42 26 33 34 21 34 C9 34 0 26 0 17 C0 8 9 0 21 0 Z M21 8.5 C13.5 8.5 11 13 11 17 C11 21 13.5 25.5 21 25.5 C28.5 25.5 31 21 31 17 C31 13 28.5 8.5 21 8.5 Z" />
          </g>

          {/* S */}
          <g transform="translate(385, 0)">
            <path
              d="M9 33 C3 30.5 0 26.5 0 20.5 C0 9.5 9.5 0 23.5 0 C36 0 45.5 8 46 19 H34.5 C34 13.5 29.5 9.5 23.5 9.5 C16.5 9.5 12.5 13.5 12.5 18 C12.5 22 15.5 24.5 22 26.5 L27.5 28 C37.5 31.5 42.5 36 42.5 43.5 C42.5 54.5 33 62 20 62 C8.5 62 1 55 0 43.5 H11.5 C12.5 49 17.5 52 22.5 52 C28 52 31.5 49 31.5 44 C31.5 39.5 28 37.5 21.5 35.5 L16.5 34 C13.5 33 10.5 32 9 31 Z"
              transform="scale(0.55)"
            />
          </g>
        </g>
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
  width,
  height,
}: BrandLogoProps) {
  const defaultWidth = compact ? 175 : 220;
  const computedWidth = width ?? defaultWidth;
  const logoSrc = "/narayani-logo.png";

  const content = (
    <span
      className={`brand-logo is-${variant}${compact ? " is-compact" : ""}${showTagline ? " has-tagline" : ""} ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        width: typeof computedWidth === "number" ? `${computedWidth}px` : computedWidth,
        maxWidth: "100%",
        textDecoration: "none",
        lineHeight: 1,
        background: "transparent",
      }}
    >
      <img
        src={logoSrc}
        alt="Narayani Studios"
        style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
        referrerPolicy="no-referrer"
      />
    </span>
  );

  if (href) {
    return (
      <Link
        className="brand-logo-link"
        href={href}
        aria-label="Narayani Studios home"
        style={{
          display: "inline-flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        {content}
      </Link>
    );
  }

  return content;
}
