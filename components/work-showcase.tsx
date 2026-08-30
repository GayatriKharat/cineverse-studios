import Link from "next/link";
import { cssUrl } from "@/lib/asset";
import { projects, services, workCategories } from "@/lib/site-data";

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
      <section className="portfolio-categories wrap">
        {workCategories.map((category) => {
          const categoryProjects = projects.filter((project) => project.service === category.slug);
          const cards = categoryProjects.length ? categoryProjects : category.projects.map((project, index) => ({ ...project, slug: `${category.slug}-${index}`, type: category.title, service: category.slug }));
          return <section key={category.slug} id={category.slug} className="portfolio-category">
            <div className="work-band-head"><span className="eyebrow">{category.code}</span><h2>{category.title}</h2><Link className="text-link" href={`/services/${category.slug}`}>Open service ↗</Link></div>
            <div className="work-row">{cards.slice(0, 3).map((project) => <Link key={project.slug} href={`/services/${project.service}`}><div style={{ backgroundImage: cssUrl(project.image) }} /><h3>{project.title}</h3></Link>)}</div>
          </section>;
        })}
      </section>
    </>
  );
}
