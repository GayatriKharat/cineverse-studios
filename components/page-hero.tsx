import Link from "next/link";
import { Magnetic } from "@/components/magnetic";
import { Reveal } from "@/components/reveal";
import { asset } from "@/lib/asset";

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  imagePosition = "center",
  compact = false,
  singleLineTitle = false,
  actions,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  copy?: string;
  image?: string;
  imagePosition?: string;
  compact?: boolean;
  singleLineTitle?: boolean;
  actions?: React.ReactNode;
}) {
  return (
    <section
      data-rv
      className={`page-hero${compact ? " is-compact" : ""}${image ? " has-media" : ""}${image?.includes("n-hero") ? " is-n-hero" : ""}${singleLineTitle ? " is-single-line" : ""}`}
    >
      {image && (
        <div className="page-hero-media">
          <img
            src={asset(image)}
            alt=""
            className="page-hero-cover-img"
            loading="eager"
            style={image?.includes("n-hero") ? undefined : { objectPosition: imagePosition }}
          />
          <div className="page-hero-shade" />
        </div>
      )}
      <div className="wrap page-hero-copy">
        {eyebrow && <span className="kicker eyebrow">{eyebrow}</span>}
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
    <section className="cta-band wrap talk-stage cta-band-panel">
      <Reveal>
        {eyebrow && <span className="kicker">{eyebrow}</span>}
        <h2>{title}</h2>
        {subheading && <p className="section-lede">{subheading}</p>}
        <Magnetic>
          <Link className="button" href={buttonHref}>{buttonText}</Link>
        </Magnetic>
      </Reveal>
    </section>
  );
}
