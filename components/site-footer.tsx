import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { navPrimary } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer wrap">
      <div>
        <BrandLogo href="/" variant="dark" showTagline />
        <p>Production · Branding · Media</p>
        <p className="footer-lede">An integrated house for branding, production, talent, platforms and entertainment — from India, for anywhere the work needs to travel.</p>
      </div>
      <div className="footer-links">
        {navPrimary.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      </div>
      <div>
        <p>India · International</p>
        <p>hello@narayanistudios.com</p>
        <p>{"©"} {new Date().getFullYear()} Narayani Studios LLP</p>
      </div>
    </footer>
  );
}
