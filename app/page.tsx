import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { FlipCard } from "@/components/flip-card";
import { Hero } from "@/components/hero";
import { CtaBand } from "@/components/page-hero";
import { MediaReveal, Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { cssUrl } from "@/lib/asset";
import { craftHref, craftsByService } from "@/lib/offerings";
import { clients, projects, services, testimonials } from "@/lib/site-data";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="studio-reel wrap">
        <Reveal><p className="eyebrow">01 / Our studio</p><h2>Where every frame <em>finds its floor.</em></h2></Reveal>
        <MediaReveal><Link href="/about" className="home-reel" style={{ backgroundImage: cssUrl("/client/reel-still.jpg") }}><span>Enter the studio ↗</span></Link></MediaReveal>
      </section>
      <section className="intro wrap" aria-label="Studio introduction">
        <Reveal>
          <p className="eyebrow">Narayani Studios LLP</p>
          <h2>A production house for brands, not a film studio <em>only.</em></h2>
        </Reveal>
        <Reveal delay={0.08} className="body-copy">
          <p>We plan, shoot and finish work for business, government, creators and entertainment. Hire one craft or the full chain. Film, ads, stills, podcasts, music and live all sit on the same floor.</p>
        </Reveal>
      </section>
      <section className="wrap service-pillars">
        <Reveal>
          <p className="eyebrow">02 / The craft</p>
          <h2>Six divisions. <em>One floor.</em></h2>
        </Reveal>
        <Stagger className="pillar-cards client-service-grid">
          {services.map((service) => {
            const crafts = craftsByService[service.slug] ?? [];
            return (
              <StaggerItem key={service.slug}>
                <FlipCard className="service-architecture-card" href={`/services/${service.slug}`}
                  front={<div className="service-card-face" style={{ backgroundImage: cssUrl(service.image) }}><span>{service.code}</span><h3>{service.title}</h3><p>{service.strap}</p></div>}
                  back={<div className="service-card-face service-card-back"><span>{service.code}</span><h3>{service.title}</h3><p>{service.summary}</p><div className="service-card-links">{crafts.slice(0, 2).map((craft) => <Link key={craft.slug} href={craftHref(service.slug, craft.slug)}>{craft.title}</Link>)}<Link className="text-link" href={`/services/${service.slug}`}>Open division ↗</Link></div></div>}
                />
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>
      <section className="client-strip" aria-label="Who we work with">
        <div>{[...clients, ...clients].map((client, i) => <span className="client-logo-item" key={`${client}-${i}`}><BrandMark size={24} /><b>{client}</b><i>—</i></span>)}</div>
      </section>
      <section className="stats-band" aria-label="Studio at a glance">
        <div><b>12+</b><span>Production crafts</span></div><div><b>6</b><span>Connected divisions</span></div><div><b>India</b><span>Based, globally ready</span></div><div><b>1</b><span>Integrated house</span></div>
      </section>
      <section className="feature-work">
        <div className="wrap feature-head">
          <Reveal>
            <p className="eyebrow">Work</p>
            <h2>Selected <em>frames.</em></h2>
          </Reveal>
          <Link className="text-link" href="/portfolio">Full work ↗</Link>
        </div>
        <div className="feature-asymmetric wrap">
          {projects.map((project, i) => (
            <Link key={project.slug} href={`/services/${project.service}`} className={`feature-card n${i + 1}`}>
              <MediaReveal>
                <div className="feature-still" style={{ backgroundImage: cssUrl(project.image) }} />
              </MediaReveal>
              <span>{project.type}</span>
              <h3>{project.title}</h3>
            </Link>
          ))}
        </div>
      </section>
      <section className="home-voices wrap">
        <Reveal><p className="eyebrow">06 / The people we make with</p><h2>What clients <em>say.</em></h2></Reveal>
        <div className="testimonial-cards">{testimonials.map((item) => <article key={item.name}><span className="stars">★★★★★</span><blockquote>“{item.quote}”</blockquote><footer><b>{item.name}</b><small>{item.scope}</small></footer></article>)}</div>
      </section>
      <CtaBand title={<>Tell us the brief. We will name the <em>stage.</em></>} />
    </main>
  );
}
