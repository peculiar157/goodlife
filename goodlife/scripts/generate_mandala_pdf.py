import math
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, black
from reportlab.pdfgen import canvas

WIDTH, HEIGHT = letter
CX, CY = WIDTH / 2, HEIGHT / 2 + 0.3 * inch
INK_LIGHT = HexColor("#7A7569")

def title_block(c, number, name, subtitle):
    c.setFillColor(black)
    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(WIDTH / 2, HEIGHT - 0.7 * inch, f"{number}. {name}")
    c.setFont("Helvetica-Oblique", 9)
    c.setFillColor(INK_LIGHT)
    c.drawCentredString(WIDTH / 2, HEIGHT - 0.92 * inch, subtitle)

def footer(c):
    c.setFillColor(INK_LIGHT)
    c.setFont("Helvetica", 8)
    c.drawCentredString(WIDTH / 2, 0.4 * inch, "GoodLife  ·  Free Mandala Coloring Pages  ·  goodlife.vercel.app")

def petal_ring(c, cx, cy, r_inner, r_outer, petals, rotate=0):
    c.setStrokeColor(black)
    c.setLineWidth(1.2)
    half_spread = (math.pi / petals) * 0.75
    for i in range(petals):
        angle = (2 * math.pi / petals) * i + rotate

        # Base points where the petal meets the inner circle
        xa = cx + r_inner * math.cos(angle - half_spread)
        ya = cy + r_inner * math.sin(angle - half_spread)
        xb = cx + r_inner * math.cos(angle + half_spread)
        yb = cy + r_inner * math.sin(angle + half_spread)

        # Tip of the petal
        x_tip = cx + r_outer * math.cos(angle)
        y_tip = cy + r_outer * math.sin(angle)

        # Control points pulled outward from the side points toward the tip
        # for a smooth rounded lobe rather than a sharp spike
        mid_r = r_inner + (r_outer - r_inner) * 0.85
        xa_ctrl = cx + mid_r * math.cos(angle - half_spread * 0.45)
        ya_ctrl = cy + mid_r * math.sin(angle - half_spread * 0.45)
        xb_ctrl = cx + mid_r * math.cos(angle + half_spread * 0.45)
        yb_ctrl = cy + mid_r * math.sin(angle + half_spread * 0.45)

        path = c.beginPath()
        path.moveTo(xa, ya)
        path.curveTo(xa_ctrl, ya_ctrl, x_tip, y_tip, x_tip, y_tip)
        path.curveTo(x_tip, y_tip, xb_ctrl, yb_ctrl, xb, yb)
        c.drawPath(path, stroke=1, fill=0)

def page1_beginner_bloom(c):
    title_block(c, 1, "THE BEGINNER BLOOM", "Wide, simple petals. Good for a first try.")
    c.setLineWidth(1.5)
    c.circle(CX, CY, 0.4 * inch, stroke=1, fill=0)
    petal_ring(c, CX, CY, 0.5 * inch, 1.6 * inch, 8)
    c.circle(CX, CY, 2.1 * inch, stroke=1, fill=0)
    footer(c)

def page2_layered_lotus(c):
    title_block(c, 2, "THE LAYERED LOTUS", "Three concentric rings of petals.")
    c.setLineWidth(1.2)
    c.circle(CX, CY, 0.35 * inch, stroke=1, fill=0)
    petal_ring(c, CX, CY, 0.4 * inch, 1.0 * inch, 6)
    petal_ring(c, CX, CY, 1.0 * inch, 1.6 * inch, 12, rotate=math.pi / 12)
    petal_ring(c, CX, CY, 1.6 * inch, 2.2 * inch, 16, rotate=0)
    c.circle(CX, CY, 2.3 * inch, stroke=1, fill=0)
    footer(c)

def page3_geometric_spiral(c):
    title_block(c, 3, "THE GEOMETRIC SPIRAL", "Sharp angles instead of soft curves.")
    c.setLineWidth(1.2)
    points_count = 9
    layers = 5
    for layer in range(1, layers + 1):
        r = layer * 0.4 * inch
        pts = []
        for i in range(points_count):
            angle = (2 * math.pi / points_count) * i + layer * 0.2
            x = CX + r * math.cos(angle)
            y = CY + r * math.sin(angle)
            pts.append((x, y))
        path = c.beginPath()
        path.moveTo(*pts[0])
        for p in pts[1:]:
            path.lineTo(*p)
        path.close()
        c.drawPath(path, stroke=1, fill=0)
    footer(c)

def page4_star_burst(c):
    title_block(c, 4, "THE STAR BURST", "Radiating points from a central circle.")
    c.setLineWidth(1.2)
    c.circle(CX, CY, 0.5 * inch, stroke=1, fill=0)
    spikes = 14
    for i in range(spikes):
        angle = (2 * math.pi / spikes) * i
        x1 = CX + 0.5 * inch * math.cos(angle)
        y1 = CY + 0.5 * inch * math.sin(angle)
        x2 = CX + 2.3 * inch * math.cos(angle)
        y2 = CY + 2.3 * inch * math.sin(angle)
        c.line(x1, y1, x2, y2)
    c.circle(CX, CY, 2.3 * inch, stroke=1, fill=0)
    footer(c)

def page5_garden_ring(c):
    title_block(c, 5, "THE GARDEN RING", "Small botanical details around a circular border.")
    c.setLineWidth(1.1)
    c.circle(CX, CY, 0.5 * inch, stroke=1, fill=0)
    petal_ring(c, CX, CY, 0.55 * inch, 1.2 * inch, 5)
    ring_r = 1.9 * inch
    leaves = 18
    for i in range(leaves):
        angle = (2 * math.pi / leaves) * i
        x = CX + ring_r * math.cos(angle)
        y = CY + ring_r * math.sin(angle)
        c.saveState()
        c.translate(x, y)
        c.rotate(math.degrees(angle))
        c.ellipse(-0.18 * inch, -0.08 * inch, 0.18 * inch, 0.08 * inch, stroke=1, fill=0)
        c.restoreState()
    c.circle(CX, CY, 2.2 * inch, stroke=1, fill=0)
    footer(c)

def page6_honeycomb(c):
    title_block(c, 6, "THE HONEYCOMB MANDALA", "A repeating hexagon pattern.")
    c.setLineWidth(1.0)

    def hexagon(cx, cy, r):
        path = c.beginPath()
        for i in range(6):
            angle = math.pi / 3 * i + math.pi / 6
            x = cx + r * math.cos(angle)
            y = cy + r * math.sin(angle)
            if i == 0:
                path.moveTo(x, y)
            else:
                path.lineTo(x, y)
        path.close()
        c.drawPath(path, stroke=1, fill=0)

    r = 0.42 * inch
    hexagon(CX, CY, r)
    for i in range(6):
        angle = math.pi / 3 * i
        x = CX + r * math.sqrt(3) * math.cos(angle)
        y = CY + r * math.sqrt(3) * math.sin(angle)
        hexagon(x, y, r)
    for i in range(6):
        angle = math.pi / 3 * i + math.pi / 6
        x = CX + r * 3 * math.cos(angle)
        y = CY + r * 3 * math.sin(angle)
        hexagon(x, y, r)
    c.circle(CX, CY, 2.25 * inch, stroke=1, fill=0)
    footer(c)

def page7_deep_detail(c):
    title_block(c, 7, "THE DEEP DETAIL MANDALA", "The most intricate page in the set.")
    c.setLineWidth(0.9)
    c.circle(CX, CY, 0.3 * inch, stroke=1, fill=0)
    petal_ring(c, CX, CY, 0.32 * inch, 0.7 * inch, 8)
    for ring_i, (r1, r2, count) in enumerate([
        (0.75 * inch, 1.1 * inch, 16),
        (1.15 * inch, 1.5 * inch, 20),
        (1.55 * inch, 1.9 * inch, 24),
        (1.95 * inch, 2.25 * inch, 28),
    ]):
        petal_ring(c, CX, CY, r1, r2, count, rotate=ring_i * 0.1)
    c.circle(CX, CY, 2.3 * inch, stroke=1, fill=0)
    footer(c)

def page8_free_form_wave(c):
    title_block(c, 8, "THE FREE-FORM WAVE", "Flowing, asymmetrical lines.")
    c.setLineWidth(1.1)
    for i in range(7):
        r_base = 0.4 * inch + i * 0.26 * inch
        path = c.beginPath()
        points = 60
        first = True
        for j in range(points + 1):
            angle = (2 * math.pi / points) * j
            wave = math.sin(angle * (3 + i % 3)) * 0.12 * inch
            r = r_base + wave
            x = CX + r * math.cos(angle)
            y = CY + r * math.sin(angle)
            if first:
                path.moveTo(x, y)
                first = False
            else:
                path.lineTo(x, y)
        path.close()
        c.drawPath(path, stroke=1, fill=0)
    footer(c)

pages = [
    page1_beginner_bloom,
    page2_layered_lotus,
    page3_geometric_spiral,
    page4_star_burst,
    page5_garden_ring,
    page6_honeycomb,
    page7_deep_detail,
    page8_free_form_wave,
]

c = canvas.Canvas("/home/claude/goodlife/public/downloads/goodlife-mandala-coloring-pages.pdf", pagesize=letter)
for page_fn in pages:
    page_fn(c)
    c.showPage()
c.save()
print("Mandala coloring pages PDF created with", len(pages), "pages.")
