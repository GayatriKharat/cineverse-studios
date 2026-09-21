import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatedStats } from "@/components/animated-stats";
import { ContactForm } from "@/components/contact-form";
import { Hero } from "@/components/hero";
import { MediaReveal, Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { TalkChannels } from "@/components/talk-channels";
import { asset, cssUrl } from "@/lib/asset";
import { clientLogos, services } from "@/lib/site-data";

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="studio-reel wrap is-soft-hidden" hidden aria-hidden="true" style={{ paddingTop: "48px", paddingBottom: "48px" }}>
        <Reveal>
          <h2>Meet the <em>studio</em><span className="title-stop">.</span></h2>
        </Reveal>
        <MediaReveal>
          <Link href="/about" className="home-reel" style={{ backgroundImage: cssUrl("/Updated Images/portfolio.png") }}>
            <span className="home-reel-play">
              <i aria-hidden="true">▶</i>
              <span>Studio intro reel, 01:24</span>
            </span>
          </Link>
        </MediaReveal>
      </section>

      <section className="wrap service-pillars" style={{ paddingTop: "48px", paddingBottom: "56px" }}>
        <Reveal>
          <h2>Our <em>services</em><span className="title-stop">.</span></h2>
          <p className="section-lede" style={{ marginBottom: "40px" }}>
            Six divisions, from the first plan to the last impression. See what’s inside each one.
          </p>
        </Reveal>

        <Stagger className="pillar-cards client-service-grid">
          {services.map((service, index) => {
            const isWhite = index % 2 === 0;
            return (
              <StaggerItem key={service.slug}>
                <Link
                  className={`service-architecture-card service-card-link ${isWhite ? "card-theme-white" : "card-theme-blue"}`}
                  href={`/services/${service.slug}`}
                >
                  <div className="service-card-face">
                    <div className="service-card-media-wrap">
                      <img
                        src={asset(service.image)}
                        alt={service.title}
                        className="service-card-image"
                      />
                    </div>
                    <div className="service-card-body">
                      <h3>{service.title}</h3>
                      <p>{service.strap}</p>
                    </div>
                    {isWhite && <span className="service-card-yellow-slash" aria-hidden="true" />}
                    <span className="service-card-arrow-action" aria-hidden="true">
                      <ArrowUpRight className="service-card-arrow-icon" size={34} strokeWidth={2.4} />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <Link className="button" href="/services">
            See all services ↗
          </Link>
        </div>
      </section>

      <section className="client-marquees" aria-label="Who we have worked with">
        <div className="wrap client-marquees-header">
          <Reveal>
            <h2>Who we have <em>worked with</em><span className="title-stop">.</span></h2>
          </Reveal>
        </div>
        {[clientLogos, [...clientLogos].reverse()].map((row, rowIndex) => (
          <div className={`client-strip${rowIndex ? " is-reverse" : ""}`} key={rowIndex}>
            <div>
              {[...row, ...row].map((client, index) => (
                <span className="client-logo-item" key={`${client.name}-${index}`}>
                  <img
                    src={asset(client.logo)}
                    alt={client.name}
                    className="client-logo-img"
                    loading="lazy"
                  />
                  <b>{client.name}</b>
                  <i aria-hidden="true">·</i>
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="home-voices wrap" style={{ paddingTop: "56px", paddingBottom: "56px" }} aria-label="Founding collaborations">
        <Reveal>
          <article className="founding-note">
            <p className="founding-note-kicker">Founding collaborations</p>
            <h2>Be one of our first <em>collaborations</em><span className="title-stop">.</span></h2>
            <p>
              We&apos;re opening the slate with partners who value genuine craft. First reviews land here until then, this is an invitation to build with us from the ground up.
            </p>
            <Link className="button founding-note-cta" href="/contact">
              Start a project ↗
            </Link>
          </article>
        </Reveal>
      </section>

      <AnimatedStats
        stats={[
          { value: 52, suffix: "+", label: "Happy clients across the globe" },
          { value: 4.2, suffix: "B+", label: "Views generated across platforms", decimals: 1 },
          { value: 1200, suffix: "+", label: "Content pieces created for clients" },
          { value: 6400, suffix: "+", label: "Content pieces distributed" },
        ]}
      />

      <section className="who-we-are wrap" aria-label="Who we are" style={{ paddingTop: "56px", paddingBottom: "56px" }}>
        <div className="who-we-are-grid">
          <Reveal>
            <h2>A creative ecosystem, built for <em>all your needs</em><span className="title-stop">.</span></h2>
          </Reveal>
          <Reveal delay={0.08} className="who-we-are-copy">
            <p className="who-we-are-lede">
              Narayani Studios was founded on the belief that great stories deserve careful craft, from the first idea to the final frame.
            </p>
            <div className="who-we-are-detail">
              <span />
              <p>
                Narayani Studios delivers branding, marketing and end to end production across digital, film and advertising media.
              </p>
            </div>
            <div className="who-we-are-detail">
              <span />
              <p>We work with businesses, creators and organisations across markets worldwide.</p>
            </div>
            <Link className="text-link" href="/about" style={{ marginTop: "16px", display: "inline-block" }}>
              More about the studio ↗
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="home-contact wrap talk-stage" aria-label="Start a project">
        <div className="talk-copy">
          <Reveal>
            <h2>
              Let&apos;s <em>talk</em><span className="title-stop">.</span>
            </h2>
            <p className="section-lede">
              One service or the full chain, send the brief and we&apos;ll name the stage, the team, and the next move.
            </p>
            <TalkChannels />
          </Reveal>
        </div>
        <Suspense fallback={<div className="contact-form talk-form" />}>
          <ContactForm />
        </Suspense>
      </section>
    </main>
  );
}
