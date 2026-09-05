import Link from "next/link";
import { CtaBand, PageHero } from "@/components/page-hero";
import { cssUrl } from "@/lib/asset";
import { faqs, testimonials } from "@/lib/site-data";
import { articles } from "@/lib/article-data";

const gallery = ["/pre_production_image.png", "/production_image.png", "/post_production_image.png"];
const galleryLabels = ["Pre-production", "Production", "Post-production"];
const posts = ["How the right production process protects the idea", "Making branded content people choose to spend time with", "What a clear creative brief unlocks"];
const postSummaries = [
  "The choices made before a shoot protect the idea, the schedule and the final frame.",
  "A practical look at building branded work with enough craft to earn attention.",
  "Why a sharper brief gives every department a clearer route from thought to delivery.",
];
export default function Resources() {
  return (
    <main>
      <PageHero eyebrow="Insights · Resources" title={<>From the <em>studio.</em></>} copy="Notes on craft, the work, and the business of making it — articles, FAQs and what clients say." image="/service-motion.png" actions={<nav className="resource-tabs resource-hero-tabs" aria-label="Resource categories"><Link href="#articles">Articles</Link><Link href="#answers">FAQs</Link><Link href="/resources/testimonials">Testimonials</Link></nav>} />
      <section className="resources-architecture wrap">
        <section id="blog" className="resource-section"><div className="resource-feature-head"><div><p className="eyebrow">Journal</p><h2>Notes from <em>the floor.</em></h2></div><Link className="text-link" href="/resources/blog">All posts ↗</Link></div><div className="resource-preview-grid">{posts.map((post, index) => <Link className="resource-preview" key={post} href="/resources/blog"><div style={{ backgroundImage: cssUrl(gallery[index]) }} /><div className="resource-preview-copy"><span>{galleryLabels[index]}</span><h3>{post}</h3><p>{postSummaries[index]}</p></div></Link>)}</div></section>
        <section id="articles" className="resource-section"><div className="resource-feature-head"><div><p className="eyebrow">Articles</p><h2>Longer form, <em>deeper craft.</em></h2></div><Link className="text-link" href="/resources/articles">All articles ↗</Link></div><div className="editorial-list resource-preview-list">{articles.map((article) => <Link key={article.slug} href={`/resources/articles/${article.slug}`}><span>{article.tag}</span><div><h3>{article.title}</h3><small>{article.meta}</small></div><b>↗</b></Link>)}</div></section>
        <section id="voices" className="resource-section resource-voices"><div className="resource-feature-head"><div><p className="eyebrow">Testimonials · Reviews</p><h2>What clients <em>say.</em></h2></div><Link className="text-link" href="/resources/testimonials">All testimonials ↗</Link></div><div className="resource-testimonial-grid">{testimonials.map((item) => <article key={item.name}><span className="stars" aria-label="5 stars">★★★★★</span><blockquote>“{item.quote}”</blockquote><footer><b>{item.name}</b><small>{item.scope}</small></footer></article>)}</div></section>
        <section id="answers" className="resource-section resource-answers"><div className="resource-feature-head"><div><p className="eyebrow">FAQs</p><h2>Questions we get <em>often.</em></h2></div><Link className="text-link" href="/resources/faqs">All FAQs ↗</Link></div><div className="resource-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
      </section>
      <CtaBand />
    </main>
  );
}
