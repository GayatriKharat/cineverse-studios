"use client";
import { useState } from "react";
import { faqs } from "@/lib/site-data";

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {faqs.map(([q, a], i) => (
        <div className={open === i ? "faq open" : "faq"} key={q}>
          <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            {q}<b>{open === i ? "−" : "+"}</b>
          </button>
          <div className="faq-copy"><p>{a}</p></div>
        </div>
      ))}
    </div>
  );
}
