"""Use the client's exact logo. Only remove backdrop. Do not redraw."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
DARK_SOURCE = PUBLIC / "narayani-logo-source.png"
LIGHT_SOURCE = PUBLIC / "narayani-logo-source-light.png"


def flood_backdrop(im: Image.Image, is_backdrop) -> Image.Image:
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    visited = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        for y in (0, h - 1):
            if is_backdrop(*px[x, y][:3]):
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if is_backdrop(*px[x, y][:3]):
                q.append((x, y))

    while q:
        x, y = q.popleft()
        if visited[y][x]:
            continue
        r, g, b, _ = px[x, y]
        if not is_backdrop(r, g, b):
            continue
        visited[y][x] = True
        px[x, y] = (0, 0, 0, 0)
        if x:
            q.append((x - 1, y))
        if x + 1 < w:
            q.append((x + 1, y))
        if y:
            q.append((x, y - 1))
        if y + 1 < h:
            q.append((x, y + 1))
    return im


def trim(im: Image.Image, pad: int = 4) -> Image.Image:
    box = im.getbbox()
    if not box:
        raise SystemExit("No logo pixels found.")
    x0, y0, x1, y1 = box
    return im.crop((max(0, x0 - pad), max(0, y0 - pad), min(im.size[0], x1 + pad), min(im.size[1], y1 + pad)))


def save_png(im: Image.Image, path: Path) -> None:
    im.save(path, optimize=True)
    print(f"  {path.name} {im.size[0]}x{im.size[1]}")


def main() -> None:
    if not DARK_SOURCE.exists():
        raise SystemExit(f"Missing {DARK_SOURCE}")

    dark = trim(
        flood_backdrop(
            Image.open(DARK_SOURCE),
            lambda r, g, b: max(r, g, b) < 72 and (r + g + b) < 120,
        )
    )
    save_png(dark, PUBLIC / "narayani-lockup-official.png")

    light = dark.copy()
    px = light.load()
    w, h = light.size
    ink = (20, 17, 31, 255)
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a and r > 200 and g > 200 and b > 200:
                px[x, y] = ink
    save_png(light, PUBLIC / "narayani-lockup-official-light.png")


if __name__ == "__main__":
    main()
