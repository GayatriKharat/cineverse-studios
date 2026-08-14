import Link from "next/link";
import { FlipCard } from "@/components/flip-card";
import { CtaBand, PageHero } from "@/components/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { craftsByService } from "@/lib/offerings";
import { pillars, services } from "@/lib/site-data";

const extras = services.filter((s) => !pillars.some((p) => p.slug === s.slug));

export default function Services() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title={<>Pre. Production. <em>Post.</em></>}
        copy="Three main stages. Flip a card for the crafts — or open a stage for the full story."
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
                <FlipCard
                  className="pillar-flip"
                  front={
                    <>
                      <div className="pillar-card-media" style={{ backgroundImage: `url(${pillar.image})` }} />
                      <span>{pillar.code}</span>
                      <h3>{pillar.title}</h3>
                      <p>{pillar.summary}</p>
                      <b>Hover to flip</b>
                    </>
                  }
                  back={
                    <div className="pillar-back">
                      <span>{pillar.code}</span>
                      <h3>{pillar.title}</h3>
                      <ul>
                        {crafts.map((craft) => (
                          <li key={craft.slug}>
                            <Link href={pillar.slug === "production" ? `/services/production/${craft.slug}` : `/services/${pillar.slug}#${craft.slug}`}>
                              {craft.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link className="text-link" href={`/services/${pillar.slug}`}>View {pillar.title} ↗</Link>
                    </div>
                  }
                />
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
        <Stagger className="flip-grid three">
          {extras.map((service) => (
            <StaggerItem key={service.slug}>
              <FlipCard
                className="service-flip"
                front={
                  <>
                    <div className="pillar-card-media" style={{ backgroundImage: `url(${service.image})` }} />
                    <span>{service.code}</span>
                    <h3>{service.title}</h3>
                    <p>{service.strap}</p>
                  </>
                }
                back={
                  <div className="pillar-back">
                    <span>{service.code}</span>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                    <Link className="text-link" href={`/services/${service.slug}`}>Open ↗</Link>
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
