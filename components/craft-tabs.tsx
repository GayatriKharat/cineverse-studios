"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cssUrl } from "@/lib/asset";
import { craftHref, type Craft } from "@/lib/offerings";

export function CraftTabs({ crafts, serviceSlug }: { crafts: Craft[]; serviceSlug: string }) {
  const [active, setActive] = useState<string | null>(crafts[0]?.slug ?? null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && crafts.some((c) => c.slug === hash)) setActive(hash);
  }, [crafts]);

  return (
    <div className="craft-stack">
      {crafts.map((craft, index) => {
        const on = craft.slug === active;
        return (
          <article key={craft.slug} className={`craft-bar${on ? " is-on" : ""}`} id={craft.slug}>
            <button
              type="button"
              className="craft-bar-hit"
              aria-expanded={on}
              onClick={() => {
                const next = active === craft.slug ? null : craft.slug;
                setActive(next);
                history.replaceState(null, "", next ? `#${next}` : window.location.pathname + window.location.search);
              }}
            >
              <span className="craft-bar-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="craft-bar-copy">
                <strong>{craft.title}</strong>
                <small>{craft.strap}</small>
              </span>
              <i className="craft-bar-mark" aria-hidden />
              <b className="craft-bar-line" />
            </button>
            <div className="craft-panel">
              <div className="craft-panel-inner">
                <button
                  type="button"
                  className="craft-panel-close"
                  aria-label={`Close ${craft.title} details`}
                  onClick={() => {
                    setActive(null);
                    history.replaceState(null, "", window.location.pathname + window.location.search);
                  }}
                >
                  ×
                </button>
                <div className="tab-panel">
                  <div
                    className="tab-visual"
                    style={on ? { backgroundImage: cssUrl(craft.image) } : undefined}
                  />
                  <div className="tab-copy">
                    <p className="eyebrow">What we provide</p>
                    <h2>{craft.title}</h2>
                    <p className="lede">{craft.strap}</p>
                    <div className="split-mini">
                      <div>
                        <h3>You leave with</h3>
                        <ul>{craft.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
                      </div>
                      <div>
                        <h3>How it runs</h3>
                        <ol>{craft.steps.map((item) => <li key={item}>{item}</li>)}</ol>
                      </div>
                    </div>
                    {serviceSlug === "production" && (
                      <Link className="button" href={craftHref("production", craft.slug)}>Open full page <span>↗</span></Link>
                    )}
                    <Link className="text-link" href={`/contact?service=${serviceSlug}`}>Enquire about {craft.title} ↗</Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
