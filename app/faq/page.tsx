import Link from "next/link";
import { CtaBand, PageHero } from "@/components/page-hero";
import { FaqList } from "@/components/faq-list";

export default function FaqPage() {
  return (
    <main>
      <PageHero
        eyebrow="FAQ"
        title={<>Useful answers, <em>upfront.</em></>}
        copy="How the house works — one service or the full chain, in India and internationally."
      />
      <section className="faq-section wrap">
        <FaqList />
        <p><Link className="text-link" href="/contact">Still need a person? Contact us ↗</Link></p>
      </section>
      <CtaBand />
    </main>
  );
}
