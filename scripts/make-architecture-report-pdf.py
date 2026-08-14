from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parents[1]
R = ROOT / "public" / "report"
OUT = R / "Narayani-Studios-Architecture-Change-Report.pdf"

GOLD = (200, 169, 107)
INK = (8, 9, 11)
IVORY = (242, 238, 230)
SMOKE = (90, 90, 90)
WARN = (120, 90, 40)


class Report(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_fill_color(*INK)
        self.rect(0, 0, 210, 12, "F")
        self.set_text_color(*GOLD)
        self.set_font("Helvetica", "", 8)
        self.set_xy(12, 4)
        self.cell(0, 4, "NARAYANI STUDIOS LLP  |  Architecture change report")
        self.set_xy(-70, 4)
        self.cell(56, 4, "Client copy  |  14 Aug 2026", align="R")

    def footer(self):
        self.set_y(-12)
        self.set_text_color(*SMOKE)
        self.set_font("Helvetica", "", 8)
        self.cell(0, 6, f"Page {self.page_no()}  |  Brief v1 vs live site  |  10-day finish after assets", align="C")

    def h1(self, text):
        self.set_text_color(*INK)
        self.set_font("Helvetica", "B", 16)
        self.ln(3)
        self.multi_cell(0, 7, text, new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def h2(self, text):
        self.set_text_color(*GOLD)
        self.set_font("Helvetica", "B", 10)
        self.ln(2)
        self.cell(0, 6, text.upper())
        self.ln(7)

    def body(self, text):
        self.set_text_color(*INK)
        self.set_font("Helvetica", "", 10)
        self.multi_cell(0, 5.2, text, new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def caption(self, text):
        self.set_text_color(*SMOKE)
        self.set_font("Helvetica", "I", 8)
        self.multi_cell(0, 4, text, new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def pair(self, left, right, cap_l, cap_r, h=62):
        gap = 4
        usable = 210 - self.l_margin - self.r_margin
        w = (usable - gap) / 2
        if self.get_y() + h + 22 > 280:
            self.add_page()
        y = self.get_y()
        x = self.l_margin
        for file, cap, xx in ((left, cap_l, x), (right, cap_r, x + w + gap)):
            path = R / file
            if path.exists():
                self.image(str(path), x=xx, y=y, w=w, h=h)
        self.set_y(y + h + 1)
        self.set_text_color(*SMOKE)
        self.set_font("Helvetica", "I", 7.5)
        self.set_x(x)
        self.multi_cell(w, 3.6, cap_l, new_x="RIGHT", new_y="TOP")
        self.set_xy(x + w + gap, self.get_y() if False else y + h + 1)
        y2 = self.get_y()
        self.set_xy(x + w + gap, y + h + 1)
        self.multi_cell(w, 3.6, cap_r, new_x="LMARGIN", new_y="NEXT")
        self.set_y(max(self.get_y(), y2) + 3)

    def kv(self, title, copy):
        pdf = self
        pdf.set_text_color(*GOLD)
        pdf.set_font("Helvetica", "B", 10)
        pdf.cell(38, 6, title)
        pdf.set_text_color(*INK)
        pdf.set_font("Helvetica", "", 10)
        pdf.multi_cell(0, 6, copy, new_x="LMARGIN", new_y="NEXT")
        pdf.ln(0.5)


pdf = Report(format="A4", unit="mm")
pdf.set_auto_page_break(auto=True, margin=16)
pdf.set_margins(14, 16, 14)

pdf.add_page()
pdf.set_fill_color(*INK)
pdf.rect(0, 0, 210, 297, "F")
pdf.set_text_color(*GOLD)
pdf.set_font("Helvetica", "", 11)
pdf.set_xy(14, 38)
pdf.cell(0, 8, "NARAYANI STUDIOS LLP")
pdf.set_font("Helvetica", "B", 26)
pdf.set_xy(14, 50)
pdf.set_text_color(*IVORY)
pdf.multi_cell(180, 11, "Architecture\nchange report")
pdf.set_font("Helvetica", "", 11)
pdf.set_text_color(*GOLD)
pdf.set_xy(14, 88)
pdf.multi_cell(
    180,
    6,
    "Visual Design Brief v1 versus the live website.\nProof screenshots  |  Sitemap  |  Services  |  Remaining work  |  10-day go-live plan",
)
pdf.set_font("Helvetica", "", 10)
pdf.set_text_color(180, 176, 168)
pdf.set_xy(14, 128)
pdf.multi_cell(180, 5.5, "28 brief sections mapped    10 shipped as specified    13 shipped with architecture changed    10 days to live after assets")
pdf.set_xy(14, 250)
pdf.multi_cell(180, 5, "Prepared for the client\n14 August 2026\nLive captures from the staging build (localhost:3000).")

pdf.add_page()
pdf.h1("What changed in one line")
pdf.body(
    "The brief asked for five cream-coloured tabs and six equal services. "
    "The live site is a noir production house: Home / About / Services / Team / Work, "
    "a three-stage spine, production crafts as their own URLs, and a compiled house reel on the hero."
)

pdf.h1("1. Sitemap")
pdf.pair(
    "v1-02.png",
    "live-home.png",
    "Brief: Home, About, Services (6 pages), Our work, Resources (6), Contact.",
    "Live header: HOME, ABOUT US, SERVICES, TEAM, WORK, ENQUIRE.",
)
pdf.kv("Nav", "Brief: About, Services, Our work, Resources, Contact. Live: Home, About, Services, Team, Work + Enquire.")
pdf.kv("Why", "Team visible in the bar; Index for the 12 business objects; Work named instead of Our work.")

pdf.h1("2. Home")
pdf.pair(
    "v1-03.png",
    "live-home.png",
    "Brief cream home: Stories built end to end; intro video; logos; testimonials; 6 service cards.",
    "Live hero: Brand it. Shoot it. Finish it. House reel. Pre / Production / Post rail.",
    h=70,
)
pdf.kv("Visual system", "Cream mockup replaced with Obsidian Noir x Champagne after the business-objects brief.")
pdf.kv("Hero", "Play-button intro video replaced by one compiled house reel.")
pdf.kv("Headline", "Stories, built end to end  ->  Brand it. Shoot it. Finish it.")
pdf.kv("Services on home", "6 equal cards -> 3 spine cards. Digital, ads, events live under /services.")
pdf.kv("Logos / stats / quotes", "Not on home. No real logos or numbers from the client yet.")

pdf.add_page()
pdf.h1("3. Services architecture")
pdf.pair(
    "v1-06.png",
    "live-services.png",
    "Brief Pre-production: one page, inline tags, Enquire + View this service's work.",
    "Live /services: Pre. Production. Post. then Digital, Advertising, Events.",
)
pdf.pair(
    "v1-07.png",
    "live-production.png",
    "Brief Production: inline tags only, same pattern as Pre.",
    "Live /services/production: each craft opens its own page.",
)
pdf.body("Routes live now:")
for route, meaning in [
    ("/services", "Overview of all six divisions"),
    ("/services/pre-production", "One page, tabbed crafts (matches brief)"),
    ("/services/production", "Hub of tiles (changed from brief)"),
    ("/services/production/{craft}", "7 separate pages - added after you asked each craft to have its own page"),
    ("/services/post-production", "One page, tabbed crafts (matches brief)"),
    ("/services/digital-social, /advertising, /events", "Division pages as in the brief"),
]:
    pdf.kv(route[:36], meaning)

pdf.add_page()
pdf.h1("4. Work")
pdf.pair(
    "v1-12.png",
    "live-work.png",
    "Brief: one scrolling page, six category bands, 3 project slots each (18 frames).",
    "Live Work / portfolio. Structure is live; frames are placeholders until real stills arrive.",
)
pdf.body("Work tab goes to /portfolio. /our-work exists but shows four placeholder frames (Northbound, Afterglow, Signal, Volume), not six category sections.")

pdf.h1("Pending work")
pdf.body("Clock starts when the asset pack arrives. Plan is 10 working days through testing and go-live, one developer, files in one folder.")
pending = [
    "Swap stock house reel for client dailies (shoot, edit, campaigns, conference, broadcast, live)",
    "Our work: six category sections with real projects (3+ each)",
    "Client logos + trust stats + real testimonials",
    "Founder / team photos and bios",
    "Blog, articles, news, gallery from real studio files",
    "Per-service view-this-work galleries + Enquire destinations",
    "Lock nav to five PDF tabs if the client prefers the brief over the current IA",
    "Contact: phone, address, GST, WhatsApp, social URLs",
    "Device and browser testing, form checks, video fallbacks",
    "Production build, deploy, live smoke test",
]
pdf.set_font("Helvetica", "", 10)
pdf.set_text_color(*INK)
for i, item in enumerate(pending, 1):
    pdf.multi_cell(0, 5.4, f"{i:02d}.  {item}", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(0.8)

pdf.add_page()
pdf.h1("What to collect from the client")
need = [
    ("House reel / process clips", "MP4, 1080p, 8-20 sec each", "Shooting, editing, scripting, digital, branded campaign, conference, broadcast, live show"),
    ("Work stills", "JPG/PNG, landscape", "3 projects x 6 categories = 18 frames + titles + year"),
    ("Client logos", "SVG or PNG on transparent", "6-12 marks they approve"),
    ("Trust numbers", "Text", "Clients served, years, satisfaction - only if they will stand behind them"),
    ("Testimonials", "Text + name + company", "3-6 real quotes, written permission"),
    ("Founders / team", "Portrait photos + 40-word bio", "Shreeraj, Kiran, plus any department heads"),
    ("Contact", "Text", "Email, phone, city, GSTIN, Instagram / LinkedIn"),
    ("Resources", "Docs or Google Drive", "2-4 posts, 4-8 gallery stills from set"),
    ("Legal", "PDF or text", "Privacy / terms if they want those pages"),
]
for item, fmt, minimum in need:
    pdf.set_text_color(*GOLD)
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(0, 6, item)
    pdf.ln(6)
    pdf.set_text_color(*SMOKE)
    pdf.set_font("Helvetica", "", 9)
    pdf.multi_cell(0, 4.8, f"{fmt}.  {minimum}", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(2)

pdf.h1("10-day plan - content, test, deploy")
pdf.body("Day 1 starts the morning after the full pack is in one folder. Late files push deploy past day 10. Testing and go-live are days 8-10.")
plan = [
    ("Day 1", "Ingest Drive pack. Contact, GST, social, Enquire inbox."),
    ("Day 2", "Founder and team photos, bios. Logos and trust numbers on home."),
    ("Day 3", "Testimonials. Our work: Pre, Production, Post sections."),
    ("Day 4", "Our work: Digital, Advertising, Events. Titles and years."),
    ("Day 5", "Per-service work links. Optional five-tab nav lock."),
    ("Day 6", "Recut house reel from shooting, edit, campaign, conference, broadcast, live clips."),
    ("Day 7", "Blog, news, gallery, resources copy. Legal pages if sent."),
    ("Day 8", "QA: Chrome, Edge, Safari, phone, tablet. Forms, 404s, video autoplay."),
    ("Day 9", "Fix bugs from QA. Client preview on staging. One revision pass."),
    ("Day 10", "Production build, deploy, live smoke test, handover."),
]
for day, copy in plan:
    pdf.set_text_color(*GOLD)
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(22, 6.5, day)
    pdf.set_text_color(*INK)
    pdf.set_font("Helvetica", "", 10)
    pdf.multi_cell(0, 6.5, copy, new_x="LMARGIN", new_y="NEXT")

pdf.ln(4)
pdf.set_fill_color(*INK)
pdf.set_text_color(*IVORY)
pdf.set_font("Helvetica", "", 10)
pdf.multi_cell(
    0,
    6,
    "  Clock rule: Day 1 starts the morning after the full pack is in one folder. Late files push deploy past day 10.",
    new_x="LMARGIN",
    new_y="NEXT",
    fill=True,
)

pdf.output(str(OUT))
print("wrote", OUT, OUT.stat().st_size)
