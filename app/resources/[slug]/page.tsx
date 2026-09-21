import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HomeCard } from "@/components/home-card";
import { CtaBand, PageHero } from "@/components/page-hero";
import { ResourceSubnav } from "@/components/resource-subnav";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { TestimonialsDeck } from "@/components/testimonials-deck";
import { articles } from "@/lib/article-data";
import { faqs, resourceTypes, testimonials } from "@/lib/site-data";

const entries = [
  ["How the right production process protects the idea", "Process"],
  ["Making branded content people choose to spend time with", "Craft"],
  ["What a clear creative brief unlocks", "Strategy"],
  ["On building campaigns that travel across platforms", "Distribution"],
];
const noteImages = [
  "/resource-note-process.png",
  "/resource-note-branded-content.png",
  "/resource-note-creative-brief.png",
  "/Updated Images/Full white coverage.png",
];
const gallery = [
  "/Updated Images/portfolio.png",
  "/Updated Images/Branding.png",
  "/Updated Images/personal branding.png",
  "/Updated Images/Full white coverage.png",
  "/Updated Images/About us.png",
  "/Updated Images/Let's connect.png",
];

const heroBySlug: Record<
  string,
  { title: ReactNode; copy: string; current: string; ctaHref: string; ctaLabel: string }
> = {
  faqs: {
    current: "FAQs",
    title: (
      <>
        Questions, <em>answered<span className="title-stop">.</span></em>
      </>
    ),
    copy: "Straightforward answers before the first conversation.",
    ctaHref: "#answers",
    ctaLabel: "Browse answers ↓",
  },
  articles: {
    current: "Articles",
    title: (
      <>
        Longer form, <em>deeper craft<span className="title-stop">.</span></em>
      </>
    ),
    copy: "Evergreen thinking on branding, production and culture.",
    ctaHref: "#list",
    ctaLabel: "Browse articles ↓",
  },
  testimonials: {
    current: "Testimonials",
    title: (
      <>
        What partners{" "}
        <em>
          <span className="title-keep">remember</span>
          <span className="title-stop">.</span>
        </em>
      </>
    ),
    copy: "What partners say after the work ships.",
    ctaHref: "#voices",
    ctaLabel: "Read the voices ↓",
  },
  blog: {
    current: "All resources",
    title: (
      <>
        Notes from <em>the floor<span className="title-stop">.</span></em>
      </>
    ),
    copy: "Process, people and the work — notes from inside the frame.",
    ctaHref: "#list",
    ctaLabel: "Browse notes ↓",
  },
  gallery: {
    current: "All resources",
    title: (
      <>
        Selected <em>stills<span className="title-stop">.</span></em>
      </>
    ),
    copy: "Frames from set, stage and the grade.",
    ctaHref: "#list",
    ctaLabel: "Open gallery ↓",
  },
  news: {
    current: "All resources",
    title: (
      <>
        Studio <em>news<span className="title-stop">.</span></em>
      </>
    ),
    copy: "Announcements, launches and updates from the house.",
    ctaHref: "#list",
    ctaLabel: "See updates ↓",
  },
};

export function generateStaticParams() {
  return resourceTypes.map(({ slug }) => ({ slug }));
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = resourceTypes.find((r) => r.slug === slug);
  if (!resource) notFound();

  const hero = heroBySlug[slug] ?? {
    current: "All resources" as const,
    title: (
      <>
        {resource.title}
        <span className="title-stop">.</span>
      </>
    ),
    copy: resource.copy,
    ctaHref: "#list",
    ctaLabel: "Explore ↓",
  };

  return (
    <main className={`resource-subpage${slug === "testimonials" ? " testimonials-page" : ""}`}>
      <PageHero
        title={hero.title}
        copy={hero.copy}
        image="/resources-n-hero.png?v=2"
        actions={
          <div className="hero-actions">
            <a className="button" href={hero.ctaHref}>
              {hero.ctaLabel}
            </a>
            <Link className="button-ghost" href="/resources">
              All resources
            </Link>
          </div>
        }
      />

      <ResourceSubnav current={hero.current} />

      {slug === "faqs" ? (
        <section id="answers" className="faq-section wrap resource-block resource-sub-section">
          <Reveal>
            <h2>
              Clear answers, <em>ready when you are</em>
              <span className="title-stop">.</span>
            </h2>
            <p className="section-lede">One service or the full chain — start here before the brief.</p>
          </Reveal>
          <div className="resource-faq-premium">
            {faqs.map(([question, answer], index) => (
              <details key={question} className={index % 2 === 0 ? "is-white" : "is-blue"}>
                <summary>
                  <span>{question}</span>
                  <i aria-hidden="true">+</i>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {slug === "articles" ? (
        <section id="list" className="wrap service-pillars resource-block resource-sub-section">
          <Reveal>
            <h2>
              Read from the <em>studio desk</em>
              <span className="title-stop">.</span>
            </h2>
            <p className="section-lede" style={{ marginBottom: "36px" }}>
              Longer notes on craft, process and the business of making work.
            </p>
          </Reveal>
          <Stagger className="pillar-cards client-service-grid">
            {articles.map((article, index) => {
              const images = [
                "/Updated Images/portfolio.png",
                "/Updated Images/Branding.png",
                "/Updated Images/personal branding.png",
                "/Updated Images/Full white coverage.png",
              ];
              return (
                <StaggerItem key={article.slug}>
                  <HomeCard
                    href={`/resources/articles/${article.slug}`}
                    title={article.title}
                    copy={article.dek}
                    image={images[index % images.length]}
                    index={index}
                  />
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>
      ) : null}

      {slug === "testimonials" ? (
        <section id="voices" className="testimonials-stage wrap resource-sub-section">
          <Reveal className="testimonials-intro">
            <h2>
              Work that leaves a <em>trace</em>
              <span className="title-stop">.</span>
            </h2>
            <p>
              Perspectives from the people who trusted the house with the idea, the process and the final frame.
            </p>
          </Reveal>
          <TestimonialsDeck items={testimonials} />
        </section>
      ) : null}

      {slug === "gallery" ? (
        <section id="list" className="wrap service-pillars resource-block resource-sub-section">
          <Stagger className="pillar-cards client-service-grid">
            {gallery.map((image, i) => (
              <StaggerItem key={image}>
                <HomeCard
                  href="/contact"
                  title={`Frame 0${i + 1}`}
                  copy="Selected still from set, stage and the grade."
                  image={image}
                  index={i}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      ) : null}

      {slug !== "faqs" && slug !== "articles" && slug !== "testimonials" && slug !== "gallery" ? (
        <section id="list" className="wrap service-pillars resource-block resource-sub-section">
          <Stagger className="pillar-cards client-service-grid">
            {entries.map(([entry, tag], index) => {
              return (
                <StaggerItem key={entry}>
                  <HomeCard
                    href="/contact"
                    title={entry}
                    copy={`${slug === "news" ? "Update" : tag} · ${resource.copy}`}
                    image={noteImages[index % noteImages.length]}
                    index={index}
                  />
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>
      ) : null}

      <section className="resource-sub-foot wrap">
        <Link className="text-link" href="/resources">
          ← Back to all resources
        </Link>
      </section>

      <CtaBand
        title={
          <>
            Start your project with <em>Narayani Studios</em>
            <span className="title-stop">.</span>
          </>
        }
        subheading="Tell us the brief. We will name the stage."
        buttonText="Contact Us ↗"
        buttonHref="/contact"
      />
    </main>
  );
}
