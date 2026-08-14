import { notFound } from "next/navigation";
import Link from "next/link";
import { CraftTabs } from "@/components/craft-tabs";
import { CtaBand, PageHero } from "@/components/page-hero";
import { craftsByService, productionCrafts } from "@/lib/offerings";
import { pillars, services } from "@/lib/site-data";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const crafts = craftsByService[slug];
  const isMain = pillars.some((p) => p.slug === service.slug);

  if (slug === "production") {
    return (
      <main>
        <PageHero
          eyebrow="02 · Main service"
          title="Production"
          copy="Every format. One production floor. Open a craft for the problem, the solution, what you leave with, and how it runs."
          image="/film-automotive.png"
        />
        <section className="wrap quick-need">
          <p className="eyebrow">Pick a craft</p>
          <h2>What do you need <em>made?</em></h2>
          <CraftTabs crafts={productionCrafts} serviceSlug="production" />
        </section>
        <CtaBand />
      </main>
    );
  }

  return (
    <main>
      <PageHero
        eyebrow={`${service.code} · ${isMain ? "Main service" : "Extended service"}`}
        title={service.title}
        copy={service.strap}
        image={service.image}
      />
      <section className="intro wrap">
        <div>
          <p className="eyebrow">The solution</p>
          <h2>{service.summary}</h2>
        </div>
        <p className="lede">
          {crafts
            ? "Open a bar for each listed craft: who it is for, the problem, the solution, what you leave with, and how it runs."
            : "Hire this division as a single brief, or fold it into pre, production and post."}
        </p>
      </section>
      {crafts ? (
        <section className="wrap">
          <CraftTabs crafts={crafts} serviceSlug={slug} />
        </section>
      ) : (
        <section className="wrap">
          <ul className="sub-list">
            {service.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      )}
      <section className="service-actions wrap">
        <Link className="button" href={`/contact?service=${service.slug}`}>Enquire about {service.title}</Link>
        <Link className="text-link" href="/services">All services ↗</Link>
      </section>
      <CtaBand />
    </main>
  );
}
