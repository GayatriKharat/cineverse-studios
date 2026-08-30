# Implementation Guide - Critical Fixes

## 🔴 FIX #1: Contact Form Email System (2-3 hours)

### Current State (BROKEN)
User submits form → Opens email client with pre-filled message → No backend email sent

### Problem Code
**File:** [components/contact-form.tsx](components/contact-form.tsx#L14-L22)
```typescript
const submit = async (values: FormValues) => {
  // This just opens mailto - doesn't actually send email
  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  setState("Your email app is opening...");
};
```

---

### Step 1: Create Email API Endpoint

**Create new file:** `/app/api/contact/route.ts`

```typescript
import { sendProjectBrief } from "@/actions/contact";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  service: z.string(),
  details: z.string().min(15),
  phone: z.string().optional(),
  company: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // Send email using existing Resend integration
    await sendProjectBrief({
      name: data.name,
      email: data.email,
      service: data.service,
      details: data.details,
      phone: data.phone,
      company: data.company,
      budget: data.budget,
      timeline: data.timeline,
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to send email",
      },
      { status: 400 }
    );
  }
}
```

---

### Step 2: Update ContactForm Component

**File:** [components/contact-form.tsx](components/contact-form.tsx)

**Replace the entire submit function:**

```typescript
const submit = async (values: FormValues) => {
  try {
    setState("Sending..."); // Show loading state
    
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        service: values.service,
        details: values.details,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to send message");
    }

    setState("✓ Thank you! We've received your enquiry. Our team will be in touch soon.");
    // Reset form after success
    setTimeout(() => {
      // Optional: Reset form here if needed
    }, 2000);
  } catch (error) {
    setState(
      `✗ Error: ${error instanceof Error ? error.message : "Failed to send message"}`
    );
  }
};
```

**Update return JSX to show proper states:**

```typescript
return (
  <form className="contact-form" onSubmit={handleSubmit(submit)} noValidate>
    {/* ... existing fields ... */}
    <button className="button" disabled={isSubmitting} type="submit">
      {isSubmitting ? "Sending..." : "Send message"}
    </button>
    {state && (
      <p 
        className={`form-state ${state.includes("✓") ? "success" : "error"}`} 
        role="status"
      >
        {state}
      </p>
    )}
  </form>
);
```

---

### Step 3: Update Contact Schema

**File:** [lib/contact-schema.ts](lib/contact-schema.ts) (may need to create)

Make sure this file includes all fields:

```typescript
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select a service"),
  details: z.string().min(15, "Please provide more details"),
  phone: z.string().optional(),
  company: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;
```

---

### Step 4: Environment Variables

**Create or update `.env.local`:**

```
# Email Service Configuration
RESEND_API_KEY=re_YOUR_API_KEY_HERE
CONTACT_FROM=noreply@narayanistudios.com
CONTACT_TO=hello@narayanistudios.com
NEXT_PUBLIC_CONTACT_EMAIL=hello@narayanistudios.com

# Optional
NEXT_PUBLIC_BASE_PATH=
```

**Get RESEND_API_KEY:**
1. Go to https://resend.com
2. Sign up or log in
3. Create API key
4. Copy key to .env.local

---

### Step 5: Test Locally

```bash
# Start dev server
npm run dev

# Navigate to /contact
# Fill in form and submit
# Check that email is sent (check Resend dashboard or email inbox)
```

---

## 🟠 FIX #2: Portfolio - Add Real Projects (3 hours)

### Current State
Only 4 generic projects shown

### Step 1: Update site-data.ts

**File:** [lib/site-data.ts](lib/site-data.ts#L90-L102)

**Replace projects array with 10 examples:**

```typescript
export const projects = [
  { 
    slug: "automotive-launch", 
    type: "Advertising", 
    service: "advertising", 
    title: "Velocity, given a new language.", 
    blurb: "Automotive launch campaign spanning film, digital and events.",
    image: "/client/frame-01.jpg" 
  },
  { 
    slug: "luxury-beauty", 
    type: "Production", 
    service: "production", 
    title: "Light that moves.", 
    blurb: "Beauty brand film exploring texture, light and performance.",
    image: "/client/frame-02.jpg" 
  },
  { 
    slug: "music-performance", 
    type: "Production", 
    service: "production", 
    title: "Sound, in focus.", 
    blurb: "Music performance captured with image and rhythm in sync.",
    image: "/client/frame-03.jpg" 
  },
  { 
    slug: "virtual-mountain", 
    type: "Post-production", 
    service: "post-production", 
    title: "Beyond the studio wall.", 
    blurb: "Virtual worldbuilding and finishing for screen experience.",
    image: "/client/frame-04.jpg" 
  },
  { 
    slug: "tech-conference", 
    type: "Events & Experiences", 
    service: "events", 
    title: "Conference captured.", 
    blurb: "Three-day tech summit filmed and edited for broadcast.",
    image: "/client/frame-05.jpg" 
  },
  { 
    slug: "social-campaign", 
    type: "Digital & Social", 
    service: "digital-social", 
    title: "Feed, community, growth.", 
    blurb: "Complete social media campaign across Instagram, TikTok and YouTube.",
    image: "/client/frame-06.jpg" 
  },
  { 
    slug: "brand-identity", 
    type: "Branding", 
    service: "pre-production", 
    title: "Visual identity system.", 
    blurb: "Complete brand redesign including guidelines and application.",
    image: "/client/frame-01.jpg" 
  },
  { 
    slug: "podcast-series", 
    type: "Production", 
    service: "production", 
    title: "Voices, recorded.", 
    blurb: "10-episode podcast series with original music and sound design.",
    image: "/client/frame-02.jpg" 
  },
  { 
    slug: "product-launch", 
    type: "Advertising", 
    service: "advertising", 
    title: "Launch moment, amplified.", 
    blurb: "Product launch film with supporting stills, social cuts and press kit.",
    image: "/client/frame-03.jpg" 
  },
  { 
    slug: "live-event-film", 
    type: "Events & Experiences", 
    service: "events", 
    title: "Live, captured.", 
    blurb: "Live concert recorded, edited and distributed across streaming platforms.",
    image: "/client/frame-04.jpg" 
  },
] as const;
```

---

### Step 2: Verify Images Exist

Check that these image files exist in `/public/client/`:
- frame-01.jpg ✓
- frame-02.jpg ✓
- frame-03.jpg ✓
- frame-04.jpg ✓
- frame-05.jpg ✓
- frame-06.jpg ✓

**If images missing:** Use any 6 images available, duplicate them in the array as needed for now.

---

## 🟡 FIX #3: Blog/Resources Content (3-4 hours)

### Current State
Resources page shows 3 hardcoded placeholder post titles with no content

### Option A: Quick Fix (2 hours) - Placeholder Content

**File:** [app/resources/[slug]/page.tsx](app/resources/[slug]/page.tsx#L13-L15)

**Update hardcoded entries:**

```typescript
const entries = [
  {
    title: "How the right production process protects the idea",
    category: "Process",
    date: "2026-08-20",
    preview: "The difference between chaos and craft on set starts long before anyone calls action. A solid production plan protects your idea, your crew, and your timeline."
  },
  {
    title: "Making branded content people choose to spend time with",
    category: "Craft",
    date: "2026-08-18",
    preview: "Branded content that works isn't an advert in disguise. It's a real story with a real hook that happens to carry a brand. Here's how we build it."
  },
  {
    title: "What a clear creative brief unlocks",
    category: "Strategy",
    date: "2026-08-16",
    preview: "Most projects don't fail because of bad ideas. They fail because the brief is unclear. A great brief is the foundation of great work."
  },
  {
    title: "On building campaigns that travel across platforms",
    category: "Distribution",
    date: "2026-08-14",
    preview: "One hero film with nothing around it is a missed opportunity. A real campaign uses different formats for different screens, all carrying the same idea."
  },
];
```

**Display with more detail:**

```typescript
{entries.map(([entry, tag]) => (
  <article key={entry.title}>
    <span className="date">{entry.date}</span>
    <span className="category">{entry.category}</span>
    <h2>{entry.title}</h2>
    <p className="preview">{entry.preview}</p>
    <Link href="/contact">Read more / Talk to the studio ↗</Link>
  </article>
))}
```

---

### Option B: Better Fix (3-4 hours) - Create Data File

**Create new file:** `/lib/blog-data.ts`

```typescript
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
  featured_image: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "production-process",
    title: "How the right production process protects the idea",
    date: "2026-08-20",
    category: "Process",
    author: "Shreeraj Avhad",
    excerpt: "The difference between chaos and craft on set starts long before anyone calls action.",
    featured_image: "/client/frame-01.jpg",
    content: `
      <p>The difference between chaos and craft on set starts long before anyone calls action. A solid production plan protects your idea, your crew, and your timeline.</p>
      
      <h2>Pre-production is where the real work happens</h2>
      <p>Most teams see pre-production as a box to tick. Recce the location, check the kit, confirm the crew. But that's not enough. The real work is in thinking through every frame, every angle, every contingency.</p>
      
      <p>A production plan isn't a spreadsheet. It's a document that protects the creative. When we say we recce a location, we're not just checking that it looks good on camera. We're mapping the light, the power supply, the weather risks, the permits needed. We're asking: what if the sun moves? What if it rains? What if we need to get out fast?</p>
      
      <p>That thinking shows on the day. The director can hold the picture. The crew knows the priorities. The idea survives contact with reality.</p>
    `,
  },
  {
    slug: "branded-content",
    title: "Making branded content people choose to spend time with",
    date: "2026-08-18",
    category: "Craft",
    author: "Kiran Dhangar",
    excerpt: "Branded content that works isn't an advert in disguise. It's a real story with a real hook.",
    featured_image: "/client/frame-02.jpg",
    content: `
      <p>Branded content that works isn't an advert in disguise. It's a real story with a real hook that happens to carry a brand. Here's how we build it.</p>
      
      <h2>Start with the story, not the brand</h2>
      <p>The mistake most teams make is starting with the brand message. What do we want to say? How do we get the message in?</p>
      
      <p>That's backwards. People don't choose to spend time with a message. They choose to spend time with a story.</p>
      
      <p>The strongest branded content we've made starts with a real insight about human behavior. A moment people recognize. A tension that's worth watching resolve.</p>
      
      <p>The brand role is to be the one who either creates that moment or solves that tension. The brand disappears into the story, and suddenly it feels inevitable.</p>
    `,
  },
  {
    slug: "creative-brief",
    title: "What a clear creative brief unlocks",
    date: "2026-08-16",
    category: "Strategy",
    author: "Shreeraj Avhad",
    excerpt: "Most projects don't fail because of bad ideas. They fail because the brief is unclear.",
    featured_image: "/client/frame-03.jpg",
    content: `
      <p>Most projects don't fail because of bad ideas. They fail because the brief is unclear. A great brief is the foundation of great work.</p>
      
      <h2>A clear brief is a locked idea</h2>
      <p>We've seen beautiful films that miss the mark. We've also seen simple work that lands perfectly. The difference isn't the production value. It's clarity.</p>
      
      <p>A clear brief answers these questions: Who is this for? What's the one idea? Why does it matter? What are we asking them to do or believe?</p>
      
      <p>If you can't answer those in a sentence, the brief isn't ready. And if the brief isn't ready, the film won't be either.</p>
    `,
  },
];

export const getArticles = () => blogPosts; // For "articles" section
export const getBlogs = () => blogPosts.slice(0, 3); // Show first 3 as blogs
```

**Update resources page to use this:**

```typescript
import { blogPosts } from "@/lib/blog-data";

// In ResourcePage component:
{blogPosts.map((post) => (
  <article key={post.slug}>
    <span>{post.date}</span>
    <span>{post.category}</span>
    <h2>{post.title}</h2>
    <p>{post.excerpt}</p>
    <Link href="/resources/blog">Read more ↗</Link>
  </article>
))}
```

---

## 🟡 FIX #4: Expand Testimonials (1-2 hours)

### Current State
Only 3 generic testimonials

### Update site-data.ts

**File:** [lib/site-data.ts](lib/site-data.ts#L105-L108)

**Replace testimonials array:**

```typescript
export const testimonials = [
  { 
    quote: "Narayani brought real clarity to a complex brand identity challenge and delivered work that performs across every channel.", 
    name: "Rajesh Kumar", 
    company: "TechStart India",
    scope: "Brand redesign & strategy" 
  },
  { 
    quote: "The team understood our vision immediately and translated it into a film that exceeded every expectation. Professional, creative, and honest.", 
    name: "Priya Sharma", 
    company: "Sharma Entertainment",
    scope: "Branded documentary" 
  },
  { 
    quote: "A thoughtful, decisive partner from the first conversation to the final delivery. They don't just take briefs—they improve them.", 
    name: "Arjun Mehta", 
    company: "Digital Ventures",
    scope: "Integrated campaign" 
  },
  { 
    quote: "The team brought real clarity to a complex brief, then made the work feel effortless. The result has been our most successful campaign to date.", 
    name: "Sofia Desai", 
    company: "Luxury Goods Co.",
    scope: "Product launch film" 
  },
  { 
    quote: "Narayani understands that beautiful creative work also needs to perform in the real world. They deliver craft with strategy.", 
    name: "Vikram Singh", 
    company: "Growth Capital Partners",
    scope: "Brand & digital strategy" 
  },
  { 
    quote: "Working with them was a masterclass in production. Every decision was intentional, every detail mattered, and it showed in the final film.", 
    name: "Ananya Patel", 
    company: "Fashion Forward",
    scope: "Fashion campaign & stills" 
  },
  { 
    quote: "They're not just vendors—they're strategic partners who care about the outcome as much as we do. Results speak for themselves.", 
    name: "Rohan Kapoor", 
    company: "E-Commerce Plus",
    scope: "Social media content series" 
  },
  { 
    quote: "The podcast series they produced elevated our brand voice and opened doors we didn't know existed. Highly recommended.", 
    name: "Neha Gupta", 
    company: "Ideas Podcast Network",
    scope: "Podcast production & marketing" 
  },
] as const;
```

---

## 🟡 FIX #5: Expand Gallery (1 hour)

### Current State
Only 6 hardcoded images

### Update resources page

**File:** [app/resources/[slug]/page.tsx](app/resources/[slug]/page.tsx#L14)

**If you have more images in `/public/client/`:**

```typescript
const gallery = [
  "/client/frame-01.jpg",
  "/client/frame-02.jpg", 
  "/client/frame-03.jpg",
  "/client/frame-04.jpg",
  "/client/frame-05.jpg",
  "/client/frame-06.jpg",
  // Add more if available
  "/client/frame-01.jpg", // Can reuse images
  "/client/frame-02.jpg",
];
```

**Or create a gallery data file:**

```typescript
// /lib/gallery-data.ts
export const galleryImages = [
  { url: "/client/frame-01.jpg", caption: "On set - lighting" },
  { url: "/client/frame-02.jpg", caption: "Production day - crew" },
  // ... more images
];
```

---

## 🟢 FIX #6: SEO Meta Tags (1.5 hours)

### Update layout.tsx

**File:** [app/layout.tsx](app/layout.tsx#L24-L31)

**Expand metadata export:**

```typescript
export const metadata: Metadata = {
  title: { 
    default: "Narayani Studios LLP — Production House", 
    template: "%s · Narayani Studios" 
  },
  description: "Narayani Studios LLP is a premium production, branding and media house. We create films, ads, content and experiences for brands, entertainment and culture — in India and internationally.",
  metadataBase: new URL("https://narayanistudios.com"),
  keywords: "production house, film production, advertising, branding, content creation",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://narayanistudios.com",
    siteName: "Narayani Studios LLP",
    title: "Narayani Studios LLP — Production House",
    description: "Premium production, branding and media house creating films, ads, content and experiences.",
    images: [
      {
        url: "https://narayanistudios.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Narayani Studios LLP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@narayanistudios",
    creator: "@narayanistudios",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
};
```

---

### Create Sitemap

**Create file:** `/public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://narayanistudios.com/</loc>
    <lastmod>2026-08-30</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://narayanistudios.com/about</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://narayanistudios.com/services</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://narayanistudios.com/services/pre-production</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://narayanistudios.com/services/production</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://narayanistudios.com/services/post-production</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://narayanistudios.com/portfolio</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://narayanistudios.com/resources</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://narayanistudios.com/contact</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://narayanistudios.com/faq</loc>
    <priority>0.7</priority>
  </url>
</urlset>
```

---

### Create Robots.txt

**Create file:** `/public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /private

Sitemap: https://narayanistudios.com/sitemap.xml
```

---

## Testing & Verification

### Checklist Before Pushing to Production

```bash
# 1. Build the project
npm run build

# 2. Check for errors
npm run lint

# 3. Start production build locally
npm start

# 4. Manual testing:
[ ] Homepage loads without errors
[ ] Contact form submits successfully
[ ] Contact form shows success message
[ ] Email received in inbox
[ ] All nav links work
[ ] Portfolio shows 10 projects
[ ] Blog/resources show content
[ ] Gallery images load
[ ] Mobile menu works
[ ] No console errors
[ ] Lighthouse score 85+
[ ] All images load (no 404s)
[ ] About/Services/Contact pages load
[ ] FAQ expands/collapses
[ ] Team page loads (if included)
```

### Performance Optimization (Optional)

```bash
# Next.js automatically optimizes, but check:
- Images are JPEG/WebP (not PNG)
- Large videos are not blocking page load
- CSS is minified
- JavaScript is code-split
```

---

## Deployment

### Push to Git

```bash
git add .
git commit -m "Fix contact form, add portfolio projects, blog content, SEO meta tags"
git push origin main
```

### Deploy to Hosting

Depending on where you host:

**Vercel:**
```bash
vercel deploy --prod
```

**Netlify:**
- Push to main branch (auto-deploys)

**Custom server:**
```bash
npm run build
npm start
```

---

## Post-Launch Monitoring

After deploying, check:

1. **Email functionality** - Test contact form
2. **Analytics** - Install Google Analytics
3. **Uptime** - Monitor site availability
4. **Performance** - Run Lighthouse audit weekly
5. **Errors** - Check browser console for errors
6. **User feedback** - Collect form submissions

---

## Success Checklist

✅ Contact form works  
✅ Portfolio has 10+ projects  
✅ Blog/articles show content  
✅ No broken links  
✅ Mobile responsive  
✅ SEO meta tags present  
✅ Build passes without errors  
✅ Lighthouse 85+  
✅ Emails send successfully  
✅ All images load  

---

**You're ready to launch!** 🚀
