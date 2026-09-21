"""Force soft transparent perimeter so N heroes never show a rectangular box edge."""
from PIL import Image
from pathlib import Path
import math


def soft_perimeter(path: Path, band=88):
    im = Image.open(path).convert("RGBA")
    px = im.load()
    w, h = im.size
    changed = 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            edge = min(x, y, w - 1 - x, h - 1 - y)
            if edge >= band:
                continue
            # cosine ease for smooth dissolve
            t = edge / band
            factor = 0.5 - 0.5 * math.cos(math.pi * t)  # 0 at edge -> 1 at band
            na = int(a * factor)
            if na != a:
                px[x, y] = (r, g, b, na)
                changed += 1
    im.save(path, optimize=True)
    hist = im.getchannel("A").histogram()
    print(f"{path.name}: perimeter {changed}px  t0={hist[0]} opaque={hist[255]}")


root = Path(r"c:\Users\hp\cineverse-studios\public")
for name in [
    "narayani-n-dissolve-hero.png",
    "about-n-hero.png",
    "services-n-hero.png",
]:
    soft_perimeter(root / name, band=96 if "about" in name or "services" in name else 64)
print("done")
