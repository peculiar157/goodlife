from PIL import Image, ImageDraw, ImageFont
import os

OUT_DIR = "/home/claude/goodlife/public/images/posts"
OG_DIR = "/home/claude/goodlife/public/images"
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(OG_DIR, exist_ok=True)

# Brand palette
PALETTES = {
    "clay": [(251, 241, 236), (230, 187, 168), (176, 95, 61)],
    "sage": [(244, 246, 241), (201, 212, 186), (113, 136, 92)],
}

POSTS = [
    ("five-minute-morning-mindfulness-habit", "sage", "Mindfulness"),
    ("quotes-about-starting-over", "clay", "Quotes"),
    ("what-each-zodiac-sign-needs-to-hear", "clay", "Zodiac"),
    ("free-mandala-coloring-pages", "sage", "Coloring Pages"),
    ("free-weekly-reset-planner", "sage", "Printables"),
    ("rest-does-not-have-to-be-earned", "sage", "Mindfulness"),
]

def get_font(size, bold=False):
    paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for p in paths:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def make_image(path, label_top, label_bottom, palette_key, size=(1200, 800)):
    bg, mid, accent = PALETTES[palette_key]
    img = Image.new("RGB", size, bg)
    draw = ImageDraw.Draw(img)

    # Soft circular accent shape
    cx, cy = size[0] // 2, size[1] // 2
    draw.ellipse([cx - 320, cy - 320, cx + 320, cy + 320], fill=mid)
    draw.ellipse([cx - 180, cy - 180, cx + 180, cy + 180], fill=accent)

    font_top = get_font(40, bold=True)
    font_bottom = get_font(28)

    # Category label, top-left
    draw.text((50, 50), label_top, fill=accent, font=font_top)

    # Bottom label centered
    bbox = draw.textbbox((0, 0), label_bottom, font=font_bottom)
    w = bbox[2] - bbox[0]
    draw.text(((size[0] - w) // 2, size[1] - 90), label_bottom, fill=(90, 80, 65), font=font_bottom)

    img.save(path, "JPEG", quality=85)
    print(f"Created {path}")

for slug, palette, category in POSTS:
    make_image(os.path.join(OUT_DIR, f"{slug}.jpg"), category, "GoodLife", palette)

# OG default image (wider aspect for social sharing)
make_image(os.path.join(OG_DIR, "og-default.png"), "GoodLife", "Mindfulness . Quotes . Zodiac . Printables", "clay", size=(1200, 630))
# Rename to .png properly (Pillow saved as jpg format above, need real png for og image)
img = Image.open(os.path.join(OG_DIR, "og-default.png"))
img.save(os.path.join(OG_DIR, "og-default.png"), "PNG")

print("All placeholder images generated.")
