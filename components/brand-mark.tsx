type BrandMarkProps = {
  className?: string;
  size?: number;
};

/** Circular Narayani N mark. */
export function BrandMark({ className, size = 48 }: BrandMarkProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nFadeMark" x1="34" y1="30" x2="98" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fff" />
          <stop offset=".62" stop-color="#fff" />
          <stop offset="1" stop-color="#fff" stop-opacity="0" />
        </linearGradient>
      </defs>
      <circle cx="64" cy="64" r="56" fill="#08090B" stroke="#E8E8EE" stroke-width="1.4" />
      <path fill="url(#nFadeMark)" d="M38 34h13v31L78 34h12v60H77V63L51 94H38V34Z" />
    </svg>
  );
}
