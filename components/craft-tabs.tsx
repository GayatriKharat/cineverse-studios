"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cssUrl } from "@/lib/asset";
import { craftHref, type Craft } from "@/lib/offerings";

export function CraftTabs({ crafts, serviceSlug }: { crafts: Craft[]; serviceSlug: string }) {
  const [active, setActive] = useState(crafts[0]?.slug ?? "");

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
                setActive(craft.slug);
                history.replaceState(null, "", `#${craft.slug}`);
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
                <div className="tab-panel">
                  <div
                    className="tab-visual"
                    style={on ? { backgroundImage: cssUrl(craft.image) } : undefined}
                  />
                  <div className="tab-copy">
                    <p className="eyebrow">What we provide</p>
                    <h2>{craft.title}</h2>
                    <p className="lede">{craft.strap}</p>
                    <p><b>The problem.</b> {craft.problem}</p>
                    <p><b>The solution.</b> {craft.solution}</p>
                    <p className="who"><b>Who it is for.</b> {craft.forWho}</p>
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
