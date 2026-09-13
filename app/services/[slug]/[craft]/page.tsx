import { notFound } from "next/navigation";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/page-hero";
import { cssUrl } from "@/lib/asset";
import { craftsByService, findCraft } from "@/lib/offerings";

export function generateStaticParams() {
  const params: { slug: string; craft: string }[] = [];
  for (const [serviceSlug, crafts] of Object.entries(craftsByService)) {
    for (const craft of crafts) {
      params.push({ slug: serviceSlug, craft: craft.slug });
    }
  }
  return params;
}


export default async function CraftPage({ params }: { params: Promise<{ slug: string; craft: string }> }) {
  const { slug, craft: craftSlug } = await params;
  const craft = findCraft(slug, craftSlug);
  if (!craft) notFound();

  return (
    <main>
      <PageHero eyebrow={craft.title} title={craft.title} copy={craft.strap} image={craft.image} />
      <section className="intro wrap">
        <div>
          <h2>{craft.problem || craft.strap}</h2>
        </div>
        <div>
          <p className="lede">{craft.description || craft.solution}</p>
          {craft.forWho && (
            <p className="lede" style={{ marginTop: "16px" }}>
              <b>Who it is for.</b> {craft.forWho}
            </p>
          )}
        </div>
      </section>
      {((craft.deliverables && craft.deliverables.length > 0) || (craft.steps && craft.steps.length > 0)) && (
        <section className="detail-grid wrap">
          {craft.deliverables && craft.deliverables.length > 0 && (
            <article>
              <h3>You leave with</h3>
              <ul>
                {craft.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          )}
          {craft.steps && craft.steps.length > 0 && (
            <article>
              <h3>How it runs</h3>
              <ol>
                {craft.steps.map((item, i) => (
                  <li key={item}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </article>
          )}
        </section>
      )}
      <section className="frame-row wrap">
        {[craft.image, "/film-virtual.png", "/service-photography.png"].map((image, i) => (
          <div key={image + i} style={{ backgroundImage: cssUrl(image) }} />
        ))}
      </section>
      <section className="service-actions wrap">
        <Link className="button" href={`/contact?service=${encodeURIComponent(slug)}&subservice=${encodeURIComponent(craft.title)}`}>
          Enquire about {craft.title} ↗
        </Link>
        <Link className="text-link" href={`/services/${slug}`}>
          All services in this division ↗
        </Link>
      </section>
      <CtaBand
        title={<>Start your project with <em>Narayani Studios.</em></>}
        subheading="Tell us the brief. We will name the stage."
        buttonText="Contact Us ↗"
        buttonHref="/contact"
      />
    </main>
  );
}
