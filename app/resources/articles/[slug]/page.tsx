import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, PageHero } from "@/components/page-hero";
import { ResourceSubnav } from "@/components/resource-subnav";
import { Reveal } from "@/components/reveal";
import { articles } from "@/lib/article-data";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((entry) => entry.slug === slug);
  return article ? { title: article.title, description: article.dek } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((entry) => entry.slug === slug);
  if (!article) notFound();

  return (
    <main className="article-reading-page resource-subpage">
      <PageHero
        title={
          <>
            {article.title}
            <span className="title-stop">.</span>
          </>
        }
        copy={article.dek}
        image="/resources-n-hero.png?v=2"
        actions={
          <div className="hero-actions">
            <a className="button" href="#read">
              Read article ↓
            </a>
            <Link className="button-ghost" href="/resources/articles">
              All articles
            </Link>
          </div>
        }
      />

      <ResourceSubnav current="Articles" />

      <article id="read" className="article-reading wrap resource-sub-section">
        <Reveal>
          <div className="article-reading-meta">
            <span>{article.tag}</span>
            <time>{article.meta}</time>
          </div>
        </Reveal>
        <div className="article-reading-body">
          {article.sections.map(([heading, copy]) => (
            <section key={heading}>
              <h2>{heading}</h2>
              <p>{copy}</p>
            </section>
          ))}
        </div>
        <div className="resource-sub-foot" style={{ paddingInline: 0 }}>
          <Link className="text-link" href="/resources/articles">
            ← All articles
          </Link>
          <Link className="text-link" href="/resources">
            All resources ↗
          </Link>
        </div>
      </article>

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
