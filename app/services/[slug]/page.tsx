import { notFound } from "next/navigation";
import Link from "next/link";
import { CraftTabs } from "@/components/craft-tabs";
import { FlipCard } from "@/components/flip-card";
import { CtaBand, PageHero } from "@/components/page-hero";
import { Stagger, StaggerItem } from "@/components/reveal";
import { cssUrl } from "@/lib/asset";
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
        <PageHero eyebrow="02 · Main service" title="Production" copy="Every format. One production floor. Choose the craft you need — video, film, ads, stills, podcasts or music." image="/film-automotive.png" />
        <section className="wrap quick-need">
          <p className="eyebrow">Pick a craft</p>
          <h2>What do you need <em>made?</em></h2>
          <Stagger className="craft-grid">
            {productionCrafts.map((craft) => (
              <StaggerItem key={craft.slug}>
                <FlipCard
                  className="craft-flip"
                  href={`/services/production/${craft.slug}`}
                  front={
                    <>
                      <div className="pillar-card-media" style={{ backgroundImage: cssUrl(craft.image) }} />
                      <h3>{craft.title}</h3>
                      <p>{craft.strap}</p>
                      <b>Open {craft.title}</b>
                    </>
                  }
                  back={
                    <div className="pillar-back">
                      <h3>{craft.title}</h3>
                      <p>{craft.solution}</p>
                      <Link className="text-link" href={`/services/production/${craft.slug}`}>Open craft ↗</Link>
                    </div>
                  }
                />
              </StaggerItem>
            ))}
          </Stagger>
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
        <p className="lede">Select a tab to see exactly what we provide, who it is for, and what you leave with. Hire one craft or combine them into a single brief.</p>
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
