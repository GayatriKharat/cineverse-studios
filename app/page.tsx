import Link from "next/link";
import { Cursor } from "@/components/cursor";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { SmoothScroll } from "@/components/smooth-scroll";
import { services } from "@/lib/site-data";

const clients=["BRAND PARTNERS","ENTERTAINMENT","STARTUPS","CULTURAL IP","GLOBAL TEAMS"];
const work=[
  ["Brand Film", "The story starts here.", "film-automotive.png"],
  ["Campaign", "Built to move an audience.", "film-music.png"],
  ["Digital", "Ideas made for the feed.", "service-motion.png"],
] as const;

export default function Home(){return <><SmoothScroll/><Cursor/><main><Hero/>
  <section className="home-intro wrap"><Reveal><p className="eyebrow">Narayani Studios LLP</p><h2>Production, branding and media — <em>in one frame.</em></h2></Reveal><Reveal className="body-copy"><p>We create clear, memorable work for brands, people and platforms. From the first strategic thought to the final release, Narayani is your creative and production partner.</p><Link href="/about" className="text-link">Meet the studio ↗</Link></Reveal></section>
  <section className="client-strip" aria-label="Our partners"><div>{clients.concat(clients).map((client,index)=><span key={`${client}-${index}`}>{client}<i>✦</i></span>)}</div></section>
  <section className="home-services wrap"><Reveal><p className="eyebrow">Our divisions</p><h2>Everything the work needs to <em>go further.</em></h2></Reveal><div className="home-service-list">{services.map(service=><Link key={service.slug} href={`/services/${service.slug}`} className="home-service" style={{backgroundImage:`linear-gradient(90deg,#090909 18%,#09090966),url(${service.image})`}}><span>{service.number}</span><h3>{service.title}</h3><p>{service.strap}</p><b>Explore ↗</b></Link>)}</div><Link href="/services" className="text-link">View all services ↗</Link></section>
  <section className="feature-work"><div className="wrap"><Reveal><p className="eyebrow">Featured work</p><h2>Made to be seen. <em>Built to stay.</em></h2></Reveal><div className="feature-grid">{work.map(([type,title,image],index)=><Link key={title} href="/our-work" className={`feature-card feature-${index+1}`} style={{backgroundImage:`linear-gradient(0deg,#050505e6,transparent 70%),url(/${image})`}}><span>0{index+1} / {type}</span><h3>{title}</h3><b>View work ↗</b></Link>)}</div></div></section>
  <section className="home-proof wrap"><Reveal><p className="eyebrow">One connected partner</p><h2>Strategy. Craft. <em>Momentum.</em></h2></Reveal><div className="proof-grid"><div><b>06</b><span>Creative divisions</span></div><div><b>360°</b><span>End-to-end capability</span></div><div><b>India +</b><span>Global collaboration</span></div><div><b>01</b><span>Integrated team</span></div></div></section>
  <section className="home-quote wrap"><Reveal><p className="eyebrow">Our belief</p><blockquote>“The strongest brands don&apos;t interrupt culture. They <em>help create it.</em>”</blockquote><p>Narayani Studios LLP / Production · Branding · Media</p></Reveal></section>
  <section className="home-contact wrap"><p className="eyebrow">Start a conversation</p><h2>Have a story that needs <em>moving?</em></h2><p>Bring us the opportunity. We&apos;ll bring the right people, the right plan and the creative energy.</p><Link className="button" href="/contact">Start a project <span>↗</span></Link></section>
  </main></>}
