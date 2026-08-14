import Link from "next/link";
import { CtaBand, PageHero } from "@/components/page-hero";
import { cssUrl } from "@/lib/asset";
import { projects } from "@/lib/site-data";

export default function OurWork() {
  return (
    <main>
      <PageHero
        eyebrow="Work"
        title={<>Selected <em>frames.</em></>}
        copy="A record of worlds made for brands, stages and screens — stills from the floor, not a stock gallery."
        image="/service-photography.png"
      />
      <section className="feature-asymmetric wrap">
        {projects.map((project, i) => (
          <Link key={project.slug} href="/contact" className={`feature-card n${i + 1}`}>
            <div className="feature-still" style={{ backgroundImage: cssUrl(project.image) }} />
            <span>{project.type}</span>
            <h3>{project.title}</h3>
          </Link>
        ))}
      </section>
      <CtaBand title={<>Have an idea worth <em>making?</em></>} />
    </main>
  );
}
