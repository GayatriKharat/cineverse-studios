import Link from "next/link";
import { navPrimary, services } from "@/lib/site-data";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  const exploreLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="site-footer wrap">
      <div className="site-footer-panel">
        <div className="footer-brand-column">
          <p className="footer-kicker">NARAYANI STUDIOS</p>
          <p className="footer-tag" style={{ color: "var(--brand-blue)", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.08em", marginBottom: "8px" }}>Production · Branding · Media</p>
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
          <p className="footer-contact-label">Studio</p>
          <p>India · International</p>
          <a href="mailto:business@narayanistudios.com">business@narayanistudios.com</a>
          <a href="tel:+917447474431">+91 74474 74431</a>
          <h3>Follow Us</h3>
          <SocialLinks />
        </div>
        <div className="footer-bottom">
          <span>© 2026 Narayani Studios | Pre-production · Production · Post-production · Digital & Social · Advertising · Events</span>
        </div>
      </div>
    </footer>
  );
}
