import Link from "next/link";
import { FlipCard } from "@/components/flip-card";
import { cssUrl } from "@/lib/asset";
import { CtaBand, PageHero } from "@/components/page-hero";
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
      <section className="intro wrap">
        <Reveal>
          <p className="eyebrow">Mandate</p>
          <h2>Consultancy, craft <em>and commercial range.</em></h2>
        </Reveal>
        <Reveal delay={0.1} className="body-copy">
          <p>The LLP is constituted to serve businesses, organisations, government bodies, creators and individuals in India and internationally. Branding and creative, social and digital, production, advertising, consultancy, talent, events, platforms, intellectual property, entertainment, distribution and ventures live in one house.</p>
          <p>Engage a single stage — a script, an edit, a campaign — or a joined-up partnership from strategy through licensed release.</p>
        </Reveal>
      </section>
      <section className="about-values wrap">
        <Reveal><p className="eyebrow">02 / Vision & mission</p><h2>Consultancy, craft <em>and commercial range.</em></h2></Reveal>
        <div className="about-values-grid">
          <article><span>Vision</span><h3>Make ideas move.</h3><p>Great stories deserve careful craft and a clear route from first thought to final frame.</p></article>
          <article><span>Mission</span><h3>Build the right house for the brief.</h3><p>We connect strategy, creative, production, digital and live so the work stays coherent wherever it travels.</p></article>
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
        <p className="muted"><Link className="text-link" href="/team">Studio departments ↗</Link> · <Link className="text-link" href="/services">Services ↗</Link> · <Link className="text-link" href="/contact">Contact ↗</Link></p>
      </section>
      <section className="about-story wrap">
        <Reveal><p className="eyebrow">04 / Our story</p><h2>A production house for brands, not a film studio <em>only.</em></h2></Reveal>
        <Reveal delay={0.08} className="about-story-copy"><p>We plan, shoot and finish work for business, government, creators and entertainment. Hire one craft or the full chain. Film, ads, stills, podcasts, music and live all sit on the same floor.</p><p>From India, we work with teams anywhere the work needs to travel—keeping the brief, the people and the final delivery in one conversation.</p></Reveal>
      </section>
      <section className="about-gallery wrap">
        <Reveal><p className="eyebrow">05 / Frames from the floor</p><h2>Work that holds the <em>picture.</em></h2></Reveal>
        <div className="about-gallery-grid">{["/client/project-automotive.png", "/client/project-fashion.png", "/client/project-performance.png", "/client/project-post.png"].map((image) => <div key={image} style={{ backgroundImage: cssUrl(image) }} />)}</div>
      </section>
      <CtaBand />
    </main>
  );
}
