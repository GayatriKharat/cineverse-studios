"""Paint out any diamond accent above the home N gold circle."""
from PIL import Image, ImageDraw, ImageFilter

path = "public/narayani-n-dissolve-hero.png"
im = Image.open(path).convert("RGBA")
w, h = im.size
px = im.load()

# Gold circle known region from prior scan (~714-773, 202-261 on 1024)
# Erase diamond: small rotated square just above the circle
cx, cy = 743, 202  # top of circle
# Search a window above the circle for yellow pixels and erase them
for y in range(max(0, cy - 90), cy + 8):
    for x in range(cx - 55, cx + 55):
        r, g, b, a = px[x, y]
        if a < 30:
            continue
        is_gold = r > 180 and g > 120 and b < 100 and (r - b) > 90
        # also erase pale yellow fringe
        is_pale = r > 210 and g > 190 and b < 140 and (r - b) > 60
        if is_gold or is_pale:
            # keep pixels that belong to the circle body (lower part of window near circle fill)
            # Only wipe above circle top + small fringe
            if y < cy + 2:
                px[x, y] = (255, 255, 255, 255)

# Soft white cover patch centered above circle to catch leftover diamond tips
overlay = Image.new("RGBA", im.size, (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)
# diamond-sized blob above circle
draw.ellipse([cx - 22, cy - 58, cx + 22, cy - 6], fill=(255, 255, 255, 255))
overlay = overlay.filter(ImageFilter.GaussianBlur(radius=2))
im = Image.alpha_composite(im, overlay)

im.save(path, "PNG")
print("diamond region cleaned", path)
