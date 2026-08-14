import { notFound } from "next/navigation";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/page-hero";
import { cssUrl } from "@/lib/asset";
import { findCraft, productionCrafts } from "@/lib/offerings";

export function generateStaticParams() {
  return productionCrafts.map((craft) => ({ slug: "production", craft: craft.slug }));
}

export const dynamicParams = false;

export default async function CraftPage({ params }: { params: Promise<{ slug: string; craft: string }> }) {
  const { slug, craft: craftSlug } = await params;
  const craft = findCraft(slug, craftSlug);
  if (!craft) notFound();

  return (
    <main>
      <PageHero eyebrow={`Production · ${craft.title}`} title={craft.title} copy={craft.strap} image={craft.image} />
      <section className="intro wrap">
        <div>
          <p className="eyebrow">The problem</p>
          <h2>{craft.problem}</h2>
        </div>
        <div>
          <p className="eyebrow">How we solve it</p>
          <p className="lede">{craft.solution}</p>
          <p className="lede"><b>Who it is for.</b> {craft.forWho}</p>
        </div>
      </section>
      <section className="detail-grid wrap">
        <article>
          <p className="eyebrow">You leave with</p>
          <ul>{craft.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <p className="eyebrow">How it runs</p>
          <ol>{craft.steps.map((item, i) => <li key={item}><span>{String(i + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
        </article>
      </section>
      <section className="frame-row wrap">
        {[craft.image, "/film-virtual.png", "/service-photography.png"].map((image, i) => (
          <div key={image + i} style={{ backgroundImage: cssUrl(image) }} />
        ))}
      </section>
      <section className="service-actions wrap">
        <Link className="button" href={`/contact?service=production`}>Enquire about {craft.title}</Link>
        <Link className="text-link" href="/services/production">All production crafts ↗</Link>
      </section>
      <CtaBand />
    </main>
  );
}
