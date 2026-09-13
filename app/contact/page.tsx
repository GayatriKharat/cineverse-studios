import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/social-links";
import { cssUrl } from "@/lib/asset";

export default function Contact() {
  return (
    <main>
      <section className="contact-layout wrap" style={{ paddingTop: "120px", paddingBottom: "80px", backgroundImage: cssUrl("/Updated Images/Let's connect.png") }}>
        <div className="contact-brief">
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.02em", marginBottom: "16px", fontWeight: 700 }}>
            Get in <em>touch.</em>
          </h1>
          <p className="section-lede" style={{ marginBottom: "32px", fontSize: "1.15rem", lineHeight: 1.6, color: "var(--text-muted, #A1A1AA)" }}>
            Tell us the brief, one service or the full chain. We will name the stage and come back with a plan.
          </p>
          <Suspense fallback={<div className="contact-form" />}>
            <ContactForm />
          </Suspense>
        </div>
        <div className="contact-direct" style={{ alignSelf: "flex-start", marginTop: "20px" }}>
          <h2>Contact us.</h2>
          <div className="contact-meta" style={{ marginTop: "24px" }}>
            <p>
              <span>Email</span>
              <a href="mailto:business@narayanistudios.com">business@narayanistudios.com</a>
            </p>
            <p>
              <span>Phone</span>
              <a href="tel:+917447474431">+91 74474 74431</a>
            </p>
            <div className="contact-meta-item">
              <span>Socials</span>
              <SocialLinks />
            </div>
            <p>
              <span>Where we work</span>
              <b>India · International</b>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
