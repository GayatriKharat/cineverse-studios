# Narayani Studios - Deployment Readiness Audit
**Status:** ⚠️ INCOMPLETE - Multiple sections require content and functionality completion
**Timeline:** 2-day deployment window

---

## CRITICAL ISSUES (Must Fix Before Launch)

### 1. **Contact Form Backend - API NOT IMPLEMENTED** ⛔
**Priority:** CRITICAL  
**File:** [components/contact-form.tsx](components/contact-form.tsx)  
**Issue:** Contact form uses `mailto:` redirect instead of proper backend API
```typescript
// Current (lines 14-22): Redirects to mailto:
window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
```
**Problems:**
- No email actually being sent through backend
- No form submission tracking
- No validation on backend
- User data not being stored
- Poor UX - opens email client on user's machine
- Won't work if email app isn't configured

**Action Required:**
- Implement email API endpoint at `/api/contact/route.ts`
- Use configured Resend service (already in [actions/contact.ts](actions/contact.ts))
- Missing environment variables: `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`
- Update ContactForm component to use proper form submission
- Add success/error states and feedback

---

### 2. **Email Service Configuration** ⛔
**Priority:** CRITICAL  
**File:** [app/actions/contact.ts](app/actions/contact.ts)  
**Issue:** Email service code exists but will throw error if env vars missing
```typescript
// Line 6-7: Will throw error in production
if(!apiKey||!from||!to)throw new Error("Email service is not configured.");
```
**Missing Environment Variables:**
- `RESEND_API_KEY` - Not set
- `CONTACT_FROM` - Not set
- `CONTACT_TO` - Not set
- `NEXT_PUBLIC_CONTACT_EMAIL` - Not set (defaults to hello@narayanistudios.com)

**Action Required:**
- Configure all four environment variables in `.env.local` and deployment platform
- Set up Resend account and API key
- Configure reply-to email and recipient email addresses
- Test email delivery before launch

---

### 3. **Empty Content Sections - Blog & Resources** ⛔
**Priority:** CRITICAL  
**Files:** 
- [app/resources/[slug]/page.tsx](app/resources/[slug]/page.tsx#L13-L15)
- [app/resources/page.tsx](app/resources/page.tsx#L7)

**Issue:** Blog, articles, and news sections show placeholder titles only
```typescript
// Hardcoded placeholder entries (no actual content)
const posts = [
  "How the right production process protects the idea",
  "Making branded content people choose to spend time with",
  "What a clear creative brief unlocks"
];
```

**What's Missing:**
- ❌ No actual blog post content/body text
- ❌ No article pages
- ❌ No publish dates
- ❌ No author information
- ❌ No category/tag system
- ❌ News/press releases empty
- ❌ No CMS or content management system

**Content to Create:**
1. **At least 3-4 blog posts** with:
   - Full article body (300-500 words minimum)
   - Featured image
   - Publish date
   - Category/tags
   - Author bio
   
2. **At least 3-4 evergreen articles** with:
   - In-depth content (800-1200 words)
   - External links
   - Code examples if relevant
   - Download resources

3. **News/Updates section** with:
   - Recent studio announcements
   - Project releases
   - Team news

**Action Required:**
- Create actual content or remove these sections from launch
- Or: Implement CMS integration (Contentful, Sanity, etc.)
- Temporary fix: Mark sections as "Coming Soon" if not launching with content

---

### 4. **Empty Portfolio/Gallery** ⛔
**Priority:** HIGH  
**Files:** 
- [app/resources/[slug]/page.tsx](app/resources/[slug]/page.tsx#L38-L42) (gallery section)
- [lib/site-data.ts](lib/site-data.ts#L97-L102) (projects array)
- [components/work-showcase.tsx](components/work-showcase.tsx)

**Issue:** Portfolio shows only 4 projects with generic titles and placeholder images
```typescript
// From site-data.ts - Only 4 generic projects
const projects = [
  { slug: "automotive-launch", type: "Advertising", ... title: "Velocity, given a new language." ... },
  { slug: "luxury-beauty", type: "Production", ... title: "Light that moves." ... },
  // etc - only 4 total
];
```

**Gallery Issues:**
```typescript
// From resources page - Only 6 hardcoded images
const gallery = ["/client/frame-01.jpg", "/client/frame-03.jpg", "/client/frame-05.jpg"];
```

**What's Missing:**
- ❌ Only 4 project examples (should have 8-12+ for credibility)
- ❌ No case study content or project descriptions
- ❌ No client names or results
- ❌ No project video reels
- ❌ Limited gallery (only 6 images)
- ❌ No project filtering by service
- ❌ No detailed project pages

**Action Required:**
- Add 8-12+ real portfolio projects with:
  - Proper project titles
  - Client names
  - Results/metrics
  - 2-3 images per project
  - Full case study description
  - Video/reel if available

- Expand gallery to 15-20+ high-quality images
- Organize gallery by category
- Add "View Case Study" links
- Implement proper project detail pages

**Current Images Available:** Only 6 in public/client/:
- frame-01.jpg through frame-06.jpg (plus frame-05.jpg duplicated)
- Need to expand or link to actual production stills

---

## HIGH PRIORITY ISSUES (Must Fix for Quality Launch)

### 5. **Missing Metadata & SEO Content**
**Priority:** HIGH  
**Files:** [app/layout.tsx](app/layout.tsx)

**Issues:**
- ✅ Homepage title and description set (GOOD)
- ❌ Individual page titles generic/minimal
- ❌ Missing Open Graph images for social sharing
- ❌ Missing Twitter card meta tags
- ❌ Missing canonical URLs
- ❌ Missing structured data (JSON-LD)
- ❌ Missing alt text on many images
- ❌ No sitemap.xml
- ❌ No robots.txt

**Missing Meta Tags on Pages:**
```typescript
// app/layout.tsx has basic metadata
export const metadata: Metadata = {
  title: { default: "Narayani Studios LLP", template: "%s · Narayani Studios" },
  description: "...", // Generic
  metadataBase: new URL("https://narayanistudios.com"),
  // MISSING: openGraph, twitter, canonical, icons, etc.
};
```

**Action Required:**
- Add Open Graph meta tags to all pages
- Add Twitter Card meta tags
- Generate `public/sitemap.xml`
- Generate `public/robots.txt`
- Add canonical URLs for dynamic routes
- Add JSON-LD structured data (Organization, BreadcrumbList, etc.)
- Audit and add alt text to all images
- Generate and add favicon/site icons

---

### 6. **Incomplete Service Pages - Missing Detail**
**Priority:** HIGH  
**Files:** 
- [lib/site-data.ts](lib/site-data.ts#L80-L88) (house offerings)
- [app/[studio]/page.tsx](app/[studio]/page.tsx#L9-L45)

**Issue:** Services reference pages that exist but are minimal:

**Unfinished Pages (Exist but Minimal Content):**

1. **/team** - Exists, has structure, but:
   - ❌ Only 2 founders shown
   - ❌ No department details
   - ❌ No team member bios
   - ❌ No team photos

2. **/productions** - Exists but:
   - ❌ No actual production examples
   - ❌ No film/series list
   - ❌ No release dates

3. **/talent** - Exists but:
   - ❌ No talent roster
   - ❌ No creator/artist profiles
   - ❌ No representation terms

4. **/media-ip** - Exists but:
   - ❌ No IP examples
   - ❌ No platform list
   - ❌ No licensing info

5. **/insights** - Exists but:
   - Links to resources which are empty
   - No unique insights content

**Action Required:**
- Add substantial content to each division page
- Add real examples/case studies
- Add team member profiles (if launching with team page)
- Add actual IP/production list
- Or: Remove pages not ready from navigation

---

### 7. **Limited Testimonials & Social Proof**
**Priority:** HIGH  
**File:** [lib/site-data.ts](lib/site-data.ts#L105-L108)

**Issue:** Only 3 generic testimonials
```typescript
const testimonials = [
  { quote: "A thoughtful, decisive partner...", name: "Brand Partner", scope: "Integrated campaign" },
  // Only 3 total, all generic company types/roles
];
```

**Problems:**
- ❌ Too few testimonials for credibility
- ❌ No client names/companies
- ❌ Generic titles ("Brand Partner", "Marketing Lead")
- ❌ No photos/avatars
- ❌ No detailed case studies

**Action Required:**
- Add 8-12 testimonials with:
  - Real client names
  - Project names
  - Specific quotes about results
  - Client photos/logos
  - Metrics/results achieved

---

### 8. **Incomplete FAQ Section**
**Priority:** MEDIUM-HIGH  
**File:** [lib/site-data.ts](lib/site-data.ts#L109-L116)

**Issue:** Only 4 FAQs provided
```typescript
const faqs = [
  ["Can I hire you for just one service?", "..."],
  // Only 4 total
];
```

**Gaps:**
- ❌ No pricing/budget questions
- ❌ No timeline questions (mostly covered)
- ❌ No payment/contract questions
- ❌ No IP/ownership questions
- ❌ No revision/approval process questions
- ❌ No technical questions

**Action Required:**
- Expand to 12-15 FAQs covering:
  - Pricing and budgets
  - Timelines
  - Contract/legal
  - IP ownership
  - Revisions
  - Technical specs
  - Deliverables

---

## MEDIUM PRIORITY ISSUES (Should Fix Before Launch)

### 9. **Broken/Unlinked Pages References in Navigation**
**Priority:** MEDIUM  
**File:** [lib/site-data.ts](lib/site-data.ts#L159-L171)

**Issue:** Navigation references 11 pages but not all are complete
```typescript
export const navIndex = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Portfolio", "/portfolio"],
  ["Resources", "/resources"],
  ["Contact", "/contact"],
  ["Team", "/team"],              // ⚠️ Minimal content
  ["Productions", "/productions"], // ⚠️ No productions listed
  ["Talent", "/talent"],           // ⚠️ No talent roster
  ["Media & IP", "/media-ip"],     // ⚠️ No IP listed
  ["FAQ", "/faq"],                 // ✅ Complete but minimal FAQs
];
```

**Which Pages are Incomplete:**
- `/team` - Exists but needs team content
- `/productions` - Needs real productions list
- `/talent` - Needs talent roster
- `/media-ip` - Needs IP/platform list
- `/faq` - Has 4 FAQs, should have more

**Action Required:**
- Either populate these pages with real content
- Or remove from primary navigation until ready
- Set clear redirect/coming-soon messaging

---

### 10. **Missing Image Assets**
**Priority:** MEDIUM  
**Folder:** [public/](public/)

**What Exists:**
- ✅ Branding assets (logos, marks)
- ✅ Service category images (6)
- ✅ Founder photos (2)
- ✅ Client portfolio frames (6)
- ✅ Hero reel video

**What's Missing:**
- ❌ High-resolution project images (only 6 generic frames)
- ❌ Team member photos (only 2 founder photos)
- ❌ Case study images
- ❌ Equipment/studio photos
- ❌ Process/behind-scenes images
- ❌ Client logos (for testimonials/clients section)
- ❌ Additional video content

**Action Required:**
- Add 30-50+ high-quality images for:
  - Portfolio/projects
  - Team members
  - Studio/equipment
  - Process documentation
  - Team building photos
- Optimize all images for web (proper sizing, format, compression)
- Add WebP versions for modern browsers

---

### 11. **Missing Reels & Video Content**
**Priority:** MEDIUM  
**Files:** [public/](public/) | [components/hero.tsx](components/hero.tsx#L28-L31)

**Current Video:**
- ✅ Hero reel exists (`/house-reel.mp4`)

**Missing Videos:**
- ❌ Service division reels
- ❌ Testimonial videos
- ❌ Behind-the-scenes content
- ❌ Process videos
- ❌ Team introduction videos
- ❌ Client work reels

**Action Required:**
- If not available, remove video components or show static alternatives
- Or: Commission/shoot video content
- Minimum: Hero reel must be production-ready

---

### 12. **Missing Craft Page Content for Non-Production Services**
**Priority:** MEDIUM  
**Files:** [app/services/[slug]/page.tsx](app/services/[slug]/page.tsx)

**Issue:** Only production service has detailed craft pages
```typescript
// Only productionCrafts gets full detail pages
export function generateStaticParams() {
  return productionCrafts.map((craft) => ({ slug: "production", craft: craft.slug }));
}
// Pre-production, post-production, and other services don't have /[craft]/ pages
```

**What's Missing:**
- ❌ Pre-production craft detail pages
- ❌ Post-production craft detail pages
- ❌ Digital & Social craft pages
- ❌ Advertising craft pages
- ❌ Events craft pages

**Current State:** These services show accordions with craft names only, no dedicated pages

**Action Required:**
- Either: Extend craft detail pages to all services
- Or: Accept that only production has detailed pages
- Or: Consolidate into tabbed interface (currently done, this is acceptable)

---

## LOW PRIORITY ISSUES (Nice to Have / Polish)

### 13. **Generic Service Descriptions in ServiceAccordion**
**Priority:** LOW  
**File:** [components/service-accordion.tsx](components/service-accordion.tsx#L15)

**Issue:** All service items show same generic copy
```typescript
<p>Every {item.toLowerCase()} engagement is shaped around the audience, the brief and the outcome...</p>
```

**Improvement:** Add unique descriptions for each service accordion item

---

### 14. **Hardcoded Gallery Images in Resources**
**Priority:** LOW  
**File:** [app/resources/[slug]/page.tsx](app/resources/[slug]/page.tsx#L14)

**Issue:** Gallery uses hardcoded image list
```typescript
const gallery = ["/client/frame-01.jpg", "/client/frame-02.jpg", ...];
```

**Better Approach:** Use data-driven gallery with descriptions/captions

---

### 15. **Contact Form Field Validation**
**Priority:** LOW  
**File:** [components/contact-form.tsx](components/contact-form.tsx)

**Current Fields:**
- Name ✅
- Email ✅
- Service ✅
- Details ✅

**Missing Optional Fields (Consider Adding):**
- ❓ Company name
- ❓ Budget range
- ❓ Timeline
- ❓ Phone number

These are in the email template but not in form.

---

## DEPLOYMENT CHECKLIST

### Before Launch (Must Complete)
- [ ] Fix contact form - implement proper API endpoint
- [ ] Configure email service (Resend) environment variables
- [ ] Add blog/articles content OR remove from launch
- [ ] Expand portfolio with 8-12+ real projects
- [ ] Expand gallery to 15-20+ images
- [ ] Add SEO meta tags (OG, Twitter, structured data)
- [ ] Generate sitemap.xml and robots.txt
- [ ] Test all navigation links work
- [ ] Verify all images load correctly
- [ ] Test contact form submission end-to-end
- [ ] Review all copy for typos/completeness
- [ ] Add alt text to all images
- [ ] Test on mobile devices
- [ ] Lighthouse audit (target 90+ on all metrics)
- [ ] Test form validation and error states

### Configuration Needed
- [ ] Set `RESEND_API_KEY` environment variable
- [ ] Set `CONTACT_FROM` environment variable  
- [ ] Set `CONTACT_TO` environment variable
- [ ] Verify `NEXT_PUBLIC_CONTACT_EMAIL` is correct
- [ ] Verify `NEXT_PUBLIC_BASE_PATH` if using subdirectory

### Content to Create
- [ ] 3-4 blog posts (300-500 words each)
- [ ] 3-4 articles (800-1200 words each)
- [ ] 8-12+ portfolio projects with case studies
- [ ] 15-20+ portfolio/gallery images
- [ ] 8-12 comprehensive FAQs
- [ ] Team member bios (if showing team)
- [ ] 8-12 client testimonials with real names

### Optional Enhancements
- [ ] Implement blog CMS (Contentful, Sanity, etc.)
- [ ] Add newsletter signup
- [ ] Add social media links
- [ ] Add analytics (Google Analytics, Hotjar)
- [ ] Add chat/support widget
- [ ] Implement dark mode toggle
- [ ] Add loading states for lazy images
- [ ] Create 404 error page

---

## Summary

**Status:** ~60% complete for launch readiness

**Critical Gaps:**
1. Contact form not sending emails
2. Empty blog/resources
3. Minimal portfolio (4 projects)
4. Missing email configuration

**Timeline:** 2 days is tight. Prioritize:
- **Day 1:** Fix contact system, add 5-8 portfolio projects, configure emails
- **Day 2:** Add blog content, expand gallery, fix SEO, final testing

**Risk Level:** 🔴 HIGH - Multiple critical items could prevent launch
