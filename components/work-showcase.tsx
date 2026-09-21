import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { asset } from "@/lib/asset";
import { projects, services, workCategories } from "@/lib/site-data";

export function WorkShowcase() {
  return (
    <>
      <section id="work" className="wrap service-pillars" style={{ paddingTop: "60px", paddingBottom: "40px" }}>
        <Reveal>
          <h2>
            Featured <em>work</em>
            <span className="title-stop">.</span>
          </h2>
          <p className="section-lede" style={{ marginBottom: "40px" }}>
            A few frames that show how the house thinks, shoots and finishes.
          </p>
        </Reveal>
        <Stagger className="pillar-cards client-service-grid">
          {projects.map((project, index) => {
            const isWhite = index % 2 === 0;
            return (
              <StaggerItem key={project.slug}>
                <Link
                  className={`service-architecture-card service-card-link ${isWhite ? "card-theme-white" : "card-theme-blue"}`}
                  href={`/services/${project.service}`}
                >
                  <div className="service-card-face">
                    <div className="service-card-media-wrap">
                      <img
                        src={asset(project.image)}
                        alt={project.title}
                        className="service-card-image"
                      />
                    </div>
                    <div className="service-card-body">
                      <h3>{project.title}</h3>
                      <p>{project.blurb}</p>
                    </div>
                    {isWhite && <span className="service-card-yellow-slash" aria-hidden="true" />}
                    <span className="service-card-arrow-action" aria-hidden="true">
                      <ArrowUpRight className="service-card-arrow-icon" size={34} strokeWidth={2.4} />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <section className="wrap" style={{ paddingBottom: "28px" }}>
        <Reveal>
          <h2>
            Open the work through a <em>service</em>
            <span className="title-stop">.</span>
          </h2>
          <p className="section-lede" style={{ marginBottom: "28px" }}>
            Jump into a division to see frames shaped for that craft.
          </p>
        </Reveal>
        <Stagger className="pillar-cards client-service-grid">
          {services.map((service, index) => {
            const isWhite = index % 2 === 0;
            return (
              <StaggerItem key={service.slug}>
                <a
                  className={`service-architecture-card service-card-link ${isWhite ? "card-theme-white" : "card-theme-blue"}`}
                  href={`#${service.slug}`}
                >
                  <div className="service-card-face">
                    <div className="service-card-media-wrap">
                      <img
                        src={asset(service.image)}
                        alt={service.title}
                        className="service-card-image"
                      />
                    </div>
                    <div className="service-card-body">
                      <h3>{service.title}</h3>
                      <p>{service.strap}</p>
                    </div>
                    {isWhite && <span className="service-card-yellow-slash" aria-hidden="true" />}
                    <span className="service-card-arrow-action" aria-hidden="true">
                      <ArrowUpRight className="service-card-arrow-icon" size={34} strokeWidth={2.4} />
                    </span>
                  </div>
                </a>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <section className="portfolio-categories wrap" style={{ paddingBottom: "48px" }}>
        {workCategories.map((category) => {
          const categoryProjects = projects.filter((project) => project.service === category.slug);
          const cards = categoryProjects.length
            ? categoryProjects
            : category.projects.map((project, index) => ({
                ...project,
                slug: `${category.slug}-${index}`,
                blurb: category.title,
                service: category.slug,
              }));

          return (
            <section key={category.slug} id={category.slug} className="service-pillars" style={{ paddingTop: "48px", paddingBottom: "24px", background: "transparent" }}>
              <Reveal>
                <div className="work-band-head" style={{ marginBottom: "28px" }}>
                  <h2>
                    {category.title}
                    <span className="title-stop">.</span>
                  </h2>
                  <Link className="text-link" href={`/services/${category.slug}`}>
                    Open service ↗
                  </Link>
                </div>
              </Reveal>
              <Stagger className="pillar-cards client-service-grid">
                {cards.slice(0, 3).map((project, index) => {
                  const isWhite = index % 2 === 0;
                  return (
                    <StaggerItem key={project.slug}>
                      <Link
                        className={`service-architecture-card service-card-link ${isWhite ? "card-theme-white" : "card-theme-blue"}`}
                        href={`/services/${project.service}`}
                      >
                        <div className="service-card-face">
                          <div className="service-card-media-wrap">
                            <img
                              src={asset(project.image)}
                              alt={project.title}
                              className="service-card-image"
                            />
                          </div>
                          <div className="service-card-body">
                            <h3>{project.title}</h3>
                            <p>{"blurb" in project ? project.blurb : category.title}</p>
                          </div>
                          {isWhite && <span className="service-card-yellow-slash" aria-hidden="true" />}
                          <span className="service-card-arrow-action" aria-hidden="true">
                            <ArrowUpRight className="service-card-arrow-icon" size={34} strokeWidth={2.4} />
                          </span>
                        </div>
                      </Link>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </section>
          );
        })}
      </section>
    </>
  );
}
