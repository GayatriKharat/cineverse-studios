import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FlipCard } from "@/components/flip-card";
import { CtaBand, PageHero } from "@/components/page-hero";
import { WorkShowcase } from "@/components/work-showcase";
import { Stagger, StaggerItem } from "@/components/reveal";
import { cssUrl } from "@/lib/asset";

const pages = {
  productions: {
    eyebrow: "Productions",
    title: <>Film, music and entertainment <em>made to last.</em></>,
    copy: "Conceive, develop, produce and co-produce films, series, OTT, music, podcasts, live shows and stage work — in India and internationally.",
    image: "/film-automotive.png",
    items: [
      { title: "Film & series", copy: "Narrative and branded long-form, including co-production and acquisition." },
      { title: "Music & podcasts", copy: "Original recording, live capture and series built for audio-first audiences." },
      { title: "Live entertainment", copy: "Concerts, stage productions and shows treated as cinematic events." },
      { title: "Commercial exploitation", copy: "The work is made to travel — theatres, OTT, broadcast and stages." },
    ],
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: <>A record of worlds <em>made real.</em></>,
    copy: "Selected work spanning brand storytelling, culture, launch moments and moving image.",
    image: "/film-virtual.png",
    items: [
      { title: "Narrative films", copy: "Longer-form work built to hold attention, not fill a slot." },
      { title: "Brand platforms", copy: "Visual worlds that survive a campaign cycle." },
      { title: "Social-first series", copy: "Formats designed for the feed without looking made there." },
      { title: "Live experiences", copy: "Nights, launches and stages captured with the same care as the hero film." },
    ],
  },
  talent: {
    eyebrow: "Talent",
    title: <>Creators, artists <em>and voices.</em></>,
    copy: "Represent, manage and promote creators, artists, influencers and public personalities — collaborations, campaigns, endorsements and commercial opportunities.",
    image: "/service-photography.png",
    items: [
      { title: "Talent management", copy: "Representation that protects the work and the person." },
      { title: "Brand collaborations", copy: "Partnerships that feel inevitable, not bolted on." },
      { title: "Campaign execution", copy: "From first conversation to the last cut of the endorsement." },
      { title: "Commercial opportunities", copy: "Licensing, appearances and long-running associations." },
    ],
  },
  team: {
    eyebrow: "Team",
    title: <>A studio of sharp <em>point of view.</em></>,
    copy: "Creative direction, production leadership, brand strategy and digital — one senior team, not a relay of vendors.",
    image: "/service-documentary.png",
    items: [
      { title: "Creative direction", copy: "Taste, framing and the last five percent." },
      { title: "Production leadership", copy: "Schedules and crews that protect the idea." },
      { title: "Brand strategy", copy: "Audience, offer and cultural context before action." },
      { title: "Digital & experience", copy: "Platforms, social and live rooms after the picture is locked." },
    ],
  },
  "media-ip": {
    eyebrow: "Media & IP",
    title: <>Make it. Own it. <em>Take it further.</em></>,
    copy: "Create, acquire, license and commercialise copyrights, trademarks, film and music rights, digital assets and platforms — then distribute through theatres, television, OTT and venues.",
    image: "/service-vfx.png",
    items: [
      { title: "Original IP", copy: "Formats and worlds designed to return, not vanish after launch week." },
      { title: "Digital platforms", copy: "Websites, apps, communities, streaming and software for media." },
      { title: "Distribution & licensing", copy: "Syndication, broadcast, theatrical and digital exploitation of owned and represented rights." },
      { title: "Ventures", copy: "Investment, acquisition and joint ventures in media and entertainment enterprises." },
    ],
  },
  insights: {
    eyebrow: "Insights",
    title: <>Notes from inside <em>the frame.</em></>,
    copy: "Process, production journals and the currents we are watching — not the trends we are chasing.",
    image: "/service-motion.png",
    items: [
      { title: "Creative process", copy: "From a messy brief to a locked picture." },
      { title: "Production journals", copy: "What actually happened on set, in the volume and in the grade." },
      { title: "Culture & commentary", copy: "The currents worth making work about." },
      { title: "Studio news", copy: "Releases, collaborations and the next chapter." },
    ],
  },
} as const;

export function generateStaticParams() {
  return Object.keys(pages).map((studio) => ({ studio }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ studio: string }> }): Promise<Metadata> {
  const { studio } = await params;
  const page = pages[studio as keyof typeof pages];
  if (!page) return {};
  return { title: page.eyebrow, description: page.copy };
}

export default async function StudioPage({ params }: { params: Promise<{ studio: string }> }) {
  const { studio } = await params;
  const page = pages[studio as keyof typeof pages];
  if (!page) notFound();
  return (
    <main>
      <PageHero eyebrow={page.eyebrow} title={page.title} copy={page.copy} image={page.image} />
      {studio === "team" && (
        <section className="founders wrap">
          <p className="eyebrow">Founders</p>
          <h2>Flip a portrait.</h2>
          <Stagger className="founder-row">
            <StaggerItem>
              <FlipCard
                className="founder-flip"
                front={<><div className="portrait" style={{ backgroundImage: cssUrl("/founder-shreeraj.png?v=6") }} /><p className="eyebrow">Co-founder</p><h3>ShreeRaj Avhad</h3><span>Creative direction · Production</span></>}
                back={<div className="founder-back"><p className="eyebrow">Co-founder</p><h3>ShreeRaj Avhad</h3><p>Holds the picture from first idea to locked frame. Scripts, shoots and finishing sit in one conversation.</p><Link className="text-link" href="/contact">Start a brief ↗</Link></div>}
              />
            </StaggerItem>
            <StaggerItem>
              <FlipCard
                className="founder-flip"
                front={<><div className="portrait" style={{ backgroundImage: cssUrl("/founder-kiran.png?v=6") }} /><p className="eyebrow">Co-founder</p><h3>Kiran Dhangar</h3><span>Brand strategy · Operations</span></>}
                back={<div className="founder-back"><p className="eyebrow">Co-founder</p><h3>Kiran Dhangar</h3><p>Keeps the house commercially sharp: brand, ops and the brief that production can actually make.</p><Link className="text-link" href="/contact">Start a brief ↗</Link></div>}
              />
            </StaggerItem>
          </Stagger>
        </section>
      )}
      {studio !== "portfolio" && (
        <section className="wrap">
          <Stagger className="flip-grid two">
            {page.items.map((item, index) => (
              <StaggerItem key={item.title}>
                <FlipCard
                  className="dept-flip"
                  front={
                    <div className="pillar-back">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{item.title}</h3>
                      <p>Hover to flip</p>
                    </div>
                  }
                  back={
                    <div className="pillar-back">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                    </div>
                  }
                />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}
      {studio === "portfolio" && <WorkShowcase />}
      {studio === "insights" && (
        <section className="note wrap">
          <Link className="text-link" href="/resources">From the studio resources ↗</Link>
        </section>
      )}
      <CtaBand />
    </main>
  );
}
