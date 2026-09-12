import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { SocialLinks } from "@/components/social-links";
import { cssUrl } from "@/lib/asset";

export default function Contact() {
  return (
    <main>
      <PageHero
        title={<>Get in <em>touch.</em></>}
        copy="Tell us the brief, one service or the full chain. We will name the stage and come back with a plan."
        image="/Updated Images/Let's connect.png"
        imagePosition="center bottom"
      />
      <section className="contact-layout wrap" style={{ backgroundImage: cssUrl("/Updated Images/Let's connect.png") }}>
        <div className="contact-brief">
          <h2>Get in <em>touch.</em></h2>
          <p className="section-lede">Tell us the brief, one service or the full chain. We will name the stage and come back with a plan.</p>
          <Suspense fallback={<div className="contact-form" />}>
            <ContactForm />
          </Suspense>
        </div>
        <div className="contact-direct">
          <h2>Contact us.</h2>
          <div className="contact-meta">
            <p><span>Email</span><a href="mailto:business@narayanistudios.com">business@narayanistudios.com</a></p>
            <p><span>Phone</span><a href="tel:+917447474431">+91 74474 74431</a></p>
            <div className="contact-meta-item"><span>Socials</span><SocialLinks /></div>
            <p><span>Where we work</span><b>India · International</b></p>
          </div>
        </div>
      </section>
    </main>
  );
}
