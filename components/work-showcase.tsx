import Link from "next/link";
import { cssUrl } from "@/lib/asset";
import { projects, services } from "@/lib/site-data";

export function WorkShowcase() {
  return (
    <>
      <section className="wrap">
        <p className="eyebrow">By division</p>
        <h2>Open the work through a <em>service.</em></h2>
        <div className="work-cats">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="work-cat">
              <span>{service.code}</span>
              {service.title}
            </Link>
          ))}
        </div>
      </section>
      <section className="feature-asymmetric wrap">
        {projects.map((project, i) => (
          <Link key={project.slug} href={`/services/${project.service}`} className={`feature-card n${i + 1}`}>
            <div className="feature-still" style={{ backgroundImage: cssUrl(project.image) }} />
            <span>{project.type}</span>
            <h3>{project.title}</h3>
          </Link>
        ))}
      </section>
    </>
  );
}
