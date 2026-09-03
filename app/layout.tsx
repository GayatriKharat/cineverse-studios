import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import "./noir.css";
import "./cinematic.css";
import { IntroLoader } from "@/components/intro-loader";
import { Navigation } from "@/components/navigation";
import { PageTransition } from "@/components/page-transition";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Spotlight } from "@/components/spotlight";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500", "600", "700"] });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: { default: "Narayani Studios LLP", template: "%s · Narayani Studios" },
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
        <IntroLoader />
        <ScrollProgress />
        <div className="atmosphere" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <Spotlight />
        <SmoothScroll />
        <ScrollReveal />
        <PageTransition />
        <Navigation />
        <div id="main">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
