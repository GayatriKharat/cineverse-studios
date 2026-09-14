import Link from "next/link";
import { CtaBand, PageHero } from "@/components/page-hero";
import { WorkShowcase } from "@/components/work-showcase";

const PAGE_HIDDEN = true;

export default function OurWork() {
  if (PAGE_HIDDEN) {
    return (
      <main className="wrap" style={{ padding: "120px 20px 80px", textAlign: "center" }}>
        <h1>Portfolio</h1>
        <p className="lede">This page is temporarily hidden.</p>
        <Link className="button" href="/" style={{ marginTop: 24, display: "inline-flex" }}>Back home</Link>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        eyebrow="Portfolio"
        title={<>Selected <em>frames.</em></>}
        copy="A record of worlds made for brands, stages and screens, stills from the floor, not a stock gallery."
        image="/hero/main-photo-v2.jpg"
        actions={<div className="hero-actions"><Link className="button" href="/services">Browse by service <span>↓</span></Link><Link className="button-ghost" href="/contact">Start a brief</Link></div>}
      />
      <WorkShowcase />
      <CtaBand title={<>Have an idea worth <em>making?</em></>} />
    </main>
  );
}
