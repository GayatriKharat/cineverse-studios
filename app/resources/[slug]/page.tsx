import { notFound } from "next/navigation";
import Link from "next/link";
import { resourceTypes } from "@/lib/site-data";
import { FaqList } from "@/components/faq-list";

const entries=["How the right production process protects the idea","Making branded content people choose to spend time with","What a clear creative brief unlocks","On building campaigns that travel across platforms"];
const gallery=["film-automotive.png","film-music.png","film-virtual.png","service-brand.png","service-documentary.png","service-drone.png","service-photography.png","service-vfx.png"];
const testimonials=[
  ["A thoughtful, decisive partner from the first conversation to the final delivery.","Brand Partner","Integrated Campaign"],
  ["The team brought real clarity to a complex brief, then made the work feel effortless.","Marketing Lead","Film Production"],
  ["Narayani understands that beautiful creative work also needs to perform in the real world.","Founder","Brand & Digital"],
];

export function generateStaticParams(){return resourceTypes.map(({slug})=>({slug}))}

export default async function ResourcePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const resource=resourceTypes.find(r=>r.slug===slug); if(!resource)notFound();
  if(slug==="faqs")return <main className="page-shell"><section className="page-hero wrap"><p className="eyebrow">Resources / FAQs</p><h1>Useful answers, <em>upfront.</em></h1></section><section className="faq-section wrap"><FaqList/></section></main>;
  if(slug==="gallery")return <main className="page-shell"><section className="page-hero wrap"><p className="eyebrow">Resources / Gallery</p><h1>Behind the <em>work.</em></h1></section><section className="gallery-grid wrap">{gallery.map((image,i)=><div key={image} style={{backgroundImage:`url(/${image})`}}><span>Frame 0{i+1}</span></div>)}</section></main>;
  if(slug==="testimonials")return <main className="page-shell"><section className="page-hero wrap"><p className="eyebrow">Resources / Testimonials</p><h1>Trusted with<br/><em>important work.</em></h1><p>Long-lasting client relationships are the best measure of a good creative partnership.</p></section><section className="testimonial-cards wrap">{testimonials.map(([quote,name,scope],i)=><article key={name}><span>0{i+1} / Client perspective</span><blockquote>“{quote}”</blockquote><footer><b>{name}</b><small>{scope}</small></footer></article>)}</section><section className="cta-band wrap"><p className="eyebrow">Your next chapter</p><h2>Make it with a team that <em>cares.</em></h2><Link className="button" href="/contact">Start a conversation <span>↗</span></Link></section></main>;
  return <main className="page-shell"><section className="page-hero wrap"><p className="eyebrow">Resources / {resource.title}</p><h1>{resource.title} from<br/>the <em>studio.</em></h1><p>{resource.copy}</p></section><section className="editorial-list wrap">{entries.map((entry,i)=><article key={entry}><span>{slug==="news"?`12.08.2026`: `0${i+1} / Insight`}</span><h2>{entry}</h2><Link href="/contact">Read more ↗</Link></article>)}</section></main>
}
