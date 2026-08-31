import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";

export default function Contact() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s make <em>what&apos;s next.</em></>}
        copy="Tell us the opportunity. We will bring the team, the plan and the craft."
      />
      <section className="contact-layout wrap">
        <div>
          <p className="eyebrow">Direct</p>
          <h2>A good brief is a great <em>beginning.</em></h2>
          <div className="contact-meta">
            <p><span>Partners</span><b>ShreeRaj Avhad · Kiran Dhangar</b></p>
            <p><span>Working from</span><b>India · International</b></p>
            <p><span>Studio</span><b>business@narayanistudios.com</b></p>
          </div>
        </div>
        <Suspense fallback={<div className="contact-form" />}>
          <ContactForm />
        </Suspense>
      </section>
    </main>
  );
}
