type BrandMarkProps = {
  className?: string;
  size?: number;
};

/** Official Narayani film-strip N from the brand guide. */
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
      <path fill="#6E3FC7" fillRule="evenodd" clipRule="evenodd" d="M4 6h13v76H4V6Zm71 0h13v76H75V6ZM18 12h12v64H18V12Zm42 0h12v64H60V12ZM6 14h7v6H6v-6Zm69 0h7v6h-7v-6ZM6 28h7v6H6v-6Zm69 0h7v6h-7v-6ZM6 42h7v6H6v-6Zm69 0h7v6h-7v-6ZM6 56h7v6H6v-6Zm69 0h7v6h-7v-6ZM6 70h7v6H6v-6Zm69 0h7v6h-7v-6Z" />
      <path fill="#6E3FC7" d="M30 12h11v64H30V12Zm11 0c8 0 14 8 18 18 4 10 6 22 8 34h-11c-2-10-4-18-7-24-3-7-6-10-8-10v-18Z" />
      <path fill="#6E3FC7" d="M41 44c4 8 8 16 12 24 4 8 8 14 12 18h-11c-3-4-6-10-9-17-3-7-5-14-7-20h3Z" />
    </svg>
  );
}
