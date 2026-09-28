import Link from "next/link";
import { Quote } from "lucide-react";
import { CtaBand, PageHero } from "@/components/page-hero";
import { HomeCard } from "@/components/home-card";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { StudioTile, studioTileGridClass } from "@/components/studio-tile";
import { articles } from "@/lib/article-data";
import { faqs, testimonials } from "@/lib/site-data";

const articleImages = [
  "/Updated Images/portfolio.png",
  "/Updated Images/Branding.png",
  "/Updated Images/personal branding.png",
];

export default function Resources() {
  const previewTestimonials = testimonials.slice(0, 3);

  return (
    <main className="resource-page">
      <PageHero
        title={
          <>
            From the <em>studio<span className="title-stop">.</span></em>
          </>
        }
        copy="Articles, FAQs and what clients say — craft, process and the business of making work."
        image="/resources-n-hero.png?v=2"
        actions={
          <>
            <div className="hero-actions">
              <a className="button" href="#articles">
                Explore resources ↓
              </a>
              <Link className="button-ghost" href="/contact">
                Contact Us
              </Link>
            </div>
            <nav className="resource-tabs resource-hero-tabs" aria-label="Resource categories">
              <a href="#articles">Articles</a>
              <a href="#answers">FAQs</a>
              <a href="#voices">Testimonials</a>
            </nav>
          </>
        }
      />

      <section id="articles" className="wrap service-pillars resource-block">
        <Reveal>
          <div className="resource-feature-head">
            <h2>
              Longer form, <em>deeper <span className="title-end">craft<span className="title-stop">.</span></span></em>
            </h2>
            <Link className="text-link" href="/resources/articles">
              All articles ↗
            </Link>
          </div>
          <p className="section-lede" style={{ marginBottom: "36px" }}>
            Evergreen thinking on branding, production and the culture of making work.
          </p>
        </Reveal>
        <Stagger className="pillar-cards client-service-grid">
          {articles.slice(0, 3).map((article, index) => (
            <StaggerItem key={article.slug}>
              <HomeCard
                href={`/resources/articles/${article.slug}`}
                title={article.title}
                copy={article.dek}
                image={articleImages[index]}
                index={index}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section id="answers" className="wrap service-pillars resource-block is-alt">
        <Reveal>
          <div className="resource-feature-head">
            <h2>
              Questions we get <em>often<span className="title-stop">.</span></em>
            </h2>
            <Link className="text-link" href="/resources/faqs">
              All FAQs ↗
            </Link>
          </div>
          <p className="section-lede" style={{ marginBottom: "28px" }}>
            Clear answers before the first conversation — one service or the full chain.
          </p>
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

      <section id="voices" className="wrap service-pillars resource-block">
        <Reveal>
          <div className="resource-feature-head">
            <h2>
              What clients <em>say<span className="title-stop">.</span></em>
            </h2>
            <Link className="text-link" href="/resources/testimonials">
              All testimonials ↗
            </Link>
          </div>
          <p className="section-lede" style={{ marginBottom: "8px" }}>
            Voices from partners who trusted the house with the idea and the final frame.
          </p>
        </Reveal>
        <Stagger className={studioTileGridClass}>
          {previewTestimonials.map((item, index) => (
            <StaggerItem key={item.name}>
              <StudioTile
                label={String(index + 1).padStart(2, "0")}
                title={item.name}
                copy={`“${item.quote}”`}
                meta={item.scope}
                Icon={Quote}
                blue={index % 2 === 1}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CtaBand
        title={
          <>
            Start your project with <em>Narayani <span className="title-end">Studios<span className="title-stop">.</span></span></em>
          </>
        }
        subheading="Tell us the brief. We will name the stage."
        buttonText="Contact Us ↗"
        buttonHref="/contact" />
    </main>
  );
}

