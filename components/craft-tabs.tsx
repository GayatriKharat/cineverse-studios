"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cssUrl } from "@/lib/asset";
import type { Craft } from "@/lib/offerings";

export function CraftTabs({ crafts, serviceSlug }: { crafts: Craft[]; serviceSlug: string }) {
  const [active, setActive] = useState(crafts[0]?.slug ?? "");
  const current = crafts.find((c) => c.slug === active) ?? crafts[0];

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && crafts.some((c) => c.slug === hash)) setActive(hash);
  }, [crafts]);

  if (!current) return null;

  return (
    <div className="craft-tabs">
      <div className="tab-rail" role="tablist">
        {crafts.map((craft) => (
          <button
            key={craft.slug}
            type="button"
            role="tab"
            aria-selected={craft.slug === current.slug}
            className={craft.slug === current.slug ? "is-on" : ""}
            onClick={() => {
              setActive(craft.slug);
              history.replaceState(null, "", `#${craft.slug}`);
            }}
          >
            {craft.title}
          </button>
        ))}
      </div>
      <article className="tab-panel" id={current.slug}>
        <div className="tab-visual" style={{ backgroundImage: cssUrl(current.image) }} />
        <div className="tab-copy">
          <p className="eyebrow">What we provide</p>
          <h2>{current.title}</h2>
          <p className="lede">{current.strap}</p>
          <p>{current.solution}</p>
          <p className="who"><b>For</b> {current.forWho}</p>
          <div className="split-mini">
            <div>
              <h3>You leave with</h3>
              <ul>{current.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <h3>How it runs</h3>
              <ol>{current.steps.map((item) => <li key={item}>{item}</li>)}</ol>
            </div>
          </div>
          {serviceSlug === "production" && (
            <Link className="button" href={`/services/production/${current.slug}`}>Open full page <span>↗</span></Link>
          )}
          <Link className="text-link" href={`/contact?service=${serviceSlug}`}>Enquire about {current.title} ↗</Link>
        </div>
      </article>
    </div>
  );
}
