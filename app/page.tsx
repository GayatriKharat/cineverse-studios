import Link from "next/link";
import { FlipCard } from "@/components/flip-card";
import { Hero } from "@/components/hero";
import { CtaBand } from "@/components/page-hero";
import { MediaReveal, Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { cssUrl } from "@/lib/asset";
import { craftHref, craftsByService } from "@/lib/offerings";
import { clients, navGuide, pillars, projects } from "@/lib/site-data";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="quick-bar wrap" aria-label="Quick start">
        <Link href="/services/pre-production">Need a plan? <b>Pre-production</b></Link>
        <Link href="/services/production">Need it made? <b>Production</b></Link>
        <Link href="/services/post-production">Need it finished? <b>Post-production</b></Link>
        <Link href="/contact">Have a brief? <b>Talk to us</b></Link>
      </section>
      <section className="guide wrap" aria-label="What you will find">
        {navGuide.map((item) => (
          <FlipCard
            key={item.href}
            href={item.href}
            className="guide-flip"
            front={
              <div className="guide-front">
                <span>{item.label}</span>
                <p>Explore →</p>
              </div>
            }
            back={
              <Link href={item.href} className="guide-back">
                <span>{item.label}</span>
                <p>{item.hint}</p>
                <b>Open ↗</b>
              </Link>
            }
          />
        ))}
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
      <section className="stats-band" aria-label="Studio at a glance">
        <div><b>12+</b><span>Production crafts</span></div>
        <div><b>3</b><span>Core stages</span></div>
        <div><b>India</b><span>Based, globally ready</span></div>
        <div><b>1</b><span>Integrated house</span></div>
      </section>
      <section className="client-strip" aria-label="Who we work with">
        <div>{[...clients, ...clients].map((client, i) => <span key={`${client}-${i}`}>{client}<i>—</i></span>)}</div>
      </section>
      <section className="wrap service-pillars">
        <Reveal>
          <p className="eyebrow">Main services</p>
          <h2>Three stages. Pick a craft.</h2>
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
      <CtaBand title={<>Tell us the brief. We will name the <em>stage.</em></>} />
    </main>
  );
}
