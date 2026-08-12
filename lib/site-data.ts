export const services = [
  { slug: "pre-production", number: "01", title: "Pre-production", strap: "Plan with purpose. Create with intent.", image: "/service-brand.png", items: ["Concept Development", "Creative Strategy", "Script / Content Development", "Campaign Planning", "Production Planning", "Brand Strategy"] },
  { slug: "production", number: "02", title: "Production", strap: "Bring ideas to life. Capture stories that matter.", image: "/film-automotive.png", items: ["Video Production", "Film Production", "Advertisement Production", "Branded Content", "Photography", "Podcast Production", "Music Production"] },
  { slug: "post-production", number: "03", title: "Post-production", strap: "Refine every detail. Deliver excellence.", image: "/service-vfx.png", items: ["Video Editing", "Audio Post", "Finishing", "Platform Adaptation", "Final Delivery"] },
  { slug: "digital-social", number: "04", title: "Digital & Social Media", strap: "Engage audiences. Build communities. Drive growth.", image: "/service-motion.png", items: ["Social Media Management", "Content Strategy", "Digital Publishing", "Community Management", "Digital Marketing", "Digital Growth"] },
  { slug: "advertising", number: "05", title: "Advertising & Brand Content", strap: "Powerful campaigns. Stronger brands.", image: "/film-music.png", items: ["Advertising Campaigns", "Branded Campaigns", "Commercial Media", "Promotional Campaigns", "Marketing Communications"] },
  { slug: "events", number: "06", title: "Events & Experiences", strap: "Create moments. Inspire connections.", image: "/service-drone.png", items: ["Corporate Events", "Product Launches", "Exhibitions", "Conferences", "Live Shows", "Concerts", "Brand Experiences"] },
] as const;

export const resourceTypes = [
  { slug: "blog", title: "Blog", copy: "Notes from the studio, our process and the people who make the work." },
  { slug: "articles", title: "Articles", copy: "Evergreen thinking on branding, production and culture." },
  { slug: "news", title: "News", copy: "News, announcements and moments from Narayani Studios." },
  { slug: "faqs", title: "FAQs", copy: "Straightforward answers before we start a conversation." },
  { slug: "gallery", title: "Gallery", copy: "A visual record of ideas in motion, on set and in the world." },
  { slug: "testimonials", title: "Testimonials", copy: "Words from clients and collaborators who have made the work with us." },
] as const;

export const workCategories = ["Brand Films", "Advertising", "Digital & Social", "Music & Entertainment", "Events & Experiences", "Photography"];
