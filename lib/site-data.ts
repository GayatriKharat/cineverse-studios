export const pillars = [
  {
    slug: "pre-production",
    code: "01",
    title: "Pre-production",
    strap: "Clarity before anyone calls action.",
    summary: "The work before the work: brand, strategy, scripts and a plan that protects the idea.",
    image: "/service-brand.png",
    items: ["Concept Development", "Creative Strategy", "Script / Content Development", "Campaign Planning", "Production Planning", "Brand Strategy"],
  },
  {
    slug: "production",
    code: "02",
    title: "Production",
    strap: "Every format. One production floor.",
    summary: "On-ground craft across film, advertising, photography, podcasts, music and branded content — not film alone.",
    image: "/film-automotive.png",
    items: ["Video Production", "Film Production", "Advertisement Production", "Branded Content", "Photography", "Podcast Production", "Music Production"],
  },
  {
    slug: "post-production",
    code: "03",
    title: "Post-production",
    strap: "Locked picture. Ready for every screen.",
    summary: "Picture, sound and finishing until every version is ready for social, broadcast, cinema or OTT.",
    image: "/service-vfx.png",
    items: ["Video Editing", "Audio Post", "Finishing", "Platform Adaptation", "Final Delivery"],
  },
] as const;

export const services = [
  ...pillars,
  {
    slug: "digital-social",
    code: "04",
    title: "Digital & Social Media",
    strap: "The feed, the community and the growth plan.",
    summary: "Social management, content strategy, publishing, community and digital growth across platforms.",
    image: "/service-motion.png",
    items: ["Social Media Management", "Content Strategy", "Digital Publishing", "Community Management", "Digital Marketing", "Digital Growth"],
  },
  {
    slug: "advertising",
    code: "05",
    title: "Advertising & Brand Content",
    strap: "Campaigns that carry a brand, not just a logo.",
    summary: "Advertising, branded content and commercial media across digital, print, broadcast and live platforms.",
    image: "/film-music.png",
    items: ["Advertising Campaigns", "Branded Campaigns", "Commercial Media", "Promotional Campaigns", "Marketing Communications"],
  },
  {
    slug: "events",
    code: "06",
    title: "Events & Experiences",
    strap: "Live rooms treated with the same care as the film.",
    summary: "Corporate events, launches, exhibitions, conferences, concerts and brand experiences, conceived and run as productions.",
    image: "/service-drone.png",
    items: ["Corporate Events", "Product Launches", "Exhibitions", "Conferences", "Live Shows", "Concerts", "Brand Experiences"],
  },
] as const;

export const house = [
  { code: "01", title: "Branding & Creative", copy: "Brand development, campaign planning, creative strategy and communication for businesses, organisations and government.", href: "/services/pre-production" },
  { code: "02", title: "Social & Digital", copy: "Platform management, publishing, community and digital growth for brands and creators.", href: "/services/digital-social" },
  { code: "03", title: "Content Production", copy: "Concept to delivery for social, advertising, podcasts, photography, film and music.", href: "/services/production" },
  { code: "04", title: "Advertising & Commercial", copy: "Campaigns and branded content across digital, print, broadcast and other media.", href: "/services/advertising" },
  { code: "05", title: "Brand Consultancy", copy: "Counsel on branding, media, creative strategy, production and growth.", href: "/about" },
  { code: "06", title: "Talent & Creators", copy: "Representation, collaborations, endorsements and commercial opportunities.", href: "/talent" },
  { code: "07", title: "Events & Experiences", copy: "Launches, exhibitions, live shows, concerts and cultural programmes.", href: "/services/events" },
  { code: "08", title: "Technology & Platforms", copy: "Websites, apps, communities, streaming and digital products for media and entertainment.", href: "/media-ip" },
  { code: "09", title: "Intellectual Property", copy: "Create, own, license and commercialise copyrights, trademarks, music, film and digital assets.", href: "/media-ip" },
  { code: "10", title: "Film & Entertainment", copy: "Films, series, OTT, music, podcasts, stage and live entertainment — produced and co-produced.", href: "/productions" },
  { code: "11", title: "Distribution & Licensing", copy: "Theatrical, television, OTT, digital and venue exploitation of owned and represented rights.", href: "/media-ip" },
  { code: "12", title: "Ventures & Partnerships", copy: "Investment, acquisition and joint ventures in media, IP and entertainment enterprises.", href: "/about" },
] as const;

export const resourceTypes = [
  { slug: "blog", title: "Blog", copy: "Notes from inside the frame — process, people and the work." },
  { slug: "articles", title: "Articles", copy: "Evergreen thinking on branding, production and culture." },
  { slug: "news", title: "News", copy: "Studio announcements, launches and updates." },
  { slug: "faqs", title: "FAQs", copy: "Straightforward answers before the first conversation." },
  { slug: "gallery", title: "Gallery", copy: "Selected stills from set, stage and the grade." },
  { slug: "testimonials", title: "Testimonials", copy: "What partners say after the work ships." },
] as const;

export const workCategories = services.map((service) => ({
  slug: service.slug,
  title: `${service.title} work`,
  code: service.code,
  projects: [
    { title: `${service.title} — Frame 01`, image: service.image },
    { title: `${service.title} — Frame 02`, image: "/film-virtual.png" },
    { title: `${service.title} — Frame 03`, image: "/service-photography.png" },
  ],
}));

export const projects = [
  { slug: "automotive-launch", type: "Advertising", service: "advertising", title: "Velocity, given a new language.", blurb: "Automotive launch film and commercial storytelling.", image: "/client/project-automotive.png", imagePosition: "center" },
  { slug: "luxury-beauty", type: "Production", service: "production", title: "Light that moves.", blurb: "A beauty film shaped around light, texture and performance.", image: "/client/project-fashion.png", imagePosition: "right center" },
  { slug: "music-performance", type: "Production", service: "production", title: "Sound, in focus.", blurb: "Music performance captured with image and rhythm in sync.", image: "/client/project-performance.png", imagePosition: "center" },
  { slug: "virtual-mountain", type: "Post-production", service: "post-production", title: "Beyond the studio wall.", blurb: "Virtual worldbuilding and finishing for a complete screen experience.", image: "/client/project-post.png", imagePosition: "center" },
] as const;

export const testimonials = [
  { quote: "A thoughtful, decisive partner from the first conversation to the final delivery.", name: "Brand Partner", scope: "Integrated campaign" },
  { quote: "The team brought real clarity to a complex brief, then made the work feel effortless.", name: "Marketing Lead", scope: "Film production" },
  { quote: "Narayani understands that beautiful creative work also needs to perform in the real world.", name: "Founder", scope: "Brand & digital" },
] as const;

export const clients = ["Brand partners", "Entertainment", "Startups", "Cultural IP", "Global teams", "Live stages", "Government"] as const;

export const faqs = [
  ["Can I hire you for just one service?", "Yes. You can bring us in for one focused requirement — from a script or edit to a social campaign — or combine divisions for an end-to-end partnership spanning branding, production, talent and distribution."],
  ["How long does a typical project take?", "Focused assignments can move in weeks. A full campaign or production usually needs two to four months from lock to delivery."],
  ["Do you work with clients outside India?", "Yes. The LLP is constituted to work with businesses, organisations, government bodies, creators and individuals in India and internationally."],
  ["How do we begin?", "Share the opportunity through the contact form. We will follow up to understand the brief, scope and timeline."],
] as const;

export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const navPrimary: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All services", href: "/services" },
      ...services.map((service) => ({ label: service.title, href: `/services/${service.slug}` })),
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "All resources", href: "/resources" },
      ...resourceTypes.map((resource) => ({ label: resource.title, href: `/resources/${resource.slug}` })),
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const navGuide = [
  { label: "About", href: "/about", hint: "Who we are, the founders and why the house exists" },
  { label: "Services", href: "/services", hint: "Pre-production, production, post — then digital, ads and live" },
  { label: "Portfolio", href: "/portfolio", hint: "Selected frames across every division" },
  { label: "Resources", href: "/resources", hint: "Blog, articles, news, FAQs, gallery and testimonials" },
  { label: "Contact", href: "/contact", hint: "Start a brief — one service or the full chain" },
] as const;

export const navIndex = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Portfolio", "/portfolio"],
  ["Resources", "/resources"],
  ["Contact", "/contact"],
  ["Team", "/team"],
  ["Productions", "/productions"],
  ["Talent", "/talent"],
  ["Media & IP", "/media-ip"],
  ["FAQ", "/faq"],
] as const;
