import Link from "next/link";
import { CtaBand, PageHero } from "@/components/page-hero";
import { HomeCard } from "@/components/home-card";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { articles } from "@/lib/article-data";
import { faqs, testimonials } from "@/lib/site-data";

const notes = [
  {
    title: "How the right production process protects the idea",
    copy: "The choices made before a shoot protect the idea, the schedule and the final frame.",
    image: "/pre_production_image.png",
    href: "/resources/blog",
  },
  {
    title: "Making branded content people choose to spend time with",
    copy: "A practical look at building branded work with enough craft to earn attention.",
    image: "/production_image.png",
    href: "/resources/blog",
  },
  {
    title: "What a clear creative brief unlocks",
    copy: "Why a sharper brief gives every department a clearer route from thought to delivery.",
    image: "/post_production_image.png",
    href: "/resources/blog",
  },
];

const articleImages = [
  "/Updated Images/portfolio.png",
  "/Updated Images/Branding.png",
  "/Updated Images/personal branding.png",
];

const voiceImages = [
  "/Updated Images/About us.png",
  "/Updated Images/Let's connect.png",
  "/Updated Images/Full white coverage.png",
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
        copy="Notes on craft, the work, and the business of making it, articles, FAQs and what clients say."
        image="/resources-n-hero.png?v=2"
        actions={
          <>
            <div className="hero-actions">
              <a className="button" href="#blog">
                Explore resources ↓
              </a>
              <Link className="button-ghost" href="/contact">
                Contact Us
              </Link>
            </div>
            <nav className="resource-tabs resource-hero-tabs" aria-label="Resource categories">
              <a href="#blog">Notes</a>
              <a href="#articles">Articles</a>
              <a href="#voices">Testimonials</a>
              <a href="#answers">FAQs</a>
            </nav>
          </>
        }
      />

      <section id="blog" className="wrap service-pillars resource-block">
        <Reveal>
          <div className="resource-feature-head">
            <h2>
              Notes from <em>the floor</em>
              <span className="title-stop">.</span>
            </h2>
            <Link className="text-link" href="/resources/blog">
              All posts ↗
            </Link>
          </div>
          <p className="section-lede" style={{ marginBottom: "36px" }}>
            Process notes from inside the frame — practical, sharp and ready to use.
          </p>
        </Reveal>
        <Stagger className="pillar-cards client-service-grid">
          {notes.map((note, index) => (
            <StaggerItem key={note.title}>
              <HomeCard {...note} index={index} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section id="articles" className="wrap service-pillars resource-block is-alt">
        <Reveal>
          <div className="resource-feature-head">
            <h2>
              Longer form, <em>deeper craft</em>
              <span className="title-stop">.</span>
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

      <section id="voices" className="wrap service-pillars resource-block">
        <Reveal>
          <div className="resource-feature-head">
            <h2>
              What clients <em>say</em>
              <span className="title-stop">.</span>
            </h2>
            <Link className="text-link" href="/resources/testimonials">
              All testimonials ↗
            </Link>
          </div>
          <p className="section-lede" style={{ marginBottom: "36px" }}>
            Voices from partners who trusted the house with the idea and the final frame.
          </p>
        </Reveal>
        <Stagger className="pillar-cards client-service-grid">
          {previewTestimonials.map((item, index) => (
            <StaggerItem key={item.name}>
              <HomeCard
                href="/resources/testimonials"
                title={item.name}
                copy={`“${item.quote}” · ${item.scope}`}
                image={voiceImages[index]}
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
              Questions we get <em>often</em>
              <span className="title-stop">.</span>
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
