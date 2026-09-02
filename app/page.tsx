import Link from "next/link";
import { Suspense } from "react";
import { BrandMark } from "@/components/brand-mark";
import { AnimatedStats } from "@/components/animated-stats";
import { ContactForm } from "@/components/contact-form";
import { FlipCard } from "@/components/flip-card";
import { Hero } from "@/components/hero";
import { MediaReveal, Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { cssUrl } from "@/lib/asset";
import { craftHref, craftsByService } from "@/lib/offerings";
import { clients, services, testimonials } from "@/lib/site-data";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="studio-reel wrap">
        <Reveal><p className="eyebrow">01 / Our studio</p><h2>Where every frame <em>finds its floor.</em></h2></Reveal>
        <MediaReveal><Link href="/about" className="home-reel" style={{ backgroundImage: cssUrl("/client/reel-still.jpg") }}><span>Enter the studio ↗</span></Link></MediaReveal>
      </section>
      <section className="wrap service-pillars">
        <Reveal>
          <p className="eyebrow">Main services</p>
          <h2>Our <em>services.</em></h2>
          <p className="section-lede">Available individually or combined into a full production.</p>
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
      <section className="client-marquees" aria-label="Who we work with">
        {[clients, [...clients].reverse()].map((row, rowIndex) => <div className={`client-strip${rowIndex ? " is-reverse" : ""}`} key={rowIndex}><div>{[...row, ...row].map((client, i) => <span className="client-logo-item" key={`${client}-${i}`}><BrandMark size={24} /><b>{client}</b><i>—</i></span>)}</div></div>)}
      </section>
      <section className="home-voices wrap">
        <Reveal><p className="eyebrow">06 / The people we make with</p><h2>What clients <em>say.</em></h2></Reveal>
        <div className="testimonial-marquee">
          {[testimonials, [...testimonials].reverse()].map((row, rowIndex) => <div className="testimonial-track" key={rowIndex}>{[...row, ...row].map((item, index) => <article key={`${rowIndex}-${item.name}-${index}`}><span className="stars">★★★★★</span><blockquote>“{item.quote}”</blockquote><footer><b>{item.name}</b><small>{item.scope}</small></footer></article>)}</div>)}
        </div>
      </section>
      <AnimatedStats stats={[{ value: 52, suffix: "+", label: "Happy clients across the globe" }, { value: 4.2, suffix: "B+", label: "Views generated across platforms", decimals: 1 }, { value: 1200, suffix: "+", label: "Content pieces created for clients" }, { value: 6400, suffix: "+", label: "Content pieces distributed" }]} />
      <section className="intro wrap" aria-label="Studio introduction">
        <Reveal>
          <p className="eyebrow">05 / Narayani Studios LLP</p>
          <h2>A production house for brands, not a film studio <em>only.</em></h2>
        </Reveal>
        <Reveal delay={0.08} className="body-copy">
          <p>We plan, shoot and finish work for business, government, creators and entertainment. Hire one craft or the full chain. Film, ads, stills, podcasts, music and live all sit on the same floor.</p>
        </Reveal>
      </section>
      <section className="home-contact wrap" aria-label="Start a project">
        <div><Reveal><p className="eyebrow">07 / Get in touch</p><h2>Let&apos;s <em>talk.</em></h2><p className="section-lede">Tell us the brief—one service or the full chain. We will name the stage and come back with a plan.</p><p className="direct"><a href="mailto:business@narayanistudios.com">business@narayanistudios.com</a></p></Reveal></div>
        <Suspense fallback={<div className="contact-form" />}><ContactForm /></Suspense>
      </section>
    </main>
  );
}
