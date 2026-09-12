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
  title = <>Have a story worth <em>framing?</em></>,
  buttonText = "Enquire ↗",
  buttonHref = "/contact",
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  buttonText?: string;
  buttonHref?: string;
}) {
  return (
    <section className="cta-band wrap">
      <Reveal>
        <h2>{title}</h2>
        <Magnetic>
          <Link className="button" href={buttonHref}>{buttonText}</Link>
        </Magnetic>
      </Reveal>
    </section>
  );
}
