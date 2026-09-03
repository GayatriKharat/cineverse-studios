type BrandLogoSvgProps = {
  variant?: "dark" | "light";
  showTagline?: boolean;
  className?: string;
};

function FilmMark() {
  return (
    <svg className="brand-mark-svg" viewBox="0 0 88 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        fill="#2337C6"
        fillRule="evenodd"
        d="M4 4h22v92H4V4Zm5 8h5.5v6.5H9V12Zm0 14h5.5v6.5H9V26Zm0 14h5.5v6.5H9V40Zm0 14h5.5v6.5H9V54Zm0 14h5.5v6.5H9V68Zm0 14h5.5v6.5H9V82Z"
      />
      <path
        fill="#2337C6"
        fillRule="evenodd"
        d="M62 4h22v92H62V4Zm11.5 8H79v6.5h-5.5V12Zm0 14H79v6.5h-5.5V26Zm0 14H79v6.5h-5.5V40Zm0 14H79v6.5h-5.5V54Zm0 14H79v6.5h-5.5V68Zm0 14H79v6.5h-5.5V82Z"
      />
      <path
        fill="#2337C6"
        d="M26 10c11 1 18 9 23 21 4.6 11.2 6.4 24.2 8.2 36.6 1.2 8.4 3.2 16 8.8 20.4h-11c-4.2-4.2-5.8-11.6-7-19.8-1.8-12.2-3.6-24.6-7.6-34.4C37.2 23.6 32.4 17 26 16V10Z"
      />
      <path
        fill="#2337C6"
        d="M26 10v14c8 .8 13.2 6.8 17 16 4 9.8 5.6 21.4 7.2 32.8 1.2 8.2 2.6 15.2 6.2 19.2h12.4c-5.8-5.4-7.6-14-9-23.4-1.8-13-3.8-26.2-8.4-37.4C47.2 19.6 38.6 11.4 26 10Z"
      />
    </svg>
  );
}

export function BrandLogoSvg({ variant = "dark", showTagline = true, className }: BrandLogoSvgProps) {
  const name = variant === "dark" ? "#FFFFFF" : "#14111F";
  const tag = variant === "dark" ? "rgba(255,255,255,0.9)" : "#6B6578";

  return (
    <span className={`brand-lockup ${className ?? ""}`} style={{ color: name }}>
      <FilmMark />
      <span className="brand-lockup-rule" aria-hidden="true" />
      <span className="brand-lockup-copy">
        <span className="brand-lockup-name">NARAYANI</span>
        <span className="brand-lockup-studios">
          <i />
          STUDIOS
          <i />
        </span>
        {showTagline ? (
          <span className="brand-lockup-tag" style={{ color: tag }}>
            WE CREATE. YOU REMEMBER.
          </span>
        ) : null}
      </span>
    </span>
  );
}
