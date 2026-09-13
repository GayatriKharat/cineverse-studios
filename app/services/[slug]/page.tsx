import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ServiceHero } from "@/components/service-hero";
import { SubServicesShowcase } from "@/components/subservices-showcase";
import { CtaBand } from "@/components/page-hero";
import { craftsByService } from "@/lib/offerings";
import { findService, services } from "@/lib/site-data";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}



export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return { title: "Services · Narayani Studios" };
  return {
    title: `${service.title} · Division ${service.code} · Narayani Studios`,
    description: service.strap || service.summary,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const crafts = craftsByService[service.slug] || craftsByService[slug] || [];

  return (
    <main className="service-detail-page">
      {/* 1st Section: Service Hero with EXACTLY ONE prominent image */}
      <ServiceHero service={service} craftsCount={crafts.length} />

      {/* Sub-Services Interactive Showcase */}
      {crafts.length > 0 ? (
        <SubServicesShowcase
          crafts={crafts}
          serviceSlug={service.slug}
          serviceTitle={service.title}
          serviceCode={service.code}
        />
      ) : (
        <section className="wrap" style={{ marginTop: "40px", marginBottom: "40px" }}>
          <ul className="sub-list">
            {service.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Bottom Service Navigation & Actions */}
      <section className="service-footer-nav wrap">
        <div className="service-footer-nav-inner">
          <Link className="service-back-link" href="/services">
            <ArrowLeft className="icon-small" />
            <span>Back to All 6 Divisions</span>
          </Link>
          <div className="service-other-divisions">
            <span className="other-divisions-label">Other Divisions:</span>
            <div className="other-divisions-pills">
              {services
                .filter((s) => s.slug !== service.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="other-division-chip"
                  >
                    <span>{s.code}</span> {s.title}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final Studio CTA Band */}
      <CtaBand
        title={<>Ready to create with <em>Narayani Studios?</em></>}
        subheading={`Connect directly with our ${service.title} leadership team.`}
        buttonText={`Enquire About Division ${service.code} ↗`}
        buttonHref={`/contact?service=${encodeURIComponent(service.slug)}`}
      />
    </main>
  );
}

