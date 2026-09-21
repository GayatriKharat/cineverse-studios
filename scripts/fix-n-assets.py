"""Remove yellow diamond accent from home N; analyze yellow clusters."""
from PIL import Image
import math

def find_yellows(im, ymin=0, ymax=None):
    w, h = im.size
    if ymax is None:
        ymax = h
    px = im.load()
    pts = []
    for y in range(ymin, min(ymax, h)):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 180:
                continue
            if r > 190 and g > 130 and b < 90 and (r - b) > 100:
                pts.append((x, y))
    return pts


def cluster(pts, dist=28):
    clusters = []
    for p in pts:
        placed = False
        for c in clusters:
            cx, cy = c["cx"], c["cy"]
            if (p[0] - cx) ** 2 + (p[1] - cy) ** 2 <= dist ** 2:
                c["pts"].append(p)
                n = len(c["pts"])
                c["cx"] = sum(t[0] for t in c["pts"]) / n
                c["cy"] = sum(t[1] for t in c["pts"]) / n
                placed = True
                break
        if not placed:
            clusters.append({"pts": [p], "cx": p[0], "cy": p[1]})
    return clusters


def shape_metrics(pts):
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
    bw, bh = maxx - minx + 1, maxy - miny + 1
    # fill ratio vs bounding box
    fill = len(pts) / max(1, bw * bh)
    aspect = bw / max(1, bh)
    # diamond-ish: similar width/height, lower fill than circle, pointed
    return {
        "bbox": (minx, miny, maxx, maxy),
        "bw": bw,
        "bh": bh,
        "fill": fill,
        "aspect": aspect,
        "count": len(pts),
    }


def erase_region(im, bbox, pad=6):
    px = im.load()
    minx, miny, maxx, maxy = bbox
    minx = max(0, minx - pad)
    miny = max(0, miny - pad)
    maxx = min(im.size[0] - 1, maxx + pad)
    maxy = min(im.size[1] - 1, maxy + pad)
    for y in range(miny, maxy + 1):
        for x in range(minx, maxx + 1):
            r, g, b, a = px[x, y]
            # only erase yellow/gold-ish pixels (keep blue N)
            if a > 40 and r > 170 and g > 110 and b < 110 and (r - b) > 80:
                px[x, y] = (255, 255, 255, 255)
            elif a > 40 and r > 200 and g > 180 and b > 150 and abs(r - g) < 40:
                # pale sparkle fringe near diamond
                if minx <= x <= maxx and miny <= y <= maxy:
                    px[x, y] = (255, 255, 255, 255)


def main():
    path = "public/narayani-n-dissolve-hero.png"
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    print("dissolve", w, h)

    # Focus on upper half where diamond sits above the gold circle
    yellows = find_yellows(im, 0, int(h * 0.45))
    print("upper yellows", len(yellows))
    clusters = cluster(yellows, dist=36)
    clusters.sort(key=lambda c: c["cy"])
    for i, c in enumerate(clusters):
        m = shape_metrics(c["pts"])
        print(f"cluster {i}: cy={c['cy']:.0f} cx={c['cx']:.0f}", m)

    # Remove diamond-like clusters: smaller, near top, not the main circle
    # Keep the largest round gold circle; erase smaller diamond above it
    if clusters:
        # Sort by size
        scored = [(shape_metrics(c["pts"]), c) for c in clusters]
        scored.sort(key=lambda t: t[0]["count"], reverse=True)
        # Largest is usually the gold circle — keep it
        keep = scored[0][1]
        print("keeping circle cluster at", keep["cx"], keep["cy"], scored[0][0])
        for m, c in scored[1:]:
            # erase smaller accents above/near the circle (diamond)
            if m["count"] < scored[0][0]["count"] * 0.85 and m["count"] > 20:
                # prefer ones higher than the circle or diamond aspect
                if c["cy"] < keep["cy"] + 40 or (0.7 < m["aspect"] < 1.4 and m["fill"] < 0.72):
                    print("erasing diamond-like", m)
                    erase_region(im, m["bbox"], pad=10)

    out = "public/narayani-n-dissolve-hero.png"
    im.save(out, "PNG")
    print("saved", out)

    # Also scan about current
    about = Image.open("public/about-n-hero.png").convert("RGBA")
    print("about", about.size)


if __name__ == "__main__":
    main()
