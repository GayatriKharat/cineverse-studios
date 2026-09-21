import Link from "next/link";
import { services } from "@/lib/site-data";
import { SocialLinks } from "@/components/social-links";
import { BrandLogo } from "@/components/brand-logo";

export function SiteFooter() {
  const exploreLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="site-footer wrap">
      <div className="site-footer-panel">
        <div className="footer-brand-column">
          <div style={{ marginBottom: "16px" }}>
            <BrandLogo variant="dark" compact={false} showTagline={false} />
          </div>
          <p className="footer-tag" style={{ color: "var(--brand-blue)", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.04em", marginBottom: "8px" }}>Script to screen, under one roof.</p>
          <p className="footer-lede">An integrated house for branding, production, talent, platforms and entertainment, built to serve brands and creators anywhere in the world.</p>
          <Link className="footer-cta" href="/contact">Start a project <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="footer-column">
          <h2>Explore</h2>
          <nav className="footer-nav" aria-label="Explore">
            {exploreLinks.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
        </div>
        <div className="footer-column">
          <h2>Services</h2>
          <nav className="footer-nav" aria-label="Services">
            {services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.title}</Link>)}
          </nav>
        </div>
        <div className="footer-column footer-contact-column">
          <h2>Reach us</h2>
          <a className="footer-mail-only" href="mailto:business@narayanistudios.com">business@narayanistudios.com</a>
          <h3>Follow Us</h3>
          <SocialLinks />
        </div>
        <div className="footer-bottom">
          <span>© 2026 Narayani Studios | Pre production · Production · Post production · Digital & Social · Advertising · Events</span>
        </div>
      </div>
    </footer>
  );
}
