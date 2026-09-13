import Link from "next/link";
import { Magnetic } from "@/components/magnetic";
import { Reveal } from "@/components/reveal";
import { cssUrl } from "@/lib/asset";

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  imagePosition = "center 18%",
  compact = false,
  actions,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  copy?: string;
  image?: string;
  imagePosition?: string;
  compact?: boolean;
  actions?: React.ReactNode;
}) {
  return (
    <section data-rv className={`page-hero${compact ? " is-compact" : ""}${image ? " has-media" : ""}`}>
      {image && (
        <div className="page-hero-media">
          <div style={{ backgroundImage: cssUrl(image), backgroundPosition: imagePosition }} />
        </div>
      )}
      <div className="wrap page-hero-copy">
        <h1>{title}</h1>
        {copy && <p className="lede">{copy}</p>}
        {actions}
      </div>
    </section>
  );
}

export function CtaBand({
  eyebrow,
  title = <>Start your project with <em>Narayani Studios.</em></>,
  subheading = "Tell us the brief. We will name the stage.",
  buttonText = "Contact Us ↗",
  buttonHref = "/contact",
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  subheading?: string;
  buttonText?: string;
  buttonHref?: string;
}) {
  return (
    <section className="cta-band wrap">
      <Reveal>
        {eyebrow && <span className="kicker">{eyebrow}</span>}
        <h2>{title}</h2>
        {subheading && <p className="section-lede" style={{ margin: "12px 0 28px", color: "var(--text-dim, #71717A)" }}>{subheading}</p>}
        <Magnetic>
          <Link className="button" href={buttonHref}>{buttonText}</Link>
        </Magnetic>
      </Reveal>
    </section>
  );
}
