export type ServiceItem = {
  slug: string;
  code: string;
  title: string;
  strap: string;
  summary: string;
  image: string;
  items: string[];
  aliases?: string[];
};

export const divisions: ServiceItem[] = [
  {
    slug: "strategy-consulting",
    code: "01",
    title: "Strategy & Consulting",
    strap: "Turning ideas into clear strategies and actionable plans.",
    summary: "Turning ideas into clear strategies and actionable plans.",
    image: "/Updated Images/6 services/Pre production.png",
    items: [
      "Business & Marketing Consulting",
      "Brand Positioning",
      "Creative Direction",
      "Content Strategy & Planning",
      "Launch Strategy",
      "Media Planning",
      "Growth Strategy",
    ],
    aliases: ["pre-production"],
  },
  {
    slug: "brand-development-pr",
    code: "02",
    title: "Brand Development & PR",
    strap: "Building strong identities and creating a presence people remember.",
    summary: "Building strong identities and creating a presence people remember.",
    image: "/Updated Images/6 services/Production.png",
    items: [
      "Brand Strategy & Identity",
      "Brand Development",
      "Visual Design",
      "Public Relations & Publicity",
      "Personal Branding",
      "Brand Content & Communication",
    ],
    aliases: ["brand-development", "branding"],
  },
  {
    slug: "content-production",
    code: "03",
    title: "Content & Production",
    strap: "Turning ideas into high-quality content, from concept to final output.",
    summary: "Turning ideas into high-quality content, from concept to final output.",
    image: "/Updated Images/6 services/Post Production.png",
    items: [
      "Concept & Script Development",
      "Pre-Production",
      "Video Production",
      "Photography",
      "Podcast & Audio Production",
      "Music & Entertainment Production",
      "Post-Production & Finishing",
    ],
    aliases: ["production", "post-production"],
  },
  {
    slug: "social-media-growth",
    code: "04",
    title: "Social Media & Audience Growth",
    strap: "Building your online presence, engaging audiences, and growing your reach.",
    summary: "Building your online presence, engaging audiences, and growing your reach.",
    image: "/Updated Images/6 services/Social Media.png",
    items: [
      "Social Media Management",
      "Content Creation & Publishing",
      "Platform Management",
      "Community Management",
      "Performance Marketing & Growth",
      "Creator & Personal Presence",
    ],
    aliases: ["digital-social", "social-media"],
  },
  {
    slug: "advertising-campaigns",
    code: "05",
    title: "Advertising & Campaigns",
    strap: "Creating campaigns that connect brands with the right people.",
    summary: "Creating campaigns that connect brands with the right people.",
    image: "/Updated Images/6 services/Advertising.png",
    items: [
      "Campaign Development",
      "Advertising Strategy & Creative",
      "Commercial Advertising",
      "Branded Content Campaigns",
      "Promotional Campaigns",
      "360° Campaigns",
      "Campaign Management & Optimisation",
    ],
    aliases: ["advertising"],
  },
  {
    slug: "events-experiences",
    code: "06",
    title: "Events & Experiences",
    strap: "Creating memorable experiences that bring brands and audiences together.",
    summary: "Creating memorable experiences that bring brands and audiences together.",
    image: "/Updated Images/6 services/Evants.png",
    items: [
      "Event Strategy & Concept",
      "Corporate Events",
      "Product Launches",
      "Brand Activations & Experiences",
      "Exhibitions & Conferences",
      "Live Shows & Concerts",
      "Event Production, Promotion & Content",
    ],
    aliases: ["events"],
  },
];

export const services = divisions;
export const pillars = divisions.slice(0, 3);

export function findService(slug: string): ServiceItem | undefined {
  return divisions.find((s) => s.slug === slug || (s.aliases && s.aliases.includes(slug)));
}

export const house = [
  { code: "01", title: "Strategy & Consulting", copy: "Business consulting, brand positioning, creative direction, launch and media planning.", href: "/services/strategy-consulting" },
  { code: "02", title: "Brand Development & PR", copy: "Brand strategy, visual systems, public relations, personal branding and communication.", href: "/services/brand-development-pr" },
  { code: "03", title: "Content & Production", copy: "Video, photography, podcasts, music, and Hollywood-grade post-production finishing.", href: "/services/content-production" },
  { code: "04", title: "Social Media & Growth", copy: "Full platform management, content publishing, community, and performance marketing.", href: "/services/social-media-growth" },
  { code: "05", title: "Advertising & Campaigns", copy: "Commercial advertising, branded content, promotional campaigns and 360° launches.", href: "/services/advertising-campaigns" },
  { code: "06", title: "Events & Experiences", copy: "Conferences, corporate galas, product launches, brand activations and live concerts.", href: "/services/events-experiences" },
] as const;

export const resourceTypes = [
  { slug: "blog", title: "Blog", copy: "Notes from inside the frame — process, people and the work." },
  { slug: "articles", title: "Articles", copy: "Evergreen thinking on branding, production and culture." },
  { slug: "news", title: "News", copy: "Studio announcements, launches and updates." },
  { slug: "faqs", title: "FAQs", copy: "Straightforward answers before the first conversation." },
  { slug: "gallery", title: "Gallery", copy: "Selected stills from set, stage and the grade." },
  { slug: "testimonials", title: "Testimonials", copy: "What partners say after the work ships." },
] as const;

export const resourceNavTypes = resourceTypes.filter(({ slug }) => ["articles", "faqs", "testimonials"].includes(slug));

export const workCategories = services.map((service) => ({
  slug: service.slug,
  title: `${service.title} work`,
  code: service.code,
  projects: [
    { title: `${service.title} — Frame 01`, image: service.image },
    { title: `${service.title} — Frame 02`, image: "/Updated Images/portfolio.png" },
    { title: `${service.title} — Frame 03`, image: "/Updated Images/Full white coverage.png" },
  ],
}));

export const projects = [
  { slug: "automotive-launch", type: "Advertising", service: "advertising-campaigns", title: "Velocity, given a new language.", blurb: "Automotive launch film and commercial storytelling.", image: "/Updated Images/Branding.png", imagePosition: "center" },
  { slug: "luxury-beauty", type: "Content Production", service: "content-production", title: "Light that moves.", blurb: "A beauty film shaped around light, texture and performance.", image: "/Updated Images/personal branding.png", imagePosition: "right center" },
  { slug: "music-performance", type: "Content Production", service: "content-production", title: "Sound, in focus.", blurb: "Music performance captured with image and rhythm in sync.", image: "/Updated Images/Full white coverage.png", imagePosition: "center" },
  { slug: "brand-identity-system", type: "Brand Development", service: "brand-development-pr", title: "Identities built to endure.", blurb: "Comprehensive visual systems and personal branding portfolios.", image: "/Updated Images/About us.png", imagePosition: "center" },
] as const;

export const testimonials = [
  { quote: "A thoughtful, decisive partner from the first conversation to the final delivery.", name: "Brand Partner", scope: "Integrated campaign" },
  { quote: "The team brought real clarity to a complex brief, then made the work feel effortless.", name: "Marketing Lead", scope: "Film production" },
  { quote: "Narayani understands that beautiful creative work also needs to perform in the real world.", name: "Founder", scope: "Brand & digital" },
] as const;

export const clients = ["Brands", "Creators", "Startups", "Government", "Entertainment", "Events", "Global teams"] as const;

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
      { label: "Articles", href: "/resources/articles" },
      { label: "FAQs", href: "/resources/faqs" },
      { label: "Testimonials", href: "/resources/testimonials" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const navGuide = [
  { label: "About", href: "/about", hint: "Who we are, the founders and why the house exists" },
  { label: "Services", href: "/services", hint: "Six divisions: Strategy, Brand, Production, Social, Ads, Events" },
  { label: "Portfolio", href: "/portfolio", hint: "Selected frames across every division" },
  { label: "Resources", href: "/resources", hint: "Articles, FAQs and testimonials" },
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
