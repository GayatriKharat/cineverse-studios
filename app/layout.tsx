import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import "./noir.css";
import { Cursor } from "@/components/cursor";
import { Navigation } from "@/components/navigation";
import { PageTransition } from "@/components/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: { default: "Narayani Studios LLP — CineVerse", template: "%s · Narayani Studios" },
  description: "Narayani Studios LLP is a premium cinematic production house for branding, content, talent, platforms and entertainment — in India and internationally.",
  metadataBase: new URL("https://narayanistudios.com"),
};

const publicBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable}`}>
      <body>
        <style>{`:root{--hero-still:url("${publicBase}/service-documentary.png");--aurora-still:url("${publicBase}/cinematic-aurora-hero.png");}`}</style>
        <a className="skip-link" href="#main">Skip to content</a>
        <div className="grain" aria-hidden="true" />
        <SmoothScroll />
        <Cursor />
        <PageTransition />
        <Navigation />
        <div id="main">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
