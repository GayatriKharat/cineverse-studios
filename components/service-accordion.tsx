"use client";
import { useState } from "react";

export function ServiceAccordion({ items }: { items: readonly string[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="tag-list">
      {items.map((item, index) => (
        <div className={open === index ? "tag-item open" : "tag-item"} key={item}>
          <button type="button" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index}>
            {item}
          </button>
          <div className="tag-copy">
            <p>Every {item.toLowerCase()} engagement is shaped around the audience, the brief and the outcome — with senior creative and production direction from first idea to final delivery.</p>
          </div>
        </div>
      ))}
    </div>
  );
}
