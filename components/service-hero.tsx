import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import type { ServiceItem } from "@/lib/site-data";

export function ServiceHero({
  service,
  craftsCount,
}: {
  service: ServiceItem;
  craftsCount: number;
}) {
  return (
    <section id="service-hero" className="service-hero-section">
      <div className="wrap service-hero-inner">
        {/* Left Column: Context, Title, Badges & Actions */}
        <div className="service-hero-content">
          <div className="service-hero-badge-row">
            <span className="service-division-pill">
              Division {service.code}
            </span>
            <span className="service-meta-pill">
              <Sparkles className="icon-tiny" />
              {craftsCount} Specialized Capabilities
            </span>
          </div>

          <h1 className="service-hero-title">
            {service.title}
          </h1>

          <p className="service-hero-strap">
            {service.strap}
          </p>

          <p className="service-hero-summary">
            {service.summary || "Built for brands and creators requiring singular focus, premium production values, and commercial clarity."}
          </p>

          {/* Quick value tags */}
          <div className="service-hero-tags">
            <div className="service-hero-tag">
              <CheckCircle2 className="icon-tiny" />
              <span>Dedicated Studio Teams</span>
            </div>
            <div className="service-hero-tag">
              <CheckCircle2 className="icon-tiny" />
              <span>Turnkey Execution</span>
            </div>
            <div className="service-hero-tag">
              <CheckCircle2 className="icon-tiny" />
              <span>Full Rights & IP Protection</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="service-hero-actions">
            <a href="#subservices-showcase" className="button service-btn-primary">
              Explore Sub-Services
              <ArrowDown className="icon-small" />
            </a>
            <Link
              href={`/contact?service=${encodeURIComponent(service.slug)}`}
              className="button-ghost service-btn-secondary"
            >
              Enquire About Division {service.code}
              <ArrowUpRight className="icon-small" />
            </Link>
          </div>
        </div>

        {/* Right Column: Exactly ONE Hero Image */}
        <div className="service-hero-visual-col">
          <div className="service-hero-card">
            <div className="service-hero-media-wrapper">
              <Image
                src={service.image}
                alt={`${service.title} - Narayani Studios`}
                width={800}
                height={500}
                priority
                className="service-hero-image"
                referrerPolicy="no-referrer"
              />
              <div className="service-hero-overlay" />
              <div className="service-hero-glass-chip">
                <span>0{service.code} // STUDIO ARCHIVE</span>
              </div>
            </div>
            <div className="service-hero-card-foot">
              <div>
                <strong>Narayani Studios LLP</strong>
                <small>{service.title} Division</small>
              </div>
              <span className="service-hero-status-dot">
                <span className="pulse-indicator" />
                Active Capacity
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
