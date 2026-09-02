import Link from "next/link";
import { CtaBand, PageHero } from "@/components/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { asset, cssUrl } from "@/lib/asset";
import { craftHref, craftsByService } from "@/lib/offerings";
import { services } from "@/lib/site-data";

export default function Services() {
  return (
    <main>
      <PageHero eyebrow="Services" title={<>Six divisions. <em>One floor.</em></>} copy="From the first idea to the final delivery, every craft lives in one connected production house. Open a division to find the right route for your brief." image="/all-services-hero.png" />
      <section id="explore" className="wrap service-pillars">
        <Reveal><p className="eyebrow">01 / The craft</p><h2>Pick a division. <em>Make it move.</em></h2></Reveal>
        <Stagger className="pillar-cards client-service-grid">
          {services.map((service) => {
            const crafts = craftsByService[service.slug] ?? [];
            return <StaggerItem key={service.slug}>
              <article className="service-directory-card">
                <Link className="service-directory-media" href={`/services/${service.slug}`} aria-label={`Open ${service.title}`}>
                  <img src={asset(service.image)} alt="" />
                  <span>{service.code}</span>
                </Link>
                <div className="service-directory-copy">
                  <h3>{service.title}</h3>
                  <p>{service.strap}</p>
                  <div className="service-directory-options">
                    {service.items.map((item) => {
                      const craft = crafts.find((candidate) => candidate.title === item);
                      const href = craft ? craftHref(service.slug, craft.slug) : `/services/${service.slug}`;
                      return <Link key={item} href={href}>{item}</Link>;
                    })}
                  </div>
                  <div className="service-directory-footer">
                    <Link href={`/services/${service.slug}`}>Open ↗</Link>
                    <Link className="muted-link" href="/portfolio">See our work</Link>
                  </div>
                </div>
              </article>
            </StaggerItem>;
          })}
        </Stagger>
      </section>
      <CtaBand />
    </main>
  );
}
