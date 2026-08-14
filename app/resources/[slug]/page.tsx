import { notFound } from "next/navigation";
import Link from "next/link";
import { resourceTypes, testimonials } from "@/lib/site-data";
import { FaqList } from "@/components/faq-list";

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

  if (slug === "faqs") {
    return (
      <main className="page-shell">
        <section className="page-hero wrap">
          <p className="eyebrow">Resources</p>
          <h1>Frequently asked questions</h1>
        </section>
        <section className="faq-section wrap"><FaqList /></section>
      </main>
    );
  }

  if (slug === "gallery") {
    return (
      <main className="page-shell">
        <section className="page-hero wrap">
          <p className="eyebrow">Resources</p>
          <h1>Gallery</h1>
        </section>
        <section className="gallery-grid wrap">
          {gallery.map((image, i) => (
            <div key={image} style={{ backgroundImage: `url(/${image})` }}><span>Frame 0{i + 1}</span></div>
          ))}
        </section>
      </main>
    );
  }

  if (slug === "testimonials") {
    return (
      <main className="page-shell">
        <section className="page-hero wrap">
          <p className="eyebrow">Resources</p>
          <h1>Client testimonials</h1>
        </section>
        <section className="testimonial-cards wrap">
          {testimonials.map((item) => (
            <article key={item.name}>
              <span className="stars" aria-label="5 stars">★★★★★</span>
              <blockquote>“{item.quote}”</blockquote>
              <footer><b>{item.name}</b><small>{item.scope}</small></footer>
            </article>
          ))}
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="page-hero wrap">
        <p className="eyebrow">Resources / {resource.title}</p>
        <h1>{resource.title}</h1>
        <p>{resource.copy}</p>
      </section>
      <section className="editorial-list wrap">
        {entries.map(([entry, tag]) => (
          <article key={entry}>
            <span>{slug === "news" ? `12.08.2026` : tag}</span>
            <h2>{entry}</h2>
            <Link href="/contact">Read more</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
