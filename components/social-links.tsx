const socials = [
  ["Instagram", "https://instagram.com/"],
  ["LinkedIn", "https://linkedin.com/"],
  ["YouTube", "https://youtube.com/"],
] as const;

export function SocialLinks() {
  return <div className="social-links" aria-label="Social links">{socials.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer"><span aria-hidden="true">{label === "Instagram" ? "◎" : label === "LinkedIn" ? "in" : "▶"}</span>{label} ↗</a>)}</div>;
}
