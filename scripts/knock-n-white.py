"""Make near-white N-hero pixels transparent so page white reads continuous."""
from PIL import Image
from pathlib import Path
import math


def process(path: Path, hard=252, soft=245, sat_keep=18, band=48):
    im = Image.open(path).convert("RGBA")
    px = im.load()
    w, h = im.size
    changed = 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            sat = max(r, g, b) - min(r, g, b)
            bright = (r + g + b) / 3.0
            edge = min(x, y, w - 1 - x, h - 1 - y)
            edge_t = 0.0 if edge >= band else 1.0 - (edge / band)

            # keep saturated brand/photo pixels
            if sat > sat_keep:
                if edge < 20 and bright > 248:
                    px[x, y] = (r, g, b, int(a * (edge / 20)))
                    changed += 1
                continue

            knock = 0.0
            if bright >= hard:
                knock = 1.0
            elif bright >= soft:
                knock = (bright - soft) / (hard - soft)

            # near frame, also knock light greys/blues that read as a box
            if edge_t > 0 and bright >= 220 and sat <= 40:
                knock = max(knock, edge_t * 0.95)

            if knock <= 0.02:
                continue
            na = int(a * (1.0 - min(1.0, knock)))
            if na != a:
                px[x, y] = (r, g, b, na)
                changed += 1

    # soft perimeter alpha falloff
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            edge = min(x, y, w - 1 - x, h - 1 - y)
            if edge >= band:
                continue
            t = edge / band
            factor = 0.5 - 0.5 * math.cos(math.pi * t)
            na = int(a * factor)
            if na != a:
                px[x, y] = (r, g, b, na)
                changed += 1

    im.save(path, optimize=True)
    hist = im.getchannel("A").histogram()
    print(f"{path.name}: changed={changed} transparent={hist[0]} opaque={hist[255]}")


root = Path(r"c:\Users\hp\cineverse-studios\public")
process(root / "narayani-n-dissolve-hero.png", hard=251, soft=242, sat_keep=16, band=40)
process(root / "about-n-hero.png", hard=248, soft=230, sat_keep=22, band=72)
process(root / "services-n-hero.png", hard=248, soft=230, sat_keep=22, band=72)
print("done")
