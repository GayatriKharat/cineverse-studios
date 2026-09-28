import Link from "next/link";
import { CtaBand, PageHero } from "@/components/page-hero";
import { PortfolioReel } from "@/components/portfolio-reel";

export default function OurWork() {
  return (
    <main>
      <PageHero
        title={
          <>
            Selected <em>frames<span className="title-stop">.</span></em>
          </>
        }
        copy="Short form, long form, VTC and podcast work — click any card to play muted from YouTube."
        image="/portfolio-n-hero.png?v=2"
        actions={
          <div className="hero-actions">
            <a className="button" href="#work">
              Browse the work ↓
            </a>
            <Link className="button-ghost" href="/contact">
              Start a brief
            </Link>
          </div>
        }
      />
      <PortfolioReel />
      <CtaBand
        title={
          <>
            Have an idea worth <em>making<span className="title-stop">.</span></em>
          </>
        }
        subheading="Tell us the brief. We will name the stage."
        buttonText="Contact Us ↗"
        buttonHref="/contact"
      />
    </main>
  );
}
