import React from "react";

type BrandMarkProps = {
  className?: string;
  size?: number;
};

export function BrandMark({ className, size = 48 }: BrandMarkProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 154 168"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="markDiagGrad_comp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#214ED6" />
          <stop offset="100%" stopColor="#2455E4" />
        </linearGradient>
        <linearGradient id="markShadowFold_comp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#122F88" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#1639A4" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {/* Left Pillar (Rounded top-left and bottom-left) */}
      <path d="M12 0 H40 V168 H12 C5.37 168 0 162.63 0 156 V12 C0 5.37 5.37 0 12 0 Z" fill="#1F4FD8" />
      {/* 5 Film Perforation Sprocket Holes */}
      <rect x="11" y="14" width="18" height="15" rx="3" fill="#FFFFFF" />
      <rect x="11" y="46" width="18" height="15" rx="3" fill="#FFFFFF" />
      <rect x="11" y="78" width="18" height="15" rx="3" fill="#FFFFFF" />
      <rect x="11" y="110" width="18" height="15" rx="3" fill="#FFFFFF" />
      <rect x="11" y="142" width="18" height="15" rx="3" fill="#FFFFFF" />
      {/* Right Pillar (Rounded top-right and bottom-right) */}
      <path d="M114 0 H142 C148.63 0 154 5.37 154 12 V156 C154 162.63 148.63 168 142 168 H114 V0 Z" fill="#1F4FD8" />
      {/* Signature Amber-Gold Dot at top-right */}
      <circle cx="134" cy="24" r="8.5" fill="#F5B400" />
      {/* Fold shadow where diagonal crosses over left pillar */}
      <path d="M40 0 L40 68 L11 114 L11 44 Z" fill="url(#markShadowFold_comp)" />
      {/* Diagonal Stroke of N */}
      <path d="M40 0 L154 124 V168 L114 168 L0 44 V0 H40 Z" fill="url(#markDiagGrad_comp)" />
    </svg>
  );
}
