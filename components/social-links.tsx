"use client";

import { useId } from "react";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/narayanistudios",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/narayanistudios",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@NarayaniStudios8",
  },
] as const;

function InstagramIcon({ gradId }: { gradId: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={gradId} cx="0.3" cy="1.07" r="1.2">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="25%" stopColor="#fa7e1e" />
          <stop offset="50%" stopColor="#d62976" />
          <stop offset="75%" stopColor="#962fbf" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </radialGradient>
      </defs>
      <path
        fill={`url(#${gradId})`}
        d="M12 2.2c3.2 0 3.6.01 4.85.07 1.17.05 1.97.24 2.43.4.61.24 1.05.52 1.51.98.46.46.74.9.98 1.51.16.46.35 1.26.4 2.43.06 1.25.07 1.65.07 4.85s-.01 3.6-.07 4.85c-.05 1.17-.24 1.97-.4 2.43-.24.61-.52 1.05-.98 1.51-.46.46-.9.74-1.51.98-.46.16-1.26.35-2.43.4-1.25.06-1.65.07-4.85.07s-3.6-.01-4.85-.07c-1.17-.05-1.97-.24-2.43-.4-.61-.24-1.05-.52-1.51-.98-.46-.46-.74-.9-.98-1.51-.16-.46-.35-1.26-.4-2.43C2.21 15.6 2.2 15.2 2.2 12s.01-3.6.07-4.85c.05-1.17.24-1.97.4-2.43.24-.61.52-1.05.98-1.51.46-.46.9-.74 1.51-.98.46-.16 1.26-.35 2.43-.4C8.4 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52.01-4.76.07-.98.04-1.51.21-1.86.35-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.35-.3.88-.35 1.86-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.98.21 1.51.35 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.35.14.88.3 1.86.35 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.98-.04 1.51-.21 1.86-.35.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.35.3-.88.35-1.86.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.98-.21-1.51-.35-1.86-.18-.47-.4-.8-.75-1.15-.35-.35-.68-.57-1.15-.75-.35-.14-.88-.3-1.86-.35-1.24-.06-1.61-.07-4.76-.07zm0 3.05a4.95 4.95 0 1 1 0 9.9 4.95 4.95 0 0 1 0-9.9zm0 1.8a3.15 3.15 0 1 0 0 6.3 3.15 3.15 0 0 0 0-6.3zm6.4-2.05a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        fill="#0A66C2"
        d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2zM8.34 18.34H5.67V9.75h2.67v8.59zM7 8.57a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1zm11.34 9.77h-2.67v-4.18c0-1-.02-2.28-1.39-2.28-1.39 0-1.6 1.09-1.6 2.21v4.25h-2.67V9.75h2.56v1.17h.04c.36-.68 1.23-1.39 2.53-1.39 2.7 0 3.2 1.78 3.2 4.09v4.72z"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        fill="#FF0000"
        d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.56 31.56 0 0 0 0 12a31.56 31.56 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.56 31.56 0 0 0 24 12a31.56 31.56 0 0 0-.5-5.8z"
      />
      <path fill="#fff" d="M9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  );
}

function SocialIcon({ label, gradId }: { label: (typeof socials)[number]["label"]; gradId: string }) {
  if (label === "Instagram") return <InstagramIcon gradId={gradId} />;
  if (label === "LinkedIn") return <LinkedInIcon />;
  return <YouTubeIcon />;
}

export function SocialLinks() {
  const uid = useId().replace(/:/g, "");

  return (
    <div className="social-links" aria-label="Social links">
      {socials.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className={`social-link is-${label.toLowerCase()}`}
        >
          <span className="social-icon" aria-hidden="true">
            <SocialIcon label={label} gradId={`ig-${uid}`} />
          </span>
          <span className="social-label">{label}</span>
        </a>
      ))}
    </div>
  );
}
