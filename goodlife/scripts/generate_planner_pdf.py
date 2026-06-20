from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.lib import colors

CLAY = HexColor("#B15F3D")
CLAY_LIGHT = HexColor("#FBF1EC")
SAGE = HexColor("#71885C")
SAGE_LIGHT = HexColor("#F4F6F1")
INK = HexColor("#2F2C26")
INK_LIGHT = HexColor("#7A7569")

WIDTH, HEIGHT = letter

def draw_header(c, week_label="Week of: ____________________"):
    c.setFillColor(CLAY_LIGHT)
    c.rect(0, HEIGHT - 1.4 * inch, WIDTH, 1.4 * inch, fill=1, stroke=0)

    c.setFillColor(CLAY)
    c.setFont("Helvetica-Bold", 26)
    c.drawString(0.6 * inch, HEIGHT - 0.75 * inch, "GoodLife Weekly Reset")

    c.setFillColor(INK_LIGHT)
    c.setFont("Helvetica", 12)
    c.drawString(0.6 * inch, HEIGHT - 1.05 * inch, week_label)

def section_box(c, x, y, w, h, title, color, subtitle=""):
    c.setStrokeColor(color)
    c.setLineWidth(1.5)
    c.roundRect(x, y - h, w, h, 8, fill=0, stroke=1)

    c.setFillColor(color)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(x + 0.2 * inch, y - 0.35 * inch, title)

    if subtitle:
        c.setFillColor(INK_LIGHT)
        c.setFont("Helvetica-Oblique", 9)
        c.drawString(x + 0.2 * inch, y - 0.55 * inch, subtitle)

def draw_lines(c, x, y, w, count, gap=0.32 * inch, indent=0.2 * inch):
    c.setStrokeColor(colors.HexColor("#D7977C"))
    c.setLineWidth(0.6)
    for i in range(count):
        ly = y - gap * (i + 1)
        c.line(x + indent, ly, x + w - indent, ly)

c = canvas.Canvas("/home/claude/goodlife/public/downloads/goodlife-weekly-reset-planner.pdf", pagesize=letter)

draw_header(c)

margin = 0.6 * inch
content_w = WIDTH - 2 * margin
top_y = HEIGHT - 1.7 * inch

# Section 1: The Three That Matter
box1_h = 1.9 * inch
section_box(c, margin, top_y, content_w, box1_h, "1. THE THREE THAT MATTER", CLAY,
            "If only these got done, the week would still feel worth something.")
draw_lines(c, margin, top_y - 0.65 * inch, content_w, 3, gap=0.42 * inch)

# Section 2: The Maybe List
box2_y = top_y - box1_h - 0.3 * inch
box2_h = 2.3 * inch
section_box(c, margin, box2_y, content_w, box2_h, "2. THE MAYBE LIST", SAGE,
            "Lower stakes. Get to it if the week allows.")
draw_lines(c, margin, box2_y - 0.65 * inch, content_w, 5, gap=0.32 * inch)

# Section 3 & 4 side by side
row3_y = box2_y - box2_h - 0.3 * inch
half_w = (content_w - 0.3 * inch) / 2
box3_h = 1.7 * inch

section_box(c, margin, row3_y, half_w, box3_h, "3. ONE THING FOR YOU", CLAY,
            "A single line, just for you.")
draw_lines(c, margin, row3_y - 0.65 * inch, half_w, 2, gap=0.42 * inch)

section_box(c, margin + half_w + 0.3 * inch, row3_y, half_w, box3_h, "MOOD CHECK-IN", SAGE,
            "How is this week actually feeling?")
c.setFillColor(INK_LIGHT)
c.setFont("Helvetica", 9)
moods = ["Calm", "Stretched thin", "Hopeful", "Tired", "Steady", "Overwhelmed"]
mx = margin + half_w + 0.3 * inch + 0.25 * inch
my = row3_y - 0.75 * inch
for i, mood in enumerate(moods):
    col = i % 2
    row = i // 2
    cx = mx + col * (half_w / 2 - 0.1 * inch)
    cy = my - row * 0.35 * inch
    c.setStrokeColor(SAGE)
    c.rect(cx, cy - 0.08 * inch, 0.14 * inch, 0.14 * inch, fill=0, stroke=1)
    c.setFillColor(INK)
    c.drawString(cx + 0.22 * inch, cy - 0.06 * inch, mood)

# Section 4: Honest check-in
box4_y = row3_y - box3_h - 0.3 * inch
box4_h = 1.6 * inch
section_box(c, margin, box4_y, content_w, box4_h, "4. THE HONEST CHECK-IN", CLAY,
            "What actually happened versus what you planned. No guilt, just information.")
draw_lines(c, margin, box4_y - 0.65 * inch, content_w, 3, gap=0.32 * inch)

# Footer
c.setFillColor(INK_LIGHT)
c.setFont("Helvetica-Oblique", 8)
c.drawCentredString(WIDTH / 2, 0.4 * inch, "goodlife.vercel.app  ·  Made slowly, on purpose.")

c.showPage()
c.save()
print("Weekly reset planner PDF created.")
