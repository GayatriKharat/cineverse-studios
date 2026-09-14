"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";

type Founder = {
  name: string;
  role: string;
  image: string;
  line: string;
  bio: string[];
  linkedin: string;
};

export function FounderCard({ person }: { person: Founder }) {
  const [expanded, setExpanded] = useState(false);
  const preview = person.bio[0];
  const rest = person.bio.slice(1);

  return (
    <article className="founder-card">
      <div className="founder-card-media">
        <img className="founder-card-photo" src={asset(person.image)} alt={person.name} />
        <div className="founder-card-credit">
          <h3>{person.name}</h3>
          <span>{person.line}</span>
        </div>
      </div>
      <div className="founder-card-panel">
        <div className={`founder-card-bio${expanded ? " is-expanded" : " is-collapsed"}`}>
          <p>{preview}</p>
          {expanded
            ? rest.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
            : null}
        </div>
        {rest.length > 0 ? (
          <button
            type="button"
            className="founder-read-more"
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        ) : null}
        <a
          className="button founder-cta"
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect on LinkedIn ↗
        </a>
      </div>
    </article>
  );
}
