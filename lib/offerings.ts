export type Craft = {
  slug: string;
  title: string;
  strap: string;
  forWho: string;
  problem: string;
  solution: string;
  deliverables: string[];
  steps: string[];
  image: string;
};

export const preCrafts: Craft[] = [
  {
    slug: "concept-development",
    title: "Concept Development",
    strap: "The idea, named and tested before money hits the floor.",
    forWho: "Brands and organisations that have a brief, a product or a moment — but not yet a story.",
    problem: "Teams often jump to a format (a film, a reel, an event) before they know what the work is actually saying.",
    solution: "We run concept rooms that lock the audience, the tension and the one-line idea. You leave with a concept you can brief, budget and defend.",
    deliverables: ["Concept note", "Audience frame", "References and tone", "Go / no-go recommendation"],
    steps: ["Listen to the brief", "Map the audience", "Write three directions", "Recommend one"],
    image: "/service-brand.png",
  },
  {
    slug: "creative-strategy",
    title: "Creative Strategy",
    strap: "A plan for how the idea will live across channels.",
    forWho: "Marketing leads who need the work to perform in more than one room — board, feed, stage or screen.",
    problem: "Beautiful work that has no job. Or a media plan with no idea inside it.",
    solution: "We write a creative strategy that ties brand, message and channel together so production is not guessing.",
    deliverables: ["Strategy deck", "Message hierarchy", "Channel roles", "Success measures"],
    steps: ["Audit what exists", "Define the job of the work", "Set the idea system", "Brief production"],
    image: "/service-motion.png",
  },
  {
    slug: "script-content-development",
    title: "Script / Content Development",
    strap: "Words, scenes and beats that can actually be shot.",
    forWho: "Anyone who needs a script, series bible, voiceover or content run-of-show.",
    problem: "Scripts written to be read, not made — or content calendars with no voice.",
    solution: "Writers and directors sit together. The page is built for the camera, the mic and the platform it has to win.",
    deliverables: ["Script or treatment", "Shot intentions", "VO / copy variants", "Revision rounds"],
    steps: ["Outline", "Draft", "Table read with production", "Lock for shoot"],
    image: "/service-documentary.png",
  },
  {
    slug: "campaign-planning",
    title: "Campaign Planning",
    strap: "The sequence of work, not a single asset.",
    forWho: "Teams launching a product, a season or a public programme.",
    problem: "A hero film with nothing around it — or twenty assets with no order.",
    solution: "We plan the campaign as a production: hero, cut-downs, stills, live and social, timed to the real calendar.",
    deliverables: ["Campaign map", "Asset list", "Timeline", "Budget bands"],
    steps: ["Set the window", "Choose the hero", "Build the system", "Assign owners"],
    image: "/film-music.png",
  },
  {
    slug: "production-planning",
    title: "Production Planning",
    strap: "Schedules, crews and locations that protect the idea.",
    forWho: "Anyone about to shoot — film, ads, photography, podcasts or live capture.",
    problem: "The idea shrinks on the day because the plan was a spreadsheet, not a production.",
    solution: "Producers lock call sheets, kit, permissions and fallbacks so directors can hold the picture.",
    deliverables: ["Production bible", "Call sheet", "Kit and crew list", "Risk and weather plan"],
    steps: ["Recce", "Schedule", "Crew and kit", "Confirm and brief"],
    image: "/film-virtual.png",
  },
  {
    slug: "brand-strategy",
    title: "Brand Strategy",
    strap: "Who you are, who it is for, and how you will be seen.",
    forWho: "Businesses, organisations and government bodies building or refreshing a brand.",
    problem: "Visual identity without a position — or a position that never reaches production.",
    solution: "We write brand strategy that production can use: promise, proof, tone and the work that should exist next.",
    deliverables: ["Positioning", "Tone of voice", "Proof points", "First-year work list"],
    steps: ["Discover", "Name the tension", "Write the brand", "Brief the first work"],
    image: "/service-brand.png",
  },
];

export const productionCrafts: Craft[] = [
  {
    slug: "video-production",
    title: "Video Production",
    strap: "Moving image for brands, people and platforms — from a single film to a full content engine.",
    forWho: "Companies, creators and organisations that need video that can live on web, social, events and broadcast.",
    problem: "Video treated as 'content' with no direction, or as cinema with no plan for where it will play.",
    solution: "We produce video as a system: the hero, the cut-downs, the stills and the captions, shot on the same day where we can.",
    deliverables: ["Locked picture", "Platform cuts", "Stills from set", "Captions and titles"],
    steps: ["Brief and treatment", "Pre-pro", "Shoot", "Edit and deliver"],
    image: "/film-automotive.png",
  },
  {
    slug: "film-production",
    title: "Film Production",
    strap: "Longer-form narrative and branded films with senior direction on set.",
    forWho: "Brands, studios and partners who need a film — not a clip.",
    problem: "A 'film' brief that is actually an advert, or a narrative with no production backbone.",
    solution: "Directors, producers and a locked schedule. We make films that hold attention and still meet the commercial brief.",
    deliverables: ["Featurette or brand film", "Trailer / teaser", "Stills", "Delivery masters"],
    steps: ["Treatment", "Casting and locations", "Principal photography", "Picture lock"],
    image: "/film-virtual.png",
  },
  {
    slug: "advertisement-production",
    title: "Advertisement Production",
    strap: "Commercials built to work in the slot they have to win — TV, digital, cinema or OOH.",
    forWho: "Marketing teams and agencies who need ads produced, not just conceived.",
    problem: "A board-approved idea that dies in production, or a spot that cannot be recut for digital.",
    solution: "We produce advertisements with the cut-downs already planned: 6s, 15s, 30s and the stills the media team will actually use.",
    deliverables: ["Master spot", "Cut-downs", "End-frame stills", "Legal / versioning notes"],
    steps: ["Script lock", "Cast and kit", "Shoot", "Grade and versions"],
    image: "/film-music.png",
  },
  {
    slug: "branded-content",
    title: "Branded Content",
    strap: "Stories people choose to spend time with — series, docs, social-first films.",
    forWho: "Brands that want attention without interrupting it.",
    problem: "An advert wearing a documentary costume, or a series with no brand in it.",
    solution: "We make branded content with a real hook and a clear brand role, designed to travel across platforms.",
    deliverables: ["Episode or film", "Social cuts", "Title kit", "Release plan"],
    steps: ["Find the hook", "Format the series", "Produce", "Publish in sequence"],
    image: "/service-documentary.png",
  },
  {
    slug: "photography",
    title: "Photography",
    strap: "Still image that belongs in the same world as the moving one.",
    forWho: "Campaigns, lookbooks, events, talent and product that need stills with production values.",
    problem: "Stills shot on a different day, in a different light, by a different team.",
    solution: "Photographers work inside the same lighting language as the film. One world, two formats.",
    deliverables: ["Selects", "Retouched heroes", "Social crops", "Archive"],
    steps: ["Art direction", "Studio or location", "Shoot", "Select and finish"],
    image: "/service-photography.png",
  },
  {
    slug: "podcast-production",
    title: "Podcast Production",
    strap: "From the first conversation to a show people return to.",
    forWho: "Brands, founders and organisations building an audio series.",
    problem: "A podcast that is just a meeting with mics — no format, no finish, no distribution plan.",
    solution: "We produce podcasts as shows: format, guests, record, edit, music and artwork, ready to publish.",
    deliverables: ["Episode masters", "Show artwork", "Trailers", "Show notes"],
    steps: ["Format the show", "Record", "Edit and mix", "Package for release"],
    image: "/service-documentary.png",
  },
  {
    slug: "music-production",
    title: "Music Production",
    strap: "Original score, songs and sound that carry the picture.",
    forWho: "Films, ads, live shows and brands that need music made for the work — not licensed wallpaper.",
    problem: "Temp tracks that never get replaced, or stock music that makes the film feel generic.",
    solution: "Composers and producers sit with the picture. We write, record and mix music that belongs to the project.",
    deliverables: ["Original tracks", "Stems", "Live or studio session", "Cue sheet"],
    steps: ["Temp and brief", "Write", "Record", "Mix to picture"],
    image: "/film-music.png",
  },
];

export const postCrafts: Craft[] = [
  {
    slug: "video-editing",
    title: "Video Editing",
    strap: "The cut that finds the film that was shot.",
    forWho: "Anyone with rushes who needs a picture lock, not a first assembly left hanging.",
    problem: "Hours of footage and no story, or an edit that ignores the platform it has to live on.",
    solution: "Editors work to a locked brief: duration, channel, audience. You see selects, then a cut, then a lock.",
    deliverables: ["Selects", "Fine cut", "Picture lock", "Project archive"],
    steps: ["Ingest", "Assembly", "Fine cut", "Lock"],
    image: "/service-vfx.png",
  },
  {
    slug: "audio-post",
    title: "Audio Post",
    strap: "Dialogue, design and mix treated as narrative.",
    forWho: "Films, ads, podcasts and live captures that need to sound finished.",
    problem: "Picture-lock with production sound left raw.",
    solution: "We clean dialogue, design the world and mix for the rooms the work will actually play in.",
    deliverables: ["Dialogue edit", "Sound design", "Mix", "M&E where needed"],
    steps: ["Spot", "Edit dialogue", "Design", "Mix"],
    image: "/service-vfx.png",
  },
  {
    slug: "finishing",
    title: "Finishing",
    strap: "Colour, titles and the last five percent.",
    forWho: "Work that is cut and now needs to look like it belongs in the world.",
    problem: "A good cut that still looks like rushes.",
    solution: "Grade, graphics and titles in one finishing pass so the film, the ad and the stills match.",
    deliverables: ["Grade", "Titles / graphics", "Clean versions", "Hero stills"],
    steps: ["Online", "Grade", "Graphics", "QC"],
    image: "/service-motion.png",
  },
  {
    slug: "platform-adaptation",
    title: "Platform Adaptation",
    strap: "One master, many rooms — without looking like a crop.",
    forWho: "Teams who need the same story on cinema, TV, Reels, Shorts and presentations.",
    problem: "A 16:9 film letterboxed into a 9:16 slot, or a dozen unrelated recuts.",
    solution: "We plan versions in the shoot and finish them in post: ratios, durations, captions, safe areas.",
    deliverables: ["Ratio versions", "Duration versions", "Captioned cuts", "Spec sheet"],
    steps: ["Map platforms", "Recut", "Caption", "QC per spec"],
    image: "/service-motion.png",
  },
  {
    slug: "final-delivery",
    title: "Final Delivery",
    strap: "Masters, files and paperwork that the next team can actually use.",
    forWho: "Anyone handing work to media, broadcast, OTT, events or archives.",
    problem: "A Drive folder of mystery files and no names, no specs, no rights note.",
    solution: "We deliver named masters, specs, versions and an archive so the work can travel.",
    deliverables: ["Masters", "Version matrix", "Specs", "Archive"],
    steps: ["Name and spec", "Export", "QC", "Handover"],
    image: "/film-virtual.png",
  },
];

export const craftsByService: Record<string, Craft[]> = {
  "pre-production": preCrafts,
  production: productionCrafts,
  "post-production": postCrafts,
};

export function findCraft(serviceSlug: string, craftSlug: string) {
  return craftsByService[serviceSlug]?.find((c) => c.slug === craftSlug);
}
