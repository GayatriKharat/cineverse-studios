import { CtaBand, PageHero } from "@/components/page-hero";
import { WorkShowcase } from "@/components/work-showcase";

export default function OurWork() {
  return (
    <main>
      <PageHero
        eyebrow="Portfolio"
        title={<>Selected <em>frames.</em></>}
        copy="A record of worlds made for brands, stages and screens — stills from the floor, not a stock gallery."
        image="/film-virtual.png"
      />
      <WorkShowcase />
      <CtaBand title={<>Have an idea worth <em>making?</em></>} />
    </main>
  );
}
