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
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="narayani-blue" x1="10" y1="8" x2="79" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2337C6" />
          <stop offset="1" stopColor="#2337C6" />
        </linearGradient>
      </defs>
      <path fill="url(#narayani-blue)" d="M17 8h12c6 0 10 2 14 7l25 31V17c0-5 3-9 9-9h3c5 0 8 4 8 9v56c0 5-3 8-8 8H76c-6 0-10-2-14-7L36 45v28c0 5-3 8-8 8H17c-5 0-9-3-9-8V17c0-5 4-9 9-9Z" />
      <g fill="#fff">
        <rect x="15" y="17" width="12" height="10" rx="2" />
        <rect x="15" y="31" width="12" height="10" rx="2" />
        <rect x="15" y="45" width="12" height="10" rx="2" />
        <rect x="15" y="59" width="12" height="10" rx="2" />
      </g>
      <circle cx="76" cy="18" r="6" fill="#2337C6" />
    </svg>
  );
}
