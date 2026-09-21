import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CtaBand, PageHero } from "@/components/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { asset } from "@/lib/asset";
import { services } from "@/lib/site-data";

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        title={<>
          From the first plan{" "}
          <em>to the last <span className="title-end">impression<span className="title-stop">.</span></span></em>
        </>}
        copy="Six divisions, one connected team, from the first idea to the audience it reaches."
        image="/services-n-hero.png?v=home-size-1"
        singleLineTitle
        actions={
          <div className="hero-actions">
            <a className="button" href="#explore">
              Explore services ↓
            </a>
            <Link className="button-ghost" href="/contact">
              Contact Us
            </Link>
          </div>
        }
      />

      <section id="explore" className="wrap service-pillars" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        <Reveal>
          <h2>Explore our services<span className="title-stop">.</span></h2>
          <p className="section-lede" style={{ marginBottom: "40px" }}>
            Open a division to see what sits inside it.
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
      </section>

      <CtaBand
        title={<>Start your project with <em>Narayani Studios</em><span className="title-stop">.</span></>}
        subheading="Tell us the brief. We will name the stage."
        buttonText="Contact Us ↗"
        buttonHref="/contact"
      />
    </main>
  );
}

