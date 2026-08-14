import { mkdir, stat } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import path from "node:path";

const dir = path.join(process.cwd(), "public", "reels");

const files = {
  "northbound.mp4": "https://videos.pexels.com/video-files/3063970/3063970-sd_640_360_24fps.mp4",
  "afterglow.mp4": "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4",
  "volume.mp4": "https://videos.pexels.com/video-files/3129671/3129671-sd_640_360_25fps.mp4",
  "horizon.mp4": "https://videos.pexels.com/video-files/2169880/2169880-sd_640_360_30fps.mp4",
  "still-life.mp4": "https://videos.pexels.com/video-files/3195394/3195394-sd_640_360_25fps.mp4",
  "signal.mp4": "https://videos.pexels.com/video-files/3141207/3141207-sd_640_360_25fps.mp4",
};

async function exists(file) {
  try {
    const info = await stat(file);
    return info.size > 40_000;
  } catch {
    return false;
  }
}

async function pull(name, url) {
  const dest = path.join(dir, name);
  if (await exists(dest)) {
    console.log("ok", name);
    return;
  }
  const res = await fetch(url, { headers: { "User-Agent": "NarayaniStudiosSite/1.0" } });
  if (!res.ok || !res.body) throw new Error(`${name} ${res.status}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
  console.log("saved", name);
}

await mkdir(dir, { recursive: true });
for (const [name, url] of Object.entries(files)) {
  try {
    await pull(name, url);
  } catch (err) {
    console.error("fail", name, err.message);
  }
}
