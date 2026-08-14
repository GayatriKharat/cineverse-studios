from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

PURPLE = (110, 63, 199, 255)
INK = (20, 17, 31, 255)
WHITE = (255, 255, 255, 255)
SLATE = (166, 166, 166, 255)


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = ["arialbd.ttf", "Arial Bold.ttf", "segoeuib.ttf"] if bold else ["arial.ttf", "Arial.ttf", "segoeui.ttf"]
    for name in candidates:
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def draw_mark(size: int = 96) -> Image.Image:
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    s = size / 96.0

    def rect(x, y, w, h):
        d.rectangle((x * s, y * s, (x + w) * s, (y + h) * s), fill=PURPLE)

    rect(4, 6, 14, 78)
    rect(78, 6, 14, 78)
    rect(18, 12, 13, 66)
    rect(65, 12, 13, 66)
    for y in (14, 28, 42, 56, 70):
        rect(6, y, 7, 6)
        rect(83, y, 7, 6)

    d.polygon([(31 * s, 12 * s), (44 * s, 12 * s), (52 * s, 28 * s), (39 * s, 28 * s)], fill=PURPLE)
    d.polygon([(39 * s, 32 * s), (52 * s, 32 * s), (74 * s, 78 * s), (61 * s, 78 * s)], fill=PURPLE)
    return im


def draw_wordmark(draw: ImageDraw.ImageDraw, x: int, y: int, variant: str, tagline: bool) -> tuple[int, int]:
    name_color = WHITE if variant == "dark" else INK
    tag_color = (255, 255, 255, 190) if variant == "dark" else SLATE

    name_font = load_font(34, bold=True)
    sub_font = load_font(13, bold=True)
    tag_font = load_font(11, bold=False)

    draw.text((x, y), "NARAYANI", fill=name_color, font=name_font)
    text_w = int(draw.textlength("NARAYANI", font=name_font))
    line_w = max(text_w, 168)
    line_y1 = y + 44
    line_y2 = y + 60
    draw.line((x, line_y1, x + line_w, line_y1), fill=PURPLE, width=2)
    draw.line((x, line_y2, x + line_w, line_y2), fill=PURPLE, width=2)
    sub_w = draw.textlength("STUDIOS", font=sub_font)
    draw.text((x + (line_w - sub_w) / 2, y + 46), "STUDIOS", fill=PURPLE, font=sub_font)
    bottom = line_y2 + 8
    right = x + line_w
    if tagline:
        draw.text((x, y + 68), "WE CREATE. YOU REMEMBER.", fill=tag_color, font=tag_font)
        bottom = y + 88
        right = max(right, x + int(draw.textlength("WE CREATE. YOU REMEMBER.", font=tag_font)))
    return right + 4, bottom + 4


def build_lockup(variant: str, tagline: bool = False) -> Image.Image:
    mark = draw_mark(96)
    height = 96 if tagline else 78
    temp = Image.new("RGBA", (400, height), (0, 0, 0, 0))
    temp.alpha_composite(mark, (0, 0))
    draw = ImageDraw.Draw(temp)
    right, bottom = draw_wordmark(draw, 112, 4 if tagline else 8, variant, tagline)
    cropped = temp.crop((0, 0, right, bottom))
    return cropped


def main() -> None:
    draw_mark(256).save(PUBLIC / "narayani-mark.png")
    build_lockup("dark", False).save(PUBLIC / "narayani-lockup-dark.png")
    build_lockup("dark", True).save(PUBLIC / "narayani-lockup-dark-tagline.png")
    build_lockup("light", False).save(PUBLIC / "narayani-lockup-light.png")
    build_lockup("light", True).save(PUBLIC / "narayani-lockup-light-tagline.png")
    print("wrote logo assets to", PUBLIC)


if __name__ == "__main__":
    main()
