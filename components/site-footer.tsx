import Link from "next/link";
import { navPrimary, services } from "@/lib/site-data";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  const companyLinks = navPrimary.filter((item) => ["Home", "About", "Contact", "Portfolio", "Resources"].includes(item.label));

  return (
    <footer className="site-footer wrap">
      <div className="site-footer-panel">
        <div className="footer-brand-column">
          <p className="footer-kicker">NARAYANI STUDIOS</p>
          <p className="footer-lede">An integrated house for branding, production, talent, platforms and entertainment — from India, for anywhere the work needs to travel.</p>
          <Link className="footer-cta" href="/contact">Start a project <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="footer-column">
          <h2>Company</h2>
          <nav className="footer-nav" aria-label="Company">
            {companyLinks.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
        </div>
        <div className="footer-column">
          <h2>Solutions</h2>
          <nav className="footer-nav" aria-label="Solutions">
            {services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.title}</Link>)}
          </nav>
        </div>
        <div className="footer-column footer-contact-column">
          <h2>Contact Information</h2>
          <p className="footer-contact-label">Studio</p>
          <p>India · International</p>
          <a href="mailto:business@narayanistudios.com">business@narayanistudios.com</a>
          <h3>Follow Us</h3>
          <SocialLinks />
        </div>
        <div className="footer-bottom">
          <span>Production · Branding · Media</span>
          <span>© {new Date().getFullYear()} Narayani Studios LLP. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
