"""Crop About N tighter around the blue N + nearby effects."""
from PIL import Image
from pathlib import Path


def tight_crop(path: Path, pad=80):
    im = Image.open(path).convert("RGBA")
    px = im.load()
    w, h = im.size
    minx, miny, maxx, maxy = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 40:
                continue
            # blue brand OR gold sparkle OR dark ink near N
            is_blue = b > r + 25 and b > g + 15 and b > 80
            is_gold = r > 170 and g > 120 and b < 120 and r > b + 40
            is_ink = a > 120 and max(r, g, b) < 90
            if is_blue or is_gold or is_ink:
                found = True
                if x < minx: minx = x
                if y < miny: miny = y
                if x > maxx: maxx = x
                if y > maxy: maxy = y
    if not found:
        print(path.name, "no content")
        return
    l = max(0, minx - pad)
    t = max(0, miny - pad)
    r = min(w, maxx + pad)
    btm = min(h, maxy + pad)
    cropped = im.crop((l, t, r, btm))
    cropped.save(path, optimize=True)
    print(f"{path.name}: {im.size} -> {cropped.size} content=({minx},{miny})-({maxx},{maxy})")


root = Path(r"c:\Users\hp\cineverse-studios\public")
tight_crop(root / "about-n-hero.png", pad=90)
tight_crop(root / "services-n-hero.png", pad=70)
print("done")
