import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { TalkChannels } from "@/components/talk-channels";

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-hero wrap" aria-label="Contact">
        <Reveal>
          <p className="contact-hero-kicker">Let&apos;s build</p>
          <h1>
            Start the <em>conversation</em><span className="title-stop">.</span>
          </h1>
          <p className="contact-hero-lede">
            One service or the full chain. Share the brief and we will map the stage, the team, and the next move.
          </p>
        </Reveal>
        <div className="contact-hero-orbit" aria-hidden="true">
          <span />
          <span />
          <i />
        </div>
      </section>

      <section className="contact-layout wrap talk-stage is-page contact-stage-creative" aria-label="Contact the studio">
        <div className="talk-copy">
          <Reveal>
            <p className="talk-eyebrow">Studio desk</p>
            <h2>
              Get in <em>touch</em><span className="title-stop">.</span>
            </h2>
            <p className="section-lede">
              Drop the vision, scope, and references. We reply with a clear plan.
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
