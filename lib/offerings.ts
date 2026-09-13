export type Craft = {
  slug: string;
  title: string;
  strap: string;
  description: string;
  forWho?: string;
  problem?: string;
  solution?: string;
  deliverables?: string[];
  steps?: string[];
  image: string;
};

export const strategyCrafts: Craft[] = [
  {
    slug: "business-marketing-consulting",
    title: "Business & Marketing Consulting",
    strap: "A clear business and marketing direction helps you make better decisions.",
    description:
      "A clear business and marketing direction helps you make better decisions and focus your effort where it matters most. We help you understand your goals, spot the right opportunities, and build practical strategies for growth.",
    forWho: "Founders, marketing directors, and business leads seeking clear market direction.",
    problem: "Scattered marketing tactics with no unified business strategy or measurable growth direction.",
    solution: "We audit goals, identify high-leverage opportunities, and build actionable roadmaps for sustainable growth.",
    deliverables: ["Market Opportunity Audit", "Strategic Growth Roadmap", "Resource & Channel Plan"],
    steps: ["Goal Assessment", "Market Discovery", "Strategy Formulation", "Execution Plan"],
    image: "/service-brand.png",
  },
  {
    slug: "brand-positioning",
    title: "Brand Positioning",
    strap: "Strong positioning helps people understand what you stand for.",
    description:
      "Strong positioning helps people understand what you stand for and why they should choose you. We define your unique place in the market and create a clear positioning that sets you apart.",
    forWho: "Brands navigating competitive markets or preparing for a defining expansion.",
    problem: "Being perceived as interchangeable with competitors, leading to pricing pressure and low recall.",
    solution: "We articulate your unique market space, core value proposition, and compelling reasons to believe.",
    deliverables: ["Positioning Framework", "Competitive Whitespace Matrix", "Value Proposition Statement"],
    steps: ["Landscape Analysis", "Audience Resonance Study", "Positioning Architecture", "Brand Narrative"],
    image: "/Updated Images/Branding.png",
  },
  {
    slug: "creative-direction",
    title: "Creative Direction",
    strap: "Good ideas need the right creative direction to become impactful.",
    description:
      "Good ideas need the right creative direction to become consistent and impactful. We develop the creative approach, visual language and overall direction that bring your brand and content to life.",
    forWho: "Brands and campaigns requiring a singular aesthetic voice across multiple mediums.",
    problem: "Disconnected creative outputs where design, video, and copy feel like they come from different companies.",
    solution: "We establish the creative North Star, tone of voice, visual codes, and guidelines that align every asset.",
    deliverables: ["Creative Direction Bible", "Visual Language Moodboards", "Tone & Style Guide"],
    steps: ["Creative Immersion", "Concept Exploration", "Guideline Definition", "Production Oversight"],
    image: "/service-motion.png",
  },
  {
    slug: "content-strategy-planning",
    title: "Content Strategy & Planning",
    strap: "Consistent content works best when it has a clear purpose and direction.",
    description:
      "Consistent content works best when it has a clear purpose and direction. We plan what to create, where to use it, who it should reach, and how it supports your larger goals.",
    forWho: "Marketing teams wanting an editorial engine that builds audience and supports commercial goals.",
    problem: "Publishing ad-hoc content without editorial pillars, measurable outcomes, or channel synergy.",
    solution: "We develop comprehensive content pillars, distribution calendars, and audience touchpoint maps.",
    deliverables: ["Quarterly Content Strategy", "Editorial Calendar", "Format & Channel Matrix"],
    steps: ["Audience Intent Mapping", "Pillar Definition", "Calendar Architecture", "Performance Review"],
    image: "/service-documentary.png",
  },
  {
    slug: "launch-strategy",
    title: "Launch Strategy",
    strap: "A strong launch makes the difference between being noticed and overlooked.",
    description:
      "A strong launch can make the difference between being noticed and being overlooked. We plan the messaging, content, channels, campaigns and activities that make that launch focused and effective.",
    forWho: "Companies introducing new products, services, or sub-brands to market.",
    problem: "Launches that fizzle after day one due to fragmented messaging and poor sequence planning.",
    solution: "We architect phased launch schedules covering teaser, reveal, conversion, and sustain beats.",
    deliverables: ["Phased Launch Plan", "Channel Rollout Schedule", "Media & Partner Activation Briefs"],
    steps: ["Phase Planning", "Asset Orchestration", "Rollout Coordination", "Momentum Sustainment"],
    image: "/film-music.png",
  },
  {
    slug: "media-planning",
    title: "Media Planning",
    strap: "Reaching the right audience takes more than being present everywhere.",
    description:
      "Reaching the right audience takes more than simply being present everywhere. We plan the platforms, channels, budgets and timing that make your communication more effective.",
    forWho: "Brands looking to maximize media budget efficiency across digital and traditional touchpoints.",
    problem: "Budget bleed caused by arbitrary channel selection and ill-timed campaign flights.",
    solution: "Data-driven media allocation across digital, programmatic, influencer, and offline networks.",
    deliverables: ["Media Mix Plan", "Flight Schedules", "Budget Optimization Matrix"],
    steps: ["Channel Performance Audit", "Budget Modeling", "Flight Timing", "Attribution Setup"],
    image: "/film-virtual.png",
  },
  {
    slug: "growth-strategy",
    title: "Growth Strategy",
    strap: "Sustainable growth needs a clear understanding of priorities.",
    description:
      "Sustainable growth needs a clear understanding of where you are and where you want to go. We identify the opportunities, priorities and practical steps that help brands, creators and businesses grow.",
    forWho: "Brands and creators scaling audience, revenue, and market presence.",
    problem: "Stagnating growth loops and reliance on unsustainable one-off traffic spikes.",
    solution: "Systematic acquisition, retention, and brand loyalty mechanisms designed to compound over time.",
    deliverables: ["Growth Hypothesis Backlog", "Conversion Funnel Map", "Retention Framework"],
    steps: ["Funnel Diagnostics", "Opportunity Scoring", "Test & Learn Sprints", "Scale Playbook"],
    image: "/service-brand.png",
  },
];

export const brandCrafts: Craft[] = [
  {
    slug: "brand-strategy-identity",
    title: "Brand Strategy & Identity",
    strap: "A strong brand needs a clear foundation and consistent identity.",
    description:
      "A strong brand needs a clear foundation and a consistent identity. We shape your brand strategy, define its personality and direction, and build an identity people can recognise and connect with.",
    forWho: "Emerging businesses and established brands needing a recognizable, enduring identity.",
    problem: "Generic aesthetics that lack emotional resonance and fail to establish lasting recall.",
    solution: "Comprehensive brand strategy paired with distinct visual identity systems crafted for modern platforms.",
    deliverables: ["Brand Identity Guide", "Logomark & Typographic System", "Brand Personality Deck"],
    steps: ["Strategy Lock", "Identity Concepts", "System Finalization", "Application Guidelines"],
    image: "/Updated Images/Branding.png",
  },
  {
    slug: "brand-development",
    title: "Brand Development",
    strap: "Building a brand is more than creating a logo.",
    description:
      "Building a brand is more than creating a logo. We develop the key elements that shape how your brand looks, feels and presents itself across every touchpoint.",
    forWho: "Companies scaling into new markets, products, or brand touchpoints.",
    problem: "A static logo that fails to translate across physical, digital, packaging, and spatial environments.",
    solution: "We build living brand ecosystems that adapt seamlessly across every customer touchpoint.",
    deliverables: ["Brand Application Suite", "Packaging & Environmental Assets", "Collateral Templates"],
    steps: ["Touchpoint Mapping", "Design Prototyping", "Asset Crafting", "Implementation"],
    image: "/Updated Images/personal branding.png",
  },
  {
    slug: "visual-design",
    title: "Visual Design",
    strap: "Good visual design makes a brand easier to recognise and remember.",
    description:
      "Good visual design makes a brand easier to recognise and remember. We build visual systems and design assets that stay consistent across digital, print, campaigns and everything else.",
    forWho: "Organizations requiring high-caliber graphic systems and design collateral.",
    problem: "Inconsistent visual assets that dilute brand equity and confuse target audiences.",
    solution: "High-precision graphic design systems across print, digital, presentations, and product packaging.",
    deliverables: ["Design System", "Campaign Visual Toolkits", "Brand Asset Library"],
    steps: ["Visual Audit", "Design Language Development", "System Standardization", "Asset Delivery"],
    image: "/service-motion.png",
  },
  {
    slug: "public-relations-publicity",
    title: "Public Relations & Publicity",
    strap: "Being seen is important, but being seen the right way matters more.",
    description:
      "Being seen is important, but being seen the right way matters more. We build PR and publicity strategies that create awareness and put your brand, work or story in front of the right audiences.",
    forWho: "Brands, leadership teams, and cultural projects seeking meaningful earned media.",
    problem: "Press releases that receive no pickup and PR efforts disconnected from brand narrative.",
    solution: "Targeted media relations, strategic press angles, and high-impact storytelling pitched to premier outlets.",
    deliverables: ["PR Narrative Angle Kit", "Press Releases & Media Pack", "Tier-1 Media Outreach"],
    steps: ["Story Angle Development", "Media List Curation", "Pitch Execution", "Coverage Reporting"],
    image: "/Updated Images/About us.png",
  },
  {
    slug: "personal-branding",
    title: "Personal Branding",
    strap: "A strong personal brand helps people understand what you bring to the table.",
    description:
      "A strong personal brand helps people understand who you are, what you represent and what you bring to the table. We help founders, creators, artists and public personalities build a clear, consistent public presence.",
    forWho: "Founders, creators, artists, and executives wanting to build an authoritative public profile.",
    problem: "Exceptional expertise that goes unnoticed due to lack of a focused personal brand platform.",
    solution: "Executive profiling, signature content themes, speechwriting, and curated social positioning.",
    deliverables: ["Executive Positioning Guide", "Thought Leadership Pillars", "Signature Social Profiles"],
    steps: ["Leader Discovery Interview", "Pillar Definition", "Profile Optimization", "Cadence Planning"],
    image: "/Updated Images/personal branding.png",
  },
  {
    slug: "brand-content-communication",
    title: "Brand Content & Communication",
    strap: "Every piece of communication shapes how people see your brand.",
    description:
      "Every piece of communication shapes how people see your brand. We develop the content, messaging and communication that keep your voice clear and consistent across platforms.",
    forWho: "Brands aiming for authoritative, unmistakable communication across corporate and consumer channels.",
    problem: "Mismatched tone between marketing, support, investor relations, and external PR.",
    solution: "Unified tone-of-voice frameworks and core brand messaging suites that resonate deeply.",
    deliverables: ["Brand Voice Guide", "Core Messaging Architecture", "Key Phraseology Glossary"],
    steps: ["Voice Audit", "Tone Calibration", "Sample Messaging", "Team Enablement"],
    image: "/service-documentary.png",
  },
];

export const contentProductionCrafts: Craft[] = [
  {
    slug: "concept-script-development",
    title: "Concept & Script Development",
    strap: "Every strong piece of content starts with a strong idea.",
    description:
      "Every strong piece of content starts with a strong idea. We develop the concepts, stories, scripts and creative treatments that give your content a clear direction and purpose.",
    forWho: "Brands, agencies, and creators needing production-ready scripts and treatments.",
    problem: "Scripts written to be read rather than shot, or ideas with no cinematic narrative arc.",
    solution: "Screenwriters and directors collaborating to write visual, platform-aware scripts built for the camera.",
    deliverables: ["Director Treatment", "Shooting Script", "Storyboards & Beat Sheets"],
    steps: ["Ideation & Room", "Beat Outline", "Script Writing", "Director Table Read"],
    image: "/service-documentary.png",
  },
  {
    slug: "pre-production",
    title: "Pre-Production",
    strap: "Good planning makes production smoother and more effective.",
    description:
      "Good planning makes production smoother and more effective. We handle casting, locations, crew, schedules, production design and every other detail needed to prepare a project.",
    forWho: "Any film, commercial, podcast, or photography shoot preparing for principal capture.",
    problem: "Shoot day chaos caused by inadequate scheduling, missing permits, or unvetted casting.",
    solution: "Rigorous producer-led preparation: call sheets, technical recces, talent locks, and contingency planning.",
    deliverables: ["Production Bible", "Location & Tech Recce Notes", "Talent Locks & Call Sheets"],
    steps: ["Casting & Location Scout", "Tech Recce", "PPM Meeting", "Final Shoot Schedule"],
    image: "/Updated Images/6 services/Pre production.png",
  },
  {
    slug: "video-production",
    title: "Video Production",
    strap: "The right production brings a creative vision to life.",
    description:
      "The right production brings a creative vision to life. We manage and execute video shoots for brand content, ads, social media, films and other digital productions.",
    forWho: "Brands and organisations needing world-class moving image across digital, commercial, or narrative.",
    problem: "Low-end video that damages brand perception or cinematic bloat with no platform readiness.",
    solution: "Full-scale production crew, cinema cameras, precision lighting, and agile sets delivering multi-format masters.",
    deliverables: ["Cinematic 4K/6K Raw Capture", "Master Edits", "Platform Aspect Cuts"],
    steps: ["Production Setup", "Principal Photography", "Sound & Stills Capture", "DIT Handover"],
    image: "/Updated Images/6 services/Production.png",
  },
  {
    slug: "photography",
    title: "Photography",
    strap: "Strong photography helps brands, people and products make a better impression.",
    description:
      "Strong photography helps brands, people and products make a better impression. We shoot professional photography for campaigns, products, events, portraits, social media and other creative needs.",
    forWho: "Fashion, commercial, product, corporate, and lifestyle campaigns.",
    problem: "Stock photography disconnects or stills shot without matching the cinematic campaign world.",
    solution: "Editorial and commercial photography captured with the same lighting and aesthetic as our films.",
    deliverables: ["High-Res Retouched Masters", "Digital Asset Library", "Web & Social crops"],
    steps: ["Mood & Lighting Setup", "Shoot Execution", "Digital Culling", "Master Retouching"],
    image: "/Updated Images/portfolio.png",
  },
  {
    slug: "podcast-audio-production",
    title: "Podcast & Audio Production",
    strap: "Good audio content needs more than a recording.",
    description:
      "Good audio content needs more than a recording. We develop, record, produce and finish podcasts and other audio content with the right creative and technical approach.",
    forWho: "Brands, thought leaders, and publishers launching or scaling high-reputation podcasts.",
    problem: "Hollow-sounding audio in improvised rooms with no show format or retention dynamics.",
    solution: "Multi-mic studio capture, custom audio sonic branding, dynamic host-guest format pacing, and distribution.",
    deliverables: ["Mastered Audio (Broadcast Spec)", "Video Podcast Multi-cam Cut", "Social Snippets"],
    steps: ["Format Engineering", "Studio Recording", "Audio Cleaning & Mix", "Show Package"],
    image: "/Updated Images/6 services/Post Production.png",
  },
  {
    slug: "music-entertainment-production",
    title: "Music & Entertainment Production",
    strap: "From music to entertainment content, we bring ideas into production.",
    description:
      "From music to entertainment content, we bring creative ideas into production. We work across music, films, web series and live entertainment to develop and produce engaging experiences.",
    forWho: "Artists, record labels, streaming platforms, and brand entertainment ventures.",
    problem: "Relying on generic stock tracks that lack emotional resonance or narrative connection.",
    solution: "Original scoring, music videos, artist EPKs, web series production, and soundtrack design.",
    deliverables: ["Original Score / Track", "Broadcast Stems", "Music Video Masters"],
    steps: ["Brief & Spotting", "Composition & Recording", "Mixing to Picture", "Mastering"],
    image: "/film-music.png",
  },
  {
    slug: "post-production-finishing",
    title: "Post-Production & Finishing",
    strap: "The final stage is where everything comes together.",
    description:
      "The final stage is where everything comes together. We handle editing, colour grading, motion graphics, VFX, sound, animation, mastering and final adaptations to deliver polished, ready-to-use content.",
    forWho: "Films, commercials, and digital series ready for offline, online, and master export.",
    problem: "Rushed edits, uncalibrated color, amateur sound mixing, and clumsy aspect ratio crops.",
    solution: "Hollywood-grade color grading (DaVinci), Dolby Atmos / 5.1 sound design, VFX cleanup, and platform versioning.",
    deliverables: ["ProRes / DCP Masters", "Calibrated Color Grade", "5.1 & Stereo Mix", "Social Aspect Cuts"],
    steps: ["Offline Assembly", "Picture Lock", "Color Grading & VFX", "Sound Design & Deliverables"],
    image: "/Updated Images/6 services/Post Production.png",
  },
];

export const socialMediaCrafts: Craft[] = [
  {
    slug: "social-media-management",
    title: "Social Media Management",
    strap: "A strong social presence needs consistency and planning.",
    description:
      "A strong social presence needs consistency, planning and the right approach for each platform. We manage your social media, from planning and publishing to day-to-day content and platform upkeep.",
    forWho: "Brands and creators needing end-to-end management of their official social channels.",
    problem: "Inconsistent posting, lack of platform nuance, and disconnected aesthetic quality.",
    solution: "Daily channel operations, scheduling, community moderation, and strategic performance oversight.",
    deliverables: ["Monthly Publishing Cadence", "Content Calendar", "Monthly Analytics Digest"],
    steps: ["Channel Setup & Audit", "Cadence Execution", "Community Monitoring", "Performance Iteration"],
    image: "/Updated Images/6 services/Social Media.png",
  },
  {
    slug: "content-creation-publishing",
    title: "Content Creation & Publishing",
    strap: "Regular, relevant content keeps you visible and connected.",
    description:
      "Regular, relevant content keeps you visible and connected to your audience. We create and publish platform-ready content that reflects your brand, personality and goals.",
    forWho: "Brands wanting an always-on stream of Reels, Shorts, carousels, and high-impact posts.",
    problem: "Creative burnout, low-retention videos, and generic templates that fail algorithms.",
    solution: "High-retention mobile-first video production, bespoke carousel design, and punchy copywriting.",
    deliverables: ["Reels & Shorts Pipeline", "Carousel Graphic Sets", "Optimized Copy & Hooks"],
    steps: ["Trend & Topic Research", "Studio Batch Filming", "Post Finishing", "Scheduled Deployment"],
    image: "/Updated Images/portfolio.png",
  },
  {
    slug: "platform-management",
    title: "Platform Management",
    strap: "Every platform has its own audience, format and voice.",
    description:
      "Every platform has its own audience, format and way of communicating. We manage your presence across each relevant platform and adapt content to fit how people use it there.",
    forWho: "Multi-channel brands operating across YouTube, Instagram, LinkedIn, X, and TikTok.",
    problem: "Cross-posting the same 16:9 or 9:16 asset everywhere without adapting format or caption context.",
    solution: "Tailoring format, aspect ratio, metadata, and thumbnail strategy specific to each platform's culture.",
    deliverables: ["Platform Customization Playbook", "Custom Thumbnails", "Metadata & SEO Packs"],
    steps: ["Platform Native Audit", "Asset Repackaging", "Publishing Optimization", "Feedback Loop"],
    image: "/Updated Images/6 services/Social Media.png",
  },
  {
    slug: "community-management",
    title: "Community Management",
    strap: "Building an audience is also about building relationships.",
    description:
      "Building an audience is also about building relationships. We manage the conversations, responses and touchpoints that keep your community engaged and connected.",
    forWho: "Brands with active comment sections, DMs, and community forums.",
    problem: "Ignored comments and slow responses that turn excited fans into alienated prospects.",
    solution: "Proactive conversation sparking, rapid DM response protocols, and brand advocate nurturing.",
    deliverables: ["Community Response Protocol", "FAQ Response Matrix", "Engagement Sentiment Logs"],
    steps: ["Voice Calibration", "Daily Monitoring", "Relationship Nurturing", "Crisis Escalation Plan"],
    image: "/Updated Images/About us.png",
  },
  {
    slug: "performance-marketing-growth",
    title: "Performance Marketing & Growth",
    strap: "Growing online takes more than organic content alone.",
    description:
      "Growing online takes more than organic content alone. We run targeted performance campaigns, read audience insights, and optimise continuously for reach, engagement, leads and conversions.",
    forWho: "Businesses looking for predictable, scalable acquisition and return on ad spend (ROAS).",
    problem: "Burning budget on boosted posts with no conversion attribution or creative iteration.",
    solution: "Paid social advertising, A/B creative testing, retargeting funnels, and real-time ROAS optimization.",
    deliverables: ["Paid Ad Campaign Architecture", "Creative Variant Suite", "ROAS & Attribution Dashboard"],
    steps: ["Audience Targeting Setup", "Creative Sprint", "Campaign Launch", "Continuous Optimization"],
    image: "/service-motion.png",
  },
  {
    slug: "creator-personal-presence",
    title: "Creator & Personal Presence",
    strap: "Creators need a consistent presence that reflects who they are.",
    description:
      "Creators need a consistent presence that reflects who they are and what they want to be known for. We shape their content, social presence and communication to build stronger visibility and connection.",
    forWho: "Digital creators, founders, and industry leaders building high-leverage personal brands.",
    problem: "Spending all time creating rather than building a scalable personal media business.",
    solution: "Strategic content direction, editing support, sponsorship packaging, and audience growth systems.",
    deliverables: ["Creator Content System", "Media Kit & Sponsorship Deck", "Signature Format Bible"],
    steps: ["Persona Discovery", "Workflow Streamlining", "Distribution Sprint", "Monetization Enablement"],
    image: "/Updated Images/personal branding.png",
  },
];

export const advertisingCrafts: Craft[] = [
  {
    slug: "campaign-development",
    title: "Campaign Development",
    strap: "A strong campaign starts with a clear idea and purpose.",
    description:
      "A strong campaign starts with a clear idea and a clear purpose. We develop campaign concepts and creative directions that connect your message with the right audience and support your goals.",
    forWho: "Brands launching major marketing initiatives, product releases, or seasonal pushes.",
    problem: "Fragmented ads with no overarching idea or emotional hook to capture attention.",
    solution: "Big-idea creative campaign concepts that cut through noise and spark organic cultural conversation.",
    deliverables: ["Master Campaign Pitch Deck", "Key Visuals (KV)", "Core Campaign Slogan & Angles"],
    steps: ["Brief Analysis", "Creative Conception", "Stakeholder Pitch", "Production Handover"],
    image: "/film-automotive.png",
  },
  {
    slug: "advertising-strategy-creative",
    title: "Advertising Strategy & Creative",
    strap: "Effective advertising needs both strategy and creative.",
    description:
      "Effective advertising needs both the right strategy and the right creative. We plan the direction and develop the ideas that make your brand, product or message stand out.",
    forWho: "Marketing teams needing high-performing advertising concepts grounded in consumer psychology.",
    problem: "Creative ideas that win awards but fail to drive real consumer action or commercial results.",
    solution: "Rigorous strategic foundation tied directly to bold, unforgettable creative execution.",
    deliverables: ["Advertising Strategic Brief", "Creative Concepts (3 Directions)", "Channel Rollout Plan"],
    steps: ["Strategic Research", "Creative Ideation", "Concept Testing", "Final Production Brief"],
    image: "/Updated Images/Branding.png",
  },
  {
    slug: "commercial-advertising",
    title: "Commercial Advertising",
    strap: "Commercials have to capture attention while communicating real value.",
    description:
      "Commercials have to capture attention while communicating real value. We conceptualise and produce advertising content for brands, products and services across the media that matters.",
    forWho: "Brands seeking broadcast, digital, and cinema-grade commercial spots.",
    problem: "Ads that viewers immediately skip or forget within seconds of watching.",
    solution: "High-retention commercials crafted with visual spectacle, sharp pacing, and memorable emotional hooks.",
    deliverables: ["30s Master Spot", "15s & 6s Cut-downs", "High-Resolution End-Frames"],
    steps: ["Script & Treatment", "Commercial Shoot", "Post & Finishing", "Broadcast Delivery"],
    image: "/Updated Images/6 services/Advertising.png",
  },
  {
    slug: "branded-content-campaigns",
    title: "Branded Content Campaigns",
    strap: "Branded content lets brands connect through stories.",
    description:
      "Branded content lets brands connect through stories and experiences, not just traditional ads. We develop and produce content-led campaigns that bring your brand naturally into the conversation.",
    forWho: "Brands wanting to earn audience respect rather than interrupt their viewing experience.",
    problem: "Ham-fisted product placement that breaks immersion and triggers audience skepticism.",
    solution: "Editorial and documentary-style storytelling where the brand serves as an authentic enabler of the narrative.",
    deliverables: ["Docu-Style Brand Film", "Episodic Social Content", "Behind-The-Scenes Featurette"],
    steps: ["Story Sourcing", "Character Attachment", "Production", "Multi-Platform Rollout"],
    image: "/service-documentary.png",
  },
  {
    slug: "promotional-campaigns",
    title: "Promotional Campaigns",
    strap: "Promotional campaigns build awareness, interest and action.",
    description:
      "Promotional campaigns build awareness, interest and action around a product, service, launch or offer. We plan and run campaigns across the right channels to reach your audience.",
    forWho: "Retail, e-commerce, and SaaS brands driving rapid customer action and sales velocity.",
    problem: "Promotions that erode brand prestige with cheap-looking discount banners.",
    solution: "Exciting, premium promotional narratives that drive urgency while protecting long-term brand equity.",
    deliverables: ["Promotional Asset Suite", "Interactive Offer Creatives", "Email & Social Kit"],
    steps: ["Offer & Angle Structuring", "High-Speed Asset Production", "Channel Rollout", "Conversion Tracking"],
    image: "/film-music.png",
  },
  {
    slug: "360-campaigns",
    title: "360° Campaigns",
    strap: "Campaigns that work across multiple touchpoints with real impact.",
    description:
      "Some campaigns need to work across multiple platforms and touchpoints to land with real impact. We bring creative, digital, social, media, PR and on-ground activity together under one connected campaign.",
    forWho: "Enterprise brands demanding seamless multi-touchpoint ubiquity.",
    problem: "Customers hearing one message on TV, another on social, and finding nothing relevant in stores.",
    solution: "Fully synchronized 360-degree ecosystem spanning broadcast, OOH, digital, experiential, and PR.",
    deliverables: ["360° Ecosystem Blueprint", "Omnichannel Asset Matrix", "Unified Campaign Guidelines"],
    steps: ["Omnichannel Planning", "Synchronized Production", "Unified Launch Day", "Cross-Channel Momentum"],
    image: "/film-virtual.png",
  },
  {
    slug: "campaign-management-optimisation",
    title: "Campaign Management & Optimisation",
    strap: "A campaign doesn't end once it goes live.",
    description:
      "A campaign doesn’t end once it goes live. We manage execution, track performance, and make ongoing improvements to get better results as it runs.",
    forWho: "Active campaigns running over multi-week or multi-month flight windows.",
    problem: "Setting and forgetting a campaign while creative fatigue sets in and costs per acquisition climb.",
    solution: "Live analytics tracking, rapid creative swaps, audience retargeting adjustments, and weekly executive briefings.",
    deliverables: ["Live Analytics Dashboard", "Weekly Creative Optimization Sprints", "Post-Campaign Wrap Report"],
    steps: ["Telemetry Setup", "Daily Flight Monitoring", "Mid-Flight Creative Swaps", "Post-Mortem Review"],
    image: "/Updated Images/6 services/Advertising.png",
  },
];

export const eventsCrafts: Craft[] = [
  {
    slug: "event-strategy-concept",
    title: "Event Strategy & Concept",
    strap: "A successful event starts with a clear idea and purpose.",
    description:
      "A successful event starts with a clear idea and purpose. We develop the concept, creative direction, audience approach and overall plan that fits your brand and your objectives.",
    forWho: "Organizations planning flagship brand experiences, summits, or cultural gatherings.",
    problem: "Events organized as generic hospitality logistics without an overarching story or brand resonance.",
    solution: "Curating a thematic experience narrative, attendee journey design, and unforgettable keynote moments.",
    deliverables: ["Event Master Concept Deck", "Attendee Experience Map", "Spatial & Stage Design Vision"],
    steps: ["Objective Discovery", "Theme Architecture", "Experience Flow Design", "Production Roadmap"],
    image: "/Updated Images/6 services/Evants.png",
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    strap: "Corporate events are a chance to represent your organisation.",
    description:
      "Corporate events are a chance to bring people together and represent your organisation the right way. We plan and run conferences, meetings, celebrations, employee events and other corporate experiences.",
    forWho: "Enterprises hosting shareholder meetings, global summits, leadership retreats, and internal galas.",
    problem: "Dull, uninspiring corporate presentations with technical AV glitches and disengaged attendees.",
    solution: "Flawless staging, broadcast-grade AV, cinematic speaker visuals, and professional show running.",
    deliverables: ["Show Run-of-Show", "Stage AV Design & Rigging Plan", "Speaker Visual Presentations"],
    steps: ["Venue Selection & Tech Recce", "Stage & Lighting Engineering", "Rehearsals & Run-throughs", "Live Execution"],
    image: "/Updated Images/Full white coverage.png",
  },
  {
    slug: "product-launches",
    title: "Product Launches",
    strap: "A product launch creates attention at the event and beyond.",
    description:
      "A product launch should create attention both at the event and beyond it. We build launch experiences that introduce your product, engage the audience, and build momentum through content and promotion.",
    forWho: "Consumer tech, automotive, fashion, and luxury brands revealing breakthrough products.",
    problem: "A reveal moment that looks underwhelming on camera and creates zero social buzz.",
    solution: "Dramatic keynote staging, reveal mechanics, interactive demo stations, and instant press-ready content.",
    deliverables: ["Reveal Moment Choreography", "Hands-on Experience Stations", "Real-Time Press Content Kit"],
    steps: ["Concept Lock", "Reveal Engineering", "Media Integration", "Launch Moment Delivery"],
    image: "/film-automotive.png",
  },
  {
    slug: "brand-activations-experiences",
    title: "Brand Activations & Experiences",
    strap: "People remember brands through experience, not just advertising.",
    description:
      "People remember brands through experience, not just advertising. We create interactive activations that get people engaging with your brand in ways that actually stick.",
    forWho: "Brands wanting memorable on-ground presence at festivals, malls, sports arenas, and cultural hubs.",
    problem: "Passersby walking past passive booth setups without engaging or remembering the brand.",
    solution: "Immersive sensory installations, interactive technology, gamified touchpoints, and photo moments.",
    deliverables: ["Activation Fabrication Blueprint", "Interactive Tech Spec", "Staff Training Playbook"],
    steps: ["Footfall & Site Study", "Fabrication & Prototyping", "On-Site Installation", "Live Management"],
    image: "/service-motion.png",
  },
  {
    slug: "exhibitions-conferences",
    title: "Exhibitions & Conferences",
    strap: "Exhibitions depend on strong planning and engagement.",
    description:
      "Exhibitions and conferences depend on strong planning, presentation and engagement. We help create and manage experiences that bring brands, businesses, speakers, partners and audiences together.",
    forWho: "Industry associations, trade bodies, and major brands exhibiting at premier global expos.",
    problem: "Crowded expos where competing booths blur together and fail to capture qualified leads.",
    solution: "Commanding architectural booth designs, streamlined meeting zones, and captivating stage sessions.",
    deliverables: ["Architectural Booth Renders", "Lead Capture Strategy", "Multi-Track Stage Schedules"],
    steps: ["Booth Spatial Architecture", "AV & Tech Integration", "Lead Flow Optimization", "Exhibition Floor Operations"],
    image: "/film-virtual.png",
  },
  {
    slug: "live-shows-concerts",
    title: "Live Shows & Concerts",
    strap: "Live entertainment needs the right mix of creative and production.",
    description:
      "Live entertainment needs the right mix of creative direction, production and audience experience. We plan and execute live shows, concerts, cultural programmes and entertainment events.",
    forWho: "Musical artists, festival organizers, cultural institutions, and theatrical producers.",
    problem: "Subpar acoustics, poor crowd sightlines, and stage lighting that disconnects from musical dynamics.",
    solution: "Arena-grade acoustic engineering, dynamic timecoded light and visual shows, and artist hospitality management.",
    deliverables: ["Stage Lighting Timecode File", "Sound System Spec", "Crowd Safety & Production Matrix"],
    steps: ["Creative Set Design", "Audio & Visual Programming", "Artist Rehearsals", "Live Show Direction"],
    image: "/film-music.png",
  },
  {
    slug: "event-production-promotion-content",
    title: "Event Production, Promotion & Content",
    strap: "An event should reach people well beyond the venue.",
    description:
      "An event should reach people well beyond the venue. We handle production alongside the promotion, photography, video, social content and post-event coverage that extend its reach further.",
    forWho: "Any event needing pre-event hype, live streaming, and rich post-event content reels.",
    problem: "An expensive event ending when the lights go down, reaching only those physically in the room.",
    solution: "Full-scale on-site media team producing instant live streams, photo drops, and aftermovies.",
    deliverables: ["Live Stream Broadcast", "Same-Day Social Reels", "Official Event Aftermovie"],
    steps: ["Pre-Event Content Rollout", "Live Broadcast Capture", "Rapid Social Delivery", "Master Film Release"],
    image: "/Updated Images/6 services/Evants.png",
  },
];

// Mapping of divisions and legacy aliases to their crafts
export const craftsByService: Record<string, Craft[]> = {
  // New canonical slugs
  "strategy-consulting": strategyCrafts,
  "brand-development-pr": brandCrafts,
  "content-production": contentProductionCrafts,
  "social-media-growth": socialMediaCrafts,
  "advertising-campaigns": advertisingCrafts,
  "events-experiences": eventsCrafts,

  // Backward-compatible legacy aliases
  "pre-production": strategyCrafts,
  production: contentProductionCrafts,
  "post-production": contentProductionCrafts,
  "digital-social": socialMediaCrafts,
  advertising: advertisingCrafts,
  events: eventsCrafts,
};

// Aliases for quick lookup
export const productionCrafts = contentProductionCrafts;
export const preCrafts = strategyCrafts;
export const postCrafts = contentProductionCrafts;

export function findCraft(serviceSlug: string, craftSlug: string): Craft | undefined {
  const crafts = craftsByService[serviceSlug];
  if (crafts) {
    const direct = crafts.find((c) => c.slug === craftSlug);
    if (direct) return direct;
  }
  // Global search across all crafts if not found in specific division
  for (const list of Object.values(craftsByService)) {
    const candidate = list.find((c) => c.slug === craftSlug);
    if (candidate) return candidate;
  }
  return undefined;
}

export function craftHref(serviceSlug: string, craftSlug: string): string {
  return `/services/${serviceSlug}#${craftSlug}`;
}
