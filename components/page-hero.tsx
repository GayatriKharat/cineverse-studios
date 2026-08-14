import Link from "next/link";
import { Magnetic } from "@/components/magnetic";
import { Reveal } from "@/components/reveal";
import { cssUrl } from "@/lib/asset";

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  compact = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
  image?: string;
  compact?: boolean;
}) {
  return (
    <section className={`page-hero${compact ? " is-compact" : ""}`}>
      {image && (
        <div className="page-hero-media">
          <div style={{ backgroundImage: cssUrl(image) }} />
        </div>
      )}
      <div className="wrap page-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {copy && <p className="lede">{copy}</p>}
      </div>
    </section>
  );
}

export function CtaBand({
  eyebrow = "Begin",
  title = <>Bring the next <em>chapter.</em></>,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
}) {
  return (
    <section className="cta-band wrap">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <Magnetic>
          <Link className="button" href="/contact">Enquire <span>↗</span></Link>
        </Magnetic>
      </Reveal>
    </section>
  );
}
