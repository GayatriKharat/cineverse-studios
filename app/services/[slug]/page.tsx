import { notFound } from "next/navigation";
import Link from "next/link";
import { CraftTabs } from "@/components/craft-tabs";
import { CtaBand, PageHero } from "@/components/page-hero";
import { craftsByService } from "@/lib/offerings";
import { findService, services } from "@/lib/site-data";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}



export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const crafts = craftsByService[service.slug] || craftsByService[slug] || [];

  return (
    <main>
      <PageHero
        compact
        eyebrow={`Division ${service.code}`}
        title={service.title}
        copy={service.strap}
        image={service.image}
      />
      
      {crafts.length > 0 ? (
        <section className="wrap" style={{ marginTop: "40px", marginBottom: "40px" }}>
          <CraftTabs crafts={crafts} serviceSlug={service.slug} />
        </section>
      ) : (
        <section className="wrap" style={{ marginTop: "40px", marginBottom: "40px" }}>
          <ul className="sub-list">
            {service.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="service-actions wrap" style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center", marginTop: "48px", marginBottom: "48px" }}>
        <Link className="button" href={`/contact?service=${encodeURIComponent(service.slug)}`}>
          Enquire about {service.title} ↗
        </Link>
        <Link className="text-link" href="/services">
          All services ↗
        </Link>
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
