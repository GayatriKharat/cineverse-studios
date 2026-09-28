import { Clapperboard, Layers, Sparkles, Users, Wand2, Zap } from "lucide-react";
import { CtaBand, PageHero } from "@/components/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { StudioTile, studioTileGridClass } from "@/components/studio-tile";

const whyNarayani = [
  {
    label: "01",
    title: "One roof, full craft",
    copy: "Strategy, brand, production, social, ads and events live together. You learn the whole picture, not a single silo.",
    Icon: Layers,
  },
  {
    label: "02",
    title: "Real work, real stakes",
    copy: "Client briefs, creator pipelines and live deadlines. Your craft ships to audiences, not into a drawer.",
    Icon: Clapperboard,
  },
  {
    label: "03",
    title: "Founders who still make",
    copy: "You sit close to people who have shot, edited, scripted and scaled. Feedback is sharp, honest and useful.",
    Icon: Users,
  },
  {
    label: "04",
    title: "Room to own stages",
    copy: "We grow people who can hold a brief from first idea to last impression. Ambition is welcomed, ownership is expected.",
    Icon: Sparkles,
  },
  {
    label: "05",
    title: "A house still being written",
    copy: "Join early enough to shape how the studio works. Your systems, taste and standards become part of the culture.",
    Icon: Wand2,
  },
  {
    label: "06",
    title: "Energy that matches the slate",
    copy: "Sets, suites and war rooms move fast. If you love that rhythm, you will feel at home here.",
    Icon: Zap,
  },
];

const growthTracks = [
  {
    title: "Craft depth",
    copy: "Cameras, edits, brand systems, social engines, live stages. Mentorship that sharpens the skill you came with, and the ones next to it.",
  },
  {
    title: "Creative range",
    copy: "Move across divisions when the work asks for it. Generalists stay dangerous. Specialists stay world-class.",
  },
  {
    title: "Leadership path",
    copy: "Lead a pod. Hold a client. Run a shoot day. We promote people who raise the room, not just their own reel.",
  },
];

const openRoles = [
  {
    team: "Production",
    title: "Videographer / Camera",
    note: "Own frames on set and in the field.",
  },
  {
    team: "Post",
    title: "Editor",
    note: "Cut stories that land with the audience.",
  },
  {
    team: "Brand",
    title: "Designer",
    note: "Identity, decks and visual systems that hold.",
  },
  {
    team: "Social",
    title: "Content Strategist",
    note: "Plan, ship and learn what the platform rewards.",
  },
  {
    team: "Growth",
    title: "Open application",
    note: "Do not see your role? Tell us where you belong.",
  },
];

const culture = [
  { title: "Taste first", copy: "We protect the work. Shortcuts that flatten the story do not survive review." },
  { title: "Clear handoffs", copy: "Briefs, cuts and feedback stay sharp so the next person can move without guesswork." },
  { title: "Show up ready", copy: "Deadlines are real. So is support. We push hard and we look after the room." },
  { title: "Build together", copy: "Wins are shared. Credit is named. The house gets stronger when everyone owns the frame." },
];

export default function CareersPage() {
  return (
    <main>
      <PageHero
        title={
          <>
            <span className="title-keep">Welcome to the</span>{" "}
            <em>
              <span className="title-end">team<span className="title-stop">.</span></span>
            </em>
          </>
        }
        copy="Narayani Studios is building a creative house with people who want to make work that moves. If that is you, we want to meet you."
        image={"/careers-n-hero.png?v=2"}
        actions={
          <div className="hero-actions">
            <a className="button" href="#open-roles">
              See open roles ↓
            </a>
            <a className="button-ghost" href="mailto:career@narayanistudios.com">
              Apply now
            </a>
          </div>
        }
      />

      <section className="wrap service-pillars" aria-labelledby="why-title">
        <Reveal>
          <h2 id="why-title">
            Built for people who want the <em>whole <span className="title-end">journey<span className="title-stop">.</span></span></em>
          </h2>
          <p className="section-lede" style={{ marginBottom: "8px" }}>
            Not a side desk. A seat inside an integrated studio where your craft meets the audience.
          </p>
        </Reveal>
        <Stagger className={studioTileGridClass}>
          {whyNarayani.map((item, index) => (
            <StaggerItem key={item.label}>
              <StudioTile {...item} blue={index % 2 === 1} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="about-story wrap" aria-labelledby="growth-title">
        <Reveal className="about-story-lead">
          <h2 id="growth-title">
            Grow your craft. <em>Widen your <span className="title-end">range<span className="title-stop">.</span></span></em>
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="about-story-copy">
          {growthTracks.map((track) => (
            <div key={track.title} className="who-we-are-detail">
              <span />
              <div>
                <h3 style={{ margin: "0 0 8px", fontSize: "1.35rem" }}>{track.title}</h3>
                <p style={{ margin: 0 }}>{track.copy}</p>
              </div>
            </div>
          ))}
          <p className="about-story-close">
            We do not hire for a single skill forever. We hire people who can keep rising with the slate.
          </p>
        </Reveal>
      </section>

      <section id="open-roles" className="wrap" style={{ paddingBlock: "clamp(56px, 8vw, 100px)" }} aria-labelledby="roles-title">
        <Reveal>
          <h2 id="roles-title">
            Stages waiting for the <em>right <span className="title-end">people<span className="title-stop">.</span></span></em>
          </h2>
          <p className="section-lede" style={{ marginBottom: "28px" }}>
            Roles stay live as the house grows. Apply even if the title is close, not perfect.
          </p>
        </Reveal>
        <div className="editorial-list" style={{ paddingBottom: 0 }}>
          {openRoles.map((role) => (
            <a
              key={role.title}
              href={`mailto:career@narayanistudios.com?subject=${encodeURIComponent(`Application — ${role.title}`)}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article>
                <span>{role.team}</span>
                <div>
                  <h2 style={{ margin: 0, fontSize: "clamp(1.4rem, 2.4vw, 2rem)" }}>{role.title}</h2>
                  <p style={{ margin: "6px 0 0" }}>{role.note}</p>
                </div>
                <b>Apply ↗</b>
              </article>
            </a>
          ))}
        </div>
      </section>

      <section className="who-we-are wrap" aria-labelledby="culture-title" style={{ paddingTop: "56px", paddingBottom: "56px" }}>
        <div className="who-we-are-grid">
          <Reveal>
            <h2 id="culture-title">
              The culture behind the <em>work<span className="title-stop">.</span></em>
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="who-we-are-copy">
            <p className="who-we-are-lede">
              High standards, fast rooms, and a team that cares about what leaves the house.
            </p>
            {culture.map((item) => (
              <div key={item.title} className="who-we-are-detail">
                <span />
                <p>
                  <strong>{item.title}.</strong> {item.copy}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="home-voices wrap" style={{ paddingTop: "24px", paddingBottom: "24px" }} aria-label="Careers desk">
        <Reveal>
          <article className="founding-note">
            <h2>
              Ready to join <em>Narayani <span className="title-end">Studios<span className="title-stop">.</span></span></em>
            </h2>
            <p>
              Send your CV, reel or portfolio to{" "}
              <a className="text-link" href="mailto:career@narayanistudios.com">
                career@narayanistudios.com
              </a>
              . Tell us the role you want and the work you are proud of. We read every note.
            </p>
            <a className="button founding-note-cta" href="mailto:career@narayanistudios.com">
              Email careers ↗
            </a>
          </article>
        </Reveal>
      </section>

      <CtaBand
        title={
          <>
            Build with <em>Narayani <span className="title-end">Studios<span className="title-stop">.</span></span></em>
          </>
        }
        subheading="Business briefs go to business@. Careers go to career@. Same house, clear desks."
        buttonText="Apply via career@ ↗"
        buttonHref="mailto:career@narayanistudios.com"
      />
    </main>
  );
}
