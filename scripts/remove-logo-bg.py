from PIL import Image
import os

src = r"c:\Users\hp\cineverse-studios\public\narayani-logo.png"
backup = r"c:\Users\hp\cineverse-studios\public\narayani-logo-with-bg.png"
out = r"c:\Users\hp\cineverse-studios\public\narayani-logo.png"

img = Image.open(src).convert("RGBA")
if not os.path.exists(backup):
    img.save(backup)

pixels = img.load()
w, h = img.size
corners = [pixels[2, 2], pixels[w - 3, 2], pixels[2, h - 3], pixels[w - 3, h - 3]]
print("corner samples:", corners)


def is_bg(r, g, b, a):
    if a < 10:
        return True
    mx = max(r, g, b)
    mn = min(r, g, b)
    lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
    sat = (mx - mn) / (mx + 1e-6)
    if lum >= 210 and sat < 0.12:
        return True
    if lum >= 230 and sat < 0.18:
        return True
    if r >= 235 and g >= 235 and b >= 235:
        return True
    return False


for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if is_bg(r, g, b, a):
            lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
            if lum >= 245:
                pixels[x, y] = (r, g, b, 0)
            elif lum >= 220:
                alpha = int(max(0, min(255, (245 - lum) * 8)))
                pixels[x, y] = (r, g, b, alpha)
            else:
                pixels[x, y] = (r, g, b, 0)

bbox = img.getbbox()
if bbox:
    pad = 8
    left = max(0, bbox[0] - pad)
    top = max(0, bbox[1] - pad)
    right = min(w, bbox[2] + pad)
    bottom = min(h, bbox[3] + pad)
    img = img.crop((left, top, right, bottom))

img.save(out, "PNG")
print("saved", out, "size", img.size)
