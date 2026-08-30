import Link from "next/link";
import { CtaBand, PageHero } from "@/components/page-hero";
import { cssUrl } from "@/lib/asset";
import { faqs, testimonials } from "@/lib/site-data";

const gallery = ["/client/frame-01.jpg", "/client/frame-03.jpg", "/client/frame-05.jpg"];
const posts = ["How the right production process protects the idea", "Making branded content people choose to spend time with", "What a clear creative brief unlocks"];

export default function Resources() {
  return (
    <main>
      <PageHero eyebrow="Insights · Resources" title={<>From the <em>studio.</em></>} copy="Journals, news, stills and the questions clients ask before we begin." />
      <section className="resources-architecture wrap">
        <div className="resource-feature-head"><div><p className="eyebrow">01 / Journal</p><h2>Notes from <em>the floor.</em></h2></div><Link className="text-link" href="/resources/blog">All posts ↗</Link></div>
        <div className="resource-preview-grid">{posts.map((post, index) => <Link className="resource-preview" key={post} href="/resources/blog"><div style={{ backgroundImage: cssUrl(gallery[index]) }} /><span>{index === 0 ? "Process" : index === 1 ? "Craft" : "Strategy"}</span><h3>{post}</h3></Link>)}</div>
        <div className="resource-feature-head"><div><p className="eyebrow">02 / Thinking</p><h2>Longer form, <em>deeper craft.</em></h2></div><Link className="text-link" href="/resources/articles">All articles ↗</Link></div>
        <div className="editorial-list resource-preview-list">{posts.map((post) => <Link key={post} href="/resources/articles"><span>Article</span><h3>{post}</h3><b>↗</b></Link>)}</div>
        <div className="resource-columns">
          <section><p className="eyebrow">03 / Voices</p><h2>What clients <em>say.</em></h2>{testimonials.slice(0, 2).map((item) => <blockquote key={item.name}>“{item.quote}”<small>{item.name} · {item.scope}</small></blockquote>)}</section>
          <section><p className="eyebrow">04 / Answers</p><h2>Questions we get <em>often.</em></h2><p className="resource-answer">{faqs[0][0]}</p><p className="muted">{faqs[0][1]}</p><Link className="text-link" href="/resources/faqs">All FAQs ↗</Link></section>
        </div>
        <div className="resource-feature-head"><div><p className="eyebrow">05 / Gallery</p><h2>Frames from <em>the floor.</em></h2></div><Link className="text-link" href="/resources/gallery">Full gallery ↗</Link></div>
        <div className="resource-gallery-preview">{gallery.map((image) => <Link key={image} href="/resources/gallery" style={{ backgroundImage: cssUrl(image) }} />)}</div>
      </section>
      <CtaBand />
    </main>
  );
}
