import Link from "next/link";
import { resourceTypes } from "@/lib/site-data";
export default function Resources(){return <main className="page-shell"><section className="page-hero wrap"><p className="eyebrow">Resources</p><h1>From the <em>studio.</em></h1><p>Thoughts, news and practical material for people making culture-moving work.</p></section><section className="resource-grid wrap">{resourceTypes.map((r,i)=><Link href={`/resources/${r.slug}`} key={r.slug} className="resource-card"><span>0{i+1}</span><h2>{r.title}</h2><p>{r.copy}</p><b>Explore ↗</b></Link>)}</section></main>}
