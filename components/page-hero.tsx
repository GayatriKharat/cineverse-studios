import Link from "next/link";
import { MediaReveal, Reveal } from "@/components/reveal";

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
  image?: string;
}) {
  return (
    <section className="page-hero">
      {image && (
        <MediaReveal className="page-hero-media">
          <div style={{ backgroundImage: `url(${image})` }} />
        </MediaReveal>
      )}
      <div className="wrap page-hero-copy">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {copy && <p className="lede">{copy}</p>}
        </Reveal>
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
        <Link className="button" href="/contact">Enquire <span>↗</span></Link>
      </Reveal>
    </section>
  );
}
