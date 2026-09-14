import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/social-links";

export default function Contact() {
  return (
    <main>
      <section className="contact-layout wrap" style={{ paddingTop: "140px", paddingBottom: "100px" }}>
        <div className="contact-brief">
          <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700, color: "var(--brand-gold, #F5B400)", display: "block", marginBottom: "12px" }}>
            ✦ Direct Studio Connection
          </span>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.02em", marginBottom: "16px", fontWeight: 700 }}>
            Get in <em>touch.</em>
          </h1>
          <p className="section-lede" style={{ marginBottom: "32px", fontSize: "1.15rem", lineHeight: 1.6, color: "var(--text-muted, #A1A1AA)" }}>
            Tell us the brief, one service or the full chain. We will name the stage and come back with a precise plan within 2 hours.
          </p>
          <Suspense fallback={<div className="contact-form" />}>
            <ContactForm />
          </Suspense>
        </div>
        <div className="contact-direct" style={{ alignSelf: "flex-start", marginTop: "20px" }}>
          <h2>Connect direct.</h2>
          <div className="contact-meta" style={{ marginTop: "24px" }}>
            <p>
              <span>Email</span>
              <a href="mailto:business@narayanistudios.com">business@narayanistudios.com</a>
            </p>
            <p>
              <span>Phone</span>
              <a href="tel:+917447474431">+91 74474 74431</a>
            </p>
            <div className="contact-meta-item" style={{ marginTop: "16px" }}>
              <span>Socials</span>
              <SocialLinks />
            </div>
            <p style={{ marginTop: "16px" }}>
              <span>Where we work</span>
              <b>India · International</b>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
