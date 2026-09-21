"""Strip light blueprint / paper backgrounds on About N so only N + effects remain."""
from PIL import Image
from pathlib import Path


def strip_paper(path: Path):
    im = Image.open(path).convert("RGBA")
    px = im.load()
    w, h = im.size
    changed = 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            mx, mn = max(r, g, b), min(r, g, b)
            sat = mx - mn
            bright = (r + g + b) / 3.0
            # light paper / faint blueprint lines
            if bright >= 210 and sat <= 40:
                px[x, y] = (r, g, b, 0)
                changed += 1
                continue
            if bright >= 185 and sat <= 28:
                px[x, y] = (r, g, b, int(a * 0.15))
                changed += 1
                continue
            # pale blue blueprint wash
            if b >= r + 8 and b >= g + 4 and bright >= 170 and sat <= 55:
                fade = min(1.0, (bright - 150) / 80)
                px[x, y] = (r, g, b, int(a * (1 - fade)))
                changed += 1
    # soft perimeter again
    band = 72
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            edge = min(x, y, w - 1 - x, h - 1 - y)
            if edge >= band:
                continue
            factor = edge / band
            na = int(a * factor * factor)
            if na != a:
                px[x, y] = (r, g, b, na)
                changed += 1
    im.save(path, optimize=True)
    hist = im.getchannel("A").histogram()
    print(f"{path.name}: changed={changed} t0={hist[0]} opaque={hist[255]}")


strip_paper(Path(r"c:\Users\hp\cineverse-studios\public\about-n-hero.png"))
print("done")
