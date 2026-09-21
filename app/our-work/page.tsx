import Link from "next/link";
import { CtaBand, PageHero } from "@/components/page-hero";
import { WorkShowcase } from "@/components/work-showcase";

export default function OurWork() {
  return (
    <main>
      <PageHero
        title={
          <>
            Selected <em>frames<span className="title-stop">.</span></em>
          </>
        }
        copy="Work made for brands, creators and stages, stills from the floor, not a stock gallery."
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
      <WorkShowcase />
      <CtaBand
        title={
          <>
            Have an idea worth <em>making</em>
            <span className="title-stop">.</span>
          </>
        }
        subheading="Tell us the brief. We will name the stage."
        buttonText="Contact Us ↗"
        buttonHref="/contact"
      />
    </main>
  );
}
