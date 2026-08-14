import { spawn } from "node:child_process";
import { createWriteStream, existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ffmpeg = require("ffmpeg-static");

const root = process.cwd();
const rawDir = path.join(root, "public", "reels", "_raw");
const cutDir = path.join(root, "public", "reels", "_cuts");
const outFile = path.join(root, "public", "reels", "house-reel.mp4");

/** One beat per house object / craft — the compiled reel. */
const shots = [
  { id: "brand", urls: ["https://videos.pexels.com/video-files/3129671/3129671-sd_640_360_25fps.mp4", "https://videos.pexels.com/video-files/3141207/3141207-sd_640_360_25fps.mp4"] },
  { id: "film", urls: ["https://videos.pexels.com/video-files/5752729/5752729-sd_640_360_30fps.mp4"] },
  { id: "camera", urls: ["https://videos.pexels.com/video-files/3209298/3209298-sd_640_360_25fps.mp4", "https://videos.pexels.com/video-files/2491284/2491284-sd_640_360_24fps.mp4"] },
  { id: "photo", urls: ["https://videos.pexels.com/video-files/3195394/3195394-sd_640_360_25fps.mp4"] },
  { id: "podcast", urls: ["https://videos.pexels.com/video-files/4069251/4069251-sd_640_360_25fps.mp4", "https://videos.pexels.com/video-files/3755880/3755880-sd_640_360_25fps.mp4", "https://videos.pexels.com/video-files/3945315/3945315-sd_640_360_24fps.mp4"] },
  { id: "music", urls: ["https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4"] },
  { id: "ads", urls: ["https://videos.pexels.com/video-files/3063970/3063970-sd_640_360_24fps.mp4"] },
  { id: "events", urls: ["https://videos.pexels.com/video-files/2022395/2022395-sd_640_360_30fps.mp4", "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4"] },
  { id: "aerial", urls: ["https://videos.pexels.com/video-files/2169880/2169880-sd_640_360_30fps.mp4"] },
  { id: "grade", urls: ["https://videos.pexels.com/video-files/3129957/3129957-sd_640_360_25fps.mp4", "https://videos.pexels.com/video-files/3141207/3141207-sd_640_360_25fps.mp4"] },
  { id: "digital", urls: ["https://videos.pexels.com/video-files/3945315/3945315-sd_640_360_24fps.mp4", "https://videos.pexels.com/video-files/3141207/3141207-sd_640_360_25fps.mp4"] },
  { id: "talent", urls: ["https://videos.pexels.com/video-files/3252136/3252136-sd_640_360_25fps.mp4", "https://videos.pexels.com/video-files/3195394/3195394-sd_640_360_25fps.mp4"] },
];

const localFallback = {
  brand: "volume.mp4",
  film: "set.mp4",
  camera: "set.mp4",
  photo: "still-life.mp4",
  podcast: "signal.mp4",
  music: "afterglow.mp4",
  ads: "northbound.mp4",
  events: "afterglow.mp4",
  aerial: "horizon.mp4",
  grade: "signal.mp4",
  digital: "signal.mp4",
  talent: "still-life.mp4",
};

function run(bin, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(bin, args, { stdio: "inherit" });
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${bin} ${code}`))));
  });
}

async function pull(id, urls) {
  const dest = path.join(rawDir, `${id}.mp4`);
  if (existsSync(dest)) return dest;
  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!res.ok || !res.body) continue;
      await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
      console.log("saved", id);
      return dest;
    } catch {
      /* try next */
    }
  }
  const fallback = path.join(root, "public", "reels", localFallback[id]);
  if (existsSync(fallback)) {
    console.log("fallback", id);
    return fallback;
  }
  throw new Error(`missing ${id}`);
}

await mkdir(rawDir, { recursive: true });
await mkdir(cutDir, { recursive: true });

const cuts = [];
for (const shot of shots) {
  const src = await pull(shot.id, shot.urls);
  const cut = path.join(cutDir, `${shot.id}.mp4`);
  await run(ffmpeg, [
    "-y", "-ss", "0.4", "-t", "2.45", "-i", src,
    "-an",
    "-vf", "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,eq=contrast=1.1:brightness=-0.06:saturation=0.72,fade=t=in:st=0:d=0.22,fade=t=out:st=2.12:d=0.32",
    "-c:v", "libx264", "-preset", "veryfast", "-crf", "23", "-pix_fmt", "yuv420p",
    cut,
  ]);
  cuts.push(cut);
}

const list = path.join(cutDir, "list.txt");
await writeFile(list, cuts.map((file) => `file '${file.replace(/\\/g, "/")}'`).join("\n"));
await run(ffmpeg, ["-y", "-f", "concat", "-safe", "0", "-i", list, "-c", "copy", outFile]);
console.log("wrote", outFile);
