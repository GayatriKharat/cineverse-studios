import Link from "next/link";
import { CtaBand, PageHero } from "@/components/page-hero";
import { resourceTypes } from "@/lib/site-data";

export default function Resources() {
  return (
    <main>
      <PageHero eyebrow="Insights · Resources" title={<>From the <em>studio.</em></>} copy="Journals, news, stills and the questions clients ask before we begin." />
      <section className="index-list wrap">
        {resourceTypes.map((r, i) => (
          <Link href={`/resources/${r.slug}`} key={r.slug} className="index-row">
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h3>{r.title}</h3>
            <p>{r.copy}</p>
            <b>↗</b>
          </Link>
        ))}
      </section>
      <CtaBand />
    </main>
  );
}
