import { createWriteStream, existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import path from "node:path";

const dir = path.join(process.cwd(), "public", "reels", "_biz");
await mkdir(dir, { recursive: true });

const shots = {
  pre: [854982, 3252136, 3129671, 3755880, 3141207],
  brand: [3141207, 3129671, 3252136, 854982],
  film: [31512124, 37903880, 5752729, 3209298, 3045163, 33048629],
  photo: [3195394, 33048629, 3755880],
  post: [31050550, 31050549, 3129957, 3141207],
  digital: [3945315, 4057498, 6981411, 3571264],
  ads: [3063970, 3195394, 3045163],
  events: [3571264, 2022395, 3252136, 2169880],
};

const suffixes = [
  "sd_640_360_30fps",
  "sd_640_360_25fps",
  "sd_640_360_24fps",
  "hd_1280_720_30fps",
  "hd_1280_720_25fps",
];

function urlsFor(id) {
  return suffixes.map((s) => `https://videos.pexels.com/video-files/${id}/${id}-${s}.mp4`);
}

async function grab(name, ids) {
  const dest = path.join(dir, `${name}.mp4`);
  if (existsSync(dest)) {
    console.log("have", name);
    return dest;
  }
  for (const id of ids) {
    for (const url of urlsFor(id)) {
      try {
        const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, redirect: "follow" });
        const type = res.headers.get("content-type") || "";
        if (!res.ok || !res.body || !type.includes("video")) continue;
        await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
        console.log("ok", name, id);
        return dest;
      } catch {
        /* next */
      }
    }
  }
  console.log("FAIL", name);
  return null;
}

for (const [name, ids] of Object.entries(shots)) {
  await grab(name, ids);
}
