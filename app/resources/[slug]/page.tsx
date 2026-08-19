import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq-list";
import { CtaBand, PageHero } from "@/components/page-hero";
import { cssUrl } from "@/lib/asset";
import { resourceTypes, testimonials } from "@/lib/site-data";

const entries = [
  ["How the right production process protects the idea", "Process"],
  ["Making branded content people choose to spend time with", "Craft"],
  ["What a clear creative brief unlocks", "Strategy"],
  ["On building campaigns that travel across platforms", "Distribution"],
];
const gallery = ["film-automotive.png", "film-music.png", "film-virtual.png", "service-brand.png", "service-documentary.png", "service-drone.png", "service-photography.png", "service-vfx.png"];

export function generateStaticParams() {
  return resourceTypes.map(({ slug }) => ({ slug }));
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = resourceTypes.find((r) => r.slug === slug);
  if (!resource) notFound();

  const back = <p className="note wrap"><Link className="text-link" href="/resources">All resources ↗</Link></p>;

  if (slug === "faqs") {
    return (
      <main>
        <PageHero eyebrow="Resources" title="FAQs" copy={resource.copy} />
        <section className="faq-section wrap"><FaqList /></section>
        {back}
        <CtaBand />
      </main>
    );
  }

  if (slug === "gallery") {
    return (
      <main>
        <PageHero eyebrow="Resources" title="Gallery" copy={resource.copy} image="/service-photography.png" imagePosition="72% 12%" />
        <section className="gallery-grid wrap">
          {gallery.map((image, i) => (
            <div key={image} style={{ backgroundImage: cssUrl(`/${image}`) }}><span>Frame 0{i + 1}</span></div>
          ))}
        </section>
        {back}
        <CtaBand />
      </main>
    );
  }

  if (slug === "testimonials") {
    return (
      <main>
        <PageHero eyebrow="Resources" title="Testimonials" copy={resource.copy} />
        <section className="testimonial-cards wrap">
          {testimonials.map((item) => (
            <article key={item.name}>
              <span className="stars" aria-label="5 stars">★★★★★</span>
              <blockquote>“{item.quote}”</blockquote>
              <footer><b>{item.name}</b><small>{item.scope}</small></footer>
            </article>
          ))}
        </section>
        {back}
        <CtaBand />
      </main>
    );
  }

  return (
    <main>
      <PageHero eyebrow={`Resources / ${resource.title}`} title={resource.title} copy={resource.copy} />
      <section className="editorial-list wrap">
        {entries.map(([entry, tag]) => (
          <article key={entry}>
            <span>{slug === "news" ? "12.08.2026" : tag}</span>
            <h2>{entry}</h2>
            <Link href="/contact">Talk to the studio ↗</Link>
          </article>
        ))}
      </section>
      {back}
      <CtaBand />
    </main>
  );
}
