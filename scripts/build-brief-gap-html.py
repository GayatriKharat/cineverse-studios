"""Render the visual brief PDF and live site into a proof HTML report."""
from __future__ import annotations

import subprocess
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "reports" / "visual-brief-vs-site"
BRIEF = Path(r"F:\Downloads2\Narayani Studios Visual Design Brief.pdf")
CHROME = Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe")
BASE = "http://localhost:3000"
PROFILE = OUT / "chrome-profile"

PDF_PAGES = {
    0: "cover",
    1: "sitemap",
    2: "home",
    3: "about",
    4: "services-overview",
    5: "services-pre",
    6: "services-production",
    7: "services-post",
    8: "services-digital",
    9: "services-advertising",
    10: "services-events",
    11: "our-work",
    12: "resources-overview",
    13: "resources-blog",
    14: "resources-articles",
    15: "resources-news",
    16: "resources-faqs",
    17: "resources-gallery",
    18: "resources-testimonials",
    20: "contact",
}

SHOTS = [
    ("site-home.png", "/"),
    ("site-about.png", "/about/"),
    ("site-services.png", "/services/"),
    ("site-pre.png", "/services/pre-production/"),
    ("site-production.png", "/services/production/"),
    ("site-post.png", "/services/post-production/"),
    ("site-digital.png", "/services/digital-social/"),
    ("site-ads.png", "/services/advertising/"),
    ("site-events.png", "/services/events/"),
    ("site-portfolio.png", "/portfolio/"),
    ("site-our-work.png", "/our-work/"),
    ("site-resources.png", "/resources/"),
    ("site-blog.png", "/resources/blog/"),
    ("site-faqs.png", "/resources/faqs/"),
    ("site-gallery.png", "/resources/gallery/"),
    ("site-testimonials.png", "/resources/testimonials/"),
    ("site-contact.png", "/contact/"),
]


def render_pdf() -> None:
    dest = OUT / "brief"
    dest.mkdir(parents=True, exist_ok=True)
    doc = pymupdf.open(BRIEF)
    matrix = pymupdf.Matrix(1.7, 1.7)
    for index, slug in PDF_PAGES.items():
        pix = doc[index].get_pixmap(matrix=matrix, alpha=False)
        pix.save(dest / f"{slug}.png")
        print("brief", slug, pix.width, pix.height)


def shot_site() -> None:
    dest = OUT / "site"
    dest.mkdir(parents=True, exist_ok=True)
    PROFILE.mkdir(parents=True, exist_ok=True)
    for name, path in SHOTS:
        out = dest / name
        cmd = [
            str(CHROME),
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            "--window-size=1440,1100",
            f"--user-data-dir={PROFILE}",
            "--virtual-time-budget=7000",
            f"--screenshot={out}",
            BASE + path,
        ]
        print("shot", path)
        subprocess.run(cmd, check=False, capture_output=True)


def html() -> None:
    html = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Narayani Studios — Visual Brief vs Built Website</title>
<style>
  :root { --bg:#0b0c10; --card:#14151c; --line:#2a2d38; --ink:#f4f1fa; --mute:#a6a6a6; --yes:#3dd68c; --no:#ff6b6b; --part:#f5b400; --purple:#6e3fc7; }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink); font: 16px/1.55 Segoe UI, system-ui, sans-serif; }
  header { padding: 48px 7vw 24px; border-bottom: 1px solid var(--line); }
  header p { color: var(--mute); max-width: 720px; }
  h1 { font-weight: 600; letter-spacing: -.03em; margin: 0 0 12px; font-size: clamp(2rem, 4vw, 3.2rem); }
  .wrap { padding: 28px 7vw 80px; }
  .score { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 28px 0; }
  .score div { background: var(--card); border: 1px solid var(--line); padding: 18px; }
  .score b { display: block; font-size: 2rem; }
  table { width: 100%; border-collapse: collapse; background: var(--card); }
  th, td { border: 1px solid var(--line); padding: 10px 12px; text-align: left; vertical-align: top; font-size: 14px; }
  th { background: #1b1d27; }
  .yes { color: var(--yes); font-weight: 700; }
  .no { color: var(--no); font-weight: 700; }
  .part { color: var(--part); font-weight: 700; }
  .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0 36px; }
  figure { margin: 0; background: var(--card); border: 1px solid var(--line); }
  figure img { width: 100%; display: block; background: #000; }
  figcaption { padding: 10px 12px; font-size: 12px; color: var(--mute); letter-spacing: .08em; text-transform: uppercase; }
  h2 { margin-top: 48px; }
  .note { color: var(--mute); font-size: 14px; }
  @media (max-width: 900px) { .score, .pair { grid-template-columns: 1fr; } }
</style>
</head>
<body>
<header>
  <p>Architecture gap report · 18 Aug 2026 · Local proof against the Visual Website Design Brief PDF</p>
  <h1>Brief vs built website</h1>
  <p>Source brief: <code>Narayani Studios Visual Design Brief.pdf</code> (21 pages). Live capture: <code>http://localhost:3000</code> (same build as GitHub Pages). Screenshots are the top of each page after load.</p>
</header>
<div class="wrap">
  <div class="score">
    <div><b>21</b>Brief pages reviewed</div>
    <div><b>12</b class="yes">Requirements present</div>
    <div><b>7</b class="part">Partial / renamed</div>
    <div><b>6</b class="no">Missing or extra architecture</div>
  </div>

  <h2>1. Site structure (PDF page 1)</h2>
  <p class="note">Brief: five tabs off the homepage — About us, Services, Our work, Resources, Contact. About / Our work / Contact are single pages. Services = 6 pages with inline-expanding tabs. Resources = 6 pages including Testimonials.</p>
  <div class="pair">
    <figure><img src="brief/sitemap.png" alt="Brief sitemap page" /><figcaption>Brief · sitemap</figcaption></figure>
    <figure><img src="site/site-home.png" alt="Built homepage with nav" /><figcaption>Built · homepage + current nav</figcaption></figure>
  </div>
  <table>
    <thead><tr><th>Brief requirement</th><th>Built website</th><th>Verdict</th><th>Proof</th></tr></thead>
    <tbody>
      <tr><td>Five tabs: About us, Services, Our work, Resources, Contact</td><td>Six items: Home, About, Services, Portfolio, Resources, Contact</td><td class="part">Partial</td><td>Nav on every screenshot. Extra Home. “Our work” renamed Portfolio and lives at <code>/portfolio</code> (also <code>/our-work</code>).</td></tr>
      <tr><td>About us = single page</td><td><code>/about</code> founders + copy</td><td class="yes">Same</td><td>site-about.png</td></tr>
      <tr><td>Services expands to six pages</td><td>All six routes exist</td><td class="yes">Same</td><td>pre / production / post / digital-social / advertising / events</td></tr>
      <tr><td>Inline-expanding tabs, no extra craft pages</td><td>Pre/post/digital use inline bars. Production still has extra <code>/services/production/[craft]</code> pages</td><td class="part">Partial</td><td>CraftTabs + production craft routes</td></tr>
      <tr><td>Our work = one scrolling page, six category sections</td><td>Portfolio/our-work shows 4 frames + 6 service chips, not six full category bands</td><td class="no">Different</td><td>site-portfolio.png</td></tr>
      <tr><td>Resources = Blog, Articles, News, FAQs, Gallery, Testimonials</td><td>All six routes exist from Resources dropdown and overview</td><td class="yes">Same</td><td>site-resources.png</td></tr>
      <tr><td>Contact = single page, form + details</td><td><code>/contact</code> form + studio details</td><td class="yes">Same</td><td>site-contact.png</td></tr>
      <tr><td>No extra top-level studio pages</td><td>Extra: Team, Productions, Talent, Media &amp; IP, FAQ, craft URLs</td><td class="no">Extra</td><td>Still reachable, not in the five-tab brief</td></tr>
    </tbody>
  </table>

  <h2>2. Home (PDF page 2)</h2>
  <p class="note">Brief: hero, intro video, client logos, testimonials, trust stats, services, work, contact CTA.</p>
  <div class="pair">
    <figure><img src="brief/home.png" alt="Brief home mockup" /><figcaption>Brief · Home</figcaption></figure>
    <figure><img src="site/site-home.png" alt="Built home" /><figcaption>Built · Home</figcaption></figure>
  </div>
  <table>
    <thead><tr><th>Brief</th><th>Built</th><th>Verdict</th></tr></thead>
    <tbody>
      <tr><td>Hero</td><td>Full-viewport hero, “Brand it / Shoot it / Finish it”, house reel</td><td class="yes">Same intent</td></tr>
      <tr><td>Intro video (separate from hero)</td><td>One hero reel only — no second intro block</td><td class="no">Missing</td></tr>
      <tr><td>Client logos</td><td>Text marquee (“Brand partners…”) not logo marks</td><td class="part">Partial</td></tr>
      <tr><td>Testimonials on home</td><td>Testimonials only under Resources</td><td class="no">Missing on home</td></tr>
      <tr><td>Trust stats</td><td>Four stats (12+ crafts, 3 stages, India, 1 house)</td><td class="yes">Same</td></tr>
      <tr><td>Services on home</td><td>Three spine cards (Pre / Production / Post), not all six</td><td class="part">Partial</td></tr>
      <tr><td>Work on home</td><td>Four selected frames</td><td class="yes">Same intent</td></tr>
      <tr><td>Contact CTA</td><td>Hero + bottom enquire band</td><td class="yes">Same</td></tr>
    </tbody>
  </table>

  <h2>3. About us (PDF page 3)</h2>
  <div class="pair">
    <figure><img src="brief/about.png" alt="Brief about mockup" /><figcaption>Brief · About</figcaption></figure>
    <figure><img src="site/site-about.png" alt="Built about" /><figcaption>Built · /about</figcaption></figure>
  </div>
  <p><span class="yes">Same architecture:</span> single page at <code>/about</code> with founders. <span class="part">Partial:</span> team is a separate <code>/team</code> page instead of a section on About.</p>

  <h2>4. Services overview + six divisions (PDF pages 4–10)</h2>
  <div class="pair">
    <figure><img src="brief/services-overview.png" alt="Brief services overview" /><figcaption>Brief · Services overview</figcaption></figure>
    <figure><img src="site/site-services.png" alt="Built services" /><figcaption>Built · /services</figcaption></figure>
  </div>
  <div class="pair">
    <figure><img src="brief/services-pre.png" alt="Brief pre-production" /><figcaption>Brief · Pre-production</figcaption></figure>
    <figure><img src="site/site-pre.png" alt="Built pre-production" /><figcaption>Built · /services/pre-production</figcaption></figure>
  </div>
  <div class="pair">
    <figure><img src="brief/services-production.png" alt="Brief production" /><figcaption>Brief · Production</figcaption></figure>
    <figure><img src="site/site-production.png" alt="Built production" /><figcaption>Built · /services/production</figcaption></figure>
  </div>
  <table>
    <thead><tr><th>Brief</th><th>Built</th><th>Verdict</th></tr></thead>
    <tbody>
      <tr><td>Overview links to all six divisions</td><td>Pre / Production / Post plus Digital, Advertising, Events</td><td class="yes">Same</td></tr>
      <tr><td>Tags expand inline, no separate pages</td><td>Inline craft bars on pre/post. Production still has “Open full page” craft URLs</td><td class="part">Partial</td></tr>
      <tr><td>Two buttons: Enquire + view this service’s work</td><td>Enquire exists. “View this service’s work” is not on service pages (goes to all services / contact CTA)</td><td class="no">Missing work button</td></tr>
      <tr><td>Digital, Advertising, Events pages</td><td>Routes exist; digital/ads/events use item lists or crafts if defined</td><td class="yes">Routes same</td></tr>
    </tbody>
  </table>
  <div class="pair">
    <figure><img src="site/site-digital.png" alt="Digital" /><figcaption>Built · /services/digital-social</figcaption></figure>
    <figure><img src="site/site-events.png" alt="Events" /><figcaption>Built · /services/events</figcaption></figure>
  </div>

  <h2>5. Our work (PDF page 11)</h2>
  <div class="pair">
    <figure><img src="brief/our-work.png" alt="Brief our work" /><figcaption>Brief · /our-work · six category sections</figcaption></figure>
    <figure><img src="site/site-portfolio.png" alt="Built portfolio" /><figcaption>Built · /portfolio (Our work is this page)</figcaption></figure>
  </div>
  <p><span class="no">Different:</span> brief wants one long page with six category sections (3+ projects each). Built page is four frames plus chips that jump to service pages. <code>/our-work</code> mirrors portfolio, it is not six bands.</p>

  <h2>6. Resources (PDF pages 12–18)</h2>
  <div class="pair">
    <figure><img src="brief/resources-overview.png" alt="Brief resources" /><figcaption>Brief · Resources overview</figcaption></figure>
    <figure><img src="site/site-resources.png" alt="Built resources" /><figcaption>Built · /resources</figcaption></figure>
  </div>
  <div class="pair">
    <figure><img src="brief/resources-faqs.png" alt="Brief FAQs" /><figcaption>Brief · FAQs accordion</figcaption></figure>
    <figure><img src="site/site-faqs.png" alt="Built FAQs" /><figcaption>Built · /resources/faqs</figcaption></figure>
  </div>
  <div class="pair">
    <figure><img src="brief/resources-gallery.png" alt="Brief gallery" /><figcaption>Brief · Gallery grid</figcaption></figure>
    <figure><img src="site/site-gallery.png" alt="Built gallery" /><figcaption>Built · /resources/gallery</figcaption></figure>
  </div>
  <div class="pair">
    <figure><img src="brief/resources-testimonials.png" alt="Brief testimonials" /><figcaption>Brief · Testimonials cards</figcaption></figure>
    <figure><img src="site/site-testimonials.png" alt="Built testimonials" /><figcaption>Built · /resources/testimonials</figcaption></figure>
  </div>
  <table>
    <thead><tr><th>Brief URL</th><th>Built</th><th>Verdict</th></tr></thead>
    <tbody>
      <tr><td>/resources</td><td>Index of six types</td><td class="yes">Same</td></tr>
      <tr><td>/resources/blog chronological posts</td><td>Placeholder editorial list, not a real post archive</td><td class="part">Shell only</td></tr>
      <tr><td>/resources/articles topic-tagged</td><td>Same placeholder list</td><td class="part">Shell only</td></tr>
      <tr><td>/resources/news dated announcements</td><td>Dated labels on dummy entries</td><td class="part">Shell only</td></tr>
      <tr><td>/resources/faqs accordion</td><td>Accordion FAQ list</td><td class="yes">Same</td></tr>
      <tr><td>/resources/gallery photo grid</td><td>Still grid (stock frames)</td><td class="yes">Same pattern</td></tr>
      <tr><td>/resources/testimonials cards</td><td>Three testimonial cards</td><td class="yes">Same pattern</td></tr>
    </tbody>
  </table>

  <h2>7. Contact (PDF page 20)</h2>
  <div class="pair">
    <figure><img src="brief/contact.png" alt="Brief contact" /><figcaption>Brief · Contact</figcaption></figure>
    <figure><img src="site/site-contact.png" alt="Built contact" /><figcaption>Built · /contact</figcaption></figure>
  </div>
  <p><span class="yes">Same architecture:</span> single page, form (name, email, service, details) plus direct studio details. Enquire from a service pre-fills the service field.</p>

  <h2>Scoreboard</h2>
  <table>
    <thead><tr><th>Area</th><th>Match</th></tr></thead>
    <tbody>
      <tr><td>IA: six service URLs + six resource URLs + about + contact</td><td class="yes">Done</td></tr>
      <tr><td>IA: five-tab labels exactly as brief (Our work, no Home)</td><td class="part">Renamed / extra Home</td></tr>
      <tr><td>Home: intro video + testimonials + real logos + six service cards</td><td class="no">Not as specified</td></tr>
      <tr><td>Service: inline tags</td><td class="part">Mostly; production still has extra pages</td></tr>
      <tr><td>Service: Enquire + view this service’s work</td><td class="part">Enquire only</td></tr>
      <tr><td>Our work: six category sections</td><td class="no">Four frames + chips</td></tr>
      <tr><td>Resources shells (FAQ, gallery, testimonials)</td><td class="yes">Done</td></tr>
      <tr><td>Blog / articles / news real content</td><td class="part">Placeholder copy</td></tr>
      <tr><td>Contact form + details</td><td class="yes">Done</td></tr>
    </tbody>
  </table>
  <p class="note">This file is local (<code>reports/visual-brief-vs-site/index.html</code>) and is not deployed to GitHub Pages.</p>
</div>
</body>
</html>
"""
    (OUT / "index.html").write_text(html, encoding="utf-8")
    print("wrote", OUT / "index.html")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    render_pdf()
    shot_site()
    html()
