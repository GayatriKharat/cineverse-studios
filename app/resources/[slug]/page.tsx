import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq-list";
import { CtaBand, PageHero } from "@/components/page-hero";
import { TestimonialsDeck } from "@/components/testimonials-deck";
import { cssUrl } from "@/lib/asset";
import { articles } from "@/lib/article-data";
import { resourceTypes, testimonials } from "@/lib/site-data";

const entries = [
  ["How the right production process protects the idea", "Process"],
  ["Making branded content people choose to spend time with", "Craft"],
  ["What a clear creative brief unlocks", "Strategy"],
  ["On building campaigns that travel across platforms", "Distribution"],
];
const gallery = ["/client/frame-01.jpg", "/client/frame-02.jpg", "/client/frame-03.jpg", "/client/frame-04.jpg", "/client/frame-05.jpg", "/client/frame-06.jpg"];

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

  if (slug === "articles") {
    return (
      <main>
        <PageHero eyebrow="Resources" title="Articles" copy={resource.copy} image="/service-motion.png" />
        <section className="editorial-list wrap resource-index-list">
          {articles.map((article) => (
            <Link key={article.slug} href={`/resources/articles/${article.slug}`}>
              <span>{article.tag}</span>
              <div><h2>{article.title}</h2><small>{article.meta}</small><p>{article.dek}</p></div>
              <b>↗</b>
            </Link>
          ))}
        </section>
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
            <div key={image} style={{ backgroundImage: cssUrl(image) }}><span>Frame 0{i + 1}</span></div>
          ))}
        </section>
        {back}
        <CtaBand />
      </main>
    );
  }

  if (slug === "testimonials") {
    return (
      <main className="testimonials-page">
        <PageHero eyebrow="Resources / Voices" title={<>What partners <em>remember.</em></>} copy={resource.copy} />
        <section className="testimonials-stage wrap">
          <div className="testimonials-intro">
            <p className="eyebrow">The signal is clear</p>
            <h2>Work that leaves a <em>trace.</em></h2>
            <p>Three perspectives from the people who trusted the house with the idea, the process and the final frame.</p>
          </div>
          <TestimonialsDeck items={testimonials} />
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
