import Link from "next/link";
import { navPrimary } from "@/lib/site-data";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  return (
    <footer className="site-footer wrap">
      <div>
        <p>Production · Branding · Media</p>
        <p className="footer-lede">An integrated house for branding, production, talent, platforms and entertainment — from India, for anywhere the work needs to travel.</p>
      </div>
      <div className="footer-links">
        {navPrimary.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      </div>
      <div>
        <p>India · International</p>
        <p><a href="mailto:business@narayanistudios.com">business@narayanistudios.com</a></p>
        <p><a href="tel:+917447474431">+91 74474 74431</a></p>
        <SocialLinks />
        <p>{"©"} {new Date().getFullYear()} Narayani Studios LLP</p>
      </div>
    </footer>
  );
}
