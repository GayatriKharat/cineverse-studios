import Link from "next/link";
import { FlipCard } from "@/components/flip-card";
import { cssUrl } from "@/lib/asset";
import { CtaBand, PageHero } from "@/components/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";

const founders = [
  {
    name: "Shreeraj Avhad",
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
        eyebrow="About · CineVerse"
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
        <p className="muted"><Link className="text-link" href="/team">Studio departments ↗</Link></p>
      </section>
      <CtaBand />
    </main>
  );
}
