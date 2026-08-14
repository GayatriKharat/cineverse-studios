import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { navIndex } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer wrap">
      <div>
        <BrandLogo href="/" variant="dark" showTagline />
        <p>Production · Branding · Media</p>
        <p className="footer-lede">An integrated house for branding, production, talent, platforms and entertainment — from India, for anywhere the work needs to travel.</p>
      </div>
      <div className="footer-links">
        {navIndex.slice(1).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </div>
      <div>
        <p>India · International</p>
        <p>hello@narayanistudios.com</p>
        <p>{"©"} {new Date().getFullYear()} Narayani Studios LLP</p>
      </div>
    </footer>
  );
}
