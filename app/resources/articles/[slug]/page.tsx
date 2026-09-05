import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, PageHero } from "@/components/page-hero";
import { articles } from "@/lib/article-data";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

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
    <main className="article-reading-page">
      <PageHero eyebrow={`Articles / ${article.tag}`} title={article.title} copy={article.dek} />
      <article className="article-reading wrap">
        <div className="article-reading-meta">
          <span>{article.tag}</span>
          <time>{article.meta}</time>
        </div>
        <div className="article-reading-body">
          {article.sections.map(([heading, copy]) => (
            <section key={heading}>
              <h2>{heading}</h2>
              <p>{copy}</p>
            </section>
          ))}
        </div>
        <Link className="text-link" href="/resources/articles">All articles ↗</Link>
      </article>
      <CtaBand />
    </main>
  );
}
