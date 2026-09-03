import Link from "next/link";
import { FlipCard } from "@/components/flip-card";
import { cssUrl } from "@/lib/asset";
import { CtaBand, PageHero } from "@/components/page-hero";
import { AnimatedStats } from "@/components/animated-stats";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";

const founders = [
  {
    name: "ShreeRaj Avhad",
    role: "Founder",
    image: "/founder-shreeraj.png?v=6",
    line: "Creative direction · Production",
    bio: "Holds the picture from first idea to locked frame. Scripts, shoots and finishing sit in one conversation so the work does not leak between rooms.",
  },
  {
    name: "Kiran Dhangar",
    role: "Co-founder",
    image: "/founder-kiran.png?v=6",
    line: "Brand strategy · Operations",
    bio: "Keeps the house commercially sharp: brand, ops and the brief that production can actually make. Taste with a timetable.",
  },
];

export default function About() {
  return (
    <main>
      <PageHero
        eyebrow="About us"
        title={<>Built to make <em>ideas move.</em></>}
        copy="Narayani Studios LLP is a production, branding and media house. We were founded on the belief that great stories deserve careful craft — from the first idea to the final frame."
        image="/cinematic-aurora-hero.png"
      />
      <section className="about-values wrap">
        <div className="about-values-copy">
          <Reveal><p className="eyebrow">02 / Vision & mission</p><h2>Consultancy, craft <em>and commercial range.</em></h2></Reveal>
        </div>
        <div className="about-values-grid">
          <article>
            <span>Vision</span><b className="value-index">01</b>
            <h3>Make ideas <em>move.</em></h3>
            <i className="value-rule" />
            <p>Great stories deserve careful craft and a clear route from first thought to final frame.</p>
            <small>IDEA → FRAME</small>
          </article>
          <article>
            <span>Mission</span><b className="value-index">02</b>
            <h3>Build the right <em>house for the brief.</em></h3>
            <i className="value-rule" />
            <p>We connect strategy, creative, production, digital and live so the work stays coherent wherever it travels.</p>
            <small>STRATEGY → IMPACT</small>
          </article>
        </div>
      </section>
      <section className="founders wrap">
        <Reveal>
          <p className="eyebrow">Founders & partners</p>
          <h2>The people who hold <em>the picture.</em></h2>
          <p className="lede">Hover a portrait to turn the card. On phone, tap once.</p>
        </Reveal>
        <Stagger className="founder-row">
          {founders.map((person) => (
            <StaggerItem key={person.name}>
              <FlipCard
                className="founder-flip"
                front={
                  <>
                    <div className="portrait" style={{ backgroundImage: cssUrl(person.image) }} />
                    <p className="eyebrow">{person.role}</p>
                    <h3>{person.name}</h3>
                    <span>{person.line}</span>
                  </>
                }
                back={
                  <div className="founder-back">
                    <p className="eyebrow">{person.role}</p>
                    <h3>{person.name}</h3>
                    <p>{person.bio}</p>
                    <Link className="text-link" href="/contact">Start a brief ↗</Link>
                  </div>
                }
              />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <section className="about-story wrap">
        <Reveal><p className="eyebrow">04 / Our story</p><h2>A production house for brands, not a film studio <em>only.</em></h2></Reveal>
        <Reveal delay={0.08} className="about-story-copy"><p>We plan, shoot and finish work for business, government, creators and entertainment. Hire one craft or the full chain. Film, ads, stills, podcasts, music and live all sit on the same floor.</p><p>From India, we work with teams anywhere the work needs to travel—keeping the brief, the people and the final delivery in one conversation.</p></Reveal>
      </section>
      <AnimatedStats stats={[{ value: 52, suffix: "+", label: "Happy clients across the globe" }, { value: 4.2, suffix: "B+", label: "Views generated across platforms", decimals: 1 }, { value: 1200, suffix: "+", label: "Content pieces created for clients" }, { value: 6400, suffix: "+", label: "Content pieces distributed" }]} />
      <CtaBand />
    </main>
  );
}
