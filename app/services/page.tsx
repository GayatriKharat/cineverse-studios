import Link from "next/link";
import { CtaBand, PageHero } from "@/components/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { cssUrl } from "@/lib/asset";
import { craftHref, craftsByService } from "@/lib/offerings";
import { pillars, services } from "@/lib/site-data";

const extras = services.filter((s) => !pillars.some((p) => p.slug === s.slug));

export default function Services() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title={<>Pre. Production. <em>Post.</em></>}
        copy="Three main stages. Open a stage for the full story — or a listed craft for the exact solution."
        image="/film-automotive.png"
      />
      <section className="wrap service-pillars">
        <Reveal>
          <p className="eyebrow">Main services</p>
          <h2>The spine of every brief</h2>
        </Reveal>
        <Stagger className="pillar-cards">
          {pillars.map((pillar) => {
            const crafts = craftsByService[pillar.slug] ?? [];
            return (
              <StaggerItem key={pillar.slug}>
                <article className="pillar-card">
                  <Link href={`/services/${pillar.slug}`} className="pillar-card-hit">
                    <div className="pillar-card-media" style={{ backgroundImage: cssUrl(pillar.image) }} />
                    <span>{pillar.code}</span>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.summary}</p>
                  </Link>
                  <ul>
                    {crafts.map((craft) => (
                      <li key={craft.slug}>
                        <Link href={craftHref(pillar.slug, craft.slug)}>{craft.title}</Link>
                      </li>
                    ))}
                  </ul>
                  <Link className="text-link" href={`/services/${pillar.slug}`}>Open {pillar.title} ↗</Link>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>
      <section className="home-services wrap">
        <Reveal>
          <p className="eyebrow">Extended services</p>
          <h2>Where the work <em>travels next.</em></h2>
        </Reveal>
        <Stagger className="pillar-cards">
          {extras.map((service) => (
            <StaggerItem key={service.slug}>
              <article className="pillar-card">
                <Link href={`/services/${service.slug}`} className="pillar-card-hit">
                  <div className="pillar-card-media" style={{ backgroundImage: cssUrl(service.image) }} />
                  <span>{service.code}</span>
                  <h3>{service.title}</h3>
                  <p>{service.strap}</p>
                </Link>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link className="text-link" href={`/services/${service.slug}`}>Open {service.title} ↗</Link>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <CtaBand />
    </main>
  );
}
