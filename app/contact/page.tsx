import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { SocialLinks } from "@/components/social-links";
import { cssUrl } from "@/lib/asset";

export default function Contact() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s make <em>what&apos;s next.</em></>}
        copy="Tell us the opportunity. We will bring the team, the plan and the craft."
        image="/ChatGPT Image Sep 3, 2026, 10_58_54 AM.png"
        imagePosition="center bottom"
      />
      <section className="contact-layout wrap" style={{ backgroundImage: cssUrl("/ChatGPT Image Sep 3, 2026, 10_58_54 AM.png") }}>
        <div className="contact-brief">
          <p className="eyebrow">Get in touch</p>
          <h2>Let&apos;s <em>talk.</em></h2>
          <p className="section-lede">Tell us the brief — one service or the full chain. We will name the stage and come back with a plan.</p>
          <Suspense fallback={<div className="contact-form" />}>
            <ContactForm />
          </Suspense>
        </div>
        <div className="contact-direct">
          <p className="eyebrow">Direct</p>
          <h2>Contact us.</h2>
          <div className="contact-meta">
            <p><span>Email</span><a href="mailto:business@narayanistudios.com">business@narayanistudios.com</a></p>
            <div className="contact-meta-item"><span>Socials</span><SocialLinks /></div>
            <p><span>Where we work</span><b>India · International</b></p>
          </div>
        </div>
      </section>
    </main>
  );
}
