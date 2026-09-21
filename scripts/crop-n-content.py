"""Crop N heroes to opaque content and leave a soft transparent pad."""
from PIL import Image, ImageFilter
from pathlib import Path


def crop_to_content(path: Path, pad=24):
    im = Image.open(path).convert("RGBA")
    # alpha bbox
    alpha = im.getchannel("A")
    # treat very faint as empty
    mask = alpha.point(lambda a: 255 if a > 12 else 0)
    bbox = mask.getbbox()
    if not bbox:
        print(path.name, "empty?")
        return
    l, t, r, b = bbox
    l = max(0, l - pad)
    t = max(0, t - pad)
    r = min(im.width, r + pad)
    b = min(im.height, b + pad)
    cropped = im.crop((l, t, r, b))
    cropped.save(path, optimize=True)
    print(f"{path.name}: {im.size} -> {cropped.size} bbox={bbox}")


root = Path(r"c:\Users\hp\cineverse-studios\public")
for name in ["about-n-hero.png", "services-n-hero.png", "narayani-n-dissolve-hero.png"]:
    crop_to_content(root / name, pad=32)
print("done")
