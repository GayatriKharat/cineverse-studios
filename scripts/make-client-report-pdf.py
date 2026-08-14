from pathlib import Path
from fpdf import FPDF

ROOT = Path(__file__).resolve().parents[1]
R = ROOT / "public" / "report"
OUT = R / "Narayani-Studios-Website-Progress-Report.pdf"

GOLD = (200, 169, 107)
INK = (8, 9, 11)
IVORY = (242, 238, 230)
SMOKE = (90, 90, 90)
LINE = (40, 42, 46)


class Report(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_fill_color(*INK)
        self.rect(0, 0, 210, 12, "F")
        self.set_text_color(*GOLD)
        self.set_font("Helvetica", "", 8)
        self.set_xy(12, 4)
        self.cell(0, 4, "NARAYANI STUDIOS LLP  |  Website progress report", align="L")
        self.set_xy(-60, 4)
        self.cell(48, 4, "Confidential  |  Client copy", align="R")

    def footer(self):
        self.set_y(-12)
        self.set_text_color(*SMOKE)
        self.set_font("Helvetica", "", 8)
        self.cell(0, 6, f"Page {self.page_no()}  |  14 August 2026  |  10-day finish after assets", align="C")

    def h1(self, text):
        self.set_text_color(*INK)
        self.set_font("Helvetica", "B", 18)
        self.ln(4)
        self.multi_cell(0, 8, text, new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def h2(self, text):
        self.set_text_color(*GOLD)
        self.set_font("Helvetica", "B", 11)
        self.ln(3)
        self.cell(0, 7, text.upper())
        self.ln(8)

    def body(self, text):
        self.set_text_color(*INK)
        self.set_font("Helvetica", "", 10)
        self.multi_cell(0, 5.2, text, new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def shot(self, file, caption, h=78):
        path = R / file
        if not path.exists():
            return
        x = self.l_margin
        w = 210 - self.l_margin - self.r_margin
        if self.get_y() + h + 14 > 285:
            self.add_page()
        self.image(str(path), x=x, w=w, h=h)
        self.ln(h + 1)
        self.set_text_color(*SMOKE)
        self.set_font("Helvetica", "I", 8)
        self.multi_cell(0, 4, caption, new_x="LMARGIN", new_y="NEXT")
        self.ln(3)


pdf = Report(format="A4", unit="mm")
pdf.set_auto_page_break(auto=True, margin=16)
pdf.set_margins(14, 16, 14)

# Cover
pdf.add_page()
pdf.set_fill_color(*INK)
pdf.rect(0, 0, 210, 297, "F")
pdf.set_text_color(*GOLD)
pdf.set_font("Helvetica", "", 11)
pdf.set_xy(14, 40)
pdf.cell(0, 8, "NARAYANI STUDIOS LLP")
pdf.set_font("Helvetica", "B", 28)
pdf.set_xy(14, 52)
pdf.set_text_color(*IVORY)
pdf.multi_cell(170, 12, "Website build\nprogress report")
pdf.set_font("Helvetica", "", 12)
pdf.set_text_color(*GOLD)
pdf.set_xy(14, 90)
pdf.multi_cell(170, 6, "Architecture vs design brief  |  Live screenshots  |  Remaining work  |  10-day plan to go-live")
pdf.set_font("Helvetica", "", 10)
pdf.set_text_color(180, 176, 168)
pdf.set_xy(14, 250)
pdf.multi_cell(170, 5, "Prepared for the client\n14 August 2026\nScreenshots captured from the staging site (localhost build).")

# Live proof
pdf.add_page()
pdf.h1("1. Live site - what is built")
pdf.body("These are real captures of the current website. Navigation: Home, About us, Services, Team, Work, plus Enquire.")
pdf.shot("live-home.png", "Home. Hero house reel, headline Brand it. Shoot it. Finish it. Stage rail: Pre-production, Production, Post-production.")
pdf.shot("live-services.png", "Services overview. Six divisions sit under one spine: Pre. Production. Post. Then Digital, Advertising, Events.")

pdf.add_page()
pdf.shot("live-production.png", "Production hub. Each craft (video, film, ads, branded content, photography, podcast, music) has its own page.")
pdf.shot("live-pre.png", "Pre-production. Crafts stay on one page as tabs - matching the brief.")
pdf.shot("live-about.png", "About. Founders Shreeraj Avhad and Kiran Dhangar.")

pdf.add_page()
pdf.shot("live-work.png", "Work / portfolio. Structure is live; project frames are placeholders until real stills arrive.")
pdf.shot("live-contact.png", "Contact. Form and enquire path are live. Phone, address and GST to be confirmed by you.")

# Brief vs live
pdf.add_page()
pdf.h1("2. Design brief vs what we shipped")
pdf.body("Your Visual Design Brief (v1) asked for five tabs and a light layout. The live site keeps every service you listed, and upgrades the look to a cinematic production-house system.")
pdf.h2("From your brief (PDF mockups)")
pdf.shot("v1-02.png", "Brief sitemap: About, Services (six pages), Our work, Resources, Contact.", h=70)
pdf.shot("v1-03.png", "Brief home: cream layout, intro video block, logos, testimonials, six service cards.", h=70)

pdf.add_page()
pdf.h2("What changed, in short")
rows = [
    ("Look", "Cream mockups became Obsidian Noir with champagne gold - a production-house screen, not a brochure."),
    ("Home", "Separate intro-video block became one house reel on the hero (script, shoot, edit, digital, campaigns, conference, broadcast, live)."),
    ("Nav", "Team is in the main bar. Resources sit in the Index. Enquire is always visible."),
    ("Services", "All six divisions are live. Production crafts have their own URLs so a client can land on Video or Photography directly."),
    ("Work", "Page exists. Six category bands from the brief will be filled when you send 3 stills per category."),
]
pdf.set_font("Helvetica", "", 10)
for title, copy in rows:
    pdf.set_text_color(*GOLD)
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(32, 6, title)
    pdf.set_text_color(*INK)
    pdf.set_font("Helvetica", "", 10)
    pdf.multi_cell(0, 6, copy, new_x="LMARGIN", new_y="NEXT")
    pdf.ln(1)

pdf.h2("Still from the brief - not dropped")
pdf.body("About (founders). All six services. Pre and Post as tabbed pages. Contact form. FAQs and Resources routes. Enquire.")

# Client pack
pdf.add_page()
pdf.h1("3. What we need from you")
pdf.body("Architecture is live. Remaining work is your picture, logos and facts. Please send one Drive / WeTransfer folder.")
need = [
    ["House reel clips", "MP4 1080p, 8-20 sec", "Shooting, editing, scripting, digital, branded campaign, conference, broadcast, live"],
    ["Work stills", "JPG/PNG landscape", "3 projects x 6 categories (18 frames) + title + year"],
    ["Client logos", "SVG or PNG", "6-12 marks you approve"],
    ["Trust numbers", "Text", "Only figures you will stand behind"],
    ["Testimonials", "Text", "3-6 quotes, name, company, written permission"],
    ["People", "Portraits + bio", "Founders and any team you want named"],
    ["Contact", "Text", "Email, phone, city, GSTIN, Instagram / LinkedIn"],
    ["Studio notes", "Docs", "2-4 posts and 4-8 stills for gallery / news"],
]
for a, b, c in need:
    pdf.set_text_color(*GOLD)
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(0, 6, a)
    pdf.ln(6)
    pdf.set_text_color(*SMOKE)
    pdf.set_font("Helvetica", "", 9)
    pdf.multi_cell(0, 5, f"{b}.  {c}", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(2)

# 10 day plan
pdf.add_page()
pdf.h1("4. Ten working days to go-live")
pdf.body("Day 1 starts the morning after the full folder arrives. Testing and deploy are included - days 8 to 10.")
plan = [
    ("Day 1", "Load files. Contact, GST, social, Enquire inbox."),
    ("Day 2", "Founder / team photos. Logos and numbers on home."),
    ("Day 3", "Testimonials. Our work: Pre, Production, Post."),
    ("Day 4", "Our work: Digital, Advertising, Events."),
    ("Day 5", "Per-service work links. Nav lock if you prefer the five-tab brief."),
    ("Day 6", "Recut the house reel from your clips."),
    ("Day 7", "Blog, news, gallery. Legal pages if sent."),
    ("Day 8", "QA: Chrome, Edge, Safari, phone, tablet. Forms and video."),
    ("Day 9", "Fixes. Staging preview. One revision pass."),
    ("Day 10", "Production build, deploy, live check, handover."),
]
pdf.set_font("Helvetica", "", 10)
for day, copy in plan:
    pdf.set_text_color(*GOLD)
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(22, 7, day)
    pdf.set_text_color(*INK)
    pdf.set_font("Helvetica", "", 10)
    pdf.multi_cell(0, 7, copy, new_x="LMARGIN", new_y="NEXT")

pdf.ln(6)
pdf.set_fill_color(*INK)
pdf.set_text_color(*IVORY)
pdf.set_font("Helvetica", "", 10)
pdf.multi_cell(0, 6, "  Late files move the live date. Without stills and reel clips those blocks stay as tasteful placeholders. The structure will not wait on them to exist, but the public site should not launch with stock picture if you can send the real work.", new_x="LMARGIN", new_y="NEXT")

pdf.output(str(OUT))
print("wrote", OUT, "bytes", OUT.stat().st_size)
