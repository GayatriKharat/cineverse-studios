import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { TalkChannels } from "@/components/talk-channels";

export default function ContactPage() {
  return (
    <main>
      <section className="contact-layout wrap talk-stage is-page" aria-label="Contact the studio">
        <div className="talk-copy">
          <Reveal>
            <h1>
              Get in <em>touch.</em>
            </h1>
            <p className="section-lede">
              Tell us the brief, one service or the full chain. We will name the stage and come back with a plan.
            </p>
            <TalkChannels showLocale />
          </Reveal>
        </div>
        <Suspense fallback={<div className="contact-form talk-form" />}>
          <ContactForm />
        </Suspense>
      </section>
    </main>
  );
}
