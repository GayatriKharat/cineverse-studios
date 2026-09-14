from PIL import Image

im = Image.open("public/narayani-lockup-official.png").convert("RGBA")
px = im.load()
w, h = im.size

# Flood fill white/near-white background from corners
def is_bg(r, g, b):
    return r > 230 and g > 230 and b > 230

visited = [[False]*w for _ in range(h)]
queue = []

for x in range(w):
    if is_bg(*px[x, 0][:3]): queue.append((x, 0))
    if is_bg(*px[x, h-1][:3]): queue.append((x, h-1))
for y in range(h):
    if is_bg(*px[0, y][:3]): queue.append((0, y))
    if is_bg(*px[w-1, y][:3]): queue.append((w-1, y))

while queue:
    x, y = queue.pop(0)
    if visited[y][x]: continue
    visited[y][x] = True
    r, g, b, a = px[x, y]
    if is_bg(r, g, b):
        px[x, y] = (0, 0, 0, 0)
        if x > 0: queue.append((x-1, y))
        if x < w-1: queue.append((x+1, y))
        if y > 0: queue.append((x, y-1))
        if y < h-1: queue.append((x, y+1))

# Trim transparent borders
box = im.getbbox()
if box:
    im = im.crop((max(0, box[0]-2), max(0, box[1]-2), min(w, box[2]+2), min(h, box[3]+2)))

im.save("public/narayani-lockup-official.png", "PNG")
print("Successfully made logo background transparent and trimmed!")
