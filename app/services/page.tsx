import Link from "next/link";
import { FlipCard } from "@/components/flip-card";
import { CtaBand, PageHero } from "@/components/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { cssUrl } from "@/lib/asset";
import { craftHref, craftsByService } from "@/lib/offerings";
import { services } from "@/lib/site-data";

export default function Services() {
  return (
    <main>
      <PageHero eyebrow="Services" title={<>Six divisions. <em>One floor.</em></>} copy="From the first idea to the final delivery, every craft lives in one connected production house. Open a division to find the right route for your brief." image="/client/frame-02.jpg" />
      <section id="explore" className="wrap service-pillars">
        <Reveal><p className="eyebrow">01 / The craft</p><h2>Pick a division. <em>Make it move.</em></h2></Reveal>
        <Stagger className="pillar-cards client-service-grid">
          {services.map((service) => {
            const crafts = craftsByService[service.slug] ?? [];
            return <StaggerItem key={service.slug}><FlipCard className="service-architecture-card"
              front={<div className="service-card-face" style={{ backgroundImage: cssUrl(service.image) }}><span>{service.code}</span><h3>{service.title}</h3><p>{service.strap}</p></div>}
              back={<div className="service-card-face service-card-back"><span>{service.code}</span><h3>{service.title}</h3><p>{service.summary}</p><div className="service-card-links">{crafts.slice(0, 3).map((craft) => <Link key={craft.slug} href={craftHref(service.slug, craft.slug)}>{craft.title}</Link>)}<Link className="text-link" href={`/services/${service.slug}`}>Open division ↗</Link></div></div>}
            /></StaggerItem>;
          })}
        </Stagger>
      </section>
      <CtaBand />
    </main>
  );
}
