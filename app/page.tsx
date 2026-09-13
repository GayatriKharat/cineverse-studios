import Link from "next/link";
import { Suspense } from "react";
import { BrandMark } from "@/components/brand-mark";
import { AnimatedStats } from "@/components/animated-stats";
import { ContactForm } from "@/components/contact-form";
import { Hero } from "@/components/hero";
import { MediaReveal, Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SocialLinks } from "@/components/social-links";
import { asset, cssUrl } from "@/lib/asset";
import { clients, services, testimonials } from "@/lib/site-data";

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="studio-reel wrap" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        <Reveal>
          <h2>Meet the <em>studio.</em></h2>
        </Reveal>
        <MediaReveal>
          <Link href="/about" className="home-reel" style={{ backgroundImage: cssUrl("/Updated Images/portfolio.png") }}>
            <span>Studio intro reel, 01:24</span>
          </Link>
        </MediaReveal>
      </section>

      <section className="wrap service-pillars" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        <Reveal>
          <h2>Our <em>services.</em></h2>
          <p className="section-lede" style={{ marginBottom: "40px" }}>
            Six divisions, from the first plan to the last impression. See what’s inside each one.
          </p>
        </Reveal>

        <Stagger className="pillar-cards client-service-grid">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <Link className="service-architecture-card service-card-link" href={`/services/${service.slug}`}>
                <div className="service-card-face">
                  <span style={{ fontSize: "0.85rem", letterSpacing: "0.08em", color: "var(--text-dim, #71717A)", textTransform: "uppercase", fontWeight: 600 }}>
                    Division {service.code}
                  </span>
                  <img
                    src={asset(service.image)}
                    alt={service.title}
                    className="service-card-image"
                    style={{ marginTop: "12px", marginBottom: "16px" }}
                  />
                  <h3>{service.title}</h3>
                  <p style={{ marginTop: "8px", fontSize: "0.95rem", lineHeight: "1.5", color: "var(--text-muted, #A1A1AA)" }}>
                    {service.strap}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
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
            <h2>Who we have <em>worked with.</em></h2>
          </Reveal>
        </div>
        {[clients, [...clients].reverse()].map((row, rowIndex) => (
          <div className={`client-strip${rowIndex ? " is-reverse" : ""}`} key={rowIndex}>
            <div>
              {[...row, ...row].map((client, index) => (
                <span className="client-logo-item" key={`${client}-${index}`}>
                  <BrandMark size={24} />
                  <b>{client}</b>
                  <i>—</i>
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="home-voices wrap" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <Reveal>
          <h2>What clients <em>say.</em></h2>
        </Reveal>
        <div className="testimonial-marquee" style={{ marginTop: "32px" }}>
          {[testimonials, [...testimonials].reverse()].map((row, rowIndex) => (
            <div className="testimonial-track" key={rowIndex}>
              {[...row, ...row].map((item, index) => (
                <article key={`${rowIndex}-${item.name}-${index}`}>
                  <span className="stars">★★★★★</span>
                  <blockquote>“{item.quote}”</blockquote>
                  <footer>
                    <b>{item.name}</b>
                    <small>{item.scope}</small>
                  </footer>
                </article>
              ))}
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: "28px", color: "var(--text-dim, #71717A)", fontSize: "0.95rem" }}>
          Be one of our founding collaborations. We build long-term relationships with brands and creators who value genuine craft.
        </p>
      </section>

      <AnimatedStats
        stats={[
          { value: 52, suffix: "+", label: "Happy clients across the globe" },
          { value: 4.2, suffix: "B+", label: "Views generated across platforms", decimals: 1 },
          { value: 1200, suffix: "+", label: "Content pieces created for clients" },
          { value: 6400, suffix: "+", label: "Content pieces distributed" },
        ]}
      />

      <section className="who-we-are wrap" aria-label="Who we are" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="who-we-are-grid">
          <Reveal>
            <h2>A creative ecosystem, built for <em>all your needs.</em></h2>
          </Reveal>
          <Reveal delay={0.08} className="who-we-are-copy">
            <p className="who-we-are-lede">
              Narayani Studios was founded on the belief that great stories deserve careful craft, from the first idea to the final frame.
            </p>
            <div className="who-we-are-detail">
              <span />
              <p>
                Narayani Studios delivers branding, marketing and end-to-end production across digital, film and advertising media.
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

      <section className="home-contact wrap" aria-label="Start a project" style={{ backgroundImage: cssUrl("/Updated Images/Let's connect.png"), paddingTop: "80px", paddingBottom: "80px" }}>
        <div>
          <Reveal>
            <h2>Let&apos;s <em>talk.</em></h2>
            <p className="section-lede">
              Tell us the brief, one service or the full chain. We will name the stage and come back with a plan.
            </p>
            <div className="contact-meta" style={{ marginTop: "24px" }}>
              <p>
                <span>Email</span>
                <a href="mailto:business@narayanistudios.com">business@narayanistudios.com</a>
              </p>
              <p>
                <span>Phone</span>
                <a href="tel:+917447474431">+91 74474 74431</a>
              </p>
              <div className="contact-meta-item" style={{ marginTop: "16px" }}>
                <span>Socials</span>
                <SocialLinks />
              </div>
            </div>
          </Reveal>
        </div>
        <Suspense fallback={<div className="contact-form" />}>
          <ContactForm />
        </Suspense>
      </section>
    </main>
  );
}
