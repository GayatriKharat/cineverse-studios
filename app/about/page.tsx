import Link from "next/link";
import { CtaBand, PageHero } from "@/components/page-hero";
import { AnimatedStats } from "@/components/animated-stats";
import { FounderCard } from "@/components/founder-card";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import styles from "./about-values.module.css";

const founders = [
  {
    name: "Shreeraj Avhad",
    role: "Co-Founder & CEO",
    image: "/images/shreeraj-avhad.jpg",
    line: "Co-Founder & CEO",
    bio: [
      "Shreeraj started working as a graphic designer at just 13 years old. From there, his skills grew naturally, one after another. He picked up photography to shoot better visuals. Then videography, to bring those visuals to life. Then video editing, to shape the footage into a story. Then scripting, to plan that story before the camera even rolled. Then social media and content strategy, to make sure the finished work actually reached people.",
      "Each new skill came from a real need, not from trying to add more to his resume. Over time, this gave him something rare: experience across the entire journey of content, from the very first idea to the moment it reaches an audience. Most people in this industry specialize in one part of that journey. Shreeraj has worked through nearly all of it himself.",
      "He also holds a BCA degree, which gives him a solid understanding of the technology behind modern content, useful in a world where platforms and algorithms shape reach as much as the content itself.",
      "The scale of his work backs this up. He has worked with some of the industry’s biggest creators, on content that has crossed billions of views and reached millions of people, across thousands of pieces of content. That kind of experience isn’t built overnight. It comes from making thousands of real decisions, on real deadlines, about what to shoot, how to edit it, and when to post it.",
      "This experience shapes how Narayani Studios works. Most production houses split a project across many hands: one team for strategy, another for the shoot, another for editing, another for distribution. The client is left managing the gaps between them. Because Shreeraj has personally done every one of these jobs, Narayani Studios is built to handle a project from start to finish, without those gaps.",
    ],
    linkedin: "https://www.linkedin.com/in/shreerajavhad/",
  },
  {
    name: "Kiran Dhangar",
    role: "Co-Founder & COO",
    image: "/images/kiran-dhangar.jpg",
    line: "Co-Founder & COO",
    bio: [
      "Kiran took an unusual path to get here. He completed his MTech at IIT Gandhinagar and graduated with an institute gold medal, a result that could have led him into research or a typical technical career. Instead, he chose to build a career in editing and content production.",
      "He picked up editing quickly, and went on to work with some of the industry’s top creators, on content that has also crossed billions of views. That speed came from the same habit that helped him succeed at IIT: breaking a process down into simple parts, figuring out what really matters, and improving that one thing well.",
      "This habit is exactly what carried over into his current role. Kiran is skilled at spotting small problems before they become big ones, a scheduling delay before it causes a bottleneck, a handoff that’s about to go wrong, a process that works fine today but won’t hold up as the studio grows. He fixes these issues early, before they affect the final work.",
      "This is, at its core, what a Chief Operating Officer does. And because Kiran has worked hands-on in editing himself, he understands how creative teams actually work, not just how a process looks on paper. That makes the systems he builds at Narayani Studios practical and easy to follow, which matters more as the studio takes on more projects at once.",
    ],
    linkedin: "https://www.linkedin.com/in/kiran-dhangar-492b19115/",
  },
];

export default function About() {
  return (
    <main>
      <PageHero
        title={<>Built to make <em>ideas move.</em></>}
        copy="Where every story gets the craft it deserves."
        image="/about-n-hero.png"
        actions={
          <div className="hero-actions" style={{ marginTop: "24px" }}>
            <Link className="button" href="/contact">Contact Us</Link>
          </div>
        }
      />

      <section className={styles.purpose} aria-labelledby="purpose-title">
        <div className={styles.ambient} aria-hidden="true" />
        <div className={styles.gridLines} aria-hidden="true" />

        <div className={styles.header}>
          <span className={styles.kicker}>ONE ECOSYSTEM</span>
        </div>

        <div className={styles.stage}>
          <article className={`${styles.card} ${styles.vision}`}>
            <div className={styles.cardGlow} aria-hidden="true" />
            <div className={styles.cardTop}>
              <span className={styles.cardLabel}>OUR VISION</span>
              <span className={styles.cardDot} aria-hidden="true">●</span>
            </div>
            <div className={styles.icon} aria-hidden="true">◉</div>
            <h3>To build the world&apos;s most admired <em>creative ecosystem.</em></h3>
            <div className={styles.rule} />
            <p>Where great ideas find their voice, ambition finds its stage, and every collaboration becomes a mark of distinction.</p>
            <small>VOICE <b>→</b> STAGE</small>
          </article>

          <div className={styles.center}>
            <div className={styles.orbit} aria-hidden="true">
              <span />
              <i />
            </div>
            <div className={styles.centerContent}>
              <h2 id="purpose-title">One ecosystem.<br /><em>Limitless</em> creative directions.</h2>
              <p className={styles.centerSub}><strong>Together under one roof.</strong></p>
              <div className={styles.centerLine} aria-hidden="true" />
              <span className={styles.centerNote}>ONE<br />ECOSYSTEM</span>
            </div>
          </div>

          <article className={`${styles.card} ${styles.mission}`}>
            <div className={styles.cardGlow} aria-hidden="true" />
            <div className={styles.cardTop}>
              <span className={styles.cardLabel}>OUR MISSION</span>
              <span className={styles.cardDot} aria-hidden="true">●</span>
            </div>
            <div className={styles.icon} aria-hidden="true">◎</div>
            <h3>To bring strategy, creativity, production, branding and distribution <em>together.</em></h3>
            <div className={styles.rule} />
            <p>Turning ideas into identities the world remembers.</p>
            <small>IDEA <b>→</b> IDENTITY</small>
          </article>
        </div>
      </section>

      <section className="founders wrap" aria-labelledby="founders-title">
        <Reveal>
          <h2 id="founders-title">The people who hold <em>the picture.</em></h2>
          <p className="lede">Meet the partners behind Narayani Studios.</p>
        </Reveal>
        <Stagger className="founder-row">
          {founders.map((person) => (
            <StaggerItem key={person.name}>
              <FounderCard person={person} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="about-story wrap" aria-labelledby="story-title">
        <Reveal className="about-story-lead">
          <p className="founders-eyebrow">Origin</p>
          <h2 id="story-title">How Narayani Studios <em>started.</em></h2>
        </Reveal>
        <Reveal delay={0.08} className="about-story-copy">
          <p>Shreeraj Avhad and Kiran Dhangar have worked together since 2024, across a wide range of projects. Along the way, working with creators, brands, and other people in the industry, we kept running into the same problem.</p>
          <p>To get one project done properly, clients often had to coordinate with multiple people or teams for different parts of the process. That made everything more complicated, and it showed in the final result too, the quality and consistency of the work suffered because no one was looking after the whole thing.</p>
          <p>That’s what made us realise there was an opportunity to build something different. Between us, we had experience across creative, content, production, technology, and execution. Bringing that together meant we could offer something more complete, a solution where creators and brands wouldn’t need to manage separate teams for every part of their work.</p>
          <p className="about-story-close">That idea became Narayani Studios: a complete creative ecosystem under one roof, built to take an idea from the very start, through creation and execution, all the way to the audience it’s meant to reach.</p>
        </Reveal>
      </section>

      <AnimatedStats stats={[{ value: 52, suffix: "+", label: "Happy clients across the globe" }, { value: 4.2, suffix: "B+", label: "Views generated across platforms", decimals: 1 }, { value: 1200, suffix: "+", label: "Content pieces created for clients" }, { value: 6400, suffix: "+", label: "Content pieces distributed" }]} />
      <CtaBand title={<>Start your project with <em>Narayani Studios.</em></>} buttonText="Contact Us ↗" buttonHref="/contact" />
    </main>
  );
}
