import Link from "next/link";
import { CtaBand, PageHero } from "@/components/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { asset } from "@/lib/asset";
import { services } from "@/lib/site-data";

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        title="From the first plan to the last impression."
        copy="Six divisions, one connected team, from the first idea to the audience it reaches."
        image="/all-services-hero.png"
        actions={
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "24px" }}>
            <a className="button" href="#explore">
              Explore services ↓
            </a>
            <Link className="text-link" href="/contact" style={{ display: "inline-flex", alignItems: "center" }}>
              Contact Us ↗
            </Link>
          </div>
        }
      />

      <section id="explore" className="wrap service-pillars" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        <Reveal>
          <h2>Explore our services.</h2>
          <p className="section-lede" style={{ marginBottom: "40px", color: "var(--text-dim, #71717A)" }}>
            Open a division to see what sits inside it,
          </p>
        </Reveal>

        <Stagger className="pillar-cards client-service-grid">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <article className="service-directory-card">
                <Link className="service-directory-media" href={`/services/${service.slug}`} aria-label={`Open ${service.title}`}>
                  <img src={asset(service.image)} alt={service.title} />
                </Link>
                <div className="service-directory-copy">
                  <span style={{ fontSize: "0.85rem", letterSpacing: "0.08em", color: "var(--text-dim, #71717A)", textTransform: "uppercase", fontWeight: 600 }}>
                    Division {service.code}
                  </span>
                  <h3 style={{ marginTop: "4px" }}>{service.title}</h3>
                  <p style={{ color: "var(--text-muted, #A1A1AA)", fontSize: "0.95rem", lineHeight: "1.5", margin: "12px 0 16px" }}>
                    {service.strap}
                  </p>
                  <div className="service-directory-options" style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "16px 0 24px" }}>
                    {service.items.map((item) => (
                      <Link
                        key={item}
                        href={`/services/${service.slug}#${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        style={{
                          fontSize: "0.85rem",
                          padding: "4px 10px",
                          borderRadius: "999px",
                          border: "1px solid var(--line-subtle, rgba(255,255,255,0.1))",
                          background: "var(--surface-sunken, rgba(255,255,255,0.03))",
                          color: "var(--text-body, #D4D4D8)",
                          textDecoration: "none",
                        }}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                  <div className="service-directory-footer" style={{ display: "flex", gap: "20px", alignItems: "center", borderTop: "1px solid var(--line-subtle, rgba(255,255,255,0.08))", paddingTop: "16px" }}>
                    <Link href={`/services/${service.slug}`} style={{ fontWeight: 600, color: "var(--text-primary, #FFFFFF)" }}>
                      Open ↗
                    </Link>
                    <Link className="muted-link" href="/portfolio" style={{ color: "var(--text-dim, #71717A)" }}>
                      See our work
                    </Link>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CtaBand
        title={<>Start your project with <em>Narayani Studios.</em></>}
        subheading="Tell us the brief. We will name the stage."
        buttonText="Contact Us ↗"
        buttonHref="/contact"
      />
    </main>
  );
}
