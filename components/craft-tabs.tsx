"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { splitCraftCopy } from "@/lib/craft-copy";
import { type Craft } from "@/lib/offerings";

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
        const { lead, body } = splitCraftCopy(craft.strap, craft.description || craft.strap);
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
                <div className="tab-panel is-no-image is-text-only">
                  <div className="tab-copy">
                    <h2>{craft.title}</h2>
                    {lead ? <p className="craft-lead-line">{lead}</p> : null}
                    {body ? (
                      <p className="lede craft-body-copy">{body}</p>
                    ) : null}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
                      <Link className="button" href={`/contact?service=${encodeURIComponent(serviceSlug)}&subservice=${encodeURIComponent(craft.title)}`}>
                        Enquire about {craft.title} ↗
                      </Link>
                    </div>
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
